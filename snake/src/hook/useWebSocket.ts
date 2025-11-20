import { useState, useEffect } from "react";
import { useWS } from "../context/ws-context";

export interface ChatMessage {
  playerId: string;
  text: string;
}

interface UseWebSocket {
  playerId: string;
  readyState: { p1: boolean; p2: boolean };
  chatMessages: ChatMessage[];
  sendMessage: (msg: string) => void;
}

export function useWebSocket(): UseWebSocket {
  const wsRef = useWS()!;
  const [playerId, setPlayerId] = useState("");
  const [readyState, setReadyState] = useState({ p1: true, p2: false });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (msg: string) => {
    if (!msg.trim() || !wsRef.current) return;
    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "chat", message: msg.trim() }));
    }
  };

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onopen = () => console.log("connected to WS");

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "waiting") {
        setPlayerId("p1");
        setReadyState({ p1: true, p2: false });
      }
      if (data.type === "matched") {
        setPlayerId(data.playerId);
        setReadyState({ p1: true, p2: true });
      }
      if (data.type === "chat") {
        setChatMessages((prev) => [
          ...prev,
          { playerId: data.playerId, text: data.message },
        ]);
      }
    };

    wsRef.current.onerror = (err) => console.error("WS error:", err);
    wsRef.current.onclose = () => console.log("WS CLOSED");

    return () => wsRef.current?.close();
  }, [wsRef]);

  return { playerId, readyState, chatMessages, sendMessage };
}

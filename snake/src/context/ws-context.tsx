import { createContext, useContext, useRef, useEffect } from "react";

type WSRef = React.RefObject<WebSocket | null>;

const WSContext = createContext<WSRef | null>(null);

interface MyProps {
  children: React.ReactNode;
}

export function WSProvider({ children }: MyProps) {
  const wsRef = useRef<WebSocket>(
    new WebSocket("wss://javascript-snake-game-server.onrender.com")
  );

  useEffect(() => {
    return () => {
      wsRef.current.close();
    };
  }, []);

  return <WSContext.Provider value={wsRef}>{children}</WSContext.Provider>;
}

export function useWS() {
  return useContext(WSContext);
}

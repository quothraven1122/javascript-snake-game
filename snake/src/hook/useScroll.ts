import { useEffect, useRef, useState } from "react";

export function useAutoScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // auto-scroll 할지 말지 결정하기
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    //유저가 스크롤을 맨 밑으로 내렸을 경우에만 auto-scroll 허용
    const handleScroll = () => {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

      setAutoScroll(isAtBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // auto-scroll 기능
  const scrollToBottom = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  return {
    containerRef,
    autoScroll,
    scrollToBottom,
  };
}

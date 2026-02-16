import { useRef, useState, useEffect, type RefCallback } from "react";

export function useInView(threshold = 0.1): [RefCallback<HTMLElement>, boolean] {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const ref: RefCallback<HTMLElement> = (node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      elementRef.current = node;
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observerRef.current?.disconnect();
          }
        },
        { threshold }
      );
      observerRef.current.observe(node);
    }
  };

  return [ref, inView];
}

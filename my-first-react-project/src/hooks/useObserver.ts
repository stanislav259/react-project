import { useEffect, useRef, RefObject } from "react";

export const useObser = (
  ref: RefObject<Element | null>, 
  canLoad: boolean, 
  isLoading: boolean,
  callback: () => void,
  ) => {
  const observer = useRef<IntersectionObserver | null>(null);
    
  useEffect(() => {
      if (isLoading) return;
      if (!ref.current) return;
      if (observer.current) observer.current.disconnect();
  
      const cb: IntersectionObserverCallback = (entries) => {
        if (entries[0]?.isIntersecting && canLoad) {
          callback();
        }
      };
  
      observer.current = new IntersectionObserver(cb);
      observer.current.observe(ref.current);
      return () => {
      observer.current?.disconnect();
      
    }
    }, [isLoading, canLoad, ref, callback]);

}
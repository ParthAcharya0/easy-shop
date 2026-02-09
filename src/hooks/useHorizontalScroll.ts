import { useEffect, useRef } from "react";

const SCROLL_SPEED = 1.5;

const useHorizontalScroll = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    /* Mouse drag */
    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * SCROLL_SPEED;
      el.scrollLeft = scrollLeft - walk;
    };

    /* Wheel */
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    // el.addEventListener("mousedown", onMouseDown);
    // el.addEventListener("mouseleave", onMouseLeave);
    // el.addEventListener("mouseup", onMouseUp);
    // el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      // el.removeEventListener("mousedown", onMouseDown);
      // el.removeEventListener("mouseleave", onMouseLeave);
      // el.removeEventListener("mouseup", onMouseUp);
      // el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return ref;
};

export default useHorizontalScroll;

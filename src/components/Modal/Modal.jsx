// src/components/Modal/Modal.js

import { useEffect, useRef, useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  sizeModal = "",
  isScroll = false,
  children,
}) => {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setShouldRender(true);
      setAnimateOut(false);
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      setAnimateIn(false);
      setAnimateOut(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setAnimateOut(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center bg-black/40
        transition-opacity duration-300 ease-out !m-0
        ${animateOut ? "opacity-0" : animateIn ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        ref={ref}
        className={`
          max-h-[90vh] bg-white border border-neutral-400 rounded-lg shadow-lg ${
            isScroll && "overflow-y-auto"
          }
          transform transition-all duration-300 ease-out
          ${
            animateOut
              ? "translate-y-6 opacity-0 scale-95"
              : animateIn
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-6 opacity-0 scale-98"
          }
          ${sizeModal}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

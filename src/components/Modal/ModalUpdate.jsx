// src/components/Modal/ModalUpdate.jsx

import { useEffect, useState } from "react";
import LoaderCircleProgress from "../ProgressBar/LoaderCircleProgress";

const ModalUpdate = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const duration = 2000;

  useEffect(() => {
    let closeTimer;
    let animateTimer;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      setShouldRender(true);
      setAnimateOut(false);

      animateTimer = setTimeout(() => {
        setAnimateIn(true);
      }, 10);

      // Auto-close after duration
      closeTimer = setTimeout(() => {
        setAnimateIn(false);
        setAnimateOut(true);
        setTimeout(() => {
          setShouldRender(false);
          setAnimateOut(false);
          onClose(); // call parent to update isOpen
        }, 300); // match fade-out duration
      }, duration);
    } else {
      document.body.style.overflow = "";
      setAnimateIn(false);
      setAnimateOut(true);
      closeTimer = setTimeout(() => {
        setShouldRender(false);
        setAnimateOut(false);
      }, 300);
    }

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(animateTimer);
    };
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
      <LoaderCircleProgress size={80} duration={duration} />
    </div>
  );
};

export default ModalUpdate;

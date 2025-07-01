// src/components/Toast/ToastContainer.jsx

import Toast from "./Toast";

const ToastContainer = ({ toasts }) => {
  return (
    <div className="fixed top-5 right-5 z-50 space-y-3 w-[394px] ">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;

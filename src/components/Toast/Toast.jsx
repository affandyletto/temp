// src/components/Toast/Toast.jsx
import { CheckCircle, XCircle } from "lucide-react";

const Toast = ({ type = "success", title, description }) => {
  const isSuccess = type === "success";

  return (
    <div
      className={`flex items-start gap-3 py-3 px-4 rounded-lg shadow-lg transition-all ${
        isSuccess ? "bg-success-100" : "bg-red-100"
      }`}
    >
      <div className="mt-1">
        {isSuccess ? (
          <CheckCircle className="text-success-400 size-6" />
        ) : (
          <XCircle className="text-red-400 size-6" />
        )}
      </div>
      <div className="flex-1">
        <p
          className={`text-base ${
            isSuccess ? "text-success-400" : "text-red-400"
          }`}
        >
          {title}
        </p>
        <p
          className={`text-sm ${
            isSuccess ? "text-success-300" : "text-red-300"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Toast;

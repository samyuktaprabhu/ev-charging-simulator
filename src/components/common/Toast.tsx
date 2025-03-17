import { useEffect } from "react";

export interface ToastProps {
  message: string;
  type: "success" | "danger" | "warning";
  onClose: () => void;
}
const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-2 rounded-lg shadow-lg bg-white text-xs transition-transform transform duration-300 ease-in-out ${
        type === "success"
          ? "text-green-500 border border-green-600"
          : type === "warning"
          ? "text-yellow-500 border border-yellow-600"
          : " border border-red-400 text-red-500"
      }`}
    >
      <div className="flex items-center">
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Toast;

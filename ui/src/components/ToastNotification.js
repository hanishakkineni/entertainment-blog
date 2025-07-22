import React from "react";
import { CheckCircle } from
    "lucide-react";
import "../styles/auth.css";

const Toast = ({ message }) => {
  return (
    <div className="toast-container">
      <div className="toast-notification">
        <CheckCircle className="h-5 w-5" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
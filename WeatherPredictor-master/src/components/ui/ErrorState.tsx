import React from "react";

export const ErrorState: React.FC<{ message?: string }> = ({ message }) => {
  return <div className="error-state">⚠️ {message ?? "Something went wrong."}</div>;
};

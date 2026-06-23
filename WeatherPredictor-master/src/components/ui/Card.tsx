import React from "react";

// Generic card container for grouping related weather information.
export const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="card">{children ?? "Card placeholder"}</div>;
};



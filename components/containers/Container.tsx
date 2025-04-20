import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  style?: string;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <div
      className={`p-1 before:md:p-4 lg:w-4/5 w-full mx-auto ${!!style ? style : ""}`}
    >
      {children}
    </div>
  );
};

export default Container;

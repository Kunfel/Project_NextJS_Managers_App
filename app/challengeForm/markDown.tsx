import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const Markdown: React.FC = () => {
  const [value, setValue] = useState("type your text in here");

  return (
    <div className="container mt-7 ml-7 bg-white">
      <p>Description*</p>
      <MDEditor value={value} onChange={(val) => setValue(val || "")} />
    </div>
  );
};

export default Markdown;

import React, { useEffect } from "react";
import Prism from "prismjs"; // Import Prism.js
import "prismjs/themes/prism.css"; // Import the desired Prism.js theme
import "prismjs/components/prism-asm6502"

const AssemblyCode = ({ code }) => {
  useEffect(() => {
    // Call Prism.highlightAll() to highlight code elements
    Prism.highlightAll();
  }, []);

  return (
    <React.Fragment >
    <pre style={{maxHeight:"30vh"}}>
      <code className="language-asm">{code}</code>
    </pre>
    </React.Fragment>
  );
};

export default AssemblyCode;

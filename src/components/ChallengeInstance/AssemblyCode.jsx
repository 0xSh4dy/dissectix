import React, { useEffect } from "react";
import Prism from "prismjs"; // Import Prism.js

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { darkula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const AssemblyCode = ({ code }) => {
  useEffect(() => {
    // Call Prism.highlightAll() to highlight code elements
    Prism.highlightAll();
  }, []);

  return (
    <React.Fragment >
      <SyntaxHighlighter language="x86asm" style={dark} >
        {code}
      </SyntaxHighlighter>

    </React.Fragment>
  );
};

export default AssemblyCode;

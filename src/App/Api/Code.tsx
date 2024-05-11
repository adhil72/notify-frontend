import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { Button } from '@mui/material';

hljs.registerLanguage('javascript', javascript);

interface CodeBlockProps {
  code: string;
  language?: string; // Default to JavaScript
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <SyntaxHighlighter language={language} style={darcula} wrapLines={true} showLineNumbers={true}  customStyle={{padding: '1em'}}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

import { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeArea = ({ code, language }: { code: string; language: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setIsCopied(true);

    // copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className="md:w-1/2 mx-auto">
      {/* code */}
      <div className="text-sm bg-gray-800 px-4 py-0 my-0 mx-5 rounded font-mono flex flex-row justify-between items-center">
        <SyntaxHighlighter
          language={language}
          style={dark}
          customStyle={{
            fontSize: '1rem',
            // lineHeight: '1.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            font: 'inherit',
          }}
        >
          {code}
        </SyntaxHighlighter>

        {/* copy */}
        <div>
          {/* is copied */}
          {isCopied ? (
            <div className="bg-gray-800 text-white rounded">Copied!</div>
          ) : (
            <button className="px-3 text-lg" onClick={handleCopy}>
              <IoCopyOutline />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CodeArea;

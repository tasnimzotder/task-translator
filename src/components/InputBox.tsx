'use client';

import { useState } from 'react';

const InputBox = () => {
  const [query, setQuery] = useState<string>('');
  const [command, setCommand] = useState<string>('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // use /api/translate
  const handleTranslate = () => {
    fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        setCommand(data);
        // alert(data);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <div className="w-full text-center">
      <div>
        <div>
          <span>Type your query</span>
        </div>

        <div>
          {/* <textarea
            value={query}
            onChange={handleQueryChange}
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded"
            onSubmit={handleTranslate}
          /> */}

          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            className="w-1/2 px-4 py-2 text-gray-700 bg-gray-200 rounded"
            // on key press enter
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleTranslate();
              }
            }}
          />
        </div>
      </div>

      <div>
        <button onClick={handleTranslate}>
          <span>Translate</span>
        </button>
      </div>

      <div>
        <div>
          <span>Your command</span>
        </div>

        <div>
          <span>
            <code>{command}</code>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputBox;

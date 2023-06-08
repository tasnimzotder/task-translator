'use client';

import { useState } from 'react';

const InputBox = () => {
  const [query, setQuery] = useState<string>('');
  const [os, setOs] = useState<string>('');

  const [command, setCommand] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setCommand('');
    setDescription('');

    setOs('linux');
  };

  // use /api/translate
  const handleTranslate = () => {
    setIsLoading(true);

    if (query === '') {
      setIsLoading(false);

      return;
    }

    fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        os: os,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data = JSON.parse(data);

        setCommand(data.command);
        setDescription(data.description);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error({ error });

        setIsLoading(false);
      });
  };

  return (
    <div className="w-full text-center flex flex-col gap-5">
      <div>
        <div>
          <span>Type your query</span>
        </div>

        <div className="flex flex-col justify-center items-center my-10 gap-3">
          <select
            value={os}
            onChange={(event) => {
              setOs(event.target.value);
            }}
            className="w-38 px-4 py-2 text-gray-700 bg-gray-200 rounded mb-6"
          >
            <option value="linux">Linux</option>
            <option value="mac">Mac</option>
            <option value="windows">Windows</option>
          </select>

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

          <div className="flex flex-row gap-5">
            <button
              onClick={handleClear}
              className="bg-gray-500 rounded-md px-3 py-1.5"
            >
              Clear
            </button>

            <button
              onClick={handleTranslate}
              className="bg-blue-500 rounded-md px-3 py-1.5"
            >
              <span>Translate</span>
            </button>
          </div>
          {isLoading && <div>Loading...</div>}
        </div>
      </div>

      <div>
        <div>
          <span>Your command</span>
        </div>

        {command !== '' && (
          <div className="flex flex-col gap-4 my-6">
            <div>
              <code className="text-sm bg-gray-800 px-4 py-2 my-10 rounded">
                {command}
              </code>
            </div>

            <div>
              <span>{description}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputBox;

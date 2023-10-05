'use client';

import { useState } from 'react';
import CodeArea from './CodeArea';
import LoadingCircle from './LoadingCircle';

const InputBox = () => {
  const [query, setQuery] = useState<string>('');
  const [os, setOs] = useState<string>('');
  const [language, setLanguage] = useState<string>('bash');

  const [command, setCommand] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const os_local = event.target.value;

    setQuery(os_local);

    if (os_local === 'linux' || os_local === 'mac') {
      setLanguage('bash');
    } else if (os_local === 'windows') {
      setLanguage('powershell');
    }
  };

  const handleOSChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOs(event.target.value);
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

    setCommand('');
    setDescription('');

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
        data = data;

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
    <div className="w-full text-center flex flex-col gap-5 my-5">
      <div>
        {/* <div>
          <span>Type your query</span>
        </div> */}

        <div className="flex flex-col justify-center items-center gap-3">
          <select
            value={os}
            onChange={handleOSChange}
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
            placeholder="Type your query. Example: Docker kill all running containers"
            className="w-1/2 px-4 py-2 text-gray-200 bg-gray-800 rounded border-2 border-gray-50"
            // on key press enter
            onKeyDown={(event) => {
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
              className="bg-blue-500 rounded-md px-3 py-1.5 flex flex-row gap-2 justify-center items-center"
            >
              <span>Translate</span>
              <LoadingCircle isLoading={isLoading} />
            </button>
          </div>
        </div>
      </div>

      {command !== '' && (
        <div className="my-10">
          <div>
            <span>Your command</span>
          </div>

          <div className="flex flex-col gap-4 my-6">
            <div>
              <CodeArea code={command} language={language} />
            </div>

            <div>
              <span>{description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputBox;

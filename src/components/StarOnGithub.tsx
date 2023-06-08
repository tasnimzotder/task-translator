import Link from 'next/link';
import { SiGithub } from 'react-icons/si';

const StarOnGithub = () => {
  const gh_url = 'https://github.com/tasnimzotder/task-translator';

  return (
    <div>
      <Link
        href={gh_url}
        className="flex flex-row justify-center items-center gap-3 my-9 bg-blue-400 w-fit mx-auto px-3 py-1.5 rounded-md text-white hover:bg-blue-500 transition-colors"
      >
        <div className="flex flex-row justify-center items-center gap-3">
          <SiGithub className="inline-block" />
          Star on GitHub
        </div>
      </Link>
    </div>
  );
};

export default StarOnGithub;

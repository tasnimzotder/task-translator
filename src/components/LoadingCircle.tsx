import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingCircle = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div>
      {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
    </div>
  );
};

export default LoadingCircle;

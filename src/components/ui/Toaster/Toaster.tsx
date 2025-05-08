import { ReactNode } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const iconList: { [key: string]: ReactNode } = {
  success: <CiCircleCheck className="text-3xl text-green-500 drop-shadow-md" />,
  error: <CiCircleRemove className="text-3xl text-red-500 drop-shadow-md" />,
};

interface PropTypes{
  type: string,
  message: string
}

const Toaster = (props: PropTypes) => {
  const { type, message } = props
  return (
    <div
      role="alert"
      aria-labelledby="toaster-label"
      className="fixed right-8 top-8 z-50 max-w-sm rounded-xl border-l-4 border-green-500 bg-white shadow-2xl ring-1 ring-black/5 backdrop-blur-sm animate-fade-in"
    >
      <div className="flex items-center gap-3 p-4">
        {iconList[type]}
        <p
          id="toaster-label"
          className="text-sm font-semibold text-gray-800 tracking-wide"
        >
          {message} 
        </p>
      </div>
    </div>
  );
};

export default Toaster;

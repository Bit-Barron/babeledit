import { FaRegWindowMinimize } from "react-icons/fa";
import { CiMaximize1 } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

export const Titlebar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-slate-800 flex items-center justify-between border-b border-slate-700">
      <div className="px-4 text-sm text-slate-300 flex-grow">
        Create a new translation project
      </div>

      <div className="flex h-full">
        <button className="h-full w-8 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-colors">
          <FaRegWindowMinimize />
        </button>
        <button className="h-full w-8 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-colors">
          <CiMaximize1 />
        </button>
        <button className="h-full w-8 flex items-center justify-center text-slate-400 hover:bg-red-600 transition-colors">
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

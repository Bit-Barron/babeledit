const Titlebar = ({ title = "Create a new translation project" }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-slate-800 flex items-center justify-between border-b border-slate-700">
      {/* Title */}
      <div className="px-4 text-sm text-slate-300 flex-grow">{title}</div>

      {/* Window Controls */}
      <div className="flex h-full">
        <button className="h-full w-8 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-colors">
          <MinimizeIcon />
        </button>
        <button className="h-full w-8 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-colors">
          <MaximizeIcon />
        </button>
        <button className="h-full w-8 flex items-center justify-center text-slate-400 hover:bg-red-600 transition-colors">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

// Window control icons
const MinimizeIcon = () => (
  <svg width="10" height="1" viewBox="0 0 10 1">
    <path fill="currentColor" d="M0 0h10v1H0z" />
  </svg>
);

const MaximizeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10">
    <path fill="currentColor" d="M0 0v10h10V0H0zm1 1h8v8H1V1z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10">
    <path
      fill="currentColor"
      d="M1 0L0 1l4 4-4 4 1 1 4-4 4 4 1-1-4-4 4-4-1-1-4 4-4-4z"
    />
  </svg>
);

export default Titlebar;

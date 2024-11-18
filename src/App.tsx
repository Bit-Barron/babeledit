import "./App.css";
import { TRANSLATION_PROJECTS } from "./utils/constants";

function App() {
  return (
    <main className="min-h-screen bg-[#1C1C1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl mb-8">Create a new translation project</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TRANSLATION_PROJECTS.map((option) => (
            <div
              key={option.title}
              className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-lg 
                hover:bg-gray-800 transition-colors cursor-pointer aspect-square"
            >
              <option.icon className="text-3xl mb-2" />
              <span className="text-sm text-center text-gray-300">
                {option.title}
              </span>
            </div>
          ))}
        </div>

        <button className="mt-8 text-gray-400 hover:text-gray-300 text-sm">
          Open example project...
        </button>
      </div>
    </main>
  );
}

export default App;

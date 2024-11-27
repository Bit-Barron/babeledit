import { CreateProject } from "@/components/pages/create-project/create-project-dialog";
import { TRANSLATION_PROJECTS } from "@/utils/constants";

interface HomeViewProps {
  isCreateProjectOpen: boolean;
  setIsCreateProjectOpen: (open: boolean) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  isCreateProjectOpen,
  setIsCreateProjectOpen,
}) => {
  return (
    <main className="min-h-screen text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TRANSLATION_PROJECTS.map(({ title, Icon }) => (
            <button
              onClick={() => setIsCreateProjectOpen(true)}
              key={title}
              className="flex flex-col items-center justify-center p-4 border rounded-lg transition-colors cursor-pointer aspect-square"
            >
              <Icon className="text-3xl mb-2" />
              <span className="text-sm text-center text-gray-300">{title}</span>
            </button>
          ))}
        </div>
        <CreateProject
          isOpen={isCreateProjectOpen}
          setIsOpen={setIsCreateProjectOpen}
        />
        <button className="mt-8 text-gray-400 hover:text-gray-300 text-sm">
          Open example project...
        </button>
      </div>
    </main>
  );
};

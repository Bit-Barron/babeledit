import { Header } from "@/components/pages/translation-editor/translation-header";
import { LanguageHeader } from "@/components/pages/translation-editor/translation-language-header";
import { TreeNodeComponent } from "@/components/pages/translation-editor/translation-tree-node";
import { useTranslationTree } from "@/components/store/use-translation-tree";
import { useLocation } from "react-router-dom";

export const TranslationEditor = () => {
  const location = useLocation();
  const files = location.state?.files || [];
  const { treeData, expandedNodes, selectedTranslation, handleNodeClick } =
    useTranslationTree(files[0]?.content);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header fileName={files[0]?.name} />
      <div className="flex">
        <div className="w-[300px] border-r border-gray-800">
          <div className="p-4 border-b border-gray-800 font-medium">
            Translation IDs
          </div>
          <div className="overflow-auto">
            {treeData.map((node: TreeNode) => (
              <TreeNodeComponent
                key={node.label}
                node={node}
                path={node.label}
                level={0}
                isExpanded={expandedNodes.has(node.label)}
                isSelected={selectedTranslation === node.label}
                onNodeClick={handleNodeClick}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <LanguageHeader />
          <section className="p-2">
            <div>sd</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TranslationEditor;

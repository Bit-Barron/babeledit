import { ICON_SIZE, FOLDER_COLOR } from "@/utils/constants";
import { FaFolder } from "react-icons/fa";

interface TreeNodeIconProps {
  type: "folder" | "translation";
  isExpanded?: boolean;
}

export const TreeNodeIcon: React.FC<TreeNodeIconProps> = ({ type }) => {
  return (
    <div>
      {type === "folder" && (
        <div className={`${ICON_SIZE} mr-2 ${FOLDER_COLOR}`}>
          <FaFolder />
        </div>
      )}
    </div>
  );
};

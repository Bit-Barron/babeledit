import {
  ICON_SIZE,
  MARGIN_RIGHT,
  FOLDER_COLOR,
  TRANSLATION_COLOR,
} from "@/utils/constants";
import {
  FaChevronRight as ChevronRight,
  FaChevronDown as ChevronDown,
  FaFolder as Folder,
} from "react-icons/fa";
import { FiMessageSquare as MessageSquare } from "react-icons/fi";

interface TreeNodeIconProps {
  type: "folder" | "translation";
  isExpanded?: boolean;
}

export const TreeNodeIcon: React.FC<TreeNodeIconProps> = ({
  type,
  isExpanded = false,
}) => {
  const renderFolderIcon = () => (
    <>
      {isExpanded ? (
        <ChevronDown className={`${ICON_SIZE} ${MARGIN_RIGHT}`} />
      ) : (
        <ChevronRight className={`${ICON_SIZE} ${MARGIN_RIGHT}`} />
      )}
      <Folder className={`${ICON_SIZE} mr-2 ${FOLDER_COLOR}`} />
    </>
  );

  const renderTranslationIcon = () => (
    <>
      <span className={`${ICON_SIZE} ${MARGIN_RIGHT}`} />
      <MessageSquare className={`${ICON_SIZE} mr-2 ${TRANSLATION_COLOR}`} />
    </>
  );

  return type === "folder" ? renderFolderIcon() : renderTranslationIcon();
};

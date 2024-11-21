import { IconType } from "react-icons";
import { VscJson } from "react-icons/vsc";
import { FaJava, FaAngular, FaLaravel } from "react-icons/fa";
import {
  SiYaml,
  SiReact,
  SiNextdotjs,
  SiRubyonrails,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { SiEmberdotjs } from "react-icons/si";

interface ProjectOption {
  title: string;
  icon: IconType;
}

export const TRANSLATION_PROJECTS: ProjectOption[] = [
  {
    title: "Generic JSON",
    icon: VscJson,
  },
  {
    title: "Generic YAML",
    icon: SiYaml,
  },
  {
    title: "Java Properties",
    icon: FaJava,
  },
  {
    title: "Flutter ARB",
    icon: TbBrandReactNative,
  },
  {
    title: "resx Resource",
    icon: VscJson,
  },
  {
    title: "Angular",
    icon: FaAngular,
  },
  {
    title: "React",
    icon: SiReact,
  },
  {
    title: "i18next",
    icon: SiNextdotjs,
  },
  {
    title: "Ruby on Rails YAML",
    icon: SiRubyonrails,
  },
  {
    title: "Laravel",
    icon: FaLaravel,
  },
  {
    title: "vue-i18n JSON",
    icon: SiVuedotjs,
  },
  {
    title: "Ember",
    icon: SiEmberdotjs,
  },
];

export const LANGUAGES = ["de-DE", "en-US", "es-ES", "fr-FR"];


export const ICON_SIZE = "h-4 w-4";
export const MARGIN_RIGHT = "mr-1";
export const FOLDER_COLOR = "text-yellow-500";
export const TRANSLATION_COLOR = "text-gray-400";
export const ITEM_TYPE = "TREE_NODE";
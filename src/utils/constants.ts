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
import { ProjectOption } from "@/@types/translation-editor.types";

export const TRANSLATION_PROJECTS: ProjectOption[] = [
  {
    title: "Generic JSON",
    Icon: VscJson,
  },
  {
    title: "Generic YAML",
    Icon: SiYaml,
  },
  {
    title: "Java Properties",
    Icon: FaJava,
  },
  {
    title: "Flutter ARB",
    Icon: TbBrandReactNative,
  },
  {
    title: "resx Resource",
    Icon: VscJson,
  },
  {
    title: "Angular",
    Icon: FaAngular,
  },
  {
    title: "React",
    Icon: SiReact,
  },
  {
    title: "i18next",
    Icon: SiNextdotjs,
  },
  {
    title: "Ruby on Rails YAML",
    Icon: SiRubyonrails,
  },
  {
    title: "Laravel",
    Icon: FaLaravel,
  },
  {
    title: "vue-i18n JSON",
    Icon: SiVuedotjs,
  },
  {
    title: "Ember",
    Icon: SiEmberdotjs,
  },
];

export const LANGUAGES = ["de-DE", "en-US", "es-ES", "fr-FR"];
export const TRANSLATION_API_URL = "https://api.mymemory.translated.net";

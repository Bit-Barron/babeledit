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

export const LANGUAGES = [
  "ar-AE", // Arabic (UAE)
  "ar-SA", // Arabic (Saudi Arabia)
  "bn-IN", // Bengali (India)
  "cs-CZ", // Czech
  "da-DK", // Danish
  "de-AT", // German (Austria)
  "de-CH", // German (Switzerland)
  "de-DE", // German (Germany)
  "el-GR", // Greek
  "en-AU", // English (Australia)
  "en-CA", // English (Canada)
  "en-GB", // English (UK)
  "en-IN", // English (India)
  "en-US", // English (US)
  "es-AR", // Spanish (Argentina)
  "es-ES", // Spanish (Spain)
  "es-MX", // Spanish (Mexico)
  "fi-FI", // Finnish
  "fr-CA", // French (Canada)
  "fr-FR", // French (France)
  "he-IL", // Hebrew
  "hi-IN", // Hindi
  "id-ID", // Indonesian
  "it-IT", // Italian
  "ja-JP", // Japanese
  "ko-KR", // Korean
  "ms-MY", // Malay
  "nl-BE", // Dutch (Belgium)
  "nl-NL", // Dutch (Netherlands)
  "no-NO", // Norwegian
  "pl-PL", // Polish
  "pt-BR", // Portuguese (Brazil)
  "pt-PT", // Portuguese (Portugal)
  "ro-RO", // Romanian
  "ru-RU", // Russian
  "sv-SE", // Swedish
  "ta-IN", // Tamil
  "th-TH", // Thai
  "tr-TR", // Turkish
  "uk-UA", // Ukrainian
  "ur-PK", // Urdu
  "vi-VN", // Vietnamese
  "zh-CN", // Chinese (Simplified)
  "zh-HK", // Chinese (Hong Kong)
  "zh-TW", // Chinese (Traditional)
];
export const TRANSLATION_API_URL = "https://api.mymemory.translated.net";

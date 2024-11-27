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
import {
  LanguageProps,
  ProjectOption,
} from "@/@types/translation-editor.types";

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

export const LANGUAGES: LanguageProps[] = [
  { id: "ar-AE", name: "Arabic (UAE)" },
  { id: "ar-SA", name: "Arabic (Saudi Arabia)" },
  { id: "bn-IN", name: "Bengali (India)" },
  { id: "cs-CZ", name: "Czech" },
  { id: "da-DK", name: "Danish" },
  { id: "de-AT", name: "German (Austria)" },
  { id: "de-CH", name: "German (Switzerland)" },
  { id: "de-DE", name: "German (Germany)" },
  { id: "el-GR", name: "Greek" },
  { id: "en-AU", name: "English (Australia)" },
  { id: "en-CA", name: "English (Canada)" },
  { id: "en-GB", name: "English (UK)" },
  { id: "en-IN", name: "English (India)" },
  { id: "en-US", name: "English (US)" },
  { id: "es-AR", name: "Spanish (Argentina)" },
  { id: "es-ES", name: "Spanish (Spain)" },
  { id: "es-MX", name: "Spanish (Mexico)" },
  { id: "fi-FI", name: "Finnish" },
  { id: "fr-CA", name: "French (Canada)" },
  { id: "fr-FR", name: "French (France)" },
  { id: "he-IL", name: "Hebrew" },
  { id: "hi-IN", name: "Hindi" },
  { id: "id-ID", name: "Indonesian" },
  { id: "it-IT", name: "Italian" },
  { id: "ja-JP", name: "Japanese" },
  { id: "ko-KR", name: "Korean" },
  { id: "ms-MY", name: "Malay" },
  { id: "nl-BE", name: "Dutch (Belgium)" },
  { id: "nl-NL", name: "Dutch (Netherlands)" },
  { id: "no-NO", name: "Norwegian" },
  { id: "pl-PL", name: "Polish" },
  { id: "pt-BR", name: "Portuguese (Brazil)" },
  { id: "pt-PT", name: "Portuguese (Portugal)" },
  { id: "ro-RO", name: "Romanian" },
  { id: "ru-RU", name: "Russian" },
  { id: "sv-SE", name: "Swedish" },
  { id: "ta-IN", name: "Tamil" },
  { id: "th-TH", name: "Thai" },
  { id: "tr-TR", name: "Turkish" },
  { id: "uk-UA", name: "Ukrainian" },
  { id: "ur-PK", name: "Urdu" },
  { id: "vi-VN", name: "Vietnamese" },
  { id: "zh-CN", name: "Chinese (Simplified)" },
  { id: "zh-HK", name: "Chinese (Hong Kong)" },
  { id: "zh-TW", name: "Chinese (Traditional)" },
];

export const TRANSLATION_API_URL = "https://api.mymemory.translated.net";

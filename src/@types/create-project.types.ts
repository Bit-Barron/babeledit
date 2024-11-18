interface Language {
  code: string;
  name: string;
}

interface CreateProjectProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface LanguageSelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (language: Language) => void;
}

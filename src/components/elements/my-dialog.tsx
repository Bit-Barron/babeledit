import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface MyDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const TranslationDialog: React.FC<MyDialogProps> = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="p-4">
          <p>{children}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

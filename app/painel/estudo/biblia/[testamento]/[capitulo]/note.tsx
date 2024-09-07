import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { NotebookPen } from "lucide-react";
import { useState } from "react";

interface NoteProps {
  className?: string;
  verse: string;
  chapter: string;
}

export default function Note({ className, verse, chapter }: NoteProps) {
  const [nota1, setNota1] = useState("");
  return (
    <div className={cn("mt-1", className)}>
      <Dialog>
        <DialogTrigger>
          <NotebookPen color={"blue"} size={21} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{chapter}</DialogTitle>
            <DialogDescription>
              <span className="block font-bold mt-2">
                {'"'}
                {verse}
                {'"'}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Label className="font-bold text-md" htmlFor="nota1">
                Nota de texto
              </Label>
              <Textarea
                value={nota1}
                name="nota1"
                className="h-28"
                onChange={(e) => setNota1(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getNote } from "@/server/actions/get.note";
import { setNote } from "@/server/actions/set-note";
import { type Note } from "@prisma/client";
import { NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface NoteProps {
  className?: string;
  verse: { number: number; content: string };
  progress: UserProgress;
}

export default function OpenNote({ className, progress, verse }: NoteProps) {
  const handleSubmit = async () => {
    const { success, error } = await setNote(verse.number, progress, nota);
    if (error) return toast.error(error);
    toast.success(success);
  };
  const [nota, setNota] = useState("");

  useEffect(() => {
    const getUserNote = async () => {
      const userNote: Note | null = await getNote(
        progress.userId,
        verse.number
      );
      if (userNote === null) return;
      if (userNote.content === "") return;
      setNota(userNote.content);
    };
    getUserNote();
  }, []);
  return (
    <div className={cn("mt-1", className)}>
      <Dialog>
        <DialogTrigger>
          <NotebookPen color={"blue"} size={21} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{progress.chapterName}</DialogTitle>
            <DialogDescription>
              <span className="block font-bold mt-2">
                {'"'}
                {verse.content}
                {'"'}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Label className="font-bold text-md" htmlFor="nota">
                Nota de texto
              </Label>
              <Textarea
                value={nota}
                name="nota"
                className="h-28"
                onChange={(e) => setNota(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleSubmit}>Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

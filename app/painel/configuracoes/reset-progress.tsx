"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { deleteProgress } from "@/server/actions/delete-progress";
import { ExtendUser } from "@/types/next-auth";
import { Eraser } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ResetProgressProps {
  user: ExtendUser | undefined;
}

export default function ResetProgress({ user }: ResetProgressProps) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    const deleted = await deleteProgress(user?.id);
    if (deleted.error) {
      return toast.error(deleted.error);
    }
    return toast.success(deleted.success);
  };
  return (
    <div className="w-full flex flex-col gap-2">
      <Label className="mb-4">Deseja resetar seu progresso de estudo?</Label>
      <AlertDialog>
        <AlertDialogTrigger
          className={cn(
            buttonVariants({ variant: "destructive" }),
            "flex items-center gap-2 w-full"
          )}
        >
          <Eraser size={14} />
          Resetar Progresso
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Você vai deletar permanentente
              seu progresso do servidor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

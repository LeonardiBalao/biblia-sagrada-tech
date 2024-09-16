"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Chapter, TESTAMENT } from "@prisma/client";
import LoadingButton from "@/components/structure/loading-button";
import { ArrowUp, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { generateSlug } from "@/server/utils/functions";

interface ChapterComboBoxProps {
  chapters: Chapter[] | undefined;
  testament: TESTAMENT;
}

export function ChapterComboBox({ chapters, testament }: ChapterComboBoxProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    toast.success(`Indo para ${value}`);
    router.push(
      `/biblia/${testament.toLowerCase()}-testamento/${generateSlug(value)}`
    );
  };

  return (
    <div className="flex gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size={"sm"}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-xs"
          >
            {value ? value : "Digite o capitulo"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Digite..." className="h-9 text-xs" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {chapters?.map((c) => (
                  <CommandItem
                    key={c.id}
                    value={c.name}
                    className="text-xs"
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {c.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === c.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <LoadingButton
        variant={"outline"}
        size={"sm"}
        text="Ir"
        icon={<Search />}
        action={handleSubmit}
      />
    </div>
  );
}

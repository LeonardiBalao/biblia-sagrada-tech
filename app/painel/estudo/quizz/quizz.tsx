"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ExtendUser } from "@/types/next-auth";
import { type Quizz } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface BibleProps {
  quizz: Quizz;
  user: ExtendUser;
}

export default function Quizz({ quizz, user }: BibleProps) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    console.log(answer);
  };

  return (
    <Card className="w-full md:max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center font-serif bg-secondary py-2">
          QUIZZ
        </CardTitle>
        <Separator />
        <div className="w-full flex justify-center py-4 items-center">
          <Badge variant={"secondary"} className="text-md shadow-lg">
            {quizz.testament} TESTAMENTO
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="mb-4">
          <h3 className="font-bold font-lg mb-5">{quizz.question}</h3>
          <RadioGroup
            className="pl-2 flex flex-col gap-4 font-semibold"
            onValueChange={(value) => {
              setAnswer(value);
            }}
          >
            {quizz.options.map((o, i) => (
              <div key={i} className="flex items-center space-x-2 ">
                <RadioGroupItem value={o} id={o} />
                <Label
                  htmlFor={o}
                  className={`${
                    o === answer ? "font-bold animate-pulse" : ""
                  } cursor-pointer`}
                >
                  {o}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        {loading ? (
          <Button className="w-full flex gap-4" variant={"outline"}>
            <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
            Carregando...
          </Button>
        ) : (
          <Button className="w-full flex gap-4" onClick={handleSubmit}>
            Responder
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

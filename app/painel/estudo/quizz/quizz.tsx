"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { setQuizzAnswer } from "@/server/actions/set-quizz-answer";
import { ExtendUser } from "@/types/next-auth";
import { type Quizz } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BibleProps {
  quizz: Quizz;
  user: ExtendUser;
}

export default function Quizz({ quizz, user }: BibleProps) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSubmit = async () => {
    setIsAnswered(true);
    setLoading(true);
    const { success, error } = await setQuizzAnswer(answer, quizz, user);
    if (error) {
      setLoading(false);
      return toast.error(error);
    }
    setLoading(false);
    return toast.success(success);
  };

  const handleNext = async () => {
    toast.success("Próxima pergunta");
  };

  useEffect(() => {
    setIsAnswered(false);
  }, []);

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
              setIsAnswered(false);
              setAnswer(value);
            }}
          >
            {quizz.options.map((o, i) => (
              <div key={i} className={`flex items-center space-x-2`}>
                <RadioGroupItem value={o} id={o} />
                <Label
                  htmlFor={o}
                  className={`${
                    o === answer && !isAnswered
                      ? "font-bold animate-pulse text-blue-800"
                      : ""
                  } ${
                    isAnswered && o === quizz.correctAnswer
                      ? "font-bold animate-bounce bg-green-600 text-white p-1 rounded-lg"
                      : ""
                  } ${
                    o === answer && isAnswered && o !== quizz.correctAnswer
                      ? "font-bold bg-red-600 p-1 rounded-lg text-white"
                      : ""
                  } cursor-pointer`}
                >
                  {o}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Badge
          className="text-center flex justify-center"
          variant={`${
            quizz.difficulty === "FACIL"
              ? "outline"
              : quizz.difficulty === "MODERADO"
              ? "secondary"
              : "destructive"
          }`}
        >
          {quizz.difficulty}
        </Badge>
        <Separator />
      </CardContent>
      <CardFooter className="flex flex-col">
        {loading ? (
          <Button className="w-full flex gap-4" variant={"outline"}>
            <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
            Carregando...
          </Button>
        ) : !isAnswered ? (
          <Button className="w-full flex gap-4" onClick={handleSubmit}>
            {answer === "" ? "Selecione uma resposta" : "Responder"}
          </Button>
        ) : (
          <Button className="w-full flex gap-4" onClick={handleNext}>
            Próxima pergunta
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

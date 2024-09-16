import LoadingButton from "@/components/structure/loading-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Verse } from "@prisma/client";

interface VersesTabsProps {
  verses: Verse[];
}

export function VersesTabs({ verses }: VersesTabsProps) {
  return (
    <Tabs defaultValue="1" className="mt-4">
      <TabsList className="flex flex-wrap bg-transparent h-auto">
        {verses.map((v) => (
          <TabsTrigger
            className="w-6 bg-secondary m-1"
            key={v.number}
            value={v.number.toString()}
          >
            {v.number}
          </TabsTrigger>
        ))}
      </TabsList>
      {verses.map((v) => (
        <TabsContent key={v.id} value={v.number.toString()}>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-center">
                <Badge
                  variant={"outline"}
                  className="text-center font-bold text-md mx-auto rounded-full border-2"
                >
                  {v.number}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">{v.content}</CardContent>
            <CardFooter>
              <LoadingButton
                className="w-full"
                text="Voltar para o índice"
                href="/biblia"
                loadingText="Carregando"
              />
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}

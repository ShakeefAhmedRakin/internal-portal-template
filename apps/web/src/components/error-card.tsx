"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heading, Paragraph } from "./ui/typography";

export default function ErrorCard({ refetch }: { refetch?: () => void }) {
  const router = useRouter();

  return (
    <div className="mx-auto flex h-full w-full max-w-md items-center justify-center p-2">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <AlertCircle className="text-destructive h-8 w-8" />
          </div>
          <CardTitle className="text-xl">
            <Heading level="h4">An Error Occurred</Heading>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Paragraph className="text-muted-foreground" size="sm">
            An error occurred while processing your request. Please try again
            later.
          </Paragraph>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => (refetch ? refetch() : router.refresh())}
            className="w-full"
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

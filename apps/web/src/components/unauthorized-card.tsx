"use client";

import { ShieldX } from "lucide-react";
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

export default function UnauthorizedCard() {
  const router = useRouter();

  return (
    <div className="mx-auto flex h-full w-full max-w-md items-center justify-center p-2">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <ShieldX className="text-destructive h-8 w-8" />
          </div>
          <CardTitle className="text-xl">
            <Heading level="h4">Access Denied</Heading>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Paragraph className="text-muted-foreground" size="sm">
            You don't have permission to access this page. Please contact an
            administrator if you believe this is an error.
          </Paragraph>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.back()} className="w-full">
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

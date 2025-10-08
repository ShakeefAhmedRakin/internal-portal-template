"use client";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Session } from "better-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../../../../../components/ui/badge";
import { Spinner } from "../../../../../components/ui/spinner";
import {
  Paragraph,
  paragraphVariants,
} from "../../../../../components/ui/typography";
import { authClient } from "../../../../../lib/auth-client";
import { cn } from "../../../../../lib/utils";

function parseUserAgent(userAgent: string) {
  // Simple parser for common browsers and OS
  let browser = "Unknown Browser";
  let os = "Unknown OS";

  // Detect browser
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browser = "Chrome";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browser = "Safari";
  } else if (userAgent.includes("Firefox")) {
    browser = "Firefox";
  } else if (userAgent.includes("Edg")) {
    browser = "Edge";
  }

  // Detect OS
  if (userAgent.includes("Windows")) {
    os = "Windows";
  } else if (userAgent.includes("Mac OS")) {
    os = "macOS";
  } else if (userAgent.includes("Linux")) {
    os = "Linux";
  } else if (userAgent.includes("Android")) {
    os = "Android";
  } else if (userAgent.includes("iOS") || userAgent.includes("iPhone")) {
    os = "iOS";
  }

  return { browser, os };
}

function formatDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}

function SessionItem({
  session,
  isCurrentSession,
}: {
  session: Session;
  isCurrentSession: boolean;
}) {
  const router = useRouter();
  const [isRevoking, setIsRevoking] = useState(false);
  const { browser, os } = parseUserAgent(session.userAgent || "");

  const handleRevoke = async () => {
    try {
      setIsRevoking(true);
      await authClient.revokeSession({
        token: session.token,
      });
      router.refresh();
      toast.success("Session revoked");
    } catch (error) {
      toast.error("Failed to revoke session");
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <Item
      variant={"outline"}
      size={"sm"}
      className={cn(
        "transition-all",
        isCurrentSession && "border-primary/40 bg-primary/5"
      )}
    >
      <ItemContent className="gap-1.5">
        <div className="flex items-center gap-2">
          <ItemTitle className="!text-sm font-medium">
            {browser} on {os}
          </ItemTitle>
          {isCurrentSession && (
            <Badge variant="secondary" className="px-1.5 !text-[9px]">
              Current
            </Badge>
          )}
        </div>
        <ItemDescription className="space-y-0.5">
          {session.ipAddress && (
            <Paragraph size="xs" className="text-muted-foreground !text-xs">
              IP: {session.ipAddress}
            </Paragraph>
          )}

          {session.updatedAt && (
            <Paragraph size="xs" className="text-muted-foreground !text-xs">
              Last active: {formatDate(new Date(session.updatedAt))}
            </Paragraph>
          )}
        </ItemDescription>
      </ItemContent>
      <ItemActions className="flex items-center justify-end">
        <Button
          variant={isCurrentSession ? "outline" : "destructive"}
          size={"sm"}
          className="text-xs"
          onClick={handleRevoke}
          disabled={isRevoking || isCurrentSession}
          title={
            isCurrentSession
              ? "Cannot revoke current session"
              : "Revoke this session"
          }
        >
          {isRevoking && <Spinner className="mr-1" />}
          {isCurrentSession ? "Active" : "Revoke"}
        </Button>
      </ItemActions>
    </Item>
  );
}

export default function AccountsSessions({
  sessions,
  currentSession,
}: {
  sessions: Session[];
  currentSession: Session;
}) {
  const sortedSessions = [...sessions].sort((a, b) => {
    if (a.id === currentSession.id) return -1;
    if (b.id === currentSession.id) return 1;
    return 0;
  });

  return (
    <div className="w-full space-y-2">
      <div>
        <h2
          className={paragraphVariants({
            size: "sm",
            className: "font-semibold",
          })}
        >
          Active Sessions
        </h2>
        <Paragraph size="xs" className="text-muted-foreground mt-0.5">
          Manage your active sessions across all devices
        </Paragraph>
      </div>
      <div className="flex flex-col gap-2.5">
        {sortedSessions.map((session) => (
          <SessionItem
            key={session.id}
            session={session}
            isCurrentSession={currentSession.id === session.id}
          />
        ))}
      </div>
    </div>
  );
}

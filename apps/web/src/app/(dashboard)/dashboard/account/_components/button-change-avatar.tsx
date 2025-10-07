"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { authClient } from "../../../../../lib/auth-client";

export default function ButtonChangeAvatar() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const normalizeImageToJpegDataUrl = async (
    file: File,
    maxDimension = 512,
    quality = 0.85
  ) => {
    // Use object URL for better compatibility with large files
    const objectUrl = URL.createObjectURL(file);
    try {
      const img = await loadImage(objectUrl);

      const { width, height } = img;
      const scale = Math.min(1, maxDimension / Math.max(width, height));
      const targetW = Math.max(1, Math.round(width * scale));
      const targetH = Math.max(1, Math.round(height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Export to JPEG to standardize format and reduce size
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      return dataUrl;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (!(file.type || "").startsWith("image/")) {
      toast.error("Selected file must be an image.");
      return;
    }

    const maxBytes = 5 * 1024 * 1024; // allow up to 5MB; we'll compress
    if (file.size > maxBytes) {
      toast.error("Original image must be 5MB or smaller.");
      return;
    }

    try {
      setIsLoading(true);
      // Normalize image to a compressed JPEG data URL for consistency
      const dataUrl = await normalizeImageToJpegDataUrl(file, 512, 0.85);
      if (!dataUrl.startsWith("data:image/")) {
        throw new Error("Invalid image output");
      }
      await authClient.updateUser({ image: dataUrl });
      toast.success("Avatar updated");
    } catch (err) {
      toast.error("Failed to update avatar");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChangeAvatar}
        disabled={isLoading}
      />
      <Button onClick={handleSelectClick} disabled={true} aria-busy={isLoading}>
        {isLoading ? <Spinner /> : null}
        Change Avatar
      </Button>
    </>
  );
}

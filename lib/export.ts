"use client";

import { toPng, toJpeg } from "html-to-image";

export async function exportAsImage(
  element: HTMLElement,
  format: "png" | "jpeg" = "png"
): Promise<string> {
  const options = {
    backgroundColor: "#F5E6D3",
    pixelRatio: 2,
    quality: 0.95,
  };

  if (format === "jpeg") {
    return toJpeg(element, options);
  }
  return toPng(element, options);
}

export async function downloadImage(
  element: HTMLElement,
  filename: string = "my-stole-design",
  format: "png" | "jpeg" = "png"
): Promise<void> {
  const dataUrl = await exportAsImage(element, format);
  const link = document.createElement("a");
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  link.click();
}

export async function copyImageToClipboard(element: HTMLElement): Promise<boolean> {
  try {
    const dataUrl = await exportAsImage(element, "png");
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to copy image to clipboard:", error);
    return false;
  }
}

export async function shareImage(element: HTMLElement): Promise<boolean> {
  try {
    const dataUrl = await exportAsImage(element, "png");
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], "my-stole-design.png", { type: "image/png" });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "My Custom Graduation Stole",
        text: "Check out my custom stole design from Expria!",
      });
      return true;
    } else {
      // Fallback to download
      await downloadImage(element, "my-stole-design", "png");
      return true;
    }
  } catch (error) {
    console.error("Failed to share image:", error);
    return false;
  }
}

import type { OrderContact, OrderPayload, StoleConfig } from "@/lib/types";

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function getExportBaseName(designName: string, date = new Date()): string {
  const name = slugify(designName || "stole-design") || "stole-design";
  const datePart = date.toISOString().slice(0, 10);
  return `${name}_${datePart}`;
}

export function buildOrderPayload(
  config: StoleConfig,
  contact: OrderContact,
  reviewAccepted: boolean,
  mockupDisclaimerAccepted: boolean,
): OrderPayload {
  return {
    version: "v1",
    createdAtIso: new Date().toISOString(),
    contact,
    config,
    reviewAccepted,
    mockupDisclaimerAccepted,
  };
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function downloadOrderJson(payload: OrderPayload, baseName: string): void {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  downloadBlob(blob, `${baseName}.json`);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load preview image for export."));
    image.src = src;
  });
}

export async function exportSvgToPng(svgElement: SVGSVGElement, baseName: string): Promise<void> {
  const serializer = new XMLSerializer();
  const cloned = svgElement.cloneNode(true) as SVGSVGElement;

  cloned.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  cloned.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  const serialized = serializer.serializeToString(cloned);
  const encoded = window.btoa(unescape(encodeURIComponent(serialized)));
  const source = `data:image/svg+xml;base64,${encoded}`;

  const image = await loadImage(source);
  const viewBox = svgElement.viewBox.baseVal;
  const width = Math.max(1, Math.floor(viewBox.width || svgElement.clientWidth || 520));
  const height = Math.max(1, Math.floor(viewBox.height || svgElement.clientHeight || 980));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context unavailable for PNG export.");
  }

  context.drawImage(image, 0, 0, width, height);

  const pngBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });

  if (!pngBlob) {
    throw new Error("PNG export failed.");
  }

  downloadBlob(pngBlob, `${baseName}.png`);
}

export function classNames(...tokens: Array<string | false | null | undefined>): string {
  return tokens.filter(Boolean).join(" ");
}

export function toTitleCase(value: string): string {
  if (!value) {
    return "";
  }

  return value
    .split(/[-\s]+/)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 900px)").matches;
}

export function isDesktopPointerDevice(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(pointer:fine)").matches && window.matchMedia("(min-width: 901px)").matches;
}

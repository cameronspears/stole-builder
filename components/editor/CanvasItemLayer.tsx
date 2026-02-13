import { useEffect, useMemo, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { CanvasItem, PatchItem, PatchPresetId } from "@/lib/types";
import { getPatchPreset } from "@/lib/presets";
import { classNames, isDesktopPointerDevice } from "@/lib/utils";

interface CanvasItemLayerProps {
  items: CanvasItem[];
  selectedItemId: string | null;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}

interface DragState {
  id: string;
  offsetX: number;
  offsetY: number;
  svg: SVGSVGElement;
}

function clientToSvg(svg: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
  const rect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;

  const width = rect.width || 1;
  const height = rect.height || 1;

  return {
    x: viewBox.x + ((clientX - rect.left) * viewBox.width) / width,
    y: viewBox.y + ((clientY - rect.top) * viewBox.height) / height,
  };
}

function renderPatchShape(item: PatchItem) {
  const presetId = item.presetId as Exclude<PatchPresetId, "custom-note">;
  const preset = getPatchPreset(presetId);

  switch (preset.id) {
    case "lotus":
      return (
        <g>
          <ellipse cx="0" cy="6" rx="20" ry="12" fill="#f8d6e5" stroke="#b25d89" strokeWidth="2" />
          <path d="M -14 6 C -7 -10 7 -10 14 6" fill={preset.color} stroke="#9f426f" strokeWidth="2" />
          <circle cx="0" cy="2" r="4" fill="#ffd072" />
        </g>
      );
    case "naga":
      return (
        <path
          d="M -18 20 C -12 -14 8 -14 16 -2 C 20 4 14 10 8 11 C 16 16 18 24 9 28 C 2 31 -10 28 -13 20"
          fill={preset.color}
          stroke="#7f1321"
          strokeWidth="3"
        />
      );
    case "temple":
      return (
        <g>
          <polygon points="0,-16 18,-3 -18,-3" fill={preset.color} stroke="#9c7a35" strokeWidth="2" />
          <rect x="-16" y="-3" width="32" height="22" fill="#f2d796" stroke="#9c7a35" strokeWidth="2" />
          <line x1="-8" y1="-3" x2="-8" y2="19" stroke="#9c7a35" strokeWidth="1.5" />
          <line x1="0" y1="-3" x2="0" y2="19" stroke="#9c7a35" strokeWidth="1.5" />
          <line x1="8" y1="-3" x2="8" y2="19" stroke="#9c7a35" strokeWidth="1.5" />
        </g>
      );
    case "crane":
      return (
        <g>
          <path d="M -16 10 C -6 -4 7 -4 18 8 C 11 8 7 10 4 14 C -2 18 -8 18 -16 10" fill={preset.color} stroke="#53799d" strokeWidth="2" />
          <circle cx="9" cy="2" r="2" fill="#d91e2a" />
        </g>
      );
    case "laos-map":
      return (
        <path
          d="M -2 -19 C 6 -13 12 -4 11 8 C 10 20 3 30 -2 33 C -5 29 -10 22 -11 12 C -13 -2 -9 -12 -2 -19"
          fill={preset.color}
          stroke="#8d6a2f"
          strokeWidth="2"
        />
      );
    default:
      return (
        <g>
          <ellipse cx="0" cy="0" rx="15" ry="10" fill="#ebd6ad" stroke="#9a7a43" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#b88635" />
        </g>
      );
  }
}

export function CanvasItemLayer({ items, selectedItemId, onSelect, onMove }: CanvasItemLayerProps) {
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    function onPointerMove(event: PointerEvent) {
      if (!dragRef.current) {
        return;
      }

      const { id, svg, offsetX, offsetY } = dragRef.current;
      const point = clientToSvg(svg, event.clientX, event.clientY);
      onMove(id, point.x - offsetX, point.y - offsetY);
    }

    function onPointerUp() {
      dragRef.current = null;
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onMove]);

  const normalizedItems = useMemo(() => [...items], [items]);

  return (
    <g data-testid="canvas-item-layer">
      {normalizedItems.map((item, index) => {
        const selected = item.id === selectedItemId;

        const pointerDown = (event: ReactPointerEvent<SVGGElement>) => {
          const svg = event.currentTarget.ownerSVGElement;
          if (!svg) {
            return;
          }

          onSelect(item.id);

          if (!isDesktopPointerDevice()) {
            return;
          }

          event.preventDefault();
          const point = clientToSvg(svg, event.clientX, event.clientY);

          dragRef.current = {
            id: item.id,
            svg,
            offsetX: point.x - item.x,
            offsetY: point.y - item.y,
          };
        };

        if (item.type === "text") {
          const lines = item.content.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 6);
          const fontSize = 28 * item.fontScale;

          return (
            <g
              key={item.id}
              transform={`translate(${item.x} ${item.y}) rotate(${item.rotationDeg})`}
              onPointerDown={pointerDown}
              onClick={(event) => event.stopPropagation()}
              className={classNames("sb-canvas-item", selected && "is-active")}
              data-testid={`canvas-text-${index}`}
            >
              {selected ? <rect x="-70" y="-28" width="140" height="56" rx="6" className="sb-selection-box" /> : null}
              <text
                fill={item.colorHex}
                fontWeight="700"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize={fontSize}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {lines.length === 0 ? <tspan x="0" y="0">Text</tspan> : null}
                {lines.map((line, lineIndex) => (
                  <tspan key={`${item.id}-${lineIndex}`} x="0" y={(lineIndex - (lines.length - 1) / 2) * (fontSize * 1.06)}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        }

        return (
          <g
            key={item.id}
            transform={`translate(${item.x} ${item.y}) rotate(${item.rotationDeg}) scale(${item.scale})`}
            onPointerDown={pointerDown}
            onClick={(event) => event.stopPropagation()}
            className={classNames("sb-canvas-item", selected && "is-active")}
            data-testid={`canvas-patch-${index}`}
          >
            {selected ? <rect x="-34" y="-36" width="68" height="72" rx="6" className="sb-selection-box" /> : null}
            {renderPatchShape(item)}
          </g>
        );
      })}
    </g>
  );
}

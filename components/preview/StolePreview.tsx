import { CanvasItemLayer } from "@/components/editor/CanvasItemLayer";
import { StoleBeads } from "@/components/preview/StoleBeads";
import { StoleSilhouette } from "@/components/preview/StoleSilhouette";
import { PREVIEW_VIEWBOX } from "@/lib/geometry";
import { useStoleStore } from "@/lib/store";

import type { MutableRefObject } from "react";

interface StolePreviewProps {
  svgRef: MutableRefObject<SVGSVGElement | null>;
}

export function StolePreview({ svgRef }: StolePreviewProps) {
  const config = useStoleStore((state) => state.config);
  const selectedItemId = useStoleStore((state) => state.selectedItemId);
  const setSelectedItemId = useStoleStore((state) => state.setSelectedItemId);
  const moveCanvasItem = useStoleStore((state) => state.moveCanvasItem);

  return (
    <section className="sb-preview" aria-label="Stole preview">
      <div className="sb-preview-head">
        <h2>Live Mockup</h2>
        <p>Drag text and patch items on desktop. On mobile, select an item and use sliders.</p>
      </div>

      <div className="sb-preview-stage">
        <svg
          ref={(node) => {
            svgRef.current = node;
          }}
          viewBox={`0 0 ${PREVIEW_VIEWBOX.width} ${PREVIEW_VIEWBOX.height}`}
          className="sb-stole-canvas"
          role="img"
          aria-label="Stole design mockup"
          onClick={() => setSelectedItemId(null)}
        >
          <StoleSilhouette
            baseColorHex={config.baseColorHex}
            trimMetal={config.trimMetal}
            fabricPresetLeft={config.fabricPresetLeft}
            fabricPresetRight={config.fabricPresetRight}
          />

          <StoleBeads enabled={config.fringeEnabled} metal={config.trimMetal} />

          <CanvasItemLayer
            items={config.canvasItems}
            selectedItemId={selectedItemId}
            onSelect={setSelectedItemId}
            onMove={moveCanvasItem}
          />
        </svg>
      </div>
    </section>
  );
}

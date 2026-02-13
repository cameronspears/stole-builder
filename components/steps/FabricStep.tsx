import { useState } from "react";
import { FABRIC_PRESETS } from "@/lib/presets";
import { useStoleStore } from "@/lib/store";
import { classNames } from "@/lib/utils";

export function FabricStep() {
  const config = useStoleStore((state) => state.config);
  const setConfigPartial = useStoleStore((state) => state.setConfigPartial);
  const [mirrorSides, setMirrorSides] = useState(true);

  return (
    <div className="sb-step-body">
      <label className="sb-toggle-row" htmlFor="fabric-mirror-toggle">
        <span>Use same fabric on both sides</span>
        <input
          id="fabric-mirror-toggle"
          type="checkbox"
          checked={mirrorSides}
          onChange={(event) => setMirrorSides(event.target.checked)}
        />
      </label>

      <section>
        <h3 className="sb-section-title">Left Panel</h3>
        <div className="sb-card-grid">
          {FABRIC_PRESETS.map((preset) => (
            <button
              key={`left-${preset.id}`}
              type="button"
              className={classNames("sb-card", config.fabricPresetLeft === preset.id && "is-active")}
              onClick={() =>
                setConfigPartial({
                  fabricPresetLeft: preset.id,
                  ...(mirrorSides ? { fabricPresetRight: preset.id } : {}),
                })
              }
              data-testid={`fabric-left-${preset.id}`}
            >
              <strong>{preset.label}</strong>
              <span>{preset.motif}</span>
            </button>
          ))}
        </div>
      </section>

      {!mirrorSides ? (
        <section>
          <h3 className="sb-section-title">Right Panel</h3>
          <div className="sb-card-grid">
            {FABRIC_PRESETS.map((preset) => (
              <button
                key={`right-${preset.id}`}
                type="button"
                className={classNames("sb-card", config.fabricPresetRight === preset.id && "is-active")}
                onClick={() => setConfigPartial({ fabricPresetRight: preset.id })}
                data-testid={`fabric-right-${preset.id}`}
              >
                <strong>{preset.label}</strong>
                <span>{preset.motif}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

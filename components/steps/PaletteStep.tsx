import { ColorGrid } from "@/components/ui/ColorGrid";
import { CORE_COLORS } from "@/lib/presets";
import { useStoleStore } from "@/lib/store";
import { classNames } from "@/lib/utils";

export function PaletteStep() {
  const config = useStoleStore((state) => state.config);
  const setConfigPartial = useStoleStore((state) => state.setConfigPartial);

  return (
    <div className="sb-step-body">
      <label className="sb-field">
        <span>Design Name</span>
        <input
          value={config.designName}
          onChange={(event) => setConfigPartial({ designName: event.target.value.slice(0, 48) })}
          placeholder="e.g. Class of 2026"
          data-testid="design-name-input"
        />
      </label>

      <section>
        <h3 className="sb-section-title">Satin Color</h3>
        <ColorGrid
          colors={CORE_COLORS}
          selectedHex={config.baseColorHex}
          onSelect={(hex) => setConfigPartial({ baseColorHex: hex })}
          testIdPrefix="base-color"
        />
      </section>

      <section>
        <h3 className="sb-section-title">Trim Metal</h3>
        <div className="sb-chip-row">
          {(["gold", "silver"] as const).map((metal) => (
            <button
              key={metal}
              type="button"
              className={classNames("sb-chip", config.trimMetal === metal && "is-active")}
              onClick={() => setConfigPartial({ trimMetal: metal })}
              data-testid={`trim-metal-${metal}`}
            >
              {metal}
            </button>
          ))}
        </div>
      </section>

      <details className="sb-advanced">
        <summary>Advanced</summary>
        <label className="sb-toggle-row" htmlFor="fringe-toggle">
          <span>Tip Fringe</span>
          <input
            id="fringe-toggle"
            type="checkbox"
            checked={config.fringeEnabled}
            onChange={(event) => setConfigPartial({ fringeEnabled: event.target.checked })}
            data-testid="fringe-toggle"
          />
        </label>
      </details>
    </div>
  );
}

import type { ColorPreset } from "@/lib/presets";
import { classNames } from "@/lib/utils";

interface ColorGridProps {
  colors: ColorPreset[];
  selectedHex: string;
  onSelect: (hex: string) => void;
  testIdPrefix: string;
}

export function ColorGrid({ colors, selectedHex, onSelect, testIdPrefix }: ColorGridProps) {
  return (
    <ul className="sb-color-grid">
      {colors.map((color) => (
        <li key={color.id}>
          <button
            type="button"
            title={color.label}
            aria-label={color.label}
            className={classNames("sb-color-dot", color.hex === selectedHex && "is-active")}
            style={{ backgroundColor: color.hex }}
            onClick={() => onSelect(color.hex)}
            data-testid={`${testIdPrefix}-${color.id}`}
          />
        </li>
      ))}
    </ul>
  );
}

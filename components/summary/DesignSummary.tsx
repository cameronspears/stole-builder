import { FABRIC_PRESETS } from "@/lib/presets";
import { useStoleStore } from "@/lib/store";
import { toTitleCase } from "@/lib/utils";

export function DesignSummary() {
  const config = useStoleStore((state) => state.config);
  const contact = useStoleStore((state) => state.contact);

  const textCount = config.canvasItems.filter((item) => item.type === "text").length;
  const patchCount = config.canvasItems.filter((item) => item.type === "patch").length;

  const leftFabric = FABRIC_PRESETS.find((preset) => preset.id === config.fabricPresetLeft)?.label ?? config.fabricPresetLeft;
  const rightFabric = FABRIC_PRESETS.find((preset) => preset.id === config.fabricPresetRight)?.label ?? config.fabricPresetRight;

  return (
    <aside className="sb-summary" aria-label="Design summary">
      <h3>Order Summary</h3>
      <ul>
        <li>
          <strong>Design</strong>
          <span>{config.designName || "Untitled"}</span>
        </li>
        <li>
          <strong>Satin</strong>
          <span>{config.baseColorHex}</span>
        </li>
        <li>
          <strong>Trim</strong>
          <span>{toTitleCase(config.trimMetal)}</span>
        </li>
        <li>
          <strong>Fabric</strong>
          <span>{leftFabric} / {rightFabric}</span>
        </li>
        <li>
          <strong>Text</strong>
          <span>{textCount} item{textCount === 1 ? "" : "s"}</span>
        </li>
        <li>
          <strong>Patches</strong>
          <span>{patchCount} item{patchCount === 1 ? "" : "s"}</span>
        </li>
        <li>
          <strong>Fringe</strong>
          <span>{config.fringeEnabled ? `${toTitleCase(config.trimMetal)} fringe` : "Off"}</span>
        </li>
      </ul>

      <div className="sb-summary-contact">
        <h4>Contact</h4>
        <p>{contact.fullName || "Name pending"}</p>
        <p>{contact.email || "Email pending"}</p>
      </div>
    </aside>
  );
}

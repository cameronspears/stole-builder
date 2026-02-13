import { buildOrderPayload, getExportBaseName } from "@/lib/export-order";
import { DEFAULT_CONFIG, DEFAULT_CONTACT } from "@/lib/store";

describe("export-order", () => {
  it("builds stable export base filenames", () => {
    const date = new Date("2026-02-13T18:30:00.000Z");
    const base = getExportBaseName(" Class of 2026 - Stole #1 ", date);

    expect(base).toBe("class-of-2026-stole-1_2026-02-13");
  });

  it("builds order payload with v1 contract", () => {
    const payload = buildOrderPayload(DEFAULT_CONFIG, DEFAULT_CONTACT, true, true);

    expect(payload.version).toBe("v1");
    expect(payload.config.tipStyle).toBe("pointed");
    expect(payload.reviewAccepted).toBe(true);
    expect(payload.mockupDisclaimerAccepted).toBe(true);
    expect(payload.createdAtIso).toContain("T");
  });
});

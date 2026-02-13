import { DEFAULT_CONFIG, resetStoreForTests, useStoleStore } from "@/lib/store";

describe("store", () => {
  beforeEach(() => {
    resetStoreForTests();
  });

  it("updates top-level config fields", () => {
    useStoleStore.getState().setConfigPartial({ baseColorHex: "#ffffff" });

    expect(useStoleStore.getState().config.baseColorHex).toBe("#ffffff");
  });

  it("adds text items and supports undo/redo", () => {
    const store = useStoleStore.getState();

    store.addTextItem("Class of 2026", "#f0d080");
    expect(useStoleStore.getState().config.canvasItems).toHaveLength(1);

    useStoleStore.getState().undo();
    expect(useStoleStore.getState().config.canvasItems).toHaveLength(0);

    useStoleStore.getState().redo();
    expect(useStoleStore.getState().config.canvasItems).toHaveLength(1);
  });

  it("clamps item rotation and scale during updates", () => {
    const store = useStoleStore.getState();
    store.addTextItem("Hello");

    const id = useStoleStore.getState().config.canvasItems[0]?.id;
    expect(id).toBeTruthy();

    if (!id) {
      return;
    }

    useStoleStore.getState().updateCanvasItem(id, (item) =>
      item.type === "text"
        ? {
            ...item,
            rotationDeg: 999,
            fontScale: 9,
          }
        : item,
    );

    const updated = useStoleStore.getState().config.canvasItems[0];

    if (updated.type === "text") {
      expect(updated.rotationDeg).toBe(180);
      expect(updated.fontScale).toBeLessThanOrEqual(2);
    }
  });

  it("resets config to default", () => {
    useStoleStore.getState().setConfigPartial({ trimMetal: "silver", fringeEnabled: false });
    useStoleStore.getState().setContactPartial({ fullName: "Cam" });

    useStoleStore.getState().reset();

    expect(useStoleStore.getState().config).toEqual(DEFAULT_CONFIG);
    expect(useStoleStore.getState().contact.fullName).toBe("");
  });
});

import { expect, test } from "@playwright/test";

test("wizard flow is functional and order review gates download", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Build Your Stole Mockup" })).toBeVisible();
  await expect(page.getByTestId("step-palette")).toBeVisible();

  await page.getByTestId("base-color-red").click();
  await page.getByTestId("trim-metal-silver").click();

  await page.getByTestId("step-fabric").click();
  await page.getByLabel("Use same fabric on both sides").uncheck();
  await page.getByTestId("fabric-left-naga-midnight").click();
  await page.getByTestId("fabric-right-dokmai-gold").click();

  await page.getByTestId("step-text").click();
  await page.getByTestId("new-text-input").fill("University of North Florida\nClass of 2026");
  await page.getByTestId("add-text-button").click();
  await expect(page.getByTestId("canvas-text-0")).toBeVisible();

  await page.getByTestId("rotation-slider").fill("-90");

  await page.getByTestId("step-patches").click();
  await page.getByTestId("add-patch-lotus").click();
  await expect(page.getByTestId("patch-item-0")).toBeVisible();
  await page.getByTestId("custom-patch-notes").fill("Please discuss custom lotus and naga details.");

  await page.getByTestId("undo-button").click();
  await page.getByTestId("redo-button").click();

  await page.getByTestId("step-review").click();
  const downloadButton = page.getByTestId("download-order");
  await expect(downloadButton).toBeDisabled();

  await page.getByLabel("Full Name").fill("Cam Example");
  await page.getByLabel("Email").fill("cam@example.com");
  await page.getByLabel("Phone").fill("555-555-5555");
  await page.getByLabel("School").fill("Laguna Creek High School");
  await page.getByLabel("Graduation Year").fill("2026");
  await page.getByLabel("Event Date").fill("2026-05-25");

  await page.getByTestId("review-accepted").check();
  await page.getByTestId("disclaimer-accepted").check();

  await expect(downloadButton).toBeEnabled();
});

test("captures baseline visual scenarios", async ({ page }, testInfo) => {
  await page.goto("/");

  await page.screenshot({ path: testInfo.outputPath("01-default.png"), fullPage: true });

  await page.getByTestId("base-color-emerald").click();
  await page.getByTestId("trim-metal-gold").click();
  await page.screenshot({ path: testInfo.outputPath("02-gold-palette.png"), fullPage: true });

  await page.getByTestId("step-fabric").click();
  await page.getByLabel("Use same fabric on both sides").uncheck();
  await page.getByTestId("fabric-left-khem-indigo").click();
  await page.getByTestId("fabric-right-naga-ruby").click();
  await page.screenshot({ path: testInfo.outputPath("03-dual-fabric.png"), fullPage: true });

  await page.getByTestId("step-text").click();
  await page.getByTestId("new-text-input").fill("Class of 2026");
  await page.getByTestId("add-text-button").click();
  await page.screenshot({ path: testInfo.outputPath("04-with-text.png"), fullPage: true });

  await page.getByTestId("step-patches").click();
  await page.getByTestId("add-patch-naga").click();
  await page.screenshot({ path: testInfo.outputPath("05-with-patch.png"), fullPage: true });

  await page.getByTestId("step-palette").click();
  await page.getByText("Advanced").first().click();
  await page.getByTestId("fringe-toggle").uncheck();
  await page.screenshot({ path: testInfo.outputPath("06-fringe-off.png"), fullPage: true });
});

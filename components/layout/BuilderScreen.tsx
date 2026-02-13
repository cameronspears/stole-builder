"use client";

import { useEffect, useMemo, useRef } from "react";
import { ItemInspector } from "@/components/editor/ItemInspector";
import { StolePreview } from "@/components/preview/StolePreview";
import { FabricStep } from "@/components/steps/FabricStep";
import { PaletteStep } from "@/components/steps/PaletteStep";
import { PatchesStep } from "@/components/steps/PatchesStep";
import { ReviewStep } from "@/components/steps/ReviewStep";
import { TextStep } from "@/components/steps/TextStep";
import { HistoryToolbar } from "@/components/tools/HistoryToolbar";
import { WIZARD_STEPS } from "@/lib/presets";
import { useStoleStore } from "@/lib/store";
import type { WizardStep } from "@/lib/types";
import { classNames } from "@/lib/utils";

const DRAFT_KEY = "stole-builder-draft-v1";

function StepBody({ step, svgElement }: { step: WizardStep; svgElement: SVGSVGElement | null }) {
  if (step === "palette") {
    return <PaletteStep />;
  }

  if (step === "fabric") {
    return <FabricStep />;
  }

  if (step === "text") {
    return <TextStep />;
  }

  if (step === "patches") {
    return <PatchesStep />;
  }

  return <ReviewStep svgElement={svgElement} />;
}

export function BuilderScreen() {
  const config = useStoleStore((state) => state.config);
  const step = useStoleStore((state) => state.step);
  const contact = useStoleStore((state) => state.contact);
  const pastCount = useStoleStore((state) => state.past.length);
  const futureCount = useStoleStore((state) => state.future.length);
  const setStep = useStoleStore((state) => state.setStep);
  const goNextStep = useStoleStore((state) => state.goNextStep);
  const goPrevStep = useStoleStore((state) => state.goPrevStep);
  const undo = useStoleStore((state) => state.undo);
  const redo = useStoleStore((state) => state.redo);
  const reset = useStoleStore((state) => state.reset);
  const applyDraft = useStoleStore((state) => state.applyDraft);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const loadedDraftRef = useRef(false);

  const currentStep = useMemo(() => WIZARD_STEPS.find((entry) => entry.id === step) ?? WIZARD_STEPS[0], [step]);
  const stepIndex = WIZARD_STEPS.findIndex((entry) => entry.id === step);

  useEffect(() => {
    if (typeof window === "undefined" || loadedDraftRef.current) {
      return;
    }

    const raw = window.localStorage.getItem(DRAFT_KEY);
    loadedDraftRef.current = true;

    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as { config?: typeof config; contact?: typeof contact };
      if (parsed.config && parsed.contact) {
        applyDraft({ config: parsed.config, contact: parsed.contact });
      }
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    }
  }, [applyDraft, config, contact]);

  useEffect(() => {
    if (typeof window === "undefined" || !loadedDraftRef.current) {
      return;
    }

    const snapshot = JSON.stringify({ config, contact });
    window.localStorage.setItem(DRAFT_KEY, snapshot);
  }, [config, contact]);

  return (
    <main className="sb-root">
      <section className="sb-shell">
        <section className="sb-controls-column" aria-label="Builder steps">
          <header className="sb-controls-head">
            <h1>Build Your Stole Mockup</h1>
            <p>Simple steps for a clean design preview and order-ready download.</p>
          </header>

          <ol className="sb-step-progress" aria-label="Builder progress">
            {WIZARD_STEPS.map((entry, index) => (
              <li key={entry.id}>
                <button
                  type="button"
                  className={classNames("sb-step-chip", entry.id === step && "is-active")}
                  onClick={() => setStep(entry.id)}
                  data-testid={`step-${entry.id}`}
                >
                  <b>{index + 1}</b>
                  <span>{entry.label}</span>
                </button>
              </li>
            ))}
          </ol>

          <HistoryToolbar
            canUndo={pastCount > 0}
            canRedo={futureCount > 0}
            onUndo={undo}
            onRedo={redo}
            onReset={reset}
          />

          <section className="sb-step-card" aria-label={`${currentStep.label} step`}>
            <h2>{currentStep.label}</h2>
            <p>{currentStep.copy}</p>
            <StepBody step={step} svgElement={svgRef.current} />
          </section>

          <footer className="sb-step-nav">
            <button type="button" className="sb-secondary-button" onClick={goPrevStep} disabled={stepIndex <= 0}>
              Back
            </button>
            <button
              type="button"
              className="sb-primary-button"
              onClick={goNextStep}
              disabled={stepIndex >= WIZARD_STEPS.length - 1}
              data-testid="next-step-button"
            >
              Continue
            </button>
          </footer>
        </section>

        <section className="sb-preview-column">
          <StolePreview svgRef={svgRef} />
          {step === "text" || step === "patches" ? <ItemInspector /> : null}
        </section>
      </section>
    </main>
  );
}

import { useMemo, useState } from "react";
import { DesignSummary } from "@/components/summary/DesignSummary";
import { buildOrderPayload, downloadOrderJson, exportSvgToPng, getExportBaseName } from "@/lib/export-order";
import { useStoleStore } from "@/lib/store";

interface ReviewStepProps {
  svgElement: SVGSVGElement | null;
}

export function ReviewStep({ svgElement }: ReviewStepProps) {
  const config = useStoleStore((state) => state.config);
  const contact = useStoleStore((state) => state.contact);
  const reviewAccepted = useStoleStore((state) => state.reviewAccepted);
  const mockupDisclaimerAccepted = useStoleStore((state) => state.mockupDisclaimerAccepted);
  const setContactPartial = useStoleStore((state) => state.setContactPartial);
  const setReviewAccepted = useStoleStore((state) => state.setReviewAccepted);
  const setMockupDisclaimerAccepted = useStoleStore((state) => state.setMockupDisclaimerAccepted);

  const [exportError, setExportError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const hasRequiredFields = useMemo(() => {
    const requiredValues = [
      contact.fullName,
      contact.email,
      contact.phone,
      contact.school,
      contact.gradYear,
      contact.eventDate,
    ];

    if (requiredValues.some((value) => !value.trim())) {
      return false;
    }

    return /^\S+@\S+\.\S+$/.test(contact.email.trim());
  }, [contact]);

  const canExport = hasRequiredFields && reviewAccepted && mockupDisclaimerAccepted && !exporting;

  async function handleDownload() {
    if (!svgElement) {
      setExportError("Preview unavailable. Refresh and try again.");
      return;
    }

    if (!canExport) {
      setExportError("Complete required fields and review checkboxes before download.");
      return;
    }

    setExportError(null);
    setExporting(true);

    try {
      const baseName = getExportBaseName(config.designName);
      const payload = buildOrderPayload(config, contact, reviewAccepted, mockupDisclaimerAccepted);

      await exportSvgToPng(svgElement, baseName);
      downloadOrderJson(payload, baseName);
    } catch (error) {
      setExportError(error instanceof Error ? error.message : "Export failed.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="sb-step-body">
      <section className="sb-review-grid">
        <label className="sb-field">
          <span>Full Name</span>
          <input
            value={contact.fullName}
            onChange={(event) => setContactPartial({ fullName: event.target.value.slice(0, 70) })}
            required
          />
        </label>
        <label className="sb-field">
          <span>Email</span>
          <input
            type="email"
            value={contact.email}
            onChange={(event) => setContactPartial({ email: event.target.value.slice(0, 120) })}
            required
          />
        </label>
        <label className="sb-field">
          <span>Phone</span>
          <input
            value={contact.phone}
            onChange={(event) => setContactPartial({ phone: event.target.value.slice(0, 40) })}
            required
          />
        </label>
        <label className="sb-field">
          <span>School</span>
          <input
            value={contact.school}
            onChange={(event) => setContactPartial({ school: event.target.value.slice(0, 120) })}
            required
          />
        </label>
        <label className="sb-field">
          <span>Graduation Year</span>
          <input
            value={contact.gradYear}
            onChange={(event) => setContactPartial({ gradYear: event.target.value.slice(0, 10) })}
            required
          />
        </label>
        <label className="sb-field">
          <span>Event Date</span>
          <input
            type="date"
            value={contact.eventDate}
            onChange={(event) => setContactPartial({ eventDate: event.target.value })}
            required
          />
        </label>
      </section>

      <label className="sb-toggle-row" htmlFor="review-check">
        <span>I reviewed placement, spelling, and colors.</span>
        <input
          id="review-check"
          type="checkbox"
          checked={reviewAccepted}
          onChange={(event) => setReviewAccepted(event.target.checked)}
          data-testid="review-accepted"
        />
      </label>

      <label className="sb-toggle-row" htmlFor="disclaimer-check">
        <span>I understand this is a representative mockup and final details are confirmed manually.</span>
        <input
          id="disclaimer-check"
          type="checkbox"
          checked={mockupDisclaimerAccepted}
          onChange={(event) => setMockupDisclaimerAccepted(event.target.checked)}
          data-testid="disclaimer-accepted"
        />
      </label>

      <button
        type="button"
        className="sb-primary-button"
        disabled={!canExport}
        onClick={handleDownload}
        data-testid="download-order"
      >
        {exporting ? "Preparing files..." : "Download PNG + JSON"}
      </button>

      {exportError ? <p className="sb-error">{exportError}</p> : null}

      <DesignSummary />
    </div>
  );
}

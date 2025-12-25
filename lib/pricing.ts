import type { StoleConfig, PricingBreakdown } from "./types";
import { PRICING, getTrimStyleName } from "./constants";

export function calculateTotal(config: StoleConfig): PricingBreakdown {
  const basePrice = PRICING.basePrice[config.lengthInches];
  const beadsPrice = config.beadsEnabled ? PRICING.beadsAddon : 0;
  const trimPrice = PRICING.trimModifiers[config.trimStyleId] ?? 0;
  const embroideryPrice = config.embroideryText.trim() ? PRICING.embroideryBase : 0;

  const lineItems = [
    { label: `${config.lengthInches}" Stole Base`, price: basePrice },
  ];

  if (trimPrice > 0) {
    lineItems.push({
      label: `${getTrimStyleName(config.trimStyleId)} Trim Upgrade`,
      price: trimPrice,
    });
  }

  if (beadsPrice > 0) {
    lineItems.push({ label: "Beading/Fringe", price: beadsPrice });
  }

  if (embroideryPrice > 0) {
    lineItems.push({ label: "Embroidery", price: embroideryPrice });
  }

  const subtotal = basePrice + beadsPrice + trimPrice + embroideryPrice;

  return {
    lineItems,
    subtotal,
    total: subtotal,
  };
}

import { useEffect, useState } from 'react';
import { X, Sparkles, Copy, Check } from 'lucide-react';
import { getActiveFestivalOffer } from '@/data/festivalOffers';

export function FestivalOfferBanner() {
  const [offer] = useState(() => getActiveFestivalOffer());
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!offer) return;
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, [offer]);

  if (!offer || !visible) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(offer.couponCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/60 p-4" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-sm rounded-xl2 bg-white p-6 text-center shadow-2xl">
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-charcoal-400 hover:bg-rice-100 hover:text-charcoal-600"
          aria-label="Close offer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-500">
          <Sparkles className="h-7 w-7" />
        </div>

        <h3 className="mt-4 font-serif text-xl font-bold text-charcoal-700">{offer.bannerTitle}</h3>
        <p className="mt-2 text-sm text-charcoal-500">{offer.bannerMessage}</p>

        <button
          onClick={handleCopy}
          className="mt-5 flex w-full items-center justify-between gap-3 rounded-xl2 border-2 border-dashed border-field-400 bg-field-50 px-4 py-3 text-left transition-colors hover:bg-field-100"
        >
          <span className="font-serif text-lg font-bold tracking-wide text-field-700">{offer.couponCode}</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-field-600">
            {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
          </span>
        </button>

        <p className="mt-3 text-xs text-charcoal-400">Apply this code at checkout to get {offer.discountPercent}% off.</p>

        <button onClick={() => setVisible(false)} className="btn-primary mt-5 w-full">
          Shop Now
        </button>
      </div>
    </div>
  );
}

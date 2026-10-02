export interface FestivalOffer {
  id: string;
  name: string;
  couponCode: string;
  discountPercent: number;
  startDate: string; // YYYY-MM-DD, inclusive
  endDate: string;   // YYYY-MM-DD, inclusive
  enabled: boolean;
  bannerTitle: string;
  bannerMessage: string;
}

// To run a festival offer: set `enabled: true` and make sure today's date falls
// within startDate/endDate. To switch festivals, just flip `enabled` flags —
// only one offer should be active/enabled for a given date range at a time.
export const festivalOffers: FestivalOffer[] = [
  {
    id: 'janmashtami',
    name: 'Shri Krishna Janmashtami',
    couponCode: 'JANMASHTAMI10',
    discountPercent: 10,
    startDate: '2026-09-05',
    endDate: '2026-09-07',
    enabled: true,
    bannerTitle: 'Shri Krishna Janmashtami Offer!',
    bannerMessage: 'Celebrate with us — get 10% off your order.',
  },
  {
    id: 'ganesh-utsav',
    name: 'Ganesh Utsav',
    couponCode: 'GANESHUTSAV10',
    discountPercent: 10,
    startDate: '2026-09-14',
    endDate: '2026-09-24',
    enabled: true,
    bannerTitle: 'Ganesh Utsav Offer!',
    bannerMessage: 'Ganpati Bappa Morya — get 10% off your order.',
  },
  {
    id: 'navratri-dussehra',
    name: 'Navratri & Dussehra',
    couponCode: 'NAVRATRI10',
    discountPercent: 10,
    startDate: '2026-10-11',
    endDate: '2026-10-20',
    enabled: true,
    bannerTitle: 'Navratri & Dussehra Offer!',
    bannerMessage: 'Shubh Navratri — get 10% off your order.',
  },
  {
    id: 'diwali',
    name: 'Diwali',
    couponCode: 'DIWALI10',
    discountPercent: 10,
    startDate: '2026-11-01',
    endDate: '2026-11-15',
    enabled: true,
    bannerTitle: 'Diwali Offer!',
    bannerMessage: 'Happy Diwali — get 10% off your order.',
  },
];

function todayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isOfferLive(offer: FestivalOffer): boolean {
  const today = todayStr();
  return offer.enabled && today >= offer.startDate && today <= offer.endDate;
}

export function getActiveFestivalOffer(): FestivalOffer | null {
  return festivalOffers.find(isOfferLive) ?? null;
}

export function getOfferByCouponCode(code: string): FestivalOffer | null {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return null;
  const offer = festivalOffers.find(f => f.couponCode.toUpperCase() === normalized);
  if (!offer || !isOfferLive(offer)) return null;
  return offer;
}

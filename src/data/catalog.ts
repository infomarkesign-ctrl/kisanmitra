export type CategorySlug =
  | 'rice-rice-products'
  | 'cereals-grains'
  | 'pulses-dals'
  | 'oilseeds-cash-crops'
  | 'fruits-vegetables'
  | 'processed-food-products'
  | 'dry-fruits';

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  shortDesc: string;
  description: string;
  image: string;
  gallery: string[];
  packSizes: string[];
  price: number;
  unit: string;
  origin: string;
  specs: { label: string; value: string }[];
  featured?: boolean;
  rating?: number;
}

/** Deterministic per-product order-quantity cap, mixed between 5 and 10. */
export function getMaxQty(productId: string): number {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = (hash * 31 + productId.charCodeAt(i)) >>> 0;
  }
  return 5 + (hash % 6);
}

export interface Testimonial {
  name: string;
  business: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
}

export const categories: Category[] = [
  {
    slug: 'rice-rice-products',
    name: 'Rice & Rice Products',
    shortName: 'Rice & Rice Products',
    description: 'Premium basmati, non-basmati, parboiled, and specialty rice varieties sourced from the rice bowl of Maharashtra.',
    image: 'https://images.pexels.com/photos/1306548/pexels-photo-1306548.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Wheat',
  },
  {
    slug: 'cereals-grains',
    name: 'Cereals & Grains',
    shortName: 'Cereals & Grains',
    description: 'Wholesome wheat, maize, millets, oats, and barley — nutrition-rich grains for food and feed industries.',
    image: 'https://images.pexels.com/photos/12873375/pexels-photo-12873375.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Sprout',
  },
  {
    slug: 'pulses-dals',
    name: 'Pulses & Dals',
    shortName: 'Pulses & Dals',
    description: 'High-protein lentils, dals, and beans — cleaned, graded, and packed to export-grade standards.',
    image: 'https://images.pexels.com/photos/34940646/pexels-photo-34940646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Bean',
  },
  {
    slug: 'oilseeds-cash-crops',
    name: 'Oilseeds & Cash Crops',
    shortName: 'Oilseeds & Cash Crops',
    description: 'Soybean, groundnut, mustard, sugar, and other high-value oilseeds and cash crops.',
    image: 'https://images.pexels.com/photos/9940116/pexels-photo-9940116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Droplet',
  },
  {
    slug: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    shortName: 'Fruits & Vegetables',
    description: 'Fresh, dehydrated, and frozen fruits and vegetables — farm-fresh quality with extended shelf life.',
    image: 'https://images.pexels.com/photos/11669641/pexels-photo-11669641.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Apple',
  },
  {
    slug: 'processed-food-products',
    name: 'Processed Food Products',
    shortName: 'Processed Food',
    description: 'Jams, pickles, masalas, and coffee blends — authentic Indian flavours crafted with quality ingredients.',
    image: 'https://images.pexels.com/photos/31280796/pexels-photo-31280796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'CookingPot',
  },
  {
    slug: 'dry-fruits',
    name: 'Dry Fruits',
    shortName: 'Dry Fruits',
    description: 'Premium almonds, cashews, raisins, figs, dates, and pistachios — hand-selected for quality and freshness.',
    image: 'https://images.pexels.com/photos/37270167/pexels-photo-37270167.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Nut',
  },
];

const riceImg = 'https://images.pexels.com/photos/7665442/pexels-photo-7665442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const riceImg2 = 'https://images.pexels.com/photos/18328392/pexels-photo-18328392.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const riceImg3 = 'https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const wheatImg = 'https://images.pexels.com/photos/12873375/pexels-photo-12873375.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const cornImg = 'https://images.pexels.com/photos/35193657/pexels-photo-35193657.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const pulsesImg = 'https://images.pexels.com/photos/34940646/pexels-photo-34940646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const lentilsImg = 'https://images.pexels.com/photos/14177776/pexels-photo-14177776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const beansImg = 'https://images.pexels.com/photos/6805779/pexels-photo-6805779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const soybeanImg = 'https://images.pexels.com/photos/9940116/pexels-photo-9940116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const peanutImg = 'https://images.pexels.com/photos/33303306/pexels-photo-33303306.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const sugarImg = 'https://images.pexels.com/photos/37105582/pexels-photo-37105582.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const vegImg = 'https://images.pexels.com/photos/11669641/pexels-photo-11669641.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const tomatoImg = 'https://images.pexels.com/photos/33499935/pexels-photo-33499935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const vegPrepImg = 'https://images.pexels.com/photos/37238878/pexels-photo-37238878.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const assortedGrainsImg = 'https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const freshOnionImg = '/images/fresh onion.webp';
const mustardSeedImg = '/images/mustard seed.jpeg';
const rawSugarcaneImg = '/images/raw sugarcane.webp';

export const products: Product[] = [
  // Rice & Rice Products (8)
  {
    id: 'p001', name: 'Basmati Rice (Extra Long Grain)', slug: 'basmati-rice-extra-long-grain',
    category: 'rice-rice-products',
    shortDesc: 'Aged extra-long grain basmati with aromatic flavour',
    description: 'Premium aged basmati rice with extra-long grains that elongate upon cooking. Sourced from the finest basmati-growing regions, each batch is aged for a minimum of 12 months to enhance aroma and cooking quality. Ideal for biryani, pulao, and premium dining.',
    image: riceImg, gallery: [riceImg, riceImg2, riceImg3, assortedGrainsImg],
    packSizes: ['1kg', '5kg', '25kg', '50kg'], price: 120, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Basmati, Aged 12+ months' },
      { label: 'Grain Length', value: '8.3–8.5 mm' },
      { label: 'Broken %', value: 'Max 2%' },
      { label: 'Moisture', value: 'Max 13%' },
      { label: 'Packaging', value: 'PP bags, Jute bags, Vacuum packs' },
      { label: 'Shelf Life', value: '24 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p002', name: 'Sona Masoori Rice', slug: 'sona-masoori-rice',
    category: 'rice-rice-products',
    shortDesc: 'Lightweight, aromatic short-grain rice for daily use',
    description: 'Sona Masoori is a lightweight, aromatic medium-grain rice popular in South Indian cuisine. Low in starch and easy to digest, it is perfect for everyday meals, idli, dosa batter, and pongal.',
    image: riceImg2, gallery: [riceImg2, riceImg, riceImg3, assortedGrainsImg],
    packSizes: ['1kg', '5kg', '25kg', '50kg'], price: 65, unit: 'kg',
    origin: 'Andhra Pradesh, India',
    specs: [
      { label: 'Type', value: 'Sona Masoori (Medium Grain)' },
      { label: 'Grain Length', value: '5.5–6.0 mm' },
      { label: 'Broken %', value: 'Max 5%' },
      { label: 'Moisture', value: 'Max 14%' },
      { label: 'Packaging', value: 'PP bags, Jute bags' },
      { label: 'Shelf Life', value: '18 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p003', name: 'Non-Basmati Parboiled Rice', slug: 'non-basmati-parboiled-rice',
    category: 'rice-rice-products',
    shortDesc: 'Nutrient-rich parboiled rice for bulk consumption',
    description: 'Parboiled non-basmati rice retains more nutrients through the parboiling process. Firm texture and non-sticky after cooking make it ideal for institutional catering, mid-day meal schemes, and export markets.',
    image: riceImg3, gallery: [riceImg3, riceImg, riceImg2, assortedGrainsImg],
    packSizes: ['5kg', '25kg', '50kg'], price: 48, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Non-Basmati Parboiled' },
      { label: 'Grain Length', value: '5.0–6.0 mm' },
      { label: 'Broken %', value: 'Max 10%' },
      { label: 'Moisture', value: 'Max 14%' },
      { label: 'Packaging', value: 'PP bags, Bulk containers' },
      { label: 'Shelf Life', value: '18 months' },
    ],
    rating: 4,
  },
  {
    id: 'p004', name: 'Sella Rice (Golden Sella)', slug: 'sella-rice-golden-sella',
    category: 'rice-rice-products',
    shortDesc: 'Golden parboiled basmati sella for export-grade cooking',
    description: 'Golden Sella is parboiled basmati rice known for its golden hue, firm texture, and ability to absorb flavours. Widely preferred in Middle Eastern and African cuisines for biryani and mandi preparations.',
    image: '/images/pusa-golden-sella-basmati-rice.png', gallery: ['/images/pusa-golden-sella-basmati-rice.png'],
    packSizes: ['5kg', '25kg', '50kg'], price: 95, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Golden Sella (Parboiled Basmati)' },
      { label: 'Grain Length', value: '8.0–8.3 mm' },
      { label: 'Broken %', value: 'Max 2%' },
      { label: 'Moisture', value: 'Max 13%' },
      { label: 'Packaging', value: 'PP bags, Vacuum packs' },
      { label: 'Shelf Life', value: '24 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p005', name: 'Broken Rice (25%/100%)', slug: 'broken-rice',
    category: 'rice-rice-products',
    shortDesc: 'Economical broken rice for food processing and feed',
    description: 'Broken rice grains available in 25% and 100% broken categories. Used widely in food processing, rice flour production, breweries, and animal feed. Cost-effective without compromising on quality.',
    image: '/images/Broken Rice (25-100 Percent).png', gallery: ['/images/Broken Rice (25-100 Percent).png'],
    packSizes: ['25kg', '50kg'], price: 35, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Broken Rice (25% or 100%)' },
      { label: 'Grain Length', value: 'Variable' },
      { label: 'Broken %', value: '25% or 100%' },
      { label: 'Moisture', value: 'Max 14%' },
      { label: 'Packaging', value: 'PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p006', name: 'Brown Rice', slug: 'brown-rice',
    category: 'rice-rice-products',
    shortDesc: 'Whole-grain brown rice, rich in fibre and nutrients',
    description: 'Unpolished brown rice retaining the bran layer, rich in dietary fibre, vitamins, and minerals. A health-conscious choice for wholesome meals, recommended for diabetic-friendly and weight-management diets.',
    image: '/images/Brown Rice.jpg', gallery: ['/images/Brown Rice.jpg'],
    packSizes: ['1kg', '5kg', '25kg'], price: 80, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Brown Rice (Unpolished)' },
      { label: 'Grain Length', value: '6.0–7.0 mm' },
      { label: 'Broken %', value: 'Max 5%' },
      { label: 'Moisture', value: 'Max 13%' },
      { label: 'Packaging', value: 'PP bags, Vacuum packs' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 5,
  },
  {
    id: 'p007', name: 'Rice Bran', slug: 'rice-bran',
    category: 'rice-rice-products',
    shortDesc: 'Nutritious rice bran for oil extraction and feed',
    description: 'Rice bran is the outer layer of the rice grain, rich in oil, protein, and vitamins. Used for rice bran oil extraction, animal feed, and nutritional supplements.',
    image: '/images/Rice Bran.webp', gallery: ['/images/Rice Bran.webp'],
    packSizes: ['25kg', '50kg'], price: 28, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Rice Bran (Raw)' },
      { label: 'Oil Content', value: '16–22%' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Packaging', value: 'PP bags' },
      { label: 'Shelf Life', value: '6 months' },
    ],
    rating: 4,
  },
  {
    id: 'p008', name: 'Rice Flour', slug: 'rice-flour',
    category: 'rice-rice-products',
    shortDesc: 'Fine-milled rice flour for baking and snacks',
    description: 'Finely milled rice flour from premium quality rice. Used in baking, snack manufacturing, baby food, and gluten-free products. Available in various mesh sizes for different applications.',
    image: '/images/Rice Flour.jpg', gallery: ['/images/Rice Flour.jpg'],
    packSizes: ['1kg', '5kg', '25kg'], price: 55, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Rice Flour (Fine Milled)' },
      { label: 'Mesh Size', value: '80–120 mesh' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },

  // Cereals & Grains (7)
  {
    id: 'p009', name: 'Wheat (Sharbati)', slug: 'wheat-sharbati',
    category: 'cereals-grains',
    shortDesc: 'Premium Sharbati wheat for soft, fluffy rotis',
    description: 'Sharbati wheat is renowned for its golden grain and high protein content, producing soft and fluffy rotis. Sourced from the Sehore-Malwa belt, it is the preferred choice for premium atta production.',
    image: '/images/Wheat (Sharbati).webp', gallery: ['/images/Wheat (Sharbati).webp'],
    packSizes: ['5kg', '25kg', '50kg'], price: 42, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Sharbati Wheat (Triticum aestivum)' },
      { label: 'Protein', value: '12–14%' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags, Jute bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p010', name: 'Maize / Corn (Yellow)', slug: 'maize-corn-yellow',
    category: 'cereals-grains',
    shortDesc: 'Yellow maize for food, feed, and starch production',
    description: 'High-quality yellow maize with bright, uniform kernels. Used for human consumption, animal feed, starch production, and ethanol. Carefully dried and cleaned for export standards.',
    image: cornImg, gallery: [cornImg, wheatImg, assortedGrainsImg, riceImg],
    packSizes: ['25kg', '50kg'], price: 25, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Yellow Maize (Dent Corn)' },
      { label: 'Moisture', value: 'Max 13%' },
      { label: 'Foreign Matter', value: 'Max 2%' },
      { label: 'Packaging', value: 'PP bags, Bulk containers' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 4,
  },
  {
    id: 'p011', name: 'Jowar (Sorghum)', slug: 'jowar-sorghum',
    category: 'cereals-grains',
    shortDesc: 'Gluten-free jowar for healthy flatbreads and snacks',
    description: 'Jowar (sorghum) is a nutrient-dense, gluten-free millet rich in fibre, protein, and antioxidants. Used for traditional rotis, multigrain flour, and health food products.',
    image: '/images/Jowar (Sorghum).jpg', gallery: ['/images/Jowar (Sorghum).jpg'],
    packSizes: ['5kg', '25kg'], price: 38, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Jowar (Sorghum bicolor)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p012', name: 'Bajra (Pearl Millet)', slug: 'bajra-pearl-millet',
    category: 'cereals-grains',
    shortDesc: 'Iron-rich pearl millet for traditional recipes',
    description: 'Bajra (pearl millet) is rich in iron, protein, and dietary fibre. A staple in Rajasthan and Gujarat, used for bhakri, khichdi, and health food formulations.',
    image: '/images/Bajra (Pearl Millet).webp', gallery: ['/images/Bajra (Pearl Millet).webp'],
    packSizes: ['5kg', '25kg'], price: 35, unit: 'kg',
    origin: 'Rajasthan, India',
    specs: [
      { label: 'Type', value: 'Bajra (Pennisetum glaucum)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p013', name: 'Ragi (Finger Millet)', slug: 'ragi-finger-millet',
    category: 'cereals-grains',
    shortDesc: 'Calcium-rich finger millet for health foods',
    description: 'Ragi (finger millet) is exceptionally rich in calcium, iron, and amino acids. Used in baby food, health drinks, dosa, and baked goods. A superfood for all ages.',
    image: '/images/Ragi (Finger Millet).jpg', gallery: ['/images/Ragi (Finger Millet).jpg'],
    packSizes: ['5kg', '25kg'], price: 45, unit: 'kg',
    origin: 'Karnataka, India',
    specs: [
      { label: 'Type', value: 'Ragi (Eleusine coracana)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 5,
  },
  {
    id: 'p014', name: 'Oats (Whole & Rolled)', slug: 'oats-whole-rolled',
    category: 'cereals-grains',
    shortDesc: 'Whole and rolled oats for breakfast and baking',
    description: 'Premium quality oats available in whole and rolled forms. Rich in beta-glucan fibre, ideal for breakfast cereals, porridge, baking, and health food products.',
    image: '/images/Oats (Whole & Rolled).jpeg', gallery: ['/images/Oats (Whole & Rolled).jpeg'],
    packSizes: ['1kg', '5kg', '25kg'], price: 60, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Oats (Whole / Rolled)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p015', name: 'Barley', slug: 'barley',
    category: 'cereals-grains',
    shortDesc: 'Fibre-rich barley for food, brewing, and feed',
    description: 'Cleaned and graded barley grains used for food products, brewing, and animal feed. High in dietary fibre, particularly beta-glucan, supporting heart health.',
    image: '/images/Barley.jpeg', gallery: ['/images/Barley.jpeg'],
    packSizes: ['5kg', '25kg', '50kg'], price: 32, unit: 'kg',
    origin: 'Rajasthan, India',
    specs: [
      { label: 'Type', value: 'Barley (Hordeum vulgare)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },

  // Pulses & Dals (8)
  {
    id: 'p016', name: 'Toor Dal (Arhar)', slug: 'toor-dal-arhar',
    category: 'pulses-dals',
    shortDesc: 'Premium toor dal for everyday Indian cooking',
    description: 'Toor dal (arhar dal) is the most widely consumed pulse in India. Cleaned, sorted, and polished to uniform quality. Rich in protein and essential nutrients, perfect for daily dal preparations.',
    image: '/images/Toor Dal (Arhar).webp', gallery: ['/images/Toor Dal (Arhar).webp'],
    packSizes: ['1kg', '5kg', '25kg', '50kg'], price: 110, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Toor Dal (Cajanus cajan)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Broken %', value: 'Max 3%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p017', name: 'Chana Dal', slug: 'chana-dal',
    category: 'pulses-dals',
    shortDesc: 'Split chickpea dal with nutty flavour',
    description: 'Chana dal is split and polished Bengal gram, known for its nutty flavour and firm texture. High in protein and fibre, used in dals, sweets, and snack preparations.',
    image: '/images/Chana Dal.webp', gallery: ['/images/Chana Dal.webp'],
    packSizes: ['1kg', '5kg', '25kg', '50kg'], price: 85, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Chana Dal (Cicer arietinum)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 5,
  },
  {
    id: 'p018', name: 'Moong Dal (Split & Whole)', slug: 'moong-dal',
    category: 'pulses-dals',
    shortDesc: 'Easy-to-digest moong dal, split and whole',
    description: 'Moong dal available in both split (yellow) and whole (green) forms. Easy to digest and rich in protein, ideal for khichdi, dal fry, sprouts, and health foods.',
    image: '/images/Moong Dal (Split & Whole).webp', gallery: ['/images/Moong Dal (Split & Whole).webp'],
    packSizes: ['1kg', '5kg', '25kg'], price: 120, unit: 'kg',
    origin: 'Rajasthan, India',
    specs: [
      { label: 'Type', value: 'Moong Dal (Vigna radiata) — Split / Whole' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p019', name: 'Urad Dal', slug: 'urad-dal',
    category: 'pulses-dals',
    shortDesc: 'Black gram dal for idli, dosa, and vada',
    description: 'Urad dal (black gram) available whole and split. Essential for South Indian batters like idli, dosa, and vada. High in protein and iron.',
    image: '/images/Urad Dal.webp', gallery: ['/images/Urad Dal.webp'],
    packSizes: ['1kg', '5kg', '25kg'], price: 130, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Urad Dal (Vigna mungo) — Split / Whole' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p020', name: 'Masoor Dal (Red Lentil)', slug: 'masoor-dal-red-lentil',
    category: 'pulses-dals',
    shortDesc: 'Quick-cooking red lentils for everyday meals',
    description: 'Masoor dal (red lentil) cooks quickly and is rich in protein, fibre, and iron. A popular everyday dal across Indian households, also used in soups and stews.',
    image: lentilsImg, gallery: [lentilsImg, pulsesImg, beansImg, assortedGrainsImg],
    packSizes: ['1kg', '5kg', '25kg'], price: 90, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Masoor Dal (Lens culinaris)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p021', name: 'Rajma (Kidney Beans)', slug: 'rajma-kidney-beans',
    category: 'pulses-dals',
    shortDesc: 'Premium kidney beans for rich, hearty curries',
    description: 'Rajma (kidney beans) sourced from the Himalayan belt, known for their creamy texture and ability to absorb flavours. Ideal for rajma curry, salads, and Mexican cuisine.',
    image: '/images/Rajma (Kidney Beans).jpg', gallery: ['/images/Rajma (Kidney Beans).jpg'],
    packSizes: ['1kg', '5kg', '25kg'], price: 140, unit: 'kg',
    origin: 'Jammu & Kashmir, India',
    specs: [
      { label: 'Type', value: 'Rajma (Phaseolus vulgaris)' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p022', name: 'Kabuli Chana (Chickpeas)', slug: 'kabuli-chana-chickpeas',
    category: 'pulses-dals',
    shortDesc: 'Large white chickpeas for chole and hummus',
    description: 'Kabuli chana (chickpeas) with large, uniform grains. High in protein and fibre, used for chole, hummus, salads, and snacks. Export-grade quality.',
    image: '/images/Kabuli Chana (Chickpeas).jpg', gallery: ['/images/Kabuli Chana (Chickpeas).jpg'],
    packSizes: ['1kg', '5kg', '25kg', '50kg'], price: 95, unit: 'kg',
    origin: 'Rajasthan, India',
    specs: [
      { label: 'Type', value: 'Kabuli Chana (Cicer arietinum)' },
      { label: 'Grain Size', value: '10–12 mm' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 5,
  },
  {
    id: 'p023', name: 'Green Peas (Whole/Split)', slug: 'green-peas',
    category: 'pulses-dals',
    shortDesc: 'Dried green peas for curries and snacks',
    description: 'Dried green peas available whole and split. Used in curries, snacks, and as a protein-rich addition to various food preparations.',
    image: '/images/Green Peas (Whole:Split).jpeg', gallery: ['/images/Green Peas (Whole:Split).jpeg'],
    packSizes: ['1kg', '5kg', '25kg'], price: 70, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Green Peas (Pisum sativum) — Whole / Split' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Foreign Matter', value: 'Max 1%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },

  // Oilseeds & Cash Crops (6)
  {
    id: 'p024', name: 'Soybean (Whole)', slug: 'soybean-whole',
    category: 'oilseeds-cash-crops',
    shortDesc: 'High-protein soybean for oil and food processing',
    description: 'Premium quality whole soybeans with high protein and oil content. Used for soybean oil extraction, animal feed, tofu, and various soy-based food products.',
    image: '/images/Soybean (Whole).avif', gallery: ['/images/Soybean (Whole).avif'],
    packSizes: ['25kg', '50kg'], price: 55, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Soybean (Glycine max)' },
      { label: 'Oil Content', value: '18–20%' },
      { label: 'Protein', value: '38–42%' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Packaging', value: 'PP bags, Bulk containers' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 4,
  },
  {
    id: 'p025', name: 'Soybean Meal/DOC', slug: 'soybean-meal-doc',
    category: 'oilseeds-cash-crops',
    shortDesc: 'Defatted soybean meal for animal feed',
    description: 'Soybean de-oiled cake (DOC) is a high-protein byproduct of soybean oil extraction. Widely used in poultry, cattle, and aquaculture feed formulations.',
    image: '/images/Soybean Meal:DOC.webp', gallery: ['/images/Soybean Meal:DOC.webp'],
    packSizes: ['25kg', '50kg'], price: 38, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Soybean DOC (De-oiled Cake)' },
      { label: 'Protein', value: '46–48%' },
      { label: 'Oil Content', value: 'Max 1.5%' },
      { label: 'Moisture', value: 'Max 12%' },
      { label: 'Packaging', value: 'PP bags, Bulk containers' },
      { label: 'Shelf Life', value: '6 months' },
    ],
    rating: 4,
  },
  {
    id: 'p026', name: 'Sugarcane (Raw)', slug: 'sugarcane-raw',
    category: 'oilseeds-cash-crops',
    shortDesc: 'Raw sugarcane for jaggery and processing',
    description: 'Freshly harvested raw sugarcane supplied to mills and processing units. High sucrose content, suitable for jaggery, sugar, and ethanol production.',
    image: rawSugarcaneImg, gallery: [rawSugarcaneImg, soybeanImg, sugarImg, riceImg],
    packSizes: ['Bulk'], price: 28, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Sugarcane (Saccharum officinarum)' },
      { label: 'Sucrose', value: '12–16%' },
      { label: 'Packaging', value: 'Bulk transport' },
      { label: 'Shelf Life', value: '48 hours post-harvest' },
    ],
    rating: 4,
  },
  {
    id: 'p027', name: 'Sugar (Crystal/Refined)', slug: 'sugar-crystal-refined',
    category: 'oilseeds-cash-crops',
    shortDesc: 'Refined crystal sugar for food and beverage industry',
    description: 'Premium refined crystal sugar (S-30/M-30 grade) suitable for food manufacturing, beverages, and retail. Uniform crystal size, bright white colour, and high purity.',
    image: sugarImg, gallery: [sugarImg, assortedGrainsImg, soybeanImg, riceImg],
    packSizes: ['1kg', '5kg', '25kg', '50kg'], price: 45, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Refined Sugar (S-30 / M-30)' },
      { label: 'ICUMSA', value: 'Max 100' },
      { label: 'Moisture', value: 'Max 0.05%' },
      { label: 'Packaging', value: 'PP bags, Retail pouches' },
      { label: 'Shelf Life', value: '24 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p028', name: 'Groundnut (Peanut)', slug: 'groundnut-peanut',
    category: 'oilseeds-cash-crops',
    shortDesc: 'Bold and java variety groundnuts for oil and snacks',
    description: 'Premium groundnuts available in Bold and Java varieties. High oil content and uniform kernel size, suitable for oil extraction, snacks, and peanut butter production.',
    image: peanutImg, gallery: [peanutImg, soybeanImg, assortedGrainsImg, riceImg],
    packSizes: ['5kg', '25kg', '50kg'], price: 85, unit: 'kg',
    origin: 'Gujarat, India',
    specs: [
      { label: 'Type', value: 'Groundnut (Arachis hypogaea) — Bold / Java' },
      { label: 'Oil Content', value: '42–48%' },
      { label: 'Moisture', value: 'Max 8%' },
      { label: 'Aflatoxin', value: 'Max 10 ppb' },
      { label: 'Packaging', value: 'PP bags, Vacuum packs' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p029', name: 'Mustard Seed', slug: 'mustard-seed',
    category: 'oilseeds-cash-crops',
    shortDesc: 'High-oil mustard seeds for oil and condiments',
    description: 'Quality mustard seeds with high oil content. Used for mustard oil extraction and as a spice in Indian cooking. Available in yellow and black varieties.',
    image: mustardSeedImg, gallery: [mustardSeedImg, soybeanImg, peanutImg, riceImg],
    packSizes: ['5kg', '25kg', '50kg'], price: 70, unit: 'kg',
    origin: 'Rajasthan, India',
    specs: [
      { label: 'Type', value: 'Mustard (Brassica juncea)' },
      { label: 'Oil Content', value: '38–42%' },
      { label: 'Moisture', value: 'Max 8%' },
      { label: 'Packaging', value: 'PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },

  // Fruits & Vegetables (8)
  {
    id: 'p030', name: 'Fresh Onion', slug: 'fresh-onion',
    category: 'fruits-vegetables',
    shortDesc: 'Premium-grade fresh onions for domestic and export',
    description: 'Fresh, firm onions sourced from Nashik and Lasalgaon — India\'s largest onion-growing belt. Available in various sizes, carefully graded and packed for domestic and export markets.',
    image: freshOnionImg, gallery: [freshOnionImg, vegImg, tomatoImg, assortedGrainsImg],
    packSizes: ['10kg', '25kg', '50kg'], price: 25, unit: 'kg',
    origin: 'Nashik, Maharashtra',
    specs: [
      { label: 'Type', value: 'Red Onion / White Onion' },
      { label: 'Size', value: '40–70 mm' },
      { label: 'Moisture', value: 'Fresh' },
      { label: 'Packaging', value: 'Mesh bags, Cartons' },
      { label: 'Shelf Life', value: '4–6 weeks (cool storage)' },
    ],
    featured: true, rating: 4,
  },
  {
    id: 'p031', name: 'Fresh Potato', slug: 'fresh-potato',
    category: 'fruits-vegetables',
    shortDesc: 'Quality potatoes for retail and processing',
    description: 'Fresh potatoes from Maharashtra and Gujarat, suitable for retail, chips manufacturing, and institutional use. Uniform size, disease-free, and properly cured for storage.',
    image: '/images/Fresh Potato.jpeg', gallery: ['/images/Fresh Potato.jpeg'],
    packSizes: ['10kg', '25kg', '50kg'], price: 22, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Table Potato' },
      { label: 'Size', value: '50–150 g' },
      { label: 'Packaging', value: 'Mesh bags, Cartons' },
      { label: 'Shelf Life', value: '8–12 weeks (cool storage)' },
    ],
    rating: 4,
  },
  {
    id: 'p032', name: 'Fresh Tomato', slug: 'fresh-tomato',
    category: 'fruits-vegetables',
    shortDesc: 'Vine-ripened tomatoes for fresh and processing use',
    description: 'Fresh, vine-ripened tomatoes with uniform red colour and firm texture. Suitable for retail, sauces, and paste manufacturing.',
    image: tomatoImg, gallery: [tomatoImg, vegImg, vegPrepImg, assortedGrainsImg],
    packSizes: ['10kg', '25kg'], price: 30, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Hybrid / Local Variety' },
      { label: 'Size', value: '60–100 g' },
      { label: 'Packaging', value: 'Crate, Cartons' },
      { label: 'Shelf Life', value: '1–2 weeks (cool storage)' },
    ],
    rating: 4,
  },
  {
    id: 'p033', name: 'Dehydrated Onion Flakes/Powder', slug: 'dehydrated-onion-flakes-powder',
    category: 'fruits-vegetables',
    shortDesc: 'Dehydrated onion flakes and powder for food industry',
    description: 'Premium dehydrated onion flakes and powder, processed from fresh onions. Used in spice blends, soups, sauces, and ready-to-eat meals. Long shelf life and consistent quality.',
    image: '/images/Dehydrated Onion Flakes:Powder.png', gallery: ['/images/Dehydrated Onion Flakes:Powder.png'],
    packSizes: ['1kg', '5kg', '25kg'], price: 180, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Dehydrated Onion (Flakes / Powder / Minced)' },
      { label: 'Moisture', value: 'Max 6%' },
      { label: 'Rehydration', value: '1:5 ratio' },
      { label: 'Packaging', value: 'Vacuum packs, Foil pouches' },
      { label: 'Shelf Life', value: '18 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p034', name: 'Dehydrated Garlic Powder', slug: 'dehydrated-garlic-powder',
    category: 'fruits-vegetables',
    shortDesc: 'Pure dehydrated garlic powder for seasoning',
    description: 'Fine dehydrated garlic powder from fresh garlic cloves. Strong aroma and consistent quality, ideal for seasoning, spice blends, and food manufacturing.',
    image: '/images/Dehydrated Garlic Powder.webp', gallery: ['/images/Dehydrated Garlic Powder.webp'],
    packSizes: ['1kg', '5kg', '25kg'], price: 220, unit: 'kg',
    origin: 'Madhya Pradesh, India',
    specs: [
      { label: 'Type', value: 'Dehydrated Garlic (Powder / Flakes)' },
      { label: 'Moisture', value: 'Max 6%' },
      { label: 'Packaging', value: 'Vacuum packs, Foil pouches' },
      { label: 'Shelf Life', value: '18 months' },
    ],
    rating: 5,
  },
  {
    id: 'p035', name: 'Preserved/Canned Mixed Fruits', slug: 'preserved-canned-mixed-fruits',
    category: 'fruits-vegetables',
    shortDesc: 'Canned mixed fruits in syrup for retail and food service',
    description: 'Preserved mixed fruits (pineapple, papaya, cherry, pear) in light syrup. Convenient and shelf-stable, ideal for desserts, bakery toppings, and food service.',
    image: '/images/Preserved:Canned Mixed Fruits.jpg', gallery: ['/images/Preserved:Canned Mixed Fruits.jpg'],
    packSizes: ['850g tin', '4kg tin'], price: 150, unit: 'tin',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Canned Mixed Fruits in Syrup' },
      { label: 'Net Weight', value: '850g / 4kg' },
      { label: 'Packaging', value: 'Tin cans' },
      { label: 'Shelf Life', value: '24 months' },
    ],
    rating: 4,
  },
  {
    id: 'p036', name: 'Fresh Seasonal Fruits', slug: 'fresh-seasonal-fruits',
    category: 'fruits-vegetables',
    shortDesc: 'Banana, orange, mango and other seasonal fruits',
    description: 'Fresh seasonal fruits including banana, orange, mango, pomegranate, and guava sourced from Maharashtra\'s fruit belt. Carefully graded, packed, and shipped for domestic and export markets.',
    image: '/images/Fresh Seasonal Fruits.webp', gallery: ['/images/Fresh Seasonal Fruits.webp'],
    packSizes: ['10kg', '20kg'], price: 60, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Banana / Orange / Mango / Pomegranate (Seasonal)' },
      { label: 'Grade', value: 'Export / Domestic' },
      { label: 'Packaging', value: 'Corrugated boxes, CFB cartons' },
      { label: 'Shelf Life', value: 'Varies by fruit (3–21 days)' },
    ],
    rating: 4,
  },
  {
    id: 'p037', name: 'Frozen Mixed Vegetables', slug: 'frozen-mixed-vegetables',
    category: 'fruits-vegetables',
    shortDesc: 'IQF frozen mixed vegetables for ready-to-cook meals',
    description: 'Individually Quick Frozen (IQF) mixed vegetables — peas, corn, carrots, beans. Retains colour, texture, and nutrition. Ideal for ready-to-cook meals and food service.',
    image: '/images/Frozen Mixed Vegetables.jpg', gallery: ['/images/Frozen Mixed Vegetables.jpg'],
    packSizes: ['500g', '1kg', '10kg'], price: 120, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'IQF Frozen Mixed Vegetables' },
      { label: 'Storage', value: '-18°C' },
      { label: 'Packaging', value: 'Poly bags, Bulk packs' },
      { label: 'Shelf Life', value: '18 months (frozen)' },
    ],
    rating: 4,
  },

  // Processed Food Products (8)
  {
    id: 'p038', name: 'Mango Jam', slug: 'mango-jam',
    category: 'processed-food-products',
    shortDesc: 'Authentic Alphonso mango jam, naturally sweet',
    description: 'Premium mango jam made from Alphonso mangoes, the king of Indian mangoes. Natural sweetness with real fruit pieces, no artificial colours. Perfect for bread, toast, and desserts.',
    image: '/images/Mango Jam.webp', gallery: ['/images/Mango Jam.webp'],
    packSizes: ['500g', '1kg', '5kg'], price: 180, unit: 'jar',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Mango Jam (Alphonso)' },
      { label: 'Fruit Content', value: 'Min 45%' },
      { label: 'Packaging', value: 'Glass jars, PET jars' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p039', name: 'Mixed Fruit Jam', slug: 'mixed-fruit-jam',
    category: 'processed-food-products',
    shortDesc: 'Multi-fruit jam with pineapple, papaya, and apple',
    description: 'Mixed fruit jam crafted from a blend of pineapple, papaya, apple, and banana. Rich, fruity flavour with real fruit pieces. Ideal for breakfast and bakery applications.',
    image: '/images/Mixed Fruit Jam.jpg', gallery: ['/images/Mixed Fruit Jam.jpg'],
    packSizes: ['500g', '1kg', '5kg'], price: 160, unit: 'jar',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Mixed Fruit Jam' },
      { label: 'Fruit Content', value: 'Min 40%' },
      { label: 'Packaging', value: 'Glass jars, PET jars' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p040', name: 'Mango Pickle', slug: 'mango-pickle',
    category: 'processed-food-products',
    shortDesc: 'Traditional Indian mango pickle with spices',
    description: 'Authentic Indian mango pickle made from raw mangoes, mustard oil, and traditional spices. Tangy, spicy, and full of flavour — a staple accompaniment to Indian meals.',
    image: '/images/Mango Pickle.jpg', gallery: ['/images/Mango Pickle.jpg'],
    packSizes: ['200g', '500g', '1kg', '5kg'], price: 120, unit: 'jar',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Mango Pickle (Aam ka Achaar)' },
      { label: 'Base Oil', value: 'Mustard Oil' },
      { label: 'Packaging', value: 'Glass jars, PET jars' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p041', name: 'Mixed Vegetable Pickle', slug: 'mixed-vegetable-pickle',
    category: 'processed-food-products',
    shortDesc: 'Assorted vegetable pickle with traditional spices',
    description: 'Mixed vegetable pickle with carrots, cauliflower, turnips, and lime in a spiced mustard oil base. A classic North Indian accompaniment, rich in flavour and crunch.',
    image: '/images/Mixed Vegetable Pickle.jpg', gallery: ['/images/Mixed Vegetable Pickle.jpg'],
    packSizes: ['200g', '500g', '1kg', '5kg'], price: 110, unit: 'jar',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Mixed Vegetable Pickle' },
      { label: 'Base Oil', value: 'Mustard Oil' },
      { label: 'Packaging', value: 'Glass jars, PET jars' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p042', name: 'Garam Masala', slug: 'garam-masala',
    category: 'processed-food-products',
    shortDesc: 'Aromatic blend of whole and ground spices',
    description: 'Traditional garam masala blend of cardamom, cinnamon, cloves, black pepper, cumin, and coriander. Stone-ground for authentic aroma. Adds warmth and depth to curries, biryanis, and gravies.',
    image: '/images/Garam Masala.webp', gallery: ['/images/Garam Masala.webp'],
    packSizes: ['100g', '500g', '1kg', '5kg'], price: 280, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Garam Masala (Ground Blend)' },
      { label: 'Ingredients', value: 'Cardamom, Cinnamon, Clove, Pepper, Cumin, Coriander' },
      { label: 'Moisture', value: 'Max 8%' },
      { label: 'Packaging', value: 'Foil pouches, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p043', name: 'Kitchen King Masala', slug: 'kitchen-king-masala',
    category: 'processed-food-products',
    shortDesc: 'All-purpose masala for everyday Indian cooking',
    description: 'Kitchen King Masala is a versatile all-purpose spice blend perfect for everyday curries, sabzis, and Punjabi dishes. Adds rich colour and balanced flavour to any preparation.',
    image: '/images/Kitchen King Masala.webp', gallery: ['/images/Kitchen King Masala.webp'],
    packSizes: ['100g', '500g', '1kg', '5kg'], price: 260, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Kitchen King Masala (Ground Blend)' },
      { label: 'Moisture', value: 'Max 8%' },
      { label: 'Packaging', value: 'Foil pouches, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p044', name: 'Sambar Masala Mix', slug: 'sambar-masala-mix',
    category: 'processed-food-products',
    shortDesc: 'South Indian sambar masala for authentic flavour',
    description: 'Sambar masala mix with toor dal, coriander seeds, red chilli, fenugreek, and asafoetida. Creates authentic South Indian sambar with the perfect balance of spice and tang.',
    image: '/images/Sambar Masala Mix.jpeg', gallery: ['/images/Sambar Masala Mix.jpeg'],
    packSizes: ['100g', '500g', '1kg', '5kg'], price: 250, unit: 'kg',
    origin: 'Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Sambar Masala (Ground Blend)' },
      { label: 'Moisture', value: 'Max 8%' },
      { label: 'Packaging', value: 'Foil pouches, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p045', name: 'Roasted Coffee Powder', slug: 'roasted-coffee-powder',
    category: 'processed-food-products',
    shortDesc: 'Filter coffee blend with chicory for South Indian taste',
    description: 'Roasted and ground filter coffee blend, made from premium Arabica and Robusta beans with chicory. Rich, aromatic, and full-bodied — perfect for South Indian filter coffee.',
    image: '/images/Roasted Coffee Powder.png', gallery: ['/images/Roasted Coffee Powder.png'],
    packSizes: ['250g', '500g', '1kg', '5kg'], price: 320, unit: 'kg',
    origin: 'Karnataka, India',
    specs: [
      { label: 'Type', value: 'Filter Coffee Blend (Coffee + Chicory)' },
      { label: 'Roast', value: 'Medium-Dark' },
      { label: 'Coffee : Chicory', value: '80:20 / 60:40' },
      { label: 'Packaging', value: 'Foil pouches, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },

  // Dry Fruits (6)
  {
    id: 'p046', name: 'Almonds (Badam)', slug: 'almonds-badam',
    category: 'dry-fruits',
    shortDesc: 'Premium California and Indian almonds',
    description: 'Premium quality almonds, rich in vitamin E, protein, and healthy fats. Available in whole, sliced, and blanched forms. Ideal for snacking, baking, and food manufacturing.',
    image: '/images/Almonds (Badam).webp', gallery: ['/images/Almonds (Badam).webp'],
    packSizes: ['250g', '500g', '1kg', '5kg', '25kg'], price: 650, unit: 'kg',
    origin: 'California, USA / Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Almonds (Prunus dulcis)' },
      { label: 'Grade', value: 'Extra No. 1' },
      { label: 'Moisture', value: 'Max 6%' },
      { label: 'Packaging', value: 'Vacuum packs, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p047', name: 'Cashew Nuts (Kaju)', slug: 'cashew-nuts-kaju',
    category: 'dry-fruits',
    shortDesc: 'W240/W320 grade whole cashew nuts',
    description: 'Premium grade whole cashew nuts (W240/W320), known for their creamy texture and mild, buttery flavour. Rich in minerals and healthy fats. Perfect for snacking, sweets, and cooking.',
    image: '/images/Cashew Nuts (Kaju).jpg', gallery: ['/images/Cashew Nuts (Kaju).jpg'],
    packSizes: ['250g', '500g', '1kg', '5kg', '25kg'], price: 750, unit: 'kg',
    origin: 'Goa / Karnataka, India',
    specs: [
      { label: 'Type', value: 'Cashew Nuts (Anacardium occidentale) — W240 / W320' },
      { label: 'Grade', value: 'W240 / W320' },
      { label: 'Moisture', value: 'Max 5%' },
      { label: 'Packaging', value: 'Vacuum packs, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p048', name: 'Raisins (Kishmish)', slug: 'raisins-kishmish',
    category: 'dry-fruits',
    shortDesc: 'Sun-dried green and black raisins',
    description: 'Sun-dried raisins available in green (Afghan) and black (Indian) varieties. Naturally sweet, rich in iron and antioxidants. Used in baking, cooking, and snacking.',
    image: '/images/Raisins (Kishmish).jpg', gallery: ['/images/Raisins (Kishmish).jpg'],
    packSizes: ['250g', '500g', '1kg', '5kg', '25kg'], price: 420, unit: 'kg',
    origin: 'Afghanistan / Maharashtra, India',
    specs: [
      { label: 'Type', value: 'Raisins (Green / Black)' },
      { label: 'Moisture', value: 'Max 14%' },
      { label: 'Packaging', value: 'Vacuum packs, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p049', name: 'Dried Figs (Anjeer)', slug: 'dried-figs-anjeer',
    category: 'dry-fruits',
    shortDesc: 'Soft, sweet dried figs rich in fibre',
    description: 'Premium dried figs (anjeer), soft and sweet, rich in dietary fibre, calcium, and iron. Ideal for snacking, desserts, and health foods.',
    image: '/images/Dried Figs (Anjeer).png', gallery: ['/images/Dried Figs (Anjeer).png'],
    packSizes: ['250g', '500g', '1kg', '5kg', '25kg'], price: 550, unit: 'kg',
    origin: 'Afghanistan / Turkey',
    specs: [
      { label: 'Type', value: 'Dried Figs (Ficus carica)' },
      { label: 'Moisture', value: 'Max 20%' },
      { label: 'Packaging', value: 'Vacuum packs, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 4,
  },
  {
    id: 'p050', name: 'Dates (Khajur)', slug: 'dates-khajur',
    category: 'dry-fruits',
    shortDesc: 'Soft, moist dates with natural caramel sweetness',
    description: 'Premium quality dates (khajur), soft and moist with natural caramel-like sweetness. Rich in iron, potassium, and natural sugars. Available in whole and pitted forms.',
    image: '/images/Dates (Khajur).webp', gallery: ['/images/Dates (Khajur).webp'],
    packSizes: ['250g', '500g', '1kg', '5kg', '25kg'], price: 380, unit: 'kg',
    origin: 'Saudi Arabia / Oman',
    specs: [
      { label: 'Type', value: 'Dates (Phoenix dactylifera) — Pitted / Whole' },
      { label: 'Moisture', value: 'Max 20%' },
      { label: 'Packaging', value: 'Vacuum packs, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    featured: true, rating: 5,
  },
  {
    id: 'p051', name: 'Pistachios (Pista)', slug: 'pistachios-pista',
    category: 'dry-fruits',
    shortDesc: 'Roasted salted pistachios, vibrant green',
    description: 'Premium pistachios (pista), known for their vibrant green colour and distinctive flavour. Available roasted and salted, or raw. Rich in protein, fibre, and antioxidants.',
    image: '/images/Pistachios (Pista).jpeg', gallery: ['/images/Pistachios (Pista).jpeg'],
    packSizes: ['250g', '500g', '1kg', '5kg', '25kg'], price: 950, unit: 'kg',
    origin: 'Iran / California, USA',
    specs: [
      { label: 'Type', value: 'Pistachios (Pistacia vera) — Roasted / Raw' },
      { label: 'Grade', value: 'Premium' },
      { label: 'Moisture', value: 'Max 5%' },
      { label: 'Packaging', value: 'Vacuum packs, PP bags' },
      { label: 'Shelf Life', value: '12 months' },
    ],
    rating: 5,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Traders',
    business: 'Wholesale Distributor',
    location: 'Nagpur, Maharashtra',
    rating: 5,
    quote: 'Consistent grain quality and on-time delivery every single shipment. Kisan Mitra has been our reliable partner for over two years now.',
    avatar: 'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    name: 'Global Foods Import Co.',
    business: 'Import Company',
    location: 'Dubai, UAE',
    rating: 5,
    quote: 'Best basmati rice supplier we have partnered with for our export orders. Documentation is always in order and quality is top-notch.',
    avatar: 'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    name: 'Anand Agro Exports',
    business: 'Export House',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    quote: 'Professional packing and prompt documentation for our international orders. Their team understands export compliance thoroughly.',
    avatar: 'https://images.pexels.com/photos/26150470/pexels-photo-26150470.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    name: 'FreshMart Retail Group',
    business: 'Retail Chain',
    location: 'Pune, Maharashtra',
    rating: 4,
    quote: 'Reliable pulses and cereal supply for our retail chain. Consistent quality across batches keeps our customers satisfied.',
    avatar: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    name: 'Spice Route Distributors',
    business: 'Spice Distributor',
    location: 'Pune, Maharashtra',
    rating: 5,
    quote: 'Their dry fruits and masala range is a hit with our customers. Freshness and packaging quality are excellent.',
    avatar: 'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png?auto=compress&cs=tinysrgb&h=200&w=200',
  },
  {
    name: 'Kisan Agro Bazaar',
    business: 'Agri Trading',
    location: 'Gondia, Maharashtra',
    rating: 5,
    quote: 'Transparent pricing and great customer support throughout. Being a local partner from Gondia, they understand our needs perfectly.',
    avatar: 'https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
  },
];

export const heroSlides = [
  {
    image: 'https://images.pexels.com/photos/2164437/pexels-photo-2164437.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'From Farm to World',
    headline: 'Premium Agri Trading You Can Trust',
    subtext: 'Import • Export • Processing • Trading of Rice, Cereals, Pulses & More',
    cta: { label: 'Explore Products', link: '/products' },
    cta2: { label: 'Get a Quote', link: '/quote' },
  },
  {
    image: 'https://images.pexels.com/photos/14020705/pexels-photo-14020705.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'Global Export Excellence',
    headline: 'Trusted Exporters to 15+ Countries',
    subtext: 'Quality-assured sourcing, processing & timely global delivery',
    cta: { label: 'Learn About Our Exports', link: '/what-we-do' },
    cta2: { label: 'Get a Quote', link: '/quote' },
  },
  {
    image: 'https://images.pexels.com/photos/18328392/pexels-photo-18328392.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'Quality at Every Grain',
    headline: 'Uncompromising Quality, From Sourcing to Packing',
    subtext: 'FSSAI-compliant processing units with strict quality checks at every stage',
    cta: { label: 'See Our Quality Standards', link: '/quality' },
    cta2: { label: 'Get a Quote', link: '/quote' },
  },
  {
    image: 'https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: '50+ Products, One Trusted Source',
    headline: 'Your One-Stop Source for Agricultural Produce',
    subtext: 'Rice • Cereals • Pulses • Oilseeds • Fruits & Vegetables • Dry Fruits • Masalas',
    cta: { label: 'Browse Full Catalogue', link: '/products' },
    cta2: { label: 'Get a Quote', link: '/quote' },
  },
];

export const trustStats = [
  { icon: 'Wheat', value: '50+', label: 'Products Sourced & Traded' },
  { icon: 'Ship', value: '15+', label: 'Countries Served' },
  { icon: 'Factory', value: 'In-house', label: 'Processing & Packing Units' },
  { icon: 'ShieldCheck', value: 'FSSAI', label: '& Quality Certified' },
];

export const processSteps = [
  { icon: 'Sprout', title: 'Sourcing & Procurement', desc: 'Direct farmer and FPO tie-ups across the Vidarbha rice belt for farm-fresh produce.' },
  { icon: 'Factory', title: 'Processing', desc: 'In-house milling, grading, sorting, polishing, and cleaning for consistent quality.' },
  { icon: 'Package', title: 'Packing & Re-packing', desc: 'Flexible packaging from 1kg retail pouches to 50kg PP and jute bags with private labelling.' },
  { icon: 'Handshake', title: 'Trading', desc: 'B2B trading desk with wholesale and bulk order support, backed by market intelligence.' },
  { icon: 'Ship', title: 'Import & Export', desc: 'Seamless global trade with complete documentation, COO, and phytosanitary certificates.' },
];

export const whyChooseUs = [
  { icon: 'Sprout', title: 'Direct Sourcing', desc: 'Farm-to-facility sourcing ensures freshness and fair pricing for every batch.' },
  { icon: 'Factory', title: 'In-house Processing', desc: 'Full control over quality from raw grain to finished pack, under one roof.' },
  { icon: 'Globe', title: 'Import-Export Expertise', desc: 'Seamless global trade documentation and logistics for hassle-free international orders.' },
  { icon: 'ShieldCheck', title: 'Certified Quality', desc: 'FSSAI-compliant, lab-tested at every stage to meet domestic and export standards.' },
  { icon: 'Package', title: 'Flexible Packaging', desc: 'Retail to bulk, custom private-label packing available for brands and distributors.' },
  { icon: 'Handshake', title: 'Customer-First Service', desc: 'Dedicated support, transparent pricing, and reliable delivery you can count on.' },
];

export const companyInfo = {
  name: 'KISAN MITRA RICE TRADING',
  legalName: 'KISAN MITRA RICE TRADING PRIVATE LIMITED',
  tagline: 'From Farm to World — Trusted Agri Trading Partner',
  address: '1942-207/8, Narayan Nagar, Kidgipar Road, Bangaon, Amgaon, Amgaon, Gondia – 441902, Maharashtra, India',
  phone: '+91 90963 10711',
  email: 'support@kisanmitratrading.store',
  gst: '27AABCK1234L1Z5',
  cin: 'U01100MH2024PTC123456',
  hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
  whatsapp: '919096310711',
  social: {
    linkedin: '#',
    instagram: '#',
    facebook: '#',
    youtube: '#',
  },
};

export const qualityControlSteps = [
  { icon: 'Search', title: 'Raw Material Inspection', desc: 'Every incoming batch is inspected for quality, moisture, and foreign matter.' },
  { icon: 'Wind', title: 'Cleaning & Grading', desc: 'Mechanical cleaning and optical sorting to remove impurities and grade by size.' },
  { icon: 'FlaskConical', title: 'Lab Testing', desc: 'Parameters tested: moisture, broken %, foreign matter, pesticide residue, aflatoxin.' },
  { icon: 'Factory', title: 'Processing', desc: 'Milling, polishing, and processing under controlled, hygienic conditions.' },
  { icon: 'Package', title: 'Packing QC', desc: 'Packaging integrity, weight accuracy, and seal quality verified for every batch.' },
  { icon: 'Truck', title: 'Final Dispatch Check', desc: 'Pre-dispatch inspection ensures the right product, grade, and documentation.' },
];

export const labParameters = [
  { parameter: 'Moisture Content', standard: 'Max 13%', method: 'Oven Drying' },
  { parameter: 'Foreign Matter', standard: 'Max 1%', method: 'Visual / Sieve' },
  { parameter: 'Broken Grain %', standard: 'Max 2–10% (by grade)', method: 'Gravimetric' },
  { parameter: 'Pesticide Residue', standard: 'Within MRL limits', method: 'GC-MS / LC-MS' },
  { parameter: 'Aflatoxin', standard: 'Max 10 ppb', method: 'HPLC / ELISA' },
  { parameter: 'Grain Length', standard: 'As per variety spec', method: 'Microscopic' },
];

export const certifications = [
  { name: 'FSSAI License', number: 'To be updated', icon: 'ShieldCheck' },
  { name: 'APEDA Registration', number: 'To be updated', icon: 'Award' },
  { name: 'ISO 22000 / HACCP', number: 'To be updated', icon: 'BadgeCheck' },
  { name: 'GST Registration', number: '27AABCK1234L1Z5', icon: 'FileText' },
];

export const comparisonData = [
  { feature: 'Direct Farm Sourcing', kisanMitra: true, typicalTrader: false },
  { feature: 'In-house Processing', kisanMitra: true, typicalTrader: false },
  { feature: 'Multi-stage Quality Checks', kisanMitra: true, typicalTrader: 'Limited' },
  { feature: 'Flexible / Private-label Packaging', kisanMitra: true, typicalTrader: 'Limited' },
  { feature: 'Complete Export Documentation', kisanMitra: true, typicalTrader: 'Partial' },
  { feature: 'Transparent Pricing', kisanMitra: true, typicalTrader: false },
  { feature: 'Lab-tested Every Batch', kisanMitra: true, typicalTrader: false },
  { feature: 'Dedicated Customer Support', kisanMitra: true, typicalTrader: 'Variable' },
];

export const whatWeDoSections = [
  {
    slug: 'import-export',
    icon: 'Ship',
    title: 'Import & Export',
    desc: 'We facilitate seamless international trade of agri-commodities, serving 15+ countries across the Middle East, Africa, Southeast Asia, and Europe. Our team handles complete export documentation including Certificates of Origin, phytosanitary certificates, and fumigation certificates.',
    highlights: ['Nhava Sheva/JNPT, Mundra, Vizag port access', 'Container & bulk shipping capability', 'COO, phytosanitary, fumigation certs handled', 'Trade routes across 15+ countries'],
    image: 'https://images.pexels.com/photos/14020705/pexels-photo-14020705.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    slug: 'commodity-trading',
    icon: 'TrendingUp',
    title: 'Commodity Trading',
    desc: 'Our B2B trading desk connects buyers and sellers across the agri-commodity value chain. We offer wholesale and bulk order processing, mercantile agency services, and market intelligence support to help clients make informed trading decisions.',
    highlights: ['B2B trading desk', 'Wholesale & bulk order processing', 'Mercantile agency services', 'Market intelligence support'],
    image: 'https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    slug: 'processing',
    icon: 'Factory',
    title: 'Processing',
    desc: 'Our in-house processing facility handles rice milling, grading, sorting, polishing, and cleaning. With controlled processing conditions and modern machinery, we ensure consistent quality from raw grain to finished product.',
    highlights: ['Rice milling & grading', 'Optical sorting & polishing', 'Cleaning & de-stoning', 'XX MT/day processing capacity'],
    image: 'https://images.pexels.com/photos/34718922/pexels-photo-34718922.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    slug: 'packing-repacking',
    icon: 'Package',
    title: 'Packing & Re-packing',
    desc: 'We offer flexible packaging solutions from 1kg retail pouches to 50kg PP and jute bags. Our private-label and re-packing services allow brands to bring their products to market with custom packaging and branding.',
    highlights: ['PP bags, jute bags, vacuum packs', 'Retail pouches from 1kg to 50kg', 'Private-label / re-packing services', 'Custom branding available'],
    image: 'https://images.pexels.com/photos/21958122/pexels-photo-21958122.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    slug: 'sourcing-procurement',
    icon: 'Sprout',
    title: 'Sourcing & Procurement',
    desc: 'We maintain direct farmer and FPO (Farmer Producer Organisation) tie-ups across the Maharashtra and Vidarbha rice belt. Our quality-first procurement standards ensure we source the best produce while supporting local farming communities.',
    highlights: ['Direct farmer & FPO tie-ups', 'Regional sourcing across Vidarbha', 'Quality-first procurement standards', 'Farmer welfare initiatives'],
    image: 'https://images.pexels.com/photos/11070641/pexels-photo-11070641.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
];

export const milestones = [
  { year: '2024', title: 'Company Founded', desc: 'KISAN MITRA RICE TRADING PRIVATE LIMITED established in Gondia, Maharashtra.' },
  { year: '2024', title: 'Processing Facility Setup', desc: 'In-house rice milling and processing facility commissioned.' },
  { year: '2025', title: 'First Export Order', desc: 'Successfully completed first international export shipment.' },
  { year: '2025', title: 'FSSAI & APEDA Certification', desc: 'Achieved FSSAI license and APEDA registration for export compliance.' },
  { year: '2026', title: 'Product Expansion', desc: 'Expanded product portfolio to 50+ products across 7 categories.' },
];

export const natureOfBusiness = `To enter into the business of import, export, processing, packing, re-packing, trading in, purchase, sale and to act as mercantile agents or otherwise in any other manner deal in all types of agricultural produce, soybean, wheat, rice & rice products, maize, all types of cereals, pulses, dhal, oats, cash crops, sugar cane, sugar, vegetables, and fruits including dehydrated fruits and vegetables and their products, preserved fruits, dry fruits, jam, pickles, masalas, masala mixes, coffee.`;

export const companySnapshot = [
  { label: 'Legal Name', value: 'KISAN MITRA RICE TRADING PRIVATE LIMITED' },
  { label: 'Registered Address', value: '1942-207/8, Narayan Nagar, Kidgipar Road, Bangaon, Amgaon, Amgaon, Gondia – 441902, Maharashtra, India' },
  { label: 'Industry', value: 'Agri-Commodity Trading, Import/Export & Processing' },
  { label: 'Year Established', value: '2024' },
  { label: 'CIN', value: 'U01100MH2024PTC123456' },
  { label: 'GST', value: '27AABCK1234L1Z5' },
  { label: 'Certifications', value: 'FSSAI, APEDA, ISO 22000/HACCP (in process)' },
];

import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Check,
  X,
  ExternalLink,
  Tag,
  Menu,
  ChevronRight,
  Star
} from 'lucide-react';

// Exact brand assets provided
const LOGO_URL = "https://res.cloudinary.com/fzobzdco/image/upload/v1790632095/583799428_832259419722687_4908633520466579296_n.jpg";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Dresses' | 'Tops' | 'Outerwear' | 'Shoes' | 'Bags' | 'Vintage';
  price: number;
  condition: 'Mint' | 'Like New' | 'Pristine Vintage' | 'Grade A';
  size: string;
  isThreeForFifteen: boolean;
  image: string;
  description: string;
  details: string[];
}

// Exactly all 20 uploaded assets assigned to their authentic sections & product listings
const CATALOG: Product[] = [
  {
    id: 'prod-1',
    name: 'Michael Kors Coral Peplum Chiffon Blouse & Chevron Shift',
    brand: 'Michael Kors / Boutique',
    category: 'Tops',
    price: 8,
    condition: 'Like New',
    size: 'M',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632095/791045626_1788054842207494_7294650797504994336_n.jpg',
    description: 'Breezy textured coral peplum top featuring fluttering ruffle sleeves and sheer burnout pattern paired with a retro chevron printed daytime dress.',
    details: ['100% Breathable Chiffon', 'V-Neckline cut', 'Ruffle flutter cap sleeves', 'Single unique piece']
  },
  {
    id: 'prod-2',
    name: 'Vibrant Fuchsia Button-Front Sheath Dress & Watercolor Midi',
    brand: 'Studio Designer',
    category: 'Dresses',
    price: 12,
    condition: 'Mint',
    size: 'S / 6',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632095/783036045_1066296069652353_3971114050956907548_n.jpg',
    description: 'Electric magenta tailored sheath with statement asymmetrical tortoiseshell button detailing, shown alongside an artistic watercolor pleated sundress.',
    details: ['Contoured tailored silhouette', 'Side horn-finish buttons', 'Fully lined interior', 'Zero fabric wear']
  },
  {
    id: 'prod-3',
    name: 'Karen Scott Regal Violet Paisley V-Neck & Beaded Knit',
    brand: 'Karen Scott / LOFT',
    category: 'Tops',
    price: 7,
    condition: 'Like New',
    size: 'Petite S',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632095/786141070_1066295982985695_6032766889409331683_n.jpg',
    description: 'Intricate royal purple and cream baroque damask print 3/4 sleeve top accompanied by a soft periwinkle sweater with silver bead accents.',
    details: ['Super-soft cotton-poly blend', 'Flattering notched V-neck', 'Embellished bead bands', 'Clean neckline']
  },
  {
    id: 'prod-4',
    name: "Chico's Sunset Coral Reptile-Texture Utility Jacket",
    brand: "Chico's",
    category: 'Outerwear',
    price: 18,
    condition: 'Pristine Vintage',
    size: 'Chico size 1 (US 8-10)',
    isThreeForFifteen: false,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632096/786243478_1066295892985704_6259802408840891017_n.jpg',
    description: 'A striking statement jacket in rich terracotta coral with subtle textured python embossing, metal toggle cinch cords, and high funnel collar.',
    details: ['Heavy duty gunmetal hardware', 'Adjustable toggle waist cinch', 'Hidden zip with storm flap', 'Rare signature colorway']
  },
  {
    id: 'prod-5',
    name: 'Jones New York Crisp Poplin Shirt & Pilcro Striped Blouse',
    brand: 'Jones New York / Pilcro',
    category: 'Tops',
    price: 9,
    condition: 'Like New',
    size: 'M',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632096/800166864_1075578342057459_4360251538060085625_n.jpg',
    description: 'Essential wardrobe foundations: Crisp white structured tailored blouse by Jones New York and a coastal rose-striped gauze peasant top by Pilcro.',
    details: ['100% fine cotton weave', 'Mother of pearl buttons', 'Gathered ruffle shoulders', 'Styled with pastel denim']
  },
  {
    id: 'prod-6',
    name: 'Blush Scalloped Lace High-Low Gown & Slip Dress',
    brand: 'Evening Atelier',
    category: 'Dresses',
    price: 14,
    condition: 'Grade A',
    size: 'M / 8',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632096/787083565_1066296076319019_1915040197250578478_n.jpg',
    description: 'Romantic vintage dusty rose cocktail dress with corded floral lace, scalloped neckline, and a sweeping high-low hem, paired with a modern blush cami slip.',
    details: ['Intricate floral lace overlay', 'Satin inner slip', 'High-low dynamic hemline', 'Subtle shimmer threads']
  },
  {
    id: 'prod-7',
    name: 'Ruby Rd Watercolor Tunic & Nicola Mint Accordion Top',
    brand: 'Ruby Rd / Nicola',
    category: 'Tops',
    price: 8,
    condition: 'Mint',
    size: 'Petite S',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632096/800166866_1075578472057446_2934408722890927314_n.jpg',
    description: 'Bright jewel-neck striped pastel floral top with rhinestone collar trim alongside a vibrant mint turquoise accordion crinkle stretch micro-pleat blouse.',
    details: ['Faceted acrylic jewel collar', 'Ultra-stretchy smocked bodice', 'Vibrant cheerful palette', 'Tags still intact on Nicola top']
  },
  {
    id: 'prod-8',
    name: 'Metallic Champagne & Charcoal Lace Evening Sheath',
    brand: 'Vintage Occasions',
    category: 'Dresses',
    price: 16,
    condition: 'Pristine Vintage',
    size: 'L / 12',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632096/800644008_1075578372057456_2937654764227039597_n.jpg',
    description: 'Glamorous gilded cocktail dress featuring bronze-champagne embroidered lace over deep onyx backing, finished with velvet waist banding.',
    details: ['Double velvet waist ribboning', 'Scalloped cap sleeves', 'Concealed center back zipper', 'Authentic vintage condition']
  },
  {
    id: 'prod-9',
    name: 'Michael Kors Canvas & Croc-Embossed Top Handle Satchel',
    brand: 'Michael Kors',
    category: 'Bags',
    price: 28,
    condition: 'Grade A',
    size: 'Medium Satchel',
    isThreeForFifteen: false,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632096/787221674_1066295972985696_1844499153541347247_n.jpg',
    description: 'Structured designer satchel constructed from durable woven natural canvas framed by rich caramel croc-embossed trim, gold logo plaque, and shoulder strap.',
    details: ['Polished gold-tone metal hardware', 'Detachable cross-body strap', 'Dual rolled leather handles', 'Clean interior lining']
  },
  {
    id: 'prod-10',
    name: 'Vintage Italian Monogram Cream Leather Crossbody Bucket',
    brand: 'Italian Vintage Heritage',
    category: 'Bags',
    price: 42,
    condition: 'Pristine Vintage',
    size: 'Classic Crossbody',
    isThreeForFifteen: false,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632097/787903868_1066296129652347_4213290918688418835_n.jpg',
    description: 'Timeless retro ivory leather bucket-style bag featuring embossed interlocking archival medallion, structured base, and adjustable shoulder strap.',
    details: ['Embossed vintage crest badge', 'Genuine supple cream leather', 'Tubular crossbody strap', 'Rare collector condition']
  },
  {
    id: 'prod-11',
    name: 'LOFT Terracotta Chiffon Camisole & Lace Trim Tank',
    brand: 'LOFT',
    category: 'Tops',
    price: 6,
    condition: 'Like New',
    size: 'S',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632096/788463811_1066296202985673_8979011761525010222_n.jpg',
    description: 'Layering essentials: double-layer coral crepe cami with adjustable spaghetti straps paired with an airy white camisole with scallop eyelash lace hem.',
    details: ['Double layer sheer chiffon hem', 'Strappy open back detailing', 'French lace border', 'Featherlight summer feel']
  },
  {
    id: 'prod-12',
    name: 'MEROZZI Rhinestone Buckle Cognac Cork Wedge Slides',
    brand: 'MEROZZI',
    category: 'Shoes',
    price: 10,
    condition: 'Like New',
    size: 'US 7.5',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632097/788002193_1066296192985674_7363379940318487082_n.jpg',
    description: 'Comfort meets retro summer glam: cognac brown faux leather wide strap slide sandals with pavé crystal buckle brooch on natural textured cork wedges.',
    details: ['Cushioned footbed with arch comfort', '3.5-inch textured cork platform', 'Gold-tone jewel ornament', 'Non-slip traction sole']
  },
  {
    id: 'prod-13',
    name: 'GUESS Nude Patent Leather Peep-Toe Stiletto Pumps',
    brand: 'GUESS',
    category: 'Shoes',
    price: 14,
    condition: 'Like New',
    size: 'US 8',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632098/800826398_1075578492057444_7475060354743425513_n.jpg',
    description: 'Sleek and polished nude patent leather high heels with classic peep-toe cut and slender stiletto heel, perfect for formal outings or workwear.',
    details: ['Glossy mirror patent exterior', '4-inch slim tailored heel', 'Classic almond peep toe', 'Lightly worn sole, mint upper']
  },
  {
    id: 'prod-14',
    name: 'Navy Blue & Alabaster Guipure Lace Shift Dress',
    brand: 'Boutique Collection',
    category: 'Dresses',
    price: 12,
    condition: 'Mint',
    size: 'M / 8',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632098/788261436_1066296096319017_2303785494715787431_n.jpg',
    description: 'Chic Parisian-inspired sleeveless dress adorned in rich navy botanical lace pattern over an alabaster foundation with a neat boat neck.',
    details: ['Substantial guipure floral lace', 'Mod A-line silhouette', 'Boat neckline with back zipper', 'Ideal for garden parties & work']
  },
  {
    id: 'prod-15',
    name: 'Bohemian Ivory Crochet Lace Halter Tunic Dress',
    brand: 'Artisan Thrift',
    category: 'Dresses',
    price: 10,
    condition: 'Pristine Vintage',
    size: 'M',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632098/800826398_1075578425390784_7565897072110687839_n.jpg',
    description: 'Effortless vintage bohemian halter tunic crafted in rich openwork geometric lace with delicate keyhole back closure and eyelash fringe hem.',
    details: ['High halter neck with dual buttons', 'Intricate diamond lace weave', 'Scalloped fringed hem', 'Breathable jersey lining']
  },
  {
    id: 'prod-16',
    name: 'Champagne Gold Glitter Star Lace-Up Fashion Sneakers',
    brand: 'Not Rated / Streetwear',
    category: 'Shoes',
    price: 12,
    condition: 'Like New',
    size: 'US 6.5',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632098/800965816_1075578348724125_4572633997248964465_n.jpg',
    description: 'Trendsetting street-style sneakers encrusted with shimmering champagne gold glitter, distressed faux suede star appliqué, and contrast laces.',
    details: ['Full glitter canvas upper', 'Distressed vintage star motif', 'Comfort foam insole', 'Clean white vulcanized foxing']
  },
  {
    id: 'prod-17',
    name: '90s Embroidered Floral Corduroy Button Pinafore Dress',
    brand: 'True Vintage 90s',
    category: 'Vintage',
    price: 15,
    condition: 'Pristine Vintage',
    size: 'S / 4-6',
    isThreeForFifteen: true,
    image: 'https://res.cloudinary.com/fzobzdco/image/upload/v1790632098/800644023_1075578378724122_5475087315098296687_n.jpg',
    description: 'Authentic 1990s oatmeal babycord dress featuring silver disc buttons down the entire front and hand-style embroidered pastel wild daisies.',
    details: ['Soft textured ribbed corduroy', 'Full button-through front', 'Embroidered yellow, pink & blue daisies', 'Wide pinafore straps']
  },
];

// Special event posters & photography
const FLYER_BLUE = "https://res.cloudinary.com/fzobzdco/image/upload/v1790632099/813406689_1065980609387168_5182091104701440884_n.jpg"; // Image #18
const FLYER_PINK = "https://res.cloudinary.com/fzobzdco/image/upload/v1790632099/802858794_1098499349297327_7186892584862108271_n.jpg"; // Image #19
const STORE_INTERIOR = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80"; // Image #20

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'sale' | 'lookbook' | 'about' | 'contact'>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [dealFilterOnly, setDealFilterOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [addedAlert, setAddedAlert] = useState<string | null>(null);

  // Cart actions
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setAddedAlert(`Added "${product.name.slice(0, 24)}..." to your bag!`);
    setTimeout(() => setAddedAlert(null), 3200);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 3 for $15 calculation logic
  const { bundleDiscount, subtotal, finalTotal, eligibleItemsCount } = useMemo(() => {
    let rawSubtotal = 0;
    let totalEligibleUnits = 0;

    cart.forEach((item) => {
      rawSubtotal += item.product.price * item.quantity;
      if (item.product.isThreeForFifteen) {
        totalEligibleUnits += item.quantity;
      }
    });

    const bundleGroups = Math.floor(totalEligibleUnits / 3);
    // Bundle price is $15 for 3 items
    // Calculate standard cost of those bundle items vs $15
    let discount = 0;
    if (bundleGroups > 0) {
      // Find average eligible unit price
      const eligibleItems: number[] = [];
      cart.forEach((item) => {
        if (item.product.isThreeForFifteen) {
          for (let i = 0; i < item.quantity; i++) {
            eligibleItems.push(item.product.price);
          }
        }
      });
      // Sort descending to give maximum savings
      eligibleItems.sort((a, b) => b - a);
      const bundledPrices = eligibleItems.slice(0, bundleGroups * 3);
      const originalSum = bundledPrices.reduce((a, b) => a + b, 0);
      const discountedSum = bundleGroups * 15;
      discount = Math.max(0, originalSum - discountedSum);
    }

    return {
      subtotal: rawSubtotal,
      bundleDiscount: discount,
      finalTotal: Math.max(0, rawSubtotal - discount),
      eligibleItemsCount: totalEligibleUnits
    };
  }, [cart]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return CATALOG.filter((p) => {
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchesDeal = dealFilterOnly ? p.isThreeForFifteen : true;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesDeal && matchesSearch;
    });
  }, [categoryFilter, dealFilterOnly, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1e1b4b] font-sans antialiased selection:bg-[#ec4899] selection:text-white">
      {/* Toast Notification */}
      {addedAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1b4b] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-[#ec4899]/30 flex items-center gap-3 animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-[#ec4899] flex items-center justify-center text-white">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">{addedAlert}</p>
            <p className="text-xs text-stone-300">HVHS Thrift Bag updated</p>
          </div>
        </div>
      )}

      {/* Main Sticky Minimal Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Original Uploaded Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={LOGO_URL}
              alt="HVHS Thrift Boutique Logo"
              className="h-14 w-auto object-contain rounded-lg p-0.5 border border-stone-100 shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="text-xl font-black tracking-tight text-[#1e1b4b] group-hover:text-[#ec4899] transition-colors leading-none">
                HVHS Thrift Boutique
              </div>
              <div className="text-[11px] font-semibold text-stone-500 tracking-wider uppercase mt-1">
                Curated Fashion & Vintage Finds
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'shop', label: 'Shop Rack' },
              { id: 'sale', label: '3 for $15 Sale' },
              { id: 'lookbook', label: 'Lookbook' },
              { id: 'about', label: 'About & Impact' },
              { id: 'contact', label: 'Visit & Hours' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1e1b4b] text-white shadow-xs'
                    : 'text-stone-700 hover:text-[#ec4899] hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setActiveTab('shop');
                setDealFilterOnly(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#facc15] hover:bg-[#eab308] text-[#1e1b4b] shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <Tag className="w-3.5 h-3.5" />
              3 for $15 Deals
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-[#1e1b4b] transition-colors cursor-pointer"
              title="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ec4899] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fade-in">
            {[
              { id: 'home', label: 'Home' },
              { id: 'shop', label: 'Shop Curated Rack' },
              { id: 'sale', label: 'Big 3 for $15 Sale Event' },
              { id: 'lookbook', label: 'Editorial Lookbook' },
              { id: 'about', label: 'About & Animal Rescue Impact' },
              { id: 'contact', label: 'Store Hours & Location' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1e1b4b] text-white'
                    : 'text-stone-800 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area Based on Active Tab */}
      <main>
        {activeTab === 'home' && (
          <>
            {/* Cinematic Hero Section */}
            <section className="relative overflow-hidden bg-[#0f172a] text-white">
              {/* Background photography from uploaded boutique interior */}
              <div className="absolute inset-0 z-0">
                <img
                  src={STORE_INTERIOR}
                  alt="HVHS Thrift Boutique Curated Racks"
                  className="w-full h-full object-cover object-center filter brightness-40 scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/95 via-[#0f172a]/80 to-transparent" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
                <div className="max-w-2xl space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                    Second-Hand Style. First-Class Finds.
                  </h1>

                  <p className="text-lg sm:text-xl text-stone-200 leading-relaxed font-normal">
                    Discover hand-selected designer apparel, vintage accessories, and curated clothing
                    treasures. Shop our signature blowout sales where hundreds of items are 3 for $15!
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('shop')}
                      className="px-7 py-4 rounded-full bg-[#ec4899] hover:bg-[#db2777] text-white font-bold text-base shadow-xl hover:shadow-[#ec4899]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                    >
                      Browse Boutique Collection
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setActiveTab('sale')}
                      className="px-7 py-4 rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#1e1b4b] font-extrabold text-base shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                    >
                      <Tag className="w-5 h-5 text-[#1e1b4b]" />
                      3 For $15 Sale Info
                    </button>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 text-stone-300">
                    <div>
                      <div className="text-2xl font-black text-[#facc15]">100%</div>
                      <div className="text-xs font-medium">Curated Secondhand</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-[#38bdf8]">1-of-1</div>
                      <div className="text-xs font-medium">Rare Vintage Pieces</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-[#10b981]">100%</div>
                      <div className="text-xs font-medium">Community Driven</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Marquee Ticker */}
            <div className="bg-[#facc15] text-[#1e1b4b] font-black text-sm tracking-wider uppercase py-3 overflow-hidden border-y border-[#eab308]">
              <div className="whitespace-nowrap flex gap-12 animate-marquee">
                <span>✦ ALL CLOTHING & SHOES 3 FOR $15 ✦</span>
                <span>✦ VISIT US AT 200 QUAKER RD, POMONA NY ✦</span>
                <span>✦ SATURDAY & SUNDAY 11:00 AM - 3:00 PM ✦</span>
                <span>✦ THURSDAYS 4:00 PM - 6:30 PM ✦</span>
                <span>✦ VINTAGE DRESSES, COATS, FOOTWEAR & HANDBAGS ✦</span>
                <span>✦ ALL PROCEEDS SUPPORT LOCAL ANIMAL WELFARE PROGRAMS ✦</span>
              </div>
            </div>

            {/* Big Sale Spotlight with Both Real Event Flyers */}
            <section className="py-16 md:py-24 bg-linear-to-b from-white to-stone-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b] tracking-tight">
                    Our Famous Twice-a-Year Clearance Sale
                  </h2>
                  <p className="mt-3 text-lg text-stone-600">
                    Held right at our Pomona boutique location. Every single clothing and shoe item
                    qualifies for our sensational 3 for $15 bundle pricing!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Flyer 1 */}
                  <div className="group relative bg-white p-4 rounded-3xl shadow-xl border border-stone-200 overflow-hidden transform hover:-translate-y-1 transition-all">
                    <div className="aspect-3/4 rounded-2xl overflow-hidden bg-stone-100">
                      <img
                        src={FLYER_BLUE}
                        alt="HVHS Thrift Shop Big Sale Schedule Flyer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#1e1b4b] text-lg">Official Sale Schedule</h3>
                        <p className="text-sm text-stone-500">Bring your shopping bags!</p>
                      </div>
                      <span className="bg-[#1e1b4b] text-[#facc15] font-black px-3 py-1 rounded-full text-xs">
                        3 FOR $15
                      </span>
                    </div>
                  </div>

                  {/* Flyer 2 */}
                  <div className="group relative bg-white p-4 rounded-3xl shadow-xl border border-stone-200 overflow-hidden transform hover:-translate-y-1 transition-all">
                    <div className="aspect-3/4 rounded-2xl overflow-hidden bg-stone-100">
                      <img
                        src={FLYER_PINK}
                        alt="HVHS Thrift Shop Autumn Big Sale 200 Quaker Rd Pomona NY"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#1e1b4b] text-lg">Location & Directions</h3>
                        <p className="text-sm text-stone-500">200 Quaker Rd, Pomona NY 10970</p>
                      </div>
                      <span className="bg-[#ec4899] text-white font-black px-3 py-1 rounded-full text-xs">
                        ALL SHOES & CLOTHES
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Schedule Quick Box */}
                <div className="mt-12 bg-linear-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] text-white rounded-3xl p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center lg:text-left">
                    <h3 className="text-2xl font-black text-[#facc15]">
                      Shop the Racks This Week
                    </h3>
                    <p className="text-stone-300 text-sm max-w-xl">
                      <strong>Thursdays:</strong> 4:00 PM – 6:30 PM &nbsp;|&nbsp;{' '}
                      <strong>Saturdays & Sundays:</strong> 11:00 AM – 3:00 PM. No appointments needed!
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="https://maps.google.com/?q=200+Quaker+Rd+Pomona+NY+10970"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#1e1b4b] font-bold text-sm shadow transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=100088159085676"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Facebook Page
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Curated Products Grid */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b] tracking-tight">
                    Current Curated Rack Arrivals
                  </h2>
                  <p className="mt-2 text-stone-600 text-base">
                    Every piece shown is authentic and photographed directly from our boutique inventory.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#ec4899] hover:text-[#db2777] cursor-pointer"
                >
                  View Complete Inventory ({CATALOG.length} items)
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {CATALOG.slice(0, 8).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    onAddToCart={() => addToCart(product)}
                    onQuickView={() => setQuickViewProduct(product)}
                  />
                ))}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-8 py-4 rounded-full bg-[#1e1b4b] hover:bg-[#312e81] text-white font-bold text-base shadow-lg transition-transform hover:scale-105 cursor-pointer inline-flex items-center gap-2"
                >
                  Explore All Clothing & Shoes
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </section>

            {/* Lookbook Preview Strip */}
            <section className="py-16 bg-stone-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <h2 className="text-3xl font-black text-[#1e1b4b]">
                    Curated Thrift Style Inspiration
                  </h2>
                  <p className="text-stone-600 mt-2">
                    Vintage chic, casual elegance, and timeless silhouettes selected by Kathy and the
                    HVHS team.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {CATALOG.slice(8, 12).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setQuickViewProduct(item)}
                      className="group relative rounded-2xl overflow-hidden shadow-md bg-white aspect-3/4 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                        <span className="text-xs font-semibold text-[#facc15]">{item.brand}</span>
                        <h4 className="font-bold text-sm leading-snug">{item.name}</h4>
                        <span className="text-xs font-bold text-[#ec4899] mt-1">
                          {item.isThreeForFifteen ? '3 for $15 Eligible' : `$${item.price}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Community & Thrift Mission */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b] leading-tight">
                      Fashion with a Heart for Rockland County Animals
                    </h2>
                    <p className="text-stone-600 text-base leading-relaxed">
                      HVHS Thrift Boutique was created to unite second-hand fashion lovers with a noble
                      cause. Every purchase, donation, and visit directly helps fund the welfare, food,
                      veterinary care, and adoption initiatives of the Hudson Valley Humane Society.
                    </p>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                        <p className="text-stone-700 text-sm font-medium">
                          <strong>Zero Textile Waste:</strong> Keeping beautiful garments out of landfills through thoughtful re-homing.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#ec4899]/20 text-[#ec4899] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                        <p className="text-stone-700 text-sm font-medium">
                          <strong>Exceptional Value:</strong> Designer labels at everyday affordable prices so anyone can look great.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#facc15]/30 text-[#1e1b4b] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                        <p className="text-stone-700 text-sm font-medium">
                          <strong>Compassionate Mission:</strong> Supporting shelter pets, dogs, and cats in New City and Pomona, NY.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                      <img
                        src="https://res.cloudinary.com/fzobzdco/image/upload/v1790632098/800644023_1075578378724122_5475087315098296687_n.jpg"
                        alt="Vintage embroidered corduroy dress detail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Floating quote badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 max-w-xs">
                      <p className="text-xs text-stone-600 italic">
                        "Shopping secondhand isn't just about saving money; it's about giving loved garments a new life and helping animals in need."
                      </p>
                      <p className="text-xs font-bold text-[#1e1b4b] mt-2">— Kathy, HVHS Thrift</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-stone-50 border-t border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b]">
                    Community Shopper Testimonials
                  </h2>
                  <p className="mt-2 text-stone-600 text-base">
                    What local fashion hunters and thrift enthusiasts love about our boutique pop-ups.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Sarah M.',
                      city: 'New City, NY',
                      comment:
                        'The 3 for $15 deal is unbeatable! I walked out with a gorgeous evening dress, brand-name shoes, and a summer blouse for less than dinner. Will definitely be back every weekend!',
                      rating: 5
                    },
                    {
                      name: 'David L.',
                      city: 'Pomona, NY',
                      comment:
                        'Super organized boutique and lovely volunteers. You can tell every piece is inspected before going onto the racks. Knowing the money helps animals makes it even better.',
                      rating: 5
                    },
                    {
                      name: 'Elena R.',
                      city: 'Rockland County',
                      comment:
                        'Found a genuine vintage designer handbag and immaculate patent pumps. The boutique feels warm and welcoming, nothing like messy chaotic thrift stores.',
                      rating: 5
                    }
                  ].map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-7 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex gap-1 text-[#facc15]">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-stone-700 text-sm leading-relaxed italic">
                          "{review.comment}"
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-stone-100">
                        <div className="font-bold text-[#1e1b4b] text-sm">{review.name}</div>
                        <div className="text-xs text-stone-500">{review.city}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Shop Tab */}
        {activeTab === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-200">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#1e1b4b]">
                  Curated Thrift Catalogue
                </h1>
                <p className="text-stone-600 mt-1 text-sm sm:text-base">
                  Showing authentic one-of-one pieces currently on display in our boutique racks.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dresses, tops, shoes, bags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899] bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="py-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Dresses', 'Tops', 'Outerwear', 'Shoes', 'Bags', 'Vintage'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-[#1e1b4b] text-white shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setDealFilterOnly(!dealFilterOnly)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  dealFilterOnly
                    ? 'bg-[#ec4899] text-white ring-2 ring-[#ec4899]/30'
                    : 'bg-white border border-stone-200 text-[#1e1b4b] hover:bg-stone-50'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                Only 3 For $15 Eligible Items
              </button>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-stone-200 p-8 my-8">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#1e1b4b]">No pieces matched your filters</h3>
                <p className="text-stone-500 text-sm mt-1">Try clearing your search query or selecting a different category.</p>
                <button
                  onClick={() => {
                    setCategoryFilter('All');
                    setDealFilterOnly(false);
                    setSearchQuery('');
                  }}
                  className="mt-4 px-5 py-2 rounded-full bg-[#1e1b4b] text-white text-xs font-bold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    onAddToCart={() => addToCart(product)}
                    onQuickView={() => setQuickViewProduct(product)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3 for $15 Sale Page */}
        {activeTab === 'sale' && (
          <div className="py-12 bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-black text-[#1e1b4b] tracking-tight">
                  All Clothing & Shoes: 3 for $15
                </h1>
                <p className="mt-4 text-stone-600 text-base sm:text-lg">
                  Every summer and winter, HVHS Thrift Boutique opens its doors with this legendary sale.
                  Mix and match tops, dresses, skirts, jeans, sneakers, and heels!
                </p>
              </div>

              {/* Both Authentic Flyers Displayed Side by Side */}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-200">
                  <div className="aspect-3/4 rounded-2xl overflow-hidden bg-stone-100">
                    <img
                      src={FLYER_BLUE}
                      alt="Thrift Shop Big Sale - Starting Today! 3 for $15"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="text-xl font-bold text-[#1e1b4b]">Twice A Year Mega Sale</h3>
                    <p className="text-sm text-stone-600">
                      Take advantage of steep markdowns across all standard rack clothing and footwear.
                      Every 3 items bundle automatically into $15 at checkout!
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-200">
                  <div className="aspect-3/4 rounded-2xl overflow-hidden bg-stone-100">
                    <img
                      src={FLYER_PINK}
                      alt="All Clothing & Shoes 3 for $15 200 Quaker Rd Pomona NY"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-6 space-y-2">
                    <h3 className="text-xl font-bold text-[#1e1b4b]">Location & Hours Detail</h3>
                    <p className="text-sm text-stone-600">
                      Located at <strong>200 Quaker Rd, Pomona, NY 10970</strong>. Plenty of free parking
                      on-site. Bring your own reusable shopping bags!
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Bundle Builder Widget */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-200">
                  <div>
                    <h3 className="text-2xl font-black text-[#1e1b4b]">
                      Interactive 3 for $15 Bundle Calculator
                    </h3>
                    <p className="text-sm text-stone-600 mt-1">
                      You currently have <span className="font-bold text-[#ec4899]">{eligibleItemsCount}</span> eligible items in your bag.
                      {eligibleItemsCount % 3 !== 0 && (
                        <span> Add <span className="font-bold text-[#1e1b4b]">{3 - (eligibleItemsCount % 3)}</span> more eligible item(s) to complete another $15 bundle!</span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('shop');
                      setDealFilterOnly(true);
                    }}
                    className="px-6 py-3 rounded-full bg-[#ec4899] hover:bg-[#db2777] text-white font-bold text-sm cursor-pointer"
                  >
                    Add More Eligible Items
                  </button>
                </div>

                <div className="mt-6 grid sm:grid-cols-3 gap-4">
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 text-center">
                    <div className="text-xs text-stone-500 font-bold uppercase">Standard Individual Total</div>
                    <div className="text-2xl font-black text-stone-700 mt-1">${subtotal.toFixed(2)}</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 text-center">
                    <div className="text-xs text-[#10b981] font-bold uppercase">Your Bundle Savings</div>
                    <div className="text-2xl font-black text-[#10b981] mt-1">-${bundleDiscount.toFixed(2)}</div>
                  </div>
                  <div className="bg-[#1e1b4b] p-4 rounded-2xl text-center text-white">
                    <div className="text-xs text-[#facc15] font-bold uppercase">Final Estimated Total</div>
                    <div className="text-2xl font-black text-white mt-1">${finalTotal.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lookbook Tab */}
        {activeTab === 'lookbook' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-black text-[#1e1b4b]">
                The HVHS Curated Lookbook
              </h1>
              <p className="mt-3 text-stone-600 text-base">
                Discover the beauty of sustainable fashion. Authentic textures, vintage lace,
                hand-beaded knits, and designer accessories.
              </p>
            </div>

            {/* Masonry-Style Lookbook Grid using all authentic images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATALOG.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setQuickViewProduct(item)}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md group cursor-pointer"
                >
                  <div className="relative aspect-4/5 overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1e1b4b]">
                      Look #{index + 1}
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#ec4899]">{item.category}</span>
                      <span className="text-stone-400 font-medium">Condition: {item.condition}</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#1e1b4b] group-hover:text-[#ec4899] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-[#1e1b4b]">
                        {item.isThreeForFifteen ? '3 for $15 Tag' : `$${item.price}`}
                      </span>
                      <span className="text-xs font-bold text-[#ec4899] flex items-center gap-1">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About & Impact Tab */}
        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl font-black text-[#1e1b4b]">
                  Where Thrifting Meets Compassion
                </h1>
                <p className="text-stone-600 text-lg leading-relaxed">
                  HVHS Thrift Boutique operates with a singular focus: to offer Rockland County an inspiring,
                  curated thrift shopping experience where 100% of proceeds go directly toward animal rescue,
                  shelter operations, veterinary aid, and adoption services.
                </p>
                <p className="text-stone-600 text-base leading-relaxed">
                  Organized and run with love by Kathy and passionate local volunteers, our boutique transforms
                  pre-loved garments into lifesaving resources for cats, dogs, and animals in our community.
                </p>
                <div className="p-6 bg-stone-100 rounded-2xl border-l-4 border-[#ec4899] space-y-1">
                  <p className="text-sm font-bold text-[#1e1b4b]">Have Quality Items to Donate?</p>
                  <p className="text-xs text-stone-600">
                    We gratefully accept gently used clothing, clean shoes, vintage accessories, and designer goods during opening hours.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
                <img
                  src={LOGO_URL}
                  alt="HVHS Logo with Dog & Cat Mascot"
                  className="w-full h-auto p-12 bg-white object-contain"
                />
              </div>
            </div>

            {/* Impact Numbers */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: '10,000+', label: 'Garments Re-homed' },
                { number: '100%', label: 'Non-Profit Support' },
                { number: '3 for $15', label: 'Unbeatable Community Pricing' },
                { number: 'Countless', label: 'Animal Lives Touched' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-stone-200 text-center shadow-xs">
                  <div className="text-3xl font-black text-[#ec4899]">{stat.number}</div>
                  <div className="text-sm font-semibold text-[#1e1b4b] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact & Location Tab */}
        {activeTab === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl font-black text-[#1e1b4b]">
                Visit Our Boutique Racks
              </h1>
              <p className="mt-2 text-stone-600 text-base">
                We would love to welcome you in person. Stop by during our open sale hours or reach out directly.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-md space-y-8">
                <h3 className="text-2xl font-black text-[#1e1b4b]">Store Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#ec4899]/15 text-[#ec4899] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1e1b4b]">Primary Sale Location</h4>
                      <p className="text-stone-600 text-sm mt-0.5">200 Quaker Rd, Pomona, NY 10970</p>
                      <p className="text-xs text-stone-400 mt-0.5">Affiliated with Hudson Valley Humane Society</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1e1b4b]">Public Sale Hours</h4>
                      <p className="text-stone-600 text-sm mt-0.5">
                        <strong>Thursday:</strong> 4:00 PM – 6:30 PM
                      </p>
                      <p className="text-stone-600 text-sm">
                        <strong>Saturday & Sunday:</strong> 11:00 AM – 3:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/15 text-[#0284c7] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1e1b4b]">Phone Contact</h4>
                      <a
                        href="tel:19179231725"
                        className="text-stone-700 hover:text-[#ec4899] text-sm font-semibold transition-colors cursor-pointer"
                      >
                        1 (917) 923-1725
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#facc15]/20 text-[#ca8a04] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1e1b4b]">Email Inquiries</h4>
                      <a
                        href="mailto:kathygoeszoo@aol.com"
                        className="text-stone-700 hover:text-[#ec4899] text-sm font-semibold transition-colors cursor-pointer"
                      >
                        kathygoeszoo@aol.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=100088159085676"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-6 rounded-full bg-[#1e1b4b] hover:bg-[#312e81] text-white text-center font-bold text-sm shadow transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Official Facebook Page
                  </a>
                  <a
                    href="https://maps.google.com/?q=200+Quaker+Rd+Pomona+NY+10970"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-6 rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#1e1b4b] text-center font-bold text-sm shadow transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Google Maps
                  </a>
                </div>
              </div>

              {/* Message form */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-md">
                <h3 className="text-2xl font-black text-[#1e1b4b] mb-4">Send a Note to Kathy</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you! Your message has been sent to Kathy and the HVHS Thrift team.');
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-[#1e1b4b] uppercase mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1e1b4b] uppercase mb-1">Email or Phone</label>
                    <input
                      required
                      type="text"
                      placeholder="jane@example.com or (917) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1e1b4b] uppercase mb-1">Subject</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899] cursor-pointer">
                      <option>General Inquiry / Sale Questions</option>
                      <option>Item Donation Drop-off</option>
                      <option>Volunteering with the Boutique</option>
                      <option>Hold / Inquire on a Specific Garment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1e1b4b] uppercase mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ask about sizes, upcoming sale schedules, or donation drop-offs..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ec4899]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#ec4899] hover:bg-[#db2777] text-white font-bold text-sm shadow transition-transform hover:scale-101 cursor-pointer"
                  >
                    Submit Note
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Shopping Bag / Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              {/* Header */}
              <div className="p-6 bg-[#1e1b4b] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#facc15]" />
                  <h3 className="font-bold text-lg">Your Thrift Bag</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                    <p className="text-stone-600 font-semibold text-sm">Your shopping bag is empty.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setActiveTab('shop');
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#1e1b4b] text-white text-xs font-bold cursor-pointer"
                    >
                      Browse Boutique Rack
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Bundle reminder */}
                    <div className="p-3.5 rounded-xl bg-[#facc15]/20 border border-[#facc15]/40 text-xs text-[#1e1b4b] font-medium flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#ec4899] shrink-0" />
                      <div>
                        <strong>3 for $15 Active:</strong> Any 3 clothing or shoe items bundle to $15!
                      </div>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-3 rounded-xl border border-stone-200 bg-stone-50 relative"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover rounded-lg bg-white shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between text-xs">
                          <div>
                            <div className="font-bold text-stone-800 text-sm line-clamp-1">
                              {item.product.name}
                            </div>
                            <div className="text-stone-500 mt-0.5">{item.product.brand}</div>
                            <div className="text-stone-400">Size: {item.product.size}</div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="font-black text-[#1e1b4b] text-sm">
                              ${item.product.price} each
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Footer Summary */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-3">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Individual Sum:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {bundleDiscount > 0 && (
                    <div className="flex justify-between text-xs text-[#10b981] font-bold">
                      <span>3 For $15 Bundle Discount:</span>
                      <span>-${bundleDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-[#1e1b4b] pt-2 border-t border-stone-200">
                    <span>Estimated Total:</span>
                    <span className="text-[#ec4899]">${finalTotal.toFixed(2)}</span>
                  </div>

                  <p className="text-[11px] text-stone-500 leading-tight">
                    *Prototype checkout: In-person boutique pickup at 200 Quaker Rd, Pomona NY during Thursday & weekend sale hours.
                  </p>

                  <button
                    onClick={() => {
                      alert(`Thank you! Your boutique order reservation for $${finalTotal.toFixed(2)} has been recorded for pickup at 200 Quaker Rd, Pomona NY!`);
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#ec4899] hover:bg-[#db2777] text-white font-black text-sm shadow-md transition-colors cursor-pointer"
                  >
                    Reserve for In-Store Pickup
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 animate-fade-in flex flex-col md:flex-row">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-800 flex items-center justify-center shadow cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-1/2 aspect-4/5 bg-stone-100">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#1e1b4b] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {quickViewProduct.category}
                  </span>
                  <span className="bg-[#10b981]/20 text-[#10b981] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {quickViewProduct.condition}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#1e1b4b] leading-tight">
                  {quickViewProduct.name}
                </h3>

                <p className="text-xs text-stone-500 font-semibold">
                  Brand: {quickViewProduct.brand} • Size: {quickViewProduct.size}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="space-y-1 pt-2">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Item Highlights:
                  </span>
                  <ul className="text-xs text-stone-600 space-y-0.5 list-disc pl-4">
                    {quickViewProduct.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black text-[#1e1b4b]">
                    ${quickViewProduct.price}
                  </div>
                  {quickViewProduct.isThreeForFifteen && (
                    <span className="bg-[#facc15] text-[#1e1b4b] font-black text-xs px-2.5 py-1 rounded-full">
                      3 for $15 Eligible
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 rounded-full bg-[#ec4899] hover:bg-[#db2777] text-white font-bold text-sm cursor-pointer shadow transition-colors"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-3 rounded-full border border-stone-200 hover:bg-stone-50 text-[#1e1b4b] cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(quickViewProduct.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-stone-600'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer with Original Logo */}
      <footer className="bg-[#1e1b4b] text-white pt-16 pb-12 border-t border-[#312e81]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Column 1: Logo & Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={LOGO_URL}
                  alt="HVHS Logo"
                  className="h-14 w-auto rounded-lg p-0.5 bg-white object-contain"
                />
                <div>
                  <div className="font-black text-lg text-white">HVHS Thrift Boutique</div>
                  <div className="text-[11px] text-stone-300">Hudson Valley Humane Society</div>
                </div>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Rockland County's premier non-profit thrift destination. Offering curated second-hand
                fashion, designer vintage, and community blowout sales that support local animal rescue.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#facc15] uppercase tracking-wider">
                Explore Website
              </div>
              <ul className="space-y-2 text-xs text-stone-300">
                {['home', 'shop', 'sale', 'lookbook', 'about', 'contact'].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab as any)}
                      className="hover:text-[#ec4899] capitalize transition-colors cursor-pointer"
                    >
                      {tab === 'sale' ? '3 for $15 Sale' : tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Sale Hours & Schedule */}
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#facc15] uppercase tracking-wider">
                Sale Hours & Schedule
              </div>
              <div className="text-xs text-stone-300 space-y-1.5">
                <p>
                  <strong className="text-white">Thursday:</strong> 4:00 PM – 6:30 PM
                </p>
                <p>
                  <strong className="text-white">Saturday:</strong> 11:00 AM – 3:00 PM
                </p>
                <p>
                  <strong className="text-white">Sunday:</strong> 11:00 AM – 3:00 PM
                </p>
                <p className="text-[#38bdf8] pt-1">
                  *All clothing & shoes 3 for $15 during sale hours
                </p>
              </div>
            </div>

            {/* Column 4: Contact & Social */}
            <div className="space-y-3">
              <div className="font-bold text-sm text-[#facc15] uppercase tracking-wider">
                Contact & Community
              </div>
              <div className="text-xs text-stone-300 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ec4899] shrink-0" />
                  <span>200 Quaker Rd, Pomona, NY 10970</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  <a href="tel:19179231725" className="hover:text-white cursor-pointer">
                    1 (917) 923-1725
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                  <a href="mailto:kathygoeszoo@aol.com" className="hover:text-white cursor-pointer">
                    kathygoeszoo@aol.com
                  </a>
                </div>
                <div className="pt-2">
                  <a
                    href="https://www.facebook.com/profile.php?id=100088159085676"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Follow on Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <div>
              © {new Date().getFullYear()} HVHS Thrift Boutique. All rights reserved. Supporting Hudson Valley Humane Society.
            </div>
            <div className="flex gap-4">
              <span>Sustainable Fashion</span>
              <span>•</span>
              <span>New City & Pomona, NY</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Individual Product Card Component
function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView
}: {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onQuickView: () => void;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Area */}
      <div className="relative aspect-3/4 overflow-hidden bg-stone-100 cursor-pointer" onClick={onQuickView}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Condition / Deal Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isThreeForFifteen ? (
            <span className="bg-[#facc15] text-[#1e1b4b] text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
              3 for $15
            </span>
          ) : (
            <span className="bg-[#1e1b4b] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
              Boutique Vault
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-xs text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
            {product.condition}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-xs transition-colors cursor-pointer"
          title="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-stone-600'
            }`}
          />
        </button>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="px-4 py-1.5 rounded-full bg-white text-[#1e1b4b] font-bold text-xs shadow-md hover:bg-[#facc15] transition-colors cursor-pointer"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-stone-500">
          <span>{product.brand}</span>
          <span className="font-semibold text-stone-700">Size: {product.size}</span>
        </div>

        <h3
          onClick={onQuickView}
          className="font-bold text-sm text-[#1e1b4b] line-clamp-1 group-hover:text-[#ec4899] transition-colors cursor-pointer"
        >
          {product.name}
        </h3>

        <div className="pt-2 flex items-center justify-between">
          <div>
            <div className="text-base font-black text-[#1e1b4b]">${product.price}</div>
            <div className="text-[10px] text-stone-400 font-medium">1-of-1 Piece</div>
          </div>

          <button
            onClick={onAddToCart}
            className="px-3.5 py-1.5 rounded-full bg-[#1e1b4b] hover:bg-[#ec4899] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

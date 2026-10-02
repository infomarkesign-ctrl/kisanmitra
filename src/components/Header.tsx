import { useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '@/context/RouteContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { categories, companyInfo } from '@/data/catalog';
import { Menu, X, ChevronDown, ShoppingBag, Phone, LogOut, User } from 'lucide-react';

const whatWeDoItems = [
  { slug: 'import-export', name: 'Import & Export' },
  { slug: 'commodity-trading', name: 'Commodity Trading' },
  { slug: 'processing', name: 'Processing' },
  { slug: 'packing-repacking', name: 'Packing & Re-Packing' },
  { slug: 'sourcing-procurement', name: 'Sourcing & Procurement' },
];

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products', hasDropdown: 'products' },
  { label: 'What We Do', to: '/what-we-do', hasDropdown: 'services' },
  { label: 'Quality', to: '/quality' },
  { label: 'Why Choose Us', to: '/why-choose-us' },
  { label: 'Contact Us', to: '/contact' },
];

export function Header() {
  const { path, navigate } = useRouter();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [path]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const isActive = (to: string) => {
    if (to === '/') return path === '/';
    return path.startsWith(to);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-rice-50/95 backdrop-blur-md shadow-soft' : 'bg-rice-50'
        }`}
      >
        <div className="container-page">
          <div className={`flex items-center justify-between transition-all ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 py-1" aria-label="KISAN MITRA RICE TRADING — Home">
              <img src="/logo.svg" alt="KISAN MITRA RICE TRADING logo" className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
              <div className="leading-tight">
                <div className="font-serif text-sm font-bold text-field-700 sm:text-lg">KISAN MITRA</div>
                <div className="text-[9px] font-medium uppercase tracking-wider text-wheat-600 sm:text-xs">Rice Trading</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex" ref={dropdownRef}>
              {navLinks.map(link => (
                <div key={link.label} className="relative">
                  <Link
                    to={link.to}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.to) ? 'text-field-600' : 'text-charcoal-600 hover:text-field-500'
                    }`}
                    onClick={() => link.hasDropdown && setOpenDropdown(openDropdown === link.hasDropdown ? null : link.hasDropdown)}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === link.hasDropdown ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Products Mega Menu */}
                  {link.hasDropdown === 'products' && openDropdown === 'products' && (
                    <div className="absolute left-0 top-full mt-2 w-80 rounded-xl2 border border-rice-200 bg-white p-3 shadow-card-hover">
                      <div className="grid grid-cols-1 gap-1">
                        {categories.map(cat => (
                          <Link
                            key={cat.slug}
                            to={`/products/${cat.slug}`}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-charcoal-600 transition-colors hover:bg-rice-100 hover:text-field-600"
                          >
                            <img src={cat.image} alt={cat.name} className="h-10 w-10 rounded-lg object-cover" />
                            <span className="font-medium">{cat.name}</span>
                          </Link>
                        ))}
                        <Link
                          to="/products"
                          className="mt-1 flex items-center justify-between rounded-lg bg-field-50 px-3 py-2.5 text-sm font-semibold text-field-600 transition-colors hover:bg-field-100"
                        >
                          View All 50+ Products
                          <ChevronDown className="h-4 w-4 -rotate-90" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* What We Do Dropdown */}
                  {link.hasDropdown === 'services' && openDropdown === 'services' && (
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-xl2 border border-rice-200 bg-white p-3 shadow-card-hover">
                      <div className="grid grid-cols-1 gap-1">
                        {whatWeDoItems.map(item => (
                          <Link
                            key={item.slug}
                            to={`/what-we-do/${item.slug}`}
                            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-charcoal-600 transition-colors hover:bg-rice-100 hover:text-field-600"
                          >
                            <span className="font-medium">{item.name}</span>
                            <ChevronDown className="h-4 w-4 -rotate-90 text-wheat-500" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-xl2 text-field-600 transition-colors hover:bg-rice-100">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-500 px-1 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Login/Logout Button */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-semibold text-field-600">{user.name}</span>
                    <span className="text-[10px] text-charcoal-500">{user.identifier}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl2 text-terracotta-600 transition-colors hover:bg-rice-100"
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn-primary hidden sm:inline-flex gap-2">
                  <User className="h-4 w-4" />
                  Login
                </Link>
              )}

              <Link to="/quote" className="btn-primary hidden sm:inline-flex">
                Get a Quote
              </Link>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl2 text-field-600 lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-rice-200 bg-rice-50 lg:hidden">
            <div className="container-page max-h-[calc(100vh-4rem)] overflow-y-auto py-4">
              <nav className="flex flex-col gap-1">
                {user && (
                  <div className="mb-4 rounded-lg bg-field-50 p-3 text-sm">
                    <p className="font-semibold text-field-600">{user.name}</p>
                    <p className="text-xs text-charcoal-500">{user.identifier}</p>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                        navigate('/');
                      }}
                      className="mt-2 w-full rounded-lg bg-terracotta-500 py-2 text-xs font-semibold text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
                {!user && (
                  <Link to="/login" className="btn-primary mb-4 w-full text-center gap-2 justify-center">
                    <User className="h-4 w-4" />
                    Login / Sign Up
                  </Link>
                )}
                {navLinks.map(link => (
                  <div key={link.label}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.to}
                        className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium ${
                          isActive(link.to) ? 'bg-field-50 text-field-600' : 'text-charcoal-600'
                        }`}
                      >
                        {link.label}
                      </Link>
                      {link.hasDropdown && (
                        <button
                          className="p-2.5 text-charcoal-400"
                          onClick={() => setMobileExpanded(mobileExpanded === link.hasDropdown ? null : link.hasDropdown)}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === link.hasDropdown ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    {link.hasDropdown === 'products' && mobileExpanded === 'products' && (
                      <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-rice-200 pl-3">
                        {categories.map(cat => (
                          <Link key={cat.slug} to={`/products/${cat.slug}`} className="rounded-lg px-3 py-2 text-sm text-charcoal-500">
                            {cat.name}
                          </Link>
                        ))}
                        <Link to="/products" className="rounded-lg px-3 py-2 text-sm font-semibold text-field-600">
                          View All 50+ Products →
                        </Link>
                      </div>
                    )}
                    {link.hasDropdown === 'services' && mobileExpanded === 'services' && (
                      <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-rice-200 pl-3">
                        {whatWeDoItems.map(item => (
                          <Link key={item.slug} to={`/what-we-do/${item.slug}`} className="rounded-lg px-3 py-2 text-sm text-charcoal-500">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link to="/quote" className="btn-primary mt-3 w-full">
                  Get a Quote
                </Link>
                <a href={`tel:${companyInfo.phone}`} className="btn-ghost mt-2 w-full">
                  <Phone className="h-4 w-4" /> {companyInfo.phone}
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Mobile sticky Get a Quote button */}
      <div className="fixed bottom-4 right-4 z-40 lg:hidden">
        <Link to="/quote" className="btn-primary shadow-card-hover">
          Get a Quote
        </Link>
      </div>
    </>
  );
}

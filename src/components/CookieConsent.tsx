import { useState, useEffect } from 'react';
import { Link } from '@/context/RouteContext';
import { X, Cookie } from 'lucide-react';

const STORAGE_KEY = 'kisan-mitra-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-3xl rounded-xl2 border border-rice-200 bg-white p-4 shadow-card-hover">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl2 bg-wheat-100 text-wheat-600">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-charcoal-600">
              We use cookies to enhance your browsing experience and analyse site traffic. By clicking "Accept", you consent to our use of cookies.{' '}
              <Link to="/cookie-policy" className="font-semibold text-field-600 underline">Learn more</Link>
            </p>
            <div className="mt-3 flex gap-2">
              <button onClick={handleAccept} className="btn-primary px-4 py-2 text-xs">Accept</button>
              <button onClick={() => { localStorage.setItem(STORAGE_KEY, 'rejected'); setVisible(false); }} className="btn-ghost px-4 py-2 text-xs">Decline</button>
            </div>
          </div>
          <button onClick={() => setVisible(false)} className="text-charcoal-400 hover:text-charcoal-600">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

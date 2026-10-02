import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Link, useRouter } from '@/context/RouteContext';
import { PageHero } from '@/components/Shared';
import { Truck, Wallet, ChevronRight, CheckCircle2, Minus, Plus, Lock, Smartphone, CreditCard, Landmark, Tag, X } from 'lucide-react';
import { getOfferByCouponCode, type FestivalOffer } from '@/data/festivalOffers';

const MIN_ORDER_AMOUNT = 100;

export function CheckoutPage() {
  const { items, updateQuantity, subtotal, clearCart, totalItems } = useCart();
  const { navigate } = useRouter();
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '', landmark: '',
  });
  const [couponInput, setCouponInput] = useState('');
  const [appliedOffer, setAppliedOffer] = useState<FestivalOffer | null>(null);
  const [couponError, setCouponError] = useState('');

  const shipping = 0;
  const discount = appliedOffer ? Math.round((subtotal * appliedOffer.discountPercent) / 100) : 0;
  const total = subtotal + shipping - discount;
  const belowMinOrder = subtotal < MIN_ORDER_AMOUNT;

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    const offer = getOfferByCouponCode(couponInput);
    if (!offer) {
      setAppliedOffer(null);
      setCouponError('Invalid or expired coupon code.');
      return;
    }
    setAppliedOffer(offer);
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setAppliedOffer(null);
    setCouponInput('');
    setCouponError('');
  };

  const handlePlaceOrder = () => {
    const orderId = `KM${Date.now().toString().slice(-6)}`;
    const orderData = {
      orderId, details, items, subtotal, shipping, discount,
      couponCode: appliedOffer?.couponCode ?? null,
      total, date: new Date().toISOString(),
    };
    sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
    clearCart();
    navigate('/order-confirmation');
  };

  if (items.length === 0) {
    return (
      <>
        <PageHero eyebrow="Checkout" title="Checkout" image="https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&w=1920" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
        <section className="section-pad bg-rice-50">
          <div className="container-page text-center">
            <h2 className="font-serif text-2xl font-bold text-charcoal-700">Your cart is empty</h2>
            <Link to="/products" className="btn-primary mt-4">Browse Products</Link>
          </div>
        </section>
      </>
    );
  }

  if (belowMinOrder) {
    return (
      <>
        <PageHero eyebrow="Checkout" title="Checkout" image="https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&w=1920" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
        <section className="section-pad bg-rice-50">
          <div className="container-page text-center">
            <h2 className="font-serif text-2xl font-bold text-charcoal-700">Minimum order amount is ₹{MIN_ORDER_AMOUNT}</h2>
            <p className="mt-2 text-charcoal-500">Add ₹{MIN_ORDER_AMOUNT - subtotal} more to your cart to proceed to checkout.</p>
            <Link to="/cart" className="btn-primary mt-4">Back to Cart</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Checkout"
        subtitle="Cash on Delivery — Pay when your order arrives."
        image="https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]}
      />

      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Step indicator */}
              <div className="mb-8 flex items-center gap-4">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      step >= s ? 'bg-field-500 text-white' : 'bg-rice-200 text-charcoal-400'
                    }`}>
                      {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                    </div>
                    <span className={`text-sm font-medium ${step >= s ? 'text-charcoal-700' : 'text-charcoal-400'}`}>
                      {s === 1 ? 'Delivery' : s === 2 ? 'Review' : 'Payment'}
                    </span>
                    {s < 3 && <ChevronRight className="h-4 w-4 text-charcoal-300" />}
                  </div>
                ))}
              </div>

              {/* Step 1: Delivery Details */}
              {step === 1 && (
                <div className="card p-8">
                  <h2 className="font-serif text-xl font-bold text-charcoal-700">Delivery Details</h2>
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label-field" htmlFor="name">Full Name *</label>
                        <input id="name" name="name" type="text" required value={details.name} onChange={handleDetailChange} className="input-field" />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="phone">Phone *</label>
                        <input id="phone" name="phone" type="tel" required value={details.phone} onChange={handleDetailChange} className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label className="label-field" htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" required value={details.email} onChange={handleDetailChange} className="input-field" />
                    </div>
                    <div>
                      <label className="label-field" htmlFor="address">Full Address *</label>
                      <textarea id="address" name="address" rows={3} required value={details.address} onChange={handleDetailChange} className="input-field resize-none" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label className="label-field" htmlFor="city">City *</label>
                        <input id="city" name="city" type="text" required value={details.city} onChange={handleDetailChange} className="input-field" />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="state">State *</label>
                        <input id="state" name="state" type="text" required value={details.state} onChange={handleDetailChange} className="input-field" />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="pincode">Pincode *</label>
                        <input id="pincode" name="pincode" type="text" required value={details.pincode} onChange={handleDetailChange} className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label className="label-field" htmlFor="landmark">Landmark (optional)</label>
                      <input id="landmark" name="landmark" type="text" value={details.landmark} onChange={handleDetailChange} className="input-field" />
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="btn-primary mt-6">
                    Continue to Review <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Review Order */}
              {step === 2 && (
                <div className="card p-8">
                  <h2 className="font-serif text-xl font-bold text-charcoal-700">Review Your Order</h2>
                  <div className="mt-6 divide-y divide-rice-200">
                    {items.map(item => (
                      <div key={`${item.product.id}-${item.packSize}`} className="flex items-center gap-4 py-4">
                        <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-xl2 object-cover" />
                        <div className="flex-1">
                          <h3 className="font-serif text-sm font-semibold text-charcoal-700">{item.product.name}</h3>
                          <p className="text-xs text-charcoal-400">Pack: {item.packSize} • ₹{item.product.price}/{item.product.unit}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.product.id, item.packSize, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-rice-300 text-charcoal-600 hover:bg-rice-100"><Minus className="h-3 w-3" /></button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.packSize, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-rice-300 text-charcoal-600 hover:bg-rice-100"><Plus className="h-3 w-3" /></button>
                          </div>
                        </div>
                        <span className="font-serif text-base font-bold text-charcoal-700">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
                    <button onClick={() => setStep(3)} className="btn-primary flex-1">Continue to Payment <ChevronRight className="h-4 w-4" /></button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="card p-8">
                  <h2 className="font-serif text-xl font-bold text-charcoal-700">Payment Method</h2>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-4 rounded-xl2 border-2 border-field-500 bg-field-50 p-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-field-500 text-white">
                        <Wallet className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-lg font-semibold text-charcoal-700">Cash on Delivery (COD)</h3>
                          <input type="radio" checked readOnly className="h-4 w-4 accent-field-500" />
                        </div>
                        <p className="mt-1 text-sm text-charcoal-500">Pay in cash when your order is delivered to your doorstep. No advance payment required.</p>
                      </div>
                    </div>

                    {[
                      { label: 'UPI', desc: 'Pay via Google Pay, PhonePe, Paytm & more.', icon: Smartphone },
                      { label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay accepted.', icon: CreditCard },
                      { label: 'Netbanking', desc: 'Pay directly from your bank account.', icon: Landmark },
                    ].map(({ label, desc, icon: Icon }) => (
                      <div key={label} className="flex items-start gap-4 rounded-xl2 border-2 border-rice-200 bg-rice-50 p-5 opacity-60 cursor-not-allowed">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-rice-200 text-charcoal-400">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif text-lg font-semibold text-charcoal-500">{label}</h3>
                              <span className="rounded-full bg-rice-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-charcoal-400">Unavailable</span>
                            </div>
                            <input type="radio" disabled className="h-4 w-4 accent-rice-300" />
                          </div>
                          <p className="mt-1 text-sm text-charcoal-400">{desc}</p>
                        </div>
                      </div>
                    ))}

                    <p className="mt-4 flex items-center gap-2 text-xs text-charcoal-400">
                      <Lock className="h-3.5 w-3.5" /> Your personal information is secure and will only be used for order processing.
                    </p>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-ghost">← Back</button>
                    <button onClick={handlePlaceOrder} className="btn-primary flex-1">Place Order</button>
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div>
              <div className="card p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal-700">Order Summary</h3>

                <div className="mt-4">
                  {appliedOffer ? (
                    <div className="flex items-center justify-between rounded-xl2 border border-field-300 bg-field-50 px-3 py-2">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-field-700">
                        <Tag className="h-3.5 w-3.5" /> {appliedOffer.couponCode} applied — {appliedOffer.discountPercent}% off
                      </span>
                      <button onClick={handleRemoveCoupon} aria-label="Remove coupon" className="text-charcoal-400 hover:text-terracotta-500">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={e => { setCouponInput(e.target.value); setCouponError(''); }}
                          placeholder="Coupon code"
                          className="input-field flex-1 uppercase"
                        />
                        <button onClick={handleApplyCoupon} className="btn-ghost shrink-0 px-4">Apply</button>
                      </div>
                      {couponError && <p className="mt-1.5 text-xs text-terracotta-500">{couponError}</p>}
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Items ({totalItems})</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span><Truck className="inline h-3.5 w-3.5" /> Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  {appliedOffer && (
                    <div className="flex justify-between text-field-600">
                      <span>Discount ({appliedOffer.discountPercent}%)</span>
                      <span className="font-semibold">−₹{discount}</span>
                    </div>
                  )}
                  <div className="border-t border-rice-200 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal-700">Total</span>
                      <span className="font-serif text-xl font-bold text-field-600">₹{total}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-xl2 bg-rice-100 p-3 text-center">
                  <p className="text-xs text-charcoal-500">Payment: <strong className="text-field-600">Cash on Delivery</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function OrderConfirmationPage() {
  const orderData = sessionStorage.getItem('lastOrder');
  const order = orderData ? JSON.parse(orderData) : null;

  if (!order) {
    return (
      <section className="section-pad bg-rice-50">
        <div className="container-page text-center">
          <h2 className="font-serif text-2xl font-bold text-charcoal-700">No order found</h2>
          <Link to="/products" className="btn-primary mt-4">Browse Products</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <div className="card p-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-field-100 text-field-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h1 className="mt-6 font-serif text-3xl font-bold text-charcoal-700">Order Placed Successfully!</h1>
              <p className="mt-2 text-charcoal-500">Your order <strong className="text-field-600">#{order.orderId}</strong> has been placed. Pay in cash when your order is delivered to your doorstep. Our team will call you to confirm delivery.</p>

              <div className="mt-8 rounded-xl2 bg-rice-100 p-6 text-left">
                <h3 className="font-serif text-lg font-bold text-charcoal-700">Order Summary</h3>
                <div className="mt-4 space-y-2">
                  {order.items.map((item: { product: { id: string; name: string; image: string; price: number }; packSize: string; quantity: number }) => (
                    <div key={`${item.product.id}-${item.packSize}`} className="flex items-center gap-3 text-sm">
                      <img src={item.product.image} alt={item.product.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="font-medium text-charcoal-700">{item.product.name}</div>
                        <div className="text-xs text-charcoal-400">{item.packSize} × {item.quantity}</div>
                      </div>
                      <div className="font-semibold text-charcoal-700">₹{item.product.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-rice-200 pt-4">
                  <div className="flex justify-between text-sm text-charcoal-600"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
                  <div className="flex justify-between text-sm text-charcoal-600"><span>Shipping</span><span>Free</span></div>
                  {!!order.discount && (
                    <div className="flex justify-between text-sm text-field-600"><span>Discount ({order.couponCode})</span><span>−₹{order.discount}</span></div>
                  )}
                  <div className="mt-2 flex justify-between text-base"><span className="font-semibold text-charcoal-700">Total</span><span className="font-serif text-xl font-bold text-field-600">₹{order.total}</span></div>
                </div>
                <div className="mt-4 rounded-xl2 bg-field-50 p-3 text-center">
                  <p className="text-sm text-field-600"><strong>Payment Method:</strong> Cash on Delivery</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl2 bg-wheat-50 p-4">
                <p className="text-sm text-charcoal-600"><strong>Estimated Delivery:</strong> 5–7 business days</p>
                <p className="mt-1 text-xs text-charcoal-400">Our team will call you on {order.details?.phone || 'your registered number'} to confirm before dispatch. Please keep the cash ready for delivery.</p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/products" className="btn-primary">Continue Shopping</Link>
                <Link to="/" className="btn-ghost">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

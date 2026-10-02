import { useCart } from '@/context/CartContext';
import { Link } from '@/context/RouteContext';
import { PageHero } from '@/components/Shared';
import { companyInfo, getMaxQty } from '@/data/catalog';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

const MIN_ORDER_AMOUNT = 100;

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;
  const belowMinOrder = subtotal < MIN_ORDER_AMOUNT;

  if (items.length === 0) {
    return (
      <>
        <PageHero
          eyebrow="Shopping Cart"
          title="Your Cart"
          image="https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&w=1920"
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]}
        />
        <section className="section-pad bg-rice-50">
          <div className="container-page">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rice-100 text-charcoal-400">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h2 className="mt-6 font-serif text-2xl font-bold text-charcoal-700">Your Cart is Empty</h2>
              <p className="mt-2 text-charcoal-500">Browse our products and add items to your cart.</p>
              <Link to="/products" className="btn-primary mt-6">Explore Products <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Shopping Cart"
        title="Your Cart"
        subtitle={`${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
        image="https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]}
      />

      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="card overflow-hidden">
                <div className="divide-y divide-rice-200">
                  {items.map(item => {
                    const maxQty = getMaxQty(item.product.id);
                    const atLimit = item.quantity >= maxQty;
                    return (
                    <div key={`${item.product.id}-${item.packSize}`} className="flex gap-4 p-4">
                      <Link to={`/products/${item.product.category}/${item.product.slug}`} className="shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-xl2 object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link to={`/products/${item.product.category}/${item.product.slug}`}>
                              <h3 className="font-serif text-sm font-semibold text-charcoal-700 hover:text-field-600">{item.product.name}</h3>
                            </Link>
                            <p className="mt-0.5 text-xs text-charcoal-400">Pack Size: {item.packSize}</p>
                            <p className="mt-1 text-sm font-semibold text-field-600">₹{item.product.price}/{item.product.unit}</p>
                          </div>
                          <button onClick={() => removeItem(item.product.id, item.packSize)} className="text-charcoal-400 hover:text-terracotta-500" aria-label="Remove item">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.product.id, item.packSize, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-rice-300 text-charcoal-600 hover:bg-rice-100">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-charcoal-700">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.packSize, item.quantity + 1)}
                              disabled={atLimit}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-rice-300 text-charcoal-600 hover:bg-rice-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-serif text-base font-bold text-charcoal-700">₹{item.product.price * item.quantity}</span>
                        </div>
                        {atLimit && (
                          <p className="mt-1.5 text-xs text-terracotta-500">
                            Max {maxQty} per order online. Need more? Contact{' '}
                            <a href={`mailto:${companyInfo.email}`} className="font-semibold underline">{companyInfo.email}</a>.
                          </p>
                        )}
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
              <Link to="/products" className="btn-ghost mt-4">
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div className="card p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal-700">Order Summary</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="border-t border-rice-200 pt-3">
                    <div className="flex justify-between text-base">
                      <span className="font-semibold text-charcoal-700">Total</span>
                      <span className="font-serif text-xl font-bold text-field-600">₹{total}</span>
                    </div>
                  </div>
                </div>
                {belowMinOrder ? (
                  <>
                    <button disabled className="btn-primary mt-6 w-full cursor-not-allowed opacity-40">
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </button>
                    <p className="mt-3 text-center text-xs text-terracotta-500">
                      Minimum order amount is ₹{MIN_ORDER_AMOUNT}. Add ₹{MIN_ORDER_AMOUNT - subtotal} more to checkout.
                    </p>
                  </>
                ) : (
                  <>
                    <Link to="/checkout" className="btn-primary mt-6 w-full">
                      Proceed to Checkout <ArrowRight className="h-4 w-4" />
                    </Link>
                    <p className="mt-3 text-center text-xs text-charcoal-400">Cash on Delivery available</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

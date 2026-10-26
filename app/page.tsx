
"use client";

import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Leaf,
  Truck,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

const products = [
  { id: 1, name: "White Garri", category: "Staples", price: 2800, unit: "4kg", emoji: "🌾", color: "#F4E5B9", image: "https://img3.foodyas.com/924/012/699774909240127.jpg" },
  { id: 2, name: "Yellow Garri (Ijebu-style)", category: "Staples", price: 3200, unit: "4kg", emoji: "🌾", color: "#F0D89B", image: "https://img5.foodyas.com/202/130/471963142021306.jpg" },
  { id: 3, name: "Local Rice", category: "Staples", price: 7500, unit: "5kg", emoji: "🍚", color: "#F5E9CF", image: "https://img3.foodyas.com/205/495/471626662054954.jpg" },
  { id: 4, name: "Brown Beans", category: "Staples", price: 3500, unit: "2kg", emoji: "🫘", color: "#F0DDC7", image: "https://img5.foodyas.com/260/956/432747212609566.jpg" },
  { id: 5, name: "Yam Tubers", category: "Fresh Food", price: 4500, unit: "Per tuber", emoji: "🥔", color: "#E9D8BD", image: "https://img3.foodyas.com/924/012/699774909240127.jpg" },
  { id: 6, name: "Ripe Plantain", category: "Fresh Food", price: 2500, unit: "Bunch", emoji: "🍌", color: "#F5E6A8", image: "https://img5.foodyas.com/202/130/471963142021306.jpg" },
  { id: 7, name: "Red Palm Oil", category: "Soup Ingredients", price: 4500, unit: "2 litres", emoji: "🫙", color: "#F5D8B7", image: "https://img3.foodyas.com/205/495/471626662054954.jpg" },
  { id: 8, name: "Dried Crayfish", category: "Akwa Ibom Ingredients", price: 2500, unit: "500g", emoji: "🦐", color: "#F3D9C6", image: "https://img3.foodyas.com/924/012/699774909240127.jpg" },
  { id: 9, name: "Smoked Fish", category: "Akwa Ibom Ingredients", price: 4000, unit: "Pack", emoji: "🐟", color: "#E7D5C3", image: "https://img3.foodyas.com/924/012/699774909240127.jpg" },
  { id: 10, name: "Stockfish Pieces", category: "Akwa Ibom Ingredients", price: 3500, unit: "Pack", emoji: "🐟", color: "#E9DDC8", image: "https://img5.foodyas.com/202/130/471963142021306.jpg" },
  { id: 11, name: "Periwinkle (Mfi)", category: "Akwa Ibom Ingredients", price: 2500, unit: "Pack", emoji: "🐚", color: "#E1E7D6", image: "https://img3.foodyas.com/205/495/471626662054954.jpg" },
  { id: 12, name: "Afang Leaves", category: "Soup Ingredients", price: 1500, unit: "Pack", emoji: "🥬", color: "#DCE8D3", image: "https://img5.foodyas.com/260/956/432747212609566.jpg" },
  { id: 13, name: "Waterleaf", category: "Soup Ingredients", price: 1000, unit: "Bunch", emoji: "🥬", color: "#D6E5CE", image: "https://img3.foodyas.com/924/012/699774909240127.jpg" },
  { id: 14, name: "Editan Leaves", category: "Soup Ingredients", price: 1500, unit: "Pack", emoji: "🌿", color: "#DCE8D3", image: "https://img5.foodyas.com/202/130/471963142021306.jpg" },
  { id: 15, name: "Atama Leaves", category: "Soup Ingredients", price: 1500, unit: "Pack", emoji: "🌿", color: "#DCE8D3", image: "https://img3.foodyas.com/205/495/471626662054954.jpg" },
  { id: 16, name: "Egusi Seeds", category: "Soup Ingredients", price: 3500, unit: "1kg", emoji: "🥜", color: "#E5E5C8", image: "https://img3.foodyas.com/924/012/699774909240127.jpg" },
  { id: 17, name: "Ogbono Seeds", category: "Soup Ingredients", price: 3000, unit: "500g", emoji: "🥜", color: "#E9D8BD", image: "https://img3.foodyas.com/924/012/699774909240127.jpg" },
  { id: 18, name: "Cocoyam for Ekpang", category: "Akwa Ibom Ingredients", price: 2500, unit: "Pack", emoji: "🥔", color: "#E9D8BD", image: "https://img5.foodyas.com/202/130/471963142021306.jpg" },
];

const combos = [
  { name: "Afang Soup Ingredients Pack", description: "Afang leaves, waterleaf, crayfish, smoked fish and palm oil.", price: 10500, emoji: "🥬", color: "#DCE8D3", image: "https://img3.foodyas.com/205/495/471626662054954.jpg" },
  { name: "Edikang Ikong Ingredients Pack", description: "Waterleaf, ugu, crayfish, stockfish and other soup essentials.", price: 12500, emoji: "🥣", color: "#E7E9D4", image: "https://img5.foodyas.com/260/956/432747212609566.jpg" },
  { name: "Ekpang Nkukwo Ingredients Pack", description: "Cocoyam, cocoyam leaves, periwinkle, dried fish and palm oil.", price: 15000, emoji: "🧺", color: "#F1E4C9", image: "https://img3.foodyas.com/924/012/699774909240127.jpg" },
  { name: "Atama Soup Ingredients Pack", description: "Atama leaves, palm fruit extract, periwinkle and smoked fish.", price: 12000, emoji: "🍲", color: "#F5E1C9", image: "https://img5.foodyas.com/202/130/471963142021306.jpg" },
];

const categories = ["All", "Staples", "Fresh Food", "Soup Ingredients", "Akwa Ibom Ingredients"];
const money = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

type CartItem = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  quantity: number;
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [notice, setNotice] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [category, search]
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addItem(item: { id: number; name: string; price: number; emoji: string }) {
    setCart((current) => {
      const found = current.find((p) => p.id === item.id);
      if (found) {
        return current.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
    setNotice(`${item.name} added to cart`);
    setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function orderOnWhatsApp() {
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setNotice("Please fill in your name, phone and delivery address.");
      return;
    }
    const lines = cart
      .map((item) => `${item.name} x ${item.quantity} — ${money(item.price * item.quantity)}`)
      .join("\n");
    const message = `Hello Denco Food Mart, I want to place an order.\n\nName: ${customer.name}\nPhone: ${customer.phone}\nDelivery address: ${customer.address}\n\nOrder:\n${lines}\n\nSubtotal: ${money(total)}\nPlease confirm availability and delivery fee.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  }

  function addCombo(combo: (typeof combos)[number]) {
    addItem({
      id: 100 + combos.indexOf(combo),
      name: combo.name,
      price: combo.price,
      emoji: combo.emoji,
    });
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#20382b]">
      <div className="bg-[#203f30] px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        Fresh foodstuff for your home · Convenient ordering · Friendly service
      </div>

      <header className="sticky top-0 z-30 border-b border-[#e8e6dc] bg-[#faf9f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="flex shrink-0 items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#234d37] text-2xl">🌿</span>
            <span>
              <span className="block text-xl font-black tracking-tight">Denco<span className="text-[#b86c35]">.</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#788276]">Food Mart</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#products" className="hover:text-[#b86c35]">Shop foodstuff</a>
            <a href="#combos" className="hover:text-[#b86c35]">Food bundles</a>
            <a href="#why-us" className="hover:text-[#b86c35]">Why Denco?</a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 rounded-full bg-[#234d37] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#173624]" aria-label="Open shopping cart">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">My Cart</span>
              {totalItems > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e9a45b] px-1 text-xs text-[#20382b]">{totalItems}</span>}
            </button>
            <button className="rounded-xl border border-[#e4e2d8] p-3 md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="flex flex-col gap-4 border-t border-[#e8e6dc] px-6 py-4 text-sm font-semibold md:hidden">
            <a href="#products" onClick={() => setMobileMenu(false)}>Shop foodstuff</a>
            <a href="#combos" onClick={() => setMobileMenu(false)}>Food bundles</a>
            <a href="#why-us" onClick={() => setMobileMenu(false)}>Why Denco?</a>
          </nav>
        )}
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div>
          <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
            Good food.<br />Better living.<br /><span className="text-[#b86c35]">Made simpler.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#6d776c] sm:text-lg">
            Shop Nigerian staples and ingredients for beloved Akwa Ibom dishes, including Afang, Edikang Ikong, Ekpang Nkukwo and Atama soup.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="inline-flex items-center gap-3 rounded-full bg-[#234d37] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#173624]">
              Start shopping <ArrowRight size={18} />
            </a>
            <a href="#combos" className="rounded-full border border-[#d9d9cd] px-7 py-4 text-sm font-bold transition hover:bg-[#f0efe7]">Explore food bundles</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-[#697568] sm:mt-10 sm:gap-x-6 sm:gap-y-3 sm:text-xs md:text-sm">
            <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-[#47764d}" /> Carefully selected staples</span>
            <span className="flex items-center gap-2"><Truck size={14} className="text-[#47764d] sm:h-4 sm:w-4" /> Order with ease</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-2 top-5 h-32 w-32 rounded-full bg-[#e9c38e]/40 blur-2xl sm:-right-5" />
          <div className="relative overflow-hidden rounded-[2rem] bg-[#e9e5d7]">
            <img src="https://img3.foodyas.com/205/495/471626662054954.jpg" alt="Fresh ingredients prepared for a Nigerian home-cooked meal" className="h-[420px] w-full object-cover sm:h-[520px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102a1d]/85 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f1d1a4]">Rooted in local flavour</p>
              <p className="mt-2 text-2xl font-black sm:text-3xl">From everyday staples to Akwa Ibom favourites.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="border-y border-[#e9e6db] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: <Leaf size={22} />, title: "Everyday essentials", text: "Your kitchen staples in one place." },
            { icon: <ShoppingCart size={22} />, title: "Easy ordering", text: "Choose products and build your cart." },
            { icon: <MessageCircle size={22} />, title: "WhatsApp checkout", text: "Send your order for confirmation." },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf1e7] text-[#315c3b]">{item.icon}</div>
              <div><h3 className="font-extrabold">{item.title}</h3><p className="mt-1 text-sm text-[#788276]">{item.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#b86c35]">Shop the essentials</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Your kitchen favourites</h2><p className="mt-3 text-sm text-[#788276] sm:text-base">Nigerian staples and ingredients for local favourites.</p></div>
          <div className="relative w-full sm:max-w-xs">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9487]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search foodstuff..." className="w-full rounded-full border border-[#deded2] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#47764d]" />
          </div>
        </div>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-full px-5 py-3 text-xs font-bold transition sm:text-sm ${category === c ? "bg-[#234d37] text-white" : "border border-[#e0dfd5] bg-white text-[#697568] hover:border-[#234d37]"}`}>{c}</button>)}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {filtered.map((p) => (
            <article key={p.id} className="group overflow-hidden rounded-3xl border border-[#e9e6dc] bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden bg-[#edf0e7]">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#20382b] shadow-sm sm:text-xs">{p.category}</span>
              </div>
              <div className="p-3 sm:p-5">
                <p className="text-xs text-[#8a9185]">{p.unit}</p>
                <h3 className="mt-1 min-h-10 text-sm font-extrabold leading-5 sm:text-base">{p.name}</h3>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-sm font-black sm:text-lg">{money(p.price)}</span>
                  <button onClick={() => addItem(p)} aria-label={`Add ${p.name} to cart`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#234d37] text-white transition hover:bg-[#b86c35]"><Plus size={19} /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="py-12 text-center text-sm text-[#788276]">No matching products. Try another search.</p>}
        <p className="mt-5 text-xs text-[#8a9185]">Illustrative catalogue and prices only. Confirm availability, pack sizes and current prices with Denco Food Mart.</p>
      </section>

      <section id="combos" className="scroll-mt-24 bg-[#edf0e7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#b86c35]">Less planning, more cooking</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Foodstuff bundles</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#6d776c] sm:text-base">Ingredient packs inspired by Akwa Ibom favourites. Check pack contents with the store before ordering.</p></div>
            <span className="w-fit rounded-full border border-[#d2dacb] px-4 py-2 text-xs font-bold text-[#4c684b]">4 local food packs</span>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {combos.map((combo) => (
              <article key={combo.name} className="overflow-hidden rounded-3xl border border-[#e0e4d8] bg-[#faf9f5]">
                <div className="h-44 overflow-hidden bg-[#e7e9d4]"><img src={combo.image} alt={combo.name} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
                <div className="p-6">
                  <h3 className="text-xl font-black">{combo.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-[#788276]">{combo.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3"><span className="text-xl font-black">{money(combo.price)}</span><button onClick={() => addCombo(combo)} className="flex items-center gap-2 rounded-full bg-[#234d37] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#b86c35]">Add bundle <Plus size={15} /></button></div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-[#788276]">Akwa Ibom-inspired bundle suggestions. Confirm ingredients, quantities and current prices with Denco Food Mart.</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-[#234d37] p-7 text-white sm:p-10 md:flex-row md:items-center lg:p-14">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e9bd87]">Ready to fill your pantry?</p><h2 className="mt-3 max-w-xl text-3xl font-black sm:text-4xl">Good ingredients make good meals.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-white/70">Browse the catalogue, add your essentials and prepare your order.</p></div>
          <a href="#products" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#f3dfbd] px-7 py-4 text-sm font-extrabold text-[#234d37] transition hover:bg-white">Shop foodstuff <ArrowRight size={18} /></a>
        </div>
      </section>

      <footer className="border-t border-[#e8e6dc] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3"><span className="text-2xl">🌿</span><div><p className="font-black">Denco Food Mart</p><p className="text-xs text-[#8a9185]">Everyday foodstuff, made simpler.</p></div></div>
          <p className="text-xs text-[#8a9185]">© {new Date().getFullYear()} Denco Food Mart. All rights reserved.</p>
        </div>
      </footer>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[60] w-max max-w-[90vw] -translate-x-1/2 rounded-2xl bg-[#203f30] px-5 py-3 text-sm font-semibold text-white shadow-xl">{notice}</div>}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setCartOpen(false)}>
          <aside className="flex h-full w-full max-w-md flex-col bg-[#faf9f5] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#e6e4da] px-5 py-5"><div><h2 className="text-xl font-black">Your shopping cart</h2><p className="mt-1 text-xs text-[#788276]">{totalItems} item(s)</p></div><button onClick={() => setCartOpen(false)} aria-label="Close cart" className="rounded-full border border-[#deded2] p-2"><X size={20} /></button></div>
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><span className="text-6xl">🧺</span><h3 className="mt-5 text-lg font-black">Your cart is empty</h3><p className="mt-2 text-sm text-[#788276]">Add your favourite foodstuff to get started.</p><button onClick={() => setCartOpen(false)} className="mt-5 rounded-full bg-[#234d37] px-6 py-3 text-sm font-bold text-white">Continue shopping</button></div> : <div className="space-y-4">{cart.map((item) => <div key={item.id} className="flex gap-3 rounded-2xl border border-[#e8e6dc] bg-white p-3"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#edf0e7] text-3xl">{item.emoji}</div><div className="min-w-0 flex-1"><h3 className="text-sm font-bold">{item.name}</h3><p className="mt-1 text-sm font-black">{money(item.price)}</p><div className="mt-2 flex items-center gap-3"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity" className="rounded-full border border-[#e0dfd5] p-1"><Minus size={13} /></button><span className="text-sm font-bold">{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity" className="rounded-full border border-[#e0dfd5] p-1"><Plus size={13} /></button></div></div><button onClick={() => setCart((current) => current.filter((p) => p.id !== item.id))} aria-label={`Remove ${item.name}`} className="self-start p-2 text-[#a44e3a]"><Trash2 size={17} /></button></div>)}</div>}
            </div>
            {cart.length > 0 && <div className="border-t border-[#e6e4da] bg-white p-5"><div className="flex justify-between text-sm text-[#788276]"><span>Subtotal</span><span className="font-bold text-[#20382b]">{money(total)}</span></div><p className="mt-2 text-xs text-[#8a9185]">Delivery fee will be confirmed when you place your order.</p><button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#234d37] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#173624]">Continue to checkout <ArrowRight size={17} /></button></div>}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center overflow-y-auto bg-black/50 p-4" onClick={() => setCheckoutOpen(false)}>
          <div className="my-auto w-full max-w-lg rounded-3xl bg-[#faf9f5] p-6 shadow-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#b86c35]">Almost there</p><h2 className="mt-2 text-2xl font-black">Delivery details</h2><p className="mt-2 text-sm text-[#788276]">Enter your details to send your order through WhatsApp.</p></div><button onClick={() => setCheckoutOpen(false)} aria-label="Close checkout" className="rounded-full border border-[#deded2] p-2"><X size={20} /></button></div>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-bold">Full name<input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="mt-2 w-full rounded-xl border border-[#deded2] bg-white px-4 py-3 font-normal outline-none focus:border-[#47764d]" placeholder="Enter your full name" /></label>
              <label className="block text-sm font-bold">Phone number<input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} type="tel" className="mt-2 w-full rounded-xl border border-[#deded2] bg-white px-4 py-3 font-normal outline-none focus:border-[#47764d]" placeholder="e.g. 08012345678" /></label>
              <label className="block text-sm font-bold">Delivery address<textarea value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} rows={3} className="mt-2 w-full rounded-xl border border-[#deded2] bg-white px-4 py-3 font-normal outline-none focus:border-[#47764d]" placeholder="Street, area and city" /></label>
            </div>
            <div className="mt-5 rounded-2xl bg-[#edf0e7] p-4"><div className="flex justify-between text-sm"><span>Items ({totalItems})</span><span className="font-bold">{money(total)}</span></div><div className="mt-2 flex justify-between text-sm"><span className="font-bold">Subtotal</span><span className="font-black">{money(total)}</span></div><p className="mt-2 text-xs text-[#788276]">Delivery fee and product availability will be confirmed by the store.</p></div>
            <button onClick={orderOnWhatsApp} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#23824a] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#176538]"><MessageCircle size={19} /> Send order on WhatsApp</button>
            <p className="mt-3 text-center text-xs text-[#8a9185]">Your WhatsApp app or WhatsApp Web will open with your order details.</p>
          </div>
        </div>
      )}
    </main>
  );
}

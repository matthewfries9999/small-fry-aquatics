import { useState } from "react";
import { ShoppingCart, Menu, X, Droplets } from "lucide-react";

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

export default function Header({ cart, onCartOpen }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071824]/95 text-white shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-300 via-blue-600 to-sky-300" />

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                <a href="#" className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-white/10">
                        <Droplets className="text-sky-300" />
                    </div>
                    <div className="leading-none">
                        <p className="text-3xl font-black text-sky-300">SMALL</p>
                        <p className="-mt-1 text-2xl font-black text-sky-200">FRY</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.38em] text-sky-100">
                            Aquatics
                        </p>
                    </div>
                </a>

                <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 text-sm font-bold md:flex">
                    <a href="#plants" className="rounded-full px-4 py-2 hover:bg-white/10">Plants</a>
                    <a href="#shipping" className="rounded-full px-4 py-2 hover:bg-white/10">Shipping</a>
                    <a href="#baby-shrimp" className="rounded-full px-4 py-2 hover:bg-white/10">Baby Shrimp</a>
                    <a href="#about" className="rounded-full px-4 py-2 hover:bg-white/10">About</a>
                    <a href="#faq" className="rounded-full px-4 py-2 hover:bg-white/10">FAQ</a>
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden rounded-full bg-sky-700 px-4 py-2 text-sm font-black md:block">
                        {formatCurrency(cartTotal)}
                    </div>
                    <button
                        onClick={onCartOpen}
                        className="relative rounded-full border border-white/10 bg-white/5 p-2.5"
                    >
                        <ShoppingCart size={21} />
                        {cart.length > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-300 text-xs font-black text-slate-950">
                {cart.length}
              </span>
                        )}
                    </button>
                    <button
                        className="rounded-full border border-white/15 p-2 md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="border-t border-white/10 px-4 py-4 md:hidden">
                    <div className="grid gap-3 text-sm font-medium">
                        <a href="#plants">Plants</a>
                        <a href="#shipping">Shipping</a>
                        <a href="#baby-shrimp">Baby Shrimp</a>
                        <a href="#about">About</a>
                        <a href="#faq">FAQ</a>
                    </div>
                </div>
            )}
        </header>
    );
}
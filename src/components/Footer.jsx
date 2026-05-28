import { Leaf, Sparkles, Droplets, ShieldCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#061722] px-4 py-12 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.16),transparent_24%)]" />

            <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
                <div>
                    <p className="text-4xl font-black text-sky-300">SMALL</p>
                    <p className="-mt-2 text-3xl font-black text-sky-200">FRY</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.42em] text-sky-100">
                        Aquatics
                    </p>
                    <p className="mt-4 text-sm leading-6 text-sky-100/75">
                        Hobbyist-grown aquarium plants, shrimp updates, and freshwater tank inspiration.
                    </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
                        Contact support
                    </p>
                    <h3 className="mt-2 text-2xl font-black">Questions or suggestions?</h3>
                    <p className="mt-3 text-sm leading-6 text-sky-100/75">
                        Reach out for plant care questions, order help, special requests, or ideas for
                        what Small Fry should stock next.
                    </p>

                    href="mailto:support@smallfryaquatics.com"
                    className="mt-4 inline-flex rounded-full border border-sky-300/40 bg-sky-300/10 px-5 py-3 text-sm font-black text-sky-100 hover:bg-sky-300/20"
                    <a>
                    support@smallfryaquatics.com
                </a>
            </div>

            <div className="flex flex-col gap-3 text-sm font-bold text-sky-100/80 lg:items-end">
                <a href="#plants" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:border-sky-300">
                    <Leaf size={16} className="text-sky-300" /> Plants
                </a>
                <a href="#baby-shrimp" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:border-sky-300">
                    <Sparkles size={16} className="text-sky-300" /> Baby Shrimp
                </a>
                <a href="#shipping" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:border-sky-300">
                    <Droplets size={16} className="text-sky-300" /> Shipping
                </a>
                <a href="#faq" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:border-sky-300">
                    <ShieldCheck size={16} className="text-sky-300" /> FAQ
                </a>
            </div>
        </div>

    <div className="relative mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-sky-100/60">
        © 2026 Small Fry Aquatics. All rights reserved.
    </div>
</footer>
);
}
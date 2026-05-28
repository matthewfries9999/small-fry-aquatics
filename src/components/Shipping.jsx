export default function ShippingSection({ cartTotal, formatCurrency }) {
    return (
        <section
            id="shipping"
            className="scroll-mt-32 bg-[#071722] px-4 py-16 text-white"
        >
            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_.9fr]">
                {/* LEFT SIDE */}
                <div>
                    <p className="text-3xl font-black uppercase tracking-[0.35em] text-sky-300 mb-10">
                        Shipping & Policies
                    </p>

                    <h2 className="mt-2 text-4xl font-black">
                        Shipping info that helps you buy with confidence.
                    </h2>

                    <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-sky-100/90">
                        <h3 className="text-xl font-black text-sky-200">
                            Shipping Schedule & Live Arrival Policy
                        </h3>

                        <p className="mt-3 text-sm leading-7">
                            We ship orders on{" "}
                            <span className="font-black text-white">Mondays and Tuesdays</span>{" "}
                            only.
                        </p>

                        <p className="mt-4 text-sm leading-7">
                            In cases of extreme weather, we may delay shipments to protect plant health.
                        </p>

                        <p className="mt-4 text-sm leading-7">
                            <span className="font-black text-white">DOA Policy:</span> Contact
                            us within <span className="font-black text-white">8 hours</span> with photo proof.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="rounded-[1.75rem] bg-white p-8 text-slate-950 shadow-lg">
                    <h3 className="text-2xl font-black text-center">
                        Free Shipping Progress
                    </h3>

                    {/* STATUS */}
                    <div className="mt-6 text-center">
                        <p className="text-3xl font-black leading-tight">
                            {cartTotal >= 100 ? (
                                <span className="text-green-600">
                  Free Shipping Unlocked 🎉
                </span>
                            ) : (
                                <>
                                    Add{" "}
                                    <span className="text-sky-700">
                    {formatCurrency(100 - cartTotal)}
                  </span>{" "}
                                    more
                                </>
                            )}
                        </p>

                        <div className="mt-2 text-sm font-semibold text-slate-500">
                            {cartTotal === 0
                                ? "Add some plants to start unlocking free shipping"
                                : cartTotal < 50
                                    ? "You're just getting started — keep adding plants"
                                    : cartTotal < 100
                                        ? "You're close — a few more plants unlock free shipping"
                                        : "You're all set — no shipping charge at checkout"}
                        </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="mt-6 h-5 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                            className="h-5 rounded-full bg-sky-600 transition-all duration-500"
                            style={{
                                width: `${Math.min((cartTotal / 100) * 100, 100)}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
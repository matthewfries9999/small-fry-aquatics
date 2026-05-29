import {useState} from "react";
import {motion} from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PlantsSection from "./components/PlantsSection.jsx";
import ShippingSection from "./components/Shipping.jsx";
import HeroSection from "./components/HeroSection.jsx";
import BabyShrimp from "./components/BabyShrimp.jsx";
import PlantDetailsModal from "./components/PlantDetailsModal";
import CartSummary from "./components/CartSummary";
import {Truck, ShieldCheck, Leaf, Tag,} from "lucide-react";
import products from "./data/Products.js";
import { showcaseItems, shrimpShowcase} from "./data/showcaseData";
import { formatCurrency, getPlantCare,buildRates } from "./utils/Helpers.js";

export default function App() {
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [zip, setZip] = useState("");
    const [taxRate, setTaxRate] = useState(0.1025);
    const [shipping, setShipping] = useState(0);
    const [zipError, setZipError] = useState("");

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            (prev - 1 + showcaseItems.length) % showcaseItems.length
        );
    };

    function calculateRates(zipCode, total) {
        const { taxRate, shipping, error } = buildRates(zipCode, total);
        setZipError(error ?? "");
        if (!error) {
            setTaxRate(taxRate);
            setShipping(shipping);
        }
    }

    function removeFromCart(name) {
        const index = cart.findIndex((p) => p.name === name);
        if (index === -1) return;

        setCart((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
    }

    const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

    return (
        <div className="min-h-screen bg-white text-slate-950">
            <Header cart={cart} onCartOpen={() => setCartOpen(true)} />

            <main>
                <HeroSection/>

                <section
                    className="relative bg-gradient-to-r from-sky-800 via-cyan-600 to-blue-700 bg-[length:200%_200%] animate-gradient-x px-4 py-5">

                    {/* readability overlay */}
                    <div className="absolute inset-0 bg-black/30"/>

                    <div
                        className="relative mx-auto grid max-w-7xl gap-5 text-sm font-bold md:grid-cols-4 md:text-base text-white">
                        {[
                            [Leaf, "Premium Quality", "Carefully grown & selected"],
                            [ShieldCheck, "Outstanding Service", "Here to help"],
                            [Tag, "Everyday Fair Pricing", "Quality without the markup"],
                            [Truck, "Safe & Fast Shipping", "Packed with care, shipped fast"],
                        ].map(([Icon, title, text]) => (
                            <div
                                key={title}
                                className="flex items-center justify-center gap-4 md:border-r md:border-white/20 last:border-r-0"
                            >
                                <Icon className="text-sky-200" size={34}/>

                                <div>
                                    <p className="text-white drop-shadow-sm">{title}</p>
                                    <p className="mt-1 text-sm font-medium text-white/80 drop-shadow-sm">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="about" className="bg-[#061722] px-4 py-16 md:py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="overflow-hidden rounded-[1.75rem] border border-sky-300/15 bg-[#071824] shadow-2xl">

                            <motion.div
                                className="relative"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(e, info) => {
                                    if (info.offset.x < -75) nextImage();
                                    if (info.offset.x > 75) prevImage();
                                }}
                            >
                                {/* LEFT ARROW */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl bg-black/40 px-3 py-1 rounded-full"
                                >
                                    ❮
                                </button>

                                {/* IMAGE or VIDEO */}
                                {showcaseItems[currentIndex].type === "video" ? (
                                    <video
                                        src={showcaseItems[currentIndex].src}
                                        className="h-[360px] w-full object-cover md:h-[460px]"
                                        autoPlay
                                        muted
                                        loop
                                        controls
                                    />
                                ) : (
                                    <img
                                        src={showcaseItems[currentIndex].src}
                                        alt="Showcase"
                                        className="h-[360px] w-full object-cover md:h-[460px]"
                                    />
                                )}

                                {/* RIGHT ARROW */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl bg-black/40 px-3 py-1 rounded-full"
                                >
                                    ❯
                                </button>
                            </motion.div>

                            {/* DYNAMIC CAPTION */}
                            <div className="p-4 text-center">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                                    {showcaseItems[currentIndex].title}
                                </p>
                                <p className="mt-1 text-sm text-slate-300">
                                    {showcaseItems[currentIndex].description}
                                </p>
                            </div>

                        </div>

                        <div className="rounded-[1.75rem] border border-sky-300/15 bg-[#071824]/95 p-8 text-white shadow-2xl md:p-12 lg:p-14">
                            <p className="text-m font-black uppercase tracking-[0.25em] text-white">
                                About Small Fry:
                            </p>
                            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                                <span className="text-sky-300">Hello!</span>
                            </h2>

                            <div className="mt-6 h-1 w-20 rounded-full bg-sky-300"/>
                            <p className="mt-7 text-lg leading-8 text-slate-300">
                                I’m a planted tank hobbyist focused on growing healthy aquarium plants, offering fair
                                pricing, and creating an exceptional buying experience.
                            </p>
                            <p className="mt-4 text-lg leading-8 text-slate-300">
                                I currently manage four tanks out of my bedroom: two 10-gallon setups, a 20-gallon, and
                                a high-tech 36-gallon.
                                These tanks are where I grow, test, and maintain the plants featured on the site.
                                This shop is centered around aquatic plants, including floaters and stem plants, with
                                plans to offer them for sale in the future. Alongside that, I’ve built a shrimp showcase featuring
                                my baby blue bolt shrimp, giving a further look into my personal setups.
                            </p>
                        </div>
                    </div>
                </section>

                <PlantsSection
                    products={products}
                    setCart={setCart}
                    setSelectedProduct={setSelectedProduct}
                    getPlantCare={getPlantCare}
                    formatCurrency={formatCurrency}
                />

                <BabyShrimp shrimpShowcase={shrimpShowcase} />

                <ShippingSection
                    cart={cart}
                    cartTotal={cartTotal}
                    formatCurrency={formatCurrency}
                />
                <section id="faq" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2">
                    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <p className="text-3xl font-black uppercase tracking-[0.25em] text-sky-700">
                            About
                        </p>
                        <h2 className="mt-2 text-3xl font-black">
                            Fresh plants from a real hobbyist tank.
                        </h2>
                        <p className="mt-4 leading-8 text-slate-600">
                            I’ve been keeping planted aquariums as a hobby for a while, and this shop is built around
                            that
                            experience. All of my plants are grown and maintained in my own tanks, where I focus on
                            stable
                            parameters, healthy growth, and clean layouts.
                            I currently run multiple setups, including two 10-gallon tanks, a 20-gallon, and a high-tech
                            36-gallon
                            where I grow, test, and propagate the plants you see here. This lets me observe how each
                            plant behaves
                            before offering it and helps ensure they arrive in good condition.
                            When you order, you can expect hobbyist-grown plants that have been cared for personally,
                            packaged with
                            attention, and shipped with the goal of getting them to you healthy and ready to thrive in
                            your own tank.
                        </p>
                    </div>

                    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                        <p className="text-3xl font-black uppercase tracking-[0.25em] text-sky-700">
                            FAQ
                        </p>
                        <div className="mt-5 space-y-3">
                            {[
                                {
                                    question: "When do orders ship?",
                                    answer: "Orders ship on Mondays and Tuesdays."
                                },
                                {
                                    question: "Do you guarantee live arrival?",
                                    answer: "Yes, we offer a live arrival guarantee under standard shipping conditions."
                                },
                                {
                                    question: "Are plants snail-free?",
                                    answer: "We do our best to keep plants snail-free, but occasional hitchhikers may occur."
                                },
                            ].map((item) => (
                                <details key={item.question} className="rounded-2xl bg-slate-50 p-4">
                                    <summary className="cursor-pointer font-black">
                                        {item.question}
                                    </summary>
                                    <p className="mt-2 text-sm text-slate-600">
                                        {item.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
                {cartOpen && (
                    <CartSummary
                        cart={cart}
                        onClose={() => setCartOpen(false)}
                        onRemove={removeFromCart}
                        zip={zip}
                        setZip={setZip}
                        calculateRates={calculateRates}
                        taxRate={taxRate}
                        shipping={shipping}
                        zipError={zipError}
                        cartTotal={cartTotal}
                    />
                )}
            </main>
            <PlantDetailsModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={(product) => setCart((items) => [...items, product])}
            />
            <Footer/>
        </div>
    );
}
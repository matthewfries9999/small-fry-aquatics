import {useState} from "react";
import {motion} from "framer-motion";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PlantsSection from "./components/PlantsSection.jsx";
import ShippingSection from "./components/Shipping.jsx";
import HeroSection from "./components/HeroSection.jsx";
import BabyShrimp from "./components/BabyShrimp.jsx";
import {X, Truck, ShieldCheck, Leaf, Tag,} from "lucide-react";
import thirtySixGallon from './assets/thirtySixGallon.jpg'
import blueShrimp from './assets/blueShrimp.png'
import tenGallon1 from './assets/tenGallon1.png'
import tenGallon2 from './assets/tenGallon2.png'
import shrimpVideo from './assets/shrimpVideo.mp4'
import tankVideo from './assets/tankVideo.mp4'
import products from "./data/Products.js";
import { formatCurrency, getPlantCare } from "./utils/helpers";

function PlantDetailsModal({product, onClose, onAddToCart}) {
    if (!product) return null;

    const care = getPlantCare(product);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#061722]/80 px-4 py-6 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{opacity: 0, y: 20, scale: 0.98}}
                animate={{opacity: 1, y: 0, scale: 1}}
                className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 rounded-full bg-white p-3 shadow"
                >
                    <X size={20}/>
                </button>

                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative h-80 bg-slate-100 lg:h-auto">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            />
                    </div>

                    <div className="p-8 md:p-10">
                        <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-700">
                            Plant details
                        </p>
                        <h3 className="mt-3 text-4xl font-black">{product.name}</h3>
                        <p className="mt-5 leading-8 text-slate-700">
                            {product.description}
                        </p>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            {[
                                ["Light", care.light],
                                ["CO2", care.co2],
                                ["Temperature", care.temperature],
                                ["Difficulty", care.difficulty],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                >
                                    <p className="text-xs font-black uppercase text-slate-500">
                                        {label}
                                    </p>
                                    <p className="mt-1 text-lg font-black">{value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-4">
              <span className="text-3xl font-black">
                {formatCurrency(product.price)}
              </span>
                            <button
                                onClick={() => onAddToCart(product)}
                                className="rounded-full bg-[#071824] px-7 py-4 text-sm font-black uppercase text-white hover:bg-sky-700"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function CartSummary({
                         cart,
                         onClose,
                         onRemove,
                         zip,
                         setZip,
                         calculateRates,
                         taxRate,
                         shipping,
                         zipError,
                         cartTotal

                     }) {
    const grouped = cart.reduce((acc, item) => {
        acc[item.name] = acc[item.name] || {...item, qty: 0};
        acc[item.name].qty += 1;
        return acc;
    }, {});

    const items = Object.values(grouped);

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-3xl rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-black">Your Cart</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* SCROLLABLE CART AREA */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {items.length === 0 ? (
                        <p className="text-slate-500">Your cart is empty.</p>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center justify-between border-b pb-3"
                            >
                                <div>
                                    <p className="font-black">{item.name}</p>
                                    <p className="text-sm text-slate-500">
                                        {item.qty} × ${item.price.toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <p className="font-black">
                                        ${(item.qty * item.price).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => onRemove(item.name)}
                                        className="text-red-500 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* FOOTER (ALWAYS VISIBLE) */}
                <div className="border-t p-6 space-y-4 bg-white">

                    {/* ZIP */}
                    <div>
                        <label className="text-sm font-bold">ZIP Code</label>
                        <div className="mt-2 flex gap-2">
                            <input
                                value={zip}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === "" || /^\d{0,5}$/.test(val)) {
                                        setZip(val);
                                    }
                                }}
                                placeholder="Enter ZIP"
                                className="w-full rounded-lg border px-3 py-2"
                            />
                            <button
                                onClick={() => calculateRates(zip, cartTotal)}
                                className="rounded-lg bg-sky-600 px-4 py-2 text-white font-bold"
                            >
                                Calculate
                            </button>
                        </div>

                        {zipError && (
                            <p className="mt-2 text-sm font-bold text-red-500">
                                {zipError}
                            </p>
                        )}
                    </div>

                    {/* TOTALS */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>Tax</span>
                            <span>${(total * taxRate).toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-lg font-black">
                            <span>Total</span>
                            <span>${(total + total * taxRate + shipping).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* CHECKOUT BUTTON */}
                    <button className="w-full rounded-xl bg-sky-600 py-3 font-black text-white">
                        Checkout
                    </button>

                </div>
            </div>
        </div>
    );
}

export default function App() {

    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [zip, setZip] = useState("");
    const [taxRate, setTaxRate] = useState(0.1025);
    const [shipping, setShipping] = useState(0);
    const [zipError, setZipError] = useState("");

    const showcaseItems = [
        {
            src: thirtySixGallon,
            type: "image",
            title: "My 36 gallon community tank",
            description:
                "I am running CO2 and also using a high-tech light. " +
                "For a filter I am using a Fluval 207. The tank features Neon Tetras, Ember Tetras, Albino Corydoras," +
                " Guppies, several types of snails, and some Amano Shrimp.",
        },
        {
            src: tenGallon1,
            type: "image",
            title: "My 10 gallon snail tank",
            description:
                "My first tank! I use it now mainly to breed Bladder and Pond snails. There is also a dwarf sag carpet growing steadily.",
        },
        {
            src: tenGallon2,
            type: "image",
            title: "My 10 gallon caridina tank",
            description:
                "This tank houses my caridina shrimp. There are both Blue Bolt and Orange Sun caridina in the tank. I am excited to see" +
                " what their offspring looks like a few generations down the line! ",
        },
        {
            src: tankVideo,
            type: "video",
            title: "A video of my community tank",
            description:
                "My 36 gallon tank featured in the first image.",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const shrimpShowcase = [
        {
            src: blueShrimp,
            type: "image",
        },
        {
            src: shrimpVideo,
            type: "video",
        },
    ];

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            (prev - 1 + showcaseItems.length) % showcaseItems.length
        );
    };

    function isValidContiguousUSZip(zip) {
        if (!/^\d{5}$/.test(zip)) return false;

        const zipNum = parseInt(zip, 10);

        // Alaska + Hawaii exclusion
        const isExcluded =
            (zipNum >= 96700 && zipNum <= 96899) || // Hawaii
            (zipNum >= 99500 && zipNum <= 99999);   // Alaska

        // basic continental US range check
        const isContiguous = zipNum >= 1001 && zipNum <= 99950;

        return isContiguous && !isExcluded;
    }

    function calculateRates(zipCode, total) {
        const cleanZip = zipCode.trim();

        if (!isValidContiguousUSZip(cleanZip)) {
            setZipError("Enter a valid 5-digit continental US ZIP code");
            return;
        }

        setZipError("");

        const inState = cleanZip.startsWith("60") || cleanZip.startsWith("61");
        const tax = inState ? 0.1025 : 0.0;

        let ship = 9.99;

        if (total >= 100) {
            ship = 0;
        } else if (total >= 50) {
            ship = 6.99;
        }

        setTaxRate(tax);
        setShipping(ship);
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
                        cartTotal={cartTotal}
                        zipError={zipError}
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
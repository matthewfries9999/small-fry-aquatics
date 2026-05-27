import React, {useMemo, useState} from "react";
import {motion} from "framer-motion";
import {
    Search,
    ShoppingCart,
    Menu,
    X,
    Truck,
    ShieldCheck,
    Sparkles,
    Droplets,
    User,
    Leaf,
    Tag,
    SlidersHorizontal,
} from "lucide-react";

import thirtySixGallon from './assets/thirtySixGallon.jpg'
import blueShrimp from './assets/blueShrimp.png'
import tenGallon1 from './assets/tenGallon1.png'
import tenGallon2 from './assets/tenGallon2.png'
import shrimpVideo from './assets/shrimpVideo.mp4'
import tankVideo from './assets/tankVideo.mp4'

const products = [
    {
        name: "Java Fern Needle Leaf",
        category: "Rhizome",
        placement: "Midground / Hardscape",
        price: 7.99,
        tag: "Low light",
        image:
            "https://cdn11.bigcommerce.com/s-zlozzyl4vj/images/stencil/1280x1280/products/3752/3075/Java_Fern_Narrow_Leaf_Clump_11698_copy__56407.1568310243__48854.1584139297.jpg?c=1",
        description:
            "Narrow, flowing leaves that look great attached to driftwood or stone.",
    },
    {
        name: "Rotala Vietnam",
        category: "Stem Plant",
        placement: "Background",
        price: 6.99,
        tag: "Fine texture",
        image:
            "https://www.aquasabi.com/bilder/kk_dropper_uploads/dt_Rotala_sp._Vietnam_135.0231.00_submers_02_beschreibungsfoto_klein.jpg",
        description:
            "A delicate stem plant with soft pink-orange tones and fine leaves.",
    },
    {
        name: "Rotala H'ra",
        category: "Stem Plant",
        placement: "Background",
        price: 6.99,
        tag: "Color pop",
        image:
            "https://light.fish/assets/dist/img/blogs/2023/march/rotala-hra/rotala-hra.jpg",
        description:
            "A sunset-colored stem plant that can shift orange, pink, and red.",
    },
    {
        name: "Dwarf Sagittaria",
        category: "Foreground",
        placement: "Carpet / Foreground",
        price: 5.99,
        tag: "Easy carpet",
        image:
            "https://dakuaquatics.com/cdn/shop/files/Dwarf-Sagittaria.jpg?v=1733852910&width=1000",
        description:
            "A hardy grassy foreground plant that spreads by runners.",
    },
    {
        name: "Vallisneria",
        category: "Background Plant",
        placement: "Background",
        price: 6.99,
        tag: "Flowing leaves",
        image:
            "https://dakuaquatics.com/cdn/shop/files/corkscrew-val.jpg?v=1733853960&width=1445",
        description:
            "Long ribbon-like leaves that add height, movement, and shelter.",
    },
    {
        name: "Vallisneria Leopard",
        category: "Background Plant",
        placement: "Background",
        price: 7.99,
        tag: "Striped leaves",
        image:
            "https://buceplant.com/cdn/shop/files/vallisneria-spiralis-leopard-1178045427_1050x700.jpg?v=1752523714",
        description:
            "A standout Vallisneria variety with subtle leopard-style striping.",
    },
    {
        name: "Rotala Wallichii",
        category: "Stem Plant",
        placement: "Background",
        price: 7.99,
        tag: "Fine red texture",
        image:
            "https://www.aquasabi.com/media/image/product/4183/md/rotala-wallichii.jpg",
        description:
            "A delicate fine-leaf stem plant with pink to red tips.",
    },
    {
        name: "Monte Carlo",
        category: "Foreground",
        placement: "Carpet / Foreground",
        price: 6.99,
        tag: "Carpeting plant",
        image:
            "https://dakuaquatics.com/cdn/shop/files/Monte-Carlo-1-6.jpg?v=1733853567&width=1445",
        description:
            "A bright green carpeting plant with small round leaves.",
    },
    {
        name: "Pearlweed",
        category: "Stem Plant",
        placement: "Foreground / Midground",
        price: 6.99,
        tag: "Fast grower",
        image:
            "https://dakuaquatics.com/cdn/shop/files/pearl-weed-1-1.jpg?v=1733853538&width=1445",
        description:
            "A versatile fast-growing plant that can be trimmed into a bush or carpet.",
    },
    {
        name: "Red Root Floaters",
        category: "Floating Plant",
        placement: "Floating",
        price: 9.99,
        tag: "Red roots",
        image:
            "https://dakuaquatics.com/cdn/shop/files/Red-Root-Floaters-2.jpg?v=1739998578&width=1445",
        description:
            "A colorful floating plant with round leaves and red roots.",
    },
    {
        name: "Duckweed",
        category: "Floating Plant",
        placement: "Floating",
        price: 4.99,
        tag: "Surface cover",
        image:
            "https://dakuaquatics.com/cdn/shop/files/Greater-Duckweed.jpg?v=1733853965&width=1445",
        description:
            "A fast-growing floater that helps absorb excess nutrients.",
    },
    {
        name: "Frogbit",
        category: "Floating Plant",
        placement: "Floating",
        price: 9.99,
        tag: "Round leaves",
        image:
            "https://dakuaquatics.com/cdn/shop/files/Frogbit.jpg?v=1733852938&width=1445",
        description:
            "A classic floating plant with round lily-like leaves and dangling roots.",
    },
    {
        name: "Floating Bamboo",
        category: "Floating Plant",
        placement: "Floating",
        price: 14.99,
        tag: "Hygroryza aristata",
        image:
            "https://handpickedaquatics.com/cdn/shop/products/PXL_20221003_020021031.jpg?v=1732188556&width=900",
        description:
            "An unusual floating grass with bamboo-like stems and surface leaves.",
    },
    {
        name: "Ludwigia Red Skeleton",
        category: "Stem Plant",
        placement: "Midground / Background",
        price: 8.99,
        tag: "Red lace leaves",
        image:
            "https://azgardens.com/wp-content/uploads/2024/09/Ludwigia-RedSkeleton4.jpg",
        description:
            "A striking red Ludwigia with narrow, textured leaves.",
    },
    {
        name: "Ludwigia Ovalis",
        category: "Stem Plant",
        placement: "Midground / Background",
        price: 7.99,
        tag: "Warm orange tones",
        image:
            "https://buceplant.com/cdn/shop/files/ludwigia-ovalis-1209749864_1050x700.jpg?v=1771456351",
        description:
            "A beautiful stem plant with rounded leaves that can develop orange and pink tones.",
    },
    {
        name: "Red Tiger Lotus",
        category: "Feature Plant",
        placement: "Centerpiece",
        price: 9.99,
        tag: "Statement plant",
        image:
            "https://buceplant.com/cdn/shop/products/nymphaea-tiger-lotus-33661750706376.jpg?v=1768605766",
        description:
            "Bold red patterned leaves make this bulb plant a dramatic centerpiece.",
    },
];

const categories = [
    "All",
    "Rhizome",
    "Stem Plant",
    "Foreground",
    "Background Plant",
    "Floating Plant",
    "Feature Plant",
];

const difficulties = ["All", "Beginner friendly", "Intermediate"];
const co2Options = ["All", "Not required", "Optional", "Recommended"];
const placementOptions = [
    "All",
    "Foreground",
    "Midground",
    "Background",
    "Floating",
    "Centerpiece",
    "Hardscape",
];

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

function getPlantCare(product) {
    const wantsCo2 =
        product.name.includes("Rotala") ||
        product.name.includes("Ludwigia") ||
        product.name === "Monte Carlo";

    const intermediate =
        product.name.includes("Wallichii") ||
        product.name.includes("Red Skeleton") ||
        product.name === "Monte Carlo";

    return {
        light:
            product.category === "Floating Plant"
                ? "Low–Medium"
                : product.category === "Stem Plant"
                    ? "Medium–High"
                    : "Medium",
        co2: wantsCo2
            ? "Recommended"
            : product.name === "Pearlweed"
                ? "Optional"
                : "Not required",
        temperature: "72–78°F",
        difficulty: intermediate ? "Intermediate" : "Beginner friendly",
    };
}

function ProductImage({product}) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-sky-50 p-8 text-center">
                <div className="rounded-3xl bg-white p-6 shadow">
                    <Droplets className="mx-auto mb-3 text-sky-700"/>
                    <p className="font-black">{product.name}</p>
                    <p className="text-sm text-slate-500">Photo coming soon</p>
                </div>
            </div>
        );
    }

    return (
        <img
            src={product.image}
            alt={product.name}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
    );
}

function FilterSelect({label, value, onChange, options}) {
    return (
        <label className="grid gap-1.5">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-sky-100"
            >
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </label>
    );
}

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
                        <ProductImage product={product}/>
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

function HeroSection() {
    return (
        <section className="relative min-h-[620px] overflow-hidden bg-[#061722]">
            <img
                src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?auto=format&fit=crop&w=2000&q=90"
                alt="Small Fry planted aquarium hero"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061722]/95 via-[#061722]/60 to-transparent"/>

            <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20">
                <motion.div
                    initial={{opacity: 0, y: 18}}
                    animate={{opacity: 1, y: 0}}
                    className="max-w-2xl text-white"
                >
                    <h1 className="text-5xl font-black leading-tight md:text-7xl">
                        Healthy Plants.
                        <br/>
                        Thriving Tanks.
                    </h1>
                    <p className="mt-6 text-xl leading-8 text-sky-50/90">
                        Premium, hobbyist-grown aquatic plants to bring your aquarium to
                        life.
                    </p>

                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                        <a
                            href="#plants"
                            className="rounded-lg bg-blue-600 px-8 py-4 text-center font-black text-white hover:bg-blue-700"
                        >
                            Shop Plants
                        </a>
                        <a
                            href="#shipping"
                            className="rounded-lg border border-blue-200/60 bg-white/10 px-8 py-4 text-center font-black text-white backdrop-blur hover:bg-white/15"
                        >
                            Shipping Info
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
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
                         cartTotal,
                         zipError

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
                                onClick={() => calculateRates(zip)}
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

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [difficulty, setDifficulty] = useState("All");
    const [co2, setCo2] = useState("All");
    const [placement, setPlacement] = useState("All");
    const [cart, setCart] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);
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



    const [shrimpIndex, setShrimpIndex] = useState(0);

    const nextShrimp = () => {
        setShrimpIndex((prev) => (prev + 1) % shrimpShowcase.length);
    };

    const prevShrimp = () => {
        setShrimpIndex((prev) =>
            (prev - 1 + shrimpShowcase.length) % shrimpShowcase.length
        );
    };

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

    function calculateRates(zipCode) {
        const cleanZip = zipCode.trim();

        if (!isValidContiguousUSZip(cleanZip)) {
            setZipError("Enter a valid 5-digit continental US ZIP code");
            return;
        }

        setZipError("");

        const inState = cleanZip.startsWith("60") || cleanZip.startsWith("61");
        const tax = inState ? 0.1025 : 0.0;

        let ship = 9.99;

        if (cartTotal >= 100) {
            ship = 0;
        } else if (cartTotal >= 50) {
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

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const care = getPlantCare(product);
            const searchText =
                `${product.name} ${product.category} ${product.placement} ${product.tag}`.toLowerCase();

            return (
                (category === "All" || product.category === category) &&
                (difficulty === "All" || care.difficulty === difficulty) &&
                (co2 === "All" || care.co2 === co2) &&
                (placement === "All" ||
                    product.placement.toLowerCase().includes(placement.toLowerCase())) &&
                searchText.includes(query.toLowerCase())
            );
        });
    }, [query, category, difficulty, co2, placement]);

    const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

    function clearFilters() {
        setQuery("");
        setCategory("All");
        setDifficulty("All");
        setCo2("All");
        setPlacement("All");
    }

    return (
        <div className="min-h-screen bg-white text-slate-950">
            <header
                className="sticky top-0 z-40 border-b border-white/10 bg-[#071824]/95 text-white shadow-2xl backdrop-blur-xl">
                <div
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-300 via-blue-600 to-sky-300"/>

                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                    <a href="#" className="flex items-center gap-3">
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-white/10">
                            <Droplets className="text-sky-300"/>
                        </div>
                        <div className="leading-none">
                            <p className="text-3xl font-black text-sky-300">SMALL</p>
                            <p className="-mt-1 text-2xl font-black text-sky-200">FRY</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.38em] text-sky-100">
                                Aquatics
                            </p>
                        </div>
                    </a>

                    <nav
                        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 text-sm font-bold md:flex">
                        <a href="#plants" className="rounded-full px-4 py-2 hover:bg-white/10">
                            Plants
                        </a>
                        <a href="#shipping" className="rounded-full px-4 py-2 hover:bg-white/10">
                            Shipping
                        </a>
                        <a href="#baby-shrimp" className="rounded-full px-4 py-2 hover:bg-white/10">
                            Baby Shrimp
                        </a>
                        <a href="#about" className="rounded-full px-4 py-2 hover:bg-white/10">
                            About
                        </a>
                        <a href="#faq" className="rounded-full px-4 py-2 hover:bg-white/10">
                            FAQ
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden rounded-full bg-sky-700 px-4 py-2 text-sm font-black md:block">
                            {formatCurrency(cartTotal)}
                        </div>
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative rounded-full border border-white/10 bg-white/5 p-2.5"
                        >
                            <ShoppingCart size={21}/>
                            {cart.length > 0 && (
                                <span
                                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-300 text-xs font-black text-slate-950">
                  {cart.length}
                </span>
                            )}
                        </button>
                        <button
                            className="rounded-full border border-white/15 p-2 md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
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


                <section id="plants" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
                    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-700">
                                Current Inventory
                            </p>
                            <h2 className="mt-2 text-4xl font-black">Shop Aquarium Plants</h2>
                            <p className="mt-3 text-sm font-semibold text-slate-500">
                                Showing {filteredProducts.length} of {products.length} plants
                            </p>
                        </div>

                        <button
                            onClick={clearFilters}
                            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black shadow-sm hover:text-sky-700"
                        >
                            Clear filters
                        </button>
                    </div>

                    <div className="mb-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <div
                            className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-sky-700">
                            <SlidersHorizontal size={18}/> Filter Plants
                        </div>

                        <div className="grid gap-4 md:grid-cols-[1.2fr_repeat(4,minmax(150px,1fr))]">
                            <label className="grid gap-1.5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Search
                </span>
                                <div
                                    className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                                    <Search size={17}/>
                                    <input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search plants"
                                        className="w-full bg-transparent text-sm font-semibold outline-none"
                                    />
                                </div>
                            </label>

                            <FilterSelect label="Category" value={category} onChange={setCategory}
                                          options={categories}/>
                            <FilterSelect label="Difficulty" value={difficulty} onChange={setDifficulty}
                                          options={difficulties}/>
                            <FilterSelect label="CO2" value={co2} onChange={setCo2} options={co2Options}/>
                            <FilterSelect label="Placement" value={placement} onChange={setPlacement}
                                          options={placementOptions}/>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div
                            className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-10 text-center">
                            <p className="text-2xl font-black">No plants match those filters.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-5 rounded-full bg-[#071824] px-6 py-3 text-sm font-black uppercase text-white"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <motion.article
                                    key={product.name}
                                    layout
                                    onClick={() => setSelectedProduct(product)}
                                    className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="relative h-80 overflow-hidden bg-slate-100">
                                        <ProductImage product={product}/>
                                        <span
                                            className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase text-sky-700 shadow-sm">
                      {product.tag}
                    </span>
                                    </div>

                                    <div className="p-6">
                                        <div
                                            className="mb-2 flex items-center justify-between gap-2 text-xs font-bold uppercase text-slate-500">
                                            <span>{product.category}</span>
                                            <span>{product.placement}</span>
                                        </div>

                                        <h3 className="text-xl font-black">{product.name}</h3>
                                        <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                                            {product.description}
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                      <span className="rounded-full bg-sky-50 px-3 py-1.5">
                        CO2: {getPlantCare(product).co2}
                      </span>
                                            <span className="rounded-full bg-sky-50 px-3 py-1.5">
                        {getPlantCare(product).difficulty}
                      </span>
                                        </div>

                                        <div className="mt-5 flex items-center justify-between">
                      <span className="text-2xl font-black">
                        {formatCurrency(product.price)}
                      </span>
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setCart((items) => [...items, product]);
                                                }}
                                                className="rounded-full bg-[#071824] px-5 py-3 text-sm font-black uppercase text-white hover:bg-sky-700"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </section>

                <section id="baby-shrimp"
                         className="bg-gradient-to-br from-sky-100 via-white to-blue-100 px-4 py-16 md:py-20">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        <div>
                            <p className="text-3xl font-black uppercase tracking-[0.25em] text-sky-700">
                                Baby Caridina Shrimp:
                            </p>
                            <h2 className="mt-3 text-4xl font-black md:text-5xl">
                                Meet the tiniest residents of Small Fry Aquatics.
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-700">
                                This section shows off the baby caridina shrimp growing up in my 10 gallon
                                tank. They are not listed for sale; but I hope to one day expand to sell shrimp as well!
                            </p>
                        </div>

                        <motion.div
                            className="relative min-h-[390px] overflow-hidden rounded-[1.5rem]"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, info) => {
                                if (info.offset.x < -50) nextShrimp();
                                if (info.offset.x > 50) prevShrimp();
                            }}
                        >

                            {/* LEFT ARROW */}
                            <button
                                onClick={prevShrimp}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl bg-black/40 px-3 py-1 rounded-full"
                            >
                                ❮
                            </button>

                            {/* IMAGE OR VIDEO */}
                            {shrimpShowcase[shrimpIndex].type === "video" ? (
                                <video
                                    key={shrimpIndex}
                                    src={shrimpShowcase[shrimpIndex].src}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    controls
                                />
                            ) : (
                                <img
                                    src={shrimpShowcase[shrimpIndex].src}
                                    alt="Shrimp"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            )}

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#071824]/85 via-[#071824]/25 to-transparent" />

                            {/* RIGHT ARROW */}
                            <button
                                onClick={nextShrimp}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl bg-black/40 px-3 py-1 rounded-full"
                            >
                                ❯
                            </button>

                        </motion.div>
                    </div>
                </section>

                <section
                    id="shipping"
                    className="scroll-mt-32 bg-[#071722] px-4 py-16 text-white"
                >
                    <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_.9fr]">
                        <div>
                            <p className="text-3xl font-black uppercase tracking-[0.35em] text-sky-300 mb-10">
                                Shipping & Policies
                            </p>

                            <h2 className="mt-2 text-4xl font-black">
                                Shipping info that helps you buy with confidence.
                            </h2>
                            <div
                                className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-sky-100/90">
                                <h3 className="text-xl font-black text-sky-200">
                                    Shipping Schedule & Live Arrival Policy
                                </h3>

                                <p className="mt-3 text-sm leading-7">
                                    We ship orders on <span
                                    className="font-black text-white">Mondays and Tuesdays</span> only.
                                    This helps us avoid weekend carrier delays and ensures plants spend the shortest
                                    possible
                                    time in transit.
                                </p>

                                <p className="mt-4 text-sm leading-7">
                                    In cases of extreme weather (heat waves, freezing temperatures, or severe storms),
                                    we may hold shipments until conditions improve. This is done to protect plant health
                                    and ensure safe arrival.
                                </p>

                                <p className="mt-4 text-sm leading-7">
                                    <span className="font-black text-white">Dead on Arrival (DOA) Policy:</span> If any
                                    plants
                                    arrive dead or severely damaged, please contact us within <span
                                    className="font-black text-white">8 hours of delivery</span> with clear photo proof.
                                    Once verified, we will either refund the affected items or resend
                                    replacements at no additional shipping cost.
                                </p>

                                <p className="mt-4 text-xs text-sky-200/70">
                                    This policy ensures fairness while also protecting plants from carrier-related
                                    delays outside our control.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] bg-white p-8 text-slate-950 shadow-lg">

                            <h3 className="text-2xl font-black text-center">
                                Free Shipping Progress
                            </h3>

                            {/* BIG STATUS TEXT */}
                            <div className="mt-6 text-center">
                                <p className="text-3xl font-black leading-tight">
                                    {cartTotal >= 100 ? (
                                        <span className="text-green-600">Free Shipping Unlocked 🎉</span>
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

                                <p className="mt-2 text-sm font-semibold text-slate-500">
                                    {cartTotal === 0
                                        ? "Add some plants to start unlocking free shipping"
                                        : cartTotal < 50
                                            ? "You're just getting started — keep adding plants"
                                            : cartTotal < 100
                                                ? "You're close — a few more plants unlock free shipping"
                                                : "You're all set — no shipping charge at checkout"}

                                    <div
                                        className="mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 p-5">

                                        {/* decorative background glow */}
                                        <div
                                            className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sky-200/40 blur-2xl"/>
                                        <div
                                            className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-200/40 blur-2xl"/>

                                        <div className="relative text-center">
                                            <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-700">
                                                Live Shipping Status
                                            </p>


                                            <p className="mt-2 text-lg font-bold text-slate-700">
                                                {cartTotal >= 100
                                                    ? "Your order is ready for fast, secure shipping 🚚"
                                                    : "Add more plants to unlock free shipping"}
                                            </p>

                                            <div className="mt-4 flex justify-center gap-2">
                                                <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500"></span>
                                                <span
                                                    className="h-2 w-2 animate-pulse rounded-full bg-sky-500 delay-150"></span>
                                                <span
                                                    className="h-2 w-2 animate-pulse rounded-full bg-sky-500 delay-300"></span>
                                            </div>

                                            <p className="mt-3 text-xs text-slate-500">
                                                Plants packed with care • Shipped Monday–Tuesday only
                                            </p>
                                        </div>
                                    </div>
                                </p>
                            </div>

                            {/* BIG PROGRESS BAR */}
                            <div className="mt-6 h-5 w-full rounded-full bg-slate-200 overflow-hidden">
                                <div
                                    className="h-5 rounded-full bg-sky-600 transition-all duration-500"
                                    style={{
                                        width: `${Math.min((cartTotal / 100) * 100, 100)}%`,
                                    }}
                                />
                            </div>

                            {/* EXTRA VISUAL WEIGHT (not filler text — reinforces trust) */}
                            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-xs font-bold text-slate-500">Ship Days</p>
                                    <p className="mt-1 text-sm font-black">Mon–Tue</p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-xs font-bold text-slate-500">Protection</p>
                                    <p className="mt-1 text-sm font-black">Weather Holds</p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-xs font-bold text-slate-500">Guarantee</p>
                                    <p className="mt-1 text-sm font-black">Live Arrival</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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

            <footer className="relative overflow-hidden bg-[#061722] px-4 py-12 text-white">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.16),transparent_24%)]"/>

                <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
                    <div>
                        <p className="text-4xl font-black text-sky-300">SMALL</p>
                        <p className="-mt-2 text-3xl font-black text-sky-200">FRY</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.42em] text-sky-100">
                            Aquatics
                        </p>
                        <p className="mt-4 text-sm leading-6 text-sky-100/75">
                            Hobbyist-grown aquarium plants, shrimp updates, and freshwater
                            tank inspiration.
                        </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                        <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">
                            Contact support
                        </p>
                        <h3 className="mt-2 text-2xl font-black">
                            Questions or suggestions?
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-sky-100/75">
                            Reach out for plant care questions, order help, special requests,
                            or ideas for what Small Fry should stock next.
                        </p>
                        <a
                            href="mailto:support@smallfryaquatics.com"
                            className="mt-4 inline-flex rounded-full border border-sky-300/40 bg-sky-300/10 px-5 py-3 text-sm font-black text-sky-100 hover:bg-sky-300/20"
                        >
                            support@smallfryaquatics.com
                        </a>
                    </div>

                    <div className="flex flex-col gap-3 text-sm font-bold text-sky-100/80 lg:items-end">

                        <a
                            href="#plants"
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:border-sky-300"
                        >
                            <Leaf size={16} className="text-sky-300"/>
                            Plants
                        </a>

                        <a
                            href="#baby-shrimp"
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:border-sky-300"
                        >
                            <Sparkles size={16} className="text-sky-300"/>
                            Baby Shrimp
                        </a>

                        <a
                            href="#shipping"
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2"
                        >
                            <Droplets size={16} className="text-sky-300"/>
                            Shipping
                        </a>
                        <a
                            href="#faq"
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10 hover:border-sky-300"
                        >
                            <ShieldCheck size={16} className="text-sky-300"/>
                            FAQ
                        </a>

                    </div>
                </div>

                <div className="relative mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-sky-100/60">
                    © 2026 Small Fry Aquatics. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {Droplets, Search, SlidersHorizontal} from "lucide-react";
const categories = ["All", "Stem Plant", "Floating Plant", "Foreground"];
const difficulties = ["All", "Beginner friendly", "Intermediate"];
const co2Options = ["All", "Not required", "Optional", "Recommended"];
const placementOptions = ["All", "Foreground", "Midground", "Background", "Floating"];



function ProductImage({ product }) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-sky-50 p-8 text-center">
                <div className="rounded-3xl bg-white p-6 shadow">
                    <Droplets className="mx-auto mb-3 text-sky-700" />
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

function FilterSelect({ label, value, onChange, options }) {
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

export default function PlantsSection({products, setCart, setSelectedProduct, getPlantCare, formatCurrency}) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [difficulty, setDifficulty] = useState("All");
    const [co2, setCo2] = useState("All");
    const [placement, setPlacement] = useState("All");

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

    function clearFilters() {
        setQuery("");
        setCategory("All");
        setDifficulty("All");
        setCo2("All");
        setPlacement("All");
    }

    return (

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
                <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-sky-700">
                    <SlidersHorizontal size={18} /> Filter Plants
                </div>

                <div className="grid gap-4 md:grid-cols-[1.2fr_repeat(4,minmax(150px,1fr))]">
                    <label className="grid gap-1.5">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Search
                </span>
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                            <Search size={17} />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search plants"
                                className="w-full bg-transparent text-sm font-semibold outline-none"
                            />
                        </div>
                    </label>

                    <FilterSelect label="Category" value={category} onChange={setCategory} options={categories} />
                    <FilterSelect label="Difficulty" value={difficulty} onChange={setDifficulty} options={difficulties} />
                    <FilterSelect label="CO2" value={co2} onChange={setCo2} options={co2Options} />
                    <FilterSelect label="Placement" value={placement} onChange={setPlacement} options={placementOptions} />
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-10 text-center">
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
                                <ProductImage product={product} />
                                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase text-sky-700 shadow-sm">
                      {product.tag}
                    </span>
                            </div>

                            <div className="p-6">
                                <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold uppercase text-slate-500">
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
    );
}
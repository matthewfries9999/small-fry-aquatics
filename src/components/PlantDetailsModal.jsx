import { motion } from "framer-motion";
import { X } from "lucide-react";
import { formatCurrency, getPlantCare } from "../utils/Helpers.js";

export default function PlantDetailsModal({ product, onClose, onAddToCart }) {
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
import { useState } from "react";
import { motion } from "framer-motion";

export default function BabyShrimpSection({ shrimpShowcase }) {
    const [shrimpIndex, setShrimpIndex] = useState(0);

    const nextShrimp = () => {
        setShrimpIndex((prev) => (prev + 1) % shrimpShowcase.length);
    };

    const prevShrimp = () => {
        setShrimpIndex((prev) =>
            (prev - 1 + shrimpShowcase.length) % shrimpShowcase.length
        );
    };

    return (
        <section
            id="baby-shrimp"
            className="bg-gradient-to-br from-sky-100 via-white to-blue-100 px-4 py-16 md:py-20"
        >
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
                    {/* LEFT */}
                    <button
                        onClick={prevShrimp}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl bg-black/40 px-3 py-1 rounded-full"
                    >
                        ❮
                    </button>

                    {/* MEDIA */}
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

                    {/* RIGHT */}
                    <button
                        onClick={nextShrimp}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl bg-black/40 px-3 py-1 rounded-full"
                    >
                        ❯
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
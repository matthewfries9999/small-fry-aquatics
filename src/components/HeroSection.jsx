import { motion } from "framer-motion";

export default function HeroSection(){
    return(
        <section className="relative min-h-[620px] overflow-hidden bg-[#061722]">
            <img
                src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?auto=format&fit=crop&w=2000&q=90"
                alt="Small Fry planted aquarium hero"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061722]/95 via-[#061722]/60 to-transparent" />

            <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl text-white"
                >
                    <h1 className="text-5xl font-black leading-tight md:text-7xl">
                        Healthy Plants.
                        <br />
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
export default function CartSummary({ cart, onClose, onRemove, zip, setZip,
                                        calculateRates, taxRate, shipping, zipError, cartTotal }) {
    // ... paste the entire component
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

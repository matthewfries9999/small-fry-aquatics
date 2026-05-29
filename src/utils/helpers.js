export function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

export function getPlantCare(product) {
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

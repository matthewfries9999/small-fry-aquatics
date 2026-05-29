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

export function isValidContiguousUSZip(zip) {
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

export function buildRates(zipCode, total) {
    // Returns { taxRate, shipping, error } instead of calling setState directly
    const cleanZip = zipCode.trim();
    if (!isValidContiguousUSZip(cleanZip)) {
        return { error: "Enter a valid 5-digit continental US ZIP code" };
    }
    const inState = cleanZip.startsWith("60") || cleanZip.startsWith("61");
    return {
        taxRate: inState ? 0.1025 : 0.0,
        shipping: total >= 100 ? 0 : total >= 50 ? 6.99 : 9.99,
        error: "",
    };
}



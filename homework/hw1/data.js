// ============================================================
// HW1 – MongoDB – Online Clothing Store
// Data creation
// ============================================================

// Clean start: remove the collection if it already exists
db.products.drop();

// Modeling decisions:
// - All products are stored in one collection "products".
//   The field "type" distinguishes three subtypes: "tshirt", "jeans", "shoes".
//   All subtypes share common fields (name, price, category, brand, variants)
//   and each subtype has its own specific fields.
// - "brand" is a nested object (name + country of origin).
// - "variants" is an embedded array of objects (size, color, stock).
//   It is embedded because the number of variants per product is small
//   and bounded, and variants are always read together with the product.

db.products.insertMany([

    // ---------- T-SHIRTS ----------
    {
        _id: "p01",
        type: "tshirt",
        name: "Basic Tee",
        category: "T-Shirts",
        price: 499,
        brand: { name: "Nordwear", country: "Sweden" },
        sleeveLength: "short",
        neckline: "crew",
        variants: [
            { size: "M", color: "black", stock: 5 },
            { size: "L", color: "white", stock: 2 }
        ]
    },
    {
        _id: "p02",
        type: "tshirt",
        name: "Oversized Tee",
        category: "T-Shirts",
        price: 699,
        brand: { name: "Urbanfox", country: "Czech Republic" },
        sleeveLength: "short",
        neckline: "crew",
        variants: [
            { size: "M", color: "white", stock: 3 },
            { size: "L", color: "black", stock: 4 }
        ]
    },
    {
        _id: "p03",
        type: "tshirt",
        name: "Linen Tee",
        category: "T-Shirts",
        price: 1190,
        brand: { name: "Denimo", country: "Italy" },
        sleeveLength: "short",
        neckline: "v-neck",
        variants: [
            { size: "M", color: "black", stock: 0 },
            { size: "S", color: "beige", stock: 6 }
        ]
    },
    {
        _id: "p04",
        type: "tshirt",
        name: "Longsleeve Tee",
        category: "T-Shirts",
        price: 899,
        brand: { name: "Nordwear", country: "Sweden" },
        sleeveLength: "long",
        neckline: "crew",
        variants: [
            { size: "M", color: "grey", stock: 2 },
            { size: "XL", color: "black", stock: 1 }
        ]
    },

    // ---------- JEANS ----------
    {
        _id: "p05",
        type: "jeans",
        name: "Slim Fit Jeans",
        category: "Jeans",
        price: 1490,
        brand: { name: "Denimo", country: "Italy" },
        fit: "slim",
        rise: "mid",
        variants: [
            { size: "30", color: "blue", stock: 4 },
            { size: "32", color: "black", stock: 0 }
        ]
    },
    {
        _id: "p06",
        type: "jeans",
        name: "Regular Jeans",
        category: "Jeans",
        price: 790,
        brand: { name: "Pacific Thread", country: "USA" },
        fit: "regular",
        rise: "mid",
        variants: [
            { size: "32", color: "blue", stock: 6 },
            { size: "34", color: "blue", stock: 2 }
        ]
    },
    {
        _id: "p07",
        type: "jeans",
        name: "Skinny Black Jeans",
        category: "Jeans",
        price: 1690,
        brand: { name: "Urbanfox", country: "Czech Republic" },
        fit: "slim",
        rise: "high",
        variants: [
            { size: "28", color: "black", stock: 3 }
        ]
    },
    {
        _id: "p08",
        type: "jeans",
        name: "Relaxed Jeans",
        category: "Jeans",
        price: 2390,
        brand: { name: "Denimo", country: "Italy" },
        fit: "relaxed",
        rise: "low",
        variants: [
            { size: "32", color: "light blue", stock: 5 }
        ]
    },

    // ---------- SHOES ----------
    {
        _id: "p09",
        type: "shoes",
        name: "Urban Sneaker",
        category: "Sneakers",
        price: 2490,
        brand: { name: "Stepline", country: "Italy" },
        soleMaterial: "rubber",
        heelHeightCm: 3,
        variants: [
            { size: "40", color: "white", stock: 4 },
            { size: "42", color: "black", stock: 0 }
        ]
    },
    {
        _id: "p10",
        type: "shoes",
        name: "Leather Boot",
        category: "Boots",
        price: 3990,
        brand: { name: "Stepline", country: "Italy" },
        soleMaterial: "leather",
        heelHeightCm: 5,
        variants: [
            { size: "39", color: "brown", stock: 2 },
            { size: "41", color: "black", stock: 1 }
        ]
    },
    {
        _id: "p11",
        type: "shoes",
        name: "Canvas Sneaker",
        category: "Sneakers",
        price: 1290,
        brand: { name: "Pacific Thread", country: "USA" },
        soleMaterial: "rubber",
        heelHeightCm: 2,
        variants: [
            { size: "38", color: "white", stock: 0 },
            { size: "41", color: "red", stock: 7 }
        ]
    },
    {
        _id: "p12",
        type: "shoes",
        name: "Running Shoe",
        category: "Sneakers",
        price: 2890,
        brand: { name: "Nordwear", country: "Sweden" },
        soleMaterial: "foam",
        heelHeightCm: 4,
        variants: [
            { size: "42", color: "blue", stock: 3 },
            { size: "43", color: "black", stock: 5 }
        ]
    }
]);
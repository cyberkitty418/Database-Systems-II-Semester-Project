// ============================================================
// Q1 – Subtype-specific property
// Finds T-shirts (the only subtype that has neckline and sleeveLength)
// that have a crew neckline AND short sleeves.
// Returns full product documents.
// ============================================================
db.products.find({
    neckline: "crew",
    sleeveLength: "short"
});

// ============================================================
// Q2 – Nested field
// Finds products whose brand comes from Italy (nested field brand.country)
// AND whose price is lower than 2000 CZK.
// Returns full product documents sorted by price ascending.
// ============================================================
db.products.find({
    "brand.country": "Italy",
    price: { $lt: 2000 }
}).sort({ price: 1 });

// ============================================================
// Q3 – Embedded array, several conditions on the same element
// Finds products that have at least one variant which is black
// AND has more than 0 pieces in stock – both conditions must hold
// for the same variant. Products that have a black variant with zero
// stock and a different-colour variant in stock are NOT returned.
// Returns only product name, brand name and the variants array (no _id).
// ============================================================
db.products.find(
    { variants: { $elemMatch: { color: "black", stock: { $gt: 0 } } } },
    { _id: 0, name: 1, "brand.name": 1, variants: 1 }
);

// ============================================================
// Q4 – Projection, sorting and limit
// Finds products with a price between 1000 and 3000 CZK (inclusive),
// sorts them by price from the most expensive, and returns only
// the 3 most expensive ones. For each product returns only
// name, brand name and price (no _id).
// ============================================================
db.products.find(
    { price: { $gte: 1000, $lte: 3000 } },
    { _id: 0, name: 1, "brand.name": 1, price: 1 }
).sort({ price: -1 }).limit(3);

// ============================================================
// Q5 – Domain query: sold-out products
// Finds products in which NO variant has a stock greater than 0,
// i.e. products that are completely sold out in all sizes and colours.
// Returns product name, category and variants (no _id).
// ============================================================
db.products.find(
    { variants: { $not: { $elemMatch: { stock: { $gt: 0 } } } } },
    { _id: 0, name: 1, category: 1, variants: 1 }
);

// ============================================================
// Q6 – Domain query: products with a wide range of variants
// Finds products that are offered in at least 3 variants
// (size/colour combinations), regardless of stock.
// Returns product name, type and the number of variants
// as a calculated field variantCount (no _id).
// ============================================================
db.products.find(
    { $expr: { $gte: [{ $size: "$variants" }, 3] } },
    { _id: 0, name: 1, type: 1, variantCount: { $size: "$variants" } }
);

// ============================================================
// Q7 – Aggregation pipeline
// Considers only products that have at least one variant in stock.
// Groups them by the country of the brand and for each country calculates:
//   productCount – number of products,
//   avgPrice     – average product price rounded to whole CZK,
//   totalStock   – total number of pieces in stock over all variants.
// Results are sorted by avgPrice in descending order.
// ============================================================
db.products.aggregate([
    { $match: { "variants.stock": { $gt: 0 } } },
    { $group: {
            _id: "$brand.country",
            productCount: { $sum: 1 },
            avgPrice: { $avg: "$price" },
            totalStock: { $sum: { $sum: "$variants.stock" } }
        } },
    { $project: {
            _id: 0,
            country: "$_id",
            productCount: 1,
            avgPrice: { $round: ["$avgPrice", 0] },
            totalStock: 1
        } },
    { $sort: { avgPrice: -1 } }
]);

// ============================================================
// U1 – Update of a specific element inside an embedded array
// In product p06, sets the stock of the variant with size "32"
// and colour "blue" to 10. Only this one array element is changed;
// the rest of the document and the other variants stay untouched.
// ============================================================
db.products.updateOne(
    { _id: "p06" },
    { $set: { "variants.$[v].stock": NumberInt(10) } },
    { arrayFilters: [{ "v.size": "32", "v.color": "blue" }] }
);

// ============================================================
// Modelling decision – potentially growing relationship
// Variants are EMBEDDED in the product: their number is small and
// bounded (sizes x colours), they are always read together with the
// product and they are updated individually via arrayFilters.
// Customer reviews would be stored in a SEPARATE collection "reviews"
// with a reference productId: their number grows without limit over time,
// embedding them would make product documents grow unboundedly
// (16 MB document limit) and slow down every catalogue read.
// ============================================================
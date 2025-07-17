interface FilterItem {
  name: string;
  slug: string;
}

export const brands: FilterItem[] = [
  { name: "Lenovo", slug: "lenovo" },
  { name: "Dell", slug: "dell" },
  { name: "Asus", slug: "asus" },
  { name: "Acer", slug: "acer" },
  { name: "Apple", slug: "apple" },
  { name: "HP", slug: "hp" },
  { name: "LG", slug: "lg" },
  { name: "ThinkPad", slug: "thinkpad" },
  { name: "Asus Vivobook", slug: "asus-vivobook" },
  { name: "Dell XPS", slug: "dell-xps" },
  { name: "Dell Inspiron", slug: "dell-inspiron" },
];

export const needs: FilterItem[] = [
  { name: "Sinh viên", slug: "sinh-vien" },
  { name: "Gaming", slug: "gaming" },
  { name: "Đồ họa", slug: "do-hoa" },
  { name: "Mỏng nhẹ", slug: "mong-nhe" },
  { name: "Văn phòng", slug: "van-phong" },
  { name: "Lập trình", slug: "lap-trinh" },
  { name: "Laptop AI", slug: "laptop-ai" },
];

export const priceRanges: FilterItem[] = [
  { name: "Dưới 10 triệu", slug: "duoi-10-trieu" },
  { name: "Từ 10 - 15 triệu", slug: "tu-10-15-trieu" },
  { name: "Từ 15 - 20 triệu", slug: "tu-15-20-trieu" },
  { name: "Trên 20 triệu", slug: "tren-20-trieu" },
];
export const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "featured", label: "Nổi bật nhất" },
  { value: "sale", label: "Bán chạy" },
  { value: "price-asc", label: "Giá thấp → cao" },
  { value: "price-desc", label: "Giá cao → thấp" },
];

interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  price: number;
  discountedPrice: number;
  discount: number;
  promo: string;
  image: string;
  specs: string[];
  category: Category;
}

// export const products: Product[] = [
//   {
//     id: 1,
//     name: "Lenovo ThinkPad X1 Carbon Gen 11",
//     slug: "lenovo-thinkpad-x1-carbon-gen-11",
//     brand: "Lenovo",
//     price: 36990000,
//     discountedPrice: 36990000,
//     discount: 12,
//     promo: "Quà 350.000",
//     image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2022/11/1/lenovo-yoga-slim-7i-pro-thinkpro-01.png",
//     specs: ["i7 1370P", "64GB", "512GB", "2.8K OLED"],
//     category: [
//       { name: "Laptop", slug: "laptop" },
//       { name: "Văn phòng", slug: "van-phong" },
//       { name: "Mỏng nhẹ", slug: "mong-nhe" },
//     ],
//     mainCategory: { name: "Laptop", slug: "laptop" },
//   },
//   {
//     id: 2,
//     name: "Lenovo ThinkBook 14 G5+",
//     slug: "lenovo-thinkbook-14-g5-plus",
//     brand: "Lenovo",
//     price: 17890000,
//     discountedPrice: 17890000,
//     discount: 40,
//     promo: "Quà 350.000",
//     image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2023/7/19/lenovo-yoga-slim-7-slim-7-14iap7-thinkpro-6uz.jpg",
//     specs: ["i5 13500H", "2.8K 16GB", "1TB"],
//     category: [
//       { name: "Laptop", slug: "laptop" },
//       { name: "Văn phòng", slug: "van-phong" },
//       { name: "Sinh viên", slug: "sinh-vien" },
//     ],
//     mainCategory: { name: "Laptop", slug: "laptop" },
//   },
//   {
//     id: 3,
//     name: "Lenovo ThinkPad X1 Carbon Gen 9",
//     slug: "lenovo-thinkpad-x1-carbon-gen-9",
//     brand: "Lenovo",
//     price: 15790000,
//     discountedPrice: 15790000,
//     discount: 7,
//     promo: "Quà 350.000",
//     image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2024/7/3/lenovo-yoga-7-2-in-1-14ahp9-undefined.png",
//     specs: ["Core i5 1135G7", "32GB", "256GB", "FHD+ Touch"],
//     category: [
//       { name: "Laptop", slug: "laptop" },
//       { name: "Văn phòng", slug: "van-phong" },
//       { name: "Mỏng nhẹ", slug: "mong-nhe" },
//     ],
//     mainCategory: { name: "Laptop", slug: "laptop" },
//   },
//   {
//     id: 4,
//     name: "Dell XPS 13 Plus 9320",
//     slug: "dell-xps-13-plus-9320",
//     brand: "Dell",
//     price: 26990000,
//     discountedPrice: 26990000,
//     discount: 7,
//     promo: "Quà 2.148.000",
//     image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2022/12/23/yoga-slim-7-prox-14arh7.png",
//     specs: ["i7 1270P", "32GB", "1024GB", "FHD+"],
//     category: [
//       { name: "Laptop", slug: "laptop" },
//       { name: "Dell XPS", slug: "dell-xps" },
//       { name: "Mỏng nhẹ", slug: "mong-nhe" },
//     ],
//     mainCategory: { name: "Laptop", slug: "laptop" },
//   },
//   {
//     id: 5,
//     name: "Dell Inspiron 14 5430",
//     slug: "dell-inspiron-14-5430",
//     brand: "Dell",
//     price: 19490000,
//     discountedPrice: 19490000,
//     discount: 20,
//     promo: "Quà 350.000",
//     image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2024/9/19/lenovo-yoga-pro-7-14imh9-83e2005dvn-undefined.png",
//     specs: ["i7 1355U", "16GB", "512GB", "FullHD+"],
//     category: [
//       { name: "Laptop", slug: "laptop" },
//       { name: "Dell Inspiron", slug: "dell-inspiron" },
//       { name: "Sinh viên", slug: "sinh-vien" },
//     ],
//     mainCategory: { name: "Laptop", slug: "laptop" },
//   },
//   {
//     id: 6,
//     name: "Apple MacBook Air M2",
//     slug: "apple-macbook-air-m2",
//     brand: "Apple",
//     price: 29490000,
//     discountedPrice: 29490000,
//     discount: 15,
//     promo: "Quà 350.000",
//     image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2024/9/16/lenovo-yoga-book-9-13imu9-undefined.png",
//     specs: ["Apple M2", "16GB", "512GB", "Retina"],
//     category: [
//       { name: "Laptop", slug: "laptop" },
//       { name: "Apple", slug: "apple" },
//       { name: "Mỏng nhẹ", slug: "mong-nhe" },
//     ],
//     mainCategory: { name: "Laptop", slug: "laptop" },
//   },
//   {
//     id: 7,
//     name: "Asus ROG Zephyrus G14",
//     slug: "asus-rog-zephyrus-g14",
//     brand: "Asus",
//     price: 32490000,
//     discountedPrice: 32490000,
//     discount: 10,
//     promo: "Quà 350.000",
//     image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2025/5/3/lenovo-yoga-slim-7i-2025-9ec.jpg",
//     specs: ["Ryzen 9 7940HS", "32GB", "1TB", "2.8K 120Hz"],
//     category: [
//       { name: "Laptop", slug: "laptop" },
//       { name: "Gaming", slug: "gaming" },
//       { name: "Asus", slug: "asus" },
//     ],
//     mainCategory: { name: "Laptop", slug: "laptop" },
//   },
//   {
//     id: 8,
//     name: "HP Spectre x360 14",
//     slug: "hp-spectre-x360-14",
//     brand: "HP",
//     price: 35990000,
//     discountedPrice: 35990000,
//     discount: 5,
//     promo: "Quà 350.000",
//     image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://media-api-beta.thinkpro.vn/media/core/products/2025/1/9/lenovo-yoga-slim-9i-2025-undefined.png",
//     specs: ["i7 1355U", "32GB", "2TB", "3K OLED Touch"],
//     category: [
//       { name: "Laptop", slug: "laptop" },
//       { name: "HP", slug: "hp" },
//       { name: "Đồ họa", slug: "do-hoa" },
//     ],
//     mainCategory: { name: "Laptop", slug: "laptop" },
//   },
// ];

export const products: Product[] = [
  {
    id: 1,
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    slug: "lenovo-thinkpad-x1-carbon-gen-11",
    brand: "Lenovo",
    price: 36990000,
    discountedPrice: 36990000,
    discount: 12,
    promo: "Quà 350.000",
    image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2022/11/1/lenovo-yoga-slim-7i-pro-thinkpro-01.png",
    specs: ["i7 1370P", "64GB", "512GB", "2.8K OLED"],
    category: {id:1, name: "Laptop", slug: "laptop" },
  },
  {
    id: 2,
    name: "Lenovo ThinkBook 14 G5+",
    slug: "lenovo-thinkbook-14-g5-plus",
    brand: "Lenovo",
    price: 17890000,
    discountedPrice: 17890000,
    discount: 40,
    promo: "Quà 350.000",
    image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2023/7/19/lenovo-yoga-slim-7-slim-7-14iap7-thinkpro-6uz.jpg",
    specs: ["i5 13500H", "2.8K 16GB", "1TB"],
    category: {id:1, name: "Laptop", slug: "laptop" },
  },
  {
    id: 3,
    name: "Lenovo ThinkPad X1 Carbon Gen 9",
    slug: "lenovo-thinkpad-x1-carbon-gen-9",
    brand: "Lenovo",
    price: 15790000,
    discountedPrice: 15790000,
    discount: 7,
    promo: "Quà 350.000",
    image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2024/7/3/lenovo-yoga-7-2-in-1-14ahp9-undefined.png",
    specs: ["Core i5 1135G7", "32GB", "256GB", "FHD+ Touch"],
    category: {id:1, name: "Laptop", slug: "laptop" },
  },
  {
    id: 4,
    name: "Dell XPS 13 Plus 9320",
    slug: "dell-xps-13-plus-9320",
    brand: "Dell",
    price: 26990000,
    discountedPrice: 26990000,
    discount: 7,
    promo: "Quà 2.148.000",
    image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2022/12/23/yoga-slim-7-prox-14arh7.png",
    specs: ["i7 1270P", "32GB", "1024GB", "FHD+"],
    category: {id:1, name: "Laptop", slug: "laptop" },
  },
  {
    id: 5,
    name: "Dell Inspiron 14 5430",
    slug: "dell-inspiron-14-5430",
    brand: "Dell",
    price: 19490000,
    discountedPrice: 19490000,
    discount: 20,
    promo: "Quà 350.000",
    image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2024/9/19/lenovo-yoga-pro-7-14imh9-83e2005dvn-undefined.png",
    specs: ["i7 1355U", "16GB", "512GB", "FullHD+"],
    category: {id:1, name: "Laptop", slug: "laptop" },
  },
  {
    id: 6,
    name: "Apple MacBook Air M2",
    slug: "apple-macbook-air-m2",
    brand: "Apple",
    price: 29490000,
    discountedPrice: 29490000,
    discount: 15,
    promo: "Quà 350.000",
    image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2024/9/16/lenovo-yoga-book-9-13imu9-undefined.png",
    specs: ["Apple M2", "16GB", "512GB", "Retina"],
    category: {id:1, name: "Laptop", slug: "laptop" },
  },
  {
    id: 7,
    name: "Asus ROG Zephyrus G14",
    slug: "asus-rog-zephyrus-g14",
    brand: "Asus",
    price: 32490000,
    discountedPrice: 32490000,
    discount: 10,
    promo: "Quà 350.000",
    image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://d28jzcg6y4v9j1.cloudfront.net/media/core/products/2025/5/3/lenovo-yoga-slim-7i-2025-9ec.jpg",
    specs: ["Ryzen 9 7940HS", "32GB", "1TB", "2.8K 120Hz"],
    category: {id:1, name: "Laptop", slug: "laptop" },
  },
  {
    id: 8,
    name: "HP Spectre x360 14",
    slug: "hp-spectre-x360-14",
    brand: "HP",
    price: 35990000,
    discountedPrice: 35990000,
    discount: 5,
    promo: "Quà 350.000",
    image: "https://imagor.owtg.one/unsafe/fit-in/280x280/https://media-api-beta.thinkpro.vn/media/core/products/2025/1/9/lenovo-yoga-slim-9i-2025-undefined.png",
    specs: ["i7 1355U", "32GB", "2TB", "3K OLED Touch"],
    category: {id:1, name: "Laptop", slug: "laptop" },
  },
];
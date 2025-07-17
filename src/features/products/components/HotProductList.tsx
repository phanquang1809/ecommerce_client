// import React from "react";

// const products = [
//   { id: 1, name: "Máy Playstation 5 Pro 2TB Digital Edition - Korea", price: "18,450,000đ", oldPrice: "20,500,000đ", discount: "-11%" },
//   { id: 2, name: "Máy Playstation 5 Pro Digital Edition + Tay Cầm", price: "19,900,000đ", oldPrice: "20,450,000đ", discount: "-3%" },
//   { id: 3, name: "Máy Playstation 5 Pro Digital Edition + PS5 Disc Drive", price: "22,250,000đ", isMain: true },
//   { id: 4, name: "Máy Playstation 5 Slim Digital 30th Anniversary", price: "15,990,000đ" },
//   { id: 5, name: "Máy Playstation 5 Slim 1TB Chính hãng VNA", price: "13,300,000đ" },
//   { id: 6, name: "Máy Playstation 5 Slim Edition 1TB CFI 2018A01", price: "12,990,000đ" },
//   { id: 7, name: "Máy Playstation 5 Slim Digital Edition 1TB CFI", price: "10,290,000đ" },
//   { id: 8, name: "Máy Playstation 5 / PS5 Standard Cũ", price: "8,190,000đ" },
// ];

// const ProductCard = ({ product }) => (
//   <div
//     className={`border rounded-lg p-4 shadow-md bg-white relative ${
//       product.isMain ? "border-blue-500 border-4 col-span-4 row-span-4 p-6 mx-2" : "col-span-2 row-span-2"
//     }`}
//   >
//     <div className={`h-48 ${product.isMain ? "h-64" : "h-48"} bg-gray-200 mb-4 flex items-center justify-center`}>
//       <span className="text-gray-500">Hình ảnh</span>
//     </div>
//     <h3 className="text-sm font-semibold">{product.name}</h3>
//     <p className="text-red-500 font-bold">{product.price}</p>
//     {product.oldPrice && (
//       <p className="text-gray-400 line-through text-sm">{product.oldPrice}</p>
//     )}
//     {product.discount && (
//       <span className="text-xs text-white bg-red-500 px-2 py-1 rounded absolute top-2 right-2">
//         {product.discount}
//       </span>
//     )}
//     {product.isMain && (
//       <button className="bg-red-500 text-white w-full py-2 mt-4 rounded">
//         Tùy chọn
//       </button>
//     )}
//   </div>
// );

// const HotProductList = () => {
//   return (
//     <div className="grid grid-cols-12 gap-2  auto-rows-auto">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default HotProductList;

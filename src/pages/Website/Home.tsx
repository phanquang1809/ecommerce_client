// import Banner from "../../components/layouts/Banner";
// import ProductList from "../../components/products/ProductList";
// import Recommend from "../../components/products/Recommend";
// import HotProductList from "../../components/products/HotProductList";
import Categories from "@/features/categories/Categories";
import { useHome } from "../../services/homeService";
import BannerSlider from "@/components/layouts/NewBanner";
import TopDeal from "@/features/products/components/TopDeal";
// import { products } from "./Category/data";
// const products= [
//       { 
//         id: 101, 
//         name: "iPhone 16 Pro 128GB", 
//         slug: "iphone-16-pro-128gb",
//         category: "smartphone",
//         href: "#", 
//         imageSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694523/cat_laptop_1744694520.webp", 
//         imageHoverSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694523/cat_laptop_1744694520.webp", 
//         imageAlt: "iPhone 16 Pro 128GB", 
//         price: "25,000,000 VND",
//         rating: 4 
//       },
//       { 
//         id: 102, 
//         name: "iPhone 15 256GB", 
//         slug: "iphone-15-256gb",
//         category: "smartphone",
//         href: "#", 
//         imageSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694486/cat_thiet_bi_van_phong_1744694483.webp", 
//         imageHoverSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694486/cat_thiet_bi_van_phong_1744694483.webp", 
//         imageAlt: "iPhone 15 256GB", 
//         price: "22,000,000 VND",
//         rating: 5 
//       },
//       { 
//         id: 201, 
//         name: "PG Unleashed RX-78-2 Gundam", 
//         slug: "pg-unleashed-rx-78-2-gundam",
//         category: "gundam-model",
//         href: "#", 
//         imageSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694826/cat_mo_hinh_1744694822.webp", 
//         imageHoverSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694826/cat_mo_hinh_1744694822.webp", 
//         imageAlt: "Gundam RX-78-2", 
//         price: "5,500,000 VND",
//         rating: 3 
//       },
//       { 
//         id: 202, 
//         name: "RG 1/144 Hi-ν GUNDAM Hi Nu Bandai", 
//         slug: "rg-1-144-hi-nu-gundam",
//         category: "gundam-model",
//         href: "#", 
//         imageSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694813/cat_camera_1744694810.webp", 
//         imageHoverSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694813/cat_camera_1744694810.webp", 
//         imageAlt: "RG 1/144 Hi-ν GUNDAM", 
//         price: "1,400,000 VND",
//         rating: 4 
//       },
//       { 
//         id: 301, 
//         name: "PlayStation 5", 
//         slug: "playstation-5",
//         category: "gaming-console",
//         href: "#", 
//         imageSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694801/cat_dien_thoai_1744694797.webp", 
//         imageHoverSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694801/cat_dien_thoai_1744694797.webp", 
//         imageAlt: "PlayStation 5", 
//         price: "14,000,000 VND",
//         rating: 5 
//       },
//       { 
//         id: 302, 
//         name: "Nintendo Switch OLED", 
//         slug: "nintendo-switch-oled",
//         category: "gaming-console",
//         href: "#", 
//         imageSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694835/cat_dien_may_1744694832.webp", 
//         imageHoverSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694801/cat_dien_thoai_1744694797.webp", 
//         imageAlt: "Nintendo Switch OLED", 
//         price: "9,000,000 VND",
//         rating: 4 
//       },
//       { 
//         id: 401, 
//         name: "Surface Pro 11 Copilot", 
//         slug: "surface-pro-11-copilot",
//         category: "laptop",
//         href: "#", 
//         imageSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744700229/cat_linh_kien_1744700224.webp", 
//         imageHoverSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744702663/cat_may_choi_game_1744701285.webp", 
//         imageAlt: "Surface Pro 11 Copilot", 
//         price: "28,000,000 VND",
//         rating: 3 
//       },
//       { 
//         id: 402, 
//         name: "MacBook Pro 16", 
//         slug: "macbook-pro-16",
//         category: "laptop",
//         href: "#", 
//         imageSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744702663/cat_may_choi_game_1744701285.webp", 
//         imageHoverSrc: "https://res.cloudinary.com/diaenxa58/image/upload/v1744694835/cat_dien_may_1744694832.webp", 
//         imageAlt: "MacBook Pro 16", 
//         price: "32,000,000 VND",
//         rating: 5 
//       }
// ];

const bannerSlides = [
  {
    id: 1,
    imageUrl: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/7c/3b/00/9f1bc38b3a176ae4747d26e80a53a074.png.webp",
 
  },
  {
    id: 2,
    imageUrl: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/9c/9c/19/faf9be8dd4f328b8ff4d1841171a737d.png.webp",
  },
  {
    id: 3,
    imageUrl: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/a8/8b/00/ee93f6730d771dfe21c3bdf2652c40bf.png.webp",
  },
  {
    id: 4,
    imageUrl: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/38/ab/a7/89657589515b4a1e038761ef1fa5d84e.png.webp",
  },
];

export default function Home() {
  const { data,error,isLoading } = useHome();
  return (
    <>
      {/* <NewBanner/>
       */}
        <BannerSlider 
        slides={bannerSlides} 
      />
    <div className="container mx-auto  flex flex-col gap-5">
      {/* <Banner banners={data?data.banners:[]} isLoading={isLoading} error={error}/> */}
      <Categories categories={data?data.categories:[]} isLoading={isLoading} error={error} />
      {/* <HotProductList /> */} 
      {/* <ProductList products={products} title="Flash Sale"/> */}
      {/* <ProductSlider products={products}/> */}
      <TopDeal products={data?data.products:[]} isLoading={isLoading} error={error}/>
      {/* <Recommend /> */}
    </div>
    </>
  );
}

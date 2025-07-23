import { useLocation, useParams } from "react-router-dom";
import { Shop } from "../ProductDetails/productdetails.type";

export default function ShopDetails() {
const { slug } = useParams();
  const location = useLocation();
  const stateProduct = location.state?.shop as Shop | null;
//   const [shop, setShop] = useState<Shop | null>(stateProduct ?? null);

  return (
    <div>{stateProduct?.name ||slug} </div>
  )
}

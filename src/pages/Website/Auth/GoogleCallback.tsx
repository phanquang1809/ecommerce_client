import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "@/services/apiServices";
import useUserStore from "@/store/userStore";

export default function GoogleCallback() {
  const {setUser} = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    api
      .get(`/auth/google/callback${location.search}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <p>Đang đăng nhập Google...</p>;
}

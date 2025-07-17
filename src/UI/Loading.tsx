import { useNavigation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const LoadingIndicator = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    NProgress.start();
  } else {
    NProgress.done();
  }

  return null;
};

export default LoadingIndicator;

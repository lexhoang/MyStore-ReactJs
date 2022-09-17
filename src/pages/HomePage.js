import Header from "../components/Header-Footer/Header";
import Slide from "../components/Header-Footer/Slider";
import ProductHot from "../components/content/home/ProductHot";
import Introduce from "../components/content/home/Introduce";
import ProductNew from "../components/content/home/ProductNew";
import Footer from "../components/Header-Footer/Footer";

const breadCrumbs = [
  {
    name: "Trang chủ",
    route: "/",
  },
]


function HomePage() {
  return (
    <div>
      <Header />
      <Slide />
      <ProductHot />
      <Introduce />
      <ProductNew />
      <Footer />
    </div>
  );
}

export default HomePage;

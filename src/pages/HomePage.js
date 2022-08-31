import Header from "../components/Header-Footer/Header";
import Slide from "../components/Header-Footer/Slider";
import RelatedProject from "../components/content/detail/RelatedProduct"
import HomeContent from "../components/content/Home";
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
      <RelatedProject />
      <HomeContent />
      <Footer />
    </div>
  );
}

export default HomePage;

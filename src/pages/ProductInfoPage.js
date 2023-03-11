import Header from "../components/Header-Footer/Header";
import BreadCrumb from "../components/Header-Footer/BreadCrumb";
import Footer from "../components/Header-Footer/Footer";

import ProductDetail from "../components/content/detail/ProductDetail";
import RelatedProject from "../components/content/detail/RelatedProduct"

const breadCrumbs = [
    {
        name: "Trang chủ",
        route: "/",
    },
    {
        name: "Trang sản phẩm",
        route: "/products",
    },
    {
        name: "Chi tiết sản phẩm",
        route: "",
    }
]

function ProductInfo() {
    return (
        <div>
            <Header />
            <BreadCrumb breadCrumbs={breadCrumbs} />
            <ProductDetail />
            <RelatedProject />
            <Footer />
        </div>
    )
}

export default ProductInfo;
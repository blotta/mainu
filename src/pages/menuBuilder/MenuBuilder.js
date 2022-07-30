import ProductForm from "../../components/ProductForm";
import ProductList from "../../components/ProductList";
import { useCollection } from "../../hooks/useCollection";

// styles
// import "./Home.css";

export default function Home() {
  const { documents: products } = useCollection("products");

  return (
    <div className="menu-builder-layout">
      <div>menu builder</div>
      <div className="menu-products">
        <h2 className="page-title">Products</h2>

        <ProductForm />

        <ProductList products={products} />
      </div>
    </div>
  );
}
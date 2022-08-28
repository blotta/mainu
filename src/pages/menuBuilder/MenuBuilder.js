import { useParams } from "react-router-dom";
import MenuDesigner from "./MenuDesigner";
import ProductForm from "../../components/ProductForm";
import ProductList from "../../components/ProductList";
import { useCollection } from "../../hooks/useCollection";

// styles
import "./MenuBuilder.css";
import { useEffect, useState } from "react";
import MenuSections from "./MenuSections";
import { useMenu } from "../../hooks/useMenu";

export default function MenuBuilder() {
  const { id } = useParams();
  const {menu, addSection, updateSection, moveSectionBefore} = useMenu(id);
  const { documents: products } = useCollection("products");

  const [showProductForm, setShowProductForm] = useState(false);
  const [productEditing, setProductEditing] = useState(null);

  useEffect(() => {
    setShowProductForm(false);
    if (productEditing) {
      setShowProductForm(true);
    }
  }, [productEditing]);

  const finishedProductForm = (pid) => {
    setProductEditing(null);
  };


  if (!menu) {
    return <div>loading...</div>;
  }

  return (
    <div className="menu-builder-layout">
      <div className="menu-designer-section">
        <MenuDesigner menuId={id} />
      </div>
      <div className="menu-sections-section">
        <h4>Menu Sections</h4>
        <MenuSections
          sections={menu.sections}
          addSection={addSection}
          updateSection={updateSection}
          moveSectionBefore={moveSectionBefore}
        />
      </div>
      <div className="menu-products-section">
        <h4>Products</h4>
        {showProductForm && (
          <ProductForm
            productId={productEditing}
            finishedForm={finishedProductForm}
          />
        )}
        {!showProductForm && (
          <>
            <p id="addProduct" onClick={() => setProductEditing("new")}>
              New
            </p>
            <ProductList
              products={products}
              productClicked={setProductEditing}
            />
          </>
        )}
      </div>
    </div>
  );
}

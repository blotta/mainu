import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";

// styles
import styles from "./ProductForm.module.css";

export default function ProductForm({ productId, finishedForm }) {
  const { document: product } = useDocument("products", productId);
  const [pid] = useState(productId);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { addDocument, updateDocument } = useFirestore("products");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, parseFloat(price));
    const sentProduct = {
      name,
      price: parseFloat(price).toFixed(2),
    };
    console.log(pid);
    if (pid === "new") {
      await addDocument(sentProduct);
    } else {
      await updateDocument(pid, sentProduct);
    }
    finishedForm(pid);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  return (
    <div className={styles.productForm}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </label>
        <button className="btn">{pid === "new" ? "Add" : "Update"}</button>
      </form>
      <button className="btn" onClick={() => finishedForm(pid)}>
        Cancel
      </button>
    </div>
  );
}

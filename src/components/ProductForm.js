import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

// styles
import styles from  "./ProductForm.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const {addDocument} = useFirestore('products')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, parseFloat(price));
    const product = {
      name,
      price: parseFloat(price).toFixed(2),
    }
    await addDocument(product)
  }

  return (
    <div>
      <form className={styles["products-form"]} onSubmit={handleSubmit}>
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
          <input type="number" required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            />
        </label>
        <button className="btn">Add</button>
      </form>
    </div>
  );
}

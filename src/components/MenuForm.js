import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";

import styles from "./MenuForm.module.css";

export default function MenuForm({ className }) {
  const [restaurantName, setRestaurantName] = useState("");
  const [menuName, setMenuName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { addDocument, response } = useFirestore("menus");
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(restaurantName, menuName);
    const newMenu = {
      restaurantName,
      name: menuName,
      createdBy: user.uid,
      sections: []
    };
    await addDocument(newMenu);
  };

  useEffect(() => {
    console.log("response", response);
    if (response.document && response.success) {
      navigate(`/menu-builder/${response.document.id}`);
      return;
    }
  }, [response, navigate]);

  return (
    <div
      className={styles["menu-form"] + " " + className + " " + (showForm ? styles.showForm : '')}
      onFocus={() => setShowForm(true)}
      onMouseEnter={() => setShowForm(true)}

      onBlur={() => setShowForm(false)}
    >
      <h2>Create a menu</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Restaurant:
          <input
            type="text"
            required
            onChange={(e) => setRestaurantName(e.target.value)}
            value={restaurantName}
          />
        </label>
        <label>
          Menu name:
          <input
            type="text"
            required
            onChange={(e) => setMenuName(e.target.value)}
            value={menuName}
          />
        </label>
        <button className={styles.btn}>Create</button>
        {response.IsPending && <p>loading...</p>}
      </form>
    </div>
  );
}

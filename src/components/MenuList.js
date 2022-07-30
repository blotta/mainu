import { useNavigate } from "react-router-dom";
import MenuForm from "./MenuForm";
import styles from "./MenuList.module.css";

export default function MenuList({ menus }) {
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    navigate(`/menu-builder/${id}`);
  };
  return (
    <>
      <div>
        {(!menus || menus.length === 0) && (
          <p className="page-title">No menus yet</p>
        )}
      </div>
      <div className={styles["menu-list"]}>
        {menus &&
          menus.length > 0 &&
          menus.map((menu) => (
            <div
              key={menu.id}
              className={styles.item}
              onClick={() => handleItemClick(menu.id)}
            >
              <p>
                {menu.name} at {menu.restaurantName}
              </p>
            </div>
          ))}
          <MenuForm className={styles.item} />
      </div>
    </>
  );
}

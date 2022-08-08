import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import MainuLogo from "./MainuLogo";

import styles from "./Navbar.module.css";
import common from "../Common.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <nav className={styles.navbar}>
      <ul>
        {user && (
          <>
            <li className={common["mainu-font"] + " " + styles.title}>
              <MainuLogo />
            </li>
            <li>
              {" "}
              <NavLink
                to="/"
                className={(state) => (state.isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li>{user.email}</li>
            <li>
              <button className="btn" onClick={() => logout()}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

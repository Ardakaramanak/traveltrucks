
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink
          to="/"
          className={styles.logo}
          aria-label="TravelTrucks home"
        >
          travel<span>trucks</span>
        </NavLink>

        <nav className={styles.navigation} aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

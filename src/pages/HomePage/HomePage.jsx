
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={styles.hero}>
      <div className={styles.container}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>

        <Link to="/catalog" className={styles.button}>
          View Now
        </Link>
      </div>
    </main>
  );
}

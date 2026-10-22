
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { toggleFavorite } from "../../redux/favoritesSlice";
import styles from "./CamperCard.module.css";

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.includes(camper.id);

  const image = camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original;

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={image}
        alt={camper.name}
      />

      <div className={styles.content}>
        <div className={styles.top}>
          <h2>{camper.name}</h2>

          <div className={styles.price}>
            <span>€{Number(camper.price).toFixed(2)}</span>

            <button
              type="button"
              className={`${styles.heart} ${isFavorite ? styles.favorite : ""}`}
              onClick={() => dispatch(toggleFavorite(camper.id))}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFavorite}
            >
              <FaHeart />
            </button>
          </div>
        </div>

        <div className={styles.meta}>
          <span>
            <FaStar className={styles.star} />
            {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>

          <span>
            <FaMapMarkerAlt />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {camper.engine && <span>{camper.engine}</span>}
          {camper.transmission && <span>{camper.transmission}</span>}
          {camper.AC && <span>AC</span>}
          {camper.kitchen && <span>Kitchen</span>}
          {camper.form && <span>{camper.form}</span>}
        </div>

        <Link to={`/catalog/${camper.id}`} className={styles.button}>
  Show more
</Link>
      </div>
    </article>
  );
}

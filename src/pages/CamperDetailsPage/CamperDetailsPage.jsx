
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCamperById } from "../../services/api";
import CamperTabs from "../../components/CamperTabs/CamperTabs";
import BookingForm from "../../components/BookingForm/BookingForm";
import styles from "./CamperDetailsPage.module.css";

export default function CamperDetailsPage() {
  const { id } = useParams();

  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadCamper = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCamperById(id);

        if (active) {
          setCamper(data);
        }
      } catch {
        if (active) {
          setError("Camper information could not be loaded.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadCamper();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <p className={styles.message}>Loading camper...</p>;
  }

  if (error) {
    return <p className={styles.message}>{error}</p>;
  }

  if (!camper) {
    return <p className={styles.message}>Camper not found.</p>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{camper.name}</h1>

      <p className={styles.meta}>
        <span className={styles.rating}>
          ★ {camper.rating} ({camper.reviews?.length ?? 0} Reviews)
        </span>
        <span>{camper.location}</span>
      </p>

      <h2 className={styles.price}>
        €{Number(camper.price).toFixed(2)}
      </h2>

      <div className={styles.gallery}>
        {camper.gallery?.map((image, index) => (
          <img
            key={index}
            src={image.original || image.thumb}
            alt={`${camper.name} ${index + 1}`}
          />
        ))}
      </div>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.detailsLayout}>
        <div className={styles.tabsColumn}>
          <CamperTabs camper={camper} />
        </div>

        <div className={styles.bookingColumn}>
          <BookingForm />
        </div>
      </div>
    </main>
  );
}


import { useState } from "react";
import styles from "./CamperTabs.module.css";

const vehicleDetails = [
  ["Form", "form"],
  ["Length", "length"],
  ["Width", "width"],
  ["Height", "height"],
  ["Tank", "tank"],
  ["Consumption", "consumption"],
];

export default function CamperTabs({ camper }) {
  const [activeTab, setActiveTab] = useState("features");

  const features = [
    camper.transmission,
    camper.AC && "AC",
    camper.engine,
    camper.kitchen && "Kitchen",
    camper.radio && "Radio",
    camper.form,
  ].filter(Boolean);

  return (
    <section className={styles.section}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={activeTab === "features" ? styles.active : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>

        <button
          type="button"
          className={activeTab === "reviews" ? styles.active : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {activeTab === "features" ? (
        <div className={styles.content}>
          <div className={styles.features}>
            {features.map((feature, index) => (
              <span key={`${feature}-${index}`} className={styles.feature}>
                {feature}
              </span>
            ))}
          </div>

          <h2 className={styles.heading}>Vehicle details</h2>

          <div className={styles.details}>
            {vehicleDetails.map(([label, key]) => (
              <div key={key} className={styles.detailRow}>
                <span>{label}</span>
                <span>{camper[key] || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.reviews}>
          {camper.reviews?.length ? (
            camper.reviews.map((review, index) => (
              <article key={index} className={styles.review}>
                <div className={styles.reviewer}>
                  <span className={styles.avatar}>
                    {review.reviewer_name?.charAt(0).toUpperCase()}
                  </span>

                  <div>
                    <h3>{review.reviewer_name}</h3>
                    <p className={styles.stars}>
                      {"★".repeat(
                        Math.max(
                          0,
                          Math.min(
                            5,
                            Math.round(Number(review.reviewer_rating) || 0)
                          )
                        )
                      )}
                    </p>
                  </div>
                </div>

                <p className={styles.comment}>{review.comment}</p>
              </article>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}
    </section>
  );
}

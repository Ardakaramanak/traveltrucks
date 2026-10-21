

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CamperCard from "../../components/CamperCard/CamperCard";
import Filters from "../../components/Filters/Filters";
import { fetchCampers } from "../../redux/campersSlice";

import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();

  const { items, total, page, loading, error } = useSelector(
    (state) => state.campers
  );

  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    const params = {};

    if (filters.location?.trim()) {
      params.location = filters.location.trim();
    }

    if (filters.form) {
      params.form = filters.form;
    }

    if (filters.engine) {
      params.engine = filters.engine;
    }

    if (filters.transmission) {
      params.transmission = filters.transmission;
    }

    dispatch(
      fetchCampers({
        page: 1,
        limit: 4,
        filters: params,
      })
    );
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    if (loading) return;

    const params = {};

    if (filters.location?.trim()) {
      params.location = filters.location.trim();
    }

    if (filters.form) {
      params.form = filters.form;
    }

    if (filters.engine) {
      params.engine = filters.engine;
    }

    if (filters.transmission) {
      params.transmission = filters.transmission;
    }

    dispatch(
      fetchCampers({
        page: page + 1,
        limit: 4,
        filters: params,
      })
    );
  };

  const hasMore = items.length < total;

  return (
    <main className={styles.container}>
      <Filters />

      <section className={styles.results} aria-label="Campers catalog">
        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className={styles.empty}>No campers found.</p>
        )}

        <div className={styles.camperList}>
          {items.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>

        {loading && (
          <p className={styles.loading}>Loading campers...</p>
        )}

        {!error && hasMore && (
          <button
            type="button"
            className={styles.loadMore}
            onClick={handleLoadMore}
            disabled={loading}
          >
            Load more
          </button>
        )}
      </section>
    </main>
  );
}

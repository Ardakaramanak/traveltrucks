
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { setFilters, clearFilters } from "../../redux/filtersSlice";
import styles from "./Filters.module.css";

const camperForms = [
  { label: "Alcove", value: "alcove" },
  { label: "Panel Van", value: "panelTruck" },
  { label: "Integrated", value: "fullyIntegrated" },
  { label: "Semi Integrated", value: "semiIntegrated" },
];

const engines = ["diesel", "petrol", "hybrid", "electric"];
const transmissions = ["automatic", "manual"];

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [draft, setDraft] = useState(filters);

  const updateDraft = (key, value) => {
    setDraft((prev) => ({
      ...prev,
      [key]: prev[key] === value && key !== "location" ? "" : value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(setFilters(draft));
  };

  const handleClear = () => {
    const empty = {
      location: "",
      form: "",
      engine: "",
      transmission: "",
    };

    setDraft(empty);
    dispatch(clearFilters());
  };

  return (
    <aside className={styles.sidebar}>
      <form onSubmit={handleSearch}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>

        <div className={styles.locationBox}>
          <FaMapMarkerAlt />
          <input
            id="location"
            type="text"
            placeholder="City"
            value={draft.location}
            onChange={(event) =>
              updateDraft("location", event.target.value)
            }
          />
        </div>

        <p className={styles.filterTitle}>Filters</p>

        <fieldset className={styles.fieldset}>
          <legend>Camper form</legend>
          <div className={styles.options}>
            {camperForms.map((item) => (
              <label key={item.value} className={styles.option}>
                <input
                  type="radio"
                  name="form"
                  value={item.value}
                  checked={draft.form === item.value}
                  onChange={() => updateDraft("form", item.value)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Engine</legend>
          <div className={styles.options}>
            {engines.map((engine) => (
              <label key={engine} className={styles.option}>
                <input
                  type="radio"
                  name="engine"
                  value={engine}
                  checked={draft.engine === engine}
                  onChange={() => updateDraft("engine", engine)}
                />
                <span>
                  {engine.charAt(0).toUpperCase() + engine.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Transmission</legend>
          <div className={styles.options}>
            {transmissions.map((transmission) => (
              <label key={transmission} className={styles.option}>
                <input
                  type="radio"
                  name="transmission"
                  value={transmission}
                  checked={draft.transmission === transmission}
                  onChange={() =>
                    updateDraft("transmission", transmission)
                  }
                />
                <span>
                  {transmission.charAt(0).toUpperCase() +
                    transmission.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button className={styles.searchButton} type="submit">
          Search
        </button>

        <button
          className={styles.clearButton}
          type="button"
          onClick={handleClear}
        >
          Clear filters
        </button>
      </form>
    </aside>
  );
}

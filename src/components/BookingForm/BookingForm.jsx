
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./BookingForm.module.css";

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Booking request:", data);
    toast.success("Demo form submitted. No booking was created.");
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you.</p>

      <div className={styles.fields}>
        <div>
          <input
            type="text"
            placeholder="Name*"
            aria-label="Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email*"
            aria-label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div>
          <input
            type="date"
            aria-label="Booking date"
            min={new Date().toISOString().split("T")[0]}
            {...register("bookingDate", {
              required: "Booking date is required",
            })}
          />
          {errors.bookingDate && (
            <span className={styles.error}>
              {errors.bookingDate.message}
            </span>
          )}
        </div>

        <textarea
          placeholder="Comment"
          aria-label="Comment"
          rows="4"
          {...register("comment")}
        />
      </div>

      <button type="submit" className={styles.submit}>
        Send
      </button>
    </form>
  );
}

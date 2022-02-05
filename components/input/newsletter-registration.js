import classes from "./newsletter-registration.module.css";
import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const userEmailRef = useRef();
  const context = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    context.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: userEmailRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        context.showNotification({
          title: "Success.",
          message: "Successfully registered for newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        context.showNotification({
          title: "Error",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={userEmailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

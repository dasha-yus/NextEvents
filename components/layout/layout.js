import MainHeader from "./main-header";
import Notification from "./../ui/notification";
import { useContext } from "react";
import NotificationContext from "../../store/notification-context";

const Layout = (props) => {
  const context = useContext(NotificationContext);

  const activeNotification = context.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;

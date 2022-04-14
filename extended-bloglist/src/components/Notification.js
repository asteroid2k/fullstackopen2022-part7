import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return (
    notification && (
      <div className="notif">
        <p>{notification}</p>
      </div>
    )
  );
};

export default Notification;

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="noti">{message}</div>;
};

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default { Notification, ErrorMessage };

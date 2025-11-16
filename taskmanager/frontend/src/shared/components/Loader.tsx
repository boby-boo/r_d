const Loader: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="loader-wrapper">
      <div>
        {message ? <p className="loader-message">{message}</p> : <div className="spinner"></div>}
      </div>
    </div>
  );
};

export default Loader;

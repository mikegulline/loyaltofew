const H1 = ({ children, className = '' }) => {
  return (
    <h1 className={`mb-8 mt-8 text-7xl font-black ${className}`}>{children}</h1>
  );
};

export default H1;

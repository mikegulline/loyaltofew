const P = ({ children, className = '' }) => {
  return <p className={`mt-8 ${className}`}>{children}</p>;
};

export default P;

const ToggleView = ({ showFirst, children }) =>
  showFirst ? children[0] : children[1];

export default ToggleView;

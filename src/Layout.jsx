import Header from "./Header";
import PropTypes from "prop-types";

export function Layout(props) {
  Layout.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

export default Layout;

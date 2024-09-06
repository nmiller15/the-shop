import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function DesktopNav({ categories }) {
  DesktopNav.propTypes = {
    categories: PropTypes.array,
  };

  return (
    <nav className="hidden lg:block">
      <ul className="mt-4 flex gap-6 text-xl">
        {categories?.map((category, index) => {
          return (
            <div key={index}>
              <Link to={category.href}>
                <li className="hover:cursor-pointer">{category.value}</li>
              </Link>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function MobileNav({ setMenuOpen, categories }) {
  MobileNav.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    setMenuOpen: PropTypes.func,
  };

  return (
    <div className="absolute right-0 top-0 z-50 h-screen w-[390px] bg-blue-800">
      <i
        className="iconoir-xmark absolute right-4 top-4 text-4xl text-white hover:cursor-pointer md:text-5xl"
        onClick={() => setMenuOpen(false)}
      ></i>
      <nav>
        <ul className="mt-24">
          {categories?.map((category, index) => {
            return (
              <div key={index}>
                <li className="my-6 w-full pr-6 text-right text-3xl font-semibold text-white hover:cursor-pointer">
                  <Link to={category.href} onClick={() => setMenuOpen(false)}>
                    {category.value}
                  </Link>
                </li>
              </div>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

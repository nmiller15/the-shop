import PropTypes from "prop-types";

export function DesktopNav({ categories }) {
  DesktopNav.propTypes = {
    categories: PropTypes.array,
  };

  return (
    <nav className="hidden lg:block">
      <ul className="mt-4 flex gap-6 text-xl">
        {categories?.map((category, index) => {
          return (
            <li className="hover:cursor-pointer" key={index}>
              {category.value}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

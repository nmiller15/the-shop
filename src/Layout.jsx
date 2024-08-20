import React, { useState, useEffect } from "react";

export function Layout() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  // Categories will also need a login option
  // --- then the categories also need mapped to a link

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      // .then((json) => console.log(json));
      .then((json) => {
        const categories = json.map((item) => {
          return {
            value: item,
            href: `/${item.replaceAll(" ", "")}`,
          };
        });
        setCategories([
          ...categories,
          {
            value: "login",
            href: "/login",
          },
        ]);
      });
  }, []);

  return (
    <>
      {/* Header section with conditional rendering for mobile displays */}
      <div className="mx-6 flex justify-between py-5">
        <div className="flex gap-2 text-3xl md:text-4xl">
          <i className="iconoir-shop pt-[2px]"></i>
          <p>the shop</p>
        </div>
        <div>
          <i
            className="iconoir-menu mt-[2px] text-3xl hover:cursor-pointer md:text-4xl lg:hidden"
            onClick={() => setMenuOpen(true)}
          ></i>
        </div>
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
      </div>
      {menuOpen ? (
        <div className="absolute right-0 top-0 h-screen w-[390px] bg-blue-800">
          <i
            className="iconoir-xmark absolute right-4 top-4 text-4xl text-white hover:cursor-pointer md:text-5xl"
            onClick={() => setMenuOpen(false)}
          ></i>
          <nav>
            <ul className="mt-24">
              {categories?.map((category, index) => {
                return (
                  <li
                    className="my-6 w-full pr-6 text-right text-3xl font-semibold text-white hover:cursor-pointer"
                    key={index}
                  >
                    {category.value}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Layout;

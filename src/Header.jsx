import { useState, useEffect } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

function Header() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <DesktopNav categories={categories} />
      </div>
      {menuOpen ? (
        <MobileNav setMenuOpen={setMenuOpen} categories={categories} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;

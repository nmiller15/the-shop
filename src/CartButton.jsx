function CartButton() {
  return (
    <>
      {/* TODO: Once login functionality and cart functionality are added, the length of the cart will need added here */}
      <div className="fixed bottom-3 right-3 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 transition-all duration-150 hover:scale-105 hover:cursor-pointer lg:h-20 lg:w-20">
        <div className="fixed flex h-6 w-6 -translate-x-6 -translate-y-6 items-center justify-center rounded-full bg-red-500 lg:h-8 lg:w-8 lg:-translate-x-8 lg:-translate-y-8">
          <p className="pr-[1px] tabular-nums text-white">1</p>
        </div>
        <i className="iconoir-cart text-2xl text-white lg:text-3xl"></i>
      </div>
    </>
  );
}

export default CartButton;

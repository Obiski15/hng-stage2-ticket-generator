import Logo from "./Logo";

function Header() {
  return (
    <header className="w-full flex justify-between items-center py-3 px-4 border-border-primary border-[1px] rounded-2xl">
      <Logo />

      <div className="hidden text-lg sm:flex sm:justify-between sm:items-center sm:gap-4">
        <p className="cursor-pointer p-[10px]">Events</p>
        <p className="cursor-pointer hover:text-foreground p-[10px] text-[#B3B3B3]">
          My Ticket
        </p>
        <p className="cursor-pointer hover:text-foreground p-[10px] text-[#B3B3B3]">
          About
        </p>
      </div>

      <button className="px-4 py-3 flex justify-between items-center gap-2 text-lg leading-5 bg-secondary text-[#0A0C11] rounded-xl border-[#D5EA00] border-[1px] hover:bg-secondary/90">
        <span className="uppercase">my tickets</span>
        <img src="/icons/arrow-right.svg" alt="logo" width={16} height={16} />
      </button>
    </header>
  );
}

export default Header;

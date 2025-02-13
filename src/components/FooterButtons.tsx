interface PropOptions {
  text: string;
  disabled?: boolean;
  action?: () => void;
  type?: "button" | "submit" | "reset";
}

interface Properties {
  secondary: PropOptions;
  primary: PropOptions;
}

function FooterButtons({ primary, secondary }: Properties) {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-between sm:flex-row sm:justify-center sm:rounded-3xl sm:bg-[#041E23] sm:px-12">
      <button
        onClick={() => secondary.action?.()}
        type={secondary.type ?? "button"}
        className="w-full px-6 py-3 bg-[#041E23] text-border-primary border-[#24A0B5] border-[1px] rounded-lg hover:text-[#24A0B5]"
        disabled={secondary.disabled}
      >
        {secondary.text}
      </button>
      <button
        onClick={() => primary.action?.()}
        type={primary.type ?? "button"}
        className="w-full bg-[#24A0B5] px-6 py-3 rounded-lg hover:bg-[#24A0B5]/80"
        disabled={primary.disabled}
      >
        {primary.text}
      </button>
    </div>
  );
}

export default FooterButtons;

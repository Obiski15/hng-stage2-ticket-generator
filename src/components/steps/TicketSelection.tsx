import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { NUM_TICKET_STORAGE_KEY } from "../../lib/constants";
import { StepProperties } from "../../types";

import FooterButtons from "../FooterButtons";

interface IForm {
  numTickets: {
    label: "1" | "2" | "3" | "4" | "5";
    value: 1 | 2 | 3 | 4 | 5;
  };
}

const availableTickets: {
  ticketType: "regular" | "vip" | "vvip";
  price: string | number;
  remains: number;
  name: string;
}[] = [
  {
    name: "regular access",
    ticketType: "regular",
    price: "free",
    remains: 100,
  },
  {
    name: "vip access",
    ticketType: "vip",
    price: 50,
    remains: 200,
  },
  {
    name: "vvip access",
    ticketType: "vvip",
    price: 150,
    remains: 190,
  },
];

const options: { value: number; label: string }[] = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

function TicketSelection({ setTicketState, ticketState }: StepProperties) {
  const { value: numTickets, setValue: setNumTickets } = useLocalStorage<
    1 | 2 | 3 | 4 | 5
  >(NUM_TICKET_STORAGE_KEY, 1);

  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: {
      numTickets: {
        label: `${numTickets}`,
        value: numTickets,
      },
    },
  });

  const onSubmit: SubmitHandler<IForm> = (val) => {
    setNumTickets(val.numTickets.value);
    setTimeout(() => {
      setTicketState((prevState) => {
        return { ...prevState, step: 2 };
      });
    }, 200);
  };

  return (
    <form
      className="w-full flex flex-col justify-start items-start gap-8 border-border-primary border-[1px] rounded-[32px] p-6 animate-in-view"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full bg-hero py-4 px-6 rounded-3xl border-border border-2 border-t-0 backdrop-blur-[14px] flex flex-col justify-start items-center gap-3 text-center sm:py-6">
        <div className="flex flex-col justify-start items-center gap-2">
          <h1 className="text-[48px] leading-[48px] road-rage sm:text-[62px] sm:leading-[62px]">
            Techember Fest ”25
          </h1>
          <p className="text-sm sm:text-base">
            Join us for an unforgettable experience at [Event Name]! Secure your
            spot now.
          </p>
        </div>

        <div className="text-base flex flex-col gap-1 justify-start items-center sm:flex-row sm:gap-4">
          <p>📍 [Event Location]</p>
          <p className="hidden sm:block">||</p>
          <p>March 15, 2025 | 7:00 PM</p>
        </div>
      </div>

      <div className="w-full h-1 bg-[#07373F]"></div>

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <p className="text-base">Select Ticket Type:</p>
        <div className="w-full p-4 rounded-3xl border-border border-[1px]">
          <div className="w-full flex flex-col justify-between items-center gap-6 p-4 sm:flex-row bg-[#052228]">
            {availableTickets.map((ticket, i) => (
              <div
                key={i + 1}
                className={`${
                  ticketState?.ticketType === ticket.ticketType
                    ? "bg-border-primary"
                    : ""
                } ${
                  !(ticketState?.ticketType === ticket.ticketType)
                    ? "hover:bg-border-primary/20"
                    : ""
                } w-full flex justify-between items-center gap-2 p-2 rounded-xl border-border border-[1px] cursor-pointer sm:max-w-[158px]`}
                onClick={() =>
                  setTicketState((prevState) => {
                    return { ...prevState, ticketType: ticket.ticketType };
                  })
                }
              >
                <div className="flex flex-col justify-start items-start gap-3">
                  <p className="text-xl font-semibold capitalize">
                    {typeof ticket.price === "number"
                      ? `$${ticket.price}`
                      : ticket.price}
                  </p>
                  <div className="flex flex-col justify-start items-start gap-1">
                    <p className="uppercase text-base">{ticket.name}</p>
                    <p className="text-sm text-[#D9D9D9]">
                      {ticket.remains}/52
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <p className="text-base">Number of Tickets</p>

        <Controller
          control={control}
          name="numTickets"
          render={({ field }) => (
            <Select<{ value: number; label: string }>
              {...field}
              options={options}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#24A0B5",
                  primary: "#24A0B5",
                  neutral30: "#0E464F",
                  neutral80: "var(--foreground)",
                  neutral0: "#07373F",
                },
              })}
              styles={{
                control: (baseColors) => ({
                  ...baseColors,
                  color: "var(--foreground)",
                  borderColor: "#07373F",
                  backgroundColor: "#08252B",
                }),
              }}
            />
          )}
        />
      </div>

      <FooterButtons
        primary={{
          text: "Next",
          action: () => {
            setTicketState((prevInfo) => {
              return { ...prevInfo, step: 2 };
            });
          },
        }}
        secondary={{ text: "Cancel", action: () => {} }}
      />
    </form>
  );
}

export default TicketSelection;

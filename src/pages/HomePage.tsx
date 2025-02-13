import { useSessionStorage } from "../hooks/useSessionStorage";

import { DEFAULT_TICKET_STATE } from "../lib/constants";

import AttendeeInformation from "../components/steps/AttendeeInformation";
import TicketSelection from "../components/steps/TicketSelection";
import SectionTitle from "../components/SectionTitle";
import Ticket from "../components/steps/Ticket";
import Header from "../components/Header";

import { ITicketState } from "../types";

const TICKET_STATE_SESSION_KEY: string = "TICKETING";

function HomePage() {
  const { value: ticketState, setValue: setTicketState } =
    useSessionStorage<ITicketState>(
      TICKET_STATE_SESSION_KEY,
      DEFAULT_TICKET_STATE
    );

  return (
    <div className="px-5 pt-3 pb-5">
      <Header />

      <main className="max-w-[700px] mx-auto">
        <div className="p-5 mt-5 flex flex-col justify-start items-start gap-8 border-border rounded-2xl bg-[#08252B] sm:p-12">
          <SectionTitle step={ticketState.step} />

          <div className="w-full max-w-[calc(700px-96px)]">
            {ticketState.step === 1 ? (
              <TicketSelection
                setTicketState={setTicketState}
                ticketState={ticketState}
              />
            ) : ticketState.step === 2 ? (
              <AttendeeInformation setTicketState={setTicketState} />
            ) : (
              <Ticket setTicketState={setTicketState} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

import { forwardRef } from "react";

import { useSessionStorage } from "../hooks/useSessionStorage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IForm, ITicketState } from "../types";
import {
  ATTENDEE_STORAGE_KEY,
  DEFAULT_ATTENDEE_INFO,
  DEFAULT_TICKET_STATE,
  TICKET_STATE_SESSION_KEY,
} from "../lib/constants";

const TicketTemplate = forwardRef<HTMLDivElement>((_, ref) => {
  const { value: storedInfo } = useLocalStorage<IForm>(
    ATTENDEE_STORAGE_KEY,
    DEFAULT_ATTENDEE_INFO
  );
  const { value: ticketState } = useSessionStorage<ITicketState>(
    TICKET_STATE_SESSION_KEY,
    DEFAULT_TICKET_STATE
  );

  return (
    <div className="relative mx-auto5 self-center" ref={ref}>
      <img src="/icons/ticket.svg" />
      <div className="absolute top-[20px] bottom-[20px] left-[20px] right-[20px]">
        <div className="flex flex-col justify-center items-center gap-5 text-center flex-shrink-0 border-[#24A0B5] border-[1px] rounded-2xl px-[14px] py-2">
          <div className="flex flex-col justify-center items-center">
            <h1 className="road-rage text-[34px] text-secondary">
              Techember Fest ”25
            </h1>
            <div className="flex flex-col justify-center items-center p-1 g-1 text-[10px]">
              <p>📍 04 Rumens road, Ikoyi, Lagos</p>
              <p>📅 March 15, 2025 | 7:00 PM</p>
            </div>
          </div>

          <div>
            <img
              src={`${storedInfo.image}?crossorigin=anonymous`}
              crossOrigin="anonymous"
              alt="attendee-image"
              className="block w-[140px] h-[140px] object-cover object-center border-4 border-[#24A0B5] rounded-xl"
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start p-1 bg-[#08343C] rounded-lg border-[1px] border-[#08343C]">
            <div className="w-full flex flex-col justify-start items-start p-1 rounded-lg overflow-hidden">
              <div className="w-full border-b-2 border-border">
                <div className="w-full flex justify-between items-start border-collapse">
                  <div className="w-[50%] flex flex-col justify-start items-start border-r-[1px] border-border p-1 overflow-hidden">
                    <p className="text-[10px] text-[#467FA2]">Name</p>
                    <p className="font-bold text-[12px] text-secondary max-w-[100px] text-nowrap">
                      {storedInfo.name}
                    </p>
                  </div>

                  <div className="w-[50%] flex flex-col justify-start items-start border-l-[1px] border-border p-1 overflow-hidden">
                    <p className="text-[10px] text-[#467FA2]">Email address</p>
                    <p className="font-bold text-[12px] text-secondary max-w-[100px] text-nowrap">
                      {storedInfo.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full border-b-2 border-border">
                <div className="w-full flex justify-between items-start border-collapse">
                  <div className="w-[50%] flex flex-col justify-start items-start border-r-[1px] border-border p-1">
                    <p className="text-[10px] text-[#467FA2]">Ticket Type:</p>
                    <p className="font-bold text-[12px] text-secondary uppercase">
                      {ticketState.ticketType}
                    </p>
                  </div>
                  <div className="w-[50%] flex flex-col justify-start items-start border-l-[1px] border-border p-1">
                    <p className="text-[10px] text-[#467FA2]">Ticket for:</p>
                    <p className="font-bold text-[12px] text-secondary">1</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-1 text-left p-2">
              <h3 className="text-[#467FA2] text-[10px]">Special request?</h3>
              <p className="text-[10px]">
                {!storedInfo.about ? "-" : storedInfo.about}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full absolute bottom-0 mt-5">
          <img
            src="/images/barcode.png"
            alt="barcode"
            className="block mx-auto object-cover object-center sm:hidden w-[112px] h-[68px]"
          />
          <img
            src="/images/barcode-large.png"
            alt="barcode"
            className="hidden mx-auto object-cover object-center sm:block w-[236px] h-[68px]"
          />
        </div>
      </div>
    </div>
  );
});

export default TicketTemplate;

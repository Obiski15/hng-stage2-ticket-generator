import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

import TicketTemplate from "../TicketTemplate";
import FooterButtons from "../FooterButtons";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { StepProperties, IForm } from "../../types";
import {
  ATTENDEE_STORAGE_KEY,
  DEFAULT_ATTENDEE_INFO,
} from "../../lib/constants";

function Ticket({ setTicketState }: StepProperties) {
  const [downloadError, setDownloadError] = useState<boolean>(false);
  const [isDowloading, setIsDownloading] = useState<boolean>(false);
  const { value: storedInfo } = useLocalStorage<IForm>(
    ATTENDEE_STORAGE_KEY,
    DEFAULT_ATTENDEE_INFO
  );
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    try {
      if (ticketRef.current) {
        setIsDownloading(true);
        setDownloadError(false);

        const canvas = await html2canvas(ticketRef.current, {
          backgroundColor: "transparent",
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
        });
        const image = canvas.toDataURL("image/png");

        // Create download link
        const link = document.createElement("a");
        link.href = image;
        link.download = "ticket.png";
        link.click();
      }
    } catch (error) {
      console.log(error);
      setDownloadError(true);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (
      !storedInfo.image &&
      !storedInfo.name &&
      !storedInfo.email &&
      !storedInfo.about
    ) {
      setTicketState((prevInfo) => {
        return { ...prevInfo, step: 1 };
      });
    }
  }, [storedInfo, setTicketState]);

  if (
    !storedInfo.image &&
    !storedInfo.name &&
    !storedInfo.email &&
    !storedInfo.about
  )
    return null;

  return (
    <div className="w-full flex flex-col justify-start items-start gap-8 border-border rounded-2xl bg-[#08252B] animate-in-view">
      <div className="w-full flex flex-col justify-center items-center gap-4 text-center">
        <h3 className="text-[32px] leading-[41px]">Your Ticket is Booked</h3>
        <p>You can download or Check your email for a copy</p>
      </div>

      <TicketTemplate ref={ticketRef} />

      <FooterButtons
        primary={{
          disabled: isDowloading,
          text: isDowloading
            ? "Preparing Ticket..."
            : downloadError
            ? "Something went wrong"
            : "Download Ticket",
          action: handleDownload,
        }}
        secondary={{
          text: "Book Another Ticket",
          action: () => {
            localStorage.clear();
            setTicketState((prevInfo) => {
              return { ...prevInfo, step: 1, ticketType: "regular" };
            });
          },
        }}
      />
    </div>
  );
}

export default Ticket;

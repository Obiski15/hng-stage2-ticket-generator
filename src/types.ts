import { Dispatch, SetStateAction } from "react";

export interface ITicketState {
  ticketType: "regular" | "vip" | "vvip";
  step: 1 | 2 | 3;
}

export interface StepProperties {
  setTicketState: Dispatch<SetStateAction<ITicketState>>;
  ticketState?: ITicketState;
}

export interface IForm {
  about?: string;
  image: string;
  name?: string;
  email: string;
}

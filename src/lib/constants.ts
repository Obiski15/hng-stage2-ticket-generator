import { IForm, ITicketState } from "../types";

// storage keys
export const TICKET_STATE_SESSION_KEY: string = "TICKETING";
export const NUM_TICKET_STORAGE_KEY: string = "NUM_TICKET";
export const ATTENDEE_STORAGE_KEY = "attendee_info";

// default values
export const DEFAULT_ATTENDEE_INFO: IForm = {
  name: "",
  email: "",
  about: "",
  image: "",
};
export const DEFAULT_TICKET_STATE: ITicketState = {
  step: 1,
  ticketType: "regular",
};

import { useMutation } from "@tanstack/react-query";
import { sendContactMessage, type ContactMessageInput } from "../lib/api";

/** `POST /contact-messages` — submit a contact form message. */
export function useSendContactMessage() {
  return useMutation<void, Error, ContactMessageInput>({
    mutationFn: (payload) => sendContactMessage(payload),
  });
}

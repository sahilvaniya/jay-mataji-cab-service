import { WhatsAppIcon } from "./Icons";
import { whatsappLink } from "@/lib/data";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Namaste Maheshbhai, I want to book a taxi.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mahesh on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_14px_30px_-10px_rgba(18,140,70,0.6)] transition-all duration-300 hover:-translate-y-1 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-display text-[14px] font-bold transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-2 sm:block">
        Chat with Mahesh
      </span>
    </a>
  );
}

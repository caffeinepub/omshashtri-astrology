import { Star } from "lucide-react";

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
    role="img"
    aria-label="WhatsApp"
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.855L.057 23.885a.75.75 0 0 0 .921.921l6.03-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.502-5.176-1.381l-.371-.215-3.844.934.951-3.844-.229-.381A9.953 9.953 0 0 1 2 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z" />
  </svg>
);

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  const numbers = [
    { display: "8777019632", wa: "918777019632" },
    { display: "8828060562", wa: "918828060562" },
  ];

  const makeLink = (wa: string) =>
    `https://wa.me/${wa}?text=${encodeURIComponent("Hello! I would like to consult about astrology.")}`;

  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        {/* Consultation charges banner */}
        <div className="rounded-xl bg-primary/10 border border-primary/30 px-6 py-3 text-center">
          <p className="text-sm font-semibold text-primary tracking-wide">
            Consultation Charges:{" "}
            <span className="text-foreground">&#8377;499 / 30 mins</span>
          </p>
        </div>

        {/* WhatsApp buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {numbers.map((n, i) => (
            <a
              key={n.wa}
              href={makeLink(n.wa)}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`contact.whatsapp_button.${i + 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold transition-colors"
            >
              <WhatsAppIcon />
              {n.display}
            </a>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary fill-current" />
            <span className="font-display font-bold text-primary tracking-wide text-sm">
              AstroAvi
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {year} &middot;{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

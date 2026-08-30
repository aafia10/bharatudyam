import { Logo } from "./Logo";

const columns = [
  { title: "Company", links: ["About", "Contact", "Careers"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
];

const socials = ["T", "L", "F"];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-navbar/70">
      <div className="bg-gradient-gold absolute inset-x-0 top-0 h-px opacity-50" />
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-4">
              <Logo size={48} />
              <span className="text-gradient-gold text-2xl font-bold">Bharat Udyam</span>
            </div>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              For the Businesses That Build Bharat.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold text-foreground">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[15px] text-muted-foreground transition-colors duration-300 hover:text-gold"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <div className="mt-5 flex gap-4">
              {socials.map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex size-11 items-center justify-center rounded-full bg-surface-2 text-[15px] font-medium text-muted-foreground transition-all duration-300 hover:bg-gradient-gold hover:text-primary-foreground"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8 text-center text-[15px] text-muted-foreground">
          © 2026 Bharat Udyam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

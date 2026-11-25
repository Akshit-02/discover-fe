import { ReactNode } from "react";

const SettingsSection = ({
  id,
  icon,
  title,
  description,
  children,
}: {
  id?: string;
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="grid scroll-mt-28 gap-6 rounded-3xl border border-sand-200/80 bg-white p-6 shadow-soft lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 lg:p-8"
  >
    <div>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-coral-50 text-coral">{icon}</span>
      <h2 className="mt-4 text-[17px] font-bold tracking-tight text-charcoal">{title}</h2>
      <p className="mt-1 text-[13.5px] leading-relaxed text-charcoal-400">{description}</p>
    </div>
    <div className="min-w-0">{children}</div>
  </section>
);

export default SettingsSection;

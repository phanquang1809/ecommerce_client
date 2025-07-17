import { ReactNode } from "react";

const Badge = ({ color, children }: { color: string; children: ReactNode }) => {
    const colorVariants: Record<string, string> = {
        slate: "bg-slate-400/20 text-slate-700 hover:bg-slate-400/30 dark:bg-slate-400/10 dark:text-slate-300 dark:hover:bg-slate-400/15",
        gray: "bg-gray-400/20 text-gray-700 hover:bg-gray-400/30 dark:bg-gray-400/10 dark:text-gray-300 dark:hover:bg-gray-400/15",
        zinc: "bg-zinc-400/20 text-zinc-700 hover:bg-zinc-400/30 dark:bg-zinc-400/10 dark:text-zinc-300 dark:hover:bg-zinc-400/15",
        neutral: "bg-neutral-400/20 text-neutral-700 hover:bg-neutral-400/30 dark:bg-neutral-400/10 dark:text-neutral-300 dark:hover:bg-neutral-400/15",
        stone: "bg-stone-400/20 text-stone-700 hover:bg-stone-400/30 dark:bg-stone-400/10 dark:text-stone-300 dark:hover:bg-stone-400/15",
        red: "bg-red-400/20 text-red-700 hover:bg-red-400/30 dark:bg-red-400/10 dark:text-red-300 dark:hover:bg-red-400/15",
        orange: "bg-orange-400/20 text-orange-700 hover:bg-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300 dark:hover:bg-orange-400/15",
        amber: "bg-amber-400/20 text-amber-700 hover:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300 dark:hover:bg-amber-400/15",
        yellow: "bg-yellow-400/20 text-yellow-700 hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:hover:bg-yellow-400/15",
        lime: "bg-lime-400/20 text-lime-700 hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:hover:bg-lime-400/15",
        green: "bg-green-400/20 text-green-700 hover:bg-green-400/30 dark:bg-green-400/10 dark:text-green-300 dark:hover:bg-green-400/15",
        emerald: "bg-emerald-400/20 text-emerald-700 hover:bg-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/15",
        teal: "bg-teal-400/20 text-teal-700 hover:bg-teal-400/30 dark:bg-teal-400/10 dark:text-teal-300 dark:hover:bg-teal-400/15",
        cyan: "bg-cyan-400/20 text-cyan-700 hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/15",
        sky: "bg-sky-400/20 text-sky-700 hover:bg-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300 dark:hover:bg-sky-400/15",
        blue: "bg-blue-400/20 text-blue-700 hover:bg-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:bg-blue-400/15",
        indigo: "bg-indigo-400/20 text-indigo-700 hover:bg-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300 dark:hover:bg-indigo-400/15",
        violet: "bg-violet-400/20 text-violet-700 hover:bg-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300 dark:hover:bg-violet-400/15",
        purple: "bg-purple-400/20 text-purple-700 hover:bg-purple-400/30 dark:bg-purple-400/10 dark:text-purple-300 dark:hover:bg-purple-400/15",
        fuchsia: "bg-fuchsia-400/20 text-fuchsia-700 hover:bg-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-300 dark:hover:bg-fuchsia-400/15",
        pink: "bg-pink-400/20 text-pink-700 hover:bg-pink-400/30 dark:bg-pink-400/10 dark:text-pink-300 dark:hover:bg-pink-400/15",
        rose: "bg-rose-400/20 text-rose-700 hover:bg-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300 dark:hover:bg-rose-400/15",
      };
  return (
    <span
      className={`inline-flex w-fit items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline ${colorVariants[color]||colorVariants["blue"]}`}
    >
      {children}
    </span>
  );
};

export default Badge;

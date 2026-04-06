export const C = {
  bg: "#F5F6FA", card: "#FFF", navy: "#0B1D3A", navyM: "#132D52",
  gold: "#F5A623", goldL: "rgba(245,166,35,0.1)",
  blue: "#1A56DB", blueD: "#1444B0", blueL: "rgba(26,86,219,0.08)", blueM: "rgba(26,86,219,0.15)",
  green: "#059669", greenL: "rgba(5,150,105,0.08)",
  red: "#DC2626", redL: "rgba(220,38,38,0.08)",
  orange: "#D97706", orangeL: "rgba(217,119,6,0.08)",
  purple: "#7C3AED", purpleL: "rgba(124,58,237,0.08)",
  kolo: "#6366F1", koloL: "rgba(99,102,241,0.08)",
  t0: "#0F172A", t1: "#1E293B", t2: "#64748B", t3: "#94A3B8", t4: "#CBD5E1",
  brd: "#E2E8F0", brdL: "#EEF2F6",
  sh: "0 2px 12px rgba(0,0,0,0.05)", shM: "0 4px 24px rgba(0,0,0,0.08)"
};

export const fm = n => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || "0";

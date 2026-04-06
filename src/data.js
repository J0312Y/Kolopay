import { C } from "./theme";

export const MEM = [
  { id: 1, n: "Joeldy T.", i: "JT", p: "+242 06 466 3469", ok: true, t: 1, pen: 0 },
  { id: 2, n: "Grace M.", i: "GM", p: "+242 05 512 8834", ok: true, t: 2, pen: 0 },
  { id: 3, n: "Patrick K.", i: "PK", p: "+242 06 891 2245", ok: false, t: 3, pen: 1250 },
  { id: 4, n: "Merveille N.", i: "MN", p: "+242 05 334 7712", ok: true, t: 4, pen: 0 },
  { id: 5, n: "Blessing O.", i: "BO", p: "+242 06 223 5501", ok: false, t: 5, pen: 1250 },
  { id: 6, n: "Divine L.", i: "DL", p: "+242 05 667 9983", ok: true, t: 6, pen: 0 },
];

export const CIR = [
  { id: 1, name: "Cercle Élite", mem: 6, amt: 25000, freq: "Mensuel", tot: 150000, prog: 67, turn: "Joeldy T.", next: "01 Mai 2026", code: "ELITE2026", pen: 5, created: "15 Jan 2026", admin: true },
  { id: 2, name: "Cercle Amis", mem: 8, amt: 10000, freq: "Bi-mensuel", tot: 80000, prog: 45, turn: "Grace M.", next: "15 Avr 2026", code: "AMIS2026", pen: 5, created: "01 Fév 2026", admin: false },
  { id: 3, name: "Cercle Business", mem: 10, amt: 50000, freq: "Mensuel", tot: 500000, prog: 30, turn: "Patrick K.", next: "01 Mai 2026", code: "BIZ2026", pen: 10, created: "01 Mar 2026", admin: true },
];

export const TXS = [
  { id: 1, t: "in", n: "Grace M.", d: "Cotisation reçue", a: 25000, dt: "Aujourd'hui", tm: "14:32", circle: "Cercle Élite", ref: "LK-TX-0891" },
  { id: 2, t: "in", n: "Divine L.", d: "Cotisation reçue", a: 25000, dt: "Aujourd'hui", tm: "13:10", circle: "Cercle Élite", ref: "LK-TX-0890" },
  { id: 3, t: "out", n: "Cercle Élite", d: "Versement cotisation", a: 25000, dt: "Hier", tm: "09:15", circle: "Cercle Élite", ref: "LK-TX-0889" },
  { id: 4, t: "in", n: "Merveille N.", d: "Cotisation reçue", a: 25000, dt: "Hier", tm: "08:42", circle: "Cercle Élite", ref: "LK-TX-0888" },
  { id: 5, t: "out", n: "Kolo Pay", d: "Retrait vers MTN", a: 50000, dt: "03 Avr", tm: "16:20", circle: "", ref: "LK-TX-0880" },
  { id: 6, t: "in", n: "Cercle Amis", d: "Gain tontine", a: 80000, dt: "01 Avr", tm: "10:00", circle: "Cercle Amis", ref: "LK-TX-0870" },
];

export const WALLETS = [
  { id: 0, n: "Kolo Pay", num: "Wallet interne", bal: 95000, logo: "kolo", col: C.kolo, desc: "Votre portefeuille Likelemba" },
  { id: 1, n: "MTN Mobile Money", num: "••• 3469", bal: 175000, logo: "mtn", col: "#FFCC00", desc: "" },
  { id: 2, n: "Airtel Money", num: "••• 8834", bal: 62000, logo: "airtel", col: "#ED1C24", desc: "" },
];

export const NOTIFS = [
  { id: 1, tp: "warn", tt: "Rappel cotisation", ds: "Cotisation Cercle Élite due dans 3 jours", tm: "Il y a 2h", rd: false },
  { id: 2, tp: "in", tt: "Cotisation reçue", ds: "Grace M. a versé 25 000 FCFA", tm: "Il y a 5h", rd: false },
  { id: 3, tp: "pen", tt: "Pénalité appliquée", ds: "Patrick K. pénalisé de 1 250 FCFA", tm: "Il y a 8h", rd: false },
  { id: 4, tp: "gift", tt: "Votre tour approche !", ds: "Cagnotte Cercle Amis le 15 Avr", tm: "Hier", rd: true },
  { id: 5, tp: "add", tt: "Nouveau membre", ds: "Blessing O. a rejoint Cercle Élite", tm: "Il y a 2j", rd: true },
];

export const RCPT = [
  { id: 1, c: "Cercle Élite", a: 25000, s: "paid", d: "05 Avr 2026", r: "LK-0412" },
  { id: 2, c: "Cercle Amis", a: 10000, s: "paid", d: "01 Avr 2026", r: "LK-0398" },
  { id: 3, c: "Cercle Business", a: 50000, s: "pending", d: "01 Mai 2026", r: "LK-0425" },
];

export const MSGS = [
  { id: 1, from: "Grace M.", ini: "GM", msg: "Salut tout le monde! N'oubliez pas la cotisation", time: "14:30", me: false },
  { id: 2, from: "Joeldy T.", ini: "JT", msg: "Merci Grace! J'ai déjà cotisé.", time: "14:32", me: true },
  { id: 3, from: "Divine L.", ini: "DL", msg: "Moi aussi c'est fait", time: "14:35", me: false },
  { id: 4, from: "Grace M.", ini: "GM", msg: "Super! Il reste Patrick et Blessing", time: "14:36", me: false },
  { id: 5, from: "Joeldy T.", ini: "JT", msg: "Je vais leur envoyer un rappel", time: "14:38", me: true },
];

export const FAQS = [
  { q: "Comment créer un cercle ?", a: "Allez dans Cercles > Créer un cercle. Définissez le nom, montant, fréquence et invitez vos membres." },
  { q: "Qu'est-ce que Kolo Pay ?", a: "Kolo Pay est votre portefeuille interne Likelemba. Vos gains y sont déposés. Vous pouvez retirer vers MTN ou Airtel." },
  { q: "Comment fonctionne la pénalité ?", a: "Si un membre ne cotise pas à temps, une pénalité de 5-10% est automatiquement appliquée." },
];

export const SAV = [
  { id: 1, n: "Terrain Brazzaville", tg: 2000000, sv: 850000, cl: C.blue },
  { id: 2, n: "MacBook Pro", tg: 800000, sv: 320000, cl: C.purple },
  { id: 3, n: "Fonds d'urgence", tg: 500000, sv: 500000, cl: C.green },
];

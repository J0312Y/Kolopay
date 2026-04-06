import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   LIKELEMBA — Super-App Tontine Digitale du Congo
   70+ écrans · Kolo Pay · Gamification
   Lamuka Tech · Brazzaville · 2026
   ═══════════════════════════════════════════════════ */

const C={bg:"#F5F6FA",card:"#FFF",navy:"#0B1D3A",navyM:"#132D52",gold:"#F5A623",goldL:"rgba(245,166,35,0.1)",blue:"#1A56DB",blueD:"#1444B0",blueL:"rgba(26,86,219,0.08)",blueM:"rgba(26,86,219,0.15)",green:"#059669",greenL:"rgba(5,150,105,0.08)",red:"#DC2626",redL:"rgba(220,38,38,0.08)",orange:"#D97706",orangeL:"rgba(217,119,6,0.08)",purple:"#7C3AED",purpleL:"rgba(124,58,237,0.08)",kolo:"#6366F1",koloL:"rgba(99,102,241,0.08)",t0:"#0F172A",t1:"#1E293B",t2:"#64748B",t3:"#94A3B8",t4:"#CBD5E1",brd:"#E2E8F0",brdL:"#EEF2F6",sh:"0 2px 12px rgba(0,0,0,0.05)",shM:"0 4px 24px rgba(0,0,0,0.08)"};
const fm=n=>n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")||"0";
const css=`*::-webkit-scrollbar{display:none!important}*{-ms-overflow-style:none!important;scrollbar-width:none!important}input,textarea,select{font-family:inherit}.lk-out{display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',sans-serif;background:${C.bg};padding:0}.lk-frame{width:100%;height:100vh;height:100dvh;position:relative;overflow:hidden;background:${C.bg}}.lk-sb{display:none!important}@media(min-width:900px){.lk-out{background:#E8ECF0;padding:20px}.lk-frame{width:390px;height:844px;border-radius:44px;box-shadow:0 0 0 2px #D1D5DB,0 0 0 4px #B8BFC7,0 25px 80px rgba(0,0,0,0.2)}.lk-sb{display:flex!important}}`;

const Z={
back:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
fwd:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
home:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
grp:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
wal:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
usr:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
up:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
dn:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>,
plus:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
qr:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><path d="M20 14v3h-3M20 20h-3"/></svg>,
bell:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
gear:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
ok:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
okW:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
okBig:<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
eye:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
eyeX:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
srch:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
phone:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.7 2.34a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0122 16.92z"/></svg>,
lock:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
shield:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
globe:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
help:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
cal:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
clk:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
gift:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>,
doc:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
tgt:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
msg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
send:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
link:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
star:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
cam:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
copy:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
warn:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
fire:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2"><path d="M12 22c-4.97 0-9-2.69-9-6s2.69-6 6-9c0 4 2 6 4 7 2-1 4-3 4-7 3.31 3 6 5.69 6 9s-4.03 6-9 6z"/></svg>,
book:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
heart:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
moon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
sun:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
};

const SvgIc=({type,size=24})=>{const s=size;const ic={
kolo:<svg width={s} height={s} viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" fill={C.kolo}/></svg>,
mtn:<svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#FFCC00"/><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#000">M</text></svg>,
airtel:<svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ED1C24"/><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">A</text></svg>,
market:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
cardIc:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
bag:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
trophy:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2"><path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2"/><rect x="6" y="2" width="12" height="8" rx="2"/><path d="M4 22h16M10 22V10M14 22V10"/></svg>,
};return ic[type]||null;};

// ── DATA ──
const MEM=[{id:1,n:"Joeldy T.",i:"JT",p:"+242 06 466 3469",ok:true,t:1,pen:0},{id:2,n:"Grace M.",i:"GM",p:"+242 05 512 8834",ok:true,t:2,pen:0},{id:3,n:"Patrick K.",i:"PK",p:"+242 06 891 2245",ok:false,t:3,pen:1250},{id:4,n:"Merveille N.",i:"MN",p:"+242 05 334 7712",ok:true,t:4,pen:0},{id:5,n:"Blessing O.",i:"BO",p:"+242 06 223 5501",ok:false,t:5,pen:1250},{id:6,n:"Divine L.",i:"DL",p:"+242 05 667 9983",ok:true,t:6,pen:0}];
const CIR=[{id:1,name:"Cercle Élite",mem:6,amt:25000,freq:"Mensuel",tot:150000,prog:67,turn:"Joeldy T.",next:"01 Mai 2026",code:"ELITE2026",pen:5,created:"15 Jan 2026",admin:true},{id:2,name:"Cercle Amis",mem:8,amt:10000,freq:"Bi-mensuel",tot:80000,prog:45,turn:"Grace M.",next:"15 Avr 2026",code:"AMIS2026",pen:5,created:"01 Fév 2026",admin:false},{id:3,name:"Cercle Business",mem:10,amt:50000,freq:"Mensuel",tot:500000,prog:30,turn:"Patrick K.",next:"01 Mai 2026",code:"BIZ2026",pen:10,created:"01 Mar 2026",admin:true}];
const TXS=[{id:1,t:"in",n:"Grace M.",d:"Cotisation reçue",a:25000,dt:"Aujourd'hui",tm:"14:32",circle:"Cercle Élite",ref:"LK-TX-0891"},{id:2,t:"in",n:"Divine L.",d:"Cotisation reçue",a:25000,dt:"Aujourd'hui",tm:"13:10",circle:"Cercle Élite",ref:"LK-TX-0890"},{id:3,t:"out",n:"Cercle Élite",d:"Versement cotisation",a:25000,dt:"Hier",tm:"09:15",circle:"Cercle Élite",ref:"LK-TX-0889"},{id:4,t:"in",n:"Merveille N.",d:"Cotisation reçue",a:25000,dt:"Hier",tm:"08:42",circle:"Cercle Élite",ref:"LK-TX-0888"},{id:5,t:"out",n:"Kolo Pay",d:"Retrait vers MTN",a:50000,dt:"03 Avr",tm:"16:20",circle:"",ref:"LK-TX-0880"},{id:6,t:"in",n:"Cercle Amis",d:"Gain tontine",a:80000,dt:"01 Avr",tm:"10:00",circle:"Cercle Amis",ref:"LK-TX-0870"}];
const WALLETS=[{id:0,n:"Kolo Pay",num:"Wallet interne",bal:95000,logo:"kolo",col:C.kolo,desc:"Votre portefeuille Likelemba"},{id:1,n:"MTN Mobile Money",num:"••• 3469",bal:175000,logo:"mtn",col:"#FFCC00",desc:""},{id:2,n:"Airtel Money",num:"••• 8834",bal:62000,logo:"airtel",col:"#ED1C24",desc:""}];
const NOTIFS=[{id:1,tp:"warn",tt:"Rappel cotisation",ds:"Cotisation Cercle Élite due dans 3 jours",tm:"Il y a 2h",rd:false},{id:2,tp:"in",tt:"Cotisation reçue",ds:"Grace M. a versé 25 000 FCFA",tm:"Il y a 5h",rd:false},{id:3,tp:"pen",tt:"Pénalité appliquée",ds:"Patrick K. pénalisé de 1 250 FCFA",tm:"Il y a 8h",rd:false},{id:4,tp:"gift",tt:"Votre tour approche !",ds:"Cagnotte Cercle Amis le 15 Avr",tm:"Hier",rd:true},{id:5,tp:"add",tt:"Nouveau membre",ds:"Blessing O. a rejoint Cercle Élite",tm:"Il y a 2j",rd:true}];
const RCPT=[{id:1,c:"Cercle Élite",a:25000,s:"paid",d:"05 Avr 2026",r:"LK-0412"},{id:2,c:"Cercle Amis",a:10000,s:"paid",d:"01 Avr 2026",r:"LK-0398"},{id:3,c:"Cercle Business",a:50000,s:"pending",d:"01 Mai 2026",r:"LK-0425"}];
const MSGS=[{id:1,from:"Grace M.",ini:"GM",msg:"Salut tout le monde! N'oubliez pas la cotisation",time:"14:30",me:false},{id:2,from:"Joeldy T.",ini:"JT",msg:"Merci Grace! J'ai déjà cotisé.",time:"14:32",me:true},{id:3,from:"Divine L.",ini:"DL",msg:"Moi aussi c'est fait",time:"14:35",me:false},{id:4,from:"Grace M.",ini:"GM",msg:"Super! Il reste Patrick et Blessing",time:"14:36",me:false},{id:5,from:"Joeldy T.",ini:"JT",msg:"Je vais leur envoyer un rappel",time:"14:38",me:true}];
const FAQS=[{q:"Comment créer un cercle ?",a:"Allez dans Cercles > Créer un cercle. Définissez le nom, montant, fréquence et invitez vos membres."},{q:"Qu'est-ce que Kolo Pay ?",a:"Kolo Pay est votre portefeuille interne Likelemba. Vos gains y sont déposés. Vous pouvez retirer vers MTN ou Airtel."},{q:"Comment fonctionne la pénalité ?",a:"Si un membre ne cotise pas à temps, une pénalité de 5-10% est automatiquement appliquée."}];
const SAV=[{id:1,n:"Terrain Brazzaville",tg:2000000,sv:850000,cl:C.blue},{id:2,n:"MacBook Pro",tg:800000,sv:320000,cl:C.purple},{id:3,n:"Fonds d'urgence",tg:500000,sv:500000,cl:C.green}];

// ── Components ──
const Btn=({children,onClick,v="p",full,sx,dis})=>{const m={p:{background:`linear-gradient(135deg,${C.blue},${C.blueD})`,color:"#fff",border:"none",boxShadow:"0 4px 16px rgba(26,86,219,0.25)"},s:{background:C.card,color:C.t1,border:`1.5px solid ${C.brd}`,boxShadow:"none"}};return <button disabled={dis} onClick={onClick} style={{...m[v],borderRadius:50,padding:"14px 28px",fontSize:14,fontWeight:600,cursor:dis?"not-allowed":"pointer",opacity:dis?.5:1,width:full?"100%":"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:8,...sx}}>{children}</button>;};
const Av=({ini,sz=44,col})=>{const h=(ini.charCodeAt(0)*37+(ini[1]?.charCodeAt(0)||0)*97)%360;return <div style={{width:sz,height:sz,borderRadius:sz/2,background:col||`hsl(${h},45%,92%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*.36,fontWeight:700,color:col?"#fff":`hsl(${h},45%,40%)`,flexShrink:0}}>{ini}</div>;};
const Hdr=({title,onBack,right})=><div style={{display:"flex",alignItems:"center",padding:"6px 0 14px",gap:12}}>{onBack&&<button onClick={onBack} style={{background:C.card,border:`1px solid ${C.brd}`,borderRadius:12,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.t1}}>{Z.back}</button>}<span style={{flex:1,fontSize:18,fontWeight:700,color:C.t0}}>{title}</span>{right}</div>;
const Bdg=({s})=>{const m={paid:{bg:C.greenL,c:C.green,l:"Payé"},pending:{bg:C.orangeL,c:C.orange,l:"En attente"},completed:{bg:C.blueL,c:C.blue,l:"Complété"}};const x=m[s]||m.pending;return <span style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:20,background:x.bg,color:x.c}}>{x.l}</span>;};
const Inp=({label,ph,val,set,icon,type="text",area})=><div style={{marginBottom:16}}>{label&&<label style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:6,display:"block"}}>{label}</label>}<div style={{display:"flex",alignItems:area?"flex-start":"center",gap:10,padding:area?"12px 16px":"14px 16px",background:C.card,borderRadius:12,border:`1.5px solid ${C.brd}`}}>{icon&&<span style={{color:C.t3}}>{icon}</span>}{area?<textarea placeholder={ph} value={val} onChange={e=>set(e.target.value)} rows={3} style={{flex:1,border:"none",background:"none",outline:"none",fontSize:14,color:C.t0,resize:"none"}}/>:<input type={type} placeholder={ph} value={val||""} onChange={e=>set(e.target.value)} style={{flex:1,border:"none",background:"none",outline:"none",fontSize:15,color:C.t0,fontWeight:500}}/>}</div></div>;
const TxR=({tx,onClick})=><div onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${C.brd}`,cursor:onClick?"pointer":"default"}}><div style={{width:42,height:42,borderRadius:14,background:tx.t==="in"?C.greenL:C.redL,display:"flex",alignItems:"center",justifyContent:"center",color:tx.t==="in"?C.green:C.red}}>{tx.t==="in"?Z.dn:Z.up}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{tx.n}</div><div style={{fontSize:12,color:C.t3}}>{tx.d}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:tx.t==="in"?C.green:C.t1}}>{tx.t==="in"?"+":"-"}{fm(tx.a)} F</div><div style={{fontSize:11,color:C.t3}}>{tx.dt}</div></div></div>;
const Toggle=({v,set})=><button onClick={()=>set(!v)} style={{width:48,height:28,borderRadius:14,border:"none",cursor:"pointer",background:v?C.blue:C.brd,padding:2}}><div style={{width:24,height:24,borderRadius:12,background:"#fff",transform:v?"translateX(20px)":"translateX(0)",transition:"transform 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.15)"}}/></button>;
const MenuRow=({icon,label,onClick,right,color})=><button onClick={onClick} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",width:"100%",background:C.card,borderRadius:12,marginBottom:6,cursor:"pointer",border:`1px solid ${C.brdL}`,textAlign:"left"}} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background=C.card}><span style={{color:color||C.blue}}>{icon}</span><span style={{flex:1,fontSize:14,fontWeight:500,color:C.t1}}>{label}</span>{right||<span style={{color:C.t4}}>{Z.fwd}</span>}</button>;
const Scroll=({children,pad=40})=><div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:pad}}>{children}</div>;

// ════════════════ SCREENS ════════════════

// ── Splash ──
function Splash({go}){useEffect(()=>{setTimeout(()=>go("onb"),2200)},[]);
return <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:`linear-gradient(160deg,${C.navy},${C.navyM})`}}>
<div style={{width:80,height:80,borderRadius:24,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 20px 60px rgba(26,86,219,0.4)"}}><span style={{fontSize:30,fontWeight:900,color:"#fff"}}>LK</span></div>
<div style={{marginTop:18,fontSize:28,fontWeight:800,color:"#fff"}}>Likelemba</div>
<div style={{fontSize:11,color:C.gold,marginTop:6,fontWeight:600,letterSpacing:3}}>TONTINE DIGITALE</div>
<div style={{position:"absolute",bottom:40,fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:1.5}}>LAMUKA TECH</div></div>;}

// ── Onboarding ──
function Onb({go}){const[p,setP]=useState(0);
const pg=[
{img:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=900&fit=crop&crop=faces",t:"Épargnez ensemble",d:"Rejoignez des cercles de confiance, cotisez ensemble et recevez votre cagnotte quand c'est votre tour.",ov:"linear-gradient(0deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.4) 40%,transparent 70%)"},
{img:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=900&fit=crop",t:"100% sécurisé",d:"Chaque transaction est tracée et protégée par Kolo Pay. Votre argent est en sécurité.",ov:`linear-gradient(0deg,rgba(11,29,58,0.95) 0%,rgba(11,29,58,0.5) 40%,transparent 65%)`},
{img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=900&fit=crop",t:"Kolo Pay",d:"Votre portefeuille intégré. Recevez vos gains, cotisez et payez avec votre Kolo Card.",ov:`linear-gradient(0deg,rgba(99,102,241,0.95) 0%,rgba(99,102,241,0.4) 40%,transparent 65%)`}
];
return <div style={{height:"100%",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",inset:0,backgroundImage:`url(${pg[p].img})`,backgroundSize:"cover",backgroundPosition:"center"}}/>
<div style={{position:"absolute",inset:0,background:pg[p].ov}}/>
{p<2&&<button onClick={()=>go("login")} style={{position:"absolute",top:16,right:20,zIndex:10,background:"rgba(255,255,255,0.2)",backdropFilter:"blur(10px)",border:"none",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",padding:"8px 18px",borderRadius:50}}>Passer</button>}
<div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:5,padding:"0 28px 70px"}}>
<h2 style={{fontSize:28,fontWeight:800,color:"#fff",marginBottom:8}}>{pg[p].t}</h2>
<p style={{fontSize:15,color:"rgba(255,255,255,0.8)",lineHeight:1.6,marginBottom:28}}>{pg[p].d}</p>
<div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:20}}>{pg.map((_,i)=><div key={i} style={{width:p===i?24:8,height:8,borderRadius:4,background:p===i?"#fff":"rgba(255,255,255,0.3)"}}/>)}</div>
<Btn full onClick={()=>p<2?setP(p+1):go("login")} sx={{background:"#fff",color:C.t0,boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>{p<2?"Suivant":"Commencer"}</Btn>
</div></div>;}

// ── Auth Screens ──
function Login({go}){return <Scroll><div style={{textAlign:"center",marginBottom:36,marginTop:20}}><div style={{width:60,height:60,borderRadius:18,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,boxShadow:"0 12px 32px rgba(26,86,219,0.3)"}}><span style={{fontSize:24,fontWeight:900,color:"#fff"}}>LK</span></div><h2 style={{color:C.t0,fontSize:24,fontWeight:800,margin:0}}>Bon retour !</h2><p style={{color:C.t3,fontSize:13,marginTop:6}}>Connectez-vous à votre compte</p></div><Inp label="Numéro de téléphone" ph="+242 06 XXX XXXX" icon={Z.phone}/><Inp label="Mot de passe" ph="Entrez votre mot de passe" type="password" icon={Z.lock}/><div style={{textAlign:"right",marginBottom:24}}><button onClick={()=>go("forgot")} style={{background:"none",border:"none",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}>Mot de passe oublié ?</button></div><Btn full onClick={()=>go("pin")}>Se connecter</Btn><div style={{textAlign:"center",marginTop:24,fontSize:14,color:C.t2}}>Pas de compte ? <button onClick={()=>go("reg1")} style={{background:"none",border:"none",color:C.gold,fontWeight:700,cursor:"pointer",fontSize:14}}>S'inscrire</button></div></Scroll>;}
function Reg1({go}){const[ok,setOk]=useState(false);return <Scroll><Hdr title="" onBack={()=>go("login")}/><div style={{fontSize:12,color:C.blue,fontWeight:600}}>Étape 1/3</div><h2 style={{fontSize:22,fontWeight:800,color:C.t0,margin:"4px 0"}}>Créer un compte</h2><p style={{color:C.t3,fontSize:13,marginBottom:24}}>Entrez votre numéro</p><Inp label="Numéro" ph="+242 06 XXX XXXX" icon={Z.phone}/><div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:28}}><button onClick={()=>setOk(!ok)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${ok?C.blue:C.brd}`,background:ok?C.blue:"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{ok&&Z.okW}</button><span style={{fontSize:13,color:C.t2}}>J'accepte les <span style={{color:C.blue,fontWeight:600}}>Conditions</span></span></div><Btn full onClick={()=>go("reg2")} dis={!ok}>Continuer</Btn></Scroll>;}
function Reg2({go}){return <Scroll><Hdr title="" onBack={()=>go("back")}/><div style={{fontSize:12,color:C.blue,fontWeight:600}}>Étape 2/3</div><h2 style={{fontSize:22,fontWeight:800,color:C.t0,margin:"4px 0"}}>Vérification</h2><p style={{color:C.t3,fontSize:13,marginBottom:32}}>Code à 6 chiffres envoyé par SMS</p><div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:28}}>{[...Array(6)].map((_,i)=><div key={i} style={{width:46,height:54,borderRadius:12,border:`2px solid ${C.brd}`,background:C.card,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700}}/>)}</div><Btn full onClick={()=>go("reg3")}>Vérifier</Btn></Scroll>;}
function Reg3({go}){return <Scroll><Hdr title="" onBack={()=>go("back")}/><div style={{fontSize:12,color:C.blue,fontWeight:600}}>Étape 3/3</div><h2 style={{fontSize:22,fontWeight:800,color:C.t0,margin:"4px 0"}}>Votre profil</h2><Inp label="Nom complet" ph="Ex: Joeldy Tsina" icon={Z.usr}/><Inp label="Email (optionnel)" ph="votre@email.com"/><Inp label="Mot de passe" ph="Minimum 8 caractères" type="password" icon={Z.lock}/><Inp label="Confirmer" ph="Retapez" type="password" icon={Z.lock}/><Btn full onClick={()=>go("pin")}>Créer mon compte</Btn></Scroll>;}
function Forgot({go}){return <Scroll><Hdr title="" onBack={()=>go("back")}/><div style={{textAlign:"center",marginBottom:32}}><div style={{width:60,height:60,borderRadius:20,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{Z.lock}</div><h2 style={{fontSize:22,fontWeight:800,color:C.t0}}>Mot de passe oublié ?</h2></div><Inp label="Numéro" ph="+242 06 XXX XXXX" icon={Z.phone}/><Btn full onClick={()=>go("back")}>Envoyer le code</Btn></Scroll>;}
function Pin({go}){const[pin,setPin]=useState("");return <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.bg,padding:"20px 24px"}}><div style={{width:60,height:60,borderRadius:18,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24}}><span style={{fontSize:24,fontWeight:900,color:"#fff"}}>LK</span></div><h2 style={{fontSize:20,fontWeight:700,color:C.t0,marginBottom:8}}>Entrez votre PIN</h2><div style={{display:"flex",gap:16,marginBottom:32}}>{[0,1,2,3].map(i=><div key={i} style={{width:16,height:16,borderRadius:8,background:pin.length>i?C.blue:C.brd}}/>)}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,width:220}}>{[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=><button key={i} onClick={()=>{if(n==="⌫")setPin(p=>p.slice(0,-1));else if(n!==""&&pin.length<4){const np=pin+n;setPin(np);if(np.length===4)setTimeout(()=>go("home"),300);}}} style={{width:66,height:50,borderRadius:14,border:"none",background:n===""?"transparent":C.card,fontSize:n==="⌫"?18:20,fontWeight:600,color:C.t0,cursor:n===""?"default":"pointer",boxShadow:n===""?"none":C.sh,display:"flex",alignItems:"center",justifyContent:"center"}}>{n}</button>)}</div></div>;}

// ── Home Tabs ──
function HomeTab({go}){const[sb,setSb]=useState(true);const kolo=WALLETS[0];
return <div>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:24,padding:"22px 20px",marginBottom:20,boxShadow:"0 8px 32px rgba(11,29,58,0.25)"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:12,color:"rgba(255,255,255,0.55)",fontWeight:600,letterSpacing:0.5}}>SOLDE KOLO PAY</span><button onClick={()=>setSb(!sb)} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.55)"}}>{sb?Z.eye:Z.eyeX}</button></div>
<div style={{fontSize:32,fontWeight:800,color:C.gold,marginBottom:2}}>{sb?fm(kolo.bal):"••• •••"} <span style={{fontSize:14,color:"rgba(255,255,255,0.5)"}}>FCFA</span></div>
<div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginBottom:18,display:"flex",alignItems:"center",gap:4}}><SvgIc type="kolo" size={14}/> Portefeuille interne</div>
<div style={{display:"flex",gap:8}}>
{[{ic:Z.up,l:"Cotiser",s:"contribute"},{ic:Z.send,l:"Envoyer",s:"transfer"},{ic:Z.qr,l:"QR Pay",s:"qr"},{ic:Z.plus,l:"Inviter",s:"invite"}].map((a,i)=><button key={i} onClick={()=>go(a.s)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6,background:"rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 4px",border:"none",cursor:"pointer",color:"#fff"}}>{a.ic}<span style={{fontSize:10,fontWeight:600,opacity:.85}}>{a.l}</span></button>)}
</div></div>
{/* Services 2x4 grid */}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:14}}>
{[{ic:"market",t:"Cercles\npublics",s:"market"},{ic:"cardIc",t:"Kolo\nCard",s:"koloCard"},{ic:"bag",t:"SNBL",s:"snbl"},{ic:"trophy",t:"Score\ncrédit",s:"creditScore"}].map((f,i)=><button key={i} onClick={()=>go(f.s)} style={{background:C.card,borderRadius:14,padding:"12px 4px",border:`1px solid ${C.brd}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}><SvgIc type={f.ic} size={22}/><span style={{fontSize:10,fontWeight:600,color:C.t2,textAlign:"center",lineHeight:1.3,whiteSpace:"pre-line"}}>{f.t}</span></button>)}
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:18}}>
{[{ic:Z.dn,t:"Demander\nargent",s:"requestMoney"},{ic:Z.doc,t:"Factures",s:"bills"},{ic:Z.fire,t:"Tontine\nExpress",s:"tontineExpress"},{ic:Z.grp,t:"Objectifs\ngroupe",s:"groupGoals"}].map((f,i)=><button key={i} onClick={()=>go(f.s)} style={{background:C.card,borderRadius:14,padding:"12px 4px",border:`1px solid ${C.brd}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,color:C.blue}}>{f.ic}<span style={{fontSize:10,fontWeight:600,color:C.t2,textAlign:"center",lineHeight:1.3,whiteSpace:"pre-line"}}>{f.t}</span></button>)}
</div>
{/* Banners */}
<div style={{display:"flex",gap:8,marginBottom:18}}>
<button onClick={()=>go("gamification")} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:`linear-gradient(135deg,${C.gold}15,${C.gold}05)`,borderRadius:14,padding:"12px 14px",border:`1px solid ${C.gold}25`,cursor:"pointer",textAlign:"left"}}><div style={{color:C.gold}}>{Z.star}</div><div><div style={{fontSize:12,fontWeight:700,color:C.gold}}>Niveau Or</div><div style={{fontSize:10,color:C.t3}}>850 pts</div></div></button>
<button onClick={()=>go("lamu")} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:`linear-gradient(135deg,${C.kolo}10,${C.blue}08)`,borderRadius:14,padding:"12px 14px",border:`1px solid ${C.kolo}20`,cursor:"pointer",textAlign:"left"}}><div style={{width:28,height:28,borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.kolo})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:700}}>L</div><div><div style={{fontSize:12,fontWeight:700,color:C.kolo}}>Lamu AI</div><div style={{fontSize:10,color:C.t3}}>Assistant</div></div></button>
</div>
{/* Circles */}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:16,fontWeight:700,color:C.t0}}>Mes cercles</span><button onClick={()=>go("_c")} style={{background:"none",border:"none",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}>Voir tout</button></div>
<div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,marginBottom:22}}>
{CIR.map(c=><div key={c.id} onClick={()=>go("cd:"+c.id)} style={{minWidth:210,background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,cursor:"pointer",flexShrink:0}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:14,fontWeight:700,color:C.t1}}>{c.name}</span><span style={{fontSize:10,fontWeight:700,color:C.blue,background:C.blueL,padding:"2px 8px",borderRadius:6}}>{c.freq}</span></div>
<div style={{fontSize:12,color:C.t3,marginBottom:10}}>{c.mem} membres · <span style={{color:C.gold,fontWeight:600}}>{fm(c.amt)} F</span>/tour</div>
<div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden",marginBottom:6}}><div style={{width:`${c.prog}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`,borderRadius:4}}/></div>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.t3}}>Tour: {c.turn}</span><span style={{fontSize:11,fontWeight:700,color:C.gold}}>{c.prog}%</span></div></div>)}
</div>
{/* Txs */}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:16,fontWeight:700,color:C.t0}}>Activité récente</span><button onClick={()=>go("_h")} style={{background:"none",border:"none",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}>Tout</button></div>
{TXS.slice(0,4).map(tx=><TxR key={tx.id} tx={tx} onClick={()=>go("txd:"+tx.id)}/>)}
</div>;}

function CirclesTab({go}){return <div>
<div style={{display:"flex",gap:10,marginBottom:16}}>{[{l:"Actifs",v:"3",c:C.blue,bg:C.blueL},{l:"Membres",v:"24",c:C.green,bg:C.greenL},{l:"Épargné",v:"423K",c:C.gold,bg:C.goldL}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"14px 8px",background:s.bg,borderRadius:14}}><div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3,marginTop:2}}>{s.l}</div></div>)}</div>
<div style={{display:"flex",gap:8,marginBottom:16}}><Btn full onClick={()=>go("createCircle")}>{Z.plus} Créer</Btn><Btn v="s" onClick={()=>go("joinCircle")} sx={{flexShrink:0}}>{Z.link}</Btn><Btn v="s" onClick={()=>go("market")} sx={{flexShrink:0}}><SvgIc type="market" size={18}/></Btn></div>
{CIR.map(c=><div key={c.id} onClick={()=>go("cd:"+c.id)} style={{display:"flex",alignItems:"center",gap:14,padding:16,background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brd}`,cursor:"pointer"}}><div style={{width:44,height:44,borderRadius:14,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.grp}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.name}{!c.admin&&<span style={{fontSize:9,color:C.t3,marginLeft:6}}>membre</span>}</div><div style={{fontSize:12,color:C.t3}}>{c.mem} membres · {c.freq}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:15,fontWeight:700,color:C.gold}}>{fm(c.amt)} F</div></div></div>)}
</div>;}

function HistTab({go}){const[tab,setTab]=useState("tx");const[f,setF]=useState("Tout");const fl=f==="Tout"?TXS:TXS.filter(t=>f==="Reçu"?t.t==="in":t.t==="out");
const past=[{id:10,name:"Cercle Solidarité",mem:5,amt:20000,gain:100000,date:"Déc 2025",myTurn:3},{id:11,name:"Cercle Famille",mem:4,amt:15000,gain:60000,date:"Oct 2025",myTurn:2}];
return <div>
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:14,border:`1px solid ${C.brd}`}}>
{[{k:"tx",l:"Transactions"},{k:"circles",l:"Cercles terminés"}].map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t.k?C.blue:"transparent",color:tab===t.k?"#fff":C.t3,fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.l}</button>)}
</div>
{tab==="tx"&&<div>
<div style={{display:"flex",gap:8,marginBottom:18}}>{["Tout","Reçu","Envoyé"].map(c=><button key={c} onClick={()=>setF(c)} style={{padding:"8px 16px",borderRadius:50,border:"none",cursor:"pointer",background:f===c?C.blue:C.card,color:f===c?"#fff":C.t2,fontSize:12,fontWeight:600}}>{c}</button>)}</div>
{fl.map(tx=><TxR key={tx.id} tx={tx} onClick={()=>go("txd:"+tx.id)}/>)}</div>}
{tab==="circles"&&<div>
<div style={{display:"flex",gap:10,marginBottom:16}}>{[{l:"Complétés",v:"2",c:C.green,bg:C.greenL},{l:"Total gagné",v:"160K",c:C.gold,bg:C.goldL}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"14px 8px",background:s.bg,borderRadius:14}}><div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}</div>
{past.map(c=><div key={c.id} style={{background:C.card,borderRadius:16,padding:16,marginBottom:10,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div><div style={{fontSize:15,fontWeight:700,color:C.t0}}>{c.name}</div><div style={{fontSize:12,color:C.t3}}>{c.mem} membres · Terminé en {c.date}</div></div><Bdg s="completed"/></div>
<div style={{display:"flex",gap:8}}>{[{l:"Cotisation",v:fm(c.amt)+" F"},{l:"Mon tour",v:"#"+c.myTurn},{l:"Gain",v:fm(c.gain)+" F"}].map((r,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"8px 4px",background:C.bg,borderRadius:10}}><div style={{fontSize:12,fontWeight:700,color:i===2?C.gold:C.t1}}>{r.v}</div><div style={{fontSize:9,color:C.t3}}>{r.l}</div></div>)}</div></div>)}</div>}
</div>;}

function ProfTab({go}){return <div>
<div style={{textAlign:"center",marginBottom:24}}><Av ini="JT" sz={64} col={C.blue}/><div style={{fontSize:18,fontWeight:700,color:C.t0,marginTop:10}}>Joeldy Tsina</div><div style={{fontSize:13,color:C.t3}}>+242 06 466 3469</div>
<div style={{display:"flex",gap:12,justifyContent:"center",marginTop:14}}>{[{l:"Cercles",v:"3"},{l:"Cotisations",v:"36"},{l:"Score",v:"4.9"}].map((s,i)=><div key={i} style={{padding:"8px 18px",background:C.blueL,borderRadius:12}}><div style={{fontSize:16,fontWeight:800,color:C.blue}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}</div></div>
<MenuRow icon={Z.usr} label="Modifier le profil" onClick={()=>go("editProfile")}/>
<MenuRow icon={Z.shield} label="Sécurité & PIN" onClick={()=>go("sec")}/>
<MenuRow icon={Z.wal} label="Portefeuilles" onClick={()=>go("wallets")}/>
<MenuRow icon={Z.star} label="Gamification" onClick={()=>go("gamification")} color={C.gold}/>
<MenuRow icon={Z.heart} label="Famille" onClick={()=>go("family")} color={C.red}/>
<MenuRow icon={Z.tgt} label="Objectifs d'épargne" onClick={()=>go("sav")}/>
<MenuRow icon={Z.gift} label="Parrainage" onClick={()=>go("referral")} color={C.green}/>
<MenuRow icon={Z.book} label="Éducation financière" onClick={()=>go("education")} color={C.purple}/>
<MenuRow icon={Z.shield} label="Micro-assurance" onClick={()=>go("insurance")}/>
<MenuRow icon={Z.bell} label="Notifications" onClick={()=>go("notif")}/>
<MenuRow icon={Z.globe} label="Langue" onClick={()=>go("lang")}/>
<MenuRow icon={Z.moon} label="Mode sombre" onClick={()=>go("darkMode")}/>
<MenuRow icon={Z.gear} label="Paramètres" onClick={()=>go("settings")}/>
<div style={{textAlign:"center",marginTop:16,fontSize:10,color:C.t4}}>Likelemba v2.0 · Lamuka Tech</div>
</div>;}

// ── Home Container ──
function Home({go,initTab=0}){const[tab,setTab]=useState(initTab);const tabs=[{ic:Z.home,l:"Accueil"},{ic:Z.grp,l:"Cercles"},{ic:Z.wal,l:"Historique"},{ic:Z.usr,l:"Profil"}];
const switchTab=(i)=>{setTab(i);go(["home","home_c","home_h","home_p"][i]);};
const tg=s=>{if(s==="_c")switchTab(1);else if(s==="_h")switchTab(2);else go(s);};
return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
<div style={{flex:1,overflowY:"auto",padding:"12px 18px",paddingBottom:100}}>
{tab===0&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{fontSize:13,color:C.t3}}>Mbote</div><div style={{fontSize:20,fontWeight:800,color:C.t0}}>Joeldy</div></div><button onClick={()=>go("notif")} style={{width:42,height:42,borderRadius:14,background:C.card,border:`1px solid ${C.brd}`,cursor:"pointer",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",color:C.t1}}>{Z.bell}<div style={{position:"absolute",top:10,right:10,width:8,height:8,borderRadius:4,background:C.red,border:"2px solid #fff"}}/></button></div>}
{tab===1&&<div style={{fontSize:20,fontWeight:800,color:C.t0,marginBottom:14}}>Mes cercles</div>}
{tab===2&&<div style={{fontSize:20,fontWeight:800,color:C.t0,marginBottom:14}}>Historique</div>}
{tab===0&&<HomeTab go={tg}/>}{tab===1&&<CirclesTab go={tg}/>}{tab===2&&<HistTab go={tg}/>}{tab===3&&<ProfTab go={tg}/>}
</div>
<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 16px",paddingBottom:"max(12px, env(safe-area-inset-bottom, 12px))",background:`linear-gradient(transparent,${C.bg} 30%)`}}>
<div style={{display:"flex",background:C.card,borderRadius:22,padding:"6px 4px",boxShadow:C.shM,border:`1px solid ${C.brdL}`}}>
{tabs.map((t,i)=><button key={i} onClick={()=>switchTab(i)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",cursor:"pointer",padding:"8px 0",color:tab===i?C.blue:C.t4}}>{t.ic}<span style={{fontSize:10,fontWeight:tab===i?700:500}}>{t.l}</span>{tab===i&&<div style={{width:4,height:4,borderRadius:2,background:C.blue,marginTop:1}}/>}</button>)}
</div></div></div>;}

// ── Simple Detail Screens ──
function TxDetail({go,id}){const tx=TXS.find(x=>x.id===id)||TXS[0];return <Scroll><Hdr title="Détail transaction" onBack={()=>go("back")}/><div style={{background:C.card,borderRadius:24,padding:24,textAlign:"center",border:`1px solid ${C.brd}`,marginBottom:16}}><div style={{width:56,height:56,borderRadius:18,background:tx.t==="in"?C.greenL:C.redL,display:"inline-flex",alignItems:"center",justifyContent:"center",color:tx.t==="in"?C.green:C.red,marginBottom:12}}>{tx.t==="in"?Z.dn:Z.up}</div><div style={{fontSize:28,fontWeight:800,color:tx.t==="in"?C.green:C.t0}}>{tx.t==="in"?"+":"-"}{fm(tx.a)} FCFA</div></div>{[{l:"De/Vers",v:tx.n},{l:"Date",v:tx.dt+" · "+tx.tm},{l:"Cercle",v:tx.circle||"—"},{l:"Référence",v:tx.ref}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"13px 16px",background:C.card,borderRadius:12,marginBottom:6,border:`1px solid ${C.brdL}`}}><span style={{fontSize:13,color:C.t3}}>{r.l}</span><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{r.v}</span></div>)}</Scroll>;}

function CircleDetail({go,cid}){const c=CIR.find(x=>x.id===cid)||CIR[0];const[tab,setTab]=useState("m");const paid=MEM.filter(m=>m.ok).length;
return <Scroll><Hdr title={c.name} onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:24,padding:20,border:`1px solid ${C.brd}`,marginBottom:16,boxShadow:C.sh}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div><div style={{fontSize:12,color:C.t3}}>Cagnotte</div><div style={{fontSize:26,fontWeight:800,color:C.t0}}>{fm(c.tot)} <span style={{fontSize:13,color:C.t3}}>FCFA</span></div></div><div style={{textAlign:"right"}}><div style={{fontSize:12,color:C.t3}}>Par tour</div><div style={{fontSize:18,fontWeight:700,color:C.gold}}>{fm(c.amt)} F</div></div></div>
<div style={{background:C.bg,borderRadius:5,height:8,overflow:"hidden",marginBottom:8}}><div style={{width:`${c.prog}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`,borderRadius:5}}/></div>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.t3}}>Collecté: {c.prog}%</span><span style={{fontSize:11,color:C.t3}}>Prochain: <span style={{fontWeight:700,color:C.gold}}>{c.next}</span></span></div></div>
{/* Actions */}
<div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>{[{l:"Cotiser",ic:Z.up,s:"contribute"},{l:"Chat",ic:Z.msg,s:"chat:"+c.id},{l:"Inviter",ic:Z.plus,s:"invite"},{l:"Calendrier",ic:Z.cal,s:"calendar"}].map((a,i)=><button key={i} onClick={()=>go(a.s)} style={{flex:"1 1 22%",display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:C.card,border:`1px solid ${C.brd}`,borderRadius:12,padding:"10px 0",cursor:"pointer",fontSize:11,fontWeight:600,color:C.blue}}>{a.ic}<span>{a.l}</span></button>)}</div>
<div style={{display:"flex",gap:6,marginBottom:16}}>{[{l:"Stats",ic:Z.tgt,s:"circleStats"},...(c.admin?[{l:"Rappel",ic:Z.bell,s:"remind"},{l:"Modifier",ic:Z.gear,s:"editCircle"}]:[]),{l:"Quitter",ic:Z.warn,s:"leaveCircle",c:C.red}].map((a,i)=><button key={i} onClick={()=>go(a.s)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:C.card,border:`1px solid ${a.c?a.c+"20":C.brd}`,borderRadius:12,padding:"10px 0",cursor:"pointer",fontSize:10,fontWeight:600,color:a.c||C.t2}}>{a.ic}<span>{a.l}</span></button>)}</div>
{!c.admin&&<div style={{background:C.blueL,borderRadius:10,padding:"8px 14px",marginBottom:12,fontSize:12,color:C.t2}}>Admin: <span style={{fontWeight:700,color:C.t1}}>Grace M.</span></div>}
{/* Tabs */}
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:16,border:`1px solid ${C.brd}`}}>{[{k:"m",l:"Membres"},{k:"r",l:"Rotation"},{k:"g",l:"Règles"}].map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t.k?C.blue:"transparent",color:tab===t.k?"#fff":C.t3,fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.l}</button>)}</div>
{tab==="m"&&<div><div style={{fontSize:12,color:C.t3,marginBottom:10}}><span style={{color:C.green,fontWeight:700}}>{paid}</span> payé(s) · <span style={{color:C.red,fontWeight:700}}>{MEM.length-paid}</span> en attente</div>{MEM.map(m=><div key={m.id} onClick={()=>go("mem:"+m.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:16,marginBottom:6,border:`1px solid ${C.brdL}`,cursor:"pointer"}}><Av ini={m.i} sz={40}/><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.n}</span>{((c.admin&&m.id===1)||(!c.admin&&m.id===2))&&<span style={{fontSize:9,fontWeight:700,color:C.blue,background:C.blueL,padding:"2px 6px",borderRadius:4}}>ADMIN</span>}</div><div style={{fontSize:12,color:C.t3}}>{m.p}{m.pen>0&&<span style={{color:C.red}}> · Pénalité: {fm(m.pen)} F</span>}</div></div><div style={{textAlign:"center",marginRight:8}}><div style={{fontSize:9,color:C.t3,fontWeight:600}}>TOUR</div><div style={{fontSize:16,fontWeight:800,color:C.gold}}>{m.t}</div></div><Bdg s={m.ok?"paid":"pending"}/></div>)}</div>}
{tab==="r"&&MEM.map((m,i)=><div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:i===0?C.blueL:C.card,borderRadius:16,marginBottom:6,border:`1.5px solid ${i===0?C.blue+"40":C.brdL}`}}><div style={{width:30,height:30,borderRadius:8,background:i===0?C.blue:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:i===0?"#fff":C.t3}}>{m.t}</div><Av ini={m.i} sz={36}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{m.n}</div></div><span style={{fontSize:14,fontWeight:700,color:i===0?C.gold:C.t4}}>{fm(c.tot)} F</span></div>)}
{tab==="g"&&[{l:"Montant/tour",v:fm(c.amt)+" FCFA"},{l:"Fréquence",v:c.freq},{l:"Membres",v:c.mem},{l:"Pénalité",v:c.pen+"%"},{l:"Paiement",v:"Kolo Pay / Mobile Money"},{l:"Code",v:c.code}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"13px 16px",background:C.card,borderRadius:12,marginBottom:6,border:`1px solid ${C.brdL}`}}><span style={{fontSize:13,color:C.t3}}>{r.l}</span><span style={{fontSize:13,fontWeight:700,color:C.t1}}>{r.v}</span></div>)}
</Scroll>;}

function Chat({go,cid}){const c=CIR.find(x=>x.id===cid)||CIR[0];const[msg,setMsg]=useState("");const[msgs,setMsgs]=useState(MSGS);const ref=useRef(null);
const doSend=()=>{if(!msg.trim())return;setMsgs(p=>[...p,{id:Date.now(),from:"Joeldy T.",ini:"JT",msg:msg.trim(),time:new Date().toLocaleTimeString("fr",{hour:"2-digit",minute:"2-digit"}),me:true}]);setMsg("");setTimeout(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},50);};
return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
<div style={{padding:"12px 18px"}}><Hdr title={c.name} onBack={()=>go("back")} right={<span style={{fontSize:12,color:C.t3}}>{c.mem} membres</span>}/></div>
<div ref={ref} style={{flex:1,overflowY:"auto",padding:"0 18px 12px"}}>{msgs.map(m=><div key={m.id} style={{display:"flex",justifyContent:m.me?"flex-end":"flex-start",marginBottom:10}}>{!m.me&&<Av ini={m.ini} sz={28}/>}<div style={{marginLeft:m.me?0:8,maxWidth:"75%"}}>{!m.me&&<div style={{fontSize:11,fontWeight:600,color:C.blue,marginBottom:2}}>{m.from}</div>}<div style={{padding:"10px 14px",borderRadius:16,borderTopLeftRadius:m.me?16:4,borderTopRightRadius:m.me?4:16,background:m.me?C.blue:C.card,color:m.me?"#fff":C.t1,fontSize:13,lineHeight:1.4,boxShadow:m.me?"none":C.sh}}>{m.msg}</div><div style={{fontSize:10,color:C.t4,marginTop:2,textAlign:m.me?"right":"left"}}>{m.time}</div></div></div>)}</div>
<div style={{padding:"8px 18px 16px",background:C.card,borderTop:`1px solid ${C.brd}`}}><div style={{display:"flex",gap:8}}><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSend()} placeholder="Message..." style={{flex:1,padding:"12px 16px",borderRadius:50,border:`1px solid ${C.brd}`,background:C.bg,outline:"none",fontSize:14,color:C.t0}}/><button onClick={doSend} style={{width:44,height:44,borderRadius:22,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0}}>{Z.send}</button></div></div></div>;}

// ── Contribute/Confirm ──
function Contribute({go}){const[sel,setSel]=useState(1);const[wal,setWal]=useState(0);
return <Scroll><Hdr title="Cotiser" onBack={()=>go("back")}/>
{CIR.map(c=><button key={c.id} onClick={()=>setSel(c.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",width:"100%",background:sel===c.id?C.blueL:C.card,borderRadius:16,marginBottom:6,cursor:"pointer",border:`1.5px solid ${sel===c.id?C.blue:C.brdL}`,textAlign:"left"}}><div style={{width:40,height:40,borderRadius:12,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.grp}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.name}</div><div style={{fontSize:12,color:C.t3}}>{fm(c.amt)} FCFA / {c.freq.toLowerCase()}</div></div>{sel===c.id&&Z.ok}</button>)}
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginTop:16,marginBottom:10}}>Payer via</div>
{WALLETS.map((w,i)=><button key={w.id} onClick={()=>setWal(i)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",width:"100%",background:wal===i?C.blueL:C.card,borderRadius:16,marginBottom:6,border:`1.5px solid ${wal===i?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}><SvgIc type={w.logo} size={24}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{w.n}</div><div style={{fontSize:12,color:C.t3}}>{fm(w.bal)} F</div></div>{wal===i&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}</button>)}
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")}>Cotiser</Btn></div></Scroll>;}

// ── Wallets ──
function Wallets({go}){const tot=WALLETS.reduce((s,a)=>s+a.bal,0);return <Scroll><Hdr title="Portefeuilles" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:16,padding:"14px 18px",display:"flex",justifyContent:"space-between",marginBottom:12,border:`1px solid ${C.brd}`}}><span style={{fontSize:13,color:C.t3}}>Solde total</span><span style={{fontSize:16,fontWeight:800,color:C.gold}}>{fm(tot)} FCFA</span></div>
<div style={{display:"flex",gap:8,marginBottom:16}}><Btn full onClick={()=>go("topup")} sx={{flex:1}}>{Z.dn} Recharger</Btn><Btn v="s" full onClick={()=>go("withdraw")} sx={{flex:1}}>{Z.up} Retirer</Btn></div>
{WALLETS.map(w=><div key={w.id} style={{background:C.card,borderRadius:16,padding:18,marginBottom:10,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><SvgIc type={w.logo} size={28}/><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:C.t1}}>{w.n}</div><div style={{fontSize:12,color:C.t3}}>{w.num}</div></div>{w.id===0&&<span style={{fontSize:10,fontWeight:700,color:C.kolo,background:C.koloL,padding:"3px 8px",borderRadius:6}}>INTERNE</span>}</div>
<div style={{fontSize:22,fontWeight:800,color:C.gold}}>{fm(w.bal)} <span style={{fontSize:13,color:C.t3}}>FCFA</span></div></div>)}
</Scroll>;}

// ── Transfer P2P ──
function Transfer({go}){const[amt,setAmt]=useState("");const contacts=[{n:"Grace M.",p:"+242 05 512 8834",i:"GM"},{n:"Patrick K.",p:"+242 06 891 2245",i:"PK"},{n:"Merveille N.",p:"+242 05 334 7712",i:"MN"}];
return <Scroll><Hdr title="Envoyer" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:"24px 20px",textAlign:"center",marginBottom:16,border:`1px solid ${C.brd}`}}><div style={{fontSize:13,color:C.t3,marginBottom:8}}>Montant</div><div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0" style={{fontSize:36,fontWeight:800,color:C.gold,border:"none",background:"none",outline:"none",width:160,textAlign:"center"}}/><span style={{fontSize:16,fontWeight:600,color:C.t3}}>FCFA</span></div></div>
<div style={{display:"flex",gap:8,marginBottom:16}}>{[5000,10000,25000,50000].map(v=><button key={v} onClick={()=>setAmt(String(v))} style={{flex:1,padding:"10px 0",borderRadius:10,border:`1px solid ${amt===String(v)?C.blue:C.brd}`,background:amt===String(v)?C.blueL:C.card,color:amt===String(v)?C.blue:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{fm(v)}</button>)}</div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Contacts</div>
{contacts.map((c,i)=><button key={i} onClick={()=>go("ok")} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",width:"100%",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`,cursor:"pointer",textAlign:"left"}}><Av ini={c.i} sz={40}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.n}</div><div style={{fontSize:12,color:C.t3}}>{c.p}</div></div><span style={{color:C.t4}}>{Z.fwd}</span></button>)}
</Scroll>;}

// ── Request Money ──
function RequestMoney({go}){const[amt,setAmt]=useState("");
return <Scroll><Hdr title="Demander de l'argent" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:"24px 20px",textAlign:"center",marginBottom:16,border:`1px solid ${C.brd}`}}><div style={{fontSize:13,color:C.t3,marginBottom:8}}>Montant</div><div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0" style={{fontSize:36,fontWeight:800,color:C.blue,border:"none",background:"none",outline:"none",width:160,textAlign:"center"}}/><span style={{fontSize:16,fontWeight:600,color:C.t3}}>FCFA</span></div></div>
<Inp label="Motif" ph="Ex: Remboursement cotisation"/>
<div style={{marginTop:12}}><Btn full onClick={()=>go("ok")} dis={!amt}>Envoyer la demande</Btn></div></Scroll>;}

// ── Bills ──
function Bills({go}){const[sel,setSel]=useState(null);const[num,setNum]=useState("");const[amt,setAmt]=useState("");
const bills=[{n:"Électricité (SNE)",col:C.gold},{n:"Eau (SNDE)",col:C.blue},{n:"Canal+",col:C.navy},{n:"Startimes",col:C.orange},{n:"Internet",col:C.green},{n:"DSTV",col:C.purple}];
return <Scroll><Hdr title="Factures" onBack={()=>go("back")}/>
{sel===null?<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{bills.map((b,i)=><button key={i} onClick={()=>setSel(i)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"20px 10px",background:C.card,borderRadius:16,border:`1px solid ${C.brd}`,cursor:"pointer"}}><div style={{width:44,height:44,borderRadius:14,background:b.col+"15",display:"flex",alignItems:"center",justifyContent:"center",color:b.col,fontSize:14,fontWeight:800}}>{b.n[0]}</div><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{b.n}</span></button>)}</div>
:<div><button onClick={()=>setSel(null)} style={{background:C.blueL,borderRadius:12,padding:"10px 16px",border:"none",cursor:"pointer",marginBottom:16,color:C.blue,fontWeight:600,fontSize:13}}>{bills[sel].n}</button><Inp label="N° abonné" ph="12345678" val={num} set={setNum}/><Inp label="Montant" ph="15000" val={amt} set={setAmt} type="number"/><Btn full onClick={()=>go("ok")} dis={!num||!amt}>Payer {amt?fm(amt)+" F":""}</Btn></div>}
</Scroll>;}

// ── Notifications ──
function Notif({go}){const im={warn:{bg:C.orangeL,c:C.orange},"in":{bg:C.greenL,c:C.green},gift:{bg:C.purpleL,c:C.purple},add:{bg:C.blueL,c:C.blue},pen:{bg:C.redL,c:C.red}};
return <Scroll><Hdr title="Notifications" onBack={()=>go("back")}/>{NOTIFS.map(n=>{const ic=im[n.tp]||im.warn;return <div key={n.id} style={{display:"flex",gap:12,padding:"14px 16px",background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${n.rd?C.brdL:C.blue+"20"}`,opacity:n.rd?.6:1}}><div style={{width:42,height:42,borderRadius:12,background:ic.bg,display:"flex",alignItems:"center",justifyContent:"center",color:ic.c,flexShrink:0}}>{Z.bell}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{n.tt}</div><div style={{fontSize:12,color:C.t3,marginTop:2}}>{n.ds}</div><div style={{fontSize:11,color:C.t4,marginTop:4}}>{n.tm}</div></div></div>;})}</Scroll>;}

// ── Profile/Security/Settings ──
function EditProfile({go}){return <Scroll><Hdr title="Modifier le profil" onBack={()=>go("back")}/><div style={{textAlign:"center",marginBottom:24}}><Av ini="JT" sz={80} col={C.blue}/></div><Inp label="Nom" ph="Joeldy Tsina" val="Joeldy Tsina" set={()=>{}}/><Inp label="Téléphone" ph="+242 06 466 3469" val="+242 06 466 3469" set={()=>{}}/><Inp label="Email" ph="joeldytsina94@gmail.com" val="joeldytsina94@gmail.com" set={()=>{}}/><Btn full onClick={()=>go("back")}>Enregistrer</Btn></Scroll>;}
function Sec({go}){return <Scroll><Hdr title="Sécurité" onBack={()=>go("back")}/><MenuRow icon={Z.lock} label="Changer le PIN" onClick={()=>go("ok")}/><MenuRow icon={Z.lock} label="Changer le mot de passe" onClick={()=>go("ok")}/><MenuRow icon={Z.shield} label="2FA" right={<span style={{fontSize:12,fontWeight:700,color:C.green}}>Activé</span>}/><MenuRow icon={Z.phone} label="Biométrie" right={<span style={{fontSize:12,fontWeight:700,color:C.green}}>Activé</span>}/></Scroll>;}
function Settings({go}){const[n,sN]=useState(true);const[b,sB]=useState(true);return <Scroll><Hdr title="Paramètres" onBack={()=>go("back")}/>{[{l:"Notifications push",v:n,s:sN},{l:"Biométrie",v:b,s:sB}].map((t,i)=><div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`}}><span style={{fontSize:14,color:C.t1}}>{t.l}</span><Toggle v={t.v} set={t.s}/></div>)}<MenuRow icon={Z.shield} label="Sécurité" onClick={()=>go("sec")}/><MenuRow icon={Z.globe} label="Langue" onClick={()=>go("lang")}/><MenuRow icon={Z.help} label="FAQ" onClick={()=>go("faq")}/><div style={{marginTop:20}}><button onClick={()=>go("login")} style={{width:"100%",padding:"14px",borderRadius:50,border:`1.5px solid ${C.red}`,background:"none",color:C.red,fontSize:14,fontWeight:600,cursor:"pointer"}}>Se déconnecter</button></div></Scroll>;}
function Lang({go}){return <Scroll><Hdr title="Langue" onBack={()=>go("back")}/>{[{n:"Français",f:"FR",a:true},{n:"Lingala",f:"LN",a:false},{n:"English",f:"EN",a:false}].map(l=><div key={l.f} style={{display:"flex",alignItems:"center",gap:14,padding:"16px",background:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${l.a?C.blue:C.brdL}`,cursor:"pointer"}}><div style={{width:36,height:36,borderRadius:10,background:l.a?C.blueL:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:l.a?C.blue:C.t3}}>{l.f}</div><span style={{flex:1,fontSize:14,fontWeight:600,color:C.t1}}>{l.n}</span>{l.a&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}</div>)}</Scroll>;}
function FAQ({go}){const[o,setO]=useState(null);return <Scroll><Hdr title="FAQ" onBack={()=>go("back")}/>{FAQS.map((f,i)=><div key={i} style={{background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`,overflow:"hidden"}}><button onClick={()=>setO(o===i?null:i)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}><span style={{fontSize:14,fontWeight:600,color:C.t1,flex:1}}>{f.q}</span><span style={{color:C.t3,transform:o===i?"rotate(90deg)":"none",transition:"0.2s"}}>{Z.fwd}</span></button>{o===i&&<div style={{padding:"0 16px 16px",fontSize:13,color:C.t2,lineHeight:1.5}}>{f.a}</div>}</div>)}</Scroll>;}

// ── Create/Join/Invite/QR/Remind/Savings/Receipts ──
function CreateCircle({go}){const[name,setName]=useState("");const[amt,setAmt]=useState("");return <Scroll><Hdr title="Créer un cercle" onBack={()=>go("back")}/><Inp label="Nom" ph="Ex: Cercle Famille" val={name} set={setName}/><Inp label="Montant/tour (FCFA)" ph="25000" val={amt} set={setAmt} type="number"/><div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:6,display:"block"}}>Fréquence</label><div style={{display:"flex",gap:8}}>{["Hebdo","Bi-mensuel","Mensuel"].map(f=><button key={f} style={{flex:1,padding:"12px 0",borderRadius:12,border:"none",cursor:"pointer",background:f==="Mensuel"?C.blue:C.card,color:f==="Mensuel"?"#fff":C.t2,fontSize:13,fontWeight:600}}>{f}</button>)}</div></div><Btn full onClick={()=>go("ok")} dis={!name||!amt}>Créer</Btn></Scroll>;}
function JoinCircle({go}){const[code,setCode]=useState("");return <Scroll><Hdr title="Rejoindre" onBack={()=>go("back")}/><div style={{textAlign:"center",marginBottom:32}}><div style={{width:60,height:60,borderRadius:20,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.blue}}>{Z.link}</div><h3 style={{fontSize:18,fontWeight:700,color:C.t0}}>Code d'invitation</h3></div><Inp label="Code" ph="ELITE2026" val={code} set={setCode}/><Btn full onClick={()=>go("ok")} dis={!code}>Rejoindre</Btn></Scroll>;}
function Invite({go}){return <Scroll><Hdr title="Inviter" onBack={()=>go("back")}/><div style={{background:C.card,borderRadius:16,padding:20,border:`1px solid ${C.brd}`,textAlign:"center",marginBottom:20}}><div style={{fontSize:24,fontWeight:800,color:C.blue,letterSpacing:2,marginBottom:12}}>ELITE2026</div><Btn v="s" full>{Z.copy} Copier</Btn></div>{["WhatsApp","SMS","Lien"].map((m,i)=><button key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",width:"100%",background:C.card,borderRadius:12,marginBottom:8,border:`1px solid ${C.brdL}`,cursor:"pointer"}}><div style={{width:36,height:36,borderRadius:10,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue,fontWeight:700,fontSize:14}}>{m[0]}</div><span style={{flex:1,fontSize:14,color:C.t1}}>Inviter via {m}</span><span style={{color:C.t4}}>{Z.fwd}</span></button>)}</Scroll>;}
function QR({go}){const[tab,setTab]=useState("my");return <Scroll><Hdr title="QR Code" onBack={()=>go("back")}/>
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:20,border:`1px solid ${C.brd}`}}>{[{k:"my",l:"Mon QR"},{k:"scan",l:"Scanner"}].map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t.k?C.blue:"transparent",color:tab===t.k?"#fff":C.t3,fontSize:13,fontWeight:600,cursor:"pointer"}}>{t.l}</button>)}</div>
{tab==="my"?<div style={{textAlign:"center"}}>
<div style={{background:C.card,borderRadius:24,padding:32,border:`1px solid ${C.brd}`,display:"inline-block",marginBottom:20}}>
<div style={{width:200,height:200,background:C.navy,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",position:"relative",overflow:"hidden"}}>
<div style={{width:170,height:170,background:"#fff",borderRadius:12,display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gridTemplateRows:"1fr 1fr 1fr 1fr 1fr",gap:4,padding:12}}>
{[1,1,1,0,1, 0,0,1,0,0, 1,0,1,0,1, 0,1,0,1,0, 1,0,1,1,1].map((n,i)=><div key={i} style={{background:i===12?C.blue:n?C.navy:"transparent",borderRadius:i===12?4:2}}/>)}
</div>
</div>
<div style={{fontSize:18,fontWeight:700,color:C.t0}}>Joeldy Tsina</div>
<div style={{fontSize:13,color:C.t3,marginTop:4}}>+242 06 466 3469</div>
<div style={{fontSize:12,color:C.kolo,fontWeight:600,marginTop:8,background:C.koloL,padding:"4px 12px",borderRadius:20,display:"inline-block"}}>Kolo Pay</div>
</div>
<div style={{display:"flex",gap:8}}>
<Btn v="s" full sx={{flex:1}}>{Z.copy} Copier</Btn>
<Btn full sx={{flex:1}}>{Z.send} Partager</Btn>
</div>
<div style={{marginTop:16,fontSize:12,color:C.t3}}>Scannez ce QR pour recevoir un paiement via Kolo Pay, MTN ou Airtel Money</div>
</div>
:<div>
<div style={{width:"100%",height:300,background:C.card,borderRadius:24,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:`2px dashed ${C.blue}`,marginBottom:20,position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",inset:40,border:`3px solid ${C.blue}`,borderRadius:16,opacity:.3}}/>
<div style={{position:"absolute",top:40,left:40,width:24,height:24,borderTop:`4px solid ${C.blue}`,borderLeft:`4px solid ${C.blue}`,borderRadius:"4px 0 0 0"}}/>
<div style={{position:"absolute",top:40,right:40,width:24,height:24,borderTop:`4px solid ${C.blue}`,borderRight:`4px solid ${C.blue}`,borderRadius:"0 4px 0 0"}}/>
<div style={{position:"absolute",bottom:40,left:40,width:24,height:24,borderBottom:`4px solid ${C.blue}`,borderLeft:`4px solid ${C.blue}`,borderRadius:"0 0 0 4px"}}/>
<div style={{position:"absolute",bottom:40,right:40,width:24,height:24,borderBottom:`4px solid ${C.blue}`,borderRight:`4px solid ${C.blue}`,borderRadius:"0 0 4px 0"}}/>
<div style={{color:C.blue,marginBottom:12}}>{Z.cam}</div>
<div style={{fontSize:14,fontWeight:600,color:C.t1}}>Pointez la caméra</div>
<div style={{fontSize:12,color:C.t3,marginTop:4}}>vers un QR Likelemba</div>
</div>
<Btn v="s" full onClick={()=>setTab("my")}>Afficher mon QR</Btn>
</div>}
</Scroll>;}
function Remind({go}){const up=MEM.filter(m=>!m.ok);return <Scroll><Hdr title="Rappel" onBack={()=>go("back")}/><div style={{background:C.orangeL,borderRadius:16,padding:"14px 18px",marginBottom:18,border:`1px solid ${C.orange}20`}}><div style={{fontSize:13,fontWeight:700,color:C.orange}}>{up.length} en attente</div></div>{MEM.map(m=><div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:16,marginBottom:6,border:`1px solid ${C.brdL}`,opacity:m.ok?.5:1}}><Av ini={m.i} sz={40}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.n}</div></div><Bdg s={m.ok?"paid":"pending"}/></div>)}<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")}>Envoyer le rappel</Btn></div></Scroll>;}
function Sav({go}){return <Scroll><Hdr title="Objectifs d'épargne" onBack={()=>go("back")}/>{SAV.map(s=><div key={s.id} style={{background:C.card,borderRadius:16,padding:"16px 18px",marginBottom:10,border:`1px solid ${C.brdL}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:14,fontWeight:600,color:C.t1}}>{s.n}</span><span style={{fontSize:13,fontWeight:700,color:s.sv>=s.tg?C.green:C.gold}}>{fm(s.sv)}/{fm(s.tg)}</span></div><div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden"}}><div style={{width:`${Math.min(s.sv/s.tg*100,100)}%`,height:"100%",background:s.cl,borderRadius:4}}/></div></div>)}</Scroll>;}
function Rcpt({go}){return <Scroll><Hdr title="Reçus" onBack={()=>go("back")}/>{RCPT.map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:12,padding:16,background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`}}><div style={{width:42,height:42,borderRadius:12,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.doc}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{r.c}</div><div style={{fontSize:12,color:C.t3}}>{r.r} · {r.d}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:C.gold}}>{fm(r.a)} F</div><Bdg s={r.s}/></div></div>)}</Scroll>;}
function Withdraw({go}){const[amt,setAmt]=useState("");return <Scroll><Hdr title="Retrait Kolo Pay" onBack={()=>go("back")}/><div style={{background:C.card,borderRadius:20,padding:20,textAlign:"center",marginBottom:16,border:`1px solid ${C.brd}`}}><div style={{fontSize:13,color:C.t3}}>Solde</div><div style={{fontSize:28,fontWeight:800,color:C.gold}}>{fm(95000)} F</div></div><Inp label="Montant" ph="0" val={amt} set={setAmt} type="number"/><div style={{fontSize:12,color:C.t3,marginBottom:16}}>Vers MTN ou Airtel Money · Frais 1%</div><Btn full onClick={()=>go("ok")} dis={!amt}>Retirer</Btn></Scroll>;}
function TopUp({go}){const[amt,setAmt]=useState("");return <Scroll><Hdr title="Recharger Kolo Pay" onBack={()=>go("back")}/><div style={{display:"flex",gap:8,marginBottom:16}}>{[5000,10000,25000,50000].map(v=><button key={v} onClick={()=>setAmt(String(v))} style={{flex:1,padding:"10px 0",borderRadius:10,border:`1px solid ${amt===String(v)?C.blue:C.brd}`,background:amt===String(v)?C.blueL:C.card,color:amt===String(v)?C.blue:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{fm(v)}</button>)}</div><Inp label="Ou saisir un montant" ph="0" val={amt} set={setAmt} type="number"/><div style={{fontSize:12,color:C.t3,marginBottom:16}}>Depuis MTN ou Airtel Money</div><Btn full onClick={()=>go("ok")} dis={!amt}>Recharger {amt?fm(amt)+" F":""}</Btn></Scroll>;}
function MemberProf({go,mid}){const m=MEM.find(x=>x.id===mid)||MEM[0];return <Scroll><Hdr title="Profil membre" onBack={()=>go("back")}/><div style={{background:C.card,borderRadius:20,padding:24,textAlign:"center",border:`1px solid ${C.brd}`,marginBottom:16}}><Av ini={m.i} sz={64} col={C.blue}/><div style={{fontSize:18,fontWeight:700,color:C.t0,marginTop:10}}>{m.n}</div><div style={{fontSize:13,color:C.t3}}>{m.p}</div><div style={{display:"flex",gap:12,justifyContent:"center",marginTop:14}}>{[{l:"Tour",v:m.t,c:C.gold},{l:"Statut",v:m.ok?"Payé":"En attente",c:m.ok?C.green:C.orange}].map((s,i)=><div key={i} style={{padding:"8px 14px",background:C.bg,borderRadius:10}}><div style={{fontSize:14,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}</div></div></Scroll>;}
function LeaveCircle({go}){const[ok,setOk]=useState(false);return <Scroll><Hdr title="Quitter le cercle" onBack={()=>go("back")}/><div style={{textAlign:"center",marginBottom:24}}><div style={{width:64,height:64,borderRadius:20,background:C.redL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.red}}>{Z.warn}</div><h3 style={{fontSize:20,fontWeight:800,color:C.t0}}>Êtes-vous sûr ?</h3></div><div style={{background:C.redL,borderRadius:16,padding:16,marginBottom:20,border:`1px solid ${C.red}20`}}>{["Vous perdrez votre position","Cotisations non remboursées","30 jours avant de rejoindre à nouveau"].map((t,i)=><div key={i} style={{fontSize:12,color:C.t2,marginBottom:6,paddingLeft:12,borderLeft:`2px solid ${C.red}40`}}>{t}</div>)}</div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}><button onClick={()=>setOk(!ok)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${ok?C.red:C.brd}`,background:ok?C.red:"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{ok&&Z.okW}</button><span style={{fontSize:13,color:C.t2}}>Je comprends</span></div><Btn full onClick={()=>go("ok")} dis={!ok} sx={{background:ok?C.red:"#ccc",boxShadow:"none"}}>Quitter</Btn></Scroll>;}
function EditCircle({go}){return <Scroll><Hdr title="Modifier" onBack={()=>go("back")}/><Inp label="Nom" ph="Cercle Élite" val="Cercle Élite" set={()=>{}}/><Inp label="Montant" ph="25000" val="25000" set={()=>{}}/><Inp label="Pénalité (%)" ph="5" val="5" set={()=>{}}/><div style={{fontSize:14,fontWeight:600,color:C.t1,marginBottom:10}}>Membres</div>{MEM.map(m=><div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}><Av ini={m.i} sz={36}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{m.n}</div></div>{m.id!==1&&<button style={{fontSize:11,fontWeight:600,color:C.red,background:C.redL,border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>Exclure</button>}{m.id===1&&<span style={{fontSize:11,fontWeight:700,color:C.blue,background:C.blueL,padding:"4px 10px",borderRadius:8}}>Admin</span>}</div>)}<Btn full onClick={()=>go("ok")}>Enregistrer</Btn></Scroll>;}
function Calendar({go}){const ms=["Jan","Fév","Mar","Avr","Mai","Jun"];return <Scroll><Hdr title="Calendrier" onBack={()=>go("back")}/>{ms.map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${i===3?C.blue+"50":C.brdL}`,opacity:i<3?.6:1}}><div style={{width:44,height:44,borderRadius:14,background:i===3?C.blueL:i<3?C.greenL:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:10,fontWeight:700,color:i===3?C.blue:i<3?C.green:C.t3}}>{m}</span><span style={{fontSize:14,fontWeight:800,color:i===3?C.blue:i<3?C.green:C.t1}}>01</span></div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>Tour de {MEM[i%MEM.length].n}</div><div style={{fontSize:12,color:C.t3}}>{fm(25000)} FCFA</div></div>{i<3&&<Bdg s="paid"/>}{i===3&&<Bdg s="pending"/>}</div>)}</Scroll>;}
function CircleStats({go}){const data=[{l:"Jan",v:100},{l:"Fév",v:95},{l:"Mar",v:88},{l:"Avr",v:67}];return <Scroll><Hdr title="Statistiques" onBack={()=>go("back")}/><div style={{display:"flex",gap:10,marginBottom:16}}>{[{l:"Ponctualité",v:"87%",c:C.green,bg:C.greenL},{l:"Collecté",v:"402K",c:C.gold,bg:C.goldL},{l:"Pénalités",v:"2.5K",c:C.red,bg:C.redL}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"14px 8px",background:s.bg,borderRadius:14}}><div style={{fontSize:18,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}</div><div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`}}><div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:16}}>Collecte mensuelle (%)</div><div style={{display:"flex",alignItems:"flex-end",gap:8,height:120}}>{data.map((d,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><span style={{fontSize:10,fontWeight:600,color:C.blue}}>{d.v}%</span><div style={{width:"100%",borderRadius:6,height:`${d.v}%`,background:`linear-gradient(180deg,${C.blue},${C.blueD})`}}/><span style={{fontSize:10,color:C.t3}}>{d.l}</span></div>)}</div></div></Scroll>;}

// ── Marketplace/KYC/Credit Score/Kolo Card/SNBL/Promos ──
function Marketplace({go}){const pubs=[{id:10,name:"Cercle 50K",amt:50000,dur:"6 mois",mem:6,filled:4,minFee:0},{id:11,name:"Cercle 100K",amt:100000,dur:"10 mois",mem:10,filled:7,minFee:2},{id:12,name:"Cercle 25K",amt:25000,dur:"6 mois",mem:6,filled:2,minFee:0}];
return <Scroll><Hdr title="Cercles publics" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.blue},${C.blueD})`,borderRadius:16,padding:"16px 18px",marginBottom:16}}><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>25% de réduction !</div><div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>Sur vos 2 premiers versements</div></div>
{pubs.map(c=><div key={c.id} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><div><div style={{fontSize:16,fontWeight:700,color:C.t0}}>{c.name}</div><div style={{fontSize:12,color:C.t3}}>{c.dur} · {c.mem} membres</div></div><div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:800,color:C.gold}}>{fm(c.amt)} F</div></div></div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:11,color:C.t3}}>{c.filled}/{c.mem} places</span><span style={{fontSize:11,fontWeight:600,color:c.mem-c.filled<=2?C.red:C.green}}>{c.mem-c.filled} dispo</span></div>
<div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden",marginBottom:12}}><div style={{width:`${(c.filled/c.mem)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`}}/></div>
<Btn full onClick={()=>go("kyc")} sx={{padding:"10px 20px",fontSize:13}}>Rejoindre · dès {c.minFee}%</Btn></div>)}
</Scroll>;}
function KYC({go}){const[step,setStep]=useState(1);return <Scroll><Hdr title="Vérification KYC" onBack={()=>go("back")}/><div style={{display:"flex",gap:4,marginBottom:24}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?C.blue:C.brd}}/>)}</div>{step===1&&<div style={{textAlign:"center"}}><div style={{width:80,height:80,borderRadius:24,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,color:C.blue}}>{Z.doc}</div><h3 style={{fontSize:18,fontWeight:700,color:C.t0}}>Carte d'identité</h3><p style={{color:C.t3,fontSize:13,marginBottom:24}}>Photo recto de votre carte</p><div style={{background:C.card,borderRadius:20,height:180,border:`2px dashed ${C.brd}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.t3}}>{Z.cam} Capturer</div><Btn full onClick={()=>setStep(2)}>Suivant</Btn></div>}{step===2&&<div style={{textAlign:"center"}}><div style={{width:80,height:80,borderRadius:24,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,color:C.blue}}>{Z.usr}</div><h3 style={{fontSize:18,fontWeight:700,color:C.t0}}>Selfie</h3><div style={{width:200,height:200,borderRadius:"50%",margin:"20px auto",border:`3px dashed ${C.blue}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.cam}</div><Btn full onClick={()=>setStep(3)}>Vérifier</Btn></div>}{step===3&&<div style={{textAlign:"center",paddingTop:40}}><div style={{width:80,height:80,borderRadius:24,background:C.greenL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.green}}>{Z.shield}</div><h3 style={{fontSize:20,fontWeight:800,color:C.green}}>Vérifié !</h3><p style={{color:C.t3,fontSize:13,marginBottom:32}}>Vous pouvez rejoindre des cercles publics.</p><Btn full onClick={()=>go("ok")}>Continuer</Btn></div>}</Scroll>;}
function CreditScore({go}){const score=85;return <Scroll><Hdr title="Score de crédit" onBack={()=>go("back")}/><div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20}}><div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:8}}>Votre Score</div><div style={{position:"relative",width:120,height:120,margin:"0 auto 12px"}}><svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/><circle cx="60" cy="60" r="52" fill="none" stroke={C.gold} strokeWidth="8" strokeDasharray={`${score*3.27} 327`} strokeLinecap="round" transform="rotate(-90 60 60)"/></svg><div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}><div style={{fontSize:32,fontWeight:800,color:C.gold}}>{score}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>/ 100</div></div></div><div style={{fontSize:14,fontWeight:700,color:C.green}}>Excellent</div></div>{[{l:"Cotisations à temps",v:"12/12",p:100,c:C.green},{l:"Ancienneté",v:"6 mois",p:60,c:C.blue},{l:"Cercles complétés",v:"2",p:40,c:C.gold},{l:"Pénalités",v:"0",p:100,c:C.green}].map((f,i)=><div key={i} style={{background:C.card,borderRadius:14,padding:"12px 16px",marginBottom:8,border:`1px solid ${C.brdL}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{f.l}</span><span style={{fontSize:13,fontWeight:700,color:f.c}}>{f.v}</span></div><div style={{background:C.bg,borderRadius:3,height:4}}><div style={{width:`${f.p}%`,height:"100%",background:f.c,borderRadius:3}}/></div></div>)}</Scroll>;}
function KoloCard({go}){const[show,setShow]=useState(false);return <Scroll><Hdr title="Kolo Card" onBack={()=>go("back")}/><div style={{background:`linear-gradient(135deg,${C.navy},#1A3A6B)`,borderRadius:20,padding:"24px 22px",marginBottom:20,boxShadow:"0 12px 40px rgba(11,29,58,0.4)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:24}}><span style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.7)"}}>KOLO PAY</span><span style={{fontSize:12,fontWeight:600,color:C.gold}}>PREMIUM</span></div><div onClick={()=>setShow(!show)} style={{fontSize:18,fontWeight:600,color:"#fff",letterSpacing:3,marginBottom:20,cursor:"pointer"}}>{show?"5342 •••• •••• 8901":"•••• •••• •••• 8901"}</div><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>TITULAIRE</div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>JOELDY TSINA</div></div><div><div style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>EXPIRE</div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>12/28</div></div></div></div><div style={{display:"flex",gap:8,marginBottom:20}}><Btn full onClick={()=>go("topup")} sx={{flex:1}}>{Z.dn} Recharger</Btn><Btn v="s" full onClick={()=>{}} sx={{flex:1}}>{Z.gear} Gérer</Btn></div>{[{t:"Paiement magasin",d:"Tous les marchands Mastercard"},{t:"Achats en ligne",d:"Tous les sites e-commerce"},{t:"Cashback 5%",d:"Sur tous vos achats"},{t:"Retrait ATM",d:"Distributeurs partenaires"}].map((b,i)=><div key={i} style={{display:"flex",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}><div style={{width:36,height:36,borderRadius:10,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.shield}</div><div><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{b.t}</div><div style={{fontSize:11,color:C.t3}}>{b.d}</div></div></div>)}</Scroll>;}
function SNBL({go}){const plans=[{name:"Smartphone",target:150000,monthly:25000,dur:"6 mois",partner:"Airtel Shop",progress:60},{name:"Électroménager",target:300000,monthly:30000,dur:"10 mois",partner:"Shoprite",progress:20}];return <Scroll><Hdr title="Save Now, Buy Later" onBack={()=>go("back")}/><div style={{background:`linear-gradient(135deg,${C.blue},${C.blueD})`,borderRadius:20,padding:"18px 20px",marginBottom:16}}><div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Épargnez d'abord</div><div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Achetez sans dette. 0% d'intérêt.</div></div>{plans.map((p,i)=><div key={i} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div><div style={{fontSize:15,fontWeight:700,color:C.t0}}>{p.name}</div><div style={{fontSize:12,color:C.t3}}>{p.partner} · {p.dur}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:800,color:C.gold}}>{fm(p.target)} F</div><div style={{fontSize:10,color:C.t3}}>{fm(p.monthly)} F/mois</div></div></div>{p.progress>0&&<div><div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden",marginBottom:4}}><div style={{width:`${p.progress}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`}}/></div><div style={{fontSize:11,color:C.t3,textAlign:"right"}}>{p.progress}%</div></div>}<Btn full onClick={()=>go("ok")} sx={{padding:"10px 20px",fontSize:13,marginTop:8}}>{p.progress>0?"Cotiser":"Commencer"}</Btn></div>)}</Scroll>;}

// ── Lamu AI ──
function Lamu({go}){const[msg,setMsg]=useState("");const[msgs,setMsgs]=useState([{id:1,from:"lamu",text:"Mbote ! Je suis Lamu, votre assistant. Je peux vous aider avec vos cercles, votre score crédit, ou toute question."}]);const ref=useRef(null);
const doSend=()=>{if(!msg.trim())return;const u={id:Date.now(),from:"me",text:msg.trim()};const bot={id:Date.now()+1,from:"lamu",text:"Merci pour votre question ! Je vous recommande de consulter votre score crédit (85/100) pour voir vos options. Vous pouvez aussi rejoindre un cercle public pour maximiser votre épargne."};setMsgs(p=>[...p,u,bot]);setMsg("");setTimeout(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},50);};
return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}><div style={{padding:"12px 18px"}}><Hdr title="Lamu AI" onBack={()=>go("back")}/></div><div ref={ref} style={{flex:1,overflowY:"auto",padding:"0 18px 12px"}}>{msgs.map(m=><div key={m.id} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start",marginBottom:10}}>{m.from==="lamu"&&<div style={{width:28,height:28,borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.kolo})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff",fontWeight:700,flexShrink:0,marginRight:6}}>L</div>}<div style={{maxWidth:"80%",padding:"12px 16px",borderRadius:16,borderTopLeftRadius:m.from==="me"?16:4,borderTopRightRadius:m.from==="me"?4:16,background:m.from==="me"?C.blue:C.card,color:m.from==="me"?"#fff":C.t1,fontSize:13,lineHeight:1.5,whiteSpace:"pre-line",boxShadow:m.from==="me"?"none":C.sh}}>{m.text}</div></div>)}</div><div style={{padding:"8px 18px 16px",background:C.card,borderTop:`1px solid ${C.brd}`}}><div style={{display:"flex",gap:8}}><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSend()} placeholder="Posez une question..." style={{flex:1,padding:"12px 16px",borderRadius:50,border:`1px solid ${C.brd}`,background:C.bg,outline:"none",fontSize:14,color:C.t0}}/><button onClick={doSend} style={{width:44,height:44,borderRadius:22,background:`linear-gradient(135deg,${C.blue},${C.kolo})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0}}>{Z.send}</button></div></div></div>;}

// ── Group Goals ──
function GroupGoals({go}){const goals=[{n:"Mariage de Grace",target:2000000,saved:750000,members:8,col:C.gold},{n:"Excursion Pointe-Noire",target:500000,saved:350000,members:12,col:C.green}];return <Scroll><Hdr title="Objectifs de groupe" onBack={()=>go("back")}/>{goals.map((g,i)=>{const pct=Math.round(g.saved/g.target*100);return <div key={i} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div><div style={{fontSize:15,fontWeight:700,color:C.t0}}>{g.n}</div><div style={{fontSize:12,color:C.t3}}>{g.members} participants</div></div><div style={{fontSize:16,fontWeight:800,color:C.gold}}>{pct}%</div></div><div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,color:C.t3}}><span>{fm(g.saved)} / {fm(g.target)} F</span></div><div style={{background:C.bg,borderRadius:4,height:8,overflow:"hidden",marginBottom:12}}><div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${g.col},${C.gold})`}}/></div><Btn full onClick={()=>go("contribute")} sx={{padding:"10px 20px",fontSize:13}}>Contribuer</Btn></div>;})}</Scroll>;}

// ════════════ NEW FEATURES ════════════

// ── Gamification ──
function Gamification({go}){const level="Or";const pts=850;const nextLevel=1000;const pct=Math.round(pts/nextLevel*100);
const badges=[{n:"Premier cercle",ok:true},{n:"10 cotisations",ok:true},{n:"Zéro retard",ok:true},{n:"100K épargnés",ok:true},{n:"Ambassadeur",ok:false},{n:"Diamant",ok:false}];
const leaderboard=[{n:"Joeldy T.",pts:850,i:"JT"},{n:"Grace M.",pts:720,i:"GM"},{n:"Divine L.",pts:610,i:"DL"},{n:"Patrick K.",pts:480,i:"PK"}];
return <Scroll><Hdr title="Gamification" onBack={()=>go("back")}/>
{/* Level card */}
<div style={{background:`linear-gradient(135deg,${C.gold},${C.orange})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20,color:"#fff"}}>
<div style={{fontSize:48,marginBottom:4}}>🏆</div>
<div style={{fontSize:24,fontWeight:800}}>Niveau {level}</div>
<div style={{fontSize:14,opacity:.8,marginBottom:12}}>{pts} / {nextLevel} points</div>
<div style={{background:"rgba(255,255,255,0.3)",borderRadius:4,height:8,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:"#fff",borderRadius:4}}/></div>
<div style={{fontSize:11,marginTop:6,opacity:.7}}>{nextLevel-pts} pts pour Diamant</div>
</div>
{/* Streak */}
<div style={{background:C.card,borderRadius:16,padding:16,marginBottom:16,border:`1px solid ${C.brd}`,display:"flex",alignItems:"center",gap:14}}>
<div style={{color:C.orange}}>{Z.fire}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:C.t0}}>12 jours consécutifs</div><div style={{fontSize:12,color:C.t3}}>Record personnel !</div></div>
<div style={{fontSize:24,fontWeight:800,color:C.orange}}>🔥</div>
</div>
{/* Défi mensuel */}
<div style={{background:C.purpleL,borderRadius:16,padding:16,marginBottom:16,border:`1px solid ${C.purple}20`}}>
<div style={{fontSize:14,fontWeight:700,color:C.purple,marginBottom:4}}>Défi d'avril</div>
<div style={{fontSize:12,color:C.t2,marginBottom:8}}>Cotisez 3 fois cette semaine → +200 pts bonus</div>
<div style={{background:"rgba(124,58,237,0.15)",borderRadius:4,height:6}}><div style={{width:"66%",height:"100%",background:C.purple,borderRadius:4}}/></div>
<div style={{fontSize:11,color:C.t3,marginTop:4}}>2/3 complété</div>
</div>
{/* Badges */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Badges</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:20}}>
{badges.map((b,i)=><div key={i} style={{textAlign:"center",padding:"12px 8px",background:C.card,borderRadius:14,border:`1px solid ${b.ok?C.gold+"30":C.brdL}`,opacity:b.ok?1:.4}}>
<div style={{fontSize:24,marginBottom:4}}>{b.ok?"🏅":"🔒"}</div>
<div style={{fontSize:10,fontWeight:600,color:C.t1}}>{b.n}</div></div>)}
</div>
{/* Classement */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Classement amis</div>
{leaderboard.map((u,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:i===0?C.goldL:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${i===0?C.gold+"30":C.brdL}`}}>
<div style={{width:28,height:28,borderRadius:8,background:i===0?C.gold:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:i===0?"#fff":C.t3}}>{i+1}</div>
<Av ini={u.i} sz={36}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{u.n}</div></div>
<span style={{fontSize:14,fontWeight:700,color:C.gold}}>{u.pts} pts</span></div>)}
</Scroll>;}

// ── Family Wallet ──
function Family({go}){
const members=[{n:"Joeldy (vous)",role:"Admin",limit:"Illimité",bal:95000,i:"JT"},{n:"Marie T.",role:"Épouse",limit:"50 000 F/mois",bal:35000,i:"MT"},{n:"Junior T.",role:"Enfant",limit:"10 000 F/mois",bal:5000,i:"JR"}];
return <Scroll><Hdr title="Famille" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.red}15,${C.red}05)`,borderRadius:20,padding:20,marginBottom:16,border:`1px solid ${C.red}20`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,color:C.t3}}>Solde famille</span><span style={{fontSize:11,fontWeight:700,color:C.red,background:C.redL,padding:"3px 8px",borderRadius:6}}>FAMILLE</span></div>
<div style={{fontSize:28,fontWeight:800,color:C.t0}}>{fm(135000)} <span style={{fontSize:13,color:C.t3}}>FCFA</span></div>
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Membres</div>
{members.map((m,i)=><div key={i} style={{background:C.card,borderRadius:16,padding:16,marginBottom:8,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
<Av ini={m.i} sz={40}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.n}</div><div style={{fontSize:12,color:C.t3}}>{m.role} · Plafond: {m.limit}</div></div></div>
<div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderTop:`1px solid ${C.brd}`}}><span style={{fontSize:12,color:C.t3}}>Solde</span><span style={{fontSize:14,fontWeight:700,color:C.gold}}>{fm(m.bal)} F</span></div>
</div>)}
<Btn full onClick={()=>go("ok")}>{Z.plus} Ajouter un membre</Btn>
</Scroll>;}

// ── Tontine Express ──
function TontineExpress({go}){
const express=[{name:"Express Quotidien",amt:2000,dur:"7 jours",mem:7,filled:5,freq:"Chaque jour"},{name:"Express Hebdo",amt:5000,dur:"4 semaines",mem:4,filled:2,freq:"Chaque semaine"},{name:"Micro Tontine",amt:1000,dur:"10 jours",mem:10,filled:8,freq:"Chaque jour"}];
return <Scroll><Hdr title="Tontine Express" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.orange},${C.red})`,borderRadius:20,padding:"18px 20px",marginBottom:16,color:"#fff"}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span>{Z.fire}</span><span style={{fontSize:16,fontWeight:800}}>Tontine Express</span></div>
<div style={{fontSize:12,opacity:.8}}>Cercles rapides pour les petits montants. Idéal pour les commerçants et les épargnants quotidiens.</div>
</div>
{express.map((c,i)=><div key={i} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
<div><div style={{fontSize:15,fontWeight:700,color:C.t0}}>{c.name}</div><div style={{fontSize:12,color:C.t3}}>{c.freq} · {c.dur}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:800,color:C.gold}}>{fm(c.amt)} F</div><div style={{fontSize:10,color:C.t3}}>par tour</div></div></div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:11,color:C.t3}}><span>{c.filled}/{c.mem} places</span><span style={{fontWeight:600,color:c.mem-c.filled<=2?C.red:C.green}}>{c.mem-c.filled} dispo</span></div>
<div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden",marginBottom:12}}><div style={{width:`${(c.filled/c.mem)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.orange},${C.gold})`}}/></div>
<Btn full onClick={()=>go("ok")} sx={{padding:"10px 20px",fontSize:13}}>Rejoindre</Btn></div>)}
</Scroll>;}

// ── Split Bills ──
function SplitBills({go}){const[amt,setAmt]=useState("");const[desc,setDesc]=useState("");const[sel,setSel]=useState([]);
const friends=[{n:"Grace M.",i:"GM"},{n:"Patrick K.",i:"PK"},{n:"Merveille N.",i:"MN"},{n:"Divine L.",i:"DL"}];
const toggleFriend=(n)=>setSel(p=>p.includes(n)?p.filter(x=>x!==n):[...p,n]);
const perPerson=amt&&sel.length>0?Math.ceil(parseInt(amt)/(sel.length+1)):0;
return <Scroll><Hdr title="Partager les frais" onBack={()=>go("back")}/>
<Inp label="Description" ph="Ex: Dîner, Taxi, Cadeau..." val={desc} set={setDesc}/>
<Inp label="Montant total (FCFA)" ph="25000" val={amt} set={setAmt} type="number"/>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Partager avec</div>
{friends.map(f=><button key={f.n} onClick={()=>toggleFriend(f.n)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",width:"100%",background:sel.includes(f.n)?C.blueL:C.card,borderRadius:14,marginBottom:6,border:`1.5px solid ${sel.includes(f.n)?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<Av ini={f.i} sz={36}/><span style={{flex:1,fontSize:14,fontWeight:600,color:C.t1}}>{f.n}</span>
{sel.includes(f.n)&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}</button>)}
{perPerson>0&&<div style={{background:C.card,borderRadius:16,padding:16,marginTop:12,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,color:C.t3}}>Par personne ({sel.length+1})</span><span style={{fontSize:16,fontWeight:800,color:C.gold}}>{fm(perPerson)} F</span></div></div>}
<Btn full onClick={()=>go("ok")} dis={!amt||sel.length===0}>Envoyer les demandes</Btn>
</Scroll>;}

// ── Education ──
function Education({go}){
const courses=[{t:"Les bases de l'épargne",d:"Pourquoi et comment épargner chaque mois",dur:"5 min",done:true,col:C.green},{t:"Comprendre la tontine",d:"Comment fonctionne le système de rotation",dur:"8 min",done:true,col:C.blue},{t:"Gérer son budget",d:"La règle 50/30/20 adaptée au Congo",dur:"6 min",done:false,col:C.gold},{t:"Investir au Congo",d:"Les opportunités d'investissement local",dur:"10 min",done:false,col:C.purple},{t:"Score crédit expliqué",d:"Comment améliorer et utiliser votre score",dur:"4 min",done:false,col:C.orange}];
const tips=[{t:"Payez-vous d'abord",d:"Mettez 10% de côté dès que vous recevez de l'argent."},{t:"Cotisez automatiquement",d:"Programmez vos cotisations pour ne jamais être en retard."},{t:"Diversifiez vos cercles",d:"Rejoignez des cercles de durées différentes."}];
return <Scroll><Hdr title="Éducation financière" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.purple},${C.blue})`,borderRadius:20,padding:"18px 20px",marginBottom:16,color:"#fff"}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>{Z.book}<span style={{fontSize:16,fontWeight:800}}>Apprenez & Gagnez</span></div>
<div style={{fontSize:12,opacity:.8}}>Complétez les cours pour gagner des points bonus</div>
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Cours</div>
{courses.map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${c.done?C.green+"30":C.brdL}`,opacity:c.done?.7:1}}>
<div style={{width:44,height:44,borderRadius:14,background:c.col+"15",display:"flex",alignItems:"center",justifyContent:"center",color:c.col}}>{c.done?Z.ok:Z.book}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.t}</div><div style={{fontSize:12,color:C.t3}}>{c.d}</div><div style={{fontSize:11,color:C.t4,marginTop:2}}>{c.dur}</div></div>
{c.done?<Bdg s="completed"/>:<span style={{color:C.t4}}>{Z.fwd}</span>}</div>)}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:16,marginBottom:10}}>Tip du jour</div>
{tips.map((t,i)=><div key={i} style={{background:C.card,borderRadius:14,padding:"12px 16px",marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{fontSize:13,fontWeight:600,color:C.t1,marginBottom:2}}>{t.t}</div>
<div style={{fontSize:12,color:C.t3}}>{t.d}</div></div>)}
</Scroll>;}

// ── Dark Mode ──
function DarkMode({go}){const[dark,setDark]=useState(false);return <Scroll><Hdr title="Mode sombre" onBack={()=>go("back")}/>
<div style={{textAlign:"center",marginBottom:24,marginTop:20}}>
<div style={{width:80,height:80,borderRadius:24,background:dark?"#1a1a2e":"#f0f0f0",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:dark?"#fff":C.t1,transition:"all 0.3s"}}>{dark?Z.moon:Z.sun}</div>
<h3 style={{fontSize:20,fontWeight:700,color:C.t0}}>{dark?"Mode sombre activé":"Mode clair"}</h3>
<p style={{color:C.t3,fontSize:13,marginTop:6}}>Le mode sombre sera disponible dans la prochaine mise à jour</p>
</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px",background:C.card,borderRadius:16,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",gap:12}}><span style={{color:C.t1}}>{dark?Z.moon:Z.sun}</span><span style={{fontSize:14,fontWeight:600,color:C.t1}}>Mode sombre</span></div>
<Toggle v={dark} set={setDark}/>
</div>
<div style={{background:C.blueL,borderRadius:14,padding:14,marginTop:16,border:`1px solid ${C.blue}15`}}>
<div style={{fontSize:12,color:C.blue,fontWeight:600}}>Bientôt disponible</div>
<div style={{fontSize:11,color:C.t2,marginTop:4}}>Le mode sombre complet sera ajouté dans Likelemba v2.1</div>
</div>
</Scroll>;}

// ── Referral ──
function Referral({go}){
return <Scroll><Hdr title="Parrainage" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.green},#047857)`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20,color:"#fff"}}>
<div style={{fontSize:48,marginBottom:8}}>🎁</div>
<div style={{fontSize:22,fontWeight:800}}>5 000 FCFA</div>
<div style={{fontSize:13,opacity:.8,marginTop:4}}>Pour vous et votre filleul</div>
</div>
<div style={{background:C.card,borderRadius:16,padding:20,border:`1px solid ${C.brd}`,textAlign:"center",marginBottom:16}}>
<div style={{fontSize:13,color:C.t3,marginBottom:6}}>Votre code parrain</div>
<div style={{fontSize:22,fontWeight:800,color:C.blue,letterSpacing:2,marginBottom:12}}>JOELDY2026</div>
<Btn v="s" full>{Z.copy} Copier</Btn>
</div>
<div style={{display:"flex",gap:10,marginBottom:20}}>
{[{l:"Parrainés",v:"3",c:C.green},{l:"Gagnés",v:"15K",c:C.gold}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"14px",background:s.c+"12",borderRadius:14}}><div style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Mes filleuls</div>
{[{n:"Grace M.",date:"15 Mar 2026",bonus:5000,i:"GM"},{n:"Patrick K.",date:"22 Mar 2026",bonus:5000,i:"PK"},{n:"Divine L.",date:"01 Avr 2026",bonus:5000,i:"DL"}].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<Av ini={f.i} sz={36}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{f.n}</div><div style={{fontSize:11,color:C.t3}}>{f.date}</div></div><span style={{fontSize:13,fontWeight:700,color:C.green}}>+{fm(f.bonus)} F</span></div>)}
<div style={{marginTop:16}}><Btn full onClick={()=>go("invite")}>{Z.send} Inviter des amis</Btn></div>
</Scroll>;}

// ── Micro-Insurance ──
function Insurance({go}){
const plans=[{n:"Santé Basique",price:2500,cover:"Jusqu'à 100 000 F",desc:"Consultation + médicaments",col:C.blue},{n:"Santé Famille",price:7500,cover:"Jusqu'à 300 000 F",desc:"Toute la famille couverte",col:C.green},{n:"Protection Cercle",price:1000,cover:"Cotisation garantie",desc:"Si vous ne pouvez pas cotiser, l'assurance paie",col:C.gold}];
return <Scroll><Hdr title="Micro-assurance" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.blue},${C.navy})`,borderRadius:20,padding:"18px 20px",marginBottom:16,color:"#fff"}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>{Z.shield}<span style={{fontSize:16,fontWeight:800}}>Protégez-vous</span></div>
<div style={{fontSize:12,opacity:.8}}>Micro-assurance accessible dès 1 000 F/mois</div>
</div>
{plans.map((p,i)=><div key={i} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
<div><div style={{fontSize:15,fontWeight:700,color:C.t0}}>{p.n}</div><div style={{fontSize:12,color:C.t3}}>{p.desc}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:800,color:p.col}}>{fm(p.price)} F</div><div style={{fontSize:10,color:C.t3}}>/mois</div></div></div>
<div style={{background:p.col+"12",borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:12,color:p.col,fontWeight:600}}>Couverture: {p.cover}</div>
<Btn full onClick={()=>go("ok")} sx={{padding:"10px 20px",fontSize:13}}>Souscrire</Btn>
</div>)}
</Scroll>;}

// ── Success ──
function Ok({go}){const[s,setS]=useState(false);useEffect(()=>{setTimeout(()=>setS(true),100)},[]);
return <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.bg,padding:"40px 28px"}}>
<div style={{opacity:s?1:0,transform:s?"scale(1)":"scale(0.5)",transition:"all 0.5s cubic-bezier(0.34,1.56,0.64,1)",marginBottom:24}}>{Z.okBig}</div>
<h2 style={{fontSize:22,fontWeight:800,color:C.t0,opacity:s?1:0,transition:"opacity 0.4s ease 0.2s"}}>Succès !</h2>
<p style={{fontSize:14,color:C.t3,textAlign:"center",opacity:s?1:0,transition:"opacity 0.4s ease 0.3s"}}>Opération effectuée avec succès.</p>
<div style={{width:"100%",marginTop:32,opacity:s?1:0,transition:"opacity 0.4s ease 0.4s"}}><Btn full onClick={()=>go("home")}>Retour à l'accueil</Btn></div></div>;}

// ════════════ MAIN APP ════════════
export default function App(){
  const[sc,setSc]=useState("splash");
  const hist=useRef(["splash"]);
  const go=s=>{if(s==="back"){if(hist.current.length>1){hist.current.pop();setSc(hist.current[hist.current.length-1]);}else setSc("home");}else{hist.current.push(s);setSc(s);}};
  const cid=sc.startsWith("cd:")?parseInt(sc.split(":")[1]):null;
  const chatId=sc.startsWith("chat:")?parseInt(sc.split(":")[1]):null;
  const txId=sc.startsWith("txd:")?parseInt(sc.split(":")[1]):null;
  const memId=sc.startsWith("mem:")?parseInt(sc.split(":")[1]):null;
  const isHome=sc.startsWith("home");
  const noSB=["splash","onb","login","ok","pin","reg1","reg2","reg3","forgot"];

  const render=()=>{
    if(cid) return <CircleDetail go={go} cid={cid}/>;
    if(chatId) return <Chat go={go} cid={chatId}/>;
    if(txId) return <TxDetail go={go} id={txId}/>;
    if(memId) return <MemberProf go={go} mid={memId}/>;
    switch(sc){
      case "splash": return <Splash go={go}/>;
      case "onb": return <Onb go={go}/>;
      case "login": return <Login go={go}/>;
      case "reg1": return <Reg1 go={go}/>;
      case "reg2": return <Reg2 go={go}/>;
      case "reg3": return <Reg3 go={go}/>;
      case "forgot": return <Forgot go={go}/>;
      case "pin": return <Pin go={go}/>;
      case "home": case "home_c": case "home_h": case "home_p":
        return <Home go={go} initTab={sc==="home_c"?1:sc==="home_h"?2:sc==="home_p"?3:0}/>;
      case "contribute": return <Contribute go={go}/>;
      case "remind": return <Remind go={go}/>;
      case "qr": return <QR go={go}/>;
      case "wallets": return <Wallets go={go}/>;
      case "withdraw": return <Withdraw go={go}/>;
      case "topup": return <TopUp go={go}/>;
      case "transfer": return <Transfer go={go}/>;
      case "requestMoney": return <RequestMoney go={go}/>;
      case "bills": return <Bills go={go}/>;
      case "sav": return <Sav go={go}/>;
      case "rcpt": return <Rcpt go={go}/>;
      case "notif": return <Notif go={go}/>;
      case "editProfile": return <EditProfile go={go}/>;
      case "sec": return <Sec go={go}/>;
      case "lang": return <Lang go={go}/>;
      case "faq": return <FAQ go={go}/>;
      case "settings": return <Settings go={go}/>;
      case "createCircle": return <CreateCircle go={go}/>;
      case "joinCircle": return <JoinCircle go={go}/>;
      case "invite": return <Invite go={go}/>;
      case "leaveCircle": return <LeaveCircle go={go}/>;
      case "editCircle": return <EditCircle go={go}/>;
      case "calendar": return <Calendar go={go}/>;
      case "circleStats": return <CircleStats go={go}/>;
      case "market": return <Marketplace go={go}/>;
      case "kyc": return <KYC go={go}/>;
      case "creditScore": return <CreditScore go={go}/>;
      case "koloCard": return <KoloCard go={go}/>;
      case "snbl": return <SNBL go={go}/>;
      case "lamu": return <Lamu go={go}/>;
      case "groupGoals": return <GroupGoals go={go}/>;
      case "gamification": return <Gamification go={go}/>;
      case "family": return <Family go={go}/>;
      case "tontineExpress": return <TontineExpress go={go}/>;
      case "splitBills": return <SplitBills go={go}/>;
      case "education": return <Education go={go}/>;
      case "darkMode": return <DarkMode go={go}/>;
      case "referral": return <Referral go={go}/>;
      case "insurance": return <Insurance go={go}/>;
      case "ok": return <Ok go={go}/>;
      default: return <Home go={go}/>;
    }
  };

  return(
    <div className="lk-out">
      <style>{css}</style>
      <div className="lk-frame">
        <div className="lk-sb" style={{position:"absolute",top:0,left:0,right:0,zIndex:20,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 24px 6px",fontSize:13,fontWeight:600,color:C.t1}}>
            <span>9:41</span>
            <div style={{width:120,height:28,borderRadius:14,background:"#1A1A1A",position:"absolute",left:"50%",transform:"translateX(-50%)",top:6}}/>
            <div style={{display:"flex",gap:4,alignItems:"center"}}>
              <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="5" width="3" height="7" rx="0.5" fill="currentColor"/><rect x="4.5" y="3" width="3" height="9" rx="0.5" fill="currentColor"/><rect x="9" y="1" width="3" height="11" rx="0.5" fill="currentColor"/><rect x="13" y="0" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.3"/></svg>
              <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="0" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="16.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor"/><rect x="1.5" y="1.5" width="10" height="8" rx="1" fill={C.green}/></svg>
            </div>
        </div>
        <div style={{height:"100%",paddingTop:(noSB.includes(sc)||isHome)?0:16}}>{render()}</div>
      </div>
    </div>
  );
}

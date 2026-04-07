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
const MEM=[{id:1,n:"Joeldy Tsina",i:"JT",p:"+242 06 466 3469",ok:true,t:1,pen:0,img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces"},{id:2,n:"Grace Mouanda",i:"GM",p:"+242 05 512 8834",ok:true,t:2,pen:0,img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=faces"},{id:3,n:"Patrick Koumba",i:"PK",p:"+242 06 891 2245",ok:false,t:3,pen:1250,pseudo:"Le Sage",img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces"},{id:4,n:"Merveille Ngoma",i:"MN",p:"+242 05 334 7712",ok:true,t:4,pen:0,img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"},{id:5,n:"Blessing Obami",i:"BO",p:"+242 06 223 5501",ok:false,t:5,pen:1250,pseudo:"CG_Saver",img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces"},{id:6,n:"Divine Loemba",i:"DL",p:"+242 05 667 9983",ok:true,t:6,pen:0,img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces"}];
const CIR=[{id:1,name:"Cercle Élite",mem:6,amt:25000,freq:"Mensuel",tot:150000,prog:67,turn:"Joeldy Tsina",next:"01 Mai 2026",code:"ELITE2026",pen:5,created:"15 Jan 2026",admin:true},{id:2,name:"Cercle Amis",mem:8,amt:10000,freq:"Bi-mensuel",tot:80000,prog:45,turn:"Grace Mouanda",next:"15 Avr 2026",code:"AMIS2026",pen:5,created:"01 Fév 2026",admin:false},{id:3,name:"Cercle Business",mem:10,amt:50000,freq:"Mensuel",tot:500000,prog:30,turn:"Patrick Koumba",next:"01 Mai 2026",code:"BIZ2026",pen:10,created:"01 Mar 2026",admin:true}];
const TXS=[{id:1,t:"in",n:"Grace Mouanda",d:"Cotisation reçue",a:25000,dt:"Aujourd'hui",tm:"14:32",circle:"Cercle Élite",ref:"LK-TX-0891"},{id:2,t:"in",n:"Divine Loemba",d:"Cotisation reçue",a:25000,dt:"Aujourd'hui",tm:"13:10",circle:"Cercle Élite",ref:"LK-TX-0890"},{id:3,t:"out",n:"Cercle Élite",d:"Versement cotisation",a:25000,dt:"Hier",tm:"09:15",circle:"Cercle Élite",ref:"LK-TX-0889"},{id:4,t:"in",n:"Merveille Ngoma",d:"Cotisation reçue",a:25000,dt:"Hier",tm:"08:42",circle:"Cercle Élite",ref:"LK-TX-0888"},{id:5,t:"out",n:"Kolo Pay",d:"Retrait vers MTN",a:50000,dt:"03 Avr",tm:"16:20",circle:"",ref:"LK-TX-0880"},{id:6,t:"in",n:"Cercle Amis",d:"Gain tontine",a:80000,dt:"01 Avr",tm:"10:00",circle:"Cercle Amis",ref:"LK-TX-0870"}];
const WALLETS=[{id:0,n:"Kolo Pay",num:"Wallet interne",bal:95000,logo:"kolo",col:C.kolo,desc:"Votre portefeuille Likelemba"},{id:1,n:"MTN Mobile Money",num:"••• 3469",bal:175000,logo:"mtn",col:"#FFCC00",desc:""},{id:2,n:"Airtel Money",num:"••• 8834",bal:62000,logo:"airtel",col:"#ED1C24",desc:""}];
const NOTIFS=[{id:1,tp:"warn",tt:"Rappel cotisation",ds:"Cotisation Cercle Élite due dans 3 jours",tm:"Il y a 2h",rd:false},{id:2,tp:"in",tt:"Cotisation reçue",ds:"Grace M. a versé 25 000 FCFA",tm:"Il y a 5h",rd:false},{id:3,tp:"pen",tt:"Pénalité appliquée",ds:"Patrick K. pénalisé de 1 250 FCFA",tm:"Il y a 8h",rd:false},{id:4,tp:"gift",tt:"Votre tour approche !",ds:"Cagnotte Cercle Amis le 15 Avr",tm:"Hier",rd:true},{id:5,tp:"add",tt:"Nouveau membre",ds:"Blessing O. a rejoint Cercle Élite",tm:"Il y a 2j",rd:true}];
const RCPT=[{id:1,c:"Cercle Élite",a:25000,s:"paid",d:"05 Avr 2026",r:"LK-0412"},{id:2,c:"Cercle Amis",a:10000,s:"paid",d:"01 Avr 2026",r:"LK-0398"},{id:3,c:"Cercle Business",a:50000,s:"pending",d:"01 Mai 2026",r:"LK-0425"}];
const MSGS=[{id:1,from:"Grace Mouanda",ini:"GM",msg:"Salut tout le monde! N'oubliez pas la cotisation",time:"14:30",me:false},{id:2,from:"Joeldy Tsina",ini:"JT",msg:"Merci Grace! J'ai déjà cotisé.",time:"14:32",me:true},{id:3,from:"Divine Loemba",ini:"DL",msg:"Moi aussi c'est fait",time:"14:35",me:false},{id:4,from:"Grace Mouanda",ini:"GM",msg:"Super! Il reste Patrick et Blessing",time:"14:36",me:false},{id:5,from:"Joeldy Tsina",ini:"JT",msg:"Je vais leur envoyer un rappel",time:"14:38",me:true}];
const FAQS=[{q:"Comment créer un cercle ?",a:"Allez dans Cercles > Créer un cercle. Définissez le nom, montant, fréquence et invitez vos membres."},{q:"Qu'est-ce que Kolo Pay ?",a:"Kolo Pay est votre portefeuille interne Likelemba. Vos gains y sont déposés. Vous pouvez retirer vers MTN ou Airtel."},{q:"Comment fonctionne la pénalité ?",a:"Si un membre ne cotise pas à temps, une pénalité de 5-10% est automatiquement appliquée."}];
const SAV=[{id:1,n:"Terrain Brazzaville",tg:2000000,sv:850000,cl:C.blue},{id:2,n:"MacBook Pro",tg:800000,sv:320000,cl:C.purple},{id:3,n:"Fonds d'urgence",tg:500000,sv:500000,cl:C.green}];

// ── Components ──
const Btn=({children,onClick,v="p",full,sx,dis})=>{const m={p:{background:`linear-gradient(135deg,${C.blue},${C.blueD})`,color:"#fff",border:"none",boxShadow:"0 4px 16px rgba(26,86,219,0.25)"},s:{background:C.card,color:C.t1,border:`1.5px solid ${C.brd}`,boxShadow:"none"}};return <button disabled={dis} onClick={onClick} style={{...m[v],borderRadius:50,padding:"14px 28px",fontSize:14,fontWeight:600,cursor:dis?"not-allowed":"pointer",opacity:dis?.5:1,width:full?"100%":"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:8,...sx}}>{children}</button>;};
export const Av = ({ ini, sz = 44, col, img }) => {
  if (img) return <div style={{ width: sz, height: sz, borderRadius: sz / 2, overflow: "hidden", flexShrink: 0 }}><img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /></div>;
  const h = (ini.charCodeAt(0) * 37 + (ini[1]?.charCodeAt(0) || 0) * 97) % 360;
  return <div style={{ width: sz, height: sz, borderRadius: sz / 2, background: col || `hsl(${h},45%,92%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: sz * .36, fontWeight: 700, color: col ? "#fff" : `hsl(${h},45%,40%)`, flexShrink: 0 }}>{ini}</div>;
};
const Hdr=({title,onBack,right})=><div style={{display:"flex",alignItems:"center",padding:"6px 0 14px",gap:12}}>{onBack&&<button onClick={onBack} style={{background:C.card,border:`1px solid ${C.brd}`,borderRadius:12,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.t1}}>{Z.back}</button>}<span style={{flex:1,fontSize:18,fontWeight:700,color:C.t0}}>{title}</span>{right}</div>;
const Bdg=({s})=>{const m={paid:{bg:C.greenL,c:C.green,l:"Payé"},pending:{bg:C.orangeL,c:C.orange,l:"En attente"},completed:{bg:C.blueL,c:C.blue,l:"Complété"}};const x=m[s]||m.pending;return <span style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:20,background:x.bg,color:x.c}}>{x.l}</span>;};
const Inp=({label,ph,val,set,icon,type="text",area})=><div style={{marginBottom:16}}>{label&&<label style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:6,display:"block"}}>{label}</label>}<div style={{display:"flex",alignItems:area?"flex-start":"center",gap:10,padding:area?"12px 16px":"14px 16px",background:C.card,borderRadius:12,border:`1.5px solid ${C.brd}`}}>{icon&&<span style={{color:C.t3}}>{icon}</span>}{area?<textarea placeholder={ph} value={val} onChange={e=>set(e.target.value)} rows={3} style={{flex:1,border:"none",background:"none",outline:"none",fontSize:14,color:C.t0,resize:"none"}}/>:<input type={type} placeholder={ph} value={val||""} onChange={e=>set(e.target.value)} style={{flex:1,border:"none",background:"none",outline:"none",fontSize:15,color:C.t0,fontWeight:500}}/>}</div></div>;
const TxR=({tx,onClick})=><div onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${C.brd}`,cursor:onClick?"pointer":"default"}}><div style={{width:42,height:42,borderRadius:14,background:tx.t==="in"?C.greenL:C.redL,display:"flex",alignItems:"center",justifyContent:"center",color:tx.t==="in"?C.green:C.red}}>{tx.t==="in"?Z.dn:Z.up}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{tx.n}</div><div style={{fontSize:12,color:C.t3}}>{tx.d}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:tx.t==="in"?C.green:C.t1}}>{tx.t==="in"?"+":"-"}{fm(tx.a)} F</div><div style={{fontSize:11,color:C.t3}}>{tx.dt}</div></div></div>;
const Toggle=({v,set})=><button onClick={()=>set(!v)} style={{width:48,height:28,borderRadius:14,border:"none",cursor:"pointer",background:v?C.blue:C.brd,padding:2}}><div style={{width:24,height:24,borderRadius:12,background:"#fff",transform:v?"translateX(20px)":"translateX(0)",transition:"transform 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.15)"}}/></button>;
const MenuRow=({icon,label,onClick,right,color})=><button onClick={onClick} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",width:"100%",background:C.card,borderRadius:12,marginBottom:6,cursor:"pointer",border:`1px solid ${C.brdL}`,textAlign:"left"}} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background=C.card}><span style={{color:color||C.blue}}>{icon}</span><span style={{flex:1,fontSize:14,fontWeight:500,color:C.t1}}>{label}</span>{right||<span style={{color:C.t4}}>{Z.fwd}</span>}</button>;
export const Scroll = ({ children, pad = 40 }) => (
  <div style={{ height: "100%", background: C.bg, overflowY: "auto", padding: "16px 18px", paddingBottom: pad }}>{children}</div>
);

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
{[{ic:Z.dn,t:"Demander\nargent",s:"requestMoney"},{ic:Z.doc,t:"Factures",s:"bills"},{ic:Z.fire,t:"Tontine\nExpress",s:"tontineExpress"},{ic:Z.star,t:"Jeux &\nTirages",s:"luckyDraw"}].map((f,i)=><button key={i} onClick={()=>go(f.s)} style={{background:C.card,borderRadius:14,padding:"12px 4px",border:`1px solid ${C.brd}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,color:C.blue}}>{f.ic}<span style={{fontSize:10,fontWeight:600,color:C.t2,textAlign:"center",lineHeight:1.3,whiteSpace:"pre-line"}}>{f.t}</span></button>)}
</div>
{/* Banners */}
<div style={{display:"flex",gap:8,marginBottom:18}}>
<button onClick={()=>go("gamification")} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:`linear-gradient(135deg,${C.gold}15,${C.gold}05)`,borderRadius:14,padding:"12px 14px",border:`1px solid ${C.gold}25`,cursor:"pointer",textAlign:"left"}}><div style={{color:C.gold}}>{Z.star}</div><div><div style={{fontSize:12,fontWeight:700,color:C.gold}}>Niveau Or</div><div style={{fontSize:10,color:C.t3}}>850 pts</div></div></button>
<button onClick={()=>go("lamu")} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:`linear-gradient(135deg,${C.kolo}10,${C.blue}08)`,borderRadius:14,padding:"12px 14px",border:`1px solid ${C.kolo}20`,cursor:"pointer",textAlign:"left"}}><div style={{width:28,height:28,borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.kolo})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:700}}>L</div><div><div style={{fontSize:12,fontWeight:700,color:C.kolo}}>Lamu AI</div><div style={{fontSize:10,color:C.t3}}>Assistant</div></div></button>
</div>
<div style={{display:"flex",gap:8,marginBottom:18}}>
<button onClick={()=>go("savingsProgram")} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:`linear-gradient(135deg,${C.green}10,${C.green}05)`,borderRadius:14,padding:"12px 14px",border:`1px solid ${C.green}20`,cursor:"pointer",textAlign:"left"}}><div style={{color:C.green}}>{Z.tgt}</div><div><div style={{fontSize:12,fontWeight:700,color:C.green}}>Épargne +20%</div><div style={{fontSize:10,color:C.t3}}>Programme</div></div></button>
<button onClick={()=>go("smartSplit")} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:`linear-gradient(135deg,${C.blue}10,${C.kolo}05)`,borderRadius:14,padding:"12px 14px",border:`1px solid ${C.blue}20`,cursor:"pointer",textAlign:"left"}}><div style={{color:C.blue}}>{Z.tgt}</div><div><div style={{fontSize:12,fontWeight:700,color:C.blue}}>Smart Split</div><div style={{fontSize:10,color:C.t3}}>Optimiser</div></div></button>
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
<div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24,paddingTop:24}}>
<div style={{width:80,height:80,borderRadius:40,overflow:"hidden",border:`3px solid ${C.blue}`,boxShadow:"0 4px 20px rgba(26,86,219,0.2)"}}><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces" style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/></div>
<div style={{fontSize:18,fontWeight:700,color:C.t0,marginTop:10}}>Joeldy Tsina</div>
<div style={{fontSize:13,color:C.t3}}>+242 06 466 3469</div>
<div style={{fontSize:11,color:C.kolo,fontWeight:600,marginTop:4}}>Membre depuis Jan 2026</div>
<div style={{display:"flex",gap:12,justifyContent:"center",marginTop:14}}>{[{l:"Cercles",v:"3"},{l:"Cotisations",v:"36"},{l:"Score",v:"85"}].map((s,i)=><div key={i} style={{padding:"10px 20px",background:C.blueL,borderRadius:14}}><div style={{fontSize:18,fontWeight:800,color:C.blue}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}</div>
</div>
<MenuRow icon={Z.usr} label="Modifier le profil" onClick={()=>go("editProfile")}/>
<MenuRow icon={Z.shield} label="Sécurité & PIN" onClick={()=>go("sec")}/>
<MenuRow icon={Z.wal} label="Portefeuilles" onClick={()=>go("wallets")}/>
<MenuRow icon={Z.star} label="Gamification" onClick={()=>go("gamification")} color={C.gold}/>
<MenuRow icon={Z.tgt} label="Trust Score" onClick={()=>go("trustScore")} color={C.green}/>
<MenuRow icon={Z.doc} label="KYC Complet" onClick={()=>go("kycFull")} color={C.blue}/>
<MenuRow icon={Z.shield} label="Fonds de Garantie" onClick={()=>go("emergencyFund")} color={C.green}/>
<MenuRow icon={Z.heart} label="Famille" onClick={()=>go("family")} color={C.red}/>
<MenuRow icon={Z.tgt} label="Objectifs d'épargne" onClick={()=>go("sav")}/>
<MenuRow icon={Z.gift} label="Parrainage" onClick={()=>go("referral")} color={C.green}/>
<MenuRow icon={Z.book} label="Éducation financière" onClick={()=>go("education")} color={C.purple}/>
<MenuRow icon={Z.shield} label="Micro-assurance" onClick={()=>go("insurance")}/>
<MenuRow icon={Z.bell} label="Notifications" onClick={()=>go("notifPrefs")}/>
<MenuRow icon={Z.globe} label="Langue" onClick={()=>go("lang")}/>
<MenuRow icon={Z.moon} label="Mode sombre" onClick={()=>go("darkMode")}/>
<MenuRow icon={Z.star} label="Fidélité & Rewards" onClick={()=>go("loyalty")} color={C.gold}/>
<MenuRow icon={Z.tgt} label="Investir" onClick={()=>go("invest")} color={C.gold}/>
<MenuRow icon={Z.doc} label="Planificateur budget" onClick={()=>go("budgetPlanner")}/>
<MenuRow icon={Z.wal} label="Moyens de paiement" onClick={()=>go("payMethods")}/>
<MenuRow icon={Z.shield} label="Score bancaire" onClick={()=>go("creditBureau")} color={C.navy}/>
<MenuRow icon={Z.grp} label="Likelemba Business" onClick={()=>go("corporate")} color={C.navy}/>
<MenuRow icon={Z.cal} label="Paiement automatique" onClick={()=>go("autoPay")}/>
<MenuRow icon={Z.help} label="Support" onClick={()=>go("support")}/>
<MenuRow icon={Z.gear} label="Paramètres" onClick={()=>go("settings")}/>
<div style={{textAlign:"center",marginTop:16,fontSize:10,color:C.t4}}>Likelemba v2.0 · Lamuka Tech</div>
</div>;}

// ── Home Container ──
function Home({go,initTab=0}){const[tab,setTab]=useState(initTab);const tabs=[{ic:Z.home,l:"Accueil"},{ic:Z.grp,l:"Cercles"},{ic:Z.wal,l:"Historique"},{ic:Z.usr,l:"Profil"}];
const switchTab=(i)=>{setTab(i);go(["home","home_c","home_h","home_p"][i]);};
const tg=s=>{if(s==="_c")switchTab(1);else if(s==="_h")switchTab(2);else go(s);};
return <div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
<div style={{flex:1,overflowY:"auto",padding:"16px 18px",paddingBottom:100}}>
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
<div style={{display:"flex",gap:6,marginBottom:16}}>{[{l:"Stats",ic:Z.tgt,s:"circleStats"},{l:"Escrow",ic:Z.shield,s:"escrow"},{l:"Board",ic:Z.grp,s:"groupDashboard"},...(c.admin?[{l:"Rappel",ic:Z.bell,s:"remind"},{l:"Sanctions",ic:Z.warn,s:"sanctions",c:C.red},{l:"Modifier",ic:Z.gear,s:"editCircle"}]:[]),{l:"Quitter",ic:Z.warn,s:"leaveCircle",c:C.red}].map((a,i)=><button key={i} onClick={()=>go(a.s)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:C.card,border:`1px solid ${a.c?a.c+"20":C.brd}`,borderRadius:12,padding:"10px 0",cursor:"pointer",fontSize:10,fontWeight:600,color:a.c||C.t2}}>{a.ic}<span>{a.l}</span></button>)}</div>
{!c.admin&&<div style={{background:C.blueL,borderRadius:10,padding:"8px 14px",marginBottom:12,fontSize:12,color:C.t2}}>Admin: <span style={{fontWeight:700,color:C.t1}}>Grace M.</span></div>}
{/* Tabs */}
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:16,border:`1px solid ${C.brd}`}}>{[{k:"m",l:"Membres"},{k:"r",l:"Rotation"},{k:"g",l:"Règles"}].map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t.k?C.blue:"transparent",color:tab===t.k?"#fff":C.t3,fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.l}</button>)}</div>
{tab==="m"&&<div><div style={{fontSize:12,color:C.t3,marginBottom:10}}><span style={{color:C.green,fontWeight:700}}>{paid}</span> payé(s) · <span style={{color:C.red,fontWeight:700}}>{MEM.length-paid}</span> en attente</div>{MEM.map(m=><div key={m.id} onClick={()=>go("mem:"+m.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:16,marginBottom:6,border:`1px solid ${C.brdL}`,cursor:"pointer"}}><Av ini={m.pseudo?m.pseudo.slice(0,2):m.i} sz={40} img={m.img}/><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}><span style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.admin?m.n:(m.pseudo||m.n)}</span>{m.pseudo&&<span style={{fontSize:9,fontWeight:700,color:C.purple,background:C.purpleL,padding:"2px 6px",borderRadius:4}}>PSEUDO</span>}{((c.admin&&m.id===1)||(!c.admin&&m.id===2))&&<span style={{fontSize:9,fontWeight:700,color:C.blue,background:C.blueL,padding:"2px 6px",borderRadius:4}}>ADMIN</span>}</div><div style={{fontSize:12,color:C.t3}}>{c.admin?m.p:(m.pseudo?"Membre anonyme":m.p)}{m.pen>0&&<span style={{color:C.red}}> · Pénalité: {fm(m.pen)} F</span>}</div>{c.admin&&m.pseudo&&<div style={{fontSize:11,color:C.purple,marginTop:2}}>Pseudo : {m.pseudo}</div>}</div><div style={{textAlign:"center",marginRight:8}}><div style={{fontSize:9,color:C.t3,fontWeight:600}}>TOUR</div><div style={{fontSize:16,fontWeight:800,color:C.gold}}>{m.t}</div></div><Bdg s={m.ok?"paid":"pending"}/></div>)}</div>}
{tab==="r"&&MEM.map((m,i)=><div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:i===0?C.blueL:C.card,borderRadius:16,marginBottom:6,border:`1.5px solid ${i===0?C.blue+"40":C.brdL}`}}><div style={{width:30,height:30,borderRadius:8,background:i===0?C.blue:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:i===0?"#fff":C.t3}}>{m.t}</div><Av ini={m.i} sz={36} img={m.img}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{m.n}</div></div><span style={{fontSize:14,fontWeight:700,color:i===0?C.gold:C.t4}}>{fm(c.tot)} F</span></div>)}
{tab==="g"&&[{l:"Montant/tour",v:fm(c.amt)+" FCFA"},{l:"Fréquence",v:c.freq},{l:"Membres",v:c.mem},{l:"Pénalité",v:c.pen+"%"},{l:"Paiement",v:"Kolo Pay / Mobile Money"},{l:"Code",v:c.code}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"13px 16px",background:C.card,borderRadius:12,marginBottom:6,border:`1px solid ${C.brdL}`}}><span style={{fontSize:13,color:C.t3}}>{r.l}</span><span style={{fontSize:13,fontWeight:700,color:C.t1}}>{r.v}</span></div>)}
</Scroll>;}

function Chat({go,cid}){const c=CIR.find(x=>x.id===cid)||CIR[0];const[msg,setMsg]=useState("");const[msgs,setMsgs]=useState(MSGS);const ref=useRef(null);
const doSend=()=>{if(!msg.trim())return;setMsgs(p=>[...p,{id:Date.now(),from:"Joeldy Tsina",ini:"JT",msg:msg.trim(),time:new Date().toLocaleTimeString("fr",{hour:"2-digit",minute:"2-digit"}),me:true}]);setMsg("");setTimeout(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},50);};
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
function Wallets({go}){const tot=WALLETS.reduce((s,a)=>s+a.bal,0);const[sb,setSb]=useState(true);
return <Scroll><Hdr title="Portefeuilles" onBack={()=>go("back")}/>
{/* Premium balance card */}
<div style={{background:`linear-gradient(135deg,${C.navy},#1A3A6B)`,borderRadius:24,padding:"24px 20px",marginBottom:16,boxShadow:"0 12px 40px rgba(11,29,58,0.3)",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:60,background:"rgba(255,255,255,0.04)"}}/>
<div style={{position:"absolute",bottom:-40,left:-20,width:100,height:100,borderRadius:50,background:"rgba(255,255,255,0.03)"}}/>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<span style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:600,letterSpacing:0.5}}>SOLDE TOTAL</span>
<button onClick={()=>setSb(!sb)} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer",color:"rgba(255,255,255,0.6)",display:"flex",alignItems:"center",gap:4,fontSize:11}}>{sb?Z.eye:Z.eyeX} {sb?"Masquer":"Afficher"}</button>
</div>
<div style={{fontSize:34,fontWeight:800,color:"#fff",marginBottom:4}}>{sb?fm(tot):"••• •••"} <span style={{fontSize:14,fontWeight:500,color:"rgba(255,255,255,0.4)"}}>FCFA</span></div>
{/* Mini wallet breakdown */}
<div style={{display:"flex",gap:12,marginTop:16}}>
{WALLETS.map(w=><div key={w.id} style={{flex:1,background:"rgba(255,255,255,0.08)",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
<SvgIc type={w.logo} size={20}/>
<div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.7)",marginTop:4}}>{sb?fm(w.bal):"•••"}</div>
<div style={{fontSize:9,color:"rgba(255,255,255,0.4)",marginTop:2}}>{w.id===0?"Kolo Pay":w.id===1?"MTN":"Airtel"}</div>
</div>)}
</div>
</div>
{/* Action buttons */}
<div style={{display:"flex",gap:8,marginBottom:16}}>
<Btn full onClick={()=>go("topup")} sx={{flex:1}}>{Z.dn} Recharger</Btn>
<Btn v="s" full onClick={()=>go("withdraw")} sx={{flex:1}}>{Z.up} Retirer</Btn>
<Btn v="s" full onClick={()=>go("transfer")} sx={{flex:1}}>{Z.send} Envoyer</Btn>
</div>
{/* Wallet cards */}
{WALLETS.map(w=><div key={w.id} style={{background:C.card,borderRadius:16,padding:18,marginBottom:10,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><SvgIc type={w.logo} size={28}/><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:C.t1}}>{w.n}</div><div style={{fontSize:12,color:C.t3}}>{w.num}</div></div>{w.id===0&&<span style={{fontSize:10,fontWeight:700,color:C.kolo,background:C.koloL,padding:"3px 8px",borderRadius:6}}>INTERNE</span>}</div>
<div style={{fontSize:22,fontWeight:800,color:C.gold}}>{fm(w.bal)} <span style={{fontSize:13,color:C.t3}}>FCFA</span></div></div>)}
</Scroll>;}

// ── Transfer P2P ──
function Transfer({go}){const[amt,setAmt]=useState("");const contacts=[{n:"Grace Mouanda",p:"+242 05 512 8834",i:"GM",img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=faces"},{n:"Patrick Koumba",p:"+242 06 891 2245",i:"PK",img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces"},{n:"Merveille Ngoma",p:"+242 05 334 7712",i:"MN",img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"}];
return <Scroll><Hdr title="Envoyer" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:"24px 20px",textAlign:"center",marginBottom:16,border:`1px solid ${C.brd}`}}><div style={{fontSize:13,color:C.t3,marginBottom:8}}>Montant</div><div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0" style={{fontSize:36,fontWeight:800,color:C.gold,border:"none",background:"none",outline:"none",width:160,textAlign:"center"}}/><span style={{fontSize:16,fontWeight:600,color:C.t3}}>FCFA</span></div></div>
<div style={{display:"flex",gap:8,marginBottom:16}}>{[5000,10000,25000,50000].map(v=><button key={v} onClick={()=>setAmt(String(v))} style={{flex:1,padding:"10px 0",borderRadius:10,border:`1px solid ${amt===String(v)?C.blue:C.brd}`,background:amt===String(v)?C.blueL:C.card,color:amt===String(v)?C.blue:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{fm(v)}</button>)}</div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Contacts</div>
{contacts.map((c,i)=><button key={i} onClick={()=>go("ok")} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",width:"100%",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`,cursor:"pointer",textAlign:"left"}}><Av ini={c.i} sz={40} img={c.img}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.n}</div><div style={{fontSize:12,color:C.t3}}>{c.p}</div></div><span style={{color:C.t4}}>{Z.fwd}</span></button>)}
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
function EditProfile({go}){return <Scroll><Hdr title="Modifier le profil" onBack={()=>go("back")}/><div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24}}><div style={{width:80,height:80,borderRadius:40,overflow:"hidden",border:`3px solid ${C.blue}`,position:"relative"}}><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces" style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/><button style={{position:"absolute",bottom:0,right:0,width:28,height:28,borderRadius:14,background:C.gold,border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:0}}>{Z.cam}</button></div></div><Inp label="Nom complet" ph="Joeldy Tsina" val="Joeldy Tsina" set={()=>{}}/><Inp label="Téléphone" ph="+242 06 466 3469" val="+242 06 466 3469" set={()=>{}}/><Inp label="Email" ph="joeldytsina94@gmail.com" val="joeldytsina94@gmail.com" set={()=>{}}/><Btn full onClick={()=>go("back")}>Enregistrer</Btn></Scroll>;}
function Sec({go}){return <Scroll><Hdr title="Sécurité" onBack={()=>go("back")}/><MenuRow icon={Z.lock} label="Changer le PIN" onClick={()=>go("ok")}/><MenuRow icon={Z.lock} label="Changer le mot de passe" onClick={()=>go("ok")}/><MenuRow icon={Z.shield} label="2FA" right={<span style={{fontSize:12,fontWeight:700,color:C.green}}>Activé</span>}/><MenuRow icon={Z.phone} label="Biométrie" right={<span style={{fontSize:12,fontWeight:700,color:C.green}}>Activé</span>}/></Scroll>;}
function Settings({go}){const[n,sN]=useState(true);const[b,sB]=useState(true);return <Scroll><Hdr title="Paramètres" onBack={()=>go("back")}/>{[{l:"Notifications push",v:n,s:sN},{l:"Biométrie",v:b,s:sB}].map((t,i)=><div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`}}><span style={{fontSize:14,color:C.t1}}>{t.l}</span><Toggle v={t.v} set={t.s}/></div>)}<MenuRow icon={Z.shield} label="Sécurité" onClick={()=>go("sec")}/><MenuRow icon={Z.globe} label="Langue" onClick={()=>go("lang")}/><MenuRow icon={Z.help} label="FAQ" onClick={()=>go("faq")}/><div style={{marginTop:20}}><button onClick={()=>go("login")} style={{width:"100%",padding:"14px",borderRadius:50,border:`1.5px solid ${C.red}`,background:"none",color:C.red,fontSize:14,fontWeight:600,cursor:"pointer"}}>Se déconnecter</button></div></Scroll>;}
function Lang({go}){return <Scroll><Hdr title="Langue" onBack={()=>go("back")}/>{[{n:"Français",f:"FR",a:true},{n:"Lingala",f:"LN",a:false},{n:"English",f:"EN",a:false}].map(l=><div key={l.f} style={{display:"flex",alignItems:"center",gap:14,padding:"16px",background:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${l.a?C.blue:C.brdL}`,cursor:"pointer"}}><div style={{width:36,height:36,borderRadius:10,background:l.a?C.blueL:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:l.a?C.blue:C.t3}}>{l.f}</div><span style={{flex:1,fontSize:14,fontWeight:600,color:C.t1}}>{l.n}</span>{l.a&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}</div>)}</Scroll>;}
function FAQ({go}){const[o,setO]=useState(null);return <Scroll><Hdr title="FAQ" onBack={()=>go("back")}/>{FAQS.map((f,i)=><div key={i} style={{background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`,overflow:"hidden"}}><button onClick={()=>setO(o===i?null:i)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}><span style={{fontSize:14,fontWeight:600,color:C.t1,flex:1}}>{f.q}</span><span style={{color:C.t3,transform:o===i?"rotate(90deg)":"none",transition:"0.2s"}}>{Z.fwd}</span></button>{o===i&&<div style={{padding:"0 16px 16px",fontSize:13,color:C.t2,lineHeight:1.5}}>{f.a}</div>}</div>)}</Scroll>;}

// ── Create/Join/Invite/QR/Remind/Savings/Receipts ──
function CreateCircle({go}){const[name,setName]=useState("");const[amt,setAmt]=useState("");return <Scroll><Hdr title="Créer un cercle" onBack={()=>go("back")}/><Inp label="Nom" ph="Ex: Cercle Famille" val={name} set={setName}/><Inp label="Montant/tour (FCFA)" ph="25000" val={amt} set={setAmt} type="number"/><div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:6,display:"block"}}>Fréquence</label><div style={{display:"flex",gap:8}}>{["Hebdo","Bi-mensuel","Mensuel"].map(f=><button key={f} style={{flex:1,padding:"12px 0",borderRadius:12,border:"none",cursor:"pointer",background:f==="Mensuel"?C.blue:C.card,color:f==="Mensuel"?"#fff":C.t2,fontSize:13,fontWeight:600}}>{f}</button>)}</div></div><Btn full onClick={()=>go("ok")} dis={!name||!amt}>Créer</Btn></Scroll>;}
function JoinCircle({go}){const[code,setCode]=useState("");const[anon,setAnon]=useState(false);const[pseudo,setPseudo]=useState("");
return <Scroll><Hdr title="Rejoindre" onBack={()=>go("back")}/>
<div style={{textAlign:"center",marginBottom:24}}><div style={{width:60,height:60,borderRadius:20,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.blue}}>{Z.link}</div><h3 style={{fontSize:18,fontWeight:700,color:C.t0}}>Code d'invitation</h3><p style={{fontSize:13,color:C.t3,marginTop:4}}>Entrez le code partagé par l'admin</p></div>
<Inp label="Code du cercle" ph="ELITE2026" val={code} set={setCode}/>
{/* Anonymous toggle */}
<div style={{background:C.card,borderRadius:16,padding:16,marginBottom:16,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:anon?12:0}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><span style={{color:C.purple}}>{Z.usr}</span><div><div style={{fontSize:14,fontWeight:600,color:C.t1}}>Rejoindre en anonyme</div><div style={{fontSize:11,color:C.t3}}>Les membres verront votre pseudo</div></div></div>
<Toggle v={anon} set={setAnon}/></div>
{anon&&<div>
<div style={{background:C.purpleL,borderRadius:10,padding:"8px 12px",marginBottom:12,fontSize:12,color:C.purple,border:`1px solid ${C.purple}15`}}>Votre vrai nom reste visible uniquement par l'admin du cercle</div>
<Inp label="Pseudo" ph="Ex: Le Sage, Mbongo242, CG_Saver..." val={pseudo} set={setPseudo} icon={Z.usr}/>
</div>}
</div>
<div style={{textAlign:"center",marginBottom:16}}><span style={{fontSize:13,color:C.t3}}>ou</span></div>
<Btn v="s" full onClick={()=>go("qr")}>{Z.qr} Scanner un QR code</Btn>
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")} dis={!code||(anon&&!pseudo)}>Rejoindre{anon?" en tant que "+pseudo:""}</Btn></div>
</Scroll>;}
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
function Remind({go}){const up=MEM.filter(m=>!m.ok);return <Scroll><Hdr title="Rappel" onBack={()=>go("back")}/><div style={{background:C.orangeL,borderRadius:16,padding:"14px 18px",marginBottom:18,border:`1px solid ${C.orange}20`}}><div style={{fontSize:13,fontWeight:700,color:C.orange}}>{up.length} en attente</div></div>{MEM.map(m=><div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:16,marginBottom:6,border:`1px solid ${C.brdL}`,opacity:m.ok?.5:1}}><Av ini={m.i} sz={40} img={m.img}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.n}</div></div><Bdg s={m.ok?"paid":"pending"}/></div>)}<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")}>Envoyer le rappel</Btn></div></Scroll>;}
function Sav({go}){return <Scroll><Hdr title="Objectifs d'épargne" onBack={()=>go("back")}/>{SAV.map(s=><div key={s.id} style={{background:C.card,borderRadius:16,padding:"16px 18px",marginBottom:10,border:`1px solid ${C.brdL}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:14,fontWeight:600,color:C.t1}}>{s.n}</span><span style={{fontSize:13,fontWeight:700,color:s.sv>=s.tg?C.green:C.gold}}>{fm(s.sv)}/{fm(s.tg)}</span></div><div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden"}}><div style={{width:`${Math.min(s.sv/s.tg*100,100)}%`,height:"100%",background:s.cl,borderRadius:4}}/></div></div>)}</Scroll>;}
function Rcpt({go}){return <Scroll><Hdr title="Reçus" onBack={()=>go("back")}/>{RCPT.map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:12,padding:16,background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`}}><div style={{width:42,height:42,borderRadius:12,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.doc}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{r.c}</div><div style={{fontSize:12,color:C.t3}}>{r.r} · {r.d}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:C.gold}}>{fm(r.a)} F</div><Bdg s={r.s}/></div></div>)}</Scroll>;}
function Withdraw({go}){const[amt,setAmt]=useState("");return <Scroll><Hdr title="Retrait Kolo Pay" onBack={()=>go("back")}/><div style={{background:C.card,borderRadius:20,padding:20,textAlign:"center",marginBottom:16,border:`1px solid ${C.brd}`}}><div style={{fontSize:13,color:C.t3}}>Solde</div><div style={{fontSize:28,fontWeight:800,color:C.gold}}>{fm(95000)} F</div></div><Inp label="Montant" ph="0" val={amt} set={setAmt} type="number"/><div style={{fontSize:12,color:C.t3,marginBottom:16}}>Vers MTN ou Airtel Money · Frais 1%</div><Btn full onClick={()=>go("ok")} dis={!amt}>Retirer</Btn></Scroll>;}
function TopUp({go}){const[amt,setAmt]=useState("");return <Scroll><Hdr title="Recharger Kolo Pay" onBack={()=>go("back")}/><div style={{display:"flex",gap:8,marginBottom:16}}>{[5000,10000,25000,50000].map(v=><button key={v} onClick={()=>setAmt(String(v))} style={{flex:1,padding:"10px 0",borderRadius:10,border:`1px solid ${amt===String(v)?C.blue:C.brd}`,background:amt===String(v)?C.blueL:C.card,color:amt===String(v)?C.blue:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{fm(v)}</button>)}</div><Inp label="Ou saisir un montant" ph="0" val={amt} set={setAmt} type="number"/><div style={{fontSize:12,color:C.t3,marginBottom:16}}>Depuis MTN ou Airtel Money</div><Btn full onClick={()=>go("ok")} dis={!amt}>Recharger {amt?fm(amt)+" F":""}</Btn></Scroll>;}
function MemberProf({go,mid}){const m=MEM.find(x=>x.id===mid)||MEM[0];return <Scroll><Hdr title="Profil membre" onBack={()=>go("back")}/><div style={{background:C.card,borderRadius:20,padding:24,textAlign:"center",border:`1px solid ${C.brd}`,marginBottom:16}}><Av ini={m.i} sz={64} img={m.img}/><div style={{fontSize:18,fontWeight:700,color:C.t0,marginTop:10}}>{m.n}</div><div style={{fontSize:13,color:C.t3}}>{m.p}</div><div style={{display:"flex",gap:12,justifyContent:"center",marginTop:14}}>{[{l:"Tour",v:m.t,c:C.gold},{l:"Statut",v:m.ok?"Payé":"En attente",c:m.ok?C.green:C.orange}].map((s,i)=><div key={i} style={{padding:"8px 14px",background:C.bg,borderRadius:10}}><div style={{fontSize:14,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}</div></div></Scroll>;}
function LeaveCircle({go}){const[ok,setOk]=useState(false);return <Scroll><Hdr title="Quitter le cercle" onBack={()=>go("back")}/><div style={{textAlign:"center",marginBottom:24}}><div style={{width:64,height:64,borderRadius:20,background:C.redL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.red}}>{Z.warn}</div><h3 style={{fontSize:20,fontWeight:800,color:C.t0}}>Êtes-vous sûr ?</h3></div><div style={{background:C.redL,borderRadius:16,padding:16,marginBottom:20,border:`1px solid ${C.red}20`}}>{["Vous perdrez votre position","Cotisations non remboursées","30 jours avant de rejoindre à nouveau"].map((t,i)=><div key={i} style={{fontSize:12,color:C.t2,marginBottom:6,paddingLeft:12,borderLeft:`2px solid ${C.red}40`}}>{t}</div>)}</div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}><button onClick={()=>setOk(!ok)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${ok?C.red:C.brd}`,background:ok?C.red:"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{ok&&Z.okW}</button><span style={{fontSize:13,color:C.t2}}>Je comprends</span></div><Btn full onClick={()=>go("ok")} dis={!ok} sx={{background:ok?C.red:"#ccc",boxShadow:"none"}}>Quitter</Btn></Scroll>;}
function EditCircle({go}){return <Scroll><Hdr title="Modifier" onBack={()=>go("back")}/><Inp label="Nom" ph="Cercle Élite" val="Cercle Élite" set={()=>{}}/><Inp label="Montant" ph="25000" val="25000" set={()=>{}}/><Inp label="Pénalité (%)" ph="5" val="5" set={()=>{}}/><div style={{fontSize:14,fontWeight:600,color:C.t1,marginBottom:10}}>Membres</div>{MEM.map(m=><div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}><Av ini={m.i} sz={36} img={m.img}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{m.n}</div></div>{m.id!==1&&<button style={{fontSize:11,fontWeight:600,color:C.red,background:C.redL,border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>Exclure</button>}{m.id===1&&<span style={{fontSize:11,fontWeight:700,color:C.blue,background:C.blueL,padding:"4px 10px",borderRadius:8}}>Admin</span>}</div>)}<Btn full onClick={()=>go("ok")}>Enregistrer</Btn></Scroll>;}
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
<Btn full onClick={()=>go("slotSelect")} sx={{padding:"10px 20px",fontSize:13}}>Choisir un tour · dès {c.minFee}%</Btn></div>)}
</Scroll>;}
function KYC({go}){const[step,setStep]=useState(1);return <Scroll><Hdr title="Vérification KYC" onBack={()=>go("back")}/><div style={{display:"flex",gap:4,marginBottom:24}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?C.blue:C.brd}}/>)}</div>{step===1&&<div style={{textAlign:"center"}}><div style={{width:80,height:80,borderRadius:24,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,color:C.blue}}>{Z.doc}</div><h3 style={{fontSize:18,fontWeight:700,color:C.t0}}>Carte d'identité</h3><p style={{color:C.t3,fontSize:13,marginBottom:24}}>Photo recto de votre carte</p><div style={{background:C.card,borderRadius:20,height:180,border:`2px dashed ${C.brd}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.t3}}>{Z.cam} Capturer</div><Btn full onClick={()=>setStep(2)}>Suivant</Btn></div>}{step===2&&<div style={{textAlign:"center"}}><div style={{width:80,height:80,borderRadius:24,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,color:C.blue}}>{Z.usr}</div><h3 style={{fontSize:18,fontWeight:700,color:C.t0}}>Selfie</h3><div style={{width:200,height:200,borderRadius:"50%",margin:"20px auto",border:`3px dashed ${C.blue}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.cam}</div><Btn full onClick={()=>setStep(3)}>Vérifier</Btn></div>}{step===3&&<div style={{textAlign:"center",paddingTop:40}}><div style={{width:80,height:80,borderRadius:24,background:C.greenL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.green}}>{Z.shield}</div><h3 style={{fontSize:20,fontWeight:800,color:C.green}}>Vérifié !</h3><p style={{color:C.t3,fontSize:13,marginBottom:32}}>Vous pouvez rejoindre des cercles publics.</p><Btn full onClick={()=>go("ok")}>Continuer</Btn></div>}</Scroll>;}
function CreditScore({go}){const score=85;return <Scroll><Hdr title="Score de crédit" onBack={()=>go("back")}/><div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20}}><div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:8}}>Votre Score</div><div style={{position:"relative",width:120,height:120,margin:"0 auto 12px"}}><svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/><circle cx="60" cy="60" r="52" fill="none" stroke={C.gold} strokeWidth="8" strokeDasharray={`${score*3.27} 327`} strokeLinecap="round" transform="rotate(-90 60 60)"/></svg><div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}><div style={{fontSize:32,fontWeight:800,color:C.gold}}>{score}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>/ 100</div></div></div><div style={{fontSize:14,fontWeight:700,color:C.green}}>Excellent</div></div>{[{l:"Cotisations à temps",v:"12/12",p:100,c:C.green},{l:"Ancienneté",v:"6 mois",p:60,c:C.blue},{l:"Cercles complétés",v:"2",p:40,c:C.gold},{l:"Pénalités",v:"0",p:100,c:C.green}].map((f,i)=><div key={i} style={{background:C.card,borderRadius:14,padding:"12px 16px",marginBottom:8,border:`1px solid ${C.brdL}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{f.l}</span><span style={{fontSize:13,fontWeight:700,color:f.c}}>{f.v}</span></div><div style={{background:C.bg,borderRadius:3,height:4}}><div style={{width:`${f.p}%`,height:"100%",background:f.c,borderRadius:3}}/></div></div>)}</Scroll>;}
function KoloCard({go}){const[show,setShow]=useState(false);return <Scroll><Hdr title="Kolo Card" onBack={()=>go("back")}/><div style={{background:`linear-gradient(135deg,${C.navy},#1A3A6B)`,borderRadius:20,padding:"24px 22px",marginBottom:20,boxShadow:"0 12px 40px rgba(11,29,58,0.4)"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:24}}><span style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.7)"}}>KOLO PAY</span><span style={{fontSize:12,fontWeight:600,color:C.gold}}>PREMIUM</span></div><div onClick={()=>setShow(!show)} style={{fontSize:18,fontWeight:600,color:"#fff",letterSpacing:3,marginBottom:20,cursor:"pointer"}}>{show?"5342 •••• •••• 8901":"•••• •••• •••• 8901"}</div><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>TITULAIRE</div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>JOELDY TSINA</div></div><div><div style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>EXPIRE</div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>12/28</div></div></div></div><div style={{display:"flex",gap:8,marginBottom:20}}><Btn full onClick={()=>go("topup")} sx={{flex:1}}>{Z.dn} Recharger</Btn><Btn v="s" full onClick={()=>go("cardMerchants")} sx={{flex:1}}>{Z.star} Cashback</Btn></div>{[{t:"Paiement magasin",d:"Tous les marchands Mastercard"},{t:"Achats en ligne",d:"Tous les sites e-commerce"},{t:"Cashback 5%",d:"Sur tous vos achats"},{t:"Retrait ATM",d:"Distributeurs partenaires"}].map((b,i)=><div key={i} style={{display:"flex",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}><div style={{width:36,height:36,borderRadius:10,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.shield}</div><div><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{b.t}</div><div style={{fontSize:11,color:C.t3}}>{b.d}</div></div></div>)}</Scroll>;}
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
const leaderboard=[{n:"Joeldy Tsina",pts:850,i:"JT"},{n:"Grace Mouanda",pts:720,i:"GM"},{n:"Divine Loemba",pts:610,i:"DL"},{n:"Patrick Koumba",pts:480,i:"PK"}];
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
<Av ini={m.i} sz={40} img={m.img}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.n}</div><div style={{fontSize:12,color:C.t3}}>{m.role} · Plafond: {m.limit}</div></div></div>
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
const friends=[{n:"Grace Mouanda",i:"GM",img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=faces"},{n:"Patrick Koumba",i:"PK",img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces"},{n:"Merveille Ngoma",i:"MN",img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"},{n:"Divine Loemba",i:"DL",img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces"}];
const toggleFriend=(n)=>setSel(p=>p.includes(n)?p.filter(x=>x!==n):[...p,n]);
const perPerson=amt&&sel.length>0?Math.ceil(parseInt(amt)/(sel.length+1)):0;
return <Scroll><Hdr title="Partager les frais" onBack={()=>go("back")}/>
<Inp label="Description" ph="Ex: Dîner, Taxi, Cadeau..." val={desc} set={setDesc}/>
<Inp label="Montant total (FCFA)" ph="25000" val={amt} set={setAmt} type="number"/>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Partager avec</div>
{friends.map(f=><button key={f.n} onClick={()=>toggleFriend(f.n)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",width:"100%",background:sel.includes(f.n)?C.blueL:C.card,borderRadius:14,marginBottom:6,border:`1.5px solid ${sel.includes(f.n)?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<Av ini={f.i} sz={36} img={f.img}/><span style={{flex:1,fontSize:14,fontWeight:600,color:C.t1}}>{f.n}</span>
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
{[{n:"Grace Mouanda",date:"15 Mar 2026",bonus:5000,i:"GM"},{n:"Patrick Koumba",date:"22 Mar 2026",bonus:5000,i:"PK"},{n:"Divine Loemba",date:"01 Avr 2026",bonus:5000,i:"DL"}].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<Av ini={f.i} sz={36} img={f.img}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{f.n}</div><div style={{fontSize:11,color:C.t3}}>{f.date}</div></div><span style={{fontSize:13,fontWeight:700,color:C.green}}>+{fm(f.bonus)} F</span></div>)}
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

// ════════════ SECURITY & FINTECH MODULES ════════════

// ── 1. Enhanced KYC Module ──
function KYCFull({go}){const[step,setStep]=useState(1);const[idType,setIdType]=useState(null);const[captured,setCaptured]=useState({id:false,selfie:false,residence:false});
const idTypes=[{k:"cni",l:"Carte Nationale d'Identité",d:"Congo-Brazzaville"},{k:"passport",l:"Passeport",d:"Tout pays"},{k:"permit",l:"Permis de séjour",d:"Résidents étrangers"}];
return <Scroll><Hdr title="Vérification KYC" onBack={()=>go("back")}/>
{/* Progress */}
<div style={{display:"flex",gap:4,marginBottom:8}}>{[1,2,3,4].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?C.blue:C.brd}}/>)}</div>
<div style={{fontSize:11,color:C.t3,marginBottom:20}}>Étape {step}/4</div>

{step===1&&<div>
<h3 style={{fontSize:18,fontWeight:700,color:C.t0,marginBottom:4}}>Pièce d'identité</h3>
<p style={{fontSize:13,color:C.t3,marginBottom:20}}>Sélectionnez le type de document</p>
{idTypes.map(t=><button key={t.k} onClick={()=>setIdType(t.k)} style={{display:"flex",alignItems:"center",gap:12,padding:"16px",width:"100%",background:idType===t.k?C.blueL:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${idType===t.k?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<div style={{width:44,height:44,borderRadius:12,background:idType===t.k?C.blueM:C.bg,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.doc}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{t.l}</div><div style={{fontSize:11,color:C.t3}}>{t.d}</div></div>
{idType===t.k&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}
</button>)}
<div style={{marginTop:20}}><Btn full onClick={()=>setStep(2)} dis={!idType}>Continuer</Btn></div>
</div>}

{step===2&&<div>
<h3 style={{fontSize:18,fontWeight:700,color:C.t0,marginBottom:4}}>Scan du document</h3>
<p style={{fontSize:13,color:C.t3,marginBottom:20}}>Photographiez recto et verso de votre document</p>
{["Recto","Verso"].map((side,i)=><div key={i} style={{marginBottom:16}}>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:8}}>{side}</div>
<button onClick={()=>setCaptured(p=>({...p,id:true}))} style={{width:"100%",height:160,background:captured.id&&i===0?C.greenL:C.card,borderRadius:20,border:`2px dashed ${captured.id&&i===0?C.green:C.brd}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",gap:8}}>
{captured.id&&i===0?<><div style={{color:C.green}}>{Z.ok}</div><span style={{fontSize:13,fontWeight:600,color:C.green}}>Capturé</span></>:<><div style={{color:C.t3}}>{Z.cam}</div><span style={{fontSize:13,color:C.t3}}>Appuyez pour capturer</span><span style={{fontSize:11,color:C.t4}}>JPEG/PNG · Max 5 Mo</span></>}
</button></div>)}
<div style={{background:C.orangeL,borderRadius:12,padding:"10px 14px",marginBottom:16,display:"flex",gap:8,border:`1px solid ${C.orange}20`}}>
<span style={{color:C.orange}}>{Z.warn}</span><span style={{fontSize:12,color:C.t2}}>Assurez-vous que le document est lisible et non expiré</span></div>
<Btn full onClick={()=>setStep(3)}>Continuer</Btn>
</div>}

{step===3&&<div>
<h3 style={{fontSize:18,fontWeight:700,color:C.t0,marginBottom:4}}>Preuve de résidence</h3>
<p style={{fontSize:13,color:C.t3,marginBottom:20}}>Facture récente (SNE, SNDE, internet) de moins de 3 mois</p>
<button onClick={()=>setCaptured(p=>({...p,residence:true}))} style={{width:"100%",height:180,background:captured.residence?C.greenL:C.card,borderRadius:20,border:`2px dashed ${captured.residence?C.green:C.brd}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",gap:8,marginBottom:16}}>
{captured.residence?<><div style={{color:C.green}}>{Z.ok}</div><span style={{fontSize:13,fontWeight:600,color:C.green}}>Document ajouté</span></>:<><div style={{color:C.t3}}>{Z.doc}</div><span style={{fontSize:13,color:C.t3}}>Importer un document</span><span style={{fontSize:11,color:C.t4}}>PDF, JPEG ou PNG</span></>}
</button>
<div style={{background:C.blueL,borderRadius:12,padding:"10px 14px",marginBottom:16,border:`1px solid ${C.blue}15`}}>
<div style={{fontSize:12,fontWeight:600,color:C.blue}}>Documents acceptés :</div>
<div style={{fontSize:11,color:C.t2,marginTop:4}}>Facture SNE, SNDE, Canal+, attestation de domicile, contrat de bail</div></div>
<Btn full onClick={()=>setStep(4)}>Continuer</Btn>
</div>}

{step===4&&<div style={{textAlign:"center",paddingTop:20}}>
<div style={{width:80,height:80,borderRadius:24,background:C.greenL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.green}}>{Z.shield}</div>
<h3 style={{fontSize:20,fontWeight:800,color:C.green}}>KYC Validé</h3>
<p style={{fontSize:13,color:C.t3,marginTop:8,marginBottom:24}}>Votre identité est vérifiée. Vous pouvez rejoindre des cercles.</p>
<div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,textAlign:"left",marginBottom:20}}>
{[{l:"Nom",v:"Joeldy Tsina"},{l:"ID",v:"CG-2026-XXXXX"},{l:"Résidence",v:"Brazzaville, Congo"},{l:"Niveau KYC",v:"Niveau 3 (Complet)"},{l:"Trust Score",v:"85 / 100"},{l:"Statut",v:"Vérifié"}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<5?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:600,color:i===5?C.green:C.t1}}>{r.v}</span></div>)}
</div>
<Btn full onClick={()=>go("ok")}>Accéder aux cercles</Btn>
</div>}
</Scroll>;}

// ── 2. Escrow & Transit Wallet ──
function Escrow({go}){
const flow=[{s:"Cotisation",d:"Membre verse dans le wallet de transit",st:"completed",amt:25000},{s:"Séquestre",d:"Fonds bloqués sur le compte Lamuka Tech (tiers de confiance)",st:"completed",amt:25000},{s:"Vérification",d:"Système vérifie que tous les membres ont cotisé",st:"active",amt:150000},{s:"Libération",d:"Fonds transférés au bénéficiaire du tour",st:"pending",amt:150000}];
const txLogs=[{hash:"0xA3F8...E291",from:"Grace Mouanda",to:"Escrow",amt:25000,time:"14:32",status:"ok"},{hash:"0xB7C2...F410",from:"Divine Loemba",to:"Escrow",amt:25000,time:"13:10",status:"ok"},{hash:"0xC1D9...A882",from:"Merveille N.",to:"Escrow",amt:25000,time:"08:42",status:"ok"},{hash:"0xD5E3...B193",from:"Patrick Koumba",to:"Escrow",amt:0,time:"—",status:"pending"}];
return <Scroll><Hdr title="Escrow & Transit" onBack={()=>go("back")}/>
{/* Escrow balance */}
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:20,padding:20,marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>COMPTE DE TRANSIT</span><span style={{fontSize:10,fontWeight:700,color:C.gold,background:"rgba(245,166,35,0.2)",padding:"3px 8px",borderRadius:6}}>SÉQUESTRE</span></div>
<div style={{fontSize:28,fontWeight:800,color:C.gold}}>{fm(100000)} <span style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>FCFA</span></div>
<div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:4}}>4/6 cotisations reçues · Cercle Élite</div>
</div>
{/* Flow */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:12}}>Flux de la transaction</div>
{flow.map((f,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:0}}>
<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:28,height:28,borderRadius:14,background:f.st==="completed"?C.green:f.st==="active"?C.blue:C.brd,display:"flex",alignItems:"center",justifyContent:"center"}}>{f.st==="completed"?Z.okW:f.st==="active"?<div style={{width:8,height:8,borderRadius:4,background:"#fff"}}/>:null}</div>{i<3&&<div style={{width:2,height:32,background:f.st==="completed"?C.green:C.brd}}/>}</div>
<div style={{flex:1,paddingBottom:16}}><div style={{fontSize:13,fontWeight:600,color:f.st==="completed"?C.green:f.st==="active"?C.blue:C.t3}}>{f.s}</div><div style={{fontSize:11,color:C.t3}}>{f.d}</div><div style={{fontSize:12,fontWeight:700,color:C.gold,marginTop:2}}>{fm(f.amt)} F</div></div></div>)}
{/* Transaction logs */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:8,marginBottom:12}}>Logs de transactions</div>
<div style={{background:C.card,borderRadius:16,border:`1px solid ${C.brd}`,overflow:"hidden"}}>
<div style={{display:"flex",padding:"10px 14px",background:C.bg,fontSize:10,fontWeight:700,color:C.t3,gap:8}}><span style={{flex:2}}>HASH</span><span style={{flex:2}}>DE → VERS</span><span style={{flex:1,textAlign:"right"}}>MONTANT</span></div>
{txLogs.map((tx,i)=><div key={i} style={{display:"flex",padding:"10px 14px",borderTop:`1px solid ${C.brd}`,fontSize:11,gap:8,alignItems:"center"}}>
<span style={{flex:2,fontFamily:"monospace",color:C.kolo,fontSize:10}}>{tx.hash}</span>
<span style={{flex:2,color:C.t2}}>{tx.from} → {tx.to}</span>
<span style={{flex:1,textAlign:"right",fontWeight:700,color:tx.status==="ok"?C.green:C.orange}}>{tx.amt?fm(tx.amt)+" F":"—"}</span>
</div>)}
</div>
<div style={{background:C.blueL,borderRadius:12,padding:"10px 14px",marginTop:12,border:`1px solid ${C.blue}15`}}>
<div style={{fontSize:11,color:C.blue,fontWeight:600}}>{Z.shield} Chaque transaction est hashée et immuable</div></div>
</Scroll>;}

// ── 3. Trust Score & Social Scoring ──
function TrustScore({go}){const score=85;
const factors=[
{l:"Ancienneté",v:"6 mois",w:20,s:18,max:20,c:C.blue,d:"2 pts / mois d'activité"},
{l:"Ponctualité",v:"12/12",w:35,s:35,max:35,c:C.green,d:"Cotisations à temps sur le total"},
{l:"Cercles complétés",v:"2/3",w:15,s:10,max:15,c:C.gold,d:"Cercles menés à terme"},
{l:"Pénalités reçues",v:"0",w:20,s:20,max:20,c:C.green,d:"0 pénalité = score max"},
{l:"Parrainage",v:"3 filleuls",w:10,s:2,max:10,c:C.purple,d:"1 pt par filleul actif"}
];
const ranks=[{r:1,n:"Joeldy Tsina",s:85,i:"JT"},{r:2,n:"Grace Mouanda",s:78,i:"GM"},{r:3,n:"Merveille Ngoma",s:72,i:"MN"},{r:4,n:"Divine Loemba",s:65,i:"DL"},{r:5,n:"Patrick Koumba",s:42,i:"PK"},{r:6,n:"Blessing Obami",s:38,i:"BO"}];
return <Scroll><Hdr title="Trust Score" onBack={()=>go("back")}/>
{/* Score card */}
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20}}>
<div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:8}}>Votre Trust Score</div>
<div style={{position:"relative",width:130,height:130,margin:"0 auto 12px"}}><svg width="130" height="130" viewBox="0 0 130 130"><circle cx="65" cy="65" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/><circle cx="65" cy="65" r="56" fill="none" stroke={score>=70?C.green:score>=50?C.orange:C.red} strokeWidth="8" strokeDasharray={`${score*3.52} 352`} strokeLinecap="round" transform="rotate(-90 65 65)"/></svg><div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}><div style={{fontSize:36,fontWeight:800,color:C.gold}}>{score}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>/ 100</div></div></div>
<div style={{fontSize:14,fontWeight:700,color:C.green}}>Fiable</div>
<div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:4}}>Top 15% des utilisateurs</div>
</div>
{/* Breakdown */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Décomposition du score</div>
{factors.map((f,i)=><div key={i} style={{background:C.card,borderRadius:14,padding:"14px 16px",marginBottom:8,border:`1px solid ${C.brdL}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{f.l}</span><span style={{fontSize:13,fontWeight:700,color:f.c}}>{f.s}/{f.max} pts</span></div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:11,color:C.t3}}>{f.d}</span><span style={{fontSize:11,color:C.t3}}>Poids: {f.w}%</span></div>
<div style={{background:C.bg,borderRadius:3,height:4}}><div style={{width:`${(f.s/f.max)*100}%`,height:"100%",background:f.c,borderRadius:3}}/></div>
</div>)}
{/* Ranking for cycle */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:16,marginBottom:4}}>Rang automatique du cycle</div>
<div style={{fontSize:12,color:C.t3,marginBottom:12}}>Les scores élevés reçoivent en premier, les scores bas en dernier</div>
{ranks.map(u=><div key={u.r} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:u.r<=2?C.greenL:u.r>=5?C.redL:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${u.r<=2?C.green+"20":u.r>=5?C.red+"20":C.brdL}`}}>
<div style={{width:28,height:28,borderRadius:8,background:u.r===1?C.gold:u.r===2?C.t4:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:u.r<=2?"#fff":C.t3}}>{u.r}</div>
<Av ini={u.i} sz={32}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{u.n}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:u.s>=70?C.green:u.s>=50?C.orange:C.red}}>{u.s}</div><div style={{fontSize:9,color:C.t3}}>Tour #{u.r}</div></div>
</div>)}
</Scroll>;}

// ── 4. Emergency Fund (Fonds de Garantie) ──
function EmergencyFund({go}){
const fund=87500;const totalCollected=4375000;const rate=2;
const history=[{d:"05 Avr",circle:"Cercle Élite",cotisation:150000,prelevé:3000},{d:"01 Avr",circle:"Cercle Amis",cotisation:80000,prelevé:1600},{d:"15 Mar",circle:"Cercle Business",cotisation:500000,prelevé:10000},{d:"01 Mar",circle:"Cercle Élite",cotisation:150000,prelevé:3000}];
const payouts=[{d:"20 Mar",to:"Patrick Koumba",reason:"Défaut de paiement couvert",amt:12500}];
return <Scroll><Hdr title="Fonds de Garantie" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.green},#047857)`,borderRadius:20,padding:20,marginBottom:16,color:"#fff"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:12,opacity:.7}}>FONDS DE RÉSERVE</span><span style={{fontSize:10,fontWeight:700,background:"rgba(255,255,255,0.2)",padding:"3px 8px",borderRadius:6}}>{rate}% / cotisation</span></div>
<div style={{fontSize:28,fontWeight:800}}>{fm(fund)} <span style={{fontSize:13,opacity:.6}}>FCFA</span></div>
<div style={{fontSize:11,opacity:.6,marginTop:4}}>Protège les membres contre les défauts de paiement</div>
</div>
{/* Stats */}
<div style={{display:"flex",gap:10,marginBottom:16}}>
{[{l:"Total collecté",v:fm(totalCollected),c:C.blue},{l:"Réserve",v:fm(fund),c:C.green},{l:"Utilisé",v:fm(12500),c:C.orange}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"12px 8px",background:C.card,borderRadius:14,border:`1px solid ${C.brd}`}}><div style={{fontSize:14,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}
</div>
{/* Prélèvements */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Prélèvements récents ({rate}%)</div>
{history.map((h,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{h.circle}</div><div style={{fontSize:11,color:C.t3}}>{h.d} · Cotisation: {fm(h.cotisation)} F</div></div>
<span style={{fontSize:13,fontWeight:700,color:C.green}}>+{fm(h.prelevé)} F</span></div>)}
{/* Déblocages */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:16,marginBottom:10}}>Déblocages d'urgence</div>
{payouts.map((p,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",background:C.orangeL,borderRadius:14,marginBottom:6,border:`1px solid ${C.orange}20`}}>
<div><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{p.to}</div><div style={{fontSize:11,color:C.t3}}>{p.d} · {p.reason}</div></div>
<span style={{fontSize:13,fontWeight:700,color:C.orange}}>-{fm(p.amt)} F</span></div>)}
</Scroll>;}

// ── 5. Sanctions & Penalties Dashboard ──
function Sanctions({go}){
const members=[
{n:"Patrick Koumba",i:"PK",status:"late",daysLate:3,penalty:3750,received:true,blocked:true},
{n:"Blessing Obami",i:"BO",status:"late",daysLate:1,penalty:1250,received:false,blocked:false},
];
const allMembers=[...MEM.map(m=>({...m,status:m.ok?"ok":"late",daysLate:m.ok?0:m.id===3?3:1}))];
return <Scroll><Hdr title="Sanctions & Pénalités" onBack={()=>go("back")}/>
{/* Alert banner */}
<div style={{background:C.redL,borderRadius:16,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:12,border:`1px solid ${C.red}20`}}>
<span style={{color:C.red}}>{Z.warn}</span>
<div><div style={{fontSize:13,fontWeight:700,color:C.red}}>2 membres en retard</div><div style={{fontSize:11,color:C.t2}}>Pénalités appliquées automatiquement</div></div>
</div>
{/* Late members */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Membres en défaut</div>
{members.map((m,i)=><div key={i} style={{background:C.card,borderRadius:16,padding:16,marginBottom:10,border:`1.5px solid ${m.blocked?C.red+"40":C.orange+"30"}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
<Av ini={m.i} sz={40} img={m.img}/><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.n}</span>{m.blocked&&<span style={{fontSize:9,fontWeight:700,color:C.red,background:C.redL,padding:"2px 6px",borderRadius:4}}>BLOQUÉ</span>}</div><div style={{fontSize:12,color:C.t3}}>{m.daysLate} jour(s) de retard</div></div>
</div>
{/* Penalty calc */}
<div style={{background:C.bg,borderRadius:12,padding:12,marginBottom:10}}>
<div style={{fontSize:11,fontWeight:600,color:C.t2,marginBottom:6}}>Calcul de la pénalité (5% × jours)</div>
{[{l:"Cotisation due",v:fm(25000)+" F"},{l:"Taux",v:"5% / jour"},{l:"Jours de retard",v:m.daysLate},{l:"Pénalité totale",v:fm(m.penalty)+" F",bold:true}].map((r,j)=><div key={j} style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:r.bold?700:500,color:r.bold?C.red:C.t1}}>{r.v}</span></div>)}
</div>
{/* Actions */}
<div style={{display:"flex",gap:8}}>
<Btn v="s" full sx={{flex:1,padding:"10px",fontSize:12}}>{Z.bell} Rappel SMS</Btn>
{m.received&&!m.blocked&&<Btn full sx={{flex:1,padding:"10px",fontSize:12,background:C.red,boxShadow:"none"}}>{Z.lock} Bloquer</Btn>}
{m.blocked&&<Btn full sx={{flex:1,padding:"10px",fontSize:12,background:C.red,boxShadow:"none"}}>{Z.doc} Dossier</Btn>}
</div>
{m.blocked&&<div style={{background:C.redL,borderRadius:10,padding:"8px 12px",marginTop:10,fontSize:11,color:C.red,border:`1px solid ${C.red}15`}}>{Z.warn} Compte verrouillé — Dossier de recouvrement généré automatiquement (KYC: CG-2026-XXXXX)</div>}
</div>)}
{/* All members status */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:16,marginBottom:10}}>Statut de tous les membres</div>
{allMembers.map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:C.card,borderRadius:14,marginBottom:4,border:`1px solid ${C.brdL}`}}>
<div style={{width:8,height:8,borderRadius:4,background:m.status==="ok"?C.green:m.daysLate>2?C.red:C.orange}}/>
<span style={{flex:1,fontSize:13,fontWeight:500,color:C.t1}}>{m.n}</span>
<span style={{fontSize:11,fontWeight:600,color:m.status==="ok"?C.green:C.red}}>{m.status==="ok"?"À jour":m.daysLate+"j retard"}</span>
</div>)}
{/* Auto-trigger info */}
<div style={{background:C.blueL,borderRadius:14,padding:14,marginTop:16,border:`1px solid ${C.blue}15`}}>
<div style={{fontSize:13,fontWeight:600,color:C.blue,marginBottom:6}}>Déclencheurs automatiques</div>
{["T+24h : Notification push + SMS d'alerte","T+24h : Pénalité 5% / jour appliquée","Défaut post-réception : Compte bloqué + dossier recouvrement","Fonds de garantie activé pour couvrir le cercle"].map((t,i)=><div key={i} style={{fontSize:11,color:C.t2,marginBottom:4,paddingLeft:10,borderLeft:`2px solid ${C.blue}30`}}>{t}</div>)}
</div>
</Scroll>;}

// ── 6. Group Transparency Dashboard ──
function GroupDashboard({go}){
const circle=CIR[0];const total=circle.amt*circle.mem;const collected=MEM.filter(m=>m.ok).length*circle.amt;
const pct=Math.round(collected/total*100);
return <Scroll><Hdr title="Tableau de bord du cercle" onBack={()=>go("back")}/>
{/* Collection progress */}
<div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`,marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
<div><div style={{fontSize:16,fontWeight:700,color:C.t0}}>{circle.name}</div><div style={{fontSize:12,color:C.t3}}>Tour en cours · {circle.turn}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:22,fontWeight:800,color:C.gold}}>{pct}%</div><div style={{fontSize:10,color:C.t3}}>collecté</div></div></div>
<div style={{background:C.bg,borderRadius:6,height:12,overflow:"hidden",marginBottom:8}}><div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`,borderRadius:6,transition:"width 0.5s"}}/></div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.t3}}><span>{fm(collected)} / {fm(total)} FCFA</span><span>{MEM.filter(m=>m.ok).length}/{MEM.length} membres</span></div>
</div>
{/* Real-time member status */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>État des paiements (temps réel)</div>
<div style={{display:"flex",gap:8,marginBottom:14}}>
{[{l:"Payé",v:MEM.filter(m=>m.ok).length,c:C.green,bg:C.greenL},{l:"En attente",v:MEM.filter(m=>!m.ok&&m.pen===0).length,c:C.orange,bg:C.orangeL},{l:"En retard",v:MEM.filter(m=>m.pen>0).length,c:C.red,bg:C.redL}].map((s,i)=><div key={i} style={{flex:1,textAlign:"center",padding:"12px 8px",background:s.bg,borderRadius:14}}><div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}
</div>
{/* Member cards - anonymous friendly */}
{MEM.map(m=>{const status=m.ok?"paid":m.pen>0?"late":"pending";const colors={paid:{bg:C.greenL,c:C.green,t:"Payé",brd:C.green+"20"},pending:{bg:C.orangeL,c:C.orange,t:"En attente",brd:C.orange+"20"},late:{bg:C.redL,c:C.red,t:"En retard",brd:C.red+"20"}};const st=colors[status];
return <div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:st.bg,borderRadius:14,marginBottom:6,border:`1px solid ${st.brd}`}}>
<div style={{width:10,height:10,borderRadius:5,background:st.c,flexShrink:0}}/>
<Av ini={m.pseudo?m.pseudo.slice(0,2):m.i} sz={32} img={m.pseudo?null:m.img}/>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{m.pseudo||m.n.split(" ")[0]+" "+m.n.split(" ")[1]?.[0]+"."}</div></div>
<div style={{textAlign:"right"}}><span style={{fontSize:11,fontWeight:700,color:st.c}}>{st.t}</span>{m.pen>0&&<div style={{fontSize:10,color:C.red}}>Pénalité: {fm(m.pen)} F</div>}</div>
</div>;})}
{/* Reserve fund info */}
<div style={{background:C.card,borderRadius:16,padding:16,marginTop:16,border:`1px solid ${C.brd}`}}>
<div style={{fontSize:13,fontWeight:700,color:C.t0,marginBottom:8}}>Protection du cercle</div>
{[{l:"Fonds de garantie (2%)",v:fm(3000)+" F",c:C.green},{l:"Pénalités collectées",v:fm(2500)+" F",c:C.orange},{l:"Prochain versement",v:circle.next,c:C.blue}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<2?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:700,color:r.c}}>{r.v}</span></div>)}
</div>
<div style={{background:C.blueL,borderRadius:12,padding:"10px 14px",marginTop:12,border:`1px solid ${C.blue}15`}}>
<div style={{fontSize:11,color:C.blue}}>{Z.shield} Données de paiement exposées sans compromettre les informations privées (téléphone, adresse masqués)</div></div>
</Scroll>;}

// ── 7. Recovery Dossier ──
function RecoveryDossier({go}){
return <Scroll><Hdr title="Dossier de recouvrement" onBack={()=>go("back")}/>
<div style={{background:C.redL,borderRadius:20,padding:20,marginBottom:16,border:`1px solid ${C.red}20`}}>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{color:C.red}}>{Z.warn}</span><span style={{fontSize:16,fontWeight:700,color:C.red}}>Dossier #REC-2026-0042</span></div>
<div style={{fontSize:12,color:C.t2}}>Généré automatiquement le 05 Avr 2026</div>
</div>
{/* Debtor info (from KYC) */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Informations du débiteur (KYC)</div>
<div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,marginBottom:16}}>
{[{l:"Nom",v:"Patrick Koumba"},{l:"ID National",v:"CG-2026-44821"},{l:"Téléphone",v:"+242 06 891 2245"},{l:"Résidence",v:"Bacongo, Brazzaville"},{l:"Niveau KYC",v:"Niveau 3 (Complet)"}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<4?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:600,color:C.t1}}>{r.v}</span></div>)}
</div>
{/* Debt details */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Détail de la dette</div>
<div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,marginBottom:16}}>
{[{l:"Cercle",v:"Cercle Élite"},{l:"Pot reçu le",v:"01 Mar 2026"},{l:"Montant reçu",v:fm(150000)+" F"},{l:"Cotisations restantes",v:"3 × "+fm(25000)+" F"},{l:"Total dû",v:fm(75000)+" F"},{l:"Pénalités accumulées",v:fm(3750)+" F"},{l:"Total à recouvrer",v:fm(78750)+" F"}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<6?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:i===6?800:600,color:i===6?C.red:C.t1}}>{r.v}</span></div>)}
</div>
{/* Actions */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Actions</div>
<div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,marginBottom:16}}>
{[{l:"Compte bloqué",v:"05 Avr 2026",done:true},{l:"SMS de mise en demeure",v:"06 Avr 2026",done:true},{l:"Appel téléphonique",v:"08 Avr 2026",done:false},{l:"Transmission au service juridique",v:"Après 15j",done:false}].map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<3?`1px solid ${C.brd}`:"",opacity:a.done?1:.5}}>
<div style={{width:18,height:18,borderRadius:9,background:a.done?C.green:C.brd,display:"flex",alignItems:"center",justifyContent:"center"}}>{a.done&&Z.okW}</div>
<div style={{flex:1}}><span style={{fontSize:12,color:C.t1}}>{a.l}</span></div>
<span style={{fontSize:11,color:C.t3}}>{a.v}</span></div>)}
</div>
<div style={{display:"flex",gap:8}}>
<Btn v="s" full sx={{flex:1}}>{Z.doc} Exporter PDF</Btn>
<Btn full sx={{flex:1}}>{Z.send} Transmettre</Btn>
</div>
</Scroll>;}

// ════════════ MISSING FEATURES (17 NEW SCREENS) ════════════

// ── 1. Contract Signing (e-signature) ──
function Contract({go}){const[agreed,setAgreed]=useState([false,false,false]);const[signed,setSigned]=useState(false);
const clauses=["Je m'engage à verser ma cotisation de 25 000 FCFA chaque mois à la date convenue.","Je comprends qu'un retard entraîne une pénalité de 5% par jour de retard.","J'accepte que mes fonds soient gérés via le compte de transit Lamuka Tech (séquestre)."];
const toggle=(i)=>{const n=[...agreed];n[i]=!n[i];setAgreed(n);};const allOk=agreed.every(v=>v);
return <Scroll><Hdr title="Contrat numérique" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`,marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><span style={{fontSize:16,fontWeight:700,color:C.t0}}>Contrat Cercle Élite</span><span style={{fontSize:10,fontWeight:700,color:C.blue,background:C.blueL,padding:"3px 8px",borderRadius:6}}>N° CT-2026-0891</span></div>
{[{l:"Membre",v:"Joeldy Tsina"},{l:"Cercle",v:"Cercle Élite"},{l:"Montant/tour",v:"25 000 FCFA"},{l:"Durée",v:"6 mois"},{l:"Tour attribué",v:"#1 (Mai 2026)"},{l:"Fonds de garantie",v:"2% (500 F/mois)"}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<5?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:600,color:C.t1}}>{r.v}</span></div>)}
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Clauses</div>
{clauses.map((c,i)=><button key={i} onClick={()=>toggle(i)} style={{display:"flex",gap:10,padding:"14px 16px",width:"100%",background:agreed[i]?C.greenL:C.card,borderRadius:14,marginBottom:8,border:`1.5px solid ${agreed[i]?C.green+"40":C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<div style={{width:22,height:22,borderRadius:6,border:`2px solid ${agreed[i]?C.green:C.brd}`,background:agreed[i]?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{agreed[i]&&Z.okW}</div>
<span style={{fontSize:12,color:C.t2,lineHeight:1.5}}>{c}</span></button>)}
{/* Signature pad */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:8,marginBottom:10}}>Signature électronique</div>
<button onClick={()=>setSigned(true)} style={{width:"100%",height:100,background:signed?C.greenL:C.card,borderRadius:16,border:`2px dashed ${signed?C.green:C.brd}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
{signed?<div style={{fontFamily:"cursive",fontSize:28,color:C.green,fontStyle:"italic"}}>Joeldy Tsina</div>:<span style={{fontSize:13,color:C.t3}}>Appuyez pour signer</span>}
</button>
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")} dis={!allOk||!signed}>Signer le contrat</Btn></div>
</Scroll>;}

// ── 2. Slot Selection with Fee Simulation ──
function SlotSelect({go}){const[sel,setSel]=useState(null);const amt=25000;const mem=6;
const slots=[{pos:1,fee:16,avail:true},{pos:2,fee:12,avail:true},{pos:3,fee:8,avail:false},{pos:4,fee:4,avail:true},{pos:5,fee:2,avail:true},{pos:6,fee:0,avail:true}];
return <Scroll><Hdr title="Choisir votre tour" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:20,padding:20,marginBottom:16,color:"#fff"}}>
<div style={{fontSize:14,fontWeight:700}}>Cercle 50K · 6 mois</div>
<div style={{fontSize:12,opacity:.7,marginTop:4}}>Choisissez votre position. Les frais diminuent pour les tours tardifs.</div>
</div>
{slots.map(s=>{const feeAmt=Math.round(amt*s.fee/100);const monthly=Math.round(feeAmt/s.pos);
return <button key={s.pos} onClick={()=>s.avail&&setSel(s.pos)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",width:"100%",background:sel===s.pos?C.blueL:s.avail?C.card:C.bg,borderRadius:16,marginBottom:8,border:`1.5px solid ${sel===s.pos?C.blue:C.brdL}`,cursor:s.avail?"pointer":"not-allowed",opacity:s.avail?1:.5,textAlign:"left"}}>
<div style={{width:36,height:36,borderRadius:10,background:sel===s.pos?C.blue:s.fee===0?C.green:C.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff"}}>#{s.pos}</div>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>Tour #{s.pos}{s.pos===1?" (Premier)":s.pos===mem?" (Dernier — 0%)":""}</div>
<div style={{fontSize:11,color:C.t3}}>Frais: {s.fee}% ({fm(feeAmt)} F){s.pos>1?` · +${fm(monthly)} F/mois sur ${s.pos} mois`:""}</div></div>
{!s.avail&&<span style={{fontSize:10,fontWeight:700,color:C.red,background:C.redL,padding:"3px 8px",borderRadius:6}}>PRIS</span>}
{sel===s.pos&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}
</button>;})}
{sel&&<div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,marginBottom:12}}>
<div style={{fontSize:13,fontWeight:700,color:C.t0,marginBottom:8}}>Résumé pour le Tour #{sel}</div>
{[{l:"Cotisation mensuelle",v:fm(amt)+" F"},{l:"Frais ("+slots[sel-1].fee+"%)",v:fm(Math.round(amt*slots[sel-1].fee/100))+" F"},{l:"Total mensuel",v:fm(amt+Math.round(amt*slots[sel-1].fee/100/sel))+" F",bold:true},{l:"Vous recevez",v:fm(amt*mem)+" F",gold:true}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:r.bold||r.gold?700:500,color:r.gold?C.gold:C.t1}}>{r.v}</span></div>)}
</div>}
<Btn full onClick={()=>go("contract")} dis={!sel}>Confirmer le Tour #{sel||"?"}</Btn>
</Scroll>;}

// ── 3. Payment Methods Management ──
function PayMethods({go}){const[methods]=useState([{id:1,type:"kolo",name:"Kolo Pay",num:"Wallet interne",primary:true},{id:2,type:"mtn",name:"MTN Mobile Money",num:"+242 06 466 3469",primary:false},{id:3,type:"airtel",name:"Airtel Money",num:"+242 05 512 8834",primary:false}]);
return <Scroll><Hdr title="Moyens de paiement" onBack={()=>go("back")}/>
{methods.map(m=><div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"16px",background:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${m.primary?C.blue:C.brdL}`}}>
<SvgIc type={m.type} size={28}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.name}</div><div style={{fontSize:12,color:C.t3}}>{m.num}</div></div>
{m.primary&&<span style={{fontSize:10,fontWeight:700,color:C.blue,background:C.blueL,padding:"3px 8px",borderRadius:6}}>PRINCIPAL</span>}
</div>)}
<div style={{marginTop:8}}><Btn v="s" full onClick={()=>go("addPayMethod")}>{Z.plus} Ajouter un moyen de paiement</Btn></div>
</Scroll>;}

function AddPayMethod({go}){const[type,setType]=useState(null);const[num,setNum]=useState("");
const types=[{k:"orange",n:"Orange Money",c:"#FF6600"},{k:"bank",n:"Virement bancaire",c:C.navy},{k:"visa",n:"Carte Visa/Mastercard",c:C.blue}];
return <Scroll><Hdr title="Ajouter" onBack={()=>go("back")}/>
{types.map(t=><button key={t.k} onClick={()=>setType(t.k)} style={{display:"flex",alignItems:"center",gap:12,padding:"16px",width:"100%",background:type===t.k?C.blueL:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${type===t.k?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<div style={{width:36,height:36,borderRadius:10,background:t.c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"#fff"}}>{t.n[0]}</div>
<span style={{flex:1,fontSize:14,fontWeight:600,color:C.t1}}>{t.n}</span>
{type===t.k&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}
</button>)}
{type&&<div style={{marginTop:8}}>
{type==="bank"?<><Inp label="Nom de la banque" ph="Ex: BGFI Bank, LCB, UBA..." val={num} set={setNum}/><Inp label="N° de compte (IBAN)" ph="CG0000000000000000"/></>
:type==="visa"?<><Inp label="N° de carte" ph="5342 XXXX XXXX XXXX"/><div style={{display:"flex",gap:8}}><div style={{flex:1}}><Inp label="Expire" ph="12/28"/></div><div style={{flex:1}}><Inp label="CVV" ph="123" type="password"/></div></div></>
:<Inp label="Numéro Orange Money" ph="+242 06 XXX XXXX" val={num} set={setNum} icon={Z.phone}/>}
<Btn full onClick={()=>go("ok")}>Ajouter</Btn></div>}
</Scroll>;}

// ── 4. Kolo Card Enhanced (Merchants, Cashback, Tx History) ──
function CardMerchants({go}){
const merchants=[{n:"Shoprite",cat:"Supermarché",cb:5,img:"S"},{n:"Airtel Shop",cat:"Télécom",cb:3,img:"A"},{n:"Poto-Poto Market",cat:"Marché",cb:2,img:"P"},{n:"CanalOlympia",cat:"Cinéma",cb:10,img:"C"},{n:"Pharmacie du Centre",cat:"Santé",cb:4,img:"+"},{n:"Total Energies",cat:"Carburant",cb:2,img:"T"}];
const txHistory=[{n:"Shoprite Ouenzé",a:-15200,cb:760,d:"07 Avr"},{n:"Airtel Shop",a:-25000,cb:750,d:"05 Avr"},{n:"CanalOlympia",a:-5000,cb:500,d:"03 Avr"},{n:"Total Station",a:-22000,cb:440,d:"01 Avr"}];
return <Scroll><Hdr title="Partenaires & Cashback" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.gold},${C.orange})`,borderRadius:16,padding:"16px 18px",marginBottom:16,color:"#fff"}}>
<div style={{fontSize:16,fontWeight:800}}>2 450 F cashback ce mois</div>
<div style={{fontSize:12,opacity:.8}}>Accumulez du cashback chez nos partenaires</div></div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Partenaires</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
{merchants.map((m,i)=><div key={i} style={{background:C.card,borderRadius:14,padding:"14px 12px",border:`1px solid ${C.brd}`,textAlign:"center"}}>
<div style={{width:40,height:40,borderRadius:12,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:C.blue,marginBottom:6}}>{m.img}</div>
<div style={{fontSize:13,fontWeight:600,color:C.t1}}>{m.n}</div>
<div style={{fontSize:11,color:C.t3}}>{m.cat}</div>
<div style={{fontSize:12,fontWeight:700,color:C.green,marginTop:4}}>{m.cb}% cashback</div>
</div>)}
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Transactions récentes</div>
{txHistory.map((tx,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{tx.n}</div><div style={{fontSize:11,color:C.t3}}>{tx.d}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:C.t1}}>{fm(tx.a)} F</div><div style={{fontSize:11,fontWeight:600,color:C.green}}>+{fm(tx.cb)} F cashback</div></div>
</div>)}
</Scroll>;}

// ── 5. Savings Program with Returns ──
function SavingsProgram({go}){const[amt,setAmt]=useState("50000");const[dur,setDur]=useState(12);
const rate=dur===6?8:dur===12?15:20;const returns=Math.round(parseInt(amt||0)*rate/100);
return <Scroll><Hdr title="Programme d'épargne" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.kolo},${C.blue})`,borderRadius:20,padding:20,marginBottom:16,color:"#fff"}}>
<div style={{fontSize:16,fontWeight:800}}>Épargnez & gagnez</div>
<div style={{fontSize:12,opacity:.8}}>Jusqu'à 20% de cashback sur votre épargne</div></div>
<Inp label="Montant mensuel (FCFA)" ph="50000" val={amt} set={setAmt} type="number"/>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Durée</div>
<div style={{display:"flex",gap:8,marginBottom:16}}>{[{d:6,r:8},{d:12,r:15},{d:24,r:20}].map(p=><button key={p.d} onClick={()=>setDur(p.d)} style={{flex:1,padding:"14px 8px",borderRadius:14,border:`1.5px solid ${dur===p.d?C.blue:C.brdL}`,background:dur===p.d?C.blueL:C.card,cursor:"pointer",textAlign:"center"}}>
<div style={{fontSize:16,fontWeight:800,color:dur===p.d?C.blue:C.t1}}>{p.d}</div>
<div style={{fontSize:10,color:C.t3}}>mois</div>
<div style={{fontSize:11,fontWeight:700,color:C.green,marginTop:4}}>+{p.r}%</div></button>)}</div>
{amt&&<div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,marginBottom:16}}>
<div style={{fontSize:13,fontWeight:700,color:C.t0,marginBottom:8}}>Simulation</div>
{[{l:"Épargne mensuelle",v:fm(amt)+" F"},{l:"Durée",v:dur+" mois"},{l:"Total épargné",v:fm(parseInt(amt)*dur)+" F"},{l:"Cashback ("+rate+"%)",v:"+"+fm(returns)+" F",c:C.green},{l:"Vous recevez",v:fm(parseInt(amt)*dur+returns)+" F",bold:true}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<4?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:r.bold?800:600,color:r.c||C.t1}}>{r.v}</span></div>)}
</div>}
<Btn full onClick={()=>go("ok")}>Commencer à épargner</Btn>
</Scroll>;}

// ── 6. Notification Preferences ──
function NotifPrefs({go}){const[prefs,setPrefs]=useState({push:true,sms:true,email:false,rappel:true,cotisation:true,payout:true,promo:false,securite:true});
const toggle=(k)=>setPrefs(p=>({...p,[k]:!p[k]}));
return <Scroll><Hdr title="Préférences notifications" onBack={()=>go("back")}/>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Canaux</div>
{[{k:"push",l:"Notifications push",d:"Alertes en temps réel"},{k:"sms",l:"SMS",d:"Rappels par SMS (+242 06...)"},{k:"email",l:"Email",d:"Résumés hebdomadaires"}].map(c=><div key={c.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:C.card,borderRadius:16,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.l}</div><div style={{fontSize:11,color:C.t3}}>{c.d}</div></div>
<Toggle v={prefs[c.k]} set={()=>toggle(c.k)}/></div>)}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:16,marginBottom:10}}>Types</div>
{[{k:"rappel",l:"Rappels de cotisation"},{k:"cotisation",l:"Cotisations reçues"},{k:"payout",l:"Versements & gains"},{k:"promo",l:"Promotions & offres"},{k:"securite",l:"Alertes de sécurité"}].map(c=><div key={c.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:C.card,borderRadius:16,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<span style={{fontSize:13,color:C.t1}}>{c.l}</span>
<Toggle v={prefs[c.k]} set={()=>toggle(c.k)}/></div>)}
<div style={{marginTop:12}}><Btn full onClick={()=>go("ok")}>Enregistrer</Btn></div>
</Scroll>;}

// ── 7. Gold/Asset Investment ──
function Invest({go}){
const assets=[{n:"Or 24K",price:"32 500 F/g",change:"+2.4%",up:true,min:"5 000 F/mois"},{n:"Immobilier Brazza",price:"Index 142",change:"+5.1%",up:true,min:"25 000 F/mois"},{n:"Agriculture (Cacao)",price:"Récolte Q4",change:"+8.2%",up:true,min:"10 000 F/mois"}];
const myInv=[{n:"Or 24K",invested:150000,current:162000,gain:12000},{n:"Agriculture",invested:60000,current:63600,gain:3600}];
return <Scroll><Hdr title="Investir" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.gold},#C4841D)`,borderRadius:20,padding:20,marginBottom:16,color:"#fff"}}>
<div style={{fontSize:16,fontWeight:800}}>Investissez avec Likelemba</div>
<div style={{fontSize:12,opacity:.8}}>Or, immobilier, agriculture — dès 5 000 F/mois</div>
<div style={{fontSize:24,fontWeight:800,marginTop:8}}>{fm(225600)} F <span style={{fontSize:12,opacity:.6}}>portfolio</span></div></div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Mes investissements</div>
{myInv.map((inv,i)=><div key={i} style={{background:C.card,borderRadius:16,padding:16,marginBottom:8,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:14,fontWeight:600,color:C.t1}}>{inv.n}</span><span style={{fontSize:13,fontWeight:700,color:C.green}}>+{fm(inv.gain)} F</span></div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.t3}}><span>Investi: {fm(inv.invested)} F</span><span>Actuel: {fm(inv.current)} F</span></div></div>)}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:16,marginBottom:10}}>Opportunités</div>
{assets.map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"16px",background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brd}`}}>
<div style={{width:44,height:44,borderRadius:14,background:C.goldL,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold}}>{Z.star}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{a.n}</div><div style={{fontSize:12,color:C.t3}}>{a.price} · Min. {a.min}</div></div>
<span style={{fontSize:12,fontWeight:700,color:C.green}}>{a.change}</span></div>)}
<Btn full onClick={()=>go("ok")}>{Z.plus} Nouvel investissement</Btn>
</Scroll>;}

// ── 8. Budget Planner ──
function BudgetPlanner({go}){const[income,setIncome]=useState("350000");const inc=parseInt(income||0);
const budget=[{cat:"Loyer",pct:30,c:C.blue},{cat:"Alimentation",pct:25,c:C.green},{cat:"Épargne/Tontine",pct:20,c:C.gold},{cat:"Transport",pct:10,c:C.orange},{cat:"Loisirs",pct:10,c:C.purple},{cat:"Divers",pct:5,c:C.t3}];
return <Scroll><Hdr title="Planificateur budget" onBack={()=>go("back")}/>
<Inp label="Revenu mensuel (FCFA)" ph="350000" val={income} set={setIncome} type="number"/>
{inc>0&&<div>
<div style={{display:"flex",borderRadius:8,overflow:"hidden",height:24,marginBottom:16}}>{budget.map((b,i)=><div key={i} style={{width:`${b.pct}%`,background:b.c,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:8,color:"#fff",fontWeight:700}}>{b.pct}%</span></div>)}</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Répartition recommandée (50/30/20)</div>
{budget.map((b,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{width:10,height:10,borderRadius:5,background:b.c,flexShrink:0}}/>
<span style={{flex:1,fontSize:13,color:C.t1}}>{b.cat} ({b.pct}%)</span>
<span style={{fontSize:13,fontWeight:700,color:C.t1}}>{fm(Math.round(inc*b.pct/100))} F</span></div>)}
<div style={{background:C.greenL,borderRadius:14,padding:14,marginTop:12,border:`1px solid ${C.green}15`}}>
<div style={{fontSize:13,fontWeight:700,color:C.green}}>Conseil Lamu</div>
<div style={{fontSize:12,color:C.t2,marginTop:4}}>Avec {fm(Math.round(inc*20/100))} F/mois en épargne, vous pouvez rejoindre 1 cercle de {fm(Math.round(inc*20/100))} F et atteindre {fm(Math.round(inc*20/100*6))} F en 6 mois !</div></div>
</div>}
</Scroll>;}

// ── 9. Lucky Draws ──
function LuckyDraw({go}){const[spinning,setSpinning]=useState(false);const[won,setWon]=useState(null);
const prizes=["1 000 F","500 F","2 500 F","0 F","1 500 F","5 000 F"];
const spin=()=>{setSpinning(true);setTimeout(()=>{setWon(prizes[Math.floor(Math.random()*prizes.length)]);setSpinning(false);},2000);};
return <Scroll><Hdr title="Jeux & Tirages" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.purple},${C.blue})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20,color:"#fff"}}>
<div style={{fontSize:20,fontWeight:800,marginBottom:4}}>Tirage du mois</div>
<div style={{fontSize:12,opacity:.8}}>1 chance gratuite par cotisation à temps</div>
<div style={{fontSize:11,opacity:.6,marginTop:4}}>Vos chances: 3 tickets disponibles</div>
</div>
{/* Wheel */}
<div style={{textAlign:"center",marginBottom:20}}>
<div style={{width:180,height:180,borderRadius:90,background:`conic-gradient(${C.gold} 0deg 60deg,${C.blue} 60deg 120deg,${C.green} 120deg 180deg,${C.orange} 180deg 240deg,${C.purple} 240deg 300deg,${C.red} 300deg 360deg)`,display:"inline-flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.15)",animation:spinning?"spin 2s ease-out":"none"}}>
<div style={{width:70,height:70,borderRadius:35,background:C.card,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,0,0,0.1)"}}>
{won?<span style={{fontSize:14,fontWeight:800,color:won==="0 F"?C.red:C.green}}>{won}</span>:<span style={{fontSize:10,fontWeight:700,color:C.t2}}>TOURNER</span>}
</div></div>
<style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(${720+Math.random()*360}deg)}}`}</style>
</div>
{won?<div style={{background:won==="0 F"?C.orangeL:C.greenL,borderRadius:16,padding:16,textAlign:"center",marginBottom:16,border:`1px solid ${won==="0 F"?C.orange:C.green}20`}}>
<div style={{fontSize:16,fontWeight:800,color:won==="0 F"?C.orange:C.green}}>{won==="0 F"?"Pas de chance cette fois":"Félicitations !"}</div>
<div style={{fontSize:13,color:C.t2,marginTop:4}}>{won==="0 F"?"Réessayez demain":"Vous avez gagné "+won+" ! Crédité sur Kolo Pay."}</div>
</div>:null}
<Btn full onClick={()=>{setWon(null);spin();}} dis={spinning}>{spinning?"Tirage en cours...":"Tourner la roue"}</Btn>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:20,marginBottom:10}}>Historique des gains</div>
{[{d:"01 Avr",prize:"2 500 F"},{d:"15 Mar",prize:"500 F"},{d:"01 Mar",prize:"1 000 F"}].map((h,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",background:C.card,borderRadius:12,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<span style={{fontSize:13,color:C.t3}}>{h.d}</span><span style={{fontSize:13,fontWeight:700,color:C.green}}>+{h.prize}</span></div>)}
</Scroll>;}

// ── 10. Credit Bureau Reporting ──
function CreditBureau({go}){return <Scroll><Hdr title="Score bancaire" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20,color:"#fff"}}>
<div style={{fontSize:13,opacity:.6}}>Votre score bancaire estimé</div>
<div style={{fontSize:42,fontWeight:800,color:C.gold,marginTop:8}}>720</div>
<div style={{fontSize:12,color:C.green,marginTop:4}}>Bon — éligible aux crédits bancaires</div>
</div>
<div style={{background:C.greenL,borderRadius:14,padding:14,marginBottom:16,border:`1px solid ${C.green}15`}}>
<div style={{fontSize:13,fontWeight:600,color:C.green}}>12 paiements rapportés aux banques</div>
<div style={{fontSize:11,color:C.t2,marginTop:4}}>Chaque cotisation à temps améliore votre score bancaire via nos partenaires BGFI Bank et UBA.</div></div>
{[{l:"Cotisations rapportées",v:"12",c:C.green},{l:"Score Trust Likelemba",v:"85/100",c:C.blue},{l:"Banques partenaires",v:"BGFI, UBA",c:C.navy},{l:"Prochain rapport",v:"01 Mai 2026",c:C.t1}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"14px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<span style={{fontSize:13,color:C.t3}}>{r.l}</span><span style={{fontSize:13,fontWeight:700,color:r.c}}>{r.v}</span></div>)}
<Btn full onClick={()=>go("ok")}>Demander un rapport complet</Btn>
</Scroll>;}

// ── 11. Corporate / Business Mode ──
function Corporate({go}){return <Scroll><Hdr title="Likelemba Business" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.blue})`,borderRadius:20,padding:20,marginBottom:16,color:"#fff"}}>
<div style={{fontSize:18,fontWeight:800}}>Likelemba Business</div>
<div style={{fontSize:12,opacity:.8,marginTop:4}}>Proposez des cercles d'épargne à vos employés</div></div>
{[{n:"Lamuka Tech",employees:12,circles:2,total:"1.2M F"},{n:"Boulangerie Poto-Poto",employees:8,circles:1,total:"400K F"}].map((c,i)=><div key={i} style={{background:C.card,borderRadius:16,padding:16,marginBottom:10,border:`1px solid ${C.brd}`}}>
<div style={{fontSize:15,fontWeight:700,color:C.t0}}>{c.n}</div>
<div style={{display:"flex",gap:12,marginTop:10}}>{[{l:"Employés",v:c.employees},{l:"Cercles",v:c.circles},{l:"Volume",v:c.total}].map((s,j)=><div key={j} style={{flex:1,textAlign:"center",padding:"8px",background:C.bg,borderRadius:10}}><div style={{fontSize:14,fontWeight:800,color:C.blue}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>)}</div></div>)}
<Btn full onClick={()=>go("ok")}>{Z.plus} Inscrire mon entreprise</Btn>
</Scroll>;}

// ── 12. Auto-Pay ──
function AutoPay({go}){const[enabled,setEnabled]=useState(true);const[day,setDay]=useState("1");
return <Scroll><Hdr title="Paiement automatique" onBack={()=>go("back")}/>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",background:C.card,borderRadius:16,marginBottom:16,border:`1px solid ${C.brd}`}}>
<div><div style={{fontSize:14,fontWeight:600,color:C.t1}}>Prélèvement automatique</div><div style={{fontSize:11,color:C.t3}}>Cotiser sans y penser</div></div>
<Toggle v={enabled} set={setEnabled}/></div>
{enabled&&<div>
<Inp label="Jour du mois" ph="1" val={day} set={setDay} type="number"/>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Source de prélèvement</div>
{[{n:"Kolo Pay",s:true},{n:"MTN Mobile Money",s:false}].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:s.s?C.blueL:C.card,borderRadius:14,marginBottom:6,border:`1.5px solid ${s.s?C.blue:C.brdL}`}}>
<SvgIc type={i===0?"kolo":"mtn"} size={24}/><span style={{flex:1,fontSize:14,color:C.t1}}>{s.n}</span>
{s.s&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}</div>)}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:16,marginBottom:10}}>Cercles programmés</div>
{CIR.map(c=><div key={c.id} style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{c.name}</div><div style={{fontSize:11,color:C.t3}}>Le {day} de chaque mois</div></div>
<span style={{fontSize:13,fontWeight:700,color:C.gold}}>{fm(c.amt)} F</span></div>)}
</div>}
<div style={{marginTop:12}}><Btn full onClick={()=>go("ok")}>Enregistrer</Btn></div>
</Scroll>;}

// ── 13. Smart Split Optimizer ──
function SmartSplit({go}){const[target,setTarget]=useState("200000");const tg=parseInt(target||0);
const options=tg>0?[
{name:"1 cercle de "+fm(tg),circles:1,monthly:fm(Math.round(tg/6)),fee:16,total:fm(Math.round(tg*1.16)),dur:"6 mois"},
{name:"2 cercles de "+fm(Math.round(tg/2)),circles:2,monthly:fm(Math.round(tg/2/6)),fee:8,total:fm(Math.round(tg*1.08)),dur:"6 mois",recommended:true},
{name:"1 cercle (dernier slot)",circles:1,monthly:fm(Math.round(tg/6)),fee:0,total:fm(tg),dur:"6 mois (dernier)"}]:[];
return <Scroll><Hdr title="Smart Split" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.blue},${C.kolo})`,borderRadius:20,padding:20,marginBottom:16,color:"#fff"}}>
<div style={{fontSize:16,fontWeight:800}}>Optimiseur de cercles</div>
<div style={{fontSize:12,opacity:.8}}>On trouve la meilleure combinaison pour réduire vos frais</div></div>
<Inp label="Montant dont vous avez besoin (FCFA)" ph="200000" val={target} set={setTarget} type="number"/>
{options.map((o,i)=><div key={i} style={{background:C.card,borderRadius:16,padding:16,marginBottom:10,border:`1.5px solid ${o.recommended?C.green:C.brdL}`,position:"relative"}}>
{o.recommended&&<div style={{position:"absolute",top:-8,right:12,background:C.green,color:"#fff",fontSize:10,fontWeight:700,padding:"2px 10px",borderRadius:10}}>RECOMMANDÉ</div>}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:8}}>{o.name}</div>
{[{l:"Cercles",v:o.circles},{l:"Mensualité",v:o.monthly+" F"},{l:"Frais",v:o.fee+"%"},{l:"Durée",v:o.dur},{l:"Coût total",v:o.total+" F"}].map((r,j)=><div key={j} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:12}}><span style={{color:C.t3}}>{r.l}</span><span style={{fontWeight:600,color:C.t1}}>{r.v}</span></div>)}
<div style={{marginTop:8}}><Btn full onClick={()=>go("slotSelect")} sx={{padding:"10px",fontSize:12}}>Choisir</Btn></div>
</div>)}
</Scroll>;}

// ── 14. Support Ticketing ──
function Support({go}){const[msg,setMsg]=useState("");const[cat,setCat]=useState(null);
const cats=["Paiement","Cercle","KYC","Kolo Card","Technique","Autre"];
const tickets=[{id:"#TK-0042",subj:"Cotisation non créditée",status:"open",d:"06 Avr"},{id:"#TK-0038",subj:"Problème de retrait",status:"resolved",d:"01 Avr"}];
return <Scroll><Hdr title="Support" onBack={()=>go("back")}/>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Nouveau ticket</div>
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>{cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:"8px 14px",borderRadius:50,border:`1.5px solid ${cat===c?C.blue:C.brd}`,background:cat===c?C.blueL:C.card,color:cat===c?C.blue:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{c}</button>)}</div>
<Inp label="Décrivez votre problème" ph="Ex: Ma cotisation du 05 Avr n'a pas été créditée sur le Cercle Élite..." val={msg} set={setMsg} area/>
<Btn full onClick={()=>go("ok")} dis={!cat||!msg}>{Z.send} Envoyer le ticket</Btn>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:20,marginBottom:10}}>Mes tickets</div>
{tickets.map(t=><div key={t.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{t.subj}</div><div style={{fontSize:11,color:C.t3}}>{t.id} · {t.d}</div></div>
<Bdg s={t.status==="open"?"pending":"completed"}/></div>)}
</Scroll>;}

// ── 15. Merchant Loyalty Program ──
function Loyalty({go}){const pts=2450;
const rewards=[{n:"1 000 F Kolo Pay",pts:1000,available:true},{n:"Ticket cinéma CanalOlympia",pts:2000,available:true},{n:"1 mois data Airtel 5GB",pts:3000,available:false},{n:"Bon Shoprite 5 000 F",pts:5000,available:false}];
return <Scroll><Hdr title="Programme fidélité" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.gold},${C.orange})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20,color:"#fff"}}>
<div style={{fontSize:13,opacity:.8}}>Vos points fidélité</div>
<div style={{fontSize:36,fontWeight:800}}>{fm(pts)}</div>
<div style={{fontSize:12,opacity:.7}}>Gagnez 100 pts par cotisation à temps</div></div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Échanger mes points</div>
{rewards.map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${pts>=r.pts?C.green+"30":C.brdL}`,opacity:pts>=r.pts?1:.5}}>
<div style={{width:40,height:40,borderRadius:12,background:C.goldL,display:"flex",alignItems:"center",justifyContent:"center",color:C.gold}}>{Z.gift}</div>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{r.n}</div><div style={{fontSize:11,color:C.t3}}>{fm(r.pts)} points</div></div>
{pts>=r.pts?<Btn sx={{padding:"6px 14px",fontSize:11}}>Échanger</Btn>:<span style={{fontSize:10,color:C.t3}}>-{fm(r.pts-pts)} pts</span>}
</div>)}
</Scroll>;}

// ── 16. Complete Create Circle Flow ──
function CreateCircleFull({go}){const[step,setStep]=useState(1);const[name,setName]=useState("");const[amt,setAmt]=useState("");const[freq,setFreq]=useState("Mensuel");const[maxMem,setMaxMem]=useState("6");const[pen,setPen]=useState("5");const[desc,setDesc]=useState("");const[pub,setPub]=useState(false);const[invited,setInvited]=useState(["Grace Mouanda","Divine Loemba"]);const[newInv,setNewInv]=useState("");
return <Scroll><Hdr title="Créer un cercle" onBack={()=>step>1?setStep(step-1):go("back")}/>
<div style={{display:"flex",gap:4,marginBottom:20}}>{[1,2,3,4].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?C.blue:C.brd}}/>)}</div>

{step===1&&<div>
<div style={{fontSize:16,fontWeight:700,color:C.t0,marginBottom:16}}>Informations du cercle</div>
<Inp label="Nom du cercle" ph="Ex: Cercle Famille, Cercle Business..." val={name} set={setName}/>
<Inp label="Description (optionnel)" ph="Décrivez le but de ce cercle..." val={desc} set={setDesc} area/>
<Inp label="Montant par tour (FCFA)" ph="25000" val={amt} set={setAmt} type="number"/>
<div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:6,display:"block"}}>Fréquence</label>
<div style={{display:"flex",gap:8}}>{["Quotidien","Hebdo","Bi-mensuel","Mensuel"].map(f=><button key={f} onClick={()=>setFreq(f)} style={{flex:1,padding:"12px 0",borderRadius:12,border:"none",cursor:"pointer",background:freq===f?C.blue:C.card,color:freq===f?"#fff":C.t2,fontSize:11,fontWeight:600}}>{f}</button>)}</div></div>
<Btn full onClick={()=>setStep(2)} dis={!name||!amt}>Suivant</Btn>
</div>}

{step===2&&<div>
<div style={{fontSize:16,fontWeight:700,color:C.t0,marginBottom:16}}>Paramètres</div>
<Inp label="Nombre max de membres" ph="6" val={maxMem} set={setMaxMem} type="number"/>
<Inp label="Pénalité de retard (%/jour)" ph="5" val={pen} set={setPen} type="number"/>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",background:C.card,borderRadius:16,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div><div style={{fontSize:14,fontWeight:600,color:C.t1}}>Cercle public</div><div style={{fontSize:11,color:C.t3}}>Visible dans le marketplace</div></div>
<Toggle v={pub} set={setPub}/></div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",background:C.card,borderRadius:16,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div><div style={{fontSize:14,fontWeight:600,color:C.t1}}>Paiement auto (recommandé)</div><div style={{fontSize:11,color:C.t3}}>Prélèvement automatique chaque mois</div></div>
<Toggle v={true} set={()=>{}}/></div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",background:C.card,borderRadius:16,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div><div style={{fontSize:14,fontWeight:600,color:C.t1}}>Fonds de garantie (2%)</div><div style={{fontSize:11,color:C.t3}}>Protection contre les défauts</div></div>
<Toggle v={true} set={()=>{}}/></div>
<Btn full onClick={()=>setStep(3)}>Suivant</Btn>
</div>}

{step===3&&<div>
<div style={{fontSize:16,fontWeight:700,color:C.t0,marginBottom:16}}>Inviter des membres</div>
<div style={{display:"flex",gap:8,marginBottom:16}}><div style={{flex:1}}><Inp ph="Nom ou numéro..." val={newInv} set={setNewInv}/></div><Btn onClick={()=>{if(newInv.trim()){setInvited(p=>[...p,newInv.trim()]);setNewInv("");}}} sx={{flexShrink:0}}>{Z.plus}</Btn></div>
{invited.map((inv,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<Av ini={inv.split(" ").map(w=>w[0]).join("")} sz={36}/><span style={{flex:1,fontSize:13,fontWeight:600,color:C.t1}}>{inv}</span>
<button onClick={()=>setInvited(p=>p.filter((_,j)=>j!==i))} style={{fontSize:11,color:C.red,background:C.redL,border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>Retirer</button></div>)}
<div style={{display:"flex",gap:8,marginTop:12}}>
<Btn v="s" full sx={{flex:1}}>WhatsApp</Btn><Btn v="s" full sx={{flex:1}}>SMS</Btn><Btn v="s" full sx={{flex:1}}>{Z.link} Lien</Btn></div>
<div style={{marginTop:16}}><Btn full onClick={()=>setStep(4)}>Suivant ({invited.length} invités)</Btn></div>
</div>}

{step===4&&<div>
<div style={{fontSize:16,fontWeight:700,color:C.t0,marginBottom:16}}>Résumé</div>
<div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,marginBottom:16}}>
{[{l:"Nom",v:name},{l:"Montant/tour",v:fm(amt)+" FCFA"},{l:"Fréquence",v:freq},{l:"Membres max",v:maxMem},{l:"Pénalité",v:pen+"%/jour"},{l:"Type",v:pub?"Public":"Privé"},{l:"Invités",v:invited.length+" personnes"},{l:"Fonds garantie",v:"2%"},{l:"Paiement auto",v:"Activé"}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<8?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:600,color:C.t1}}>{r.v}</span></div>)}
</div>
<div style={{background:C.blueL,borderRadius:14,padding:14,marginBottom:16,border:`1px solid ${C.blue}15`}}>
<div style={{fontSize:12,color:C.blue}}>En créant ce cercle, un contrat numérique sera généré et envoyé à chaque membre pour signature.</div></div>
<Btn full onClick={()=>go("ok")}>Créer le cercle</Btn>
</div>}
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
      case "createCircle": return <CreateCircleFull go={go}/>;
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
      case "kycFull": return <KYCFull go={go}/>;
      case "escrow": return <Escrow go={go}/>;
      case "trustScore": return <TrustScore go={go}/>;
      case "emergencyFund": return <EmergencyFund go={go}/>;
      case "sanctions": return <Sanctions go={go}/>;
      case "groupDashboard": return <GroupDashboard go={go}/>;
      case "recoveryDossier": return <RecoveryDossier go={go}/>;
      case "contract": return <Contract go={go}/>;
      case "slotSelect": return <SlotSelect go={go}/>;
      case "payMethods": return <PayMethods go={go}/>;
      case "addPayMethod": return <AddPayMethod go={go}/>;
      case "cardMerchants": return <CardMerchants go={go}/>;
      case "savingsProgram": return <SavingsProgram go={go}/>;
      case "notifPrefs": return <NotifPrefs go={go}/>;
      case "invest": return <Invest go={go}/>;
      case "budgetPlanner": return <BudgetPlanner go={go}/>;
      case "luckyDraw": return <LuckyDraw go={go}/>;
      case "creditBureau": return <CreditBureau go={go}/>;
      case "corporate": return <Corporate go={go}/>;
      case "autoPay": return <AutoPay go={go}/>;
      case "smartSplit": return <SmartSplit go={go}/>;
      case "support": return <Support go={go}/>;
      case "loyalty": return <Loyalty go={go}/>;
      case "createCircleFull": return <CreateCircleFull go={go}/>;
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
        <div style={{height:"100%",paddingTop:noSB.includes(sc)?0:16}}>{render()}</div>
      </div>
    </div>
  );
}

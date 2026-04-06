import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   LIKELEMBA — Tontine Digitale Complète
   Navy + Gold · Kolo Pay Wallet · 30+ écrans
   Lamuka Tech · Congo-Brazzaville
   ═══════════════════════════════════════════════════ */

const C={bg:"#F5F6FA",card:"#FFFFFF",navy:"#0B1D3A",navyM:"#132D52",gold:"#F5A623",goldL:"rgba(245,166,35,0.1)",blue:"#1A56DB",blueD:"#1444B0",blueL:"rgba(26,86,219,0.08)",blueM:"rgba(26,86,219,0.15)",green:"#059669",greenL:"rgba(5,150,105,0.08)",red:"#DC2626",redL:"rgba(220,38,38,0.08)",orange:"#D97706",orangeL:"rgba(217,119,6,0.08)",purple:"#7C3AED",purpleL:"rgba(124,58,237,0.08)",kolo:"#6366F1",koloL:"rgba(99,102,241,0.08)",t0:"#0F172A",t1:"#1E293B",t2:"#64748B",t3:"#94A3B8",t4:"#CBD5E1",brd:"#E2E8F0",brdL:"#EEF2F6",sh:"0 2px 12px rgba(0,0,0,0.05)",shM:"0 4px 24px rgba(0,0,0,0.08)"};
const fm=n=>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ");
const css=`*::-webkit-scrollbar{display:none!important}*{-ms-overflow-style:none!important;scrollbar-width:none!important}input,textarea,select{font-family:inherit}
.lk-out{display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',sans-serif;background:${C.bg};padding:0}
.lk-frame{width:100%;height:100vh;height:100dvh;position:relative;overflow:hidden;background:${C.bg}}
.lk-sb{display:none!important}
@media(min-width:900px){
.lk-out{background:#E8ECF0;padding:20px}
.lk-frame{width:390px;height:844px;border-radius:44px;box-shadow:0 0 0 2px #D1D5DB,0 0 0 4px #B8BFC7,0 25px 80px rgba(0,0,0,0.2)}
.lk-sb{display:flex!important}
}`;

// ── Icons ──
const Z={
back:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
fwd:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
home:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
grp:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
wal:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
usr:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
up:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
dn:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>,
qr:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><path d="M20 14v3h-3M20 20h-3"/></svg>,
bell:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
gear:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
plus:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
ok:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
okW:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
okBig:<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
eye:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
eyeX:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
srch:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
phone:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
lock:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
shield:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
globe:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
help:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
cal:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
clk:<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
gift:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>,
doc:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
tgt:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
msg:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
send:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
link:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
star:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
cam:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
copy:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
warn:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
};

// ── SVG Illustrations ──
const ILL={
  community: <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none">
    {/* Background circles */}
    <circle cx="150" cy="150" r="140" fill={C.blue} opacity="0.04"/>
    <circle cx="150" cy="150" r="110" fill={C.blue} opacity="0.06"/>
    <circle cx="150" cy="150" r="80" fill={C.blue} opacity="0.08"/>
    {/* Center person */}
    <circle cx="150" cy="110" r="28" fill={C.blue}/>
    <path d="M150 138c-22 0-40 18-40 40v16h80v-16c0-22-18-40-40-40z" fill={C.blue}/>
    {/* Left person */}
    <circle cx="70" cy="130" r="20" fill={C.gold}/>
    <path d="M70 150c-16 0-30 14-30 30v12h60v-12c0-16-14-30-30-30z" fill={C.gold}/>
    {/* Right person */}
    <circle cx="230" cy="130" r="20" fill={C.green}/>
    <path d="M230 150c-16 0-30 14-30 30v12h60v-12c0-16-14-30-30-30z" fill={C.green}/>
    {/* Top left person */}
    <circle cx="95" cy="60" r="16" fill={C.purple}/>
    <path d="M95 76c-12 0-22 10-22 22v8h44v-8c0-12-10-22-22-22z" fill={C.purple}/>
    {/* Top right person */}
    <circle cx="205" cy="60" r="16" fill={C.orange}/>
    <path d="M205 76c-12 0-22 10-22 22v8h44v-8c0-12-10-22-22-22z" fill={C.orange}/>
    {/* Connection lines */}
    <line x1="100" y1="130" x2="130" y2="120" stroke={C.blue} strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
    <line x1="200" y1="130" x2="170" y2="120" stroke={C.blue} strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
    <line x1="105" y1="75" x2="135" y2="100" stroke={C.blue} strokeWidth="2" strokeDasharray="4 4" opacity="0.2"/>
    <line x1="195" y1="75" x2="165" y2="100" stroke={C.blue} strokeWidth="2" strokeDasharray="4 4" opacity="0.2"/>
    {/* Coins/money floating */}
    <circle cx="50" cy="220" r="14" fill={C.gold} opacity="0.8"/><text x="50" y="225" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">F</text>
    <circle cx="250" cy="210" r="11" fill={C.gold} opacity="0.6"/><text x="250" y="215" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">F</text>
    <circle cx="150" cy="240" r="16" fill={C.gold} opacity="0.9"/><text x="150" y="245" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">F</text>
    <circle cx="100" cy="250" r="9" fill={C.gold} opacity="0.4"/>
    <circle cx="200" cy="255" r="7" fill={C.gold} opacity="0.3"/>
    {/* Arrows showing rotation */}
    <path d="M80 220 Q 115 260 150 240" stroke={C.blue} strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="4 3"/>
    <path d="M150 240 Q 185 260 220 215" stroke={C.blue} strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="4 3"/>
  </svg>,
  
  security: <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none">
    {/* Background glow */}
    <circle cx="150" cy="140" r="130" fill={C.blue} opacity="0.03"/>
    <circle cx="150" cy="140" r="100" fill={C.blue} opacity="0.05"/>
    {/* Shield */}
    <path d="M150 30l-80 40v60c0 55 34 106 80 128 46-22 80-73 80-128V70l-80-40z" fill={C.blue} opacity="0.06"/>
    <path d="M150 50l-60 30v46c0 42 26 82 60 98 34-16 60-56 60-98V80l-60-30z" fill={C.blue} opacity="0.1"/>
    <path d="M150 70l-42 21v33c0 30 18 58 42 70 24-12 42-40 42-70V91l-42-21z" fill={C.blue} opacity="0.15"/>
    <path d="M150 90l-26 13v22c0 20 12 38 26 46 14-8 26-26 26-46v-22l-26-13z" fill={C.blue}/>
    <polyline points="138,118 147,127 164,108" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Lock icon left */}
    <rect x="40" y="200" width="40" height="35" rx="6" fill={C.blue} opacity="0.12"/>
    <rect x="48" y="190" width="24" height="15" rx="10" fill="none" stroke={C.blue} strokeWidth="3" opacity="0.2"/>
    <circle cx="60" cy="215" r="3" fill={C.blue} opacity="0.3"/>
    {/* Phone icon right */}
    <rect x="220" y="195" width="32" height="50" rx="6" fill={C.green} opacity="0.12"/>
    <rect x="226" y="200" width="20" height="30" rx="2" fill={C.green} opacity="0.08"/>
    <circle cx="236" cy="238" r="3" fill={C.green} opacity="0.2"/>
    {/* Checkmarks floating */}
    <circle cx="80" cy="160" r="12" fill={C.green} opacity="0.15"/><polyline points="75,160 79,164 87,155" stroke={C.green} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    <circle cx="225" cy="145" r="10" fill={C.green} opacity="0.12"/><polyline points="221,145 224,148 231,140" stroke={C.green} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    <circle cx="120" cy="240" r="8" fill={C.green} opacity="0.1"/><polyline points="117,240 119,242 125,236" stroke={C.green} strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    {/* Encrypted data lines */}
    <rect x="100" y="270" width="100" height="4" rx="2" fill={C.blue} opacity="0.06"/>
    <rect x="120" y="280" width="60" height="4" rx="2" fill={C.blue} opacity="0.04"/>
  </svg>,
  
  wallet: <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none">
    {/* Background */}
    <circle cx="150" cy="140" r="130" fill={C.blue} opacity="0.03"/>
    {/* Card back shadow */}
    <rect x="55" y="75" width="190" height="120" rx="16" fill={C.navy} opacity="0.08" transform="rotate(-5 150 135)"/>
    {/* Main card */}
    <rect x="50" y="65" width="200" height="130" rx="16" fill={C.navy}/>
    <rect x="50" y="65" width="200" height="130" rx="16" fill="url(#cardGrad)"/>
    <defs><linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.navy}/><stop offset="100%" stopColor="#1A3A6B"/></linearGradient></defs>
    {/* Card chip */}
    <rect x="75" y="100" width="35" height="28" rx="5" fill={C.gold} opacity="0.7"/>
    <line x1="75" y1="110" x2="110" y2="110" stroke={C.navy} strokeWidth="1" opacity="0.3"/>
    <line x1="75" y1="118" x2="110" y2="118" stroke={C.navy} strokeWidth="1" opacity="0.3"/>
    <line x1="92" y1="100" x2="92" y2="128" stroke={C.navy} strokeWidth="1" opacity="0.3"/>
    {/* Card number */}
    <text x="75" y="158" fontSize="13" fontWeight="600" fill="rgba(255,255,255,0.6)" letterSpacing="3">•••• •••• •••• 8901</text>
    {/* Card brand */}
    <text x="75" y="180" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.4)">KOLO PAY</text>
    <circle cx="225" cy="172" r="14" fill={C.gold} opacity="0.7"/>
    <circle cx="215" cy="172" r="14" fill={C.orange} opacity="0.5"/>
    {/* Kolo diamond logo */}
    <polygon points="150,210 165,235 150,260 135,235" fill={C.kolo} opacity="0.15"/>
    <polygon points="150,218 158,235 150,252 142,235" fill={C.kolo} opacity="0.3"/>
    <polygon points="150,226 154,235 150,244 146,235" fill={C.kolo}/>
    {/* Floating elements */}
    <circle cx="40" cy="240" r="12" fill={C.green} opacity="0.12"/>
    <polyline points="35,240 39,244 47,235" stroke={C.green} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    <circle cx="260" cy="230" r="10" fill={C.gold} opacity="0.15"/>
    <text x="260" y="234" textAnchor="middle" fontSize="10" fontWeight="800" fill={C.gold} opacity="0.5">F</text>
    {/* MTN + Airtel small icons */}
    <circle cx="100" cy="280" r="10" fill="#FFCC00" opacity="0.3"/><text x="100" y="284" textAnchor="middle" fontSize="8" fontWeight="800" fill="#000" opacity="0.4">M</text>
    <circle cx="130" cy="280" r="10" fill="#ED1C24" opacity="0.3"/><text x="130" y="284" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" opacity="0.6">A</text>
    <circle cx="160" cy="280" r="12" fill={C.kolo} opacity="0.3"/><text x="160" y="284" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" opacity="0.6">K</text>
  </svg>,
};

// ── Icon renderer (replaces emojis) ──
const SvgIc=({type,size=24})=>{
  const s=size;
  const icons={
    kolo:<svg width={s} height={s} viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" fill={C.kolo}/><circle cx="12" cy="12" r="3" fill="#fff" opacity="0.4"/></svg>,
    mtn:<svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#FFCC00"/><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#000">M</text></svg>,
    airtel:<svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#ED1C24"/><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">A</text></svg>,
    orange:<svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#FF6600"/><text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">O</text></svg>,
    house:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    laptop:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    shieldCheck:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11.5 14.5 15 10"/></svg>,
    plane:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5 5.1 3.1-3.6 2.1-2 .5-.5.9 2.8 1.2 1.2 2.8.9-.5.5-2 2.1-3.6 3.1 5.1.5-.3c.4-.2.6-.6.5-1.1z"/></svg>,
    phone:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    appliance:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="14" x2="20" y2="14"/><circle cx="8" cy="18" r="1"/><circle cx="12" cy="18" r="1"/></svg>,
    scooter:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="18" r="3"/><circle cx="17" cy="18" r="3"/><path d="M7 18h10"/><path d="M11 18V8l4 4h4"/><path d="M15 8V4"/></svg>,
    market:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    cardIc:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/><rect x="4" y="14" width="4" height="2" rx="1" fill={C.gold} stroke="none"/></svg>,
    bag:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    trophy:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2"/><path d="M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2"/><path d="M4 22h16"/><path d="M10 22V10"/><path d="M14 22V10"/><rect x="6" y="2" width="12" height="8" rx="2"/></svg>,
    lockBig:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg>,
    gift:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>,
    tag:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    cart:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
    fuel:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="12" height="18" rx="1"/><path d="M16 10h2a2 2 0 012 2v4a2 2 0 002 2"/><line x1="8" y1="10" x2="12" y2="10"/></svg>,
    store:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7"/><path d="M3 9v12h18V9"/><rect x="9" y="13" width="6" height="8"/></svg>,
    handshake:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L20 8l-9 9z"/><path d="M2 12l5-5 3 3"/><path d="M22 12l-5-5-3 3"/></svg>,
  };
  return icons[type]||null;
};

// ── DATA ──
const MEM=[{id:1,n:"Joeldy T.",i:"JT",p:"+242 06 466 3469",ok:true,t:1,pen:0},{id:2,n:"Grace M.",i:"GM",p:"+242 05 512 8834",ok:true,t:2,pen:0},{id:3,n:"Patrick K.",i:"PK",p:"+242 06 891 2245",ok:false,t:3,pen:1250},{id:4,n:"Merveille N.",i:"MN",p:"+242 05 334 7712",ok:true,t:4,pen:0},{id:5,n:"Blessing O.",i:"BO",p:"+242 06 223 5501",ok:false,t:5,pen:1250},{id:6,n:"Divine L.",i:"DL",p:"+242 05 667 9983",ok:true,t:6,pen:0}];
const CIR=[{id:1,name:"Cercle Élite",mem:6,amt:25000,freq:"Mensuel",tot:150000,prog:67,turn:"Joeldy T.",next:"01 Mai 2026",code:"ELITE2026",pen:5,created:"15 Jan 2026",admin:true},{id:2,name:"Cercle Amis",mem:8,amt:10000,freq:"Bi-mensuel",tot:80000,prog:45,turn:"Grace M.",next:"15 Avr 2026",code:"AMIS2026",pen:5,created:"01 Fév 2026",admin:false},{id:3,name:"Cercle Business",mem:10,amt:50000,freq:"Mensuel",tot:500000,prog:30,turn:"Patrick K.",next:"01 Mai 2026",code:"BIZ2026",pen:10,created:"01 Mar 2026",admin:true}];
const TXS=[{id:1,t:"in",n:"Grace M.",d:"Cotisation reçue",a:25000,dt:"Aujourd'hui",tm:"14:32",circle:"Cercle Élite",ref:"LK-TX-0891"},{id:2,t:"in",n:"Divine L.",d:"Cotisation reçue",a:25000,dt:"Aujourd'hui",tm:"13:10",circle:"Cercle Élite",ref:"LK-TX-0890"},{id:3,t:"out",n:"Cercle Élite",d:"Versement cotisation",a:25000,dt:"Hier",tm:"09:15",circle:"Cercle Élite",ref:"LK-TX-0889"},{id:4,t:"in",n:"Merveille N.",d:"Cotisation reçue",a:25000,dt:"Hier",tm:"08:42",circle:"Cercle Élite",ref:"LK-TX-0888"},{id:5,t:"out",n:"Kolo Pay",d:"Retrait vers MTN",a:50000,dt:"03 Avr",tm:"16:20",circle:"",ref:"LK-TX-0880"},{id:6,t:"in",n:"Cercle Amis",d:"Gain tontine",a:80000,dt:"01 Avr",tm:"10:00",circle:"Cercle Amis",ref:"LK-TX-0870"}];
const WALLETS=[{id:0,n:"Kolo Pay",num:"Wallet interne",bal:95000,logo:"kolo",col:C.kolo,desc:"Votre portefeuille Likelemba"},{id:1,n:"MTN Mobile Money",num:"••• 3469",bal:175000,logo:"mtn",col:"#FFCC00",desc:""},{id:2,n:"Airtel Money",num:"••• 8834",bal:62000,logo:"airtel",col:"#ED1C24",desc:""}];
const NOTIFS=[{id:1,tp:"warn",tt:"Rappel cotisation",ds:"Cotisation Cercle Élite due dans 3 jours",tm:"Il y a 2h",rd:false},{id:2,tp:"in",tt:"Cotisation reçue",ds:"Grace M. a versé 25 000 FCFA",tm:"Il y a 5h",rd:false},{id:3,tp:"pen",tt:"Pénalité appliquée",ds:"Patrick K. pénalisé de 1 250 FCFA (5%)",tm:"Il y a 8h",rd:false},{id:4,tp:"gift",tt:"Votre tour approche !",ds:"Cagnotte Cercle Amis le 15 Avr",tm:"Hier",rd:true},{id:5,tp:"add",tt:"Nouveau membre",ds:"Blessing O. a rejoint Cercle Élite",tm:"Il y a 2j",rd:true},{id:6,tp:"msg",tt:"Nouveau message",ds:"Grace M. dans Cercle Élite: 'Salut tout le monde!'",tm:"Il y a 3h",rd:false}];
const RWDS=[{id:1,tt:"Cotiseur fidèle",ds:"12 cotisations à temps",pt:200,ok:true},{id:2,tt:"Zéro retard",ds:"3 mois sans retard",pt:300,ok:true},{id:3,tt:"Ambassadeur",ds:"Inviter 5 personnes",pt:150,ok:false},{id:4,tt:"Créateur",ds:"Créer un cercle",pt:100,ok:true},{id:5,tt:"Épargnant d'or",ds:"Épargner 500K FCFA",pt:500,ok:false}];
const SAV=[{id:1,n:"Terrain Brazzaville",tg:2000000,sv:850000,ic:"house",cl:C.blue},{id:2,n:"MacBook Pro",tg:800000,sv:320000,ic:"laptop",cl:C.purple},{id:3,n:"Fonds d'urgence",tg:500000,sv:500000,ic:"shieldCheck",cl:C.green},{id:4,n:"Voyage Dubaï",tg:1500000,sv:200000,ic:"plane",cl:C.gold}];
const RCPT=[{id:1,c:"Cercle Élite",a:25000,s:"paid",d:"05 Avr 2026",r:"LK-0412"},{id:2,c:"Cercle Amis",a:10000,s:"paid",d:"01 Avr 2026",r:"LK-0398"},{id:3,c:"Cercle Business",a:50000,s:"pending",d:"01 Mai 2026",r:"LK-0425"},{id:4,c:"Cercle Élite",a:25000,s:"paid",d:"01 Mar 2026",r:"LK-0301"}];
const MSGS=[{id:1,from:"Grace M.",ini:"GM",msg:"Salut tout le monde! N'oubliez pas la cotisation 😊",time:"14:30",me:false},{id:2,from:"Joeldy T.",ini:"JT",msg:"Merci Grace! J'ai déjà cotisé.",time:"14:32",me:true},{id:3,from:"Divine L.",ini:"DL",msg:"Moi aussi c'est fait ✅",time:"14:35",me:false},{id:4,from:"Grace M.",ini:"GM",msg:"Super! Il reste Patrick et Blessing",time:"14:36",me:false},{id:5,from:"Joeldy T.",ini:"JT",msg:"Je vais leur envoyer un rappel",time:"14:38",me:true}];
const FAQS=[{q:"Comment créer un cercle ?",a:"Allez dans l'onglet Cercles > Créer un cercle. Définissez le nom, montant, fréquence et invitez vos membres."},{q:"Comment fonctionne la pénalité ?",a:"Si un membre ne cotise pas à temps, une pénalité de 5-10% du montant est automatiquement appliquée."},{q:"Qu'est-ce que Kolo Pay ?",a:"Kolo Pay est votre portefeuille interne Likelemba. Vos gains de tontine y sont déposés. Vous pouvez retirer vers MTN ou Airtel."},{q:"Comment inviter des membres ?",a:"Partagez le code du cercle ou envoyez une invitation par SMS/WhatsApp depuis la page du cercle."},{q:"Mes fonds sont-ils sécurisés ?",a:"Oui, toutes les transactions sont sécurisées et tracées. Vos fonds Kolo Pay sont protégés."}];
const LANGS=[{code:"fr",name:"Français",flag:"🇫🇷",active:true},{code:"ln",name:"Lingala",flag:"🇨🇬",active:false},{code:"en",name:"English",flag:"🇬🇧",active:false}];

// ── Components ──
const Btn=({children,onClick,v="p",full,sx,dis})=>{
  const m={p:{background:`linear-gradient(135deg,${C.blue},${C.blueD})`,color:"#fff",border:"none",boxShadow:"0 4px 16px rgba(26,86,219,0.25)"},s:{background:C.card,color:C.t1,border:`1.5px solid ${C.brd}`,boxShadow:"none"}};
  return <button disabled={dis} onClick={onClick} style={{...m[v],borderRadius:50,padding:"14px 28px",fontSize:14,fontWeight:600,cursor:dis?"not-allowed":"pointer",opacity:dis?.5:1,width:full?"100%":"auto",display:"flex",alignItems:"center",justifyContent:"center",gap:8,...sx}}>{children}</button>;
};
const Av=({ini,sz=44,col})=>{const h=(ini.charCodeAt(0)*37+(ini[1]?.charCodeAt(0)||0)*97)%360;return <div style={{width:sz,height:sz,borderRadius:sz/2,background:col||`hsl(${h},45%,92%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*.36,fontWeight:700,color:col?"#fff":`hsl(${h},45%,40%)`,flexShrink:0}}>{ini}</div>;};
const Hdr=({title,onBack,right})=>(<div style={{display:"flex",alignItems:"center",padding:"6px 0 14px",gap:12}}>{onBack&&<button onClick={onBack} style={{background:C.card,border:`1px solid ${C.brd}`,borderRadius:12,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.t1}}>{Z.back}</button>}<span style={{flex:1,fontSize:18,fontWeight:700,color:C.t0}}>{title}</span>{right}</div>);
const Bdg=({s})=>{const m={paid:{bg:C.greenL,c:C.green,l:"Payé"},pending:{bg:C.orangeL,c:C.orange,l:"En attente"},overdue:{bg:C.redL,c:C.red,l:"En retard"},completed:{bg:C.blueL,c:C.blue,l:"Complété"}};const x=m[s]||m.pending;return <span style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:20,background:x.bg,color:x.c}}>{x.l}</span>;};
const Inp=({label,ph,val,set,icon,type="text",area})=>(<div style={{marginBottom:16}}>{label&&<label style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:6,display:"block"}}>{label}</label>}<div style={{display:"flex",alignItems:area?"flex-start":"center",gap:10,padding:area?"12px 16px":"14px 16px",background:C.card,borderRadius:12,border:`1.5px solid ${C.brd}`}}>{icon&&<span style={{color:C.t3,marginTop:area?2:0}}>{icon}</span>}{area?<textarea placeholder={ph} value={val} onChange={e=>set(e.target.value)} rows={3} style={{flex:1,border:"none",background:"none",outline:"none",fontSize:14,color:C.t0,resize:"none"}}/>:<input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)} style={{flex:1,border:"none",background:"none",outline:"none",fontSize:15,color:C.t0,fontWeight:500}}/>}</div></div>);
const TxR=({tx,onClick})=>(<div onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0",borderBottom:`1px solid ${C.brd}`,cursor:onClick?"pointer":"default"}}><div style={{width:42,height:42,borderRadius:14,background:tx.t==="in"?C.greenL:C.redL,display:"flex",alignItems:"center",justifyContent:"center",color:tx.t==="in"?C.green:C.red}}>{tx.t==="in"?Z.dn:Z.up}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{tx.n}</div><div style={{fontSize:12,color:C.t3}}>{tx.d}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:tx.t==="in"?C.green:C.t1}}>{tx.t==="in"?"+":"-"}{fm(tx.a)} F</div><div style={{fontSize:11,color:C.t3}}>{tx.dt}</div></div></div>);
const Toggle=({v,set})=>(<button onClick={()=>set(!v)} style={{width:48,height:28,borderRadius:14,border:"none",cursor:"pointer",background:v?C.blue:C.brd,padding:2}}><div style={{width:24,height:24,borderRadius:12,background:"#fff",transform:v?"translateX(20px)":"translateX(0)",transition:"transform 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.15)"}}/></button>);
const MenuRow=({icon,label,onClick,right,color})=>(<button onClick={onClick} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",width:"100%",background:C.card,borderRadius:12,marginBottom:6,cursor:"pointer",border:`1px solid ${C.brdL}`,textAlign:"left"}} onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background=C.card}><span style={{color:color||C.blue}}>{icon}</span><span style={{flex:1,fontSize:14,fontWeight:500,color:C.t1}}>{label}</span>{right||<span style={{color:C.t4}}>{Z.fwd}</span>}</button>);

// ═══════════════ SCREENS ═══════════════

// ── Splash ──
function Splash({go}){const[s,setS]=useState(false);useEffect(()=>{setTimeout(()=>setS(true),200);setTimeout(()=>go("onb"),2400)},[]);
return(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:`linear-gradient(160deg,${C.navy},${C.navyM})`}}>
<div style={{width:80,height:80,borderRadius:24,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,display:"flex",alignItems:"center",justifyContent:"center",transform:s?"scale(1)":"scale(0.5)",opacity:s?1:0,transition:"all 0.6s cubic-bezier(0.34,1.56,0.64,1)",boxShadow:"0 20px 60px rgba(26,86,219,0.4)"}}><span style={{fontSize:30,fontWeight:900,color:"#fff"}}>LK</span></div>
<div style={{marginTop:18,fontSize:28,fontWeight:800,color:"#fff",opacity:s?1:0,transition:"opacity 0.5s ease 0.3s"}}>Likelemba</div>
<div style={{fontSize:11,color:C.gold,marginTop:6,fontWeight:600,letterSpacing:3,textTransform:"uppercase",opacity:s?1:0,transition:"opacity 0.5s ease 0.5s"}}>Tontine Digitale</div>
<div style={{position:"absolute",bottom:40,fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:1.5,opacity:s?1:0,transition:"opacity 0.5s ease 0.7s"}}>LAMUKA TECH</div></div>);}

// ── Onboarding ──
function Onb({go}){const[p,setP]=useState(0);
const pg=[
{img:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=900&fit=crop&crop=faces",t:"Épargnez ensemble",d:"Rejoignez des cercles de confiance, cotisez ensemble et recevez votre cagnotte quand c'est votre tour.",overlay:`linear-gradient(0deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.4) 40%,transparent 70%)`},
{img:"https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=900&fit=crop",t:"100% sécurisé",d:"Chaque transaction est tracée et protégée par Kolo Pay. Votre argent est en sécurité.",overlay:`linear-gradient(0deg,rgba(11,29,58,0.95) 0%,rgba(11,29,58,0.5) 40%,transparent 65%)`},
{img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=900&fit=crop",t:"Kolo Pay",d:"Votre portefeuille intégré. Recevez vos gains, cotisez et payez avec votre Kolo Card.",overlay:`linear-gradient(0deg,rgba(99,102,241,0.95) 0%,rgba(99,102,241,0.4) 40%,transparent 65%)`}
];
return(<div style={{height:"100%",position:"relative",overflow:"hidden"}}>
{/* Background image */}
<div style={{position:"absolute",inset:0,backgroundImage:`url(${pg[p].img})`,backgroundSize:"cover",backgroundPosition:"center",transition:"opacity 0.5s",zIndex:0}}/>
{/* Gradient overlay */}
<div style={{position:"absolute",inset:0,background:pg[p].overlay,zIndex:1}}/>
{/* Skip button */}
{p<2&&<button onClick={()=>go("login")} style={{position:"absolute",top:16,right:20,zIndex:10,background:"rgba(255,255,255,0.2)",backdropFilter:"blur(10px)",border:"none",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",padding:"8px 18px",borderRadius:50}}>Passer</button>}
{/* Content at bottom */}
<div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:5,padding:"0 28px 70px"}}>
<h2 style={{fontSize:28,fontWeight:800,color:"#fff",marginBottom:8}}>{pg[p].t}</h2>
<p style={{fontSize:15,color:"rgba(255,255,255,0.8)",lineHeight:1.6,marginBottom:28}}>{pg[p].d}</p>
<div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:20}}>{pg.map((_,i)=><div key={i} style={{width:p===i?24:8,height:8,borderRadius:4,background:p===i?"#fff":"rgba(255,255,255,0.3)",transition:"all 0.3s"}}/>)}</div>
<Btn full onClick={()=>p<2?setP(p+1):go("login")} sx={{background:"#fff",color:C.t0,boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>{p<2?"Suivant":"Commencer"}</Btn>
</div></div>);}

// ── Login ──
function Login({go}){return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg,padding:"40px 24px",paddingBottom:40}}><div style={{textAlign:"center",marginBottom:36}}><div style={{width:60,height:60,borderRadius:18,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,boxShadow:"0 12px 32px rgba(26,86,219,0.3)"}}><span style={{fontSize:24,fontWeight:900,color:"#fff"}}>LK</span></div><h2 style={{color:C.t0,fontSize:24,fontWeight:800,margin:0}}>Bon retour !</h2><p style={{color:C.t3,fontSize:13,marginTop:6}}>Connectez-vous à votre compte</p></div><div style={{flex:1}}><Inp label="Numéro de téléphone" ph="+242 06 XXX XXXX" icon={Z.phone}/><Inp label="Mot de passe" ph="Entrez votre mot de passe" type="password" icon={Z.lock}/><div style={{textAlign:"right",marginBottom:24}}><button onClick={()=>go("forgot")} style={{background:"none",border:"none",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}>Mot de passe oublié ?</button></div><Btn full onClick={()=>go("pin")}>Se connecter</Btn><div style={{textAlign:"center",marginTop:24,fontSize:14,color:C.t2}}>Pas encore de compte ? <button onClick={()=>go("reg1")} style={{background:"none",border:"none",color:C.gold,fontWeight:700,cursor:"pointer",fontSize:14}}>S'inscrire</button></div></div></div>);}

// ── Register Step 1 ──
function Reg1({go}){const[ok,setOk]=useState(false);return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg,padding:"20px 24px",paddingBottom:40}}><Hdr title="" onBack={()=>go("login")}/><div style={{fontSize:12,color:C.blue,fontWeight:600,marginBottom:4}}>Étape 1/3</div><h2 style={{fontSize:22,fontWeight:800,color:C.t0,margin:"0 0 4px"}}>Créer un compte</h2><p style={{color:C.t3,fontSize:13,marginBottom:24}}>Entrez votre numéro de téléphone</p><Inp label="Numéro de téléphone" ph="+242 06 XXX XXXX" icon={Z.phone}/><div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:28}}><button onClick={()=>setOk(!ok)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${ok?C.blue:C.brd}`,background:ok?C.blue:"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>{ok&&Z.okW}</button><span style={{fontSize:13,color:C.t2,lineHeight:1.4}}>J'accepte les <span style={{color:C.blue,fontWeight:600}}>Conditions</span> et la <span style={{color:C.blue,fontWeight:600}}>Politique de confidentialité</span></span></div><Btn full onClick={()=>go("reg2")} dis={!ok}>Continuer</Btn></div>);}

// ── Register Step 2 (OTP) ──
function Reg2({go}){return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg,padding:"20px 24px",paddingBottom:40}}><Hdr title="" onBack={()=>go("reg1")}/><div style={{fontSize:12,color:C.blue,fontWeight:600,marginBottom:4}}>Étape 2/3</div><h2 style={{fontSize:22,fontWeight:800,color:C.t0,margin:"0 0 4px"}}>Vérification</h2><p style={{color:C.t3,fontSize:13,marginBottom:32}}>Entrez le code à 6 chiffres envoyé par SMS</p><div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:28}}>{[...Array(6)].map((_,i)=><div key={i} style={{width:46,height:54,borderRadius:12,border:`2px solid ${C.brd}`,background:C.card,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:C.t0}}/>)}</div><div style={{textAlign:"center",marginBottom:32}}><span style={{fontSize:13,color:C.t3}}>Pas reçu ? </span><button style={{background:"none",border:"none",color:C.blue,fontWeight:700,fontSize:13,cursor:"pointer"}}>Renvoyer (00:45)</button></div><Btn full onClick={()=>go("reg3")}>Vérifier</Btn></div>);}

// ── Register Step 3 (Profile) ──
function Reg3({go}){return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg,padding:"20px 24px",paddingBottom:40,overflowY:"auto"}}><Hdr title="" onBack={()=>go("reg2")}/><div style={{fontSize:12,color:C.blue,fontWeight:600,marginBottom:4}}>Étape 3/3</div><h2 style={{fontSize:22,fontWeight:800,color:C.t0,margin:"0 0 4px"}}>Votre profil</h2><p style={{color:C.t3,fontSize:13,marginBottom:24}}>Complétez vos informations</p><Inp label="Nom complet" ph="Ex: Joeldy Tsina" icon={Z.usr}/><Inp label="Email (optionnel)" ph="votre@email.com"/><Inp label="Mot de passe" ph="Minimum 8 caractères" type="password" icon={Z.lock}/><Inp label="Confirmer le mot de passe" ph="Retapez le mot de passe" type="password" icon={Z.lock}/><Btn full onClick={()=>go("pin")}>Créer mon compte</Btn></div>);}

// ── Forgot Password ──
function Forgot({go}){return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg,padding:"20px 24px",paddingBottom:40}}><Hdr title="" onBack={()=>go("login")}/><div style={{textAlign:"center",marginBottom:32}}><div style={{width:60,height:60,borderRadius:20,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{Z.lock}</div><h2 style={{fontSize:22,fontWeight:800,color:C.t0,margin:"0 0 6px"}}>Mot de passe oublié ?</h2><p style={{color:C.t3,fontSize:13}}>Entrez votre numéro pour recevoir un code de réinitialisation</p></div><Inp label="Numéro de téléphone" ph="+242 06 XXX XXXX" icon={Z.phone}/><Btn full onClick={()=>go("login")}>Envoyer le code</Btn></div>);}

// ── PIN Screen ──
function Pin({go}){const[pin,setPin]=useState("");const dots=[0,1,2,3];return(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.bg,padding:"20px 24px",paddingBottom:40}}>
<div style={{width:60,height:60,borderRadius:18,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,boxShadow:"0 8px 24px rgba(26,86,219,0.25)"}}><span style={{fontSize:24,fontWeight:900,color:"#fff"}}>LK</span></div>
<h2 style={{fontSize:20,fontWeight:700,color:C.t0,marginBottom:8}}>Entrez votre PIN</h2>
<p style={{color:C.t3,fontSize:13,marginBottom:24}}>4 chiffres pour accéder à votre compte</p>
<div style={{display:"flex",gap:16,marginBottom:32}}>{dots.map((_,i)=><div key={i} style={{width:16,height:16,borderRadius:8,background:pin.length>i?C.blue:C.brd,transition:"all 0.2s"}}/>)}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,width:220}}>{[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=>(<button key={i} onClick={()=>{if(n==="⌫")setPin(p=>p.slice(0,-1));else if(n!==""&&pin.length<4){const np=pin+n;setPin(np);if(np.length===4)setTimeout(()=>go("home"),300);}}} style={{width:66,height:50,borderRadius:14,border:"none",background:n===""?"transparent":C.card,fontSize:n==="⌫"?18:20,fontWeight:600,color:C.t0,cursor:n===""?"default":"pointer",boxShadow:n===""?"none":C.sh,display:"flex",alignItems:"center",justifyContent:"center"}}>{n}</button>))}</div>
<button onClick={()=>go("home")} style={{background:"none",border:"none",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer",marginTop:20}}>Utiliser la biométrie</button></div>);}

// ── Home Tabs ──
function HomeTab({go}){const[sb,setSb]=useState(true);const kolo=WALLETS[0];const tot=WALLETS.reduce((s,a)=>s+a.bal,0);
return(<div>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:24,padding:"22px 20px",marginBottom:20,boxShadow:"0 8px 32px rgba(11,29,58,0.25)"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontSize:12,color:"rgba(255,255,255,0.55)",fontWeight:600,letterSpacing:0.5,textTransform:"uppercase"}}>Solde Kolo Pay</span><button onClick={()=>setSb(!sb)} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.55)"}}>{sb?Z.eye:Z.eyeX}</button></div>
<div style={{fontSize:32,fontWeight:800,color:C.gold,marginBottom:2}}>{sb?fm(kolo.bal):"••• •••"} <span style={{fontSize:14,fontWeight:500,color:"rgba(255,255,255,0.5)"}}>FCFA</span></div>
<div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginBottom:18,display:"flex",alignItems:"center",gap:4}}><SvgIc type="kolo" size={14}/> Portefeuille interne Likelemba</div>
<div style={{display:"flex",gap:8}}>
{[{ic:Z.up,l:"Cotiser",s:"contribute"},{ic:Z.send,l:"Envoyer",s:"transfer"},{ic:Z.qr,l:"QR Pay",s:"qr"},{ic:Z.plus,l:"Inviter",s:"invite"}].map((a,i)=>(<button key={i} onClick={()=>a.s&&go(a.s)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6,background:"rgba(255,255,255,0.08)",borderRadius:12,padding:"12px 4px",border:"none",cursor:"pointer",color:"#fff"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}>{a.ic}<span style={{fontSize:10,fontWeight:600,opacity:.85}}>{a.l}</span></button>))}
</div></div>
{/* Circles */}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><span style={{fontSize:16,fontWeight:700,color:C.t0}}>Mes cercles</span><button onClick={()=>go("_c")} style={{background:"none",border:"none",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}>Voir tout</button></div>
<div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,marginBottom:22}}>
{CIR.map(c=>(<div key={c.id} onClick={()=>go("cd:"+c.id)} style={{minWidth:210,background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,cursor:"pointer",flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.boxShadow=C.sh} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontSize:14,fontWeight:700,color:C.t1}}>{c.name}</span><span style={{fontSize:10,fontWeight:700,color:C.blue,background:C.blueL,padding:"2px 8px",borderRadius:6}}>{c.freq}</span></div>
<div style={{fontSize:12,color:C.t3,marginBottom:10}}>{c.mem} membres · <span style={{color:C.gold,fontWeight:600}}>{fm(c.amt)} F</span>/tour</div>
<div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden",marginBottom:6}}><div style={{width:`${c.prog}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`,borderRadius:4}}/></div>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.t3}}>Tour: {c.turn}</span><span style={{fontSize:11,fontWeight:700,color:C.gold}}>{c.prog}%</span></div>
</div>))}
</div>
{/* Services Grid */}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:14}}>
{[{ic:"market",t:"Cercles\npublics",s:"market"},{ic:"cardIc",t:"Kolo\nCard",s:"koloCard"},{ic:"bag",t:"SNBL",s:"snbl"},{ic:"trophy",t:"Score\ncrédit",s:"creditScore"}].map((f,i)=>(
<button key={i} onClick={()=>go(f.s)} style={{background:C.card,borderRadius:14,padding:"12px 4px",border:`1px solid ${C.brd}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}} onMouseEnter={e=>e.currentTarget.style.boxShadow=C.sh} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
<SvgIc type={f.ic} size={22}/><span style={{fontSize:10,fontWeight:600,color:C.t2,textAlign:"center",lineHeight:1.3,whiteSpace:"pre-line"}}>{f.t}</span></button>))}
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:18}}>
{[{ic:Z.phone,t:"Crédit\n& Data",s:"buyCredit"},{ic:Z.doc,t:"Factures",s:"bills"},{ic:Z.dn,t:"Micro-\ncrédit",s:"microCredit"},{ic:Z.grp,t:"Objectifs\ngroupe",s:"groupGoals"}].map((f,i)=>(
<button key={i} onClick={()=>go(f.s)} style={{background:C.card,borderRadius:14,padding:"12px 4px",border:`1px solid ${C.brd}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,color:C.blue}} onMouseEnter={e=>e.currentTarget.style.boxShadow=C.sh} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
{f.ic}<span style={{fontSize:10,fontWeight:600,color:C.t2,textAlign:"center",lineHeight:1.3,whiteSpace:"pre-line"}}>{f.t}</span></button>))}
</div>
{/* Promo + Lamu */}
<div style={{display:"flex",gap:8,marginBottom:18}}>
<button onClick={()=>go("promos")} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:`linear-gradient(135deg,${C.gold}15,${C.gold}05)`,borderRadius:14,padding:"12px 14px",border:`1px solid ${C.gold}25`,cursor:"pointer",textAlign:"left"}}>
<div style={{color:C.gold}}>{Z.gift}</div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.gold}}>Cashback</div><div style={{fontSize:10,color:C.t3}}>Jusqu'à 10%</div></div></button>
<button onClick={()=>go("lamu")} style={{flex:1,display:"flex",alignItems:"center",gap:10,background:`linear-gradient(135deg,${C.kolo}10,${C.blue}08)`,borderRadius:14,padding:"12px 14px",border:`1px solid ${C.kolo}20`,cursor:"pointer",textAlign:"left"}}>
<div style={{width:28,height:28,borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.kolo})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🤖</div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.kolo}}>Lamu AI</div><div style={{fontSize:10,color:C.t3}}>Assistant</div></div></button>
</div>
{/* Txs */}
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontSize:16,fontWeight:700,color:C.t0}}>Activité récente</span><button onClick={()=>go("_h")} style={{background:"none",border:"none",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}>Tout</button></div>
{TXS.slice(0,4).map(tx=><TxR key={tx.id} tx={tx} onClick={()=>go("txd:"+tx.id)}/>)}
</div>);}

function CirclesTab({go}){return(<div>
<div style={{display:"flex",gap:10,marginBottom:16}}>{[{l:"Actifs",v:"3",c:C.blue,bg:C.blueL},{l:"Membres",v:"24",c:C.green,bg:C.greenL},{l:"Épargné",v:"423K",c:C.gold,bg:C.goldL}].map((s,i)=>(<div key={i} style={{flex:1,textAlign:"center",padding:"14px 8px",background:s.bg,borderRadius:14}}><div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3,marginTop:2}}>{s.l}</div></div>))}</div>
<div style={{display:"flex",gap:8,marginBottom:16}}><Btn full onClick={()=>go("createCircle")}>{Z.plus} Créer un cercle</Btn><Btn v="s" onClick={()=>go("joinCircle")} sx={{flexShrink:0}}>{Z.link}</Btn><Btn v="s" onClick={()=>go("market")} sx={{flexShrink:0}}><SvgIc type="market" size={18}/></Btn></div>
{CIR.map(c=>(<div key={c.id} onClick={()=>go("cd:"+c.id)} style={{display:"flex",alignItems:"center",gap:14,padding:16,background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brd}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.boxShadow=C.sh} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
<div style={{width:44,height:44,borderRadius:14,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.grp}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.name}</div><div style={{fontSize:12,color:C.t3}}>{c.mem} membres · {c.freq}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:15,fontWeight:700,color:C.gold}}>{fm(c.amt)} F</div><div style={{fontSize:11,color:C.t3}}>par tour</div></div>
</div>))}
</div>);}

function HistTab({go}){const[f,setF]=useState("Tout");const fl=f==="Tout"?TXS:TXS.filter(t=>f==="Reçu"?t.t==="in":t.t==="out");return(<div>
<div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:C.card,borderRadius:50,marginBottom:14,border:`1px solid ${C.brd}`}}><span style={{color:C.t3}}>{Z.srch}</span><input placeholder="Rechercher..." style={{flex:1,border:"none",background:"none",outline:"none",fontSize:14,color:C.t0}}/></div>
<div style={{display:"flex",gap:8,marginBottom:18}}>{["Tout","Reçu","Envoyé"].map(c=><button key={c} onClick={()=>setF(c)} style={{padding:"8px 16px",borderRadius:50,border:"none",cursor:"pointer",background:f===c?`linear-gradient(135deg,${C.blue},${C.blueD})`:C.card,color:f===c?"#fff":C.t2,fontSize:12,fontWeight:600,boxShadow:f===c?"0 4px 12px rgba(26,86,219,0.2)":"none"}}>{c}</button>)}</div>
{fl.map(tx=><TxR key={tx.id} tx={tx} onClick={()=>go("txd:"+tx.id)}/>)}
</div>);}

function ProfTab({go}){return(<div>
<div style={{textAlign:"center",marginBottom:24}}><div style={{position:"relative",display:"inline-block"}}><Av ini="JT" sz={64} col={C.blue}/><button onClick={()=>go("editProfile")} style={{position:"absolute",bottom:-2,right:-2,width:24,height:24,borderRadius:12,background:C.gold,border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:0}}>{Z.cam}</button></div><div style={{fontSize:18,fontWeight:700,color:C.t0,marginTop:10}}>Joeldy Tsina</div><div style={{fontSize:13,color:C.t3}}>+242 06 466 3469</div>
<div style={{display:"flex",gap:12,justifyContent:"center",marginTop:14}}>{[{l:"Cercles",v:"3"},{l:"Cotisations",v:"36"},{l:"Score",v:"4.9"}].map((s,i)=>(<div key={i} style={{padding:"8px 18px",background:C.blueL,borderRadius:12}}><div style={{fontSize:16,fontWeight:800,color:C.blue}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div></div>))}</div></div>
<MenuRow icon={Z.usr} label="Modifier le profil" onClick={()=>go("editProfile")}/>
<MenuRow icon={Z.shield} label="Sécurité & PIN" onClick={()=>go("sec")}/>
<MenuRow icon={Z.wal} label="Portefeuilles" onClick={()=>go("wallets")}/>
<MenuRow icon={Z.star} label="Kolo Card" onClick={()=>go("koloCard")} color={C.navy}/>
<MenuRow icon={Z.tgt} label="Score de crédit" onClick={()=>go("creditScore")} color={C.gold}/>
<MenuRow icon={Z.tgt} label="Objectifs d'épargne" onClick={()=>go("sav")}/>
<MenuRow icon={Z.doc} label="Reçus de cotisation" onClick={()=>go("rcpt")}/>
<MenuRow icon={Z.doc} label="Mes contrats" onClick={()=>go("contract")}/>
<MenuRow icon={Z.star} label="Récompenses" onClick={()=>go("rwd")}/>
<MenuRow icon={Z.gift} label="Offres & Cashback" onClick={()=>go("promos")} color={C.green}/>
<MenuRow icon={Z.tgt} label="Analyse financière" onClick={()=>go("finDash")} color={C.blue}/>
<MenuRow icon={Z.cal} label="Paiements programmés" onClick={()=>go("autoPay")}/>
<MenuRow icon={Z.doc} label="Exporter l'historique" onClick={()=>go("export")}/>
<MenuRow icon={Z.warn} label="Signaler un problème" onClick={()=>go("dispute")} color={C.orange}/>
<MenuRow icon={Z.grp} label="Compte Business" onClick={()=>go("business")} color={C.navy}/>
<MenuRow icon={Z.bell} label="Notifications" onClick={()=>go("notif")}/>
<MenuRow icon={Z.globe} label="Langue" onClick={()=>go("lang")}/>
<MenuRow icon={Z.help} label="FAQ & Aide" onClick={()=>go("faq")}/>
<MenuRow icon={Z.doc} label="Politique de confidentialité" onClick={()=>go("privacy")}/>
<MenuRow icon={Z.gear} label="Paramètres" onClick={()=>go("settings")}/>
<div style={{textAlign:"center",marginTop:16,fontSize:10,color:C.t4}}>Likelemba v1.0 · Lamuka Tech</div>
</div>);}

// ── Home Container ──
function Home({go,initTab=0}){const[tab,setTab]=useState(initTab);const tabs=[{ic:Z.home,l:"Accueil"},{ic:Z.grp,l:"Cercles"},{ic:Z.wal,l:"Historique"},{ic:Z.usr,l:"Profil"}];
const switchTab=(i)=>{setTab(i);const routes=["home","home_c","home_h","home_p"];go(routes[i]);};
const tg=s=>{if(s==="_c")switchTab(1);else if(s==="_h")switchTab(2);else go(s);};
return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
<div style={{flex:1,overflowY:"auto",padding:"12px 18px",paddingBottom:100}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{fontSize:13,color:C.t3}}>Mbote 👋</div><div style={{fontSize:20,fontWeight:800,color:C.t0}}>Joeldy</div></div>
<button onClick={()=>go("notif")} style={{width:42,height:42,borderRadius:14,background:C.card,border:`1px solid ${C.brd}`,cursor:"pointer",position:"relative",display:"flex",alignItems:"center",justifyContent:"center",color:C.t1}}>{Z.bell}<div style={{position:"absolute",top:10,right:10,width:8,height:8,borderRadius:4,background:C.red,border:"2px solid #fff"}}/></button></div>
{tab===0&&<HomeTab go={tg}/>}{tab===1&&<CirclesTab go={tg}/>}{tab===2&&<HistTab go={tg}/>}{tab===3&&<ProfTab go={tg}/>}
</div>
<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 16px",paddingBottom:"max(12px, env(safe-area-inset-bottom, 12px))",background:`linear-gradient(transparent,${C.bg} 30%)`}}>
<div style={{display:"flex",background:C.card,borderRadius:22,padding:"6px 4px",boxShadow:C.shM,border:`1px solid ${C.brdL}`}}>
{tabs.map((t,i)=>(<button key={i} onClick={()=>switchTab(i)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,background:"none",border:"none",cursor:"pointer",padding:"8px 0",color:tab===i?C.blue:C.t4}}>{t.ic}<span style={{fontSize:10,fontWeight:tab===i?700:500}}>{t.l}</span>{tab===i&&<div style={{width:4,height:4,borderRadius:2,background:C.blue,marginTop:1}}/>}</button>))}
</div></div></div>);}

// ── Transaction Detail ──
function TxDetail({go,txId}){const tx=TXS.find(x=>x.id===txId)||TXS[0];return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Détail transaction" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:24,padding:24,textAlign:"center",border:`1px solid ${C.brd}`,marginBottom:16}}>
<div style={{width:56,height:56,borderRadius:18,background:tx.t==="in"?C.greenL:C.redL,display:"inline-flex",alignItems:"center",justifyContent:"center",color:tx.t==="in"?C.green:C.red,marginBottom:12}}>{tx.t==="in"?Z.dn:Z.up}</div>
<div style={{fontSize:28,fontWeight:800,color:tx.t==="in"?C.green:C.t0}}>{tx.t==="in"?"+":"-"}{fm(tx.a)} FCFA</div>
<div style={{fontSize:13,color:C.t3,marginTop:4}}>{tx.d}</div>
</div>
{[{l:"De/Vers",v:tx.n},{l:"Date",v:tx.dt+" · "+tx.tm},{l:"Cercle",v:tx.circle||"—"},{l:"Référence",v:tx.ref},{l:"Statut",v:"Complété"}].map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"13px 16px",background:C.card,borderRadius:12,marginBottom:6,border:`1px solid ${C.brdL}`}}><span style={{fontSize:13,color:C.t3}}>{r.l}</span><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{r.v}</span></div>))}
</div>);}

// ── Circle Detail ──
function CircleDetail({go,cid}){const c=CIR.find(x=>x.id===cid)||CIR[0];const[tab,setTab]=useState("m");const paid=MEM.filter(m=>m.ok).length;
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}>
<Hdr title={c.name} onBack={()=>go("back")} right={<button onClick={()=>go("editCircle")} style={{background:C.card,border:`1px solid ${C.brd}`,borderRadius:12,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.t1}}>{Z.gear}</button>}/>
<div style={{background:C.card,borderRadius:24,padding:20,border:`1px solid ${C.brd}`,marginBottom:16,boxShadow:C.sh}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div><div style={{fontSize:12,color:C.t3,marginBottom:4}}>Cagnotte totale</div><div style={{fontSize:26,fontWeight:800,color:C.t0}}>{fm(c.tot)} <span style={{fontSize:13,fontWeight:500,color:C.t3}}>FCFA</span></div></div><div style={{textAlign:"right"}}><div style={{fontSize:12,color:C.t3,marginBottom:4}}>Par tour</div><div style={{fontSize:18,fontWeight:700,color:C.gold}}>{fm(c.amt)} F</div></div></div>
<div style={{background:C.bg,borderRadius:5,height:8,overflow:"hidden",marginBottom:8}}><div style={{width:`${c.prog}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`,borderRadius:5}}/></div>
<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.t3}}>Collecté : <span style={{fontWeight:700,color:C.t1}}>{c.prog}%</span></span><span style={{fontSize:11,color:C.t3}}>Prochain : <span style={{fontWeight:700,color:C.gold}}>{c.next}</span></span></div>
</div>
{/* Code du cercle */}
<div style={{background:C.blueL,borderRadius:12,padding:"10px 16px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between",border:`1px solid ${C.blue}20`}}>
<div><span style={{fontSize:11,color:C.t3}}>Code du cercle : </span><span style={{fontSize:14,fontWeight:800,color:C.blue,letterSpacing:1}}>{c.code}</span></div>
<button style={{background:"none",border:"none",cursor:"pointer",color:C.blue,display:"flex"}}>{Z.copy}</button>
</div>
{/* Actions */}
<div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
{[{l:"Cotiser",ic:Z.up,s:"contribute"},{l:"Chat",ic:Z.msg,s:"chat:"+c.id},{l:"Inviter",ic:Z.plus,s:"invite"},{l:"Calendrier",ic:Z.cal,s:"calendar"}].map((a,i)=>(<button key={i} onClick={()=>go(a.s)} style={{flex:"1 1 22%",display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:C.card,border:`1px solid ${C.brd}`,borderRadius:12,padding:"10px 0",cursor:"pointer",fontSize:11,fontWeight:600,color:C.blue}}>{a.ic}<span>{a.l}</span></button>))}
</div>
<div style={{display:"flex",gap:6,marginBottom:16}}>
{[{l:"Contrat",ic:Z.doc,s:"contract"},{l:"Stats",ic:Z.tgt,s:"circleStats"},
...(c.admin?[{l:"Rappel",ic:Z.bell,s:"remind"},{l:"Modifier",ic:Z.gear,s:"editCircle"}]:[]),
{l:"Quitter",ic:Z.warn,s:"leaveCircle",c:C.red}].map((a,i)=>(<button key={i} onClick={()=>go(a.s)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:C.card,border:`1px solid ${a.c?a.c+"20":C.brd}`,borderRadius:12,padding:"10px 0",cursor:"pointer",fontSize:10,fontWeight:600,color:a.c||C.t2}}>{a.ic}<span>{a.l}</span></button>))}
</div>
{!c.admin&&<div style={{background:C.blueL,borderRadius:10,padding:"8px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:8,border:`1px solid ${C.blue}15`}}>
<span style={{color:C.blue}}>{Z.usr}</span><span style={{fontSize:12,color:C.t2}}>Admin : <span style={{fontWeight:700,color:C.t1}}>Grace M.</span></span>
</div>}
{/* Tabs */}
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:16,border:`1px solid ${C.brd}`}}>
{[{k:"m",l:"Membres"},{k:"r",l:"Rotation"},{k:"g",l:"Règles"}].map(t=>(<button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t.k?`linear-gradient(135deg,${C.blue},${C.blueD})`:"transparent",color:tab===t.k?"#fff":C.t3,fontSize:12,fontWeight:600,cursor:"pointer",boxShadow:tab===t.k?"0 4px 12px rgba(26,86,219,0.2)":"none"}}>{t.l}</button>))}
</div>
{tab==="m"&&<><div style={{fontSize:12,color:C.t3,marginBottom:10}}><span style={{color:C.green,fontWeight:700}}>{paid}</span> payé(s) · <span style={{color:C.red,fontWeight:700}}>{MEM.length-paid}</span> en attente</div>
{MEM.map(m=>(<div key={m.id} onClick={()=>go("mem:"+m.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:16,marginBottom:6,border:`1px solid ${C.brdL}`,cursor:"pointer"}}>
<Av ini={m.i} sz={40}/><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.n}</span>{((c.admin&&m.id===1)||(!c.admin&&m.id===2))&&<span style={{fontSize:9,fontWeight:700,color:C.blue,background:C.blueL,padding:"2px 6px",borderRadius:4}}>ADMIN</span>}</div><div style={{fontSize:12,color:C.t3}}>{m.p}{m.pen>0&&<span style={{color:C.red,fontWeight:600}}> · Pénalité: {fm(m.pen)} F</span>}</div></div>
<div style={{textAlign:"center",marginRight:8}}><div style={{fontSize:9,color:C.t3,fontWeight:600,textTransform:"uppercase"}}>Tour</div><div style={{fontSize:16,fontWeight:800,color:C.gold}}>{m.t}</div></div><Bdg s={m.ok?"paid":"pending"}/></div>))}</>}
{tab==="r"&&MEM.map((m,i)=>(<div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:i===0?C.blueL:C.card,borderRadius:16,marginBottom:6,border:`1.5px solid ${i===0?C.blue+"40":C.brdL}`,position:"relative"}}>
{i===0&&<div style={{position:"absolute",top:8,right:12,fontSize:9,fontWeight:700,color:C.gold,background:C.goldL,padding:"2px 8px",borderRadius:6}}>EN COURS</div>}
<div style={{width:30,height:30,borderRadius:8,background:i===0?C.blue:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:i===0?"#fff":C.t3}}>{m.t}</div>
<Av ini={m.i} sz={36}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{m.n}</div><div style={{fontSize:11,color:C.t3,display:"flex",alignItems:"center",gap:4}}>{Z.cal} {i===0?c.next:`${["01 Jun","01 Jul","01 Aoû","01 Sep","01 Oct"][i-1]||"TBD"} 2026`}</div></div>
<span style={{fontSize:14,fontWeight:700,color:i===0?C.gold:C.t4}}>{fm(c.tot)} F</span></div>))}
{tab==="g"&&[{l:"Montant / tour",v:fm(c.amt)+" FCFA"},{l:"Fréquence",v:c.freq},{l:"Membres",v:c.mem},{l:"Cagnotte",v:fm(c.tot)+" FCFA"},{l:"Pénalité retard",v:c.pen+"% du montant"},{l:"Paiement",v:"Kolo Pay / Mobile Money"},{l:"Rotation",v:"Fixe (inscription)"},{l:"Code cercle",v:c.code},{l:"Créé le",v:c.created}].map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"13px 16px",background:C.card,borderRadius:12,marginBottom:6,border:`1px solid ${C.brdL}`}}><span style={{fontSize:13,color:C.t3}}>{r.l}</span><span style={{fontSize:13,fontWeight:700,color:C.t1}}>{r.v}</span></div>))}
</div>);}

// ── Create Circle ──
function CreateCircle({go}){const[name,setName]=useState("");const[amt,setAmt]=useState("");const[freq,setFreq]=useState("Mensuel");const[mem,setMem]=useState("");const[pen,setPen]=useState("5");
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Créer un cercle" onBack={()=>go("back")}/>
<Inp label="Nom du cercle" ph="Ex: Cercle Famille" val={name} set={setName}/>
<Inp label="Montant par tour (FCFA)" ph="Ex: 25000" val={amt} set={setAmt} type="number"/>
<div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:6,display:"block"}}>Fréquence</label><div style={{display:"flex",gap:8}}>{["Hebdo","Bi-mensuel","Mensuel"].map(f=>(<button key={f} onClick={()=>setFreq(f)} style={{flex:1,padding:"12px 0",borderRadius:12,border:"none",cursor:"pointer",background:freq===f?`linear-gradient(135deg,${C.blue},${C.blueD})`:C.card,color:freq===f?"#fff":C.t2,fontSize:13,fontWeight:600,boxShadow:freq===f?"0 4px 12px rgba(26,86,219,0.2)":`inset 0 0 0 1px ${C.brd}`}}>{f}</button>))}</div></div>
<Inp label="Nombre de membres" ph="Ex: 6" val={mem} set={setMem} type="number"/>
<Inp label="Pénalité de retard (%)" ph="Ex: 5" val={pen} set={setPen} type="number"/>
<div style={{marginTop:8}}><Btn full onClick={()=>go("ok")} dis={!name||!amt}>Créer le cercle</Btn></div>
</div>);}

// ── Join Circle ──
function JoinCircle({go}){const[code,setCode]=useState("");return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Rejoindre un cercle" onBack={()=>go("back")}/>
<div style={{textAlign:"center",marginBottom:32}}><div style={{width:60,height:60,borderRadius:20,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.blue}}>{Z.link}</div><h3 style={{fontSize:18,fontWeight:700,color:C.t0,margin:"0 0 6px"}}>Code d'invitation</h3><p style={{color:C.t3,fontSize:13}}>Entrez le code partagé par l'admin du cercle</p></div>
<Inp label="Code du cercle" ph="Ex: ELITE2026" val={code} set={setCode}/>
<Btn full onClick={()=>go("ok")} dis={!code}>Rejoindre</Btn>
<div style={{textAlign:"center",marginTop:20}}><div style={{fontSize:13,color:C.t3,marginBottom:12}}>Ou scannez un QR code</div><Btn v="s" full onClick={()=>go("qr")}>{Z.qr} Scanner un QR</Btn></div>
</div>);}

// ── Invite ──
function Invite({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Inviter des membres" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:16,padding:20,border:`1px solid ${C.brd}`,textAlign:"center",marginBottom:20}}>
<div style={{fontSize:13,color:C.t3,marginBottom:6}}>Code d'invitation</div>
<div style={{fontSize:24,fontWeight:800,color:C.blue,letterSpacing:2,marginBottom:12}}>ELITE2026</div>
<Btn v="s" full>{Z.copy} Copier le code</Btn>
</div>
<div style={{fontSize:14,fontWeight:600,color:C.t1,marginBottom:12}}>Partager via</div>
{[{l:"WhatsApp",ic:"wa",c:"#25D366"},{l:"SMS",ic:"sms",c:C.blue},{l:"Lien",ic:"lnk",c:C.purple}].map((m,i)=>(<button key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",width:"100%",background:C.card,borderRadius:12,marginBottom:8,border:`1px solid ${C.brdL}`,cursor:"pointer",textAlign:"left"}}><div style={{width:40,height:40,borderRadius:12,background:m.c+"15",display:"flex",alignItems:"center",justifyContent:"center",color:m.c,fontWeight:700,fontSize:14}}>{m.l[0]}</div><span style={{flex:1,fontSize:14,fontWeight:500,color:C.t1}}>Inviter via {m.l}</span><span style={{color:C.t4}}>{Z.fwd}</span></button>))}
</div>);}

// ── Chat ──
function Chat({go,cid}){const c=CIR.find(x=>x.id===cid)||CIR[0];const[msg,setMsg]=useState("");const[msgs,setMsgs]=useState(MSGS);const ref=useRef(null);
const doSend=()=>{if(!msg.trim())return;setMsgs(prev=>[...prev,{id:Date.now(),from:"Joeldy T.",ini:"JT",msg:msg.trim(),time:new Date().toLocaleTimeString("fr",{hour:"2-digit",minute:"2-digit"}),me:true}]);setMsg("");setTimeout(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},50);};
return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
<div style={{padding:"12px 18px"}}><Hdr title={c.name} onBack={()=>go("back")} right={<span style={{fontSize:12,color:C.t3}}>{c.mem} membres</span>}/></div>
<div ref={ref} style={{flex:1,overflowY:"auto",padding:"0 18px 12px"}}>
{msgs.map(m=>(<div key={m.id} style={{display:"flex",justifyContent:m.me?"flex-end":"flex-start",marginBottom:10}}>
{!m.me&&<Av ini={m.ini} sz={28} col={undefined}/>}
<div style={{marginLeft:m.me?0:8,maxWidth:"75%"}}>
{!m.me&&<div style={{fontSize:11,fontWeight:600,color:C.blue,marginBottom:2}}>{m.from}</div>}
<div style={{padding:"10px 14px",borderRadius:16,borderTopLeftRadius:m.me?16:4,borderTopRightRadius:m.me?4:16,background:m.me?C.blue:C.card,color:m.me?"#fff":C.t1,fontSize:13,lineHeight:1.4,boxShadow:m.me?"none":C.sh}}>{m.msg}</div>
<div style={{fontSize:10,color:C.t4,marginTop:2,textAlign:m.me?"right":"left"}}>{m.time}</div>
</div></div>))}
</div>
<div style={{padding:"8px 18px 16px",background:C.card,borderTop:`1px solid ${C.brd}`}}>
<div style={{display:"flex",gap:8}}>
<input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSend()} placeholder="Écrire un message..." style={{flex:1,padding:"12px 16px",borderRadius:50,border:`1px solid ${C.brd}`,background:C.bg,outline:"none",fontSize:14,color:C.t0}}/>
<button onClick={doSend} style={{width:44,height:44,borderRadius:22,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0,boxShadow:"0 4px 12px rgba(26,86,219,0.25)"}}>{Z.send}</button>
</div></div></div>);}

// ── Contribute ──
function Contribute({go}){const[sel,setSel]=useState(1);const[amt,setAmt]=useState("25000");const[wal,setWal]=useState(0);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Cotiser" onBack={()=>go("back")}/>
<div style={{fontSize:13,color:C.t2,marginBottom:10}}>Choisir le cercle</div>
{CIR.map(c=>(<button key={c.id} onClick={()=>{setSel(c.id);setAmt(String(c.amt))}} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",width:"100%",background:sel===c.id?C.blueL:C.card,borderRadius:16,marginBottom:6,cursor:"pointer",border:`1.5px solid ${sel===c.id?C.blue:C.brdL}`,textAlign:"left"}}>
<div style={{width:40,height:40,borderRadius:12,background:sel===c.id?C.blueM:C.bg,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.grp}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.name}</div><div style={{fontSize:12,color:C.t3}}>{fm(c.amt)} FCFA / {c.freq.toLowerCase()}</div></div>{sel===c.id&&Z.ok}</button>))}
<div style={{background:C.card,borderRadius:24,padding:"24px 20px",textAlign:"center",marginTop:16,marginBottom:16,border:`1px solid ${C.brd}`}}>
<div style={{fontSize:13,color:C.t3,marginBottom:8}}>Montant</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><input value={fm(amt)} onChange={e=>setAmt(e.target.value.replace(/\s/g,""))} style={{fontSize:32,fontWeight:800,color:C.gold,border:"none",background:"none",outline:"none",width:160,textAlign:"center"}}/><span style={{fontSize:16,fontWeight:600,color:C.t3}}>FCFA</span></div>
</div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Payer via</div>
{WALLETS.map((w,i)=>(<button key={w.id} onClick={()=>setWal(i)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",width:"100%",background:wal===i?C.blueL:C.card,borderRadius:16,marginBottom:6,border:`1.5px solid ${wal===i?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<SvgIc type={w.logo} size={24}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{w.n}</div><div style={{fontSize:12,color:C.t3}}>{w.num} · <span style={{color:C.gold}}>{fm(w.bal)} F</span></div></div>
{wal===i&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}
</button>))}
<div style={{marginTop:16}}><Btn full onClick={()=>go("confirm")}>Continuer</Btn></div>
</div>);}

// ── Confirm Payment ──
function Confirm({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Confirmer le paiement" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:24,padding:24,border:`1px solid ${C.brd}`,marginBottom:20}}>
<div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:13,color:C.t3,marginBottom:4}}>Vous allez cotiser</div><div style={{fontSize:32,fontWeight:800,color:C.gold}}>25 000 <span style={{fontSize:14,color:C.t3}}>FCFA</span></div></div>
{[{l:"Cercle",v:"Cercle Élite"},{l:"Via",v:"Kolo Pay"},{l:"Solde après",v:"70 000 FCFA"},{l:"Frais",v:"Gratuit"}].map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:i<3?`1px solid ${C.brd}`:""}}><span style={{fontSize:13,color:C.t3}}>{r.l}</span><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{r.v}</span></div>))}
</div>
<div style={{background:C.orangeL,borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",gap:10,alignItems:"center",border:`1px solid ${C.orange}20`}}>
<span style={{color:C.orange}}>{Z.warn}</span><span style={{fontSize:12,color:C.t2}}>Cette opération est irréversible</span>
</div>
<Btn full onClick={()=>go("ok")}>Confirmer la cotisation</Btn>
</div>);}

// ── Remind ──
function Remind({go}){const up=MEM.filter(m=>!m.ok);return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Rappel de cotisation" onBack={()=>go("back")}/>
<div style={{background:C.orangeL,borderRadius:16,padding:"14px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:12,border:`1px solid ${C.orange}20`}}><span style={{fontSize:24}}>⏰</span><div><div style={{fontSize:13,fontWeight:700,color:C.orange}}>Membres en attente</div><div style={{fontSize:12,color:C.t2}}>{up.length} membre(s) avec pénalité potentielle de 5%</div></div></div>
{MEM.map(m=>(<div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:16,marginBottom:6,border:`1px solid ${C.brdL}`,opacity:m.ok?.5:1}}>
<Av ini={m.i} sz={40}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{m.n}</div><div style={{fontSize:12,color:C.t3}}>{m.p}{m.pen>0&&<span style={{color:C.red}}> · Pénalité: {fm(m.pen)} F</span>}</div></div><Bdg s={m.ok?"paid":"pending"}/></div>))}
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")}>Envoyer le rappel ({up.length})</Btn></div></div>);}

// ── QR Code ──
function QR({go}){const[tab,setTab]=useState("my");return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="QR Code" onBack={()=>go("back")}/>
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:24,border:`1px solid ${C.brd}`}}>{["my","scan"].map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t?`linear-gradient(135deg,${C.blue},${C.blueD})`:"transparent",color:tab===t?"#fff":C.t3,fontSize:13,fontWeight:600,cursor:"pointer"}}>{t==="my"?"Mon QR":"Scanner"}</button>)}</div>
{tab==="my"?<div style={{textAlign:"center"}}><div style={{background:C.card,borderRadius:24,padding:32,border:`1px solid ${C.brd}`,display:"inline-block"}}>
<div style={{width:200,height:200,background:C.navy,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><div style={{width:170,height:170,background:"#fff",borderRadius:12,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gridTemplateRows:"1fr 1fr 1fr",gap:8,padding:16}}>{[1,2,3,4,5,6,7,8,9].map(n=><div key={n} style={{background:n===5?C.blue:n%2===0?C.brd:C.navy,borderRadius:n===5?8:3}}/>)}</div></div>
<div style={{fontSize:16,fontWeight:700,color:C.t0}}>Joeldy Tsina</div><div style={{fontSize:13,color:C.t3,marginTop:4}}>+242 06 466 3469</div></div><div style={{marginTop:24}}><Btn v="s" onClick={()=>alert("Lien copié : likelemba.app/pay/joeldy")}>Partager le QR</Btn></div></div>
:<div style={{width:"100%",height:280,background:C.card,borderRadius:24,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:`2px dashed ${C.brd}`}}><span style={{color:C.blue,marginBottom:12}}>{Z.qr}</span><div style={{fontSize:14,color:C.t2}}>Pointez votre caméra vers un QR</div></div>}
</div>);}

// ── Wallets ──
function Wallets({go}){const tot=WALLETS.reduce((s,a)=>s+a.bal,0);return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Portefeuilles" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:16,padding:"14px 18px",display:"flex",justifyContent:"space-between",marginBottom:12,border:`1px solid ${C.brd}`}}><span style={{fontSize:13,color:C.t3}}>Solde total</span><span style={{fontSize:16,fontWeight:800,color:C.gold}}>{fm(tot)} FCFA</span></div>
<div style={{display:"flex",gap:8,marginBottom:16}}>
<Btn full onClick={()=>go("topup")} sx={{flex:1}}>{Z.dn} Recharger</Btn>
<Btn v="s" full onClick={()=>go("withdraw")} sx={{flex:1}}>{Z.up} Retirer</Btn>
</div>
{WALLETS.map(w=>(<div key={w.id} style={{background:C.card,borderRadius:16,padding:18,marginBottom:10,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><SvgIc type={w.logo} size={28}/><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:C.t1}}>{w.n}</div><div style={{fontSize:12,color:C.t3}}>{w.num}</div></div>{w.id===0&&<span style={{fontSize:10,fontWeight:700,color:C.kolo,background:C.koloL,padding:"3px 8px",borderRadius:6}}>INTERNE</span>}</div>
<div style={{fontSize:22,fontWeight:800,color:C.gold}}>{fm(w.bal)} <span style={{fontSize:13,fontWeight:500,color:C.t3}}>FCFA</span></div>
{w.desc&&<div style={{fontSize:11,color:C.t3,marginTop:4}}>{w.desc}</div>}
</div>))}
<Btn v="s" full sx={{marginTop:8}}>{Z.plus} Lier un compte</Btn>
</div>);}

// ── Savings ──
function Sav({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Objectifs d'épargne" onBack={()=>go("back")} right={<button style={{background:"none",border:"none",cursor:"pointer",color:C.blue}}>{Z.plus}</button>}/>
{SAV.map(s=>(<div key={s.id} style={{background:C.card,borderRadius:16,padding:"16px 18px",marginBottom:10,border:`1px solid ${C.brdL}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}><SvgIc type={s.ic} size={24}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{s.n}</div></div><span style={{fontSize:13,fontWeight:700,color:s.sv>=s.tg?C.green:C.gold}}>{fm(s.sv)} / {fm(s.tg)}</span></div>
<div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden"}}><div style={{width:`${Math.min(s.sv/s.tg*100,100)}%`,height:"100%",background:s.sv>=s.tg?C.green:s.cl,borderRadius:4}}/></div>
<div style={{textAlign:"right",marginTop:4,fontSize:11,color:C.t3}}>{Math.round(s.sv/s.tg*100)}%</div></div>))}</div>);}

// ── Receipts ──
function Rcpt({go}){const[f,setF]=useState("Tout");const mp={Tout:null,Payé:"paid","En attente":"pending"};const fl=mp[f]?RCPT.filter(r=>r.s===mp[f]):RCPT;
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Reçus de cotisation" onBack={()=>go("back")}/>
<div style={{display:"flex",gap:6,marginBottom:18}}>{["Tout","Payé","En attente"].map(c=><button key={c} onClick={()=>setF(c)} style={{padding:"8px 14px",borderRadius:50,border:"none",cursor:"pointer",background:f===c?C.blue:C.card,color:f===c?"#fff":C.t3,fontSize:12,fontWeight:600}}>{c}</button>)}</div>
{fl.map(r=>(<div key={r.id} style={{display:"flex",alignItems:"center",gap:12,padding:16,background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`}}>
<div style={{width:42,height:42,borderRadius:12,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.doc}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{r.c}</div><div style={{fontSize:12,color:C.t3}}>{r.r} · {r.d}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:C.gold,marginBottom:4}}>{fm(r.a)} F</div><Bdg s={r.s}/></div></div>))}</div>);}

// ── Notifications ──
function Notif({go}){const im={warn:{i:Z.bell,bg:C.orangeL,c:C.orange},"in":{i:Z.dn,bg:C.greenL,c:C.green},gift:{i:Z.gift,bg:C.purpleL,c:C.purple},add:{i:Z.plus,bg:C.blueL,c:C.blue},pen:{i:Z.warn,bg:C.redL,c:C.red},msg:{i:Z.msg,bg:C.blueL,c:C.blue}};
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Notifications" onBack={()=>go("back")}/>
{NOTIFS.map(n=>{const ic=im[n.tp]||im.warn;return(<div key={n.id} style={{display:"flex",gap:12,padding:"14px 16px",background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${n.rd?C.brdL:C.blue+"20"}`,opacity:n.rd?.6:1}}>
<div style={{width:42,height:42,borderRadius:12,background:ic.bg,display:"flex",alignItems:"center",justifyContent:"center",color:ic.c,flexShrink:0}}>{ic.i}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{n.tt}</div><div style={{fontSize:12,color:C.t3,marginTop:2}}>{n.ds}</div><div style={{fontSize:11,color:C.t4,marginTop:4,display:"flex",alignItems:"center",gap:4}}>{Z.clk} {n.tm}</div></div></div>);})}</div>);}

// ── Rewards ──
function Rwd({go}){const pts=RWDS.filter(r=>r.ok).reduce((s,r)=>s+r.pt,0);return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Récompenses" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20,boxShadow:"0 8px 32px rgba(11,29,58,0.25)"}}>
<div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:4}}>Points gagnés</div><div style={{fontSize:40,fontWeight:800,color:C.gold}}>{pts}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:4}}>Cotisez pour débloquer plus !</div></div>
{RWDS.map(r=>(<div key={r.id} style={{display:"flex",alignItems:"center",gap:14,padding:16,background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`,opacity:r.ok?1:.45}}>
<div style={{width:46,height:46,borderRadius:14,background:r.ok?C.goldL:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{r.ok?<SvgIc type="trophy" size={20}/>:<SvgIc type="lockBig" size={20}/>}</div>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{r.tt}</div><div style={{fontSize:12,color:C.t3}}>{r.ds}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:r.ok?C.gold:C.t4}}>+{r.pt}</div><Bdg s={r.ok?"completed":"pending"}/></div></div>))}</div>);}

// ── Edit Profile ──
function EditProfile({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Modifier le profil" onBack={()=>go("back")}/>
<div style={{textAlign:"center",marginBottom:24}}><div style={{position:"relative",display:"inline-block"}}><Av ini="JT" sz={80} col={C.blue}/><button style={{position:"absolute",bottom:0,right:0,width:28,height:28,borderRadius:14,background:C.gold,border:"3px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:0}}>{Z.cam}</button></div></div>
<Inp label="Nom complet" ph="Joeldy Tsina" val="Joeldy Tsina" set={()=>{}}/>
<Inp label="Numéro de téléphone" ph="+242 06 466 3469" val="+242 06 466 3469" set={()=>{}}/>
<Inp label="Email" ph="joeldytsina94@gmail.com" val="joeldytsina94@gmail.com" set={()=>{}}/>
<Btn full onClick={()=>go("home")}>Enregistrer</Btn></div>);}

// ── Security ──
function Sec({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Sécurité" onBack={()=>go("back")}/>
<div style={{background:C.greenL,borderRadius:24,padding:20,textAlign:"center",marginBottom:20,border:`1px solid ${C.green}20`}}><div style={{fontSize:36,marginBottom:8}}>🛡️</div><div style={{fontSize:14,fontWeight:700,color:C.green}}>Score de sécurité : Excellent</div></div>
<MenuRow icon={Z.lock} label="Changer le PIN" onClick={()=>go("changePin")}/>
<MenuRow icon={Z.lock} label="Changer le mot de passe" onClick={()=>go("changePwd")}/>
<MenuRow icon={Z.shield} label="Authentification 2FA" right={<span style={{fontSize:12,fontWeight:700,color:C.green}}>Activé</span>}/>
<MenuRow icon={Z.phone} label="Empreinte digitale" right={<span style={{fontSize:12,fontWeight:700,color:C.green}}>Activé</span>}/>
<MenuRow icon={Z.bell} label="Alertes de connexion" right={<span style={{fontSize:12,fontWeight:700,color:C.green}}>Activé</span>}/>
</div>);}

// ── Change PIN ──
function ChangePin({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Changer le PIN" onBack={()=>go("back")}/>
<Inp label="PIN actuel" ph="••••" type="password" icon={Z.lock}/>
<Inp label="Nouveau PIN" ph="••••" type="password" icon={Z.lock}/>
<Inp label="Confirmer le nouveau PIN" ph="••••" type="password" icon={Z.lock}/>
<Btn full onClick={()=>go("ok")}>Changer le PIN</Btn></div>);}

// ── Change Password ──
function ChangePwd({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Changer le mot de passe" onBack={()=>go("back")}/>
<Inp label="Mot de passe actuel" ph="••••••••" type="password" icon={Z.lock}/>
<Inp label="Nouveau mot de passe" ph="Minimum 8 caractères" type="password" icon={Z.lock}/>
<Inp label="Confirmer" ph="Retapez le nouveau" type="password" icon={Z.lock}/>
<Btn full onClick={()=>go("ok")}>Changer le mot de passe</Btn></div>);}

// ── Language ──
function Lang({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Langue" onBack={()=>go("back")}/>
{LANGS.map(l=>(<div key={l.code} style={{display:"flex",alignItems:"center",gap:14,padding:"16px",background:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${l.active?C.blue:C.brdL}`,cursor:"pointer"}}>
<span style={{fontSize:28}}>{l.flag}</span><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{l.name}</div></div>
{l.active&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}
</div>))}</div>);}

// ── FAQ ──
function FAQ({go}){const[open,setOpen]=useState(null);return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="FAQ & Aide" onBack={()=>go("back")}/>
{FAQS.map((f,i)=>(<div key={i} style={{background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`,overflow:"hidden"}}>
<button onClick={()=>setOpen(open===i?null:i)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
<span style={{fontSize:14,fontWeight:600,color:C.t1,flex:1}}>{f.q}</span><span style={{color:C.t3,transform:open===i?"rotate(90deg)":"none",transition:"transform 0.2s"}}>{Z.fwd}</span></button>
{open===i&&<div style={{padding:"0 16px 16px",fontSize:13,color:C.t2,lineHeight:1.5}}>{f.a}</div>}
</div>))}
<div style={{marginTop:20,textAlign:"center"}}><div style={{fontSize:13,color:C.t3,marginBottom:8}}>Besoin d'aide supplémentaire ?</div><Btn v="s" full>{Z.msg} Contacter le support</Btn></div>
</div>);}

// ── Privacy ──
function Privacy({go}){return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Politique de confidentialité" onBack={()=>go("back")}/>
{["Protection des données","Collecte d'informations","Utilisation des données","Sécurité","Partage avec des tiers","Vos droits"].map((s,i)=>(<div key={i} style={{background:C.card,borderRadius:16,padding:16,marginBottom:8,border:`1px solid ${C.brdL}`}}>
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:6}}>{i+1}. {s}</div>
<div style={{fontSize:12,color:C.t3,lineHeight:1.5}}>Likelemba (Lamuka Tech) s'engage à protéger vos données personnelles conformément aux lois en vigueur en République du Congo. Vos informations sont chiffrées et stockées de manière sécurisée.</div>
</div>))}</div>);}

// ── Settings ──
function Settings({go}){const[n,sN]=useState(true);const[b,sB]=useState(true);const[a,sA]=useState(true);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Paramètres" onBack={()=>go("back")}/>
{[{l:"Notifications push",v:n,s:sN},{l:"Connexion biométrique",v:b,s:sB},{l:"Rappels automatiques",v:a,s:sA}].map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 18px",background:C.card,borderRadius:16,marginBottom:8,border:`1px solid ${C.brdL}`}}><span style={{fontSize:14,fontWeight:500,color:C.t1}}>{t.l}</span><Toggle v={t.v} set={t.s}/></div>))}
<MenuRow icon={Z.shield} label="Sécurité" onClick={()=>go("sec")}/>
<MenuRow icon={Z.globe} label="Langue" onClick={()=>go("lang")}/>
<MenuRow icon={Z.help} label="FAQ & Aide" onClick={()=>go("faq")}/>
<MenuRow icon={Z.doc} label="Conditions d'utilisation" onClick={()=>go("terms")}/>
<MenuRow icon={Z.doc} label="Politique de confidentialité" onClick={()=>go("privacy")}/>
<MenuRow icon={Z.star} label="À propos" onClick={()=>go("about")}/>
<div style={{marginTop:20}}><button onClick={()=>go("login")} style={{width:"100%",padding:"14px",borderRadius:50,border:`1.5px solid ${C.red}`,background:"none",color:C.red,fontSize:14,fontWeight:600,cursor:"pointer"}}>Se déconnecter</button></div>
<div style={{marginTop:10}}><button onClick={()=>go("deleteAccount")} style={{width:"100%",padding:"14px",borderRadius:50,border:"none",background:"none",color:C.t3,fontSize:13,fontWeight:500,cursor:"pointer"}}>Supprimer le compte</button></div>
</div>);}

// ── Withdraw from Kolo Pay ──
function Withdraw({go}){const[amt,setAmt]=useState("");const[dest,setDest]=useState(1);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Retrait Kolo Pay" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`,textAlign:"center",marginBottom:16}}>
<div style={{fontSize:13,color:C.t3,marginBottom:4}}>Solde Kolo Pay</div>
<div style={{fontSize:28,fontWeight:800,color:C.gold}}><SvgIc type="kolo" size={18}/> {fm(95000)} <span style={{fontSize:13,color:C.t3}}>FCFA</span></div>
</div>
<div style={{background:C.card,borderRadius:20,padding:"20px",textAlign:"center",marginBottom:16,border:`1px solid ${C.brd}`}}>
<div style={{fontSize:13,color:C.t3,marginBottom:8}}>Montant à retirer</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0" style={{fontSize:32,fontWeight:800,color:C.gold,border:"none",background:"none",outline:"none",width:140,textAlign:"center"}}/><span style={{fontSize:16,fontWeight:600,color:C.t3}}>FCFA</span></div>
</div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Vers quel compte ?</div>
{WALLETS.filter(w=>w.id>0).map(w=>(<button key={w.id} onClick={()=>setDest(w.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",width:"100%",background:dest===w.id?C.blueL:C.card,borderRadius:16,marginBottom:6,border:`1.5px solid ${dest===w.id?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<SvgIc type={w.logo} size={24}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{w.n}</div><div style={{fontSize:12,color:C.t3}}>{w.num}</div></div>
{dest===w.id&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}
</button>))}
<div style={{background:C.orangeL,borderRadius:12,padding:"10px 14px",marginTop:12,marginBottom:16,display:"flex",gap:8,alignItems:"center",border:`1px solid ${C.orange}20`}}>
<span style={{color:C.orange}}>{Z.warn}</span><span style={{fontSize:12,color:C.t2}}>Frais de retrait : 1% (min 100 FCFA)</span>
</div>
<Btn full onClick={()=>go("ok")} dis={!amt}>Retirer {amt?fm(amt):""} FCFA</Btn>
</div>);}

// ── Top up Kolo Pay ──
function TopUp({go}){const[amt,setAmt]=useState("");const[src,setSrc]=useState(1);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Recharger Kolo Pay" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`,textAlign:"center",marginBottom:16}}>
<div style={{fontSize:13,color:C.t3,marginBottom:4}}>Solde actuel</div>
<div style={{fontSize:28,fontWeight:800,color:C.gold}}><SvgIc type="kolo" size={18}/> {fm(95000)} <span style={{fontSize:13,color:C.t3}}>FCFA</span></div>
</div>
<div style={{background:C.card,borderRadius:20,padding:"20px",textAlign:"center",marginBottom:16,border:`1px solid ${C.brd}`}}>
<div style={{fontSize:13,color:C.t3,marginBottom:8}}>Montant à recharger</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0" style={{fontSize:32,fontWeight:800,color:C.blue,border:"none",background:"none",outline:"none",width:140,textAlign:"center"}}/><span style={{fontSize:16,fontWeight:600,color:C.t3}}>FCFA</span></div>
</div>
<div style={{display:"flex",gap:8,marginBottom:16}}>{[5000,10000,25000,50000].map(v=>(<button key={v} onClick={()=>setAmt(String(v))} style={{flex:1,padding:"10px 0",borderRadius:10,border:`1px solid ${C.brd}`,background:amt===String(v)?C.blueL:C.card,color:amt===String(v)?C.blue:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{fm(v)}</button>))}</div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Depuis</div>
{WALLETS.filter(w=>w.id>0).map(w=>(<button key={w.id} onClick={()=>setSrc(w.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",width:"100%",background:src===w.id?C.blueL:C.card,borderRadius:16,marginBottom:6,border:`1.5px solid ${src===w.id?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<SvgIc type={w.logo} size={24}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{w.n}</div><div style={{fontSize:12,color:C.t3}}>{w.num} · <span style={{color:C.gold}}>{fm(w.bal)} F</span></div></div>
{src===w.id&&<div style={{width:20,height:20,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}
</button>))}
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")} dis={!amt}>Recharger {amt?fm(amt):""} FCFA</Btn></div>
</div>);}

// ── Leave Circle ──
function LeaveCircle({go}){const[confirmed,setConfirmed]=useState(false);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Quitter le cercle" onBack={()=>go("back")}/>
<div style={{textAlign:"center",marginBottom:24}}><div style={{width:64,height:64,borderRadius:20,background:C.redL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{Z.warn}</div>
<h3 style={{fontSize:20,fontWeight:800,color:C.t0,margin:"0 0 8px"}}>Êtes-vous sûr ?</h3>
<p style={{fontSize:13,color:C.t3,lineHeight:1.5}}>Vous êtes sur le point de quitter le Cercle Élite</p></div>
<div style={{background:C.redL,borderRadius:16,padding:16,marginBottom:20,border:`1px solid ${C.red}20`}}>
<div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:8}}>⚠️ Conséquences :</div>
{["Vous perdrez votre position dans la rotation","Les cotisations déjà versées ne seront pas remboursées","Vous ne pourrez pas rejoindre ce cercle pendant 30 jours","Si c'est votre tour, le gain sera redistribué"].map((t,i)=>(<div key={i} style={{fontSize:12,color:C.t2,marginBottom:6,paddingLeft:12,borderLeft:`2px solid ${C.red}40`}}>{t}</div>))}
</div>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
<button onClick={()=>setConfirmed(!confirmed)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${confirmed?C.red:C.brd}`,background:confirmed?C.red:"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{confirmed&&Z.okW}</button>
<span style={{fontSize:13,color:C.t2}}>Je comprends les conséquences et je souhaite quitter</span>
</div>
<Btn full onClick={()=>go("ok")} dis={!confirmed} sx={{background:confirmed?C.red:"#ccc",boxShadow:"none"}}>Quitter le cercle</Btn>
<div style={{marginTop:12}}><Btn v="s" full onClick={()=>go("home")}>Annuler</Btn></div>
</div>);}

// ── Edit Circle (Admin) ──
function EditCircle({go}){const c=CIR[0];const[name,setName]=useState(c.name);const[amt,setAmt]=useState(String(c.amt));const[pen,setPen]=useState(String(c.pen));
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Modifier le cercle" onBack={()=>go("back")}/>
<Inp label="Nom du cercle" ph="Cercle Élite" val={name} set={setName}/>
<Inp label="Montant par tour (FCFA)" ph="25000" val={amt} set={setAmt} type="number"/>
<Inp label="Pénalité de retard (%)" ph="5" val={pen} set={setPen} type="number"/>
<div style={{fontSize:14,fontWeight:600,color:C.t1,marginBottom:10,marginTop:8}}>Membres ({MEM.length})</div>
{MEM.map(m=>(<div key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<Av ini={m.i} sz={36}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{m.n}</div><div style={{fontSize:11,color:C.t3}}>{m.p}</div></div>
{m.id!==1&&<button style={{fontSize:11,fontWeight:600,color:C.red,background:C.redL,border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>Exclure</button>}
{m.id===1&&<span style={{fontSize:11,fontWeight:700,color:C.blue,background:C.blueL,padding:"4px 10px",borderRadius:8}}>Admin</span>}
</div>))}
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")}>Enregistrer</Btn></div>
</div>);}

// ── Member Profile ──
function MemberProf({go,mid}){const m=MEM.find(x=>x.id===mid)||MEM[0];const memberTxs=TXS.filter(tx=>tx.n.includes(m.n.split(" ")[0]));
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Profil membre" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:24,textAlign:"center",border:`1px solid ${C.brd}`,marginBottom:16}}>
<Av ini={m.i} sz={64} col={C.blue}/>
<div style={{fontSize:18,fontWeight:700,color:C.t0,marginTop:10}}>{m.n}</div>
<div style={{fontSize:13,color:C.t3,marginTop:2}}>{m.p}</div>
<div style={{display:"flex",gap:12,justifyContent:"center",marginTop:14}}>
{[{l:"Tour",v:m.t,c:C.gold},{l:"Statut",v:m.ok?"Payé":"En attente",c:m.ok?C.green:C.orange},{l:"Pénalité",v:m.pen>0?fm(m.pen)+" F":"0 F",c:m.pen>0?C.red:C.green}].map((s,i)=>(
<div key={i} style={{padding:"8px 14px",background:C.bg,borderRadius:10}}>
<div style={{fontSize:14,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div>
</div>))}
</div>
</div>
<div style={{display:"flex",gap:8,marginBottom:16}}>
<Btn v="s" full sx={{flex:1}}>{Z.msg} Message</Btn>
<Btn v="s" full sx={{flex:1}}>{Z.phone} Appeler</Btn>
</div>
<div style={{fontSize:14,fontWeight:600,color:C.t1,marginBottom:10}}>Historique dans le cercle</div>
{memberTxs.length>0?memberTxs.map(tx=><TxR key={tx.id} tx={tx}/>)
:<div style={{textAlign:"center",padding:24,color:C.t3,fontSize:13}}>Aucune transaction trouvée</div>}
</div>);}

// ── Payment Calendar ──
function Calendar({go}){const months=["Jan","Fév","Mar","Avr","Mai","Jun"];const today=3;
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Calendrier des paiements" onBack={()=>go("back")}/>
<div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:16}}>
{CIR.map(c=>(<button key={c.id} style={{padding:"8px 16px",borderRadius:50,border:"none",cursor:"pointer",background:c.id===1?C.blue:C.card,color:c.id===1?"#fff":C.t2,fontSize:12,fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>{c.name}</button>))}
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:12}}>Cercle Élite — 2026</div>
{months.map((mo,i)=>{const isPast=i<today;const isCurrent=i===today;const member=MEM[i%MEM.length];
return(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${isCurrent?C.blue+"50":C.brdL}`,opacity:isPast?.6:1}}>
<div style={{width:44,height:44,borderRadius:14,background:isCurrent?C.blueL:isPast?C.greenL:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
<span style={{fontSize:10,fontWeight:700,color:isCurrent?C.blue:isPast?C.green:C.t3}}>{mo}</span>
<span style={{fontSize:14,fontWeight:800,color:isCurrent?C.blue:isPast?C.green:C.t1}}>01</span>
</div>
<div style={{flex:1}}>
<div style={{fontSize:13,fontWeight:600,color:C.t1}}>Tour de {member.n}</div>
<div style={{fontSize:12,color:C.t3}}>Cotisation : {fm(25000)} FCFA</div>
</div>
<div style={{textAlign:"right"}}>
{isPast&&<Bdg s="paid"/>}
{isCurrent&&<Bdg s="pending"/>}
{!isPast&&!isCurrent&&<span style={{fontSize:11,color:C.t4,fontWeight:500}}>À venir</span>}
</div>
</div>);})}
</div>);}

// ── Circle Stats ──
function CircleStats({go}){const data=[{l:"Jan",v:100},{l:"Fév",v:95},{l:"Mar",v:88},{l:"Avr",v:67},{l:"Mai",v:0},{l:"Jun",v:0}];const max=100;
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Statistiques" onBack={()=>go("back")}/>
{/* Summary cards */}
<div style={{display:"flex",gap:10,marginBottom:16}}>
{[{l:"Taux ponctualité",v:"87%",c:C.green,bg:C.greenL},{l:"Total collecté",v:"402K",c:C.gold,bg:C.goldL},{l:"Pénalités",v:"2 500",c:C.red,bg:C.redL}].map((s,i)=>(
<div key={i} style={{flex:1,textAlign:"center",padding:"14px 8px",background:s.bg,borderRadius:14,border:`1px solid ${s.c}15`}}>
<div style={{fontSize:18,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3,marginTop:2}}>{s.l}</div>
</div>))}
</div>
{/* Chart */}
<div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`,marginBottom:16}}>
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:16}}>Taux de collecte mensuel (%)</div>
<div style={{display:"flex",alignItems:"flex-end",gap:8,height:120}}>
{data.map((d,i)=>(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
<span style={{fontSize:10,fontWeight:600,color:d.v>0?C.blue:C.t4}}>{d.v>0?d.v+"%":""}</span>
<div style={{width:"100%",borderRadius:6,height:`${Math.max((d.v/max)*100,4)}%`,background:d.v>=80?`linear-gradient(180deg,${C.blue},${C.blueD})`:d.v>0?C.orange:C.brd,transition:"height 0.5s"}}/>
<span style={{fontSize:10,color:C.t3}}>{d.l}</span>
</div>))}
</div>
</div>
{/* Gains history */}
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:10}}>Historique des gains</div>
{[{who:"Joeldy T.",date:"01 Jan 2026",amount:150000,status:"paid"},{who:"Grace M.",date:"01 Fév 2026",amount:150000,status:"paid"},{who:"Patrick K.",date:"01 Mar 2026",amount:150000,status:"paid"},{who:"Merveille N.",date:"01 Avr 2026",amount:150000,status:"pending"}].map((g,i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{width:30,height:30,borderRadius:8,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:C.blue}}>{i+1}</div>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{g.who}</div><div style={{fontSize:11,color:C.t3}}>{g.date}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:C.gold}}>{fm(g.amount)} F</div><Bdg s={g.status}/></div>
</div>))}
</div>);}

// ── Terms of Service ──
function Terms({go}){
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Conditions d'utilisation" onBack={()=>go("back")}/>
{[{t:"1. Acceptation des conditions",d:"En utilisant Likelemba, vous acceptez les présentes conditions. L'application est opérée par Lamuka Tech, société de droit congolais basée à Brazzaville."},
{t:"2. Inscription et compte",d:"L'utilisateur doit fournir un numéro de téléphone valide et des informations exactes. Chaque personne ne peut détenir qu'un seul compte. Le PIN est confidentiel."},
{t:"3. Fonctionnement des cercles",d:"Un cercle de tontine est un groupe d'épargne rotative. Chaque membre cotise le montant fixé à la fréquence définie. Le bénéficiaire du tour reçoit la totalité de la cagnotte."},
{t:"4. Paiements et Kolo Pay",d:"Les cotisations se font via Kolo Pay, MTN Mobile Money ou Airtel Money. Kolo Pay est le portefeuille interne de Likelemba. Les retraits sont soumis à des frais de 1%."},
{t:"5. Pénalités de retard",d:"En cas de retard de cotisation, une pénalité de 5 à 10% du montant est automatiquement appliquée. Les pénalités sont redistribuées au cercle."},
{t:"6. Responsabilités",d:"Lamuka Tech ne peut être tenue responsable des désaccords entre membres d'un cercle. L'admin du cercle est responsable de la gestion des membres."},
{t:"7. Protection des données",d:"Vos données personnelles sont protégées conformément à la législation congolaise. Elles ne sont jamais vendues à des tiers."},
{t:"8. Résiliation",d:"Vous pouvez supprimer votre compte à tout moment. Les cotisations en cours ne seront pas remboursées. Un délai de 30 jours s'applique avant suppression définitive."}
].map((s,i)=>(<div key={i} style={{background:C.card,borderRadius:16,padding:16,marginBottom:8,border:`1px solid ${C.brdL}`}}>
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:6}}>{s.t}</div>
<div style={{fontSize:12,color:C.t3,lineHeight:1.5}}>{s.d}</div>
</div>))}
<div style={{textAlign:"center",marginTop:12,fontSize:11,color:C.t4}}>Dernière mise à jour : 01 Avril 2026</div>
</div>);}

// ── About / Contact ──
function About({go}){
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="À propos" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:24,textAlign:"center",border:`1px solid ${C.brd}`,marginBottom:16}}>
<div style={{width:60,height:60,borderRadius:18,background:`linear-gradient(135deg,${C.blue},${C.blueD})`,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,boxShadow:"0 8px 24px rgba(26,86,219,0.25)"}}><span style={{fontSize:24,fontWeight:900,color:"#fff"}}>LK</span></div>
<div style={{fontSize:20,fontWeight:800,color:C.t0}}>Likelemba</div>
<div style={{fontSize:12,color:C.gold,fontWeight:600,letterSpacing:1,marginTop:2}}>TONTINE DIGITALE</div>
<div style={{fontSize:12,color:C.t3,marginTop:8}}>Version 1.0.0</div>
</div>
<div style={{background:C.card,borderRadius:16,padding:16,marginBottom:16,border:`1px solid ${C.brdL}`}}>
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:8}}>À propos</div>
<div style={{fontSize:13,color:C.t2,lineHeight:1.6}}>Likelemba est une application de tontine digitale développée par Lamuka Tech. Notre mission est de moderniser l'épargne communautaire en Afrique Centrale grâce à la technologie mobile.</div>
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:10}}>Contact</div>
{[{ic:"email",l:"Email",v:"business@lamuka-tech.com"},{ic:"tel",l:"Téléphone",v:"+242 06 466 3469"},{ic:"web",l:"Site web",v:"lamuka-tech.com"},{ic:"loc",l:"Adresse",v:"Brazzaville, Congo"}].map((c,i)=>(
<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{width:36,height:36,borderRadius:10,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.globe}</div><div style={{flex:1}}><div style={{fontSize:11,color:C.t3}}>{c.l}</div><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{c.v}</div></div>
</div>))}
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginTop:16,marginBottom:10}}>Réseaux sociaux</div>
<div style={{display:"flex",gap:10}}>
{[{ic:"fb",l:"Facebook"},{ic:"ig",l:"Instagram"},{ic:"tw",l:"Twitter"},{ic:"li",l:"LinkedIn"}].map((s,i)=>(
<div key={i} style={{flex:1,textAlign:"center",padding:"12px 4px",background:C.card,borderRadius:12,border:`1px solid ${C.brdL}`,cursor:"pointer"}}>
<div style={{width:28,height:28,borderRadius:8,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue,fontSize:11,fontWeight:700}}>{s.l[0]}</div><div style={{fontSize:10,color:C.t3}}>{s.l}</div>
</div>))}
</div>
</div>);}

// ── Delete Account ──
function DeleteAccount({go}){const[reason,setReason]=useState("");const[confirmed,setConfirmed]=useState(false);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Supprimer le compte" onBack={()=>go("back")}/>
<div style={{textAlign:"center",marginBottom:24}}><div style={{width:64,height:64,borderRadius:20,background:C.redL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.red}}>{Z.warn}</div>
<h3 style={{fontSize:20,fontWeight:800,color:C.red,margin:"0 0 8px"}}>Supprimer votre compte</h3>
<p style={{fontSize:13,color:C.t3,lineHeight:1.5}}>Cette action est irréversible</p></div>
<div style={{background:C.redL,borderRadius:16,padding:16,marginBottom:20,border:`1px solid ${C.red}20`}}>
<div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:8}}>⚠️ Vous allez perdre :</div>
{["Votre solde Kolo Pay (95 000 FCFA)","Tous vos cercles et cotisations en cours","Votre historique de transactions","Vos récompenses et points (600 pts)","Votre numéro ne pourra pas être réutilisé pendant 90 jours"].map((t,i)=>(<div key={i} style={{fontSize:12,color:C.t2,marginBottom:6,paddingLeft:12,borderLeft:`2px solid ${C.red}40`}}>{t}</div>))}
</div>
<Inp label="Raison de la suppression (optionnel)" ph="Dites-nous pourquoi vous partez..." val={reason} set={setReason} area={true}/>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
<button onClick={()=>setConfirmed(!confirmed)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${confirmed?C.red:C.brd}`,background:confirmed?C.red:"transparent",cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{confirmed&&Z.okW}</button>
<span style={{fontSize:13,color:C.t2}}>Je comprends que cette action est irréversible et je souhaite supprimer mon compte</span>
</div>
<Btn full onClick={()=>go("login")} dis={!confirmed} sx={{background:confirmed?C.red:"#ccc",boxShadow:"none"}}>Supprimer définitivement</Btn>
<div style={{marginTop:12}}><Btn v="s" full onClick={()=>go("settings")}>Annuler</Btn></div>
</div>);}

// ── Marketplace Public Circles ──
const PUB_CIRCLES=[
{id:10,name:"Cercle 50K",amt:50000,dur:"6 mois",mem:6,filled:4,slots:[{n:1,fee:15,taken:true},{n:2,fee:12,taken:true},{n:3,fee:8,taken:false},{n:4,fee:5,taken:true},{n:5,fee:2,taken:true},{n:6,fee:0,taken:false}]},
{id:11,name:"Cercle 100K",amt:100000,dur:"10 mois",mem:10,filled:7,slots:[{n:1,fee:16,taken:true},{n:2,fee:14,taken:true},{n:3,fee:12,taken:true},{n:4,fee:10,taken:false},{n:5,fee:8,taken:true},{n:6,fee:6,taken:true},{n:7,fee:4,taken:true},{n:8,fee:2,taken:false},{n:9,fee:1,taken:true},{n:10,fee:0,taken:false}]},
{id:12,name:"Cercle 25K",amt:25000,dur:"6 mois",mem:6,filled:2,slots:[{n:1,fee:15,taken:true},{n:2,fee:12,taken:false},{n:3,fee:8,taken:false},{n:4,fee:5,taken:true},{n:5,fee:2,taken:false},{n:6,fee:0,taken:false}]},
{id:13,name:"Cercle 200K",amt:200000,dur:"12 mois",mem:12,filled:5,slots:Array.from({length:12},(_,i)=>({n:i+1,fee:Math.max(16-i*1.5,0).toFixed(0)*1,taken:i<5}))},
];
const PROMOS=[
{id:1,title:"25% sur vos 2 premiers versements",desc:"Rejoignez un cercle public et économisez sur les frais des 2 premiers slots",code:"BIENVENUE25",color:C.blue,icon:"gift"},
{id:2,title:"Cashback 10% chez Shoprite",desc:"Payez avec votre Kolo Card et recevez 10% de cashback",color:C.green,icon:"cart"},
{id:3,title:"Parrainage : 5 000 FCFA offerts",desc:"Invitez un ami et recevez chacun 5 000 FCFA sur Kolo Pay",code:"PARRAIN5K",color:C.gold,icon:"hand"},
{id:4,title:"0% de frais sur le dernier slot",desc:"Les derniers tours sont toujours gratuits !",color:C.purple,icon:"kolo"},
];
const SNBL_PLANS=[
{id:1,name:"Smartphone",target:150000,monthly:25000,dur:"6 mois",ic:"phone",partner:"Airtel Shop",progress:60},
{id:2,name:"Électroménager",target:300000,monthly:30000,dur:"10 mois",ic:"appliance",partner:"Shoprite Congo",progress:20},
{id:3,name:"Scooter",target:500000,monthly:50000,dur:"10 mois",ic:"scooter",partner:"Motor Congo",progress:0},
{id:4,name:"Laptop",target:400000,monthly:40000,dur:"10 mois",ic:"laptop",partner:"Tech Store BZV",progress:0},
];

function Marketplace({go}){const[tab,setTab]=useState("all");const[dur,setDur]=useState("all");
const filtered=dur==="all"?PUB_CIRCLES:PUB_CIRCLES.filter(c=>c.dur.includes(dur));
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Cercles publics" onBack={()=>go("back")}/>
{/* Promo banner */}
<div style={{background:`linear-gradient(135deg,${C.blue},${C.blueD})`,borderRadius:16,padding:"16px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
<div style={{color:C.gold}}>{Z.gift}</div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>25% de réduction !</div><div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>Sur vos 2 premiers versements</div></div>
<button onClick={()=>go("promos")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,padding:"6px 12px",color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>Voir</button>
</div>
{/* Duration filter */}
<div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto"}}>
{[{k:"all",l:"Tous"},{k:"6",l:"6 mois"},{k:"10",l:"10 mois"},{k:"12",l:"12 mois"}].map(f=>(<button key={f.k} onClick={()=>setDur(f.k)} style={{padding:"8px 14px",borderRadius:50,border:"none",cursor:"pointer",background:dur===f.k?C.blue:C.card,color:dur===f.k?"#fff":C.t2,fontSize:12,fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>{f.l}</button>))}
</div>
{/* Circle cards */}
{filtered.map(c=>{const avail=c.slots.filter(s=>!s.taken);const minFee=Math.min(...avail.map(s=>s.fee));
return(<div key={c.id} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
<div><div style={{fontSize:16,fontWeight:700,color:C.t0}}>{c.name}</div><div style={{fontSize:12,color:C.t3}}>{c.dur} · {c.mem} membres</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:800,color:C.gold}}>{fm(c.amt)} F</div><div style={{fontSize:10,color:C.t3}}>par tour</div></div>
</div>
{/* Progress */}
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:11,color:C.t3}}>{c.filled}/{c.mem} places prises</span><span style={{fontSize:11,fontWeight:600,color:avail.length<=2?C.red:C.green}}>{avail.length} dispo</span></div>
<div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden",marginBottom:12}}><div style={{width:`${(c.filled/c.mem)*100}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`,borderRadius:4}}/></div>
{/* Available slots */}
<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
{c.slots.map(s=>(<div key={s.n} style={{width:40,height:40,borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:s.taken?C.brd:s.fee===0?C.greenL:C.blueL,border:`1.5px solid ${s.taken?"transparent":s.fee===0?C.green:C.blue}`,opacity:s.taken?.4:1,cursor:s.taken?"default":"pointer"}}>
<span style={{fontSize:12,fontWeight:700,color:s.taken?C.t4:s.fee===0?C.green:C.blue}}>{s.n}</span>
<span style={{fontSize:8,fontWeight:600,color:s.taken?C.t4:s.fee===0?C.green:C.t3}}>{s.fee}%</span>
</div>))}
</div>
{minFee===0&&<div style={{background:C.greenL,borderRadius:8,padding:"6px 10px",marginBottom:10,display:"inline-block"}}><span style={{fontSize:11,fontWeight:700,color:C.green}}>🎉 Slot gratuit disponible !</span></div>}
<Btn full onClick={()=>go("slotPick:"+c.id)}>Rejoindre · dès {minFee}% de frais</Btn>
</div>);})}
</div>);}

// ── Slot Picker ──
function SlotPick({go,cid}){const c=PUB_CIRCLES.find(x=>x.id===cid)||PUB_CIRCLES[0];const[sel,setSel]=useState(null);const selSlot=c.slots.find(s=>s.n===sel);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Choisir votre slot" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`,marginBottom:16,textAlign:"center"}}>
<div style={{fontSize:20,fontWeight:800,color:C.t0}}>{c.name}</div>
<div style={{fontSize:28,fontWeight:800,color:C.gold,marginTop:4}}>{fm(c.amt)} FCFA</div>
<div style={{fontSize:12,color:C.t3,marginTop:2}}>{c.dur} · Cotisation mensuelle</div>
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Choisissez votre tour</div>
<div style={{fontSize:12,color:C.t3,marginBottom:12}}>Plus vous choisissez un slot tard, moins vous payez de frais</div>
{c.slots.filter(s=>!s.taken).map(s=>(<button key={s.n} onClick={()=>setSel(s.n)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",width:"100%",background:sel===s.n?C.blueL:C.card,borderRadius:16,marginBottom:8,border:`1.5px solid ${sel===s.n?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<div style={{width:40,height:40,borderRadius:12,background:s.fee===0?C.greenL:C.blueL,display:"flex",alignItems:"center",justifyContent:"center"}}>
<span style={{fontSize:16,fontWeight:800,color:s.fee===0?C.green:C.blue}}>{s.n}</span></div>
<div style={{flex:1}}>
<div style={{fontSize:14,fontWeight:600,color:C.t1}}>Tour {s.n}</div>
<div style={{fontSize:12,color:C.t3}}>Vous recevez {fm(c.amt*c.mem)} F au mois {s.n}</div>
</div>
<div style={{textAlign:"right"}}>
<div style={{fontSize:16,fontWeight:800,color:s.fee===0?C.green:C.gold}}>{s.fee}%</div>
<div style={{fontSize:10,color:C.t3}}>frais: {fm(Math.round(c.amt*s.fee/100))} F</div>
</div>
</button>))}
{sel&&<div style={{background:C.card,borderRadius:16,padding:16,marginTop:8,border:`1px solid ${C.brd}`}}>
<div style={{fontSize:13,fontWeight:600,color:C.t1,marginBottom:8}}>Résumé</div>
{[{l:"Cotisation mensuelle",v:fm(c.amt)+" F"},{l:"Frais ("+selSlot?.fee+"%)",v:fm(Math.round(c.amt*selSlot?.fee/100))+" F"},{l:"Total/mois",v:fm(c.amt+Math.round(c.amt*selSlot?.fee/100))+" F"},{l:"Vous recevez",v:fm(c.amt*c.mem)+" F"},{l:"Au mois",v:"Mois "+sel}].map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<4?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:700,color:C.t1}}>{r.v}</span></div>))}
</div>}
<div style={{marginTop:16}}><Btn full onClick={()=>go("kyc")} dis={!sel}>Continuer → Vérification d'identité</Btn></div>
</div>);}

// ── KYC Verification ──
function KYC({go}){const[step,setStep]=useState(1);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Vérification d'identité" onBack={()=>go("back")}/>
<div style={{display:"flex",gap:4,marginBottom:24}}>{[1,2,3].map(s=>(<div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?C.blue:C.brd}}/>))}</div>
{step===1&&<div>
<div style={{textAlign:"center",marginBottom:24}}><div style={{width:80,height:80,borderRadius:24,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,color:C.blue}}>{Z.doc}</div>
<h3 style={{fontSize:18,fontWeight:700,color:C.t0,margin:"0 0 6px"}}>Carte d'identité</h3>
<p style={{fontSize:13,color:C.t3}}>Prenez une photo recto de votre carte d'identité nationale</p></div>
<div style={{background:C.card,borderRadius:20,height:180,border:`2px dashed ${C.brd}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",marginBottom:16}}>
<span style={{color:C.blue,marginBottom:8}}>{Z.cam}</span>
<span style={{fontSize:13,color:C.t2}}>Appuyez pour capturer</span>
<span style={{fontSize:11,color:C.t3,marginTop:4}}>JPEG ou PNG · Max 5MB</span>
</div>
<Btn full onClick={()=>setStep(2)}>Suivant</Btn>
</div>}
{step===2&&<div>
<div style={{textAlign:"center",marginBottom:24}}><div style={{width:80,height:80,borderRadius:24,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,color:C.blue}}>{Z.usr}</div>
<h3 style={{fontSize:18,fontWeight:700,color:C.t0,margin:"0 0 6px"}}>Selfie de vérification</h3>
<p style={{fontSize:13,color:C.t3}}>Prenez un selfie clair avec un bon éclairage</p></div>
<div style={{background:C.card,borderRadius:"50%",width:200,height:200,margin:"0 auto 20px",border:`3px dashed ${C.blue}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
<div style={{color:C.blue}}>{Z.cam}</div>
</div>
<Btn full onClick={()=>setStep(3)}>Vérifier mon identité</Btn>
</div>}
{step===3&&<div style={{textAlign:"center",paddingTop:40}}>
<div style={{width:80,height:80,borderRadius:24,background:C.greenL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:16,color:C.green}}>{Z.shield}</div>
<h3 style={{fontSize:20,fontWeight:800,color:C.green,margin:"0 0 8px"}}>Vérifié !</h3>
<p style={{fontSize:13,color:C.t3,marginBottom:32}}>Votre identité a été confirmée avec succès. Vous pouvez maintenant rejoindre des cercles publics.</p>
<div style={{background:C.card,borderRadius:16,padding:16,border:`1px solid ${C.brd}`,marginBottom:20,textAlign:"left"}}>
{[{l:"Nom",v:"Joeldy Tsina"},{l:"N° ID",v:"CG-2026-XXXXX"},{l:"Score crédit",v:"★ 85/100"},{l:"Statut",v:"● Vérifié"}].map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<3?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:600,color:C.t1}}>{r.v}</span></div>))}
</div>
<Btn full onClick={()=>go("ok")}>Continuer</Btn>
</div>}
</div>);}

// ── Credit Score ──
function CreditScore({go}){const score=85;const factors=[{l:"Cotisations à temps",v:"12/12",pct:100,c:C.green},{l:"Ancienneté",v:"6 mois",pct:60,c:C.blue},{l:"Cercles complétés",v:"2",pct:40,c:C.gold},{l:"Pénalités",v:"0",pct:100,c:C.green},{l:"Parrainage",v:"3 filleuls",pct:30,c:C.purple}];
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Score de crédit" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:24,padding:24,textAlign:"center",marginBottom:20}}>
<div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:8}}>Votre Score Likelemba</div>
<div style={{position:"relative",width:120,height:120,margin:"0 auto 12px"}}>
<svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/><circle cx="60" cy="60" r="52" fill="none" stroke={C.gold} strokeWidth="8" strokeDasharray={`${score*3.27} 327`} strokeLinecap="round" transform="rotate(-90 60 60)"/></svg>
<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}><div style={{fontSize:32,fontWeight:800,color:C.gold}}>{score}</div><div style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>/ 100</div></div>
</div>
<div style={{fontSize:14,fontWeight:700,color:C.green}}>Excellent</div>
<div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:4}}>Vous avez accès aux meilleurs slots</div>
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:12}}>Facteurs de votre score</div>
{factors.map((f,i)=>(<div key={i} style={{background:C.card,borderRadius:14,padding:"12px 16px",marginBottom:8,border:`1px solid ${C.brdL}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{f.l}</span><span style={{fontSize:13,fontWeight:700,color:f.c}}>{f.v}</span></div>
<div style={{background:C.bg,borderRadius:3,height:4,overflow:"hidden"}}><div style={{width:`${f.pct}%`,height:"100%",background:f.c,borderRadius:3}}/></div>
</div>))}
<div style={{background:C.blueL,borderRadius:14,padding:14,marginTop:8,border:`1px solid ${C.blue}15`}}>
<div style={{fontSize:13,fontWeight:600,color:C.blue,marginBottom:4}}>💡 Comment améliorer votre score ?</div>
<div style={{fontSize:12,color:C.t2,lineHeight:1.5}}>Cotisez à temps, complétez des cercles, et parrainez vos amis pour monter votre score et accéder aux slots à 0% de frais.</div>
</div>
</div>);}

// ── Kolo Card ──
function KoloCard({go}){const[showNum,setShowNum]=useState(false);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Kolo Card" onBack={()=>go("back")}/>
{/* Card */}
<div style={{background:`linear-gradient(135deg,${C.navy},#1A3A6B)`,borderRadius:20,padding:"24px 22px",marginBottom:20,boxShadow:"0 12px 40px rgba(11,29,58,0.4)",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:50,background:"rgba(255,255,255,0.05)"}}/>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:24}}>
<div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.7)",letterSpacing:1}}>KOLO PAY</div>
<div style={{fontSize:12,fontWeight:600,color:C.gold}}><SvgIc type="kolo" size={14}/> PREMIUM</div>
</div>
<div onClick={()=>setShowNum(!showNum)} style={{fontSize:18,fontWeight:600,color:"#fff",letterSpacing:3,marginBottom:20,cursor:"pointer"}}>{showNum?"5342 •••• •••• 8901":"•••• •••• •••• 8901"}</div>
<div style={{display:"flex",justifyContent:"space-between"}}>
<div><div style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>TITULAIRE</div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>JOELDY TSINA</div></div>
<div><div style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>EXPIRE</div><div style={{fontSize:13,fontWeight:600,color:"#fff"}}>12/28</div></div>
<div style={{display:"flex",alignItems:"flex-end"}}><div style={{width:30,height:20,borderRadius:4,background:C.gold,opacity:0.8}}/><div style={{width:30,height:20,borderRadius:4,background:C.orange,opacity:0.6,marginLeft:-12}}/></div>
</div>
</div>
{/* Balance */}
<div style={{background:C.card,borderRadius:16,padding:"14px 18px",display:"flex",justifyContent:"space-between",marginBottom:16,border:`1px solid ${C.brd}`}}>
<span style={{fontSize:13,color:C.t3}}>Solde Kolo Card</span><span style={{fontSize:16,fontWeight:800,color:C.gold}}>{fm(95000)} FCFA</span>
</div>
{/* Actions */}
<div style={{display:"flex",gap:8,marginBottom:20}}>
<Btn full onClick={()=>go("topup")} sx={{flex:1}}>{Z.dn} Recharger</Btn>
<Btn v="s" full onClick={()=>{}} sx={{flex:1}}>{Z.gear} Gérer</Btn>
</div>
{/* Benefits */}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:12}}>Avantages Kolo Card</div>
{[{ic:"cart",t:"Paiement en magasin",d:"Payez chez tous les marchands acceptant Mastercard"},{ic:"web",t:"Achats en ligne",d:"Compatible avec tous les sites e-commerce"},{ic:"cash",t:"Cashback 5%",d:"Sur tous vos achats avec la Kolo Card"},{ic:"atm",t:"Retrait ATM",d:"Retirez aux distributeurs partenaires"},{ic:"lock",t:"Sécurisé",d:"Gel instantané, alertes en temps réel"}].map((b,i)=>(<div key={i} style={{display:"flex",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{width:36,height:36,borderRadius:10,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{Z.shield}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{b.t}</div><div style={{fontSize:11,color:C.t3}}>{b.d}</div></div>
</div>))}
<div style={{marginTop:12}}><Btn v="s" full onClick={()=>go("promos")}>{Z.star} Voir les offres cashback</Btn></div>
</div>);}

// ── Save Now Buy Later ──
function SNBL({go}){const[tab,setTab]=useState("browse");
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Épargner & Acheter" onBack={()=>go("back")}/>
{/* Header */}
<div style={{background:`linear-gradient(135deg,${C.blue},${C.blueD})`,borderRadius:20,padding:"18px 20px",marginBottom:16}}>
<div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:4}}>Save Now, Buy Later</div>
<div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Épargnez d'abord, achetez sans dette. 0% d'intérêt.</div>
</div>
{/* Tabs */}
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:16,border:`1px solid ${C.brd}`}}>
{[{k:"browse",l:"Découvrir"},{k:"my",l:"Mes plans"}].map(t=>(<button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t.k?`linear-gradient(135deg,${C.blue},${C.blueD})`:"transparent",color:tab===t.k?"#fff":C.t3,fontSize:13,fontWeight:600,cursor:"pointer"}}>{t.l}</button>))}
</div>
{tab==="browse"&&SNBL_PLANS.map(p=>(<div key={p.id} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
<div style={{width:48,height:48,borderRadius:14,background:C.blueL,display:"flex",alignItems:"center",justifyContent:"center"}}><SvgIc type={p.ic} size={24}/></div>
<div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:C.t0}}>{p.name}</div><div style={{fontSize:12,color:C.t3}}>Partenaire : {p.partner}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:800,color:C.gold}}>{fm(p.target)}</div><div style={{fontSize:10,color:C.t3}}>FCFA</div></div>
</div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
<span style={{fontSize:12,color:C.t3}}>{fm(p.monthly)} F/mois × {p.dur}</span>
<span style={{fontSize:12,fontWeight:600,color:C.green}}>0% intérêt</span>
</div>
<Btn full onClick={()=>go("ok")} sx={{padding:"10px 20px",fontSize:13}}>Commencer à épargner</Btn>
</div>))}
{tab==="my"&&<div>
{SNBL_PLANS.filter(p=>p.progress>0).length>0?
SNBL_PLANS.filter(p=>p.progress>0).map(p=>(<div key={p.id} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
<SvgIc type={p.ic} size={24}/>
<div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:C.t0}}>{p.name}</div><div style={{fontSize:12,color:C.t3}}>{p.partner}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:C.gold}}>{fm(Math.round(p.target*p.progress/100))}</div><div style={{fontSize:10,color:C.t3}}>/ {fm(p.target)}</div></div>
</div>
<div style={{background:C.bg,borderRadius:4,height:6,overflow:"hidden",marginBottom:4}}><div style={{width:`${p.progress}%`,height:"100%",background:`linear-gradient(90deg,${C.blue},${C.gold})`,borderRadius:4}}/></div>
<div style={{textAlign:"right",fontSize:11,color:C.t3}}>{p.progress}% épargné</div>
</div>))
:<div style={{textAlign:"center",padding:32,color:C.t3,fontSize:13}}>Aucun plan actif. Découvrez les offres !</div>}
</div>}
</div>);}

// ── Promos & Cashback ──
function Promos({go}){
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Offres & Cashback" onBack={()=>go("back")}/>
{PROMOS.map(p=>(<div key={p.id} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`,overflow:"hidden",position:"relative"}}>
<div style={{position:"absolute",top:0,left:0,width:4,height:"100%",background:p.color}}/>
<div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
<div style={{width:40,height:40,borderRadius:12,background:p.color+"12",display:"flex",alignItems:"center",justifyContent:"center",color:p.color}}>{Z.gift}</div>
<div style={{flex:1}}>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:4}}>{p.title}</div>
<div style={{fontSize:12,color:C.t3,lineHeight:1.4,marginBottom:8}}>{p.desc}</div>
{p.code&&<div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.bg,borderRadius:8,padding:"4px 10px",border:`1px dashed ${C.brd}`}}>
<span style={{fontSize:12,fontWeight:700,color:p.color,letterSpacing:1}}>{p.code}</span>
<span style={{color:C.t3}}>{Z.copy}</span>
</div>}
</div>
</div>
</div>))}
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginTop:8,marginBottom:12}}>Partenaires cashback</div>
{[{n:"Shoprite Congo",cb:"10%",ic:"S"},{n:"Airtel Shop",cb:"8%",ic:"A"},{n:"Total Energies",cb:"5%",ic:"T"},{n:"Poto-Poto Market",cb:"3%",ic:"P"}].map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{width:36,height:36,borderRadius:10,background:C.greenL,display:"flex",alignItems:"center",justifyContent:"center",color:C.green,fontSize:14,fontWeight:800}}>{p.ic}</div><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{p.n}</div></div>
<span style={{fontSize:14,fontWeight:800,color:C.green}}>{p.cb}</span>
</div>))}
</div>);}

// ── Digital Contract ──
function Contract({go}){
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Contrat numérique" onBack={()=>go("back")}/>
<div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`,marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
<div><div style={{fontSize:16,fontWeight:700,color:C.t0}}>Contrat N° LK-2026-0412</div><div style={{fontSize:12,color:C.t3}}>Cercle Élite · Signé le 15 Jan 2026</div></div>
<div style={{background:C.greenL,borderRadius:8,padding:"4px 10px"}}><span style={{fontSize:11,fontWeight:700,color:C.green}}>Actif</span></div>
</div>
{[{l:"Parties",v:"6 membres vérifiés"},{l:"Montant/tour",v:"25 000 FCFA"},{l:"Fréquence",v:"Mensuel"},{l:"Durée",v:"6 mois (Jan - Jun 2026)"},{l:"Cagnotte totale",v:"150 000 FCFA"},{l:"Pénalité retard",v:"5% automatique"},{l:"Méthode",v:"Kolo Pay / Mobile Money"},{l:"Supervisé par",v:"Lamuka Tech S.A."},{l:"Juridiction",v:"République du Congo"}].map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<8?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:600,color:C.t1}}>{r.v}</span></div>))}
</div>
<div style={{background:C.blueL,borderRadius:14,padding:14,marginBottom:16,border:`1px solid ${C.blue}15`}}>
<div style={{fontSize:12,color:C.blue,fontWeight:600,marginBottom:4}}>{Z.lock} Sécurité du contrat</div>
<div style={{fontSize:11,color:C.t2,lineHeight:1.5}}>Ce contrat est enregistré numériquement et sécurisé par Lamuka Tech. Chaque cotisation et versement est tracé de manière transparente. En cas de litige, le contrat fait foi.</div>
</div>
<div style={{display:"flex",gap:8}}>
<Btn v="s" full sx={{flex:1}}>{Z.dn} Télécharger PDF</Btn>
<Btn v="s" full sx={{flex:1}}>{Z.send} Partager</Btn>
</div>
</div>);}

// ── P2P Transfer ──
function Transfer({go}){const[step,setStep]=useState(1);const[amt,setAmt]=useState("");const[to,setTo]=useState("");const[note,setNote]=useState("");
const contacts=[{n:"Grace M.",p:"+242 05 512 8834",i:"GM"},{n:"Patrick K.",p:"+242 06 891 2245",i:"PK"},{n:"Merveille N.",p:"+242 05 334 7712",i:"MN"},{n:"Divine L.",p:"+242 05 667 9983",i:"DL"}];
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Envoyer de l'argent" onBack={()=>go("back")}/>
{step===1&&<div>
<Inp label="Numéro ou nom du destinataire" ph="+242 06 XXX XXXX" val={to} set={setTo} icon={Z.srch}/>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Contacts récents</div>
{contacts.map((c,i)=>(<button key={i} onClick={()=>{setTo(c.p);setStep(2)}} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",width:"100%",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<Av ini={c.i} sz={40}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{c.n}</div><div style={{fontSize:12,color:C.t3}}>{c.p}</div></div><span style={{color:C.t4}}>{Z.fwd}</span></button>))}
<div style={{textAlign:"center",marginTop:16}}><Btn v="s" onClick={()=>go("qr")}>{Z.qr} Scanner un QR</Btn></div>
</div>}
{step===2&&<div>
<div style={{background:C.card,borderRadius:20,padding:"24px 20px",textAlign:"center",marginBottom:16,border:`1px solid ${C.brd}`}}>
<div style={{fontSize:13,color:C.t3,marginBottom:8}}>Montant à envoyer</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0" style={{fontSize:36,fontWeight:800,color:C.gold,border:"none",background:"none",outline:"none",width:160,textAlign:"center"}}/><span style={{fontSize:16,fontWeight:600,color:C.t3}}>FCFA</span></div>
</div>
<div style={{display:"flex",gap:8,marginBottom:16}}>{[5000,10000,25000,50000].map(v=>(<button key={v} onClick={()=>setAmt(String(v))} style={{flex:1,padding:"10px 0",borderRadius:10,border:`1px solid ${amt===String(v)?C.blue:C.brd}`,background:amt===String(v)?C.blueL:C.card,color:amt===String(v)?C.blue:C.t2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{fm(v)}</button>))}</div>
<Inp label="Note (optionnel)" ph="Ex: Remboursement dîner" val={note} set={setNote}/>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Payer via</div>
{WALLETS.map((w,i)=>(<button key={w.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",width:"100%",background:i===0?C.blueL:C.card,borderRadius:14,marginBottom:6,border:`1.5px solid ${i===0?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<SvgIc type={w.logo} size={24}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{w.n}</div><div style={{fontSize:11,color:C.t3}}>{fm(w.bal)} F</div></div>
{i===0&&<div style={{width:18,height:18,borderRadius:9,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>}
</button>))}
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")} dis={!amt}>Envoyer {amt?fm(amt)+" FCFA":""}</Btn></div>
</div>}
</div>);}

// ── Buy Credit/Data ──
function BuyCredit({go}){const[tab,setTab]=useState("credit");const[op,setOp]=useState(0);const[amt,setAmt]=useState("");
const ops=[{n:"MTN",logo:"mtn"},{n:"Airtel",logo:"airtel"}];
const dataPacks=[{n:"1 Go / 1 jour",p:500},{n:"3 Go / 7 jours",p:1500},{n:"10 Go / 30 jours",p:5000},{n:"25 Go / 30 jours",p:10000},{n:"Illimité / 24h",p:1000},{n:"50 Go / 30 jours",p:15000}];
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Crédit & Data" onBack={()=>go("back")}/>
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:16,border:`1px solid ${C.brd}`}}>
{[{k:"credit",l:"Crédit"},{k:"data",l:"Forfait Data"}].map(t=>(<button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t.k?`linear-gradient(135deg,${C.blue},${C.blueD})`:"transparent",color:tab===t.k?"#fff":C.t3,fontSize:13,fontWeight:600,cursor:"pointer"}}>{t.l}</button>))}
</div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Opérateur</div>
<div style={{display:"flex",gap:8,marginBottom:16}}>{ops.map((o,i)=>(<button key={i} onClick={()=>setOp(i)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px",background:op===i?C.blueL:C.card,borderRadius:14,border:`1.5px solid ${op===i?C.blue:C.brdL}`,cursor:"pointer"}}>
<SvgIc type={o.logo} size={28}/><span style={{fontSize:14,fontWeight:600,color:C.t1}}>{o.n}</span></button>))}</div>
<Inp label="Numéro" ph="+242 06 XXX XXXX" icon={Z.phone}/>
{tab==="credit"?<div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Montant</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
{[500,1000,2000,5000,10000,20000].map(v=>(<button key={v} onClick={()=>setAmt(String(v))} style={{padding:"14px 0",borderRadius:12,border:`1.5px solid ${amt===String(v)?C.blue:C.brd}`,background:amt===String(v)?C.blueL:C.card,color:amt===String(v)?C.blue:C.t1,fontSize:14,fontWeight:700,cursor:"pointer"}}>{fm(v)} F</button>))}</div>
</div>
:<div>{dataPacks.map((d,i)=>(<button key={i} onClick={()=>setAmt(String(d.p))} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",width:"100%",background:amt===String(d.p)?C.blueL:C.card,borderRadius:14,marginBottom:6,border:`1.5px solid ${amt===String(d.p)?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<span style={{fontSize:13,fontWeight:600,color:C.t1}}>{d.n}</span><span style={{fontSize:14,fontWeight:700,color:C.gold}}>{fm(d.p)} F</span></button>))}</div>}
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")} dis={!amt}>{tab==="credit"?"Recharger":"Acheter"} {amt?fm(amt)+" FCFA":""}</Btn></div>
</div>);}

// ── Bill Payment ──
function Bills({go}){const[sel,setSel]=useState(null);const[num,setNum]=useState("");const[amt,setAmt]=useState("");
const bills=[{id:0,n:"Électricité (SNE)",ic:Z.gear,col:C.gold},{id:1,n:"Eau (SNDE)",ic:Z.dn,col:C.blue},{id:2,n:"Canal+",ic:Z.star,col:C.navy},{id:3,n:"Startimes",ic:Z.star,col:C.orange},{id:4,n:"Internet",ic:Z.globe,col:C.green},{id:5,n:"DSTV",ic:Z.star,col:C.purple}];
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Payer une facture" onBack={()=>go("back")}/>
{sel===null?<div>
<div style={{fontSize:13,color:C.t3,marginBottom:14}}>Choisissez le service</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
{bills.map(b=>(<button key={b.id} onClick={()=>setSel(b.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"20px 10px",background:C.card,borderRadius:16,border:`1px solid ${C.brd}`,cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.boxShadow=C.sh} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
<div style={{width:44,height:44,borderRadius:14,background:b.col+"15",display:"flex",alignItems:"center",justifyContent:"center",color:b.col}}>{b.ic}</div>
<span style={{fontSize:13,fontWeight:600,color:C.t1}}>{b.n}</span></button>))}
</div></div>
:<div>
<button onClick={()=>setSel(null)} style={{display:"flex",alignItems:"center",gap:8,background:C.blueL,borderRadius:12,padding:"10px 16px",border:"none",cursor:"pointer",marginBottom:16,color:C.blue,fontWeight:600,fontSize:13}}><div style={{width:32,height:32,borderRadius:10,background:C.blue+"20",display:"flex",alignItems:"center",justifyContent:"center",color:C.blue}}>{bills[sel].ic}</div>{bills[sel].n} <span style={{color:C.t4,marginLeft:"auto"}}>{Z.fwd}</span></button>
<Inp label="Numéro d'abonné / décodeur" ph="Ex: 12345678" val={num} set={setNum}/>
<Inp label="Montant (FCFA)" ph="Ex: 15000" val={amt} set={setAmt} type="number"/>
<div style={{background:C.card,borderRadius:14,padding:"12px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",border:`1px solid ${C.brd}`}}>
<span style={{fontSize:12,color:C.t3}}>Payer via</span><span style={{fontSize:12,fontWeight:700,color:C.kolo}}>Kolo Pay</span></div>
<Btn full onClick={()=>go("ok")} dis={!num||!amt}>Payer {amt?fm(amt)+" FCFA":""}</Btn>
</div>}
</div>);}

// ── Micro Credit / Loans ──
function MicroCredit({go}){const[amt,setAmt]=useState("");const maxLoan=250000;const score=85;
const plans=[{dur:"7 jours",rate:"2%",max:50000},{dur:"14 jours",rate:"3.5%",max:100000},{dur:"30 jours",rate:"5%",max:250000},{dur:"90 jours",rate:"8%",max:500000}];
const[sel,setSel]=useState(null);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Micro-crédit" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:20,padding:20,marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<div><div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Montant éligible</div><div style={{fontSize:24,fontWeight:800,color:C.gold}}>{fm(maxLoan)} F</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Score crédit</div><div style={{fontSize:24,fontWeight:800,color:C.green}}>{score}/100</div></div>
</div>
<div style={{background:"rgba(255,255,255,0.1)",borderRadius:8,padding:"8px 12px",fontSize:11,color:"rgba(255,255,255,0.7)"}}>Basé sur votre historique de 12 cotisations à temps</div>
</div>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:10}}>Choisir une durée</div>
{plans.map((p,i)=>(<button key={i} onClick={()=>setSel(i)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",width:"100%",background:sel===i?C.blueL:C.card,borderRadius:14,marginBottom:8,border:`1.5px solid ${sel===i?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
<div><div style={{fontSize:14,fontWeight:600,color:C.t1}}>{p.dur}</div><div style={{fontSize:11,color:C.t3}}>Intérêt : {p.rate}</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:C.gold}}>Max {fm(p.max)} F</div></div>
</button>))}
{sel!==null&&<div style={{marginTop:8}}>
<Inp label="Montant souhaité (FCFA)" ph={`Max ${fm(plans[sel].max)}`} val={amt} set={setAmt} type="number"/>
{amt&&<div style={{background:C.card,borderRadius:14,padding:14,border:`1px solid ${C.brd}`,marginBottom:12}}>
{[{l:"Montant emprunté",v:fm(amt)+" F"},{l:"Intérêt ("+plans[sel].rate+")",v:fm(Math.round(parseInt(amt)*parseFloat(plans[sel].rate)/100))+" F"},{l:"Total à rembourser",v:fm(parseInt(amt)+Math.round(parseInt(amt)*parseFloat(plans[sel].rate)/100))+" F"},{l:"Échéance",v:plans[sel].dur}].map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<3?`1px solid ${C.brd}`:""}}><span style={{fontSize:12,color:C.t3}}>{r.l}</span><span style={{fontSize:12,fontWeight:700,color:C.t1}}>{r.v}</span></div>))}
</div>}
<Btn full onClick={()=>go("ok")} dis={!amt||parseInt(amt)>plans[sel].max}>Demander le crédit</Btn>
</div>}
</div>);}

// ── Group Goals ──
function GroupGoals({go}){const[showCreate,setShowCreate]=useState(false);
const goals=[{id:1,n:"Mariage de Grace",target:2000000,saved:750000,members:8,icon:Z.gift,col:C.gold},{id:2,n:"Location Bus Excursion",target:500000,saved:350000,members:12,icon:Z.grp,col:C.green}];
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Objectifs de groupe" onBack={()=>go("back")} right={<button onClick={()=>setShowCreate(!showCreate)} style={{background:"none",border:"none",cursor:"pointer",color:C.blue}}>{Z.plus}</button>}/>
{showCreate&&<div style={{background:C.card,borderRadius:20,padding:18,marginBottom:16,border:`1px solid ${C.blue}30`}}>
<div style={{fontSize:14,fontWeight:700,color:C.t0,marginBottom:12}}>Nouvel objectif</div>
<Inp label="Nom de l'objectif" ph="Ex: Voyage de groupe"/><Inp label="Montant cible (FCFA)" ph="Ex: 500000" type="number"/><Inp label="Nombre de participants" ph="Ex: 6" type="number"/>
<Btn full onClick={()=>{setShowCreate(false)}}>Créer l'objectif</Btn></div>}
{goals.map(g=>{const pct=Math.round(g.saved/g.target*100);return(<div key={g.id} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
<div style={{width:44,height:44,borderRadius:14,background:g.col+"15",display:"flex",alignItems:"center",justifyContent:"center",color:g.col}}>{g.icon}</div>
<div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:C.t0}}>{g.n}</div><div style={{fontSize:12,color:C.t3}}>{g.members} participants</div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:800,color:C.gold}}>{pct}%</div></div>
</div>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,color:C.t3}}>{fm(g.saved)} / {fm(g.target)} F</span></div>
<div style={{background:C.bg,borderRadius:4,height:8,overflow:"hidden",marginBottom:12}}><div style={{width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${g.col},${C.gold})`,borderRadius:4}}/></div>
<Btn full onClick={()=>go("contribute")} sx={{padding:"10px 20px",fontSize:13}}>Contribuer</Btn>
</div>);})}
</div>);}

// ── Financial Dashboard ──
function FinDash({go}){
const months=["Jan","Fév","Mar","Avr","Mai","Jun"];
const income=[120000,95000,105000,180000,75000,0];
const expense=[85000,70000,90000,60000,95000,0];
const maxV=Math.max(...income,...expense);
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Analyse financière" onBack={()=>go("back")}/>
<div style={{display:"flex",gap:10,marginBottom:16}}>
{[{l:"Revenus",v:"575K",c:C.green,bg:C.greenL},{l:"Dépenses",v:"400K",c:C.red,bg:C.redL},{l:"Épargne",v:"175K",c:C.blue,bg:C.blueL}].map((s,i)=>(
<div key={i} style={{flex:1,textAlign:"center",padding:"14px 8px",background:s.bg,borderRadius:14}}>
<div style={{fontSize:18,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3,marginTop:2}}>{s.l}</div></div>))}
</div>
{/* Chart */}
<div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.brd}`,marginBottom:16}}>
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:4}}>Revenus vs Dépenses</div>
<div style={{fontSize:11,color:C.t3,marginBottom:16}}>6 derniers mois (FCFA)</div>
<div style={{display:"flex",alignItems:"flex-end",gap:6,height:120}}>
{months.map((m,i)=>(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
<div style={{display:"flex",gap:2,alignItems:"flex-end",width:"100%",justifyContent:"center",height:100}}>
<div style={{width:"40%",borderRadius:4,height:`${Math.max((income[i]/maxV)*100,3)}%`,background:C.green,transition:"height 0.5s"}}/>
<div style={{width:"40%",borderRadius:4,height:`${Math.max((expense[i]/maxV)*100,3)}%`,background:C.red,opacity:0.6,transition:"height 0.5s"}}/>
</div>
<span style={{fontSize:10,color:C.t3}}>{m}</span></div>))}
</div>
<div style={{display:"flex",gap:16,justifyContent:"center",marginTop:12}}>{[{l:"Revenus",c:C.green},{l:"Dépenses",c:C.red}].map((x,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:x.c}}/><span style={{fontSize:10,color:C.t3}}>{x.l}</span></div>))}</div>
</div>
{/* Categories */}
<div style={{fontSize:14,fontWeight:700,color:C.t1,marginBottom:10}}>Par catégorie</div>
{[{n:"Cotisations tontine",a:250000,pct:62,c:C.blue},{n:"Transferts P2P",a:80000,pct:20,c:C.gold},{n:"Crédit & Data",a:35000,pct:9,c:C.green},{n:"Factures",a:25000,pct:6,c:C.orange},{n:"Achats Kolo Card",a:10000,pct:3,c:C.purple}].map((c,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{width:8,height:32,borderRadius:4,background:c.c}}/>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{c.n}</div><div style={{background:C.bg,borderRadius:3,height:4,marginTop:4,overflow:"hidden"}}><div style={{width:`${c.pct}%`,height:"100%",background:c.c,borderRadius:3}}/></div></div>
<div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:C.t1}}>{fm(c.a)} F</div><div style={{fontSize:10,color:C.t3}}>{c.pct}%</div></div>
</div>))}
</div>);}

// ── AI Assistant Lamu ──
function Lamu({go}){const[msg,setMsg]=useState("");const[msgs,setMsgs]=useState([
{id:1,from:"lamu",text:"Mbote ! 👋 Je suis Lamu, votre assistant financier. Comment puis-je vous aider ?"},
{id:2,from:"lamu",text:"Je peux vous aider à :\n• Choisir le meilleur cercle\n• Gérer votre budget\n• Comprendre votre score crédit\n• Répondre à vos questions"}
]);const ref=useRef(null);
const doSend=()=>{if(!msg.trim())return;const userMsg={id:Date.now(),from:"me",text:msg.trim()};
const replies={"cercle":"Je vous recommande le Cercle 25K pour commencer. Avec 6 mois et un slot à 0%, c'est idéal pour un premier essai !","score":"Votre score est de 85/100 (Excellent). Pour l'améliorer : cotisez à temps et complétez vos cercles.","crédit":"Avec votre score de 85, vous pouvez emprunter jusqu'à 250 000 FCFA. Les taux commencent à 2% sur 7 jours.","aide":"Je suis là pour vous ! Posez-moi des questions sur les cercles, votre score, les crédits, ou les transferts."};
const key=Object.keys(replies).find(k=>msg.toLowerCase().includes(k));
const botMsg={id:Date.now()+1,from:"lamu",text:key?replies[key]:"Merci pour votre question ! Pour une réponse précise, contactez notre support via WhatsApp au +242 06 466 3469."};
setMsgs(prev=>[...prev,userMsg,botMsg]);setMsg("");setTimeout(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},50);};
return(<div style={{height:"100%",display:"flex",flexDirection:"column",background:C.bg}}>
<div style={{padding:"12px 18px"}}><Hdr title="Assistant Lamu" onBack={()=>go("back")} right={<div style={{width:32,height:32,borderRadius:16,background:`linear-gradient(135deg,${C.blue},${C.kolo})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🤖</div>}/></div>
<div ref={ref} style={{flex:1,overflowY:"auto",padding:"0 18px 12px"}}>
{msgs.map(m=>(<div key={m.id} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start",marginBottom:10}}>
{m.from==="lamu"&&<div style={{width:28,height:28,borderRadius:14,background:`linear-gradient(135deg,${C.blue},${C.kolo})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0,marginRight:6}}>🤖</div>}
<div style={{maxWidth:"80%",padding:"12px 16px",borderRadius:16,borderTopLeftRadius:m.from==="me"?16:4,borderTopRightRadius:m.from==="me"?4:16,background:m.from==="me"?C.blue:C.card,color:m.from==="me"?"#fff":C.t1,fontSize:13,lineHeight:1.5,whiteSpace:"pre-line",boxShadow:m.from==="me"?"none":C.sh}}>{m.text}</div></div>))}
</div>
<div style={{padding:"8px 18px 16px",background:C.card,borderTop:`1px solid ${C.brd}`}}>
<div style={{display:"flex",gap:8}}>
<input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doSend()} placeholder="Posez une question à Lamu..." style={{flex:1,padding:"12px 16px",borderRadius:50,border:`1px solid ${C.brd}`,background:C.bg,outline:"none",fontSize:14,color:C.t0}}/>
<button onClick={doSend} style={{width:44,height:44,borderRadius:22,background:`linear-gradient(135deg,${C.blue},${C.kolo})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0}}>{Z.send}</button>
</div></div></div>);}

// ── Scheduled Payments ──
function AutoPay({go}){const[noti,setNoti]=useState(true);
const scheduled=[{id:1,circle:"Cercle Élite",amt:25000,day:"1er de chaque mois",wallet:"Kolo Pay",active:true},{id:2,circle:"Cercle Amis",amt:10000,day:"15 de chaque mois",wallet:"MTN Mobile Money",active:false}];
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Paiements programmés" onBack={()=>go("back")} right={<button style={{background:"none",border:"none",cursor:"pointer",color:C.blue}}>{Z.plus}</button>}/>
<div style={{background:C.blueL,borderRadius:14,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.blue}15`}}>
<span style={{color:C.blue}}>{Z.bell}</span><div style={{flex:1,fontSize:12,color:C.t2}}>Rappel 24h avant chaque prélèvement</div><Toggle v={noti} set={setNoti}/></div>
{scheduled.map(s=>(<div key={s.id} style={{background:C.card,borderRadius:20,padding:18,marginBottom:12,border:`1px solid ${C.brd}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
<div><div style={{fontSize:15,fontWeight:700,color:C.t0}}>{s.circle}</div><div style={{fontSize:12,color:C.t3}}>{s.day}</div></div>
<Toggle v={s.active} set={()=>{}}/>
</div>
<div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderTop:`1px solid ${C.brd}`}}>
<span style={{fontSize:12,color:C.t3}}>Montant</span><span style={{fontSize:14,fontWeight:700,color:C.gold}}>{fm(s.amt)} F</span></div>
<div style={{display:"flex",justifyContent:"space-between",padding:"8px 0"}}>
<span style={{fontSize:12,color:C.t3}}>Via</span><span style={{fontSize:12,fontWeight:600,color:C.t1}}>{s.wallet}</span></div>
</div>))}
<div style={{marginTop:8}}><Btn full onClick={()=>go("ok")}>{Z.plus} Programmer un paiement</Btn></div>
</div>);}

// ── Dispute / Mediation ──
function Dispute({go}){const[type,setType]=useState("");const[desc,setDesc]=useState("");
const types=["Cotisation non créditée","Membre ne paie pas","Problème de rotation","Erreur de montant","Admin inactif","Autre"];
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Signaler un problème" onBack={()=>go("back")}/>
<div style={{background:C.orangeL,borderRadius:16,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.orange}20`}}>
<span style={{color:C.orange}}>{Z.shield}</span><div style={{fontSize:12,color:C.t2}}>Lamuka Tech examine chaque signalement dans un délai de 48h</div></div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Cercle concerné</div>
<div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto"}}>{CIR.map(c=>(<button key={c.id} style={{padding:"8px 14px",borderRadius:50,border:`1px solid ${C.brd}`,background:C.card,color:C.t1,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{c.name}</button>))}</div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Type de problème</div>
{types.map((t,i)=>(<button key={i} onClick={()=>setType(t)} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",width:"100%",background:type===t?C.blueL:C.card,borderRadius:14,marginBottom:6,border:`1.5px solid ${type===t?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
{type===t?<div style={{width:18,height:18,borderRadius:9,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>:<div style={{width:18,height:18,borderRadius:9,border:`2px solid ${C.brd}`}}/>}
<span style={{fontSize:13,color:C.t1}}>{t}</span></button>))}
<div style={{marginTop:12}}><Inp label="Description détaillée" ph="Décrivez le problème..." val={desc} set={setDesc} area={true}/></div>
<Btn full onClick={()=>go("ok")} dis={!type||!desc}>Envoyer le signalement</Btn>
</div>);}

// ── Export History ──
function ExportHist({go}){const[format,setFormat]=useState("pdf");const[period,setPeriod]=useState("3m");
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Exporter l'historique" onBack={()=>go("back")}/>
<div style={{textAlign:"center",marginBottom:24}}><div style={{width:64,height:64,borderRadius:20,background:C.blueL,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12,color:C.blue}}>{Z.doc}</div>
<h3 style={{fontSize:18,fontWeight:700,color:C.t0,margin:"0 0 6px"}}>Télécharger vos relevés</h3>
<p style={{fontSize:13,color:C.t3}}>Exportez votre historique de transactions</p></div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Format</div>
<div style={{display:"flex",gap:8,marginBottom:16}}>{[{k:"pdf",l:"PDF"},{k:"csv",l:"CSV / Excel"}].map(f=>(<button key={f.k} onClick={()=>setFormat(f.k)} style={{flex:1,padding:"14px",borderRadius:14,border:`1.5px solid ${format===f.k?C.blue:C.brd}`,background:format===f.k?C.blueL:C.card,color:format===f.k?C.blue:C.t2,fontSize:14,fontWeight:600,cursor:"pointer"}}>{f.l}</button>))}</div>
<div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:10}}>Période</div>
{[{k:"1m",l:"Dernier mois"},{k:"3m",l:"3 derniers mois"},{k:"6m",l:"6 derniers mois"},{k:"1y",l:"1 an"},{k:"all",l:"Tout l'historique"}].map(p=>(<button key={p.k} onClick={()=>setPeriod(p.k)} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",width:"100%",background:period===p.k?C.blueL:C.card,borderRadius:14,marginBottom:6,border:`1.5px solid ${period===p.k?C.blue:C.brdL}`,cursor:"pointer",textAlign:"left"}}>
{period===p.k?<div style={{width:18,height:18,borderRadius:9,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center"}}>{Z.okW}</div>:<div style={{width:18,height:18,borderRadius:9,border:`2px solid ${C.brd}`}}/>}
<span style={{fontSize:13,color:C.t1}}>{p.l}</span></button>))}
<div style={{marginTop:16}}><Btn full onClick={()=>go("ok")}>{Z.dn} Télécharger en {format.toUpperCase()}</Btn></div>
</div>);}

// ── Business Account ──
function Business({go}){const[tab,setTab]=useState("dash");
return(<div style={{height:"100%",background:C.bg,overflowY:"auto",padding:"12px 18px",paddingBottom:40}}><Hdr title="Compte Business" onBack={()=>go("back")}/>
<div style={{background:`linear-gradient(135deg,${C.navy},${C.navyM})`,borderRadius:20,padding:20,marginBottom:16}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
<div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Revenus du mois</div>
<span style={{fontSize:10,fontWeight:700,color:C.gold,background:"rgba(245,166,35,0.2)",padding:"3px 8px",borderRadius:6}}>PRO</span>
</div>
<div style={{fontSize:28,fontWeight:800,color:C.gold}}>{fm(425000)} <span style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>FCFA</span></div>
<div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:4}}>32 transactions ce mois</div>
</div>
<div style={{display:"flex",background:C.card,borderRadius:50,padding:3,marginBottom:16,border:`1px solid ${C.brd}`}}>
{[{k:"dash",l:"Tableau de bord"},{k:"txs",l:"Transactions"}].map(t=>(<button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"10px 0",borderRadius:50,border:"none",background:tab===t.k?C.blue:"transparent",color:tab===t.k?"#fff":C.t3,fontSize:12,fontWeight:600,cursor:"pointer"}}>{t.l}</button>))}
</div>
{tab==="dash"&&<div>
<div style={{display:"flex",gap:10,marginBottom:16}}>
{[{l:"Clients",v:"48",c:C.blue},{l:"Panier moyen",v:"13K",c:C.gold},{l:"Croissance",v:"+12%",c:C.green}].map((s,i)=>(
<div key={i} style={{flex:1,textAlign:"center",padding:"14px 8px",background:C.card,borderRadius:14,border:`1px solid ${C.brd}`}}>
<div style={{fontSize:18,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:10,color:C.t3,marginTop:2}}>{s.l}</div></div>))}
</div>
<div style={{fontSize:13,fontWeight:700,color:C.t1,marginBottom:10}}>Actions rapides</div>
<MenuRow icon={Z.qr} label="Afficher mon QR commerçant" onClick={()=>go("qr")}/>
<MenuRow icon={Z.link} label="Lien de paiement" onClick={()=>{}}/>
<MenuRow icon={Z.doc} label="Exporter les relevés" onClick={()=>go("export")}/>
<MenuRow icon={Z.gear} label="Paramètres business" onClick={()=>{}}/>
</div>}
{tab==="txs"&&<div>
{[{n:"Client #12",a:15000,dt:"Aujourd'hui"},{n:"Client #31",a:8500,dt:"Aujourd'hui"},{n:"Client #7",a:22000,dt:"Hier"},{n:"Client #45",a:5000,dt:"Hier"},{n:"Client #19",a:35000,dt:"03 Avr"}].map((tx,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:C.card,borderRadius:14,marginBottom:6,border:`1px solid ${C.brdL}`}}>
<div style={{width:38,height:38,borderRadius:12,background:C.greenL,display:"flex",alignItems:"center",justifyContent:"center",color:C.green}}>{Z.dn}</div>
<div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.t1}}>{tx.n}</div><div style={{fontSize:11,color:C.t3}}>{tx.dt}</div></div>
<span style={{fontSize:14,fontWeight:700,color:C.green}}>+{fm(tx.a)} F</span></div>))}
</div>}
</div>);}

// ── Success ──
function Ok({go}){const[s,setS]=useState(false);useEffect(()=>{setTimeout(()=>setS(true),100)},[]);
return(<div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.bg,padding:"40px 28px",paddingBottom:40}}>
<div style={{opacity:s?1:0,transform:s?"scale(1)":"scale(0.5)",transition:"all 0.5s cubic-bezier(0.34,1.56,0.64,1)",marginBottom:24}}>{Z.okBig}</div>
<h2 style={{fontSize:22,fontWeight:800,color:C.t0,margin:"0 0 8px",opacity:s?1:0,transition:"opacity 0.4s ease 0.2s"}}>Succès !</h2>
<p style={{fontSize:14,color:C.t3,textAlign:"center",opacity:s?1:0,transition:"opacity 0.4s ease 0.3s"}}>Opération effectuée avec succès.</p>
<div style={{width:"100%",marginTop:32,opacity:s?1:0,transition:"opacity 0.4s ease 0.4s"}}><Btn full onClick={()=>go("home")}>Retour à l'accueil</Btn><div style={{height:12}}/><Btn v="s" full onClick={()=>go("rcpt")}>Voir les détails</Btn></div></div>);}

// ═══════════ MAIN APP ═══════════
export default function App(){
  const[sc,setSc]=useState("splash");
  const hist=useRef(["splash"]);
  const go=s=>{
    if(s==="back"){
      if(hist.current.length>1){hist.current.pop();setSc(hist.current[hist.current.length-1]);}
      else setSc("home");
    }else{
      hist.current.push(s);setSc(s);
    }
  };
  const cid=sc.startsWith("cd:")?parseInt(sc.split(":")[1]):null;
  const chatId=sc.startsWith("chat:")?parseInt(sc.split(":")[1]):null;
  const txId=sc.startsWith("txd:")?parseInt(sc.split(":")[1]):null;
  const memId=sc.startsWith("mem:")?parseInt(sc.split(":")[1]):null;
  const slotId=sc.startsWith("slotPick:")?parseInt(sc.split(":")[1]):null;

  const render=()=>{
    if(cid) return <CircleDetail go={go} cid={cid}/>;
    if(chatId) return <Chat go={go} cid={chatId}/>;
    if(txId) return <TxDetail go={go} txId={txId}/>;
    if(memId) return <MemberProf go={go} mid={memId}/>;
    if(slotId) return <SlotPick go={go} cid={slotId}/>;
    switch(sc){
      case "splash": return <Splash go={go}/>;
      case "onb": return <Onb go={go}/>;
      case "login": return <Login go={go}/>;
      case "reg1": return <Reg1 go={go}/>;
      case "reg2": return <Reg2 go={go}/>;
      case "reg3": return <Reg3 go={go}/>;
      case "forgot": return <Forgot go={go}/>;
      case "pin": return <Pin go={go}/>;
      case "home": return <Home go={go} initTab={0}/>;
      case "home_c": return <Home go={go} initTab={1}/>;
      case "home_h": return <Home go={go} initTab={2}/>;
      case "home_p": return <Home go={go} initTab={3}/>;
      case "contribute": return <Contribute go={go}/>;
      case "confirm": return <Confirm go={go}/>;
      case "remind": return <Remind go={go}/>;
      case "qr": return <QR go={go}/>;
      case "wallets": return <Wallets go={go}/>;
      case "withdraw": return <Withdraw go={go}/>;
      case "topup": return <TopUp go={go}/>;
      case "sav": return <Sav go={go}/>;
      case "rcpt": return <Rcpt go={go}/>;
      case "notif": return <Notif go={go}/>;
      case "rwd": return <Rwd go={go}/>;
      case "editProfile": return <EditProfile go={go}/>;
      case "sec": return <Sec go={go}/>;
      case "changePin": return <ChangePin go={go}/>;
      case "changePwd": return <ChangePwd go={go}/>;
      case "lang": return <Lang go={go}/>;
      case "faq": return <FAQ go={go}/>;
      case "privacy": return <Privacy go={go}/>;
      case "terms": return <Terms go={go}/>;
      case "about": return <About go={go}/>;
      case "deleteAccount": return <DeleteAccount go={go}/>;
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
      case "promos": return <Promos go={go}/>;
      case "contract": return <Contract go={go}/>;
      case "transfer": return <Transfer go={go}/>;
      case "buyCredit": return <BuyCredit go={go}/>;
      case "bills": return <Bills go={go}/>;
      case "microCredit": return <MicroCredit go={go}/>;
      case "groupGoals": return <GroupGoals go={go}/>;
      case "finDash": return <FinDash go={go}/>;
      case "lamu": return <Lamu go={go}/>;
      case "autoPay": return <AutoPay go={go}/>;
      case "dispute": return <Dispute go={go}/>;
      case "export": return <ExportHist go={go}/>;
      case "business": return <Business go={go}/>;
      case "ok": return <Ok go={go}/>;
      default: return <Home go={go} initTab={0}/>;
    }
  };
  const isHome=sc.startsWith("home");
  const noSBsc=["splash","onb","login","ok","pin","reg1","reg2","reg3","forgot"];

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
        <div style={{height:"100%",paddingTop:(noSBsc.includes(sc)||isHome)?0:16}}>{render()}</div>
      </div>
    </div>
  );
}
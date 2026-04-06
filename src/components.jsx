import { useState } from "react";
import { C, fm } from "./theme";
import { Z } from "./icons";

export const Btn = ({ children, onClick, v = "p", full, sx, dis }) => {
  const m = {
    p: { background: `linear-gradient(135deg,${C.blue},${C.blueD})`, color: "#fff", border: "none", boxShadow: "0 4px 16px rgba(26,86,219,0.25)" },
    s: { background: C.card, color: C.t1, border: `1.5px solid ${C.brd}`, boxShadow: "none" }
  };
  return <button disabled={dis} onClick={onClick} style={{ ...m[v], borderRadius: 50, padding: "14px 28px", fontSize: 14, fontWeight: 600, cursor: dis ? "not-allowed" : "pointer", opacity: dis ? .5 : 1, width: full ? "100%" : "auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, ...sx }}>{children}</button>;
};

export const Av = ({ ini, sz = 44, col }) => {
  const h = (ini.charCodeAt(0) * 37 + (ini[1]?.charCodeAt(0) || 0) * 97) % 360;
  return <div style={{ width: sz, height: sz, borderRadius: sz / 2, background: col || `hsl(${h},45%,92%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: sz * .36, fontWeight: 700, color: col ? "#fff" : `hsl(${h},45%,40%)`, flexShrink: 0 }}>{ini}</div>;
};

export const Hdr = ({ title, onBack, right }) => (
  <div style={{ display: "flex", alignItems: "center", padding: "6px 0 14px", gap: 12 }}>
    {onBack && <button onClick={onBack} style={{ background: C.card, border: `1px solid ${C.brd}`, borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.t1 }}>{Z.back}</button>}
    <span style={{ flex: 1, fontSize: 18, fontWeight: 700, color: C.t0 }}>{title}</span>
    {right}
  </div>
);

export const Bdg = ({ s }) => {
  const m = { paid: { bg: C.greenL, c: C.green, l: "Payé" }, pending: { bg: C.orangeL, c: C.orange, l: "En attente" }, completed: { bg: C.blueL, c: C.blue, l: "Complété" } };
  const x = m[s] || m.pending;
  return <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: x.bg, color: x.c }}>{x.l}</span>;
};

export const Inp = ({ label, ph, val, set, icon, type = "text", area }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ fontSize: 13, fontWeight: 600, color: C.t2, marginBottom: 6, display: "block" }}>{label}</label>}
    <div style={{ display: "flex", alignItems: area ? "flex-start" : "center", gap: 10, padding: area ? "12px 16px" : "14px 16px", background: C.card, borderRadius: 12, border: `1.5px solid ${C.brd}` }}>
      {icon && <span style={{ color: C.t3 }}>{icon}</span>}
      {area
        ? <textarea placeholder={ph} value={val} onChange={e => set(e.target.value)} rows={3} style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 14, color: C.t0, resize: "none" }} />
        : <input type={type} placeholder={ph} value={val || ""} onChange={e => set(e.target.value)} style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 15, color: C.t0, fontWeight: 500 }} />
      }
    </div>
  </div>
);

export const TxR = ({ tx, onClick }) => (
  <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: `1px solid ${C.brd}`, cursor: onClick ? "pointer" : "default" }}>
    <div style={{ width: 42, height: 42, borderRadius: 14, background: tx.t === "in" ? C.greenL : C.redL, display: "flex", alignItems: "center", justifyContent: "center", color: tx.t === "in" ? C.green : C.red }}>{tx.t === "in" ? Z.dn : Z.up}</div>
    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>{tx.n}</div><div style={{ fontSize: 12, color: C.t3 }}>{tx.d}</div></div>
    <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 700, color: tx.t === "in" ? C.green : C.t1 }}>{tx.t === "in" ? "+" : "-"}{fm(tx.a)} F</div><div style={{ fontSize: 11, color: C.t3 }}>{tx.dt}</div></div>
  </div>
);

export const Toggle = ({ v, set }) => (
  <button onClick={() => set(!v)} style={{ width: 48, height: 28, borderRadius: 14, border: "none", cursor: "pointer", background: v ? C.blue : C.brd, padding: 2 }}>
    <div style={{ width: 24, height: 24, borderRadius: 12, background: "#fff", transform: v ? "translateX(20px)" : "translateX(0)", transition: "transform 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
  </button>
);

export const MenuRow = ({ icon, label, onClick, right, color }) => (
  <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", width: "100%", background: C.card, borderRadius: 12, marginBottom: 6, cursor: "pointer", border: `1px solid ${C.brdL}`, textAlign: "left" }} onMouseEnter={e => e.currentTarget.style.background = C.bg} onMouseLeave={e => e.currentTarget.style.background = C.card}>
    <span style={{ color: color || C.blue }}>{icon}</span>
    <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: C.t1 }}>{label}</span>
    {right || <span style={{ color: C.t4 }}>{Z.fwd}</span>}
  </button>
);

export const Scroll = ({ children, pad = 40 }) => (
  <div style={{ height: "100%", background: C.bg, overflowY: "auto", padding: "12px 18px", paddingBottom: pad }}>{children}</div>
);

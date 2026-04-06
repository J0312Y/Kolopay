import { useState, useEffect } from "react";
import { C } from "../theme";
import { Z } from "../icons";
import { Btn, Inp, Scroll } from "../components";

export function Splash({ go }) {
  useEffect(() => { setTimeout(() => go("onb"), 2200) }, []);
  return <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(160deg,${C.navy},${C.navyM})` }}>
    <div style={{ width: 80, height: 80, borderRadius: 24, background: `linear-gradient(135deg,${C.blue},${C.blueD})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 60px rgba(26,86,219,0.4)" }}><span style={{ fontSize: 30, fontWeight: 900, color: "#fff" }}>LK</span></div>
    <div style={{ marginTop: 18, fontSize: 28, fontWeight: 800, color: "#fff" }}>Likelemba</div>
    <div style={{ fontSize: 11, color: C.gold, marginTop: 6, fontWeight: 600, letterSpacing: 3 }}>TONTINE DIGITALE</div>
    <div style={{ position: "absolute", bottom: 40, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 1.5 }}>LAMUKA TECH</div>
  </div>;
}

export function Onb({ go }) {
  const [p, setP] = useState(0);
  const pg = [
    { img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=900&fit=crop&crop=faces", t: "Épargnez ensemble", d: "Rejoignez des cercles de confiance, cotisez ensemble et recevez votre cagnotte quand c'est votre tour.", ov: "linear-gradient(0deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.4) 40%,transparent 70%)" },
    { img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=900&fit=crop", t: "100% sécurisé", d: "Chaque transaction est tracée et protégée par Kolo Pay. Votre argent est en sécurité.", ov: `linear-gradient(0deg,rgba(11,29,58,0.95) 0%,rgba(11,29,58,0.5) 40%,transparent 65%)` },
    { img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=900&fit=crop", t: "Kolo Pay", d: "Votre portefeuille intégré. Recevez vos gains, cotisez et payez avec votre Kolo Card.", ov: `linear-gradient(0deg,rgba(99,102,241,0.95) 0%,rgba(99,102,241,0.4) 40%,transparent 65%)` }
  ];
  return <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${pg[p].img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
    <div style={{ position: "absolute", inset: 0, background: pg[p].ov }} />
    {p < 2 && <button onClick={() => go("login")} style={{ position: "absolute", top: 16, right: 20, zIndex: 10, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "8px 18px", borderRadius: 50 }}>Passer</button>}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5, padding: "0 28px 70px" }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{pg[p].t}</h2>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 28 }}>{pg[p].d}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>{pg.map((_, i) => <div key={i} style={{ width: p === i ? 24 : 8, height: 8, borderRadius: 4, background: p === i ? "#fff" : "rgba(255,255,255,0.3)" }} />)}</div>
      <Btn full onClick={() => p < 2 ? setP(p + 1) : go("login")} sx={{ background: "#fff", color: C.t0, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>{p < 2 ? "Suivant" : "Commencer"}</Btn>
    </div>
  </div>;
}

export function Login({ go }) {
  return <Scroll>
    <div style={{ textAlign: "center", marginBottom: 36, marginTop: 20 }}>
      <div style={{ width: 60, height: 60, borderRadius: 18, background: `linear-gradient(135deg,${C.blue},${C.blueD})`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: "0 12px 32px rgba(26,86,219,0.3)" }}><span style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>LK</span></div>
      <h2 style={{ color: C.t0, fontSize: 24, fontWeight: 800, margin: 0 }}>Bon retour !</h2>
      <p style={{ color: C.t3, fontSize: 13, marginTop: 6 }}>Connectez-vous à votre compte</p>
    </div>
    <Inp label="Numéro de téléphone" ph="+242 06 XXX XXXX" icon={Z.phone} />
    <Inp label="Mot de passe" ph="Entrez votre mot de passe" type="password" icon={Z.lock} />
    <div style={{ textAlign: "right", marginBottom: 24 }}><button onClick={() => go("forgot")} style={{ background: "none", border: "none", color: C.blue, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Mot de passe oublié ?</button></div>
    <Btn full onClick={() => go("pin")}>Se connecter</Btn>
    <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: C.t2 }}>Pas de compte ? <button onClick={() => go("reg1")} style={{ background: "none", border: "none", color: C.gold, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>S'inscrire</button></div>
  </Scroll>;
}

export function Reg1({ go }) {
  const [ok, setOk] = useState(false);
  return <Scroll>
    <div style={{ fontSize: 12, color: C.blue, fontWeight: 600 }}>Étape 1/3</div>
    <h2 style={{ fontSize: 22, fontWeight: 800, color: C.t0, margin: "4px 0" }}>Créer un compte</h2>
    <p style={{ color: C.t3, fontSize: 13, marginBottom: 24 }}>Entrez votre numéro</p>
    <Inp label="Numéro" ph="+242 06 XXX XXXX" icon={Z.phone} />
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 28 }}>
      <button onClick={() => setOk(!ok)} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${ok ? C.blue : C.brd}`, background: ok ? C.blue : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{ok && Z.okW}</button>
      <span style={{ fontSize: 13, color: C.t2 }}>J'accepte les <span style={{ color: C.blue, fontWeight: 600 }}>Conditions</span></span>
    </div>
    <Btn full onClick={() => go("reg2")} dis={!ok}>Continuer</Btn>
  </Scroll>;
}

export function Reg2({ go }) {
  return <Scroll>
    <div style={{ fontSize: 12, color: C.blue, fontWeight: 600 }}>Étape 2/3</div>
    <h2 style={{ fontSize: 22, fontWeight: 800, color: C.t0, margin: "4px 0" }}>Vérification</h2>
    <p style={{ color: C.t3, fontSize: 13, marginBottom: 32 }}>Code à 6 chiffres envoyé par SMS</p>
    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28 }}>{[...Array(6)].map((_, i) => <div key={i} style={{ width: 46, height: 54, borderRadius: 12, border: `2px solid ${C.brd}`, background: C.card, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }} />)}</div>
    <Btn full onClick={() => go("reg3")}>Vérifier</Btn>
  </Scroll>;
}

export function Reg3({ go }) {
  return <Scroll>
    <div style={{ fontSize: 12, color: C.blue, fontWeight: 600 }}>Étape 3/3</div>
    <h2 style={{ fontSize: 22, fontWeight: 800, color: C.t0, margin: "4px 0" }}>Votre profil</h2>
    <Inp label="Nom complet" ph="Ex: Joeldy Tsina" icon={Z.usr} />
    <Inp label="Email (optionnel)" ph="votre@email.com" />
    <Inp label="Mot de passe" ph="Minimum 8 caractères" type="password" icon={Z.lock} />
    <Inp label="Confirmer" ph="Retapez" type="password" icon={Z.lock} />
    <Btn full onClick={() => go("pin")}>Créer mon compte</Btn>
  </Scroll>;
}

export function Forgot({ go }) {
  return <Scroll>
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <div style={{ width: 60, height: 60, borderRadius: 20, background: C.blueL, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{Z.lock}</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: C.t0 }}>Mot de passe oublié ?</h2>
    </div>
    <Inp label="Numéro" ph="+242 06 XXX XXXX" icon={Z.phone} />
    <Btn full onClick={() => go("back")}>Envoyer le code</Btn>
  </Scroll>;
}

export function Pin({ go }) {
  const [pin, setPin] = useState("");
  return <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: C.bg, padding: "20px 24px" }}>
    <div style={{ width: 60, height: 60, borderRadius: 18, background: `linear-gradient(135deg,${C.blue},${C.blueD})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}><span style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>LK</span></div>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: C.t0, marginBottom: 8 }}>Entrez votre PIN</h2>
    <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>{[0, 1, 2, 3].map(i => <div key={i} style={{ width: 16, height: 16, borderRadius: 8, background: pin.length > i ? C.blue : C.brd }} />)}</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, width: 220 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((n, i) => <button key={i} onClick={() => { if (n === "⌫") setPin(p => p.slice(0, -1)); else if (n !== "" && pin.length < 4) { const np = pin + n; setPin(np); if (np.length === 4) setTimeout(() => go("home"), 300); } }} style={{ width: 66, height: 50, borderRadius: 14, border: "none", background: n === "" ? "transparent" : C.card, fontSize: n === "⌫" ? 18 : 20, fontWeight: 600, color: C.t0, cursor: n === "" ? "default" : "pointer", boxShadow: n === "" ? "none" : C.sh, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</button>)}
    </div>
  </div>;
}

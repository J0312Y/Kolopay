import { useState } from "react";
import { C, fm } from "../theme";
import { Z } from "../icons";
import { Btn, Av, Hdr, Bdg, Inp, Scroll, Toggle } from "../components";

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

export { Gamification, Family, TontineExpress, SplitBills, Education, DarkMode, Referral, Insurance };

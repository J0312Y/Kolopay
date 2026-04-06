import { useState } from "react";
import { C, fm } from "../theme";
import { Z, SvgIc } from "../icons";
import { Btn, Av, Hdr, Bdg, TxR, Scroll, MenuRow } from "../components";
import { CIR, TXS, WALLETS } from "../data";

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

export { Home, HomeTab, CirclesTab, HistTab, ProfTab };

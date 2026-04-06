import { C, fm } from "../theme";
import { Z } from "../icons";
import { Hdr, Scroll } from "../components";
import { TXS } from "../data";

function TxDetail({go,id}){const tx=TXS.find(x=>x.id===id)||TXS[0];return <Scroll><Hdr title="Détail transaction" onBack={()=>go("back")}/><div style={{background:C.card,borderRadius:24,padding:24,textAlign:"center",border:`1px solid ${C.brd}`,marginBottom:16}}><div style={{width:56,height:56,borderRadius:18,background:tx.t==="in"?C.greenL:C.redL,display:"inline-flex",alignItems:"center",justifyContent:"center",color:tx.t==="in"?C.green:C.red,marginBottom:12}}>{tx.t==="in"?Z.dn:Z.up}</div><div style={{fontSize:28,fontWeight:800,color:tx.t==="in"?C.green:C.t0}}>{tx.t==="in"?"+":"-"}{fm(tx.a)} FCFA</div></div>{[{l:"De/Vers",v:tx.n},{l:"Date",v:tx.dt+" · "+tx.tm},{l:"Cercle",v:tx.circle||"—"},{l:"Référence",v:tx.ref}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"13px 16px",background:C.card,borderRadius:12,marginBottom:6,border:`1px solid ${C.brdL}`}}><span style={{fontSize:13,color:C.t3}}>{r.l}</span><span style={{fontSize:13,fontWeight:600,color:C.t1}}>{r.v}</span></div>)}</Scroll>;}


export { TxDetail };

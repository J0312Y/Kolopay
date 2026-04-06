import { useState, useEffect } from "react";
import { C } from "../theme";
import { Z } from "../icons";
import { Btn } from "../components";

function Ok({go}){const[s,setS]=useState(false);useEffect(()=>{setTimeout(()=>setS(true),100)},[]);
return <div style={{height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:C.bg,padding:"40px 28px"}}>
<div style={{opacity:s?1:0,transform:s?"scale(1)":"scale(0.5)",transition:"all 0.5s cubic-bezier(0.34,1.56,0.64,1)",marginBottom:24}}>{Z.okBig}</div>
<h2 style={{fontSize:22,fontWeight:800,color:C.t0,opacity:s?1:0,transition:"opacity 0.4s ease 0.2s"}}>Succès !</h2>
<p style={{fontSize:14,color:C.t3,textAlign:"center",opacity:s?1:0,transition:"opacity 0.4s ease 0.3s"}}>Opération effectuée avec succès.</p>
<div style={{width:"100%",marginTop:32,opacity:s?1:0,transition:"opacity 0.4s ease 0.4s"}}><Btn full onClick={()=>go("home")}>Retour à l'accueil</Btn></div></div>;}


export { Ok };

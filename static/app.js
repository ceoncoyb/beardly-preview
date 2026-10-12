(()=>{"use strict";
const $=s=>document.querySelector(s);
const editions=$("#editionsGrid"),radar=$("#radarList"),gate=$("#ageGate"),modal=$("#contactModal");
const allowedStatuses={concepto:"EN CONCEPTO",tentativa:"FECHA TENTATIVA",confirmada:"CONFIRMADA",cerrada:"CERRADA"};
const fallback=[
{title:"BEARDLY GANG",theme:"SELECCIÓN / CÍRCULO",date_text:"21 NOV · PROPUESTA",details:"Convocatoria por etapas. Condiciones y reservas por DM.",status:"tentativa"},
{title:"CÁMARA OBSCURA",theme:"EDICIÓN AUDIOVISUAL",date_text:"POR DEFINIR",details:"Presencia, luz, grano y retrato editorial.",status:"concepto"},
{title:"FERAL STUDIO",theme:"LABORATORIO GENERATIVO",date_text:"POR DEFINIR",details:"Experimentación visual con personajes adultos ficticios.",status:"concepto"},
{title:"AFTERIMAGE",theme:"ENCUENTRO / ESCUCHA",date_text:"POR DEFINIR",details:"Paisajes sonoros, proyecciones y comunidad.",status:"concepto"}];
const text=(tag,cl,val)=>{const n=document.createElement(tag);if(cl)n.className=cl;n.textContent=val;return n};
const api=async(url)=>{const path="./api/"+url.split("/").pop()+".json";const r=await fetch(path,{headers:{Accept:"application/json"}});if(!r.ok)throw Error("API "+r.status);return r.json()};
function drawEditions(items){
 editions.replaceChildren();
 for(const e of items){
  const card=text("article","edition-card","");
  const top=text("div","edition-top","");top.append(text("span","edition-status",allowedStatuses[e.status]||"EN EVALUACIÓN"),text("span","edition-date",e.date_text||"POR DEFINIR"));
  const bottom=document.createElement("div");bottom.append(text("div","edition-theme",e.theme),text("h3","",e.title),text("p","",e.details));
  card.append(top,bottom);editions.append(card);
 }
}
function drawRadar(items){
 radar.replaceChildren();
 if(!items.length){radar.append(text("div","radar-empty","La señal está en curaduría. Los próximos eventos aparecerán cuando sus fuentes y fechas estén verificadas."));return}
 items.forEach((e,i)=>{
  const row=text("article","radar-item","");row.append(text("span","",String(i+1).padStart(2,"0")),text("h3","",e.title),text("p","",e.location+" · "+(e.event_date||"Fecha por verificar")+" · "+e.organizer));
  const a=text("a","", "VER FUENTE ↗");a.href=e.source_url;a.target="_blank";a.rel="noopener noreferrer";row.append(a);radar.append(row);
 });
}
async function load(){
 try{const d=await api("/api/editions");drawEditions(d.editions&&d.editions.length?d.editions:fallback)}
 catch{drawEditions(fallback)}
 try{const d=await api("/api/radar");drawRadar(d.radar||[])}
 catch{drawRadar([])}
}
const inquiries={general:"Hola, quisiera conocer el universo BEARdly y sus próximas actividades.",
ediciones:"Hola, quiero información y condiciones de las próximas ediciones BEARdly.",
estudio:"Hola, me interesa el estudio generativo BEARdly y sus encargos editoriales no explícitos.",
circulo:"Hola, quiero información de la comunidad privada BEARdly en Discord."};
let context="general";
document.querySelectorAll("[data-contact]").forEach(btn=>btn.addEventListener("click",()=>{context=btn.dataset.contact||"general";modal.hidden=false;document.body.style.overflow="hidden";$("#copyStatus").textContent=""}));
$("#closeContact").addEventListener("click",close);
modal.addEventListener("click",e=>{if(e.target===modal)close()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&& !modal.hidden)close()});
function close(){modal.hidden=true;document.body.style.overflow=""}
$("#copyMessage").addEventListener("click",async()=>{const q=inquiries[context]||inquiries.general;try{await navigator.clipboard.writeText(q);$("#copyStatus").textContent="MENSAJE COPIADO"}catch{$("#copyStatus").textContent="COPIA: "+q}});
if(localStorage.getItem("beardly_age_accepted")!=="yes")gate.hidden=false;else gate.hidden=true;
$("#ageYes").addEventListener("click",()=>{localStorage.setItem("beardly_age_accepted","yes");gate.hidden=true});
$("#ageNo").addEventListener("click",()=>{location.href="https://www.google.com/"});
$("#menuButton").addEventListener("click",()=>{$(".site-header nav").classList.toggle("open")});
document.querySelectorAll(".site-header nav a").forEach(x=>x.addEventListener("click",()=>$(".site-header nav").classList.remove("open")));
load();
})();
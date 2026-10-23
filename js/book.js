const C=window.SITE||{},U="https://oysgeziskrsexnxhjfnl.supabase.co",K="sb_publishable_uotSONk6njNtgqY-73RUow_ING4iQ6K",
SL=["09:00","11:00","13:00","15:00"],$=s=>document.querySelector(s),P={day:"",slot:""};let T=[];
const el=(t,c,x)=>{const n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n},
iso=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10),
lab=s=>s+" – "+(+s.slice(0,2)+2)+":00",wa=C.whatsapp?"https://wa.me/"+String(C.whatsapp).replace(/\D/g,""):"";
async function rpc(fn,b){const r=await fetch(U+"/rest/v1/rpc/"+fn,{method:"POST",headers:{"Content-Type":"application/json",apikey:K},body:JSON.stringify(b)});const j=await r.json().catch(()=>null);if(!r.ok)throw new Error((j&&j.message)||r.status);return j}
const svs=[].concat(...(C.catalogue||[]).map(g=>g.items.map(i=>i.name+" ("+i.price+")")),["Not sure yet"]);
svs.forEach(s=>{const o=el("option",0,s);o.value=s;$("#sv").append(o)});
const sun=d=>new Date(d+"T00:00:00").getDay()==0,off=(d,s)=>sun(d)&&!(C.sundaySlots||["15:00"]).includes(s),taken=(d,s)=>off(d,s)||T.some(x=>x.day==d&&(x.slot==s||x.slot=="*")),full=d=>SL.every(s=>taken(d,s));
function days(){const b=$("#days");b.textContent="";const n=new Date();for(let i=0;i<28;i++){const d=new Date(n.getFullYear(),n.getMonth(),n.getDate()+i);if((C.closedDays||[]).includes(d.getDay()))continue;const k=iso(d),x=el("button","day");x.type="button";x.disabled=full(k);x.setAttribute("aria-pressed",P.day==k);if(P.day==k)x.classList.add("on");
 x.append(d.toLocaleDateString("en-ZA",{weekday:"short"}),document.createElement("br"),d.getDate()+" "+d.toLocaleDateString("en-ZA",{month:"short"}));x.onclick=()=>{P.day=k;P.slot="";days();slots();sum()};b.append(x)}}
function slots(){const b=$("#slots");b.textContent="";if(!P.day){b.append(el("span","mu","Choose a day first."));return}SL.forEach(s=>{const x=el("button","slot",off(P.day,s)?lab(s)+" · Closed":taken(P.day,s)?lab(s)+" · Booked":lab(s));x.type="button";x.disabled=taken(P.day,s);if(P.slot==s)x.classList.add("on");x.onclick=()=>{P.slot=s;slots();sum()};b.append(x)})}
function sum(){$("#sum").textContent=P.day&&P.slot?"Your slot: "+new Date(P.day+"T00:00:00").toLocaleDateString("en-ZA",{weekday:"long",day:"numeric",month:"long"})+", "+lab(P.slot):""}
async function load(){try{const a=new Date(),b=new Date(a.getFullYear(),a.getMonth(),a.getDate()+90);T=await rpc("taken_slots",{p_from:iso(a),p_to:iso(b)})}catch(x){$("#slots").textContent="Could not load availability. Please refresh."}days();slots()}
$("#go").onclick=async()=>{const n=$("#nm").value.trim(),p=$("#ph").value.trim();if(!P.day||!P.slot){alert("Please choose a day and a time.");return}if(n.length<2||p.replace(/\D/g,"").length<9){alert("Please enter your name and a valid phone number.");return}
 const g=$("#go");g.disabled=true;try{const r=await rpc("create_booking",{p_name:n,p_phone:p,p_email:$("#em").value.trim(),p_service:$("#sv").value,p_notes:$("#nt").value.trim(),p_day:P.day,p_slot:P.slot});done(r.ref,n)}
 catch(x){g.disabled=false;alert(/taken/.test(x.message)?"Sorry, that slot was just taken. Please pick another time.":/pending/.test(x.message)?"You already have 3 pending requests. Please contact us on WhatsApp.":"Could not save your booking. Please try again.");load()}};
const R=n=>"R"+Number(n).toLocaleString("en-ZA");
(()=>{const s=document.createElement("style");s.textContent="@media print{body *{visibility:hidden}#inv,#inv *{visibility:visible}#inv{position:absolute;left:0;top:0;width:100%;border:0}}";document.head.append(s)})();
function inv(ref){const svc=$("#sv").value,m=svc.match(/R\s?([\d,]+)/),fee=m?+m[1].replace(/,/g,""):0,pct=C.depositPercent||50,dep=fee*pct/100,box=el("div","card");box.id="inv";
 const row=(a,c,cl)=>{const r=el("div","row");r.style.justifyContent="space-between";r.append(el("span",cl,a),el("span",cl,c));return r};
 const lg=el("img");lg.src="assets/logo.jpg";lg.alt="Victory Studio Media House";lg.style.cssText="width:100%;max-width:420px;border-radius:10px;display:block;margin-bottom:8px";const L=[lg,el("h2",0,"Deposit invoice"),el("p","mu","Invoice no: INV-"+ref+" · Date: "+new Date().toLocaleDateString("en-ZA")),el("h3",0,"Victory Studio Media House"),el("p","mu",[C.email,C.whatsapp?"WhatsApp "+C.whatsapp:""].filter(Boolean).join(" · ")),
  el("h3",0,"Billed to"),el("p",0,[$("#nm").value.trim(),$("#ph").value.trim(),$("#em").value.trim()].filter(Boolean).join(" · ")),
  row("Service",svc.replace(/\s*\(.*\)$/,"")),row("Shoot date",P.day+", "+lab(P.slot))];
 if(fee)L.push(row("Fee (starting price)",R(fee)),row("Deposit due ("+pct+"%)",R(dep),"ok"),row("Balance after deposit",R(fee-dep)));else L.push(row("Fee","To be confirmed"),row("Deposit due",pct+"% of the confirmed fee","ok"));
 L.push(C.bankDetails?el("p",0,"Pay by EFT: "+C.bankDetails+". Payment reference: "+ref):el("p","mu","Payment details will be sent to you on WhatsApp."),
  el("p","mu","Your slot is held until the deposit is received. Starting prices may change once we confirm the details of your shoot, and the deposit is "+pct+"% of the final fee."));
 const b=el("button","sm noprint","Print or save as PDF");b.type="button";b.onclick=()=>window.print();L.push(b);box.append(...L);return box}
function done(ref,n){const d=$("#done");d.hidden=false;d.textContent="";const msg="Hi Victory Studio, my booking reference is "+ref+" ("+$("#sv").value+", "+P.day+" at "+P.slot+"). ";
 d.append(el("h2","ok","Booking requested, "+n.split(" ")[0]+"!"),el("p",0,"Reference: "+ref+" · "+P.day+" · "+lab(P.slot)),el("p","mu","Your slot is held until your deposit is received. We confirm your booking on WhatsApp once it is paid."));
 if(C.deposit)d.append(el("p",0,"Deposit: "+C.deposit));
 if(C.paymentLink){const a=el("a","btn","Pay deposit online");a.href=C.paymentLink;a.target="_blank";a.rel="noopener";d.append(a)}
 if(C.bankDetails)d.append(el("p","mu","Or pay by EFT: "+C.bankDetails+" · Use reference "+ref));
 if(!C.paymentLink&&!C.bankDetails)d.append(el("p","mu","We will send you the payment details on WhatsApp shortly."));
 if(wa){const a=el("a","btn","Send proof of payment on WhatsApp");a.style.marginLeft="8px";a.href=wa+"?text="+encodeURIComponent(msg);a.target="_blank";a.rel="noopener";d.append(a)}
 d.after(inv(ref));$("#go").hidden=true;d.scrollIntoView({behavior:"smooth"})}
$("#sv").onchange=sum;load();

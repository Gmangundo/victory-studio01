const C=window.SITE||{},$=s=>document.querySelector(s);
function el(t,c,x){const n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n}
const wa=C.whatsapp?"https://wa.me/"+String(C.whatsapp).replace(/\D/g,""):"";
const pk=$("#pk");C.packages.forEach(p=>{const d=el("div","card");d.append(el("h3",0,p.name),el("div","price",p.price));const u=el("ul");p.items.forEach(i=>u.append(el("li",0,i)));d.append(u);pk.append(d)});
const ts=$("#tests");C.testimonials.forEach(t=>{const d=el("div","card");d.append(el("p",0,"“"+t.quote+"”"),el("div","mu","— "+t.who));ts.append(d)});
const g=$("#gallery");if(C.gallery.length)C.gallery.forEach(f=>{const i=el("img");i.src="assets/gallery/"+f;i.alt="Victory Studio work";i.loading="lazy";g.append(i)});else{for(let i=0;i<6;i++)g.append(el("div","ph","Add your photos in assets/gallery"))}
const soc=$("#social");[["Instagram",C.instagram],["TikTok",C.tiktok],["Facebook",C.facebook],["Email",C.email?"mailto:"+C.email:""],["WhatsApp",wa]].forEach(([n,h])=>{if(h){const a=el("a",0,n);a.href=h;a.target="_blank";a.rel="noopener";soc.append(a)}});
if(wa){const f=el("a","fab","WhatsApp us");f.href=wa;f.target="_blank";f.rel="noopener";document.body.append(f)}
$("#send").onclick=()=>{const n=$("#en").value.trim(),s=$("#es").value,m=$("#em").value.trim();if(!n||!m){alert("Please add your name and a message.");return}
 const t="Hi Victory Studio, I'm "+n+". I'm interested in: "+s+". "+m;
 if(wa)window.open(wa+"?text="+encodeURIComponent(t),"_blank");else if(C.email)location.href="mailto:"+C.email+"?subject="+encodeURIComponent("Enquiry: "+s)+"&body="+encodeURIComponent(t);else alert("Add your WhatsApp number or email in js/config.js so enquiries reach you.")};

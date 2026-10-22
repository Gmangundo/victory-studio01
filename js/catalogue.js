const C=window.SITE||{},root=document.getElementById("cat");
function el(t,c,x){const n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n}
const wa=C.whatsapp?"https://wa.me/"+String(C.whatsapp).replace(/\D/g,""):"";
(C.catalogue||[]).forEach(g=>{const s=el("section","sec");s.append(el("h2",0,g.group));const grid=el("div","grid");
 g.items.forEach(i=>{const c=el("div","card");c.append(el("h3",0,i.name),el("div","price",i.price),el("p","mu",i.note));
  if(wa||C.email){const b=el("a","btn sm2 noprint","Ask about this");const m="Hi Victory Studio, I would like a quote for: "+i.name;
   b.href=wa?wa+"?text="+encodeURIComponent(m):"mailto:"+C.email+"?subject="+encodeURIComponent(m);b.target="_blank";b.rel="noopener";c.append(b)}
  grid.append(c)});s.append(grid);root.append(s)});
document.getElementById("note").textContent=C.priceNote||"";

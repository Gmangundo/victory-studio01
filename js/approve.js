const U="https://oysgeziskrsexnxhjfnl.supabase.co",K="sb_publishable_uotSONk6njNtgqY-73RUow_ING4iQ6K",
id=new URLSearchParams(location.search).get("id"),box=document.getElementById("box");
function el(t,c,x){const n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n}
async function rpc(fn,b){const r=await fetch(U+"/rest/v1/rpc/"+fn,{method:"POST",headers:{"Content-Type":"application/json",apikey:K},body:JSON.stringify(b)});if(!r.ok)throw new Error(r.status);return r.json()}
const LAB={awaiting:"Waiting for your decision",approved:"You approved this post",changes:"You asked for changes"};
function show(a,msg){box.textContent="";box.append(el("div","k",a.platform+" · "+(a.post_date||"")),el("h2",0,a.title),el("p",0,a.caption||"No caption added."),el("p","tag",msg||LAB[a.status]||""));
 if(a.comment)box.append(el("p","mu","Your note: "+a.comment));
 const ta=el("textarea");ta.placeholder="If you want changes, tell us what to adjust";ta.setAttribute("aria-label","Your comments");ta.value=a.status=="changes"?(a.comment||""):"";
 const r=el("div","row"),ok=el("button","pri","Approve"),ch=el("button",0,"Request changes");
 ok.onclick=()=>go("approved",ta.value);ch.onclick=()=>{if(!ta.value.trim()){alert("Please tell us what to change.");return}go("changes",ta.value)};
 r.append(ok,ch);box.append(ta,r)}
async function go(s,c){try{show(await rpc("decide_approval",{p_id:id,p_status:s,p_comment:c}),"Thank you! Your answer has been sent to Victory Studio.")}catch(x){alert("Could not save your answer. Please try again.")}}
(async()=>{if(!id){box.textContent="This link is not valid.";return}
 try{const a=await rpc("get_approval",{p_id:id});if(!a)throw 0;show(a)}catch(x){box.textContent="This link is not valid or has expired. Please ask Victory Studio for a new one."}})();

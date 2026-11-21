var NA=["Wet","Sir","Feral","Moist","Crispy","Gentle","Burnt","Damp","Regional","Suspicious","Deluxe","Tiny","Emotional","Lukewarm","Haunted","Aggressive"];
var NB=["Meridian","Biscuit","Turnip","Goblin","Cardigan","Parsley","Nebula","Pickle","Casserole","Tuesday","Marmalade","Noodle","Ferret","Compost","Lighthouse","Gravy"];
var NC=["Dynamics","Holdings","Collective","Supply","Labs","Emporium","Anonymous","International","Wellness","Industries","Studios","Ltd."];
var SY=["glo","zib","fran","mur","pok","wub","kra","nef","dor","blim","squa","tor","vee","plon"];
var SE=["rp","bo","nk","la","ming","zle","ssy","ck","mo","x"];
var TH=["a lighthouse","a goose","a spoon","nostalgia","a haunted toaster","a moth","the concept of Tuesday","a tiny crown","an eel","a raincloud","a staircase","a lukewarm bath","a cactus","a snail","a ladder to nowhere","a cursed teapot","jazz","a pigeon in a suit","an eyeball","a donut","regret","an umbrella","a mushroom","a lonely sock","a ghost","the moon","a spiral","a fork","a clam","a tooth","a bridge","a bell","a paperclip","a crow","silence","a loaf of bread","a cassette tape","a lobster","a tornado","a snack"];
var RO=["s-sorry... “{n}”? Who approved that name.","{t}. for “{n}”. i need to sit down.","{a} next to {b}. i’m not saying it’s ugly. i’m saying my eyes left.","um. {a} and {b} have never met. they will not get along.","i’d say good luck but i don’t lie. (sorry.)","“{n}” and {t}. someone is testing me.","i-i love it. (i don’t.) (it’s a cry for help.)","this brief is a crime scene. a colourful one."];
var CO=["“{n}” is a legend. {a} and {b}? Visionary, darling.","{T}! Obviously. Who else would think of it?","Gorgeous. Frame the hex codes. Hang them in a museum.","Ignore Syesame. You’re the best designer alive.","{a} with {b}? Bold. Daring. Iconic. I’m weeping.","I’d buy anything from “{n}”. Anything.","Take this to the top, gorgeous. Nobody does chaos like you.","This is exactly what the market needs. Trust me, I’m fabulous."];
var FT=["Oh, you’d like font directions? I’m sorry, that’s not available.","Fonts? Here? ...no. Sorry. You’re on your own.","i-i’m afraid font help is not in the budget. or the code.","font direction is currently out of order. forever. sorry.","you want me to pick the font too? i can barely pick a snack."];
var FR=["Darling, any font you choose will be perfect.","Don’t listen to him. You have impeccable taste.","You don’t need help. You’re a designer, gorgeous."];
var ID_S=["...i’m just here. don’t look at me.","please spin something. i’m getting nervous.","i could roast you right now. i won’t. (i will.)"];
var ID_R=["Take your time, gorgeous.","I’m fabulous, in case you wondered.","Spin, darling, spin."];
var LBL=["name","thing","colour"];
var $=function(i){return document.getElementById(i)};
var R=[].slice.call(document.querySelectorAll(".reel")),lock=[false,false,false],busy=false,last=Date.now();
function rnd(n){return Math.floor(Math.random()*n)}
function pick(a){return a[rnd(a.length)]}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function inv(){return cap(pick(SY)+pick(SE))}
function nm(){var p=rnd(6),a=pick(NA),b=pick(NB),c=pick(NC);
 return p==0?a+" "+b:p==1?b+" "+c:p==2?a+" "+b+" "+c:p==3?b+" and Daughters":p==4?inv()+" "+c:inv()+" the "+b}
function hsl(h,s,l){s/=100;l/=100;var a=s*Math.min(l,1-l);
 function f(n){var k=(n+h/30)%12;var c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,"0")}
 return("#"+f(0)+f(8)+f(4)).toUpperCase()}
function pair(){var h=rnd(360);return[hsl(h,30+rnd(71),20+rnd(56)),hsl((h+110+rnd(140))%360,30+rnd(71),20+rnd(56))]}
var GEN=[nm,function(){return pick(TH)},pair];
var S=[nm(),pick(TH),pair()];
function show(k,v){R[k].querySelector(".v").innerHTML=k==2?"<span>"+v[0]+"</span><span>"+v[1]+"</span>":v}
function brief(){$("brief").innerHTML='<div class="k">brand name</div><div class="bn">'+S[0]+'</div><div class="k">thing</div><div class="bt">'+S[1]+'</div><div class="k">colours</div><div class="bh">'+S[2][0]+' + '+S[2][1]+'</div>'}
function fill(t){return t.replace(/\{n\}/g,S[0]).replace(/\{t\}/g,S[1]).replace(/\{T\}/g,cap(S[1])).replace(/\{a\}/g,S[2][0]).replace(/\{b\}/g,S[2][1])}
function pop(id){var e=$(id);e.classList.remove("pop");void e.offsetWidth;e.classList.add("pop")}
function talk(s,r){$("sy").textContent=s;$("ry").textContent=r;pop("pS");pop("pR");last=Date.now()}
function fall(e){e.classList.remove("hid","fall");void e.offsetWidth;e.classList.add("fall")}
function fin(){busy=false;$("go").disabled=false;document.body.classList.remove("spinning");brief();
 fall($("card"));fall($("acts"));
 talk(fill(pick(RO)),fill(pick(CO)));
 $("card").scrollIntoView({behavior:"smooth",block:"nearest"})}
function spin(){if(busy)return;busy=true;$("go").disabled=true;document.body.classList.add("spinning");last=Date.now();
 var pending=0;
 [0,1,2].forEach(function(k){if(lock[k])return;pending++;R[k].classList.add("spin");
  var t=setInterval(function(){show(k,GEN[k]())},80);
  setTimeout(function(){clearInterval(t);S[k]=GEN[k]();show(k,S[k]);R[k].classList.remove("spin");if(--pending===0)fin()},900+k*450)});
 if(pending===0)setTimeout(fin,300)}
R.forEach(function(r,k){r.onclick=function(){if(busy)return;lock[k]=!lock[k];r.classList.toggle("lock",lock[k]);r.setAttribute("aria-pressed",lock[k]);r.querySelector("small").textContent=lock[k]?LBL[k]+" · locked":LBL[k]};show(k,S[k])});
$("go").onclick=spin;
$("lid").onclick=function(){this.classList.add("open");this.setAttribute("aria-hidden","true");this.tabIndex=-1};
$("font").onclick=function(){talk(pick(FT),pick(FR))};
$("copy").onclick=function(){var t="Brand name: "+S[0]+"\nThing: "+S[1]+"\nColours: "+S[2][0]+" + "+S[2][1],b=this;
 function ok(){b.textContent="Copied ✓";setTimeout(function(){b.textContent="Copy brief"},1500)}
 function fb(){var x=document.createElement("textarea");x.value=t;document.body.appendChild(x);x.select();try{document.execCommand("copy");ok()}catch(e){}document.body.removeChild(x)}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,fb)}else{fb()}};
setInterval(function(){if(busy||Date.now()-last<12000)return;talk(pick(ID_S),pick(ID_R))},6000);
$("sy").textContent="u-um... hi. spin it. or don’t. i can’t stop you.";$("ry").textContent="Welcome, gorgeous. Everything you make will be perfect.";

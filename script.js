var NA=["Wet","Sir","Feral","Moist","Crispy","Gentle","Burnt","Damp","Regional","Suspicious","Deluxe","Tiny","Emotional","Lukewarm","Haunted","Aggressive"];
var NB=["Meridian","Biscuit","Turnip","Goblin","Cardigan","Parsley","Nebula","Pickle","Casserole","Tuesday","Marmalade","Noodle","Ferret","Compost","Lighthouse","Gravy"];
var NC=["Dynamics","Holdings","Collective","Supply","Labs","Emporium","Anonymous","International","Wellness","Industries","Studios","Ltd."];
var SY=["glo","zib","fran","mur","pok","wub","kra","nef","dor","blim","squa","tor","vee","plon"];
var SE=["rp","bo","nk","la","ming","zle","ssy","ck","mo","x"];
var TH=["a lighthouse","a goose","a spoon","nostalgia","a haunted toaster","a moth","the concept of Tuesday","a tiny crown","an eel","a raincloud","a staircase","a lukewarm bath","a cactus","a snail","a ladder to nowhere","a cursed teapot","jazz","a pigeon in a suit","an eyeball","a donut","regret","an umbrella","a mushroom","a lonely sock","a ghost","the moon","a spiral","a fork","a clam","a tooth","a bridge","a bell","a paperclip","a crow","silence","a loaf of bread","a cassette tape","a lobster","a tornado","a snack"];
/* Syesame says WTF in a different language each time */
var WTF=["WTF?!","¡¿Qué demonios?!","Mais c’est quoi ce bazar ?!","Was zum Teufel?!","Che diavolo?!","Mas o quê?!","Wat de hel?!","何これ！？","뭐야 이게?!","Ano ba ’to?!","Bu da ne böyle?!","Vad i hela friden?!"];
/* Dialogue pools by roulette event: [Syesame, Ryce] */
var P={
first:[["Well. There it is..","Oh, how thrilling! Your very first one!"]],
again:[["Again? Didn’t like your first little surprise?","Perhaps the next one will be even more fabulous! Like a second helping of cake."],["Back already. The last one barely cooled.","A second pull! I do love a sequel, darling."]],
bad:[["HA!!","Don’t be disheartened."],["Lol. Even the dice looked away.","Try some more."]],
good:[["Don’t get comfortable. It won’t happen twice.","A beautiful result! I knew the universe had excellent taste."],["Hm. Fine. Enjoy it while it lasts.","Radiant! The universe finally noticed you."]],
repeat:[["Do you have somewhere to be? Because apparently, you don’t.","Let them enjoy themselves! I’d stay here all day if I were them. Oh, wait. I do!"],["Your thumb must be exhausted.","Spin, darling, spin! The wheel adores you."]],
same:[["AGAIN? That’s embarrassing.","Perhaps it’s destiny! Some things are simply meant to find you."],["Did you lock everything? Nothing changed.","Consistency! The sign of a true artist."]],
five:[["Five pulls. Zero self-control.","Persistence is a wonderful quality, sweetheart!"]],
interesting:[["Hm. That’s not entirely terrible.","How intriguing! I can already picture it becoming something magnificent."],["Huh. I almost respect that.","Ooh, that one has a spark!"]],
hesitate:[["Are you going to pull or just admire the button?","Take your time, darling. Anticipation is half the fun!"],["The button isn’t going to press itself.","I could stare at that button all day. It’s very pink."]],
ten:[["You’ve made this your full-time occupation.","Dedication! I admire that. I dedicate my entire existence to being gorgeous."]],
weird:[["{W} Nobody saw that coming.","What a delightful surprise! Life is full of little treasures."],["{W} Didn’t expect that, did you?","Neither did I! And I adore surprises, especially when I’m involved."],["{W} What a peculiar little combination.","Peculiar is just another word for unforgettable, sweetheart!"],["{W} I need a moment.","A moment? I need a framed print!"]],
luckytwice:[["Suspicious. Very suspicious.","Two lovely results in a row! You’re practically blessed. I know the feeling."]],
failed:[["That’s what you get for testing your luck.","Every pull is a new opportunity, darling. Isn’t that wonderful?"]],
refuse:[["You need supervision.","I think it’s admirable to know what you want! I always know what I want. Me."]],
fun:[["You’re enjoying this far too much.","Happiness looks lovely on people! Almost as lovely as my face."]],
quick:[["You didn’t even look at the last one.","Perhaps they’re saving the best for last! I certainly am."]],
stop:[["Oh? Finished already? I was just getting entertained.","Thank you for spending time with us! I hope you found something wonderful."]],
final:[["Last one. And don’t come crying to me if it’s rubbish.","Make a wish, darling! Something lovely might be waiting for you."]],
disagree:[["“{n}”? Absolutely not.","Syesame! “{n}” is perfect. Look at those colours!"],["{a} and {b} together? Pick one.","I’d wear both. Daily."],["{T}. Of course. Predictable.","Predictable?! It’s timeless!"],["That’s the worst one yet.","The worst?! It’s my favourite so far."],["I like it. ...Don’t tell Ryce.","I heard that! I like it too."],["Throw it back.","Never! Frame it!"]]
};
var FT=["Oh, you’d like font directions? I’m sorry, that’s not available.","Fonts? Here? ...No. Sorry. You’re on your own.","Font help is not in the budget. Or the code.","Font direction is currently out of order. Forever.","You want me to pick the font too? I can barely pick a snack."];
var FR=["Darling, any font you choose will be perfect.","Incorrect! You have impeccable taste.","You don’t need help. You’re a designer, gorgeous."];
var LBL=["name","thing","colour"];
var $=function(i){return document.getElementById(i)};
var R=[].slice.call(document.querySelectorAll(".reel")),lock=[false,false,false],busy=false,last=Date.now();
var pulls=0,lastEnd=0,qk=false,prevLuck="",stopped=false,LI={};
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
function lum(x){var n=parseInt(x.slice(1),16);function f(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}return .2126*f(n>>16&255)+.7152*f(n>>8&255)+.0722*f(n&255)}
function luck(){var a=lum(S[2][0]),b=lum(S[2][1]),c=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);return c>=4.5?"good":c<1.8?"bad":"mid"}
function show(k,v){R[k].querySelector(".v").innerHTML=k==2?"<span>"+v[0]+"</span><span>"+v[1]+"</span>":v}
function brief(){$("brief").innerHTML='<div class="k">brand name</div><div class="bn">'+S[0]+'</div><div class="k">thing</div><div class="bt">'+S[1]+'</div><div class="k">colours</div><div class="bh">'+S[2][0]+' + '+S[2][1]+'</div>'}
function fill(t){return t.replace(/\{W\}/g,function(){return pick(WTF)}).replace(/\{n\}/g,S[0]).replace(/\{t\}/g,S[1]).replace(/\{T\}/g,cap(S[1])).replace(/\{a\}/g,S[2][0]).replace(/\{b\}/g,S[2][1])}
function pop(id){var e=$(id);e.classList.remove("pop");void e.offsetWidth;e.classList.add("pop")}
function talk(s,r){$("sy").textContent=s;$("ry").textContent=r;pop("pS");pop("pR");last=Date.now()}
function pickPair(ev){var a=P[ev],i=rnd(a.length);if(a.length>1&&i===LI[ev])i=(i+1+rnd(a.length-1))%a.length;LI[ev]=i;return a[i]}
function say(ev){var p=pickPair(ev);talk(fill(p[0]),fill(p[1]))}
function choose(lk){var n=pulls,locked=lock.filter(Boolean).length;
 if(n===1)return"first";if(n===2)return"again";if(n===5)return"five";if(n===10)return"ten";if(n===20)return"final";
 if(n>12&&n%4===0)return"refuse";
 if(locked>=2)return"same";
 if(Math.random()<.22)return"disagree";
 if(qk&&Math.random()<.6)return"quick";
 if(/concept|nostalgia|jazz|regret|silence/.test(S[1])||Math.random()<.1)return"weird";
 if(lk==="good")return prevLuck==="good"?"luckytwice":"good";
 if(lk==="bad")return prevLuck==="bad"?"failed":"bad";
 return pick(["repeat","interesting","fun"])}
function fall(e){e.classList.remove("hid","fall");void e.offsetWidth;e.classList.add("fall")}
function fin(){busy=false;$("go").disabled=false;document.body.classList.remove("spinning");brief();
 fall($("card"));fall($("acts"));
 var lk=luck();say(choose(lk));prevLuck=lk;lastEnd=Date.now();
 $("card").scrollIntoView({behavior:"smooth",block:"nearest"})}
function spin(){if(busy)return;busy=true;$("go").disabled=true;if($("reels").classList.contains("hid"))fall($("reels"));
 document.body.classList.add("spinning");pulls++;qk=lastEnd>0&&Date.now()-lastEnd<4000;stopped=false;last=Date.now();
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
setInterval(function(){if(busy)return;var idle=Date.now()-last;
 if(pulls===0&&idle>16000)say("hesitate");
 else if(pulls>0&&idle>25000&&!stopped){stopped=true;say(pulls>=5?"stop":"hesitate")}},4000);
$("sy").textContent="Go on. Pull it. Let’s see what nonsense fate has prepared.";
$("ry").textContent="How exciting! I do hope you get something as lovely as me.";

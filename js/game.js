function startGame(){
setBackground("darkroom.jpg");
playHeartbeat();
screenFlicker();
loadScene("scene1");
}

function setBackground(img){
document.body.style.backgroundImage =
`url(assets/bg/${img})`;
}

function playHeartbeat(){
const audio=document.getElementById("heartbeat");
audio.volume=0.35;
audio.play();
}

function screenFlicker(){
setInterval(()=>{
document.body.style.opacity =
Math.random()>0.5 ? "1":"0.85";
},500);
}

function typeWriter(textArea,text){
textArea.textContent="";
let i=0;

function typing(){
if(i<text.length){
textArea.textContent+=text[i];
i++;
setTimeout(typing,20);
}
}
typing();
}

document.addEventListener("mousemove",e=>{
const ghost=document.getElementById("ghostCursor");
ghost.style.left=e.pageX+"px";
ghost.style.top=e.pageY+"px";
});

async function loadScene(scene){

const res=await fetch(`story/${scene}.json`);
const data=await res.json();

const textArea=document.getElementById("storyText");
const choiceArea=document.getElementById("choices");

typeWriter(textArea,data.text);

choiceArea.innerHTML="";

data.choices.forEach(c=>{
const btn=document.createElement("button");
btn.textContent=c.text;

btn.onclick=()=>{
if(c.effect==="panic"){
document.body.classList.add("horrorShake");
setTimeout(()=>document.body.classList.remove("horrorShake"),2000);
}

loadScene(c.next);
};

choiceArea.appendChild(btn);
});
}

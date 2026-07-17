// ================= PASSWORD =================

const PASSWORD = "OpenLockPlease";

// ================= SCREENS =================

const home = document.getElementById("home");
const dashboard = document.getElementById("dashboard");
const housePage = document.getElementById("housePage");

// ================= BUTTONS =================

const openBtn = document.getElementById("openBtn");
const lockBtn = document.getElementById("lockBtn");
const unlockBtn = document.getElementById("unlockBtn");
const backBtn = document.getElementById("backBtn");

// ================= HOUSE =================

const houseTitle = document.getElementById("houseTitle");
const passwordArea = document.getElementById("passwordArea");
const passwordInput = document.getElementById("password");
const status = document.getElementById("status");

// ================= DASHBOARD =================

const cards = document.querySelectorAll(".card");

let currentHouse = 1;

// ================= FUNCTIONS =================

function showScreen(screen){

home.classList.add("hidden");
dashboard.classList.add("hidden");
housePage.classList.add("hidden");

screen.classList.remove("hidden");

}

function animateCards(){

cards.forEach((card,index)=>{

card.style.opacity="0";
card.style.transform="translateY(40px)";

setTimeout(()=>{

card.style.transition=".6s";
card.style.opacity="1";
card.style.transform="translateY(0px)";

},index*150);

});

}

function notify(message,color){

const note=document.createElement("div");

note.className="alert";

note.style.background=color;

note.innerHTML=message;

document.body.appendChild(note);

setTimeout(()=>{

note.remove();

},3000);

}

// ================= OPEN WEBSITE =================

openBtn.onclick=function(){

showScreen(dashboard);

animateCards();

notify("🟢 Smart City Connected","#00aa66");

}

// ================= OPEN HOUSE =================

document.querySelectorAll(".house").forEach(button=>{

button.onclick=function(){

currentHouse=this.dataset.house;

showScreen(housePage);

houseTitle.innerHTML="🏠 House "+currentHouse;

passwordArea.classList.add("hidden");

passwordInput.value="";

status.innerHTML="";

}

});

// ================= LOCK =================

lockBtn.onclick=function(){

passwordArea.classList.remove("hidden");

passwordInput.focus();

}

// ================= ENTER KEY =================

passwordInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){

unlockBtn.click();

}

});

// ================= UNLOCK =================

unlockBtn.onclick=function(){

if(passwordInput.value===PASSWORD){

status.className="success";

status.innerHTML="✅ ACCESS GRANTED<br><br>House "+currentHouse+" Unlocked";

notify("🔓 House "+currentHouse+" Unlocked","#00aa66");

passwordArea.classList.add("hidden");

}
else{

status.className="error";

status.innerHTML="❌ Incorrect Password";

passwordInput.animate([

{transform:"translateX(-10px)"},

{transform:"translateX(10px)"},

{transform:"translateX(-10px)"},

{transform:"translateX(10px)"},

{transform:"translateX(0px)"}

],{

duration:350

});

notify("🚫 Wrong Password","#d62828");

}

}

// ================= BACK =================

backBtn.onclick=function(){

showScreen(dashboard);

animateCards();

}

// ================= LIVE SENSOR DATA =================

const statValues=document.querySelectorAll(".card p");

setInterval(()=>{

if(statValues.length>=3){

statValues[0].innerHTML=(27+Math.floor(Math.random()*4))+"°C";

statValues[1].innerHTML=(96+Math.floor(Math.random()*5))+"%";

statValues[2].innerHTML=(80+Math.floor(Math.random()*6))+"%";

}

},3000);

// ================= EMERGENCY MODE =================

let emergency=false;

function triggerEmergency(){

if(emergency) return;

emergency=true;

document.body.classList.add("emergency");

notify("🚨 FIRE DETECTED!","#ff2222");

setTimeout(()=>{

document.body.classList.remove("emergency");

emergency=false;

notify("✅ Emergency Resolved","#00aa66");

},10000);

}

// =======================
// LIVE CLOCK
// =======================

function updateClock(){

const now=new Date();

document.getElementById("clock").innerHTML=

now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

// =======================
// NOTIFICATIONS
// =======================

function addNotification(message){

const area=document.getElementById("notificationArea");

const note=document.createElement("div");

note.className="notification";

note.innerHTML=message;

area.appendChild(note);

setTimeout(()=>{

note.remove();

},4000);

}

// Startup notifications

setTimeout(()=>{

addNotification("🟢 Smart City Connected");

},1000);

setTimeout(()=>{

addNotification("⚡ Power Stable");

},2500);

setTimeout(()=>{

addNotification("💧 Water Tank 82%");

},4000);

setTimeout(()=>{

addNotification("📡 Network Online");

},5500);

// Automatically trigger after 20 seconds (for demo)
// Remove this line if you don't want automatic simulation.
setTimeout(triggerEmergency,20000);

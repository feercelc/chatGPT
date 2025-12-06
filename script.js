/* ================= NAV ================== */

const navButtons = document.querySelectorAll('.topnav button');
const panels = document.querySelectorAll('.panel');

navButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    navButtons.forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.target;
    panels.forEach(p=>{
      p.classList.remove('active');
      if(p.id === target) p.classList.add('active');
    });

    window.scrollTo({top:0,behavior:"smooth"});
  });
});

/* Quick open */
document.getElementById('startStoryBtn').onclick=()=>document.querySelector('[data-target="panel-story"]').click();
document.getElementById('openChoicesBtn').onclick=()=>document.querySelector('[data-target="panel-choices"]').click();
document.getElementById('openQuizBtn').onclick=()=>document.querySelector('[data-target="panel-quiz"]').click();

/* ================= HISTÓRIA ================== */

const nodes = {
  start:{
    title:"A Chegada ao Portal",
    img:"f00c2b84-62cd-46f3-bf31-e080d5eaf3a6.gif",
    text:"Você desperta diante de um portal pulsante...",
    mem:"Primeiro Contato",
    choices:[
      {t:"Entrar", target:"sala1"},
      {t:"Observar ao redor", target:"olhar1"}
    ]
  },

  sala1:{
    title:"A Sala das Vibrações",
    img:"d222a947-e921-4957-9798-edeebb43ea95.gif",
    text:"A sala brilha como se estivesse viva.",
    mem:"Sala Vibrante",
    choices:[
      {t:"Seguir em frente", target:"agua1"},
      {t:"Tocar a luz", target:"luz1"}
    ]
  },

  olhar1:{
    title:"O Reflexo Distante",
    img:"fd698165-47ad-48bd-93da-73cf60cdaae1.jpeg",
    text:"Algo na água parece te chamar.",
    mem:"Chamado da Água",
    choices:[
      {t:"Tocar água", target:"agua1"},
      {t:"Voltar ao portal", target:"start"}
    ]
  },

  agua1:{
    title:"Superfície Anômala",
    img:"22b8abed-7d88-4dba-88c0-a67e720360a0.gif",
    text:"A superfície vibra como um espelho vivo.",
    mem:"Superfície Viva",
    choices:[
      {t:"Mergulhar", target:"final1"},
      {t:"Apenas observar", target:"final2"}
    ]
  },

  luz1:{
    title:"A Passagem Luminosa",
    img:"98025fe2-5897-41b3-a904-edf49d89c7c8.gif",
    text:"Um caminho brilhante se abre.",
    mem:"Corredor de Luz",
    choices:[
      {t:"Seguir luz", target:"final3"},
      {t:"Voltar", target:"start"}
    ]
  },

  final1:{
    title:"Final — O Mergulho",
    img:"4e5a9c9c-7bff-434c-a33b-b9c426fe1904.gif",
    text:"Você atravessa para outro mundo.",
    final:true
  },

  final2:{
    title:"Final — Observador",
    img:"dba72508-60f2-4ba2-8bb4-69e117dce559.gif",
    text:"Nem tudo precisa ser tocado.",
    final:true
  },

  final3:{
    title:"Final — Iluminação",
    img:"d3739ffb-2082-44d1-bbac-59e728846772.gif",
    text:"A luz te guia a um novo começo.",
    final:true
  }
};

let state={node:"start"};
let memories = JSON.parse(localStorage.getItem("aurora_mems")) || [];

const titleEl = document.getElementById('sceneTitle');
const imgEl = document.getElementById('sceneImage');
const textEl = document.getElementById('sceneText');
const choicesEl = document.getElementById('sceneChoices');
const memGrid = document.getElementById('memories');

function saveAll(){
  localStorage.setItem('aurora_story', JSON.stringify(state));
  localStorage.setItem('aurora_mems', JSON.stringify(memories));
}

function load(){
  const s = localStorage.getItem('aurora_story');
  if(s){ state = JSON.parse(s); }
}

function updateMemGrid(){
  memGrid.innerHTML="";
  if(memories.length===0){
    memGrid.innerHTML="<p>Sem memórias ainda.</p>";
    return;
  }
  memories.forEach(m=>{
    let d=document.createElement("div");
    d.className="mem";
    d.textContent=m.title;
    d.onclick=()=>alert(m.text);
    memGrid.appendChild(d);
  });
}

function renderNode(){
  const node = nodes[state.node];
  if(!node) return;

  titleEl.textContent=node.title;
  imgEl.src=node.img;
  textEl.textContent=node.text;
  choicesEl.innerHTML="";

  if(node.mem){
    if(!memories.some(m=>m.title===node.mem)){
      memories.push({title:node.mem,text:`Memória: ${node.mem}`});
      saveAll();
    }
    updateMemGrid();
  }

  if(node.final){
    let msg=document.createElement("p");
    msg.textContent="Fim da história.";
    choicesEl.appendChild(msg);
    let btn=document.createElement("button");
    btn.className="btn ghost";
    btn.textContent="Reiniciar";
    btn.onclick=()=>{state.node="start";renderNode();};
    choicesEl.appendChild(btn);
    return;
  }

  node.choices.forEach(c=>{
    let b=document.createElement("button");
    b.textContent=c.t;
    b.onclick=()=>{state.node=c.target; renderNode();};
    choicesEl.appendChild(b);
  });
}

load();
updateMemGrid();
renderNode();

/* BUTTONS */
document.getElementById('saveProgress').onclick=()=>{saveAll();alert("Progresso salvo!");};
document.getElementById('restartStory').onclick=()=>{
  if(confirm("Resetar história?")){
    state={node:'start'};
    memories=[];
    saveAll();
    updateMemGrid();
    renderNode();
  }
};

/* ================= CHOICES ================= */

document.querySelectorAll('.choiceBtn').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('.final').forEach(f=>f.classList.add('hidden'));
    const tgt = document.getElementById(btn.dataset.target);
    tgt.classList.remove('hidden');
    tgt.classList.add('fade');
  };
});

/* ================= QUIZ ================= */

document.querySelectorAll('.q-btn').forEach(btn=>{
  btn.onclick=()=>{
    const r=document.getElementById('quiz-result');
    r.classList.remove('hidden');
    r.innerHTML="";

    if(btn.dataset.result==="luz")
      r.innerHTML="Você pertence à Dimensão da Harmonia.";
    else if(btn.dataset.result==="sombras")
      r.innerHTML="Você é da Dimensão da Noite Eterna.";
    else
      r.innerHTML="Você vibra com o Caos Criativo.";
  };
});

/* ================= TEMA ================= */

document.getElementById('themeBtn').onclick=()=>{
  document.body.classList.toggle('light');
};


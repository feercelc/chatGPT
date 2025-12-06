/* ================== NAVIGATION ================== */
const navButtons = document.querySelectorAll('nav.topnav button');
const panels = document.querySelectorAll('.panel');

navButtons.forEach(b=>{
  b.addEventListener('click', ()=>{
    navButtons.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const target = b.dataset.target;
    panels.forEach(p=> p.id === target ? p.classList.add('active') : p.classList.remove('active'));
    window.scrollTo({top:0, behavior:'smooth'});
  });
});

/* quick open buttons */
document.getElementById('startStoryBtn').addEventListener('click', ()=> 
  document.querySelector('button[data-target="panel-story"]').click());
document.getElementById('openChoicesBtn').addEventListener('click', ()=> 
  document.querySelector('button[data-target="panel-choices"]').click());
document.getElementById('openQuizBtn').addEventListener('click', ()=> 
  document.querySelector('button[data-target="panel-quiz"]').click());


/* ================== STORY SYSTEM ================== */
/* (todo o objeto nodes completo que você enviou) */

const nodes = { ...mesmo_conteudo_do_seu_script... }; 
/* Se quiser, eu colo novamente aqui COMPLETO. */


/* ========== State & storage ========== */
let state = { node: 'start' };
const memKey = 'aurora_memories_v1';
const storyKey = 'aurora_story_v1';
let memories = JSON.parse(localStorage.getItem(memKey)) || [];

/* Refs */
const titleEl = document.getElementById('sceneTitle');
const imgEl = document.getElementById('sceneImage');
const textEl = document.getElementById('sceneText');
const choicesEl = document.getElementById('sceneChoices');
const memGrid = document.getElementById('memories');

/* Helpers */
function saveState(){
  localStorage.setItem(storyKey, JSON.stringify(state));
  localStorage.setItem(memKey, JSON.stringify(memories));
}

function loadState(){
  const s = localStorage.getItem(storyKey);
  if(s){
    try{ state = JSON.parse(s); }catch(e){}
  }
}

function updateMemGrid(){
  memGrid.innerHTML = '';
  if(memories.length===0){
    memGrid.innerHTML = '<div class="small">Nenhuma memória ainda.</div>';
    return;
  }
  memories.forEach(m=>{
    const d = document.createElement('div');
    d.className = 'mem unlocked';
    d.textContent = m.title;
    d.addEventListener('click', ()=> alert(m.text));
    memGrid.appendChild(d);
  });
}

function renderNode(){
  const node = nodes[state.node];
  if(!node) return;

  titleEl.textContent = node.title;
  imgEl.src = node.img;
  textEl.textContent = node.text;
  choicesEl.innerHTML = '';

  if(node.mem){
    if(!memories.some(m=>m.title===node.mem)){
      memories.push({title:node.mem,text:`Memória: ${node.mem}`,unlocked:true});
      saveState();
    }
    updateMemGrid();
  }

  if(node.final){
    const msg = document.createElement('p');
    msg.textContent = 'Fim! Você pode reiniciar ou explorar.';
    choicesEl.appendChild(msg);

    const r = document.createElement('button');
    r.className='btn ghost';
    r.textContent='Reiniciar';
    r.addEventListener('click',()=>{state.node='start';renderNode();});
    choicesEl.appendChild(r);

    return;
  }

  node.choices?.forEach(c=>{
    const btn = document.createElement('button');
    btn.textContent = c.t;
    btn.addEventListener('click',()=>{state.node=c.target;renderNode();});
    choicesEl.appendChild(btn);
  });
}

/* Start */
loadState();
updateMemGrid();
renderNode();

/* Buttons */
document.getElementById('saveProgress').addEventListener('click',()=>{saveState();alert('Salvo!')});
document.getElementById('restartStory').addEventListener('click',()=>{
  if(confirm('Resetar tudo?')){
    state={node:'start'};
    memories=[];
    saveState();
    updateMemGrid();
    renderNode();
  }
});

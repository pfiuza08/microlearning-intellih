// === Tema ===
const themeBtn = document.getElementById('btn-theme');
const body = document.body;

function setTheme(mode){
  body.classList.add('fading');
  themeBtn.classList.add('rotate');
  setTimeout(()=>{
    if(mode==='light'){
      body.classList.add('light');
      localStorage.setItem('liora_theme','light');
      themeBtn.textContent='☀️';
    } else {
      body.classList.remove('light');
      localStorage.setItem('liora_theme','dark');
      themeBtn.textContent='🌙';
    }
    setTimeout(()=>{ body.classList.remove('fading'); themeBtn.classList.remove('rotate'); },200);
  },150);
}

themeBtn.addEventListener('click',()=>{
  const current = body.classList.contains('light') ? 'light':'dark';
  setTheme(current==='light'?'dark':'light');
});
setTheme(localStorage.getItem('liora_theme')||'dark');

// === Estado global ===
const $ = id => document.getElementById(id);
const els = { selCat:$('sel-cat'), selFormato:$('sel-formato'), btnSim:$('btn-simulado') };

// === Formatos por categoria ===
const FORMATOS = {
  concursos: [
    {id:'cespe', label:'CESPE (Certo/Errado)'},
    {id:'fgv', label:'FGV (5 alternativas)'},
    {id:'vunesp', label:'VUNESP (4 alternativas)'}
  ],
  exames: [
    {id:'enem', label:'ENEM (5 alternativas)'},
    {id:'enade', label:'ENADE (objetivas)'},
    {id:'enamed', label:'ENAMED (casos clínicos)'}
  ],
  ti: [
    {id:'aws', label:'AWS (4 alternativas)'},
    {id:'az900', label:'AZ-900 (4 alternativas)'},
    {id:'gcp', label:'GCP (4 alternativas)'}
  ],
  mf: [
    {id:'cpa10', label:'CPA-10 (5 alternativas)'},
    {id:'cpa20', label:'CPA-20 (5 alternativas)'},
    {id:'cea', label:'CEA (5 alternativas)'}
  ],
  outros: [
    {id:'generico', label:'Geral (4 alternativas)'}
  ]
};

// === Atualiza lista de formatos dinamicamente ===
function hydrateFormatos(){
  const cat = els.selCat.value || 'concursos';
  const list = FORMATOS[cat] || [];
  els.selFormato.innerHTML = '';
  list.forEach(f=>{
    const opt = document.createElement('option');
    opt.value = f.id;
    opt.textContent = f.label;
    els.selFormato.appendChild(opt);
  });
  els.selFormato.selectedIndex = 0;
  atualizarBotao();
}

function atualizarBotao(){
  const textoFmt = els.selFormato.options[els.selFormato.selectedIndex]?.text || '';
  els.btnSim.textContent = textoFmt ? `Gerar simulado (${textoFmt})` : 'Gerar simulado';
}

els.selCat.addEventListener('change', ()=>{ hydrateFormatos(); });
els.selFormato.addEventListener('change', atualizarBotao);

// === Inicialização ===
hydrateFormatos();

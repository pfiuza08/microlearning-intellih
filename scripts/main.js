// ==========================================================
// 🌙 GARANTE O TEMA ESCURO AO INICIAR
// ==========================================================
document.body.classList.add('dark');

// ==========================================================
// 🎨 TEMA (claro/escuro)
// ==========================================================
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

// ==========================================================
// 📦 ESTADO GLOBAL
// ==========================================================
const $ = id => document.getElementById(id);
const els = {
  inpTema: $('inp-tema'),
  inpFile: $('inp-file'),
  btnGerar: $('btn-gerar'),
  status: $('status'),
  ctx: $('ctx'),
  plano: $('plano'),
  selCat: $('sel-cat'),
  selFormato: $('sel-formato'),
  btnSim: $('btn-simulado')
};

const state = {
  tema: '',
  dias: 5,
  materialTexto: '',
  plano: []
};

const setStatus = msg => els.status.innerHTML = msg;
const updateCtx = () => els.ctx.textContent = `${state.materialTexto ? 'Material enviado' : (state.tema || 'Sem tema')} · ${state.dias} sessões`;

// ==========================================================
// 📖 LEITURA DE ARQUIVOS (TXT, PDF, DOCX)
// ==========================================================
async function readFileContent(file){
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  setStatus(`⏳ Processando arquivo...`);
  if(ext === 'txt'){
    return new Promise(res=>{
      const r = new FileReader();
      r.onload = ()=> res(r.result.toString());
      r.readAsText(file, 'utf-8');
    });
  }
  if(ext === 'pdf' && window.pdfjsLib){
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({data:buf}).promise;
    let text = '';
    for(let i=1; i<=pdf.numPages; i++){
      const page = await pdf.getPage(i);
      const c = await page.getTextContent();
      text += c.items.map(it=>it.str).join(' ') + '\n';
    }
    setStatus(`✅ PDF lido com sucesso (${pdf.numPages} páginas)`);
    return text;
  }
  if(ext === 'docx' && window.mammoth){
    const buf = await file.arrayBuffer();
    const result = await mammoth.extractRawText({arrayBuffer:buf});
    setStatus(`✅ Documento DOCX convertido.`);
    return result.value;
  }
  setStatus('⚠️ Formato não suportado. Use TXT, PDF ou DOCX.');
  return '';
}

if(els.inpFile){
  els.inpFile.addEventListener('change', async (e)=>{
    const f = e.target.files?.[0];
    if(!f) return;
    const text = await readFileContent(f);
    if(text){
      state.materialTexto = text;
      state.tema = state.tema || f.name.replace(/\.(pdf|txt|docx?)$/i,'');
      updateCtx();
    }
  });
}

// ==========================================================
// 📅 GERAÇÃO DO PLANO DE ESTUDO
// ==========================================================
function extrairTopicos(texto, tema, n){
  let cand = [];
  if(texto){
    const linhas = texto.split(/\n+/).map(s=>s.trim()).filter(Boolean);
    cand = linhas.filter(s=> s.split(' ').length < 10).slice(0,60);
  }
  if(!cand.length){
    cand = [
      `Introdução ao tema ${tema}`,
      'Conceitos principais',
      'Aplicações práticas',
      'Revisão',
      'Síntese final'
    ];
  }
  return cand.slice(0,n);
}

function descrever(t, tema){
  return `Sessão sobre ${t}, parte do tema ${tema}. Revisar conceitos e aplicar em exemplos.`;
}

function construirPlano(topicos, dias, tema){
  const plano = [];
  for(let i=0; i<dias; i++){
    const t = topicos[i % topicos.length];
    plano.push({
      dia: i+1,
      titulo: `Sessão ${i+1}`,
      topico: t,
      descricao: descrever(t, tema)
    });
  }
  return plano;
}

function renderPlano(){
  els.plano.innerHTML = '';
  if(!state.plano.length){
    els.plano.innerHTML = '<p class="text-sm text-[var(--muted)]">Crie um plano de estudo ao lado e ele aparecerá aqui.</p>';
    return;
  }
  state.plano.forEach(p=>{
    const d = document.createElement('div');
    d.className = 'session-card';
    d.innerHTML = `
      <div class="text-sm font-semibold mb-1">${p.titulo}</div>
      <div class="text-sm text-[var(--muted)] mb-1">${p.topico}</div>
      <p class="text-sm">${p.descricao}</p>`;
    els.plano.appendChild(d);
  });
}

if(els.btnGerar){
  els.btnGerar.addEventListener('click', ()=>{
    state.tema = els.inpTema.value.trim();
    if(!state.tema && !state.materialTexto){
      alert('Defina um tema ou envie um material.');
      return;
    }
    const topicos = extrairTopicos(state.materialTexto, state.tema, state.dias);
    state.plano = construirPlano(topicos, state.dias, state.tema);
    updateCtx();
    renderPlano();
    setStatus('✅ Plano de estudo criado com sucesso!');
  });
}

// ==========================================================
// 🧠 CATEGORIAS E FORMATOS DE SIMULADOS
// ==========================================================
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

// ==========================================================
// 🚀 INICIALIZAÇÃO
// ==========================================================
hydrateFormatos();
renderPlano();
updateCtx();

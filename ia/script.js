const img = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;
const NEWS = [
 {id:1,cat:"Tecnologia",t:"Nova geração de modelos de linguagem roda direto no celular",r:"Modelos compactos prometem assistentes rápidos e privados, sem depender da nuvem.",img:img("photo-1677442136019-21780ecad995"),d:"20 out 2026",h:"08:40"},
 {id:2,cat:"Saúde",t:"IA ajuda médicos a detectar câncer de pulmão mais cedo",r:"Sistema analisa tomografias e aponta nódulos que passariam despercebidos.",img:img("photo-1576091160550-2173dba999ef"),d:"20 out 2026",h:"07:55"},
 {id:3,cat:"Educação",t:"Escolas públicas testam tutores virtuais em matemática",r:"Projeto-piloto acompanha alunos do ensino fundamental com exercícios adaptativos.",img:img("photo-1503676260728-1c00da094a0b"),d:"19 out 2026",h:"18:20"},
 {id:4,cat:"Negócios",t:"Pequenas empresas adotam IA para atendimento ao cliente",r:"Ferramentas acessíveis reduzem tempo de resposta e custos operacionais.",img:img("photo-1556761175-b413da4baf72"),d:"19 out 2026",h:"16:05"},
 {id:5,cat:"Ética",t:"Debate sobre regulação da IA avança no Congresso",r:"Proposta define regras de transparência para sistemas de alto risco.",img:img("photo-1589829545856-d10d557cf95f"),d:"19 out 2026",h:"14:30"},
 {id:6,cat:"Tecnologia",t:"Robôs com visão computacional chegam aos armazéns",r:"Automação inteligente acelera a separação de pedidos no e-commerce.",img:img("photo-1485827404703-89b55fcc595e"),d:"18 out 2026",h:"11:10"},
 {id:7,cat:"Saúde",t:"Aplicativo usa IA para monitorar saúde mental",r:"Pesquisadores alertam para cuidados com privacidade dos dados.",img:img("photo-1559757148-5c350d0d3c56"),d:"18 out 2026",h:"09:45"},
 {id:8,cat:"Educação",t:"Universidades criam guias para uso de IA em trabalhos",r:"Instituições buscam equilíbrio entre inovação e integridade acadêmica.",img:img("photo-1523050854058-8df90110c9f1"),d:"17 out 2026",h:"15:00"},
 {id:9,cat:"Negócios",t:"Investimentos em startups de IA batem recorde na América Latina",r:"Brasil lidera em número de rodadas no último trimestre.",img:img("photo-1551288049-bebda4e38f71"),d:"17 out 2026",h:"10:25"},
 {id:10,cat:"Ética",t:"Deepfakes: como identificar vídeos manipulados",r:"Especialistas listam sinais que ajudam a reconhecer conteúdo falso.",img:img("photo-1633265486064-086b219458ec"),d:"16 out 2026",h:"13:40"},
 {id:11,cat:"Tecnologia",t:"Tradução automática em Libras ganha novos recursos",r:"Avatares 3D ficam mais expressivos e ampliam o vocabulário.",img:img("photo-1531482615713-2afd69097998"),d:"16 out 2026",h:"08:15"},
 {id:12,cat:"Saúde",t:"Hospitais usam IA para prever lotação de emergências",r:"Modelos preditivos ajudam a organizar equipes e leitos.",img:img("photo-1519494026892-80bbd2d6fd0d"),d:"15 out 2026",h:"17:50"}
];
const CATS=["Tecnologia","Saúde","Educação","Negócios","Ética"];
const $=s=>document.querySelector(s);
const card=n=>`<a class="card" href="#/noticia/${n.id}"><img src="${n.img}" alt="" loading="lazy"><div class="body"><span class="tag ${n.cat==='Ética'?'blue':''}">${n.cat}</span><h3>${n.t}</h3><p>${n.r}</p><span class="meta">${n.d} · ${n.h}</span></div></a>`;

function renderHome(){
  const h=NEWS[0];
  $("#hero").href="#/noticia/"+h.id;
  $("#hero").innerHTML=`<img src="${h.img}" alt="${h.t}"><div class="txt"><span class="tag">Destaque · ${h.cat}</span><h1>${h.t}</h1><p>${h.r}</p></div>`;
  $("#novo-list").innerHTML=NEWS.slice(1,7).map(n=>`<li><time>${n.h}</time><a href="#/noticia/${n.id}">${n.t}</a></li>`).join("");
  $("#cats").innerHTML=CATS.map(c=>`<div class="section-title"><h2>${c}</h2><a href="#/categoria/${c}">Ver tudo →</a></div><div class="grid">${NEWS.filter(n=>n.cat===c).slice(0,3).map(card).join("")}</div>`).join("");
}
function renderCat(c){
  $("#cat-title").textContent=c==="Todas"?"Todas as notícias":c;
  $("#filters").innerHTML=["Todas",...CATS].map(x=>`<a class="chip ${x===c?'active':''}" href="#/categoria/${x}">${x}</a>`).join("");
  $("#cat-grid").innerHTML=NEWS.filter(n=>c==="Todas"||n.cat===c).map(card).join("");
}
function renderArt(id){
  const n=NEWS.find(x=>x.id==id)||NEWS[0];
  document.title=n.t+" — IA em Foco";
  $("#art").innerHTML=`<img src="${n.img}" alt=""><div class="body"><span class="tag">${n.cat}</span><h1>${n.t}</h1><p class="meta" style="color:var(--muted)">Por Redação IA em Foco · ${n.d}, ${n.h}</p><p><strong>${n.r}</strong></p><p>O avanço da inteligência artificial tem provocado mudanças rápidas em diversos setores. Especialistas ouvidos pela reportagem destacam que os benefícios são significativos, mas exigem atenção à transparência, à segurança e à inclusão.</p><p>Segundo pesquisadores, o próximo passo é garantir que essas ferramentas sejam acessíveis a toda a população, com regras claras de uso e proteção de dados pessoais.</p><p>O IA em Foco seguirá acompanhando os desdobramentos deste tema.</p></div>`;
}
const verifyHTML=`<div class="verify"><div><span class="tag">Ferramenta</span><h2>Verifique uma notícia</h2><p>Cole o título, o texto ou o link de uma notícia. Nossa análise aponta sinais comuns de desinformação. É um apoio — sempre confira em fontes confiáveis.</p></div><form onsubmit="verificar(event,this)"><input name="url" placeholder="Link da notícia (opcional)" aria-label="Link da notícia"><textarea name="txt" placeholder="Cole aqui o texto ou título da notícia..." aria-label="Texto da notícia" required></textarea><button class="btn" type="submit">Analisar notícia</button><div class="result" role="status"></div></form></div>`;
function verificar(e,f){
  e.preventDefault();
  const t=f.txt.value, u=f.url.value.trim(), al=[];let s=100;
  if(/urgente|compartilhe|antes que apaguem|ninguém está falando|choc|bomba|100%/i.test(t)){s-=25;al.push("Linguagem sensacionalista ou apelo para compartilhar.")}
  if((t.match(/!/g)||[]).length>2){s-=10;al.push("Excesso de pontos de exclamação.")}
  if(t.replace(/[^A-Z]/g,"").length>t.length*0.3&&t.length>20){s-=15;al.push("Muito texto em letras maiúsculas.")}
  if(!/segundo|de acordo|fonte|pesquisa|estudo|dados/i.test(t)){s-=20;al.push("Não cita fontes, estudos ou dados.")}
  if(t.length<80){s-=10;al.push("Texto muito curto para avaliar o contexto.")}
  if(u&&!/^https:\/\//.test(u)){s-=10;al.push("Link sem conexão segura (https).")}
  if(u&&/\.(gov|edu)\.br|g1\.globo|folha|estadao|bbc|uol/i.test(u)){s+=10}
  s=Math.max(5,Math.min(100,s));
  const c=s>=70?"#1f8a4c":s>=40?"#d9a400":"#d7261e",l=s>=70?"Provavelmente confiável":s>=40?"Atenção: verifique melhor":"Alto risco de desinformação";
  const r=f.querySelector(".result");r.classList.add("show");
  r.innerHTML=`<strong style="color:${c}">${l} — ${s}/100</strong><div class="meter"><i style="width:${s}%;background:${c}"></i></div>${al.length?"<ul>"+al.map(a=>"<li>"+a+"</li>").join("")+"</ul>":"<p>Nenhum sinal de alerta encontrado.</p>"}<p style="font-size:.85rem;margin-top:8px;color:#555">Dica: consulte agências de checagem como Lupa, Aos Fatos e Fato ou Fake.</p>`;
}
function route(){
  const p=decodeURIComponent(location.hash.replace(/^#\/?/,"")).split("/");
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.dataset.r===(p[0]==="categoria"?p[1]:p[0])));
  $("#nav").classList.remove("open");
  document.title="IA em Foco — Notícias sobre Inteligência Artificial";
  if(p[0]==="categoria"){renderCat(p[1]||"Todas");$("#p-cat").classList.add("active")}
  else if(p[0]==="noticia"){renderArt(p[1]);$("#p-art").classList.add("active")}
  else if(p[0]==="verificar"){$("#p-ver").classList.add("active")}
  else if(p[0]==="sobre"){$("#p-sobre").classList.add("active")}
  else $("#p-home").classList.add("active");
  scrollTo(0,0);
}
$("#hoje").textContent=new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
renderHome();$("#verify-home").innerHTML=verifyHTML;$("#verify-page").innerHTML=verifyHTML;
addEventListener("hashchange",route);route();

// Inicialização do VLibras
window.addEventListener('load', function () {
  if (window.VLibras && window.VLibras.Widget) {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
  }
});

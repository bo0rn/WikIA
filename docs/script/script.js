// 1. CONFIGURAÇÕES E DADOS DAS NOTÍCIAS

const img = id =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

let NEWS = [];

const CATS = [
  "Tecnologia",
  "Saúde",
  "Educação",
  "Negócios",
  "Ética"
];

const $ = seletor => document.querySelector(seletor);

async function carregarNoticias() {
  const totalNoticias = 12;
  const noticiasCarregadas = [];

  for (let i = 1; i <= totalNoticias; i++) {
    try {
      const resposta = await fetch(`noticias/noticia-${i}.json`);
      if (!resposta.ok) continue;
      const dados = await resposta.json();

      noticiasCarregadas.push({
        id: dados.id || i,
        cat: dados.cat,
        t: dados.t,
        r: dados.r,
        img: img(dados.imgId),
        d: dados.d,
        h: dados.h,
        conteudoHtml: dados.paragrafos ? dados.paragrafos.map(paragrafo => `<p>${paragrafo}</p>`).join("") : ""
      });
    } catch (erro) {
      console.error(`Erro ao carregar a notícia ${i}:`, erro);
    }
  }

  NEWS = noticiasCarregadas;
  inicializarSite();
}

// 2. CRIAÇÃO DOS CARDS DE NOTÍCIAS

const card = n => `
  <a class="card" href="#/noticia/${n.id}">
    <img src="${n.img}" alt="${n.t}" loading="lazy">
    <div class="body">
      <span class="tag ${n.cat === "Ética" ? "blue" : ""}">${n.cat}</span>
      <h3>${n.t}</h3>
      <p>${n.r}</p>
      <span class="meta">${n.d} · ${n.h}</span>
    </div>
  </a>
`;

// 3. PÁGINA INICIAL

function renderHome() {
  if (NEWS.length === 0) return;
  const destaque = NEWS[0];
  const hero = $("#hero");

  if (hero) {
    hero.href = `#/noticia/${destaque.id}`;
    hero.innerHTML = `
      <img src="${destaque.img}" alt="${destaque.t}">
      <div class="txt">
        <span class="tag">Destaque · ${destaque.cat}</span>
        <h1>${destaque.t}</h1>
        <p>${destaque.r}</p>
      </div>
    `;
  }

  const cats = $("#cats");
  if (cats) {
    cats.innerHTML = CATS.map(c => `
      <div class="section-title">
        <h2>${c}</h2>
        <a href="#/categoria/${encodeURIComponent(c)}">Ver tudo →</a>
      </div>
      <div class="grid">
        ${NEWS.filter(n => n.cat === c).slice(0, 3).map(card).join("")}
      </div>
    `).join("");
  }
}

// 4. PÁGINA DE CATEGORIAS

function renderCat(c) {
  const titulo = $("#cat-title");
  const filtros = $("#filters");
  const grade = $("#cat-grid");

  if (titulo) titulo.textContent = c === "Todas" ? "Todas as notícias" : c;

  if (filtros) {
    filtros.innerHTML = ["Todas", ...CATS].map(x => `
      <a class="chip ${x === c ? "active" : ""}" href="#/categoria/${encodeURIComponent(x)}">${x}</a>
    `).join("");
  }

  if (grade) {
    grade.innerHTML = NEWS
      .filter(n => c === "Todas" || n.cat === c)
      .map(card)
      .join("");
  }
}

// 5. PÁGINA DE LEITURA DA NOTÍCIA

function renderArt(id) {
  const n = NEWS.find(x => x.id == id);
  const artigo = $("#art");
  if (!artigo) return;

  if (!n) {
    artigo.innerHTML = "<h2>Notícia não encontrada.</h2>";
    return;
  }

  document.title = `${n.t} — IA em Foco`;
  artigo.innerHTML = `
    <img src="${n.img}" alt="${n.t}">
    <div class="body">
      <span class="tag">${n.cat}</span>
      <h1>${n.t}</h1>
      <p class="meta" style="color:var(--muted)">Por Redação IA em Foco · ${n.d}, ${n.h}</p>
      <p><strong>${n.r}</strong></p>
      ${n.conteudoHtml}
    </div>
  `;
}

// 6. NAVEGAÇÃO ENTRE AS PÁGINAS

function route() {
  const caminho = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  const p = caminho.split("/");

  document.querySelectorAll("nav a").forEach(link => {
    const rota = link.dataset.r || "";
    const categoriaAtual = p[0] === "categoria" ? p[1] : "";
    link.classList.toggle("active",
      (rota === categoriaAtual && p[0] === "categoria") ||
      (rota === "" && !["categoria", "noticia", "sobre"].includes(p[0]))
    );
  });

  window.WikIAMotion?.setMobileMenu(false);
  document.title = "WikIA — Notícias sobre Inteligência Artificial";

  let page;
  if (p[0] === "categoria") {
    renderCat(p[1] || "Todas");
    page = $("#p-cat");
  } else if (p[0] === "noticia") {
    renderArt(p[1]);
    page = $("#p-art");
  } else if (p[0] === "sobre") {
    page = $("#p-sobre");
  } else {
    page = $("#p-home");
  }

  if (window.WikIAMotion) {
    window.WikIAMotion.showPage(page);
  } else {
    document.querySelectorAll(".page").forEach(item => {
      item.classList.toggle("active", item === page);
    });
    window.scrollTo(0, 0);
  }
}

// 7. DATA ATUAL

const hoje = $("#hoje");
if (hoje) {
  hoje.textContent = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// 8. INICIALIZAÇÃO DO SITE

function inicializarSite() {
  renderHome();
  window.addEventListener("hashchange", route);
  route();
}

carregarNoticias();

// 9. INICIALIZAÇÃO DO VLIBRAS

window.addEventListener("load", function() {
  if (window.VLibras && window.VLibras.Widget) {
    new window.VLibras.Widget("https://vlibras.gov.br/app");
  }
});

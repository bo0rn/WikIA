// 1. CONFIGURAÇÕES E DADOS DAS NOTÍCIAS

// Função para gerar os links das imagens
const img = id =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;



// Categorias disponíveis
const CATS = [
  "Tecnologia",
  "Saúde",
  "Educação",
  "Negócios",
  "Ética"
];

// Atalho para selecionar elementos HTML
const $ = seletor => document.querySelector(seletor);


// 2. CRIAÇÃO DOS CARDS DE NOTÍCIAS

const card = n => `
  <a class="card" href="#/noticia/${n.id}">
    <img src="${n.img}" alt="${n.t}" loading="lazy">

    <div class="body">
      <span class="tag ${n.cat === "Ética" ? "blue" : ""}">
        ${n.cat}
      </span>

      <h3>${n.t}</h3>
      <p>${n.r}</p>

      <span class="meta">${n.d} · ${n.h}</span>
    </div>
  </a>
`;


// 3. PÁGINA INICIAL

function renderHome() {
  const h = NEWS[0];

  // Notícia principal
  const hero = $("#hero");

  if (hero) {
    hero.href = `#/noticia/${h.id}`;

    hero.innerHTML = `
      <img src="${h.img}" alt="${h.t}">

      <div class="txt">
        <span class="tag">Destaque · ${h.cat}</span>
        <h1>${h.t}</h1>
        <p>${h.r}</p>
      </div>
    `;
  }

  // Blocos de notícias por categoria
  const cats = $("#cats");

  if (cats) {
    cats.innerHTML = CATS.map(c => `
      <div class="section-title">
        <h2>${c}</h2>
        <a href="#/categoria/${encodeURIComponent(c)}">Ver tudo →</a>
      </div>

      <div class="grid">
        ${NEWS
          .filter(n => n.cat === c)
          .slice(0, 3)
          .map(card)
          .join("")}
      </div>
    `).join("");
  }
}

// 4. PÁGINA DE CATEGORIAS

function renderCat(c) {
  const titulo = $("#cat-title");
  const filtros = $("#filters");
  const grade = $("#cat-grid");

  if (titulo) {
    titulo.textContent =
      c === "Todas" ? "Todas as notícias" : c;
  }

  if (filtros) {
    filtros.innerHTML = ["Todas", ...CATS]
      .map(x => `
        <a
          class="chip ${x === c ? "active" : ""}"
          href="#/categoria/${encodeURIComponent(x)}"
        >
          ${x}
        </a>
      `)
      .join("");
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

      <p class="meta" style="color:var(--muted)">
        Por Redação IA em Foco · ${n.d}, ${n.h}
      </p>

      <p><strong>${n.r}</strong></p>

      <p>
        O avanço da inteligência artificial tem provocado
        mudanças rápidas em diversos setores. Especialistas
        destacam que os benefícios são significativos, mas
        exigem atenção à transparência, à segurança e à inclusão.
      </p>

      <p>
        Segundo pesquisadores, o próximo passo é garantir
        que essas ferramentas sejam acessíveis a toda a população,
        com regras claras de uso e proteção de dados pessoais.
      </p>

      <p>
        O IA em Foco seguirá acompanhando os desdobramentos
        deste tema.
      </p>
    </div>
  `;
}

// 6. FERRAMENTA DE VERIFICAÇÃO

const verifyHTML = `
  <div class="verify">
    <h2>Verificador de informações</h2>

    <p>
      Insira um link para analisar alguns sinais básicos
      de segurança e confiabilidade da fonte.
    </p>

    <form onsubmit="verificar(event, this)">
      <label for="url-verificacao">Link da notícia:</label>

      <input
        type="url"
        name="url"
        id="url-verificacao"
        placeholder="https://exemplo.com/noticia"
        required
      >

      <button type="submit">Verificar link</button>

      <div id="verify-result" aria-live="polite"></div>
    </form>

    <p class="meta">
      Atenção: esta ferramenta não confirma se uma notícia
      é verdadeira. Sempre consulte outras fontes.
    </p>
  </div>
`;

// Função chamada pelo formulário
window.verificar = function(event, formulario) {
  event.preventDefault();

  const campo = formulario.querySelector('[name="url"]');
  const resultado = formulario.querySelector("#verify-result");

  if (!campo || !resultado) return;

  try {
    const endereco = new URL(campo.value);
    const protocoloSeguro = endereco.protocol === "https:";
    const dominio = endereco.hostname;

    resultado.innerHTML = "";

    const titulo = document.createElement("h3");
    titulo.textContent = "Resultado da análise";
    resultado.appendChild(titulo);

    const mensagem = document.createElement("p");

    if (protocoloSeguro) {
      mensagem.textContent =
        "O endereço utiliza HTTPS, que protege a conexão entre o navegador e o site.";
    } else {
      mensagem.textContent =
        "Atenção: o endereço não utiliza HTTPS. Evite fornecer dados pessoais nesse site.";
    }

    resultado.appendChild(mensagem);

    const fonte = document.createElement("p");
    fonte.textContent = `Domínio analisado: ${dominio}`;
    resultado.appendChild(fonte);

    const aviso = document.createElement("p");
    aviso.textContent =
      "O uso de HTTPS não garante que o conteúdo seja verdadeiro. Confira a autoria, a data e outras fontes.";
    resultado.appendChild(aviso);

  } catch {
    resultado.textContent = "Insira um endereço válido.";
  }
};



// 7. NAVEGAÇÃO ENTRE AS PÁGINAS

function route() {
  const caminho = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  const p = caminho.split("/");

  // Atualiza o destaque do menu conforme a categoria atual.
  document.querySelectorAll("nav a").forEach(link => {
    const rota = link.dataset.r || "";
    const categoriaAtual = p[0] === "categoria" ? p[1] : "";
    link.classList.toggle("active",
      (rota === categoriaAtual && p[0] === "categoria") ||
      (rota === "" && !["categoria", "noticia", "verificar", "sobre"].includes(p[0]))
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
  } else if (p[0] === "verificar") {
    page = $("#p-ver");
  } else if (p[0] === "sobre") {
    page = $("#p-sobre");
  } else {
    page = $("#p-home");
  }

  if (window.WikIAMotion) {
    window.WikIAMotion.showPage(page);
  } else {
    // Fallback caso o arquivo de animações não seja carregado.
    document.querySelectorAll(".page").forEach(item => {
      item.classList.toggle("active", item === page);
    });
    window.scrollTo(0, 0);
  }
}


// 8. DATA ATUAL

const hoje = $("#hoje");

if (hoje) {
  hoje.textContent = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


// 9. INICIALIZAÇÃO DO SITE

// Carrega as notícias da página inicial
renderHome();

// Carrega a ferramenta de verificação na home
const verifyHome = $("#verify-home");

if (verifyHome) {
  verifyHome.innerHTML = verifyHTML;
}

// Carrega a ferramenta na página própria
const verifyPage = $("#verify-page");

if (verifyPage) {
  verifyPage.innerHTML = verifyHTML;
}

// Escuta mudanças no endereço
window.addEventListener("hashchange", route);

// Abre a página inicial ou a rota atual
route();



// 10. INICIALIZAÇÃO DO VLIBRAS

window.addEventListener("load", function() {
  if (window.VLibras && window.VLibras.Widget) {
    new window.VLibras.Widget("https://vlibras.gov.br/app");
  }
});

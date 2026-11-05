// 1. CONFIGURAÇÕES E DADOS DAS NOTÍCIAS

// Função para gerar os links das imagens
const img = id =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

// Lista de notícias
const NEWS = [
  {
    id: 1,
    cat: "Tecnologia",
    t: "Nova geração de modelos de linguagem roda direto no celular",
    r: "Modelos compactos prometem assistentes rápidos e privados, sem depender da nuvem.",
    img: img("photo-1677442136019-21780ecad995"),
    d: "20 out 2026",
    h: "08:40"
  },
  {
    id: 2,
    cat: "Saúde",
    t: "IA ajuda médicos a detectar câncer de pulmão mais cedo",
    r: "Sistema analisa tomografias e aponta nódulos que passariam despercebidos.",
    img: img("photo-1576091160550-2173dba999ef"),
    d: "20 out 2026",
    h: "07:55"
  },
  {
    id: 3,
    cat: "Educação",
    t: "Escolas públicas testam tutores virtuais em matemática",
    r: "Projeto-piloto acompanha alunos do ensino fundamental com exercícios adaptativos.",
    img: img("photo-1503676260728-1c00da094a0b"),
    d: "19 out 2026",
    h: "18:20"
  },
  {
    id: 4,
    cat: "Negócios",
    t: "Pequenas empresas adotam IA para atendimento ao cliente",
    r: "Ferramentas acessíveis reduzem tempo de resposta e custos operacionais.",
    img: img("photo-1556761175-b413da4baf72"),
    d: "19 out 2026",
    h: "16:05"
  },
  {
    id: 5,
    cat: "Ética",
    t: "Debate sobre regulação da IA avança no Congresso",
    r: "Proposta define regras de transparência para sistemas de alto risco.",
    img: img("photo-1589829545856-d10d557cf95f"),
    d: "19 out 2026",
    h: "14:30"
  },
  {
    id: 6,
    cat: "Tecnologia",
    t: "Robôs com visão computacional chegam aos armazéns",
    r: "Automação inteligente acelera a separação de pedidos no e-commerce.",
    img: img("photo-1485827404703-89b55fcc595e"),
    d: "18 out 2026",
    h: "11:10"
  },
  {
    id: 7,
    cat: "Saúde",
    t: "Aplicativo usa IA para monitorar saúde mental",
    r: "Pesquisadores alertam para cuidados com privacidade dos dados.",
    img: img("photo-1559757148-5c350d0d3c56"),
    d: "18 out 2026",
    h: "09:45"
  },
  {
    id: 8,
    cat: "Educação",
    t: "Universidades criam guias para uso de IA em trabalhos",
    r: "Instituições buscam equilíbrio entre inovação e integridade acadêmica.",
    img: img("photo-1523050854058-8df90110c9f1"),
    d: "17 out 2026",
    h: "15:00"
  },
  {
    id: 9,
    cat: "Negócios",
    t: "Investimentos em startups de IA batem recorde na América Latina",
    r: "Brasil lidera em número de rodadas no último trimestre.",
    img: img("photo-1551288049-bebda4e38f71"),
    d: "17 out 2026",
    h: "10:25"
  },
  {
    id: 10,
    cat: "Ética",
    t: "Deepfakes: como identificar vídeos manipulados",
    r: "Especialistas listam sinais que ajudam a reconhecer conteúdo falso.",
    img: img("photo-1633265486064-086b219458ec"),
    d: "16 out 2026",
    h: "13:40"
  },
  {
    id: 11,
    cat: "Tecnologia",
    t: "Tradução automática em Libras ganha novos recursos",
    r: "Avatares 3D ficam mais expressivos e ampliam o vocabulário.",
    img: img("photo-1531482615713-2afd69097998"),
    d: "16 out 2026",
    h: "08:15"
  },
  {
    id: 12,
    cat: "Saúde",
    t: "Hospitais usam IA para prever lotação de emergências",
    r: "Modelos preditivos ajudam a organizar equipes e leitos.",
    img: img("photo-1519494026892-80bbd2d6fd0d"),
    d: "15 out 2026",
    h: "17:50"
  }
];

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
  // Lê o endereço da página
  const caminho = decodeURIComponent(
    location.hash.replace(/^#\/?/, "")
  );

  const p = caminho.split("/");

  // Esconde todas as páginas
  document.querySelectorAll(".page").forEach(pagina => {
    pagina.classList.remove("active");
  });

  // Atualiza o menu
  document.querySelectorAll("nav a").forEach(link => {
    const rota = link.dataset.r || "";

    const categoriaAtual =
      p[0] === "categoria" ? p[1] : "";

    link.classList.toggle(
      "active",
      rota === categoriaAtual && p[0] === "categoria" ||
      rota === "" && p[0] !== "categoria"
        && p[0] !== "noticia"
        && p[0] !== "verificar"
        && p[0] !== "sobre"
    );
  });

  // Fecha o menu de celular
  const nav = $("#nav");

  if (nav) {
    nav.classList.remove("open");
  }

  document.title = "IA em Foco — Notícias sobre Inteligência Artificial";

  // Abre a página correspondente
  if (p[0] === "categoria") {
    renderCat(p[1] || "Todas");

    $("#p-cat")?.classList.add("active");

  } else if (p[0] === "noticia") {
    renderArt(p[1]);

    $("#p-art")?.classList.add("active");

  } else if (p[0] === "verificar") {
    $("#p-ver")?.classList.add("active");

  } else if (p[0] === "sobre") {
    $("#p-sobre")?.classList.add("active");

  } else {
    $("#p-home")?.classList.add("active");
  }

  window.scrollTo(0, 0);
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

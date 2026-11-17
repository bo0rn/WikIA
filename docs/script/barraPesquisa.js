// ! Busca o ID da input da barra de pesquisa no index.html
const searchInput = document.getElementById('searchInput');

// * Função para normalizar o texto, removendo acentos e convertendo para minúsculas
const normalizar = texto =>
    texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

// ! Adiciona um evento para capturar o valor digitado e tranformar ele em letras minusculas
searchInput.addEventListener('input', function() {
    const pesquisa = normalizar(searchInput.value.trim());
    const titulo = document.getElementById("cat-title");
    const grade = document.getElementById("cat-grid");

    // * Se a barra de pesquisa estiver vazia, redireciona para a página inicial ou exibe a página inicial
    if (pesquisa === "") {
        if (window.location.hash) {
            window.location.hash = "#/";
        } else {
            window.WikIAMotion?.showPage(document.getElementById("p-home"));
        }
        return;
    }

    // * Função para realizar busca completa sobre titulo, resumo, categoria e conteúdo da notícia
    const resultados = NEWS.filter(noticia => {
        const textoDaNoticia = `
            ${noticia.t}
            ${noticia.r}
            ${noticia.cat}
            ${noticia.conteudoHtml}
        `;

        // * Filtra as notícias com base na pesquisa, puxando apenas as que correspondem ao valor digitado na barra de pesquisa
        return normalizar(textoDaNoticia).includes(pesquisa);
    });

    // * Seleciona a div "cat-grid", onde os resultados da pesquisa serão exibidos
    grade.innerHTML = resultados.length
        ? resultados.map(noticia => card(noticia)).join("")
        : "<p>Nenhuma notícia encontrada.</p>";

    if (window.WikIAMotion) {
        window.WikIAMotion.showPage(document.getElementById("p-cat"));
    } else {
        document.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active");
        });

        document.getElementById("p-cat").classList.add("active");
    }

    // * Atualiza o título da categoria para exibir os resultados da pesquisa
    titulo.textContent = `Resultados para: ${searchInput.value}`;
});
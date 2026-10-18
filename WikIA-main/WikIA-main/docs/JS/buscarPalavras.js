// Define a constate que puxa o input de pesquisa pelo seu ID
const searchInput = document.getElementById('searchInput');

// Seleciona todos os elementos de texto (h1 a h6 e p) dentro de qualquer bloco .text-box
const searchText = 'h1, h2, h3, h4, h5, h6, p';
const buscarElementos = Array.from(document.querySelectorAll(`.text-box ${searchText}`));

// Salvar o texto original de cada elemento encontrado
const originalTexto = buscarElementos.map(el => el.textContent);

// Função de normalização para ignorar acentos e letras maiúsculas/minúsculas
function normalize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Função auxiliar para escapar caracteres especiais de Regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Evento de input na barra de pesquisa
searchInput.addEventListener('input', () => {
    const term = normalize(searchInput.value.trim());

    buscarElementos.forEach((el, index) => {
        let original = originalTexto[index];
        
        if (term === "") {
            el.innerHTML = original;
            return;
        }

        const safeTerm = escapeRegExp(term);
        const regex = new RegExp(`(${safeTerm})`, 'gi');
        
        // Aplica o destaque mantendo o texto original intacto visualmente
        const highlighted = original.replace(regex, match => `<span class="highlight">${match}</span>`);
        el.innerHTML = highlighted;
    });
});
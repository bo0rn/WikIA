// !BARRA DE PESQUISA

const searchInput = document.getElementById("search-input"); // *Define a constante searchInput para o elemento ID do HTML "search-input"
const blocosConteudo = document.querySelectorAll(".bloco-conteudo"); // *Define a constante blocosConteudo para todos os elementos com a classe "bloco-conteudo" no HTML

console.log("Input encontrado:", searchInput);
console.log("Blocos encontrados:", blocosConteudo);
console.log("Quantidade de blocos:", blocosConteudo.length);

// !FUNÇÂO DE FORMATAÇÃO DE STRING

function formatString(value) {
    const textoFormatado = value
        .toLowerCase()
        .trim();

    return textoFormatado;
}

// !FUNÇÃO QUE DESTACA AS PALAVRAS CHAVES

function destacarPalavra(bloco, consulta) {
    const textoOriginal = bloco.innerHTML;

    const consultaEscapada = consulta.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );


    const regex = new RegExp(
        `(${consultaEscapada})`,
        "gi"
    );


    const novoHTML = textoOriginal.replace(
        regex,
        '<span class="highlight">$1</span>'
    );


    bloco.innerHTML = novoHTML;

    console.log("HTML depois do destaque:", bloco.innerHTML);
}

// !FUNÇÃO QUE REMOVE MARCADOR DE DESTAQUE PARA PALAVRAS CHAVES

function removerDestaques() {
    const destaques = document.querySelectorAll(".highlight");

    destaques.forEach((destaque) => {

        destaque.replaceWith(destaque.textContent);

    });
}

// =====================================================
// EVENTO DE PESQUISA
// =====================================================

searchInput.addEventListener("input", (event) => {


    console.log("EVENTO DE INPUT ACIONADO");

    const valorOriginal = event.target.value;

    console.log("Valor original:", valorOriginal);

    const consulta = formatString(valorOriginal);

    console.log("Consulta final:", consulta);


    // =================================================
    // ETAPA 3 - REMOVER DESTAQUES ANTIGOS
    // =================================================

    removerDestaques();


    // =================================================
    // ETAPA 4 - CONSULTA VAZIA
    // =================================================

    if (consulta === "") {

        console.log("Consulta vazia.");
        console.log("Mostrando todos os blocos.");

        blocosConteudo.forEach((bloco) => {
            bloco.style.display = "";
        });

        return;
    }


    // =================================================
    // ETAPA 5 - PROCURAR RESULTADOS
    // =================================================

    let resultadosEncontrados = 0;
    let primeiroResultado = null;


    blocosConteudo.forEach((bloco, index) => {

        console.log(`\nAnalisando bloco ${index + 1}`);


        // =================================================
        // ETAPA 6 - PEGAR TEXTO DO BLOCO
        // =================================================

        const textoBloco = formatString(bloco.textContent);

        console.log(
            `Texto formatado do bloco ${index + 1}:`,
            textoBloco
        );


        // =================================================
        // ETAPA 7 - VERIFICAR CORRESPONDÊNCIA
        // =================================================

        const encontrou = textoBloco.includes(consulta);

        console.log(
            `A consulta "${consulta}" existe no bloco ${index + 1}?`,
            encontrou
        );


        // =================================================
        // ETAPA 8 - MOSTRAR / ESCONDER
        // =================================================

        if (encontrou) {

            console.log(
                `Bloco ${index + 1}: RESULTADO ENCONTRADO`
            );

            bloco.style.display = "";

            resultadosEncontrados++;


            // Guarda o primeiro resultado
            if (!primeiroResultado) {

                primeiroResultado = bloco;

                console.log(
                    "Primeiro resultado encontrado:",
                    primeiroResultado
                );
            }


            // =================================================
            // ETAPA 9 - DESTACAR PALAVRA
            // =================================================

            destacarPalavra(bloco, consulta);

        } else {

            console.log(
                `Bloco ${index + 1}: nenhum resultado`
            );

            bloco.style.display = "none";
        }

    });


    // =================================================
    // ETAPA 10 - RESULTADO FINAL
    // =================================================

    console.log("-----------------------------------------");
    console.log("PESQUISA FINALIZADA");
    console.log("Consulta:", consulta);
    console.log(
        "Resultados encontrados:",
        resultadosEncontrados
    );


    // =================================================
    // ETAPA 11 - ROLAR ATÉ O PRIMEIRO RESULTADO
    // =================================================

    if (primeiroResultado) {

        console.log("Rolando até o primeiro resultado...");

        primeiroResultado.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    } else {

        console.log("Nenhum resultado encontrado.");

    }


    console.log("-----------------------------------------");

});

// !BOTÕES DE NAVEGAÇÃO (CIMA/BAIXO)

const btnSubir = document.getElementById("btn-cima");
const btnDescer = document.getElementById("btn-baixo");

const btnNav = document.addEventListener("click", (event) => {

}

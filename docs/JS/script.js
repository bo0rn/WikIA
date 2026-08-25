import { OpenAI } from "openai";

/* API de IA */
const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: "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",
});

const chatCompletion = await client.chat.completions.create({
	model: "Qwen/Qwen3.8-27B:featherless-ai",
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "Describe this image in one sentence.",
                },
                {
                    type: "image_url",
                    image_url: {
                        url: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
                    },
                },
            ],
        },
    ],
});

console.log(chatCompletion.choices[0].message);

/* configuração do botão */
const botao = document.getElementById('but-inicial');
botao.addEventListener('click', function() {
    window.location.href = 'hist.ia.html';
});

async function enviarTexto () {
    
}
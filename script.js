const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const telaInterativa = document.getElementById("tela-interativa");
const telaQuiz = document.getElementById("tela-quiz");
const btnIniciar = document.getElementById("btn-iniciar");
const barraProgresso = document.getElementById("barra-progresso");
const imagemCard = document.getElementById("imagem-card");

// Lista de imagens para alternar conforme o avanço das perguntas
const imagensEtapas = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // Intro
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", // Q1
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // Q2
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // Q3
    "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80", // Final
];

const perguntas = [
    {
        enunciado: "Assim que saiu da escola você se depara com uma nova tecnologia: um chat que consegue responder todas as dúvidas humanas.",
        alternativas: [
            {
                texto: "Isso é assustador!",
                afirmacao: "No início ficou com medo do impacto e do controle que a IA pode exercer."
            },
            {
                texto: "Isso é maravilhoso!",
                afirmacao: "Quis saber de imediato como usar a IA para potencializar seu dia a dia."
            }
        ]
    },
    {
        enunciado: "Com a descoberta desta tecnologia, uma professora de tecnologia da escola resolveu fazer uma sequência de aulas sobre IA. Qual atitude você toma?",
        alternativas: [
            {
                texto: "Utiliza uma ferramenta de busca com IA para pesquisas rápidas e úteis.",
                afirmacao: "Conseguiu utilizar a IA como ferramenta complementar de pesquisa."
            },
            {
                texto: "Escreve o trabalho apenas conversando com a IA e adaptando o texto.",
                afirmacao: "Sentiu facilidade em automatizar a escrita utilizando recursos gerativos."
            }
        ]
    },
    {
        enunciado: "Após a elaboração do trabalho, a professora realizou um debate entre a turma sobre o futuro do trabalho com a IA. Qual a sua posição?",
        alternativas: [
            {
                texto: "Defende que a IA cria novas oportunidades de emprego e aprimora habilidades.",
                afirmacao: "Vem impulsionando a inovação e o aprendizado contínuo com tecnologia."
            },
            {
                texto: "Preocupa-se com o desemprego gerado pela automação.",
                afirmacao: "Motivou a criação de grupos de debate sobre a ética e proteção aos trabalhadores."
            }
        ]
    },
    {
        enunciado: "Ao final da discussão, você precisou criar uma imagem no computador que representasse o futuro da tecnologia.",
        alternativas: [
            {
                texto: "Criar uma imagem utilizando uma plataforma tradicional de design (Paint/Photoshop).",
                afirmacao: "Manteve o foco no desenvolvimento de habilidades artísticas tradicionais."
            },
            {
                texto: "Criar uma imagem utilizando um gerador de imagens por IA.",
                afirmacao: "Acelerou a produção criativa utilizando geradores automatizados de imagem."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

// Evento para iniciar a apresentação/demonstração
btnIniciar.addEventListener("click", () => {
    telaInterativa.classList.add("esconde");
    telaQuiz.classList.remove("esconde");
    mostraPergunta();
});

function atualizaProgresso() {
    const porcentagem = ((atual) / perguntas.length) * 100;
    barraProgresso.style.width = `${porcentagem}%`;
    if (imagensEtapas[atual]) {
        imagemCard.src = imagensEtapas[atual];
    }
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    atualizaProgresso();
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.innerHTML = `<i class="fa-solid fa-chevron-right"></i> ${alternativa.texto}`;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    barraProgresso.style.width = "100%";
    imagemCard.src = imagensEtapas[imagensEtapas.length - 1];
    caixaPerguntas.textContent = "";
    telaQuiz.classList.add("esconde");
    caixaResultado.classList.remove("esconde");
    textoResultado.textContent = historiaFinal;
}

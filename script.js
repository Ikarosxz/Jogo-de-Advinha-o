// 5.1 Array de palavras (array de objetos: palavra + dica)
const palavras = [
  { texto: "javascript", dica: "Linguagem que controla o comportamento da página" },
  { texto: "html", dica: "Linguagem que define a estrutura da página" },
  { texto: "css", dica: "Linguagem usada para estilizar a página" },
  { texto: "internet", dica: "Rede mundial de computadores" },
  { texto: "navegador", dica: "Programa usado para abrir sites" },
  { texto: "programacao", dica: "Arte de escrever instruções para o computador" },
  { texto: "computador", dica: "Máquina que executa programas" },
  { texto: "github", dica: "Plataforma para armazenar código online" },
  { texto: "repositorio", dica: "Pasta online onde o projeto fica guardado" },
  { texto: "variavel", dica: "Espaço nomeado que guarda um valor" },
  { texto: "funcao", dica: "Bloco de código que pode ser chamado várias vezes" },
  { texto: "algoritmo", dica: "Sequência de passos para resolver um problema" }
];

const MAX_TENTATIVAS = 6;

// 5.3 Estado do jogo
let palavraSecreta;
let dicaAtual;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = MAX_TENTATIVAS;
let jogoAcabou = false;
let partidas = 0;
let vitorias = 0;
let derrotas = 0;

// 6. DOM
const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const elementoDica = document.getElementById("dica");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");
const elementoPartidas = document.getElementById("partidas");
const elementoVitorias = document.getElementById("vitorias");
const elementoDerrotas = document.getElementById("derrotas");

// 5.4 Iniciar (ou reiniciar) uma partida
function iniciarJogo() {
  const indice = Math.floor(Math.random() * palavras.length);
  palavraSecreta = palavras[indice].texto;
  dicaAtual = palavras[indice].dica;
  tentativas = MAX_TENTATIVAS;
  letrasCorretas = [];
  letrasUsadas = [];
  jogoAcabou = false;

  elementoDica.textContent = "Dica: " + dicaAtual;
  mensagem.textContent = "Bem-vindo ao jogo!";
  mensagem.className = "";
  elementoTentativas.textContent = tentativas;
  elementoLetrasUsadas.textContent = "";
  inputLetra.value = "";
  inputLetra.disabled = false;
  botaoTentar.disabled = false;
  atualizarPalavra();
  inputLetra.focus();
}

// 7.1 Mostrar a palavra com traços nas letras ainda não descobertas
function atualizarPalavra() {
  let exibicao = "";
  for (let i = 0; i < palavraSecreta.length; i++) {
    const letra = palavraSecreta[i];
    if (letrasCorretas.includes(letra)) {
      exibicao += letra + " ";
    } else {
      exibicao += "_ ";
    }
  }
  elementoPalavra.textContent = exibicao;
}

// 9. Verificar vitória
function venceu() {
  for (let i = 0; i < palavraSecreta.length; i++) {
    const letra = palavraSecreta[i];
    if (!letrasCorretas.includes(letra)) {
      return false;
    }
  }
  return true;
}

function atualizarPlacar() {
  elementoPartidas.textContent = partidas;
  elementoVitorias.textContent = vitorias;
  elementoDerrotas.textContent = derrotas;
}

function encerrarJogo() {
  jogoAcabou = true;
  partidas++;
  inputLetra.disabled = true;
  botaoTentar.disabled = true;
  atualizarPlacar();
}

// 8.1 Processar uma tentativa
function verificarLetra() {
  if (jogoAcabou) {
    return;
  }

  const letra = inputLetra.value.toLowerCase();

  if (letra === "") {
    mensagem.textContent = "Digite uma letra.";
    mensagem.className = "erro";
    return;
  }

  if (!/^[a-z]$/.test(letra)) {
    mensagem.textContent = "Use apenas letras de A a Z (sem acento).";
    mensagem.className = "erro";
    inputLetra.value = "";
    return;
  }

  if (letrasUsadas.includes(letra)) {
    mensagem.textContent = "Letra já utilizada.";
    mensagem.className = "erro";
    inputLetra.value = "";
    return;
  }

  letrasUsadas.push(letra);

  if (palavraSecreta.includes(letra)) {
    letrasCorretas.push(letra);
    mensagem.textContent = "Você acertou!";
    mensagem.className = "acerto";
  } else {
    tentativas--;
    mensagem.textContent = "Você errou!";
    mensagem.className = "erro";
    // efeito visual simples de erro
    elementoPalavra.classList.remove("tremer");
    void elementoPalavra.offsetWidth; // reinicia a animação
    elementoPalavra.classList.add("tremer");
  }

  atualizarPalavra();
  elementoTentativas.textContent = tentativas;
  elementoLetrasUsadas.textContent = letrasUsadas.join(", ");
  inputLetra.value = "";

  if (venceu()) {
    mensagem.textContent = "Parabéns! Você venceu!";
    mensagem.className = "acerto";
    vitorias++;
    encerrarJogo();
  } else if (tentativas === 0) {
    mensagem.textContent = "Você perdeu! A palavra era " + palavraSecreta;
    mensagem.className = "erro";
    derrotas++;
    encerrarJogo();
  } else {
    inputLetra.focus();
  }
}

// 8. Eventos
botaoTentar.addEventListener("click", verificarLetra);

// Desafio extra: enviar com Enter
inputLetra.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    verificarLetra();
  }
});

// 10. Nova partida
botaoReiniciar.addEventListener("click", iniciarJogo);

iniciarJogo();

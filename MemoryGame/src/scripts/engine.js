// Array de emojis que serão usados no jogo de memória
const emojis = [
    "🐲", "🐲", "🦄", "🦄", "🦊", "🦊", "🦝", "🦝",
    "👾", "👾", "🤖", "🤖", "☠", "☠", "🐱‍💻", "🐱‍💻"
];

// Array para rastrear cartas abertas durante o jogo
let openCards = [];

// Embaralha os emojis para distribuir nas cartas do jogo
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// Cria as cartas no tabuleiro do jogo
for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

// Função chamada quando uma carta é clicada
function handleClick() {
    // Verifica se o número de cartas abertas é menor que 2 e se não tem a classe boxMatch
    if (openCards.length < 2  && !this.classList.contains("boxMatch")) {
        // Adiciona a classe que abre a carta
        this.classList.add("boxOpen");
        // Adiciona a carta ao array de cartas abertas
        openCards.push(this);
    }
    // Quando duas cartas estão abertas, verifica a correspondência após um breve intervalo
    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Função para verificar se as duas cartas abertas são correspondentes
function checkMatch() {
    // Compara o conteúdo das duas cartas abertas
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        // Se correspondem, adiciona a classe que indica a correspondência
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        // Se não correspondem, remove a classe que abre as cartas
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    // Limpa o array de cartas abertas para a próxima jogada
    openCards = [];

    // Verifica se todas as cartas foram correspondidas (se o jogo foi vencido)
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("Você venceu!!!");
    }
}

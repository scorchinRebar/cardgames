const ranks = ["9", "10", "Jopek", "Queen", "King", "Ace"];
const suits = ["kier", "kara", "trefl", "pik"];

const cardValues = {
    "9": 0,
    "10": 10,
    "Jopek": 2,
    "Queen": 3,
    "King": 5,
    "Ace": 11
};

const synergyValues = {
    "pik": 10,
    "trefl": 20,
    "kara": 30,
    "kier": 40
};

const output = document.getElementById("output");
const mobileButton = document.getElementById("mobileButton");

function clearScreen() {
    output.innerHTML = "";
}

function print(text) {
    const div = document.createElement("div");
    div.textContent = text;
    output.appendChild(div);
}

function rollCards() {
    clearScreen();

    const amount = Math.floor(Math.random() * 4) + 1;
    print(`Ilość wylosowanych kart: ${amount}`);

    const rolled = [];
    for (let i = 0; i < amount; i++) {
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        rolled.push([rank, suit]);
        print(` - ${rank} ${suit}`);
    }

    let totalScore = 0;
    let synergyScore = 0;

    const suitsInCards = {};
    for (const [rank, suit] of rolled) {
        if (!suitsInCards[suit]) suitsInCards[suit] = [];
        suitsInCards[suit].push(rank);
    }

    const synergySuits = [];
    for (const suit in suitsInCards) {
        const ranksHere = suitsInCards[suit];
        if (ranksHere.includes("King") && ranksHere.includes("Queen")) {
            synergySuits.push(suit);
            synergyScore += synergyValues[suit];
        }
    }

    for (const [rank, suit] of rolled) {
        if (synergySuits.includes(suit) && (rank === "King" || rank === "Queen")) {
            continue;
        }
        totalScore += cardValues[rank];
    }

    totalScore += synergyScore;

    if (synergySuits.length > 0) {
        print("");
        print("*** SYNERGIA! ***");
        synergySuits.forEach(suit => {
            print(` - ${suit}: +${synergyValues[suit]} pkt`);
        });
    } else {
        print("");
        print("Nie było synergii w tej turze.");
    }

    print("");
    print(`Łączny wynik oponenta: ${totalScore}`);
    print("");
    print("Naciśnij SPACJĘ lub TAPNIJ aby kontynuować");
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        rollCards();
    }
});

mobileButton.addEventListener("click", () => {
    rollCards();
});

clearScreen();
print("Naciśnij SPACJĘ lub TAPNIJ aby rozpocząć");

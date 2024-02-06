// On récupère l'élément #board
const board = document.querySelector("#board");

// On crée une box avec la class "carree"
const box = document.createElement("div")
box.classList.add("carree")

// On récupère le texte de base dans le DOM
let phrase = document.querySelector(".phrase")

// On récupère les span du DOM pour la gestions du score
let scoreX = document.getElementById("scoreX")
let scoreO = document.getElementById("scoreO")
let nbScoreX = 0;
let nbScoreO = 0;

// On déclare une variable qui va définir si on joue un X ou un O (1 - X 2 - O)
let count = 1;


// On count le nombre total de coup joué
let countTotal = 0;

// Function tictactoe 
function tictactoe(box) {
    if (countTotal < 9) {
        if (count === 1 && box.textContent === "") { // Si count = 1 et texte vide alors :
            box.textContent = "X"; // ecris X
            box.classList.add("croix"); // Rajoute la classe croix
            count++; // Passe le count à 2 pour dire que c'est au O de jouer
            countTotal++; // Nombre total de coup jouer
        } else if (count === 2 && box.textContent === "") { 
            box.textContent = "O";
            box.classList.add("rond");
            count--;
            countTotal++;
        } else { 
            showReaction("clicked", box); // Si la case est déjà jouer, alors modifie le fond en rouge
        }
    }
}

function victoire() { // Gestion de la victoire
    const lines = [
        [1, 2, 3], // lignes horizontales
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7], // lignes verticales
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9], // diagonales
        [3, 5, 7]
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        const boxA = document.querySelector(`.box_${a}`);
        const boxB = document.querySelector(`.box_${b}`);
        const boxC = document.querySelector(`.box_${c}`);

        if (boxA.textContent !== "" && boxA.textContent === boxB.textContent && boxB.textContent === boxC.textContent) {
            // Si il y a une victoire, ajoute la classe "green" au element gagnant
            boxA.classList.add("green")
            boxB.classList.add("green")
            boxC.classList.add("green")

            return true;
        }
    }

    return false; // Pas de victoire
}

// Function qui va gerer le texte en dessous de la partie
function phrases(text) {
    if (victoire()) { // Si la function victoire est "true" alors
        text.textContent = `Joueur ${count === 1 ? 'O' : 'X'} remporte la partie !`;
        board.classList.add("fin"); // Class fin qui, en CSS, desactive le jeu

        if(count === 2) {
            nbScoreX++
            scoreX.textContent = nbScoreX;
        }
        else {
            nbScoreO++
            scoreO.textContent = nbScoreO;
        }
    }
    
    else if (countTotal === 9) { // Si le nombre total de coup est joué, alors fin de la partie.
        text.textContent = "Fin de la partie !"
    }
    else if (count === 1) { // Sinon si count = 1 alors X
        text.textContent = "C'est au tour des : X"
    }
    else { // Sinon par defaut ça sera O
        text.textContent = "C'est au tour des : O"
    }
}

// Function pour reset la partie et recommencer à jouer 
function partieReset(parent) {

    parent.querySelectorAll(".carree").forEach(function (validBox) {

        // On retire toutes les class
        board.classList.remove("fin");
        validBox.classList.remove("croix");
        validBox.classList.remove("rond");
        validBox.classList.remove("green");
        validBox.textContent = "";

        count = 1;
        countTotal = 0;
    });
}

function showReaction(type, clickedBox) {
    clickedBox.classList.add(type);
    if (type === "clicked") {
        setTimeout(function () {
            clickedBox.classList.remove(type);
        }, 800);
    }
}

// On crée une boucle qui permettra de crée le nombre de box que l'ont souhaite (ici 9)
for (let i = 1; i <= 9; i++) {
    const newBox = box.cloneNode(); // Clone des divs
    newBox.textContent = ""; // Texte vide
    newBox.classList.add(["box_" + i])
    board.appendChild(newBox);

    newBox.addEventListener("click", function() {
        tictactoe(newBox); // Au click on call la function tictactoe
        phrases(phrase); // Et on change la phrase
    });
}

// On crée un event ici au click du bouton recommencer pour reset la partie
recommencerBtn.addEventListener("click", function () {
    partieReset(board);
    phrases(phrase);
});
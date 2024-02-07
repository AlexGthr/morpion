// On récupère l'élément #board
const board = document.querySelector("#board");

// On crée une box avec la class "carree"
const box = document.createElement("div")
box.classList.add("carree")

// On récupère le texte de base dans le DOM
let phraseJoueurUn = document.getElementById("resultatJoueurUn")
let phraseJoueurDeux = document.getElementById("resultatJoueurDeux")

// On récupère les span du DOM pour la gestions du score
let scoreX = document.getElementById("scoreX")
let scoreO = document.getElementById("scoreO")
let nbScoreX = 0;
let nbScoreO = 0;

// On déclare une variable qui va définir si on joue un X ou un O (1 - X 2 - O)
let count = 1;

// On count le nombre total de coup joué
let countTotal = 0;

// Je récupère mes box et nomJoueur 
let boxJoueurUn = document.getElementById("boxJoueurUn")
let boxJoueurDeux = document.getElementById("boxJoueurDeux")

let nomJoueurUn = document.getElementById("nomJoueurUn")
let nomJoueurDeux = document.getElementById("nomJoueurDeux")

let inputJoueurUn = document.getElementById("inputJoueurUn")
let inputJoueurDeux = document.getElementById("inputJoueurDeux")

let popUp = document.querySelector(".popupConfigJeu")
let popUpform = document.querySelector(".pop")

let submit = document.getElementById("submitNomJoueur")
let changeNom = document.getElementById("changerNom")

let resetScore = document.getElementById("resetScore")


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
function phrases(textun, textdeux) {
    if (victoire()) { // Si la function victoire est "true" alors
        
        board.classList.add("fin"); // Class fin qui, en CSS, desactive le jeu
        
        if(count === 2) {
            nbScoreX++
            scoreX.textContent = nbScoreX;
            textun.textContent = `${inputJoueurUn.value} remporte la partie !`;
            boxJoueurUn.classList.remove("tour")
            boxJoueurUn.classList.add("victoire")
        }
        else {
            nbScoreO++
            scoreO.textContent = nbScoreO;
            textdeux.textContent = `${inputJoueurDeux.value} remporte la partie !`;
            boxJoueurDeux.classList.remove("tour")
            boxJoueurDeux.classList.add("victoire")
        }
    }
    
    else if (countTotal === 9) { // Si le nombre total de coup est joué, alors fin de la partie.
        textun.textContent = "Fin de la partie ! Match nul !"
        textdeux.textContent = "Fin de la partie ! Match nul !"
        boxJoueurUn.classList.remove("tour")
    }
    else if (count === 1) { // Sinon si count = 1 alors X
        boxJoueurUn.classList.add("tour")
        boxJoueurDeux.classList.remove("tour")
        textun.textContent = "Votre tour !"
        textdeux.textContent = "  "
    }
    else if (count === 2) { // Sinon par defaut ça sera O
        boxJoueurUn.classList.remove("tour")
        boxJoueurDeux.classList.add("tour")
        textun.textContent = "  "
        textdeux.textContent = "Votre tour !"
    } else {
        text.textContent = "probleme"
    }
}

// Function pour reset la partie et recommencer à jouer 
function partieReset(parent) {
    
    parent.querySelectorAll(".carree").forEach(function (validBox) {
        
        // On retire toutes les class
        board.classList.remove("fin");
        
        boxJoueurUn.classList.remove("tour");
        boxJoueurDeux.classList.remove("tour");
        boxJoueurUn.classList.remove("victoire");
        boxJoueurDeux.classList.remove("victoire");
        
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
        phrases(phraseJoueurUn, phraseJoueurDeux);// Et on change la phrase
    });
}

// On crée un event ici au click du bouton recommencer pour reset la partie
recommencerBtn.addEventListener("click", function () {
    partieReset(board);
    phrases(phraseJoueurUn, phraseJoueurDeux);
});

changeNom.addEventListener("click", (event) => {
    event.preventDefault();

    popUp.style.display = "inline";
})

submit.addEventListener("click", (event) => {

        event.preventDefault();

    if (inputJoueurUn.value !== inputJoueurDeux.value && inputJoueurUn.value !== "" && inputJoueurDeux.value !== "") {
        nomJoueurUn.textContent = inputJoueurUn.value
        nomJoueurDeux.textContent = inputJoueurDeux.value
        popUp.style.display = "none";
    } else if (inputJoueurUn === inputJoueurDeux) {
        popUpform.style.backgroundColor = "red";
    }
})

resetScore.addEventListener("click", function() {
    nbScoreO = 0
    nbScoreX = 0
    scoreO.textContent = "0"
    scoreX.textContent = "0"
})
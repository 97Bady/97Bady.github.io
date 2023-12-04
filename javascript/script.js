// Sélection du bouton
const changeColorBtn = document.getElementById('changeColorBtn');

// Ajout d'un écouteur d'événement au clic sur le bouton
/**
 * 
 * 
 *
 * @param   {[type]}  click     [click description]
 * @param   {[type]}  function  [function description]
 *
 * @return  {[type]}            [return description]
 */

changeColorBtn.addEventListener('click', function() {
    // Appel de la fonction pour changer la couleur de fond
    changeBackgroundColor();
});

// Fonction pour changer la couleur de fond
/**
 * 
 * 
 *
 * @return  {[type]}  [return description]
 */

function changeBackgroundColor() {
    // Génération d'une couleur aléatoire au format hexadécimal
    //MATH.random genere un nombre entre 0 et 1(exclu 1) mth.floor arondi le nombre et tostring converti en exadecimanl et associe #

    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    
    // Changement de la couleur de fond de la page (recupere l element du dom)
    document.body.style.backgroundColor = randomColor;
}




// Classe Question
class Question {
  constructor(text, choices, answer) {
    this.text = text; // Texte de la question
    this.choices = choices; // Options de réponse
    this.answer = answer; // Réponse correcte
  }

  // Vérifie si la réponse donnée est correcte
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

// Tableau de questions
let questions = [
  new Question("Quelle est la capitale de l'Espagne ?", ["Lisbonne", "Barcelone", "Madrid", "Rome"], "Madrid"),
  new Question("Qui a écrit 'Roméo et Juliette' ?", ["William Shakespeare", "Jane Austen", "Victor Hugo", "F. Scott Fitzgerald"], "William Shakespeare"),
  new Question("Quel est le plus grand océan du monde ?", ["Océan Atlantique", "Océan Arctique", "Océan Indien", "Océan Pacifique"], "Océan Pacifique"),
  new Question("Combien de planètes gravitent autour du soleil dans notre système solaire ?", ["6", "8", "10", "12"], "8"),
  new Question("Quel est le plus long fleuve du monde ?", ["Nil", "Mississippi", "Amazone", "Yangtsé"], "Amazone"),
  new Question("Quel quelle est la capitale du cameroun?", ["Yaounde","Dakar", "Tokio", "Dubai"], "Montreal")
];

// Classe Quiz
class Quiz {
  constructor(questions) {
    this.score = 0; // Score du joueur
    this.questions = questions; // Tableau de questions
    this.currentQuestionIndex = 0; // Index de la question actuelle
  }

  // Récupère la question actuelle
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // Vérifie la réponse et met à jour le score
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }

  // Vérifie si le quiz est terminé
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  // Obtient la récompense en fonction du score
  /**
   * [getReward description]
   *
   * @return  {[type]}  [return description]
   */
  
  getReward() {
    if (this.score >= 4) {
      return { image: "./javascript/image/bronze.jpg", message: "Félicitations, vous avez gagné la médaille d'or!" };
    } else if (this.score >=3) {
      return { image: "./javascript/image/dimen.jpg", message: "Bien joué, vous avez gagné la médaille d'argent!" };
    } else if (this.score === 2) {
      return { image: "./javascript/image/or.jpg", message: "Bravo, vous avez gagné la médaille de bronze!" };
    } else {
      return { image: "./javascript/image/quiz.jpeg", message: "Vous n'avez pas atteint le seuil minimum, essayez de nouveau!" };
    }
  }
}

// Objet d'affichage
const display = {
  // Affiche du contenu dans un élément HTML avec l'ID spécifié
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  // Affiche l'écran de fin de quiz avec la récompense

  /**
   * [endQuiz description]
   *
   * @return  {[type]}  [return description]
   */
  endQuiz: function() {
    const start = document.getElementById("myButton");
    const reward = quiz.getReward();
    endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
      <img src="${reward.image}" alt="Récompense" style="width: 200px; height: 200px;"> 
     
      <p>${reward.message}</p>`;
    this.elementShown("quiz", endQuizHTML);
start.style.visibility = 'visible';
start.style.color = "red";
start.style.backgroundColor ="black";


  },

  // Affiche la question actuelle
  question: function() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },

  // Affiche les options de réponse
  choices: function() {
    let choices = quiz.getCurrentQuestion().choices;
    guessHandler = (id, guess) => {
      // Définit le gestionnaire de clic pour la réponse
      document.getElementById(id).onclick = function() {
        quiz.guess(guess);
        quizApp();
      };
    };

    // Affiche les boutons de réponse et définit les gestionnaires de clic
    for(let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },

  // Affiche la progression du quiz
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  },
};

// Logique du jeu
const quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};

// Fonction de démarrage du jeu
function startGame() {
  // Ajoute un écouteur d'événement pour rediriger vers la page du jeu
  document.getElementById('startButton').addEventListener('click', redirectToGame);

}

// Gestionnaire d'événements pour rediriger vers la page du jeu
function redirectToGame() {
  window.location.href = 'game.html';
}

// Création du Quiz
let quiz = new Quiz(questions);

// Appel initial de la logique du jeu
quizApp();

// Appel de la fonction de démarrage du jeu
/**
 * [startGame description]
 *
 * @return  {[type]}  [return description]
 */
startGame();

//recommencet le jeux
/**
 * [reload description]
 *
 * @return  {[type]}  [return description]
 */
function reload(){
  location.reload();
}











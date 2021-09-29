//importing readLineSync package & chalk
var readlineSync = require("readline-sync");
var chalk = require('chalk');

console.log(chalk.hex(`#29edc0`).bgBlack.italic("-----Food Trivia----\n"));

var score = 0;

var highscore =[{
  name:"R",
  score: "15",
},{
  name: "S",
  score: "12",
},{
  name: "T",
  score: "10",
}
]

var levelOne = [
{
    question: "enjoyed in summer, yogurt-based",
    choice: ["aam-panna", "mango lassi", "pineapple lassi"],
    answer: 1
  }, {
    question: "gram flour(besan)-based, popular in UP & Bihar",
    choice: ["bael-sharbat", "matha", "sattu-sharbat"],
    answer: 2
  }, {
    question: "popular cooler, South-India",
    choice: ["lime-soda", "nannari sharbat", "solkadhi"],
    answer: 1
  }, {
    question: "made with nuts, seeds, spices",
    choice: ["thandai", "falooda", "khas khas sharbat"],
    answer: 0
  }, {
    question: "similar in color to rose-drink, jelly-like textured drink",
    choice: ["strawberry juice", "buransh", "kokam sharbat"],
    answer: 1
  },
];

var levelTwo = [
    {
    question: "herb used to alleviate nausea, vomitting etc",
    choice: ["ginger", "castor", "chia seeds"],
    answer: 0
  }, {
    question: "Indian Herb used to alleviate pain and improve mental health",
    choice: ["ginseng", "camphor", "basil"],
    answer: 1
  }, {
    question: "Indian herb to fight obesity",
    choice: ["garlic", "turmeric", "henna"],
    answer: 1
  }, {
    question: "herb used to fight skin ailments like haemorraging",
    choice: ["camphor", "turmeric", "henna"],
    answer: 2
  }, {
    question: "herb used to reduce muscle spasm",
    choice: ["chia seeds", "castor", "saffron"],
    answer: 2
  },
];

var levelThree = [
    {
    question: "fruit named after indian sweet jalebi",
    choice: ["Tamarind(imli)", "Seemachintakai", "Pomegranate"],
    answer: 1
  }, {
    question: "used in jam-making, consumed in dry or fresh form, has many seeds, called nature's candy",
    choice: ["Strawberry", "Grapes", "Figs"],
    answer: 2
  }, {
    question: "sweet and tangy flavored, speciality of nilgiri hills",
    choice: ["Lotah", "Grapefruit", "Lychee"],
    answer: 0
  }, {
    question: "wild mango",
    choice: ["Umberella", "Indian hog plum", "Satluj purple Indian plum"],
    answer: 1
  }, {
    question: "good substitute of cranberries, purple-colored",
    choice: ["Karonda", "Mangustaan", "Jamun"],
    answer: 0
  }];

function hello(){
  //getting user's name
  console.log(chalk.hex('#9002c2')("Hola Foodie!! What's your name?"))
  var playerName = readlineSync.question();
  console.log(chalk.hex('#C302c2')(`Welcome to the Indian Food Trivia ${playerName}\n Game Play: \n\t There are 3 levels \n\t Each level has 5 questions \n\t Every right answer gives you 1 point\n\t Every wrong answer deducts 1/4 point\n\t Skipping question does not reduce your score. \n\t Get at least 2 points to clear level 1\n\t Get at least 6 points right (lvl 1 + lvl2) to clear level 2\n\t Final Score is cumulative of all 3 levels`));

    if (!readlineSync.keyInYN(`Press Y to continue`))process.exit();
    else {
      console.log(chalk.underline.hex(`#ff00cc`)("level one -- Indian Drinks"));
      callQuiz(levelOne);
      if(score > 0.40 * 5){
      console.log(chalk.underline.hex(`#ff00cc`)("level two -- Indian Herbs"));
      callQuiz(levelTwo);
      if(score > 0.60 * 10){
        console.log(chalk.underline.hex(`#ff00cc`)("level three -- Indian Fruits"));
        callQuiz(levelThree);
      }
    }
  }
  dispScore(playerName);
}

// calling quiz function for specified level
function callQuiz(level){
  for(var i = 0; i < level.length; i++){
    var result = quiz(level[i].question, level[i].choice, level[i].answer);
    if(result === 1)
      console.log(chalk.greenBright.bold("Yayy, Correct answer! you scored", chalk.whiteBright("1"), "point"));
    else if(result === 0)
      console.log(chalk.red("Oops, Wrong answer! you lost", chalk.whiteBright("0.25"), "points"));
    else if(result === -1)
      console.log(chalk.yellow("You skipped the question", chalk.whiteBright("0"), "points"))
    console.log(chalk.bgCyan.black("Current Score: ", score, "\n"));
 }
}

// function to quiz the player
function quiz(question, choice, answer){ 
 //getting user's answer
  var playerAnswer = readlineSync.keyInSelect(choice, question);
 //checkAnswer
  var check;
  if (playerAnswer === answer){
      check = 1;
      score++;
  }  else if(playerAnswer === -1){
      check = -1;
  }  else{
      check = 0;
      score -= 0.25; 
  }
  return check;
}

function dispScore(playerName){
  console.log("\n--------\n\n" + chalk.magenta.bold.bgWhite.underline("    ", playerName, "'s final score: ", score, "    ") + "   \n");
  console.log("\n--------\n" + chalk.magenta.bold.bgWhite.underline("Highscore:"));

  for(var i = 0; i < highscore.length; i++){
    console.log(i + 1, ". ",highscore[i].name," ", highscore[i].score);
  }

    for(var i = 0; i < highscore.length; i++){
    if(score > highscore[i].score){
        console.log(chalk.magenta(`\n\nWell Done ${playerName}!You have beaten position ${i+1} highscore. Plzz send a screenshot to Harshna so she can update the highscore list.`));
        break;
      }
  }
}

hello();

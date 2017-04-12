/**
 * Created by danielkuncik on 4/12/17.
 */

function madisonTest() {
    document.getElementById('putItHere').innerHTML = 'why he even brings the thunder';
}

// create a text box with a piece of text in it
function createTextBox(text, type) {
    var box = document.createElement(type);
    var textN = document.createTextNode(text);
    box.appendChild(textN);
    return box;
}

function isItInMe (element, array) {
    var j;
    for (j = 0; j < array.length; j++) {
        if (element === array[j]) {
            return true;
        }
    }
    return false;
}

function Quiz(name, level, maxScore, objective, topGrade, prerequisiteArray) {
    this.name = name;
    this.level = level;
    this.maxScore = maxScore;

    this.xPosition = 0;
    this.yPosition = 0;

    this.infoDiv = createTextBox(name, 'div');
}

function QuizMap(quizRaidus) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    c.setAttribute('class','quizMapCanvas');

    var htmlBreak = document.createElement('br');

    this.quizInfoDiv = document.createElement('div');
    this.quizInfoDivElement = createTextBox('   ','div');
    this.quizInfoDiv.appendChild(this.quizInfoDivElement);

    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.xOrigin = null;
    this.yOrigin = null;

    ctx.lineWidth = 2;
    ctx.lineCap = "butt";
    ctx.strokeStyle = "#000000";

    this.quizRadius = quizRaidus;

    this.verticalSpaceBetweenQuizzes = this.quizRadius * 3; // amount of hieght added for each new level
    this.horizontalSpaceBetweenQuizzes = this.quizRadius * 3;
    this.topSpace = this.quizRadius * 2;
    this.bottomSpace = this.quizRadius * 2;
    this.leftSpace = this.quizRadius * 2;
    this.rightSpace = this.quizRadius * 2;

    // array of all quizzes
    this.quizArray = [];
    this.Xdimension = 0;
    this.Ydimension = 0;

    // finds the number of levels (Y dimension) and maximum number of quizzes for a level (X dimension) for a given quiz Array
    this.findDimensions = function () {
        var levelCounter = {};
        var i;
        for (i = 0; i < this.quizArray.length; i++) {
            var levelKey = this.quizArray[i].level;
            if (isItInMe(String(levelKey), Object.keys(levelCounter))) { // for some reason the object turns it intoa  string
                levelCounter[levelKey] += 1;
                //document.getElementById('whatever').innerHTML = 'why he even brings the thunder';
            } else {
                levelCounter[levelKey] = 1;
            }
        }

        var maxForLevel = 0; // highest number of quizzes on any level
        var maxLevel = 0; // highest level in the set
        for (i = 0; i < Object.keys(levelCounter).length; i++) {
            var levelKey = Object.keys(levelCounter)[i];
            if (maxLevel < Number(levelKey)) {
                maxLevel = Number(levelKey);
            }
            if (maxForLevel < levelCounter[levelKey]) {
                maxForLevel = levelCounter[levelKey];
            }
        }

        // x and y dimensions
        this.Xdimension = maxForLevel - 1;
        this.Ydimension = maxLevel - 1;
    }


    this.drawQuizCircle = function (xPosition, yPosition, borderColor, fillColor) {
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'gray';

        ctx.moveTo(xPosition, yPosition);
        ctx.beginPath();
        ctx.arc(xPosition, yPosition, this.quizRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }



    this.setWidthAndHeight = function() {
        this.canvasWidth = this.rightSpace + this.leftSpace + this.Xdimension * this.horizontalSpaceBetweenQuizzes;
        this.canvasHeight = this.topSpace + this.bottomSpace + this.Ydimension * this.verticalSpaceBetweenQuizzes;

        c.setAttribute('width',this.canvasWidth);
        c.setAttribute('height',this.canvasHeight);

        this.xOrigin = this.leftSpace;
        this.yOrigin = this.canvasHeight - this.bottomSpace;
    }

    this.addQuiz = function (name, level, maxScore, objective, topGrade, prerequisiteArray) {

        this.quizArray.push(new Quiz(name, level, maxScore, objective, topGrade, prerequisiteArray));
        this.findDimensions();
        this.setWidthAndHeight();
        this.setQuizPositions();
    }
    // its inefficient to recalculate these things every time I add a new quiz,
    // but it's also the most careful way and feels like the cleaest code, and as it's only running 20-odd times I shouldn't
    // have a major runtime issue

    // sets position of each Quiz in the Quiz Array
    this.setQuizPositions = function() {
        var levelCounter2 = {};

// the first, simplest version will be just left, aligned quizzes
        for (i = 0; i < this.quizArray.length; i++) {
            var levelKey = this.quizArray[i].level;
            if (isItInMe(String(levelKey), Object.keys(levelCounter2))) { // for some reason the object turns it intoa  string
                levelCounter2[levelKey] += 1;
                //document.getElementById('whatever').innerHTML = 'why he even brings the thunder';
            } else {
                levelCounter2[levelKey] = 1;
            }

            this.quizArray[i].xPosition = this.leftSpace + (levelCounter2[levelKey] - 1) * this.horizontalSpaceBetweenQuizzes;
            this.quizArray[i].yPosition = this.canvasHeight - (levelKey -1 ) * this.verticalSpaceBetweenQuizzes - this.bottomSpace;
        }
    }

    // to run after all quizzes are added
    this.drawQuizMapCanvas = function () {
        var j;
        for (j = 0; j < this.quizArray.length; j++) {
            this.drawQuizCircle(this.quizArray[j].xPosition, this.quizArray[j].yPosition, 'red', 'red');
        }


        document.getElementById('putItHere').appendChild(c);
        document.getElementById('putItHere').appendChild(htmlBreak);
        document.getElementById('putItHere').appendChild(htmlBreak);
        document.getElementById('putItHere').appendChild(this.quizInfoDiv);

        // need to redefine all these things for the event listener
        var quizInfoArea = this.quizInfoDiv;
        var quizArray2 = this.quizArray;
        var quizInfoDivElement2 = this.quizInfoDivElement;
        var quizRadius2 = this.quizRadius;

        c.addEventListener('mousemove', function(event) {
            //  document.getElementById('whatever').innerHTML = typeof(quizInfoArea);
            //  var newText = createTextBox('hello','p');
            // this.quizInfoDiv.appendChild(newText);

            quizInfoArea.removeChild(quizInfoDivElement2);


            var x = event.pageX - c.offsetLeft,
                y = event.pageY - c.offsetTop;


            var distance, k;
            quizInfoDivElement2 = createTextBox('   ');
            for (k = 0; k < quizArray2.length; k++) {
                distance = Math.sqrt(Math.pow((x - quizArray2[k].xPosition),2) + Math.pow((y - quizArray2[k].yPosition),2));
                if (distance <= quizRadius2) {
                    quizInfoDivElement2 = quizArray2[k].infoDiv;
                    //resultDiv = quizArray[k].infoDiv;
                    //document.getElementById('whatever5').innerHTML = [x,y];
                }
            }

            quizInfoArea.appendChild(quizInfoDivElement2);

        }, false);


    }



}

function jeffersonTest () {

    var myQuizMap = new QuizMap(25);

    myQuizMap.addQuiz('Motion Equations 1',1,20);
    myQuizMap.addQuiz('Motion Equations 2',2,20);
    myQuizMap.addQuiz('Motion Equations 3',3,20);
    myQuizMap.addQuiz('Motion Equations 4',4,20);

    myQuizMap.addQuiz('Kinematic Graphs Qualitative 1',1,20);
    myQuizMap.addQuiz('Kinematic Graphs Qualitative 2',2,20);
    myQuizMap.addQuiz('Kinematic Graphs Qualitative 3',3,20);
    myQuizMap.addQuiz('Kinematic Graphs Qualitative 4',4,20);

    myQuizMap.addQuiz('Kinematic Graphs Quantitative 1',1,20);
    myQuizMap.addQuiz('Kinematic Graphs Quantitative 2',2,20);
    myQuizMap.addQuiz('Kinematic Graphs Quantitative 3',3,20);
    myQuizMap.addQuiz('Kinematic Graphs Quantitative 4',4,20);

    myQuizMap.addQuiz('Vectors and Scalars A',1,20);
    myQuizMap.addQuiz('Vectors and Scalars B',1,20);
    myQuizMap.addQuiz('Vectors and Scalars C',2,20);

    myQuizMap.drawQuizMapCanvas();


/// that should be all I need to convert it into a Ruby file???
}


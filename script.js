/* =====================================================
   UI ONLINE TYPING TEST
   MAIN TYPING SCRIPT
   ===================================================== */


/* =====================================================
   PASSAGES
   ===================================================== */

const passages = [

    "The quick brown fox jumps over the lazy dog. Learning to type quickly and accurately is an important computer skill. Practice every day to improve your typing speed.",

    "Typing is an important skill for students and professionals. Regular practice can help you increase your typing speed and accuracy. Keep your eyes on the screen and focus on every word.",

    "Technology has changed the way people learn, work and communicate. Computers and the internet are now an important part of our daily lives. Good typing skills can save time and improve productivity.",

    "Success does not come from speed alone. Accuracy is equally important when you are learning to type. Practice slowly at first, make fewer mistakes, and gradually increase your typing speed.",

    "The internet provides useful information for education, business and communication. People can learn new skills from online resources and communicate with others around the world.",

    "Education gives people the knowledge and skills they need to build a better future. Students should develop good study habits and use technology wisely to improve their learning.",

    "A healthy lifestyle includes regular exercise, nutritious food, enough sleep and a positive attitude. Small healthy habits can make a big difference in our daily lives.",

    "Reading books is a good way to improve knowledge and vocabulary. It also develops concentration and imagination. Students should try to read something useful every day.",

    "Time is one of the most valuable resources in life. Once it is gone, it cannot be recovered. Therefore, we should use our time wisely and complete important tasks on time.",

    "Good communication is important in school, business and personal life. We should listen carefully, speak clearly and respect the opinions of other people.",

    "Modern computers can perform thousands of operations in a very short time. They are used in schools, offices, hospitals, banks, shops and many other places.",

    "The keyboard is one of the most common input devices used with a computer. Learning proper keyboard techniques can help users type faster and reduce mistakes.",

    "The internet has made it possible to access information from almost anywhere. However, users should be careful when sharing personal information and should always follow safe browsing practices.",

    "Hard work and regular practice are important for achieving success. When you make a mistake, learn from it and continue practicing instead of giving up.",

    "A good typist does not focus only on speed. Accuracy is equally important because typing a large number of words with many mistakes can reduce the quality of work.",

    "Computers have become an essential part of modern education. Students can use them to prepare assignments, search for information, attend online classes and learn new skills.",

    "Every day provides a new opportunity to learn something useful. Keep practicing, stay focused and do not be afraid of making mistakes because mistakes are part of learning.",

    "The world is changing rapidly because of technology. New tools and applications are helping people work faster, communicate easily and solve many everyday problems.",

    "A successful student should manage time properly, attend classes regularly and practice important skills. Consistent effort can produce excellent results over time.",

    "Typing practice becomes easier when you maintain a comfortable sitting position and keep your fingers correctly placed on the keyboard. Try to look at the screen instead of the keys.",

    "The best way to improve typing speed is to practice regularly. Start with accuracy and gradually increase your speed as you become more comfortable with the keyboard.",

    "Libraries are valuable places for students because they provide access to books, newspapers, magazines and other learning resources. Reading regularly can improve both knowledge and language skills.",

    "Clean surroundings are important for a healthy and comfortable life. Everyone should help keep homes, schools, offices and public places clean.",

    "Teamwork teaches people how to cooperate with others and solve problems together. A successful team listens to different ideas and works toward a common goal.",

    "Patience is an important quality when learning a new skill. Do not expect perfect results immediately. Continue practicing and your performance will improve gradually.",

    "The keyboard contains many different keys that perform different functions. Letters, numbers, symbols and special keys allow users to enter various types of information into a computer."

];


/* =====================================================
   HTML ELEMENTS
   ===================================================== */

const timeElement =
    document.getElementById("time");

const wpmElement =
    document.getElementById("wpm");

const accuracyElement =
    document.getElementById("accuracy");

const typingTextElement =
    document.getElementById("typing-text");

const typingInput =
    document.getElementById("typing-input");

const resetButton =
    document.getElementById("reset-btn");

const switchButton =
    document.getElementById("switch-btn");

const timeButtons =
    document.querySelectorAll(".time-btn");

const resultBox =
    document.getElementById("result-box");

const resultWpm =
    document.getElementById("result-wpm");

const resultAccuracy =
    document.getElementById("result-accuracy");

const resultTime =
    document.getElementById("result-time");

const resultParagraphs =
    document.getElementById("result-paragraphs");

const menuButton =
    document.getElementById("menu-btn");

const mobileMenu =
    document.getElementById("mobile-menu");


/* =====================================================
   VARIABLES
   ===================================================== */

let currentText = "";

let currentParagraphIndex = -1;

let timeLimit = 60;

let timeLeft = 60;

let timer = null;

let startTime = null;

let testStarted = false;

let testFinished = false;


/*
   IMPORTANT:

   These values NEVER reset when paragraph changes.
   Therefore WPM and accuracy remain cumulative.
*/

let totalTypedCharacters = 0;

let totalCorrectCharacters = 0;

let totalWrongCharacters = 0;

let completedParagraphs = 0;


/* =====================================================
   RANDOM PARAGRAPH
   ===================================================== */

function getRandomText() {

    let randomIndex;

    do {

        randomIndex =
            Math.floor(
                Math.random() * passages.length
            );

    } while (
        randomIndex === currentParagraphIndex &&
        passages.length > 1
    );

    currentParagraphIndex =
        randomIndex;

    return passages[randomIndex];
}


/* =====================================================
   DISPLAY NEW PARAGRAPH
   ===================================================== */

function displayText() {

    currentText =
        getRandomText();

    typingTextElement.innerHTML = "";

    for (
        let i = 0;
        i < currentText.length;
        i++
    ) {

        const span =
            document.createElement("span");

        span.textContent =
            currentText[i];

        span.classList.add(
            "typing-character"
        );

        typingTextElement.appendChild(
            span
        );
    }

}


/* =====================================================
   FORMAT TIME
   ===================================================== */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secondsLeft =
        seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secondsLeft).padStart(2, "0")
    );

}


/* =====================================================
   UPDATE TIME DISPLAY
   ===================================================== */

function updateTimeDisplay() {

    timeElement.textContent =
        formatTime(timeLeft);

}


/* =====================================================
   RESET STATISTICS
   ===================================================== */

function resetStatistics() {

    totalTypedCharacters = 0;

    totalCorrectCharacters = 0;

    totalWrongCharacters = 0;

    completedParagraphs = 0;

}


/* =====================================================
   RESET TEST
   ===================================================== */

function resetTest() {

    clearInterval(timer);

    timer = null;

    testStarted = false;

    testFinished = false;

    startTime = null;

    timeLeft = timeLimit;

    resetStatistics();

    updateTimeDisplay();

    wpmElement.textContent = "0";

    accuracyElement.textContent = "100%";

    typingInput.value = "";

    typingInput.disabled = false;

    resultBox.classList.remove("show");

    displayText();

    typingInput.focus();

}


/* =====================================================
   START TIMER
   ===================================================== */

function startTimer() {

    startTime = Date.now();

    timer =
        setInterval(function () {

            const elapsed =
                Math.floor(
                    (Date.now() - startTime) / 1000
                );

            timeLeft =
                Math.max(
                    timeLimit - elapsed,
                    0
                );

            updateTimeDisplay();

            calculateResult();

            if (timeLeft <= 0) {

                finishTest();

            }

        }, 200);

}


/* =====================================================
   START TEST
   ===================================================== */

function startTest() {

    if (testStarted || testFinished) {

        return;

    }

    testStarted = true;

    typingInput.disabled = false;

    typingInput.focus();

    startTimer();

}


/* =====================================================
   CALCULATE CURRENT PARAGRAPH
   ===================================================== */

function calculateCurrentTyping() {

    const typedText =
        typingInput.value;

    let correct = 0;

    let wrong = 0;


    for (
        let i = 0;
        i < typedText.length;
        i++
    ) {

        if (
            typedText[i] ===
            currentText[i]
        ) {

            correct++;

        } else {

            wrong++;

        }

    }


    return {
        correct: correct,
        wrong: wrong
    };

}


/* =====================================================
   UPDATE CHARACTER COLORS
   ===================================================== */

function updateCharacterColors() {

    const typedText =
        typingInput.value;

    const characters =
        typingTextElement.querySelectorAll(
            ".typing-character"
        );


    for (
        let i = 0;
        i < characters.length;
        i++
    ) {

        characters[i]
            .classList
            .remove("correct");

        characters[i]
            .classList
            .remove("wrong");

        characters[i]
            .classList
            .remove("current");


        if (i < typedText.length) {

            if (
                typedText[i] ===
                currentText[i]
            ) {

                characters[i]
                    .classList
                    .add("correct");

            } else {

                characters[i]
                    .classList
                    .add("wrong");

            }

        }

    }


    if (
        typedText.length <
        currentText.length
    ) {

        characters[
            typedText.length
        ]
        .classList
        .add("current");

    }

}


/* =====================================================
   CALCULATE WPM + ACCURACY
   ===================================================== */

function calculateResult() {

    /*
       Current paragraph typed characters
    */

    const typedText =
        typingInput.value;


    /*
       Current paragraph correct/wrong
    */

    const current =
        calculateCurrentTyping();


    /*
       CUMULATIVE TOTAL

       Completed paragraph data
       + current paragraph data
    */

    const totalCorrect =
        totalCorrectCharacters +
        current.correct;

    const totalWrong =
        totalWrongCharacters +
        current.wrong;

    const totalTyped =
        totalTypedCharacters +
        typedText.length;


    /* ================================
       ACCURACY
       ================================ */

    let accuracy = 100;

    if (totalTyped > 0) {

        accuracy =
            (totalCorrect / totalTyped) *
            100;

    }


    /* ================================
       WPM
       ================================ */

    let wpm = 0;


    if (startTime) {

        const elapsedMinutes =
            (Date.now() - startTime) /
            60000;


        if (elapsedMinutes > 0) {

            wpm =
                (totalCorrect / 5) /
                elapsedMinutes;

        }

    }


    if (!isFinite(wpm)) {

        wpm = 0;

    }


    wpmElement.textContent =
        Math.round(wpm);

    accuracyElement.textContent =
        Math.round(accuracy) + "%";


    return {
        wpm: Math.round(wpm),
        accuracy: Math.round(accuracy),
        totalTyped: totalTyped,
        totalCorrect: totalCorrect,
        totalWrong: totalWrong
    };

}


/* =====================================================
   COMPLETE CURRENT PARAGRAPH
   ===================================================== */

function completeParagraph() {

    const typedText =
        typingInput.value;


    const current =
        calculateCurrentTyping();


    /*
       SAVE CURRENT PARAGRAPH
       INTO CUMULATIVE TOTAL
    */

    totalTypedCharacters +=
        typedText.length;

    totalCorrectCharacters +=
        current.correct;

    totalWrongCharacters +=
        current.wrong;

    completedParagraphs++;


    /*
       IMPORTANT:

       DO NOT RESET TIMER
       DO NOT RESET WPM
       DO NOT RESET ACCURACY
    */


    typingInput.value = "";

    displayText();

    updateCharacterColors();

    calculateResult();

}


/* =====================================================
   TYPING EVENT
   ===================================================== */

typingInput.addEventListener(
    "input",
    function () {

        if (testFinished) {

            return;

        }


        /*
           First keystroke starts test
        */

        if (!testStarted) {

            startTest();

        }


        updateCharacterColors();

        calculateResult();


        /*
           CHECK COMPLETE PARAGRAPH
        */

        if (
            typingInput.value.length >=
            currentText.length
        ) {

            completeParagraph();

        }

    }
);


/* =====================================================
   FINISH TEST
   ===================================================== */

function finishTest() {

    if (testFinished) {

        return;

    }


    /*
       Add current paragraph's
       typed characters to totals
    */

    const typedText =
        typingInput.value;


    const current =
        calculateCurrentTyping();


    totalTypedCharacters +=
        typedText.length;

    totalCorrectCharacters +=
        current.correct;

    totalWrongCharacters +=
        current.wrong;


    /*
       Stop test
    */

    testFinished = true;

    testStarted = false;

    clearInterval(timer);

    timer = null;

    typingInput.disabled = true;


    /*
       Final calculation
    */

    const finalResult =
        calculateResult();


    /*
       Result box
    */

    resultWpm.textContent =
        finalResult.wpm +
        " WPM";

    resultAccuracy.textContent =
        finalResult.accuracy +
        "%";

    resultTime.textContent =
        formatTime(timeLimit);

    resultParagraphs.textContent =
        completedParagraphs;


    resultBox.classList.add("show");


    /*
       Scroll to result
    */

    setTimeout(function () {

        resultBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);

}


/* =====================================================
   TIME SELECTION
   ===================================================== */

timeButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                /*
                   Don't change time
                   during active test
                */

                if (testStarted) {

                    return;

                }


                timeButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                timeLimit =
                    parseInt(
                        button.dataset.time
                    );


                timeLeft =
                    timeLimit;


                updateTimeDisplay();


                /*
                   Clear previous result
                */

                resultBox.classList.remove(
                    "show"
                );

            }
        );

    }
);


/* =====================================================
   RESET BUTTON
   ===================================================== */

resetButton.addEventListener(
    "click",
    function () {

        resetTest();

    }
);


/* =====================================================
   SWITCH TEXT
   ===================================================== */

switchButton.addEventListener(
    "click",
    function () {

        /*
           If test is active,
           save current paragraph
           before switching.
        */

        if (
            testStarted &&
            !testFinished
        ) {

            const typedText =
                typingInput.value;

            const current =
                calculateCurrentTyping();


            totalTypedCharacters +=
                typedText.length;

            totalCorrectCharacters +=
                current.correct;

            totalWrongCharacters +=
                current.wrong;

        }


        typingInput.value = "";

        displayText();

        updateCharacterColors();

        calculateResult();

        typingInput.focus();

    }
);


/* =====================================================
   MOBILE MENU
   ===================================================== */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle(
                "show"
            );

        }
    );

}


/* =====================================================
   CLOSE MOBILE MENU
   ===================================================== */

if (mobileMenu) {

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.remove(
                        "show"
                    );

                }
            );

        }
    );

}


/* =====================================================
   INITIALIZE
   ===================================================== */

displayText();

timeLeft = timeLimit;

updateTimeDisplay();

typingInput.disabled = false;

typingInput.value = "";

wpmElement.textContent = "0";

accuracyElement.textContent = "100%";
const randomButton = document.querySelector('.random-btn');
const messageTextarea = document.getElementById('content');

const randomMessages = [
    'What is something you do really well?',
    'What is one thing I admire most about you?',
    'What is something beautiful about your personality?',
    'What is one thing you should never stop doing?',
    'What is a kind truth you need to hear right now?',
    'What is one question you have always wanted someone to ask you?',
    'What is something you may not realize makes you special?',
    'What is one honest compliment you deserve to hear today?',
    'What is something about you that people notice immediately?',
    'What is one habit of yours that makes a positive difference?',
    'What is something you have improved at recently?',
    'What is one thing you do that makes people feel comfortable?',
    'What is a quality you have that is hard to find?',
    'What is one reason someone might trust you easily?',
    'What is something you should be more confident about?',
    'What is one quiet strength you have?',
    'What is something you bring into a room without trying?',
    'What is one thing about your energy that stands out?',
    'What is something you do that makes people smile?',
    'What is one thing you are better at than you think?',
    'What is a moment in life where you seemed truly strong?',
    'What is one thing you do that people appreciate but may not say often?',
    'What is something you should give yourself more credit for?',
    'What is one way you make life easier for others?',
    'What is something kind you do naturally?'
];

if (randomButton && messageTextarea) {
    randomButton.addEventListener('click', function () {
        const randomIndex = Math.floor(Math.random() * randomMessages.length);
        messageTextarea.value = randomMessages[randomIndex];
        messageTextarea.focus();
    });
}

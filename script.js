    document.addEventListener('DOMContentLoaded', () => {
    const questionForm = document.getElementById('submit-question-form');
    const questionList = document.getElementById('question-list');
    const questionDetail = document.getElementById('question-detail');
    const questionTitle = document.getElementById('question-title');
    const questionText = document.getElementById('question-text');
    const responsesList = document.getElementById('responses-list');
    const responseForm = document.getElementById('submit-response-form');
    const resolveButton = document.getElementById('resolve-button');

    let currentQuestion = null;


    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const question = document.getElementById('question').value;
        addQuestionToList(title, question);
        questionForm.reset();
    });

    responseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentQuestion) {
            const name = document.getElementById('name').value;
            const comment = document.getElementById('comment').value;
            addResponse(name, comment);
            responseForm.reset();
        }
    });

    resolveButton.addEventListener('click', () => {
        if (currentQuestion) {
            resolveQuestion();
        }
    });

    function addQuestionToList(title, question) {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `<h3>${title}</h3>`;
        questionItem.addEventListener('click', () => {
            showQuestionDetail(title, question);
        });
        questionList.appendChild(questionItem);
    }

    function showQuestionDetail(title, question) {
        currentQuestion = { title, question };
        questionTitle.textContent = title;
        questionText.textContent = question;
        responsesList.innerHTML = ''; 
        questionDetail.style.display = 'block';
    }

    function addResponse(name, comment) {
        const responseItem = document.createElement('div');
        responseItem.className = 'response-item';
        responseItem.innerHTML = `<strong>${name}:</strong> <p>${comment}</p>`;
        responsesList.appendChild(responseItem);
    }

    function resolveQuestion() {
        const questionItems = document.querySelectorAll('.question-item');
        questionItems.forEach(item => {
            if (item.innerHTML.includes(currentQuestion.title)) {
                item.remove();
            }
        });
        questionDetail.style.display = 'none';
        currentQuestion = null;
    }
});

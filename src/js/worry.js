const id = document.querySelector('main').dataset.id;
const buttons = document.querySelectorAll('.btn-worry');
let surveyMax = 0;

for (let i = 0; i < buttons.length; i++) {
    // Sort survey results
    if (surveyMax < parseInt(buttons[i].dataset.survey)) {
        surveyMax = parseInt(buttons[i].dataset.survey);
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (e) => {

        // Save selected in localStorage, check if it's the same as survey
        localStorage.setItem('worry' + id, i);
        //localStorage.setItem(window.location.pathname + order, i);

        if (parseInt(buttons[i].dataset.survey) === surveyMax) {
            localStorage.setItem('worrySameAsSurvey' + id, '1');
        } else {
            localStorage.removeItem('worrySameAsSurvey' + id);
        }
    });
}
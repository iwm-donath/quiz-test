const worryResult = document.querySelectorAll('.worry-result-info');
const worrySameAsSurveyTextFew = document.querySelector('#same_as_survey_few');
const worrySameAsSurveyTextSome = document.querySelector('#same_as_survey_some');
const worrySameAsSurveyTextMany = document.querySelector('#same_as_survey_many');
let id;
let worrySelected;
let worrySameAsSurvey;
let worrySameAsSurveyTotal = 0;

for (let i = 0; i < worryResult.length; i++) {
    id = worryResult[i].dataset.id;
    worrySelected = localStorage.getItem('worry' + id);
    worrySameAsSurvey = localStorage.getItem('worrySameAsSurvey' + id);

    if (worrySameAsSurvey !== null) {
        worrySameAsSurveyTotal += 1;
    }

    if (worrySelected !== null) {
        let worrySelectedBars = worryResult[i].querySelectorAll('.worry-result-bar');
        for (let j = 0; j < worrySelectedBars.length; j++) {
            if (j === parseInt(worrySelected)) {
                worrySelectedBars[j].style.backgroundImage = 'repeating-linear-gradient(45deg, transparent 0, transparent 4px,rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 8px)';
                worrySelectedBars[j].style.height = '1em';
            }
        }
    }
}

if (worrySameAsSurveyTotal <= 2) {
    worrySameAsSurveyTextFew.style.display = "block";
}
if (worrySameAsSurveyTotal >= 3 && worrySameAsSurveyTotal <= 5) {
    worrySameAsSurveyTextSome.style.display = "block";
}
if (worrySameAsSurveyTotal >= 6) {
    worrySameAsSurveyTextMany.style.display = "block";
}
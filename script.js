const calbutton=document.getElementById("calculate-button");
const weightInput=document.getElementById("weightinput");
const heightInput=document.getElementById("heightinput");
const result=document.getElementById("resultbmiscore");
const rescategory=document.getElementById("resultbmicategory");
const bmiIndicator=document.getElementById("bmiindicator");
const resetbutton=document.getElementById("reset-button");

calbutton.addEventListener("click",()=>{
    calculatebmiscore();
})

resetbutton.addEventListener("click",()=>{
    resetBmiScore();
});

function calculatebmiscore(){
    //change the input value to integer data type
    const weight=parseFloat(weightInput.value);
    const height=parseFloat(heightInput.value)/100;

    if(weight>0 && height>0){
        const bmiscore=(weight/(height*height)).toFixed(1);
        result.textContent=bmiscore;
        showResultBmiCategory(bmiscore);
        showBmiIndicator(bmiscore);
    }else{
        alert("Please enter valid height and weight");
    }
    console.log("calculate");
}

function showResultBmiCategory(bmiscore){
    if (bmiscore<18.5){
        result.style.color="blue";
        rescategory.textContent="Underweight";
    }else if(bmiscore>=18.5 && bmiscore<25){
        result.style.color="green";
        rescategory.textContent="Normal";
    }else if(bmiscore>=25 && bmiscore<30){
        result.style.color="yellow";
        rescategory.textContent="Overweight";
    }else{
        result.style.color="red";
        rescategory.textContent="Obese";
    }
}

function showBmiIndicator(bmiscore){
    let firstScoreRange, lastScoreRange;
    let firstPercentRange, lastPercentRange;

    if (bmiscore < 18.5){
        firstScoreRange = 0;
        lastScoreRange = 18.49;
        firstPercentRange = 0;
        lastPercentRange = 25;
    } else if (bmiscore >= 18.5 && bmiscore < 25){
        firstScoreRange = 18.5;
        lastScoreRange = 24.9;
        firstPercentRange = 25;
        lastPercentRange = 50;
    } else if (bmiscore >= 25 && bmiscore < 30){
        firstScoreRange = 25;
        lastScoreRange = 29.9;
        firstPercentRange = 50;
        lastPercentRange = 75;
    } else {
        firstScoreRange = 30;
        lastScoreRange = 40;
        firstPercentRange = 75;
        lastPercentRange = 100;
    }

    const slope = (lastPercentRange - firstPercentRange) / (lastScoreRange - firstScoreRange);
    const intercept = firstPercentRange - slope * firstScoreRange;
    const percentage = Math.min((slope * bmiscore + intercept), 100);

    if (bmiIndicator) {
        bmiIndicator.style.left = percentage + "%";
    }
}

function resetBmiScore(){
    weightInput.value="";
    heightInput.value="";
    result.textContent="0";
    result.style.color="black";
    rescategory.textContent="N/A";
    bmiIndicator.style.left = "0%";
}
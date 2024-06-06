function getAlcoholAmount(drinkAmount, volume) {
    return drinkAmount * volume * 0.79;
}

function getBMI(weight, height) {
    return weight/height**2;
}

function getBodyFluids(percentage, weight, height) {
    let bmi = getBMI(weight, height);
    let bmiExceed = 0;
    
    if (bmi < 18.5) { // underweight
        bmiExceed = bmi-18.5;
    } else if (bmi > 25) { // overweight
        bmiExceed = bmi-25;
    }
    
    let bodyFatDiff = bmiExceed/height**2;
    let waterContent = bodyFatDiff * 0.15;

    return percentage * (weight-bodyFatDiff) + waterContent; 
}

function getBloodAlcoholContent(amount, bodyFluids) {
    return amount / bodyFluids;
}

// function getAlcoholByTime(t, amount, absorptionTime, drinkSpan, exciseRate) {
//     let intakeRate = amount / drinkSpan;
    
//     let accumulated = Math.min(t * intakeRate, amount)
//     let excised = t * exciseRate;
    
//     return Math.max(accumulated - excised);
// }

function getAlcoholByTime(t, amount, absorptionTime, drinkSpan, exciseRate) {
    let intakeRate = amount / drinkSpan;

    let absorptionScalar = Math.min(t, absorptionTime) / absorptionTime;

    let accumulated = Math.min(t * intakeRate, amount);
    let excised = t * exciseRate;

    return Math.max(absorptionScalar * (accumulated - excised), 0);
}
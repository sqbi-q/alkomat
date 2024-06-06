const CalculatorForm = document.getElementById("calculator");
let chart;
let formValue = (form, elementId) => form.elements[elementId].value;

function setup() {
    sampleGraph((x) => x * 2);
    Array.from(CalculatorForm.elements).forEach((element) => 
        element.addEventListener("input", calculateAlcohol));
}

function presetForm(sex) {
    CalculatorForm.elements["height"].value = 175;
    CalculatorForm.elements["absorption"].value = 0.5;
    CalculatorForm.elements["span"].value = 0.5;
    CalculatorForm.elements["excise"].value = 10;

    switch (sex) {
        case "male":
            CalculatorForm.elements["fluid-percentage"].value = 70
            CalculatorForm.elements["weight"].value = 72;
            break;
        
        case "female":
            CalculatorForm.elements["fluid-percentage"].value = 60;
            CalculatorForm.elements["weight"].value = 58;
            break;
    }

    calculateAlcohol();
}


function calculateAlcohol() {
    let drinkAmount = formValue(CalculatorForm, "drink-amount");
    let alcoholByVolume = formValue(CalculatorForm, "by-volume") / 100;
    let alcoholAmount = getAlcoholAmount(drinkAmount, alcoholByVolume);

    CalculatorForm.elements["alcohol-amount"].value = alcoholAmount;

    let fluidPercentage = formValue(CalculatorForm, "fluid-percentage") / 100;
    let weight = formValue(CalculatorForm, "weight");
    let height = formValue(CalculatorForm, "height");
    let bodyFluids = getBodyFluids(fluidPercentage, weight, height);

    let absorptionTime = formValue(CalculatorForm, "absorption");
    let drinkSpan = formValue(CalculatorForm, "span");
    let exciseRate = formValue(CalculatorForm, "excise");

    // check if values are correct before prompting function

    let alcoholTimeFunc = (t) => 
        getAlcoholByTime(t, alcoholAmount, absorptionTime, drinkSpan, exciseRate) / bodyFluids;

    chart.destroy();
    sampleGraph(alcoholTimeFunc);
}

function sampleGraph(f) {
    const xs = [];
    const ys = renderPlot(
        f,
        0, 24, 0.25, xs
    );

    const chartCanvas = document.getElementById("alcohol-chart");
    chart = new Chart(chartCanvas, {
        type: "line",
        data: {
            labels: xs,
            datasets: [{
                fill: false,
                pointRadius: 1,
                data: ys
            }]
        }
    });
}

function renderPlot(f, start, end, step = 1, xs) {
    const ys = [];
    for (let i = start; i <= end; i += step) {
        xs.push(i);
        ys.push(f(i));
    }
    return ys;
}
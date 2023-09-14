// calculator toggle
var phaseText = "Single";
for (var option of document.querySelectorAll(".toggle-option")) {
    option.addEventListener("click", function (event) {
        // remove active from all options
        for (var rem of document.querySelectorAll(".toggle-option")) {
            rem.classList.remove("toggle-active");
        }

        // add active to clicked option
        if (event.target.localName == "p") {
            event.target.parentElement.classList.add("toggle-active");
            phaseText = event.target.innerHTML;
        } else {
            event.target.classList.add("toggle-active");
            phaseText = event.target.children[0].innerHTML;
        }

        calculate();
    });
}

// calculator sliders
var billSlider = document.getElementById("billRange");
var savingsSlider = document.getElementById("savingsRange");
var batterySlider = document.getElementById("batteryRange");

// UI indicators
var billValue = document.getElementById("billValue");
var savingsValue = document.getElementById("savingsValue");
var batteryValue = document.getElementById("batteryValue");

// update values on UI (initially)
billValue.innerHTML = "R " + billSlider.value;
savingsValue.innerHTML = savingsSlider.value + " %";
batteryValue.innerHTML = batterySlider.value + " hours";

// Update the current slider value (each time you drag the slider handle)
billSlider.oninput = function () {
    billValue.innerHTML =
        "R " + this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    calculate();
};
savingsSlider.oninput = function () {
    savingsValue.innerHTML = this.value + " %";
    calculate();
};
batterySlider.oninput = function () {
    batteryValue.innerHTML = this.value + " hours";
    calculate();
};

// calculator constants
let singlePhaseBaseCost = 50000;
let threePhaseBaseCost = 73000;
let panelCost = 2639;
let fiveKwSinglePhaseInverter = 17371;
let eightKwSinglePhaseInverter = 28344;
let twelveKwThreePhaseInverter = 43783;
let batteryCost = 29185; // Freedom Won
let panelPeakPower = 455;
let avgDailySunHrs = 5.33;
let avgDaysPerMonth = 30.5;
let batteryCapacity = 5.12; // Freedom Won
let maxCeilingDiscountedBracketInRands = 1440;
let lowBracketKwh = 600;
let discountedTarrif = 2.400395;
let higherTarrif = 3.312575;
let percentageOfProducingHours = 0.85;
let kwhPerPanelPerMonth =
    (panelPeakPower / 1000) *
    avgDailySunHrs *
    avgDaysPerMonth *
    percentageOfProducingHours;
let panelMountingStructureCost = 900; //NEW CONSTANT, Updated According to client feedback
let batteryDepthDischarge = 0.95; //NEW CONSTANT
let monthlyBillToKwhConversion = 0;
var reqKwhSavingsPerMonth = 0;
var reqBatteryKwh = 0;
let systemCost = 0;
let phase = 0;
let outputSizeOfPanelArray = 0;
let outputBatteryBankCapacity = 0;
let outputPaybackPeriod = 0;
let outputMonthlyEstimatedSavings = 0;
let numYears = 20;

// calculator logic
function calculate() {
    let inputMonthlyBill = billSlider.value;

    // lower bracket
    if (inputMonthlyBill < maxCeilingDiscountedBracketInRands) {
        monthlyBillToKwhConversion = inputMonthlyBill / 3.312575;
    }
    // higher bracket
    else if (inputMonthlyBill > maxCeilingDiscountedBracketInRands) {
        monthlyBillToKwhConversion =
            (inputMonthlyBill - maxCeilingDiscountedBracketInRands) / 3.312575 +
            maxCeilingDiscountedBracketInRands / 2.400395;
    }
    console.log("montlhy bill in kwh = " + monthlyBillToKwhConversion);

    let inputSaveOnBill = savingsSlider.value;
    reqKwhSavingsPerMonth = inputSaveOnBill * 0.01 * monthlyBillToKwhConversion;
    console.log("req Kwh Savings PerMonth", reqKwhSavingsPerMonth);

    let numberOfPanels = Math.round(
        reqKwhSavingsPerMonth / kwhPerPanelPerMonth
    );
    let sizeOfPanelArray = (numberOfPanels * panelPeakPower) / 1000;
    console.log("size of panel array: " + sizeOfPanelArray);

    let inputHrsAuto = batterySlider.value;
    reqBatteryKwh =
        ((monthlyBillToKwhConversion / avgDaysPerMonth) * (inputHrsAuto / 24)) /
        batteryDepthDischarge;
    console.log("required battery kwh: " + reqBatteryKwh);

    let numberOfBatteries = Math.ceil(reqBatteryKwh / batteryCapacity);
    console.log("numberOfBatteries", numberOfBatteries);

    let singlePhaseValue;
    let threePhaseValue;

    if (phaseText == "Single") {
        singlePhaseValue = singlePhaseBaseCost;

        if (sizeOfPanelArray > 6.5) {
            if (sizeOfPanelArray > 10.4) {
                threePhaseValue = eightKwSinglePhaseInverter * 2;
            } else {
                threePhaseValue = eightKwSinglePhaseInverter;
            }
        } else {
            threePhaseValue = fiveKwSinglePhaseInverter;
        }
    } else {
        singlePhaseValue = threePhaseBaseCost;
        threePhaseValue = twelveKwThreePhaseInverter;
    }

    systemCost =
        (singlePhaseValue +
            threePhaseValue +
            numberOfPanels * (panelCost + panelMountingStructureCost) +
            numberOfBatteries * batteryCost) *
        1.33;

    let monthlyEstimatedSavings;

    if (kwhPerPanelPerMonth * numberOfPanels < 600) {
        monthlyEstimatedSavings =
            kwhPerPanelPerMonth * numberOfPanels * 2.400395;
    } else {
        monthlyEstimatedSavings =
            600 * 2.400395 +
            (kwhPerPanelPerMonth * numberOfPanels - 600) * 3.312575;
    }

    monthlyEstimatedSavings = Math.ceil(monthlyEstimatedSavings);

    paybackPeriod = systemCost / monthlyEstimatedSavings / 12;
    let batteryBankCapacity = numberOfBatteries * batteryCapacity;

    document.getElementById("totalsystemcost").innerHTML =
        "R " + systemCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.getElementById("paybackperiod").innerHTML =
        paybackPeriod.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " Years";

    document.getElementById("batterybankcapacity").innerHTML =
        batteryBankCapacity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " kWh";

    document.getElementById("sizeofpanelarray").innerHTML =
        sizeOfPanelArray.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " kWp";

    document.getElementById("estimatedmonthlysavings").innerHTML =
        "R " +
        monthlyEstimatedSavings
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

calculate();

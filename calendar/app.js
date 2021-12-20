import range from "./range_function.js";
let mainContainer = document.querySelector(".container");

let calendarContainer = document.querySelector("#calendarContainer");
// let calendarDates = document.querySelector(".calendar-dates");
// let calendarWeekdays = document.querySelector(".calendar-weekdays");

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

// Dias no calendaário
let dateElement = document.querySelector(".calendar-date");
const DATE_EL = dateElement.cloneNode(true);
dateElement.remove();

function changeCalendar(weekDay, lastDate) {
    calendarContainer.innerHTML = "";
    // cria dias da semana
    WEEKDAYS.forEach(function (week) {
        let weekDay = document.createElement("div");
        weekDay.classList.add("weekday");
        weekDay.innerText = week;
        calendarContainer.appendChild(weekDay);
    });
    // Sinaliza em que dia da semana começa o mês
    for (let i = 0; i < weekDay; i++) {
        calendarContainer.appendChild(DATE_EL.cloneNode(true));
    }

    //
    range(1, lastDate + 1).forEach((v, i) => {
        let el = DATE_EL.cloneNode(true);
        // el.textContent = v;
        let myp = document.createElement("p");
        myp.textContent = v;
        el.appendChild(myp);
        calendarContainer.appendChild(el);

        // dateElement.after(el);
    });

    // Adiciona 42 elementos .calendar-date p/ completar
    var counterCalendarDate = 0;
    while (document.querySelectorAll(".calendar-date").length < 42) {
        counterCalendarDate += 1;
        let el = DATE_EL.cloneNode(true);
        let newp = document.createElement("p");
        newp.textContent = counterCalendarDate;
        // newp.classList.add()
        el.classList.add("nextMonthDays");
        el.appendChild(newp);
        calendarContainer.appendChild(el);
    }
}

// Selecionar meses select
const selectMonth = document.querySelector("#selectMonth");
const selectYear = document.querySelector("#selectYear");

const MONTHS = Array.from(new Array(12).keys());

const NAME_MONTHS = MONTHS.map((name) => {
    let date = new Date(new Date().getFullYear(), name, 1);
    return date.toLocaleString("default", { month: "long" });
});
// range() function

let selectOpts = (array, select) => {
    array.forEach((v, i, ar) => {
        let selectOpt = document.createElement("option");
        let val = i;
        let txt = v;
        // para dar o value numerico aos meses
        selectOpt.value = txt == val + ar[0] ? txt : i + 1;
        selectOpt.text = String(v).toUpperCase();
        select.appendChild(selectOpt);
    });
};

selectOpts(NAME_MONTHS, selectMonth);
selectOpts(range(1900, 3000), selectYear);
selectYear.value = new Date().getFullYear();

let criaCalendario = () => {
    let firstDay, lastDay;
    let month = selectMonth.value;
    let year = selectYear.value;
    firstDay = new Date(year, month - 1, 1);
    lastDay = new Date(year, month, 0);
    let lastDayDate = lastDay.getDate();

    // console.log(firstDay.getMonth(), lastDay.getMonth());

    let firstDayweek = firstDay.getDay();
    changeCalendar(firstDayweek, lastDayDate);
};

selectMonth.addEventListener("click", criaCalendario);
selectMonth.addEventListener("change", criaCalendario);
selectYear.addEventListener("click", criaCalendario);
selectYear.addEventListener("change", criaCalendario);

document.getElementsByTagName("body").onload = criaCalendario();

// Increment month, year
const divCalendarBts = document.querySelector("#calendarBts");
let getBts = (div) => {
    return div.querySelectorAll("button");
};
const calendarBts = getBts(divCalendarBts);

function modificaCalendario(bt, increment = true) {
    bt.addEventListener("click", function () {
        // TODO: previous function
        let valMonth = Number(selectMonth.value);
        let valMonthCalc = increment == true ? valMonth + 1 : valMonth - 1;
        let valYear = Number(selectYear.value);

        if (valMonthCalc > 12) {
            valMonthCalc = 1;
            selectYear.value = valYear + 1;
        } else if (valMonthCalc < 1) {
            valMonthCalc = 12;
            selectYear.value = valYear - 1;
        }

        selectMonth.value = valMonthCalc;

        // for decrement... (PREVIOUS)

        selectMonth.click();
    });
}
modificaCalendario(calendarBts[0]);
modificaCalendario(calendarBts[1], false);

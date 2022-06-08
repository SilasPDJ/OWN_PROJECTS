// import range from "./range_function.js";

// noun or phrase names for class

class CalendarOptionsGenerator {
    constructor(selectMonth, selectYear) {
        // selects
        this.monthSelect = selectMonth;
        this.yearSelect = selectYear;
    }
    #getNameMonths() {
        const MONTHS = Array.from(new Array(12).keys());
        // NAME_MONTHS
        return MONTHS.map((name) => {
            let date = new Date(new Date().getFullYear(), name, 1);
            return date.toLocaleString("default", { month: "long" });
        });
    }

    createCalendarSelectsOptionsValues() {
        const selectOpts = (array, select) => {
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

        selectOpts(this.#getNameMonths(), this.monthSelect);
        selectOpts(this.range(1900, 3000), this.yearSelect);
    }

    modificaCalendario(bt, increment = true) {
        let [selectMonth, selectYear] = [this.monthSelect, this.yearSelect];

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

    mudaDias() {
        // monthDays on click
        let monthDays = document.querySelectorAll(".monthDays");

        monthDays.forEach((element) => {
            element.addEventListener("click", function () {
                let monthVal = c.monthSelect.value;
                let yearVal = c.yearSelect.value;

                console.log(element.textContent, monthVal, yearVal);
            });
        });
    }

    range(start, stop, step) {
        // null => rolo vazio
        // undefined => sem papel higiênico

        // declara variáveis iniciais
        stop = stop === undefined ? start : stop;
        start = stop == start ? 0 : start;
        step = step == null ? 1 : step;

        let ini = stop - start;
        let rangarray = new Array(ini).fill(start).map((v, c) => v + c);
        let realRangarray = [];
        for (let i = 0; i < rangarray.length; i += step) {
            realRangarray.push(rangarray[i]);
        }
        return realRangarray;
    }
}

class Calendario extends CalendarOptionsGenerator {
    constructor(calendarSelector, monthSelect, yearSelect) {
        super(monthSelect, yearSelect);
        this.calendarContainer = document.querySelector(calendarSelector);
        this.createCalendarSelectsOptionsValues();

        const onChangeOrClick = () => {
            this.changeCalendar();
            // Se fosse com function, o this não funcionaria dentro
        };

        const setDateClick = (...doms) => {
            doms.forEach((dom) => {
                dom.addEventListener("click", onChangeOrClick);
                dom.addEventListener("change", onChangeOrClick);
            });
        };

        setDateClick(this.monthSelect, this.yearSelect);
        this.changeCalendar();
        this.#setDefaultOpts();

        let [btNext, btPrevious] = this.#getDefaultBts();
        this.modificaCalendario(btNext, false);
        this.modificaCalendario(btPrevious);
        // CalendarOptionsGenerator
        // this.#getCalendarDaysInicio();
    }
    #getDefaultBts() {
        const divCalendarBts = document.querySelector("#calendarBts");
        let getBts = (div) => {
            return div.querySelectorAll("button");
        };
        const calendarBts = getBts(divCalendarBts);
        return Array.from(calendarBts);
    }
    #setDefaultOpts() {
        this.yearSelect.value = new Date().getFullYear();
        this.monthSelect.value = new Date().getMonth() + 1;
        this.monthSelect.click();
    }
    #criaCalendar(monthCounter = 0) {
        let firstDay, lastDay;
        let month = this.monthSelect.value;
        let year = this.yearSelect.value;
        // alert(month);
        firstDay = new Date(year, month - 1 + monthCounter, 1);
        lastDay = new Date(year, month - monthCounter, 0);
        let lastDayDate = lastDay.getDate();
        let weekDay = firstDay.getDay();

        return [weekDay, lastDayDate];
    }

    changeCalendar() {
        let [weekDay, lastDayDate] = this.#criaCalendar();

        this.#resetCalendarItems();
        this.setCalendarWeekDays();
        // alert(this.selectMonth.value);

        this.#setCalendarDatesStart(weekDay);
        // this.#getCalendarDaysInicio(weekDay);
        this.createCalendarDates(lastDayDate);
        this.#setCalendarDatesEnd(".calendar-date");
        this.mudaDias();
    }

    #resetCalendarItems() {
        this.calendarContainer.innerHTML = "";
    }
    setCalendarWeekDays() {
        const calendarContainer = this.calendarContainer;
        // cria dias da semana
        const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
        WEEKDAYS.forEach(function (week) {
            let weekDay = document.createElement("div");
            weekDay.classList.add("weekday");
            weekDay.innerText = week;
            calendarContainer.appendChild(weekDay);
        });
    }

    #setCalendarDatesStart(weekDay) {
        // Sinaliza em que dia da semana começa o mês
        let [_, pastMonthLastDayDate] = this.#criaCalendar(1);
        // console.log(pastMonthLastDayDate);
        // pastMonthLastDayDate
        for (let i = 0; i < weekDay; i++) {
            let el = this.#makeNewDateEl();
            el.querySelector("p:first-child").textContent =
                pastMonthLastDayDate - weekDay + i + 1;
            el.classList.add("lastMonthDays");

            this.calendarContainer.appendChild(el);
        }
    }
    createCalendarDates(lastDate) {
        this.range(1, lastDate + 1).forEach((v, i) => {
            let el = this.#makeNewDateEl();
            el.classList.add("monthDays");
            // el.querySelector("p:first-child").textContent = v;
            el.querySelector("p:first-child").innerHTML = v;

            this.calendarContainer.appendChild(el);
        });
    }

    #setCalendarDatesEnd(els) {
        // COMPLETE createCalendarDays
        let counterCalendarDate = 0;
        while (document.querySelectorAll(els).length < 42) {
            counterCalendarDate += 1;
            let el = this.#makeNewDateEl();
            el.querySelector("p:first-child").textContent = counterCalendarDate;
            el.classList.add("nextMonthDays");
            calendarContainer.appendChild(el);
        }
    }

    #makeNewDateEl() {
        let div = document.createElement("button");
        div.classList.add("calendar-date");
        let newp = document.createElement("p");
        div.appendChild(newp);
        return div;
    }
}

let c = new Calendario(
    "#calendarContainer",
    document.querySelector("#selectMonth"),
    document.querySelector("#selectYear")
);
// c.createCalendarDays(30);
/*let d = new Calendario(
    "#calendarContainer2",
    document.querySelector("#selectMonth"),
    document.querySelector("#selectYear")
);
*/

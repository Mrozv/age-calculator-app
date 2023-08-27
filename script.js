const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const cdays = document.querySelector(".d");
const cmonths = document.querySelector(".m");
const cyears = document.querySelector(".y");

const button = document.querySelector(".button");

const error = document.querySelectorAll(".error");

const info = document.querySelectorAll(".info");

const input = document.querySelectorAll("input");

const errorDay = document.getElementById("errorDay");
const errorMon = document.getElementById("errorMon");
const errorYear = document.getElementById("errorYear");

const errorDayP = document.getElementById("errorDayP");
const errorMonP = document.getElementById("errorMonP");
const errorYearP = document.getElementById("errorYearP");

let valueDisplays = document.querySelectorAll(".result");
let interval = 1000;

function clear() {
  input.forEach((element) => {
    element.style.borderColor = "";
  });

  info.forEach((element) => {
    element.style.color = "";
  });

  error.forEach((element) => {
    element.classList.add("hide");
    element.classList.remove("show");
  });
}

function count() {
  let date = new Date();
  let currentDay = date.getDate();
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();

  let countedDay = currentDay - day.value;
  let countedMonth = currentMonth - month.value;
  let countedYear = currentYear - year.value;

  function lastDayOfMonth(y, m) {
    return new Date(y, m, 0).getDate();
  }

  if (countedDay < 0) {
    countedMonth -= 1;
    countedDay = lastDayOfMonth(countedYear, countedMonth - 1) + countedDay;
  }

  if (countedMonth < 0) {
    countedYear -= 1;
    countedMonth = 12 + countedMonth;
  }

  if (countedMonth >= 12) {
    countedYear += 1;
    countedMonth = 12 - countedMonth;
  }

  function display() {
    if (
      countedDay >= 0 &&
      day.value > 0 &&
      day.value <= lastDayOfMonth(year.value, month.value) &&
      countedMonth >= 0 &&
      month.value >= 1 &&
      month.value <= 12 &&
      countedYear >= 0 &&
      year.value >= 1900 &&
      year.value <= currentYear
    ) {
      valueDisplays.forEach((element) => {
        let startValue = 0;
        let endValue;
        if (element.classList.contains("y")) {
          endValue = countedYear;
        }
        if (element.classList.contains("m")) {
          endValue = countedMonth;
        }
        if (element.classList.contains("d")) {
          endValue = countedDay;
        }
        let duration = Math.floor(interval / endValue);
        let counter = setInterval(function () {
          if (startValue === endValue) {
            clearInterval(counter);
          }
          element.textContent = startValue;
          startValue += 1;
        }, duration);
      });
    } else {
      cdays.textContent = "- -";
      cmonths.textContent = "- -";
      cyears.textContent = "- -";
    }
  }
  display();

  clear();

  if (
    countedDay < 0 ||
    day.value < 0 ||
    day.value > lastDayOfMonth(year.value, month.value)
  ) {
    day.style.borderColor = "tomato";
    errorDayP.style.color = "tomato";
    cdays.textContent = "- -";
    cmonths.textContent = "- -";
    cyears.textContent = "- -";
    errorDay.classList.remove("hide");
    errorDay.classList.add("show");
    errorDay.textContent = "Must be a valid day";
  }
  if (countedMonth < 0 || month.value > 12 || month.value < 1) {
    month.style.borderColor = "tomato";
    errorMonP.style.color = "tomato";
    cdays.textContent = "- -";
    cmonths.textContent = "- -";
    cyears.textContent = "- -";
    errorMon.classList.remove("hide");
    errorMon.classList.add("show");
    errorMon.textContent = "Must be a valid month";
  }
  if (countedYear < 0 || year.value < 1900 || year.value > currentYear) {
    year.style.borderColor = "tomato";
    errorYearP.style.color = "tomato";
    cdays.textContent = "- -";
    cmonths.textContent = "- -";
    cyears.textContent = "- -";
    errorYear.classList.remove("hide");
    errorYear.classList.add("show");
    errorYear.textContent = "Must be in the past";
  }

  if (day.value === "") {
    day.style.borderColor = "tomato";
    errorDayP.style.color = "tomato";
    cdays.textContent = "- -";
    cmonths.textContent = "- -";
    cyears.textContent = "- -";
    errorDay.classList.remove("hide");
    errorDay.classList.add("show");
    errorDay.textContent = "This field is required";
    clearInterval(display());
  }
  if (month.value === "") {
    month.style.borderColor = "tomato";
    errorMonP.style.color = "tomato";
    cdays.textContent = "- -";
    cmonths.textContent = "- -";
    cyears.textContent = "- -";
    errorMon.classList.remove("hide");
    errorMon.classList.add("show");
    errorMon.textContent = "This field is required";
    clearInterval(display());
  }
  if (year.value === "") {
    year.style.borderColor = "tomato";
    errorYearP.style.color = "tomato";
    cdays.textContent = "- -";
    cmonths.textContent = "- -";
    cyears.textContent = "- -";
    errorYear.classList.remove("hide");
    errorYear.classList.add("show");
    errorYear.textContent = "This field is required";
    clearInterval(display());
  }
}

button.addEventListener("click", count);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    count();
  }
});

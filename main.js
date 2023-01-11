import Inputmask from "./node_modules/inputmask/dist/inputmask.es6.js";

const cardNumberInput = document.getElementById("number");
const cvcNumberInput = document.getElementById("cvc");
const nameInput = document.getElementById("username");
const monthSelect = document.getElementById("months");
const yearSelect = document.getElementById("year");
const errors = document.querySelectorAll(".error");
const form = document.querySelector("form");
const cardNumber = document.querySelector(".card-number");
const cardholderName = document.querySelector(".name");
const expireDates = document.querySelectorAll(".expire-date > span");
const cvcNumber = document.querySelector(".cvc");
const completeForm = document.querySelector("form + form");

let selectedMonth;
let selectedYear;
const [month, year] = expireDates;

const placeHolder = (item, text) => {
	if (item.textContent == "") {
		item.textContent = text;
	}
};

const removeUnderScore = (params) => {
	return params
		.split("")
		.map((number) => {
			if (number == "_") number = "";
			return number;
		})
		.join("");
};

nameInput.addEventListener("input", (e) => {
	cardholderName.textContent = e.target.value;
	placeHolder(cardholderName, "Jane Appleseed");
});

cardNumberInput.addEventListener("input", (e) => {
	let nums = removeUnderScore(e.target.value);
	cardNumber.textContent = nums;
	placeHolder(cardNumber, "0000 0000 0000 0000");
});

monthSelect.addEventListener("input", (e) => {
	selectedMonth = e.target.options[e.target.selectedIndex].text;
	monthSelect.style.color = "hsl(278, 68%, 11%)";
	month.textContent = selectedMonth;
});

yearSelect.addEventListener("input", (e) => {
	selectedYear = e.target.options[e.target.selectedIndex].text;
	yearSelect.style.color = "hsl(278, 68%, 11%)";
	year.textContent = selectedYear;
});

cvcNumberInput.addEventListener("input", (e) => {
	let cvc = removeUnderScore(e.target.value);
	cvcNumber.textContent = cvc;
	placeHolder(cvcNumber, "000");
});

Inputmask({
	mask: "9999 9999 9999 9999",
}).mask(cardNumberInput);

Inputmask({
	mask: "999",
}).mask(cvcNumberInput);

const checkName = () => {
	const regex = new RegExp("([a-zA-Z])");
	return regex.test(nameInput.value);
};

const checkCvc = () => {
	return !cvcNumberInput?.value.includes("_") && cvcNumberInput?.value.length
		? true
		: false;
};

const checkMonth = () => {
	return selectedMonth?.length ? true : false;
};

const checkYear = () => {
	return selectedYear?.length ? true : false;
};

const checkCardNumber = () => {
	const regex = new RegExp(
		"^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)"
	);
	return true;
	// return regex.test(cardNumberInput.value);
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const validityAr = [
		checkName(),
		checkCardNumber(),
		checkMonth(),
		checkYear(),
		checkCvc(),
	];

	if (validityAr.every(Boolean)) {
		form.classList.toggle("remove-layout", validityAr.every(Boolean));
		completeForm.classList.toggle("remove-layout", !validityAr.every(Boolean));
	} else {
		validityAr.forEach((isValid, id) => {
			errors[id].classList.toggle("none", isValid);
		});
	}
});

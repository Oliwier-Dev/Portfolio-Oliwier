const ui = {
    form:        document.querySelector("#form"),
    valueNumber: document.querySelector("#valueNumber"),
    fromUnit:    document.querySelector("#fromUnit"),
    toUnit:      document.querySelector("#toUnit"),
    output:      document.querySelector("#output")
};

ui.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = Number(ui.valueNumber.value);
    const from  = ui.fromUnit.value;
    const to    = ui.toUnit.value;

    if (isNaN(value)) return;

    const celsius = toCelsuis(value, from);
    const result  = fromCelsuis(celsius, to);
    ui.output.textContent = result;
})

function toCelsuis (value, unit) {
    if (unit === "celsius") return value;
    if (unit === "fahrenheit") return (value - 32) * 5/9;
    if (unit === "kelvin") return value - 273.15;
};

function fromCelsuis (value, unit) {
    if (unit === "celsius") return value;
    if (unit === "fahrenheit") return value * 9/5 + 32;
    if (unit === "kelvin") return value + 273.15;
}
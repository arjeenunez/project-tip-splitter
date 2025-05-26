function init() {
    let bill = 0;
    let people = 0;

    const updateDisplay = function (tipAmount, total) {
        const displays = document.querySelectorAll('.display__content--title');
        displays.forEach(function (display) {
            if (display.classList.contains('js__tip')) display.textContent = `₱${tipAmount.toFixed(2)}`;
            if (display.classList.contains('js__total')) display.textContent = `₱${total.toFixed(2)}`;
        });
    };

    const calculate = function () {
        return function (evt) {
            if (this.classList.contains('js__bill')) bill = +evt.target.value ?? 0;
            if (this.classList.contains('js__people')) people = +evt.target.value ?? 1;
            let tipAmount = 0;
            let total = bill;
            document.querySelectorAll('.js__choice').forEach(function (select) {
                if (select.classList.contains('state--active')) {
                    const tipPercentage = +(select.textContent.slice(0, -1) || +select.value);
                    if (tipPercentage > 0) {
                        tipAmount = (bill * tipPercentage) / 100;
                    }
                }
            });
            const tipAmountPerPerson = tipAmount / (people || 1);
            const totalPerPerson = (total + tipAmount) / (people || 1);
            updateDisplay(tipAmountPerPerson, totalPerPerson);
        };
    };

    document.querySelectorAll('.form__input').forEach(function (input, i) {
        input.addEventListener('input', calculate());
    });

    document.querySelector('.form__select--container').addEventListener('click', function (evt) {
        if (evt.target.classList.contains('js__choice')) {
            this.querySelectorAll('.js__choice').forEach(function (select) {
                select.classList.toggle('state--active', select.textContent === evt.target.textContent);
            });
        }
        calculate().call(evt.target, evt);
    });
}

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('form').onsubmit = function () {

        fetch('https://api.exchangeratesapi.io/v1/latest?access_key=7985054f8086355dbeb7d97a35af2cef')
            .then(response => response.json())
            .then(data => {
                const currencyFrom = document.querySelector('#currencyFrom').value.toUpperCase();
                const currencyTo = document.querySelector('#currencyTo').value.toUpperCase();
                const money = document.querySelector('#money').value;
                if (!money) {
                    alert('Please insert the amount of money to change.');
                    return false;
                }
                if (!currencyFrom | !currencyTo) {
                    alert('Please insert the type of currencies.')
                }
                if (currencyFrom in data.rates & currencyTo in data.rates) {
                    const rateInter = data.rates[currencyFrom];
                    const rateTo = data.rates[currencyTo];
                    const finalMoney = (rateTo * money / rateInter).toFixed(3)
                    if (finalMoney === 'NaN') {
                        alert('Amount of money must be a number.');
                        return false;
                    }
                    document.querySelector('#result').innerHTML = `${money} ${currencyFrom} is equal to ${finalMoney} ${currencyTo}.`;
                } else {
                    document.querySelector('#result').innerHTML = 'Invalid currency.';
                }
            })
            .catch(error => {
                console.log('Error: ', error)
            });

        return false;
    }


});
const API_KEY = 'EPPH26ID3PRXK6JV';
let month = ['2023-01-31', '2023-02-28', '2023-03-31', '2023-04-30'];
let course = [];

async function init() {
    await loadCourse();
    await loadMonthlyCourse();
    renderChart();
}

async function loadCourse() {
    let url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=' + API_KEY;  // Anstatt die Variable mit dem API Kex per ${} hinzuzufügen, können wir die Variable auch mit + anhängen.
    let response = await fetch(url); // response übersetzt ANTWORT. Hier rufen wir die Daten von der API ab.
    let responseAsJson = await response.json(); // Dann wandeln wir die daten in ein JSON um.
    let bitcoinPrice = (Math.round(responseAsJson['Realtime Currency Exchange Rate']['5. Exchange Rate']));
    let lastRefresh = (responseAsJson['Realtime Currency Exchange Rate']['6. Last Refreshed']);

    // console.log(Math.round(responseAsJson['Realtime Currency Exchange Rate']['5. Exchange Rate']));

    document.getElementById('course').innerHTML = /* html */ `
    <div class="btc-price">${bitcoinPrice} $</div>
    <span>Letzes Update</span>
    <div class="last-refresh">${lastRefresh}</div> 
    `;
    loadMonthlyCourse();
}

async function loadMonthlyCourse() {
    let url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=CNY&apikey=' + API_KEY;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let monthlyCourse = responseAsJson['Time Series (Digital Currency Monthly)'];
    console.log(monthlyCourse);

    for (i = 0; i < month.length; i++) {
        const courseEachMonth = Math.round(monthlyCourse[month[i]]['1a. open (CNY)']);   //Mit Math.round runden wir die Bitcoin Preis auf ganze Zahlen auf und entfernen die Nullen
        console.log(courseEachMonth);
        course.push(courseEachMonth);
    }
}


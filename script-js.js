document.addEventListener('DOMContentLoaded', () => {
    const averagePrice = document.getElementById('average-price');
    const cryptoTable = document.getElementById('crypto-table')?.getElementsByTagName('tbody')[0];
    const countdown = document.getElementById('countdown');

    function updateData() {
        fetch('http://127.0.0.1:3000/api/tickers')
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }

                // Clear existing table rows
                if (cryptoTable) {
                    cryptoTable.innerHTML = '';
                } else {
                    throw new Error('Table body not found');
                }

                // Calculate average price
                const avgPrice = data.length > 0
                    ? data.reduce((sum, item) => sum + parseFloat(item.last) || 0, 0) / data.length
                    : 0;
                averagePrice.textContent = `₹ ${avgPrice.toFixed(2)}`;

                // Populate table
                data.forEach((item, index) => {
                    const row = cryptoTable.insertRow();
                    const difference = ((item.last - avgPrice) / avgPrice * 100).toFixed(2);
                    const savings = Math.abs(item.last - avgPrice).toFixed(2);
                    const differenceColor = difference >= 0 ? 'color: #3dc6c1;' : 'color: #f44336;';
                    const savingsColor = item.last >= avgPrice ? 'color: #3dc6c1;' : 'color: #f44336;';
                    const savingsArrow = item.last >= avgPrice ? '▲' : '▼';

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item.name}</td>
                        <td>₹ ${parseFloat(item.last).toFixed(2)}</td>
                        <td>₹ ${parseFloat(item.buy).toFixed(2)} / ₹ ${parseFloat(item.sell).toFixed(2)}</td>
                        <td style="${differenceColor}">${difference}%</td>
                        <td style="${savingsColor}">${savingsArrow} ₹ ${savings}</td>
                    `;
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Update data initially and every 60 seconds
    updateData();
    setInterval(updateData, 60000);

    // Countdown timer
    let seconds = 60;
    setInterval(() => {
        seconds = seconds > 0 ? seconds - 1 : 60;
        if (countdown) {
            countdown.textContent = seconds;
        } else {
            console.error('Countdown element not found');
        }
    }, 1000);
});
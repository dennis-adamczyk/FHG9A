$(document).ready(function() {

  setTimeout(function() {
    $.getJSON('../js/result.json', function(result, textStatus) {
      var myChartObject = document.getElementById('myChart');
      var chart = new Chart(myChartObject, {
        type: 'pie',
        data: {
          datasets: [{
              data: [result.voting.bH, result.voting.wH, result.voting.bT, result.voting.wT],
              backgroundColor: [
                '#34495e',
                '#3498db',
                '#e74c3c',
                '#f1c40f'
              ],
              hoverBackgroundColor: [
                '#2c3e50',
                '#2980b9',
                '#c0392b',
                '#f39c12'
              ],
              borderColor: [
                '#EEEEEE',
                '#EEEEEE',
                '#EEEEEE',
                '#EEEEEE'
              ]
          }],
          labels: [
              'Schwarzer Hoodie',
              'Weißer Hoodie',
              'Schwarzes T-Shirt',
              'Weißes T-Shirt'
          ]
        },
        options: {
          cutoutPercentage: 50
        }
      });
    });
  }, 100);
});

// Global Options
Chart.defaults.font.family = 'Arial';
Chart.defaults.font.size = 18;
Chart.defaults.font.color = '#2C2C2C';

let myChart = document.getElementById('chart').getContext('2d');
sheets = JSON.parse(localStorage.getItem('sheetz'));

getCharts = () => {
  if (sheets != null) {
    let timeSheetChart = new Chart(myChart, {
      type: 'doughnut',
      data: {
        // labels: ['Administrative Tasks', 'Client Meetings', 'Team Meetings', 'Travel', 'Research'],
        labels: sheets.map((sheets) => sheets.taskName),
        datasets: [
          {
            label: 'Hours Spend',
            // data: [2, 3, 1.5, 0.5, 2],
            data: sheets.map((sheets) => sheets.taskTime),
            backgroundColor: ['#0069CE', '#0AB0BF', '#66E6A8', '#FF4E00', '#FD9E32'],
            borderWidth: 1,
            borderColor: '#666666',
            hoverBorderWidth: 4,
            hoverBorderColor: '#2C2C2C',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          // The chart title defines text to draw at the top of the chart.
          title: {
            display: true,
            text: 'Daily Time Sheet',
            padding: {
              bottom: 20,
            },
            font: {
              size: 20,
            },
          },
          // The chart legend displays data about the datasets that are appearing on the chart.
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
  }
};

document.addEventListener('DOMContentLoaded', getCharts);

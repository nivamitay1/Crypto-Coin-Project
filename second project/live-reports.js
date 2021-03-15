function liveReportTab() {
  const get = document.querySelector('#content');
  if (
    JSON.parse(localStorage.getItem(`tracking`)) == null ||
    JSON.parse(localStorage.getItem(`tracking`)).length < 1
  ) {
    alert('Please enter the coins you would like to follow');
  } else {
    get.innerHTML = `<div id="chartContainer" style="height: 300px; width: 100%; margin-top:5%;"></div>`;
    let stoper = JSON.parse(localStorage.getItem(`tracking`));
    let arrName = [];
    let arrValue = [];
    let trackObj = [];

    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];

    var chart = new CanvasJS.Chart('chartContainer', {
      theme: 'dark1', //"light1", "dark1", "dark2"
      zoomEnabled: true,
      title: {
        text: 'Coins value in USD chart',
      },
      axisX: {
        title: 'chart updates every 2 secs',
      },
      axisY: {
        prefix: '$',
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        fontSize: 22,
        fontColor: 'dimGrey',
        itemclick: toggleDataSeries,
      },
      data: [],
    });
    function add() {
      let datapointers = [
        dataPoints1,
        dataPoints2,
        dataPoints3,
        dataPoints4,
        dataPoints5,
      ];
      for (let i = 0; stoper.length; i++) {
        if (chart.options.data.length >= stoper.length) {
          break;
        }
        let dataPointAdd = {
          type: 'line',
          xValueType: 'dateTime',
          yValueFormatString: '$####.00',
          xValueFormatString: 'hh:mm:ss TT',
          showInLegend: true,
          name: `${arrName[i]}`,
          dataPoints: datapointers[i],
        };

        chart.options.data.push(dataPointAdd);
      }
    }
    console.log(stoper);
    // console.log(chart.options.data);
    function toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }

    var updateInterval = 2000;

    var time = new Date();
    console.log(time);

    async function updateChart(count) {
      if (JSON.parse(localStorage.getItem(`tracking`)) == null) {
        return;
      }
      let favArrLiveReport = JSON.parse(localStorage.getItem(`tracking`))
        .toString()
        .toUpperCase();

      const res = await fetch(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${favArrLiveReport}&tsyms=USD`
      );
      const liveReportsData = await res.json();
      let counter = 0;
      for (const report of Object.keys(liveReportsData)) {
        console.log();
        arrName[counter] = report;
        counter++;
      }
      counter = 0;
      for (const report of Object.values(liveReportsData)) {
        for (const i of Object.values(report)) {
          arrValue[counter] = i;
          counter++;
        }
      }
      count = count || 1;
      var deltaY1, deltaY2, deltaY3, deltaY4, deltaY5;
      for (let i = 0; i < count; i++) {
        time.setTime(time.getTime() + updateInterval);
        deltaY1 = Number(arrValue[0]);
        deltaY2 = Number(arrValue[1]);
        deltaY3 = Number(arrValue[2]);
        deltaY4 = Number(arrValue[3]);
        deltaY5 = Number(arrValue[4]);

        // pushing the new values
        dataPoints1.push({
          x: time.getTime(),
          y: deltaY1,
        });
        dataPoints2.push({
          x: time.getTime(),
          y: deltaY2,
        });
        dataPoints3.push({
          x: time.getTime(),
          y: deltaY3,
        });
        dataPoints4.push({
          x: time.getTime(),
          y: deltaY4,
        });
        dataPoints5.push({
          x: time.getTime(),
          y: deltaY5,
        });
      }
      add();
      // updating legend text with  updated with y Value
      for (let i = 0; i < stoper.length; i++) {
        this['deltaY' + i] = arrValue[i];
        chart.options.data[i].legendText =
          ` ${arrName[i]}  $` + this['deltaY' + i];
        chart.options.data[i].name = arrName[i];
      }
      //   chart.options.data[2].legendText = ` ${arrName[2]}  $` + deltaY3;
      chart.render();
    }
    loadingSpiner.classList.add('hidden');

    // generates first set of dataPoints
    updateChart(10);
    setInterval(function () {
      updateChart();
    }, updateInterval);
  }
}

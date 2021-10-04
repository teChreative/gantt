

function createChart(e) {
  // 1 - Grab two lists
  const days = document.querySelectorAll(".chart-values li");
  const tasks = document.querySelectorAll(".chart-bars li");
  // 2 - Convert list into an array
  const daysArray = [...days];
  // 3 - Loop through
  tasks.forEach(el => {
    const duration = el.CDATA_SECTION_NODE.duration.split("-");
    const startDay = duration[0];
    const endDay = duration[1];
    let left = 0, width = 0;

    if (startDay.endsWith("1/2")) {
      const filteredArray = daysArray.filter(day => day.textContent == startDay.slice(0, -1));
      left = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2;
    }
  });

}

window.addEventListener("load", createChart);
window.addEventListener("resize", createChart);

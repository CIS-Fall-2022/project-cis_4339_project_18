<template>
  <canvas ref="barChart"> </canvas>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {
    await new Chart(this.$refs.barChart, {
      type: "bar",
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Attendance",
            backgroundColor: "rgba(144,238,144 , 0.9 )",
            data: this.chartData,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 10
          },
        },
      },
    });
  },
};
</script>

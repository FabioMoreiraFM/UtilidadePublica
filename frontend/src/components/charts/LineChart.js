import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Array | Object,
    },
    chartLabels: {
      type: Array
    }
  },
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
  computed: {
    charData: function() {
      return this.chartData
    }
  },
  watch: {
    data: function() {
      this._chart.destroy();
      this.renderChart(this.chartData, this.options)
    }
  }
}
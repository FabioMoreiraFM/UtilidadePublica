import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
    if (value) {
      return moment(String(value)).format('DD/MM/YYYY')
    }
})

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  });
  return formatter.format(value);
});

Vue.filter('toPercent', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  });
  return formatter.format(value);
});
<template>
  <v-app id="netPayForm">
    <div class="netPayContainer">
      <div class="form">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="netInfo.grossPay" :rules="grossPay" label="Salário Bruto" v-money="money" required></v-text-field>
          <v-text-field v-model="netInfo.dependents" :rules="dependents" label="Dependentes" v-mask="'##'" required></v-text-field>
          <v-text-field v-model="netInfo.otherDiscounts" :rules="otherDiscounts" label="Outros descontos" v-money="money" required></v-text-field>
          
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="calculateNetPay">Procurar</v-btn>          
        </v-form>
      </div>
    </div>
    <div class="netPayresults" v-if="showResults">
      <v-card color="#385F73" dark class="mr-2">
        <v-card-title class="headline">{{ total.grossPay | toCurrency }}</v-card-title>
        <v-card-subtitle>Salário Bruto</v-card-subtitle>
      </v-card>

      <v-card color="#59080f" dark class="mr-2 ml-2">
        <v-card-title class="headline">{{ total.discounts | toCurrency}}</v-card-title>
        <v-card-subtitle>Descontos</v-card-subtitle>
      </v-card>

      <v-card color="#1d8041" dark class="ml-2">
        <v-card-title class="headline">{{ total.netPay | toCurrency}}</v-card-title>
        <v-card-subtitle>Salário Líquido</v-card-subtitle>
      </v-card>           
    </div>
    <div class="details mt-5" v-if="showResults">
      <v-btn color="warning" v-if="!showMoreDetails" class="mr-4" @click="showMoreDetails = !showMoreDetails">Detalhar</v-btn>           
      <v-btn color="warning" v-if="showMoreDetails" class="mr-4" @click="showMoreDetails = !showMoreDetails">Esconder</v-btn>           
    </div>
    <div class="detailsTable" v-if="showMoreDetails">
      <v-data-table :headers="headers" :items="discounts" class="elevation-1" hide-default-footer>
        <template v-for="header in headers.filter((header) => header.hasOwnProperty('formatter'))" v-slot:[`item.${header.value}`]="{ value }">
          {{ header.formatter(value) }}
        </template>
        <template slot="body.append">
          <tr>
            <th colspan="2">Total</th>
            <th>{{ total.grossPay | toCurrency }}</th>
            <th>{{ total.discounts | toCurrency }} </th>
          </tr>
          <tr>
            <th colspan="2">Salário Líquido</th>
            <th colspan="2" class="netPayCell">{{ total.netPay | toCurrency }}</th>
          </tr>          
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
    app: 'NetPayCalculator',
    data: function() {
      return {
        valid: true,
        showResults: false,
        showMoreDetails: false,
        netInfo: {},
        grossPay: [v => !!v || 'Campo Salário Bruto é obrigatório'],
        otherDiscounts: [v => !!v || 'Campo outros descontos é obrigatório'],
        dependents: [v => !!v || 'Campo dependentes é obrigatório'],
        total: {},
        discounts: [],
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false /* doesn't work with directive */
        },
        headers: [
          {text: 'Descrição', value:'description', sortable: false,},
          {text: 'Ref.', value:'ref', formatter: this.formatPercent, sortable: false,},
          {text: 'Proventos', value:'earnings', formatter: this.formatCurrency, sortable: false,},
          {text: 'Descontos', value:'discounts', formatter: this.formatCurrency, sortable: false,}
        ]
      }
    },
    methods: {
      calculateNetPay() {
        if (!this.$refs.form.validate()) {
          return 
        }

        axios.get(`http://localhost:3000/calculateNetPay`, {params: this.netInfo} )
          .then(res => {
            this.total = res.data.total,
            this.discounts = res.data.detailsTable
            this.showResults = true
          })
          .catch()
      },
      formatCurrency(value) {
          return this.$options.filters.toCurrency(value)
      },
      formatPercent(value) {
          return this.$options.filters.toPercent(value)
      },      
      reset() {
        this.$refs.form.reset()
      }
    }
}
</script>

<style>
#netPayForm {
  height: 100%;
}

.netPayContainer {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  width: 50%;
}

.netPayresults{
  display: flex;

  justify-content: center;
  margin-top: 30px;
}

.detailsTable {
  display: flex;  
  justify-content: center;

  margin: 50px 0 70px 0;
}

.v-data-table {
  width: 900px;
}

.netPayCell {
  text-align: center !important;
}
</style>
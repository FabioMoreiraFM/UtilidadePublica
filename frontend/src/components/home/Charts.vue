<template>
    <div class="chartView">
        <v-app id="chartForm">
            <div class="form">      
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="dataInicial" label="Data Inicial" v-mask="'##/##/####'" required></v-text-field>                    
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field v-model="dataFinal" label="Data Final" v-mask="'##/##/####'" required></v-text-field>
                        </v-col>
                    </v-row>
                    </v-container>
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="getDolarHistory">Procurar</v-btn>          
                </v-form>      
            </div>
            <div class="errorContainer" v-if="errorMessage">
                <v-alert prominent type="error">
                    <v-row align="center">
                        <v-col class="grow"> {{ errorMessage }} </v-col>
                    </v-row>
                </v-alert>
            </div>
            <div class="chartContainer" v-if="!errorMessage">
                <line-chart :chart-data="datacollection"></line-chart>        
            </div>
        </v-app>
    </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.js'
import axios from 'axios'

export default {
    app: 'Charts',
    components: {LineChart}  ,
    data () {
        return {
            valid: true,
            datacollection: null,
            dolarHistory: null,
            dataInicial: '01/01/2021',
            dataFinal: '06/02/2021',
            errorMessage: ''
        }
    },
    mounted() {
        this.getDolarHistory()                
    },
    methods: {
        fillData() {
            this.datacollection = {
                labels: this.dolarHistory.map(el => this.$options.filters.formatDate(el.dataHoraCotacao)),
                datasets: [
                            {
                                label: 'Dólar Compra',
                                backgroundColor: '#ebfdff',
                                borderColor: '#B3E5FC',
                                data: this.dolarHistory.map(el => el.cotacaoCompra )
                            }
                        ]
            }            
        },
        getDolarHistory() {
            let dtInicial = "'" + this.dataInicial.replaceAll('/', '%2F') + "'"
            let dtFinal =  "'" + this.dataFinal.replaceAll('/', '%2F') + "'"

            let urlBC = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial="+dtInicial+"&@dataFinalCotacao="+dtFinal+"&$format=json&$select=cotacaoCompra,dataHoraCotacao" ;
            axios.get(`http://localhost:8080/${urlBC}`) 
            .then(res => {
                this.dolarHistory = res.data.value
                this.fillData()
                this.errorMessage = ''
            })
            .catch(this.errorMessage = "Erro desconhecido. Evite escolher datas festivas como data inicial/final. A API do Banco Central não faz tratamento de erros quando as datas limites não tem informação de dólar relacionado.")
        }
    }
}
</script>

<style>
.chartView {
    height: 100%;
}

.chartContainer {
    margin-top: 100px;
}

.chartView .form {
    display: flex;
    justify-content: center;    
    width: 100%;
}

.errorContainer {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}

.errorContainer .v-alert {
    width: 900px;
}
</style>
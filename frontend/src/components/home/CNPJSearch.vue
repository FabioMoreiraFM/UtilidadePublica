<template>
  <v-app id="cnpjForm">
    <div class="cnpjSearchContainer">
      <div class="form">      
          <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="cnpj" :counter="18" :rules="cnpjRules" label="CNPJ" v-mask="'##.###.###/####-##'" required></v-text-field>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="searchCNPJ">Procurar</v-btn>          
          </v-form>      
      </div>
      <div class="errorMessage" v-if="errorMessage">
        <span class="businessName">
          {{ errorMessage }}
        </span>
      </div>
      <div class="results" v-if="businessInfo.nome">
        <span class="businessName">
          {{ businessInfo.nome }}
        </span>
        <div class="businessInfo">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.cnpj" label="CNPJ"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="9">
                <v-text-field readonly v-model="businessInfo.fantasia" label="Fantasia"></v-text-field>
              </v-col>              
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.tipo" label="Tipo"></v-text-field>
              </v-col>              
              <v-col cols="12" sm="6" md="2">
                <v-text-field readonly v-model="businessInfo.situacao" label="Situação"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field readonly v-model="businessInfo.data_situacao" label="Data da Situação"></v-text-field>
              </v-col>              
              <v-col cols="12" sm="6" md="2">
                <v-text-field readonly v-model="businessInfo.abertura" label="Abertura"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly ref="capitalSocial" v-model="businessInfo.capital_social" label="Capital Social" v-money="money"></v-text-field>
              </v-col>              
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field readonly v-model="businessInfo.natureza_juridica" label="Natureza Jurídica"></v-text-field>
              </v-col>
            </v-row>
            <v-row> 
              <v-col cols="12" sm="6" md="6">
                <v-select v-model="qsa[0]" :items="qsa"  item-text="id" item-value="id" label="Quadro de Sócios"></v-select>
              </v-col>              
              <v-col cols="12" sm="6" md="6">
                <v-select v-model="atividadePrincipal[0]" :items="atividadePrincipal"  item-text="id" item-value="id" label="Atividade Principal"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="atividadeSecundaria[0]" :items="atividadeSecundaria"  item-text="id" item-value="id" label="Atividade Secundária"></v-select>
              </v-col>                            
            </v-row>
            <h3>Endereço</h3>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.logradouro" label="Logradouro"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.numero" label="Número"></v-text-field>
              </v-col>                                                                      
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.complemento" label="Complemento"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.bairro" label="Bairro"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.municipio" label="Município"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.uf" label="UF"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.cep" label="CEP"></v-text-field>
              </v-col>              
            </v-row>
            <h3>Contato</h3>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.email" label="E-mail"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field readonly v-model="businessInfo.telefone" label="Telefone(s)"></v-text-field>
              </v-col>                            
            </v-row>
          </v-container>
          <div class="footerBusinessInfo">
            <v-container>
            {{ "Data da última atualização: " }} {{businessInfo.ultima_atualizacao | formatDate }}
            </v-container>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
    app: 'CNPJSearch',
    data: function() {
      return {
        valid: true,
        cnpj: '',
        errorMessage: '',
        businessInfo: {},
        atividadePrincipal: [],
        atividadeSecundaria: [],
        qsa: [],
        cnpjRules: [
          v => !!v || 'Campo CNPJ é obrigatório',
          v => (v && v.length == 18) || 'O campo CNPJ deve conter 18 caracteres'
        ],
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false /* doesn't work with directive */
        }
      }
    },
    methods: {
      searchCNPJ() {
        if (!this.$refs.form.validate()) {
          return 
        }

        var cnpjSearch = this.cnpj
        cnpjSearch = cnpjSearch.replaceAll('.', '')
        cnpjSearch = cnpjSearch.replaceAll('/', '')
        cnpjSearch = cnpjSearch.replaceAll('-', '')

        axios.get(`http://localhost:8080/https://www.receitaws.com.br/v1/cnpj/${cnpjSearch}`) 
          .then(res => {
            if (res.data.status == "ERROR") {
              this.errorMessage = res.data.message
              return
            } else {
              this.errorMessage = ''
            }

            this.businessInfo = res.data            
            this.atividadePrincipal = this.businessInfo.atividade_principal.map(el => { return {"id": el.code + " - " + el.text} } )
            this.atividadeSecundaria = this.businessInfo.atividades_secundarias.map(el => { return {"id": el.code + " - " + el.text} } )
            this.qsa = this.businessInfo.qsa.map(el => { return {"id": el.qual + " - " + el.nome} } )
            this.$refs.capitalSocial.$el.getElementsByTagName('input')[0].value = this.businessInfo.capital_social
          })
          .catch(console.log("TESTE"))
      },
      reset() {
        this.$refs.form.reset()
      }
    }
}
</script>

<style>
.cnpjSearchContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.results {
  margin-top: 30px;
}

.v-application--wrap {
  min-height: 87vh !important;
}

.businessInfo {
  margin: 30px;
}

.footerBusinessInfo {
  color: gray;
  text-align: left;
}

.businessInfo h3 {
  text-align: left;
  margin: 20px 0 20px 0;
  color: rgb(70, 67, 67);

  border-color: rgb(167, 162, 162);
  border-width: 1px;
  border-bottom-style: dashed;
}

.businessName {
  font-size: 25px;
}

.errorMessage {
  width: 100%;
  margin-top: 30px;  
}
</style>
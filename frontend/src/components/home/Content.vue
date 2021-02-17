<template>
  <div class="content">
      <div class="contentLogo">
        <font-awesome-icon :icon="['fas', 'chess']"></font-awesome-icon>
        <span class="text">
          Utilidade Pública
        </span>
      </div>
      <div class="introduction">
        Utilize diversas ferramentas públicas e utilitários em geral em um só lugar!
      </div>
      <div class="features">
        <router-link to="/cnpjSearch"><FeatureCard name="Consultar CNPJ" icon="search" /></router-link>
        <router-link to="/netPayCalculator"><FeatureCard name="Salário Líquido" icon="calculator" /></router-link>
        <router-link to="/charts"><FeatureCard name="Gráficos" icon="chart-pie" /></router-link>
      </div>
  </div>
</template>

<script>
import FeatureCard from '@/components/content/FeatureCard.vue'

export default {
  app: "Content",
  components: {FeatureCard}
}
</script>

<style>
.content {
  background-color: var(--light-primary-color);
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: 70px;
}

.contentLogo {  
  margin-bottom: 30px;
}

.contentLogo .text {
  font-size: 50px;
}

.contentLogo svg {
  font-size: 90px;
}

.introduction {
  margin-bottom: 50px;
}

.features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.introduction {
  font-size: 25px;
}
</style>
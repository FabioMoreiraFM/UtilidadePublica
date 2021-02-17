<template>
  <div class="sideMenu">
      <router-link to="/cnpjSearch"><MenuOption text="Consultar CNPJ" iconName="search" /></router-link>
      <router-link to="/netPayCalculator"><MenuOption text="Salário Líquido" iconName="calculator" /></router-link>
      <router-link to="/charts"><MenuOption text="Gráficos" iconName="chart-pie" /></router-link>
  </div>
</template>

<script>
import MenuOption from '@/components/sideMenu/MenuOption'

export default {
  app: 'SideMenu',
  components: {MenuOption}
}
</script>

<style>
.sideMenu { 
  background-color: var(--dark-primary-color);
}
</style>
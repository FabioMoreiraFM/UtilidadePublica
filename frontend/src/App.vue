<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from '@/template/Home'

export default {
  name: 'App',
  components: {Home}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

body {
  margin: 0;
}

* {
  box-sizing: border-box;  
}

:root {
  --accent-color          : #00BCD4;
  --dark-primary-color    : #363333;
  --dark-secundary-color  : #1f1b1b;
  --default-primary-color : #9E9E9E;
  --light-primary-color   : #F5F5F5;  
  --grey-color: rgb(163, 162, 162);
}

a {
  text-decoration: none;
}

a:visited {
  color: #2c3e50;
}

</style>

<template>
  <header class="header">    
    <router-link to="/">
      <div class="logo">
        <font-awesome-icon :icon="['fas', 'chess']"></font-awesome-icon>
      </div>
    </router-link>
    <div class="searchBar">
      <v-text-field label="Pesquise no site" append-outer-icon="mdi-magnify" @click:append-outer="search"></v-text-field>
    </div>
    <div class="login">
      <router-link to="/signup"><v-btn class="ma-1" color="grey" text>Cadastrar</v-btn></router-link>
      <router-link to="/signup"><v-btn class="ma-2" outlined color="primary">Entrar</v-btn></router-link>
    </div>
  </header>
</template>

<script>
export default {
  app: 'Header',
  methods: {
    search() {
      this.$router.push({path: '/missingPage'})            
    }
  }
}
</script>

<style>
.header {
  height: 3.3rem;
  background-color: var(--accent-color);

  display: flex;
}

.logo {  
  display: flex;
  align-items: center;
  justify-content: center;

  width: 112px;  
  background-color: rgba(0, 102, 128, 0.171);
  border-radius: 0 500px 10px 0;
  height: 100%;  
}


.logo svg {
  font-size: 40px;
  color: rgb(255, 255, 255);
}

.searchBar {
  margin-left: 30px;
  flex-grow: 1;  
}

.searchBar .v-input{
  width: 50%;
}

.login {
  justify-self: flex-end;
  margin: 0 0 0 20px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.login > button {
  margin-right: 20px;
}

</style>
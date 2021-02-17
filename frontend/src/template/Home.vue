<template>
  <div class="home">
      <Header />
      <div class="sideMenuAndContent">
        <SideMenu />
        <div class="contentContainer">
            <router-view></router-view>
            <Footer/>
        </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/home/Header'
import SideMenu from '@/components/home/SideMenu'
import Footer from '@/components/home/Footer'

export default {
    name: 'Home',
    components: {Header, SideMenu, Footer}
}
</script>

<style>
.home {
    display: flex;    
    flex-direction: column;

    height: 100%;
}

.sideMenuAndContent {
    display: flex;

    height: 100%;
}

.contentContainer {
    display: flex;
    flex-direction: column;

    width: 100%;
    overflow-y: scroll;
}
</style>
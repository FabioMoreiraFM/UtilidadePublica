<template>
    <div class="menuOption">        
        <font-awesome-icon :icon="iconName"></font-awesome-icon>
        <span>{{ text }}</span>
    </div>    
</template>

<script>
export default {
    name: 'MenuOption',
    props: {iconName: String, text: String}
}
</script>

<style>
.menuOption {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 6rem;
}

.menuOption svg {
  color: var(--grey-color);

  font-size: 30px;
  margin-bottom: 10px;
}

.menuOption span {
  color: var(--grey-color);
  font-weight: bold;
}

.menuOption:hover {
    background-color: var(--dark-secundary-color);
}

.menuOption:hover svg{
    color: var(--light-primary-color);
}

.menuOption:hover span{
    color: var(--light-primary-color);
}

</style>
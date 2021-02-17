<template>
  <footer class="footer">
      Versão 0.0.0  <font-awesome-icon icon="tags"></font-awesome-icon>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
.footer {
  background-color: var(--default-primary-color);
  height: 3rem;
  padding-right: 25px;
  font-weight: bold;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.footer svg {
  margin-left: 5px;
}
</style>
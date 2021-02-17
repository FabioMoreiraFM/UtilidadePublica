<template>
    <div class="missingPageContainer">
        <div>
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
        </div>
        <div>
            <span>Em construção</span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.missingPageContainer {
    display: flex;
    flex-direction: column;
    
    align-items: center;
    justify-content: center;

    flex-grow: 1;
}

.missingPageContainer {
    font-size: 80px;
}
</style>
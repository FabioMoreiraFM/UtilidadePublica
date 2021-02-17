<template>
    <div class="featureCardContainer">
        <font-awesome-icon :icon="icon"></font-awesome-icon>
        <span class="textFeature">
            {{ name }}
        </span>
    </div>
</template>

<script>
export default {
    app: 'FeatureCard',
    props: {name: String, icon: String}
}
</script>

<style>
.featureCardContainer {
    display: flex;
    flex-direction: column;

    align-items: center;    
    margin: 10px;
    padding: 30px;
    width: 150px;
    height: 150px;

    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 20px;    
}

.featureCardContainer svg {
    font-size: 25px;
}

.textFeature {
    margin-top: 20px;
    font-size: 20px;
}

.featureCardContainer:hover {  
    border-style: solid;
    border-color: var(--accent-color);         
    transform: scale(1.2);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
}
</style>
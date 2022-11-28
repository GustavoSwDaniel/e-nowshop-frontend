<template>
    <div class="main-container">
        <button id="item">
            <div class="container">
                <div class="item">
                    <img :src="imageItem" alt="" id="imgItem">
                </div>
                <div class="info-container">
                    <div class="infos">
                        <h3>{{ nameItem }}</h3>
                        <div class="rating">
                            <star-rating rating="2.5" :read-only="true" :increment="0.01" v-bind:star-size="20"
                                :show-rating="false" active-color="#d50000">
                            </star-rating>
                        </div>
                        <p>R$ {{ priceItem }}</p>
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>


<script>
import StarRating from 'vue-star-rating'



export default {
    name: 'Item',
    components: {
        StarRating
    },
    props: [
        'title',
        'nameItem',
        'priceItem',
        'imageItem'
    ]

}

</script>

<style lang="scss" scoped>
.container {
    max-height: 100%;
    height: 320px;
    background-color: #ffffff;
    border: 3px solid #6969693c;

}


#item {
    background: transparent;
    border-color: transparent;
    transition: 0.5s;
}

#item:hover{
    border-color:#d50000;
}

.item {
    display: flex;
    justify-content: center;
    background-color: #e0e0e0;

}

img {
    max-width: 60%;
    max-height: 60%;
    object-fit: contain
}

.item #imgItem {
    height: auto;
    margin-top: 25%;
    margin-bottom: 10%;
}

h3 {
    overflow: hidden;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

a {
    color: #000000;
    text-decoration: none;
    transition: 0.5s;
}

a:hover {
    color: #3d3d3d;

}

p {
    position: absolute;
    font-size: 20px;
    bottom: 4%;
}

.infos {
    margin-left: 5%;
}

.rating {
    position: absolute;
    bottom: 15%;
    left: 4%;
}
</style>
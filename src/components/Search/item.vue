<template lang="pug">
div.card.ml-2.is-flex.is-flex-direction-column(class="item" @click="changePage($event, 'product')")
    div(class="card-item")
        div(class="image-card")
            img(:src="imageItem" alt="" id="imgItem" loading="lazy")              
        div(class="content-item")
            div(class="rating")
                star-rating(:rating="2" :read-only="true" :increment="0.01" 
                    v-bind:star-size="20" :show-rating="false"
                    active-color="#d50000")
            div(class="title-container")
                a(href="#" class="item-number") {{ nameItem }} 
            div(class="price")
                p R$ {{ priceItem }}
            div(class="split-price")
                p(class="split") Dividido em 12x sem juros
        
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
        'uuidItem',
        'nameItem',
        'priceItem',
        'imageItem'
    ],
    methods: {
        addCard() {
            console.log('addCard')
        },
        changePage(e, namePage) {
            e.preventDefault();
            this.$router.push({
                name: namePage,
                params: { id: this.uuidItem },
            });
        },
    }

}

</script>
    
<style lang="scss" scoped>
.item-number {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.split{
    font-size: 0.8rem;
    color: #9e9e9e;
}

.item {
    flex: 0 0 calc(100% - 1rem);
    margin-bottom: 1rem;
    height: 29rem;
    cursor: pointer;
}

#imgItem{
    display: flex;
    margin-top: 2px;
}

.card-item {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.content-item {
    display: flex;
    flex-direction: column;
    height: 50%;
    justify-content: center;
    margin-left: 1rem;
}

p {
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    background: #fff;
}

.image-card {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
}

.title-container {
    height: 20%;
}


@media screen and (max-width: 1599px) {
    .addCardButton {
        font-size: 0.60em;
    }

    .item {
        flex: 0 0 calc(100% - 1rem);
        margin-bottom: 1rem;
        height: 20rem;
    }

    p {
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background: #fff;
        font-size: 10px;
    }

    p.title.is-4 {
        font-size: 15px;
    }
}

@media screen and (min-width: 769px) and (max-width: 1139px) {
    .addCardButton {
        font-size: 0.40em;
    }

    .item {
        flex: 0 0 calc(100% - 1rem);
        margin-bottom: 1rem;
        height: 18rem;
    }

    p {
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background: #fff;
        font-size: 10px;
    }

    p.title.is-4 {
        font-size: 15px;
    }
}</style>
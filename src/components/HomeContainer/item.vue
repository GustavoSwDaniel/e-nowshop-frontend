<template lang="pug">
div.card.ml-2.is-flex.is-flex-direction-column(class="item" @click="changePage($event)")
    div.card-image
        figure.image.is-256x256
            img(:src="imageItem" alt="" id="imgItem")
            
    div.content
        div.is-flex.is-flex-direction-column.is-align-items-start
            p.title.is-4 {{ nameItem }}
            star-rating(:rating="2" :read-only="true" :increment="0.01" 
                    v-bind:star-size="20" :show-rating="false"
                    active-color="#d50000")
            div.is-align-items-start.ml-2.mt-5
                p R$ {{ priceItem }}
        div.container-buttons
            div(class='buttons')
                button.button(class="addCardButton" @click="addCard") Add ao carrinho
                button.button(class="addCardButton") Comprar Agora
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
    ],
    methods: {
        addCard() {
            console.log('addCard')
        },
        changePage(e) {
            e.preventDefault();
            console.log('changePage')
            this.$router.push({ name: 'product',
            params: { id: 1},
            });
        },
    }

}

</script>

<style lang="scss" scoped>
.item {
    flex: 0 0 calc(100% - 1rem);
    margin-bottom: 1rem;
    height: 29rem;
    cursor: pointer;
}

p {
    width:100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    background:#fff;
}


.item #imgItem {
    width: 100%;
    height: auto;
}
.rating {
    position: absolute;
    bottom: 15%;
    left: 4%;
}
.addCardButton {
    color: white;
    font-weight: bold;
    background-color: #c05454;
    transition: 0.5s;
    border: none;
    border-radius: 12px;
    font-size: 0.90rem;
    transition: 0.5s ease-in-out
} 

.addCardButton:hover {
    color: rgb(190, 190, 190);
}

.buttons {
    display: flex;
    margin-left: 7px;
    margin-right: 7px;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
}

.container-buttons{
    display: flex;
    justify-content: space-between
}

.button:focus{
    border-color: #ff8989;
    color: white;
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
        width:100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background:#fff;
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
        width:100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        background:#fff;
        font-size: 10px;
    }
    p.title.is-4 {
        font-size: 15px;
    }
  }


</style>
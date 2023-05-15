<template lang="pug">
div.modal.is-active
    div.modal-background(style="background-color: rgba(0, 0, 0, 0.5);" @click.self="$emit('close')")
    div.modal-content(style="max-width: 60%; width: 50%;")
        header.modal-card-head
            p.modal-card-title Adicionara endereço
            button.delete(@click="$emit('close')")
        section.modal-card-body
            form(class="form-address")
                div.control(v-for="endereco in address" class="radiobtn" )
                    input(type="radio" name="drone" :value="endereco.id" :id="endereco.id" :checked="endereco.main" @click="setAddress(endereco.id)")
                    label(:for="endereco.id" class="label-address") 
                        div.is-flex
                            label(class="address-field") Rua:  
                            p {{endereco.street}}
                        div.is-flex
                            label(class="address-field") Cidade:  
                            p {{endereco.city}}
                        div.is-flex
                            label(class="address-field") Número:  
                            p {{endereco.number}}
                        div.is-flex
                            label(class="address-field") Estado:  
                            p {{endereco.state}}
                        div.is-flex
                            label(class="address-field") CEP:  
                            p {{endereco.cep}}
                        div.is-flex
                            label(class="address-field") Bairro:  
                            p {{endereco.village}}
        footer.modal-card-foot
            button.button.is-success(@click="createAddress(); $emit('close')") Salvar
            button.button.is-danger(@click.self="$emit('close')") Cancelar
</template>
    
<script>
export default {
    props: {
        address: {
            type: Array,
            default: []
        }
    },
    data: () => {
        return{
            chosenAddress: ''
        }
    },
    methods: {
        async setAddress(id) {
             this.chosenAddress = id
        }
    },
    mounted(){
        console.log(this.address)
    }
}
</script>
        
<style lang="scss" scoped>
.modal-card-foot {
    display: flex;
    justify-content: center;
}

.form-address {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 2px;
}

.address-field {
  margin-right: 10px;
  font-weight: bold;
  display: flex;
}

.address-data {
  display: flex;
  flex-direction: column;

}

$accentcolor: #b87171;
$lightcolor: #fff;
$darkcolor: #444;

form {
    width: 60%;
    margin: 50px auto 0;
    font-size: 15px;
}

.radiobtn {
    position: relative;
    display: block;

    .label-address {
        display: block;
        background: lighten($accentcolor, 30%);
        color: $darkcolor;
        border-radius: 5px;
        padding: 29px 20px;
        border: 2px solid lighten($accentcolor, 20%);
        margin-bottom: 5px;
        cursor: pointer;

        &:after,
        &:before {
            content: "";
            position: absolute;
            right: 11px;
            top: 11px;
            width: 20px;
            height: 20px;
            border-radius: 3px;
            background: lighten($accentcolor, 15%);
        }

        &:before {
            background: transparent;
            transition: 0.1s width cubic-bezier(0.075, 0.82, 0.165, 1) 0s,
                0.3s height cubic-bezier(0.075, 0.82, 0.165, 2) 0.1s;
            z-index: 2;
            overflow: hidden;
            background-repeat: no-repeat;
            background-size: 13px;
            background-position: center;
            width: 0;
            height: 0;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNS4zIDEzLjIiPiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE0LjcuOGwtLjQtLjRhMS43IDEuNyAwIDAgMC0yLjMuMUw1LjIgOC4yIDMgNi40YTEuNyAxLjcgMCAwIDAtMi4zLjFMLjQgN2ExLjcgMS43IDAgMCAwIC4xIDIuM2wzLjggMy41YTEuNyAxLjcgMCAwIDAgMi40LS4xTDE1IDMuMWExLjcgMS43IDAgMCAwLS4yLTIuM3oiIGRhdGEtbmFtZT0iUGZhZCA0Ii8+PC9zdmc+);
        }
    }

    input[type="radio"] {
        display: none;
        position: absolute;
        width: 100%;
        appearance: none;

        &:checked+label {
            background: lighten($accentcolor, 15%);
            animation-name: blink;
            animation-duration: 1s;
            border-color: $accentcolor;

            &:after {
                background: $accentcolor;
            }

            &:before {
                width: 20px;
                height: 20px;
            }
        }
    }
}

@keyframes blink {
    0% {
        background-color: lighten($accentcolor, 15%);
    }

    10% {
        background-color: lighten($accentcolor, 15%);
    }

    11% {
        background-color: lighten($accentcolor, 20%);
    }

    29% {
        background-color: lighten($accentcolor, 20%);
    }

    30% {
        background-color: lighten($accentcolor, 15%);
    }

    50% {
        background-color: lighten($accentcolor, 20%);
    }

    45% {
        background-color: lighten($accentcolor, 15%);
    }

    50% {
        background-color: lighten($accentcolor, 20%);
    }

    100% {
        background-color: lighten($accentcolor, 15%);
    }
}
</style>
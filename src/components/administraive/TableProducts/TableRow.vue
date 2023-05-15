<template lang="pug">
tr
  td
    img(:src="this.image", alt="")
  td {{this.uuid}}
  td {{this.name}}
  td R$ {{this.price}}
  td {{this.unity}}
  td {{this.created_at}}
  td {{this.raiting}}
  td {{this.category}}
  td
    button.button.is-info.is-rounded.is-hovered.is-small(@click="isOpenUpdateModal = true") Editar
    button.button.is-danger.is-rounded.is-hovered.is-small(@click="isOpenDeletarModal = true") Remover
ModalVue(v-if="isOpenDeletarModal", @close="isOpenDeletarModal = false" :uuid_product="this.uuid")  
UpdateItemVue(v-if="isOpenUpdateModal", @close="isOpenUpdateModal = false", :uuid="this.uuid", :name="this.name", :description="this.description", :price="this.price", :unity="this.unity")

</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import ModalVue from './Modal.vue';
import UpdateItemVue from "./UpdateItem.vue";

import { ref } from 'vue';

export default {
  name: 'TableRow',
  props: ["uuid", "name", "price", "unity", "created_at", "raiting", "category", "image", "description"],
  components: {
    ModalVue,
    UpdateItemVue
  },
  data() {
    return {
      isOpenUpdateModal: false,
      isOpenDeletarModal: false
    }
  },
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
      buttonTeste: false,
      timedTrigger: false
    });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return {
      ModalVue,
      popupTriggers,
      TogglePopup
    }
  }
}
</script>



<style lang="scss" scoped>
table td {
  width: 110px;
  border: 1px solid #ff000017;
  padding: 10px 15px;
  box-sizing: unset;

}

tr>td>img {
  display: inline-block;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 2px 6px #0003;
}

tr:hover {
  filter: drop-shadow(0px 2px 6px rgba(255, 0, 0, 0.291));
}

.button {
  margin-left: 2px;
}
</style>
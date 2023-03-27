<template lang="pug">
HeaderVue
ItemMain
</template>
  
<script>
import HeaderVue from '@/components/Header.vue';
import ItemMain from '@/components/ItemPage/ItemMain.vue';

export default {
    name: 'item',
    components: {
        HeaderVue,
        ItemMain
    }
}
</script>
  
<style scoped></style>
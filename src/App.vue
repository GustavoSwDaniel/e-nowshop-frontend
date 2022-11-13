<template>
  <div id="app">
      
    <router-view/>
  </div>
</template>

<script>
import HeaderVue from './components/Header.vue';
import FooterVue from './components/Footer.vue';

export default {
	components: {
		HeaderVue,
		FooterVue
	}
}

</script>

<style>
* {
    padding: 0;
    margin: 0;
  }
</style>

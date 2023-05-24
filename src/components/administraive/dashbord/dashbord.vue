<template lang="pug">
div(class="dashbord-container")
  div(class="title-container")
    h1.title Dashboard
  hr(style="margin-bottom: 3rem;")
  div(class="metrics")
    div(v-for="metric in metrics" :key="metric.id")
        info_cards(:title="metric.name" :value="metric.value")
  hr(style="margin-bottom: 3rem;")
  div(class="charts")
    div(class="bar-charts" v-for="chart in charts_bar" :key="chart.id")
        bar_charts(:data="chart.value" :title="chart.name")
    div(class="circle-charts" v-for="chart in charts_pie" :key="chart.id")
      circle_charts(:data="chart.value" :title="chart.name" )
</template>

<script>
import circle_charts from './circle_charts.vue'
import info_cards from './info_cards.vue';
import bar_charts from './bar_charts.vue';


export default {
    components: {
        circle_charts,
        info_cards,
        bar_charts
    },
    data() {
        return {
           metrics : [],
           charts_pie: {},
           charts_bar: {},
        }
    },
    async created() {
        let response = await this.$store.dispatch('dashbord/getMetrics')
        this.metrics = response.data.metrics
        this.charts_pie = response.data.charts.pie
        this.charts_bar = response.data.charts.bar
        console.log('alooo')
        console.log(this.charts_pie)

    }
}
</script>


<style  scoped>

.charts{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}
.dashbord-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.title-container{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.metrics{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 3rem;

  }
.circle-charts, .bar-charts{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
}

</style>
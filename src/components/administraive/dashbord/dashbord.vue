<template lang="pug">
div(class="dashbord-container")
    iframe(class="report" title="dashbord" src="https://app.powerbi.com/view?r=eyJrIjoiNDA5NWNlN2MtODE1MS00OGJjLWFmMmItMTk5NjFlYTE1ZjYyIiwidCI6IjkxODA4YmQwLTVjNmEtNDlkZi05M2RmLWZiNmE3NDBmNTk0ZCIsImMiOjh9" frameborder="0" allowFullScreen="true") 
</template>

<script>
export default {
    
}
</script>


<style lang="scss">


iframe {
  height:calc(100vh - 4px);
  width:calc(100vw - 4px);
  box-sizing: border-box;
}

.dashbord-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
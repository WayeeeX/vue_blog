<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  background-color: rgb(245, 245, 245);
}
html,body,#app{
 		height: 100%;
 		width: 100%;
	}
</style>

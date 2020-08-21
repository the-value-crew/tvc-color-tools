<template>
  <div class="loading">
    <!-- <div class="loader"></div>
    <label v-if="message">{{ message }}</label>-->
    <img src="@/assets/loading.gif" />
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: ["message"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  background-color: white;
  width: 64px;
  height: 64px;
  padding: 5px;
  border-radius: 100%;
}
/* Loader */
.loader {
  margin: 0 auto;
  border: 5px solid white;
  border-radius: 50%;
  border-top: 5px solid #dc3545;
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* Loader end */
</style>

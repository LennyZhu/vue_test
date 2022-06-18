<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <FormDemo></FormDemo>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import FormDemo from "./formDemo.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    FormDemo,
  },
};
</script>

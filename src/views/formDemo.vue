<template>
  <div>
    <PowerForm :formList="formList"></PowerForm>
    <el-button @click="searchBtn">点我</el-button>
  </div>
</template>

<script>
import PowerForm from "@/components/PowerForm.vue";
export default {
  name: "FormDemo",
  components: {
    PowerForm,
  },
  data() {
    return {};
  },
  computed: {
    formList() {
      return [
        {
          type: "input",
          label: "姓名",
        },
        {
          type: "input",
          label: "年龄",
        },
        {
          type: "select",
          label: "兴趣",
          options: [
            {
              label: "看书",
              value: "1",
            },
            {
              label: "打游戏",
              value: "2",
            },
          ],
          listeners: {
            change(e) {
              console.log(e);
            },
          },
        },
        {
          type: "button",
          text: "查询",
          attrs: {
            type: "primary",
            disabled: false,
          },
          listeners: {
            click() {
              console.log(1111);
            },
          },
        },
      ];
    },
  },
  methods: {
    searchBtn() {
      console.log("btn");
    },
  },
};
</script>

<style></style>

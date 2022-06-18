<template>
  <el-form
    ref="powerForm"
    :model="formData"
    :rules="rules"
    :inline="inline"
    class="power-form"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template
      v-for="(
        {
          type,
          label,
          text,
          prop,
          nativeTag,
          slotName,
          options,
          colAttrs = { span: 6 },
          formItemAttrs,
          attrs,
          listeners,
          radioStyle,
          ...otherProps
        },
        index
      ) in formList"
    >
      <el-col :key="prop || index" v-bind="colAttrs">
        <el-form-item
          v-if="!isDesc"
          :label="label"
          :prop="prop"
          v-bind="formItemAttrs"
        >
          <!-- 具名插槽，外部组件可以自定义表单项，使用 slotName 指定插槽名. 如果不指定插槽名则使用下方component -->
          <slot :name="slotName" v-bind="formList[index]">
            <!-- 动态组件component ，默认使用前缀 el- 拼接 type 的形式，如： el-input el-select -->
            <!-- el-radio-group不支持component动态渲染, 此处特殊处理 -->
            <template
              v-if="type === 'radio-group' && options && options.length"
            >
              <el-radio-group
                v-model="formData[prop]"
                v-bind="attrs"
                v-on="listeners"
              >
                <component
                  :is="radioStyle === 'button' ? 'el-radio-button' : 'el-radio'"
                  v-for="(item, idx) in options"
                  :key="item.label || idx"
                  v-bind="typeof item === 'object' ? item : { label: item }"
                >
                  {{ item.text }}
                </component>
              </el-radio-group>
            </template>
            <component
              :is="'el-' + type"
              v-else-if="type"
              v-model="formData[prop]"
              v-bind="attrs"
              v-on="listeners"
            >
              <template v-if="type === 'button'">{{ label || text }}</template>
              <template v-if="type === 'select' && options && options.length">
                <el-option
                  v-for="(item, idx) in options"
                  :key="item.value || idx"
                  v-bind="
                    typeof item === 'object'
                      ? item
                      : { label: item, value: item }
                  "
                />
              </template>
              <template
                v-if="type === 'checkbox-group' && options && options.length"
              >
                <el-checkbox
                  v-for="(item, idx) in options"
                  :key="item.label || idx"
                  v-bind="typeof item === 'object' ? item : { label: item }"
                />
              </template>
            </component>
            <template v-else-if="nativeTag">
              <component :is="nativeTag" v-bind="attrs" v-on="listeners">{{
                formData[prop]
              }}</component>
            </template>
          </slot>
        </el-form-item>
        <template v-else>
          <slot :name="slotName" v-bind="formList[index]">
            <div v-show="label" class="desc-item">
              <span class="desc-label">{{ label }}: </span>
              <span class="desc-value">{{ formData[prop] }}</span>
            </div>
          </slot>
        </template>
      </el-col>
    </template>
  </el-form>
</template>
<script>
export default {
  name: "PowerForm",
  props: {
    /**
     * @description 表单数据
     * @default {}
     */
    formData: {
      type: Object,
      default: () => ({}),
    },
    /**
     * @description 所有表单项
     * @default []
     * @formList-item Attributes 表单项属性介绍
     * type {string} 表单项组件类型，如 input
     * label {string} 表单项标签文本
     * text {string} button组件文案
     * prop {string} 表单项 model 字段
     * nativeTag {string} html原生标签，不配置type时可以使用
     * slotName {string} 表单项插槽名，非必填
     * options {array} select 组件 options，参照 Element-UI select 组件
     * colAttrs {object} 删格布局相关，默认每个表单项 span: 6，参照 Element-UI Col Attributes
     * formItemAttrs {object} 表单项组件属性，参照 Element-UI Form-Item Attributes
     * attrs {object} 表单项其他属性，参照 Element-UI 对应组件的 Attributes
     * listeners {object} 表单项事件监听，参照 Element-UI 对应组件的 Events
     */
    formList: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 表单验证规则
     * @default {}
     */
    rules: {
      type: Object,
      default: () => ({}),
    },
    /**
     * @description 行内表单模式
     * @default true
     */
    inline: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 是否开启 描述列表 模式进行展示
     * @default false
     */
    isDesc: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 触发表单验证，参考 Element-UI 的 Form 组件 Form Methods
    validate(fn) {
      this.$refs["powerForm"].validate(fn);
    },
    // 重置表单
    resetFields() {
      this.$refs["powerForm"].resetFields();
    },
    // 对部分表单字段进行校验的方法
    validateField(props, callback) {
      this.$refs["powerForm"].validateField(props, callback);
    },
    // 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
    clearValidate(props) {
      this.$refs["powerForm"].clearValidate(props);
    },
  },
};
</script>
<style lang="scss" scoped>
.power-form {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
.el-form--inline {
  .el-form-item {
    padding-right: 10px;
    width: 100%;
    display: flex;
    ::v-deep .el-form-item__content {
      flex: 1;
      & > div {
        width: 100%;
      }
    }
  }
}
.desc-item {
  display: flex;
  margin-bottom: 15px;
  padding-right: 10px;
  line-height: 34px;
  .desc-label {
    display: inline-block;
    width: 100px;
    padding-right: 12px;
    text-align: right;
    font-weight: 700;
    font-size: 14px;
  }
  .desc-value {
    flex: 1;
    display: inline-block;
    padding: 0 6px;
    border: 1px solid #ddd;
    border-radius: 2px;
    font-size: 14px;
  }
}
</style>

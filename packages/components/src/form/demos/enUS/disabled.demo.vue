<markdown>
# Disabled form
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="updateDisabled" />
    <z-form
      ref="formRef"
      :model="model"
      label-placement="left"
      :label-width="160"
      :disabled="updateDisabled"
      :style="{
        maxWidth: '640px'
      }"
    >
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Input"
        path="inputValue"
      >
        <z-input v-model="model.inputValue" placeholder="Input" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Select"
        path="selectValue"
      >
        <z-select
          v-model="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
        />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Upload"
        path="uploadValue"
      >
        <z-upload>
          <z-button>Upload file</z-button>
        </z-upload>
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Auto Complete"
        path="autoCompleteValue"
      >
        <z-select
          :options="autoCompleteOptions"
          placeholder="Email"
          filterable
          remote
          @search="model.autoCompleteValue = $event"
        />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Dynamic Tags"
        path="dynamicTagsValue"
      >
        <z-dynamic-tags v-model="model.dynamicTagsValue" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Tree Select"
        path="treeSelectValue"
      >
        <z-tree-select
          :options="treeSelectOptions"
          default-model-value="Drive My Car"
        />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Cascader"
        path="cascaderValue"
      >
        <z-cascader
          v-model="model.cascaderValue"
          placeholder="Cascader"
          :options="options"
          check-strategy="child"
          size="medium"
        />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Datetime"
        path="datetimeValue"
      >
        <z-date-picker v-model="model.datetimeValue" type="datetime" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Switch"
        path="switchValue"
      >
        <z-switch v-model="model.switchValue" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Checkbox"
        path="checkboxValue"
      >
        <z-checkbox v-model="model.checkboxValue">
          Checkbox
        </z-checkbox>
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Checkbox Group"
        path="checkboxGroupValue"
      >
        <z-checkbox-group v-model="model.checkboxGroupValue">
          <z-space style="gap: 16px">
            <z-checkbox value="Option 1">
              Option 1
            </z-checkbox>
            <z-checkbox value="Option 2">
              Option 2
            </z-checkbox>
            <z-checkbox value="Option 3">
              Option 3
            </z-checkbox>
          </z-space>
        </z-checkbox-group>
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Radio"
        path="radioValue"
      >
        <z-radio
          :checked="model.radioValue === 'Definitely Maybe'"
          value="Definitely Maybe"
          name="basic-demo"
        >
          Definitely Maybe
        </z-radio>
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Radio Group"
        path="radioGroupValue"
      >
        <z-radio-group v-model="model.radioGroupValue" name="radiogroup2">
          <z-radio value="Radio 1">
            Radio 1
          </z-radio>
          <z-radio value="Radio 2">
            Radio 2
          </z-radio>
          <z-radio value="Radio 3">
            Radio 3
          </z-radio>
        </z-radio-group>
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Radio Button Group"
        path="radioGroupValue"
      >
        <z-radio-group v-model="model.radioGroupValue" name="radiogroup2">
          <z-radio-button value="Radio 1">
            Radio 1
          </z-radio-button>
          <z-radio-button value="Radio 2">
            Radio 2
          </z-radio-button>
          <z-radio-button value="Radio 3">
            Radio 3
          </z-radio-button>
        </z-radio-group>
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Input Number"
        path="inputNumberValue"
      >
        <z-input-number v-model="model.inputNumberValue" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Time Picker"
        path="timePickerValue"
      >
        <z-time-picker v-model="model.timePickerValue" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Color Picker"
        path="colorValue"
      >
        <z-color-picker v-model="model.colorValue" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Slider"
        path="sliderValue"
      >
        <z-slider v-model="model.sliderValue" :step="5" />
      </z-form-item>
      <z-form-item
        help-message="This is help message"
        description="This is description"
        label="Transfer"
        path="transferValue"
      >
        <z-transfer v-model="model.transferValue" :options="generalOptions" />
      </z-form-item>
    </z-form>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function genOptions (depth = 2, iterator = 1, prefix = ''): any {
  const length = 12
  const options = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        disabled: i % 5 === 0,
        children: genOptions(depth, iterator + 1, '' + i)
      })
    } else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: genOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}
export default defineComponent({
  setup () {
    const formRef = ref(null)
    const model = ref({
      inputValue: null,
      selectValue: null,
      autoCompleteValue: '',
      dynamicTagsValue: ['teacher', 'frontend'],
      cascaderValue: null,
      datetimeValue: null,
      switchValue: false,
      checkboxValue: false,
      checkboxGroupValue: null,
      radioValue: 'Definitely Maybe',
      radioGroupValue: null,
      radioButtonGroupValue: null,
      inputNumberValue: null,
      timePickerValue: null,
      colorValue: null,
      sliderValue: 0,
      transferValue: null
    })
    return {
      updateDisabled: ref(false),
      formRef,
      model,
      generalOptions: ['groode', 'veli good', 'emazing', 'lidiculous'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),
      options: genOptions(),
      treeSelectOptions: [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label: 'Drive My Car',
              key: 'Drive My Car'
            },
            {
              label: 'Michelle',
              key: 'Michelle'
            }
          ]
        }
      ],
      autoCompleteOptions: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = model.value.autoCompleteValue.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
</script>

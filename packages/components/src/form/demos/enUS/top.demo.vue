<markdown>
# Label placement top

Use `z-grid` and `z-form-item-gi` (grid item) to style the form more exactly.
</markdown>

<template>
  <z-radio-group v-model="size" name="left-size" style="margin-bottom: 12px">
    <z-radio-button value="small">
      Small
    </z-radio-button>
    <z-radio-button value="medium">
      Medium
    </z-radio-button>
    <z-radio-button value="large">
      Large
    </z-radio-button>
  </z-radio-group>
  <z-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :size="size"
    label-placement="top"
  >
    <z-grid :span="24" :x-gap="24">
      <z-form-item-gi :span="12" label="Input" path="inputValue">
        <z-input v-model="model.inputValue" placeholder="Input" />
      </z-form-item-gi>
      <z-form-item-gi :span="12" label="Textarea" path="textareaValue">
        <z-input
          v-model="model.textareaValue"
          placeholder="Textarea"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </z-form-item-gi>
      <z-form-item-gi :span="12" label="Select" path="selectValue">
        <z-select
          v-model="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
        />
      </z-form-item-gi>
      <z-form-item-gi
        :span="12"
        label="Multiple Select"
        path="multipleSelectValue"
      >
        <z-select
          v-model="model.multipleSelectValue"
          placeholder="Select"
          :options="generalOptions"
          multiple
        />
      </z-form-item-gi>
      <z-form-item-gi :span="12" label="Datetime" path="datetimeValue">
        <z-date-picker v-model="model.datetimeValue" type="datetime" />
      </z-form-item-gi>
      <z-form-item-gi :span="12" label="Switch" path="switchValue">
        <z-switch v-model="model.switchValue" />
      </z-form-item-gi>
      <z-form-item-gi
        :span="12"
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
      </z-form-item-gi>
      <z-form-item-gi :span="12" label="Radio Group" path="radioGroupValue">
        <z-radio-group v-model="model.radioGroupValue" name="radiogroup1">
          <z-space>
            <z-radio value="Radio 1">
              Radio 1
            </z-radio>
            <z-radio value="Radio 2">
              Radio 2
            </z-radio>
            <z-radio value="Radio 3">
              Radio 3
            </z-radio>
          </z-space>
        </z-radio-group>
      </z-form-item-gi>
      <z-form-item-gi
        :span="12"
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
      </z-form-item-gi>
      <z-form-item-gi :span="12" label="Input Number" path="inputNumberValue">
        <z-input-number v-model="model.inputNumberValue" />
      </z-form-item-gi>
      <z-form-item-gi :span="12" label="Time Picker" path="timePickerValue">
        <z-time-picker v-model="model.timePickerValue" />
      </z-form-item-gi>
      <z-form-item-gi :span="12" label="Slider" path="sliderValue">
        <z-slider v-model="model.sliderValue" :step="5" />
      </z-form-item-gi>
      <z-form-item-gi :span="14" label="Transfer" path="transferValue">
        <z-transfer
          v-model="model.transferValue"
          style="width: 100%"
          :options="generalOptions"
        />
      </z-form-item-gi>
      <z-form-item-gi :span="5" label="Nested Path" path="nestedValue.path1">
        <z-cascader
          v-model="model.nestedValue.path1"
          placeholder="Nested Path 1"
          :options="cascaderOptions"
        />
      </z-form-item-gi>
      <z-form-item-gi :span="5" path="nestedValue.path2">
        <z-select
          v-model="model.nestedValue.path2"
          placeholder="Nested Path 2"
          :options="generalOptions"
        />
      </z-form-item-gi>
      <z-gi :span="24">
        <div style="display: flex; justify-content: flex-end">
          <z-button round color="primary" @click="handleValidateButtonClick">
            Validate
          </z-button>
        </div>
      </z-gi>
    </z-grid>
  </z-form>

  <pre>{{ JSON.stringify(model, null, 2) }}
</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst, FormItemRule, useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    return {
      formRef,
      size: ref('medium'),
      model: ref({
        inputValue: null,
        textareaValue: null,
        selectValue: null,
        multipleSelectValue: null,
        datetimeValue: null,
        nestedValue: {
          path1: null,
          path2: null
        },
        switchValue: false,
        checkboxGroupValue: null,
        radioGroupValue: null,
        radioButtonGroupValue: null,
        inputNumberValue: null,
        timePickerValue: null,
        sliderValue: 0,
        transferValue: null
      }),
      generalOptions: ['groode', 'veli good', 'emazing', 'lidiculous'].map(
        (v) => ({
          label: v,
          value: v
        })
      ),
      cascaderOptions: [
        {
          label: 'groode',
          value: 'groode',
          children: [
            {
              label: 'veli good',
              value: 'veli good'
            }
          ]
        }
      ],
      rules: {
        inputValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Please input inputValue'
        },
        textareaValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Please input textareaValue'
        },
        selectValue: {
          required: true,
          trigger: ['blur', 'change'],
          message: 'Please select selectValue'
        },
        multipleSelectValue: {
          type: 'array',
          required: true,
          trigger: ['blur', 'change'],
          message: 'Please select multipleSelectValue'
        },
        datetimeValue: {
          type: 'number',
          required: true,
          trigger: ['blur', 'change'],
          message: 'Please input datetimeValue'
        },
        nestedValue: {
          path1: {
            required: true,
            trigger: ['blur', 'input'],
            message: 'Please input nestedValue.path1'
          },
          path2: {
            required: true,
            trigger: ['blur', 'change'],
            message: 'Please input nestedValue.path2'
          }
        },
        checkboxGroupValue: {
          type: 'array',
          required: true,
          trigger: 'change',
          message: 'Please select checkboxGroupValue'
        },
        radioGroupValue: {
          required: true,
          trigger: 'change',
          message: 'Please select radioGroupValue'
        },
        radioButtonGroupValue: {
          required: true,
          trigger: 'change',
          message: 'Please select radioButtonGroupValue'
        },
        inputNumberValue: {
          type: 'number',
          required: true,
          trigger: ['blur', 'change'],
          message: 'Please input inputNumberValue'
        },
        timePickerValue: {
          type: 'number',
          required: true,
          trigger: ['blur', 'change'],
          message: 'Please input timePickerValue'
        },
        sliderValue: {
          validator (rule: FormItemRule, value: number) {
            return value > 50
          },
          trigger: ['blur', 'change'],
          message: 'sliderValue should be larger than 50'
        },
        transferValue: {
          type: 'array',
          required: true,
          trigger: 'change',
          message: 'Please input transferValue'
        }
      },
      handleValidateButtonClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('Valid')
          } else {
            console.log(errors)
            message.error('Invalid')
          }
        })
      }
    }
  }
})
</script>

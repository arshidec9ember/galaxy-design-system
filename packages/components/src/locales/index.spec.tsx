import { h, defineComponent, type PropType, ref, onMounted } from 'vue'
import { mount } from '@vue/test-utils'
import {
  enUS,
  enGB,
  dateEnUS,
  dateEnGB,
  ZConfigProvider,
  type ZDateLocale,
  type ZLocale,
  ZInput
} from '../index'
import { createLocale } from '.'
import { ZDatePicker } from '../date-picker'

const Wrapper = defineComponent({
  props: {
    dateLocale: Object as PropType<ZDateLocale>,
    locale: Object as PropType<ZLocale>,
    onMounted: Function as PropType<(date: string) => void>
  },
  setup (props) {
    const datePickerWrapperElRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      // const { value: datePickerWrapperEl } = datePickerWrapperElRef
      // if (!datePickerWrapperEl) return
      // TODO: Fix timezone caused CI Error
      // const dateInputEls = datePickerWrapperEl?.querySelectorAll('input')
      // props.onMounted?.(
      //   JSON.stringify([
      //     'check date format',
      //     dateInputEls[0].value,
      //     dateInputEls[1].value,
      //     dateInputEls[2].value,
      //     dateInputEls[3].value
      //   ])
      // )
    })
    return {
      datePickerWrapperElRef
    }
  },
  render () {
    return (
      <ZConfigProvider {...this.$props}>
        {{
          default: () => (
            <div>
              <ZInput />
              <div ref="datePickerWrapperElRef">
                <ZDatePicker type="date" modelValue={666} />
                <ZDatePicker type="datetime" modelValue={666} />
                <ZDatePicker type="year" modelValue={666} />
                <ZDatePicker type="month" modelValue={666} />
              </div>
            </div>
          )
        }}
      </ZConfigProvider>
    )
  }
})

describe('locale', () => {
  it('works with createLocale', () => {
    const locale1: ZLocale = createLocale(
      {
        Select: {
          placeholder: '???'
        }
      },
      enUS
    )
    expect(locale1.Select.placeholder).toEqual('???')
    locale1.Select.placeholder = enUS.Select.placeholder
    expect(locale1).toEqual(enUS)
    const locale2: ZLocale = createLocale(enUS)
    expect(locale2).toEqual(enUS)
  })
  it('works', () => {
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateEnGB,
          locale: enGB
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateEnUS,
          locale: enUS,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
  })
})

import { shallowMount } from '@vue/test-utils'
import { ZSkeleton } from '../index'

describe('Skeleton', () => {
  __FAILED__TESTCASES__ &&
    describe('when type is custom', () => {
      const wrapper = shallowMount(ZSkeleton, {
        slots: {
          default: [
            '<rect x="80" y="17" rx="4" ry="4" width="300" height="13" />',
            '<rect x="82" y="44" rx="3" ry="3" width="250" height="10" />',
            '<circle cx="35" cy="35" r="35" />'
          ]
        }
      })

      it('should render custom element', () => {
        const rect = wrapper.findAll('rect')
        const circle = wrapper.findAll('circle')

        expect(rect.length).toBe(3)
        expect(circle.length).toBe(1)
      })
    })

  describe('Props are propagated', () => {
    const wrapper = shallowMount(ZSkeleton, {
      propsData: {
        animate: false,
        backgroundColor: '#000',
        backgroundOpacity: 0.06,
        baseUrl: '/mypage',
        foregroundColor: '#fff',
        foregroundOpacity: 0.12,
        gradientRatio: 0.5,
        height: 200,
        preserveAspectRatio: 'xMaxYMax meet',
        speed: 10,
        style: { marginBottom: '10px' },
        title: 'My custom loading title',
        uniqueKey: 'my-id',
        width: 200,
        beforeMask: '<rect />'
      },
      slots: {
        default: '<rect />'
      }
    })

    const propsFromFullfield = wrapper.vm.$props

    it("`speed` is a number and it's used", () => {
      expect(typeof propsFromFullfield.speed).toBe('number')
      expect(propsFromFullfield.speed).toBe(10)
    })

    it("`height` is a number and it's used", () => {
      expect(typeof propsFromFullfield.height).toBe('number')
      expect(propsFromFullfield.height).toBe(200)
    })

    it("`width` is a number and it's used", () => {
      expect(typeof propsFromFullfield.width).toBe('number')
      expect(propsFromFullfield.width).toBe(200)
    })

    it("`animate` is a boolean and it's used", () => {
      expect(typeof propsFromFullfield.animate).toBe('boolean')
      expect(propsFromFullfield.animate).toBe(false)
    })

    it("`preserveAspectRatio` is a string and it's used", () => {
      expect(typeof propsFromFullfield.preserveAspectRatio).toBe('string')
      expect(propsFromFullfield.preserveAspectRatio).toBe('xMaxYMax meet')
    })

    __FAILED__TESTCASES__ &&
      it("`style` is an object and it's used", () => {
        expect(propsFromFullfield.style).toMatchObject({ marginBottom: '10px' })
      })

    it("`baseUrl` is a string and it's used", () => {
      expect(typeof propsFromFullfield.baseUrl).toBe('string')
      expect(propsFromFullfield.baseUrl).toBe('/mypage')
    })

    it("`uniqueKey` is a string and it's used", () => {
      expect(typeof propsFromFullfield.uniqueKey).toBe('string')
      expect(propsFromFullfield.uniqueKey).toBe('my-id')
    })
  })
})

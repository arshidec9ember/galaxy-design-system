# Carousel

### CautionAlert

It's usually used to display carousel.

## Demos

```demo
basic.vue
arrow.vue
autoplay.vue
dots.vue
vertical.vue
space-between.vue
slides-per-view.vue
slides-per-view-auto.vue
centered.vue
effect.vue
transition-name.vue
hover.vue
keyboard.vue
mousewheel.vue
simulate-drag.vue
custom-arrow-and-dots.vue
custom-card.vue
```

## API

### Carousel Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autoplay | `boolean` | `false` | Whether to scroll automatically. |
| centered-slides | `boolean` | `false` | Whether to center the current view carousel. |
| current-index | `number` | `undefined` | current index. |
| default-index | `number` | `0` | default index. |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Carousel shows the direction. |
| dot-placement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Dot placement in the panel. |
| dot-type | `'dot' \| 'line'` | `'dot'` | Dot style. |
| draggable | `boolean` | `false` | Whether to switch the carousel by dragging the mouse. |
| effect | `'slide' \| 'fade' \| 'card' \| 'custom'` | `'slide'` | Transition effect when switching between carousel. |
| interval | `number` | `5000` | Auto play interval (ms). |
| keyboard | `boolean` | `false` | Whether to switch the carousel by pressing the key, it only works when the focus is on Dots. |
| loop | `boolean` | `true` | Whether to loop. |
| mousewheel | `boolean` | `false` | Whether to switch the carousel through the mouse wheel. |
| next-slide-style | `object \| string` | `undefined` | Next slide's style. |
| prev-slide-style | `object \| string` | `undefined` | Previous slide's style. |
| show-arrow | `boolean` | `false` | Whether to show arrow buttons. |
| show-dots | `boolean` | `true` | Whether to show dots. |
| slides-per-view | `'auto' \| number` | `1` | Number of carousels displayed on per view. |
| space-between | `number` | `0` | The spacing between the carousels. |
| touchable | `boolean` | `true` | Whether to switch the carousel by touch. |
| transition-style | `{ transitionDuration?: string, transitionTimingFunction?: string }` | `{ transitionDuration: '300ms' }` | The style of the transition effect. |
| transition-props | `TransitionProps` | `undefined` | Custom transition effect properties, [reference](https://v3.vuejs.org/api/built-in-components.html#transition). |
| trigger | `'click' \| 'hover'` | `'click'` | The method of manual switching. |
| on-update:current-index | `(currentIndex: number, lastIndex: number) => void` | `undefined` | Callback function when the current index changes. |

### Carousel Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | Carousel content. |
| arrow | `(info: { total: number, currentIndex: number, to: (index: number) => void, prev: () => void, next: () => void })` | Arrow. |
| dots | `(info: { total: number, currentIndex: number, to: (index: number) => void })` | Dots. |

### Carousel Methods

| Name            | Type                      | Description             |
| --------------- | ------------------------- | ----------------------- |
| to              | `(index: number) => void` | Slide to index.         |
| prev            | `() => void`              | Slide to previous page. |
| next            | `() => void`              | Slide to next page.     |
| getCurrentIndex | `() => number`            | Get current index.      |

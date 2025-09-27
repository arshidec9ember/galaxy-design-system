# TODO

<!-- ✓ ✔ ✅ ✘ ❌ ✖ ✕ ❎ ☓ ✗ -->

- [✅] maximize toggle
- [✅] height of content
- [✅] expand toggle | v-model
- [✅] fix issue in expand -> minimize bug
- [✅] fix issue in expand -> close bug
- [✅] draggable
- [ ] animation
  - [✅] fix expand and contract animation -> need to study animation
  - [ ] fix open and close animation | happens on 2nd panel
  - [ ] scrollbar animation with panel
- [✅] max-items
  - [ ] default -> auto hide on intersection observer hit -> increase chip
  - [✅] specify default-max-items | check behaviour for static max-items
- [✅] on dom painting
- [✅] scrollable panel
  - [✅] check if it is scrollable
  - [ ] when the item is closed -> add animation to the panel moving
  - [✅] beyond the scroll limit, the panel should be scrollable
  - [ ] beyond the scroll limit, the panel should trigger max-items and hide the panel
- [✅] remove warning for slots
- [✅] z-index is kept 1500 to keep it below popover elements like dropdown | check if it needs to be more and the dropdown should be kept on top of it
- known Bugs:
  - [ ] z-floatingPanel-wrapper height behaving weird | background not clickable due to scrollbar zone (current work around use max-items)
- [ ] Extra Methods
  - [ ] maximize all
  - [ ] minimize all
  - [✅] close all
  - [ ] drag out take to center | draggable prop
  - [✅] drag-in not doing
  - [✅] onDrag
  - [ ] Make the api exposed as a component not just a composable

### Test cases

- [✅] write basic test cases for all the above scenarios
- [ ] write test case for toggle
- [ ] write test case for expand
- [ ] write test case for minimize
- [ ] write test case for close
- [ ] write test case for max-items
- [ ] write test case for draggable

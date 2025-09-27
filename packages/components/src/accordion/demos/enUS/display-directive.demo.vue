<markdown>
# Display directive

Set `display-directive` to `if` or `show` to determine whether to keep the DOM inside `z-accordion-item` when inactive.
</markdown>

<template>
  <z-accordion display-directive="show">
    <z-accordion-item title="right" name="1">
      <z-accordion>
        <z-accordion-item title="right" name="1">
          <div>good</div>
        </z-accordion-item>
        <z-accordion-item title="right" name="2">
          <div>good</div>
        </z-accordion-item>
      </z-accordion>
    </z-accordion-item>
    <z-accordion-item title="right" name="2">
      <div>good</div>
    </z-accordion-item>
  </z-accordion>
</template>

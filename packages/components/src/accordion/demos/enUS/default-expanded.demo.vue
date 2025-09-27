<markdown>
# Default expanded

It should be noted that even if only one panel you want to set to be expanded, `default-expanded-names` should also be passed in an array, unless `multiple` is set to `false`.
</markdown>

<template>
  <z-accordion :default-expanded-names="['2', '3']" :bordered="false">
    <z-accordion-item title="green light" name="1">
      <z-accordion :default-expanded-names="['2']" :bordered="false">
        <z-accordion-item title="on" name="1">
          <div>pass</div>
        </z-accordion-item>
        <z-accordion-item title="flashing" name="2">
          <div>pass fastly</div>
        </z-accordion-item>
      </z-accordion>
    </z-accordion-item>
    <z-accordion-item title="red light" name="2">
      <div>stop</div>
    </z-accordion-item>
    <z-accordion-item title="amber light" name="3">
      <div>warn</div>
    </z-accordion-item>
  </z-accordion>
</template>

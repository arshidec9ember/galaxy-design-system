<markdown>
# Relative

`z-time` uses `date-fns`'s [`formatDistanceStrict`](https://date-fns.org/v2.28.0/docs/formatDistanceStrict) to format relative time.

If you don't need much customization, this is enough.
</markdown>

<template>
  <z-time :time="0" :to="86400000" type="relative" />
  <br>
  <z-time :time="0" :to="864000000" type="relative" />
  <br>
  <z-time :time="0" :to="8640000000" type="relative" />
</template>

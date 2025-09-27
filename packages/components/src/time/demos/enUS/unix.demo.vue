<markdown>
# Unix timestamp

Use Unix timestamp as time.
</markdown>

<template>
  <z-time :time="4320000000" :to="8640000000" />
  <br>
  <z-time :time="4320000" :to="8640000" unix />
  <br>
  <z-time :time="4320000000" format="yyyy-MM-dd hh:mm:ss" />
  <br>
  <z-time :time="4320000" format="yyyy-MM-dd hh:mm:ss" unix />
</template>

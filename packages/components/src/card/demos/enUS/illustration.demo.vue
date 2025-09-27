<markdown>
  # Illustration example

  You can put your custom illustration
  </markdown>

<template>
  <div class="card-new">
    <z-card>
      <z-card-header>
        <z-card-media>
          <img
            style="width: 90px"
            alt="illustration"
            src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg?w=2000"
          >
        </z-card-media>
      </z-card-header>
      <z-card-header>
        <z-tag :bordered="false">
          Label
        </z-tag>
        <br>
        Travel Card
      </z-card-header>
      <z-card-content> Trip Expenses </z-card-content>
    </z-card>
  </div>
</template>
<style scoped>
.card-new .z-card {
  width: 320px;
}

.card-new [themename='light'] .z-card-header {
  background: beige;
}
</style>

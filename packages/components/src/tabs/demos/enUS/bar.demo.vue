<markdown>
# Bar variant

Tabs of bar variant.
</markdown>

<template>
  <z-tabs
    class="card-tabs"
    default-model-value="signin"
    size="large"
    animated
    pane-wrapper-style="margin: 0 -4px"
    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
  >
    <z-tab-pane name="signin" tab="Sign in">
      <z-form>
        <z-form-item-row label="Username">
          <z-input />
        </z-form-item-row>
        <z-form-item-row label="Password">
          <z-input />
        </z-form-item-row>
      </z-form>
      <z-button color="primary" full-width variant="outlined" strong>
        Sign In
      </z-button>
    </z-tab-pane>
    <z-tab-pane name="signup" tab="Sign up">
      <z-form>
        <z-form-item-row label="Username">
          <z-input />
        </z-form-item-row>
        <z-form-item-row label="Password">
          <z-input />
        </z-form-item-row>
        <z-form-item-row label="ReEnter Password">
          <z-input />
        </z-form-item-row>
      </z-form>
      <z-button color="primary" full-width variant="outlined" strong>
        Sign up
      </z-button>
    </z-tab-pane>
  </z-tabs>
</template>

<style>
.card-tabs .z-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>

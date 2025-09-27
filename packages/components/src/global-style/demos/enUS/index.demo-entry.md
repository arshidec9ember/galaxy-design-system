# Global Style

For the following reasons, you may need to set some styles on `document.body`

1. @zeta-gds/components will mount some global style that is unresponsive (to theme, not media query). For example `font-family`. The style works fine by default, however they won't change when theme is changed.
2. `z-config-provider` can't sync global style (for example, body's background color) outside it.

You can use `z-global-style` to sync common global style to the body element. In the following example, `z-global-style` will sync the theme provided by `z-config-provider` to `document.body`.

## Usage

```html
// follow config-provider's theme
<z-config-provider>
  <z-global-style />
  ...
</z-config-provider>
```

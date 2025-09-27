# Contribution

- For new features & bug fixes, please create pull request to `main` branch.

## Useful Commands

```bash
# pnpm version 7.0.0 and above is required
pnpm run dev

# build repo
pnpm run build
```

## How to name a style var

For example, you have a button, which has `default` and `error` type. How will you name the background color of the button.

```html
buttonColor errorButtonColor
```

or

```html
buttonColor buttonColorError
```

The second is the better (The second is easy to extend and read. Also it follow the css pattern for example `padding-right` and `padding-left`).

When it comes to hover style?

```html
buttonColor < buttonColorHover < buttonColorError < buttonColorErrorHover
```

or

```html
buttonColor < buttonColorHover < buttonColorError < buttonColorHoverError
```

The second is the better since if you want write a map entity, you always loop on types. For example:

```js
// better
;['Default', 'Error'].map((type) => [
  'buttonColor' + type,
  'buttonColorHover' + type
])
// worse, hard to maintain
;['Default', 'Error'].map((type) => [
  'button' + type + 'Color',
  'buttonHover' + type + 'Color'
])
```

## Release Process

1. Pull the latest changes from `main`.
2. Checkout to the `release` branch from `main`.
3. Commit the changes to the `release` branch with a message like `git commit -m "x.x.x"`.
4. A prerelease workflow might look something like this:
   - pnpm changeset pre enter next
   - pnpm changeset version
   - git add .
   - git commit -m "Enter prerelease mode and version packages"
   - pnpm changeset publish
   - git push --follow-tags
5. Merge the `release` branch into `main`.
6. Return to the `main` branch and pull the latest changes.
7. `Run pnpm i && pnpm release:package`.
8. When you're ready to do the final release, your workflow would look something like this:
   - pnpm changeset pre exit
   - pnpm changeset version
   - git add .
   - git commit -m "Exit prerelease mode and version packages"
   - pnpm changeset publish
   - git push --follow-tags

## Commit Messages

### Commit Message

Use [Angular Style](https://medium.com/@carlosalmonte04/angular-commit-messages-541b2ecadde), e.g., `feat(xxx): yyy.`.

#### Notes

- The `feat(xxx)` part must represent a component and should not include an `z`, `feat(input)` ✅, `feat(z-input)` ❌.
- If it's a `feat` or `fix` related to an issue, you should add a comment referencing the issue like `fix #514` or `close #514`.

# Color

- `--color`
- `--color-hover`
- `--color-pressed`
- `--color-active`
- `--color-active-hover`
- `--color-active-pressed`
- `--color-focus`
- `--color-focus-hover`
- `--color-focus-active`
- `--color-focus-pressed`
- `--color-disabled`
- `--color-disabled-active`

### disabled-active `>` disabled `>` active-hover `>` active `>` pressed `>` hover `>` default

1. **disabled-active:** This state likely represents an element that is both disabled (not clickable or interactive) and currently in an active state, which might mean it's being interacted with but not yet released.

2. **disabled:** This state indicates that the element is disabled, meaning it cannot be interacted with or clicked.

3. **active-hover:** This state suggests that the element is currently active, probably because it's being clicked or selected, and it's also being hovered over by the user's cursor or pointer.

4. **active:** This state is similar to "active-hover" but without the hover component. It means the element is actively being used or clicked.

5. **pressed:** This state typically indicates that the element is currently being pressed or clicked by the user.

6. **hover:** This state signifies that the user's cursor or pointer is hovering over the element, but it is not actively being clicked or pressed.

7. **default:** This is the default state of the element, meaning it's in its normal or resting state, not being interacted with.

This hierarchy will help designers and developers define the visual and interactive behavior of elements in their user interfaces, ensuring a consistent and user-friendly experience.

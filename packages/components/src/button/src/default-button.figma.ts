import figma, { html } from "@figma/code-connect/html"

figma.connect(
  // Prefer the base file URL (no ?node-id / &m=dev)
  "https://www.figma.com/design/6XeLIvPl8YKe9e3vabV0Oa/GDS---Zeta-Hacks?node-id=27-5765&t=G6hXh3mgXHuC4tEm-11",
  {
    props: {
      label: figma.string("Text"),
      isLeftIcon: figma.boolean("is: Left icon"),
      isRightIcon: figma.boolean("is:Right icon"),
    },
    example: (props) => html`
      <z-button
        
        ${html.attr(
          "icon-placement",
          props.isLeftIcon && !props.isRightIcon
            ? "start"
            : props.isRightIcon && !props.isLeftIcon
            ? "end"
            : undefined // <- omitted when undefined
        )}
      >
        ${props.label}
      </z-button>
    `,
  }
)


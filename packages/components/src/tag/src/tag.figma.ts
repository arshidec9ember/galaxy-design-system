// tag.figma.ts
import figma, { html } from "@figma/code-connect/html"

// Map Figma "Status" to Tag's `color` prop
const toColor = (status?: string):
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error"
  | undefined => {
  switch ((status || "").toLowerCase()) {
    case "success":
      return "success"
    case "danger":
      return "error"
    case "warning":
      return "warning"
    case "info":
      return "info"
    case "neutral":
      return "neutral"
    default:
      return undefined
  }
}

// Optional: derive `strong` from Figma "Configuration"
const isProminent = (cfg?: string): boolean =>
  (cfg || "").toLowerCase() === "prominent"

figma.connect(
  // ⬇️ paste the Tag/Badge *component* link WITH ?node-id=...
  "https://www.figma.com/file/<FILE_KEY>/<FILE_NAME>?node-id=<ROW>-<COL>",
  {
    props: {
      // Text content in Figma → dev "label"/content
      label: figma.string("Text"), // adjust if your Figma text prop has a different name

      // Figma properties (exact names from your screenshot)
      figmaStatus: figma.string("Status"),
      figmaConfiguration: figma.string("Configuration"),

      // (optional) if you expose size in Figma later:
      // figmaSize: figma.string("Size"),
    },

    // Body must be exactly one tagged template literal
    example: (props) => html`
      <z-tag
        ${html.attr("color", toColor(props.figmaStatus))}
        ${html.attr("strong", isProminent(props.figmaConfiguration) ? "" : undefined)}
        ${html.attr("label", props.label)}
        <!-- Uncomment & wire up if you add a Figma Size property
        ${/* html.attr("size", toSize(props.figmaSize)) */ ""}
        -->
      >
        ${props.label}
      </z-tag>
    `,
  }
)

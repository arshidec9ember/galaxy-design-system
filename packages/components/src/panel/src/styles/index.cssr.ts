import { cB, cE, c } from '../../../_utils/cssr'

// vars:
// --z-text-color
// --z-header-text-color
// --z-divider-color
// --z-content-background-color
// --z-pagination-text-color
// --z-bezier
export default cB('panel', `
  height: inherit;
  width: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: fit-content;
  color: var(--z-text-color);
`, [
  cE('header', `
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      color: var(--z-header-text-color)
  `),
  cE('header-toolbar-section', `
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid var(--z-divider-color);
      padding: 0.25rem 0.5rem; /* Using rem values per MCP rule #1 (16px = 1rem) */
  `),
  cE('header-content', `
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      box-sizing: border-box;
      padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  `),
  cE('title', `
      font-size: 1rem; /* Using rem value per MCP rule #1 (16px = 1rem) */
      font-weight: 500; /* Medium weight as per Figma */
      line-height: 1.5rem; /* Using rem value per MCP rule #1 (24px = 1.5rem) */
      color: var(--z-header-text-color); /* color-text-neutral as per Figma */
      margin-bottom: 0.0625rem; /* Using rem value per MCP rule #1 (1px = 0.0625rem) - gap-1 from Figma */
  `),
  cE('description', `
      font-size: 0.875rem; /* Using rem value per MCP rule #1 (14px = 0.875rem) */
      line-height: 1.25rem; /* Using rem value per MCP rule #1 (20px = 1.25rem) */
      color: var(--z-pagination-text-color); /* Using color-text-neutral-light-2 as per Figma */
      margin-top: 0; /* Remove top margin to use gap-1 spacing */
  `),
  cE('controls', `
      display: flex;
      gap: 0.5rem; /* Using rem value per MCP rule #1 (8px = 0.5rem) */
      margin: 0 0.25rem; /* Using rem value per MCP rule #1 (4px = 0.25rem) */
    `, [
    cB('button', `
          padding: 0.375rem !important; /* Using rem value per MCP rule #1 (6px = 0.375rem) */
      `)
  ]),
  cE('header-end', `
      display: flex;
      align-items: center;
      gap: 0.5rem; /* Using rem value per MCP rule #1 (8px = 0.5rem) */
  `),
  cE('header-start', `
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.0625rem; /* Using rem value per MCP rule #1 (1px = 0.0625rem) - gap-1 as per Figma */
  `),
  cE('header-toolbar', `
      display: flex;
      align-items: center;
      gap: 0.25rem; /* Using rem value per MCP rule #1 (4px = 0.25rem) */
      margin-left: 0.75rem; /* Using rem value per MCP rule #1 (12px = 0.75rem) */
      border-left: 1px solid var(--z-divider-color);
      padding-left: 0.75rem; /* Using rem value per MCP rule #1 (12px = 0.75rem) */
  `),
  cE('header-navigation', `
      display: flex;
      align-items: center;
      gap: 0.125rem; /* Using rem value per MCP rule #1 (2px = 0.125rem) */
      margin-left: 0.25rem; /* Using rem value per MCP rule #1 (4px = 0.25rem) */
      border-left: 1px solid var(--z-divider-color);
      padding-left: 0.25rem; /* Using rem value per MCP rule #1 (4px = 0.25rem) */
  `),
  cE('header-actions', `
      display: flex;
  `),
  cE('content', `
      width: 100%;
      height: 100%;
      background: var(--z-content-background-color);
      overflow: auto;
    `),
  cE('footer', `
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      border-top: 1px solid var(--z-divider-color);
      padding: 1rem 0 1rem 1.5rem; /* Using rem values per MCP rule #1 (16px = 1rem, 24px = 1.5rem) */
      box-sizing: border-box;
  `),
  cE('footer-start', `
      display: flex;
      gap: 0.5rem; /* Using rem value per MCP rule #1 (8px = 0.5rem) */
  `),
  cE('footer-end', `
      display: flex;
      margin-right: 0.25rem; /* Using rem value per MCP rule #1 (4px = 0.25rem) */
      gap: 0.25rem; /* Using rem value per MCP rule #1 (4px = 0.25rem) */
  `),
  // Panel Toolbar styles merged within the main panel block
  cB('panel-toolbar', `
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1.5rem;
    color: var(--z-header-text-color);
  `, [
    cE('left', `
      display: flex;
      align-items: center;
      gap: 0.25rem; /* Using rem value per MCP rule #1 (4px = 0.25rem) - gap-1 as per Figma LHS */
    `),
    cE('right', `
      display: flex;
      align-items: center;
    `),
    c('button', `
        height: 1.5rem; /* 24px height as per Figma Button/Xsmall/height */
        width: 1.5rem; /* 24px width to match height */
        padding: 0.25rem; /* 4px padding as per Figma px-1 */
    `),
    cE('window-controls', `
      display: flex;
      align-items: center;
      gap: 0.5rem; /* Using rem value per MCP rule #1 (8px = 0.5rem) - gap-2 as per Figma Button Behaviour */
      position: relative;
    `, [
      // Add divider after window controls when followed by navigation controls
      `&:not(:last-child)::after {
        content: '';
        width: 1px;
        height: 1.125rem; /* Using rem value per MCP rule #1 (18px = 1.125rem) - slightly taller for better visual separation */
        background-color: var(--z-divider-color);
        margin-left: 0.25rem; /* Using rem value per MCP rule #1 (12px = 0.75rem) - increased for proper visual separation */
        margin-right: 0.25rem; /* Using rem value per MCP rule #1 (4px = 0.25rem) - gap-1 spacing */
      }`
    ]),
    cE('navigation-controls', `
      display: flex;
      align-items: center;
      gap: 0.125rem; /* Using rem value per MCP rule #1 (2px = 0.125rem) - gap-0.5 as per Figma Table navigation */
    `),
    cE('pagination', `
      display: flex;
      align-items: center;
      margin-left: 0.75rem;
    `),
    cE('pagination-text', `
      font-size: 0.75rem; /* Using rem value per MCP rule #1 (12px = 0.75rem) - Font Size 12 as per Figma */
      line-height: 1rem; /* Using rem value per MCP rule #1 (16px = 1rem) - Line Height 16 as per Figma */
      color: var(--z-pagination-text-color); /* Using specific pagination text color token as per Figma */
      white-space: nowrap;
    `)
  ])
])

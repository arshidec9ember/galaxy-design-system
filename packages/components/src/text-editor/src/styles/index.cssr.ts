import { cB, c } from '../../../_utils/cssr'

export default cB('base-md-editor', [
  c('.custom-editor .md-editor-preview-wrapper a', `
    color: var(--gds-color-text-info) !important;
  `),
  c('.md-editor', `
    border-radius: var(--gds-border-radius-m);
  `),
  c('.md-editor-toolbar-wrapper', `
    padding: 0;
    border-bottom: 1px solid var(--z-toolbar-border-color) !important;
  `),
  c('.md-editor-toolbar-wrapper .md-editor-toolbar-left, .md-editor-toolbar-wrapper .md-editor-toolbar-right', `
    padding: 0;
  `),
  // Toolbar styling
  c('.md-editor-toolbar', `
    padding: var(--z-toolbar-padding) !important;
    min-height: var(--z-toolbar-height) !important;
    box-sizing: border-box !important;
  `),
  // Toolbar buttons - make them look like GDS Button XS
  c('.md-editor-toolbar .md-editor-toolbar-item', `
    width: var(--z-button-size) !important;
    height: var(--z-button-size) !important;
    min-width: var(--z-button-size) !important;
    min-height: var(--z-button-size) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border: 1px solid transparent !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    box-sizing: border-box !important;
    margin: 0;
    padding: 0;
  `),
  // Dropdown menus
  c('.md-editor-dropdown .md-editor-menu-item', `
    font: 400 0.875rem / 1rem "IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
  `),
  c('.md-editor-dropdown-option', `
    padding: 8px !important;
  `),
  // Icon sizing within buttons
  c('.md-editor-toolbar .md-editor-toolbar-item svg', `
    width: 16px !important;
    height: 16px !important;
  `)
])

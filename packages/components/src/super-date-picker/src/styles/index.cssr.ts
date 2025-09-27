import { c } from '../../../_utils/cssr'

// Super Date Picker CSSR Styles
export default c([
  c('.z-input .z-input__placeholder span',
    `
      padding-top: 0px;
    `
  ),
  c('.z-super-date-picker', [
    c('&__card', {
      width: 'auto',
      height: 'auto'
    }),

    c('&__tabs', {
      width: '100%'
    }),

    c('&__tab-content', {
      margin: '0.25rem 0.25rem 0.5rem 0.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      minHeight: 'auto',
      minWidth: '18.75rem'
    }, [
      c('.z-date-panel-header', {
        padding: '1.25rem 0'
      })
    ]),

    // Dropdown sections
    c('&__dropdown-row', {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
      paddingTop: '0.5rem'
    }),

    c('&__number-select', {
      minWidth: '185px',
      fontFamily: 'var(--z-font-family)',
      fontSize: 'var(--z-font-size-medium)'
    }),

    c('&__interval-select', {
      flex: '1',
      minWidth: '185px',
      fontFamily: 'var(--z-font-family)',
      fontSize: 'var(--z-font-size-medium)'
    }),

    // Switch section
    c('&__switch-row', {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    }),

    c('&__switch-label', {
      fontSize: 'var(--z-font-size-medium)',
      fontFamily: 'var(--z-font-family)',
      color: 'var(--z-text-color-base)'
    }),

    // Date picker section
    c('&__date-picker-row', {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    }),

    // Disabled controls section (above main picker)
    c('&__disabled-controls', {
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid var(--z-divider-color)'
    }),

    c('&__date-picker', {
      flex: '1',
      fontFamily: 'var(--z-font-family)',
      fontSize: 'var(--z-font-size-medium)',
      color: 'var(--z-text-color-base)'
    }),

    c('&__time-separator', {
      color: 'var(--z-text-color-base)',
      fontSize: 'var(--z-font-size-medium)',
      fontWeight: 'var(--z-font-weight-regular)',
      padding: '0 0.25rem'
    }),

    c('&__time-picker', {
      width: '7rem',
      fontFamily: 'var(--z-font-family)',
      fontSize: 'var(--z-font-size-medium)'
    }),

    // Display field section
    c('&__display-field', {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }),

    c('&__display-label', {
      fontSize: 'var(--z-font-size-small)',
      fontFamily: 'var(--z-font-family)',
      color: 'var(--z-text-color-secondary)',
      fontWeight: 'var(--z-font-weight-medium)'
    }),

    c('&__display-input', {
      fontFamily: 'var(--z-font-family)',
      fontSize: 'var(--z-font-size-medium)',
      color: 'var(--z-text-color-disabled)'
    }),

    // Button section
    c('&__button-row', {
      display: 'flex',
      gap: '0.5rem', // 8px gap from Figma design
      justifyContent: 'flex-start',
      paddingTop: '0.5rem'
    }),

    c('&__apply-button', {
      fontSize: 'var(--z-font-size-small)',
      fontWeight: 'var(--z-font-weight-medium)',
      padding: '0.5rem 1rem'
    }),

    c('&__cancel-button', {
      fontSize: 'var(--z-font-size-small)',
      fontWeight: 'var(--z-font-weight-medium)',
      padding: '0.5rem 1rem'
    }),

    // Relative tab specific
    c('&__relative-input', {
      width: '5rem',
      fontFamily: 'var(--z-font-family)',
      fontSize: 'var(--z-font-size-medium)'
    }),

    c('&__date-picker-panel', {
      borderRadius: 'var(--z-border-radius-medium)',
      overflow: 'hidden'
    }),

    c('&__date-picker-panel .z-date-picker', {
      width: '100%',
      border: 'none'
    }),

    // Now tab specific
    c('&__now-description', {
      color: 'var(--z-text-color-base)',
      maxWidth: '19.875rem'
    }),

    c('&__now-button', {
      alignSelf: 'flex-start',
      fontSize: 'var(--z-font-size-medium)',
      fontWeight: 'var(--z-font-weight-medium)',
      padding: '0.75rem 1.5rem'
    }),

    // Panel mode specific styles
    c('&--panel', {
      display: 'inline-block',
      border: '1px solid var(--z-border-color)',
      borderRadius: 'var(--z-border-radius-medium)',
      backgroundColor: 'var(--z-color-base-bg)',
      boxShadow: 'var(--z-box-shadow-light)'
    }, [
      c('.z-super-date-picker__card', {
        border: 'none',
        boxShadow: 'none'
      })
    ])
  ])
])

import type { ZLocale } from './enUS'
const enGB: ZLocale = {
  name: 'en-GB',
  global: {
    undo: 'Undo',
    redo: 'Redo',
    confirm: 'Confirm',
    clear: 'Clear',
    openInNewTab: 'Open in new tab',
    expandInFullScreen: 'Expand in full screen',
    closeFullScreen: 'Close full screen',
    close: 'Close',
    of: 'of',
    inAllChecklists: 'in All Checklists',
    next: 'Next',
    prev: 'Previous'
  },
  Popconfirm: {
    positiveText: 'Confirm',
    negativeText: 'Cancel'
  },
  Cascader: {
    placeholder: 'Select',
    loading: 'Loading',
    loadingRequiredMessage: (label: string): string =>
      `Please load all ${label}'s descendants before checking it.`
  },
  Time: {
    dateFormat: 'yyyy/MM/dd',
    dateTimeFormat: 'yyyy/MM/dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy/MM',
    dateFormat: 'yyyy/MM/dd',
    dateTimeFormat: 'yyyy/MM/dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: 'Clear',
    now: 'Today',
    confirm: 'Confirm',
    selectTime: 'Select Time',
    selectDate: 'Select Date',
    datePlaceholder: 'Select Date',
    datetimePlaceholder: 'Select Date and Time',
    monthPlaceholder: 'Select Month',
    yearPlaceholder: 'Select Year',
    quarterPlaceholder: 'Select Quarter',
    startDatePlaceholder: 'Start Date',
    endDatePlaceholder: 'End Date',
    startDatetimePlaceholder: 'Start Date and Time',
    endDatetimePlaceholder: 'End Date and Time',
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Today'
  },
  DataTable: {
    checkTableAll: 'Select all in the table',
    uncheckTableAll: 'Unselect all in the table',
    confirm: 'Confirm',
    clear: 'Clear',
    pinLeft: 'Pin Left',
    pinRight: 'Pin Right',
    unPin: 'Unpin',
    reorderingColumns: 'Reordering & Pinning',
    sortAscend: 'Sort Ascending',
    sortDescend: 'Sort Descending',
    sort: 'Sort',
    maxPin: 'Maximum pinned columns reached'
  },
  LegacyTransfer: {
    sourceTitle: 'Source',
    targetTitle: 'Target'
  },
  Transfer: {
    selectAll: 'Select all',
    unselectAll: 'Unselect all',
    clearAll: 'Clear',
    total: (num: number): string => `Total ${num} items`,
    selected: (num: number): string => `${num} items selected`
  },
  Empty: {
    title: 'No Content',
    description:
      'The server has successfully processed the request and that there is no additional information to send back.'
  },
  Select: {
    placeholder: 'Select'
  },
  TimePicker: {
    placeholder: 'Select Time',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    now: 'Now'
  },
  Pagination: {
    goto: 'Goto',
    selectionSuffix: 'page',
    per: 'per',
    pageLabel: 'Page'
  },
  DynamicTags: {
    add: 'Add'
  },
  Log: {
    loading: 'Loading'
  },
  Input: {
    placeholder: 'Please Input'
  },
  InputNumber: {
    placeholder: 'Please Input'
  },
  DynamicInput: {
    create: 'Create'
  },
  ThemeEditor: {
    title: 'Theme Editor',
    clearAllVars: 'Clear All Variables',
    clearSearch: 'Clear Search',
    filterCompName: 'Filter Component Name',
    filterVarName: 'Filter Variable Name',
    import: 'Import',
    export: 'Export',
    restore: 'Reset to Default'
  },
  Sidebar: {
    search: 'Search',
    noResults: 'No Results Found',
    description: 'Try refining your search to get better results',
    viewMore: 'View More',
    viewLess: 'View Less'
  },
  Image: {
    tipPrevious: 'Previous picture (←)',
    tipNext: 'Next picture (→)',
    tipCounterclockwise: 'Counterclockwise',
    tipClockwise: 'Clockwise',
    tipZoomOut: 'Zoom out',
    tipZoomIn: 'Zoom in',
    tipDownload: 'Download',
    tipClose: 'Close (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size'
  },
  Upload: {
    download: 'Download',
    tryAgain: 'Try Again',
    view: 'View'
  },
  TextEditor: {
    toolbarTips: {
      bold: 'Bold',
      underline: 'Underline',
      italic: 'Italic',
      strikeThrough: 'StrikeThrough',
      title: 'Title',
      sub: 'Subscript',
      sup: 'Superscript',
      quote: 'Quote',
      unorderedList: 'Unordered List',
      orderedList: 'Ordered List',
      task: 'Task List',
      codeRow: 'Inline Code',
      code: 'Block-level Code',
      link: 'Link',
      image: 'Image',
      table: 'Table',
      mermaid: 'Mermaid',
      katex: 'Formula',
      revoke: 'Undo',
      next: 'Redo',
      save: 'Save',
      prettier: 'Prettier',
      pageFullscreen: 'Fullscreen in Page',
      fullscreen: 'FullScreen',
      preview: 'Preview',
      previewOnly: 'Preview Only',
      htmlPreview: 'Html Preview',
      catalog: 'Catalog',
      github: 'Github'
    },
    titleItem: {
      h1: 'Heading 1',
      h2: 'Heading 2',
      h3: 'Heading 3',
      h4: 'Heading 4',
      h5: 'Heading 5',
      h6: 'Heading 6'
    },
    imgTitleItem: {
      link: 'Add Image Link',
      upload: 'Upload Image',
      clip2upload: 'Clip Upload'
    },
    linkModalTips: {
      linkTitle: 'Add Link',
      imageTitle: 'Add Image',
      descLabel: 'Desc:',
      descLabelPlaceHolder: 'Enter a description...',
      urlLabel: 'Link:',
      urlLabelPlaceHolder: 'Enter a link...',
      buttonOK: 'OK'
    },
    clipModalTips: {
      title: 'Crop Image',
      buttonUpload: 'Upload'
    },
    copyCode: {
      text: 'Copy',
      successTips: 'Copied!',
      failTips: 'Copy failed!'
    },
    mermaid: {
      flow: 'Flow',
      sequence: 'Sequence',
      gantt: 'Gantt',
      class: 'Class',
      state: 'State',
      pie: 'Pie',
      relationship: 'Relationship',
      journey: 'Journey'
    },
    katex: {
      inline: 'Inline',
      block: 'Block'
    },
    footer: {
      markdownTotal: 'Word Count',
      scrollAuto: 'Scroll Auto'
    }
  },
  SuperDatePicker: {
    placeholder: 'Select date',
    tabs: {
      absolute: 'Absolute',
      relative: 'Relative',
      now: 'Now'
    },
    placeholders: {
      number: 'Enter Value',
      interval: 'Interval',
      datePlaceholder: 'dd-MMM-yyyy HH:mm:ss.SSS',
      timePlaceholder: '00:00 AM'
    },
    intervals: {
      secondsAgo: 'Seconds ago',
      minutesAgo: 'Minutes ago',
      hoursAgo: 'Hours ago',
      daysAgo: 'Days ago',
      weeksAgo: 'Weeks ago',
      monthsAgo: 'Months ago',
      yearsAgo: 'Years ago',
      secondsFromNow: 'Seconds from now',
      minutesFromNow: 'Minutes from now',
      hoursFromNow: 'Hours from now',
      daysFromNow: 'Days from now',
      weeksFromNow: 'Weeks from now',
      monthsFromNow: 'Months from now',
      yearsFromNow: 'Years from now'
    },
    switches: {
      roundToDay: 'Round to the day',
      roundToSecond: 'Round to the second',
      roundToMinute: 'Round to the minute',
      roundToHour: 'Round to the hour',
      roundToWeek: 'Round to the week',
      roundToMonth: 'Round to the month',
      roundToYear: 'Round to the year'
    },
    labels: {
      date: 'Date',
      startDate: 'Start Date'
    },
    buttons: {
      apply: 'Apply',
      cancel: 'Cancel',
      setNow: 'Set start date and time to now'
    },
    quickRanges: {
      now: 'Now',
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This week',
      last15Minutes: 'Last 15 minutes',
      last30Minutes: 'Last 30 minutes',
      last1Hour: 'Last 1 hour',
      last4Hours: 'Last 4 hours',
      last12Hours: 'Last 12 hours',
      last24Hours: 'Last 24 hours',
      last7Days: 'Last 7 days',
      last30Days: 'Last 30 days',
      last90Days: 'Last 90 days',
      last1Year: 'Last 1 year'
    },
    nowDescription:
      'Setting the time to "now" means that on every refresh, the time will be set to the time of the refresh.'
  }
}

export default enGB

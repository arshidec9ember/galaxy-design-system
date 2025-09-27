# Iconography

Icons are visual symbols used to represent ideas, objects, or actions. They communicate messages at a glance, afford interactivity, and draw attention to important information.

<img src="/assets/images/iconography/iconography.svg" style="max-with: 90%; height: auto" >

## Contents

[GDS Icons](#gds-icons) [Characteristics](#characteristics) [Selecting & Designing Icons](#selecting--designing-icons) [Usage Guidelines](#usage-guidelines)

<!-- [Change Logs](#change-logs) -->

## GDS Icons

GDS uses Googleâ€™s Material Icons and Custom Designed Icons. Material Icons is the go to choice for most of the icons because they are clear, minimal, and consistent across platforms. They follow the focused and rational principles of our design system in both metaphor and style. When appropriate icons are not available in the Material Icons, we design them to serve our needs. We donâ€™t use multiple icon libraries to maintain a consistent design language across all GDS icons.

## Characteristics

### Style

All GDS icons are single tone and rounded. This style creates harmony with the overall design language of GDS. Being aesthetically minimal makes them less distracting and more meaningful. Rounded icons are easier on the eyes and feel more friendly because of their soft corners. <img src="/assets/images/iconography/iconography_style.svg" style="max-with: 90%; height: auto" >

### Sizing

GDS typically use icons on 24px artboards. Icons on 16px,20px, 24px, and 32px artboards can also be used within the UI. Be sure icon size is consistent throughout your product. <img src="/assets/images/iconography/iconography_size.svg" style="max-with: 90%; height: auto" >

### Color

Icons are always solid and monochromatic. They need to pass the same color contrast ratio as typography (4.5:1). The color of the icon should reflect the importance of the icon, which helps guide the users. The icon color varies depending on the interactive state (e.g., enabled, disabled) and the theme color. <img src="/assets/images/iconography/iconography_colors.svg" style="max-with: 90%; height: auto" >

### States

The icon color varies depending on the interactive state (e.g., enabled, disabled) and the theme color. All icons independently donâ€™t have any default interactive states. The states are based on how and where they are used.

For eg: While using an icon as a tertiary button, itâ€™ll follow the button interactive states. <img src="/assets/images/iconography/iconography_button_states.png

## Selecting & Designing Icons

### Material System Icons

While picking an icon from the material system icons, make sure to use only the rounded icons. Donâ€™t alter the icon names. All the icons are already a part of the GDS library installed in the developer environment. The same default names would be used to find the icon.

### Galaxy Custom Icons

Make sure to design a custom icon when it is already not available in Google's Material Icons. While designing a custom icon, please follow the guidelines described here. Design rounded, single tone icons. Assign a unique and meaningful name to the icon. Use all small letters and an underscore instead of spaces. Examples: â€œcredit_cardâ€, â€œfile_csvâ€, â€œfile_pdfâ€, â€œfile_previewâ€

<img src="/assets/images/iconography/iconography_custom_icons.svg" style="max-with: 90%; height: auto" >

## Usage Guidelines

<img src="/assets/images/iconography/iconography_dont_1.svg" style="max-with: 90%; height: auto" > 
Avoid using custom colors. Use the specified colors and colors based on the themes.

<img src="/assets/images/iconography/iconography_dont_2.svg" style="max-with: 90%; height: auto" >
Donâ€™t alter the original material icon styles and principles. And donâ€™t use other material styles like Sharp, Two Tone and others.

<img src="/assets/images/iconography/iconography_dont_3.svg" style="max-with: 90%; height: auto" >
Avoid distorting an icon, position icons â€œon pixelâ€ by making the X and Y coordinates with decimals.

Don't scale icons arbitrarily. Every icon is pixel-snapped for its particular size. Scaling can cause the proportions to be off-balance and can create unintended hierarchy within the experience. Icons are carefully designed to have consistent stroke weights, corner radii, and proportions at each size. Use the predefined sizes instead, 16, 20, 24 and 32.

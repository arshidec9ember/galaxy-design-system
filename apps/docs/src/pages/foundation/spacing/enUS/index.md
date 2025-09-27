# Spacing

Spacing is a small, yet an important fundamental concept in design. Spacing denotes space between all types of elements and layouts on the interface. Similar to a typographic scale, a well-crafted spacing scale helps in creating meaningful hierarchies and consistent visual experiences.

<img src="/assets/images/spacing/Spacing.svg" alt="Spacing" style="max-width: 90%; height: auto;">

## Spacing Tokens

In GDS, spacing is implemented in the form of spacing tokens. They are used for setting the padding and margin values across all components. The tokens basically replace the otherwise hard-coded spacing values. GDS has 14 spacing tokens, corresponding to the spacing scale.

## Spacing Scale

Spacing scale is an incremental spacing system to create relationships and hierarchy between elements in design. The scale is used within components as well as between components and layouts.

The GDS scale is built on a system of 4px. It increments in order of 2px, 4px, and 8px, to form the following 14 spacers. Where 2px is the smallest spacer and 72px is the largest.

<img src="/assets/images/spacing/Spacing_Scale.png" alt="Spacing Scale" style="max-width: 90%; height: auto;">

## Usage Examples

<img src="/assets/images/spacing/Spacing_Usage_1.png" alt="Spacing Usage 1" style="max-width: 90%; height: auto;">

Example 1: Spacing between components on a webpage

<img src="/assets/images/spacing/Spacing_Usage_2.png" alt="Spacing Usage 2" style="max-width: 90%; height: auto;">

Example 2: Spacing between atomic components (text, buttons, etc.) within a larger component (card).

## Usage Guidelines

<img src="/assets/images/spacing/Spacing_Dont_1.png" alt="Avoid Custom Spacing" style="max-width: 90%; height: auto;">

Don't use custom spacing.

<img src="/assets/images/spacing/Spacing_Do_1.png" alt="Predefined Spacing Scale" style="max-width: 90%; height: auto;">

Always use a space from the spacing scale to maintain consistency and hierarchy across the interface.

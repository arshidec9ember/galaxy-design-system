# Opacity

Opacity is the level of light that passes through an object. The lower the opacity, the more light passes through. Adding opacity to elements makes the background of such elements visible depending on the level of the opacity. Opacity is used for various purposes in design, to blend the object color with the background color, de-emphasize objects, create depth, etc.

<img src="/assets/images/opacity/Opacity.png" alt="Opacity" style="max-width: 90%; height: auto;">

## Opacity Tokens

In GDS, opacity is implemented in the form of opacity tokens. They are used for setting the opacity values across all types of objects, where required. The tokens basically replace the otherwise hard-coded opacity values. GDS has five opacity tokens, corresponding to the five opacity levels.

## Opacity Levels

Opacity levels are incremental opacity values. Different levels are used to bring about certain visual effects, based on the use case. The GDS opacity levels increment in the order of 10% and 20%, to form the following 7 levels.

<img src="/assets/images/opacity/Opacity_Tokens.png" alt="Opacity Tokens" style="max-width: 90%; height: auto;">

## Usage Examples

<img src="/assets/images/opacity/Opacity_Usage_1.png" alt="Opacity Usage 1" style="max-width: 90%; height: auto;">

Opacity used to create the disabled state of the primary buttons.

## Usage Guidelines

<img src="/assets/images/opacity/Opacity_Dont_1.png" alt="Avoid Custom Opacity" style="max-width: 90%; height: auto;">

Don’t use custom opacity.

<img src="/assets/images/opacity/Opacity_Do_1.png" alt="Predefined Opacity Levels" style="max-width: 90%; height: auto;">

Always use an opacity from the predefined opacity levels to maintain consistent expressions across the product and across products.

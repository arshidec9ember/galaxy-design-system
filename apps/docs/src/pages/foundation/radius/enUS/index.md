# Radius

Radius is used to smooth out the corners of components and containers. Rounded corners are easy on the eyes and they help in driving the focus inwards, towards the content.

<img src="/assets/images/radius/Radius.png" alt="Radius" style="max-width: 90%; height: auto;">

## Radius Tokens

In GDS, radius is implemented in the form of radius tokens. They are used for setting the corner radius values across components and containers. The tokens basically replace the otherwise hard-coded radius values. GDS has four radius tokens, corresponding to the four levels of corner radius.

## Radius Levels

Radius levels are incremental radius values. Different levels are used based on the proportions of the object, or to bring about a certain visual effect.

The GDS radius levels increment in order of 4 and 8, to form the following levels. Where 4px is the lowest radius, and the highest radius being a circle is set by the radius value of 999px.

<img src="/assets/images/radius/Radius_Tokens.png" alt="Radius Tokens" style="max-width: 90%; height: auto;">

## Usage Examples

<img src="/assets/images/radius/Radius_Usage_1.png" alt="Radius Usage 1" style="max-width: 90%; height: auto;">

Example of radius used across several components, Buttons, Badge, Form Fields, Card, and Modal.

## Usage Guidelines

<img src="/assets/images/radius/Radius_Dont_1.png" alt="Avoid Custom Radius" style="max-width: 90%; height: auto;">

Don't use custom Radius.

<img src="/assets/images/radius/Radius_Do_1.png" alt="Predefined Radius Levels" style="max-width: 90%; height: auto;">

Always use a radius from the predefined radius levels to maintain consistency across the product and across products.

# States Naming

States of a component provide visual feedback on interaction and convey their status. Component states are classified into two categories: interactive and system states.

<img src="/assets/images/states_naming/states_naming_intro.png" alt="Introduction to Component States" style="max-width: 90%; height: auto;">

## Naming Philosophy

The GDS philosophy for states naming is based on the following principles:

- Names should be **Unambiguous**
- Names should be **Clearly Understood**
- Names should have a **Consistent Grammar**
- Names should have **Semantic Meaning**

<img src="/assets/images/states_naming/states_naming_philosophy.png" alt="Naming Philosophy" style="max-width: 90%; height: auto;">

## Interactive States

These states help users understand the status of the component with an instant visual response on interacting with it. They are triggered by the users and they improve the user experience by adding life to the otherwise static elements.

GDS follows the following naming convention for interactive states:

- **Default**: The natural state of the component before any interaction is initiated with it.
- **Hovered**: Initiated when a user hovers over the interactive area of the component.
- **Focused**: Initiated when a user navigates to the component using a keyboard or voice.
- **Pressed**: A temporary state initiated and lasts only for the duration a component is clicked.
- **Empty**: Represents the empty state of a component before data is added to it.
- **Filled**: Represents the filled state of a component which is the opposite of the empty state.
- **Checked**: Represents the checked state of the checkbox component.
- **Unchecked**: Represents the deselected state of the checkbox component.
- **Selected**: Represents the selected state of a component.
- **Unselected**: Represents the non-selected state of the components.
- **On**: Represents the on state of the toggle switch component.
- **Off**: Represents the off state of the toggle switch component.

<img src="/assets/images/states_naming/states_naming_basics.png" alt="Interactive States Naming Basics" style="max-width: 90%; height: auto;">
<img src="/assets/images/states_naming/states_naming_selected.png" alt="Selected and Unselected States Naming" style="max-width: 90%; height: auto;">
<img src="/assets/images/states_naming/states_naming_on_off.png" alt="On and Off States Naming" style="max-width: 90%; height: auto;">
<img src="/assets/images/states_naming/states_naming_filled_empty.png" alt="Filled and Empty States Naming" style="max-width: 90%; height: auto;">

## System States

These states inform the users of the status of the underlying system, flow, conditions, etc., via component feedback. They are triggered by the system or the component and they may or may not be based on a user’s action or interaction.

GDS follows the following naming convention for system states:

- **Disabled**: A non-interactive state of a component that communicates to the user that it cannot be interacted with.
- **Read Only**: A non-interactive state in which the user can see and read the information displayed in a component, but cannot update it.
- **Loading**: Communicates the processing activities of a component/system like uploading, compressing, etc.
- **Error**: Communicates to the user when an error occurs in the context of the component.
- **Success**: Communicates the success validation in the context of the component.
- **Warning**: Communicates a warning to avoid potential errors in the context of the component.

<img src="/assets/images/states_naming/states_naming_system_states.png" alt="System States Naming" style="max-width: 90%; height: auto;">

## Naming Ambiguity

**Pressed v/s Active**

Note that GDS avoids the usage of the term “active” for states. The active state naming is ambiguous. And the pressed state is not the same as active.

The pressed state is triggered when an element is clicked/tapped - and remains true _only for the duration the click/tap lasts,_ which is generally in microseconds. Whereas the active state is represented by more meaningful and unambiguous terminologies, “Selected”, “Checked” and “On” in GDS. These are the resulting states of the component immediately _after the click is performed_.

The pressed state adds a high degree of interactive feedback and thus aids in the user experience.

# Negative actions

Any action with a negative connotation is called a negative action. For example, delete, remove, deactivate, reject, etc. These actions may or may not result in data destruction. The consequences of negative actions could be higher when compared to other non-negative actions.

The GDS negative actions pattern provides guidelines to design for such actions. Where the primary purpose is to establish certain interface behaviors to avoid potential data loss or unintended outcomes.

<img src="/assets/images/negative-actions/negative_action_pattern_intro.png" alt="" style="max-width: 90%; height: auto;">

## Types of Negative Actions

- [Destructive Actions](#destructive-actions)
- [Semi-destructive Actions](#semi-destructive-actions)
- [Non-destructive Actions](#non-destructive-actions)
- [Rescuing Actions](#rescuing-actions)

## Destructive Actions

These actions lead to a data loss in the system. Example actions: Delete, discard, erase, close program, abort, etc. It is classified in the following three types based on the level of impact:

| Impact | Action Reversal | Example | Confirmation Type |
| --- | --- | --- | --- |
| **High** | Cannot be recreated | Deleting a workspace or a product definition that has many things configured inside | Triple confirmation (by reconfirming action in the modal via additional input field) |
| **Medium** | Difficult to recreate | Deleting a report that’s difficult to recreate | Double confirmation (confirming the modal) |
| **Low** | Easy to recreate | Deleting a reward rule before publishing | No confirmation (no modal) |

### High Impact Destructive Actions

These are the highest impact actions in a product. Therefore it requires using multiple levels of confirmation. Use a modal along with a field to enter a keyword to be firmly sure of the action.

<img src="/assets/images/negative-actions/negative_action_pattern_highimpact.png" alt="" style="max-width: 90%; height: auto;">
<img src="/assets/images/negative-actions/negative_action_pattern_highimpact2.png" alt="" style="max-width: 90%; height: auto;">

### Medium Impact Destructive Actions

Use a double confirmation method for such actions. The following examples represent different types of scenarios:

1. For the action over a single item from a pool of items - display the item name over the modal.

   <img src="/assets/images/negative-actions/negative_action_pattern_5.png" alt="" style="max-width: 90%; height: auto;">

2. For the action over multiple items - display the count of the number of items and possibly a few of the item names.

   <img src="/assets/images/negative-actions/negative_action_pattern_6.png" alt="" style="max-width: 90%; height: auto;">

3. Less intrusive way of double confirmation which can be used for high frequency actions and for medium impact actions present over an overlay (like a modal).

   <img src="/assets/images/negative-actions/negative_action_pattern_3.png" alt="" style="max-width: 90%; height: auto;">
   <img src="/assets/images/negative-actions/negative_action_pattern_4.png" alt="" style="max-width: 90%; height: auto;">

### Low Impact Destructive Actions

Such actions don't need a double confirmation. Consider using a regular button instead of the danger button to avoid visual emphasis.

<img src="/assets/images/negative-actions/negative_action_pattern_7.png" alt="" style="max-width: 90%; height: auto;">

## Semi-destructive Actions

These actions don’t entirely lead to data loss. They either remove an instance of the data from a location, where the data doesn't get deleted from the system and can be accessed at other locations. Or the removed data can be easily added back. Example: Removing user access. It is classified in the following three types based on the level of impact:

| Impact | Action Reversal | Example | Confirmation Type |
| --- | --- | --- | --- |
| **High** | The impact of the action is high and it is relatively difficult to recreate. | Removing a user’s access from the system or parts of a system | Triple confirmation (by reconfirming the action in the modal via additional input field) |
| **Medium** | It is easier to recreate, but the user needs to be informed of the consequences. | Excluding a user group from a program | Double confirmation (confirming the modal) |
| **Low** | Easy to recreate | Removing a rule from the interface that is not saved yet | No confirmation (no modal) |

### High Impact Semi-destructive Actions

The impact of such actions is high and the data is relatively difficult to recreate. A simple multi-level confirmation with a checkbox to confirm the consequences works well for ensuring conscious actions.

<img src="/assets/images/negative-actions/negative_action_pattern_13.png" alt="" style="max-width: 90%; height: auto;">

### Medium Impact Semi-destructive Actions

It is easier to recreate such data. But since they do have certain consequences, use a simple double confirmation. Make sure to inform the users of the consequences by leveraging the modal.

<img src="/assets/images/negative-actions/negative_action_pattern_8.png" alt="" style="max-width: 90%; height: auto;">

### Low Impact Semi-destructive Actions

These actions can be easily reversed by recreating the data. Therefore a double confirmation is not required. Consider using a regular button instead of the danger button to avoid visual emphasis.

<img src="/assets/images/negative-actions/negative_action_pattern_9.png" alt="" style="max-width: 90%; height: auto;">

## Non-destructive Actions

These actions don’t lead to data loss, but they have a negative connotation associated with them. Example: Deactivate, deny, decline, reverse, mute, block, don’t allow, dismiss, archive, freeze, revoke access, disconnect, etc.

- A double confirmation modal could be used, but not necessary - depending on the context
- These actions can be depicted with the danger buttons

<img src="/assets/images/negative-actions/negative_action_pattern_10.png" alt="" style="max-width: 90%; height: auto;">

## Rescuing Actions

These actions don’t have a negative connotation but fall under the purview of negative actions as they can potentially cause data loss in specific user contexts, like in interface navigation. There are some simple considerations to remember while designing for these actions. Example 1: Closing or navigating away from a page/overlay which contains unsaved data. Trigger a double confirmation for such actions to avoid losing the data.

<img src="/assets/images/negative-actions/negative_action_pattern_11.png" alt="" style="max-width: 90%; height: auto;">

Example 2: Clear or Reset Maintain sufficient distance between negative and non-negative actions (and depict the negative actions differently where possible).

<img src="/assets/images/negative-actions/negative_action_pattern_12.png" alt="" style="max-width: 90%; height: auto;">

## Common Guidelines

1. Always display the feedback of a successful negative action with a Toast to inform the user of the success.

   <img src="/assets/images/negative-actions/negative_action_pattern_common_guidelines_1.png" alt="" style="max-width: 90%; height: auto;">

2. If a negative action fails, convey the failure clearly to the users and provide a quick way to retry it, if possible.

   <img src="/assets/images/negative-actions/negative_action_pattern_common_guidelines_2.png" alt="" style="max-width: 90%; height: auto;">

3. While using positive and negative actions together, use the primary color button for the positive action paired with the danger (red) color for the negative ones. Using the red and green-filled buttons together doesn’t create a better visual hierarchy and adds too much visual emphasis to both the buttons.

   <img src="/assets/images/negative-actions/negative_action_pattern_common_guidelines_3.png" alt="" style="max-width: 90%; height: auto;">

4. Consider using icons for negative actions. If you do, please use the following standardized icons for Block, Remove, Close, and Delete icons to create a consistent representation across the product(s).

   <img src="/assets/images/negative-actions/negative_action_pattern_common_guidelines_4.png" alt="" style="max-width: 90%; height: auto;">

5. Delete v/s Remove: Delete erases the data (i.e., data could become nonrecoverable). Example: Deleting an ice cream flavour which is no longer manufactured. Whereas remove denotes that the data is taken away and set aside, but not permanently deleted. Example: Marking an ice cream flavour as out of stock.

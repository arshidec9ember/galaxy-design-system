# Empty States

Empty states occur when there is no data to show to the user. They can be used effectively to guide the users toward the next steps when data can't be displayed or is not available.

The GDS empty states pattern provides simple yet effective guidelines to leverage the empty states for designing a better user experience.

**When do the Empty States occur?**

- **First-time use:** When the user is setting up a product for the first time
- **When there is no data to display:** Data is not available or non-existent on the platform
- **User-driven actions:** When no results are found on searching data or applying filters

## GDS Components for Empty States

The following components are used for representing empty states across all the scenarios:

- Empty State Component
- Large Page Banners
- Entity Zero State

#### Empty State Component

Empty State as we all know is a simple component with an illustration/icon, title, description, and CTAs. It is used in empty pages and containers.

<img src="/assets/images/empty-states/empty-state-component.png" alt="Empty State Component" style="max-width: 70%; height: auto;">

To learn more about this component, <a href="" target="_blank" style="display: inline">click here</a>

#### Guidelines:

- **For Illustration:** Use an illustration that communicates the situation and is relevant to the product, users, and the scenario.
- **For Title:** Keep it short, simple, and to the point. It should guide the user to come out of an empty state. If possible, we recommend using a welcoming tone, e.g., “Start adding entities” for primary pages and alternatively using a normal informing tone, e.g., ”No entities to show” for secondary pages.
- **For Description:** Explain briefly to the user why the space is empty. This is followed by providing a solution to the user in the form of the next steps with the help of a CTA below the text or via a link.

<br>
**A new GDS Illustrations library is now available 🤩**

We have redefined the illustration style to better suit our visual language and help users bring attention to the right info. With this, the old illustrations are updated to match the new style and some new ones are added as well.

[View Illustration Library 2.0](https://www.figma.com/file/oSFTPfLYytW74zl2UutXpI/GDS---Images%2C-Illustrations-%26-Logos?node-id=703%3A9386)

#### Large Page Banner Component

The Large variant of the Page Banner component is used at the top of empty pages to display the page titles along with some other information like descriptions, actions, etc. It helps in emphasizing the primary creation flow of the product, providing additional info to users, and adding delight by using large illustrations.

<img src="/assets/images/empty-states/large-page-banner-component.png" alt="Large Page Banner Component" style="max-width: 70%; height: auto;">

To learn more about this component, <a href="https://zeta-tm.atlassian.net/wiki/spaces/GDS/pages/2796191754/Empty+States+Pattern#:~:text=about%20this%20component%2C-,click%20here,-Entity%20Zero%20State" target="_blank" style="display: inline">click here</a>

#### Entity Zero State Component

The entity zero states component is used in forms to represent the empty state of an entity. It contains an optional title, description, an illustration, and CTAs to initiate a flow to create an entity.

<img src="/assets/images/empty-states/entity-zero-state-component.png" alt="Entity Zero State Component" style="max-width: 70%; height: auto;">

To learn more about this component, <a href="https://zeta-tm.atlassian.net/wiki/spaces/GDS/pages/2796191754/Empty+States+Pattern#4.--Zero-States-of-Creation-flows-(Forms)" target="_blank" style="display: inline">click here</a>

## Empty State Scenarios

Empty state can occur in the following types of scenarios:

- Empty pages
- No Search results
- No Filter results
- Zero States of Creation flows (Forms)

**Empty states in UI containers**

- Side Sheets
- Bottom Sheets
- Modals
- Accordions
- View Content
- Popovers
- Tables

#### 1. Empty Pages

Empty pages generally occur during the first-time use of a product when there is no data created to display yet. Using an effective empty state representation informs the users about why the page is empty and guides them in creating the data.

#### Guidelines:

**Actions:** We recommend positioning the Primary action of the page along with the empty state component. This layout provides all the information at the center of the page and is easier to consume and understand.

<img src="/assets/images/empty-states/empty-page-guidelines.png" alt="Empty Page Guidelines" style="max-width: 70%; height: auto;">

Once the user creates an entity on the page, we can shift the primary action button to its default positioning in the <a href="/components/page-banners/" style="display: inline;">Page Banner</a>

<img src="/assets/images/empty-states/empty-page-guidelines-2.png" alt="Empty Page Guidelines Example" style="max-width: 70%; height: auto;">

#### 2. No Search results

This scenario occurs when a user searches for a specific keyword/item, and no results are found. It can be due to multiple factors:

- A wrong keyword entered
- Matching data doesn't exist
- Results could not be retrieved due to an error (This is described in the <a href="/patterns/error-states/" style="display: inline;">Error State Pattern</a>)

The objective here is to effectively inform the user that results could not be found and if there’s anything the user can do to retrieve data, like checking for spelling mistakes, using other terms, etc.

#### Guidelines:

- **Title:** We recommend using a title like “No results found for \_ \_ \_ \_”, where the dash can be the data the user is searching for. For example, No results found for VBOs, No results found for Nudges, etc.
- **Actions:** In general, there is no need for actions here. But if required, one can provide supportive actions like “Clear search”. Make sure to use a tertiary action though.

<img src="/assets/images/empty-states/no-search-result.png" alt="No Search Result Example" style="max-width: 70%; height: auto;">

<img src="/assets/images/empty-states/no-search-result-2.png" alt="No Search Result Example with Actions" style="max-width: 70%; height: auto;">

#### 3. No Filter results

This scenario occurs when no results are found for the applied filters. The objective here is to inform the user why no results are displayed and to guide them on how to rectify the situation.

<img src="/assets/images/empty-states/no-filter-result.png" alt="No Filter Result Example" style="max-width: 70%; height: auto;">

#### 4. Zero States of Creation flows (Forms)

This scenario represents the zero state or initial state of an entity. In reality, this isn't an empty state, it is the initial state of the entity.

An entity could be any item that is created or selected in a form that requires a flow of its own. Such as opening a side sheet or a modal. Once an entity is created/selected, the feedback for it can be shown in any required format such as cards, lists, text, etc.

For example, your page shows a list of payment products, and to create a payment product your first requirement is to create an “Account Provider”. So Account provider becomes an entity here.

<img src="/assets/images/empty-states/zero-state-usage.png" alt="Zero State Usage Example" style="max-width: 70%; height: auto;">

The objective here is to bring more emphasis on any specific sections which require individual flows of themselves.

##### Guidelines:

- **Illustration:** The illustration needs to be contextual to what actions the user needs to perform through this component. For example, actions can be either “Selection, Creation, Addition, or just user confirmation.”
- **Section Heading:** Keep the heading short and simple. Clearly mention the next steps.
- **Field label:** Enable field label to align with other form fields on the page and provide more context on what type of data will eventually come under this section.
- **Description:** This is simply a description text, 1-2 liner providing more context on what is required.
- **Actions:** Include actions that enable users to trigger the required flow. Which button style to use is something that can be defined based on emphasis and how important that action is.

To learn more about this component, <a href="https://gds.zeta.tech/components/page-banners/" target="_blank" style="display: inline">click here</a>

## Empty State in UI Containers

How empty states behave when triggered in different UI containers (Modal, side sheet, bottom sheet, accordion, View content & popovers)

When the data is not available to be displayed in a component, a relevant zero state is displayed instead. Zero state representations in a component help the users understand the scenario. And the next steps to be followed, if any.

**1. Empty state in Sidesheet**

<img src="/assets/images/empty-states/empty-state-1.png" alt="Empty State in Sidesheet" style="max-width: 70%; height: auto;">

**2. Empty state in the Bottom sheet**

<img src="/assets/images/empty-states/empty-state-2.png" alt="Empty State in Bottom Sheet" style="max-width: 70%; height: auto;">

**3. Empty state in the Modal**

<img src="/assets/images/empty-states/empty-state-3.png" alt="Empty State in Modal" style="max-width: 70%; height: auto;">

**4. Empty state in the Accordion**

<img src="/assets/images/empty-states/empty-state-4.png" alt="Empty State in Accordion" style="max-width: 70%; height: auto;">

**5. Empty state in the View content**

<img src="/assets/images/empty-states/empty-state-5.png" alt="Empty State in View Content" style="max-width: 70%; height: auto;">

**6. Empty state in the Popover**

<img src="/assets/images/empty-states/empty-state-6.png" alt="Empty State in Popover" style="max-width: 70%; height: auto;">

**7. Empty state in the Table**

<img src="/assets/images/empty-states/empty-state-7.png" alt="Empty State in Table" style="max-width: 70%; height: auto;">

## User Onboarding

Improving Onboarding Experience Using Empty states & other components As we all know that empty states are a crucial part of a product onboarding experience, when a user lands on a product for the first time and how the product welcomes them.

Let us start from:

**Is there enough information available for users to understand what is where and how to start major creation flows?**

Providing additional content that helps users to understand your product better in place of a normal empty state is another way in which you can make the first-time experience more positive and productive.

What additional content can be provided?

- **Using Page banners** instead of normal empty states
- **Using Starter content** along with empty states for more context
- **Using banner models** to introduce new features in the product

#### 1. Using Page Banners

When a User starts their product journey and lands on your product for the first time, welcome them with an informative and beautiful banner.

The banner has two main purposes:

- Introduce the user to the product
- Guide the user on how to get started with the creation flow

The Banner Empty State is used when we need to emphasize the creation flow of the product. This state also provides the option of teaching your users about the product.

Designing well-thought-out and useful banner empty state screens can help drive more product engagement and at the same time delight users.

**Note: Avoid using Banner empty state for nested pages. Use it for the onboarding experience only.**

<img src="/assets/images/empty-states/using-page-banners.png" alt="Using Page Banners Example" style="max-width: 70%; height: auto;">

<img src="/assets/images/empty-states/using-page-banners-2.png" alt="Using Page Banners Example 2" style="max-width: 70%; height: auto;">

**When to use Full-width banner vs Regular banner?**

Use the full-width banner on home pages when the homepage doesn’t contain a sidebar. And use the regular banners with padding on the pages with Primary sidebar.

#### 2. Using Starter content

Providing starter content along with an empty state is also a good practice for improving the first-time experience of your users.

What does starter content mean?

Starter content is just a section including helpful FAQs, Videos, or additional links which enable your users to know more about your product and how things are done here.

<img src="/assets/images/empty-states/starter-content.png" alt="Starter Content Example" style="max-width: 70%; height: auto;">

#### 3. Using Banner modals

Banner modals do not exactly fall under the category of empty states but are more suitable for first-time use cases when a primary feature is introduced in your products.

Use these large banner modals to first gather the user’s attention and then provide more context around the features, highlighting the details and benefits, or just simply drive more engagement by providing helpful videos/docs.

You can also include interesting illustrations to trigger user interest and provide links to more detailed documentation.

<img src="/assets/images/empty-states/banner-modal.png" alt="Banner Modal Example" style="max-width: 70%; height: auto;">

## Best Practices 💯

### 1. Guide the user

Use the empty state to guide the user and convey information. This should include the way forward, the next steps to improve the situation, and the reason for the empty state. The purpose is to prevent an unsatisfactory user experience.

### 2. Choose the copy carefully

Using the correct copy for the header and body is particularly important in an empty state. The message should be short, simple, and straightforward. It should help the user understand the next steps. This could be anything from onboarding experience to entering data.

### 3. Use Visual Content

Well-designed visual content has more power to engage the user. Use illustrations that match the scenario. Adding an image/illustration in an empty state makes it more appealing and engaging.

### 4. Nudge user to take action with CTA

CTA provides a clear prompt to the user on what to do next. CTA helps the user in navigating the center and can take them anywhere. If a CTA is not needed in the situation, a text link could also be used to guide the user for further details.

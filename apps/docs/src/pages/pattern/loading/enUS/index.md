# Loading

Loading is a visual indication that is used to set an expectation of what the system is doing. It provides feedback to the user and could be used to inform them of the time or status of completion. The loading interaction is designed considering various factors like wait time, amount of data being processed, and task complexity.

The GDS loading pattern describes different types of loaders along with recommendations on which type to use based on various scenarios.

---

## How do Loaders Help

- Informs the user of the system feedback
- Loaders established a sense of momentum and continuity
- It provides a perception that content is loading faster
- Handles the amount of latency present when the interface loads the data
- It lets the user know that the interface is not frozen
- It also establishes a sense of reassurance

---

## Types of Loaders

### 1. Determinate

Determinate loaders display how long a task may take to complete. It shows the status of time.

- It provides a sense of duration
- Provides a start and end point
- When the process takes more than 10 secs, adding a time estimate with the component is advised.
- It should be used when load time is known or detachable.
- Determinate loaders can communicate it better with numbers & percentages.

### 2. Indeterminate

Indeterminate loaders display unquantified wait time.

- Less Informative.
- It should be used when the wait time is less.
- When the process is unquantifiable, we can use the indeterminate loader.

> 📘 Note:- Determinate and indeterminate loaders can be in the form of linear and circular.

---

## Loading Behaviors

This section covers the two common ways of loading data which optimizes the process and performance.

### Lazy loading

Lazy loading is an optimizing technique where the content on the page will not be loaded until needed. Normally the whole page loads together at once which is known as “eager loading”. In lazy loading, the system fetches the content when it's needed by the user. It can be implemented with pagination, batch loading with load more, infinite scroll, and if data is loading from different sources.

<img src="/assets/images/loading-patterns/loadingPattern_1_lazyLoading.png" alt="" style="max-width: 70%; height: auto;">

##### Pros

- Improves the performance of the interface by reducing the initial page load time by delaying the content loading
- It reduces time consumption and memory usage which optimizes content delivery
- Reduces cost by reducing the memory usage and total bytes delivered

##### Cons

- If overused it can have a negative impact on the SEO and the site’s performance
- Cannot be used for critical content
- Too much dynamic loading on the page can cause interruptions for the user

### Progressive Loading

Progressive loading loads content in steps, so the page loads in multiple stages. Elements on the page appear once they get loaded. First, the skeleton outline is displayed, then text and images.

<img src="/assets/images/loading-patterns/loadingPattern_2_progressiveLoading.png" alt="" style="max-width: 70%; height: auto;">

##### Pros

- Indicates an indication of progress.
- Encourages active waiting by giving the user new information at each step.
- It can be used on a page that calls data from multiple sources.
- When filtering and sorting in a table, the data can use progressive loading to load the data stepwise.

##### Cons

- Progressive loader should not use on low-data pages as it can be loaded in one go.
- It takes more development effort to enable progressive loading than loading a page in one go.
- Too much dynamic loading on the page can cause interruptions for the user

---

## GDS Component for Progress & Loading

### Spinner

Use Spinner when the wait time is less and the process takes more than 1 sec. Spinner is the most common loading pattern used across platforms and is usually used for loading the status of a page, section, or inline action when the system needs to know the exact wait time. [Learn more][spinner]

<img src="/assets/images/loading-patterns/loadingPattern_3_typesOfSpinner.png" alt="" style="max-width: 70%; height: auto;">

##### When to use

- When the page structure is undetermined.
- In the case of empty white screens, use a spinner to communicate that system is working.
- When an activity is happening (uploading or saving), then Spinner indicates by making the background busy.
- Use spinners when a component on a page is making an asynchronous update without refreshing the page.
- To reload a failure error and empty state.
- When you manually refresh the page.

##### Don't

- Don’t use a spinner loader when more than one component is getting loaded, at that time it is advised to use a skeleton loader.
- Avoid using multiple spinners at the same time.
- Avoid using an indeterminate spinner for processes that take longer to load.

##### Use Cases

- **Small Spinner –** Use with a button, near a text, tiny inline action, or feedback.
- **Medium Spinner –** Modals, side sheets, within a component, forms, area with limited space.
- **Large Spinner –** Whole page, Larger components, areas with no space constraints.

> ⭐️ An overlay spinner can be used to block users' interaction with the whole screen or a section while the process is happening in the background.

### Progress

Progress loaders are informative loaders that show how much time the system will take to complete a task. It tells how much task is completed and how much is left. It also gives an approximate wait time to the user, which decreases the uncertainty of the process.

<img src="/assets/images/loading-patterns/loadingPattern_4_typesOfProgressLoaders.png" alt="" style="max-width: 70%; height: auto;">

##### When to use

Determinate Progress loaders should be used when the task is taking more than 10 secs. While uploading & downloading data. It should be used where the process is measurable. To give informative feedback during a long process.

##### Don’t

Avoid using the progress loader for an unknown amount of time. It should not be used for faster processes.

##### Use Cases

Exporting & Importing a file. Processing a document. Loading a long-running task in the background. To show where the user is in their journey. Opening a new application or file.

> ⭐️ In some use cases progress loader could have a cancel button if the user wishes to abandon the process. ⭐️ Progress eases the waiting time and increases the user’s attention on the interface.

### Skeleton

Skeleton Loader shows the user interface preview before the content ultimately shows. It gives an initial idea of the content. The Skeleton loader sets up users' expectations & gives an illusion that content is loading comparatively faster.

<img src="/assets/images/loading-patterns/loadingPattern_5_waveSkeletonLoader.png" alt="" style="max-width: 70%; height: auto;">

##### When to use

- For a more visually appealing experience.
- To decrease the perceived wait time.
- When to give a sense of structure to the page before actual content shows up.
- When loading spinner is not prominent on the screen.

##### Don’t

- It should not be used for small feedback and inline actions.
- When the wait time is less, then it's not advised to use a skeleton loader.
- Skeleton Loader should not be used with dynamic layouts/page structures.
- Should not combine the skeleton loader with the spinner.

##### Use Cases

- On the home pages of the applications.
- When loading structured data like tables & charts.
- When there is high traffic on an interface.
- It can be used in cards, whole pages, lists, content blocks, charts, and tables.
- Navigating from one application to another.

> ⭐️ The skeleton loader should match as close as possible with the actual content by using different shapes. However, when the data is not available then the skeleton loader can differ a bit from the actual content.

> 📘 The wait time ideally should be less than 1 second which is considered an immediate response. 📘 Loading components should only be used when the wait time is unavoidable and the delay is not caused by another issue on the interface.

---

## Loading representation across scenarios

This section covers various Loading representations across scenarios and GDS components. These include all the types of loading patterns described above.

### 1. Tables

Tables consist of data in form of rows and columns. When data is loaded from an API call while refreshing the page/table or loading it, then skeleton loaders are the best to represent the structure of the content as it indicates what is about to appear.

<img src="/assets/images/loading-patterns/loadingPattern_6_table.png" alt="" style="max-width: 70%; height: auto;">

### 2. Cards

Cards can contain several elements like content, buttons, or inline actions. Loading can happen for the entire card, the content inside the card, or the section in which all the cards are present.

<img src="/assets/images/loading-patterns/loadingPattern_7.1_cards.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/loading-patterns/loadingPattern_7.2_cards.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/loading-patterns/loadingPattern_7.3_cards.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/loading-patterns/loadingPattern_7.4_cards.png" alt="" style="max-width: 70%; height: auto;">

### 3. View Content

Loading when viewing the content in a container.

<img src="/assets/images/loading-patterns/loadingPattern_8_viewContent.png" alt="" style="max-width: 70%; height: auto;">

### 4. Side sheet

Side sheets can contain forms, content, cards, and sections. For these use cases, a skeleton loader is recommended if the loading time is significant, while a spinner would be a good solution for shorter wait times.

<img src="/assets/images/loading-patterns/loadingPattern_9_sidesheet.png" alt="" style="max-width: 70%; height: auto;">

### 5. Buttons

When any button is clicked by the user, a reaction to the action should be displayed through loaders. Indeterminate spinners inside a button or near a button & indeterminate progress near the button component is a way to go.

<img src="/assets/images/loading-patterns/loadingPattern_10.1_buttons.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/loading-patterns/loadingPattern_10.2_buttons.png" alt="" style="max-width: 70%; height: auto;">

### 6. Search

Loading while searching happens when the data points in the search are being fetched from different servers by different APIs, which can cause a significant wait time.

<img src="/assets/images/loading-patterns/loadingPattern_11_search.png" alt="" style="max-width: 70%; height: auto;">

### 7. Select and Dropdown

While loading the dropdown options or menu, a skeleton loader can be used to show the loading behavior.

<img src="/assets/images/loading-patterns/loadingPattern_12_selectAndDropdown.png" alt="" style="max-width: 70%; height: auto;">

### 8. Application Loading

While opening an application, an indeterminate progress bar can be used with supporting text to provide a better context and feedback. Combine this with the application logo and a shimmer effect on the application logo to provide an effective loading experience.

<img src="/assets/images/loading-patterns/loadingPattern_13_applicationLoading.png" alt="" style="max-width: 70%; height: auto;">

### 9. Text edits

While verifying the text input by the user, a small spinner can show that the text is being verified.

<img src="/assets/images/loading-patterns/loadingPattern_14_textEdits.png" alt="" style="max-width: 70%; height: auto;">

### 10. Tabs

This use case includes when a new tab is opened or refreshed.

<img src="/assets/images/loading-patterns/loadingPattern_15.1_tabs.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/loading-patterns/loadingPattern_15.2_tabs.png" alt="" style="max-width: 70%; height: auto;">

### 11. Alert

Alerts give brief information which is temporary and occupies a small space. Alert has a loading state when an action is happening without disrupting the interface for users. A small spinner will be efficient to show the loading case in an alert.

<img src="/assets/images/loading-patterns/loadingPattern_16_alert.png" alt="" style="max-width: 70%; height: auto;">

### 12. Modal

In the case of a modal, which has a small space and can show various activities like creating, uploading, updating, setting up, or payment completion, we can use loaders like a progress bar or spinner as these are better choices when space is a constraint.

<img src="/assets/images/loading-patterns/loadingPattern_17_modal.png" alt="" style="max-width: 70%; height: auto;">

### 13. Uploading & Downloading

Wait time is present depending on the type of data getting uploaded and downloaded. Below is a scenario that specifies the logo is being downloaded, then it’s been edited and uploaded.

<img src="/assets/images/loading-patterns/loadingPattern_18_uploadingAndDownloading.png" alt="" style="max-width: 70%; height: auto;">

---

## Factors while deciding a loading pattern

##### 1. Time

The time a system takes to load the content. Knowing the approximate loading time helps you decide which pattern suits the use case.

##### 2. Data Type

Type of data that needs to be loaded: files, text, graphics, animations, etc.

##### 3. Interface Layout

The space on the screen along with how the data needs to be presented helps in determining a more suitable loading pattern.

##### 4. How the data is being fetched or returned

The backend can return the information in various ways, and the client can determine multiple ways to display it, such as:

- Loading all the content at once beforehand
- Loading the content progressively
- Lazy loading of the content
- Loading all that content together but displaying it on demand

> 📘 Also knowing how frequently any automatic updates or changes happen on the interface, and when and how the data is auto-fetched, helps in determining the appropriate loading pattern for such scenarios.

---

## Comparing Loading Patterns

Below is the comparison of all the loading patterns based on the following factors:

- **Relevant Feedback** The amount of information a loading pattern provides while a user waits
- **User Uncertainty** Users not knowing how much time the loading will take
- **User Perception Time** Users perceive time differently depending on the situation before them
- **Space Optimization** Space occupied by the loading component
- **Low Wait Time** Effectiveness of a loading component for low waiting time

| Loaders/Factors | Relevant Feedback | Reduces user uncertainty | Reduces user perception time | Space optimization | Low Wait Time |
| --- | --- | --- | --- | --- | --- |
| Indeterminate spinner | 🔴 | 🟡 | 🟡 | 🟢 | 🟢 |
| Determinate Spinner | 🟢 | 🟢 | 🟢 | 🟢 | 🟡 |
| Indeterminate Progress Loader | 🟡 | 🟡 | 🟡 | 🟢 | 🟢 |
| Determinate Progress Loader | 🟢 | 🟢 | 🟢 | 🟢 | 🔴 |
| Skeleton Loader | 🟡 | 🟢 | 🟢 | 🟡 | 🟡 |

## Best Practices

- Use animation with loaders to make it enjoyable and meet user expectations.
- Understand the priority of the content based on the user’s expectations and prioritize its loading accordingly.
- Know how much data there is to load and when to load it to determine the optimal loading pattern.
- Prefetch relevant data to save time.
- While implementing the animations, start it slow, then make it fast at the end.
- Display related text with loaders to provide better context of what is happening.
- Provide feedback when the loading is complete.
- If the loading is almost instant, then do not interrupt the flow with loading states. Use loading states only when there is a decent amount of wait time.
- Simple engaging games could be used for high-time-consuming loading interfaces.
- Ensure that the loading state can be seen clearly by the user. This can be done by ensuring the accessibility of the loading indicator on a background.

## Anti Patterns

- For modals, sheets, section containers, and popovers, avoid representing the entire container as a skeleton. Instead, display the container boundaries, possibly with headers & footers, and then display the loaders within.
- While loading, the visuals shouldn’t change drastically. Visual stability will help in reducing confusion among users.

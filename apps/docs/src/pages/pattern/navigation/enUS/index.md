# Navigation

Navigation is the movement between pages, views, and components. The navigation interaction can be designed using various ways, with dedicated navigation components, actions, or enabling it within components. The GDS navigation pattern describes several ways of navigation along with recommendations for optimal user experience in specific scenarios.

<img src="/assets/images/navigation/overview.png" alt="" style="max-width: 70%; height: auto;">

## GDS Components for Navigation

In this section, we would be defining all the Navigation patterns, usage, templates, and examples.

- Global Header
- Primary Sidebar
- Secondary Sidebar
- Tabs
- List Navigation
- Breadcrumbs
- Links
- Back Button Navigation
- Action Navigation

## Global Header

### Overview of Component

Global Header is a container attached to the top of product pages. It carries branding elements, global actions, and navigation items.

A global header can be used to navigate to different apps in the product suite using an app switcher or to navigate to different pages using Header links/Tabs.

<img src="/assets/images/navigation/global-header.png" alt="" style="max-width: 70%; height: auto;">

<img src="/assets/images/navigation/global-header-2.png" alt="" style="max-width: 70%; height: auto;">

### Use global header if

- The user needs to switch to different centers to which the user has access. The app switcher (on the global header) provides a way for the user to navigate easily between products and systems.

- The user needs to switch to different pages and the list of pages is manageable. In this case, the Header links/Tabs provide an easy way to switch to different pages.

- the user needs to define the navigation for Landing pages or Simpler websites/web apps.

### Do not use the global header if

- The number of pages is a lot. It is preferable to use a more scalable navigation component like Primary Sidebar.

### Complex Navigation in Global Header

Even though the Global header can support complex navigation, GDS recommends to use Primary Sidebar only because:

1. It is more scalable
2. It is easier to scan
3. All the information is upfront

In case you have any special use case for using the Global header as the primary navigation, please reach out to the GDS team for further discussion.

### Primary Sidebar

#### Overview of Component

This sidebar is the primary navigation used for web-based applications. The user can easily navigate using the various Sidebar items. Hierarchically this vertical navigation is placed at the side of a page.

It is highly scalable and can support deep navigation. It can also have a switcher to switch to different projects and can also support search.

<img src="/assets/images/navigation/primary-sidebar.png" alt="" style="max-width: 70%; height: auto;">

#### Use the primary sidebar if

- The navigation scheme is complex and has up to three levels of navigation.
- There are a lot of pages in the center.
- The center requires a high emphasis on the navigation, for low emphasis use a secondary sidebar.
- The user wants to navigate from one project to another within the same product.

#### Do not use the primary sidebar if

- The center requires a low emphasis on navigation.
- The navigation is simple and does not have a nested folder-file structure deeper than 3 levels, in such a case, use a less complex navigation pattern instead, such as, tabs or the global header.

### Secondary Sidebar

#### Overview of Component

The secondary sidebar is the secondary navigation that is used for web-based applications. The user can easily navigate using the various Sidebar items.

It is highly scalable and can support deep navigation.

<img src="/assets/images/navigation/secondary-sidebar.png" alt="" style="max-width: 70%; height: auto;">

#### Use the Secondary sidebar if

- The navigation scheme is complex and has up to three levels of navigation.

- There are a lot of pages in the center.

- The center requires a low emphasis on the navigation, for high emphasis use the Primary Sidebar.

- The navigation can be used locally on a page or in the view content component.

#### Do not use the Secondary sidebar if

- The center requires a high emphasis on navigation.
- The navigation is simple and does not have a lot of pages, use tabs instead.

### Tabs

#### Overview of Component

Tabs are used to group information on the same page. They help in segregating similar information in separate buckets and act as a navigation component to access such segregated information.

- Tabs are secondary/tertiary navigation in the GDS 2.0-based web apps.

- It has a medium emphasis and takes less space compared to sidebar-based navigation.

<img src="/assets/images/navigation/tabs.png" alt="" style="max-width: 70%; height: auto;">

- The tabs come in multiple sizes in case multiple tabs are required to be used on the same screen.

#### Use case for sharing Link to a selected tab:

Tabs in GDS can be configured by product developers to enable routing which affects how the link to tabs can be shared. Let’s understand this with an example:

<img src="/assets/images/navigation/tabs-2.png" alt="" style="max-width: 70%; height: auto;">

In the above example, **Train** is the selected tab on a page, this can lead to two scenarios.

- **If Routing is enabled:** then sharing the link to the page, will directly show the content of the selected tab i.e. Train. In this case, when the user presses the back button it will go back to the previously selected tab.

- **If Routing is disabled:** then sharing the link to the page, will by default show the content of the first tab i.e. Car. (In this case, the first tab will be selected).In this case, when the user presses the back button it will go back to the previous page.

**GDS recommends URL routing to be enabled for tabs.**

#### Use tabs if

- The navigation scheme is simple and manageable.

- The user wants to optimize the space on a page.

- There is only one level of navigation.

- It can be used locally on a page or for a view content component.

#### Do not use tabs if

- The center requires a high emphasis on navigation.

- The navigation is complex and has multiple levels of hierarchy, use a Primary Sidebar/ secondary sidebar instead.

### List Navigation

#### Overview of Component

List navigation makes data structures navigable.

<img src="/assets/images/navigation/list-navigation.png" alt="" style="max-width: 70%; height: auto;">

#### Use List Navigation if:

- The content needs to be scanned through frequently.

- the data is required to be represented in a scannable manner to make it easily navigable.

- the user needs to select a details view in a master-detail layout.

- We don't need a lot of info about the items on the list.

- It has low emphasis. Use Primary Sidebar when the emphasis is high.

- A large list of contents needs to be viewed (scrollable).

- There is no Parent-child relationship required. You can use the secondary sidebar in such a use case instead.

#### Do not use List Navigation if:

- There is visual overload i.e. you’re using a mix of different kinds of navigation on the same page like global header, primary sidebar, secondary sidebar, etc

- The navigation needs to be globally accessible across the application, use visually simpler navigation instead like tabs, Primary Sidebar.

### Breadcrumbs

#### Overview of Component

Breadcrumb is a navigational component that is used to inform the users of their current location in a flow and also allow them to jump to the previous locations.

It is used to navigate large amount of content organized in a hierarchy of more than two levels.

<img src="/assets/images/navigation/breadcrumbs.png" alt="" style="max-width: 70%; height: auto;">

#### Use Breadcrumbs if:

- The user wants to show secondary navigation on the page.

- The user wants to show the path in a page.

- The user wants to show the file-folder structure or the hierarchy of one item.

- The drill-down scenario leads to related object pages: parent object page/child object page 1 / child object page 2 / child object page 3.

#### Do not use Breadcrumbs if:

- Your hierarchy contains only one level. Use a back button instead.

### Action Navigation

#### Overview of Component

Action navigation can be categorized into the following two:

##### 1. Button Navigation

Buttons allow users to perform an action or navigate to another page. They have multiple sizes and emphasis levels for various needs and are ideal for calling attention to where a user needs to do something in order to move forward in a flow.

<img src="/assets/images/navigation/button-navigation.png" alt="" style="max-width: 70%; height: auto;">

##### 2. Link Navigation

Links allow users to navigate to a different locations. They can be used on their own or in line with the text. It can be combined with a Back Button or a breadcrumb to enable back navigation.

<img src="/assets/images/navigation/link-navigation.png" alt="" style="max-width: 70%; height: auto;">

#### Use Action Navigation if:

- The user wants to navigate to another page (one level).
- A user wants to trigger a new event (For e.g. opening a wizard, side sheet, etc). Can also display them using a modal.
- the user wants to put high emphasis on something, If the low emphasis is required a link can be used.
- The user’s attention is to be focused on a CTA.
- There is only one level of navigation.

#### Do not use Action Navigation if:

- There is no target or reference to be linked to.

### Dropdown Menu

#### Overview of Component

A drop-down menu consists of a list of items that allows the user to take an action or navigate. It is commonly used for overflow action menus. The trigger point, which is a part of the dropdown menu component is generally a button.

There are two types of dropdown menus,

1. Page Navigation: Used to navigate the user to a different application, page, bottom/side sheet, or modal.
2. Switcher: Used to switch between two entities of the same kind. Ex- projects, centers, zones, etc.

<img src="/assets/images/navigation/dropdown-menu.png" alt="" style="max-width: 70%; height: auto;">

#### Use Drop-down Menu if:

- the navigable items can be clubbed together under one title.

- the user needs to display a hierarchy of items using the nested dropdown menu (as in the image above).

#### Do not use Drop-down Menu if:

- the user wants the emphasis on the menu, in that case, use the Action menu.

- If the number of items in the menu is equal to or less than two, it is recommended to use a Button instead.

- Do not use the Dropdown Menu for selecting an item from a list. Use the Select component instead.

### Back Button Navigation

#### Overview of Component

The back button allows users to navigate back from page B to page A i.e. in reverse chronological order through the history of recently viewed screens.

As the back button does not require a high emphasis it is recommended to use the tertiary button.

#### Use the Back button if:

- There is only one level of navigation. In case of more than one level, use Breadcrumbs.
- The user is navigating within the same component that has only one level of navigation.
- No URL routing is enabled for nested side sheets, nested bottom sheets, and nested modals (as in the image below).
- The path is not defined.

<img src="/assets/images/navigation/back-button-navigation.png" alt="" style="max-width: 70%; height: auto;">

#### Do not use Back Buttons if:

- You want to link to a different page or object that might not be in the immediate chronology. Use the Link instead.

- You want to let users upload content. Use a File Uploader instead.

- You’re also using breadcrumbs for the same component.

### Browser Back Button Navigation

#### Overview

<img src="/assets/images/navigation/browser-back-button.png" alt="" style="max-width: 70%; height: auto;">

The browser back button takes you back to the last page/URL you visited.

#### Use case for side-sheet/bottom sheet and modal:

A side/bottom sheet or a modal has a routing configuration that affects how the browser back button will work for these UI shell components.

- **If Routing is enabled:** If the user has opened a modal or a side/bottom sheet, they can close the modal or a side/bottom sheet by clicking the browser back button.

- **If Routing is disabled:** In this case when the user clicks on the browser back, it closes the sheet/modal and navigates the screen behind the overlay to the previous screen.

**GDS recommends URL routing and it can be enabled by product developers for modal, side sheet, and bottom sheet.**

### Navigation Layouts for a Two/Three Level Menu:

The navigation layouts include **Left-Top-Top, Left-Top-Left, Left-Left-Top, Top-Left-Left, Top-Left-Top, Left-Left**, and **Left-Top**. The level notations are ordered by priority and hierarchy The criteria categories include navigation time, user hesitation, user preference, selection errors, and optimization of space.

#### Navigation Time:

The time it takes for the user to navigate/move from point A to point B on a screen.

#### User Preference:

The pattern/design that users prefer in an application.

#### User Hesitation:

A hesitation is when the user hesitates to move their cursor from one component to another due to lack of clarity, too many elements on the screen, etc.

#### Optimization of Space:

The optimum amount of space used by the different navigation patterns on the application.

#### Selection Errors:

The number of excessive (unnecessary) clicks the user makes while moving on the screen.

**Given below is a table comparing all the navigation patterns in GDS based on the above parameter:**

#### Navigation Layouts for Three-level Menus

<img src="/assets/images/navigation/layout-left-1.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-right-1.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-left-2.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-right-2.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-left-3.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-right-3.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-left-4.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-right-4.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-left-5.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-right-5.png" alt="" style="max-width: 70%; height: auto;">

#### Navigation Layouts for Two-level Menus

<img src="/assets/images/navigation/layout-left-6.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-right-6.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-left-7.png" alt="" style="max-width: 70%; height: auto;">
<img src="/assets/images/navigation/layout-right-7.png" alt="" style="max-width: 70%; height: auto;">

<img src="/assets/images/navigation/legend.png" alt="" style="max-width: 70%; height: auto;">

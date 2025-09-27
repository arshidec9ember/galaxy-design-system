# Error States

An error occurs when a system fails to complete an expected action or is not in a functional state. This can cause failure in accessing an app, loading data, saving data, etc. Therefore errors must be communicated to the users promptly, in a user-friendly language along with helping them to recover from the error.

The **GDS error states pattern** provides effective guidelines on error representations across different types of scenarios. And helps you provide a better user experience.

## GDS Components for Error States

- Error state component
- Floating alerts
- Inline Banner alerts
- Header alerts
- Modals

### Error state component

Error state components are used when users encounter some errors while using the platform. This state has a responsibility to provide users proper context on what happened wrong and what to do next now.

<img src="/assets/images/error-states/error-state-component.png" alt="" style="max-width: 70%; height: auto;" />

To learn more about this component, <a href="" target="_blank" style="display: inline">click here</a>

### Floating alerts

They are card-like alerts that display as an overlay component. They are placed at the bottom-right corner of the screen similar to the <a href="/components/toast/" style="display: inline">Toast</a> component. They are primarily used to show errors when an action fails to execute.

<img src="/assets/images/error-states/floating-alerts.png" alt="" style="max-width: 70%; height: auto;" />

To learn more about this component, <a href="" target="_blank" style="display: inline">click here</a>

**Use Floating alerts when:**

- An action like “submit”, “Add”, “Create”, “Delete”, etc. fails to execute. In such a case, the error needs to be shown immediately to the user, along with the cause and how to recover from it, if possible.
- You would want to communicate about an action failure by the system without obstructing any other actions present on the screen.

**Do not use Floating alerts when:**

- Multiple errors have occurred on the form. In such a case, it is better to use inline messages to contextually indicate where the error occurred.

### Banner and header alerts

These alerts contain messages respective to the local container in which the message is triggered or shown. Inline alerts always appear on top of the section it is triggered in. Inline banner is mostly used at a section level while a header alert is used at a page level.

<img src="/assets/images/error-states/banner-and-header-alerts.png" alt="" style="max-width: 70%; height: auto;" />

To learn more about this component, <a href="" target="_blank" style="display: inline">click here</a>

**Use banner or header alerts when:**

- Multiple errors at the field level have occurred. And you would want to communicate the cause of the errors and preventions, if any, at start of a section.

- Always use banner or header alerts in combination with in-line error messages or error indication in individual error components respectively.

- Banner or header alerts should only be used to provide a summary of the errors along with providing a single point of action as a convenience to recover from all the errors on the screen.

**Do not use banner alerts:**

- To represent errors occurring in isolation or for singular field level errors in a form.

- If multiple errors have occurred in only one part of the screen. Use an in-line banner alert instead.

### Modals

They are UI shells focusing the user’s attention exclusively on a specific piece of information via a window that sits on top of the page content. Modal interrupts a user’s workflow by design. Therefore they are used only for errors which absolutely must require user’s full attention and an action to be taken by them.

<img src="/assets/images/error-states/modals.png" alt="" style="max-width: 70%; height: auto;" />

To learn more about this component, <a href="" target="_blank" style="display: inline">click here</a>

**Use modals when:**

- The error is severe enough to obstruct the view or workflow of the user so they focus only on the problem and its resolution if any.

- An action failed to execute on a modal and the error needs to be fixed without which the user cannot proceed to the next step.

- To represent severe system errors that impact the function of the entire application.

## Elements of Error Representation

Based on the type of the error and where they occur on the screen (entire screen, specific component, or section), elements of an error state can be configured for effective communication. Below is the full list of elements that can be used to represent an error state.

### Illustrations or icons (Mandatory)

They add a visual delight and break the monotony of the design. However, for an error state, they are more than just a visual delight. They assist the user in quickly identifying if an error has occurred and what is the nature of that error. We have specific illustrations or icons to represent various errors.

<img src="/assets/images/error-states/illustrations-or-icons.png" alt="" style="max-width: 70%; height: auto;" />

**For a colour-blind person, the illustration or the icon serves as the first indicator of the error.**

### Error code and the error name (Non-mandatory)

This information is not mandatory to show as it is not relevant to the users. This is provided for the technically expert user and debuggers to easily understand the error type. In cases where this is shown you should ensure that not too much visual emphasis is provided.

**Examples:**  
Error 400_Internal server error  
Error 403_Forbidden  
Error 408_Request timeout

### User-friendly message (Mandatory)

This is the primary piece of content in an error representation that the user will read first. This message should be humane without the use of overly technical terms. It should easily communicate what went wrong.

**The voice & tone of this message is discussed in a later section. <a href="" target="_blank" style="display: inline">Click here</a> to jump to it.**

**Examples:**  
The web server is down  
An unexpected error has occurred  
Server under maintenance

### Error Description (Non-mandatory)

It essentially describes the cause of the error in detail. This information is referred to by the users in a scenario where the error is occurring repeatedly. And to know in detail why this error is caused, a description is a must-have. It might be less referred to but has a high impact value.

**The voice & tone of this message is discussed in a later section. <a href="" target="_blank" style="display: inline">Click here</a> to jump to it.**

### Metadata (Non-mandatory)

This piece of information is crucial for debuggers for error management. It usually contains an ID along with the date and timestamp. Try to use this metadata, especially for critical errors such as the page-wide errors. Also when used, the metadata must always be presented upfront along with the provision to copy.

**Example:**

<img src="/assets/images/error-states/metadata.png" alt="" style="max-width: 70%; height: auto;" />

### Recoverable actions (Non-mandatory)

Every error state contains Call-to-actions (CTAs) sometimes individual or in pairs. The CTAs helps the users to recover from the error. An example of a primary CTA can be: **‘Retry’** or **‘Request access’**.

Even in case of non-recoverable errors, a CTA is present to acknowledge and dismiss the error state.

## Types of Errors

Errors can be broadly classified as:

1. **Data input errors:** While saving data
2. **Data display errors:** While fetching data from the system

### Data Input Errors

Data input errors are errors that occur while sending data to a server on performing actions and real-time selections. These could occur due to various reasons like issues on the server side, issues with data, network issues during data transmission, etc.

Data input errors also encompass the errors that occur when incorrect data is entered by the user, like typing words when a numeric value was required.

<img src="/assets/images/error-states/data-input-errors.png" alt="" style="max-width: 70%; height: auto;" />

### Data Display Errors

Errors that could occur while fetching the data are referred to as data display errors. Failure to load the data can occur due to many reasons like API failure, losing the network while loading data, server errors, etc. These errors can occur both on the browser/client/app side or the server side. And the user might or might not be in control of the error.

Error in fetching the data can happen at any level of the system. Following are the configurations of a data display error.

<img src="/assets/images/error-states/data-display-errors.png" alt="" style="max-width: 70%; height: auto;" />

**All the errors we would discuss in this documentation will either be a data input or a data display error.**

## Error Representation Across GDS Components

This section describes error representation across various GDS components. These components might have a data input error, a data display error or any other error type like authentication.

1. Forms
2. Dropdown Menu
3. Accordion
4. Sheets (Side and Bottom Sheets)
5. View Content
6. Tables

#### Forms

Form validation is a technical process where a web-form checks if the information provided by a user is correct or not.

#### Input Validations on client-side

The form will alert the user that they messed up as soon as they leave the active state of a form field. They can fix the error before submitting. This is called **“inline validations**” or **“input validation on browser-side**”.

The error is shown right next to the form field. Hence the name **“inline”**. This validation happens browser-side.

<img src="/assets/images/error-states/input-validations-on-client-side.png" alt="" style="max-width: 70%; height: auto;" />

#### Input validation on server-side

The form will eventually be submitted. This data entered in the form fields by the user will be validated again on the server side. This is known as **“input validation on server side”**. The server will check for any errors in the input and return a response to the browser. In case any errors are detected, the communication should again happen inline.

<img src="/assets/images/error-states/input-validation-on-server-side.png" alt="" style="max-width: 70%; height: auto;" />

#### Multiple errors in the same form

In this scenario a summary of errors positioned at the top of the form would benefit the user experience. The user would be able to quickly gather how many errors have occurred in the form. A banner alert component should be used for the summary in addition to in-line error messages.

<img src="/assets/images/error-states/multiple-errors-in-the-same-form.png" alt="" style="max-width: 70%; height: auto;" />

Avoid using bullet points to focus to specific errors. Do not use any link backs to specific errors on the form. Both of these would lengthen the summary.

Errors scenarios in a form include missing a mandatory form field entry (mandatory validation upon submitting a form), invalid selection, incorrect entry or the entry made do not match the form field requirement.

There can also be a scenario where all form field entry was correctly entered but the form failed to submit. We would retain the use of a banner alert to represent this error scenario in a form.

<img src="/assets/images/error-states/multiple-errors-in-the-same-form-2.png" alt="" style="max-width: 70%; height: auto;" />

### Dropdown Menu

Information on the popovers fails to load. This can occur when different APIs fetching different information on the same dropdown fails. Either all the APIs might fail leading to no information being shown on the dropdown. Or the information is partially loaded with information.

A recovery action like **“Reload”** would be at the user’s disposal.  
This is related to Data display error.

<img src="/assets/images/error-states/dropdown-menu.png" alt="" style="max-width: 70%; height: auto;" />

<img src="/assets/images/error-states/dropdown-menu-2.png" alt="" style="max-width: 70%; height: auto;" />

**This error scenario is an outlier and would occur rarely.**

### Accordion

Information fails to load for a content unit under an accordion. This occurs when the APIs responsible for fetching the information fails. An action for recovery is required to reload the request.

Based on the structure of the content unit inside the accordion, the error representation might vary. Within an accordion, the data can be displayed as a table or even a view content unit. Either the entire section under the accordion might fail to load or a part of the content unit within the accordion might fail.

Designer must assess their use case to choose which elements and structure of the error pattern would suit the best.

<img src="/assets/images/error-states/accordion.jpeg" alt="" style="max-width: 70%; height: auto;" />

### Sheets (Side & bottom)

This is similar to the accordion component. The Side sheet is a shell where other components can be used to display the data. And in terms of failure to display the data, either the entire side - sheet might fail to load or the display error occurs partially.

<img src="/assets/images/error-states/sheets.png" alt="" style="max-width: 70%; height: auto;" />

### View Content

The error use cases for the view content is related and evoked by the failure of the APIs either occurring fully or partially. Either the entire content unit might fail to load or few sections in a content unit being fetched from different libraries might fail to load.

Following are the use cases related to errors in drop down component.

**Entire content unit fails to load**

<img src="/assets/images/error-states/view-content.png" alt="" style="max-width: 70%; height: auto;" />

This scenario will occur when the entire data within a component could not be loaded or displayed. A component wide error configuration also need to be used if a mandatory information presented within the component could not be fetched. In such a situation, then error would be component wide.

**Multiple errors in view content component in different configurations**

<img src="/assets/images/error-states/multiple-errors-in-view-content.png" alt="" style="max-width: 70%; height: auto;" />

This scenario occurs only if data for one business component is completely unavailable while for another business component it is partially unavailable. The recovery actions will be present will be present for every error component. A page level banner will be present to reset the entire page.

In case of multiple errors, the business components might be handled by different teams and might not understand the nature of the error. Hence a recovery action is present locally on each business component where the error happened. It would be tedious for the user to refresh every component. So we used a header alert to summarise the number of errors on the screen and also provided a common point of recovery.

### Tables

Similar to side-sheets, the display error can occur either throughout the table, if the data fails to load or for specific columns of the table.

<img src="/assets/images/error-states/tables.png" alt="" style="max-width: 70%; height: auto;" />

## Action Based Errors

User action such as “Add”, “Delete” or “Submit” are also inputs given to the system. Failure to process or execute any of these actions would result in an error. These errors might or might not be in the control of the user. These are mostly server-based errors.

<img src="/assets/images/error-states/failure-of-a-user-action.png" alt="" style="max-width: 70%; height: auto;" />

## General Errors

These are a group of errors that are most anticipated to occur either within the context of the application or at an infra level. They can either be data input or data display errors. These errors always happen within the context of the application.

Below is a list of a few general errors:

1. Connection lost
2. Session timeout
3. Forbidden response
4. Authentication error
5. Bad request
6. Not found
7. Not acceptable
8. Request timeout
9. Bad gateway
10. Service unavailable
11. Gateway timeout
12. Not implemented
13. Internal server error

We will be exploring a few of these general errors to illustrate how the three configurations explained in the previous section can be used.

#### Connection lost

There are two formats in which this error scenario is represented.

a. When you are already in the application and the data on the screen is loaded. After this, if the internet connection is lost, we will use a full-page alert component to represent the scenario.

<img src="/assets/images/error-states/connection-lost.png" style="max-width: 70%; height: auto;" />

b. When there is no internet connection and the user tries to initiate a flow, a full page Internet disconnected message will be shown as below:

<img src="/assets/images/error-states/connection-lost-2.png" style="max-width: 70%; height: auto;" />

**Note that we are using a fullscreen variant with the logos for the Tachyon Suite and the tenant logo.** **This indicates that the error has happened while in the context of the app.**

#### Session timeout

This error occurs when the current session expires due to prolonged inactivity on the screen. We will use a full page error with no back buttons for security concerns, given that we are building for the enterprise solution for banks. This error occurs within the context of the application.

<img src="/assets/images/error-states/session-timeout.png" alt="" style="max-width: 70%; height: auto;" />

#### Forbidden response

This is a common client-side error denoted by the error code 403. This is caused when users try to access something they do not have permission for. The error, if spoken in plain English, would essentially say, “Go away and do not come back here.” if users were trying to access something which the administrator do not want them to access.

However, there can be instances where the administrator can allow for requesting access. Example:

<img src="/assets/images/error-states/forbidden-response.png" alt="" style="max-width: 70%; height: auto;" />

**Should we keep an inaccessible item actionable or disabled?**

Ideally in a scenario where a data unit is not immediately accessible to the user, it should be made disabled or not be made visible to the user.

#### Authentication error

This is a general error denoted by the error code 401. Receiving a 401 response is the server telling you that, “either you are not authenticated at all or authenticated incorrectly - but please try again to re-authenticate.” Example

<img src="/assets/images/error-states/authentication-error.png" alt="" style="max-width: 70%; height: auto;" />

#### Bad request

This is a common client-side error denoted by the error code 400. This means that the request you sent to the server, often something like a simple request to load a webpage, was somehow incorrect or corrupted and the server could not understand it. Example:

<img src="/assets/images/error-states/bad-request.png" alt="" style="max-width: 70%; height: auto;" />

#### Not Found

This is a common client-side error denoted by the error code 404. This means that the page you were trying to look for on the server could not be found. In other words, this error denotes that while the server itself was accessible but the resource that the client was trying to fetch was not reachable. This can also occur if the resource was moved from its original location on the server and this was done without redirecting the old URL to the new one. Example:

<img src="/assets/images/error-states/not-found.png" alt="" style="max-width: 70%; height: auto;" />

#### Request timeout error

The 408 Request Timeout error is an HTTP status code that means the request you sent to the website server—e.g., a request to load a web page—took longer than the website's server was prepared to wait. In other words, your connection with the website "timed out."

The most common cause of this error is an incorrect URL. It could also be caused by a slow connection or connectivity issues. Example:

<img src="/assets/images/error-states/request-timeout-error.png" alt="" style="max-width: 70%; height: auto;" />

#### Service Unavailable

The 503 Service Unavailable error is an HTTP status code that means a website's server is not available right now. Most of the time, it occurs because the server is too busy or maintenance is being performed on it. This is a server-side error. Example:

<img src="/assets/images/error-states/service-unavailable.png" alt="" style="max-width: 70%; height: auto;" />

#### Internal server error

The 500 Internal Server Error is a very general HTTP status code that means something has gone wrong on the website's server, but the server could not be more specific on what the exact problem is. Example:

<img src="/assets/images/error-states/internal-server-error.png" alt="" style="max-width: 70%; height: auto;" />

## Infra Errors

Infra errors are caused when the application fails to launch for reasons such as API call failure, unauthorised access, internal server error, timeout, page or app not found, loss of connectivity, etc.

These always happen outside the context of the application mostly while logging in or when an application is loading. Infra errors occur on the browser side and are agnostic of any product or center-specific theming. These errors may or may not be recoverable. Infra errors are an extension of data display errors.

For infra errors, we have worked on two possible configurations depending on the amount of information available to us.

**Configuration 1: Minimum details are present to be displayed to the user.**

<img src="/assets/images/error-states/infra-errors.png" alt="" style="max-width: 70%; height: auto;" />

Use this configuration:

- If you do not have a detailed explanation of why the error occurred.
- The solutions you are providing can be summarised in a line apart from the CTAs for recovery. An embedded action such as ‘Contact us' can be present which should automatically open the system default email client.

**Configuration 2: When there are a lot of details to be displayed to the user.**

<img src="/assets/images/error-states/infra-errors-2.png" alt="" style="max-width: 70%; height: auto;" />

Use this configuration:

- You have a detailed set of information available to be displayed to the user. This would contain a detailed cause along with the symptoms and the solutions.

#### Importance of the metadata

This is a mandatory part that is crucial for the debuggers. It would contain an ID along with the timestamp. This information would be used by the debuggers to come up with a resolution. This information must always be present upfront. It should have the provision to be copied by the users easily.

#### Support data

This section will only be available in Infra errors and at the bottom of the screen. It would have information to connect with the support staff from the software provider. Since these errors occur at the start of the software experience, it is more concerning for the users and we would want them to feel that support is easily accessible to them.

#### Additional workflows in infra errors

This section defines the various interactions associated with the infra-level errors.

#### Report Issue

In case you use this action with Infra errors, on clicking the “Report Issue” CTA a modal will appear where the user would be asked to enter a name, email id, and leave a comment on how or why the error occurred. And upon submission, a toast message will be given as confirmation.

<img src="/assets/images/error-states/report-issue.png" alt="" style="max-width: 70%; height: auto;" />

#### Contact support

In case you use this action with Infra errors, on clicking the “Contact support“ CTA you would be redirected to your default mail client. You could enter your query and send the mail. Once the mail is sent, you would be redirected to the app and the screen would automatically reload.

## Fundamentals of Error Patterns

### Best practices for writing error messages

Error messages should:

- Be concise, clear, contextual & specific. If you know what exactly went wrong, inform the user along with a way to recover from the error.
- Be placed close to the source of the problem or somewhere the message gets easily noticed.
- Communicate severity with the appropriate color and tone of voice
- Follow the 3H rule: Human, Helpful & Humble
- Build trust and confidence while providing guidance.
- Explain the situation without being overly technical. Ideally, it should express the error symptom, the error cause, and the error solution.

**Error messages should empower the user and help them get out of a problem without causing panic or slowing their workflows.**

### Voice and Tone

The significance of voice and tone becomes more critical while writing error messages.The voice of the error message helps the product build trust, stand out, and be consistent with the users by bringing out the brand personality.

For our product ecosystem which is more B2B driven, **the voice should be a universal one**. The messaging should be **plain and focuses on clarity, efficiency, and professionalism**.

**So, we cannot add humor to the error message at all?** This is not entirely true. However, it should be done based on the scenario you might be designing for.

For example, error scenarios like 401 Unauthorised, 500 internal server error, and 404 Page not found can be too technical for the users. In such scenarios, you could add a touch of humor keeping the following points in mind:

- Do not sacrifice clarity over humor.
- Do not offend anyone.

## Errors Accessibility

While designing for the error states, we did not strictly rely upon color to convey that an error occurred. For every error scenario, we have tried to come up with a relatable visual representation that the users can immediately relate to. In addition, we have kept one visual element common across all error states. This will allow instant recognition without having to rely upon color or text.

We have also ensured that any embedded links and error messages are easy to identify.

**Just like empty states, these visuals are still considered to be decorative, which are by large present to fill the visual void. To ensure that these should be skipped by screen readers and developers can add a null value as an alternate text for this image.**

## Anti-patterns

### Toasts

Toast messages are too short to adequately explain what went wrong and how to fix the problem. Because the toast message appears for 3 seconds and disappears, it can easily be missed. While we have defined an error state with the use of toast in our component library, we would not encourage its use.

However, if you absolutely must, use it to represent errors that are not caused by the users and do not require them to take any action to resolve the error.

<img src="/assets/images/error-states/anti-pattern-toast.png" alt="" style="max-width: 70%; height: auto;" />

## Summary

| Error Code | Error Name | User Friendly Message | Description | Recovery Actions |
| --- | --- | --- | --- | --- |
| 500 | Internal server error | Internal Server Error | The server encountered an internal error and was unable to complete your request. | Reload, Report Issue |
| 501 | Not Implemented | Something broke at our end | The server either does not recognize the request method, or it lacks the ability to fulfill the request. | Reload, Clear Browser's Cache |
| 502 | Bad Gateway | Internal Server Error | There was an issue with one of our servers. We are trying to fix it. | <i>no action</i> |
| 503 | Service Unavailable | Service is temporarily unavailable | The server is temporarily unable to service your request due to maintenance downtime or overload. Please try again later. | Back to Home, Reload |
| 504 | Gateway Timeout | The page cannot be reached | The server did not receive a timely response from the upstream server while attempting to complete the request. | Back to Home, Reload |
| 400 | Bad Request | Unexpected Error | The request could not be understood by the server due to malformed syntax or invalid request | Retry |
| 401 | Unauthorized | Authentication failed/Unable to access token | It appears your login details may be invalid. Please fill in the correct login details or try refreshing the page. | Contact Support |
| 403 | Forbidden | Required authorisation | You are not authorised to access this resource. | <i> no action </i> |
| 404 | Page/App Not Found | Requested page does not exist | We could not find what you were looking for. Either the URL is incorrect or the page has been moved. | Go to Home, Retry |
| 408 | Request Timeout | Something went wrong | We did not receive a timely response to complete your request due to several possible reasons. Retry after 3 seconds. | Retry |
|  | Connection Lost | Internet Disconnected | You seem to have a bad internet connection. Do make sure your WiFi or cellular network is functioning well and then refresh the page. | <i> no action </i> |
|  | Session Timeout | Session Expired | The session expired automatically due to inactivity on the page. | Go to Login |

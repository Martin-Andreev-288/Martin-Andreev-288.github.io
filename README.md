# Dynamic Form Builder with Class Components

## Setup and Run

### Install dependencies:

```js
npm install
```

### Project Link:

[Click this link](<../Upskill React 33/Module 1/Chapter 8 - Working with Components - Part 2/homework - as it was submitted>)

### Features and Configuration:

## Code Quality and Formatting:

Configured ESLint and Prettier for consistent code style and linting. <br>
Integrated Husky to enforce pre-commit checks, ensuring all commits pass linting and formatting rules.

## CI/CD Pipeline:

Although the original intent was to deploy via GitLab Pages, the deployment was successfully completed using GitHub Pages due to challenges in changing the project privacy settings on GitLab.

### Dynamic Form Builder Integration:

Refactored and migrated the Dynamic Form Builder (originally implemented using Class Components) into this new React environment. <br>
Ensured seamless compatibility with the build process and configuration of the updated project.

### Start the development server:

```js
npm run dev
```

## Folders and Files:

### src/components: Contains reusable components.

FormField.jsx: A component for rendering individual form fields, including text inputs, select dropdowns, and checkboxes.
ErrorMessage.jsx: A reusable component for displaying error messages. <br>
src/config: Contains configuration files and static data.

### src/features/components: Contains non reusable components.

DynamicFormBuilder.jsx: The main form builder component that renders the form fields, manages form state, and handles validation.

### formData.json: The JSON configuration file used to specify the form schema, field properties, and any default values.

## Solution Overview

- Dynamic Rendering: The form fields are rendered dynamically based on the JSON schema in formData.json. Each field’s type, placeholder, label, and options (for select dropdowns) are handled by the form builder.

- Validation: Required fields are validated on submission, and error messages are displayed next to invalid fields using the ErrorMessage component.

- Conditional Visibility: Conditional logic is implemented to show certain fields only when specific criteria are met (e.g., an email field is shown only if a "subscribe" checkbox is checked). Additionally, the email field becomes required if the "Subscribe to newsletter" label is checked.

- Form Submission: The form data is submitted and processed in the parent App component, with form values logged to the console in the specified format.

## Assumptions

The JSON schema (formData.json) serves as the single source of truth for the form structure, making it easy to add or modify fields without changing the component code. <br>
Validation logic is currently limited to checking required fields, but it can be extended as needed. <br>
The deployment was made to GitHub Pages instead of GitLab Pages due to unresolved privacy setting issues in GitLab.

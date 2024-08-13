# Hevi.ai Case Study

This project is a web application built with React and TypeScript, designed to display a list of patients and a DICOM viewer using Cornerstone.js. The application consists of two main pages: the Home page and the DICOM Viewer page.

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone <repository-url>
    ```
2. Install the dependencies:
   ```sh
   yarn install
   ```
3. Start the development server:
   ```sh
    yarn dev
    ```
4. Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.


State Management
State management is handled using React's built-in useState and useReducer hooks. The state is lifted to the highest common ancestor where necessary to manage the state across multiple components.  
Navigation
Navigation is managed using react-router-dom. The application has two main routes:  
/ for the Home page
/viewer:id for the DICOM Viewer page


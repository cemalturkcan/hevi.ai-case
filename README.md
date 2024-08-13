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


Main Page:
![image](https://github.com/user-attachments/assets/0b6a2a4c-0cf0-43b8-8818-84a343e9a83c)

DICOM Viewer

![image](https://github.com/user-attachments/assets/ab24fd38-ad6a-4ea2-84b7-b49f41e31fda)

![image](https://github.com/user-attachments/assets/3c67c7b7-b8dc-403d-8ca5-fe7905095d4e)



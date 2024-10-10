# Asset Tree View Application

This project was made based on tractian's front end software engineer test. This Project consists in a Tree View Application that displays the assets of different companies, including their locations, assets, and components. It allows users to visualize the hierarchy of assets in a tree structure, apply filters, and view details of specific items.

## Demo Video

https://github.com/user-attachments/assets/43e8d63b-dc17-4c86-a758-84d49420cad5

## Features

- **Dynamic Tree Visualization**: Displays a hierarchical tree structure of companies' assets, including locations, assets, sub-assets, and components.
- **Search Filter**: Allows users to search for specific components, assets, or locations within the asset hierarchy.
- **Energy Sensors Filter**: Users can filter the tree to show only energy sensors.
- **Critical Sensor Status Filter**: Users can filter the tree to identify assets with critical sensor status.
- **Parent Visibility**: When filters are applied, parent items remain visible to maintain the context of the asset path.
- **Detail View**: Clicking on an item displays detailed information about it.

## Installation and Setup

Clone the repository:

```bash
git clone [repository URL]
```

Navigate to the project directory:

```bash
cd asset-tree-view-application-marcos-salazar
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the application:

```bash
npm run dev
# or
yarn dev
```

Access the application:

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## How to Use

- **Select a Company**: On the homepage, select one of the available companies to view its assets.

- **Navigate the Tree**:

  - Expand and collapse nodes to explore locations, assets, and components.
  - Components are represented with specific icons.

- **Apply Filters**:

  - **Search Filter**: Use the search bar to find items by name.
  - **Energy Sensors Filter**: Toggle to show only energy sensors.
  - **Critical Status Filter**: Toggle to show assets with critical sensor status.

- **View Details**:
  - Click on a component or asset to view detailed information.
  - Details include equipment type, responsible person, sensor information, etc.

## Improvements

If I had more time to work on this project, I would consider the following improvements:

### Implement Virtualization for the Asset Tree

- **Description**: Use libraries like `react-window` or `react-virtualized` to render only the visible nodes in the tree.
- **Benefit**: Enhances performance when dealing with large datasets, providing a smoother user experience.

### Add Error Handling and Loading States

- **Description**: Implement loading indicators during data fetching and handle API errors gracefully.
- **Benefit**: Improves user feedback and experience during data operations.

### Implement a Mobile Version

- **Description**: Add breakpoint and components like an hamburger menu to make a comfortable mobile experience for the user
- **Benefits**: Improves the user experience

### Increase Test Coverage

- **Description**: Write additional unit and integration tests to cover more components and scenarios.
- **Benefit**: Ensures reliability and facilitates future maintenance.

### Optimize API Calls

- **Description**: Implement caching strategies and optimize API requests using tools like `SWR`.
- **Benefit**: Reduces loading times and improves application performance.

## Technologies Used

- **Next.js 13**
- **React 18**
- **TypeScript 4.5**
- **Tailwind CSS**
- **Zustand for state management**
- **Jest and React Testing Library for testing**

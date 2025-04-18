#!/bin/bash

# Ask for project name
read -p "Enter your project name: " projectName

# 1. Create Vite React App
npm create vite@latest "$projectName" -- --template react

# 2. Navigate into the project
cd "$projectName" || exit

# 3. Install dependencies
npm install
npm install @tanstack/react-query @tanstack/react-query-devtools react-router-dom

# 4. Create folder structure
mkdir -p src/pages src/components src/react-query

# 5. Create basic QueryClient setup
cat > src/react-query/queryClient.js <<EOF
import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();
EOF

# 6. Replace main.jsx
cat > src/main.jsx <<EOF
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
EOF

# 7. Create App.jsx
cat > src/App.jsx <<EOF
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
EOF

# 8. Create HomePage.jsx
cat > src/pages/HomePage.jsx <<EOF
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
};

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Users List</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
EOF

# 9. Final message
echo "✅ React environment is ready!"
echo "👉 Run 'npm run dev' to start the development server"

echo "👉 Open your browser at 'http://localhost:5173' to see the
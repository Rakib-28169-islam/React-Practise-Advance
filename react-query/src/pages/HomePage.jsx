import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const fetchUsers = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
};

export default function HomePage() {
  const {data,isLoading,isError} = useQuery(
    {
      queryKey:['users'],
      queryFn:fetchUsers,
      
    }
  )

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

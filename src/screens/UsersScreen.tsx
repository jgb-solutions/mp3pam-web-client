import React, { useState, useEffect } from "react";
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: `http://api.mp3pam.loc/graphql`
});

export default function UsersScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    client.query({
      query: gql`
        {
          users {
            paginatorInfo {
              count
              currentPage
              firstItem
              hasMorePages
            }
            data {
              name
              email
              id
            }
          }
        }
      `
    }).then(result => {
      console.log(result);
      setUsers(result.data.users.data)
    })
      .catch(error => console.log(error));
  }, [])
  return (
    <>
      <h1>GraphQL Users</h1>
      <ul>
        {users.map((user: any, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

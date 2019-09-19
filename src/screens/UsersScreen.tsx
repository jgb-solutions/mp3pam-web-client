import React, { useState, useEffect } from "react";
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { UserData } from "../interfaces/UserInterface";

export const FETCH_USERS = gql`
  query allUsers {
    # 10 latest users
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
`;

export default function UsersScreen() {
  const { loading, error, data } = useQuery(FETCH_USERS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {JSON.stringify}</h1>

  return (
    <>
      <h1>GraphQL Users</h1>
      <ul>
        {data && data.users.data.map((user: UserData, index: number) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

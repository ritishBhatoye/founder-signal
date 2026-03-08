import { gql } from '@apollo/client'

export interface User {
  id: string
  email: string
  created_at: string
}

export interface UsersData {
  users: User[]
}

export const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      email
      created_at
    }
  }
`

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    user: current_user {
      id
      email
      user_metadata
      created_at
    }
  }
`

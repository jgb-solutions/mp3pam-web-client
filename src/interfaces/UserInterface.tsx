export interface UserData {
  id: string
  name: string
  email: string
  avatarUrl: string
  telephone: string
  insertedAt: string
  firstLogin?: boolean
}

export default interface UserInterface {
  data?: UserData
  loggedIn: boolean
  token: string | null
}

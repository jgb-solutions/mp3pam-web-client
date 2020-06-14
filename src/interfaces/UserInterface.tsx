export interface UserData {
  id: string
  name: string
  email: string
  avatarUrl: string
  telephone: string
  insertedAt: string

}

export default interface UserInterface {
  data?: UserData
  loggedIn: boolean
  token: string | null
}

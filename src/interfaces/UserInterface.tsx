// import TrackInterface from "./TrackInterface";

export interface UserData {
  id: string
  name: string
  email: string
  avatar_url: string
  telephone: string
  created_at: string

}

export default interface UserInterface {
  data?: UserData
  loggedIn: boolean
  token: string | null
}

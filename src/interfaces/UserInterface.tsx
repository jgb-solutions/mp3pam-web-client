// import TrackInterface from "./TrackInterface";

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  active: boolean;
  // tracks?: TrackInterface[];
  telephone: string;
  created_at: Date;

}

export default interface UserInterface {
  data?: UserData;
  loggedIn: boolean;
  token: string | null;
}

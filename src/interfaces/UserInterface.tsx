import ListInterface from "./ListInterface";
import TrackInterface from "./TrackInterface";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  active: boolean;
  tracks?: TrackInterface[];
  telephone: string;
  created_at: Date;

}

export default interface UserInterface {
  data?: UserData;
  token: string | null
}

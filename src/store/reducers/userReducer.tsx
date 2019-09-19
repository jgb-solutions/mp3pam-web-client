import { LOG_OUT, LOG_IN } from '../actions/types';
import UserInterface from "../../interfaces/UserInterface";

const INITIAL_USER_STATE = {
  token: null,
};

export default function (
  userState: UserInterface = INITIAL_USER_STATE,
  userAction: { type: string; payload: { data: any, client?: any } }
) {
  const { type, payload } = userAction;

  switch (type) {
    case LOG_IN:
      const { token, ...data } = payload.data;
      return { data, token }
    case LOG_OUT:
      alert('need to log out');
      return userState;
    default:
      return userState;
  }
}

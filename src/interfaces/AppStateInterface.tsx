import PlayerInterface from './PlayerInterface'
import UserInterface from './UserInterface'
import SearchInterface from './SearchInterface'

export default interface AppStateInterface {
  player: PlayerInterface,
  currentUser: UserInterface,
  search: SearchInterface
}

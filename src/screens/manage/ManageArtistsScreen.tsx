import React from "react"
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'

import HeaderTitle from "../../components/HeaderTitle"
// import { useSelector } from "react-redux";

// import ListTable from '../components/ListTable';
// import AppStateInterface from "../interfaces/AppStateInterface";

export default function ManageArtistsScreen() {
  // const list = useSelector(({ player }: AppStateInterface) => player.list);

  return (
    <>
      <HeaderTitle icon={<PersonPinCircleIcon />} text="Your Artists" />

      {/* {!list && <h3>Your queue is empty!</h3>} */}

    </>
  )
}
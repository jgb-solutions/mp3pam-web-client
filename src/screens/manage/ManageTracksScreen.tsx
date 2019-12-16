import React from "react";
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import HeaderTitle from "../../components/HeaderTitle";
// import { useSelector } from "react-redux";

// import ListTable from '../components/ListTable';
// import AppStateInterface from "../interfaces/AppStateInterface";

export default function ManageTracksScreen() {
  // const list = useSelector(({ player }: AppStateInterface) => player.list);

  return (
    <>
      <HeaderTitle icon={<MusicNoteIcon />} text="Your Tracks" />

      {/* {!list && <h3>Your queue is empty!</h3>} */}

    </>
  );
}
import React from "react";
import AlbumIcon from '@material-ui/icons/Album';

import HeaderTitle from "../../components/HeaderTitle";
// import { useSelector } from "react-redux";

// import ListTable from '../components/ListTable';
// import AppStateInterface from "../interfaces/AppStateInterface";

export default function ManageAlbumsScreen() {
  // const list = useSelector(({ player }: AppStateInterface) => player.list);

  return (
    <>
      <HeaderTitle icon={<AlbumIcon />} text="Your Albums" />

      {/* {!list && <h3>Your queue is empty!</h3>} */}

    </>
  );
}
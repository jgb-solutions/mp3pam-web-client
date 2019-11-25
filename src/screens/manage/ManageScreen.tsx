import React from "react";
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import HeaderTitle from "../../components/HeaderTitle";
// import { useSelector } from "react-redux";

// import ListTable from '../components/ListTable';
// import AppStateInterface from "../interfaces/AppStateInterface";

export default function ManageScreen() {
  // const list = useSelector(({ player }: AppStateInterface) => player.list);

  return (
    <>
      <HeaderTitle icon={<GroupWorkIcon />} text="Your Library" />

      {/* {!list && <h3>Your queue is empty!</h3>} */}

    </>
  );
}
import React from "react";
import { useSelector } from "react-redux";

import ListTable from '../components/ListTable';
import AppStateInterface from "../interfaces/AppStateInterface";

function QueueScreen() {
  const list = useSelector(({ player }: AppStateInterface) => player.list);

  return (
    <>
      <h1>Your Current Queue</h1>

      {!list && <h3>Your queue is empty!</h3>}

      {list && <ListTable list={list} />}
    </>
  );
}

export default QueueScreen;
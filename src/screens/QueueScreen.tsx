import React from "react";
import { useSelector } from "react-redux";

import ListTable from '../components/ListTable';
import AppStateInterface from "../interfaces/AppStateInterface";

function QueueScreen() {
  const list = useSelector(({ player }: AppStateInterface) => player.list);

  return (
    <>
      <h1>Queue</h1>
      <ListTable list={list} />
    </>
  );
}

export default QueueScreen;
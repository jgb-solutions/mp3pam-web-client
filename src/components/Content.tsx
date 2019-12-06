import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import AppStateInterface from '../interfaces/AppStateInterface';

const Content = (props: { style?: Object, children: ReactNode, className?: string }) => {
  const currentTrack = useSelector(({ player }: AppStateInterface) => player.currentSound);

  return (
    <main
      className={props.className}
      style={{
        paddingTop: 70,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: currentTrack ? 100 : 50,
        ...props.style
      }}
    >
      {props.children}
    </main>
  );
};

export default Content;

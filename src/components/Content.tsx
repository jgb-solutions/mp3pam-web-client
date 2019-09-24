import React, { ReactNode } from 'react';

const Content = (props: { style?: Object, children: ReactNode, className?: string }) => {
  return (
    <main
      className={props.className}
      style={{
        paddingTop: 65,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 86,
        ...props.style
      }}
    >
      {props.children}
    </main>
  );
};

export default Content;

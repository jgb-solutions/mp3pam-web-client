import React, { ReactNode } from 'react';

const Content = (props: { style?: Object, children: ReactNode, className?: string }) => {
  return (
    <main
      className={props.className}
      style={{
        paddingTop: 75,
        paddingBottom: 50,
        ...props.style
      }}
    >
      {props.children}
    </main>
  );
};

export default Content;

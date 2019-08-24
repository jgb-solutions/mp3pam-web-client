import React, { ReactNode } from 'react';

const Content = (props: { style: Object, children: ReactNode}) => {
  return (
    <main
      style={{
        paddingTop: 75,
        ...props.style
      }}
    >
      {props.children}
    </main>
  );
};

export default Content;

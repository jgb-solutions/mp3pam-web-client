import React from 'react';

const Content = props => {
  return (
    <main
      style={{
        paddingTop: 50,
        ...props.style
      }}
    >
      {props.children}
    </main>
  );
};

export default Content;

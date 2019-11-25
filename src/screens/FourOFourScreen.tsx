import React from 'react';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import { Link, useHistory } from "react-router-dom";

import HeaderTitle from '../components/HeaderTitle';
import Routes from '../routes';

export default function FourOFour() {
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <>
      <HeaderTitle icon={<FindReplaceIcon />} text="OOPS! Are You Lost?" />
      <h3>Go to the <Link style={{ color: 'white' }} to={Routes.pages.home}>home page</Link>{' '}
        or <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={goBack}>go back</span>.</h3>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', paddingBottom: 160 }}>
        <img src="/assets/images/lost.png" style={{ maxWidth: '100%' }} />
      </div>
    </>
  );
};
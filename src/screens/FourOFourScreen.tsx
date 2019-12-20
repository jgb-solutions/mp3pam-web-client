import React from 'react'
import FindReplaceIcon from '@material-ui/icons/FindReplace'
import { Link, useHistory } from "react-router-dom"

import HeaderTitle from '../components/HeaderTitle'
import Routes from '../routes'
import FourOrFour from '../components/FourOrFour'

export default function FourOrFourScreen() {
  const history = useHistory()

  const goBack = () => history.goBack()

  return (
    <>
      <HeaderTitle icon={<FindReplaceIcon />} text="OOPS! Are You Lost?" />
      <h3>Go to the <Link style={{ color: 'white' }} to={Routes.pages.home}>home page</Link>{' '}
        or <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={goBack}>go back</span>.</h3>
      <FourOrFour />
    </>
  )
}
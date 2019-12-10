import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";

import colors from "../utils/colors";
import Logo from "../components/Logo";
import Download from "../components/Download";
import { get } from "lodash-es";

const useStyles = makeStyles({
  facebookSignupButton: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: colors.contentGrey,
    border: `1px solid ${colors.primary}`
  },
  facebookLoginButton: { backgroundColor: '#3b5998', marginTop: 15, marginBottom: 15 },
  errorTitle: {
    color: colors.error
  }
});

export interface Credentials {
  email: string;
  password: string;
};

export default function DownloadScreen() {
  const params = useParams();
  const hash = get(params, 'hash');
  const type = get(params, 'type');

  return (
    <div style={{ maxWidth: 450, margin: '0 auto', textAlign: 'center' }}>
      <Logo size={300} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Download type={type} hash={hash} hideDownloadButton />
      </div>
    </div>
  );
}
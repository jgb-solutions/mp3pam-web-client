import React from "react";
import gql from 'graphql-tag'
import Button from '../../components/Button';
import CheckAuth from "../../components/CheckAuth";

export const UPLOAD_URL = gql`
  query getUploadUrl($name: String!, $type: String!) {
    uploadUrl(name: $name, type: $type) {
     signedUrl
		 fileUrl
    }
  }
`;

export default function AddArtistScreen() {
  return (
    <CheckAuth>
      <Button type="submit">Submit</Button>
    </CheckAuth>
  );
}

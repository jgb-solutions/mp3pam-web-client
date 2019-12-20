import { makeStyles } from "@material-ui/core"
import colors from "../utils/colors"

export const createAlbumScreenStyles = makeStyles({
  uploadButton: {
    marginTop: 10,
    marginBottom: 5,
  },
  successColor: { color: colors.success },
  errorColor: { color: colors.error },
})

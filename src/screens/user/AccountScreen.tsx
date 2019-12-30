import React, { useState, useEffect } from "react"
import HeaderTitle from "../../components/HeaderTitle"
import { useParams, useHistory } from "react-router-dom"
import { get } from "lodash-es"
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import EditIcon from '@material-ui/icons/Edit'
import useForm from 'react-hook-form'
import { Grid } from "@material-ui/core"
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DialogContentText from '@material-ui/core/DialogContentText'


import ProgressBar from "../../components/ProgressBar"
import CheckAuth from "../../components/CheckAuth"
import AppStateInterface from "../../interfaces/AppStateInterface"
import { LOG_OUT_MUTATION, UPDATE_USER } from "../../graphql/mutations"
import { LOG_OUT } from "../../store/actions/user_action_types"
import { makeStyles } from "@material-ui/core"
import colors from "../../utils/colors"
import Button from "../../components/Button"
import Routes from "../../routes"
import { getFormattedDate, getFile } from "../../utils/helpers"
import TextField from "../../components/TextField"
import { IMG_BUCKET, MAX_IMG_FILE_SIZE } from "../../utils/constants"
import TextIcon from "../../components/TextIcon"
import UploadButton from "../../components/UploadButton"
import useUpdateUser from "../../hooks/useUpdateUser"
import useFileUpload from "../../hooks/useFileUpload"
import AlertDialog from "../../components/AlertDialog"
import Divider from "../../components/Divider"


export const useStyles = makeStyles({
  noBgButton: {
    width: 150,
    backgroundColor: colors.contentGrey,
    border: `1px solid ${colors.primary}`
  },
  uploadButton: {
    marginTop: 10,
    marginBottom: 5,
  },
  successColor: { color: colors.success },
  errorColor: { color: colors.error },
})

const NOT_AVAILABLE = `Not Available`

export interface FormData {
  id: string
  name?: string
  email?: string
  telephone?: string
};

export interface UserFormData extends FormData {
  avatar?: string
  img_bucket?: string
}

export default function AccountScreen() {
  const params = useParams()
  const history = useHistory()
  const editMode = get(params, 'editMode', false)
  const dispatch = useDispatch()
  const client = useApolloClient()
  const [shouldEdit, setShouldEdit] = useState(editMode)
  const [openInvalidFileSize, setOpenInvalidFileSize] = useState('')
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser)
  const [logOutMutation] = useMutation(LOG_OUT_MUTATION)
  const userData = get(currentUser, 'data')
  const styles = useStyles()
  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useForm<FormData>({
    mode: 'onBlur', defaultValues: {
      id: get(userData, 'id'),
      name: get(userData, 'name'),
      email: get(userData, 'email'),
      telephone: get(userData, 'telephone')
    }
  })
  const { updateUser, loading, data: updatedUserData } = useUpdateUser()
  const {
    upload: uploadImg,
    uploading: imgUploading,
    isUploaded: imgUploaded,
    percentUploaded: imgPercentUploaded,
    // isValid: imgValid,
    // errorMessage: imgErrorMessage,
    filename: avatar
  } = useFileUpload({ bucket: IMG_BUCKET, message: "You must choose an avatar.", headers: { public: true } })

  const logout = () => {
    logOutMutation()
    client.resetStore()
    dispatch({ type: LOG_OUT })
    history.push(Routes.pages.home)
  }

  useEffect(() => {
    if (updatedUserData) {
      const userData = updatedUserData.updateUser

      dispatch({ type: UPDATE_USER, payload: { data: userData } })

      const { id, name, email, telephone } = userData

      reset({ id, name, email, telephone })

      setShouldEdit(false)
    }

    // eslint-disable-next-line
  }, [updatedUserData])

  const handleUpdateUser = (values: FormData) => {
    const user: UserFormData = {
      ...values,
      avatar,
    }

    if (avatar) {
      user.img_bucket = IMG_BUCKET
    }

    console.table(user)
    updateUser(user)
  }


  const handleInvalidImageSize = (filesize: number) => {
    setOpenInvalidFileSize(`
		The file size exceeds 1 MB. <br />
		Choose another one or reduce the size to upload.
	`)
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => { uploadImg(getFile(event)) }

  return (
    <CheckAuth className='react-transition scale-in'>
      {userData && (
        <>
          <HeaderTitle
            icon={(
              <Avatar style={{ width: 75, height: 75 }} alt={userData.name} src={userData.avatar_url} />
            )}
            textStyle={{ paddingLeft: 10 }}
            text={userData.name}
          />

          {shouldEdit ? (
            <>
              <HeaderTitle icon={<EditIcon />} text={`Edit Your Profile`} />

              <form onSubmit={handleSubmit(handleUpdateUser)} noValidate>
                <input type="hidden" ref={register({ name: "id", required: true })} />

                <Grid container direction='row' spacing={2}>
                  <Grid item xs={12} sm>
                    <TextField
                      inputRef={register({
                        required: "Your name is required.",
                      })}
                      name="name"
                      id="name"
                      label="Name"
                      type="text"
                      margin="normal"
                      error={!!errors.name}
                      helperText={errors.name && (
                        <TextIcon
                          icon={<ErrorIcon className={styles.errorColor} />}
                          text={<span className={styles.errorColor}>{errors.name.message}</span>}
                        />
                      )}
                      style={{ marginBottom: 15 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm>
                    <TextField
                      inputRef={register({
                        required: "Your email is required.",
                      })}
                      name="email"
                      id="email"
                      label="Email"
                      type="email"
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email && (
                        <TextIcon
                          icon={<ErrorIcon className={styles.errorColor} />}
                          text={<span className={styles.errorColor}>{errors.email.message}</span>}
                        />
                      )}
                      style={{ marginBottom: 15 }}
                    />
                  </Grid>
                </Grid>
                <Grid container direction='row' spacing={2}>
                  <Grid item xs={12} sm>
                    <TextField
                      inputRef={register({
                        required: "Your phone number is required.",
                        minLength: {
                          value: 8,
                          message: "The phone number must be at least 8 characters."
                        }
                      })}
                      name="telephone"
                      id="telephone"
                      label="Phone"
                      type="text"
                      margin="normal"
                      error={!!errors.telephone}
                      helperText={errors.telephone && (
                        <TextIcon
                          icon={<ErrorIcon className={styles.errorColor} />}
                          text={<span className={styles.errorColor}>{errors.telephone.message}</span>}
                        />
                      )}
                      style={{ marginBottom: 15 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm>
                    <TextField
                      inputRef={register({
                        minLength: {
                          value: 6,
                          message: "The password must be at least 6 characters."
                        }
                      })}
                      name="password"
                      id="password"
                      label="New Password"
                      type="password"
                      margin="normal"
                      error={!!errors.password}
                      helperText={errors.password && (
                        <TextIcon
                          icon={<ErrorIcon className={styles.errorColor} />}
                          text={<span className={styles.errorColor}>{errors.password.message}</span>}
                        />
                      )}
                      style={{ marginBottom: 15 }}
                    />
                  </Grid>
                </Grid>

                <Grid container direction='row' spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Grid container direction='row' alignItems='center' spacing={1} className={styles.uploadButton}>
                      <Grid item xs={9}>
                        <UploadButton
                          allowedFileSize={MAX_IMG_FILE_SIZE(1)}
                          onFileSizeInvalid={handleInvalidImageSize}
                          buttonSize='large'
                          accept="image/*"
                          onChange={handleImageUpload}
                          title="Choose your avatar"
                          disabled={imgUploaded}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {imgUploaded && <CheckCircleIcon className={styles.successColor} />}
                      </Grid>
                    </Grid>

                    {imgPercentUploaded > 0 && imgPercentUploaded < 100 && (
                      <ProgressBar
                        variant="determinate"
                        color="secondary"
                        value={imgPercentUploaded}
                      />
                    )}
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  size='large'
                  style={{ marginTop: 15 }}
                  disabled={imgUploading || loading}>Update Profile</Button>
                {' '}
                &nbsp;
                {' '}
                <Button
                  type="button"
                  size='large'
                  style={{ marginTop: 15 }}
                  className={styles.noBgButton}
                  onClick={() => setShouldEdit(false)}>
                  Cancel
                  </Button>
              </form>

              <AlertDialog
                open={!!openInvalidFileSize}
                handleClose={() => setOpenInvalidFileSize('')}>
                <DialogContentText id="alert-dialog-description" align='center'>
                  <span>
                    <ErrorIcon style={{ fontSize: 64 }} className={styles.errorColor} />
                  </span>
                  <br />
                  <span dangerouslySetInnerHTML={{ __html: openInvalidFileSize }} />
                  <br />
                  <br />
                  <Button
                    size='small'
                    onClick={() => setOpenInvalidFileSize('')}
                    color="primary">
                    OK
                  </Button>
                </DialogContentText>
              </AlertDialog>
            </>
          ) : (
              <>
                <p>
                  <i>Email</i>: <b>{userData.email || NOT_AVAILABLE}</b>
                </p>

                <p>
                  <i>Telephone</i>: <b>{userData.telephone || NOT_AVAILABLE}</b>
                </p>

                <p>
                  <i>Account created on</i>: <b>{getFormattedDate(userData.created_at) || NOT_AVAILABLE}</b>
                </p>

                <p>
                  <Button
                    size='large'
                    onClick={() => setShouldEdit(true)}
                    className={styles.noBgButton}>
                    Edit Profile
                </Button>
                </p>
                <Divider.HR style={{ width: 300, marginLeft: 0 }} />
                <p>
                  <Button
                    size='large'
                    onClick={logout}
                    className={styles.noBgButton}>
                    Log out
                </Button>
                </p>
              </>
            )}
        </>
      )
      }
    </CheckAuth >
  )
}
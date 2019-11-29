import React, { useState, useEffect, ReactNode } from "react";
import useForm from 'react-hook-form';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

import ProgressBar from "../../components/ProgressBar";
import TextField from "../../components/TextField";
import Button from '../../components/Button';
import UploadButton from '../../components/UploadButton';
import CheckAuth from "../../components/CheckAuth";
import HeaderTitle from "../../components/HeaderTitle";
import useFileUpload from "../../hooks/useFileUpload";
import TextIcon from "../../components/TextIcon";
import { addArtistScreenStyles } from "../../styles/addArtistScreenStyles";
import useAddArtist from '../../hooks/useAddArtist';
import Routes from "../../routes";
import AlertDialog from "../../components/AlertDialog";
import { getFile } from "../../utils/helpers";
import { IMG_BUCKET, MAX_IMG_FILE_SIZE, MIN_SOCIAL_MEDIA_USERNAME_LENGTH, MIN_ARTIST_BIO_LENGTH } from "../../utils/constants";


type IconFieldProps = {
  icon: ReactNode,
  field: ReactNode,
  hasError: boolean,
}
export function IconField({ icon, field, hasError }: IconFieldProps) {
  return (
    <Grid container spacing={1} alignItems={hasError ? "center" : "flex-end"}>
      <Grid item xs={1}>
        {icon}
      </Grid>
      <Grid item xs={10}>
        {field}
      </Grid>
    </Grid>
  )
}

export interface FormData {
  name: string;
  stage_name: string;
  bio?: string;
  facebook?: string;
  twitter?: string;
  isntagram?: string;
  youtube?: string;
};

export interface ArtistData extends FormData {
  poster?: string;
  img_bucket: string;
}

export default function AddArtistScreen() {
  const history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm<FormData>({ mode: 'onBlur' });
  const { addArtist, loading: formWorking, data: uploadedArtist } = useAddArtist();
  const {
    upload: uploadImg,
    uploading: imgUploading,
    isUploaded: imgUploaded,
    percentUploaded: imgPercentUploaded,
    isValid: imgValid,
    errorMessage: imgErrorMessage,
    filename: poster
  } = useFileUpload({ bucket: IMG_BUCKET, message: "You must choose a poster." });

  const [openArtistSuccessDialog, setOpenArtistSuccessDialog] = useState(false);
  const [openInvalidFileSize, setOpenInvalidFileSize] = useState('');

  const goToArtistsLibrary = () => history.push(Routes.user.manage.artists);

  const handleArtistSucessDialogClose = () => setOpenArtistSuccessDialog(false);

  const handleOpenInvalidFileSizeClose = () => setOpenInvalidFileSize('');


  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => { uploadImg(getFile(event)); };

  const handleInvalidImageSize = (filesize: number) => {
    setOpenInvalidFileSize(`
		The file size exceeds 5 MB. <br />
		Choose another one or reduce the size to upload.
	`)
  };

  const handleAddArtist = (values: FormData) => {
    if (!poster) return;

    const artist = {
      ...values,
      poster: poster || '',
      img_bucket: IMG_BUCKET
    };


    console.table(artist);
    addArtist(artist);
  };

  useEffect(() => {
    if (uploadedArtist) {
      setOpenArtistSuccessDialog(true)
    }
  }, [uploadedArtist]);

  const styles = addArtistScreenStyles();

  return (
    <CheckAuth className='react-transition scale-in'>
      <HeaderTitle icon={<PersonPinCircleIcon />} text={`Add a new artist`} />

      <form onSubmit={handleSubmit(handleAddArtist)} noValidate>
        <Grid container direction='row' spacing={2}>
          <Grid item xs={12} sm>
            <TextField
              inputRef={register({
                required: "The name of the artist is required.",
              })}
              name="name"
              id="name"
              label="Name *"
              type="text"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name && (
                <TextIcon
                  icon={<ErrorIcon className={styles.errorColor} />}
                  text={<span className={styles.errorColor}>{errors.name.message}</span>}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm>
            <TextField
              inputRef={register({
                required: "The Stage Name of the artist is required.",
              })}
              name="stage_name"
              id="stage_name"
              label="Stage Name *"
              type="text"
              margin="normal"
              error={!!errors.stage_name}
              helperText={errors.stage_name && (
                <TextIcon
                  icon={<ErrorIcon className={styles.errorColor} />}
                  text={<span className={styles.errorColor}>{errors.stage_name.message}</span>}
                />
              )}
              style={{ marginBottom: 15 }}
            />
          </Grid>
        </Grid>

        <Grid container direction='row' alignItems='center' spacing={1} className={styles.uploadButton}>
          <Grid item>
            <UploadButton
              allowedFileSize={MAX_IMG_FILE_SIZE()}
              onFileSizeInvalid={handleInvalidImageSize}
              buttonSize='large'
              accept="image/*"
              onChange={handleImageUpload}
              title="Choose a Poster *"
              disabled={imgUploaded}
            />
          </Grid>
          <Grid item>
            {imgUploaded && <CheckCircleIcon className={styles.successColor} />}
          </Grid>
        </Grid>

        {formState.isSubmitted && !imgValid && (
          <TextIcon
            icon={<ErrorIcon className={styles.errorColor} />}
            text={<span className={styles.errorColor}>{imgErrorMessage}</span>}
          />
        )}

        {imgPercentUploaded > 0 && imgPercentUploaded < 100 && (
          <ProgressBar
            variant="determinate"
            color="secondary"
            value={imgPercentUploaded}
          />
        )}
        <Grid container direction='row' spacing={2}>
          <Grid item xs={12} sm={6}>
            <IconField
              icon={<FacebookIcon className={!!errors.facebook ? styles.errorColor : ''} />}
              field={(
                <TextField
                  onChange={e => e.target.value = e.target.value.trim()}
                  inputRef={register({
                    minLength: {
                      value: MIN_SOCIAL_MEDIA_USERNAME_LENGTH,
                      message: `Username or link must be at least ${MIN_SOCIAL_MEDIA_USERNAME_LENGTH} characters."`
                    },
                  })}
                  name="facebook"
                  id="facebook"
                  label="Facebook Username or Profile Link"
                  margin="normal"
                  error={!!errors.facebook}
                  helperText={!!errors.facebook && (
                    <TextIcon
                      icon={<ErrorIcon className={styles.errorColor} />}
                      text={<span className={styles.errorColor}>{errors.facebook.message}</span>}
                    />
                  )}
                />
              )}
              hasError={!!errors.facebook}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconField
              icon={<TwitterIcon className={!!errors.twitter ? styles.errorColor : ''} />}
              field={(
                <TextField
                  onChange={e => e.target.value = e.target.value.trim()}
                  inputRef={register({
                    minLength: {
                      value: MIN_SOCIAL_MEDIA_USERNAME_LENGTH,
                      message: `Username or link must be at least ${MIN_SOCIAL_MEDIA_USERNAME_LENGTH} characters.`
                    },
                  })}
                  name="twitter"
                  id="twitter"
                  label="Twitter Username or Profile Link"
                  margin="normal"
                  error={!!errors.twitter}
                  helperText={!!errors.twitter && (
                    <TextIcon
                      icon={<ErrorIcon className={styles.errorColor} />}
                      text={<span className={styles.errorColor}>{errors.twitter.message}</span>}
                    />
                  )}
                />
              )}
              hasError={!!errors.twitter}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconField
              icon={<InstagramIcon className={!!errors.instagram ? styles.errorColor : ''} />}
              field={(
                <TextField
                  onChange={e => e.target.value = e.target.value.trim()}
                  inputRef={register({
                    minLength: {
                      value: MIN_SOCIAL_MEDIA_USERNAME_LENGTH,
                      message: `Username or link must be at least ${MIN_SOCIAL_MEDIA_USERNAME_LENGTH} characters.`
                    },
                  })}
                  name="instagram"
                  id="instagram"
                  label="Instagram Username or Profile Link"
                  margin="normal"
                  error={!!errors.instagram}
                  helperText={!!errors.instagram && (
                    <TextIcon
                      icon={<ErrorIcon className={styles.errorColor} />}
                      text={<span className={styles.errorColor}>{errors.instagram.message}</span>}
                    />
                  )}
                />
              )}
              hasError={!!errors.instagram}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconField
              icon={<YouTubeIcon className={!!errors.youtube ? styles.errorColor : ''} />}
              field={(
                <TextField
                  onChange={e => e.target.value = e.target.value.trim()}
                  inputRef={register({
                    minLength: {
                      value: MIN_SOCIAL_MEDIA_USERNAME_LENGTH,
                      message: `Username or link must be at least ${MIN_SOCIAL_MEDIA_USERNAME_LENGTH} characters.`
                    },
                  })}
                  name="youtube"
                  id="youtube"
                  label="YouTube Username or Profile Link"
                  margin="normal"
                  error={!!errors.youtube}
                  helperText={!!errors.youtube && (
                    <TextIcon
                      icon={<ErrorIcon className={styles.errorColor} />}
                      text={<span className={styles.errorColor}>{errors.youtube.message}</span>}
                    />
                  )}
                />
              )}
              hasError={!!errors.youtube}
            />
          </Grid>
        </Grid>

        <TextField
          inputRef={register({
            minLength: {
              value: MIN_ARTIST_BIO_LENGTH,
              message: `The bio must be at least ${MIN_ARTIST_BIO_LENGTH} characters.`
            }
          })}
          name="bio"
          id="bio"
          label="Biography"
          multiline
          rowsMax="50"
          margin="normal"
          error={!!errors.bio}
          helperText={errors.bio && (
            <TextIcon
              icon={<ErrorIcon className={styles.errorColor} />}
              text={<span className={styles.errorColor}>{errors.bio.message}</span>}
            />
          )}
        />

        <Button
          type="submit"
          size='large'
          style={{ marginTop: 15 }}
          disabled={imgUploading || formWorking}>Add Artist</Button>
      </form>

      {/* Success Dialog */}
      <AlertDialog
        open={openArtistSuccessDialog}
        handleClose={handleArtistSucessDialogClose}
        disableBackdropClick >
        <DialogContentText id="alert-dialog-description" align='center'>
          <span><CheckCircleIcon style={{ fontSize: 64 }} className={styles.successColor} /></span>
          <br />
          <span>Artist successfully added!</span>
          <br />
          <br />
          <Button size='small' onClick={goToArtistsLibrary} color="primary">
            Go To Your Artists
          </Button>
        </DialogContentText>
      </AlertDialog >

      {/* Handling invalid file sizes */}
      <AlertDialog
        open={!!openInvalidFileSize}
        handleClose={handleOpenInvalidFileSizeClose}>
        <DialogContentText id="alert-dialog-description" align='center'>
          <span>
            <ErrorIcon style={{ fontSize: 64 }} className={styles.errorColor} />
          </span>
          <br />
          <span dangerouslySetInnerHTML={{ __html: openInvalidFileSize }} />
          <br />
          <br />
          <Button size='small' onClick={handleOpenInvalidFileSizeClose} color="primary">
            OK
          </Button>
        </DialogContentText>
      </AlertDialog>
    </CheckAuth >
  );
}

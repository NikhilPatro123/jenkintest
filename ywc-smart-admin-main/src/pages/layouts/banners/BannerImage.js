import React, { useEffect, Fragment, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//react components
import { SnackBar } from "../../../components/SnackBar";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
// redux components
import {
  deleteBannerImage,
  getBannerImages,
  updateBannerImage,
  uploadBannerImage,
} from "../../../redux/actions/bannerActions";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  backbutton: {
    marginLeft: 28,
    marginTop: 24,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    textAlign: "center",
  },
  uploadIcon: {
    color: "#3F51B5",
  },
  label: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: 600,
  },
  uploadbutton: {
    color: "#fff",
    fontFamily: "Montserrat",
    backgroundColor: "#3F51B5",
    textTransform: "capitalize",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#3F51B5",
    },
  },
  input: {
    display: "none",
  },
  heading: {
    fontSize: 22,
    fontFamily: "Montserrat",
    fontWeight: 600,
    color: "#fff",
    textTransform: "capitalize",
  },
  error: {
    fontSize: 15,
    fontFamily: "Montserrat",
    fontWeight: 450,
    color: "red",
  },
  media: {
    height: 140,
  },
  imageTitle: {
    fontSize: 14,
    fontFamily: "Montserrat",
    fontWeight: 600,
    color: "#212121",
  },
  uploadDate: {
    fontFamily: "Montserrat",
    fontSize: 14,
  },
  buttons: {
    justifyContent: "space-between",
    "& .MuiFormControlLabel-label": {
      fontSize: 13,
      fontFamily: "Montserrat",
      color: "#212121",
      fontWeight: 600,
    },
  },
  deletButton: {
    backgroundColor: "#D11A2A",
    "&:hover": {
      backgroundColor: "#D11A2A",
    },
  },
}));
const imageBaseUrl = "http://104.237.9.45:32122";

export const BannerImage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const location = useLocation();
  const { error, bannerImages, loading } = useSelector(
    (state) => state.Banners
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const [imageId, setImageId] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  // function to handle image upload
  const handleImageUpload = (e) => {
    let uploadingImage = e.target.files[0];
    const formData = new FormData();
    formData.append("file[]", uploadingImage);
    dispatch(uploadBannerImage(id, formData));
    e.target.value = null;
  };
  const handleApply = (visible, data) => {
    const activeData = {
      active: visible,
      startDisplayDate: data.startDisplayDate,
      stopDisplayDate: data.stopDisplayDate,
    };
    dispatch(updateBannerImage(activeData, data.id));
  };
  const handleDeleteConfirm = (imageId) => {
    setImageId(imageId);
    setConfirmOpen(true);
  };
  const handleDeleteBannerImage = () => {
    dispatch(deleteBannerImage(imageId));
  };
  useEffect(() => {
    dispatch(getBannerImages(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.backbutton}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => {
            history.goBack();
          }}
        >
          Back to Banner list
        </Button>
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper} variant="outlined" square>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CloudUploadIcon className={classes.uploadIcon} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.label}>
                  Upload a Banner Images.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    className={classes.uploadbutton}
                    disabled={loading}
                  >
                    Choose a Image to Upload...
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            className={classes.paper}
            variant="outlined"
            square
            style={{ margin: "30px 0 0 0", backgroundColor: "#3F51B5" }}
          >
            <Typography component="p" className={classes.heading}>
              {location.state.bannerTitle}
            </Typography>
          </Paper>
          <Paper className={classes.paper} variant="outlined" square>
            {loading ? (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            ) : error ? (
              <Grid item xs={12}>
                <Typography className={classes.error}>{error}</Typography>
              </Grid>
            ) : Object.keys(bannerImages).length > 0 &&
              bannerImages.bannerImages.length > 0 ? (
              <Fragment>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0 0 20px 0",
                    color: "#212121",
                  }}
                >
                  <Typography>
                    Total Banners: {bannerImages.totalCount}
                  </Typography>
                  <Typography>
                    Active Banners: {bannerImages.activeImagesCount}
                  </Typography>
                </div>
                <Grid container spacing={2}>
                  {bannerImages.bannerImages.map((image) => (
                    <Grid item lg={4} md={4} sm={6} xs={12} key={image.id}>
                      <Card className={classes.cardroot}>
                        <CardMedia
                          className={classes.media}
                          image={`${imageBaseUrl}${image.bannerImageUrl}`}
                          title={image.bannerImageName}
                        />
                        <CardContent>
                          <Typography
                            component="h5"
                            variant="h5"
                            className={classes.imageTitle}
                          >
                            {image.bannerImageName}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.uploadDate}
                          >
                            {image.uploadedDate}
                          </Typography>
                        </CardContent>
                        <CardActions className={classes.buttons}>
                          <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            className={classes.deletButton}
                            onClick={() => handleDeleteConfirm(image.id)}
                          >
                            Delete
                          </Button>
                          <FormControlLabel
                            value="start"
                            control={
                              <Checkbox
                                color="primary"
                                checked={image.active}
                                onChange={(e) =>
                                  handleApply(e.target.checked, image)
                                }
                                name="visible"
                                size="small"
                              />
                            }
                            label="Apply"
                            labelPlacement="start"
                          />
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Fragment>
            ) : null}
          </Paper>
        </Container>
        <ConfirmDialog
          title="Delete Banner Image?"
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={handleDeleteBannerImage}
        >
          Are you sure you want to delete this Banner Image?{" "}
        </ConfirmDialog>
        <SnackBar />
      </main>
    </div>
  );
};

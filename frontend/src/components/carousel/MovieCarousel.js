import React from "react";
import {
  makeStyles,
  MobileStepper,
  Typography,
  useTheme,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import MovieCard from "../MovieCards/MovieCard";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  scoutibleCarouselroot: {
    width: "100%",
    // maxWidth: "90",
    "&>div": {
      justifyContent: "center",
      "&>div": {
        "&>div>div": {
          margin: "0px !important",
          "&>div": {
            // borderRadius: "0 !important",
          },
        },
      },
    },
  },
  movieContainer: {
    width: "100%",
    height: "400px",
    backgroundAttachment: "fixed",
    "&>div": {
      // background: "rgba(0,0,0,0.1)",

      width: "100%",
      height: "350px",
      "&>h3": {
        textAlign: "center",
        fontWeight: 600,
        color: "#FFFFFF",
        width: "100%",
        position: "absolute",
        bottom: 0,
        // paddingTop: 200,
        backdropFilter: "blur(5px)",
      },
    },
  },
}));
const TeamCardCarousel = ({ movieList }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    // setSelectedTeam("");
    setActiveStep(step);
  };

  return (
    <div className={classes.scoutibleCarouselroot}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        enableMouseEvents
        index={activeStep}
        onChangeIndex={handleStepChange}
        // autoplay={false}
      >
        {movieList?.map((elem, index) => (
          <div
            className={classes.movieContainer}
            style={{
              background: `url(https://image.tmdb.org/t/p/w500/${elem.poster_path})`,
              backgroundRepeat: "no-repeat",
              //   backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div>
              <Typography variant="h3" component="h3" gutterBottom>
                {elem.title}
              </Typography>
            </div>
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
};

export default TeamCardCarousel;

/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useEffect, useReducer, useState} from "react";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";

function ImagesTimeline({
                          initialPeriod, stepsAsDateAnyFormat, dateAnyFormatIsLower, dateAnyFormatToStringLabel, getImagesByPeriod, printPeriod = (period) =>
    <React.Fragment>
      Période :
      {dateAnyFormatToStringLabel(stepsAsDateAnyFormat[period[0]])}
      -
      {dateAnyFormatToStringLabel(stepsAsDateAnyFormat[period[1]])}
    </React.Fragment>
                        }) {

  function reducer(images, action) {
    switch (action.type) {
      case 'loadImages':
        return {loaded: [...images.loaded, ...action.payload], displayed: images.displayed};
      case 'displayImages':
        return {loaded: images.loaded, displayed: action.payload};
      default:
        throw new Error();
    }
  }

  //Use reducer because of concurrent access
  const [images, dispatch] = useReducer(reducer, {loaded: [], displayed: []});
  const [period, setPeriod] = useState(initialPeriod);
  const [datesLoaded] = useState([]);

  function populateImageByPeriod(p) {
    getImagesByPeriod(p.map(dateAsTabIndex => stepsAsDateAnyFormat[dateAsTabIndex])).then(r => {
      dispatch({type: 'loadImages', payload: r.results.bindings})
    });
  }

  useEffect(() => {

    // first load
    if (datesLoaded.length === 0) {
      datesLoaded[0] = period[0];
      datesLoaded[1] = period[1];
      populateImageByPeriod(period);
    }

    //changing left bound
    if (period[0] < datesLoaded[0]) {
      populateImageByPeriod([period[0], datesLoaded[0]]);
      datesLoaded[0] = period[0];
    }

    //changing right bound
    if (period[1] > datesLoaded[1]) {
      populateImageByPeriod([datesLoaded[1], period[1]]);
      datesLoaded[1] = period[1];
    }

    //update image shown depending on new bounds
    dispatch({
      type: 'displayImages', payload: images.loaded.filter(image => {
        return dateAnyFormatIsLower(stepsAsDateAnyFormat[period[0]], image.date.value)
          && !dateAnyFormatIsLower(stepsAsDateAnyFormat[period[1]], image.date.value)
      })
    })
  }, [period]);

  /* There are 2 calls to setImagesToDisplay, because there is 2 cases :
   * - Period changes, but no new image to load => hook on period.
   * - Period changes, new images requested but loaded after period hook => hook on images
 */

  useEffect(() => {
    dispatch({
      type: 'displayImages', payload: images.loaded.filter(image => {
        return dateAnyFormatIsLower(stepsAsDateAnyFormat[period[0]], image.date.value)
          && !dateAnyFormatIsLower(stepsAsDateAnyFormat[period[1]], image.date.value)
      })
    })
  }, [images.loaded])

  return <Box mt={5}>
    <Box css={css`width: 70%; margin: auto`}>
      <Typography variant="h4" align="center">{printPeriod(period)}</Typography>
      <Slider
        min={0}
        max={stepsAsDateAnyFormat.length - 1}
        value={period}
        step={1}
        marks
        onChange={(event, newPeriod) => setPeriod(newPeriod)}
        valueLabelDisplay="off"
      />
    </Box>
    {images.displayed.map(image => {
        return <Link key={image.link_path.value} to={{
          pathname: `${image.link_path.value}`,
        }}>
          <img src={image.image_path.value}/>
        </Link>
      }
    )}
  </Box>
}

ImagesTimeline.propTypes = {
  initialPeriod: PropTypes.arrayOf(PropTypes.number).isRequired,
  stepsAsDateAnyFormat: PropTypes.array.isRequired,
  dateAnyFormatIsLower: PropTypes.func.isRequired,
  dateAnyFormatToStringLabel: PropTypes.func.isRequired,
  getImagesByPeriod: PropTypes.func.isRequired,
  printPeriod: PropTypes.func
}

/*
  Example

  <ImagesTimeline
    initialPeriod={[2, 3]}
    dateAnyFormatToStringLabel={(dateAnyFormat) => ...}
    getImagesByPeriod={getImagesByPeriod}
    dateAnyFormatIsLower={(date1, date2) => new Date(date1) < new Date(date2) }
    stepsAsDateAnyFormat={["january","february","march","april","may","june"]}
  />


  getImagesByPeriod must return array of images :
  [
    {
      date: {
        value: <date>,
      },
      link_path: {
        value: <path>,
      },
      image_path: {
        value: <path>
      }
    },
    ...
  ]
*/
export default ImagesTimeline;
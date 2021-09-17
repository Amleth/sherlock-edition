/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useEffect, useReducer, useState} from "react";
import styled from 'styled-components'
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";

function DefaultPeriodLabel({period, props}) {
  return <React.Fragment>
    Période :
    {props.dateAnyFormatToStringLabel(props.stepsAsDateAnyFormat[period[0]])}
    -
    {props.dateAnyFormatToStringLabel(props.stepsAsDateAnyFormat[period[1]])}
  </React.Fragment>
}

function DefaultHoveredImageInfo({image, props}) {
  return <StyledHoverDetailBox>
    <Typography variant="H4">Titre(s)</Typography>
    {image.titles.value.split('#').map(title => <li key={"li" + title}>{title}</li>)}
  </StyledHoverDetailBox>
}

function ImagesTimeline({
                          initialPeriod,
                          stepsAsDateAnyFormat,
                          dateAnyFormatIsLower,
                          dateAnyFormatToStringLabel,
                          getImagesByPeriod,
                          PeriodLabel: PeriodLabel = DefaultPeriodLabel,
                          HoveredImageInfo: HoveredImageInfo = DefaultHoveredImageInfo,
                        }) {
  const props = {
    initialPeriod,
    stepsAsDateAnyFormat,
    dateAnyFormatIsLower,
    dateAnyFormatToStringLabel,
    getImagesByPeriod,
    PeriodLabel
  }

  function reducer(images, action) {
    switch (action.type) {
      case 'loadImages': {
        //Images can appear twice, because the request should be less/more OR EQUAL. We also have to sort them
        const newLoadedImagesSorted = [...images.loaded, ...action.payload.filter(image => !images.iriList.includes(image.iri.value))].sort((image1, image2) => {
          return dateAnyFormatIsLower(image1.date.value, image2.date.value) ? -1 : 1
        })
        return {
          ...images,
          loaded: newLoadedImagesSorted,
          iriList: [...images.iriList, ...action.payload.map(image => image.iri.value)]
        };
      }
      case 'displayImages':
        return {
          ...images,
          displayed: action.payload
        };
      default:
        throw new Error();
    }
  }

  //Use reducer because of concurrent access
  const [images, dispatch] = useReducer(reducer, {loaded: [], displayed: [], iriList: []});
  const [period, setPeriod] = useState(initialPeriod);
  const [datesLoaded] = useState([]);


  useEffect(() => {
    readPeriod();
  }, [])

  function readPeriod() {

    function populateImageByPeriod(p) {
      getImagesByPeriod(p.map(dateAsTabIndex => stepsAsDateAnyFormat[dateAsTabIndex])).then(r => {
        dispatch({type: 'loadImages', payload: r.results.bindings})
      });
    }

    // first load
    if (datesLoaded.length === 0 && period.length) {
      datesLoaded[0] = period[0];
      datesLoaded[1] = period[1];
      populateImageByPeriod(period);
    }

    //changing left bound
    if (period[0] < datesLoaded[0]) {
      console.log("2")
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
  }

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

  return <Box css={css`margin-top: 5vh;`}>
    <Box css={css`margin: auto; width: 70%; height:20vh;`}>
      <Typography variant="h4" align="center"><PeriodLabel period={period} props={props}/></Typography>
      <Slider
        min={0}
        max={stepsAsDateAnyFormat.length - 1}
        value={period}
        step={1}
        marks
        onChange={(event, newPeriod) => setPeriod(newPeriod)}
        onChangeCommitted={() => readPeriod()}
        valueLabelDisplay="off"
      />
      <Typography variant="h4"
                  align="center">{images.displayed.length} résultats</Typography>
    </Box>
    <Box display="flex">
      <Box css={css`
      min-width:70%; 
      max-width:70%; 
      display: inline-block;
      overflow-y: scroll;
      height: 70vh;
      margin-right: 5px;
      ::-webkit-scrollbar {
        width: 5px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        background: #888;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }`}>
        <ImagesDisplayer
          HoveredImageInfo={HoveredImageInfo}
          images={images}
          dateAnyFormatToStringLabel={dateAnyFormatToStringLabel}
          props={props}
        />
      </Box>
    </Box>
  </Box>
}

const ImagesDisplayer = React.memo(({HoveredImageInfo, images, dateAnyFormatToStringLabel, props}) => {
  return images.displayed.map(image => <StyledLink
      key={image.link_path.value}
      to={{pathname: `${image.link_path.value}`}}
    >
      <img
        src={image.image_path.value} alt=""/>
      <StyledHoverBox>
        <Typography variant="p" color="primary">{dateAnyFormatToStringLabel(image.date.value)}</Typography>
      </StyledHoverBox>
      <HoveredImageInfo image={image} props={props}/>
    </StyledLink>
  )
});


const StyledLink = styled(Link)`
  &:hover img{
    opacity:0.3;
  }
  
  img {
    transition: .4s ease;
  }
  
  &:hover div {
    opacity: 1;
  };
  
  position: relative;
  display: inline-block;
`

const StyledHoverBox = styled(Box)`
  opacity:0;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0 0;
  width:100%;
  text-align: center
`

const StyledHoverDetailBox = styled(Box)`
  position:fixed; 
  opacity: 0;
  right: 0; 
  top: 25vh; 
  width: 29vw;
  height: 70vh;
  border: 3px solid lightgrey;
  flex: auto; 
  margin-right: 3px;
`

ImagesTimeline.propTypes = {
  initialPeriod: PropTypes.arrayOf(PropTypes.number).isRequired,
  stepsAsDateAnyFormat: PropTypes.array.isRequired,
  dateAnyFormatIsLower: PropTypes.func.isRequired,
  dateAnyFormatToStringLabel: PropTypes.func.isRequired,
  getImagesByPeriod: PropTypes.func.isRequired,
  PeriodLabel: PropTypes.elementType,
  HoveredImageInfo: PropTypes.elementType
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
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React, {useEffect, useState} from "react";
import {getAllEstampes} from "../requests/estampes";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {monthsAsInt} from "../utils/utils";

function Estampes() {
  /*
  Le premier mois est l'index 0, on divise donc 1 (année) par 11 (mois) = ~= 0.09
   */
  const step = 9;
  const [marks, setMarks] = useState([]);
  const [estampes, setEstampes] = useState([]);
  const [estampesPrinted, setEstampesPrinted] = useState([]);
  const [period, setPeriod] = useState([169500, 169600]);
  const [sliderBounds, setSliderBounds] = useState( [167700, 171100])
  useEffect(() => {

    getAllEstampes().then(r => {
      setEstampes(r.results.bindings)
      setEstampesPrinted(r.results.bindings);
      setPeriod([169500, 169600]);
    });
  }, [])

  useEffect(() => {
    setEstampesPrinted(estampes.filter(estampe => {
      const dateEstampe = new Date(estampe.date.value);
      const dateStart = periodIntAsDate(period[0]);
      const dateEnd = periodIntAsDate(period[1]);
      return dateEstampe > dateStart && dateEstampe < dateEnd;
    }))
  }, [period])

  useEffect(() => {
    if (estampes[0]) {
      const start = new Date(estampes[0].date.value);
      const end = new Date(estampes[estampes.length-1].date.value);
      setSliderBounds([
        Number(start.getFullYear()*100 + start.getMonth() * step),
        Number(end.getFullYear()*100 + end.getMonth() * step)
      ])
      setMarks(getMarks(sliderBounds[0], sliderBounds[1], step));
    }
  }, [estampes])
  return <Box mt={5}>
    <Box css={css`width: 70%; margin: auto`}>
      <Typography variant="h4" align="center" >Période : {numberToDateStr(period[0])} - {numberToDateStr(period[1])}</Typography>
      <Slider
        min={sliderBounds[0]}
        max={sliderBounds[1]}
        value={period}
        step={null}
        marks={marks}
        onChange={(event, newPeriod) => setPeriod(newPeriod)}
        valueLabelDisplay="off"
      />
    </Box>
    {estampesPrinted.map(estampe => {
        return <Link key={estampe.reference_gravure.value} to={{
          pathname: `/estampe/${estampe.reference_gravure.value}`,
        }}>
          <img src={`https://picsum.photos/50?ref=${estampe.reference_gravure.value}`}/>
        </Link>
      }
    )}
  </Box>
}

function numberToDateStr(number) {
  const year = Math.floor(number / 100);
  const month = monthsAsInt[number - year*100];
  return month + " " + year;
}


function getMarks(leftBound, rightBound, step) {
  const marks = [];
  let monthCpt = 0;
  for (let i=0; leftBound + i < rightBound; i += step) {
    monthCpt++;
    if (monthCpt === 13) {
      monthCpt = 1;
      i -= step*12 - 100; //correction de l'approximation de 100 / 12
    }
    marks.push({value: leftBound + i})
  }
  return marks
}

function periodIntAsDate(int) {
  const year = Math.floor(int/100);
  const month = (int - year*100) / 9;
  return new Date(year, month);
}

export default Estampes;
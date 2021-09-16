/** @jsxImportSource @emotion/react */
import React from "react";
import {getEstampesByPeriod} from "../requests/estampes";
import {estampesStepsDatetimeString} from "../utils/utils";
import ImagesTimeline from "./ImagesTimeline";

function Estampes() {

  return <ImagesTimeline
    initialPeriod={[50, 55]} //50 = mars 1682 ; 55 = août 1682
    dateAnyFormatToStringLabel={(dateAsString) => new Date(dateAsString).toLocaleString('default', {year: 'numeric', month: 'long'})}
    dateAnyFormatIsLower={(date1, date2) => new Date(date1) < new Date(date2) }
    getImagesByPeriod={getEstampesByPeriod}
    stepsAsDateAnyFormat={estampesStepsDatetimeString}
  />
}

export default Estampes;
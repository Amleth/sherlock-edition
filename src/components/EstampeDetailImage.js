/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import { Skeleton } from '@material-ui/core';
import { useState } from 'react';

const EstampeDetailImage = ({estampeReference}) => {
    const [loaded, setLoaded] = useState(false);
    return <>
        <img 
            onLoad={() => setLoaded(true)}
            css={css`margin:auto; max-width:100%;max-height:100%;`}
            src={`https://ceres.huma-num.fr/iiif/3/mercure-galant-estampes--${estampeReference}/full/500,/0/default.jpg`} 
            alt=""
        />
        {!loaded && <Skeleton variant="rectangular" width={500} height={800}/>}
    </>

}

export default EstampeDetailImage;

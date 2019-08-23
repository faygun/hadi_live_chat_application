import React from 'react';
import ReactLoading from 'react-loading';

export const getSpinner = (width, height) =>{
    return (<ReactLoading type="cubes" width={width} height={height} className="spinner" color="#39ace7"  />);
}
import React from 'react';
import ReactLoading from 'react-loading';
import { getJwt } from "./jwt";

export const getSpinner = (width, height) =>{
    return (<ReactLoading type="cubes" width={width} height={height} className="spinner" color="#39ace7"  />);
}

export const getConfig = ()=> {
    const config = {
        headers:{
            "Content-type":"application/json"
        }
      };
      const jwt = getJwt();
      config.headers['x-auth-token'] = jwt;

      return config;
}
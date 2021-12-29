import React, {createContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { useRos } from '../lib/ros';
import { getParams } from '../lib/param'

const ParamsContext = createContext([])

const failedCallback = (msg) => {
    console.log(msg);
}

const defaultProps = {
    toggler: false
}

export const ParamListProvider = (props = defaultProps) => {

    const ROS = useRos();

    const [paramList, setParamList] = useState([])

    const callback = (result) => {
        setParamList(result);
        console.log(result);
    }

    useEffect(() => {
        if (props.toggler || props.toggler === undefined) {
            getParams( ROS, callback, failedCallback);
        }
    }, [props.toggler]);

    return (
        <ParamsContext.Provider value={paramList}>
            {props.children}
        </ParamsContext.Provider>
    );
}

ParamListProvider.propTypes = {
    children: PropTypes.node,
    toggler: PropTypes.bool,
}

export const useParamList = () => {
    const context = useContext(ParamsContext);
    if (context === undefined) {
        throw new Error('useParamList must be used within a ParamListProvider');
    }
    return context;
}
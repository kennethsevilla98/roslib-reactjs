import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { getParam } from './param';
import { useRos } from './ros'

const ParamContext = createContext(null);

export const GetParam = props => {
    
    const ROS = useRos();

    const [param, setParam] = useState(null);

    const callback = (res) => {
        setParam(res);
    }

    useEffect(() => {
        if (props.toggler) {
            getParam(ROS, props.param.name, callback)
        }
    }, [props.toggler])
    
    return (
        <ParamContext.Provider value={param}>
            {props.children}
        </ParamContext.Provider>
    )
}

GetParam.propTypes = {
    children: PropTypes.node,
    param: PropTypes.object.isRequired,
    toggler: PropTypes.bool,
}

export const useParam = () => {
    const context = useContext(ParamContext);
    if (context === undefined) {
        throw new Error('useParam must be used within a GetParam');
    }
    return context;
}

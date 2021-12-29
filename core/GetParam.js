import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { getParam } from '../lib/param';
import { useRos } from '../lib/ros'

const ParamContext = createContext(null);

const defaultProps = {
    param: {
        name: ""
    },
    toggler: false,
}

export const GetParam = (props = defaultProps) => {
    
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

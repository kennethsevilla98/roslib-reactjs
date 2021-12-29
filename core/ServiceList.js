import React, {createContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { useRos } from '../lib/ros';
import { getServices } from '../lib/service'

const ServicesContext = createContext([])

const failedCallback = (msg) => {
    console.log(msg);
}

const defaultProps = {
    toggler: false,
}

export const ServiceListProvider = (props = defaultProps) => {

    const ROS = useRos();

    const [serviceList, setServiceList] = useState([])

    const callback = (result) => {
        setServiceList(result);
        console.log(result);
    }

    useEffect(() => {
        if (props.toggler || props.toggler === undefined) {
            getServices( ROS, callback, failedCallback);
        }
    }, [props.toggler]);

    return (
        <ServicesContext.Provider value={serviceList}>
            {props.children}
        </ServicesContext.Provider>
    );
}

ServiceListProvider.propTypes = {
    children: PropTypes.node,
    toggler: PropTypes.bool,
}

export const useServiceList = () => {
    const context = useContext(ServicesContext);
    if (context === undefined) {
        throw new Error('useServiceList must be used within a ServiceListProvider');
    }
    return context;
}
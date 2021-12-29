import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRos } from '../lib/ros';
import { callService, serviceSettings } from '../lib/service';

const ServiceCaller = props => {

    const name = props.name;
    const type = props.type;
    const toggler = props.toggler;
    const callback = props.callback;
    const failedCallback = props.failedCallback
    const values = props.values || {};

    const ROS = useRos();

    useEffect(() => {
        if (toggler) {
            callService(
                serviceSettings(ROS, name, type), 
                values, 
                callback, 
                failedCallback
            );
        }
    }, [toggler])

    return (
        <Fragment />
    )
}

ServiceCaller.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    failedCallback: PropTypes.func.isRequired,
    toggler: PropTypes.bool,
    values: PropTypes.object,
}

export default ServiceCaller

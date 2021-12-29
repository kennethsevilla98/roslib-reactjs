import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRos } from '../lib/ros';
import { callService, serviceSettings } from '../lib/service';

/**
 * 
 * @param props 
 * @param props.name
 * @param props.type
 * @param props.toggler
 * @param props.callback
 * @param props.failedCallback
 * @param props.request 
 */

const ServiceCaller = (props) => {

    const name = props.name;
    const type = props.type;
    const toggler = props.toggler;
    const callback = props.callback;
    const failedCallback = props.failedCallback
    const request = props.request || {};

    const ROS = useRos();

    useEffect(() => {
        if (toggler) {
            callService(
                serviceSettings(ROS, name, type), 
                request, 
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
    callback: PropTypes.func,
    failedCallback: PropTypes.func,
    toggler: PropTypes.bool,
    request: PropTypes.object,
}

export default ServiceCaller

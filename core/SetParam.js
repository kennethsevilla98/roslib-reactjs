import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { setParam } from '../lib/param';
import { useRos } from '../lib/ros';

const SetParam = (props) => {
    
    const ROS = useRos();

    useEffect(() => {
        if (props.toggler && props.param && (typeof props.param.name === "string") && (props.param.name !== '')) {
            setParam(ROS, props.param.name, props.param.value, () => {
                console.log(`Parameter "${props.param.name}" set to: ${props.param.value}`)
            });
        }
    }, [props.toggler, props.param])
    
    return (
        <Fragment />
    )
}

SetParam.propTypes = {
    param: PropTypes.object.isRequired,
    toggler: PropTypes.bool,
}

export default SetParam;

import React, {Fragment, useEffect} from "react";
import PropTypes from 'prop-types';
import { useRos } from "./ros";

const ROSConnect = (ros, url) => {
    ros.connect(url);
};

const ROSConnectSetting = (ros, url, autoconnect, autoconnectTimeout) => {
    
    ros.on('connection', () => { 
        console.log("Connection opened");
    });
    
    ros.on('close', () => {
        console.log("Connection closed");
    });
    
    ros.on('error', () => {
        console.log("Error connecting")
        if (autoconnect) {
            setTimeout(() => {
                ROSConnect(ros, url);
            }, autoconnectTimeout);
        }
    });
};

const ROSClose = (ros) => {
    ros.close();
};

export const Connection = (props) => {

    const ROS = useRos();

    useEffect(() => {
        ROSConnectSetting(ROS, props.url, props.autoconnect, props.timeout);
        ROSConnect(ROS, props.url)
        return () => {
            ROSClose(ROS);
        }
    }, []);

    return (
        <Fragment />
    )
}

Connection.propTypes = {
    url: PropTypes.string,
    autoconnect: PropTypes.bool,
    timeout: PropTypes.number,
}
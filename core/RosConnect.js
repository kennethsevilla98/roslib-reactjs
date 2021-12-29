import React from 'react';
import PropTypes from 'prop-types';
import { RosProvider } from '../lib/ros';
import { Connection } from '../lib/connection';

const defaultProps = {
    timeout: 1000,
    autoconnect: false,
    url: "ws://localhost:9090",
}

export const RosConnect = (props = defaultProps) => {

    const timeout = props.timeout;
    const autoconnect = props.autoconnect;
    const url = props.url;

    return (
        <RosProvider>
            <Connection url={url} autoconnect={autoconnect} timeout={timeout} />
            {props.children}
        </RosProvider>
    )
}

RosConnect.propTypes = {
    children: PropTypes.node,
    url: PropTypes.string,
    autoconnect: PropTypes.bool,
    timeout: PropTypes.number,
}

export default RosConnect;

import React from 'react';
import PropTypes from 'prop-types';
import { RosProvider } from './ros';
import { Connection } from './connection';

export const RosConnect = (props) => {

    const timeout = props.timeout || 1000;
    const autoconnect = props.autoconnect || false;
    const url = props.url || "ws://localhost:9090";

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

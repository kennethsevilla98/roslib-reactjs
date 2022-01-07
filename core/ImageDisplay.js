import React from 'react'
import PropTypes from 'prop-types'

const ImageDisplay = props => {

    const {host, port, topic, defaultTransport, transport, height, width, quality, img_width, img_height} = props;

    const defTrans = defaultTransport || "raw";
    const trans = transport || "mjpeg";
    const pport = port || 8080;
    const hhost = host || "http://localhost";
    const qual = ((typeof quality === "number") && (quality <= 100) && (quality >= 1)) ? (quality || 95) : 95;

    const srcString = (trans === "mjpeg") ? 
    `${hhost}:${pport}/stream?topic=${topic}&default_transport=${defTrans}&type=${trans}&width=${img_width}&height=${img_height}&quality=${qual}` : 
    `${hhost}:${pport}/stream?topic=${topic}&default_transport=${defTrans}&type=${trans}&width=${img_width}&height=${img_height}`;

    return (
        <img src={`${srcString}`} width={`${width}`} height={`${height}`}></img>
    )
}

ImageDisplay.propTypes = {
    host: PropTypes.string,
    port: PropTypes.number,
    topic: PropTypes.string.isRequired,
    transport: PropTypes.string,
    img_width: PropTypes.number.isRequired,
    img_height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    defaultTransport: PropTypes.string,
}

export default ImageDisplay;

import React, {useEffect, useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { useRos } from '../lib/ros';
import { createPublisher, publish, removePublisher, topicSettings } from '../lib/topic';


/**
 * 
 * @param props
 * @param props.name
 * @param props.type
 * @param props.rate
 * @param props.autoRepeat
 * @param props.message
 * @param props.queue_size
 */

const Publisher = (props) => {

    const ROS = useRos();
    const [publisher, setPublisher] = useState({});
    
    const [toggler, setToggler] = useState(false);
    const timeInterval = Math.floor(1000/props.rate);

    const queue_size = props.queue_size || 10;
    
    const initPub = () => {
        const settings = topicSettings(ROS, props.name, props.type, props.rate, queue_size);
        const topic = createPublisher(settings);
        setPublisher(topic);
    }

    const cleanPub = () => {
        removePublisher(publisher);
        setPublisher({});
    }

    useEffect(() => {
        initPub();
        return () => {
            cleanPub();
        }
    }, [])


    const msgPub = (msg) => {
        if (msg && Object.keys(publisher).length) {
            publish(publisher, msg)
        }
    }


    if (!props.autoRepeat) {
        
        useEffect(() => {
            msgPub(props.message);
        }, [props.message])
    
    } else {
        
        useEffect(() => {
            
            const timer = setTimeout(() => {
                msgPub(props.message);
                setToggler(!toggler);
            }, timeInterval)
            
            return () => {
                clearTimeout(timer)
            };

        }, [toggler]);
    }

    return (
        <Fragment />
    )
}

Publisher.propTypes = {
    message: PropTypes.object,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    autoRepeat: PropTypes.bool,
    publish_rate: PropTypes.number,
}

export default Publisher;
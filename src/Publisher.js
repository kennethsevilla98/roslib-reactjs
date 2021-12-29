import React, {useEffect, useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { useRos } from './ros';
import { createPublisher, publish, removePublisher, topicSettings } from './topic';

const Publisher = (props) => {

    const ROS = useRos();
    const [publisher, setPublisher] = useState({});
    
    const [toggler, setToggler] = useState(false);
    const timeInterval = Math.floor(1000/props.rate);

    
    const initPub = () => {
        const settings = topicSettings(ROS, props.name, props.type, props.rate);
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
    autoRepeat: PropTypes.bool,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
}

export default Publisher;
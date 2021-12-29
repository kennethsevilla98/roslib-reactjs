import React, {createContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { useRos } from '../lib/ros';
import { getTopics } from '../lib/topic'

const TopicsContext = createContext({})

const failedCallback = (msg) => {
    console.log(msg);
}

const defaultProps = {
    toggler: false,
};

export const TopicListProvider = (props = defaultProps) => {

    const ROS = useRos();

    const [topicList, setTopicList] = useState({})

    const callback = (result) => {
        setTopicList(result);
        console.log(result);
    }

    useEffect(() => {
        if (props.toggler || props.toggler === undefined) {
            getTopics( ROS, callback, failedCallback);
        }
    }, [props.toggler]);

    return (
        <TopicsContext.Provider value={topicList}>
            {props.children}
        </TopicsContext.Provider>
    );
}

TopicListProvider.propTypes = {
    children: PropTypes.node,
    toggler: PropTypes.bool,
}

export const useTopicList = () => {
    const context = useContext(TopicsContext);
    if (context === undefined) {
        throw new Error('useTopicList must be used within a TopicListProvider');
    }
    return context;
}
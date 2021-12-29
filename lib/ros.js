import React, {createContext, useContext} from 'react';
import PropTypes from 'prop-types'
import { Ros } from 'roslib';

const RosContext = createContext({});

const RosInitialState = new Ros();

const RosProvider = (props) => {
  const ROS = RosInitialState;
  return (
    <RosContext.Provider value={ROS}>
      {props.children}
    </RosContext.Provider>
  );
}
 
RosProvider.propTypes = {
  children: PropTypes.node.isRequired,
}


const useRos = () => {

  const ROS = useContext(RosContext);
  if (ROS === undefined) {
    throw new Error('useRos must be used within a RosProvider');
  }

  return ROS;
}

export {RosProvider, useRos};
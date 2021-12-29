import { Param } from 'roslib';

export function getParams(ros, callback, failedCallback) {
    ros.getParams(callback, failedCallback);
}

export function getParam(ros, name, callback) {
    const param = new Param({ros: ros, name: name});
    param.get(callback);
}

export function setParam(ros, name, value, callback) {
    const param = new Param({ros: ros, name: name});
    param.set(value, callback);
}

export function deleteParam(ros, name, callback) {
    const param = new Param({ros: ros, name: name});
    param.delete(callback);
}
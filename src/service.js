import { Service, ServiceRequest } from "roslib";


export function getServices(ros, callback, failedCallback) {
    ros.getServices(callback, failedCallback);
}


export function serviceSettings(ros, name, type) {
    return {
        ros: ros,
        name: name,
        serviceType: type,
    }
}


export function callService(settings, values, callback, failedCallback) {
    const serv = new Service(settings);
    const req = new ServiceRequest(values);
    serv.callService(req, callback, failedCallback)
}


export function advertiseService(settings, callback){
    const serv = new Service(settings);
    serv.advertise(callback);
    return serv;
}


export function unadvertiseService(serv){
    serv.unadvertise();
}
import { Topic } from 'roslib';

export function getTopics(ros, callback, failedCallback) {
    ros.getTopics(callback, failedCallback);
}

export function topicSettings(ros, name, msgType, rate, queue_len, queue_size) {
    return {
      ros: ros,
      name: name,
      messageType: msgType,
      throttle_rate: rate,
      queue_length: queue_len || 0,
      queue_size: queue_size || 100,
    }
}

export function subscribe(settings, callback) {
    const topic = new Topic(settings);
    topic.subscribe(callback);
    return topic;
}

export function unsubscribe(topic, callback) {
    if (callback) {
        topic.unsubscribe(callback);
    } else {
        topic.unsubscribe();
    }
}

export function createPublisher(settings) {
    const topic = new Topic(settings);
    topic.advertise();
    return topic;
}

export function publish(topic, message) {
    topic.publish(message);
}

export function removePublisher(topic) {
    topic.unadvertise();
}
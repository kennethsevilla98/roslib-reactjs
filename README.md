# The roslib-reactjs package

A collection of context providers for creating GUI with ReactJS and React Native

Available components:

1) RosConnect
2) Subscriber
3) Publisher
4) ServiceCaller
5) ServiceServer
6) GetParam
7) SetParam
8) DeleteParam
9) TopicList
10) ServiceList
11) ParamList

Available hooks:

1) useMsg
2) useParam
3) useTopicList
4) useServiceList
5) useParamList

## Components

### 1- RosConnect

*Wrapper that makes websocket topic, services and parameters data available to your components.*

**Props:**

- url - *string* - websocket url string.
- autoconnect - *bool* - specify if you want to recover connection automatically. Retry interval specified by timeout prop
- timeout -  *number* - specify time interval to retry connecting in ms.

**Example:**

    <RosConnect
        url="ws://localhost:9090"
        autoconnect
        timeout={1000}
    >
        <ChildrenThatNeedWebsocket...>
    </RosConnect>

### 2- Subscriber

*Wrapper that makes topic messages available in children components using the useMsg() hook. Must be used within a RosConnect.*

**Props:**

- name - *string* - topic name - REQUIRED. Example: "/myTopicName"
- type - *string* - message type - REQUIRED. Example: "std_msgs/Int32"
- rate -  *number* - rate at which to throttle the topic - REQUIRED.
- queue_size - *number* - queue_size for message at bridge side - default = 10.

**Example:**

    <Subscriber
        name="/myTopicName"
        type="std_msgs/Int32"
        rate={10.0}
        queue_size={10}
    >
        <ChildrenWithUseMsgHook...>
    </RosConnect>

Inside the child component `<ChildrenWithUseMsgHook>` you just need to use:

    const message = useMsg();

React will trigger a re-render of the child component every time that a new message is received. The message object has the same fields as declared in the ROS .msg file for that kind of message.

### 3- Publisher

*A component that can publish a message to a topic on demand or at a given rate. Must be used within a RosConnect.*

**Props:**

- name - *string* - topic name - REQUIRED. Example: "/myTopicName"
- type - *string* - message type - REQUIRED. Example: "std_msgs/Int32"
- autoRepeat - *bool* - if True, publish message at rate specified by prop "rate". Else, (default) it will publish a message only when the prop "message" change.
- rate -  *number* - rate for publishing if autoRepeat is true - REQUIRED.
- queue_size - *number* - queue_size for message at bridge side - default = 10.
- message - *object* - the message to publish.

**Example:**

    <Publisher
        name"/myTopicName"
        type="std_msgs/Int32"
        autoRepeat
        rate={10.0}
        queue_size={1}
        message={{data: someFunc()}}
    />

### 4- ServiceCaller

*A service proxy that can be triggered by the "toggler" prop. Must be used within a RosConnect.*

**Props:**

- name - *string* - service name - REQUIRED. Example: "/sayHelloToWebsocket"
- type - *string* - service type - REQUIRED. Example: "/custom_msgs/myService"
- request - *object* - the request object as specified in the .srv file definition.
- toggler -  *bool* - each time toggler changes and its value is "true", the service will be called.
- callback - *func* - an optional callback that will be executed if a response is returned. Takes the response object, with field "values" as the first argument.
- failedCallback - *func* - an optional callback that will be executed if no response is received. It takes an input, usually a message from the server.

**Example:**

    <ServiceCaller
        name"/myService"
        type="custom_msgs/customService"
        request={{command: "say hi!"}}
        callback={(response) => {console.log(response.values)}}
        failedCallback={(msg) => {console.log(msg)}}
        toggler={statefulBoolean}}
    />

Check the source code in the "core" folder of the Github repo for other Component props and usage.

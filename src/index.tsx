import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import * as createLogger  from 'redux-logger'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './containers/App';


const middleware = [thunk]

var hack: any = createLogger();
middleware.push(hack);


const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

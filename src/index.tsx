import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import * as createLogger  from 'redux-logger'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './containers/App';


const middleware = [thunk, createLogger()]

// this is a bit hacky - not sure how to cast (<any>window) without JSX getting upset

const store = createStore(
    reducer,
    compose(applyMiddleware(...middleware),
        (window as any).devToolsExtension ? (window as any).devToolsExtension() : f => f)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

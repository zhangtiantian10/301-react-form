import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import registerServiceWorker from './registerServiceWorker';
import './style/index.css';

import reducer from "./reducer";
import Paper from './Paper'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

ReactDom.render(
    <Provider store={store}>
        <Paper/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

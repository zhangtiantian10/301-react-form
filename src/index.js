import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import registerServiceWorker from './registerServiceWorker';
import './style/index.css';

import reducer from "./reducer";
import Paper from './Paper'

const store = createStore(reducer)

ReactDom.render(
    <Provider store={store}>
        <Paper/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

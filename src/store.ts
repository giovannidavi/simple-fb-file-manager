import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'regenerator-runtime/runtime';
import reducer from './store/reducers';
import { rootSagas } from './store/sagas/rootSagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

export default createStore(reducer, composeWithDevTools(middleware));

sagaMiddleware.run(rootSagas);

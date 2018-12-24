import { AsyncStorage } from 'react-native';
import {
  connectRouter,
  routerMiddleware,
  RouterState
} from 'connected-react-router';
import * as History from 'history';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Store
} from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

export interface ApplicationState {
  router: RouterState;
}

export default (history: History.History): Store<ApplicationState> => {
  const composeEnhancers = __DEV__
    ? composeWithDevTools({ realtime: true })
    : compose;

  const middleware = composeEnhancers(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk)
  );

  const rootReducer = combineReducers<ApplicationState>({
    router: connectRouter(history)
  });

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: []
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return createStore(persistedReducer, middleware);
};

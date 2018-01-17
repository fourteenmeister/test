import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotLoaderAppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';
import MainContainer from './containers/MainContainer';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <HotLoaderAppContainer>
        <Component />
      </HotLoaderAppContainer>
    </Provider>,
    document.getElementById('app'),
  );
};

render(MainContainer);

if (module.hot) {
  module.hot.accept('./containers/MainContainer', () => {
    render(MainContainer);
  });
}

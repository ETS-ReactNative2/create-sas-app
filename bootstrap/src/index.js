import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {getStore} from './store'
import ActionTypes from './pages/home/ActionTypes'

export const store = getStore();

const RootApp = () => (<Provider store={store}>
	<Router>
		<App/>
	</Router>
</Provider>)

ReactDOM.render(RootApp(), document.getElementById('root'));


const setOffline = (state) => {
	store.dispatch({
		type: ActionTypes.SET_OFFLINE,
		state
	})
}
window.addEventListener('load', () => {

	function checkNetworkStatus(event) {

		if (!navigator.onLine){
			setOffline(true);
		}
	}

	window.addEventListener('offline', checkNetworkStatus())

})

//The second addEventListener is for detecting the offline status while using the appliaction, the first one checks only for initial load
window.addEventListener('offline', () => {
	setOffline(true);
})

window.addEventListener('online', () => {
	setOffline(false);
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './screens/Login'
import HomePage from './screens/Home'
import CollectionPage from './screens/Collection'
import RegisterPage from './screens/Register'

const Index = ({pathname}) => {
	switch(pathname) {
		case "/":
			return <LoginPage />
        case "/home":
			return <HomePage />
        case "/collection":
            return <CollectionPage />
        case "/register":
            return <RegisterPage />
        default:
			return <LoginPage />
	}
}

let pathname = window.location.pathname;

ReactDOM.render(
	<Index pathname ={pathname} />,
	document.getElementById('root')
)

window.addEventListener("popstate", () => {
	pathname = window.location.pathname;
})
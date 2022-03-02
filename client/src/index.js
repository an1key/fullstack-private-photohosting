import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import PhotosStore from "./store/PhotosStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        photo: new PhotosStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);


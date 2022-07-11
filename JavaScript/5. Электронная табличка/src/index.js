import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeContext from "./context";

const Main = () => {
  console.log(JSON.parse(localStorage.getItem("Table")))
  const [TableArr, setTableArr] = useState(JSON.parse(localStorage.getItem("Table")) == null ? [[null]]: JSON.parse(localStorage.getItem("Table")))

  return(
    
    <React.StrictMode>
      <ThemeContext.Provider value = {{TableArr, setTableArr}}>
        <App />
      </ThemeContext.Provider>
  </React.StrictMode>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);


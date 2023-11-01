import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './Home/Home';
import Login from  './Login/Login';
import './App.css';

import { IntlProvider } from 'react-intl';
import messages_es from './location/es.json';
import messages_en from './location/en.json';

function App() {
  const locale = navigator.language;
  const messages = locale === 'es-ES' || locale === 'es' ? messages_es : messages_en;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
      </Router>
    </IntlProvider>
  );
}

export default App;

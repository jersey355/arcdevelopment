import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './ui/Header';
import theme from './ui/Theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <dive>Home</dive>} />
          <Route exact path="/services" component={() => <dive>Services</dive>} />
          <Route exact path="/customsoftware" component={() => <dive>Custom Software</dive>} />
          <Route exact path="/mobileapps" component={() => <dive>Mobile Apps</dive>} />
          <Route exact path="/websites" component={() => <dive>Websites</dive>} />
          <Route exact path="/revolution" component={() => <dive>The Revolution</dive>} />
          <Route exact path="/about" component={() => <dive>About Us</dive>} />
          <Route exact path="/contact" component={() => <dive>Contact Us</dive>} />
          <Route exact path="/estimate" component={() => <dive>Free Estimate</dive>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

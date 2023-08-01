import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PageIndex from "./pages/index";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      active: false
    };
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={PageIndex} />
      </Switch>
    )
  }
}

export default App

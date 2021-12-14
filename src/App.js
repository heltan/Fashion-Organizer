import React, {Component} from 'react';
import './App.css';
//hot loader will auto update whenever i save stuff here
import {hot} from "react-hot-loader";
//import components
import AddNew from './components/AddNew.jsx';
import Closet from './components/Closet.jsx';
import Outfits from './components/Outfits.jsx';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //save input from form into the state on submit
  saveFormInfo (form) {
    console.log('form', form);

  }
  render() {
    return (
<div>
<h1>Closet Organizer</h1>
<div id='addNew'>
<AddNew/>
</div>
<div id='closet'>
<Closet/>
</div>

{/* did not have time to implement adding/creating outfits */}
{/* <Outfits/> */}
</div>



    )
  }
}

export default hot(module)(App);
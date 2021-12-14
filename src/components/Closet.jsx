import React from 'react';

const axios = require('axios');

//this handles our closet module
class Closet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //clothing is the div that displays
      clothing:[],
      //clothing info is the array of objects of clothing
      clothingInfo: [],
      currentView: 'all',
      brands: [],
      brandForm: '',
      currentChecks: {},
    }
    this.displayClothing = this.displayClothing.bind(this);
    this.showBrandSelection = this.showBrandSelection.bind(this);
    this.brandFormOnSubmit = this.brandFormOnSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.queryAll = this.queryAll.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  //handles the brandForm checkbox
  handleCheck (input) {
    let checked = input.target.checked;
    let brand = input.target.value;
    let currentChecksCopy = this.state.currentChecks;
    if (!checked) {
      currentChecksCopy[brand]= false
    } else {
      currentChecksCopy[brand]= true;
    }
    this.setState({currentChecks: currentChecksCopy});
  }
  //this function handles the brandForm onsubmit
  brandFormOnSubmit(e) {
    e.preventDefault();
    console.log('brand form on submit');
    //when we submit, we want to view only the brands we selected
    let checkedBrands = this.state.currentChecks;
    //remove all the keys that point to false
    let brands = [];
    for (let elem in checkedBrands) {
      if (checkedBrands[elem]) {
        brands.push(elem);
      }
    }
    //make a post request with the brands
    let url = 'http://localhost:3001/brands';
    axios({
      method: 'POST',
      url: url,
      data: brands
    }).then(response => {
      let brandsResult = response.data;
      //now we will put this into our this.state.clothing to show
      //need to run display after setstate updates
      console.log('brands result clost', brandsResult)
      this.setState({clothingInfo: brandsResult});
      this.displayClothing('brand');
    })
    //we  want to remove the form from view on click
    this.setState({brandForm: ''});
    //clear the current checks
    this.setState({currentChecks: {}});
  }
  //this function handles letting the user select the brands they want to see
  showBrandSelection () {
    //we want to display a form with selection type of brands
    let currentBrands = this.state.brands;
    let brandSelection  = currentBrands.map(x=> {
      return (<div>
        <input type= 'checkbox' name={x} value={x} onChange = {this.handleCheck} key={x._id}></input>
        <label key={x}>{x}</label>
        </div>);
    });
    let brandForm = <form id='brandForm' key= {'brandform'} onSubmit= {this.brandFormOnSubmit}>{brandSelection}<input type='submit' value='Search By Brand'/></form>
    this.setState({brandForm})

  }
  //this function handles querying the database for ALL clothing and returning result
  queryAll() {
    let url = 'http://localhost:3001/clothing';
    axios({
      method: 'GET',
      url: url,
    }).then(response => {
      //our data will be here
      let data = response.data;
      //how create html div with this info
      let newDiv = [];
      //also grab all the brands we have and put into here
      let allBrands = [];
      data.forEach((x) =>{
        newDiv.push(<p key={x._id}> {x.name}; {x.type} by <b>{x.brand}.</b> <i>{x.description}</i><button type='button' onClick = {() => {
          this.removeItem(x)
        }}>Delete</button></p>);
        if (!allBrands.includes(x.brand)) {
          allBrands.push(x.brand);
        }

      })
      this.setState({brands: allBrands});
      this.setState({clothing: newDiv});

      //this.displayClothing(this.state.currentView);
    })
  }
  //handles deleting the record
  removeItem (item) {
    console.log('removing item', item);
    //then make post request to the server delete endpoint with axios
    let url = 'http://localhost:3001/remove';
    axios({
      method: 'POST',
      url: url,
      data: item
    }).then(response => {
 //then update brands and clothing div
 let currentDisplay = this.state.currentView;
 this.displayClothing(currentDisplay);
    });

  }


  //this function handles getting certain clothing records and displaying
  displayClothing (display) {
    if (display === 'brand') {
      console.log('brand')
      this.setState({currentView: 'brand'});
      //now make get the brands info from setstate
      let brands = this.state.clothingInfo;
      let newDiv = [];
      //add a delete button
      brands.forEach((x) =>{
        newDiv.push(<p key={x._id}> {x.name}; {x.type} by <b>{x.brand}</b>. <i>{x.description}</i><button type='button' onClick = {() => {
          this.removeItem(x)
        }}>Delete</button></p>);

      });
      this.setState({clothing: newDiv})

    }
   else if (this.state.currentView === 'all' || display === 'all') {
     //we  want to remove the form from view on click
    this.setState({brandForm: ''});
      //now get all the records in our closet with a get request to /clothing
      this.queryAll();
    }

  }
  //on load we just want to display all the stuff in our db
  componentDidMount() {
    this.displayClothing();
  }

  render(){
    return(
      <div id='closet'>
        <h1>Closet</h1>
        <div className ="btn-group">
          <button onClick = {() => {this.displayClothing('all')}} >View All</button>
          <button onClick = {this.showBrandSelection}>View By Brand</button>
          {/* did not have time to implement view by type */}
          {/* <button>View By Type</button> */}
        </div>
        <div id='brandsSelection'>
          {this.state.brandForm}
        </div>
        <div id='closetView'>
          {this.state.clothing}
        </div>


      </div>
    );
  }
}


export default Closet;
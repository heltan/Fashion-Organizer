import React from 'react';
const axios = require('axios');
class AddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      brand: '',
      description: '',
      type: ''
    }
    this.updateFormInfo = this.updateFormInfo.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  //this saves form info to state
  updateFormInfo (form) {
    //first handle drop down info
    let selection = document.getElementById('type').value;
    this.setState({type: selection});
    let text = form.target.value;
    let name = form.target.name;
    if (name === 'name') {
      this.setState({
        name: text
      });
    } else if (name === 'brand') {
      this.setState({
        brand: text
      })
    } else if (name === 'description') {
      this.setState({
        description: text
      })
    }
    //now we want to update our closet
  }
  //handles submission of form and will save this to our db
  submitForm (form) {
    form.preventDefault();
    let postData = this.state;
    //we want to make a post request to save this info into our db
    let url = 'http://localhost:3001/save'
    console.log('data we are posting with axios', postData)
    axios({
      method: 'post',
      url: url,
      data: postData,

    }).then(response => {
      console.log('response from axios', response)
    })
  }
  render (){
    return (
      <div id='myform'>
     <form onSubmit = {this.submitForm} key={'mainform'}>
     <label>
         Type:
         <select name='type' id='type'>
           <option value='blouse-cutsew'>Blouse/Cutsew</option>
           <option value='one-piece'>JSK/One-piece</option>
           <option value='accessory'>Accessory</option>
           <option value='shoes'>Shoes</option>
         </select>
       </label>
       <br></br>
       <label>
         Name:
         <input type="text" name="name" defaultValue= '' onChange = {this.updateFormInfo}></input>
       </label>
       <br></br>
       <label>
         Brand:
         <input type="text" defaultValue='' name="brand" onChange = {this.updateFormInfo}></input>
       </label>
       <br></br>
       <label>
         Description:
         <textarea type="text" defaultValue='' name="description" onChange = {this.updateFormInfo}></textarea>
       </label>
       <br></br>
       <input type="submit" value="Add New Piece"></input>
     </form>
     </div>
    );
  }

}

export default AddNew;
module.exports
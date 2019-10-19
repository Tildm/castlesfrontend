import React, {Component} from "react";

class CastleForm extends Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

    this.state = {name: "",
                  image: "",
                  text: ""
                  };

  }

  handleChange(e){
     this.setState({
       // name: e.target.value,
       // image: e.target.value
       [e.target.name]: e.target.value
     })
   }


  handleSubmit(){
    this.props.addCastle(this.state.name,
                         this.state.image,
                         this.state.text
    );
    this.setState = ({name: "",
                           image: "",
                           text: ""
                          });
  }

  render() {
    return(
    <form onSubmit={this.handleSubmit}>
      <input type = "text"
      name="name"
      placeholder="Castle"
      value={this.state.name}
      onChange={this.handleChange}
      />
      <input type = "text"
      name="image"
      placeholder="Castle Image"
      value={this.state.image}
      onChange={this.handleChange}
      />
      <p>
      <textarea maxlength="350" rows="9" cols="43"
      name="text"
      placeholder="About the casstle, maxlength: 350"
      value={this.state.text}
      onChange={this.handleChange}
      />
      </p>
      <button>Add New Item</button>
    </form>
    )
  }

}

export default CastleForm;

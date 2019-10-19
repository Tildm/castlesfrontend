import React, {Component} from "react";
import CastleItem from "./CastleItem";
import CastleForm from "./CastleForm";
import "./CastleItem.css"


const APIURL = "/castles/";


class CastleList extends Component{
  constructor(props){
    super(props);
    this.state={
      castles: [],

    }
    this.addCastle=this.addCastle.bind(this);

  }
  componentDidMount(){
    this.loadCastles()
  }

loadCastles(){
  fetch(APIURL)
  .then(resp=> {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: "Please try again later!"}
        throw err;
      }
    }

  return resp.json();
  })
  .then(castles => this.setState({castles}));
}

addCastle(name, img, text){
  fetch(APIURL, {method:"post",
                 headers: new Headers({
                   "Content-Type": "application/json",
                 }),
                 body: JSON.stringify({name: name, image: img, text: text})
  })
  .then(resp=> {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: "Please try again later!"}
        throw err;
      }
    }
  return resp.json();
  })
  .then(newCastle => {
    this.setState({castles: [...this.state.castles, newCastle]});
  })
}

deleteCastle(id){
  const deleteUrl = APIURL + id;
  fetch(deleteUrl, {
    method:"delete",
  })
  .then(resp=> {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: "Please try again later!"}
        throw err;
      }
    }
  return resp.json();
  })
  .then(() => {
    const castles = this.state.castles.filter(castle => castle._id !== id)
    this.setState({castles: castles});
  })
}

updateCastle(castle){
  const updateUrl = APIURL + castle._id;
  fetch(updateUrl, {
    method:"put",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(),


  })
  .then(resp=> {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: "Please try again later!"}
        throw err;
      }
    }
  return resp.json();
  })
  .then(updatedCastle => {
    const castles = this.state.castles.map(c =>
      (c.id === updatedCastle._id)
      ? {...c}: c
    )
    this.setState({castles: castles});
  })
}
  render(){
    const castles = this.state.castles.map((c) => (
      <CastleItem
        key={c._id}
        {...c}
        onDelete={this.deleteCastle.bind(this, c._id)}
        updateCastle={this.updateCastle.bind(this, c._id)}

      />
    ));
    return(

      <div>

      <h1>Castle List</h1>
      <div className="castleForm">
        <CastleForm addCastle={this.addCastle} />
      </div>

      <ul>
      {castles}

      </ul>
      </div>

    )
  }
}

export default CastleList;

import React, {Component} from "react";
import CastleItem from "./CastleItem";
import CastleForm from "./CastleForm";
import "./CastleItem.css"
import * as apiCalls from "./api";




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

async loadCastles(){
  let castles = await apiCalls.getCastles();
  this.setState({castles});
}

async addCastle(name, img, text){
  let newCastle = await apiCalls.createCastle(name, img, text)
  this.setState({castles: [...this.state.castles, newCastle]});
}

async deleteCastle(id){
  await apiCalls.removeCastle(id);
  const castles = this.state.castles.filter(castle => castle._id !== id)
    this.setState({castles: castles});
}

async updateCastle(castle){
  let updatedCastle = await apiCalls.updateCastle(castle);
  const castles = this.state.castles.map(c =>
      (c.id === updatedCastle._id)
      ? {...c}: c
    )
    this.setState({castles: castles});
  }

  render(){
    const castles = this.state.castles.map((c) => (
      <CastleItem
        key={c._id}
        {...c}
        onDelete={this.deleteCastle.bind(this, c._id)}
        updateCastle={this.updateCastle.bind(this, c)}
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

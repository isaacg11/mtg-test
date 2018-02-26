import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import {Grid, Row, Cell} from 'react-inline-grid';
import Styles from '../styles'
let key = 0
const mtg = require('mtgsdk')
const coverImg = require('../tap.png')

class HomePage extends React.Component{

  state = {
    cardInfo: '',
    returnedCards: [],
    query: '',
    category: 'name',
    payload: null
  }

  componentDidMount() {
    const authToken = localStorage.getItem('token');
    const payload = (authToken) ? JSON.parse(window.atob(authToken.split('.')[1])) : null;
    this.setState({payload: payload})
  }

  setValue(e) {
  this.setState({[e.target.name]: e.target.value})
  }

  getCards(e) {
    e.preventDefault();
    mtg.card.where({ [this.state.category]: this.state.cardInfo }).then((result) => {
      let returnedCards = result.map(card =>
        <div key={key++} style={Styles.arial}>
          <h4>{card.name}</h4>
          <img src={card.imageUrl} />
          <div>
            <Button onClick={()=> this.saveCard(card)} color="danger" >Add to Collection</Button>
          </div>
        </div>
      );
      this.setState({returnedCards: returnedCards});
    })
  }

  saveCard(card) {
    card.userId = this.state.payload.id;
    axios.post('/cards', card).then(() => {
      alert('Card added!')
    })
  }

  render() {
    return(
      <div style={Styles.bgColor}>
        <Grid>
          <Row>
            <Cell is="desktop-12" style={Styles.arial}>
              <a href="https://tappedmtg.herokuapp.com/home">Home  </a>
              <a href="https://tappedmtg.herokuapp.com/collection">Collection</a>
              <h1 style={Styles.listColor}>Tapped</h1>
              <p>A Magic: the Gathering Collection Gallery</p>
              <h1>
                <img src={coverImg}/>
              </h1>
            </Cell>
          </Row>
        </Grid>

        <Grid>
          <Row>
            <Cell is="desktop-12" style={Styles.pageFooter} >
              <form onSubmit={(e) => this.getCards(e)}>

                <select value={this.state.category} onChange={(e)=> this.setValue(e)} name="category">

                  <option value="name" >Name</option>
                  <option value="cmc" >Converted Mana Cost</option>
                  <option value="colors" >Color</option>
                  <option value="type" >Type</option>
                  <option value="subtypes" >Subtypes</option>
                  <option value="power" >Power</option>
                  <option value="toughness" >Toughness</option>
                </select>
                <input
                  name="cardInfo"
                  type="text"
                  placeholder="search..."
                  onChange={(e) => this.setValue(e)}
                />
                <div>
                  <Button color="danger" type="submit" >Submit</Button>
                </div>
              </form>
            </Cell>
          </Row>
        </Grid>

          <ul>
            {this.state.returnedCards}
          </ul>
      </div>

    )
  }
}

export default HomePage;
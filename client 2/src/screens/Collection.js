import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import {Grid, Row, Cell} from 'react-inline-grid';
import Styles from '../styles'
let key = 0
const mtg = require('mtgsdk')

class CollectionPage extends React.Component{

  state = {
    payload: null,
    myCards: []
  }
  

  deleteCard(e, id) {
    const authToken = localStorage.getItem('token');
    const payload = (authToken) ? JSON.parse(window.atob(authToken.split('.')[1])) : null;
    axios.delete(`/cards/${id}`).then((res) => {
      alert('card removed from collection.')
    })
  }

  componentDidMount() {
    const authToken = localStorage.getItem('token');
    const payload = (authToken) ? JSON.parse(window.atob(authToken.split('.')[1])) : null;
    axios.get(`/cards/${payload.id}`).then((res) => {
      console.log(res)
      if(res !== null){
        let myCards = res.data.map(card =>
          <div key={key++} style={Styles.arial}>
            <h4>{card.name}</h4>
            <img src={card.imageUrl} />
            <div>
              <Button onClick={(e) => this.deleteCard(e, card._id)} color="danger">Remove from Collection</Button>
            </div>
          </div>
        );
        this.setState({myCards: myCards});
      }
      
      
    })
  }
  

  render() {
    return(
        <div style={Styles.bgColor}>
          <a style={Styles.arial} href="https://tappedmtg.herokuapp.com/home">Home  </a>
          <a style={Styles.arial} href="https://tappedmtg.herokuapp.com/collection">Collection</a>
          <ul>
            {this.state.myCards}
          </ul>
        </div>
    )
  }
}

export default CollectionPage;
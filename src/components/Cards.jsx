import React, {useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios' ;
import Moment from 'react-moment';
import Columns from 'react-columns';



const Cards = () => {

  const [Latest ,setLatest] = useState([]);
  const [Result ,setResult] = useState([]);



  
  useEffect(() => {
    axios
    .all([
    axios.get("https://corona.lmao.ninja/v2/all"),
    axios.get("https://corona.lmao.ninja/v2/countries?sort=country"),
    ])

    .then( resArr => {
      setLatest(resArr[0].data);
      setResult(resArr[1].data);
    })
    .catch( err => {
      console.log(err)
    })

  },[]);


  const date = new Date(parseInt(Latest.updated));
  const lastUpdated = date.toString();
 

  const countries = Result.map( (data, i) => {
  return (
    <Card 
    key ={i}
    bg="light" 
    text="dark"
    className="text-center"
    style={{margin:"10px"}}
    >
    <Card.Body>
      <Card.Img variant="top" src={data.countryInfo.flag} />
  <Card.Title>{data.country}</Card.Title>
      <Card.Text>Total Cases {data.cases}</Card.Text>
      <Card.Text>Total Deaths {data.deaths}</Card.Text>
      <Card.Text>Total Recoverd {data.recovered}</Card.Text>
      <Card.Text>Total Active {data.active}</Card.Text>
      <Card.Text>Total Critical {data.critical}</Card.Text>


    </Card.Body>
    
  </Card>

  );
});

var queries = [{
  columns: 2,
  query: 'min-width: 500px'
}, {
  columns: 3,
  query: 'min-width: 1000px'
}];


  
  
  
  return (
    <div>
        <CardDeck>
  <Card 
    bg="secondary" 
    text="white"
    className="text-center"
    style={{margin:"10px"}}
    >
    <Card.Body>
      <Card.Title>Total Cases</Card.Title>
      <Card.Text>
      {Latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
  <small>Last Updated-
 <Moment format="DD/MM/YYYY">
           {lastUpdated}
            </Moment>
            </small>
    </Card.Footer>
  </Card>
  <Card 
    bg="danger" 
     text="white"
    className="text-center"
    style={{margin:"10px"}}
    >
    <Card.Body>
      <Card.Title>Total Deaths</Card.Title>
      <Card.Text>
       {Latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <small>Last Updated-
 <Moment format="DD/MM/YYYY">
           {lastUpdated}
            </Moment>
            </small>    </Card.Footer>
  </Card>
  <Card
   bg="success" 
   text="white" 
   className="text-center"
   style={{margin:"10px"}}
   >
    <Card.Body>
      <Card.Title>Total Recovered</Card.Title>
      <Card.Text>
      {Latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <small>Last Updated-
 <Moment format="DD/MM/YYYY">
           {lastUpdated}
            </Moment>
            </small>
    </Card.Footer>
  </Card>
</CardDeck>
<Columns  queries={queries}>{countries}</Columns>

    </div>
  )
}

export default Cards;

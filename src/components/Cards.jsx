import React, {useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios' ;
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
// import Columns from 'react-columns';








const Cards = () => {

  




  const [Latest ,setLatest] = useState([]);
  const [Result ,setResult] = useState([]);
  const [SearchCountries ,setSearchCountries] = useState("");
  const [Loading , setLoading] = useState(false);






  
  useEffect(() => {
    setLoading(true)
    axios
    .all([
    axios.get("https://corona.lmao.ninja/v2/all"),
    axios.get("https://corona.lmao.ninja/v2/countries?sort=country"),
    ])

    .then( resArr => {
      setLatest(resArr[0].data);
      setResult(resArr[1].data);
      setLoading(false)
    })
    .catch( err => {
      console.log(err)
    })

  },[]);


  const date = new Date(parseInt(Latest.updated));
  const lastUpdated = date.toString();


  const filterCountries = Result.filter(item => {
    return SearchCountries !== "" ? item.country.includes(SearchCountries) : item;


});
 

  const countries = filterCountries.map( (data, i) => {
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


const LoadingS = "Loading...";

if ( Loading)
{
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
      {LoadingS}
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
      {LoadingS}
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
      {LoadingS}
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
<Form>
  <Form.Group controlId="formGroupSearch" >
    <Form.Control 
    type="text"
    placeholder="Search Country Here"
    onChange={e=> setSearchCountries(e.target.value)}
    />
  </Form.Group>
</Form>



<CardColumns queries={queries}> {countries}</CardColumns>

    </div>
  )
;}
























  
  
  
    
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
      <Card.Text style={{fontSize:"30px"}}>
      <NumberFormat value={Latest.cases} displayType={'text'} thousandSeparator={true} />
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
      <Card.Text style={{fontSize:"30px"}}>
      <NumberFormat value={Latest.deaths} displayType={'text'} thousandSeparator={true} />
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
      <Card.Text style={{fontSize:"30px"}}>
      <NumberFormat value= {Latest.recovered} displayType={'text'} thousandSeparator={true} />

      
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
<Form>
  <Form.Group controlId="formGroupSearch" >
    <Form.Control 
    type="text"
    placeholder="Search Country Here"
    onChange={e=> setSearchCountries(e.target.value)}
    />
  </Form.Group>
</Form>



<CardColumns queries={queries}> {countries}</CardColumns>

    </div>
  )
}

export default Cards;

import React from "react";
import { Container, Navbar, Nav, NavItem, NavLink, NavbarBrand, Button, Card, CardTitle, CardImg, CardBody, Jumbotron } from "reactstrap";
import { Link, Route, Switch } from 'react-router-dom'
import PizzaForm from "./components/form";

const App = () => {
  return (
    <div>
    	<Navbar color="dark">
    		<NavbarBrand href="/">Lambda Eats</NavbarBrand>
    	</Navbar>
    	

    	<Switch>
    		<Route path="/pizza">
    			<PizzaForm />
    		</Route>
    		<Route path="/">
    			<Container>
		    		<Card>
		    			<CardImg src="./Pizza.jpg" />
		    			<CardBody>
		    				<CardTitle>Lambda Eats!</CardTitle>
			    			<Link to="/pizza">
			    			<Button>Get Started</Button>
			    			</Link>
		    			</CardBody>
		    		</Card>
		    	</Container>
    		</Route>
    	</Switch>
    	
    </div>
  );
};
export default App;

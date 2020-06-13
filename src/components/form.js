import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Button, Input, Container } from "reactstrap";
import * as yup from "yup";
import axios from "axios";

function PizzaForm (props){
	const [formState, setFormState] = useState({
		name: "",
		size: "small",
		pepperoni: false,
		sausage: false,
		onion: false,
		pepper: false,
		text: ""
	});

	const [errors, setErrors] = useState({
		name: "",
		size: "",
		pepperoni: "",
		sausage: "",
		onion: "",
		pepper: "",
		text: ""
	});

	const validateChange = event => {
		yup.reach(schema, event.target.name).validate(event.target.value).then(isValid => {
			setErrors({
				...errors,
				[event.target.name]: ""
			})
		}).catch(err =>{
			setErrors({
				...errors, [event.target.name]: err.errors[0]
				})
			})
	}

	const changeHandler = (event) => {
		event.persist();
		validateChange(event);
		setFormState({
			...formState,
			[event.target.name]: event.target.value
		});
	}

	const changeToppings = (event) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.checked
		});
	};

	const schema = yup.object().shape({
		name: yup.string().min(2).required("Name is required"),
		size: yup.string(),
		pepperoni: yup.boolean(),
		sausage: yup.boolean(),
		onion: yup.boolean(),
		pepper: yup.boolean(),
		text: yup.string()
	});

	useEffect(() => {
		schema.isValid(formState).then()
	}, [formState]);

	return(
		<Container>
			<Form onSubmit={(event) => {
				event.preventDefault();

				axios.post("https://reqres.in/api/users", formState).then(res => {
					console.log(res);

					setFormState({
						name: "",
						size: "small",
						pepperoni: false,
						sausage: false,
						onion: false,
						pepper: false,
						text: ""
					});
				})

				
			}}>
				<FormGroup>
					<Label>Name: </Label>
					<Input type="name" name="name" data-cy="name" value={formState.name} onChange={changeHandler} />
					{errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
				</FormGroup>
				<FormGroup>
					<Label>Size: </Label>
					<Input type="select" name="size" data-cy="size" value={formState.size} onChange={changeHandler}>
						<option>Small</option>
						<option>Medium</option>
						<option>Large</option>
					</Input>
					{errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
				</FormGroup>
				<FormGroup>
					<Label>
					<Input type="checkbox" name="pepperoni" data-cy="pepperoni" checked={formState.pepperoni} onChange={changeToppings} />
					pepperoni
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>
					<Input type="checkbox" name="sausage" data-cy="sausage" checked={formState.sausage} onChange={changeToppings} />
					sausage
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>
					<Input type="checkbox" name="onion" data-cy="onion" checked={formState.onion} onChange={changeToppings} />
					onion
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>
					<Input type="checkbox" name="pepper" data-cy="pepper" checked={formState.pepper} onChange={changeToppings} />
					bell pepper
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>Special instructions: </Label>
					<Input type="textarea" name="text" data-cy="text" value={formState.text} onChange={changeHandler} />
					{errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
				</FormGroup>
				<Button type="submit" data-cy="submit">Add to Order</Button>
			</Form>
		</Container>
	);
}

export default PizzaForm;
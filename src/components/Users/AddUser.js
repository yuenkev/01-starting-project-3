import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from '../UI/ErrorModal'
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  //array destructing
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    //check if the inputs have valid values
    if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      })
      return;
    }

    if(+enteredAge < 1){
      setError({
        title: 'Invalida age',
        message: 'Please enter a valid age (> 0).'
      })
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    setEnteredAge('');
    setEnteredUsername('');
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };


  const errorHandler = () => {
    setError(null);
  }

  return (
    <div>
    {error && <ErrorModal onHandleError={errorHandler} title={error.title} message={error.message} />}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        {/* To update form input value to have current snapshots of the state you must put <input value={stateValue}> so it updates */}
        <input
          type="text"
          id="username"
          value={enteredUsername}
          onChange={usernameChangeHandler}
        ></input>
        <label htmlFor="age">Age (Years)</label>
        <input type="number" id="age" value={enteredAge} onChange={ageChangeHandler}></input>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  );
};

export default AddUser;

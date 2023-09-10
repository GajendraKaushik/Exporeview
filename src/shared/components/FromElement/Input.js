import React,{useReducer, useEffect} from 'react'

import { validate } from '../../util/validators';
import './Input.css'

// we are creating this Reducer out side because it is not dependent on any component

const inputReducer = (state,action) =>{
    switch(action.type)  { // every action should have a type 
        case 'CHANGE' :
            return {
                ...state,
                value : action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':{
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;

    }
}

const Input = (props) =>{ 
    // in useReducer we apss the Reducer methos and initioal state of the component 
    const [inputState, dispatch] = useReducer(inputReducer,{
        value:'',
        isTouched:false,    // here we are passing the  initial state of the componente 
        isvalid:false
    });

    const {id, onInput} = props; // here we are destructuring the props 
    const {value,isValid} = inputState; 
    
    useEffect(() =>{
        onInput(id, value, isValid)

    }, [id, value, isValid, onInput])



    const changeHandler = (event) =>{
        dispatch({
            type: 'CHANGE', 
            val:event.target.value,
            validators:props.validators 
    })
    }

    const touchHandler = () =>{
        dispatch ({
            type: 'TOUCH'
        })
    }


    const element = props.element === 'input' ? (
        <input 
        id ={props.id}
        type ={props.type} 
        placeholder={props.placeholder} 
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}/>
    ) : (
        <textarea  
        id ={props.id} 
        rows={props.rows || 3} 
        onChange={changeHandler}
        onBlur={touchHandler} 
        value={inputState.value}/>
    )

    return <div className= {`form-control ${!inputState.isValid  && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.lable}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
}

export default Input;
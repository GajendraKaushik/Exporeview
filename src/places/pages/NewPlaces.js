import React, { useReducer, useCallback } from 'react';

import Input from '../../shared/components/FromElement/Input';
import Button from '../../shared/components/FromElement/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from'../../shared/util/validators'

import './NewPlaces.css'

const formReducer = (state, action) =>{
    switch (action.type){
        case 'INPUT_CHANGE':
            let fromIsValid = true
            for (const inputId in state.inputs){
                if(inputId === action.inputId){ 
                    fromIsValid = fromIsValid && action.isValid
                }else{
                fromIsValid = fromIsValid && state.inputs[inputId].isValid;
                }
            } 
            return {
               ...state,
               inputs:{
                ...state.inputs,
                [action.inputId]: {value:action.value, isValid:action.isValid}
                },
                isValid:fromIsValid
            }
        default:
            return state;
    }    
}

const NewPlaces = (props) => {
    const [formState, dispatch] = useReducer(formReducer,{
        input:{
            title:{
                value:'',
                isValid: false
            },
            description:{
                value:'',
                isValid: false
            }
        },
        isValid:false
    })

    const inputHandler = useCallback((id, value, isValid) =>{
        dispatch ({
            type:'INPUT_CHANGE',
            value:value,
            isValid:isValid,
            inputId:id
        })
    }, []) 

    const placeSubmitHandler = event => {
        event.preventDefault() ;
        console.log(formState.inputs); // we will sent this to backend 
    }
    
    return <form className ="place-form" onSubmit={placeSubmitHandler}>
       <Input
         id ="title"
         element ="input" 
         type="text" 
         lable="Title"  
         validators ={[VALIDATOR_REQUIRE()]} 
         errorText ="Please enter a valid title"  
         onInput = {inputHandler}
        />

       <Input
          id ="description"
          element ="textarea" 
          type="text" 
          lable="Description"  
          validators ={[VALIDATOR_MINLENGTH(5)]} 
          errorText ="Please enter a valid description( at least 5 characters ) "  
          onInput = {inputHandler}
        />
        <Input
          id ="address"
          element ="input" 
          lable="Address"  
          validators ={[VALIDATOR_REQUIRE()]} 
          errorText ="Please enter a valid address"  
          onInput = {inputHandler}
        />
        <Button type="submit" disable = {!formState.isValid}>
            ADD PLACE
        </Button>
    </form>
}

export default NewPlaces;
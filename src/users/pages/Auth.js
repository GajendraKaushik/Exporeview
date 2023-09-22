import React, {useState, useContext} from 'react' 

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { Authcontext } from '../../shared/context/auth-context';


import './Auth.css';
const Auth = () => {
    
    const auth = useContext(Authcontext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [formState, inputHandler, setFromData]  = useForm(
        {
            email:{
            value:'',
            isValid : false 
           },
           password:{
            value:'',
            isValid:false
           }
    },
    false
    )

    const switchModeHandler = () => {
        if (!isLoginMode){
            setFromData(
                {
                    ...formState.inputs, // coping the from value 
                    name:undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            )
        }else{
            setFromData(
                {
                    ...formState.inputs,
                    name:{
                        value:'',
                        isValid:false
                    }
                },
                false
            )
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    const authSubmitHandler = event =>{
        event.preventDefault();
        console.log(formState.inputs)
        auth.login()
    }
    return(
        <Card className ="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>

                {!isLoginMode && (
                    <Input 
                    element ="input"
                    id ="name"
                    type ="text"
                    label="Your Name"
                    validators ={[VALIDATOR_REQUIRE()]}
                    errorText ="Please enter Your Name"
                    onInput={inputHandler}
                    />
                )}
                <Input
                element ="input"
                id ="email"
                type ="email"
                label="E-Mail"
                validators ={[VALIDATOR_EMAIL()]}
                errorText ="Please enter a valid email address."
                onInput={inputHandler}
                />
                <Input
                element ="input"
                id ="password"
                type ="password"
                label="Password"
                validators ={[VALIDATOR_MINLENGTH(5)]}
                errorText ="Please enter a valid password, at least 5 charactor."
                onInput={inputHandler}
                />
               <Button type ="submit" disabled ={!formState.isValid}>
                {isLoginMode ? 'LOGIN' : 'SINGUP'}
                </Button>  
            </form>
            <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? 'SINGUP': 'LOGIN'}
                </Button>
        </Card>
    )
}


export default Auth;
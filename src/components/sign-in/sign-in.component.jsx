import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component{
    constructor(props){
    super(props);

    this.state = {
        email: '',
        password: ''
    }
}
    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth. signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error)
        }

        this.setState({ email: '', password: ''})
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }
 

    render() {
        return(
            <div className='sign-in'>
                <h2> I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                    name='email'
                    type='email'
                    value={this.state.email}
                    label='email'
                    handleChange={this.handleChange}
                    required 
                    />
                    <FormInput 
                    name='password' 
                    type='password' 
                    value={this.state.password} 
                    label='password'
                    handleChange={this.handleChange}
                    required 
                    />
                    <div className='buttons'>
                        <CustomButton type='submit' value='Submit Form'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}
                            Sign in with Google{' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;
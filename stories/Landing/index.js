import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import EmptyLanding from './EmptyLanding'
import Login from './Login'
import PasswordRecovery from './PasswordRecovery'
import PasswordRecoveryConfirmation from './PasswordRecoveryConfirmation'
import SignIn from './SignIn'
import SignInConfirmation from './SignInConfirmation'

class LandingState extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      company: '',
      companyError: null,
      email: '',
      emailError: null,
      name: '',
      nameError: null,
      password: '',
      passwordError: null,
      token: '',
      tokenError: null,
    }
    this.clearState = this.clearState.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  clearState () {
    this.setState({
      company: '',
      companyError: null,
      email: '',
      emailError: null,
      name: '',
      nameError: null,
      password: '',
      passwordError: null,
      token: '',
      tokenError: null,
    })
  }

  handleLogIn (event) {
    event.preventDefault()
    this.clearState()
  }

  handleTextChange (event) {
    const field = event.target.name
    this.setState({ [field]: event.target.value })
  }

  render () {
    const { children } = this.props
    const renderElement = React.cloneElement(
      React.Children.only(children),
      {
        ...this.state,
        handleLogIn: this.handleLogIn,
        handleTextChange: this.handleTextChange,
      }
    )

    return (renderElement)
  }
}

storiesOf('Landing', module)
  .add('Pagar.me login', () => (
    <LandingState>
      <Login />
    </LandingState>
  ))
  .add('Pagar.me login light', () => (
    <LandingState>
      <Login base="light" />
    </LandingState>
  ))
  .add('Pagar.me two factor login', () => (
    <LandingState>
      <Login hasToken />
    </LandingState>
  ))
  .add('Pagar.me password recovery', () => (
    <LandingState>
      <PasswordRecovery />
    </LandingState>
  ))
  .add('Pagar.me password recovery confirmation', () => (
    <LandingState>
      <PasswordRecoveryConfirmation />
    </LandingState>
  ))
  .add('Pagar.me sign in', () => (
    <LandingState>
      <SignIn />
    </LandingState>
  ))
  .add('Pagar.me sign in confirmation', () => (
    <LandingState>
      <SignInConfirmation />
    </LandingState>
  ))
  .add('Empty dark landing', () => (
    <LandingState>
      <EmptyLanding />
    </LandingState>
  ))

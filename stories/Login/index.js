import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import classNames from 'classnames'
import styles from './style.css'
import Button from '../../src/Button'
import Input from '../../src/Input/form'
import {
  Login,
  LoginPrimarySection,
  LoginSecondarySection,
} from '../../src/Login'

const DefaultLogin = ({
  email,
  emailError,
  handleEmailChange,
  handleLogIn,
  handlePasswordChange,
  handleTokenChange,
  hasToken,
  password,
  passwordError,
  token,
  tokenError,
}) => (
  <Login className={styles.container}>
    <LoginPrimarySection>
      <div className={styles.columnContainer}>
        <form
          onSubmit={handleLogIn}
          className={styles.form}
        >
          <div className={styles.logo}>
            <img
              src=""
              alt="Pagar.me"
            />
          </div>
          <div className={styles.login}>
            <Input
              error={emailError}
              label="Email"
              name="email"
              onChange={handleEmailChange}
              placeholder="emaillegal@pagar.me"
              type="text"
              value={email}
            />
            <Input
              error={passwordError}
              label="Senha"
              name="password"
              onChange={handlePasswordChange}
              placeholder=""
              type="password"
              value={password}
            />
            { hasToken &&
              <Input
                error={tokenError}
                label="Token"
                name="token"
                onChange={handleTokenChange}
                placeholder="ABC123"
                type="text"
                value={token}
              />
            }
          </div>
          <div className={styles.loginActions}>
            <div className={styles.hugeButton} >
              <Button
                type="submit"
                size="large"
                fill="gradient"
              >
                Login
              </Button>
            </div>
            <a href="https://dashboard.pagar.me/#/forgot_password" >
              Redefinir senha
            </a>
          </div>
        </form>
      </div>
    </LoginPrimarySection>
    <LoginSecondarySection>
      <div className={styles.columnContainer}>
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>
              Seja bem-vindo
            </h1>
            <span className={styles.uppercase}>
              à dashboard Pagar.me
            </span>
          </div>
          <p className={styles.paragraph}>
            A Dashboard Pagar.me é o painel de controle da sua operação.
            Através dela você tem acesso a diversos dados relevantes para
            seu dia a dia de trabalho, e também pode realizar diferentes
            ações cotidianas com facilidade, como estornos, consulta de
            saldo e mais.
          </p>
          <div className={classNames(styles.uppercase, styles.signIn)}>
            <p>
              <span>Faça login ao lado para acessar sua conta</span>
              <span>
                Ainda não tem uma conta?
                <a
                  href="https://dashboard.pagar.me/#/signup"
                  className={styles.signInLink}
                >
                  Cadastre-se
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </LoginSecondarySection>
  </Login>
)

const EmptyLogin = () => (
  <Login className={styles.container}>
    <LoginPrimarySection><span>Empty</span></LoginPrimarySection>
    <LoginSecondarySection><span>Login</span></LoginSecondarySection>
  </Login>
)

class LoginState extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      token: '',
      emailError: null,
      passwordError: null,
      tokenError: '',
      hasToken: !!(props.hasToken),
    }
    this.clearState = this.clearState.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleTokenChange = this.handleTokenChange.bind(this)
  }

  clearState () {
    this.setState({
      email: '',
      password: '',
      token: '',
      emailError: null,
      passwordError: null,
    })
  }

  handleLogIn (event) {
    event.preventDefault()
    this.clearState()
  }

  handleEmailChange (event) {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange (event) {
    this.setState({ password: event.target.value })
  }

  handleTokenChange (event) {
    this.setState({ token: event.target.value })
  }

  render () {
    const renderElement = React.cloneElement(
      React.Children.only(this.props.children),
      {
        ...this.state,
        handleLogIn: this.handleLogIn,
        handleEmailChange: this.handleEmailChange,
        handlePasswordChange: this.handlePasswordChange,
        handleTokenChange: this.handleTokenChange,
      }
    )

    return (renderElement)
  }
}

storiesOf('Login', module)
  .add('Pagar.me login', () => (
    <LoginState>
      <DefaultLogin />
    </LoginState>
  ))
  .add('Two factor login', () => (
    <LoginState hasToken>
      <DefaultLogin />
    </LoginState>
  ))
  .add('Empty login', () => (
    <LoginState>
      <EmptyLogin />
    </LoginState>
  ))

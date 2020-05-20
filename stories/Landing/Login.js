import React from 'react'
import styles from './style.css'
import Button from '../../src/Button'
import Input from '../../src/Input/form'
import {
  Landing,
  LandingPrimarySection,
  LandingSecondarySection,
} from '../../src/Landing'
import WelcomeContent from './WelcomeContent'

import Logo from './logo.svg'

const getSecondaryBase = base => (
  base === 'light'
    ? 'dark'
    : 'light'
)

const Login = ({
  base,
  email,
  emailError,
  handleLogIn,
  handleTextChange,
  hasToken,
  password,
  passwordError,
  token,
  tokenError,
}) => (
  <Landing className={styles.container}>
    <LandingPrimarySection base={base}>
      <form
        onSubmit={handleLogIn}
        className={styles.contentRight}
      >
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.login}>
          <Input
            error={emailError}
            label="Email"
            name="email"
            onChange={handleTextChange}
            placeholder="emaillegal@pagar.me"
            type="text"
            value={email}
          />
          <Input
            error={passwordError}
            label="Senha"
            name="password"
            onChange={handleTextChange}
            placeholder=""
            type="password"
            value={password}
          />
          { hasToken && (
            <Input
              error={tokenError}
              label="Token"
              name="token"
              onChange={handleTextChange}
              placeholder="ABC123"
              type="text"
              value={token}
            />
          )}
        </div>
        <div className={styles.actions}>
          <div className={styles.hugeButton}>
            <Button
              type="submit"
              size="huge"
              fill="flat"
            >
              Entrar
            </Button>
          </div>
          <a href="https://dashboard.pagar.me/#/forgot_password">
            Redefinir senha
          </a>
        </div>
      </form>
    </LandingPrimarySection>
    <LandingSecondarySection base={getSecondaryBase(base)}>
      <WelcomeContent />
    </LandingSecondarySection>
  </Landing>
)

export default Login

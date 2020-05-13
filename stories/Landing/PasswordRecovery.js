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

const PasswordRecovery = ({
  email,
  emailError,
  handleSubmit,
  handleTextChange,
}) => (
  <Landing className={styles.container}>
    <LandingPrimarySection>
      <div className={styles.columnContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles.contentRight}
        >
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.login}>
            <p className={styles.paragraph}>
              Digite o e-mail cadastrado para recuperar
              sua senha
            </p>
            <Input
              error={emailError}
              label="Email"
              name="email"
              onChange={handleTextChange}
              placeholder="emaillegal@pagar.me"
              type="text"
              value={email}
            />
          </div>
          <div className={styles.actions}>
            <div className={styles.hugeButton}>
              <Button
                type="submit"
                size="huge"
                fill="flat"
              >
                Enviar
              </Button>
            </div>
            <a href="https://dashboard.pagar.me/#/forgot_password">
              Voltar para o login
            </a>
          </div>
        </form>
      </div>
    </LandingPrimarySection>
    <LandingSecondarySection>
      <div className={styles.columnContainer}>
        <WelcomeContent />
      </div>
    </LandingSecondarySection>
  </Landing>
)

export default PasswordRecovery

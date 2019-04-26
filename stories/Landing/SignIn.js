import React from 'react'
import classNames from 'classnames'
import styles from './style.css'
import Button from '../../src/Button'
import Input from '../../src/Input/form'
import {
  Landing,
  LandingPrimarySection,
  LandingSecondarySection,
} from '../../src/Landing'

import Logo from './logo.svg'

const SignIn = ({
  company,
  companyError,
  email,
  emailError,
  handleLogIn,
  handleTextChange,
  name,
  nameError,
  password,
  passwordError,
}) => (
  <Landing className={styles.container}>
    <LandingPrimarySection>
      <form
        onSubmit={handleLogIn}
        className={styles.contentRight}
      >
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.signIn}>
          <Input
            error={nameError}
            label="Nome completo"
            name="name"
            onChange={handleTextChange}
            placeholder="Nome completo"
            type="text"
            value={name}
          />
          <Input
            error={companyError}
            label="Empresa"
            name="company"
            onChange={handleTextChange}
            placeholder="Empresa"
            type="text"
            value={company}
          />
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
        </div>
        <div className={styles.actions}>
          <div className={styles.hugeButton}>
            <Button
              type="submit"
              size="huge"
              fill="gradient"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </LandingPrimarySection>
    <LandingSecondarySection>
      <div className={styles.contentLeft}>
        <div>
          <h1 className={styles.title}>
            Crie sua conta
          </h1>
          <span className={styles.uppercase}>
            na dashboard Pagar.me
          </span>
        </div>
        <p className={styles.paragraph}>
          A Dashboard Pagar.me é um painel de controle de
          operações. Através dela você pode ter acesso a diversos
          dados relevantes para seu dia a dia de trabalho, e também
          pode realizar diferentes ações cotidianas com facilidade,
          como estornos, consulta de saldo e mais.
        </p>
        <div className={classNames(styles.uppercase, styles.signIn)}>
          <p>
            <span>
              Já possui cadastro?
              <a
                href="https://dashboard.pagar.me/#/login"
                className={styles.signInLink}
              >
                Faça o login
              </a>
            </span>
          </p>
        </div>
      </div>
    </LandingSecondarySection>
  </Landing>
)

export default SignIn

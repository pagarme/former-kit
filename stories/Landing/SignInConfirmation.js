import React from 'react'
import classNames from 'classnames'
import styles from './style.css'
import Button from '../../src/Button'
import {
  Landing,
  LandingPrimarySection,
  LandingSecondarySection,
} from '../../src/Landing'

import Logo from './logo.svg'

const bakToLogin = () => {
  window.location.href = 'https://dashboard.pagar.me/#/login'
}

const SignIn = () => (
  <Landing className={styles.container}>
    <LandingPrimarySection>
      <div className={styles.columnContainer}>
        <div className={styles.contentRight}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.signIn}>
            <p className={styles.paragraph}>
              <b>Pronto!</b> você receberá um e-mail com as
              Instruções para a ativação de sua conta
            </p>
          </div>
          <div className={styles.actions}>
            <div className={styles.hugeButton}>
              <Button
                type="button"
                size="huge"
                fill="flat"
                onClick={bakToLogin}
              >
                Voltar para o cadastro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingPrimarySection>
    <LandingSecondarySection>
      <div className={styles.columnContainer}>
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
      </div>
    </LandingSecondarySection>
  </Landing>
)

export default SignIn

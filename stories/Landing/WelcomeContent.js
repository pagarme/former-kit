import React from 'react'
import classNames from 'classnames'
import styles from './style.css'

const WelcomeContent = () => (
  <div className={styles.contentLeft}>
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
    <div className={classNames(styles.uppercase, styles.signInBlock)}>
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
)

export default WelcomeContent

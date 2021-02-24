import { useState, useEffect } from 'react'
import styles from '../styles/components/CountDown.module.css'

export function CountDown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false); {/* esse state armazena se o countdown está ativo ou não portanto iniciamos em falso, para quando o usuário apertar alterar o estado para true */}

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown() {
    setActive(true); {/* Quando clicar altera o valor de set para true */}
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime( time - 1);
      }, 1000)
    }
  }, [active, time]) /* Recebe dois parâmetros. 1° o que desejamos executar, e vamos dizer isso atraves de uma função. 2° O momento que deseja executar o que foi passado no 1° parâmetro. Neste caso, sempre que o valor de active e time mudar estamos retirando 1 segundo*/

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountDown}
      >
        Iniciar um ciclo
      </button>
    </div>
  )
}
import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false); {/* esse state armazena se o countdown está ativo ou não portanto iniciamos em falso, para quando o usuário apertar alterar o estado para true */}
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true); {/* Quando clicar altera o valor de set para true */}
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false);
    setTime(25 * 60)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime( time - 1);
      }, 1000)
    } else if (isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge()
    }
  }, [isActive, time]) /* Recebe dois parâmetros. 1° o que desejamos executar, e vamos dizer isso atraves de uma função. 2° O momento que deseja executar o que foi passado no 1° parâmetro. Neste caso, sempre que o valor de active e time mudar estamos retirando 1 segundo*/

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

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          ) }
        </> /* No react precisamos que uma tag que envolva um código, como uma div, sem isso o código quebra, mas no caso acima se colocassemos uma div, ela teria a única função de envolver os elementos, é nesses casos, no react há uma tag chamada de fragment, que são os sinais de menor e maior, eles servem a este proposito e o bom é que no html ela não irá aparecer*/
      ) }
    </div>
  )
}
{/* Operadores ternarios apenas com if podem ser feitos utilizando, condition ? true : null. Ou condition && true.*/}
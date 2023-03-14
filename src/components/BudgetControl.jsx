import {useEffect, useState} from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const BudgetControl = ({spents,budget,setSpents,setBudget,setIsValidBudget}) => {


  const [porcentaje,setPorcentaje] = useState(0)
  const [available, setAvailable] = useState(0)
  const [used, setUsed] = useState(0)

  useEffect (() =>{
     const totalUsed = spents.reduce((total,spent) => spent.amount + total, 0  )

     const totalAvailable = budget - totalUsed;

     //Calcular el porcentaje
     const nuevoPorcentaje = (((budget- totalAvailable) / budget  ) * 100).toFixed(2);
     

     setAvailable(totalAvailable)
     setUsed(totalUsed)

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000);

  },[spents])

  const resetAmount = (amount) =>{
    return amount.toLocaleString('en-Us',{
      style:'currency',
      currency: 'USD'
    });
  }
  const handleResetApp = () => {
    const resultado = confirm('¿Deseas Reiniciar la App?');
    
    if(resultado){
      setSpents([])
      setBudget(0)
      setIsValidBudget(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
              styles={buildStyles({
                pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                trailColor:'#F5F5F5',
                textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
              })}
              value={porcentaje}
              text={`${porcentaje}%`}
            />
        </div>

        <div className='contenido-presupuesto'>
          <button className='reset-app' type='button' onClick={handleResetApp}>
            Resetear App
          </button>
            <p>
                <span>Presupuesto:</span> {resetAmount(budget)}
            </p>

            <p className={`${available < 0 ? 'negativo' : ''}`}>
                <span>Disponible:</span> {resetAmount(available)}
            </p>

            <p>
                <span>Gastado:</span> {resetAmount(used)}
            </p>
        </div>
    </div>
  )
}

export default BudgetControl

import React from 'react'
import NewBudget from './NewBudget'
import BudgetControl from './BudgetControl'

const Header = ({budget, setBudget,isValidBudget, setIsValidBudget,spents,setSpents}) => {



  return (
    <header>
        <h1>Plainifcador de Gastos</h1>

       { isValidBudget ? (
        <BudgetControl 
            spents={spents}
            setSpents={setSpents}
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
        />
       ): (
        <NewBudget
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
        />
       )}

       
    </header>
  )
}

export default Header

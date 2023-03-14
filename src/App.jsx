import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ListofSpents from './components/ListofSpents';
import Modal from './components/Modal';

import { generateId } from './helpers';
import IconNewSpent from './img/nuevo-gasto.svg'


function App() {

  const [spents, setSpents] = useState([
    ...(JSON.parse(localStorage.getItem('spents')) ?? [])
  ]);
  

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal,setModal] = useState(false);
  const [animateModal,setAnimateModal] = useState(false);

  const [spentEdit,setSpentEdit] = useState({});

  const [filter,setFilter] = useState('');
  const [spentsFiltred,setSpentsFiltred] = useState([]);

  useEffect(()=> {
    if(Object.keys(spentEdit).length >0){
      setModal(true)
      
  
      setTimeout(() => {
        setAnimateModal(true)
      }, 500);
    }
  },[spentEdit])
  
  useEffect(() =>{
    localStorage.setItem('budget',budget ?? 0)
  },[budget])
  useEffect(()=> {
    localStorage.setItem('spents', JSON.stringify(spents) ?? [])
  }, [spents])

  useEffect(() => {
    if(filter){
      //filtrar gastos
      const spentsFiltred =  spents.filter(spent => spent.category === filter)
      setSpentsFiltred(spentsFiltred)
    }
  },[filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if(budgetLS > 0) {
      setIsValidBudget(true)
    }
  },[])

 

  const handleNewSpent = () =>{
    setModal(true)
    setSpentEdit({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
  }

  const saveSpent = spent => {
    if(spent.id){
      //Actualizar
      const spentsUpdate = spents.map(spentState =>spentState.id === spent.id ? spent : spentState)
      setSpents(spentsUpdate)
      setSpentEdit({})
    }else{
      //Nuevo Gasto
      spent.id = generateId()
      spent.date = Date.now();
      setSpents([...spents,spent])
    }

    

    setAnimateModal(false)
        setTimeout(() => {
            setModal(false)
        }, 1000);
  }

  const deleteSpent = id => {
    const spentsUpdate = spents.filter(spent=> spent.id !== id);

    setSpents(spentsUpdate)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
        <Header
          spents={spents}
          setSpents={setSpents}
          budget={budget}
          setBudget={setBudget}
          isValidBudget={isValidBudget}
          setIsValidBudget={setIsValidBudget}
        />

      {isValidBudget && (
        <>
          <main>
            <Filters 
              filter={filter}
              setFilter={setFilter}
            />  
            <ListofSpents 
              spents={spents}
              setSpentEdit={setSpentEdit}
              deleteSpent={deleteSpent}
              filter={filter}
              spentsFiltred={spentsFiltred}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconNewSpent}
              alt='Icono nuevo Gasto'
              onClick={handleNewSpent}
            />
        </div>
        </>
      )}

      {modal && 
      <Modal 
        setModal={setModal}
        animateModal={animateModal}
        setAnimateModal={setAnimateModal}
        saveSpent={saveSpent}
        spentEdit={spentEdit}
        setSpentEdit={setSpentEdit}
      />}
    


    </div>
  )
}

export default App

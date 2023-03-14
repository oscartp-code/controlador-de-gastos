import React from 'react'
import Spent from './Spent'

const ListofSpents = ({spents,name,setSpentEdit,deleteSpent,filter,spentsFiltred}) => {
  return (
    <div className='listado-gastos contenedor'>
        

        {
          filter ? (
            <>
              <h2>{spentsFiltred.length ? 'Gastos' : 'No Hay Gastos en esta categoria'}</h2>
                  {spentsFiltred.map( spent => (
                    <Spent 
                        key={spent.id}
                        spent={spent}
                        setSpentEdit={setSpentEdit}
                        deleteSpent={deleteSpent}
                    />
                ))}
            </>
          ) : (
            <>
            <h2>{spents.length ? 'Gastos' : 'No Hay Gastos Aun'}</h2>
              {spents.map( spent => (
                <Spent 
                    key={spent.id}
                    spent={spent}
                    setSpentEdit={setSpentEdit}
                    deleteSpent={deleteSpent}
                />
              ))}
          </>
          )
        }

       
    </div>
  )
}

export default ListofSpents

import { useState,useEffect } from 'react'
import CloseBtn from '../img/cerrar.svg'
import Message from './Message'

const Modal = ({setModal,animateModal,setAnimateModal,saveSpent,spentEdit,setSpentEdit}) => {

    const [message,setMessage] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [id, setId] = useState('');

    useEffect(()=> {
        if(Object.keys(spentEdit).length >0){
            setName(spentEdit.name)
            setAmount(spentEdit.amount)
            setCategory(spentEdit.category)
            setId(spentEdit.id)
            setDate(spentEdit.date)
          }
    },[])


    const hideModal = () => {
        setAnimateModal(false)
        setSpentEdit({})
        setTimeout(() => {
            setModal(false)
        }, 1000);
    }

    const handleSubmit = e => {
        e.preventDefault();


        if([name,amount, category].includes('')){
            setMessage('Todos los campos son obligatorios')

            setTimeout(() => {
               setMessage('') 
            }, 3000);

            return;
        }

        saveSpent({name,amount,category,id,date})
    }

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img
                src={CloseBtn}
                alt="cerrar Modal"
                onClick={hideModal}
            />

        </div>

        <form 
        className={`formulario ${animateModal ? "animar" : "cerrar" }`}
        onSubmit={handleSubmit}
        >
            <legend>{spentEdit.name ? 'Editar' : 'Nuevo Gasto'}</legend>
            {message && <Message type="error">{message}</Message>}

            <div className='campo'>
                <label htmlFor='nombre'>Nombre gasto: </label>

                <input
                    id='nombre'
                    type="text"
                    placeholder='Añade el nombre del gasto'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad: </label>

                <input
                    id='cantidad'
                    type="number"
                    placeholder='Añade la cantidad: ej. 300'
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categoria: </label>

                <select id='categoria' value={category}
                    onChange={e => setCategory(e.target.value)}>
                    <option value="">-- Seleccione--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="subscripciones">Subcripciones</option>
                </select>
            </div>

            <input
                type="submit"
                value={spentEdit.name ? 'Guardar Cambios' : 'Añadir GAsto'}
                
            />
            
        </form>
        
    </div>
  )
}

export default Modal

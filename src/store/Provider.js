import Context from './Context'
//luồng của nó tạo ra tương tự redux
import { useReducer } from 'react'
import reducer, { initState } from './reducer'

function Provider({ children }) {
    //reducer, initState là 2 đối số bắt buộc của useReducer sẽ dc khai báo bên ngoài
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        // value chính là global state
        <Context.Provider value={[state, dispatch]} >
            {
                children
            }
        </Context.Provider>
    )
}

export default Provider

//File cho phep cung cap store xuong tat cac ccomponent qua Context
//Provider cuoi cung se ôm ứng dụng cho nên 
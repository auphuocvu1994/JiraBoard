import { useContext } from 'react'
import Context from './Context'
//Custom tạo ra 1 cái hooks, cái hook này sẽ lấy ra state và dispatch
export const useStore = () => {
    const [state, dispatch] = useContext(Context)

    return [state, dispatch]
}
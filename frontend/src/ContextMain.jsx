import { createContext } from "react"

import { ToastContainer, toast } from 'react-toastify';


const MainContext = createContext()

function ContextMain(props) {
    const notify = (msg, flag) => toast(msg, { type: flag });



    return (
        <MainContext.Provider value={{ notify }}>
            <ToastContainer />
            {props.children}
        </MainContext.Provider>
    )
}

export { MainContext }
export default ContextMain


import React, { useState } from 'react'


function countInitiate(){
    console.log('run once only')
    return 4
}
function App() {

    // const [ count, setCount ] = useState(() => countInitiate())
    const [ state, setState ] = useState({count: 4, theme: 'blue'})
    const count = state.count
    const theme = state.theme

    function incrementCount(){
        setState(prevState => {
            return { count: prevState.count + 1, theme: prevState.theme}
        })
    }
    function decrementCount(){
        setState(prevState => {
            return {
            ...prevState, count: prevState.count - 1        
            }
        })
    }
    return (
        <>
            <button onClick= {decrementCount}>-</button>
            <span>{count}!</span>
            <span>{theme}</span>
            <button onClick= {incrementCount}>+</button>
        </>
    )
}

export default App;
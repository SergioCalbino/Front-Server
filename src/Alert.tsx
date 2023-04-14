import React from 'react'

interface PropsAlert {
    alerta: {
      error: boolean
      msg: string
    }
  }

const Alert = ({alerta}: PropsAlert) => {
    return (
      <div className={`${alerta.error ? 'from-red-400 to-red-400': 'from-indigo-400 to-indigo-600 '} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm`} >
          {alerta.msg}
      </div>
    )
  }
  
  export default Alert
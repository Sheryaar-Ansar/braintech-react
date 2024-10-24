import React from 'react'
import whatsapp from '../../assets/whatsapp.png'
const Whatsapp = () => {
    return (
        <div>
            {/* <div className='group'>
        <a href="https://wa.me/923082238947?text=Hello, How may i help you?" target='_blank' className='fixed bottom-0 right-[0px] p-3 w-[100px] h-[100px] z-[10000]'>
        <img src={whatsapp} className='w-[70px] h-[70px] hover:bg-green-300 rounded-2xl transition-colors duration-300 ease-in-out'/></a>
        <h1 className='w-[150px] fixed bottom-10 right-[0px] z-[1000] translate-x-full hidden text-xl font-bold text-white transform transition-all duration-500 ease-linear group-hover:right-[70px] group-hover:translate-x-0 group-hover:block group-hover:transition-transform group-hover:duration-700 group-hover:delay-300 group-hover:ease-out'>Chat With Us</h1>
      </div> */}
            <div className='group'>
                <a
                    href="https://wa.me/923082238947?text=Hello, How may i help you?"
                    target='_blank'
                    className='fixed bottom-0 right-[0px] p-3 w-[100px] h-[100px] z-[10000]'
                >
                    <img
                        src={whatsapp}
                        className='hover:bg-green-300 hover:shadow-md hover:shadow-green-400 rounded-2xl transition-colors duration-300 ease-in-out'
                    />
                </a>
                <h1
                    className='bg-blue-200 p-2 w-[150px] fixed bottom-10 right-[0px] z-[1000] opacity-0 translate-x-full text-xl font-bold text-white transform transition-all duration-500 ease-linear group-hover:right-[100px] group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-300'
                >
                    Chat With Us
                </h1>
            </div>

        </div>
    )
}

export default Whatsapp

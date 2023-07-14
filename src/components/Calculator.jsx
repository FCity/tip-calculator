import { useState, useEffect } from 'react'
import logo from '../assets/logo.svg'
import iconDollar from '../assets/icon-dollar.svg'
import iconPerson from '../assets/icon-person.svg'

export const Calculator = () => {
  const [total, setTotal] = useState('')
  const [tipPreset, setTipPreset] = useState('')
  const [tipCustom, setTipCustom] = useState('')
  const [numberOfPeople, setNumberOfPeople] = useState('')
  const [tipPerPerson, setTipPerPerson] = useState()
  const [totalPerPerson, setTotalPerPerson] = useState()
  
  const [tipPercentages, setTipPercentages] = useState([
    { amount: 5, active: false },
    { amount: 10, active: false },
    { amount: 15, active: false },
    { amount: 25, active: false },
    { amount: 50, active: false }
  ])
  
  useEffect(() => {
    let [ttl, tpp, tpc, nop] = [Number(total), tipPreset, Number(tipCustom), numberOfPeople]
    
    if (ttl && (tpp || tpc) && nop) {
      let tp = tpp ? ttl * (tpp / 100) : ttl * (tpc / 100)
      setTipPerPerson( ( tp / nop ).toFixed(2) )
      setTotalPerPerson( ( ( ttl + tp ) / nop ).toFixed(2) )
    }
  }, [total, tipPreset, tipCustom, numberOfPeople])
  
  const handleTotal = e => {
    setTotal(e.target.value)
  }
  
  const handleTipPreset = e => {
    setTipPreset(Number(e.target.value))
    setTipCustom('')
  }

  useEffect(() => {
    setTipPercentages(prevState => {
      return prevState.map(tp => {
        if (tp.amount === tipPreset) {
          tp.active = true
        } else {
          tp.active = false
        }
        
        return tp
      })
    })
  }, [tipPreset])
  
  const handleTipCustom = e => {
    setTipCustom(e.target.value)
    setTipPreset('')
  }
  
  const handleNumberOfPeople = e => {
    if (!isNaN(e.target.value)) setNumberOfPeople(Number(e.target.value))
  }
  
  const handleReset = () => {
    setTotal('')
    setTipPreset('')
    setTipCustom('')
    setNumberOfPeople('')
    setTotalPerPerson()
    setTipPerPerson()
  }

  return (
    <div className="font-sans lg:px-10 lg:py-16">
      <header className='text-center text-vdc text-lg font-bold p-6 lg:p-8'>
        <img className='m-auto p-5 lg:pb-8' src={logo} alt="" />
      </header>
      
      <div className="bg-white rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 lg:w-3/4 lg:m-auto lg:flex lg:justify-between">
        <div className='lg:w-1/2 lg:pr-6 lg:pb-4'>
          <div>
            <label className='text-xs font-bold text-dgc tracking-wider'>Bill</label>
            <div className="relative">
              <img className='absolute top-4 left-4' src={iconDollar} alt="" />
              <input
                type="text"
                className="block w-full bg-vlgc text-vdc font-bold tracking-wide mt-2 px-4 py-2 rounded text-right text-lg focus:outline-none focus:border-2 focus:border-sc"
                placeholder='0'
                value={total}
                pattern="\d\."
                onChange={handleTotal}
              />
            </div>
          </div>

          <div className="pt-6">
            <label className='text-xs font-bold text-dgc tracking-wider'>Select Tip %</label>
            <div className="mt-2">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                { tipPercentages.map(tipPercentage => (
                  <button
                    className={`${tipPercentage.active ? 'bg-sc' : 'bg-vdc'} hover:bg-sc text-white hover:text-vdc my-1 p-2 rounded font-bold text-lg`}
                    key={tipPercentage.amount}
                    value={tipPercentage.amount}
                    onClick={handleTipPreset}
                  >
                    {tipPercentage.amount}%
                  </button>
                )) }

                <input
                  type="text"
                  className={`bg-vlgc text-vdc text-lg ${tipCustom ? 'text-right' : 'text-center'} font-bold tracking-wide my-1 px-4 rounded focus:outline-none focus:border-2 focus:border-sc`}
                  placeholder="Custom"
                  value={tipCustom}
                  pattern="\d\."
                  onChange={handleTipCustom}
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <label className='text-xs font-bold text-dgc tracking-wider'>Number of People</label>
            {numberOfPeople === 0 &&
              <span className='text-red-500 text-xs font-bold tracking-wider float-right pt-2'>Can't be zero</span>
            }
            <div className="relative">
              <img className='absolute top-4 left-4' src={iconPerson} alt="" />
              <input
                type="text"
                className={`block w-full bg-vlgc text-vdc font-bold mt-2 px-4 py-2 rounded text-right text-lg tracking-wide focus:outline-none focus:border-2 ${numberOfPeople !== 0 ? 'focus:border-sc' : 'focus:border-red-500'}`}
                placeholder="0"
                value={numberOfPeople}
                onChange={handleNumberOfPeople}
              />
            </div>
          </div>
        </div>

        <div className="bg-vdc text-w mt-6 lg:mt-0 px-5 py-5 text-sm rounded-xl lg:w-1/2 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex justify-between my-4">
              <div className='text-xs'>
                <p className='font-bold tracking-wider'>Tip Amount</p>
                <p className='text-lgc'>/ person</p>
              </div>
              <div>
                <p className='text-2xl lg:text-4xl text-sc font-bold'>${!tipPerPerson ? '0.00' : tipPerPerson}</p>
              </div>
            </div>

            <div className="flex justify-between my-6">
              <div className='text-xs'>
                <p className='font-bold tracking-wider'>Total</p>
                <p className='text-lgc'>/ person</p>
              </div>
              <div>
                <p className='text-2xl lg:text-4xl text-sc font-bold'>${!totalPerPerson ? '0.00' : totalPerPerson}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            { !tipPerPerson && !totalPerPerson ? 
              <button className='bg-sc hover:bg-lgc text-vdc w-full p-2 text-center font-bold rounded font-serif uppercase tracking-wide disabled:bg-dgc disabled:opacity-30' onClick={handleReset} disabled>Reset</button>
              :
              <button className='bg-sc hover:bg-lgc text-vdc w-full p-2 text-center font-bold rounded font-serif uppercase tracking-wide' onClick={handleReset}>Reset</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

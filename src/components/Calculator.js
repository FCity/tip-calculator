import { useState, useEffect } from 'react'

export const Calculator = () => {
  /* const [bill, setBill] = useState(0)
  const [radioTip, setRadioTip] = useState(null)
  const [customTip, setCustomTip] = useState('Custom')
  const [numberOfPeople, setNumberOfPeople] = useState(0)
  const [isTipSet, setIsTipSet] = useState(false)
  const [tip, setTip] = useState(0)

  const tipRef = useRef()

  useEffect(() => {
    let tip = 0
      
    if (radioTip) {
      tip = bill + (bill * radioTip)
    }
    else if (customTip !== 'Custom') {
      tip = bill + (bill * customTip)
    }

    setTip(tip)
    setIsTipSet(true)
  }, [radioTip, customTip])

  const handleFocus = e => {
    if (e.target.value == 0) {
      e.target.value = null
    }
    else if (e.target.value == 'Custom') {
      e.target.value = ''
    }
  }

  const handleRadioTip = e => setRadioTip(e.target.value / 100)

  const handleCustomTip = e => {
    tipRef.current.checked = false
    setCustomTip(e.target.value / 100)
    setRadioTip(null)
  } */

  const [total, setTotal] = useState(null)
  const [tipPreset, setTipPreset] = useState(null)
  const [tipCustom, setTipCustom] = useState(null)
  const [numberOfPeople, setNumberOfPeople] = useState(null)
  const [tipPerPerson, setTipPerPerson] = useState(null)
  const [totalPerPerson, setTotalPerPerson] = useState(null)
  
  const tipPercentages = [5, 10, 15, 25, 50]
  //const tipBtns = useRef(null)
  
  useEffect(() => {
    let [ttl, tpp, tpc, nop] = [Number(total), Number(tipPreset), Number(tipCustom), numberOfPeople]
    
    if (ttl && (tpp || tpc) && nop) {
      let tp = tpp ? ttl * (tpp / 100) : ttl * (tpc / 100)
      setTipPerPerson( ( tp / nop ).toFixed(2) )
      setTotalPerPerson( ( ( ttl + tp ) / nop ).toFixed(2) )
    }
  }, [total, tipPreset, tipCustom, numberOfPeople])
  
  const handleTotal = e => {
    //if (!isNaN(e.target.value)) setTotal(Number(e.target.value))
    //if (/(\d|\.)/.test(e.target.value)) setTotal(e.target.value)
    setTotal(e.target.value)
  }
  
  const handleTipPreset = e => {
    //if (!isNaN(e.target.value)) setTipPreset(Number(e.target.value))
    //if (/(\d|\.)/.test(e.target.value)) setTipPreset(e.target.value)
    setTipPreset(e.target.value)
    setTipCustom('')
  }
  
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
    setTotalPerPerson(null)
    setTipPerPerson(null)
  }

  return (
    <div className="container">
      <header>
        <h3>SPLI</h3>
        <h3>TTER</h3>
      </header>
      
      <div className="calculator">
        <div className="input">
          <label>Bill</label>
          <input
            type="text"
            className="total"
            placeholder="$"
            value={total}
            pattern="\d\."
            onChange={handleTotal}
          />

          <label>Select Tip %</label>
          <div className="tip">
            <div className="presets">
              { tipPercentages.map(tipPercentage => (
                <button
                  key={tipPercentage}
                  value={tipPercentage}
                  onClick={handleTipPreset}
                >
                  {tipPercentage}%
                </button>
              )) }

              <input
                type="text"
                className="custom"
                placeholder="Custom"
                value={tipCustom}
                pattern="\d\."
                onChange={handleTipCustom}
              />
            </div>
          </div>

          <label>Number of People</label>
          <input
            type="text"
            className="people"
            placeholder=""
            value={numberOfPeople}
            onChange={handleNumberOfPeople}
          />
        </div>

        <div className="output">
          <p>Total: ${ total ? Number(total).toFixed(2) : total }</p>
          <p>Tip: {tipPreset || tipCustom}%</p>
          <p>Number of people: {numberOfPeople}</p>

          <p>Tip Amount / person: ${tipPerPerson}</p>
          <p>Total / person: ${totalPerPerson}</p>
        </div>

        <div className="reset">
          <button onClick={handleReset}>Reset</button>
        </div>

        <p>{}</p>
      </div>
    </div>
  )
    
  /* return (
    <div className='calculator'>
      <div className='test'>
        <p>Bill: ${bill}</p>
        <p>Tip: {radioTip || customTip}</p>
        <p>Number of People: {numberOfPeople}</p>
        <p>Is tip set: {isTipSet ? 'yes' : 'no'}</p>
        <p>Tip: {tip} </p>
      </div>

      <div className='input'>
        <div className='bill'>
          <h3>Bill</h3>
          <input
            type='text'
            value={bill}
            onFocus={handleFocus}
            onChange={e => setBill(e.target.value)}
          />
        </div>

        <div className='select-tip'>
          <h3>Select Tip %</h3>

          <input ref={tipRef} type='radio' id='5' name='tip' value='5' onChange={handleRadioTip} />
          <label htmlFor='5'>5%</label>
          <input ref={tipRef} type='radio' id='10' name='tip' value='10' onChange={handleRadioTip} />
          <label htmlFor='10'>10%</label>
          <input ref={tipRef} type='radio' id='15' name='tip' value='15' onChange={handleRadioTip} />
          <label htmlFor='15'>15%</label>
          <input ref={tipRef} type='radio' id='25' name='tip' value='25' onChange={handleRadioTip} />
          <label htmlFor='25'>25%</label>
          <input ref={tipRef} type='radio' id='50' name='tip' value='50' onChange={handleRadioTip} />
          <label htmlFor='50'>50%</label>

          <input
            type='text'
            name='tip'
            id='custom-tip'
            value={customTip}
            onFocus={handleFocus}
            onChange={handleCustomTip}
          />
        </div>

        <div className='number-people'>
          <h3>Number of People</h3>
          <input
            type='text'
            value={numberOfPeople}
            onFocus={handleFocus}
            onChange={e => setNumberOfPeople(e.target.value)}
          />
        </div>
      </div>

      <div className='output'>
        <div className='tip-amount-wrapper'>
          <h3>Tip Amount</h3>
          <p>/ person</p>

          <div className='tip-amount'>${(tip / numberOfPeople) || '0.00'}</div>

          { isTipSet ?
          <div className='tip-amount'>${tip / numberOfPeople}</div>
          :
          <div className='tip-amount'>$0.00</div>
          }
        </div>

        <div className='total-wrapper'>
          <h3>Total</h3>
          <p>/ person</p>

          <div className='total'>${((bill + tip) / numberOfPeople) || '0.00'}</div>

          { isTipSet ?
          <div className='total'>${(bill + tip) / numberOfPeople}</div>
          :
          <div className='total'>$0.00</div>
          }
        </div>

        <div className='reset-wrapper'>
          <button className='btn btn-reset'>Reset</button>
        </div>
      </div>
    </div>
  ) */
}

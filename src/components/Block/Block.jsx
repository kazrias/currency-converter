import { useEffect, useRef, useState } from 'react'
import './Block.scss'

function Block({ onClickHiddenList, hiddenList, currentFour, onChangeCurrency, currency, onChangeValue, value, num }) {

  const [listIsActive, setListIsActive] = useState(false);

  function checkValue(e) {
    if (listIsActive) setListIsActive(false)
    if (e.target.value === '0')
      onChangeValue('')
    else
      e.target.select()
  }
  let hiddenMenuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!hiddenMenuRef.current.contains(e.target)) {
        setListIsActive(false);
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])
  return (
    <>
      {
        currentFour.filter(item => item !== undefined).length > 0 && (<div className='block'>
          <ul className="currencies">
            {
              currentFour.map((cur) => (
                <li
                  onClick={() => onChangeCurrency(cur)}
                  className={`currencies-item ${cur === currency ? 'active' : ''}`} key={cur}>
                  {cur}
                </li>
              ))
            }
            <li onClick={() => { setListIsActive(!listIsActive) }} className='all-currencies' ref={hiddenMenuRef}>
              <svg height="15px" viewBox="0 0 50 50" width="15px">
                <rect fill="none" height="50" width="50" />
                <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
              </svg>
            </li>
          </ul>
          <input onClick={checkValue} onChange={(e) => onChangeValue(e.target.value)} value={value} className='block-input' type="number" />
          <div className={`hidden-currencies__wrapper ${listIsActive ? 'active' : ''}`} >
            <ul className={`hidden-currencies__list ${listIsActive ? 'active' : ''}`}>
              {
                hiddenList.map((cur, i) => (
                  <li onClick={() => {
                    onClickHiddenList(cur, i)
                  }
                  } className='hidden-currencies__list-item' key={cur}>{cur}</li>
                ))
              }
            </ul>
          </div>
        </div>)
      }
    </>
  )
}
export default Block
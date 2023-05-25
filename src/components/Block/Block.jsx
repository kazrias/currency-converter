import { useState } from 'react';
import './Block.scss'

const defaultCurrency = ['RUB', 'USD', 'EUR', 'GBP'];
function Block({ onChangeCurrency, currency, onChangeValue, value, num }) {
  function checkValue(e) {
    if (e.target.value === '0')
      onChangeValue('')
  }
  return (
    <div className={`block block-${num}`}>
      <ul className="currencies">
        {
          defaultCurrency.map((cur) => (
            <li
              onClick={() => onChangeCurrency(cur)}
              className={`currencies-item ${cur === currency ? 'active' : ''}`} key={cur}>
              {cur}
            </li>
          ))
        }
      </ul>
      <input onClick={checkValue} onChange={(e) => onChangeValue(e.target.value)} value={value} className='block-input' type="number" />
    </div>
  )
}
export default Block
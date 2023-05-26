import './Block.scss'

const defaultCurrency = ['RUB', 'USD', 'EUR', 'GBP'];
function Block({ currentFour, onChangeCurrency, currency, onChangeValue, value, num }) {
  function checkValue(e) {
    if (e.target.value === '0')
      onChangeValue('')
    else
      e.target.select()
  }
  return (
    <>
      {
        currentFour.filter(item => item !== undefined).length > 0 && (<div className={`block block-${num}`}>
          <ul className="currencies">
            {
              currentFour.map((cur, i) => (
                <li
                  onClick={() => onChangeCurrency(cur)}
                  className={`currencies-item ${cur === currency ? 'active' : ''}`} key={cur}>
                  {cur}
                </li>
              ))
            }
          </ul>
          <input onClick={checkValue} onChange={(e) => onChangeValue(e.target.value)} value={value} className='block-input' type="number" />
        </div>)
      }
    </>
  )
}
export default Block
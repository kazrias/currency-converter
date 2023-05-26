import { useEffect, useState } from 'react'
import './App.scss'
import Block from './components/Block/Block'
function App() {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(res => res.json())
      .then(json => setRates(json.Valute))
      .then(() => setRates(prevState => {
        const newState = {...prevState};
        newState['RUB'] = {
          "ID": "R99999",
          "NumCode": "999",
          "CharCode": "RUB",
          "Nominal": 1,
          "Name": "русский рубль",
          "Value": 1,
          "Previous": 1
        };
        return newState;
      }))
      .catch(err => {
        console.warn(err);
        alert('Не удалось получить информацию');
      })
  }, []);
  function onChangeFromValue(value) {
    if (!Object.keys(rates).length) return
    const result = +((rates[fromCurrency].Value / rates[toCurrency].Value) * value).toFixed(1)
    setFromValue(value);
    setToValue(result)
  }

  function onChangeToValue(value) {
    if (!Object.keys(rates).length) return
    const result = +((rates[toCurrency].Value / rates[fromCurrency].Value) * value).toFixed(1);
    setToValue(value);
    setFromValue(result);
  }

  useEffect(() => {
    onChangeFromValue(fromValue)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToValue(toValue)
  }, [toCurrency])
  return (
    <div className="App">
      <Block onChangeCurrency={setFromCurrency} currency={fromCurrency} onChangeValue={onChangeFromValue} value={fromValue} />
      <img src="./assets/arrows.svg" alt="" className="arrows" />
      <Block onChangeCurrency={setToCurrency} currency={toCurrency} onChangeValue={onChangeToValue} value={toValue} />
    </div>
  )
}

export default App

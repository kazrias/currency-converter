import { useEffect, useState } from 'react'
import './App.scss'
import Block from './components/Block/Block'
function App() {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [currentFromFour, setCurrentFromFour] = useState([]);
  const [currentToFour, setCurrentToFour] = useState([]);
  const [hiddenFromList, setHiddenFromList] = useState([]);
  const [hiddenToList, setHiddenToList] = useState([]);


  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(res => res.json())
      .then(json => setRates(json.Valute))
      .then(() => setRates(prevState => {
        const newState = { ...prevState };
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

  useEffect(() => {
    if (Object.keys(length) !== 0) {
      const fourList = Object.keys(rates);
      const hiddenList = fourList.filter(item => {
        if (item !== fourList[43] && item !== fourList[13] && item !== fourList[14] && item !== fourList[2])
          return item
      })

      setFromCurrency(fourList[43])
      setToCurrency(fourList[13])
      setHiddenFromList(hiddenList);
      setHiddenToList(hiddenList);
      setCurrentFromFour([fourList[43], fourList[13], fourList[14], fourList[2]])
      setCurrentToFour([fourList[43], fourList[13], fourList[14], fourList[2]])
    }
  }, [rates])

  useEffect(() => {
    onChangeFromValue(fromValue)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToValue(toValue)
  }, [toCurrency])

  function onChangeFromValue(value) {
    if (!Object.keys(rates).length) return
    console.log('1', fromCurrency, '=', rates[fromCurrency].Value), 'RUB';
    console.log('1', toCurrency, '=', rates[toCurrency].Value), 'RUB';
    const result = +(((rates[fromCurrency].Value / rates[fromCurrency].Nominal) / (rates[toCurrency].Value / rates[toCurrency].Nominal)) * value).toFixed(3)
    setFromValue(value);
    setToValue(result)
  }

  function onChangeToValue(value) {
    if (!Object.keys(rates).length) return
    const result = +(((rates[toCurrency].Value / rates[toCurrency].Nominal) / (rates[fromCurrency].Value / rates[fromCurrency].Nominal)) * value).toFixed(3);
    setToValue(value);
    setFromValue(result);
  }
  function onClickFromHiddenList(cur, i) {
    let tempFourState = [...currentFromFour];
    let tempHiddenState = [...hiddenFromList];
    const indexOfCurrency = currentFromFour.indexOf(fromCurrency)
    const temp = tempFourState[indexOfCurrency];
    tempFourState[indexOfCurrency] = tempHiddenState[i];
    tempHiddenState[i] = temp;
    setCurrentFromFour(tempFourState);
    setHiddenFromList(tempHiddenState);
    setFromCurrency(cur);
  }
  function onClickToHiddenList(cur, i) {
    let tempFourState = [...currentToFour];
    let tempHiddenState = [...hiddenToList];
    const indexOfCurrency = currentToFour.indexOf(toCurrency)
    const temp = tempFourState[indexOfCurrency];
    tempFourState[indexOfCurrency] = tempHiddenState[i];
    console.log(tempHiddenState[i]);
    tempHiddenState[i] = temp;
    setCurrentToFour(tempFourState);
    setHiddenToList(tempHiddenState);
    setToCurrency(cur);
  }
  return (
    <div className="App">
      <Block hiddenList={hiddenFromList} onClickHiddenList={onClickFromHiddenList} currentFour={currentFromFour} onChangeCurrency={setFromCurrency} currency={fromCurrency} onChangeValue={onChangeFromValue} value={fromValue} />
      <img src="./assets/arrows.svg" alt="" className="arrows" />
      <Block hiddenList={hiddenToList} onClickHiddenList={onClickToHiddenList} currentFour={currentToFour} onChangeCurrency={setToCurrency} currency={toCurrency} onChangeValue={onChangeToValue} value={toValue} />
    </div>
  )
}

export default App

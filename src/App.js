import { useEffect, useState } from 'react';
import './App.css';
import TariffCalc from './components/TariffCalc/TariffCalc';
import { url } from './constants/url';
import Tariff from './components/Tariff/Tariff';

export default function App() {
  let [calc, setCalc] = useState(false);
  let [currencyArray, setCurrencyArray] = useState([])
  let [currency, setCurrency] = useState({
    OldCurr: "RUB",
    NewCurr: "RUB",

  })

  useEffect(() => {
    fetch(url).then(res => res.json()).then(res => setCurrencyArray(res.conversion_rates))
  }, [])
  return (
    <div className='wrapper'>
      <TariffCalc
        currency={currency}
        setCurrency={setCurrency}
        currencyArray={currencyArray}
        calc={calc} setCalc={setCalc} />

      <Tariff TariffObject={calc} />
    </div>
  );
}


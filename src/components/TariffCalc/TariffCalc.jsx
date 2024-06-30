import { useRef, useState } from "react";
import "./TariffCalc.css";
import { AlltariffList } from "../../constants/AlltariffList";
import { tariffs } from "../../constants/tariffs";
import { currencyList } from "../../constants/currencyList";

export default function TariffCalc({
  currency,
  setCurrency,
  currencyArray,
  calc,
  setCalc,
}) {
  let period = ["месяц", "год"];
  let choose_tariff = useRef(false);
  let choose_period = useRef(false);
  let choose_currency = useRef(false);

  function ChangeCurrency() {
    if (choose_currency.current.value != currency.OldCurr) {
      setCurrency({
        OldCurr: currency.NewCurr,
        NewCurr: currencyList[choose_currency.current.value].abbreviated,
      });
      return true;
    }
    return false;
  }

  function CalcNewPrice(Oldprice) {
    if (Oldprice) {
      let NewPrice = Math.floor(
        (Oldprice / currencyArray["RUB"]) * currencyArray[currency.NewCurr]
      );
      return NewPrice;
    }
    return false;
  }

  function CalculateTariff() {
    console.log(choose_period.current.value);
    AlltariffList.map((t) => {
      if (
        choose_tariff.current.value == t.name &&
        choose_period.current.value.substr(0, 3) == t.period
      ) {
        setCalc({
          name: choose_tariff.current.value,
          period: choose_period.current.value,
          currency: currencyList[choose_currency.current.value].full_name,
          discount: t.discount,
          price: CalcNewPrice(t.price),
        });
      }
    });
  }

  return (
    <div className="setting_and_result">
      <div className="tariff_calc">
        <div className="select">
          <h3>Выберите тариф</h3>
          <select className="choose_tariff_name" ref={choose_tariff}>
            {tariffs.map((tariff) => {
              return (
                <option key={tariff.name} value={tariff.name}>
                  {tariff.name.charAt(0) +
                    tariff.name.substring(1).toLowerCase()}
                </option>
              );
            })}
          </select>
        </div>
        <div className="currency_and_term">
          <div className="select">
            <h4>Выберите валюту</h4>
            <select
              className="choose_currency"
              ref={choose_currency}
              onChange={ChangeCurrency}
            >
              {currencyList.map((curr) => {
                return (
                  <option key={curr.abbreviated} value={curr.id}>
                    {curr.abbreviated}
                  </option>
                );
              })}
            </select>
          </div>{" "}
          <div className="select">
            <h4>Выберите период</h4>
            <select className="choose_period" ref={choose_period}>
              {period.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="calc_bttn" onClick={CalculateTariff}>
          <span>Рассчитать</span>
        </div>
      </div>
      {calc && (
        <>
          <div className="calc_result">
            <div className="result_list">
              <div className="choosen_tariff result_list_item">
                <span>тариф</span>
                <div className="dotted_line"></div>
                <span>{calc.tariff}</span>
              </div>
              <div className="choosen_currency result_list_item">
                <span>валюта</span>
                <div className="dotted_line"></div>
                <span>{calc.currency}</span>
              </div>
              <div className="choosen_period result_list_item">
                <span>период оплаты</span>
                <div className="dotted_line"></div>
                <span>{calc.period}</span>
              </div>

              <div className="discount">
                <span>скидка - {calc.discount}</span>
              </div>
            </div>
            <div className="result">
              ИТОГО:{" "}
              <div className="result_price">
                <span> {calc.price} </span>
              </div>
              {calc.currency}
            </div>
          </div>
        </>
      )}
      {!calc && (
        <>
          <h1 className="dont_have_result">ВЫБЕРИТЕ ТАРИФ</h1>
        </>
      )}
    </div>
  );
}

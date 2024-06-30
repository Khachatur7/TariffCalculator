import "./Tariff.css";

export default function Tariff({ TariffObject }) {
  let ids = ["dontHaveData", "level_one", "level_two"];
  let tariffLevel = TariffObject.period == "месяц" ? ids[1] : ids[2];

  return (
    <div className="parent">
      <div
        className="tariff_border_animation"
        id={TariffObject ? tariffLevel : ids[0]}
      >
        <div className="tariff_card">
          {TariffObject && (
            <>
              <div className="top_content">
                {" "}
                <div className="name">
                  <span>
                    <i>{TariffObject.name}</i>
                  </span>
                </div>
                <div className="about_tariff">
                  <span>Подробнее о тарифе ⮟</span>
                </div>
                <div className="tariff_discount">
                  <span>скидка - {TariffObject.discount}</span>
                </div>
              </div>
              <div className="bottom_content">
                <div className="price_info">
                  {TariffObject.discount && (
                    <>
                      <div className="price_without_discount">
                        <span>
                          {TariffObject.discount.substr(0, 2) > 0 &&
                            Math.round(
                              Math.floor(
                                (TariffObject.price * 100) /
                                  (100 - TariffObject.discount.substr(0, 2))
                              ) / 100
                            ) * 100}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="price">
                    <span>{TariffObject.price}</span>
                  </div>
                  <div className="currency_and_period">
                    <div className="currency">
                      <span>{TariffObject.currency.substr(0, 3)}</span>
                    </div>
                    <div className="fraction"></div>
                    <div className="period">
                      <span>{TariffObject.period.substr(0, 3)}</span>
                    </div>
                  </div>
                </div>
                <button className="choose_tariff_bttn">
                  <span>Выбрать</span>
                </button>
              </div>
            </>
          )}
          {!TariffObject && (
            <>
              <h2 className="empty_card">Пусто</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

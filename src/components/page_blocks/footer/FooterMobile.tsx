import {
  layout_cards_logo_logo_mastercard_png,
  layout_cards_logo_logo_visa_png,
  layout_icons_ico_download_white_svg,
  layout_icons_ico_forward_white_svg,
  layout_logo_sultan_white_svg,
  layout_socials_telegram_svg,
  layout_socials_whatsapp_svg,
} from "../../../images";

export const FooterMobile = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper body-wrapper">
        <div className="footer__columns">
          <div className="footer__column footer__column_logo">
            <div className="footer__logo-wrapper">
              <a href="/">
                <img
                  src={layout_logo_sultan_white_svg}
                  alt="sultan"
                  className="footer__logo"
                />
              </a>
              <button className="footer-column__button footer-column__button_yellow">
                Прайс-лист
                <img src={layout_icons_ico_download_white_svg} alt="download" />
              </button>
            </div>
            <div className="footer__about">
              Компания «Султан» — снабжаем розничные магазины товарами "под
              ключ" в Кокчетаве и Акмолинской области
            </div>
            <div className="footer__subscribe-discount subscribe-discount">
              <label>Подпишись на скидки и акции</label>
              <div className="subscribe-discount__field">
                <input type="text" placeholder="Введите ваш E-mail" />
                <button>
                  <img src={layout_icons_ico_forward_white_svg} alt="forward" />
                </button>
              </div>
            </div>
          </div>
          <div className="footer__column-wrapper">
            <div className="footer__column footer-column">
              <div className="footer-column__title">Меню сайта:</div>
              <a href="/" className="footer-column__item">
                О компании
              </a>
              <a href="/" className="footer-column__item">
                Доставка и оплата
              </a>
              <a href="/" className="footer-column__item">
                Возврат
              </a>
              <a href="/" className="footer-column__item">
                Контакты
              </a>
            </div>
            <div className="footer__column footer-column">
              <div className="footer-column__title">Категории:</div>
              <a href="/" className="footer-column__item">
                Бытовая химия
              </a>
              <a href="/" className="footer-column__item">
                Косметика и гигиена
              </a>
              <a href="/" className="footer-column__item">
                Товары для дома
              </a>
              <a href="/" className="footer-column__item">
                Товары для детей и мам
              </a>
              <a href="/" className="footer-column__item">
                Посуда
              </a>
            </div>
          </div>
          <div className="footer__column-wrapper">
            <div className="footer__column footer-column">
              <div className="footer-column__title">Контакты:</div>
              <div className="footer__contacts footer-contacts">
                <div className="footer-contacts__phone">+7 (777) 490-00-91</div>
                <div className="footer-contacts__work-time">
                  время работы: 9:00-20:00
                </div>
                <a href="/" className="footer-contacts__order-call">
                  Заказать звонок
                </a>
                <div className="footer-contacts__mail">
                  opt.sultan@mail.ru
                  <br />
                  <sub>На связи в любое время</sub>
                </div>
                <div className="footer-contacts__cards">
                  <a href="/">
                    <img src={layout_cards_logo_logo_visa_png} alt="visa" />
                  </a>
                  <a href="/">
                    <img
                      src={layout_cards_logo_logo_mastercard_png}
                      alt="mastercard"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer__column footer__column_messagers footer-column footer-column_messagers">
              <div className="footer-column__item">Связь в мессенджерах:</div>
              <div className="socials">
                <a href="/" className="socials__link socials__link_whatsapp">
                  <img src={layout_socials_whatsapp_svg} alt="whatsapp" />
                </a>
                <a href="/" className="socials__link socials__link_telegram">
                  <img src={layout_socials_telegram_svg} alt="telegram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

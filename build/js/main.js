import IMask from 'imask';
import focusTrap from 'focus-trap';

(function () {
  let accordionItems = document.querySelectorAll('.accordion');
  let accordionPanes = document.querySelectorAll('.accordion__pane');

  let hidePane = function (button, pane) {
    button.classList.add('accordion__header--inactive');
    pane.classList.add('accordion__pane--hidden');
  };

  let showPane = function (button, pane) {
    button.classList.remove('accordion__header--inactive');
    pane.classList.remove('accordion__pane--hidden');
  };

  let toggleAccordion = function (evt) {
    Array.prototype.forEach.call(accordionPanes, function (accordionPane) {
      let button = accordionPane
          .closest('.accordion')
          .querySelector('.accordion__header');
      if (
        (button === evt.target &&
          !button.classList.contains('accordion__header--inactive')) ||
        button !== evt.target
      ) {
        hidePane(button, accordionPane);
      } else if (button === evt.target) {
        showPane(button, accordionPane);
      }
    });
  };

  Array.prototype.forEach.call(accordionItems, function (accordion) {
    let accordionToggleButton = accordion.querySelector('.accordion__header');
    let accordionPane = accordion.querySelector('.accordion__pane');
    hidePane(accordionToggleButton, accordionPane);
    accordionToggleButton.addEventListener('click', toggleAccordion);
  });
})();

(function () {
  let KEYCODE = {
    esc: 27,
  };
  let link = document.querySelector('.page-header__contacts-button');
  let popup = document.querySelector('.modal');
  if (popup) {
    let close = popup.querySelector('.modal__close');
    let form = popup.querySelector('.modal__form');
    let userName = popup.querySelector('#call-name');
    let phone = popup.querySelector('#call-phone');
    let message = popup.querySelector('#call-question');
    let isStorageSupport = true;
    let storage = {};
    let body = document.querySelector('.body');
    let focusTrap = require('focus-trap');
    let modalFocusTrap = focusTrap.createFocusTrap('.modal');

    const existVerticalScroll = () => {
      return document.body.offsetHeight > window.innerHeight;
    };

    const getBodyScrollTop = () => {
      return (
        self.pageYOffset ||
        (document.documentElement && document.documentElement.ScrollTop) ||
        (document.body && document.body.scrollTop)
      );
    };

    link.addEventListener('click', (e) => {
      e.preventDefault();

      body.dataset.scrollY = getBodyScrollTop();

      popup.classList.add('modal--show');
      modalFocusTrap.activate(); // новая строка. Активируем плагин

      if (existVerticalScroll()) {
        body.classList.add('body__lock');
        body.style.top = `-${body.dataset.scrollY}px`;
      }
    });

    close.addEventListener('click', (e) => {
      e.preventDefault();

      popup.classList.remove('modal--show');
      modalFocusTrap.deactivate(); // новая строка. Отключаем плагин

      if (existVerticalScroll()) {
        body.classList.remove('body__lock');
        window.scrollTo(0, body.dataset.scrollY);
      }
    });

    let openPopup = function () {
      popup.classList.add('modal--show');
      document.body.classList.add('disable__scroll');
    };

    let closePopup = function () {
      popup.classList.remove('modal--show');
      document.body.classList.remove('disable__scroll');
    };
    try {
      storage.name = localStorage.getItem('name');
      storage.phone = localStorage.getItem('phone');
      storage.message = localStorage.getItem('message');
    } catch (err) {
      isStorageSupport = false;
    }

    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      openPopup();

      if (storage.name) {
        userName.value = storage.name;
        phone.value = storage.phone;
        message.value = storage.message;
        message.focus();
      } else {
        userName.focus();
      }
    });

    close.addEventListener('click', function (evt) {
      evt.preventDefault();
      closePopup();
    });

    form.addEventListener('submit', function () {
      if (isStorageSupport) {
        localStorage.setItem('name', userName.value);
        localStorage.setItem('phone', phone.value);
        localStorage.setItem('message', message.value);
      }
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEYCODE.esc) {
        evt.preventDefault();
        if (popup.classList.contains('modal--show')) {
          closePopup();
        }
      }
    });

    popup.addEventListener('click', function (evt) {
      if (evt.target === popup) {
        closePopup();
      }
    });
  }
})();

let btnShow = document.querySelector('.about-us__button');
let hiddenText = document.querySelector('.about-us__text--hidden');

btnShow.addEventListener('click', function () {
  hiddenText.classList.toggle('about-us__text--show');
  btnShow.innerHTML = 'Свернуть';

  if (!hiddenText.classList.contains('about-us__text--show')) {
    btnShow.innerHTML = 'Подробнее';
  }
});

let elements = document.querySelectorAll('.imaskjs');

for (let i = 0; i < elements.length; i++) {
  new IMask(elements[i], {
    mask: '+{7}(000)000-00-00',
  });
}

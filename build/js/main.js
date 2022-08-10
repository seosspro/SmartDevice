(function () {
  let accordionItems = document.querySelectorAll('.accordion');
  let accordionPanes = document.querySelectorAll('.accordion__pane');

  let hidePane = function (button, pane) {
    button.classList.add('accordion__toggle--inactive');
    pane.classList.add('accordion__pane--hidden');
  };

  let showPane = function (button, pane) {
    button.classList.remove('accordion__toggle--inactive');
    pane.classList.remove('accordion__pane--hidden');
  };

  let toggleAccordion = function (evt) {
    Array.prototype.forEach.call(accordionPanes, function (accordionPane) {
      let button = accordionPane.closest('.accordion').querySelector('.accordion__toggle');
      if (button === evt.target && !button.classList.contains('accordion__toggle--inactive') || button !== evt.target) {
        hidePane(button, accordionPane);
      } else if (button === evt.target) {
        showPane(button, accordionPane);
      }
    });
  };

  Array.prototype.forEach.call(accordionItems, function (accordion) {
    let accordionToggleButton = accordion.querySelector('.accordion__toggle');
    let accordionPane = accordion.querySelector('.accordion__pane');
    hidePane(accordionToggleButton, accordionPane);
    accordionToggleButton.addEventListener('click', toggleAccordion);
  });
})();
(function () {
  let accordionItems = document.querySelectorAll('.accordion');
  let accordionPanes = document.querySelectorAll('.accordion__pane');

  let hidePane = function (button, pane) {
    button.classList.add('accordion__toggle--inactive');
    pane.classList.add('accordion__pane--hidden');
  };

  let showPane = function (button, pane) {
    button.classList.remove('accordion__toggle--inactive');
    pane.classList.remove('accordion__pane--hidden');
  };

  let toggleAccordion = function (evt) {
    Array.prototype.forEach.call(accordionPanes, function (accordionPane) {
      let button = accordionPane.closest('.accordion').querySelector('.accordion__toggle');
      if (button === evt.target && !button.classList.contains('accordion__toggle--inactive') || button !== evt.target) {
        hidePane(button, accordionPane);
      } else if (button === evt.target) {
        showPane(button, accordionPane);
      }
    });
  };

  Array.prototype.forEach.call(accordionItems, function (accordion) {
    let accordionToggleButton = accordion.querySelector('.accordion__toggle');
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
  let close = popup.querySelector('.modal__close');
  let form = popup.querySelector('.modal__form');
  let userName = popup.querySelector('#call-name');
  let phone = popup.querySelector('#call-phone');
  let message = popup.querySelector('#call-question');
  let isStorageSupport = true;
  let storage = {};

  let openPopup = function () {
    popup.classList.add('modal--show');
    document.body.classList.add('disable-scroll');
  };

  let closePopup = function () {
    popup.classList.remove('modal--show');
    document.body.classList.remove('disable-scroll');
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
})();

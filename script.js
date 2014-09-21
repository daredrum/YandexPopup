/**
 * Variant 1 *
 */
var PopupOne = function() {

  $(document).on('click', '[data-popup-id]', onClickTrigger);
  $(document).on('click', '[data-popup="close"]', onClickClose);
  $(document).on('click', '[data-popup="layout"]', onClickClose);
  
  function onClickTrigger(e) {
    e.preventDefault();
    var idPopup = $(e.target).data('popup-id');
    show(idPopup);
  }
  
  function onClickClose(e) {
    e.preventDefault();
    close();
  } 
  
  function show(id) {
    var popup = $('#' + id);
    popup.show();
    setCoords(popup);
    $('[data-popup="layout"]').show(); 
  }
  
  function close() {
    $('[data-popup="layout"]').hide();
    $('[data-popup="block"]').hide(); 
  }
  
  function setCoords(elem) {
    var scrollTop = $(window).scrollTop(),
        scrollLeft = $(window).scrollLeft(),
        winHeight = $(window).height(),
        winWidth = $(window).width(),
        popupHeight = elem.outerHeight(),
        popupWidth = elem.outerWidth();
        
    var top = (winHeight - popupHeight)/2 + scrollTop,
        left = (winWidth - popupWidth)/2 + scrollLeft;
        
    elem.css({
      top: top + 'px',
      left: left + 'px'  
    });
  }
}

var popupOne = new PopupOne();

/**
 * Variant 2
 * @options module options 
 ** @trigger button to open the popup
 ** @closer button to close the popup
 ** @animation type of animation: 'none', 'fade', 'slideup'. default is 'none'
 ** @animationSpeed speed of animation. it's used only when 'animation' isn't 'none'. default is 400
 ** @closeonbackgroundclick closure handlers by clicking background: 'true' or 'false'. default is 'true'
 */

var PopupTwo = function(options) {
  this._trigger = options.trigger || '.popup-trigger';
  this._closer = options.closer || '.popup-close';
  this._animation = options.animation || 'none';
  this._animationSpeed = options.animationSpeed || 400;
  this._closeonbackgroundclick = options.closeonbackgroundclick || true;
  
  $(document).on('click', this._trigger, this._onClickTrigger.bind(this));
  if (this._closeonbackgroundclick) {
    $(document).on('click', '.c-popup_two__layout', this._onClickClose.bind(this));
  }
}

PopupTwo.prototype._onClickTrigger = function(e) {
  e.preventDefault();
  var idPopup = $(e.target).attr('href');
  this._show(idPopup);
}

PopupTwo.prototype._onClickClose = function(e) {
  e.preventDefault();
  this._close();
} 

PopupTwo.prototype._show = function(id) {
  var popup = $(id);
  popup.css({ top: '-' + popup.outerHeight() + 'px' }).show();
  this._setCoords(popup);
  $('.c-popup_two__layout').show();
  
  popup.on('click', this._closer, this._onClickClose.bind(this));
}

PopupTwo.prototype._close = function() {
    switch (this._animation) {
    case 'fade':
      $('.c-popup_two').animate({ opacity: 0 }, this.__animationSpeed);
      $('.c-popup_two__layout').animate({ opacity: 0 }, this.__animationSpeed, this._hide);
      break;
    case 'slideup':
      $('.c-popup_two').animate({
        top: '-' + $('.c-popup_two').outerHeight() + 'px',
        opacity: 1 
      }, this.__animationSpeed, this._hide);
      $('.c-popup_two__layout').css({ opacity: 1 });
      break;
    default:
      $('.c-popup_two').css({ opacity: 1 });
      $('.c-popup_two__layout').css({opacity: 1});
      this._hide();
  }
}

PopupTwo.prototype._hide = function() {
  $('.c-popup_two').hide();
  $('.c-popup_two__layout').hide();
}

PopupTwo.prototype._setCoords = function (elem) {
  var winHeight = $(window).height(),
      winWidth = $(window).width(),
      popupHeight = elem.outerHeight(),
      popupWidth = elem.outerWidth();
      
  var top = (winHeight - popupHeight)/2,
      left = (winWidth - popupWidth)/2;
  
  this._animate(elem, top, left); 
}

PopupTwo.prototype._animate = function(elem, top, left) {
  switch (this._animation) {
    case 'fade':
      elem.css({
        top: top + 'px',
        left: left + 'px'  
      }).animate({opacity: 1}, this.__animationSpeed);
      $('.c-popup_two__layout').animate({opacity: 1}, this.__animationSpeed);
      break;
    case 'slideup':
      elem.css({
        left: left + 'px',
      }).animate({
        top: top + 'px',
        opacity: 1
      }, this.__animationSpeed);
      $('.c-popup_two__layout').animate({opacity: 1}, this.__animationSpeed);
      break;
    default:
      elem.css({
        top: top + 'px',
        left: left + 'px',
        opacity: 1
      });
      $('.c-popup_two__layout').css({opacity: 1});
  }
}

var popupTwo = new PopupTwo({
  trigger: '.c-popup__trigger',
  closer: '.c-popup__close',
  animation: 'fade',
  animationSpeed: 1000,
  closeonbackgroundclick: false
});

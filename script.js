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
 ** @close button to close the popup
 */

var PopupTwo = function(options) {
  this._trigger = options.trigger || '.popup-trigger';
  this._closer = options.close || '.popup-close';
  
  $(document).on('click', this._trigger, this._onClickTrigger.bind(this));
  $(document).on('click', '.c-popup_two__layout', this._onClickClose.bind(this));
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
  popup.show();
  this._setCoords(popup);
  $('.c-popup_two__layout').show();
  
  popup.on('click', this._closer, this._onClickClose.bind(this));
}

PopupTwo.prototype._close = function() {
    $('.c-popup_two').hide();
    $('.c-popup_two__layout').hide(); 
  }

PopupTwo.prototype._setCoords = function (elem) {
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

var popupTwo = new PopupTwo({
  trigger: '.c-popup__trigger',
  close: '.c-popup__close'
});

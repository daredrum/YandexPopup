/***
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

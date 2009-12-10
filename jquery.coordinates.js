jQuery.fn.coordinates = function(options) {
  var mouse_down = false;
  var offset = null;
  var height = null;
  var width = null;
  var scroll_top = null;
  var scroll_left = null;
  var mouse_x = 0;
  var mouse_y = 0;
  
  options = jQuery.extend({
    delay: 250,
    grid: true,
    grid_color: "#333"
  }, options || {});

  var init = function(obj) {
    offset = obj.offset();
    height = obj.height();
    width = obj.width();
    scroll_top = jQuery(document).scrollTop();
    scroll_left = jQuery(document).scrollLeft();
    
    if (options.grid) {
      obj.css({position: 'relative'})
      obj.append("<div style='position: absolute; height:50%; width: 100%; border-bottom: 1px solid " + options.grid_color + ";'></div>")
      obj.append("<div style='position: absolute; top: 0; height:100%; width: 50%; border-right: 1px solid " + options.grid_color + ";'></div>")
    }
  };
  
  var mouseTrackingLoop = function() {
    if (mouse_down) {
      options.callback(((mouse_x - offset.left + scroll_left)*2/width - 1), ((mouse_y - offset.top + scroll_top)*2/height - 1));
      setTimeout(function() { mouseTrackingLoop(); }, options.delay);
    }
  }

  jQuery(this).mousedown(function(e) {
    offset = jQuery(this).offset();
    height = jQuery(this).height();
    width = jQuery(this).width();
    scroll_top = jQuery(document).scrollTop();
    scroll_left = jQuery(document).scrollLeft();

    mouse_down = true;
    mouse_x = e.clientX;
    mouse_y = e.clientY;
    mouseTrackingLoop();
    return false;
  });

  jQuery(this).mousemove(function(e) {
    mouse_x = e.clientX;
    mouse_y = e.clientY;
    return false;
  });

  var endMouseUp = function() {
    mouse_down = false;
  }

  jQuery(this).mouseup(function() {
    endMouseUp();
  });

  jQuery("body").mouseup(function() {
    endMouseUp();
  });

  init(this);
};

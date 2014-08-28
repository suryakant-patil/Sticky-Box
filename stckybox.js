		var isMoz = $.browser.mozilla;
	  var mozMatrix = /matrix\(\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*\,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/;
	  function getMozTransformProp(prop) {
		  var mMatrix = { y: 0 };
		  var match = transformString.match(mozMatrix);
		  if (match) { mMatrix.y = match[2]; }
		  return mMatrix;
	  }
	  var flot = $('.sticky'); //Sticky element Classname or Id
	  var _top = flot.offset().top;

	  var getMatrix = null;
	  getMatrix = window.getComputedStyle(flot.get(0));
	  var matrix;
	  if (!isMoz) {
		  matrix = window.WebKitCSSMatrix ? new WebKitCSSMatrix(getMatrix.webkitTransform).m42 : new MSCSSMatrix(getMatrix.transform).m42;
	  } else {
		  var transForm = getMatrix.MozTransform;
		  var t = getMozTransformProp(transForm);
		  matrix = t.f;
	  }
	  var doFloat = function () {
		  var w = $(document).scrollTop(), winht = screen.availHeight, ftPos = $('footer').offset().top, fHt = flot.innerHeight(true);
		  offset = (matrix + $(document).scrollTop()) - _top;
		  if (w < (ftPos-fHt) && w > _top) {
			  $(flot).css({ '-webkit-transform': 'translateY(' + offset + 'px)', '-moz-transform': 'translateY(' + offset + 'px)', 'transform': 'translateY(' + offset + 'px)' });
		  }
		  if (w < _top) {
			  $(flot).css({ '-webkit-transform': 'translateY(0px)', '-moz-transform': 'translateY(0px)', 'transform': 'translateY(0px)' });
		  }
	  }
	  window.addEventListener('scroll', function () {
		  doFloat();
	  }, false);

	  doFloat();
// JavaScript Document

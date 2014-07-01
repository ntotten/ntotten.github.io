    var highlight = ace.require("ace/ext/static_highlight")
    var dom = ace.require("ace/lib/dom")
    function qsa() {
        return Array.apply(null, document.getElementsByTagName('code'));
    }

    qsa().forEach(function (codeEl) {
    	  var mode, lang = codeEl.getAttribute("data-lang");
    	  if (lang) {
    	  	mode = 'ace/mode/' + lang;
    	  } else {
    	  	mode = 'ace/mode/text';
    	  }
        highlight(codeEl, {
            mode: mode,
            theme: 'ace/theme/twilight',
            startLineNumber: 1,
            showGutter: true,
            trim: true
        }, function (highlighted) {
            
        });
    });
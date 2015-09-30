/*
lazyQuery 1.0.0
jQuery-like library
 */

$Z.version = '1.0.0';

function $Z(param) {
    if (param == document) {
        return new _ZDocument(document);
    }
    else if (typeof param == 'string') {
            return new _ZSelector(param);
    }
    else if (param instanceof HTMLElement) {
        return new _ZElement(param);
    }
    else {
    }
}

function _ZDocument(document) {
    this.ready = function(callback) {
      window.addEventListener('load', callback);
    };

    this.on = function(event, callback) {
        document.addEventListener(event, callback);
    }
}

function _ZElement(element) {
    this.click = function(callback) {
        _addEventListenerToElements(element, 'click', callback);
    };

    this.dblclick = function(callback) {
        _addEventListenerToElements(element, 'dblclick', callback);
    };

    this.css = function(property, value) {
        if (value == undefined) {
            return _getCSSPropertyValue(element, property);
        }
        else {
            _setCSSPropertyOnElements(element, property, value);
        }
    };
    // TODO two calls to hide replace proper state?
    this.hide = function() {
        if (element.lastDisplayState != 'none')
        {
            element.lastDisplayState = _getCSSPropertyValue(element, 'display');
            console.log(element.lastDisplayState);
            _setCSSPropertyOnElements(element, 'display', 'none');
        }
    };

    this.show = function() {
        console.log(element.lastDisplayState);

        _setCSSPropertyOnElements(element, 'display', (element.lastDisplayState != undefined ? element.lastDisplayState : 'initial'));
    };

    this.toggle = function() {
        if (_getCSSPropertyValue(element, 'display') == 'none') {
            _setCSSPropertyOnElements(element, 'display', (element.lastDisplayState != undefined ? element.lastDisplayState : 'initial'));

        }
        else {
            if (element.lastDisplayState != 'none')
            {
                element.lastDisplayState = _getCSSPropertyValue(element, 'display');
                console.log(element.lastDisplayState);
                _setCSSPropertyOnElements(element, 'display', 'none');
            }
        }
    };

    this.on = function(event, callback) {
      _addEventListenerToElements(element, event, callback);
    };

}

function _ZSelector(selector) {  // Let's assume for the simplicity that selector is just an HTML element type, e.g., p.
    selector = selector.trim();
    var elements;

    // id
    if (selector.charAt(0) === '#') {
        elements = document.getElementById(selector.substring(1));
    }
    // class
    else if (selector.charAt(0) === '.') {
        elements = document.getElementsByClassName(selector.substring(1));
    }
    // tag name
    else if (document.getElementsByTagName(selector).length != 0 ) {
        elements = document.getElementsByTagName(selector);
    }

    this.click = function(callback) {
        _addEventListenerToElements(elements, 'click', callback);
    };

    this.dblclick = function(callback) {
        _addEventListenerToElements(elements, 'dblclick', callback);
    };

    this.css = function(property, value) {
        if (value == undefined) {
            return _getCSSPropertyValue(elements, property);
        }
        else {
            _setCSSPropertyOnElements(elements, property, value);
        }
    };

    this.hide = function() {
        if (elements.length == undefined) { // single element
            if (elements.lastDisplayState != 'none')
            {
                elements.lastDisplayState = _getCSSPropertyValue(elements, 'display');
                console.log(elements.lastDisplayState);
                _setCSSPropertyOnElements(elements, 'display', 'none');
            }
        }
        else {
         for (var i = 0; i < elements.length; i++) {
             if (elements[i].lastDisplayState != 'none')
             {
                 elements[i].lastDisplayState = _getCSSPropertyValue(elements[i], 'display');
                 console.log(elements[i].lastDisplayState);
                 _setCSSPropertyOnElements(elements[i], 'display', 'none');
             }
         }
        }
    };

    this.show = function() {
        if (elements.length == undefined) { // single element
            _setCSSPropertyOnElements(elements, 'display', (elements.lastDisplayState != undefined ? elements.lastDisplayState : 'initial'));
        }
        else {
            for (var i = 0; i < elements.length; i++) {
                _setCSSPropertyOnElements(elements[i], 'display', (elements[i].lastDisplayState != undefined ? elements[i].lastDisplayState : 'initial'));
            }
        }
    };

    this.toggle = function() {
        //if (elements.length ==)


        if (_getCSSPropertyValue(element, 'display') == 'none') {
            _setCSSPropertyOnElements(element, 'display', (element.lastDisplayState != undefined ? element.lastDisplayState : 'initial'));

        }
        else {
            if (element.lastDisplayState != 'none')
            {
                element.lastDisplayState = _getCSSPropertyValue(element, 'display');
                console.log(element.lastDisplayState);
                _setCSSPropertyOnElements(element, 'display', 'none');
            }
        }
    };

    this.on = function(event, callback) {
        _addEventListenerToElements(elements, event, callback);
    };

}

function _addEventListenerToElements(elements, event, callback) {
    if (elements.length == undefined) { // single element
        elements.addEventListener(event, callback);
    }
    else {
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener(event, callback);
        }
    }

}

function _getCSSPropertyValue(element, property) {
    if (element.length > 1) {
        console.log('muliple elements selected')  ;
        return;
    }
    return element.style[property];
}

function _setCSSPropertyOnElements(elements, property, value) {
    console.log(elements);
    if (elements.length == undefined || elements.length == null) { // single element
        elements.style[property] = value;
    }
    else {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style[property] = value;
        }
    }
}

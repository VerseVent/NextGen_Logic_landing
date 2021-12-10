/**
 * Element class
 * > generate a node
 **/
 class Element {
    /**
     Class constructor
     **/
    constructor(options = {}) {
        /**
         * global properties of the node
         * @type {{}}
         */
        this.node = {};
        /**
         * The location where we should insert the generated node
         * @type {{}}
         */
        this.where = {};
        /**
         * Events binbed to the node
         * @type {{}}
         */
        this.events = {};
        /**
         * The created element
         */
        this.element = null;
        for (const key in options) {
            if (this.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        this.createNode();
        return this.element;
    }
    /**
     Bind events to the node
     **/
    bindEventsListeners() {
        for (const key in this.events) {
            this.element.addEventListener(key, this.events[key]);
        }
    }
    /**
     Create the node
     **/
    createNode() {
        const node = document.createElement(this.node.name);
        if (this.node.content)
            node.innerHTML = this.node.content;
        for (const key in this.node.attrs) {
            node.setAttribute(key, this.node.attrs[key]);
        }
        this.where.destination.insertAdjacentElement(this.where.position, node);
        this.element = node;
        if (this.element && this.events) {
            this.bindEventsListeners();
        }
    }
}
// ---------------
// FUNCTIONS
// ---------------
/**
 * On input click
 * @param e
 */
function inputClick(e) {
    const target = e.currentTarget, classes = target.classList;
    if (!classes.contains('collapse') && !classes.contains('expand') && !classes.contains('active') && !target.getAttribute('readonly')) {
        const animationEnd = () => {
            target.removeEventListener('webkitAnimationEnd', animationEnd);
            target.removeEventListener('animationend', animationEnd);
            classes.remove('expand');
            target.focus();
        };
        classes.add('active', 'expand');
        target.addEventListener('webkitAnimationEnd', animationEnd);
        target.addEventListener('animationend', animationEnd);
        target.setAttribute('placeholder', 'EMAIL');
    }
}
/**
 * On input blur
 * @param e
 */
function inputBlur(e) {
    // Do not hesitate to tell me if you have a cleaner solution to get the active element inside the blur event ! :)
    setTimeout(() => {
        const input = e.target, button = input.nextSibling, target = document.activeElement, classes = input.classList;
        if (!classes.contains('expand') && classes.contains('active') && target !== button) {
            const placeholder = input.dataset.placeholder, animationEnd = () => {
                input.removeEventListener('webkitAnimationEnd', animationEnd);
                input.removeEventListener('animationend', animationEnd);
                classes.remove('collapse');
                input.blur();
            };
            classes.add('collapse');
            classes.remove('active');
            input.addEventListener('webkitAnimationEnd,', animationEnd);
            input.addEventListener('animationend', animationEnd);
            input.value = '';
            input.setAttribute('placeholder', placeholder);
        }
    }, 10);
}
/**
 * On form submit
 */
function formSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type=email]');
    input.dataset.placeholder = 'THANK YOU!';
    input.setAttribute('readonly', true);
    input.focus();
    input.blur();
}
// ---------------
// NODES CREATION
// ---------------
const main = new Element({
    'node': {
        'name': 'main'
    },
    'where': {
        'destination': document.querySelector('.btn-subscribe-animation'),
        'position': 'beforeEnd'
    }
}), form = new Element({
    'node': {
        'name': 'form'
    },
    'where': {
        'destination': main,
        'position': 'beforeEnd'
    },
    'events': {
        'submit': formSubmit
    }
}), input = new Element({
    'node': {
        'name': 'input',
        'attrs': {
            'type': 'email',
            'placeholder': 'NOTIFY ME',
            'data-placeholder': 'NOTIFY ME',
            'required': 'required'
        }
    },
    'where': {
        'destination': form,
        'position': 'beforeEnd'
    },
    'events': {
        'click': inputClick,
        'blur': inputBlur
    }
}), button = new Element({
    'node': {
        'name': 'button',
        'content': 'SEND',
        'attrs': {
            'type': 'submit',
            'placeholder': 'NOTIFY ME',
            'data-placeholder': 'NOTIFY ME'
        }
    },
    'where': {
        'destination': input,
        'position': 'afterEnd'
    }
});
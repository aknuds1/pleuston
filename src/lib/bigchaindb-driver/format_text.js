'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = formatText;

var _sprintfJs = require('sprintf-js');

// Regexes taken from or inspired by sprintf-js
var Regex = {
    TEMPLATE_LITERAL: /\${([^)]+?)}/g,
    KEY: /^([a-z_][a-z_\d]*)/i,
    KEY_ACCESS: /^\.([a-z_][a-z_\d]*)/i,
    INDEX_ACCESS: /^\[(\d+)\]/

    /**
     * imported from https://github.com/bigchaindb/js-utility-belt/
     * @private
     * Formats strings similarly to C's sprintf, with the addition of '${...}' formats.
     *
     * Makes a first pass replacing '${...}' formats before passing the expanded string and other
     * arguments to sprintf-js. For more information on what sprintf can do, see
     * https://github.com/alexei/sprintf.js.
     *
     * Examples:
     *   formatText('Hi there ${dimi}!', { dimi: 'Dimi' })
     *       => 'Hi there Dimi!'
     *
     *   formatText('${database} is %(status)s', { database: 'BigchainDB', status: 'big' })
     *       => 'BigchainDB is big'
     *
     * Like sprintf-js, string interpolation for keywords and indexes is supported too:
     *   formatText('Berlin is best known for its ${berlin.topKnownFor[0].name}', {
     *       berlin: {
     *           topKnownFor: [{
     *               name: 'Currywurst'
     *           }, ...
     *           ]
     *       }
     *   })
     *       => 'Berlin is best known for its Currywurst'
     */
};function formatText(s) {
    var expandedFormatStr = s;

    // Try to replace formats of the form '${...}' if named replacement fields are used

    for (var _len = arguments.length, argv = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        argv[_key - 1] = arguments[_key];
    }

    if (s && argv.length === 1 && _typeof(argv[0]) === 'object') {
        var templateSpecObj = argv[0];

        expandedFormatStr = s.replace(Regex.TEMPLATE_LITERAL, function (match, replacement) {
            var interpolationLeft = replacement;

            /**
             * @private
             * Interpolation algorithm inspired by sprintf-js.
             *
             * Goes through the replacement string getting the left-most key or index to interpolate
             * on each pass. `value` at each step holds the last interpolation result, `curMatch` is
             * the current property match, and `interpolationLeft` is the portion of the replacement
             * string still to be interpolated.
             *
             * It's useful to note that RegExp.exec() returns with an array holding:
             *   [0]:  Full string matched
             *   [1+]: Matching groups
             *
             * And that in the regexes defined, the first matching group always corresponds to the
             * property matched.
             */
            var value = void 0;
            var curMatch = Regex.KEY.exec(interpolationLeft);
            if (curMatch !== null) {
                value = templateSpecObj[curMatch[1]];

                // Assigning in the conditionals here makes the code less bloated
                /* eslint-disable no-cond-assign */
                while ((interpolationLeft = interpolationLeft.substring(curMatch[0].length)) && value != null) {
                    if (curMatch = Regex.KEY_ACCESS.exec(interpolationLeft)) {
                        value = value[curMatch[1]];
                    } else if (curMatch = Regex.INDEX_ACCESS.exec(interpolationLeft)) {
                        value = value[curMatch[1]];
                    } else {
                        break;
                    }
                }
                /* eslint-enable no-cond-assign */
            }

            // If there's anything left to interpolate by the end then we've failed to interpolate
            // the entire replacement string.
            if (interpolationLeft.length) {
                throw new SyntaxError('[formatText] failed to parse named argument key: ' + replacement);
            }

            return value;
        });
    }

    return _sprintfJs.sprintf.apply(undefined, [expandedFormatStr].concat(argv));
}
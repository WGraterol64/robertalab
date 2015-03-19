var UTIL = {};
(function($) {
    /**
     * Set cookie
     * @memberof UTIL
     * 
     * @param {key}
     *            Key of the cookie
     * @param {value}
     *            Value of the cookie
     */
    UTIL.setCookie = function(key, value) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    };

    /**
     * Get cookie
     * @memberof UTIL
     * 
     * @param {key}
     *            Key of the cookie to read
     */
    UTIL.getCookie = function (key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

    /**
     * Format date
     * @memberof UTIL
     * 
     * @param {date}
     *            date from server to be formatted
     */
    UTIL.formatDate = function (date) {
        if (date) {
            var YYYY = date.substring(0, 4);
            var MM = date.substring(5, 7);
            var DD = date.substring(8, 10);
            var hh = date.substring(11, 13);
            var mm = date.substring(14, 16);
            var ss = date.substring(17, 19);
            var str = DD + '.' + MM + '.' + YYYY + ', ' + hh + ':' + mm + ':' + ss;
            return str;
        }
        return "";
    }

    /**
     * Convert date into numeric value
     * @memberof UTIL
     * 
     * @param {d}
     *            date in the form 'dd.mm.yyyy, hh:mm:ss'
     */
    UTIL.parseDate = function (d) {
        var dayPart = d.split(', ')[0];
        var timePart = d.split(', ')[1];
        var day = dayPart.split('.')[0];
        var month = dayPart.split('.')[1] - 1;
        var year = dayPart.split('.')[2];
        var hour = timePart.split(':')[0];
        var minute = timePart.split(':')[1];
        var second = timePart.split(':')[2];
        var date = new Date(year, month, day, hour, minute, second);
        return date.getTime();
    }
    
    /**
     * Format result of server call for logging
     * @memberof UTIL
     * 
     * @param {result}
     *            Result-object from server call
     */
    UTIL.formatResultLog = function (result) {
        var str = "{";
        var comma = false;
        for (key in result) {
            if (comma) {
                str += ',';
            } else {
                comma = true;
            }
            str += '"' + key + '":';
            if (result.hasOwnProperty(key)) {
                // The output of items is limited to the first 100 characters
                if (result[key].length > 100) {
                    str += '"' + JSON.stringify(result[key]).substring(1, 100) + ' ..."';
                } else {
                    str += JSON.stringify(result[key]);
                }
            }
        }
        str += '}';
        return str;
    }
    
    /**
     * Extension of Jquery-datatables for sorting German date fields
     * @memberof UTIL
     */
    UTIL.initDataTables = function () {
        jQuery.extend(jQuery.fn.dataTableExt.oSort['date-de-asc'] = function(a, b) {
            a = UTIL.parseDate(a);
            b = UTIL.parseDate(b);
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        jQuery.fn.dataTableExt.oSort['date-de-desc'] = function(a, b) {
            a = UTIL.parseDate(a);
            b = UTIL.parseDate(b);
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        });
    }
    
    
    /**
     * Calculate height of data table
     * @memberof UTIL
     */
    UTIL.calcDataTableHeight = function() {
        return Math.round($(window).height() - 260);
    };

})($);

Handlebars.registerHelper("consoleLog", function(item) {
    console.log(item);
});

Handlebars.registerHelper("toDateString", function(value) {
  return value = value ? moment(value).format('MMMM DD, YYYY  -  h:mm A') : '--';
}); 

Handlebars.registerHelper("toDateStringTimeOnly", function(value) {
  return value = value ? moment(value).format('h:mm A') : '--';
});

Handlebars.registerHelper("toDateStringNotime", function(value) {
  return value = value ? moment(value).format('MMMM DD, YYYY') : '--';
});

Handlebars.registerHelper("dashNull", function(value) {
  return value = value === null ? '--' : value;
}); 

Handlebars.registerHelper("strYN", function(value) {
  return value = value ? 'Yes' : 'No';
}); 

Handlebars.registerHelper("count", function(value) {
  return value.length;
}); 

Handlebars.registerHelper("notEmpty", function(value) {
  return value.length !== 0;
}); 

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    'use strict';
    if (typeof v1 === 'function') { v1 = v1(); }
    if (typeof v2 === 'function') { v2 = v2(); }
    var operation = false;
    switch (operator) {
        case '==':
        case '===':
            operation = (v1 === v2);
        break;
        case '!=':
        case '!==':
            operation = (v1 !== v2);
        break;
        case '<':
            operation = (v1 < v2);
        break;
        case '<=':
            operation = (v1 <= v2);
        break;
        case '>':
            operation = (v1 > v2);
        break;
        case '>=':
            operation = (v1 >= v2);
        break;
        case '&&':
            operation = (v1 && v2);
        break;
        case '||':
            operation = (v1 || v2);
        break;
        default:
            operation = false;


    }
    if(operation) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
});

Handlebars.registerHelper('ifNotOne', function(value, options) {
  if(value === '1') {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('toTrimUnderscores', function(value) {
  return value = value ? value.split('_').join(' ').toLowerCase() : '';
});

Handlebars.registerHelper('chkPeriod', function(value) {
  if(value){
    value = value.indexOf('/*') > -1 ? value = value.split('/*')[0] : value;
  }else{
    value ='--';
  }
  return value;
});

Handlebars.registerHelper('sortByProps', function(arr, props) {
    'use strict';
     var sortByProps = arr.sort(function (a, b) {
      // if (a[props] > b[props]) {
      //   return 1;
      // }
      // if (a[props] < b[props]) {
      //   return -1;
      // }
      // // a must be equal to b
      // return 0;
      if(a[props]){
        return a[props].toLowerCase().localeCompare(b[props].toLowerCase());
      }
    });

    return sortByProps;
});

Handlebars.registerHelper('sortByProps2', function(arr, props) {
    'use strict';
     var sortByProps2 = arr.sort(function (a, b) {
      if(a.contentTemplate['name']){
        return a.contentTemplate['name'].toLowerCase().localeCompare(b.contentTemplate['name'].toLowerCase());
      }
    });
    return sortByProps2;
});

Handlebars.registerHelper('stringToArray', function(string) {
    'use strict';
    return string.split(',');
});

Handlebars.registerHelper('parseStringToHTML', function(str) {
    'use strict';
    return new Handlebars.SafeString(str);
});

//COPY FROM HERE

/**
 * Yahoo Finance API impotr JSON, parse and set
 * Example: =YAHOOF("DBK.DE" , "1h" , "1y")
 * @param
 *
 * @returns  date, open, high, low, close, value
 * @customfunction
 *
 *
 *@twitter.com/tabukmail
 */


function YAHOOF(stock, interval, start, end) {

//data for comparing and checking argument type
var stringType = "string";
var dateType = new Date();

//final date variables to return
var unixStart = 0;
var unixEnd = 0;


if(typeof start == stringType && start.length == 0 || start == null){start = null;}
if(typeof end == stringType && end.length == 0 || end == null){end = null;}

// ==========================================================

//check argument types and missed values ================
var argArr = [];
argArr.push(stock);
argArr.push(interval);
argArr.push(start);
argArr.push(end);


if(argArr.every(function(a){ return a == null; })){
    var resHelp = UrlFetchApp.fetch("https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/axhatm8f1b0i/b/bu/o/test.json");
    var contentHelp = resHelp.getContentText();
    var stage2 = JSON.parse(contentHelp);

    return stage2.map(function(item){ return item.help; });
}


//check type of argument STOCK
if(typeof argArr[0] != typeof stringType || argArr[0] == null || stock.length == 0){
        Logger.log('Argument [Stock] must be string');
        //insert error notification to sheet
        return "Argument [Stock] must be string";
}

if(argArr[1] == null || interval.length == 0){
        argArr[1] = "1h";
        interval = argArr[1];                                      // defoult value in case null argument
}else if(typeof argArr[1] != typeof stringType){
        Logger.log('Argument [Interval] must be string');
        //insert error notification to sheet
        return "Argument [Interval] must be string";
}else if(checkInterval(argArr[1]) == false){
        Logger.log('not correct value in [Interval]');
        return "not correct value for the argument [Interval] \n" + "accepted values [\"1m\",\"2m\", \"5m\", \"15m\", \"30m\", \"60m\", \"90m\", \"1h\",\"1d\", \"5d\", \"1wk\", \"1mo\", \"3mo\"]";
}

// ACTION IF start or END is NULL [DEFOULT VALUES AND NOTIFICATIONS]
if(argArr[2] == null || argArr[3] == null){

    if(argArr[2] != null && argArr[3] == null){

        if(checkRange(argArr[2]) == false){

            if(typeof argArr[2] != typeof stringType){
                return "[START] argument must be string format date MM/DD/YYYY";
            }

            var startUnix = stringToDate(argArr[2]);
            if(startUnix < 1 || argArr[2].length < 6 || argArr[2].length > 10 || isNaN(startUnix)){
                return "[START] argument must be string format date MM/DD/YYYY";
            }

            var nowUnix = stringToDate(dateType);
            if((nowUnix - startUnix) < 31556926){
                argArr[3] = dateType;
                unixStart = startUnix;
                unixEnd = nowUnix;

            }else{

                unixStart = startUnix;
                unixEnd = (startUnix + 31556926).toString();

            }

        }
        else{

            unixStart = argArr[2];

        }

    }
    if(argArr[2] == null && argArr[3] != null){

        if(typeof argArr[3] != typeof stringType){
            Logger.log('[END] argument must be string format date MM/DD/YYYY');
            return "Please correct [End] date argument - must be string format date MM/DD/YYYY";
        }

        var endUnix = stringToDate(argArr[3]);
        if(endUnix < 1 || argArr[3].length < 6 || argArr[3].length > 10 || isNaN(endUnix)){
            Logger.log('correct [End] date dude');
            return "Please correct [End] date argument - must be string format date MM/DD/YYYY";
        }else{

            unixStart = (endUnix - 31556926);
            unixEnd = endUnix;

        }
    }

}
//----------------------------------------------------------------------------

if(argArr[2] != null && argArr[3] != null){

    var startUnixBoth = stringToDate(argArr[2]);
    if(startUnixBoth < 1 || argArr[2].length < 6 || argArr[2].length > 10 || isNaN(startUnixBoth)){
        Logger.log('correct [Start] date dude ??');
        return "Please correct [Start] date argument";
    }else{
        unixStart = startUnixBoth;
    }

    //check type of argument end
    var endUnixBoth = stringToDate(argArr[3]);
    if(endUnixBoth < 1 || argArr[3].length < 6 || argArr[3].length > 10 || isNaN(endUnixBoth)){
        Logger.log('Please correct [end] date argument dude');
        return "Please correct [end] date argument dude";
    }else{
        unixEnd = endUnixBoth;
    }
}


if(argArr[2] == null && argArr[3] == null){
    argArr[2] = "1y";
    unixStart = argArr[2];
}

//--------------------------------------------------------
argArr[0] = stock;
argArr[1] = interval;
argArr[2] = (typeof unixStart == typeof stringType) ? unixStart : unixStart.toString();
argArr[3] = (typeof unixEnd == typeof stringType) ? unixEnd : unixEnd.toString();
//--------------------------------------------------------



var apiURL = 'https://query1.finance.yahoo.com/v8/finance/chart/';
var stockArg = argArr[0];
var inervalUrl = '?metrics=high?&interval=';
var intervalArg = argArr[1];
var rangeUrl = '&range=';
var rangeArg = argArr[2];
var startUrl = '&period1=';
var startArg = argArr[2];
var endtUrl = '&period2=';
var endArg = argArr[3];


if(argArr[3] == 0){
  var resultUrl= apiURL + stockArg + inervalUrl +  intervalArg + rangeUrl + rangeArg;

}

if(argArr[3] != 0){
  var resultUrl= apiURL + stockArg + inervalUrl +  intervalArg + startUrl + startArg + endtUrl + endArg;

}

Logger.log(resultUrl);

// single fetch: previously this hit the network twice (once to check the
// status code, once more to re-fetch the same content on success)
var fetchOptions = { 'muteHttpExceptions' : true };
var res = UrlFetchApp.fetch(resultUrl, fetchOptions);

if(res.getResponseCode() != 200){
    var errorData = JSON.parse(res.getContentText());
    var errorNote = errorData.chart.error.description;
    return "Yahoo respond :\n" + errorNote + "\nPlease increase your Interval value or decreas period \n";
}
Logger.log("200");

var content = res.getContentText();

var stage1 = JSON.parse(content);
var timeStamp = stage1.chart.result[0].timestamp;
var openPrice = stage1.chart.result[0].indicators.quote[0].open;
var highPrice = stage1.chart.result[0].indicators.quote[0].high;
var lowPrice = stage1.chart.result[0].indicators.quote[0].low;
var closePrice = stage1.chart.result[0].indicators.quote[0].close;
var volumes = stage1.chart.result[0].indicators.quote[0].volume;


// intervals where Yahoo timestamps mark a calendar day/period rather than an exact
// intraday instant; these must be read as UTC calendar dates, not shifted by the
// script's local timezone offset, or dates near UTC midnight roll back a day
// (e.g. weekly bars at 04:00 UTC becoming Sunday in US timezones behind UTC-4)
var dateOnlyIntervals = ["1d", "5d", "1wk", "1mo", "3mo"];

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  if(dateOnlyIntervals.includes(intervalArg)){
    var utcMidnight = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
    return 25569 + utcMidnight/86400000;
  }
  var date =25569 + (a.getTime()-a.getTimezoneOffset()*60000)/86400000;
  return date
}

var timeStampArr = [];
for(var j in timeStamp){
    var convertedDate = timeConverter(timeStamp[j])
     timeStampArr.push(convertedDate);
}

var resultArr = [["date","open","high","low","close", "volume"]];
for(var n = 0; n < timeStampArr.length; n++){
    resultArr.push([timeStampArr[n], openPrice[n], highPrice[n], lowPrice[n], closePrice[n], volumes[n]]);
}
return resultArr;
}


//======== helper functions (top-level so they aren't re-created on every call) ====####################

var VALID_INTERVALS = ["1m","2m", "5m", "15m", "30m", "60m", "90m", "1h","1d", "5d", "1wk", "1mo", "3mo"];
var VALID_RANGES = ["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"];
// intervals whose Yahoo timestamp is midnight UTC (only the trading day matters,
// no meaningful time-of-day) -- see timeConverter
var DATE_ONLY_INTERVALS = ["1wk", "1mo", "3mo"];

// check type of argument INTERVAL
function checkInterval(a){
    return VALID_INTERVALS.includes(a);
}

// check type of argument RANGE
function checkRange(r){
    return VALID_RANGES.includes(r);
}

// string -> unix timestamp (seconds)
function stringToDate(d){
    var dateArgBox = new Date(d);
    return Math.floor(dateArgBox.getTime() / 1000);
}

// unix timestamp (seconds) -> Google Sheets serial date
// dateOnly: use the UTC calendar day as-is (for bars anchored at midnight UTC)
// instead of shifting by the script's time zone, which can cross into the
// previous day
function timeConverter(UNIX_timestamp, dateOnly){
    var a = new Date(UNIX_timestamp * 1000);
    if(dateOnly){
        return 25569 + Math.floor(a.getTime() / 86400000);
    }
    return 25569 + (a.getTime() - a.getTimezoneOffset() * 60000) / 86400000;
}

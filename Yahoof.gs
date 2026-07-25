
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


var counter = 0;
   for(var i in argArr){
      if(argArr[i] == null){
       counter = counter + 1;
     }
   }


  if(counter == argArr.length){
    var resHelp = UrlFetchApp.fetch("https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/axhatm8f1b0i/b/bu/o/test.json");
    var contentHelp = resHelp.getContentText();
    var stage2 = JSON.parse(contentHelp);
    
    var helpArr = [];
    for(var r in stage2){
     helpArr.push(stage2[r].help);
    }
    return helpArr;
    }
  

//check type of argument STOCK 
if(typeof argArr[0] != typeof stringType || argArr[0] == null || stock.length == 0){
        Logger.log('Argument [Stock] must be string');
        //insert error notification to sheet
        return "Argument [Stock] must be string";
}

//======== FUNCTIONS TO CHECK DATA ===========================
/// check type of argument INTERVAL
function checkInterval(a){
    const intervals = ["1m","2m", "5m", "15m", "30m", "60m", "90m", "1h","1d", "5d", "1wk", "1mo", "3mo"];
    var interResult = intervals.includes(a);
    //Logger.log(interResult + "inter result");
    return interResult;
}


/// check type of argument RANGE
function checkRange(r){
    const intervals = ["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"];
    var interResultRange = intervals.includes(r);
    //Logger.log(interResult + "inter result");
    return interResultRange;
}


//functoin String to Date
function stringToDate(d){
  var dateArgBox = new Date(d);                                   
  var unixTS = Math.floor(dateArgBox.getTime() / 1000);
  return unixTS;
}

//functoin args == null values
function checkNull(n){
  var counter = 0;
   for(var i in n){
     if(n[i] == null){
       counter = counter + 1;
     }
   }
   if(counter == n.length){
     return true
   }else{
     return false
   }
  
}

//======== =========================== ===========================

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
            
               if(checkRange(argArr[2]) == false ){
                     
                    
                          if(typeof argArr[2] != typeof stringType){
                            return "[START] argument must be string format date MM/DD/YYYY"  ;
                          }
                          
                          if(stringToDate(argArr[2]) < 1 || argArr[2].length < 6 || argArr[2].length > 10 || isNaN(stringToDate(argArr[2])) ){
                           
                            //Logger.log(stringToDate(argArr[2]) );
                            return "[START] argument must be string format date MM/DD/YYYY";
                          }

            
                           if((stringToDate(dateType) - stringToDate(argArr[2])) < 31556926){
                                      argArr[3] = dateType;
                                      unixStart = (stringToDate(argArr[2]));
                                      unixEnd = stringToDate(argArr[3]);
                                     
                           }else{
                                      
                                      unixStart = (stringToDate(argArr[2]));
                                      unixEnd = Number(stringToDate(argArr[2]) + 31556926).toPrecision();
                                      
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
                          
                         if(stringToDate(argArr[3]) < 1 || argArr[3].length < 6 || argArr[3].length > 10 || isNaN(stringToDate(argArr[3]))){
                            Logger.log('correct [End] date dude');
                            return "Please correct [End] date argument - must be string format date MM/DD/YYYY";
                         }else{
                                
                                 unixStart = (stringToDate(argArr[3])-31556926);
                                 unixEnd = stringToDate(end);
                                 
                               }   
             }


}
//----------------------------------------------------------------------------

if(argArr[2] != null && argArr[3] != null){

 if(stringToDate(argArr[2]) < 1 || argArr[2].length < 6 || argArr[2].length > 10 || isNaN(stringToDate(argArr[2]))){
                  if (argArr[2] != null && argArr[3] != null){
                            Logger.log('correct [Start] date dude ??');
                            //Logger.log(stringToDate(argArr[2]) );
                            return "Please correct [Start] date argument";
                   
                    }
 
 }else{
     unixStart = stringToDate(argArr[2]);
 }


//check type of argument end
 if(stringToDate(argArr[3]) < 1 || argArr[3].length < 6 || argArr[3].length > 10 || isNaN(stringToDate(argArr[3]))){
                     if (argArr[2] != null && argArr[3] != null){       
                            Logger.log('Please correct [end] date argument dude');
                            //Logger.log(stringToDate(argArr[2]) );
                            return "Please correct [end] date argument dude";
                     }
    }else{
      unixEnd = stringToDate(argArr[3]);
    }
}


  if(argArr[2] == null && argArr[3] == null){
              argArr[2] = "1y";
              unixStart = argArr[2] ;
             //Logger.log(argArr[2] + " " + argArr[3]);

          }

//--------------------------------------------------------
argArr[0] = stock;
argArr[1] = interval;
argArr[2] = (typeof unixStart == typeof stringType) ? unixStart : unixStart.toPrecision();
argArr[3] = (typeof unixEnd == typeof stringType) ? unixEnd : unixEnd.toPrecision();
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

var errorNote;
function resHandler(url)
{
  var options = 
  {
  'muteHttpExceptions' : true
  };
  var response = UrlFetchApp.fetch(url, options);
  if(response.getResponseCode() == 200)
  {
     return true;
  }
  else
  {
    var contentError = response.getContentText();
    var stage2 = JSON.parse(contentError);
    errorNote = stage2.chart.error.description;


    return false;
  }
    
}


if (resHandler(resultUrl) == true){
   Logger.log("200")
}else{
   
   return "Yahoo respond :\n" + errorNote + "\nPlease increase your Interval value or decreas period \n";
}


var res = UrlFetchApp.fetch(resultUrl);
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
for(var n = 0;  n<= timeStampArr.length-1; n++){
     resultArr.push([timeStampArr[n],openPrice[n],highPrice[n],lowPrice[n], closePrice[n], volumes[n]],);
}
return resultArr;
}





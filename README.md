# Yahoo-Finance-for-Google-Sheets - (Historical Data)
## Google Apps Script for querying Yahoo! Finance API in Google Sheets  


◖◗ **Installation:**  
[1] Open your Google Sheet  
[2] Click **Extensions → Apps Script**  
[3] Delete any existing code in the **Code.gs** file that opens  
[4] Copy the full script from [**Yahoof.gs**](./Yahoof.gs), paste it in, then press **Ctrl+S** (or **Cmd+S** on Mac) to save  
[5] Go back to your Google Sheet — `=YAHOOF()` is now ready to use  
<br />
◖◗ **ARGUMENTS of the Function =YAHOOF():** <br />
**[Stock]** -> Stock name (ticker) listed on Yahoo Finance (No default value)<br /> 	
**[Interval]**->Time interval of requested data (acceptable values: ["1m","2m", "5m", "15m", "30m", "60m", "90m", "1h","1d", "5d", "1wk", "1mo", "3mo"])<br />  	
**[Start]** -> start date of the requested data (should be String format: "01/01/2022") or should be fixed range (acceptable values: ["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"])<br />  	
**[End]** -> end date of the requested data (should be String format: "01/01/2022")<br />   
<br />
◖◗ **EXAMPLES of usage with default and non default argument values:**<br />	
**= YAHOOF()**  -  [ Help Info ]	<br />
**= YAHOOF("DBK.DE")** -  retrives data about Stock "DBK.DE" with default "1h" [ interval = "1h" ] and default last period range "1y" [ start = "1y"]  	<br />
**= YAHOOF("DBK.DE", "1h")** -  retrives data about Stock "DBK.DE" with [ interval = "1h" ] and default period range [ start = "1y"] <br />	
**= YAHOOF("DBK.DE", "30m", "1mo")** -  retrieves data about Stock "DBK.DE" with [ interval = "30m" ] and last one month period range [ start = "1mo"] <br />
**= YAHOOF("DBK.DE",  , "1mo")** -  retrieves data about Stock "DBK.DE" with [ interval = "1h" (default value)] and one month period range [ start = "1mo"]<br /> 	
**= YAHOOF("DBK.DE", "1h", "10/01/2022", "11/01/2022")** - retrieves data about Stock "DBK.DE" with [ interval = "1h" ] from [ start = "10/01/2022"] to [ end = "11/01/2022"]]	<br />
**= YAHOOF("DBK.DE", "1h", "10/01/2022", "11/01/2021")** - you will get the notification: [End] date can't be less then [Start] date	<br />
**= YAHOOF("DBK.DE", "1h",  "10/01/2022" )** -  retrieves data about Stock "DBK.DE" with [ interval = "1h" ] from [ start = "10/01/2022" ] till current date [ end = today() ] because period is less then 1 year	<br />
**= YAHOOF("DBK.DE", "1h",  "10/01/2020" )** -  retrieves the default 1 year data about Stock "DBK.DE" with [ interval = "1h" ] from [ start = "10/01/2022" ] because range is more then 1 year  	<br />
**= YAHOOF("DBK.DE", "1h", "1mo", "10/01/2022")** -  you will get the notification to correct start date (it should be the same format as the last argument "MM/DD/YYYY") 	<br />
**= YAHOOF("DBK.DE", "1h",  , "10/01/2022")** -  retrieves data about Stock "DBK.DE" with [ interval = "1h" ] and one year backward default period range from [ end = "10/01/2022"] because argument [ start = null]	<br />
**= YAHOOF("DBK.DE",  ,  , "10/01/2022")** -  retrieves data about Stock "DBK.DE" with [ interval = "1h" (default value)] and one year backward default period range from [ end = "10/01/2022"] because argument [ start = null]	<br />
If you get date values in the date column instead of date format, just change format of the column (go to Format --> Number --> Date)	<br />
<br />
  
**◖⚆ᴥ⚆◗ ADDITIONAL INFO:**	<br />
You are welcome for further contributions, ideas and :beetle: reports: 	<br />
[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/tabukmail.svg?style=social&label=Follow%20%40tabukmail)](https://twitter.com/tabukmail)	<br />
Wish you profitable investment !!!!   and hot :coffee:	<br />
	<br />
P.S. <br />
Your interest is the best motivation for me to add more API functionality to this script. :rocket:



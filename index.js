const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
var billWithSettings = require("./billWithSettings");
var Moment = require("moment");

const billSettings = billWithSettings();

const app = express();

let PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs(
  {defaultLayout: 'main',
    helpers:{
     "momentDate":function(){
       return Moment(this.timeStamp).fromNow()
     }
   }
 }));

app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(express.static('public'))

app.get("/", function(req, res){
  var totals = billSettings.check();
  var call_total = (totals.call).toFixed(2);
  var sms_total = (totals.sms).toFixed(2);
  var total = (totals.total).toFixed(2);
  var color = billSettings.checkColor();
  res.render("bill_settings", {call_total, sms_total, total, color, settingsData: billSettings.checkSettings() });

})

app.post('/calculate', function(req, res){
   var type = req.body.billType;
   if(type !== undefined){
      billSettings.calculate(type);
   }

   var totals = billSettings.check();
   var call_total = (totals.call).toFixed(2);
   var sms_total = (totals.sms).toFixed(2);
   var total = (totals.total).toFixed(2);
   var color = billSettings.checkColor();
   res.render("bill_settings", {call_total, sms_total, total, color, settingsData: billSettings.checkSettings()});

    // note that data can be sent to the template
    //res.render('bill_settings', {call_cost, sms_cost, warning_level, critical_level})
});

app.post('/update', function(req, res){
   var call_cost = req.body.call_cost;
   var sms_cost = req.body.sms_cost;
   var warning_level = req.body.warning_level;
   var critical_level = req.body.critical_level;

  billSettings.updateCall(call_cost);
  billSettings.updateSms(sms_cost);
  billSettings.updateWarningLevel(warning_level);
  billSettings.updateCriticalLevel(critical_level);

  res.redirect('/');
});

app.get('/clear', function(req, res){
   billSettings.resetBills();

  res.redirect('/');
});

app.get('/actions',function(req,res) {
    var records = {bill: billSettings.checkBillRecords()}
    res.render('Records', records);
});

app.get('/actions/:type',function(req,res) {
   var billRecords = billSettings.check();

  if(req.params.type=='call'){
    let billRecord = {bill: billSettings.checkCallHistory()}
    res.render('Records',billRecord);
  }
  else if(req.params.type=='sms'){
   let billRecord = {bill: billSettings.checkSmsHistory()}
   res.render('Records', billRecord);
 }

});

app.listen(PORT, function(){
  console.log('App starting on port', PORT)
})

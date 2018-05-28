module.exports = function(){

  var bills = {call:0,
               sms:0,
               total: 0};

 var settings = {callCostSetting: 2.75,
                 smsCostSetting: 0.75,
                 warningLevelSetting: 40,
                 criticalLevelSetting: 75
                 };

 var color = "normal";

 var billRecords = [];

   var calculateRadioBillSett = function(billItemType){
     if (settings["criticalLevelSetting"] > bills["total"]) {

         let bill = {
           billType : billItemType,
           timeStamp : new Date()
         }

          if(billItemType == 'call'){
            bills[billItemType] += settings.callCostSetting;
            bill.cost = bills[billItemType];
          }else if (billItemType == 'sms') {
            bills[billItemType] += settings.smsCostSetting;
            bill.cost = bills[billItemType];
          }



          bills['total'] = bills['sms'] + bills['call'];

          billRecords.unshift(bill);

          if (bills['total'] >= settings["criticalLevelSetting"]) {
              color = "danger";
          } else if(bills['total'] >= settings["warningLevelSetting"]){
              color = "warning";
          }
        }

    };

    var updateCallCost = function(updatedCallCost){
      if (updatedCallCost !== "") {
         settings["callCostSetting"] = parseFloat(updatedCallCost);
      }

    }

    var updateSmsCost = function(updatedSmsCost){
      if (updatedSmsCost !== "") {
          settings["smsCostSetting"] = parseFloat(updatedSmsCost);
        }
    }

    var updateWarningLevelSetting = function(updatedWarningLevel){
      if (updatedWarningLevel !== "") {
        settings["warningLevelSetting"] = parseFloat(updatedWarningLevel);
      }
    }

    var updateCriticalLevelSetting = function(updatedCriticalLevel){
      if (updatedCriticalLevel !== "") {
        settings["criticalLevelSetting"] = parseFloat(updatedCriticalLevel);
      }
    }

     var checkCallCost = function(){
         return  settings["callCostSetting"]
     }

     var checkSmsCost = function(){
         return  settings["smsCostSetting"]
     }

     var checkWarningLevelSetting = function(){
         return  settings["warningLevelSetting"]
     }

     var checkCriticalLevelSetting = function(){
         return  settings["criticalLevelSetting"]
     }

    var checkRadioBillSett = function(billItemType){
        return {
          requestedBill : bills[billItemType],
          sms : bills['sms'],
          call : bills['call'],
          total : bills['total']
        }
    }

    var checkSettings = function(){
      return settings;
    }

    var checkColor = function(){
       return color;
    }

    var checkCallHistory = function(){
      return billRecords.filter(bill => bill.billType === 'call');
    }

    var checkSmsHistory = function(){
      return billRecords.filter(bill => bill.billType === 'sms');
    }

    var checkBillRecords = function(){
      return billRecords
    }

    return {
        calculate : calculateRadioBillSett,
        check : checkRadioBillSett,
        updateCall : updateCallCost,
        checkCall : checkCallCost,
        updateSms : updateSmsCost,
        checkSms : checkSmsCost,
        updateWarningLevel : updateWarningLevelSetting,
        checkWarningLevel : checkWarningLevelSetting,
        updateCriticalLevel : updateCriticalLevelSetting,
        checkCriticalLevel : checkCriticalLevelSetting,
        checkSettings,
        checkColor,
        checkCallHistory,
        checkSmsHistory,
        checkBillRecords

    }

}

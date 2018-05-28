let assert = require("assert");
var billWithSettings = require("../billWithSettings");

describe('calculateRadioBillSett', function() {


    it('should return bill amount for smses and the bills object', function() {
      var billSettings = billWithSettings();

      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.deepEqual({"requestedBill" : 1.5, "sms" : 1.5, "call" : 8.25, "total" : 9.75 }, billSettings.check('sms'));
    });

    it('should return bill amount for calls and the bills object', function() {
      var billSettings = billWithSettings();


      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.deepEqual({"requestedBill" : 5.5, "sms" : 1.5, "call" : 5.5, "total" : 7 }, billSettings.check('call'));
    });

    it('should return 0 for smes when smses dont exist', function() {
      var billSettings = billWithSettings();

      billSettings.calculate('call');

      assert.deepEqual({"requestedBill" : 0, "sms" : 0, "call" : 2.75, "total" : 2.75 }, billSettings.check('sms'));
    });

    it('should return 0 for calls when calls dont exist', function() {
      var billSettings = billWithSettings();


      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.deepEqual({"requestedBill" : 0, "sms" : 2.25, "call" : 0, "total" : 2.25 }, billSettings.check('call'));
    });

});

describe('updateCallCost', function() {


    it('should update callCostSetting to passed value', function() {
      var billSettings = billWithSettings();

      billSettings.updateCall(3.12);

      assert.deepEqual(3.12, billSettings.checkCall());
    });

});

describe('updateSmsCost', function() {


    it('should update smsCostSetting to passed value', function() {
      var billSettings = billWithSettings();

      billSettings.updateSms(3.12);

      assert.deepEqual(3.12, billSettings.checkSms());
    });

});

describe('updateWarningLevel', function() {


    it('should update warningLevelSetting to passed value', function() {
      var billSettings = billWithSettings();

      billSettings.updateWarningLevel(50.2);

      assert.deepEqual(50.2, billSettings.checkWarningLevel());
    });

});

describe('updateCriticalLevel', function() {


    it('should update criticalLevelSetting to passed value', function() {
      var billSettings = billWithSettings();

      billSettings.updateCriticalLevel(60.4);

      assert.deepEqual(60.4, billSettings.checkCriticalLevel());
    });

});

describe('checkSettings', function() {


    it('should return settings', function() {
      var billSettings = billWithSettings();
      let settings = {callCostSetting: 2.75,
                      smsCostSetting: 0.75,
                      warningLevelSetting: 40,
                      criticalLevelSetting: 75
                      };

      assert.deepEqual(settings, billSettings.checkSettings());
    });

});

describe('checkColor', function() {


    it('should return default color', function() {
      var billSettings = billWithSettings();

      assert.deepEqual("normal", billSettings.checkColor());
    });

});

describe('checkColor', function() {


    it('should return warning when warning level is reached', function() {
      var billSettings = billWithSettings();

      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.deepEqual("warning", billSettings.checkColor());
    });

});

describe('checkColor', function() {


    it('should return danger when critical level is reached', function() {
      var billSettings = billWithSettings();

      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');


      assert.deepEqual("danger", billSettings.checkColor());
    });

});

describe('checkCallHistory', function() {


    it('should return callHistoryRecord', function() {
      var billSettings = billWithSettings();

      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');

      var date = new Date();

      let hist = [ { billType: 'call',
        timeStamp: date,
        cost: 8.25 },
      { billType: 'call',
        timeStamp: date,
        cost: 5.5 },
      { billType: 'call',
        timeStamp: date,
        cost: 2.75 } ]


      assert.deepEqual(hist, billSettings.checkCallHistory());
    });

});

describe('checkSmsHistory', function() {


    it('should return smsHistoryRecord', function() {
      var billSettings = billWithSettings();

      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      var date = new Date();

      let hist = [ { billType: 'sms',
        timeStamp: date,
        cost: 2.25 },
      { billType: 'sms',
        timeStamp: date,
        cost: 1.5 },
      { billType: 'sms',
        timeStamp: date,
        cost: 0.75 } ]


      assert.deepEqual(hist, billSettings.checkSmsHistory());
    });

});

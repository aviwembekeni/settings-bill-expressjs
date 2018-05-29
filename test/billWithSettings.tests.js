let assert = require("assert");
var BillWithSettings = require("../billWithSettings");

describe('calculateRadioBillSett', function() {


    it('should return bill amount for smses and the bills object', function() {
      var billSettings = BillWithSettings();

      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.deepEqual({"requestedBill" : 1.5, "sms" : 1.5, "call" : 8.25, "total" : 9.75 }, billSettings.check('sms'));
    });

    it('should return bill amount for calls and the bills object', function() {
      var billSettings = BillWithSettings();


      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.deepEqual({"requestedBill" : 5.5, "sms" : 1.5, "call" : 5.5, "total" : 7 }, billSettings.check('call'));
    });

    it('should return 0 for smes when smses dont exist', function() {
      var billSettings = BillWithSettings();

      billSettings.calculate('call');

      assert.deepEqual({"requestedBill" : 0, "sms" : 0, "call" : 2.75, "total" : 2.75 }, billSettings.check('sms'));
    });

    it('should return 0 for calls when calls dont exist', function() {
      var billSettings = BillWithSettings();


      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.deepEqual({"requestedBill" : 0, "sms" : 2.25, "call" : 0, "total" : 2.25 }, billSettings.check('call'));
    });

});

describe('updateCallCost', function() {


    it('should update callCostSetting to passed value', function() {
      var billSettings = BillWithSettings();

      billSettings.updateCall(3.12);

      assert.equal(3.12, billSettings.checkCall());
    });

});

describe('updateSmsCost', function() {


    it('should update smsCostSetting to passed value', function() {
      var billSettings = BillWithSettings();

      billSettings.updateSms(3.12);

      assert.equal(3.12, billSettings.checkSms());
    });

});

describe('updateWarningLevel', function() {


    it('should update warningLevelSetting to passed value', function() {
      var billSettings = BillWithSettings();

      billSettings.updateWarningLevel(50.2);

      assert.equal(50.2, billSettings.checkWarningLevel());
    });

});

describe('updateCriticalLevel', function() {


    it('should update criticalLevelSetting to passed value', function() {
      var billSettings = BillWithSettings();

      billSettings.updateCriticalLevel(60.4);

      assert.equal(60.4, billSettings.checkCriticalLevel());
    });

});

describe('checkSettings', function() {


    it('should return settings', function() {
      var billSettings = BillWithSettings();
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
      var billSettings = BillWithSettings();

      assert.equal("normal", billSettings.checkColor());
    });

});

describe('checkColor', function() {


    it('should return warning when warning level is reached', function() {
      var billSettings = BillWithSettings();

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

      assert.equal("warning", billSettings.checkColor());
    });

});

describe('checkColor', function() {


    it('should return danger when critical level is reached', function() {
      var billSettings = BillWithSettings();

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


      assert.equal("danger", billSettings.checkColor());
    });

});

describe('checkCallHistory', function() {


    it('should return callHistoryRecord callCost', function() {
      var billSettings = BillWithSettings();

      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');

      assert.equal(2.75, billSettings.checkCallHistory()[0].cost);
    });

});

describe('checkCallHistory', function() {


    it("should return 'call' as callHistoryRecord billType", function() {
      var billSettings = BillWithSettings();

      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');

      assert.equal("call", billSettings.checkCallHistory()[0].billType);
    });

});

describe('checkSmsHistory', function() {


    it('should return smsHistoryRecord total', function() {
      var billSettings = BillWithSettings();

      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.equal(2.25, billSettings.checkSmsHistory()[0].cost);

      });

});

describe('checkSmsHistory', function() {

    it("should return 'sms' smsHistoryRecord total", function() {
      var billSettings = BillWithSettings();

      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.equal("sms", billSettings.checkSmsHistory()[0].billType);

    });

});

describe('checkBillRecords', function() {

    it("should return total of the last billType 'call'", function() {
      var billSettings = BillWithSettings();

      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');

      assert.equal(8.25, billSettings.checkBillRecords()[0].cost);

    });

});

describe('checkBillRecords', function() {

    it("should return total of the last billType 'sms'", function() {
      var billSettings = BillWithSettings();

      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('call');
      billSettings.calculate('sms');
      billSettings.calculate('sms');
      billSettings.calculate('sms');

      assert.equal(2.25, billSettings.checkBillRecords()[0].cost);

    });

});

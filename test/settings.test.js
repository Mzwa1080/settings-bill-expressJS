let assert = require('assert');
let settingsBill = require('../settings-bill');

describe('The Settings Bill function', function(){
  it('should return 2.75 if a single CALL is made', function(){

    let settingsBIll = settingsBill();
    settingsBIll.callCostValue('2.75')
    assert.equal('2.75', settingsBIll.getCallCost('2.75'));
  });


  it('should return 0.65 if single SMS is made', function(){

    let settingsBIll = settingsBill();
    settingsBIll.smsCostValue('0.65')
    assert.equal('0.65', settingsBIll.getSmsCost('0.65'));
  });

  it('should return 3.40 if a single CALL & SMS is made', function(){

    let settingsBIll = settingsBill();
    settingsBIll.smsCostValue('0.65');
    settingsBIll.callCostValue('2.75');
    // console.log(settingsBIll.total());
    assert.equal('3.40', settingsBIll.total('3.40'));
  });

  it('should Pass if CALL has not reached the Warning Level of 2.00', function(){

    let settingsBIll = settingsBill();

    settingsBIll.callCostValue('1.25');
    settingsBIll.warningLevel("2.00");
    // console.log(settingsBIll.forWarningValue());

    assert.equal('2.00', settingsBIll.forWarningValue());
  });


  it('should NOT YET if CALL has not reached the Warning Level of 5.50', function(){

    let settingsBIll = settingsBill();

    settingsBIll.callCostValue('3.50');
    settingsBIll.warningLevel("5.50");
    // console.log(settingsBIll.forWarningValue());

    assert.equal('not yet', settingsBIll.colorChanger());
  });

});

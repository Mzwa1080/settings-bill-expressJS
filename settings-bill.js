module.exports = function() {

  var callCost = 0;
  var smsCost = 0;

  var callsTotalThree = 0;
  var smsTotalThree = 0;
  var allTotalCallSettings = 0;
  var warningLevels = 0;
  var criticalLevels = 0;

  var actionList = [];

  function callCostValue(updateCallValue) {
    callCost = parseFloat(updateCallValue)
    return callCost.toFixed(2)

  }

  function smsCostValue(updateSmsValue) {
    smsCost = parseFloat(updateSmsValue)
    return smsCost.toFixed(2)
  }

  function warningLevel(updatedWarningValue) {
    warningLevels = parseFloat(updatedWarningValue)
  }


  function criticalLevel(updateCriticalValue) {
    criticalLevels = parseFloat(updateCriticalValue)
  }

  function forSMSAndCall(billPrice) {

    if (billPrice === "call") {
      if (allTotalCallSettings < criticalLevels) {
        callsTotalThree += callCost;
        //console.log(callsTotalThree)

      }
      actionList.push({
        type: billPrice,
        cost:callCost,
        timestamp: new Date()
      });

    }
    if (billPrice === "sms") {
      if (allTotalCallSettings < criticalLevels) {
        smsTotalThree += smsCost;

      }

    }
    actionList.push({
      type: billPrice,
      cost:smsCost,
      timestamp: new Date()
    });
    //console.log(callCost);

  }

  function actions() {
    return actionList;
  }


  function actionsFor(type) {
    console.log(type, "type");
    const filteredActions = [];

    // loop through all the entries in the action list
    for (let i = 0; i < actionList.length; i++) {
      const action = actionList[i];
      // check this is the type we are doing the total for
      console.log(action.type, "actiontype");
      if (action.type === type) {
        // add the action to the list
        filteredActions.push(action);
      }
    }




    return filteredActions;

    // return actionList.filter((action) => action.type === type);
  }




  function getSmsCost() {

    return smsCost.toFixed(2);
  }

  function getCallCost() {
    return callCost.toFixed(2);
  }

  function forCallValues() {
    return callsTotalThree.toFixed(2);
  }

  function forSmsValues() {
    return smsTotalThree.toFixed(2);
  }

  function forWarningValue() {
    return warningLevels.toFixed(2);
  }
  function forCriticalValue() {
    return criticalLevels.toFixed(2);
  }

  function forTotal() {
    allTotalCallSettings = callsTotalThree + smsTotalThree;
    return allTotalCallSettings.toFixed(2);
  }

  function colorChanger() {
    if (allTotalCallSettings >= criticalLevels && allTotalCallSettings !==0) {
      return "danger";
    } else if (allTotalCallSettings >= warningLevels && allTotalCallSettings !==0) {
      return "warning";
    } else {
      return "not reached any LEVEL!!!"
    }
  }

  return {
    forCallValues,
    forSmsValues,
    callCostValue,
    smsCostValue,
    warningLevel,
    colorChanger,
    forWarningValue,
    criticalLevel,
    forCriticalValue,
    forSMSAndCall,
    getSmsCost,
    getCallCost,
    forTotal,
    actions,
    actionsFor,

  }
}

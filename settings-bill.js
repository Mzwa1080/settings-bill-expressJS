module.exports = function() {

  let callCost = 0;
  let smsCost = 0;

  let callsTotalThree = 0;
  let smsTotalThree = 0;
  let allTotalCallSettings = 0;
  let warningLevels = 0;
  let criticalLevels = 0;

  let actionList = [];
  let forTesting = 0;
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
        actionList.push({
          type: billPrice,
          cost:callCost,
          timestamp: new Date()
        });
      }
    }
    
    if (billPrice === "sms") {
      if (allTotalCallSettings < criticalLevels) {
        smsTotalThree += smsCost;
        actionList.push({
          type: billPrice,
          cost:smsCost,
          timestamp: new Date()
        });
      }

    }

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

//--------------------------------------------------------- --------------------
//FOR WHEN THE USER ENTERED A NUMBER AND NOW RADIO BTN IS COUNTING, THATS Y THEY ARE RETURNING ZERO
  function forCallValues() {
    return callsTotalThree.toFixed(2);
//----------------------------------------------------------------------------
  }
//FOR WHEN THE USER ENTERED A NUMBER AND NOW RADIO BTN IS COUNTING, THATS Y THEY ARE RETURNING ZERO
  function forSmsValues() {
    return smsTotalThree.toFixed(2);
//----------------------------------------------------------------------------
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
  function total(){
    forTesting = callCost + smsCost;
    return forTesting;
  }
  function colorChanger() {
    if (allTotalCallSettings >= criticalLevels && allTotalCallSettings !==0) {
      return "danger";
    }

    else if (allTotalCallSettings >= warningLevels && allTotalCallSettings !==0) {
      return "warning";
    }
  }

  function errorDisplay(){
    if(allTotalCallSettings >= criticalLevels && allTotalCallSettings !=0){
      var text = "Your bill has the critical level & it has been stopped";
      return  text ;
    }
    if(allTotalCallSettings >= warningLevels && allTotalCallSettings !=0){
      var text = "Your bill has reached a warning level!";
      return text;
    }
  }

  function reload(){
    smsCost = 0;
    callCost = 0;
    callsTotalThree = 0;
    smsTotalThree = 0;
    allTotalCallSettings = 0;
    actionList = [];
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
    total,
    reload,
    errorDisplay
  }
}

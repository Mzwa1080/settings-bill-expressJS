let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
const Moment = require('moment');

let settingsBIll = require('./settings-bill')
let billSettings = settingsBIll();
let app = express();

//----------FOR SENDING DATA AS A FORM TO THE SERVER!!! -------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//for public folder #Static_Resource!!!
app.use(express.static('public'));


app.engine('handlebars', expressHandlebars({defaultLayout: 'main',

  helpers : {
		"recentDate": function(){

			return Moment(this.timestamp).fromNow()
		}
	}


}));








app.set('view engine', 'handlebars');

app.get('/', function(req,res){
	//------Get the value from factory function and displays them------
	//-----"GO GET VARIABLE" ALSO KEEPS THE ENTERED AMOUNTS!!! -------
			var goGet = {
				call:billSettings.getCallCost(),
				sms:billSettings.getSmsCost(),
				total:billSettings.forTotal(),
				warningLevel:billSettings.forWarningValue(),
	      criticalLevel:billSettings.forCriticalValue()
			};
//----Gets the returned totals from factory function-----
			var totals = {
				sms:billSettings.forSmsValues(),
				call:billSettings.forCallValues(),
				total:billSettings.forTotal(),
				alert:billSettings.colorChanger(),
				warningLevel:billSettings.forWarningValue(),
				criticalLevel:billSettings.forCriticalValue()
			    };
// -----TURNS THE COLOR & ADDS THE TEXT -----
			var error = {
				alert:billSettings.colorChanger(),
				error:billSettings.errorDisplay()
			};

	res.render('home', {
				valueSum: goGet,
				totals,
				error
		});
});

app.post('/settings', function(req, res){
	//-----GO TO HTML ----
    let smsCost = req.body.smsCost;
    let callCost = req.body.callCost;
    let warningLevel = req.body.warningLevel;
    let criticalLevel = req.body.criticalLevel;
//----- GO TO FACTORY FUNCTION & CHECK THESE -----
		billSettings.callCostValue(callCost);
		billSettings.smsCostValue(smsCost);
		billSettings.warningLevel(warningLevel);
		billSettings.criticalLevel(criticalLevel);

    res.redirect('/')
});

app.post('/action', function(req, res){
		let check = req.body.billItem;
		//console.log(check);
		billSettings.forSMSAndCall(check);
		// console.log(billSettings.getSmsCost());

    res.redirect('/')
});

app.get('/actions', function(req, res){
		res.render('actions', {recording:billSettings.actions()})
})

app.get('/actions/:type', function(req, res){
		let type = req.params.type;
		// billSettings.actions();
		//console.log(billSettings.actionsFor(type));
	res.render('actions', {recording:billSettings.actionsFor(type)})

});

app.get('/reload', function(req, res){
		billSettings.reload()
		res.redirect('/');
})

app.get('/errorText', function(req, res){
		billSettings.errorDisplay();
		res.redirect('/');
})

let PORT = process.env.PORT || 3018;

app.listen(PORT, function(){
  	console.log('App starting on port', PORT);
});
//app.listen(3018);

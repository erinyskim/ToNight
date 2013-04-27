/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path');

var app = express();

var db_manager = require('db_manager');
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    db_manager.insert('MAn', {key1: 'val1', key2: 'val2'}, function () {

    });
    res.send('test');
});


/**
 * 멤버 등록
 */
app.get('/insertAdministrator', function (req, res) {
    db_manager.insertAdministrator(req.param('id'), req.param('pw'), req.param('name'), req.param('phonenumber'), function (result) {
        res.send(result);
    });
});


/**
 * 맴버 등록
 *
 * ?id=tes555&pw=test1123&rgnCd=1234&lat=12.235&lng=37.123&phonenumber=01041274551&category=키스방&cf=0&shopname=방가방가&message=하이루&homepage=http://naver.com&logo=http://naver.com&tag=t,q,we&registrant=erinyskim@gmail.com
 */
app.get('/insertMember', function (req, res) {
    db_manager.insertMember(req.param('id'),
        req.param('pw'),
        req.param('adress'),
        req.param('rgnCd'),
        req.param('lat'),
        req.param('lng'),
        req.param('phonenumber'),
        req.param('category'),
        req.param('cf'),
        req.param('shopname'),
        req.param('message'),
        req.param('homepage'),
        req.param('logo'),
        req.param('tag'),
        req.param('registrant'), function (result) {
            res.send(result);
        });
});

/**
 *  맴버 전체
 */
app.get('/getMemberAll', function (req, res) {
    db_manager.getMemberAll(function (reuslts) {
        res.send(reuslts);
    });
});

/**
 * 검색기능
 */
app.get('/search', function (req, res) {
    var paramsCount = parseInt(req.param('params'));
    var jsonArray = [];
    for (var i = 0; i < paramsCount; i++) {
        var k = req.param('key' + i);
        var v = req.param('val' + i)
        console.log(k);
        console.log(v);
        jsonArray.push({key: k, val: v});
    }
    db_manager.findMemberByLike(jsonArray, 0, function (results) {
        res.send(results);
    });
})


app.get('/member', function (req, res) {
    var id = req.param('id');
    db_manager.findMember(json, 0, function (results) {
        res.send(results);
    });
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// var Kavenegar = require('kavenegar');
// var api = Kavenegar.KavenegarApi({
//   apikey:
//     '374F564A7361786A7241627442594C67754E4C4E394B6945576B6F4E5163392B5968523542463370674A673D',
// });
// api.Send({
//   message: 'خدمات پیام کوتاه کاوه نگار',
//   sender: '1000689696',
//   receptor: '09022790486',
// });

// var https = require('https');
// var querystring = require('querystring');
// var KavenegarApi = function (options) {
//   this.options = {};
//   this.options.host = 'api.kavenegar.com';
//   this.options.version = 'v1';
//   this.options.apikey = options.apikey;
// };
// KavenegarApi.prototype.request = function (action, method, params, callback) {
//   var path =
//     '/' +
//     this.options.version +
//     '/' +
//     this.options.apikey +
//     '/' +
//     action +
//     '/' +
//     method +
//     '.json';
//   var postdata = querystring.stringify(params);
//   var post_options = {
//     host: this.options.host,
//     port: '443',
//     path: path,
//     method: 'POST',
//     headers: {
//       'Content-Length': postdata.length,
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     },
//   };
//   var req = https.request(post_options, function (e) {
//     e.setEncoding('utf8');
//     var result = '';
//     e.on('data', function (data) {
//       result += data;
//     });
//     e.on('end', function () {
//       try {
//         var jsonObject = JSON.parse(result);
//         if (callback)
//           callback(
//             jsonObject.entries,
//             jsonObject.return.status,
//             jsonObject.return.message
//           );
//       } catch (e) {
//         console.log('Exception!', e);
//         if (callback) {
//           callback(e.message, 500);
//         }
//       }
//     });
//   });
//   req.write(postdata, 'utf8');
//   req.on('error', function (e) {
//     if (callback)
//       callback(
//         JSON.stringify({
//           error: e.message,
//         })
//       );
//   });
//   req.end();
// };
// KavenegarApi.prototype.Send = function (data, callback) {
//   this.request('sms', 'send', data, callback);
// };
// KavenegarApi.prototype.SendArray = function (data, callback) {
//   this.request('sms', 'sendarray', data, callback);
// };
// KavenegarApi.prototype.Status = function (data, callback) {
//   this.request('sms', 'status', data, callback);
// };
// KavenegarApi.prototype.StatusLocalMessageid = function (data, callback) {
//   this.request('sms', 'statuslocalmessageid', data, callback);
// };
// KavenegarApi.prototype.Select = function (data, callback) {
//   this.request('sms', 'select', data, callback);
// };
// KavenegarApi.prototype.SelectOutbox = function (data, callback) {
//   this.request('sms', 'selectoutbox', data, callback);
// };
// KavenegarApi.prototype.LatestOutbox = function (data, callback) {
//   this.request('sms', 'latestoutbox', data, callback);
// };
// KavenegarApi.prototype.CountOutbox = function (data, callback) {
//   this.request('sms', 'countoutbox', data, callback);
// };
// KavenegarApi.prototype.Cancel = function (data, callback) {
//   this.request('sms', 'cancel', data, callback);
// };
// KavenegarApi.prototype.Receive = function (data, callback) {
//   this.request('sms', 'receive', data, callback);
// };
// KavenegarApi.prototype.CountInbox = function (data, callback) {
//   this.request('sms', 'countinbox', data, callback);
// };
// KavenegarApi.prototype.CountPostalCode = function (data, callback) {
//   this.request('sms', 'countpostalcode', data, callback);
// };
// KavenegarApi.prototype.SendByPostalCode = function (data, callback) {
//   this.request('sms', 'sendbypostalcode', data, callback);
// };
// KavenegarApi.prototype.VerifyLookup = function (data, callback) {
//   this.request('verify', 'lookup', data, callback);
// };
// KavenegarApi.prototype.AccountInfo = function (data, callback) {
//   this.request('account', 'info', data, callback);
// };
// KavenegarApi.prototype.AccountConfig = function (data, callback) {
//   this.request('account', 'config', data, callback);
// };
// KavenegarApi.prototype.CallMakeTTS = function (data, callback) {
//   this.request('call', 'maketts', data, callback);
// };

// module.exports.KavenegarApi = function (options) {
//   var obj = new KavenegarApi(options);
//   return obj;
// };

const TrezSmsClient = require('trez-sms-client');
const client = new TrezSmsClient('username', 'password');

client
  .autoSendCode('09307874663', 'Signiture Footer For Branding')
  .then((messageId) => {
    console.log('Sent Message ID: ' + messageId);
  })
  .catch((error) => console.log(error));

client
  .checkCode('09301234567', '595783')
  .then((isValid) => {
    if (isValid) {
      console.log(
        'Code 595783 for this number 09301234567 is valid and verified.'
      );
    } else {
      console.log('Provided code for that number is not valid!');
    }
  })
  .catch((error) => console.log(error));

client
  .manualSendCode(
    '09301234567',
    'Verification Code: 595783 \nTrez WebService SMS'
  )
  .then((messageId) => {
    console.log('Sent Message ID: ' + messageId);
  })
  .catch((error) => console.log(error));

client
  .sendMessage(sender, numbers, message, groupId)
  .then((receipt) => {
    console.log('Receipt: ' + receipt);
  })
  .catch((error) => {
    // If there is an error, we'll catch that
    console.log(error.isHttpException, error.code, error.message);
  });

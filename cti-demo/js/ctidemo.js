var rcPgCfgGen = {
  appInfo: {
    appKey: '',
    appSecret: '',
    server: 'https://platform.devtest.ringcentral.com'
  },
  demoConfig : {
    url: {
      rcServerSandbox: 'https://platform.devtest.ringcentral.com',
      rcOAuthRedirectUri: 'https://ringcentral.github.io/cti-demo/oauth.html'
    },
    model : {
      contacts : {
        storeKey:  'rcdMdlContact',
        objectKey: 'phoneNumber'
      }
    }
  },
  pgCrumbs: [
    { stub: 'contacts', disp: 'Contacts', fa: 'group' },
    { stub: 'call-log', disp: 'Call Log', fa: 'list' },
    { stub: 'linked-accounts', disp: 'Linked Accounts', fa: 'gear' },
    { stub: 'instructions', disp: 'Instructions', fa: 'book' }
  ]
};

function rcUser(info, rcSdk, lsKey, lsEnabled) {
    var t = this;
    t.info = info;
    t.rcSdk = rcSdk;
    t.rcSdkHelpers = RingCentral.Helpers;
    t.lsKey = lsKey;
    t.lsEnabled = lsEnabled;
    t.loadFromLocalStorage = function() {
        var json = window.localStorage.getItem(t.lsKey);
        var data = JSON.parse(json);
        t.info = data;
    }
    t.retrieveNumbers = function() {
        console.log("USR_RET_NUMBERS");
        console.log("USR_RET_NUMBERS_PHONE");
        t.rcSdk.platform().get(
            '/account/~/extension/~/phone-number'
        ).then(function(response) {
            console.log("USR_SUC_NUMBERS_PHONE_2: " + response.text());
            var json = JSON.stringify(response.json());
            var data = response.json();
            if ('records' in response.json()) {
                t.info['phoneNumbers'] = t.inflateNumbers(
                    response.json()['records']
                );
            }
            console.log("USR_RET_USER_NUMBERS_FORWARDING");
            t.rcSdk.platform().get(
                '/account/~/extension/~/forwarding-number'
            ).then(function(response2) {
                console.log("USR_SUC_NUMBERS_FORWARDING: " + response2.text());
                if ('records' in response2.json()) {
                    t.info['forwardingNumbers'] = t.inflateNumbers(
                        response2.json()['records']
                    );
                }
                if (t.lsEnabled) {
                    t.info = (typeof t.info !== 'undefined' && t.info != null) ? t.info : {};
                    var json = JSON.stringify(t.info);
                    window.localStorage.setItem(t.lsKey, JSON.stringify(t.info));
                    console.log('USR_SET_USER_INFO [' + t.lsKey + '] ' + json);
                }
                var userJson = JSON.stringify(t.info);
                console.log('USR_USER_JSON: ' + userJson);
            }).catch(function(e) {
                console.log('USR_FORWARDING_ERROR ' + e);
            })
        })
    }
    t.inflateNumbers = function(numbers) {
        for (var i=0,l=numbers.length;i<l;i++) {
            if ('phoneNumber' in numbers[i]) {
                var e164 = numbers[i]['phoneNumber'];
                numbers[i]['phoneNumberNational'] = phoneUtils.formatNational(e164, 'us');
            }
        }
        return numbers;
    }
    t.ringOutFromNumbers = function() {
        var numbers = [];
        if (! 'phoneNumbers' in t.info) {
            return numbers;
        }
        numbers = t.info['phoneNumbers'].filter( t.rcSdkHelpers.phoneNumber().filter({usageType: 'DirectNumber'}) );
        var numbersMap = {};
        for (var i=0,l=numbers.length;i<l;i++) {
            var num = numbers[i]['phoneNumber'];
            numbers[i]['uiLabel'] = 'Direct Number';
            console.log("FRM: " + num);
            numbersMap[num] = 1;
        }
        var forwarding = t.forwardingNumbers();
        for (var i=0,l=forwarding.length;i<l;i++) {
            var num = forwarding[i]['phoneNumber'];
            console.log("FWD: " + num);
            if (!(num in numbersMap)) {
                forwarding[i]['uiLabel'] = forwarding[i]['label'];
                console.log("PUSH " + num);
                numbers.push(forwarding[i]);
            }
            console.log(JSON.stringify(numbers));
        }
        return numbers;
    }
    t.forwardingNumbers = function() {
        if (! 'forwardingNumbers' in t.info) {
            return [];
        }
        return t.info['forwardingNumbers'].filter( t.rcSdkHelpers.phoneNumber().filter({features: ['CallForwarding']}) );
    }    
    t.ringOutCallerIdNumbers = function() {
        if (! 'phoneNumbers' in t.info) {
            return [];
        }
        var usageTypeToUiLabel = { 'DirectNumber' : 'Direct Number', 'MainCompanyNumber': 'Main Company Number'};
        var numbers = t.info['phoneNumbers'].filter( t.rcSdkHelpers.phoneNumber().filter({features: ['CallerId']}) );
        for (var i=0,l=numbers.length;i<l;i++) {
            if ('usageType' in numbers[i]) {
                if (numbers[i]['usageType'] in usageTypeToUiLabel) {
                    numbers[i]['uiLabel'] = usageTypeToUiLabel[numbers[i]['usageType']];
                } else {
                    numbers[i]['uiLabel'] = numbers[i]['usageType'];
                }
            }
        }
        return numbers;
    }
    t.smsFromNumbers = function() {
        if (! 'phoneNumbers' in t.info) {
            return [];
        }
        return t.info['phoneNumbers'].filter( t.rcSdkHelpers.phoneNumber().filter({features: ['SmsSender']}) );
    }
}

function rcDemo(rcPgCfgGen, rcPgCfgPg) {
    var t=this;
    console.log("RCDEMO_INIT_S1");
    t.Core = new rcDemoCore(rcPgCfgGen, rcPgCfgPg);
    t.init = function() {
        hljs.initHighlightingOnLoad();
        t.Core.init();
        t.Auth = new rcDemoAuth(t.Core); // console.log("INIT A-V");
        t.View = new rcDemoView(t.Core); // console.log("INIT V-C");
        t.Call = new rcDemoCall(t.Core); // console.log("INIT C-L");
        t.CallLog = new rcDemoCallLog(t.Core); // console.log("INIT L-T");
        t.Contacts = new rcDemoContacts(t.Core);
        t.Sms = new rcDemoSms(t.Core);
    }
}

function rcDemoCore(rcPgCfgGen, rcPgCfgPg) {
    var t=this;
    t.lsKeyApp  = 'rcAppInfo';
    t.lsKeyUser = 'rcUsrInfo';
    t.lsAppFields  = ['rcAppKey', 'rcAppSecret','rcAppRedirectUri'];
    t.lsUserFields = ['rcUserUsername', 'rcUserExtension', 'rcUserPassword'];
    t.rcPgCfgGen = rcPgCfgGen;
    t.rcPgCfgPg = rcPgCfgPg;
    t.rcSdk = null;
    t.init = function() {
        var appInfo = t.getAppInfo();
        t.setAppInfo(appInfo);
        t.populateModal();
    }
    t.populateModal = function() {
        t.populateDomApp();
        t.populateDomUser();
    }
    t.populateDomApp = function() {
        var appInfo = t.getAppInfo();
        if (appInfo == null) {
            return;
        }
        var fields = t.lsAppFields;
        for (var i=0,l=fields.length;i<l;i++) {
            var name = fields[i];
            if (name == 'rcAppRedirectUri' && !appInfo[name]) {
                $('#' + name).val(rcPgCfgGen['demoConfig']['url']['rcOAuthRedirectUri']);
            } else {
                $('#' + name).val(appInfo[name]);
            }
        }
    }
    t.populateDomUser = function() {
        var userInfo = t.getUserInfo();
        if (userInfo == null) {
            return;
        }
        var fields = t.lsUserFields;
        for (var i=0,l=fields.length;i<l;i++) {
            $('#' + fields[i]).val(userInfo[fields[i]]);
        }
        if (typeof $('#rcAuthUsername') !== 'undefined') {
            $('#rcAuthUsername').val(userInfo['rcUserUsername']);
        }
        if (typeof $('#rcAuthExtension') !== 'undefined') {
            $('#rcAuthExtension').val(userInfo['rcUserExtension']);
        }
        if (typeof $('#rcAuthPassword') !== 'undefined') {
            $('#rcAuthPassword').val(userInfo['rcUserPassword']);
        }
    }
    t.populateDomToken = function() {}
    t.getAppInfo = function() {
        var appInfo = {};
        var json = window.localStorage.getItem(t.lsKeyApp);
        if (json === 'undefined') {
            appInfo = {
                server: t.rcServerSandbox() 
            }
            for (var i=0,l=t.lsAppFields.length;i<l;i++) {
                appInfo[t.lsAppFields[i]] = '';
            }
        } else {
            appInfo = JSON.parse(json);
        }
        //console.log('GET ' + json);
        return appInfo;
    }
    t.getUserInfo = function() {
        var userInfo = {};
        var json = window.localStorage.getItem(t.lsKeyUser);
        if (!json) {
            userInfo = {};
            for (var i=0,l=t.lsUserFields.length;i<l;i++) {
                userInfo[t.lsUserFields[i]] = '';
            }
        } else {
            userInfo = JSON.parse(json);
        }
        console.log('GET_USER_INFO_FROM_LOCAL_STORAGE [' + t.lsKeyUser + '] ' + json);
        return userInfo;
    }
    t.retrieveStoreUserInfo = function() {
        t.rcSdk.platform().get(
            '/account/~/'
        ).then(function(response) {
            var data = response.json();
            var user = t.getUserInfo();
            user['rcUserUsername'] = data['mainNumber'];
            t.setUserInfo(user);
            var json = JSON.stringify(response.json());
            console.log("ACCOUNT INFO: " + json);

            t.rcSdk.platform().get(
                '/account/~/extension/~/'
            ).then(function(response) {
                var data = response.json();
                var user = t.getUserInfo();
                user['rcUserExtension'] = data['extensionNumber'];
                t.setUserInfo(user);
                var json = JSON.stringify(response.json());
                console.log("EXTENSION INFO: " + json);
            });
        })
    }
    t.getUsername = function() {
        var userInfo = t.getUserInfo();
        if ('rcUserUsername' in userInfo) {
            return userInfo['rcUserUsername'];
        }
        return '';
    }
    t.setAppInfo = function(appInfo) {
        appInfo = (typeof appInfo !== 'undefined' && appInfo != null) ? appInfo : {};
        if (!appInfo['server']) {
            appInfo['server'] = t.rcServerSandbox();
        }
        var json = JSON.stringify(appInfo);
        console.log('SET_APP_INFO ' + json);
        window.localStorage.setItem(t.lsKeyApp, JSON.stringify(appInfo));
        t.populateDomApp();
        t.setRcSdk(appInfo);
    }
    t.setUserInfo = function(userInfo) {
        userInfo = (typeof userInfo !== 'undefined' && userInfo != null) ? userInfo : {};
        var json = JSON.stringify(userInfo);
        console.log('SET_USER_INFO ' + json);
        window.localStorage.setItem(t.lsKeyUser, JSON.stringify(userInfo));
        t.populateDomUser();
    }
    t.setRcSdk = function(appInfo) {
        t.rcSdk = new RingCentral.SDK({
            server: appInfo['server'],
            appKey: appInfo['rcAppKey'],
            appSecret: appInfo['rcAppSecret']
        });
    }
    t.setInfoFromDom = function() {
        t.setAppInfoFromDom();
        t.setUserInfoFromDom();
    }
    t.setAppInfoFromDom = function() {
        var appInfo = t.getAppInfo();
        var fields = t.lsAppFields;
        for (var i=0,l=t.lsAppFields.length;i<l;i++) {
            appInfo[fields[i]] = $('#' + fields[i]).val();
        }
        var json = JSON.stringify(appInfo);
        t.setAppInfo(appInfo);
    }
    t.setUserInfoFromDom = function() {
        var userInfo = t.getUserInfo();
        var fields = t.lsUserFields;
        var json = JSON.stringify(userInfo);
        for (var i=0,l=t.lsUserFields.length;i<l;i++) {
            userInfo[fields[i]] = $('#' + fields[i]).val() || '';
        }
        t.setUserInfo(userInfo);
    }
    t.clearInfo = function() {
        t.setAppInfo({});
        t.setUserInfo({});
    }
    t.setAppKeyAndSecret = function(appKey, appSecret) {
        var appInfo = t.getAppInfo();
        appInfo['rcAppKey'] = appKey;
        appInfo['rcAppSecret'] = appSecret;
        t.setAppInfo(appInfo);
    }
    t.rcServerSandbox = function() {
        return t.rcPgCfgGen['demoConfig']['url']['rcServerSandbox'];
    }
    t.retrieveAndSetUserNumbers = function() {
        var info = t.getUserInfo();
        var user = new rcUser({}, t.rcSdk, 'rcUsrInfo', true);
        user.retrieveNumbers();
    }
    t.retrieveAndSetUserNumbersOld = function() {
        var debug = true;
        console.log("RET_USER_NUMBERS_FORWARDING");
        t.rcSdk.platform().get(
            '/account/~/extension/~/forwarding-number'
        ).then(function(response) {
            var json = JSON.stringify(response.json);
            var userInfo = t.getUserInfo();
            if ('records' in response.json) {
                userInfo['rcUserForwardingNumbers'] = response.json['records'];
            }
            t.rcSdk.platform().get(
                '/account/~'
            ).then(function(response) {
                var data = response.json;
                //var json = JSON.stringify(response.json); // error?
                var json = response._text;
                console.log("RES '/account/~':" + json);
                var rcUserNumbers = [];
                if ('rcUserForwardingNumbers' in userInfo) {
                    for (var i=0,l=userInfo['rcUserForwardingNumbers'].length;i<l;i++) {
                        var fwdInfo = userInfo['rcUserForwardingNumbers'][i];
                        var numInfo = {};
                        if ('phoneNumber' in fwdInfo) {
                            var num = fwdInfo['phoneNumber'];
                            numInfo['rcNumberE164'] = num;
                            numInfo['rcNumberNational'] = phoneUtils.formatNational(num, 'us')
                            if ('label' in fwdInfo) {
                                numInfo['rcLabel'] = fwdInfo['label'];
                            } else {
                                numInfo['rcLabel'] = 'Direct Number';
                            }
                            rcUserNumbers.push(numInfo);
                        }
                    }
                }
                if ('mainNumber' in data) {
                    var num  = data['mainNumber'];
                    var disp = phoneUtils.formatNational(num, 'us');
                    var numInfo = {rcNumberE164: num, rcNumberNational: disp, rcLabel: 'Main Company Number'};
                    rcUserNumbers.push(numInfo);
                }  
                userInfo['rcUserNumbers'] = rcUserNumbers;
                t.setUserInfo(userInfo);
                console.log("AUTHZ_USER_INFO: " + JSON.stringify(userInfo));
            })
        }).catch(function(e) {
            alert('Error: ' + e.message);
        })
    }
}

function rcDemoAuth(rcDemoCore) {
    var t=this;
    t.lsKeyAuth  = 'rcAuthInfo';
    t.lsKeyEvent = 'rcAuthEvent';
    t.rcDemoCore = rcDemoCore;
    t.rcPlatform = t.rcDemoCore.rcSdk.platform();
    t.debug = false;
    t.init = function() {
        console.log("INIT_AUTH");
        t.pageAuthPopulate();
        console.log("INIT_LISTEN_0");
        t.listenAuthData();
    }
    t.fields = [
        {'sto': 'userpath_num', 'dom1': '#token_view_usr', 'dom2': '#rc_act_link_usr'},
        {'sto': 'userpath_ext', 'dom1': '#token_view_ext', 'dom2': '#rc_act_link_ext'},
        {'sto': 'access_token', 'dom1': '#token_view_act', 'dom2': '#rc_act_link_acc'},
        {'sto': 'refresh_token', 'dom1': '#token_view_ret'}
    ];
    t.getAuthData = function() {
        var authJson = window.localStorage.getItem(t.lsKeyAuth);
        console.log("GET_AUTH_DATA: [" + t.lsKeyAuth + "] " + authJson);
        if (!authJson || authJson.length<1 || authJson == 'undefined') {
            return {};
        }
        var authData = JSON.parse(authJson);
        return authData;
    }
    t.setAuthData = function(authData) {
        window.localStorage.setItem(t.lsKeyAuth, JSON.stringify(authData));
        console.log("SET_AUTH_DATA: [" + t.lsKeyAuth + "] " + JSON.stringify(authData));
        if ('access_token' in authData && authData['access_token'].length>0) {
            $('#appMessage').hide();
        } else {
            $('#appMessage').show();          
        }
    }
    // http://diveintohtml5.info/storage.html
    t.setAuthEvent = function(eventString) {
        console.log('RC_AUTH_SET_EVENT [' + eventString + ']')
        window.localStorage.setItem(t.lsKeyEvent, eventString);
    }
    t.listenAuthData = function() {
        console.log("LISTEN_AUTH_DATA_S1");
        if (window.addEventListener) {
            window.addEventListener("storage", t.handleAuthData, false);
        } else {
            window.attachEvent("onstorage", t.handleAuthData);
        };
    }
    t.handleAuthData = function(e) {
        console.log("HANDLE_AUTH_DATA");
        if (!e) { e = window.event; }
        console.log("HANDLE_AUTH_DATA_KEY " + e.key);
        if (e.key == t.lsKeyAuth) {
            t.pageAuthPopulate();
            t.rcDemoCore.retrieveAndSetUserNumbers();
            var authData = t.getAuthData();
            if ('access_token' in authData && authData['access_token'].length>0) {
                $('#appMessage').hide();
            } else {
                $('#appMessage').show();
            }
        }
        if (e.key == t.lsKeyEvent) {
            console.log("HANDLE_AUTH_DATA_EVENT_AUTHZ_STATUS")
            var eventVal = window.localStorage.getItem(e.key)
            if (eventVal == 'rcAuthSuccess') {
                t.rcDemoCore.retrieveAndSetUserNumbers();
            }
        }
    }
    t.pageAuthPopulate = function() {
        var authData = t.getAuthData();
        console.log("POP_AUTH_DATA" + JSON.stringify(authData));
        var data = [
          {'sto': 'userpath_num', 'dom1': '#rc_act_link_usr', 'dom2': '#rcLinkUsername'},
          {'sto': 'userpath_ext', 'dom1': '#rc_act_link_ext', 'dom2': '#rcLinkExtension'},
          {'sto': 'access_token', 'dom1': '#rc_act_link_acc', 'dom2': '#rcLinkAccessToken'},
          {'sto': 'expires_in', 'dom1': '#rc_act_link_acc', 'dom2': '#rcLinkAccessTokenTtl'},
          {'sto': 'refresh_token', 'domX': '#token_view_ret', 'dom2': '#rcLinkRefreshToken'},
          {'sto': 'refresh_token_expires_in', 'dom1': '#rc_act_link_acc', 'dom2': '#rcLinkRefreshTokenTtl'},
          {'sto': 'scope', 'dom1': '#rc_act_link_acc', 'dom2': '#rcLinkScope'}
        ];
        for (var i=0; i<data.length; i++) {
            var sto = data[i]['sto'];
            if ('dom1' in data[i]) {
                var dom1 = data[i]['dom1'];
                if (!authData || typeof authData !== 'object') {
                    $(dom1).val('');
                } else {
                    if (sto in authData) {
                    console.log('GOT ' + sto + ' ' + authData[sto]);
                    $(dom1).val(authData[sto] || '');
                    }
                }
            }
            if ('dom2' in data[i]) {
                var dom2 = data[i]['dom2'];
                console.log("DOM2 " + dom2);
                if (sto in authData) {
                    if (typeof $(dom2) !== 'undefined') {
                        $(dom2).html(authData[sto]);
                    }
                } else {
                    $(dom2).html('');      
                }
            }
        }
    }
    t.login = function(username, extension, password) {
        if (typeof username !== 'string') {
            username = '';
        }
        if (typeof extension !== 'string') {
            extension = '';
        }
        if (typeof password !== 'string') {
            password = '';
        }
        var userpath = username;
        if (extension.length>0) {
            userpath = userpath + '*' + extension;
        }

        var debug = {username:username,extension:extension,password:password};
        t.rcPlatform.authorize({
            username: username,
            extension: extension,
            password: password
        }).then(function(response) {
            if (t.debug) {
                console.log('AUTHZ_SUCCESS');
                console.log(JSON.stringify(debug));
                console.log(response.json);
            }
            $('#linked_status').html(' - Account Successfully Linked');
            data = response.data;
            data['userpath'] = userpath;
            data['userpath'] = 'current';
            data['userpath_num'] = username;
            data['userpath_ext'] = extension;
            //window.localStorage.setItem(t.lsKeyAuth, JSON.stringify(data));
            t.setAuthData(data);
            t.rcDemoCore.retrieveAndSetUserForwardingNumbers();
            t.pageAuthPopulate();
            console.log('AUTHZ_DISPLAYED');
        }).catch(function(e) {
            console.log('AUTHZ_ERR ' + e.message || 'authz_failure');
            console.log(JSON.stringify(debug));
            $('#linked_accounts_message').html('<p>RingCentral authorization failed. Please try again.</p><p>' + e.message + '</p>');
        });
    }
    t.logout = function() {
        t.rcPlatform.logout();
        //window.localStorage.setItem(t.lsKeyAuth,'');
        t.setAuthData({});
        console.log("LOGOUT");
        for (var i=0,l=t.fields.length;i<l;i++) {
            if ('dom2' in t.fields[i]) {
                console.log("DEL " + t.fields[i]['dom2']);
                $(t.fields[i]['dom2']).html('');
            }
        }
        $('#linked_status').html(' - Account Successfully Unlinked');
        t.pageAuthPopulate();
    }
    t.logoutAndClear = function() {
        t.logout();
        t.rcDemoCore.clearInfo();
    }
    t.refresh = function() {
        var authData = t.getAuthData();
        var authKeys = ['userpath','userpath_num','userpath_ext'];
        t.rcPlatform.refresh().then(function(response) {
            console.log('authz_success');
            //$('#linked_accounts_message').html('Account Successfully Linked');
            $('#linked_status').html(' - Access token successfully refreshed');
            console.log(response.json);
            data = response.data;
            if (authData) {
                for (var i=0,l=authKeys.length;i<l;i++) {
                    var key = authKeys[i];
                    if (key in authData) {
                        data[key] = authData[key];
                    }
                }
            }
            window.localStorage.setItem(t.lsKeyAuth, JSON.stringify(data));
            t.pageAuthPopulate();
            console.log('AUTHZ_DISPLAYED');
        }).catch(function(e) {
            console.log('AUTHZ_ERR ' + e.message || 'authz_failure');
            $('#linked_accounts_message').html('<p>RingCentral authorization failed. Please try again.</p><p>' + e.message + '</p>');
        });
    }
}

function rcDemoCall(rcDemoCore) {
    var t=this;
    t.rcDemoCore = rcDemoCore
    t.rcSdk = t.rcDemoCore.rcSdk;
    t.createRingOut = function(unsavedRingout) {
        var roHelper = new ringOutHelper(t.rcSdk);
        roHelper.create(unsavedRingout);
        return roHelper;
    }
    t.createRingOutSimple = function(to, from, callerId, options) {
        if (!options) {
            options = {
                to:   {phoneNumber: to},
                playPrompt: true
            };
        }
        if (from != undefined && from.length>0) {
            options['from'] = {phoneNumber: from};
        }
        if (callerId != undefined && callerId.length>0) {
            options['callerId'] = {phoneNumber: callerId};
        }
        console.log("FROM " + from);
        console.log("TO " + to);
        options['from'] = {phoneNumber: phoneUtils.formatE164(from,'us')};
        options['to'] = {phoneNumber: phoneUtils.formatE164(to,'us')};
        t.createRingOut(options);
    }
}

function ringOutHelper(rcsdk) {
    var t=this;
    t.rcsdk = rcsdk;
    t.init = function() {
        t.platform = t.rcsdk.platform();
        var helpers = RingCentral.Helpers;
        t.Ringout = helpers.ringout();
        // t.Utils = rcsdk.getUtils();
        t.Utils = helpers.utils;
        t.timeout = null; // reference to timeout object
        t.ringout = {};
    }
    t.handleError = function(e) {
        console.log("ERROR: " + e);
    }
    t.create = function(unsavedRingout) {
        console.log("CREATE " + JSON.stringify(unsavedRingout));
        t.platform
            .send(t.Ringout.saveRequest(unsavedRingout))
            .then(function(response) {
                console.log('RINGOUT_CALL_SUCCESS');
                //t.Utils.extend(t.ringout, response.data);
                //console.log('Info: First status:', t.ringout.status.callStatus);
                //t.timeout = t.Utils.poll(update, 500, t.timeout);
            })
            .catch(function(e) {
                console.log('RINGOUT_ERROR: ' + e.message);
            });
    }
    t.init();
}

function rcDemoCallLog(rcSdk) {
    var t=this;
    t.rcSdk = rcSdk;
    t.refreshCallLogTable = function() {}
    t.populateRecords = function() {
        var rcsdk = t.rcSdk;
        var platform = rcsdk.platform();
        var calls = [];
        var Call = helpers.call();
        // This call may be repeated when needed, for example as a response to incoming Subscription
        platform.send(Call.loadRequest(null, {
            query: { // this can be omitted
                page: 1,
                perPage: 10
            }
        })).then(function(response) {
            console.log("RESPONSE_CALLS: " + response.text());
            calls = Call.merge(calls, response.json().records); // safely merge existing active calls with new ones
            t.populateCalls(calls);
        }).catch(function(e) {
            console.log("E_RESPONSE_CALL_LOG: " + e);
            alert('Recent Calls Error: ' + e.message);
        });
    }
    t.populateCalls = function(calls) {
        var rcsdk = t.rcSdk;
        //console.log("CALL_LOG_POP_1");
        for (var i=0,l=calls.length;i<l;i++) {
            var call = calls[i];
            var json = JSON.stringify(call);
            //console.log(json);
            var newRowContent = '<tr><td>ABC</td></tr>';
            var type = '';
            if (call['type'] == 'Voice') {
                type += '<i class="fa fa-phone" style="color:orange"></i>'
            }
            var user = {};
            if (call['direction'] == 'Outbound') {
                type += ' <i class="fa fa-chevron-circle-right" style="color:orange"></i>';
                user = call['to'];           
            } else {
                type += ' <i class="fa fa-chevron-circle-left" style="color:deepskyblue"></i>';
                user = call['from'];
            }
            var recording = '';
            if ('recording' in call && 'contentUri' in call['recording']) {
                var uri = call['recording']['contentUri'];
                var uriAc = rcsdk.platform().createUrl(uri, {addToken: true});
                console.log(uri);
                console.log(uriAc);
                recording = $('<audio>').attr('controls', 'controls').append(
                    $('<source>').attr('src', uriAc).attr('type', 'audio/mpeg')
                ).append(
                    $('<em>').append('HTML5 Audio required')
                )
            }
            $('#calllog_table').append(
                $('<tr>').append(
                    $('<td>').append(
                        $('<span>').append(type)
                    )
                ).append(
                    $('<td>').append(
                        $('<span>').append(user['phoneNumber'])
                    )
                ).append(
                    $('<td>').append(
                        $('<span>').append(user['name'] || 'n/a')
                    )
                ).append(
                    $('<td>').append(
                        $('<span>').append(call['startTime'])
                    )
                ).append(
                    $('<td>').append(
                        $('<span>').append(call['action'])
                    )
                ).append(
                    $('<td>').append(
                        $('<span>').append(call['result'])
                    )
                ).append(
                    $('<td>').append(
                        $('<span>').append(call['duration'])
                    )
                ).append(
                    $('<td>').append(
                        $('<span>').append(recording)
                    )
                )
            );
        }
        console.log("CALL_LOG_POP_Z");
    }
}

function rcDemoView(rcDemoCore) {
    var t=this;
    t.rcDemoCore = rcDemoCore
    t.rcSdk = t.rcDemoCore.rcSdk;
    t.rcPgCfgGen = t.rcDemoCore.rcPgCfgGen;
    t.rcPgCfgPg = t.rcDemoCore.rcPgCfgPg;
    t.initialize = function() {
        t.initTitleHtml();
        t.initMenuBar();
    }
    t.initTitleHtml = function() {
        console.log("VIEW_TITLE_S1");
        if ('rcPgTitle' in t.rcPgCfgPg) {
            var title = t.rcPgCfgPg['rcPgTitle'];
            var stub  = t.rcPgCfgPg.rcPgCrumbStub;

            var l = t.rcDemoCore.rcPgCfgGen.pgCrumbs.length;
            for (var i=0;i<l;i++) {
                if (t.rcDemoCore.rcPgCfgGen.pgCrumbs[i]['stub'] == stub) {
                    if ('fa' in t.rcDemoCore.rcPgCfgGen.pgCrumbs[i]) {
                        var fa = t.rcDemoCore.rcPgCfgGen.pgCrumbs[i]['fa'];
                        var html = '<i class="fa fa-' + fa + '" style="color:#aaa"></i> ';
                        title = html + title;
                    }
                    break;
                }
            }
            $('#rcPgTitle').html(title);
            $('#rcPgCrumbLeaf').html(t.rcPgCfgPg['rcPgTitle'])
        }
    }
    t.initMenuBar = function() {
        console.log("VIEW_MENU_S1");
        for (var i=0,l=t.rcPgCfgGen.pgCrumbs.length;i<l;i++) {
            var crumb = t.rcPgCfgGen.pgCrumbs[i];
            var fa = '';
            if ('fa' in crumb) {
                fa = '<i class="fa fa-' + crumb['fa'] + '"> ';
            }
            var disp = $('<span>').attr('class', 'rcDemoFont').append('&nbsp;' + crumb['disp']);
            var link = $('<a>').attr('href','./' + crumb['stub'] + '.html').append(
                $('<span>').attr('class', 'tab').append(fa).append(disp)
            )
            if (t.rcPgCfgPg.rcPgCrumbStub == crumb['stub']) {
                $('#menu-bar-items').append(
                    $('<li>').attr('class', 'active').append(link)
                );
            } else {
                $('#menu-bar-items').append(
                    $('<li>').append(link)                   
                );
            }
        }
    }
    t.initialize();
}

function rcDemoSms(rcDemoCore) {
    var t=this;
    t.rcDemoCore = rcDemoCore
    t.rcSdk = t.rcDemoCore.rcSdk;
    t.sendMessage = function(from, to, text) {
        if (text.length < 0) {
            alert('Please enter text to send');
            return;
        }
        var platform = t.rcSdk.platform();
        from = phoneUtils.formatE164(from,'us');
        to = phoneUtils.formatE164(to,'us');        
        platform.post('/account/~/extension/~/sms', {
            from: {phoneNumber:from}, // Your sms-enabled phone number
            to: [
                {phoneNumber:to} // Second party's phone number
            ],
            text: text
        }).then(function(response) {
            console.log('SMS_SEND_Success: ' + response.json().id);
        }).catch(function(e) {
            console.log('SMS_SEND_Error: ' + e);
        });
    }
}

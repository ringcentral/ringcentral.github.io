# Agent SDK

## Initialization

```js
var config = {
   authHost: window.location.origin,
   callbacks: callbacks,
   isSecureSocket: ENV_VARS.isSecureSocket
};
Lib = new AgentLibrary(config);
```

* Note, in production, `authHost` should be set to https://engage.ringcentral.com
* Note, in production, `isSecureSocket` should be set to `true` (as boolean, not string), unless running on non SSL browser location.

## Setting Callbacks

The callbacks object passed to your AgentLibrary can provide functions to call on that message type. Passing the callback attribute to the Library instance config will initialize them for the library.

```js
const callbacks = {
loginPhase1Response: loginPhase1Response,
…<more callbacks defined here>
}

…
function loginPhase1Response(response) {

}
```

Most Agent sdk methods also allow passing a callback as the final attribute ex.

```js
Lib.getAgentConfig(agentConfigCallback); // callback is an optional param
Function agentConfigCallback(response) { … }
```

To set callbacks after initialization use

```js
Lib.setCallback(type, callback)
Lib.setCallbacks(type, callback)
```

* Note: this will override any other callback associated with this function

## Login

Engage auth js is a helper library that manages the user auth session and state. These examples will utilize engage auth js.

### SSO (stage 1)

1. `Lib.authenticateAgentWithEngageAccessToken(EngageAuth.Session.getAccessToken( ));`
1. Continue to post auth config

### Username/password (stage 1)

1. Initialize the agent library (as noted above)
1. Gather username and password and correct platform id for the user (`c01/aws80`, `c02/aws82`, or lab env)
1. Using engage auth, execute a `legacyLogin`
    1. `EngageAuth.Session.legacyLogin({Username, Password, platformId: ..., loginType: ‘admin’ | ‘agent’})`
1. Once `legacyLogin.then` resolves, you can get the user details 
    1. `const deets = EngageAuth.Session.getUserDetails();`
1. `Lib.authenticateAgentWithUsernamePassword(username, password, platformId, callback);`
1. Continue to post auth config

### Post auth configure (stage 2)

These steps are the same, regardless of SSO or Legacy login

1. We can now authenticate with agent library
    1. Listen for the `authenticateResponse` callback
        * If valid `Lib.openSocket(agentId, function(result) { … } );`
    1. Listen for the `loginPhase1Response` callback
        * Phase 1 login is now complete, continue to phase 2, use the following properties from the `loginPhase1Response` to configure our agents session
        * `response.inboundSettings`
        * `response.outboundSettings`
        * `response.chatSettings`
        * `response.agentSettings`
        * `response.scriptSettings`
        * `response.agentPermissions`
        * `response.applicationSettings`
        * `response.agentPermissions.defaultAutoAnswerOn`
1. You can now configure the agent session -
    1. dial dest using a RC extension will be “RC_PHONE”
    1. dial dest using a RC integrated softphone will be “RC_SOFTPHONE”
    1. Available ids are provided on the `loginPhase1Response`
    1. `Lib.loginAgent(dialDest, queueIds, chatIds, skilProfileId, dialGroupId, updateFromAdminUi, isForce, function(loginResult){
   if(loginResult.status === "SUCCESS") { // yay }
		}`
        * updateFromAdminUi - is true when a login update is triggered from the admin ui.
        * isForce - used when a login record exists, if true, this new login will override the old one.
1. You are now logged in

## Setup softphone

**Prerequisites:** Lib config, agent login and config complete

If login type === ‘integrated’ and using the web rtc softphone

1. `Lib.sipInit();`
1. `Lib.sipRegister();`
    1. Listen for `sipRegisteredCallback`

## Off-hook

**Prerequisites:** Lib config, agent login, config & softphone setup complete

1. `Lib.offhookInit(callback) // callback function or offhookInitResponse on lib`
    1. Listen for `offhookInitResponse` 
        * `Status === ‘OK’` = success!
        * Else, off hook error
1. To end off-hook session `Lib.offhookTerm()`
    1. Listen for `offhookTermNotification`

## Agent state

**Prerequisites:** Lib config, agent login and config complete

Agent state list is available on `loginPhase1Response.agent_states.agent_state`

1. `Lib.setAgentState(agentState, agentAuxState);`
    1. `Listen for agentStateResponse`
        * `Status === ‘OK’`

## New Call

**Prerequisites:** Lib config, agent login and config complete & agent in available state 

* Listen for newCallNotification
* Listen for addSessionNotification

**Note:** The order of these notifications is not guaranteed. You may receive an addSession **before** the new call is delivered. Or you may receive a new call before the add session is sent. It’s best to keep this in mind.

## Inbound call

**Prerequisites:** Lib config, agent login and config complete, agent in available state & softphone type is ‘integrated’

Auto answer is a flag tracked in your app. You can manage when the call is answered based on your logic.

### On-hook

1. Listen for `offhookInitResponse`
1. Continue to off-hook logic

### Off-hook

1. Listen for `sipRingingNotification`
1. To answer or after a prompt to confirm answer - `Lib.sipAnswer()`
    1. Listen for `newCallNotification`
        * New call notification contains `queue`, `outdial_disposition`, `lead` and `additional baggage` objects
    1. Listen for `addSessionNotification`
        * Add session is sent once the agent is added to the call
1. To reject the call - `Lib.sipReject()`

## Outbound call

**Prerequisites:** Lib config, agent login and config complete & softphone setup complete

### On-hook

1. Off-hook does not exist, 
    1. `Lib.offhookInit()`
    1. Listen for `offhookInitResponse` then continue request
1. Continue to off-hook step

### Off-hook

1. `Lib.manualOutdial(destination, callerId, ringTime, countryId, gateId);`
    1. Destination is the number you are dialing
    1. Caller id is what the customer will see, must be valid for legal reasons
    1. ringTime `[optional]` how long will the call ring. Default 30 sec. 
    1. countryId `[optional]` country the call originates from. Default ‘USA’
    1. gateId `[optional]` gate to associate the call with.
1. Listen for `newCallNotification`
    1. New call notification contains `queue`, `outdial_disposition`, `lead` and `additional baggage` objects
1. Listen for `addSessionNotification`
    1. Add session is sent once the agent is added to the call

## Transfer

**Prerequisites:** Lib config, agent login and config complete, softphone setup complete & active call. Call must have `allowTransfer = true`

Phonebook entries can be found on the currentCall `transferPhoneBook`

### Warm (stay on the line)

* Request `Lib.internationalWarmXfer(dialDest, callerId, customSipHeaders, countryId, callback);`
* Listen for `warmXferResponse`
* To cancel `Lib.warmXferCancel(xferDest);`

### Cold (hangup my session)

* Request `Lib.internationalColdXfer(dialDest, callerId, customSipHeaders, countryId, callback);`
* Listen for `coldXferResponse, endCallNotification`

## Direct agent transfer

**Prerequisites:** Lib config, agent login and config complete, softphone setup complete & active call. Call must have `allowTransfer = true and allowDirectAgentTransfer = true`

### Get list

* Request `Lib.directAgentXferList(callback);	// inline callback optional`
* Listen for `directAgentTransferListResponse` or callback

### Warm (stay on the line)

* Request `Lib.warmDirectAgentXfer(targetAgentId);`
* Listen for `directAgentTransferNotification`
* To cancel `Lib.cancelDirectAgentXfer(xferDest);`

### Cold (hangup my session)

* Request `Lib.coldDirectAgentXfer(targetAgentId);`
* Listen for `endCallNotification`

### Direct voicemail

* Request `Lib.voicemailDirectAgentXfer(targetAgentId);`

## Call controls

**Prerequisites:** Lib config, agent login and config complete, softphone setup complete & active call.

* Hold - current call `allowHold` must be true
    * Request - `Lib.hold();`
    * Callback - `holdResponse`
* Mute
    * Request - `Lib.sipToggleMute(currentState: true|false); // pass in false to unmute, true to mute`
* Record - current call `agentRecording.agentRecording` must be true
    * Request - `Lib.record(recordingState, callback); // state is true|false`
    * `Lib.pauseRecord(recordingState, callback); // state is true|false`
        * Pause recording timing needs to be tracked in your application
* Requeue - current call `allowRequeue` must be true
    * Request - `Lib.requeueCall(queueId, skillId, stayOnCall, callback);`
* Transfer - current call `allowTransfer` must be true
    * Warm -  `Lib.internationalWarmXfer(dialDest, callerId, customSipHeaders, countryId)`
        * To cancel `Lib.warmXferCancel(dialDest)`
    * Cold  -  `Lib.internationalColdXfer(dialDest, callerId, customSipHeaders, countryId)`
        * This will end your call
* Hangup
    * Request - `Lib.hangup(sessionId); // session to hangup, omit to hangup all`

## Dispositions

**Prerequisites:** Lib config, agent login and config complete, softphone setup complete & active call.

Dispositions for the call are available on `currentCall.outdialDispositions.dispositions`

`Lib.dispositionCall(uii, dispId, notes, isCallback, callbackDTS, contactForwardNum, script, externId, leadId, requestId);`

* uii - call unique id
* dispId - disposition selected
* notes - agent notes associated to the disposition
* isCallback - true|false, if we are setting up a callback 
* callbackDTS - if isCallback is true, the dts you would like to set the callback for
* contactForwardNum - number for contact forwarding
* Script - script data to save for this disposition 
    * `[ { label: "", externId: "", leadUpdateColumn: ""} ]`

Only for Outbound Dispositions

* externId - external id associated to the lead
* leadId - lead id associated to the disposition
* requestId - request id associated with a preview fetched lead

## Hangup

**Prerequisites:** Lib config, agent login and config complete, softphone setup complete & active call.

Provide the session id you would like to hang up. You can hang up legs other than yours on the call if this is a transfer. If you omit the session id, all legs of the call will be hung up.

1. `Lib.hangup(sessionId); // end call`
1. Listen for `endCallCallback`

## WebRTC SIP

### Requests

* `Lib.sipInit(); // setup SipJS session`
* `Lib.sipAnswer();`
* `Lib.sipRegister(); // register session`
    * Callback - `sipRegisteredNotification`
* `Lib.sipHangUp(); // end call AND close sip session`
* `Lib.sipReject(); // reject a pending (ringing) call`
* `Lib.sipSendDTMF(dtmf) // dtmf number 0-9`
* `Lib.sipToggleMute(state) // current state - true|false. Pass in true to mute, false to unmute`

### Callbacks

* `sipConnectedNotification`
    * Will notify once offhook session is connected
* `sipEndedNotification`
* `sipMuteResponse`
* `sipUnmuteResponse`
* `sipRegisteredNotification`
    * Sip registration session is active
* `sipUnregisteredNotification`
* `sipRegistrationFailedNotification`
* `sipRingingNotification`
* `sipDialDestChangedNotification`
* `sipSwitchRegistrarNotification`

## Call history

Call history is not managed in the agent sdk. To track history, keep a record of all newcall and add session packets. Update these records on call end.

## Callbacks

Agent SDK - Callbacks can be setup during the AgentLibrary initialization via the config object.

## Requests

Refer to the auto generated sdk docs found in `AgentLibrary/doc/index.html`

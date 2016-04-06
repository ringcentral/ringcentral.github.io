
function rcDemoModelContacts(storeKey, objectKey) {
	var t=this;
	t.userKey = userKey;
	t.storeKey = 'rcdModelUser';
	t.objectKey = 'phoneNumber';
	t.defaultContacts = [
		{
			firstName: 'John',
			lastName: 'Wang',
			phoneNumber: '+14151112222'
		},
		{
			firstName: 'David',
			lastName: 'Lee',
			phoneNumber: '+6502223333'
		}
	]
	t._contacts = null;
	t.loadDefaultContacts = function() {
		data = t.defaultContacts;
		json = JSON.stringify(data);
		window.localStorage.setItem(t.storeKey, json);
	}
	t.loadContacts = function() {
		json = window.localStorage.getItem(t.storeKey);
		t._contacts = JSON.parse(json);
	}
	t.contacts = function() {
		if (!t._contacts) {
			t.loadContacts();
		}
		return t._contacts;
	}
	t.getContact = function(key) {
		if (!key) {
			return null;
		}
		var contacts = t.contacts();
		if (key in contacts) {
			return contacts[key];
		}
		return null;
	}
	t.setContact = function(contact) {
		var keyVal = '';
		if (t.objectKey in contact) {
			var contacts = t.contacts();
		} else {
			return null;
		}
		return null;
	}
}

function rcDemoContacts(rcdCore) {
	var t=this;
	t.rcdCore = rcdCore;
	t.init = function() {
		users = new rcDemoModelUsers(t.storeKey(), t.objectKey());
		user.loadDefaultContacts();
	}
	t.storeKey = function() {
		return t.rcdCore.demoConfig.model.contacts['storeKey'];
	}
	t.objectKey = function() {
		return t.rcdCore.demoConfig.model.contacts['objectKey'];		
	}
}
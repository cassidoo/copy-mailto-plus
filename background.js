chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		id: "copyEmailDetails",
		title: "Copy Email, Subject, and Body",
		contexts: ["link"],
		targetUrlPatterns: ["mailto:*"],
	});
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId === "copyEmailDetails") {
		chrome.tabs.sendMessage(tab.id, {
			type: "copyEmailData",
			mailtoHref: info.linkUrl,
		});
	}
});

function copyToClipboard(text) {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text).catch((err) => {
			console.error("Could not copy text:", err);
		});
	} else {
		console.error("Clipboard API not available!");
	}
}

function extractEmailDetails(mailtoHref) {
	const mailtoURL = new URL(mailtoHref);
	const email = mailtoURL.pathname.substring(1);
	const subject = mailtoURL.searchParams.get("subject") || "";
	const body = mailtoURL.searchParams.get("body") || "";

	return `Email: ${email}\nSubject: ${subject}\nBody:\n${body}`;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.type === "copyEmailData") {
		const emailDetails = extractEmailDetails(request.mailtoHref);
		copyToClipboard(emailDetails);
	}
});

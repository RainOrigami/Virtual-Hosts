var currentConfiguration;

function applyConfiguration(configuration) {
    currentConfiguration = configuration;
    chrome.storage.sync.set({ "configuration": configuration });
}

function retrieveConfiguration(callback) {
    chrome.storage.sync.get("configuration", function (configuration) {
        currentConfiguration = configuration["configuration"];
        callback(currentConfiguration);
    });
}

function beforeSendHeaders(details) {
    var configuration;
    var domain = details.url.match(/\/\/([^\/]+)\//)[1];

    for (var index in currentConfiguration) {
        var config = currentConfiguration[index];

        if (typeof config["Globally Enabled"] !== "undefined" && !config["Globally Enabled"])
            return;

        if (config["IP"] && config["IP"].toLowerCase() == domain.toLowerCase()) {
            configuration = config;
            break;
        }
    }

    if (!configuration || !configuration["Enabled"])
        return;

    var headers = details.requestHeaders;

    headers.push({ name: "Host", value: configuration["Host"] });
    return { requestHeaders: headers };
}

chrome.webRequest.onBeforeSendHeaders.addListener(beforeSendHeaders,
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']);

retrieveConfiguration(function () { });
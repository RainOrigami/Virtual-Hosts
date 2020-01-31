var background;

/* Configuration */

function saveConfiguration() {
    background.applyConfiguration(generateConfiguration());
}

function loadConfiguration(configurations) {
    for (var index in configurations) {
        var configuration = configurations[index];

        if (typeof configuration["Globally Enabled"] !== "undefined") {
            $("#enabled").prop("checked", configuration["Globally Enabled"]);
            continue;
        }

        var configurationLine = $($("#template").html());
        configurationLine.find(".ipaddr").val(configuration["IP"]);
        configurationLine.find(".vhost").val(configuration["Host"]);
        configurationLine.find(".enabled").prop("checked", configuration["Enabled"]);

        addLine(null, configurationLine);
    }
}

function generateConfiguration() {
    var configuration = [{ "Globally Enabled": $("#enabled").is(":checked") }];

    $("table#configuration tbody tr:not(#newLine)").each(function (index) {
        configuration.push({
            "IP": $(this).find(".ipaddr").val(),
            "Host": $(this).find(".vhost").val(),
            "Enabled": $(this).find(".enabled").is(":checked")
        });
    });

    return configuration;
}

/* UI */

function addLine(event, line) {
    if (!line)
        line = $($("#template").html());
    line.find(".delete").click(removeLine);
    $("table#configuration tbody").append(line);

    line.find(".ipaddr").change(saveConfiguration);
    line.find(".vhost").change(saveConfiguration);
    line.find(".enabled").change(saveConfiguration);
}

function removeLine() {
    $(this).parent().parent().remove();
}


/* Runtime */

function init() {
    background = chrome.extension.getBackgroundPage();

    background.retrieveConfiguration(loadConfiguration);
    $("#addLine").click(addLine);
    $("#enabled").change(saveConfiguration);
}

$(document).ready(function() {
    init();
});

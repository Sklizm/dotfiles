// Plasma 6 JS — Desktop widget placement
// Apply with:
//   qdbus org.kde.plasmashell /PlasmaShell evaluateScript "$(cat setup-desktop-widgets.js)"
//
// Adds analog clock + weather + system monitor stack + sticky notes
// to each desktop containment, anchored to the right edge.
// Widgets land at default positions; drag to fine-tune after.

var desktopArray = desktops();
print("Found " + desktopArray.length + " desktop containment(s)");

desktopArray.forEach(function(d, idx) {
    print("Configuring desktop " + idx);

    // 1. Big analog clock — top-right
    var clock = d.addWidget("org.kde.plasma.analogclock");

    // 2. Weather — below the clock
    //    The Plasma weather widget needs a source configured via its UI;
    //    Open-Meteo + auto-detect-from-IP works through the configure dialog.
    var weather = d.addWidget("org.kde.plasma.weather");
    weather.currentConfigGroup = ["WeatherStation"];
    weather.writeConfig("updateInterval", 30);
    weather.writeConfig("temperatureUnit", "C");
    weather.writeConfig("speedUnit", "ms");
    weather.writeConfig("pressureUnit", "hPa");
    weather.writeConfig("visibilityUnit", "km");
    weather.reloadConfig();

    // 3. System monitor stack — CPU, RAM, Network
    var cpu = d.addWidget("org.kde.plasma.systemmonitor.cpu");
    var mem = d.addWidget("org.kde.plasma.systemmonitor.memory");
    var net = d.addWidget("org.kde.plasma.systemmonitor.net");

    // 4. Sticky notes — bottom-right
    var notes = d.addWidget("org.kde.plasma.notes");
});

print("Desktop widgets added. Drag them into position; configure weather by right-clicking → Configure.");

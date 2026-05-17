// Plasma 6 JS — Mac-style two-panel layout (v2: centered clock + weather + plasmusic)
// Apply with:
//   qdbus org.kde.plasmashell /PlasmaShell evaluateScript "$(cat setup-mac-layout.js)"
//
// Removes ALL existing panels, then creates:
//   Top menubar: kickoff, weather (compact temp), appmenu, [spacer], clock (CENTER), [spacer], plasmusic, tray
//   Bottom dock: floating icontasks + trash, centered, fit-content, 64px

// ---------- 1. Tear down existing panels ----------
panelIds.forEach(function(id) {
    var p = panelById(id);
    if (p) p.remove();
});

// ---------- 2. Top menubar ----------
var top = new Panel;
top.location = "top";
top.height = 28;
top.floating = false;
top.lengthMode = "fill";
top.hiding = "none";

// 2a. Launcher (far left — the "Apple")
var launcher = top.addWidget("org.kde.plasma.kickoff");
launcher.currentConfigGroup = ["General"];
launcher.writeConfig("icon", "start-here-kde");
launcher.writeConfig("favoritesPortedToKAstats", true);

// 2b. Weather — compact, shows temperature inline (user must configure city via right-click → Configure)
var weather = top.addWidget("org.kde.plasma.weather");
weather.currentConfigGroup = ["Appearance"];
weather.writeConfig("showTemperatureInCompactMode", true);
weather.writeConfig("compactDisplay", "temperatureOnly");
weather.currentConfigGroup = ["Units"];
weather.writeConfig("temperatureUnit", "C");
weather.writeConfig("speedUnit", "ms");
weather.writeConfig("pressureUnit", "hPa");
weather.writeConfig("visibilityUnit", "km");
weather.currentConfigGroup = ["WeatherStation"];
weather.writeConfig("updateInterval", 30);
weather.reloadConfig();

// 2c. Global Menu (macOS-style menubar showing focused app's File/Edit/View)
top.addWidget("org.kde.plasma.appmenu");

// 2d. Spacer (push clock to center)
top.addWidget("org.kde.plasma.panelspacer");

// 2e. Clock (geometric center, sandwiched by two spacers)
var clock = top.addWidget("org.kde.plasma.digitalclock");
clock.currentConfigGroup = ["Appearance"];
clock.writeConfig("showDate", true);
clock.writeConfig("dateFormat", "shortDate");
clock.writeConfig("use24hFormat", 2);
clock.writeConfig("displayTimezoneAsCode", false);
clock.writeConfig("fontWeight", 400);
clock.reloadConfig();

// 2f. Spacer (push tray + media to right)
top.addWidget("org.kde.plasma.panelspacer");

// 2g. Plasmusic Toolbar (community media widget — track + artist + source, inline)
var media = top.addWidget("plasmusic-toolbar");
media.currentConfigGroup = ["General"];
media.writeConfig("preferredSource", "any");
media.writeConfig("commandsInPanel", true);
media.writeConfig("showSeparator", false);
media.reloadConfig();

// 2h. System tray (compact: network, volume, battery, notifications, kdeconnect, clipboard)
var tray = top.addWidget("org.kde.plasma.systemtray");

// ---------- 3. Bottom dock ----------
var dock = new Panel;
dock.location = "bottom";
dock.height = 64;
dock.floating = true;
dock.lengthMode = "fit";
dock.alignment = "center";
dock.hiding = "none";

var tasks = dock.addWidget("org.kde.plasma.icontasks");
tasks.currentConfigGroup = ["General"];
tasks.writeConfig("launchers", [
    "applications:systemsettings.desktop",
    "applications:org.dnf.AppCenter.desktop",
    "file:///var/lib/flatpak/exports/share/applications/app.zen_browser.zen.desktop",
    "preferred://filemanager",
    "applications:kitty.desktop",
    "applications:steam.desktop",
    "applications:net.lutris.Lutris.desktop",
    "applications:com.heroicgameslauncher.hgl.desktop",
    "applications:org.prismlauncher.PrismLauncher.desktop",
    "applications:discord.desktop",
    "file:///var/lib/flatpak/exports/share/applications/org.telegram.desktop.desktop",
    "applications:org.strawberrymusicplayer.strawberry.desktop",
    "file:///var/lib/flatpak/exports/share/applications/com.spotify.Client.desktop"
].join(","));
tasks.writeConfig("showOnlyCurrentDesktop", false);
tasks.writeConfig("showOnlyCurrentScreen", false);
tasks.writeConfig("showOnlyMinimized", false);
tasks.writeConfig("groupingStrategy", 1);
tasks.writeConfig("indicateAudioStreams", true);
tasks.reloadConfig();

dock.addWidget("org.kde.plasma.trash");

print("Layout v2 applied. Clock centered, weather on left, plasmusic + tray on right.");

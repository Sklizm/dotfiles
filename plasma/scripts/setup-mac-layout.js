// Plasma 6 JS — Mac-style two-panel layout
// Apply with:
//   qdbus org.kde.plasmashell /PlasmaShell evaluateScript "$(cat setup-mac-layout.js)"
//
// Removes ALL existing panels (desktops are preserved), then creates:
//   1. Top menubar (full-width, non-floating, 26px)
//   2. Bottom dock (centered floating, fit-content, 64px) with preserved launchers

// ---------- 1. Tear down existing panels ----------
panelIds.forEach(function(id) {
    var p = panelById(id);
    if (p) p.remove();
});

// ---------- 2. Top menubar ----------
var top = new Panel;
top.location = "top";
top.height = 26;
top.floating = false;
top.lengthMode = "fill";
top.hiding = "none";

// Launcher (the "Apple" icon)
var launcher = top.addWidget("org.kde.plasma.kickoff");
launcher.currentConfigGroup = ["General"];
launcher.writeConfig("icon", "start-here-kde");
launcher.writeConfig("favoritesPortedToKAstats", true);

// Global Menu (macOS-style menubar showing focused app's File/Edit/View)
top.addWidget("org.kde.plasma.appmenu");

// Flexible spacer pushing tray + clock to the right
top.addWidget("org.kde.plasma.panelspacer");

// System tray (compact: network, volume, battery, notifications, kdeconnect, clipboard...)
var tray = top.addWidget("org.kde.plasma.systemtray");

// Clock with weekday + date
var clock = top.addWidget("org.kde.plasma.digitalclock");
clock.currentConfigGroup = ["Appearance"];
clock.writeConfig("showDate", true);
clock.writeConfig("dateFormat", "shortDate");
clock.writeConfig("use24hFormat", 2);
clock.writeConfig("displayTimezoneAsCode", false);
clock.writeConfig("fontWeight", 400);
clock.reloadConfig();

// ---------- 3. Bottom dock ----------
var dock = new Panel;
dock.location = "bottom";
dock.height = 64;
dock.floating = true;
dock.lengthMode = "fit";
dock.alignment = "center";
dock.hiding = "none";

// Icons-Only Task Manager (the dock surface)
var tasks = dock.addWidget("org.kde.plasma.icontasks");
tasks.currentConfigGroup = ["General"];
tasks.writeConfig("launchers", [
    "applications:systemsettings.desktop",
    "applications:org.dnf.AppCenter.desktop",
    "file:///var/lib/flatpak/exports/share/applications/app.zen_browser.zen.desktop",
    "preferred://filemanager",
    "applications:Alacritty.desktop",
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
tasks.writeConfig("groupingStrategy", 1);    // group by program
tasks.writeConfig("indicateAudioStreams", true);
tasks.reloadConfig();

// Trash widget at the far right — mac-dock signature
dock.addWidget("org.kde.plasma.trash");

print("Mac-style layout applied. Restart plasmashell if any panel looks misaligned.");

// Surgical: swap Alacritty.desktop -> kitty.desktop in dock icontasks launchers
// without tearing down the whole layout.
// Apply with:
//   qdbus org.kde.plasmashell /PlasmaShell evaluateScript "$(cat swap-dock-launcher.js)"

var swapped = 0;
panelIds.forEach(function(id) {
    var p = panelById(id);
    if (!p) return;
    p.widgets().forEach(function(w) {
        if (w.type !== "org.kde.plasma.icontasks") return;
        w.currentConfigGroup = ["General"];
        var current = w.readConfig("launchers", "");
        if (current.indexOf("Alacritty.desktop") === -1) return;
        var updated = current.split(",").map(function(item) {
            return item.replace("Alacritty.desktop", "kitty.desktop");
        }).join(",");
        w.writeConfig("launchers", updated);
        w.reloadConfig();
        swapped++;
    });
});
print("Swapped Alacritty -> kitty in " + swapped + " icontasks widget(s).");

// Switch every desktop containment to slideshow wallpaper using the gurjaka pack.
// Apply with:
//   qdbus org.kde.plasmashell /PlasmaShell evaluateScript "$(cat setup-slideshow-wallpaper.js)"

var slidePath = "/home/codrin/Pictures/Wallpapers/gurjaka/wallpapers/";
var intervalSec = 600; // 10 minutes

desktops().forEach(function(d) {
    d.wallpaperPlugin = "org.kde.slideshow";
    d.currentConfigGroup = ["Wallpaper", "org.kde.slideshow", "General"];
    d.writeConfig("SlidePaths", slidePath);
    d.writeConfig("SlideInterval", intervalSec);
    d.writeConfig("FillMode", 2);          // scaled and cropped (no letterbox)
    d.writeConfig("SlideshowMode", 0);     // 0=random, 1=sequential
    d.writeConfig("UncheckedSlides", "");
    d.reloadConfig();
});

print("Slideshow applied to " + desktops().length + " desktop(s). Path: " + slidePath);

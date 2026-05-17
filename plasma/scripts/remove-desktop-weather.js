// One-shot: remove the org.kde.plasma.weather widget from every desktop containment.
// Run AFTER moving weather into the top panel.

var removed = 0;
desktops().forEach(function(d) {
    d.widgets().forEach(function(w) {
        if (w.type === "org.kde.plasma.weather") {
            w.remove();
            removed++;
        }
    });
});
print("Removed " + removed + " desktop weather widget(s).");

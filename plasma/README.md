# plasma/

Plasma 6 JS scripts that recreate the mac-style layout (top menubar + floating bottom dock) and place the desktop widgets.

## Apply on a fresh machine

```bash
# Layout (panels)
qdbus org.kde.plasmashell /PlasmaShell evaluateScript \
  "$(cat ~/dotfiles/plasma/scripts/setup-mac-layout.js)"

# Desktop widgets (analog clock, weather, sysmon stack, notes)
qdbus org.kde.plasmashell /PlasmaShell evaluateScript \
  "$(cat ~/dotfiles/plasma/scripts/setup-desktop-widgets.js)"

# If anything looks off:
kquitapp6 plasmashell && sleep 1 && kstart plasmashell
```

## After applying

- **Weather widget**: right-click → Configure → search city (auto-detect doesn't always populate)
- **Desktop widgets**: drag to position you like (Plasma doesn't expose geometry from JS reliably)
- **Sticky notes**: type in them, they persist
- **Trash widget**: drag files onto it to delete

## Revert

The pre-layout `appletsrc` + `plasmashellrc` are in `~/rice-backup-20260517-124659/*.pre-layout`. Run the backup's `restore.sh` to bring the stock Nobara single-panel back.

## Re-running the scripts

The layout script **removes all existing panels** before creating new ones. Safe to re-run if you accidentally break the layout via GUI tinkering — it always rebuilds to a known state.

The widgets script **appends** widgets each run (it doesn't dedupe). Don't re-run unless you've already cleared the desktop widgets, or you'll get duplicates.

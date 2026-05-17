# assets

Theme files for apps whose config paths aren't stow-friendly (Flatpak sandboxes, Electron asar paths, etc.). Install manually with the commands below.

## discord/everforest.theme.css

Vencord theme. Vencord must be installed via the official CLI installer first:
```bash
/tmp/VencordInstallerCli-linux -install -location ~/.config/discord
```
Then:
```bash
mkdir -p ~/.config/Vencord/themes
cp assets/discord/everforest.theme.css ~/.config/Vencord/themes/
```
Restart Discord → Settings → Vencord → Themes → enable.

## zen/userChrome.css

Zen browser (Flatpak) chrome stylesheet. Profile path varies; locate via about:support → Open Profile Folder.
```bash
PROFILE='/home/codrin/.var/app/app.zen_browser.zen/.zen/<profile-id>'
mkdir -p "$PROFILE/chrome"
cp assets/zen/userChrome.css "$PROFILE/chrome/"
echo 'user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);' >> "$PROFILE/user.js"
```
Restart Zen.

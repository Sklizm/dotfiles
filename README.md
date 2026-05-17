# dotfiles

Everforest "overgrown" rice for Nobara KDE Plasma 6 (Wayland).

## Layout

Each top-level directory is a [GNU Stow](https://www.gnu.org/software/stow/) package. Stow symlinks the contents into `$HOME` mirroring the internal structure.

| Package    | Targets |
|------------|---------|
| `alacritty`| `~/.config/alacritty/alacritty.toml` |
| `starship` | `~/.config/starship.toml` |
| `bash`     | `~/.bashrc` |
| `btop`     | `~/.config/btop/` |
| `fastfetch`| `~/.config/fastfetch/` |
| `kde`      | `~/.config/{kdeglobals,kwinrc,plasmarc,kcminputrc}` |
| `gtk`      | `~/.config/gtk-3.0/`, `~/.config/gtk-4.0/` |

## Apply on a fresh machine

```bash
git clone <repo-url> ~/dotfiles
cd ~/dotfiles
stow alacritty starship bash kde gtk btop fastfetch
```

Theme assets (GTK theme, icons, cursors, KDE color scheme, wallpapers, Vencord, Spicetify) are NOT in this repo — they're installed by the rice script. See the original backup at `~/rice-backup-*/` for the revert path.

## Spicetify maintenance note

Flatpak Spotify auto-updates wipe Spicetify patches. After an update, run:
```bash
spicetify backup apply
```

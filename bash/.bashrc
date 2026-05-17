# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
fi

# User specific environment
if ! [[ "$PATH" =~ "$HOME/.local/bin:$HOME/bin:" ]]; then
    PATH="$HOME/.local/bin:$HOME/bin:$PATH"
fi
export PATH

# Cursor theme for child processes
export XCURSOR_THEME=everforest-cursors
export XCURSOR_SIZE=24

# User specific aliases and functions
if [ -d ~/.bashrc.d ]; then
    for rc in ~/.bashrc.d/*; do
        if [ -f "$rc" ]; then
            . "$rc"
        fi
    done
fi
unset rc

# Greet on interactive shells
if [[ $- == *i* ]] && command -v fastfetch >/dev/null 2>&1; then
    fastfetch
fi

export PATH=$PATH:/home/codrin/.spicetify

# ---- CLI productivity stack (Phase I) ----
alias ls='eza --icons --group-directories-first'
alias ll='eza --icons -lah --git'
alias la='eza --icons -la'
alias tree='eza --icons --tree'
alias cat='bat --paging=never'
alias less='bat'

# fzf everforest colors
export FZF_DEFAULT_OPTS='--color=fg:#d3c6aa,bg:#2d353b,hl:#a7c080,fg+:#d3c6aa,bg+:#3d484d,hl+:#a7c080,info:#83c092,prompt:#dbbc7f,pointer:#e69875,marker:#e67e80,spinner:#d699b6,header:#7fbbb3 --height=40% --layout=reverse --border'
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

# fzf + zoxide shell integration
eval "$(zoxide init bash)"
eval "$(fzf --bash)" 2>/dev/null

# atuin (Ctrl+R only, leave Up alone)
. "$HOME/.atuin/bin/env"
[[ -f ~/.bash-preexec.sh ]] && source ~/.bash-preexec.sh
eval "$(atuin init bash --disable-up-arrow)"

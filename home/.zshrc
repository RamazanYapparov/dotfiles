source ~/.antigen/antigen.zsh

xset -b

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle pip
antigen bundle command-not-found
antigen bundle docker
antigen bundle httpie
antigen bundle mvn
antigen bundle npm
antigen bundle python
antigen bundle sudo
# antigen bundle ssh-agent
# antigen bundle yarn
antigen bundle kubectl

# code stats
CODESTATS_API_KEY="SFMyNTY.Y21GdFlYcGhiaTU1WVhCd1lYSnZkZz09IyNNVEUxTmpZPQ.gC6i5vEv1OnSeCNYKIQJjoDM-rlbPz0yq4QiPbss-h8"
antigen bundle https://gitlab.com/code-stats/code-stats-zsh.git

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-autosuggestions

# Load the theme.
antigen theme denysdovhan/spaceship-prompt
# antigen theme bira
# antigen theme kennethreitz
# Tell Antigen that you're done.
antigen apply

spaceship_vi_mode_enable
bindkey -M viins '\e.' insert-last-word # map alt+. to paste last word from previous command
bindkey -M viins 'jj' vi-cmd-mode
source ~/.autocomplete.zsh
source ~/.bash_aliases
export EDITOR="$(which nvim)"
export KUBE_EDITOR="$(which nvim)"


# FZF
source /usr/share/fzf/completion.zsh
source /usr/share/fzf/key-bindings.zsh

# GCloud
if [ -f '/home/ramazan/google-cloud-sdk/path.zsh.inc' ]; then . '/home/ramazan/google-cloud-sdk/path.zsh.inc'; fi
if [ -f '/home/ramazan/google-cloud-sdk/completion.zsh.inc' ]; then . '/home/ramazan/google-cloud-sdk/completion.zsh.inc'; fi

# SDKMAN
export SDKMAN_DIR="/home/ramazan/.sdkman"
[[ -s "/home/ramazan/.sdkman/bin/sdkman-init.sh" ]] && source "/home/ramazan/.sdkman/bin/sdkman-init.sh"

# kubectl
source <(command kubectl completion zsh)


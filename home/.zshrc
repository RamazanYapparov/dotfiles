# Fig pre block. Keep at the top of this file.
[[ -f "$HOME/.fig/shell/zshrc.pre.zsh" ]] && builtin source "$HOME/.fig/shell/zshrc.pre.zsh"
source ~/.antigen/antigen.zsh

#xset -b

# Load the oh-my-zsh's library.
antigen use oh-my-zsh

# Bundles from the default repo (robbyrussell's oh-my-zsh).
antigen bundle git
antigen bundle pip
antigen bundle command-not-found
# antigen bundle docker
antigen bundle httpie
antigen bundle mvn
antigen bundle npm
antigen bundle python
antigen bundle sudo
# antigen bundle ssh-agent
antigen bundle yarn
antigen bundle kubectl
antigen bundle jeffreytse/zsh-vi-mode

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

# spaceship_vi_mode_enable
SPACESHIP_GCLOUD_SHOW=false

ZVM_VI_INSERT_ESCAPE_BINDKEY=jk
# function zvm_after_init() {
# zvm_after_init_commands+=('[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh')
zvm_after_init_commands+=('[ -f ~/.autocomplete.zsh ] && source ~/.autocomplete.zsh')
zvm_after_init_commands+=('[ -f ~/bash_aliases ] && source ~/.bash_aliases')
# }
# source ~/.autocomplete.zsh
# source ~/.bash_aliases

export EDITOR="$(which nvim)"

export NEXUS_USER="backend"
export NEXUS_PASS="Pheiz2aezai1"




# Generated for envman. Do not edit.
[ -s "$HOME/.config/envman/load.sh" ] && source "$HOME/.config/envman/load.sh"

# added by Webi for pyenv
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
export PATH="/usr/local/opt/libpq/bin:$PATH"
export PATH="/Users/ryapparov/src/lsp/kotlin-language-server/server/build/install/server/bin:$PATH"

___MY_VMOPTIONS_SHELL_FILE="${HOME}/.jetbrains.vmoptions.sh"; if [ -f "${___MY_VMOPTIONS_SHELL_FILE}" ]; then . "${___MY_VMOPTIONS_SHELL_FILE}"; fi


#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"

source /usr/local/etc/profile.d/z.sh
source ~/.autocomplete.zsh
source ~/.bash_aliases

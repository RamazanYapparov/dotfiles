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
antigen bundle yarn

# Syntax highlighting bundle.
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-autosuggestions

# Load the theme.
antigen theme denysdovhan/spaceship-prompt
# antigen theme bira
# antigen theme kennethreitz
# Tell Antigen that you're done.
antigen apply

#hash thefuck && eval $(thefuck --alias)

source ~/.autocomplete.zsh
source ~/.bash_aliases
# spaceship_vi_mode_enable


#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="/home/ramazan/.sdkman"
[[ -s "/home/ramazan/.sdkman/bin/sdkman-init.sh" ]] && source "/home/ramazan/.sdkman/bin/sdkman-init.sh"

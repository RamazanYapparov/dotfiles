source ~/.antigen/antigen.zsh

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
# antigen theme agnoster 
antigen theme bira
# Tell Antigen that you're done.
antigen apply

hash thefuck && eval $(thefuck --alias)

source ~/.bash_alias


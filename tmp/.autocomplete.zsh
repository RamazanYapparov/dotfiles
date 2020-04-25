# auto-completes aliases
# enables to define
# - normal aliases (completed with trailing space)
# - blank aliases (completed without space)
# - ignored aliases (not completed)


# ignored aliases
typeset -a ialiases
ialiases=()

ialias() {
    alias $@
    args="$@"
    args=${args%%\=*}
    ialiases+=(${args##* })
}


# blank aliases
typeset -a baliases
baliases=()

balias() {
    alias $@
    args="$@"
    args=${args%%\=*}
    baliases+=(${args##* })
}


# functionality
expand-alias-space() {
    [[ $LBUFFER =~ "\<(${(j:|:)baliases})\$" ]]; insertBlank=$?
    if [[ ! $LBUFFER =~ "\<(${(j:|:)ialiases})\$" ]]; then
        zle _expand_alias
    fi
    zle self-insert
    if [[ "$insertBlank" = "0" ]]; then
        zle backward-delete-char
    fi
}
zle -N expand-alias-space

# starts multiple args as programs in background
background() {
    for ((i=2;i<=$#;i++)); do
        ${@[1]} ${@[$i]} &> /dev/null &
    done
}


bindkey " " expand-alias-space
bindkey -M isearch " " magic-space

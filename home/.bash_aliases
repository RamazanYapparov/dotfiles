# general
alias агсл='fuck'
alias cl="clear"
ialias ls='eza -al'
alias v='nvim'
alias nv='nvim'
ialias history='history -i'
alias xrfhd='xrandr --output HDMI-2 --mode 1920x1080 --pos 0x0'
alias sxkbm='setxkbmap -layout "us,ru" -option "grp:caps_switch,grp_led:scroll"'
alias sxkbmr='setxkbmap -layout "us,ru" -option'
# alias z='zathura'
alias supd='sudo pacman -Syu && yay -Syu'
alias sp='sudo pacman'
alias sa='source ~/.bash_aliases'
alias rf='rm -rf'
alias done='terminal-notifier -message done'
alias failed='terminal-notifier -message failed'


run_with_notification() {
    local cmd="$1"
    eval "$cmd"
    local local_status=$?

    if [ $local_status -eq 0 ]; then
      done
    else
      failed
    fi

    return $local_status
}

alias vpnon='systemctl start lhvpn'
alias vpnoff='systemctl stop lhvpn'
alias prodvpnon='systemctl start lhprodvpn'
alias prodvpnoff='systemctl stop lhprodvpn'

# heroku
alias h='heroku'

# docker
alias d='docker'
alias dc='docker compose'
alias drmi='docker rmi'
alias drmid='docker rmi $(docker images -f dangling=true -q)'
alias drm='docker rm'
alias dsta='docker stop $(docker ps -aq)'
alias drma='docker rm $(docker ps -aq)'
alias dps='docker ps -a'
alias di='docker images'
function dpm { docker exec -it "$1" python manage.py "$2" ; }
function dive { docker exec -it "$@" /bin/sh ; }

# podman
alias pd='podman'
alias pc='podman-compose'
alias pdps='podman ps -a'
alias pdi='podman images'
alias pdst='podman stop'
alias pdrm='podman rm'
alias pdrmi='podman rmi'

# gcp
alias gc='gcloud'

# kubernetes
alias k='k9s'
alias kaf='kubectl apply --record -f'
alias kg='kubectl get'
alias kdap='kubectl delete pods --all'
alias kgp='kubectl get pods'
alias kgpl='kubectl get pods -l'
alias kgs='kubectl get services'
alias kgn='kubectl get nodes'
alias kcn='kubectl config set-context $(kubectl config current-context) --namespace'
alias kgi='kubectl get ingresses'

# terraform
alias tf='terraform'

# python
alias pm="python manage.py"
alias pe="pipenv"
alias p="python"

# git
alias lg='lazygit'
alias g='git'
alias gpull='git pull origin $(git_current_branch)'
alias gpullf='git pull origin $(git_current_branch) --ff-only'
alias gupdm='git fetch && git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --no-rebase --no-edit'
alias gupdr='git fetch && git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --rebase'
alias gupdf='git fetch && git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --ff-only'
alias gpush='git fetch && git push origin $(git_current_branch) ; done'
alias gpushf='git push origin $(git_current_branch) --force-with-lease'
alias grh='git reset --hard'
alias gco='git checkout'
alias gst='git status'
alias gs='git stash'
alias gra='git rebase --abort'
alias grc='git rebase --continue'
alias gcm='git commit -m'
alias gcmd='git commit -m "$(git_current_branch)"'
alias gcn='git commit --no-edit'
alias grho='git reset --hard origin/$(git_current_branch)'

function git_branch_to_fetch {
  if [ $(git branch | ack -wc master) = '1' ];  then
    echo 'master';
  else
    echo 'main';
  fi
}
function git_remote_to_fetch {
  if [ $(git config remote.upstream.url | wc -l) = '1' ];  then
    echo 'upstream';
  else
    echo 'origin';
  fi
}

# java
# unalias mvnd
ialias mvn='mvn'
alias gr='gradle'
alias grw='./gradlew'
alias grwc='run_with_notification "./gradlew compileKotlin compileTestKotlin compileTestIntegrationKotlin"'
alias grwb='run_with_notification "./gradlew build"'
alias grwp='run_with_notification "./gradlew publishToMavenLocal"'
alias grwbt='run_with_notification "./gradlew build test"'
alias grwbtt='run_with_notification "./gradlew build test testIntegration"'
alias mci='mvn clean install'
alias mciT="mvn clean install -DskipTests"
alias mcp='mvn clean package'
alias mcpT='mvn clean package -DskipTests'
alias mp='mvn package'
alias mc='mvn clean'
alias mcc='mvn clean compile'
alias mct='mvn clean test'

# make
alias mk='make'
alias mkf='make format'
alias mkcl='make clean'
alias mkc='make compile'
alias mkcc='make clean compile'

# js
alias y='yarn'
alias ys='yarn start'

# rust
alias c='cargo'

JAVA_FOR_KTLINT='11.0.21-amzn'
JAVA_DEFAULT='17.0.9-amzn'
alias ktfmt='sdk u java $JAVA_FOR_KTLINT && git diff --name-only --cached --relative | grep "\.kt[s\"]\?$" | xargs ktlint -F --disabled_rules=no-wildcard-imports,import-ordering --relative . && sdk u java $JAVA_DEFAULT'

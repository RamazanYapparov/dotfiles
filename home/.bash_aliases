# general
alias агсл='fuck'
alias cl="clear"
ialias ls='exa -al'
alias v='nvim'
alias nv='nvim'
ialias history='history -i'
alias xrfhd='xrandr --output HDMI-2 --mode 1920x1080 --pos 0x0'
alias sxkbm='setxkbmap -layout "us,ru" -option "grp:caps_switch,grp_led:scroll"'
alias sxkbmr='setxkbmap -layout "us,ru" -option'
alias z='zathura'
alias supd='sudo pacman -Syu && yay -Syu'
alias sp='sudo pacman'
alias sa='source ~/.bash_aliases'
alias rf='rm -rf'

alias vpnon='systemctl start lhvpn'
alias vpnoff='systemctl stop lhvpn'
alias prodvpnon='systemctl start lhprodvpn'
alias prodvpnoff='systemctl stop lhprodvpn'

# heroku
alias h='heroku'

# docker
alias d='docker'
alias dc='docker-compose'
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
alias k='kubectl'
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
alias gupdm='git fetch && git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --no-rebase'
alias gupdr='git fetch && git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --rebase'
alias gupdf='git fetch && git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --ff-only'
alias gpush='git fetch && git push origin $(git_current_branch)'
alias gpushf='git push origin $(git_current_branch) --force-with-lease'
alias grh='git reset --hard'
alias gco='git checkout'
alias gst='git status'
alias gs='git stash'
alias gra='git rebase --abort'
alias grc='git rebase --continue'
alias gcm='git commit -m'
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

export DUMP_FILE="/Users/ryapparov/Documents/backups/dev_aws-2022_06_29_11_09_56-dump.sql"
export COMPOSE_DIR="/Users/ryapparov/src/provectus/lanehealth/lane-health-be/docker"
alias ddev='docker-compose -f $COMPOSE_DIR/lane-health-dev.yaml down --remove-orphans && docker-compose -f $COMPOSE_DIR/lane-health-dev.yaml up -d && sleep 5 && cat $DUMP_FILE | docker exec -i postgres psql -d lanehealth -h localhost -p 5432 -U postgres'
alias dall='docker-compose -f $COMPOSE_DIR/lane-health.yaml down && docker-compose -f $COMPOSE_DIR/lane-health.yaml up -d && sleep 5 && cat $DUMP_FILE | docker exec -i docker-hsa-database-1 psql -d lanehealth -h localhost -p 5432 -U postgres'

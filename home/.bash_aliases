# general
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

alias vpnon='systemctl start lhvpn'
alias vpnoff='systemctl stop lhvpn'
alias prodvpnon='systemctl start lhprodvpn'
alias prodvpnoff='systemctl stop lhprodvpn'

# heroku
alias h='heroku'

# docker
alias d="docker"
alias dc="docker-compose"
alias drmi="docker rmi"
alias drmid="docker rmi $(docker images -f dangling=true -q)"
alias drm="docker rm"
alias drma='docker rm $(docker ps -aq)'
alias dps="docker ps -a"
alias di="docker images"
function dpm { docker exec -it "$1" python manage.py "$2" ; }
function dive { docker exec -it "$@" /bin/sh ; }

# gcp
alias gc='gcloud'

# kubernetes
alias mk='minikube'
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
alias g='git'
balias gpull='git pull origin $(git_current_branch)'
alias gupd='git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --no-rebase'
alias gupdm='git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --no-rebase'
alias gupdr='git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --rebase'
alias gupdf='git pull $(git_remote_to_fetch) $(git_branch_to_fetch) --ff-only'
function git_branch_to_fetch {
  if [ $(git branch | ack master | wc -l) = '1' ];  then
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

# balias gpush='gupd && git push origin $(git_current_branch) || git merge --abort'
balias gpush='git push origin $(git_current_branch)'
balias gpushf='git push origin $(git_current_branch) -f'
alias grh='git reset --hard'
alias gco='git checkout'
alias gst='git status'
alias gs='git stash'
alias gra='git rebase --abort'
alias grc='git rebase --continue'
alias gcm='git commit -m'
balias grho='git reset --hard origin/$(git_current_branch)'

# java
# unalias mvnd
alias m='mvn'
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

# js
alias y='yarn'
alias ys='yarn start'

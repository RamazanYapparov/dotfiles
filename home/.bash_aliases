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
alias apt='sudo apt'
alias apti='sudo apt install -y'
alias sa='source ~/.bash_aliases'

# heroku
alias h='heroku'

# docker
alias d="docker"
alias dc="docker-compose"
alias drmi="docker rmi"
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
alias gupdm='git pull $(git_remote_to_fetch) master --no-rebase'
alias gupdr='git pull $(git_remote_to_fetch) master --rebase'
alias gupdf='git pull $(git_remote_to_fetch) master --ff-only'
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

# java
alias m='mvn'
ialias mvn='mvn'
alias gr='gradle'
alias grw='./gradlew'
alias mci='mvn clean install'
alias mcp='mvn clean package'
alias mp='mvn package'
alias mciT="mvn clean install -DskipTests"


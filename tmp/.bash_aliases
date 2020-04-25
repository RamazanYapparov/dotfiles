alias d="docker"
alias dc="docker-compose"
alias drmi="docker rmi"
alias drm="docker rm"
alias dps="docker ps -a"
alias di="docker images"
alias cl="clear"
alias pm="python manage.py"
alias g='git'
balias gpull='git pull origin $(git_current_branch)'
balias gpush='git push origin $(git_current_branch)'
ialias ls='exa -al'
ialias mvn='mvn'
alias mci='mvn clean install'
alias v='vim'

function dpm { docker exec -it "$1" python manage.py "$2" ; }
function dive { docker exec -it "$@" /bin/sh ; }

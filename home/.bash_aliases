alias d="docker"
alias dc="docker-compose"
alias drmi="docker rmi"
alias drm="docker rm"
alias dps="docker ps -a"
alias di="docker images"
alias cl="clear"
alias pm="python manage.py"

function dpm { docker exec -it "$1" python manage.py "$2" ; }
function dive { docker exec -it "$@" /bin/sh ; }

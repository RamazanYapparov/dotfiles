# general
alias cl="clear"
ialias ls='exa -al'
alias v='vim'
alias reboot='systemctl reboot'

# heroku
alias h='heroku'

# docker
alias d="docker"
alias dc="docker-compose"
alias drmi="docker rmi"
alias drm="docker rm"
alias dps="docker ps -a"
alias di="docker images"
function dpm { docker exec -it "$1" python manage.py "$2" ; }
function dive { docker exec -it "$@" /bin/sh ; }

# python
alias pm="python manage.py"
alias pe="pipenv"
alias p="python"

# git
alias g='git'
balias gpull='git pull origin $(git_current_branch)'
alias gupd='git pull $(git_remote_to_fetch) master'
balias gpush='git push origin $(git_current_branch)'
function git_remote_to_fetch {
	if [ $(git config remote.upstream.url | wc -l) = '1' ];	then
		echo 'upstream';
	else
		echo 'origin';
	fi
}

# java
alias m='mvn'
ialias mvn='mvn'
alias gr='gradle'
alias grw='./gradlew'
alias mci='mvn clean install'
alias mciT='mvn clean install -DskipTests'

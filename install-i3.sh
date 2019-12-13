#! /bin/sh

# https://github.com/altdesktop/playerctl/releases/latest

apt install -y vim zsh i3 i3status i3lock snapd python-pip python3-pip python-setuptools python3-setuptools virtualenv dmenu maim xclip && \
	pip3 install thefuck && \
	rsync -a home /home/$USER && \
	rsync -a etc /etc && \
	curl -L git.io/antigen > ~/.antigen/antigen.zsh && \
	chsh -s $(which zsh) && \
        curl -s "https://get.sdkman.io" | bash && \
	./snaps.sh


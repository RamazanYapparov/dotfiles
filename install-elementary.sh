#! /bin/sh

# https://github.com/altdesktop/playerctl/releases/latest

apt install -y vim zsh python-pip python3-pip python-setuptools python3-setuptools virtualenv && \
	pip3 install thefuck && \
	rsync -a home /home/$USER && \
	curl -L git.io/antigen > ~/.antigen/antigen.zsh && \
	chsh -s $(which zsh) && \
        curl -s "https://get.sdkman.io" | bash && \
	./flatpaks.sh


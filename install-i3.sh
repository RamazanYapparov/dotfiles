#! /bin/sh

# https://github.com/altdesktop/playerctl/releases/latest

sudo apt install -y vim zsh i3 i3status i3lock snapd python-pip python3-pip python-setuptools python3-setuptools virtualenv dmenu maim xclip py3status dunst && \
	sudo pip3 install thefuck && \
	rsync -av home/ /home/$USER/ && \
	sudo rsync -av etc/ /etc/ && \
	mkdir -p ~/.antigen/ && \
	curl -L git.io/antigen > ~/.antigen/antigen.zsh && \
	chsh -s $(which zsh) && \
        curl -s "https://get.sdkman.io" | bash && \
	sudo ./snaps.sh


#! /bin/sh

# https://github.com/altdesktop/playerctl/releases/latest

apt install -y vim zsh i3 i3status i3lock snapd python-pip python3-pip virtualenv dmenu && \
	mkdir -p ~/.antigen && \
	curl -L git.io/antigen > ~/.antigen/antigen.zsh && \
	mkdir -p ~/.config/i3 && \
	cp config ~/.config/i3/ && \
	mkdir -p /etc/X11/xorg.conf.d/ && \
	cp 30-touchpad.conf /etc/X11/xorg.conf.d/ && \
	cp .gitconfig .zshrc .bash_alias ~ && \
	chsh -s $(which zsh) && \
        curl -s "https://get.sdkman.io" | bash && \
	./snaps.sh


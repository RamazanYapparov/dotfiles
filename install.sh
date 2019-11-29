#! /bin/sh

# https://github.com/altdesktop/playerctl/releases/latest

sudo apt install -y vim zsh i3 i3status i3lock && \
	mkdir ~/.antigen && \
	cd ~/.antigen && \
	curl -L git.io/antigen > antigen.zsh && \
	mkdir -p ~/.config/i3 && \
	cp config ~/.config/i3/ && \
	mkdir -p /etc/X11/xorg.conf.d/ && \
	cp 30-touchpad.conf /etc/X11/xorg.conf.d/


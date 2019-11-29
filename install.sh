#! /bin/sh

# https://github.com/altdesktop/playerctl/releases/latest

sudo apt install -y vim zsh i3 i3status i3lock && \
	mkdir ~/.antigen && \
	cd ~/.antigen && \
	curl -L git.io/antigen > antigen.zsh && \
	mkdir -p ~/.config/i3 && \
	cp config ~/.config/i3/ && \
	find /usr -type d -name 'xorg.conf.d' -exec cp 30-touchpad.conf {} \; -quit


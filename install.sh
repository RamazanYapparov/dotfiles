#! /bin/sh

# https://github.com/altdesktop/playerctl/releases/latest

sudo apt install -y vim zsh i3 i3status i3lock && \
	mkdir ~/.antigen && \
	cd ~/.antigen && \
	curl -L git.io/antigen > antigen.zsh && \
	mkdir -p ~/.config && \
	cp config ~/.config/i3/


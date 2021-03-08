#!/usr/bin/zsh

cd && \
	xdg-user-dirs-update && \
	git clone https://aur.archlinux.org/yay.git && \
	cd yay && \
	makepkg -sic --noconfirm PKGBUILD && \
	yay --noconfirm -S \
		ly xkb-switch dtrx google-chrome powerline-fonts-git && \
	sudo systemctl enable ly && \
	cd && \
	rm -rf yay && \
	git clone https://github.com/vinceliuice/grub2-themes.git && \
	sudo grub2-themes/install.sh -t vimix -i white && \
	rm -rf grub2-themes && \
	git clone https://github.com/RamazanYapparov/dotfiles.git && \
	cd dotfiles && \
	rsync -av home/ /home/$USER/ && \
	mkdir -p /home/$USER/.antigen/ && \
	curl -L git.io/antigen > /home/$USER/.antigen/antigen.zsh && \
	curl -s "https://get.sdkman.io" | bash


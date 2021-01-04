#!/usr/bin/zsh

cd && \
	xdg-user-dirs-update && \
	git clone https://aur.archlinux.org/yay.git && \
	cd yay && \
	makepkg -sic --noconfirm PKGBUILD && \
	yay --noconfirm -S \
		ly xkb-switch dtrx google-chrome \
		intellij-idea-ultimate-edition && \
	sudo systemctl enable ly && \
	cd && \
	git clone https://github.com/RamazanYapparov/dotfiles.git && \
	cd dotfiles && \
	rsync -av home/ /home/$USER/ && \
	mkdir -p /home/$USER/.antigen/ && \
	curl -L git.io/antigen > /home/$USER/.antigen/antigen.zsh && \
	curl -s "https://get.sdkman.io" | bash && \
	curl https://sdk.cloud.google.com > install.sh && \
	bash install.sh --disable-prompts && \
	git clone https://github.com/powerline/fonts.git powerline-fonts && \
	sudo chmod +x powerline-fonts/install.sh && \
	powerline-fonts/install.sh

#!/bin/sh

# Prerequesites: all the partitioning is done and you execute this script under arch-chroot
# This script will not cover changing keyboard layout and setting up networking

# Packages:
core=(grub efibootmgr networkmanager os-prober base-devel linux-headers pulseaudio alsa-utils pulseaudio-alsa pulseaudio-equalizer pulseaudio-jack xdg-utils xdg-user-dirs sudo)
utils=(exa unzip docker neovim git rsync zsh wget curl which reflector ack docker-compose)
python_packages=(python flake8 python-pip python-pipenv)
gui_base=(xorg i3-wm i3-lock i3status i3blocks rofi alacritty maim xclip dunst)
gui_apps=(telegram-desktop code firefox zathura)


# configuring locale
ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && \
	hwclock --systohc && \
	mv /etc/locale.gen /etc/locale.gen.bak && \
	echo “en_US.UTF-8 UTF-8” >> /etc/locale.gen && \
	echo “LANG=en_US.UTF-8” > /etc/locale.conf && \
	locale-gen && \
	localectl set-locale LANG=en_US.UTF-8 && \
	timedatectl set-ntp true && \
# configuring hostname
	hostnamectl set-hostname arch && \
	echo “127.0.0.1 localhost.localdomain localhost” >> /etc/hosts && \
	echo “::1 localhost.localdomain localhost” >> /etc/hosts && \
	echo “127.0.0.1 arch.localdomain arch” >> /etc/hosts && \
# installing all needed packages
# todo: move packages into separate variables
	pacman -Syyuu && \
	pacman -S grub ${core[*]} ${utils[*]}which reflector exa xorg i3-wm i3lock i3status i3blocks rofi alacritty firefox  && \
# for nvidia support install `nvidia` and `nvidia-utils` packages
# optional to configure reflector later
# installing bootloader
	grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB && \
	grub-mkconfig -o /boot/grub/grub.cfg && \
# enabling services
	systemctl enable NetworkManager && \
	systemctl enable docker && \
	useradd -m -g users -G wheel,storage,power,docker,audio -s $(which zsh) ramazan && \
	visudo && \
	passwd ramazan && \

	echo 'setup is complete, please put your config files in place before rebooting'


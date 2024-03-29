#!/bin/sh

# Prerequesites: all the partitioning is done and you execute this script under arch-chroot
# This script will not cover changing keyboard layout and setting up networking

# Packages:
core=(grub efibootmgr networkmanager os-prober base-devel linux-headers pulseaudio alsa-utils pulseaudio-alsa pulseaudio-equalizer pulseaudio-jack xdg-utils xdg-user-dirs sudo mtools dosfstools ntfs-3g)
utils=(exa unzip docker vim neovim git rsync zsh wget curl which reflector ack docker-compose zip ttf-font-awesome ttf-jetbrains-mono fzf sysstat kubectl htop ranger terraform xdotool yad pacman-contrib)
python_packages=(python flake8 python-pip python-pipenv python-neovim)
node_packages=(nodejs npm yarn)
gui_base=(xorg i3-wm i3lock i3status i3blocks rofi alacritty maim xclip dunst)
gui_apps=(telegram-desktop code firefox zathura baobab vivaldi celluloid deepin-system-monitor pavucontrol)


# configuring locale
ln -sf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && \
	hwclock --systohc && \
	mv /etc/locale.gen /etc/locale.gen.bak && \
	echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen && \
	echo 'LANG=en_US.UTF-8' > /etc/locale.conf && \
	locale-gen && \
	localectl set-locale LANG=en_US.UTF-8 && \
	timedatectl set-ntp true && \
# configuring hostname
	hostnamectl set-hostname arch && \
	echo '127.0.0.1 localhost.localdomain localhost' >> /etc/hosts && \
	echo '::1 localhost.localdomain localhost' >> /etc/hosts && \
	echo '127.0.0.1 arch.localdomain arch' >> /etc/hosts && \
# installing all needed packages
	pacman --noconfirm -Syyuu && \
	pacman --noconfirm -S ${core[*]} ${utils[*]} ${python_packages[*]} ${node_packages[*]} ${gui_base[*]} ${gui_apps}
# for nvidia support install `nvidia` and `nvidia-utils` packages
# optional to configure reflector later
# installing bootloader
	grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB && \
	echo 'GRUB_DISABLE_OS_PROBER=false' >> /etc/default/grub && \
	grub-mkconfig -o /boot/grub/grub.cfg && \
# enabling services
	systemctl enable NetworkManager && \
	systemctl enable docker && \
	useradd -m -g users -G wheel,storage,power,docker,audio -s $(which zsh) ramazan && \
	passwd && \
	passwd ramazan && \
	visudo && \
	echo 'setup is complete, please put your config files in place before rebooting'


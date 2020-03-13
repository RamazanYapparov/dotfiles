This is initial configuration for ubuntu based machines.

Supports two types of installations:
1. Elementary OS (`./install-elementary.sh`)
1. I3 mode (`./install-i3.sh`)

> Note: both scripts are interactive, you'll need to provide
> your password to change shell to `zsh`

> Note: if you need docker installed, there is a script
> `docker-install.sh` that is need to be run as non-root user

> Note: I3 mode is not meant to be executed in 
> OS with installed I3, its actually installs i3wm itself

---
Following packages are installed regardless of the installation mode:
- vim
- zsh
- python-pip python-setuptools
- python3-pip python3-setuptools
- virtualenv  

I3 mode additionally installs following packages:
- i3
- i3status
- i3lock
- dmenu
- snapd
- maim
- xclip
- py3status **WARNING: py3status xkb_input module requires xkb-switch-git package from AUR**

Elementary mode installs `flatpak` package
> TODO move i3 mode to flatpak

---
Additionally both modes install following applications using snap/flatpak:
- code
- insomnia (not available on flathub)
- intellij-idea-ultimate
- node (not available on flathub)
- pycharm-professional
- skype
- sublime-text
- telegram-desktop

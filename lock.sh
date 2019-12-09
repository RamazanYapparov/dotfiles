#!/bin/bash

setxkbmap us && \
        i3lock -nc 000000 && \
        setxkbmap -layout "us,ru" -option "grp:lalt_lshift_toggle,grp_led:scroll"
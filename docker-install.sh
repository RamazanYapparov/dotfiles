#!/bin/bash

curl -s "https://get.docker.com" | bash && \
	sudo usermod -aG docker $USER

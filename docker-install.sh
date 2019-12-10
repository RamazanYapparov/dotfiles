#!/bin/bash
# Should be run as non root user!
curl -s "https://get.docker.com" | bash && \
	sudo usermod -aG docker $USER

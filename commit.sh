#!/bin/bash
# Upload files to Github - git@github.com:talesCPV/lince.git

read -p "Are you sure to commit Lince to GitHub ? (Y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

    git init

    git add assets/
    git add backend/
    git add index.html
    git add commit.sh

    git commit -m "by_script"

    git branch -M main
    git remote add origin git@github.com:talesCPV/lince.git
    git remote set-url origin git@github.com:talesCPV/lince.git

    git push -u -f origin main

fi
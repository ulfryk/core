#! /bin/sh

build_head=$(git rev-parse HEAD)

git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
git fetch
git checkout develop
git checkout ${build_head}

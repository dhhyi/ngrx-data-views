#!/bin/sh

set -e

git checkout master
git rebase -i --autosquash ef66b92

# push master
git push --force-with-lease

# set basic-example branch
git checkout basic-example
git reset --hard master^^^
git push --force-with-lease
git checkout master

# set memoized-data-views branch
git checkout memoized-data-views
git reset --hard master^^
git push --force-with-lease
git checkout master

# set data-views-as-business-objects branch
git checkout data-views-as-business-objects
git reset --hard master^
git push --force-with-lease
git checkout master

# set memoized-business-objects branch
git checkout memoized-business-objects
git reset --hard master
git push --force-with-lease
git checkout master


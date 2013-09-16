
PATH=$PATH:$HOME/.rvm/bin # Add RVM to PATH for scripting

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"
source ~/Code/.git-completion.sh
source ~/Code/.git-prompt.sh
export PS1='\W$(__git_ps1 " (%s)") \$ '
#export PS1='[\u@h \W$(__git_ps1 " (%s)")]\$ '

#aliases
#
#set -o nounset     # These  two options are useful for debugging.
#set -o xtrace

alias rt='bundle exec rake tmp:cache:clear;touch tmp/restart.txt'


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
alias sk='source .powenv;bundle exec sidekiq -c 2 -q default -q snapshot'
alias pgr='pg_restore --verbose --clean --no-acl --no-owner -h localhost -U isaac -d tobe_development latest.dump'
alias pgd="curl -o latest.dump `heroku pgbackups:url -a $1`"
alias pgconfig='emacs /usr/local/var/postgres/postgresql.conf'
alias rc='source .powenv; bundle exec rails console'
alias rdb='source .powenv; bundle exec rails dbconsole'
alias bi='bundle install'
alias br='bundle exec rake'
alias be='bundle exec'
alias brm='bundle exec rake db:migrate;bundle exec rake db:test:prepare'
alias brr='bundle exec rake db:rollback;bundle exec rake db:test:prepare'

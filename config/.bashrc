
#PATH=$PATH:$HOME/.rvm/bin # Add RVM to PATH for scripting
#[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
#[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function


### Added by the Heroku Toolbelt
#export PATH="/usr/local/heroku/bin:$PATH"
source ~/Code/progkb/config/git-completion.bash
source ~/Code/progkb/config/git-prompt.sh
export PS1='\W$(__git_ps1 " (%s)") \$ '
export SHELL="/bin/bash"
#export PS1='[\u@h \W$(__git_ps1 " (%s)")]\$ '

#aliases
#
#set -o nounset     # These  two options are useful for debugging.
#set -o xtrace

alias rt='bundle exec rake tmp:cache:clear;touch tmp/restart.txt'
alias sk='source .powenv;bundle exec sidekiq -c 2 -q default -q snapshot'
alias pgr='pg_restore --verbose --clean --no-acl --no-owner -h localhost -U isaac -d tobe_development latest.dump'
#alias pgd="curl -o latest.dump `heroku pgbackups:url -a $1`"
alias pgconfig='emacs /usr/local/var/postgres/postgresql.conf'
alias rc='source .powenv; bundle exec rails console'
alias rs='bundle exec rails server'
alias rdb='source .powenv; bundle exec rails dbconsole'
alias bi='bundle install'
alias br='bundle exec rake'
alias be='bundle exec'
alias brm='bundle exec rake db:migrate;bundle exec rake db:test:prepare'
alias brr='bundle exec rake db:rollback;bundle exec rake db:test:prepare'
alias cssclean='find . -name *.sass-cache | xargs rm -rf;find app -name *.css | xargs rm;find app -name *.css.map | xargs rm'
alias apipie='APIPIE_RECORD=examples bundle exec rspec spec/controllers/api && rake apipie:static && rake apipie:cache'
alias es='ember server'
alias espf='es --proxy http://app.secretcdn-stg.net'
alias et='ember test'
alias ets='ember test --serve'
alias etsf='ember test --serve --filter'
alias eg='ember g'
alias egp='ember g -p'
alias em='emacs'
alias nombom='npm cache clear && bower cache clean && rm -rf node_modules bower_components && npm install && bower install'

export NVM_DIR="/Users/isaac/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

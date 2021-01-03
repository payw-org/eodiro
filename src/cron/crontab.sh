# run `crontab -e` to edit crontab
# copy and paste the crons below
#
# (optional) restart cron service when its timezone does not follow the system timezone
# > sudo service cron stop
# > sudo service cron start

# update random nicknames at 00:00
0 0 * * * /home/ubuntu/.nvm/versions/node/v13.14.0/bin/node /home/ubuntu/eodiro/web/build/cron/update-random-nicknames

# check notice every 15 minutes
*/15 * * * * /home/ubuntu/.nvm/versions/node/v13.14.0/bin/node /home/ubuntu/eodiro/web/build/cron/check-notice

# clear pending users every 30 minutes
*/30 * * * * /home/ubuntu/.nvm/versions/node/v13.14.0/bin/node /home/ubuntu/eodiro/web/build/cron/clear-pending-users

# seed cafeteria menus at 03:00 everyday
# 0 3 * * * NODE_ENV=production /home/ubuntu/.nvm/versions/node/v13.14.0/bin/node /home/ubuntu/eodiro/web/build/cron/seed-cafeteria-menus

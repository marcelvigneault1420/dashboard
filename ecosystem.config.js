module.exports = {
  apps : [{
    name: 'dashboard',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'marcel',
      host : '127.0.0.1',
      ref  : 'origin/master',
      repo : 'git@github.com:marcelvigneault1420/express-api-my-dashboard.git',
      path : '/var/apps/charlesvigneault/dashboard',
      'post-deploy' : 'npm run build && pm2 reload ecosystem.config.js --env production && pm2 save'
    }
  }
};

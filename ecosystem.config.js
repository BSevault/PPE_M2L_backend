module.exports = {
  apps: [{
    name: 'AWS_M2LPPE_BACKEND',
    script: './app.js',
    env: {
      "NODE_ENV": "devlinux"
    }
  }],
  deploy: {
    production: {
      user: 'webapp',
      host: 'ec2-15-236-95-3.eu-west-3.compute.amazonaws.com',
      key: 'C:\Users\hiron\Desktop\Code\PPE\M2L\AWS_M2LPPE_BACKEND\config\m2l_ppe_3mous.pem',
      ref: 'origin/main',
      repo: 'git@github.com:Lem0nRavioli/AWS_M2LPPE_BACKEND.git',
      path: '/home/ubuntu/BACKEND',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
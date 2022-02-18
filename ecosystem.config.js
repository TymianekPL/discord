require('dotenv').config();

module.exports = {
	apps: [
		{
			name: 'linked-discord-bot',
			script: 'npm run start',
			time: true,
			instances: 1,
			autorestart: true,
			max_restarts: 50,
			watch: false,
			max_memory_restart: '1G',
			env: {
				TOKEN: process.env.TOKEN,
				CLIENT_ID: process.env.CLIENT_ID,
				GUILD_ID: process.env.GUILD_ID,
				GITHUB_TOKEN: process.env.GITHUB_TOKEN,
			},
		},
	],
	deploy: {
		production: {
			user: process.env.SERVER_USER,
			host: process.env.SERVER_IP,
			key: process.env.KEY_PATH,
			ref: 'origin/main',
			repo: 'https://github.com/lostdesign/linked-discord-bot.git',
			path: '/home/discord/linked-discord-bot',
			'post-deploy':
                'cp ~/.env ~/linked-discord-bot/.env && npm run install && npm run update:slash-commands && pm2 reload ecosystem.config.js --env production && pm2 save',
			env: {
				NODE_ENV: 'production',
				TOKEN: process.env.TOKEN,
				CLIENT_ID: process.env.CLIENT_ID,
				GUILD_ID: process.env.GUILD_ID,
				GITHUB_TOKEN: process.env.GITHUB_TOKEN,
			},
		},
	},
};
// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var pkg = require('./package.json');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'GridvoCMS',
	'brand': '格物管理后台',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.png',//TODO .ico
	'views': 'templates/views',
	'view engine': 'jade',

	'emails': 'templates/emails',

	'auto update': true,
	'mongo': process.env.MONGO_URI || 'mongodb://localhost/' + pkg.name,
	
	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'gridvocms',
	
	'logger': 'combined',
	
	'back url': '/',
	'signin url': '/keystone/signin',
	'signin redirect': '/keystone',
	'signout url': '/keystone/signout',
	'signout redirect': '/keystone',
	
	'wysiwyg images': true,
	// 'wysiwyg cloudinary images': '',
	// ... TODO Admin UIs参数设定
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7',
		},
	},
});

// Load your project's email test routes
keystone.set('email tests', require('./routes/emails'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	abouts: ['introductions', 'contacts', 'partners', 'law-states', 'privacy-policies'],
	products: 'products',
	cases: 'cases',
	'news-infos': ['news-infos', 'news-info-categories'],
	users: 'users',
	settings: ['carousel-pictures', 'feedback-consultations', 'site-maps'],
	// posts: ['posts', 'post-categories'],TODO 删除已注释和对应model、route文件
	// galleries: 'galleries',
	// enquiries: 'enquiries',
	// users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();

import Axios from 'axios';
import probe from 'probe-image-size';
import parseColor from 'parse-color';
import {FS, Net, Utils} from '../../lib';
import {getTourWins} from './data-badges';

/* Generic logic */
const CUSTOM_CSS_PATH = 'config/custom.css';
const CSS_HEADER = `.userlist li button:hover {
	background: rgba(220,230,240,0.7);
}`;

const hasTourWins = (wins: number, user: User) => {
	return getTourWins(user.id) >= wins;
};

const createUserCss = (
	userId: string,
	flair: Flair | undefined,
	background: Background | undefined,
) => {
	const backgroundCss: string[] = [];

	if (flair) {
		backgroundCss.push(`url("${getFlairUrl(flair.pokemonId, flair.pokemonMod)}") no-repeat right -7px top ${flair.heightOffset}px`)
	}

	if (background) {
		backgroundCss.push(`rgba(${background.r},${background.g},${background.b}, 0.25)`);
	}

	if (!backgroundCss.length) return '';

	return `[id$="-userlist-user-${userId}"]{background: ${backgroundCss.join(', ')};}`
};

const writeCss = (content: string) => FS(CUSTOM_CSS_PATH).writeSync(content);

const updateCss = () => {
	const userConfig: Record<string, { flair?: Flair, background?: Background }> = {};

	Object.entries(flairs).forEach(([userId, flair]) => {
		if (!userConfig[userId]) userConfig[userId] = {};
		userConfig[userId].flair = flair;
	});

	Object.entries(backgrounds).forEach(([userId, background]) => {
		if (!userConfig[userId]) userConfig[userId] = {};
		userConfig[userId].background = background;
	});

	writeCss([
		CSS_HEADER,
		...Object.entries(userConfig)
			.map(([userId, userConfig]) => createUserCss(userId, userConfig.flair, userConfig.background)),
	].join('\n'));
};

/* Avatar Logic */
const AVATAR_MINIMUM_TOUR_WINS = 1;
const AVATAR_USER_INELIGIBLE = 'You are not eligble for a custom avatar.';
const AVATAR_INVALID_IMAGE = 'Invalid image. Please provide a URL linking to a 80x80 GIF or PNG.';
const AVATAR_ERROR_WRITING_IMAGE = 'Unable to write image. Please try again or contact an administrator.';
const AVATAR_UNKNOWN_ERROR = 'An unknown error occured. Please try again or contact an administrator.';

interface AvatarStatus {
	enabled: boolean;
	requestedAvatar?: string;
	avatar?: string;
}

type AvatarConfig = Record<string, AvatarStatus>;

export const avatars: AvatarConfig = JSON.parse(
	FS('config/chat-plugins/custom-avatars.json').readIfExistsSync() || "{}"
);

const saveAvatars = () => {
	FS('config/chat-plugins/custom-avatars.json').writeUpdate(() => JSON.stringify(avatars));
};

const updateAvatarStatus = (id: string, statusUpdate: Partial<AvatarStatus>) => {
	const avatarStatus = avatars[id];

	const newStatus: AvatarStatus = {
		enabled: false,
	};

	avatars[id] = {
		...newStatus,
		...avatarStatus,
		...statusUpdate,
	};

	saveAvatars();
};

const createAvatarHtml = (
	avatarName: string,
	isCustom = false,
) => `<img src="//${Config.routes.client}/sprites/trainers${isCustom ? '-custom' : ''}/${avatarName}.png" title="${avatarName}" alt="${avatarName}" width="80" height="80" class="pixelated" />`; // eslint-disable-line max-len

const createRawAvatarHtml = (
	avatarFileName: string,
	isRequest = false,
) => `<avatar avatarfilename="${Utils.escapeHTML(avatarFileName)}"${isRequest ? ' "request" ' : " "} />`;

const getUsername = (userId: string) => Users.get(userId)?.name || userId;

const createPendingAvatarRequestHtml = (userId: string, avatarFileName: string, isBroadcast = false) => {
	const username = getUsername(userId);
	let pendingAvatarRequestHtml = '<details>';
	pendingAvatarRequestHtml += `<summary><b>${username}${isBroadcast ? ' Custom Avatar Request' : ''}</b></summary>`;
	pendingAvatarRequestHtml += createRawAvatarHtml(avatarFileName, true) + '<br />';
	pendingAvatarRequestHtml += `<button class="button" name="send" value="/customavatar approve ${userId}">Approve</button>`;
	pendingAvatarRequestHtml += `<button class="button" name="send" value="/customavatar deny ${userId}">Deny</button>`;
	return pendingAvatarRequestHtml + '</details>';
};

const sendPM = (message: string, userId: ID) => {
	const user = Users.get(userId);

	if (user) {
		user.send(`|pm|&|${user.getIdentity()}|${message}`);
	}
};

const notifyStaff = (requesterId: string, fileName: string) => {
	const staffRoom = Rooms.get('staff');

	if (staffRoom) {
		staffRoom.sendMods(`|uhtml|avatar-request-${requesterId}|${createPendingAvatarRequestHtml(requesterId, fileName, true)}`);
	}
};

const removeStaffNotficiation = (requesterId: string) => {
	const staffRoom = Rooms.get('staff');

	if (staffRoom) {
		staffRoom.sendMods(
			Utils.html`|uhtml|avatar-request-${requesterId}|`,
		);
	}
};

/* Title Logic */
const TITLE_MINIMUM_TOUR_WINS = 2;
const TITLE_USER_INELIGIBLE = `You are not eligble for a custom title. You must have at least ${TITLE_MINIMUM_TOUR_WINS} tour wins.`;
const TITLE_USER_UNSET = 'You do not have a custom title set.';
const TITLE_INVALID = 'Your custom title must be between 1 and 18 characters long.';

type Title = { title: string };
type TitleConfig = Record<string, Title>;

const titles: TitleConfig = JSON.parse(
	FS('config/chat-plugins/custom-titles.json').readIfExistsSync() || "{}"
);

const saveTitles = () => {
	FS('config/chat-plugins/custom-titles.json').writeUpdate(() => JSON.stringify(titles));
};

const formatTitle = (string: string) => string
	.replace(/[^A-Za-z0-9 ]*/, '')
	.replace(/( )+/, ' ');

/* Flair Logic */
const FLAIR_MINIMUM_TOUR_WINS = 3;
const FLAIR_USER_INELIGIBLE = `You are not eligble for a custom flair. You must have at least ${FLAIR_MINIMUM_TOUR_WINS} tour wins.`;
const FLAIR_USER_UNSET = 'You do not have a custom flair set.';
const getInvalidFlairErrorMessage = (mod: string, name: string) => `Invalid flair ${mod}/${name} selected.`;

const defaultHeight = -6;
const maxHeightChange = 10;

const baseUrls: Record<string, string> = {
	pokemon: 'https://raw.githubusercontent.com/Jackinev/pokeicons/master/40x30',
	clover: 'https://raw.githubusercontent.com/MrSableye/clovermon-showdown-assets/master/clover/sprites/pokemon-icons',
};

const getBaseUrl = (pokemonMod: string) => baseUrls[pokemonMod] || baseUrls.clover;

const getFlairUrl = (pokemonId: string, pokemonMod: string) => `${getBaseUrl(pokemonMod)}/${pokemonId}.png`;

type Flair = { pokemonId: string, pokemonMod: string, heightOffset: number };
type FlairConfig = Record<string, Flair>;

const flairs: FlairConfig = JSON.parse(
	FS('config/chat-plugins/custom-flair.json').readIfExistsSync() || "{}"
);

const saveFlairs = () => {
	FS('config/chat-plugins/custom-flair.json').writeUpdate(() => JSON.stringify(flairs));
	updateCss();
};

/* Name color logic */
const NAME_COLOR_MINIMUM_TOUR_WINS = 4;
const NAME_COLOR_USER_INELIGIBLE = `You are not eligble for a custom name color. You must have at least ${NAME_COLOR_MINIMUM_TOUR_WINS} tour wins.`;
const NAME_COLOR_INVALID = 'The username to use as your custom color must be at least 1 character and less than 19 characters long.';

/* Background color logic */
const BACKGROUND_MINIMUM_TOUR_WINS = 5;
const BACKGROUND_USER_INELIGIBLE = `You are not eligble for a custom background. You must have at least ${BACKGROUND_MINIMUM_TOUR_WINS} tour wins.`;
const BACKGROUND_USER_UNSET = 'You do not have a custom background set.';
const BACKGROUND_INVALID = 'Your custom background must be a color. Try a hex value.';

type Background = { r: number, g: number, b: number };
type BackgroundConfig = Record<string, Background>;

const backgrounds: BackgroundConfig = JSON.parse(
	FS('config/chat-plugins/custom-background.json').readIfExistsSync() || "{}"
);

const saveBackgrounds = () => {
	FS('config/chat-plugins/custom-background.json').writeUpdate(() => JSON.stringify(backgrounds));
	updateCss();
};

export const commands: Chat.ChatCommands = {
	custom: {
		avatars: 'avatar',
		avatar: {
			async request(target, room, user) {
				try {
					const canHaveAvatar = hasTourWins(AVATAR_MINIMUM_TOUR_WINS, user) || Config.customavatar?.[user.id] !== undefined;
	
					if (!canHaveAvatar) {
						throw new Chat.ErrorMessage(AVATAR_USER_INELIGIBLE);
					}
	
					const imageUrl = target.trim();
					const imagebuffer = (await Axios.get(imageUrl, {responseType: 'arraybuffer'})).data;
					const probeResult = probe.sync(imagebuffer);
	
					if (!probeResult) {
						throw new Chat.ErrorMessage(AVATAR_INVALID_IMAGE);
					}
	
					const {width, height, type} = probeResult;
	
					if (width !== 80 || height !== 80 || !['png', 'gif'].includes(toID(type))) {
						throw new Chat.ErrorMessage(AVATAR_INVALID_IMAGE);
					}
	
					try {
						const fileName = `${user.id}.${type}`;
						await FS(`./config/avatars/requests/${fileName}`).write(imagebuffer);
	
						updateAvatarStatus(user.id, {requestedAvatar: fileName});
	
						notifyStaff(user.id, fileName);
	
						return this.sendReplyBox(`Requested: ${createRawAvatarHtml(fileName, true)}`);
					} catch (error) {
						throw new Chat.ErrorMessage(AVATAR_ERROR_WRITING_IMAGE);
					}
				} catch (error) {
					throw new Chat.ErrorMessage(AVATAR_UNKNOWN_ERROR);
				}
			},
			showall: 'showapproved',
			showapproved() {
				this.runBroadcast();
				this.checkCan('avatar');
	
				const avatarList = Object.entries(avatars).filter(([userId, avatarStatus]) => avatarStatus.avatar !== undefined);
	
				if (!avatarList.length) {
					return this.sendReplyBox('<b><u>Approved Avatars</u></b><br /><div>No approved avatars.</div>');
				}
	
				/* eslint-disable max-len */
				const avatarListHtml = avatarList.map(
					([
						userId,
						avatarStatus,
					]) => `<span style="display: inline-block;"><div>${getUsername(userId)}</div><div>${createRawAvatarHtml(avatarStatus.avatar || '')}</div></span>`
				).join(' ');
				/* eslint-enable max-len */
	
				return this.sendReplyBox('<b><u>Approved Avatars</u></b><br />' + avatarListHtml);
			},
			showrequests: 'requests',
			requests() {
				this.checkCan('avatar');
	
				const requestList = Object.entries(avatars)
					.filter(([userId, avatarStatus]) => avatarStatus.requestedAvatar !== undefined);
	
				if (!requestList.length) {
					return this.sendReplyBox('<b><u>Avatar Requests</u></b><br />' + `<div>No requests available.</div>`);
				}
	
				const requestListHtml = requestList.map(
					([userId, avatarStatus]) => createPendingAvatarRequestHtml(userId, avatarStatus.requestedAvatar || ''),
				).join('<br />');
	
				return this.sendReplyBox('<b><u>Avatar Requests</u></b><br />' + requestListHtml);
			},
			approve(target) {
				this.checkCan('avatar');
	
				const targetId = toID(target);
				const avatarStatus = avatars[targetId];
	
				if (!avatarStatus || !avatarStatus.requestedAvatar) {
					throw new Chat.ErrorMessage(`No avatar request for ${targetId}`);
				}
	
				updateAvatarStatus(targetId, {
					avatar: avatarStatus.requestedAvatar,
					requestedAvatar: undefined,
				});
	
				FS(`./config/avatars/requests/${avatarStatus.requestedAvatar}`)
					.renameSync(`./config/avatars/${avatarStatus.requestedAvatar}`);
	
				sendPM(`/html <div class="infobox"><div>Avatar approved</div><div>${createRawAvatarHtml(avatarStatus.requestedAvatar)}</div></div>`, targetId);
				removeStaffNotficiation(targetId);
	
				return this.sendReplyBox(`<div><div>Approved avatar request of ${targetId}</div><div>${createRawAvatarHtml(avatarStatus.requestedAvatar)}</div></div>`);
			},
			deny(target) {
				this.checkCan('avatar');
	
				const targetId = toID(target);
				const avatarStatus = avatars[targetId];
	
				if (!avatarStatus || !avatarStatus.requestedAvatar) {
					throw new Chat.ErrorMessage(`No avatar request for ${targetId}`);
				}
	
				updateAvatarStatus(targetId, {
					requestedAvatar: undefined,
				});
	
				FS(`./config/avatars/requests/${avatarStatus.requestedAvatar}`).unlinkIfExistsSync();
	
				sendPM('Your avatar request was denied.', targetId);
				removeStaffNotficiation(targetId);
	
				return this.sendReply(`Denied avatar request of ${targetId}`);
			},
			on(target, room, user) {
				updateAvatarStatus(user.id, {enabled: true});
	
				return this.sendReplyBox('Enabled custom avatar.');
			},
			off(target, room, user) {
				updateAvatarStatus(user.id, {enabled: false});
	
				return this.sendReplyBox('Disabled custom avatar.');
			},
			blobbos(target, room, user) {
				const isInBlobbosConfig = Config.blobbosTournamentWinners && Config.blobbosTournamentWinners.includes(user.id);
				const hasBlobbosBadge = Config.usesqlitebadges && user.badges?.some((badge) => badge.badge_id === 'blobboswinner');
		
				if (isInBlobbosConfig || hasBlobbosBadge) {
					this.user.avatar = '#blobbos';
					this.sendReply(`${this.tr`Avatar changed to:`}\n|raw|${createAvatarHtml('blobbos', true)}`);
				}
			},
			'': 'help',
			help() {
				return this.parse('/help custom avatar');
			},
		},
		avatarhelp() {
			this.sendReplyBox(
				`<code>/custom avatar request [image url]</code>: requests a custom avatar. Requires: custom avatar access<br />` +
				`<code>/custom avatar showall</code>: shows all approved avatars. Requires: @ or above<br />` +
				`<code>/custom avatar showrequests</code>: shows all un-approved avatars. Requires: @ or above<br />` +
				`<code>/custom avatar approve [user]</code>: approves the user's avatar request. Requires: @ or above<br />` +
				`<code>/custom avatar deny [user]</code>: denies the user's avatar request. Requires: @ or above<br />` +
				`<code>/custom avatar on</code>: enables your own custom avatar.<br />` +
				`<code>/custom avatar off</code>: disables your own custom avatar.<br />` +
				`<code>/custom avatar blobbos</code>: enables the covetted Blobbos avatar.<br />`
			);
		},
		title: {
			set(target, room, user) {
				const canHaveTitle = hasTourWins(TITLE_MINIMUM_TOUR_WINS, user) || Config.customtitle?.[user.id] !== undefined;
	
				if (!canHaveTitle) {
					throw new Chat.ErrorMessage(TITLE_USER_INELIGIBLE);
				}
	
				const title = formatTitle(target);
				if (title.length < 1 || title.length > 18) throw new Chat.ErrorMessage(TITLE_INVALID);
	
				titles[user.id] = {title};
				saveTitles();
	
				this.sendReply(`|raw| Your title was successfully set. Log in again for it to appear. Title: ${title}`);
			},
			unset(target, room, user) {
				if (!titles[user.id]) throw new Chat.ErrorMessage(TITLE_USER_UNSET);

				delete titles[user.id];
				saveTitles();

				this.sendReply('|raw| Your title was successfully unset. Log in again for it to disappear.');
			},
			'': 'help',
			help() {
				return this.parse('/help custom title');
			},
		},
		titlehelp() {
			this.sendReplyBox(
				`<code>/custom title set [title]</code>: sets your title to the desired text.<br />` +
				`<code>/custom title unset</code>: removes your title.`
			);
		},
		flair: {
			async set(target, room, user) {	
				const canHaveFlair = hasTourWins(FLAIR_MINIMUM_TOUR_WINS, user) || Config.customflair?.[user.id] !== undefined;
	
				if (!canHaveFlair) {
					throw new Chat.ErrorMessage(FLAIR_USER_INELIGIBLE);
				}
	
				const [pokemon, pokemonMod, heightInput] = target.split(',');
				const flairUrl = getFlairUrl(toID(pokemon), toID(pokemonMod));
	
				let heightOffset = parseInt(heightInput);
	
				if (Number.isNaN(heightOffset)) {
					heightOffset = defaultHeight;
				} else if (Math.abs(heightOffset) > maxHeightChange) {
					heightOffset = defaultHeight;
				} else {
					heightOffset = defaultHeight + Math.trunc(heightOffset);
				}
	
				try {
					await Net(flairUrl).get();
				} catch (e) {
					return this.errorReply(getInvalidFlairErrorMessage(pokemonMod, pokemon));
				}
	
				flairs[user.id] = {pokemonId: toID(pokemon), pokemonMod: toID(pokemonMod), heightOffset};
				saveFlairs();
	
				this.sendReply("|raw| Your flair was successfully set. It may take a while for it to show up. Flair:<br /><img src='" + flairUrl + "' width='40' height='30'>");
			},
			unset(target, room, user) {
				if (!flairs[user.id]) throw new Chat.ErrorMessage(FLAIR_USER_UNSET);

				delete flairs[user.id];
				saveFlairs();

				this.sendReply('|raw| Your flair was successfully unset. It may take a while for it to dissapear.');
			},
			'': 'help',
			help() {
				return this.parse('/help custom flair');
			},
		},
		flairhelp() {
			this.sendReplyBox(
				`<code>/custom flair set [pokemon], [mod], [heightOffset]</code>: sets your flair to the desired pokemon from the specified mod (pokemon or clover) with an optional height adjustment.<br />` +
				`<code>/custom flair unset</code>: removes your flair.`
			);
		},
		color: {
			async set(target, room, user) {
				const canHaveFlair = hasTourWins(NAME_COLOR_MINIMUM_TOUR_WINS, user) || Config.customnamecolor?.[user.id] !== undefined;

				if (!canHaveFlair) throw new Chat.ErrorMessage(NAME_COLOR_USER_INELIGIBLE);

				const targetId = toID(target);
				if (!targetId || targetId.length > 18) {
					return this.errorReply(NAME_COLOR_INVALID);
				}

				const [res, error] = await LoginServer.request('updatenamecolor', {
					userid: user.id,
					source: targetId,
					by: user.id,
				});

				if (error || !res || res.actionerror) {
					throw new Chat.ErrorMessage('Unknown error setting custom name color. Please contact an administrator if this persists.');
				}

				return this.sendReply(`|raw| <username>${user.id}</username> was set to match <username>${targetId}</username>. It may take a while for it to show up.`);
			},
			async unset(target, room, user) {
				const [res, error] = await LoginServer.request('updatenamecolor', {
					userid: user.id,
					source: '',
					by: user.id,
				});

				if (error || !res || res.actionerror) {
					throw new Chat.ErrorMessage('Unknown error unsetting custom name color. Please contact an administrator if this persists.');
				}

				return this.sendReply('|raw| Your custon name color was successfully unset. It may take a while for it to dissapear.');
			},
			colorhelp() {
				this.sendReplyBox(
					`<code>/custom color set [username]</code>: sets your user color to match the specified user's color.<br />` +
					`<code>/custom color unset</code>: removes your user color.`
				);
			},
			'': 'help',
			help() {
				return this.parse('/help custom');
			},
		},
		bg: 'background',
		backgrounds: 'background',
		background: {
			set(target, room, user) {	
				const canHaveBackground = hasTourWins(BACKGROUND_MINIMUM_TOUR_WINS, user) || Config.custombackground?.[user.id] !== undefined;
	
				if (!canHaveBackground) {
					throw new Chat.ErrorMessage(BACKGROUND_USER_INELIGIBLE);
				}

				const color = parseColor(target.trim());

				if (!color.rgb) throw new Chat.ErrorMessage(BACKGROUND_INVALID);

				backgrounds[user.id] = {
					r: color.rgb[0],
					g: color.rgb[1],
					b: color.rgb[2],
				};
				saveBackgrounds();

				this.sendReply("|raw| Your background was successfully set. It may take a while for it to show up.");
			},
			unset(target, room, user) {
				if (!backgrounds[user.id]) throw new Chat.ErrorMessage(BACKGROUND_USER_UNSET);

				delete backgrounds[user.id];
				saveBackgrounds();

				this.sendReply('|raw| Your background was successfully unset. It may take a while for it to dissapear.');
			},
			'': 'help',
			help() {
				return this.parse('/help custom background');
			},
		},
		backgroundhelp() {
			this.sendReplyBox(
				`<code>/custom background set [hex color]</code>: sets your user background color to the specified color.<br />` +
				`<code>/custom background unset</code>: removes your user background color.`
			);
		},
		'': 'help',
		help() {
			return this.parse('/help custom');
		},
	},
	customhelp() {
		this.sendReplyBox(
			`<code>/custom avatar</code>: commands related to custom avatars. Try <code>/help custom avatar</code> for details. ${AVATAR_MINIMUM_TOUR_WINS} or more tour wins required to use.<br />` +
			`<code>/custom title</code>: commands related to custom titles. Try <code>/help custom title</code> for details. ${TITLE_MINIMUM_TOUR_WINS} or more tour wins required to use.<br />` +
			`<code>/custom flair</code>: commands related to custom flairs. Try <code>/help custom flair</code> for details. ${FLAIR_MINIMUM_TOUR_WINS} or more tour wins required to use.<br />` +
			`<code>/custom color</code>: commands related to custom user colors. Try <code>/help custom color</code> for details. ${NAME_COLOR_MINIMUM_TOUR_WINS} or more tour wins required to use.<br />` +
			`<code>/custom background</code>: commands related to custom background colors. Try <code>/help custom background</code> for details. ${BACKGROUND_MINIMUM_TOUR_WINS} or more tour wins required to use.`
		);
	},
};

export const loginfilter: Chat.LoginFilter = user => {
	const title = titles[user.id];
	if (title) {
		user.customgroup = title.title;
	}

	const avatar = avatars[user.id];
	if (avatar && avatar.enabled && avatar.avatar) {
		user.avatar = avatar.avatar;
	}
};

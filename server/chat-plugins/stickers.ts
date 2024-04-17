/* eslint max-len: ["error", 240] */

import {FS} from '../../lib';
import {Punishments} from '../punishments';
import {downloadImageWithVerification} from '../../lib/image';
import { checkEmojiLevel } from './emojis';

const MAX_STICKER_SIZE = 320;
const STICKER_SIZE = 160;
const ERROR_NO_STICKER_NAME = 'Specify an sticker name.';
const ERROR_NO_STICKER_URL = 'Specify an sticker URL.';
const COOLDOWN = 10 * 1000;

type Stickers = Record<string, string>;

export const stickers: Stickers = JSON.parse(
	FS('config/chat-plugins/stickers.json').readIfExistsSync() || "{}"
);

const saveStickers = () => {
	FS('config/chat-plugins/stickers.json').writeUpdate(() => JSON.stringify(stickers));
};

const addOrUpdateSticker = (name: string, filename: string) => {
	stickers[name] = filename;
	saveStickers();
};

const deleteSticker = (name: string) => {
	delete stickers[name];
	saveStickers();
};

const cooldowns: Record<string, number> = {};

const checkCooldown = (userID: ID) => {
	const now = Date.now();
	const activeCooldown = cooldowns[userID];

	if (activeCooldown && ((now - activeCooldown) < COOLDOWN)) {
		return false;
	}

	cooldowns[userID] = now;
	return true;
};

const toAlphaNumeric = (text: string) => ('' + text).replace(/[^A-Za-z0-9]+/g, '');

export const createStickerHtml = (
	name: string,
	filename: string,
) => `<img src="https://clover.weedl.es:8443/stickers/${filename}" title="/gif ${name}" height="${STICKER_SIZE}" width="${STICKER_SIZE}">`;

const downloadSticker = async (stickerName: string, imageUrl: string) => {
	const result = await downloadImageWithVerification(imageUrl, {
		validTypes: ['png', 'gif'],
		enforceSquare: true,
		minDimensions: {width: STICKER_SIZE, height: STICKER_SIZE},
		maxDimensions: {width: MAX_STICKER_SIZE, height: MAX_STICKER_SIZE},
		fileSize: 1000000,
	});

	if ('error' in result) {
		throw new Chat.ErrorMessage(result.error);
	}

	const fileName = `${stickerName}.${result.type}`;
	await FS(`./config/stickers/${fileName}`).write(result.image);

	return fileName;
};

export const commands: Chat.ChatCommands = {
	gif: 'sticker',
	sticker(target, room, user) {
		if (Punishments.hasPunishType(user.id, 'EMOJIBAN')) {
			throw new Chat.ErrorMessage('You are banned from using stickers.');
		}

		if (room && !checkEmojiLevel(user, room)) {
			throw new Chat.ErrorMessage('You cannot use stickers in this room.');
		}

		this.checkChat();

		const stickerName = target.trim();
		const sticker = stickers[stickerName];

		if (!sticker) throw new Chat.ErrorMessage(`No such sticker ${stickerName} exists.`);

		if (!checkCooldown(user.id)) {
			throw new Chat.ErrorMessage('You are using stickers too quickly.');
		}

		return `/html ${createStickerHtml(stickerName, sticker)}`;
	},
	managegif: 'managesticker',
	managesticker: {
		list() {
			this.runBroadcast();
			return this.sendReplyBox(`<b><u>Stickers</u> <i>(hover for name, try <code>/gif STICKERNAME</code>)</i></b><br />${Object.entries(stickers).map(([stickerName, stickerUrl]) => createStickerHtml(stickerName, stickerUrl)).join(' ')}`);
		},
		update: 'add',
		async add(target, room, user) {
			this.checkCan('emoji');
			const [rawStickerName, stickerUrl] = target.split(',').map((part) => part.trim());

			if (!rawStickerName) {
				return this.errorReply(ERROR_NO_STICKER_NAME);
			}
			const stickerName = toAlphaNumeric(rawStickerName);

			if (!stickerUrl) {
				return this.errorReply(ERROR_NO_STICKER_URL);
			}

			const filename = await downloadSticker(stickerName, stickerUrl);

			addOrUpdateSticker(stickerName, filename);

			this.addGlobalModAction(`${user.name} added sticker ${stickerName}`);
			return this.sendReplyBox(`Added: ${createStickerHtml(stickerName, filename)}`);
		},
		remove(target, room, user) {
			this.checkCan('emoji');
			const stickerName = toAlphaNumeric(target);

			if (!stickers[stickerName]) {
				return this.sendReplyBox(`No such sticker ${stickerName} exists.`);
			}

			deleteSticker(stickerName);

			this.addGlobalModAction(`${user.name} deleted sticker ${stickerName}`);
			return this.sendReply(`Deleted ${stickerName}`);
		},
	},
	managestickerhelp() {
		this.runBroadcast();
		return this.sendReplyBox([
			`<code>/managesticker list</code> - Lists all available stickers.`,
			`<code>/managesticker add [name], [image url]</code> - Adds or updates an sticker. Requires: &`,
			`<code>/maangesticker remove [name]</code> - Removes an sticker. Requires: &`,
		].join('<br />'));
	},
};

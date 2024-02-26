import {FS} from '../../lib';
type TsuchinokoConfig = Record<string, { oldAvatar: string | number, endTime: number }>;

const TSUCHINOKO_AVATAR = 'tsuchinoko';
const TRANSFORMATION_DURATION = 7 * 60 * 60 * 1000;

export const configs: TsuchinokoConfig = JSON.parse(
	FS('config/chat-plugins/tsuchinoko.json').readIfExistsSync() || "{}"
);

const saveConfig = () => {
	FS('config/chat-plugins/tsuchinoko.json').writeUpdate(() => JSON.stringify(configs));
};

export const commands: Chat.ChatCommands = {
	boil: 'tsuchinokoify',
	tsuchinokoify(target, room, user) {
		if (!user.can('globalban', null)) return this.errorReply('You toy with power that you do not understand.');

		const targetUser = Users.get(target);
		if (!targetUser) return this.errorReply('A live subject is required.');

		const now = Date.now();
		const targetUserConfig = configs[targetUser.id];
		if (targetUserConfig) {
			targetUser.avatar = targetUserConfig.oldAvatar;
			delete configs[targetUser.id];
			saveConfig();
			return this.sendReply(`The curse you have placed on ${targetUser.name} has been lifted.`);
		} else {
			configs[targetUser.id] = {
				oldAvatar: targetUser.avatar,
				endTime: now + TRANSFORMATION_DURATION,
			};
			targetUser.avatar = TSUCHINOKO_AVATAR;
			saveConfig();
			return this.sendReply(`You have placed a curse on ${targetUser.name}... shame on you!`);
		}
	},
};

export const loginfilter: Chat.LoginFilter = user => {
	const now = Date.now();
	const config = configs[user.id];
	if (config && (now > config.endTime)) {
		user.avatar = config.oldAvatar;
		delete configs[user.id];
		saveConfig();
	}
};

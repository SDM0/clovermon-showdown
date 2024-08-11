export const Moves: { [k: string]: ModdedMoveData } = {
	/* wipmon Enabled/Modified Moves */
	aerialace: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1, slicing: 1},
	},
	abyssalwave: {
		inherit: true,
		isNonstandard: null,
	},
	appleacid: {
		inherit: true,
		isNonstandard: null,
	},
	assist: {
		inherit: true,
		isNonstandard: null,
		onHit(target) {
			const noAssist = [
				'assist', 'banefulbunker', 'beakblast', 'belch', 'bestow', 'bounce', 'celebrate', 'chatter', 'circlethrow', 'copycat', 'counter', 'covet', 'destinybond', 'detect', 'dig', 'dive', 'dragontail', 'endure', 'feint', 'fly', 'focuspunch', 'followme', 'helpinghand', 'holdhands', 'kingsshield', 'matblock', 'mefirst', 'metronome', 'mimic', 'mirrorcoat', 'mirrormove', 'naturepower', 'phantomforce', 'protect', 'ragepowder', 'roar', 'shadowforce', 'shelltrap', 'sketch', 'skydrop', 'sleeptalk', 'snatch', 'spikyshield', 'spotlight', 'struggle', 'switcheroo', 'thief', 'transform', 'trick', 'whirlwind', 'wingsofcorrection', 'leafshield',
			];

			const moves = [];
			for (const pokemon of target.side.pokemon) {
				if (pokemon === target) continue;
				for (const moveSlot of pokemon.moveSlots) {
					const moveid = moveSlot.id;
					if (noAssist.includes(moveid)) continue;
					const move = this.dex.moves.get(moveid);
					if (move.isZ || move.isMax) {
						continue;
					}
					moves.push(moveid);
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.actions.useMove(randomMove, target);
		},
	},
	bodypress: {
		inherit: true,
		isNonstandard: null,
	},
	behemothbash: {
		inherit: true,
		isNonstandard: null,
	},
	behemothblade: {
		inherit: true,
		isNonstandard: null,
	},
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	branchpoke: {
		inherit: true,
		isNonstandard: null,
	},
	breakingswipe: {
		inherit: true,
		isNonstandard: null,
	},
	burningjealousy: {
		inherit: true,
		isNonstandard: null,
	},
	clangoroussoul: {
		inherit: true,
		isNonstandard: null,
	},
	coaching: {
		inherit: true,
		isNonstandard: null,
	},
	corrosivegas: {
		inherit: true,
		isNonstandard: null,
	},
	courtchange: {
		inherit: true,
		isNonstandard: null,
	},
	decorate: {
		inherit: true,
		isNonstandard: null,
	},
	dragondarts: {
		inherit: true,
		isNonstandard: null,
	},
	dragonenergy: {
		inherit: true,
		isNonstandard: null,
		noSketch: true,
	},
	drumbeating: {
		inherit: true,
		isNonstandard: null,
	},
	dualwingbeat: {
		inherit: true,
		isNonstandard: null,
	},
	dynamaxcannon: {
		inherit: true,
		isNonstandard: null,
	},
	eeriespell: {
		inherit: true,
		isNonstandard: null,
	},
	eternabeam: {
		inherit: true,
		isNonstandard: null,
	},
	expandingforce: {
		inherit: true,
		isNonstandard: null,
	},
	falsesurrender: {
		inherit: true,
		isNonstandard: null,
	},
	fierywrath: {
		inherit: true,
		isNonstandard: null,
	},
	firefang: {
		inherit: true,
		accuracy: 100,
	},
	firstimpression: {
		inherit: true,
		priority: 3,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	floatyfall: {
		inherit: true,
		isNonstandard: null,
		noSketch: true,
	},
	flipturn: {
		inherit: true,
		isNonstandard: null,
	},
	freezingglare: {
		inherit: true,
		isNonstandard: null,
	},
	glaciallance: {
		inherit: true,
		isNonstandard: null,
	},
	grassyglide: {
		inherit: true,
		isNonstandard: null,
	},
	grassyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude', 'earthpower'];
				if (weakenedMoves.includes(move.id) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.id === 'earthpower') {
					this.add('-message', 'In Clover CAP, Earth Power is weakened by Grassy Terrain.');
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	gravapple: {
		inherit: true,
		isNonstandard: null,
	},
	icefang: {
		inherit: true,
		accuracy: 100,
	},
	jawlock: {
		inherit: true,
		isNonstandard: null,
	},
	judgment: {
		inherit: true,
		isNonstandard: null,
	},
	junglehealing: {
		inherit: true,
		isNonstandard: null,
	},
	lashout: {
		inherit: true,
		isNonstandard: null,
	},
	lifedew: {
		inherit: true,
		isNonstandard: null,
	},
	lowsweep: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, kick: 1},
	},
	magicpowder: {
		inherit: true,
		isNonstandard: null,
	},
	meteorassault: {
		inherit: true,
		isNonstandard: null,
	},
	meteorbeam: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Meteor Beam",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({spa: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) { // TODO: Cap-only
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'densefog':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) { // TODO: Cap-only
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'densefog':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	mistyexplosion: {
		inherit: true,
		isNonstandard: null,
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	noretreat: {
		inherit: true,
		isNonstandard: null,
	},
	obstruct: {
		inherit: true,
		isNonstandard: null,
	},
	octolock: {
		inherit: true,
		isNonstandard: null,
	},
	overdrive: {
		inherit: true,
		isNonstandard: null,
	},
	pikapapow: {
		inherit: true,
		isNonstandard: null,
		noSketch: true,
	},
	poltergeist: {
		inherit: true,
		isNonstandard: null,
	},
	pyroball: {
		inherit: true,
		isNonstandard: null,
	},
	risingvoltage: {
		inherit: true,
		isNonstandard: null,
	},
	scaleshot: {
		inherit: true,
		isNonstandard: null,
	},
	scorchingsands: {
		inherit: true,
		isNonstandard: null,
	},
	sharpen: {
		inherit: true,
		isNonstandard: null,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
		},
		volatileStatus: 'sharpen',
		condition: {
			onStart(target) {
				this.effectState.stacks = 1;
				this.add('-start', target, 'sharpen' + this.effectState.stacks);
			},
			onRestart(target) {
				if (this.effectState.stacks >= 3) return false;
				this.effectState.stacks++;
				this.add('-start', target, 'sharpen' + this.effectState.stacks);
			},
			onModifyCritRatio(critRatio) {
				return critRatio + this.effectState.stacks;
			},
			onEnd(target) {
				this.add('-end', target, 'Sharpen');
			},
		},
	},
	shellsidearm: {
		inherit: true,
		isNonstandard: null,
	},
	skittersmack: {
		inherit: true,
		isNonstandard: null,
	},
	smackdown: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) { // TODO: Blobbos cap
				let applies = false;
				if (
					pokemon.hasType('Flying') ||
					pokemon.hasAbility('levitate')) {
					applies = true;
				}
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
					this.add('-start', pokemon, 'Smack Down');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
	},
	snipeshot: {
		inherit: true,
		isNonstandard: null,
	},
	solarbeam: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail', 'densefog'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, slicing: 1},
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail', 'densefog'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	spiritbreak: {
		inherit: true,
		isNonstandard: null,
	},
	splishysplash: {
		inherit: true,
		isNonstandard: null,
		noSketch: true,
	},
	steelbeam: {
		inherit: true,
		isNonstandard: null,
	},
	steelroller: {
		inherit: true,
		isNonstandard: null,
	},
	strangesteam: {
		inherit: true,
		isNonstandard: null,
	},
	stuffcheeks: {
		inherit: true,
		isNonstandard: null,
	},
	suckerpunch: {
		inherit: true,
		flags: {punch: 1, contact: 1, protect: 1, mirror: 1},
	},
	surgingstrikes: {
		inherit: true,
		isNonstandard: null,
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'densefog':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	tarshot: {
		inherit: true,
		isNonstandard: null,
	},
	teatime: {
		inherit: true,
		isNonstandard: null,
	},
	telekinesis: {
		inherit: true,
		condition: {
			duration: 3,
			onStart(target) {
				if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast', 'Fusjahl'].includes(target.baseSpecies.baseSpecies) ||
					['Gengar-Mega', 'Goryannus-Mega'].includes(target.baseSpecies.name)) {
					this.add('-immune', target);
					return null;
				}
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onUpdate(pokemon) {
				if (pokemon.baseSpecies.name === 'Gengar-Mega') {
					delete pokemon.volatiles['telekinesis'];
					this.add('-end', pokemon, 'Telekinesis', '[silent]');
				}
			},
			onResidualOrder: 19,
			onEnd(target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
	},
	thundercage: {
		inherit: true,
		isNonstandard: null,
	},
	thunderfang: {
		inherit: true,
		accuracy: 100,
	},
	thunderouskick: {
		inherit: true,
		isNonstandard: null,
		flags: {contact: 1, protect: 1, mirror: 1, kick: 1},
	},
	trickroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (this.activeMove?.id === 'backroom') {
					return 2;
				}
				if (source?.hasAbility(['persistent', 'moreroom'])) {
					this.add('-activate', source, `ability: ${source.ability}`, effect);
					return 7;
				}
				return 5;
			},
			onFieldStart(target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 1,
			onFieldEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
	tripleaxel: {
		inherit: true,
		isNonstandard: null,
		flags: {contact: 1, protect: 1, mirror: 1, kick: 1},
	},
	xscissor: {
		inherit: true,
		critRatio: 2,
	},
	weatherball: {
		inherit: true,
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
				move.basePower *= 2;
				break;
			case 'densefog':
				move.basePower *= 2;
				break;
			}
		},
	},
	wickedblow: {
		inherit: true,
		isNonstandard: null,
	},
	wavecrash: {
		inherit: true,
		isNonstandard: null,
	},
	zippyzap: {
		inherit: true,
		basePower: 50,
		pp: 15,
		willCrit: true,
		secondary: null,
		noSketch: true,
		isNonstandard: null,
	},
	/* WIPMons Enabled and Exclusive Moves */
	earthshatter: {
		inherit: true,
		isNonstandard: null,
	},
	phantomfang: {
		inherit: true,
		isNonstandard: null,
	},
	backdraft: {
		inherit: true,
		isNonstandard: null,
	},
	thunderdrop: {
		inherit: true,
		isNonstandard: null,
	},
	braindamage: {
		inherit: true,
		isNonstandard: null,
	},
	flintfang: {
		inherit: true,
		isNonstandard: null,
	},
	calibrate: {
		inherit: true,
		isNonstandard: null,
	},
	icastfireball: {
		inherit: true,
		isNonstandard: null,
	},
	glasshammer: {
		inherit: true,
		isNonstandard: null,
	},
	rottingkick: {
		inherit: true,
		isNonstandard: null,
	},
	mawofsight: {
		inherit: true,
		isNonstandard: null,
	},
	overgrownmoss: {
		inherit: true,
		isNonstandard: null,
	},
	enclose: {
		inherit: true,
		isNonstandard: null,
	},
	mindjack: {
		inherit: true,
		isNonstandard: null,
	},
	orbponder: {
		inherit: true,
		isNonstandard: null,
	},
	jetpunch: {
		inherit: true,
		isNonstandard: null,
	},
	razorwind: {
		accuracy: 90,
		basePower: 60,
		category: "Special",
		name: "Razor Wind",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		isNonstandard: null,
	},
	skyuppercut: {
		inherit: true,
		isNonstandard: null,
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 0;
		},
	},
	smellingsalts: {
		inherit: true,
		type: "Fighting",
		secondary: {
			chance: 10,
			status: 'par',
		},
		isNonstandard: null,
	},
	terrainpulse: {
		num: 805,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Terrain Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
				this.debug('BP doubled in Terrain');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
	},
	aquacutter: {
		inherit: true,
		isNonstandard: "Past",
	},
	aquastep: {
		inherit: true,
		isNonstandard: "Past",
	},
	armorcannon: {
		inherit: true,
		isNonstandard: "Past",
	},
	axekick: {
		inherit: true,
		isNonstandard: "Past",
	},
	bitterblade: {
		inherit: true,
		isNonstandard: "Past",
	},
	chillingwater: {
		inherit: true,
		isNonstandard: "Past",
	},
	chillyreception: {
		inherit: true,
		isNonstandard: "Past",
	},
	collisioncourse: {
		inherit: true,
		isNonstandard: "Past",
	},
	comeuppance: {
		inherit: true,
		isNonstandard: "Past",
	},
	doodle: {
		inherit: true,
		isNonstandard: "Past",
	},
	doubleshock: {
		inherit: true,
		isNonstandard: "Past",
	},
	electrodrift: {
		inherit: true,
		isNonstandard: "Past",
	},
	filletaway: {
		inherit: true,
		isNonstandard: "Past",
	},
	flowertrick: {
		inherit: true,
		isNonstandard: "Past",
	},
	gigatonhammer: {
		inherit: true,
		isNonstandard: "Past",
	},
	glaiverush: {
		inherit: true,
		isNonstandard: "Past",
	},
	headlongrush: {
		inherit: true,
		isNonstandard: "Past",
	},
	hyperdrill: {
		inherit: true,
		isNonstandard: "Past",
	},
	icespinner: {
		inherit: true,
		isNonstandard: null,
	},
	jetpunch: {
		inherit: true,
		isNonstandard: "Past",
	},
	kowtowcleave: {
		inherit: true,
		isNonstandard: "Past",
	},
	lastrespects: {
		inherit: true,
		isNonstandard: "Past",
	},
	luminacrash: {
		inherit: true,
		isNonstandard: "Past",
	},
	makeitrain: {
		inherit: true,
		isNonstandard: "Past",
	},
	mortalspin: {
		inherit: true,
		isNonstandard: "Past",
	},
	orderup: {
		inherit: true,
		isNonstandard: "Past",
	},
	populationbomb: {
		inherit: true,
		isNonstandard: "Past",
	},
	pounce: {
		inherit: true,
		isNonstandard: "Past",
	},
	ragefist: {
		inherit: true,
		isNonstandard: "Past",
	},
	ragingbull: {
		inherit: true,
		isNonstandard: "Past",
	},
	revivalblessing: {
		inherit: true,
		isNonstandard: "Past",
	},
	ruination: {
		inherit: true,
		isNonstandard: "Past",
	},
	saltcure: {
		inherit: true,
		isNonstandard: "Past",
	},
	shedtail: {
		inherit: true,
		isNonstandard: "Past",
	},
	silktrap: {
		inherit: true,
		isNonstandard: "Past",
	},
	snowscape: {
		inherit: true,
		isNonstandard: "Past",
	},
	spicyextract: {
		inherit: true,
		isNonstandard: "Past",
	},
	spinout: {
		inherit: true,
		isNonstandard: "Past",
	},
	terablast: {
		inherit: true,
		isNonstandard: "Past",
	},
	tidyup: {
		inherit: true,
		isNonstandard: "Past",
	},
	torchsong: {
		inherit: true,
		isNonstandard: "Past",
	},
	trailblaze: {
		inherit: true,
		isNonstandard: null,
	},
	tripledive: {
		inherit: true,
		isNonstandard: "Past",
	},
	twinbeam: {
		inherit: true,
		isNonstandard: "Past",
	},
	psyblade: {
		inherit: true,
		isNonstandard: "Past",
	},
	hydrosteam: {
		inherit: true,
		isNonstandard: "Past",
	},
	syrupbomb: {
		inherit: true,
		isNonstandard: "Past",
	},
	matchagotcha: {
		inherit: true,
		isNonstandard: "Past",
	},
	ivycudgel: {
		inherit: true,
		isNonstandard: "Past",
	},
	barbbarrage: {
		inherit: true,
		isNonstandard: "Past",
	},
	bittermalice: {
		inherit: true,
		isNonstandard: "Past",
	},
	bleakwindstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	bloodmoon: {
		inherit: true,
		isNonstandard: "Past",
	},
	ceaselessedge: {
		inherit: true,
		isNonstandard: "Past",
	},
	chloroblast: {
		inherit: true,
		isNonstandard: "Past",
	},
	direclaw: {
		inherit: true,
		isNonstandard: "Past",
	},
	frozensong: {
		inherit: true,
		isNonstandard: "Past",
	},
	infernalparade: {
		inherit: true,
		isNonstandard: "Past",
	},
	mountaingale: {
		inherit: true,
		isNonstandard: "Past",
	},
	mysticalpower: {
		inherit: true,
		isNonstandard: "Past",
	},
	psyshieldbash: {
		inherit: true,
		isNonstandard: "Past",
	},
	sandsearstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	springtidestorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	stoneaxe: {
		inherit: true,
		isNonstandard: "Past",
	},
	victorydance: {
		inherit: true,
		isNonstandard: "Past",
	},
	wildboltstorm: {
		inherit: true,
		isNonstandard: "Past",
	},
	eructlas: {
		inherit: true,
		isNonstandard: "Past",
	},
	genesisboost: {
		inherit: true,
		isNonstandard: "Past",
	},
	lasagnatoss: {
		inherit: true,
		isNonstandard: "Past",
	},
	metronomeifitwasfunny: {
		inherit: true,
		isNonstandard: "Past",
	},
	mitada: {
		inherit: true,
		isNonstandard: "Past",
	},
	neosporin: {
		inherit: true,
		isNonstandard: "Past",
	},
	zenheadbutt: {
		inherit: true,
		accuracy: 100,
		isNonstandard: null,
	},
	poweruppunch: {
		num: 612,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Power-Up Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	chargebeam: {
		num: 451,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Charge Beam",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	sleazyspores: {
		inherit: true,
		isNonstandard: null,
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sleazy Spores');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasType('Grass')) {
					this.add('-sideend', pokemon.side, 'move: Sleazy Spores', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('sleazyspores');
				}
				if (!pokemon.runStatusImmunity('powder')) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				this.add('-activate', pokemon, 'move: Sleazy Spores');
				this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('sleazyspores'));
			},
		},
	},
};

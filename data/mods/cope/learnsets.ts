/**
 * Describes a possible way to get a move onto a pokemon.
 *
 * First character is a generation number, 1-9.
 * Second character is a source ID, one of:
 *
 * - M = TM/HM
 * - T = tutor
 * - L = start or level-up, 3rd char+ is the level
 * - R = restricted (special moves like Rotom moves)
 * - E = egg
 * - D = Dream World, only 5D is valid
 * - S = event, 3rd char+ is the index in .eventData
 * - V = Virtual Console or Let's Go transfer, only 7V/8V is valid
 * - C = NOT A REAL SOURCE, see note, only 3C/4C is valid
 *
 * C marks certain moves learned by a pokemon's prevo. It's used to
 * work around the chainbreeding checker's shortcuts for performance;
 * it lets the pokemon be a valid father for teaching the move, but
 * is otherwise ignored by the learnset checker (which will actually
 * check prevos for compatibility).
 */
export const Learnsets: {[k: string]: ModdedLearnsetData} = {
	ginocchio: {
		learnset: {
			acrobatics: ["8L1"],
			agility: ["8L1"],
			airslash: ["8L1"],
			aromatherapy: ["8L1"],
			barrage: ["8L1"],
			bulkup: ["8L1"],
			calmmind: ["8L1"],
			cherrybomb: ["8L1"],
			crosschop: ["8L1"],
			curse: ["8L1"],
			dazzlinggleam: ["8L1"],
			detect: ["8L1"],
			encore: ["8L1"],
			endeavor: ["8L1"],
			energyball: ["8L1"],
			fakeout: ["8L1"],
			flakcannon: ['8L1'],
			fleurcannon: ["8L1"],
			frustration: ["8L1"],
			furycutter: ["8L1"],
			gigadrain: ["8L1"],
			grassknot: ["8L1"],
			healingwish: ["8L1"],
			irondefense: ["8L1"],
			kingsshield: ["8L1"],
			knockoff: ["8L1"],
			leafblade: ["8L1"],
			leafstorm: ["8L1"],
			leechseed: ["8L1"],
			lightofruin: ["8L1"],
			moonblast: ["8L1"],
			moonlight: ["8L1"],
			nightslash: ["8L1"],
			painsplit: ["8L1"],
			partingshot: ["8L1"],
			petalblizzard: ["8L1"],
			playrough: ["8L1"],
			poisonjab: ["8L1"],
			powerwhip: ["8L1"],
			psychocut: ["8L1"],
			pursuit: ["8L1"],
			rest: ["8L1"],
			return: ["8L1"],
			sacredsword: ["8L1"],
			secretsword: ["8L1"],
			seedbomb: ["8L1"],
			seedflare: ["8L1"],
			sharpen: ["8L1"],
			slash: ["8L1"],
			swordsdance: ["8L1"],
			synthesis: ["8L1"],
			taunt: ["8L1"],
			toxic: ["8L1"],
			trick: ["8L1"],
			weatherball: ["8L1"],
			woodhammer: ["8L1"],
			aerialace: ["8L1"],
			aircutter: ["8L1"],
			bulletseed: ["8L1"],
			charm: ["8L1"],
			cut: ["8L1"],
			endure: ["8L1"],
			falseswipe: ["8L1"],
			feint: ["8L1"],
			feintattack: ["8L1"],
			finalgambit: ["8L1"],
			forestscurse: ["8L1"],
			frenzyplant: ["8L1"],
			grasspledge: ["8L1"],
			grasswhistle: ["8L1"],
			grassyterrain: ["8L1"],
			growth: ["8L1"],
			healblock: ["8L1"],
			helpinghand: ["8L1"],
			hyperbeam: ["8L1"],
			ingrain: ["8L1"],
			leafage: ["8L1"],
			leaftornado: ["8L1"],
			magicalleaf: ["8L1"],
			megadrain: ["8L1"],
			naturesmadness: ["8L1"],
			needlearm: ["8L1"],
			petaldance: ["8L1"],
			quickguard: ["8L1"],
			razorleaf: ["8L1"],
			retaliate: ["8L1"],
			revenge: ["8L1"],
			reversal: ["8L1"],
			solarbeam: ["8L1"],
			solarblade: ["8L1"],
			stunspore: ["8L1"],
			leer: ["8L1"],
			thief: ["8L1"],
			pound: ["8L1"],
			vinewhip: ["8L1"],
			worryseed: ["8L1"],
			substitute: ["8L1"],
			sleeptalk: ["8L1"],
			meme: ["8L1"],
			hiddenpower: ["8L1"],
			protect: ["8L1"],
			starseedblast: ["8L1"],
			branchpoke: ['8L1'],
			coaching: ['8L1'],
			grassyglide: ['8L1'],
			junglehealing: ['8L1'],
			beamblade: ["8L1"],
			faeblade: ["8L1"],
			rocketpunch: ["8L1"],
			speedweed: ["8L1"],
			chargebeam: ["8L1"],
			vacuumwave: ["8L1"],
			bulletpunch: ["8L1"],
			milkdrink: ["8L100"],
		},
	},
	sableye: {
		learnset: {
			leer: ["8L1"],
			scratch: ["8L1"],
			foresight: ["8L4"],
			nightshade: ["8L8"],
			spookout: ["8L11"],
			furyswipes: ["8L15"],
			fakeout: ["8L18"],
			detect: ["8L22"],
			shadowsneak: ["8L25"],
			knockoff: ["8L29"],
			feintattack: ["8L32"],
			confuseray: ["8L36"],
			shadowclaw: ["8L39"],
			powergem: ["8L43"],
			moonlight: ["8L46"],
			punishment: ["8L50"],
			zenheadbutt: ["8L53"],
			shadowball: ["8L57", "8M"],
			meanlook: ["8L60"],
			megakick: ["8T"],
			doubleedge: ["8T"],
			seismictoss: ["8T"],
			metronome: ["8T"],
			braindamage: ["8T"],
			recycle: ["8T"],
			bodyslam: ["8T"],
			uturn: ["8T"],
			mimic: ["8T"],
			waterpulse: ["8M"],
			sunnyday: ["8M"],
			protect: ["8M"],
			return: ["8M"],
			psychic: ["8M"],
			brickbreak: ["8M"],
			rocktomb: ["8M"],
			torment: ["8M"],
			secretpower: ["8M"],
			attract: ["8M"],
			darkpulse: ["8M"],
			cut: ["8M"],
			flash: ["8M"],
			calmmind: ["8M"],
			toxic: ["8M"],
			hiddenpower: ["8M"],
			taunt: ["8M"],
			raindance: ["8M"],
			dig: ["8M"],
			shockwave: ["8M"],
			aerialace: ["8M"],
			facade: ["8M"],
			rest: ["8M"],
			thief: ["8M"],
			rocksmash: ["8M"],
		},
	},
	pantherk: {
		learnset: {
			tailglow: ["8L1"],
			scratch: ["8L1"],
			leer: ["8L1"],
			doublekick: ["8L4"],
			quickattack: ["8L7"],
			rollingkick: ["8L10"],
			pursuit: ["8L13"],
			taunt: ["8L17", "8M"],
			superpower: ["8L20"],
			crunch: ["8L23"],
			thunderpunch: ["8L25"],
			bulletpunch: ["8L28"],
			shadowpunch: ["8L33"],
			meteormash: ["8L39"],
			closecombat: ["8L47"],
			playrough: ["8L52"],
			highjumpkick: ["8L63"],
			swordsdance: ["8L70", "8T"],
			perishsong: ["8L85"],
			megapunch: ["8T"],
			megakick: ["8T"],
			doubleedge: ["8T"],
			seismictoss: ["8T"],
			braindamage: ["8T"],
			flintfang: ["8T"],
			bodyslam: ["8T"],
			uturn: ["8T"],
			rockslide: ["8T"],
			focuspunch: ["8M"],
			protect: ["8M"],
			frustration: ["8M"],
			irontail: ["8M"],
			return: ["8M"],
			brickbreak: ["8M"],
			reflect: ["8M"],
			rocktomb: ["8M"],
			torment: ["8M"],
			cut: ["8M"],
			bulkup: ["8M"],
			safeguard: ["8M"],
			earthquake: ["8M"],
			dig: ["8M"],
			stealthrock: ["8M"],
			aerialace: ["8M"],
			facade: ["8M"],
			rest: ["8M"],
			thief: ["8M"],
			strength: ["8M"],
			rocksmash: ["8M"],
		},
	},
	weedle: {
		learnset: {
			poisonsting: ["8L1"],
			stringshot: ["8L1"],
			bugbite: ["8L15"],
			struggle: ["8L33"],
			cope: ["8L66"],
		},
	},
	warudio: {
		learnset: {
			acrobatics: ["8L34", "8T"],
			aerialace: ["8M"],
			astonish: ["8L1"],
			attract: ["8M"],
			aurasphere: ["8L47"],
			beatup: ["8T"],
			bite: ["8L9"],
			blizzard: ["8M"],
			bodyslam: ["8T"],
			bounce: ["8T"],
			brickbreak: ["8M"],
			bulkup: ["8M"],
			bulletseed: ["8M"],
			calmmind: ["8M"],
			circlethrow: ["8L37"],
			closecombat: ["8L68"],
			confuseray: ["8L26"],
			crunch: ["8L30"],
			cut: ["8M"],
			darkpulse: ["8T"],
			defog: ["8T"],
			dig: ["8M"],
			doubleedge: ["8T"],
			doubleteam: ["8M"],
			drainingkiss: ["8L19"],
			earthquake: ["8M"],
			echoedvoice: ["8T"],
			endeavor: ["8T"],
			extremespeed: ["8L44"],
			facade: ["8M"],
			firefang: ["8T"],
			flash: ["8M"],
			fly: ["8M"],
			flyingpress: ["8E"],
			focusblast: ["8L53", "8T"],
			focuspunch: ["8M"],
			forcepalm: ["8L23"],
			foulplay: ["8T"],
			frustration: ["8M"],
			futuresight: ["8L50"],
			gigadrain: ["8M"],
			gust: ["8L1"],
			hail: ["8M"],
			healbell: ["8T"],
			hiddenpower: ["8M"],
			honeclaws: ["8T"],
			hyperbeam: ["8M"],
			icebeam: ["8M"],
			icefang: ["8T"],
			icepunch: ["8T"],
			infestation: ["8T"],
			inverseroom: ["8T"],
			knockoff: ["8T"],
			leechlife: ["8L59"],
			axekick: ["8L65"],
			lowkick: ["8T"],
			magicroom: ["8T"],
			meme: ["8T"],
			metronome: ["8T"],
			moonlight: ["8L1"],
			nastyplot: ["8L41"],
			nightdaze: ["8L62"],
			nightshade: ["8T"],
			painsplit: ["8T"],
			payday: ["8T"],
			poweruppunch: ["8T"],
			present: ["8T"],
			protect: ["8M"],
			psychic: ["8M"],
			psychicfangs: ["8T"],
			psyshock: ["8T"],
			pursuit: ["8L1"],
			quickattack: ["8L4"],
			raindance: ["8M"],
			reflect: ["8M"],
			rest: ["8M"],
			return: ["8M"],
			roar: ["8M"],
			roaroftime: ["8L79"],
			rockclimb: ["8M"],
			rockslide: ["8T"],
			rocksmash: ["8M"],
			roost: ["8T"],
			sandstorm: ["8M"],
			secretpower: ["8M"],
			seismictoss: ["8T"],
			shadowball: ["8M"],
			shitpost: ["8T"],
			skillswap: ["8M"],
			sleeptalk: ["8T"],
			sludgebomb: ["8M"],
			snatch: ["8M"],
			steamroller: ["8L1"],
			stoneedge: ["8T"],
			stormthrow: ["8L37"],
			strength: ["8M"],
			substitute: ["8T"],
			suckerpunch: ["8L56"],
			sunnyday: ["8M"],
			superfang: ["8T"],
			superpower: ["8T"],
			supersonic: ["8L1"],
			swagger: ["8T"],
			sweetkiss: ["8L12"],
			tailwind: ["8T"],
			taunt: ["8M"],
			teleport: ["8T"],
			thief: ["8M"],
			thinkfast: ["8T"],
			throatchop: ["8T"],
			thunderfang: ["8T"],
			thunderwave: ["8T"],
			torment: ["8M"],
			toxic: ["8M"],
			trick: ["8T"],
			trickroom: ["8T"],
			uturn: ["8T"],
			vacuumwave: ["8T"],
			wingattack: ["8L15"],
			wonderroom: ["8T"],
			zenheadbutt: ["8T"],
		},
	},
	diobat: {
		learnset: {
			acrobatics: ["8L31", "8T"],
			aerialace: ["8M"],
			astonish: ["8L1"],
			attract: ["8M"],
			beatup: ["8T"],
			bite: ["8L9"],
			blizzard: ["8M"],
			bodyslam: ["8T"],
			bounce: ["8T"],
			bulkup: ["8M"],
			bulletseed: ["8M"],
			confuseray: ["8L23"],
			crunch: ["8L27"],
			cut: ["8M"],
			darkpulse: ["8E", "8L44", "8T"],
			defog: ["8E", "8T"],
			doubleedge: ["8T"],
			doubleteam: ["8M"],
			drainingkiss: ["8L19"],
			echoedvoice: ["8T"],
			endeavor: ["8T"],
			extremespeed: ["8L39"],
			facade: ["8M"],
			firefang: ["8T"],
			flash: ["8M"],
			fly: ["8M"],
			flyingpress: ["8E"],
			focusblast: ["8T"],
			foulplay: ["8T"],
			frustration: ["8M"],
			futuresight: ["8L47"],
			gust: ["8L1"],
			healbell: ["8T"],
			hiddenpower: ["8M"],
			highjumpkick: ["8E"],
			honeclaws: ["8T"],
			hypervoice: ["8E"],
			icebeam: ["8M"],
			icefang: ["8T"],
			infestation: ["8T"],
			inverseroom: ["8T"],
			knockoff: ["8T"],
			leechlife: ["8L52"],
			drainpunch: ["8L60"],
			lowkick: ["8T"],
			magicroom: ["8T"],
			meme: ["8T"],
			metronome: ["8T"],
			nastyplot: ["8L35"],
			nightshade: ["8T"],
			painsplit: ["8T"],
			payday: ["8T"],
			present: ["8T"],
			protect: ["8M"],
			psychic: ["8M"],
			psychicfangs: ["8T"],
			pursuit: ["8L1"],
			quickattack: ["8L4"],
			raindance: ["8M"],
			rest: ["8M"],
			return: ["8M"],
			roar: ["8M"],
			roost: ["8T"],
			secretpower: ["8M"],
			shadowball: ["8M"],
			skillswap: ["8M"],
			sleeptalk: ["8T"],
			sludgebomb: ["8M"],
			snatch: ["8M"],
			substitute: ["8T"],
			suckerpunch: ["8L56"],
			sunnyday: ["8M"],
			superfang: ["8T"],
			supersonic: ["8L1"],
			swagger: ["8T"],
			sweetkiss: ["8L12"],
			switcheroo: ["8E"],
			tailwind: ["8T"],
			taunt: ["8M"],
			teleport: ["8T"],
			thief: ["8M"],
			thinkfast: ["8T"],
			throatchop: ["8T"],
			thunderfang: ["8T"],
			thunderwave: ["8T"],
			torment: ["8M"],
			toxic: ["8M"],
			trick: ["8T"],
			trickroom: ["8T"],
			uturn: ["8T"],
			vacuumwave: ["8E"],
			wingattack: ["8L15"],
			wonderroom: ["8T"],
		},
	},
	smogaroben: {
		learnset: {
			acid: ["8L4"],
			acrobatics: ["8T"],
			aerialace: ["8M"],
			attract: ["8M"],
			bodyslam: ["8T"],
			bounce: ["8T"],
			bravebird: ["8E", "8L47"],
			bulkup: ["8M"],
			bulletpunch: ["8E", "8L10"],
			calmmind: ["8M"],
			closecombat: ["8E"],
			defog: ["8E", "8L30", "8T"],
			doubleedge: ["8T"],
			dracometeor: ["8E"],
			dragontail: ["8T"],
			drillpeck: ["8L26"],
			earthpower: ["8T"],
			earthquake: ["8L63", "8M"],
			explosion: ["8T"],
			facade: ["8M"],
			fireblast: ["8M"],
			flamethrower: ["8M"],
			fly: ["8M"],
			focusblast: ["8T"],
			foulplay: ["8E", "8T"],
			frustration: ["8M"],
			gigadrain: ["8M"],
			gunkshot: ["8L70", "8T"],
			haze: ["8T"],
			heatwave: ["8T"],
			hiddenpower: ["8L12", "8M"],
			honeclaws: ["8T"],
			icebeam: ["8M"],
			icywind: ["8T"],
			knockoff: ["8T"],
			lightscreen: ["8M"],
			magiccoat: ["8T"],
			meme: ["8T"],
			metronome: ["8T"],
			outrage: ["8L56"],
			painsplit: ["8T"],
			payday: ["8T"],
			peck: ["8L1"],
			poisonjab: ["8L33"],
			present: ["8T"],
			protect: ["8M"],
			psyshock: ["8T"],
			pursuit: ["8L19"],
			raindance: ["8M"],
			rapidspin: ["8L7"],
			reflect: ["8M"],
			rest: ["8M"],
			retaliate: ["8T"],
			return: ["8M"],
			roost: ["8L60", "8T"],
			scald: ["8L53", "8T"],
			secretpower: ["8M"],
			shellsmash: ["8E", "8L66"],
			shitpost: ["8T"],
			sleeptalk: ["8T"],
			sludgebomb: ["8M"],
			sludgewave: ["8T"],
			snatch: ["8M"],
			spikes: ["8L15"],
			stunspore: ["8L50"],
			stealthrock: ["8E", "8L44", "8T"],
			steelwing: ["8M"],
			stoneedge: ["8T"],
			substitute: ["8L40", "8T"],
			sunnyday: ["8M"],
			swordsdance: ["8T"],
			tailwind: ["8T"],
			taunt: ["8L1", "8M"],
			teleport: ["8T"],
			thief: ["8M"],
			thunderwave: ["8T"],
			thunderbolt: ["8M"],
			torment: ["8M"],
			toxic: ["8L22", "8M"],
			toxicspikes: ["8L15"],
			trick: ["8T"],
			uturn: ["8L36", "8T"],
			vacuumwave: ["8T"],
			venoshock: ["8L22"],
			voltswitch: ["8T"],
			willowisp: ["8T"],
			suckerpunch: ["8E"],
			healblock: ["8E"],
		},
	},
	smoxilon: {
		learnset: {
			acid: ["8L4"],
			acrobatics: ["8T"],
			aerialace: ["8M"],
			attract: ["8M"],
			bodyslam: ["8T"],
			bounce: ["8T"],
			bravebird: ["8L47"],
			bulkup: ["8M"],
			bulletpunch: ["8L10"],
			calmmind: ["8M"],
			defog: ["8L30", "8T"],
			doubleedge: ["8T"],
			dracometeor: ["8L75"],
			dragontail: ["8T"],
			drillpeck: ["8L26"],
			earthpower: ["8T"],
			earthquake: ["8L63", "8M"],
			electricterrain: ["8T"],
			explosion: ["8T"],
			facade: ["8M"],
			fireblast: ["8M"],
			flamethrower: ["8M"],
			fly: ["8M"],
			focusblast: ["8T"],
			foulplay: ["8T"],
			frustration: ["8M"],
			gigadrain: ["8M"],
			grassyterrain: ["8T"],
			gunkshot: ["8L70", "8T"],
			haze: ["8T"],
			heatwave: ["8T"],
			hiddenpower: ["8L12", "8M"],
			honeclaws: ["8T"],
			hyperbeam: ["8M"],
			icebeam: ["8M"],
			icywind: ["8T"],
			knockoff: ["8T"],
			lightscreen: ["8M"],
			magiccoat: ["8T"],
			meme: ["8T"],
			metronome: ["8T"],
			mistyterrain: ["8T"],
			mop: ["8T"],
			outrage: ["8L56"],
			painsplit: ["8T"],
			payday: ["8T"],
			peck: ["8L1"],
			poisonjab: ["8L33"],
			present: ["8T"],
			protect: ["8M"],
			psychicterrain: ["8T"],
			psyshock: ["8T"],
			pursuit: ["8L19"],
			raindance: ["8M"],
			rapidspin: ["8L7"],
			reflect: ["8M"],
			rest: ["8M"],
			retaliate: ["8T"],
			return: ["8M"],
			roost: ["8L60", "8T"],
			scald: ["8L53", "8T"],
			secretpower: ["8M"],
			shellsmash: ["8L66"],
			shitpost: ["8T"],
			sleeptalk: ["8T"],
			sludgebomb: ["8M"],
			sludgewave: ["8T"],
			snatch: ["8M"],
			softboiled: ["8T"],
			spikes: ["8L15"],
			stunspore: ["8L50"],
			stealthrock: ["8L44", "8T"],
			steelwing: ["8M"],
			stickyweb: ["8L1"],
			stoneedge: ["8T"],
			substitute: ["8L40", "8T"],
			suckerpunch: ["8E"],
			sunnyday: ["8M"],
			swordsdance: ["8T"],
			tailwind: ["8T"],
			taunt: ["8L1", "8M"],
			teleport: ["8T"],
			thief: ["8M"],
			thunderbolt: ["8M"],
			thunderwave: ["8T"],
			torment: ["8M"],
			toxic: ["8L22", "8M"],
			toxicspikes: ["8L15"],
			trick: ["8T"],
			uturn: ["8L36", "8T"],
			vacuumwave: ["8T"],
			venoshock: ["8L22"],
			voltswitch: ["8T"],
			willowisp: ["8T"],
		},
	},
	smogars: {
		learnset: {
			acid: ["8L4"],
			acrobatics: ["8T"],
			aerialace: ["8M"],
			attract: ["8M"],
			bodyslam: ["8T"],
			bounce: ["8T"],
			bravebird: ["8E", "8L47"],
			bulkup: ["8M"],
			bulletpunch: ["8E", "8L10"],
			calmmind: ["8M"],
			closecombat: ["8E"],
			defog: ["8E", "8L30", "8T"],
			doubleedge: ["8T"],
			dracometeor: ["8E"],
			dragontail: ["8T"],
			drillpeck: ["8L26"],
			earthpower: ["8T"],
			earthquake: ["8L63", "8M"],
			explosion: ["8T"],
			facade: ["8M"],
			fireblast: ["8M"],
			flamethrower: ["8M"],
			fly: ["8M"],
			focusblast: ["8T"],
			foulplay: ["8E", "8T"],
			frustration: ["8M"],
			gigadrain: ["8M"],
			glare: ["8L1"],
			gunkshot: ["8L70", "8T"],
			haze: ["8T"],
			heatwave: ["8T"],
			hiddenpower: ["8L12", "8M"],
			honeclaws: ["8T"],
			icebeam: ["8M"],
			icywind: ["8T"],
			knockoff: ["8T"],
			lightscreen: ["8M"],
			magiccoat: ["8T"],
			meme: ["8T"],
			metronome: ["8T"],
			outrage: ["8L56"],
			painsplit: ["8T"],
			payday: ["8T"],
			peck: ["8L1"],
			poisonjab: ["8L33"],
			present: ["8T"],
			protect: ["8M"],
			psyshock: ["8T"],
			pursuit: ["8L19"],
			raindance: ["8M"],
			rapidspin: ["8L7"],
			reflect: ["8M"],
			rest: ["8M"],
			retaliate: ["8T"],
			return: ["8M"],
			roost: ["8L60", "8T"],
			scald: ["8L53", "8T"],
			secretpower: ["8M"],
			shellsmash: ["8E", "8L66"],
			shitpost: ["8T"],
			sleeptalk: ["8T"],
			sludgebomb: ["8M"],
			sludgewave: ["8T"],
			snatch: ["8M"],
			spikes: ["8L15"],
			chilipowder: ["8L50"],
			stealthrock: ["8E", "8L44", "8T"],
			steelwing: ["8M"],
			stickytongue: ["8L1"],
			stoneedge: ["8T"],
			substitute: ["8L40", "8T"],
			sunnyday: ["8M"],
			swordsdance: ["8T"],
			tailwind: ["8T"],
			taunt: ["8L1", "8M"],
			teleport: ["8T"],
			thief: ["8M"],
			thunderwave: ["8T"],
			thunderbolt: ["8M"],
			torment: ["8M"],
			toxic: ["8L22", "8M"],
			toxicspikes: ["8L15"],
			trick: ["8T"],
			uturn: ["8L36", "8T"],
			vacuumwave: ["8T"],
			venoshock: ["8L22"],
			voltswitch: ["8T"],
			willowisp: ["8T"],
			suckerpunch: ["8E"],
			healblock: ["8E"],
			banefulbunker: ["8L1"],
			clangingscales: ["8L1"],
			dragonclaw: ["8L1"],
			dragondance: ["8L1"],
			dragonpulse: ["8L1"],
			dragonhammer: ["8L1"],
			flareblitz: ["8L1"],
			breakingswipe: ['8L1'],
			corrosivegas: ['8L1'],
			scaleshot: ['8L1'],
		},
	},
	waterweedle: { // didnt bother to adjust levels on this one. do it later prob :)
		learnset: {
			watergun: ["8L1"],
			watersport: ["8L1"],
			waterfall: ["8L1"],
			recover: ["8L1"],
			overheat: ["8L1"],
			conversion: ["8L1"],
			conversion2: ["8L1"],
			muddywater: ["8L1"],
			scald: ["8L1"],
			dive: ["8L1"],
			waterspout: ["8L1"],
			wavecrash: ["8L1"],
			jetpunch: ["8L1"],
			cope: ["8L1"],
			waterpulse: ["8L1"],
		},
	},
};
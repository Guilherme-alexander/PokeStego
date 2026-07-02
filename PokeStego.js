/**
 * PokeStego - Pokémon Text Steganography Engine
 * 
 * Uma versão moderna e melhorada do Markov Text Steganography,
 * especializada no universo Pokémon com mais de 900 Pokémon,
 * itens, ataques e personagens.
 * 
 * @version 2.1.0
 * @author Guilherme-alexander
 */

class PokeStego {
  static CONFIG = {
    delimiter: '§|§',
    punctuation: ['!', '!', '?', '...', '⚡', '🔥', '💧', '🌿'],
    nGramOrder: 2, // Reduzido para 2 para maior compatibilidade
    maxBitsPerWord: 16,
    minCorpusSize: 50
  };


  /**
   * Banco de dados Pokémon integrado
   */
  static POKEDEX = {
    // Geração 1-9 (mais de 900 Pokémon)
    pokemon: [
      // Kanto (1-151)
      'Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 
      'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie',
      'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill',
      'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate',
      'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu',
      'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran', 'Nidorina',
      'Nidoqueen', 'Nidoran', 'Nidorino', 'Nidoking', 'Clefairy',
      'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff',
      'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume',
      'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett',
      'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck',
      'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag',
      'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam',
      'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell',
      'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler',
      'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro',
      'Magnemite', 'Magneton', 'Farfetch\'d', 'Doduo', 'Dodrio',
      'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder',
      'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix',
      'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb',
      'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak',
      'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing',
      'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan',
      'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu',
      'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz',
      'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados',
      'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon',
      'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto',
      'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos',
      'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo',
      'Mew',
      
      // Johto (152-251)
      'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava',
      'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr', 'Sentret',
      'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian',
      'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn',
      'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic',
      'Natu', 'Xatu', 'Mareep', 'Flaaffy', 'Ampharos',
      'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed',
      'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern',
      'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon',
      'Umbreon', 'Murkrow', 'Slowking', 'Misdreavus', 'Unown',
      'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce',
      'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish',
      'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa',
      'Ursaring', 'Slugma', 'Magcargo', 'Swinub', 'Piloswine',
      'Corsola', 'Remoraid', 'Octillery', 'Delibird', 'Mantine',
      'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy',
      'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue',
      'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank',
      'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar',
      'Pupitar', 'Tyranitar', 'Lugia', 'Ho-Oh', 'Celebi',
      
      // Hoenn (252-386)
      'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken',
      'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert', 'Poochyena',
      'Mightyena', 'Zigzagoon', 'Linoone', 'Wurmple', 'Silcoon',
      'Beautifly', 'Cascoon', 'Dustox', 'Lotad', 'Lombre',
      'Ludicolo', 'Seedot', 'Nuzleaf', 'Shiftry', 'Taillow',
      'Swellow', 'Wingull', 'Pelipper', 'Ralts', 'Kirlia',
      'Gardevoir', 'Surskit', 'Masquerain', 'Shroomish', 'Breloom',
      'Slakoth', 'Vigoroth', 'Slaking', 'Nincada', 'Ninjask',
      'Shedinja', 'Whismur', 'Loudred', 'Exploud', 'Makuhita',
      'Hariyama', 'Azurill', 'Nosepass', 'Skitty', 'Delcatty',
      'Sableye', 'Mawile', 'Aron', 'Lairon', 'Aggron',
      'Meditite', 'Medicham', 'Electrike', 'Manectric', 'Plusle',
      'Minun', 'Volbeat', 'Illumise', 'Roselia', 'Gulpin',
      'Swalot', 'Carvanha', 'Sharpedo', 'Wailmer', 'Wailord',
      'Numel', 'Camerupt', 'Torkoal', 'Spoink', 'Grumpig',
      'Spinda', 'Trapinch', 'Vibrava', 'Flygon', 'Cacnea',
      'Cacturne', 'Swablu', 'Altaria', 'Zangoose', 'Seviper',
      'Lunatone', 'Solrock', 'Barboach', 'Whiscash', 'Corphish',
      'Crawdaunt', 'Baltoy', 'Claydol', 'Lileep', 'Cradily',
      'Anorith', 'Armaldo', 'Feebas', 'Milotic', 'Castform',
      'Kecleon', 'Shuppet', 'Banette', 'Duskull', 'Dusclops',
      'Tropius', 'Chimecho', 'Absol', 'Wynaut', 'Snorunt',
      'Glalie', 'Spheal', 'Sealeo', 'Walrein', 'Clamperl',
      'Huntail', 'Gorebyss', 'Relicanth', 'Luvdisc', 'Bagon',
      'Shelgon', 'Salamence', 'Beldum', 'Metang', 'Metagross',
      'Regirock', 'Regice', 'Registeel', 'Latias', 'Latios',
      'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys',
      
      // Sinnoh (387-493)
      'Turtwig', 'Grotle', 'Torterra', 'Chimchar', 'Monferno',
      'Infernape', 'Piplup', 'Prinplup', 'Empoleon', 'Starly',
      'Staravia', 'Staraptor', 'Bidoof', 'Bibarel', 'Kricketot',
      'Kricketune', 'Shinx', 'Luxio', 'Luxray', 'Budew',
      'Roserade', 'Cranidos', 'Rampardos', 'Shieldon', 'Bastiodon',
      'Burmy', 'Wormadam', 'Mothim', 'Combee', 'Vespiquen',
      'Pachirisu', 'Buizel', 'Floatzel', 'Cherubi', 'Cherrim',
      'Shellos', 'Gastrodon', 'Ambipom', 'Drifloon', 'Drifblim',
      'Buneary', 'Lopunny', 'Mismagius', 'Honchkrow', 'Glameow',
      'Purugly', 'Chingling', 'Stunky', 'Skuntank', 'Bronzor',
      'Bronzong', 'Bonsly', 'Mime Jr.', 'Happiny', 'Chatot',
      'Spiritomb', 'Gible', 'Gabite', 'Garchomp', 'Munchlax',
      'Riolu', 'Lucario', 'Hippopotas', 'Hippowdon', 'Skorupi',
      'Drapion', 'Croagunk', 'Toxicroak', 'Carnivine', 'Finneon',
      'Lumineon', 'Mantyke', 'Snover', 'Abomasnow', 'Weavile',
      'Magnezone', 'Lickilicky', 'Rhyperior', 'Tangrowth', 'Electivire',
      'Magmortar', 'Togekiss', 'Yanmega', 'Leafeon', 'Glaceon',
      'Gliscor', 'Mamoswine', 'Porygon-Z', 'Gallade', 'Probopass',
      'Dusknoir', 'Froslass', 'Rotom', 'Uxie', 'Mesprit',
      'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas',
      'Giratina', 'Cresselia', 'Phione', 'Manaphy', 'Darkrai',
      'Shaymin', 'Arceus',
      
      // Unova (494-649)
      'Victini', 'Snivy', 'Servine', 'Serperior', 'Tepig',
      'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott',
      'Patrat', 'Watchog', 'Lillipup', 'Herdier', 'Stoutland',
      'Purrloin', 'Liepard', 'Pansage', 'Simisage', 'Pansear',
      'Simisear', 'Panpour', 'Simipour', 'Munna', 'Musharna',
      'Pidove', 'Tranquill', 'Unfezant', 'Blitzle', 'Zebstrika',
      'Roggenrola', 'Boldore', 'Gigalith', 'Woobat', 'Swoobat',
      'Drilbur', 'Excadrill', 'Audino', 'Timburr', 'Gurdurr',
      'Conkeldurr', 'Sewaddle', 'Swadloon', 'Leavanny', 'Venipede',
      'Whirlipede', 'Scolipede', 'Cottonee', 'Whimsicott', 'Petilil',
      'Lilligant', 'Basculin', 'Sandile', 'Krokorok', 'Krookodile',
      'Darumaka', 'Darmanitan', 'Maractus', 'Dwebble', 'Crustle',
      'Scraggy', 'Scrafty', 'Sigilyph', 'Yamask', 'Cofagrigus',
      'Tirtouga', 'Carracosta', 'Archen', 'Archeops', 'Trubbish',
      'Garbodor', 'Zorua', 'Zoroark', 'Minccino', 'Cinccino',
      'Gothita', 'Gothorita', 'Gothitelle', 'Solosis', 'Duosion',
      'Reuniclus', 'Ducklett', 'Swanna', 'Vanillite', 'Vanillish',
      'Vanilluxe', 'Deerling', 'Sawsbuck', 'Emolga', 'Karrablast',
      'Escavalier', 'Foongus', 'Amoonguss', 'Frillish', 'Jellicent',
      'Alomomola', 'Joltik', 'Galvantula', 'Ferroseed', 'Ferrothorn',
      'Tynamo', 'Eelektrik', 'Eelektross', 'Elgyem', 'Beheeyem',
      'Litwick', 'Lampent', 'Chandelure', 'Axew', 'Fraxure',
      'Haxorus', 'Cubchoo', 'Beartic', 'Cryogonal', 'Shelmet',
      'Accelgor', 'Stunfisk', 'Mienfoo', 'Mienshao', 'Druddigon',
      'Golett', 'Golurk', 'Pawniard', 'Bisharp', 'Bouffalant',
      'Rufflet', 'Braviary', 'Vullaby', 'Mandibuzz', 'Heatmor',
      'Durant', 'Deino', 'Zweilous', 'Hydreigon', 'Larvesta',
      'Volcarona', 'Cobalion', 'Terrakion', 'Virizion', 'Tornadus',
      'Thundurus', 'Landorus', 'Kyurem', 'Keldeo', 'Meloetta',
      'Genesect',
      
      // Kalos (650-721)
      'Chespin', 'Quilladin', 'Chesnaught', 'Fennekin', 'Braixen',
      'Delphox', 'Froakie', 'Frogadier', 'Greninja', 'Bunnelby',
      'Diggersby', 'Fletchling', 'Fletchinder', 'Talonflame', 'Scatterbug',
      'Spewpa', 'Vivillon', 'Litleo', 'Pyroar', 'Flabébé',
      'Floette', 'Florges', 'Skiddo', 'Gogoat', 'Pancham',
      'Pangoro', 'Furfrou', 'Espurr', 'Meowstic', 'Honedge',
      'Doublade', 'Aegislash', 'Spritzee', 'Aromatisse', 'Swirlix',
      'Slurpuff', 'Inkay', 'Malamar', 'Binacle', 'Barbaracle',
      'Skrelp', 'Dragalge', 'Clauncher', 'Clawitzer', 'Helioptile',
      'Heliolisk', 'Tyrunt', 'Tyrantrum', 'Amaura', 'Aurorus',
      'Sylveon', 'Hawlucha', 'Dedenne', 'Carbink', 'Goomy',
      'Sliggoo', 'Goodra', 'Klefki', 'Phantump', 'Trevenant',
      'Pumpkaboo', 'Gourgeist', 'Bergmite', 'Avalugg', 'Noibat',
      'Noivern', 'Xerneas', 'Yveltal', 'Zygarde', 'Diancie',
      'Hoopa', 'Volcanion',
      
      // Alola (722-809)
      'Rowlet', 'Dartrix', 'Decidueye', 'Litten', 'Torracat',
      'Incineroar', 'Popplio', 'Brionne', 'Primarina', 'Pikipek',
      'Trumbeak', 'Toucannon', 'Yungoos', 'Gumshoos', 'Grubbin',
      'Charjabug', 'Vikavolt', 'Crabrawler', 'Crabominable', 'Oricorio',
      'Cutiefly', 'Ribombee', 'Rockruff', 'Lycanroc', 'Wishiwashi',
      'Mareanie', 'Toxapex', 'Mudbray', 'Mudsdale', 'Dewpider',
      'Araquanid', 'Fomantis', 'Lurantis', 'Morelull', 'Shiinotic',
      'Salandit', 'Salazzle', 'Stufful', 'Bewear', 'Bounsweet',
      'Steenee', 'Tsareena', 'Comfey', 'Oranguru', 'Passimian',
      'Wimpod', 'Golisopod', 'Sandygast', 'Palossand', 'Pyukumuku',
      'Type: Null', 'Silvally', 'Minior', 'Komala', 'Turtonator',
      'Togedemaru', 'Mimikyu', 'Bruxish', 'Drampa', 'Dhelmise',
      'Jangmo-o', 'Hakamo-o', 'Kommo-o', 'Tapu Koko', 'Tapu Lele',
      'Tapu Bulu', 'Tapu Fini', 'Cosmog', 'Cosmoem', 'Solgaleo',
      'Lunala', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree',
      'Celesteela', 'Kartana', 'Guzzlord', 'Necrozma', 'Magearna',
      'Marshadow', 'Poipole', 'Naganadel', 'Stakataka', 'Blacephalon',
      'Zeraora',
      
      // Galar (810-898)
      'Grookey', 'Thwackey', 'Rillaboom', 'Scorbunny', 'Raboot',
      'Cinderace', 'Sobble', 'Drizzile', 'Inteleon', 'Skwovet',
      'Greedent', 'Rookidee', 'Corvisquire', 'Corviknight', 'Blipbug',
      'Dottler', 'Orbeetle', 'Nickit', 'Thievul', 'Gossifleur',
      'Eldegoss', 'Wooloo', 'Dubwool', 'Chewtle', 'Drednaw',
      'Yamper', 'Boltund', 'Rolycoly', 'Carkol', 'Coalossal',
      'Applin', 'Flapple', 'Appletun', 'Silicobra', 'Sandaconda',
      'Cramorant', 'Arrokuda', 'Barraskewda', 'Toxel', 'Toxtricity',
      'Sizzlipede', 'Centiskorch', 'Clobbopus', 'Grapploct', 'Sinistea',
      'Polteageist', 'Hatenna', 'Hattrem', 'Hatterene', 'Impidimp',
      'Morgrem', 'Grimmsnarl', 'Obstagoon', 'Perrserker', 'Cursola',
      'Sirfetch\'d', 'Mr. Rime', 'Runerigus', 'Milcery', 'Alcremie',
      'Falinks', 'Pincurchin', 'Snom', 'Frosmoth', 'Stonjourner',
      'Eiscue', 'Indeedee', 'Morpeko', 'Cufant', 'Copperajah',
      'Dracozolt', 'Arctozolt', 'Dracovish', 'Arctovish', 'Duraludon',
      'Dreepy', 'Drakloak', 'Dragapult', 'Zacian', 'Zamazenta',
      'Eternatus', 'Kubfu', 'Urshifu', 'Zarude', 'Regieleki',
      'Regidrago', 'Glastrier', 'Spectrier', 'Calyrex',
      
      // Hisui (899-905)
      'Wyrdeer', 'Kleavor', 'Ursaluna', 'Basculegion', 'Sneasler',
      'Overqwil', 'Enamorus',
      
      // Paldea (906-1025)
      'Sprigatito', 'Floragato', 'Meowscarada', 'Fuecoco', 'Crocalor',
      'Skeledirge', 'Quaxly', 'Quaxwell', 'Quaquaval', 'Lechonk',
      'Oinkologne', 'Tarountula', 'Spidops', 'Nymble', 'Lokix',
      'Rellor', 'Rabsca', 'Flittle', 'Espathra', 'Tinkatink',
      'Tinkatuff', 'Tinkaton', 'Wiglett', 'Wugtrio', 'Bombirdier',
      'Finizen', 'Palafin', 'Varoom', 'Revavroom', 'Cyclizar',
      'Orthworm', 'Glimmet', 'Glimmora', 'Greavard', 'Houndstone',
      'Flamigo', 'Cetoddle', 'Cetitan', 'Veluza', 'Dondozo',
      'Tatsugiri', 'Great Tusk', 'Scream Tail', 'Brute Bonnet',
      'Flutter Mane', 'Slither Wing', 'Sandy Shocks', 'Iron Treads',
      'Iron Moth', 'Iron Hands', 'Iron Jugulis', 'Iron Thorns',
      'Frigibax', 'Arctibax', 'Baxcalibur', 'Gimmighoul', 'Gholdengo',
      'Wo-Chien', 'Chien-Pao', 'Ting-Lu', 'Chi-Yu', 'Roaring Moon',
      'Iron Valiant', 'Koraidon', 'Miraidon', 'Walking Wake',
      'Iron Leaves', 'Dipplin', 'Poltchageist', 'Sinistcha', 'Okidogi',
      'Munkidori', 'Fezandipiti', 'Ogerpon', 'Archaludon', 'Hydrapple',
      'Gouging Fire', 'Raging Bolt', 'Iron Boulder', 'Iron Crown',
      'Terapagos', 'Pecharunt'
    ],

    // Itens famosos
    items: [
      'Master Ball', 'Ultra Ball', 'Great Ball', 'Poke Ball', 'Safari Ball',
      'Net Ball', 'Dive Ball', 'Nest Ball', 'Repeat Ball', 'Timer Ball',
      'Luxury Ball', 'Premier Ball', 'Dusk Ball', 'Heal Ball', 'Quick Ball',
      'Cherish Ball', 'Potion', 'Super Potion', 'Hyper Potion', 'Max Potion',
      'Full Restore', 'Revive', 'Max Revive', 'Ether', 'Max Ether',
      'Elixir', 'Max Elixir', 'Rare Candy', 'PP Up', 'PP Max',
      'HP Up', 'Protein', 'Iron', 'Carbos', 'Calcium',
      'Zinc', 'Experience Candy', 'Rare Bone', 'Nugget', 'Big Nugget',
      'Pearl', 'Big Pearl', 'Star Piece', 'Comet Shard', 'Relic Copper',
      'Relic Silver', 'Relic Gold', 'Relic Vase', 'Relic Band', 'Relic Statue',
      'Relic Crown', 'Fire Stone', 'Water Stone', 'Thunder Stone', 'Leaf Stone',
      'Moon Stone', 'Sun Stone', 'Shiny Stone', 'Dusk Stone', 'Dawn Stone',
      'Ice Stone', 'Everstone', 'Oval Stone', 'Mega Stone', 'Z-Crystal',
      'Dynamax Band', 'Rusty Sword', 'Rusty Shield', 'Adamant Orb',
      'Lustrous Orb', 'Griseous Orb', 'Soul Dew', 'Jade Orb',
      'Berry', 'Oran Berry', 'Sitrus Berry', 'Lum Berry', 'Leppa Berry',
      'Wiki Berry', 'Mago Berry', 'Aguav Berry', 'Iapapa Berry', 'Figy Berry',
      'Pecha Berry', 'Cheri Berry', 'Chesto Berry', 'Rawst Berry', 'Aspear Berry',
      'Persim Berry', 'Razz Berry', 'Nanab Berry', 'Pinap Berry', 'Golden Razz'
    ],

    // Ataques famosos
    moves: [
      'Tackle', 'Growl', 'Tail Whip', 'Scratch', 'Ember',
      'Water Gun', 'Thunder Shock', 'Vine Whip', 'Gust', 'Bite',
      'Quick Attack', 'Pound', 'Flamethrower', 'Hydro Pump', 'Thunderbolt',
      'Solar Beam', 'Ice Beam', 'Blizzard', 'Fire Blast', 'Earthquake',
      'Psychic', 'Shadow Ball', 'Dragon Claw', 'Iron Tail', 'Aerial Ace',
      'Brick Break', 'Bulk Up', 'Calm Mind', 'Roar', 'Protect',
      'Rest', 'Sleep Talk', 'Substitute', 'Double Team', 'Toxic',
      'Leech Seed', 'Thunder Wave', 'Will-O-Wisp', 'Hypnosis', 'Confuse Ray',
      'Super Effective', 'Critical Hit', 'Dragon Dance', 'Swords Dance',
      'Agility', 'Recover', 'Synthesis', 'Morning Sun', 'Moonlight',
      'Hyper Beam', 'Giga Impact', 'Explosion', 'Self-Destruct',
      'Frenzy Plant', 'Blast Burn', 'Hydro Cannon', 'Draco Meteor',
      'Leaf Storm', 'Overheat', 'Psycho Boost', 'Shadow Force',
      'Lunar Dance', 'Healing Wish', 'Memento', 'Parting Shot',
      'Volt Switch', 'U-turn', 'Flip Turn', 'Chilly Reception'
    ],

    // Treinadores famosos
    trainers: [
      'Ash', 'Misty', 'Brock', 'Gary', 'Professor Oak',
      'Professor Elm', 'Professor Birch', 'Professor Rowan',
      'Professor Juniper', 'Professor Sycamore', 'Professor Kukui',
      'Professor Magnolia', 'Cynthia', 'Steven', 'Lance',
      'Diantha', 'Leon', 'Iris', 'Alder', 'Blue',
      'Red', 'Green', 'Yellow', 'Silver', 'Gold',
      'Crystal', 'Ruby', 'Sapphire', 'Emerald', 'Diamond',
      'Pearl', 'Platinum', 'Black', 'White', 'N',
      'Ghetsis', 'Lysandre', 'Giovanni', 'Archer', 'Ariana',
      'Maxie', 'Archie', 'Lusamine', 'Guzma', 'Team Rocket',
      'Team Magma', 'Team Aqua', 'Team Galactic', 'Team Plasma',
      'Team Flare', 'Team Skull', 'Aether Foundation', 'Macro Cosmos',
      'Bede', 'Marnie', 'Hop', 'Gloria', 'Victor',
      'Penny', 'Arven', 'Nemona', 'Geeta', 'Sada',
      'Turo', 'Cassiopeia', 'Clavell', 'Jacq', 'Miriam'
    ]
  };


  constructor(config = {}) {
    this.config = {
      ...PokeStego.CONFIG,
      ...config
    };

    this.state = {
      model: null,
      corpus: [],
      isBusy: false,
      progress: 0,
      stats: null
    };

    // Inicializar com corpus robusto
    this.initCorpus();
  }

  /**
   * Inicializa o corpus com dados Pokémon - VERSÃO MELHORADA
   */
  initCorpus() {
    const corpusData = this.generateExtendedCorpus();
    this.buildModel(corpusData);
    return this;
  }

  /**
   * Gera corpus estendido com muitas variações
   */
  generateExtendedCorpus() {
    const phrases = [];
    const { pokemon, items, moves, trainers } = PokeStego.POKEDEX;
    const punctuation = ['.', '!', '?', '...', '!', '.'];

    // 1. Frases básicas com Pokémon
    for (let i = 0; i < pokemon.length; i++) {
      const p = pokemon[i];
      const t = trainers[i % trainers.length];
      const m = moves[i % moves.length];
      const it = items[i % items.length];
      const punct = punctuation[i % punctuation.length];

      phrases.push(
        `${p} é um Pokémon incrível${punct}`,
        `Eu amo o ${p}${punct}`,
        `${t} capturou um ${p}${punct}`,
        `${p} usou ${m}${punct}`,
        `${t} usou ${p} com ${m}${punct}`,
        `O ${p} selvagem apareceu${punct}`,
        `${p} encontrou ${it}${punct}`,
        `${t} deu ${it} para ${p}${punct}`,
        `${p} evoluiu com ${it}${punct}`,
        `${t} batalhou contra ${p}${punct}`
      );
    }

    // 2. Frases com itens
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const p = pokemon[i % pokemon.length];
      const punct = punctuation[(i + 3) % punctuation.length];
      
      phrases.push(
        `${it} é muito útil${punct}`,
        `Use ${it} para curar${punct}`,
        `${it} pode evoluir ${p}${punct}`,
        `Onde encontrar ${it}${punct}`
      );
    }

    // 3. Frases com treinadores
    for (let i = 0; i < trainers.length; i++) {
      const t = trainers[i];
      const p = pokemon[(i * 3) % pokemon.length];
      const m = moves[(i * 2) % moves.length];
      const punct = punctuation[(i + 5) % punctuation.length];
      
      phrases.push(
        `${t} é um grande treinador${punct}`,
        `${t} e ${p} são uma dupla${punct}`,
        `${t} venceu usando ${m}${punct}`,
        `${t} quer ser o mestre${punct}`
      );
    }

    // 4. Frases combinadas
    for (let i = 0; i < 100; i++) {
      const p1 = pokemon[Math.floor(Math.random() * pokemon.length)];
      const p2 = pokemon[Math.floor(Math.random() * pokemon.length)];
      const t = trainers[Math.floor(Math.random() * trainers.length)];
      const m = moves[Math.floor(Math.random() * moves.length)];
      const it = items[Math.floor(Math.random() * items.length)];
      const punct = punctuation[Math.floor(Math.random() * punctuation.length)];
      
      phrases.push(
        `${p1} batalhou contra ${p2}${punct}`,
        `${t} usou ${p1} e venceu${punct}`,
        `${p1} aprendeu ${m}${punct}`,
        `${it} foi usado em ${p1}${punct}`,
        `${p1} e ${p2} são amigos${punct}`,
        `${t} treina ${p1} e ${p2}${punct}`
      );
    }

    // 5. Frases longas para melhor contexto
    const longPhrases = [
      `Ash e Pikachu viajam pelo mundo em busca de aventuras.`,
      `Misty é uma líder de ginásio especializada em Pokémon de água.`,
      `Brock é um criador de Pokémon que adora cozinhar.`,
      `Professor Oak pesquisa Pokémon há muitos anos.`,
      `Cynthia é considerada uma das treinadoras mais fortes.`,
      `O Charizard de Ash é extremamente poderoso.`,
      `Pikachu usa Thunderbolt para vencer batalhas.`,
      `Bulbasaur aprendeu Solar Beam com muito treino.`,
      `Squirtle usa Water Gun com grande precisão.`,
      `A Master Ball captura qualquer Pokémon selvagem.`,
      `O centro Pokémon cura todos os Pokémon feridos.`,
      `Treinadores viajam por regiões em busca de badges.`
    ];
    
    phrases.push(...longPhrases);

    return phrases;
  }

  /**
   * Constrói o modelo n-gram com verificação de tamanho
   */
  buildModel(corpusData) {
    const model = new Map();
    const delimiter = this.config.delimiter;
    const order = this.config.nGramOrder;

    // Garantir que o corpus é um array
    if (!Array.isArray(corpusData)) {
      corpusData = [corpusData];
    }

    // Filtrar textos vazios
    corpusData = corpusData.filter(text => text && text.trim().length > 0);

    if (corpusData.length === 0) {
      // Corpus vazio - usar fallback
      corpusData = this.generateExtendedCorpus();
    }

    let totalNGrams = 0;

    for (const text of corpusData) {
      const words = this.tokenize(text);
      // Exige pelo menos `order` palavras reais, senão o n-grama sintético
      // dos primeiros passos ficaria só com delimitadores (linha degenerada).
      if (words.length < order) continue;

      // IMPORTANTE: apenas UM delimitador de cada lado aqui — não `order`
      // cópias. A versão anterior colocava `order` delimitadores em cada
      // ponta e depois deslizava uma janela simples por cima disso, o que
      // fazia a posição i=0 mapear o contexto [delim,delim,...] para o
      // PRÓPRIO delimitador de padding (em vez do primeiro token real).
      // Resultado: todo n-grama inicial aprendia uma probabilidade artificial
      // e alta de "terminar a frase imediatamente", e como frases vazias não
      // deixam nenhuma marca de pontuação visível no texto gerado
      // (ver wordsToText), essa informação não podia ser recuperada na
      // decodificação — corrompendo o resultado de forma intermitente.
      const line = [delimiter, ...words, delimiter];

      for (let j = 0; j < line.length - 1; j++) {
        let ngramWords;
        if (j < order) {
          // Sintetiza o prefixo com (order - j) delimitadores "virtuais"
          // seguidos das palavras reais já vistas na linha.
          const prefix = Array(order - j).fill(delimiter);
          ngramWords = [...prefix, ...line.slice(1)].slice(0, order);
        } else {
          ngramWords = line.slice(j + 1 - order, j + 1);
        }

        const ngram = ngramWords.map(w => w.toLowerCase()).join('|');
        const nextWord = line[j + 1];

        if (model.has(ngram)) {
          model.get(ngram).push(nextWord);
        } else {
          model.set(ngram, [nextWord]);
          totalNGrams++;
        }
      }
    }

    // Se o modelo está vazio, criar um modelo básico
    if (model.size === 0) {
      console.warn('Modelo vazio, criando modelo de fallback...');
      const fallback = ['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle'];
      for (const word of fallback) {
        const key = `${delimiter}|${delimiter}`;
        if (model.has(key)) {
          model.get(key).push(word);
        } else {
          model.set(key, [word]);
        }
      }
    }

    // Converter para probabilidades
    for (const [ngram, words] of model) {
      model.set(ngram, this.computeProbabilities(words));
    }

    this.state.model = model;
    this.state.corpus = corpusData;
    this.state.stats = this.calculateStats(model);
    
    console.log(`✅ Modelo construído: ${model.size} n-grams`);

    return model;
  }

  /**
   * Tokeniza texto em palavras - mais robusto
   */
  tokenize(text) {
    // Limpar texto
    text = text.replace(/[^\w\s.!?',-]/g, ' ');
    
    // Dividir em palavras
    const words = text.split(/[\s,.!?;:]+/).filter(w => w.length > 0);
    
    // Se não houver palavras, tentar extrair com regex
    if (words.length === 0) {
      const matches = text.match(/\b\w+\b/g);
      return matches || [];
    }
    
    return words;
  }

  /**
   * Calcula probabilidades
   */
  computeProbabilities(words) {
    const freq = new Map();
    const total = words.length;

    for (const word of words) {
      const key = word.toLowerCase();
      freq.set(key, (freq.get(key) || 0) + 1);
    }

    const result = [];
    for (const [word, count] of freq) {
      // Encontrar a forma original
      const original = words.find(w => w.toLowerCase() === word) || word;
      result.push({
        word: original,
        probability: count / total,
        count
      });
    }

    return result.sort((a, b) => b.probability - a.probability);
  }

  /**
   * Calcula estatísticas do modelo
   */
  calculateStats(model) {
    let totalWords = 0;
    let totalNGrams = model.size;

    for (const [, words] of model) {
      totalWords += words.length;
    }

    return {
      totalNGrams,
      totalWords,
      averageOutcomes: totalWords / totalNGrams,
      corpusSize: this.state.corpus.reduce((sum, text) => sum + text.length, 0)
    };
  }

  /**
   * Obtém distribuição para um n-gram com fallback
   */
  getDistribution(ngram) {
    if (!Array.isArray(ngram)) {
      ngram = [ngram];
    }
    
    let key = ngram.map(w => w.toLowerCase()).join('|');
    let distribution = this.state.model.get(key);
    
    // Fallback: tentar com ordem menor
    if (!distribution || distribution.length === 0) {
      // Tentar com n-1 gram
      if (ngram.length > 1) {
        const smaller = ngram.slice(1);
        const smallerKey = smaller.map(w => w.toLowerCase()).join('|');
        distribution = this.state.model.get(smallerKey);
      }
      
      // Último recurso: usar delimitador
      if (!distribution || distribution.length === 0) {
        const delimKey = Array(this.config.nGramOrder).fill(this.config.delimiter).join('|');
        distribution = this.state.model.get(delimKey);
      }
    }
    
    return distribution || [];
  }

  /**
   * Obtém palavra aleatória da distribuição
   */
  getRandomWord(ngram) {
    const distribution = this.getDistribution(ngram);
    if (!distribution || distribution.length === 0) {
      // Fallback: usar um Pokémon aleatório
      const pokemon = PokeStego.POKEDEX.pokemon;
      return pokemon[Math.floor(Math.random() * pokemon.length)];
    }

    const random = Math.random();
    let cumulative = 0;

    for (const entry of distribution) {
      cumulative += entry.probability;
      if (random <= cumulative) {
        return entry.word;
      }
    }

    return distribution[distribution.length - 1].word;
  }

  /**
   * ENCODE: Codifica mensagem usando esteganografia
   */
  encode(message) {
    if (!message || message.length === 0) {
      throw new Error('Mensagem vazia!');
    }

    // Verificar se o modelo está pronto
    if (!this.state.model || this.state.model.size === 0) {
      this.buildModel(this.generateExtendedCorpus());
    }

    this.state.isBusy = true;
    this.state.progress = 0;

    try {
      // Converter mensagem para bytes
      const byteArray = this.stringToBytes(message);
      const bitField = new PokeStego.BitField(byteArray);

      // Prefixo de tamanho (4 bytes)
      const lengthBytes = this.intToBytes(byteArray.length);
      const lengthBitField = new PokeStego.BitField(lengthBytes);

      // Começar com delimitador
      const startWord = Array(this.config.nGramOrder).fill(this.config.delimiter);

      // Codificar tamanho
      const { words: lengthWords, nextStartWord } =
        this.encodeBitsToWords(lengthBitField, startWord);

      // Codificar mensagem (continuando do contexto deixado pelo tamanho,
      // e não do delimitador inicial — esse era um dos bugs da versão anterior)
      const { words: dataWords, nextStartWord: finalStartWord } =
        this.encodeBitsToWords(bitField, nextStartWord);

      // Combinar e finalizar
      let wordList = [...lengthWords, ...dataWords];

      // Garantir que termina com pontuação
      if (wordList[wordList.length - 1] !== this.config.delimiter) {
        const extraWords = this.finishSentence(
          wordList[wordList.length - 1],
          finalStartWord
        );
        wordList = [...wordList, ...extraWords];
      }

      const result = this.wordsToText(wordList);
      this.state.progress = 1;
      return result;

    } catch (error) {
      console.error('Erro na codificação:', error);
      throw error;
    } finally {
      this.state.isBusy = false;
    }
  }

  /**
   * DECODE: Decodifica mensagem do texto
   */
  decode(text) {
    if (!text || text.length === 0) {
      throw new Error('Texto vazio!');
    }

    if (!this.state.model || this.state.model.size === 0) {
      throw new Error('Modelo não inicializado!');
    }

    this.state.isBusy = true;
    this.state.progress = 0;

    try {
      const wordList = this.textToWords(text);
      const startWord = Array(this.config.nGramOrder).fill(this.config.delimiter);

      // Decodificar tamanho (32 bits = 4 bytes)
      const { bitField: lengthBitField, wordsConsumed, nextContext } =
        this.decodeWordsToBits(wordList, [...startWord], 32);

      const lengthBytes = lengthBitField.getAllBytes();
      const dataLength = this.bytesToInt(lengthBytes);

      // Decodificar dados, continuando do ponto exato (em palavras e em
      // contexto) onde a decodificação do tamanho parou — a versão anterior
      // usava um índice fixo (4*8+1) e reiniciava o contexto do zero, o que
      // só funcionava por coincidência quando cada palavra carregava
      // exatamente 1 bit
      const remainingWords = wordList.slice(wordsConsumed);
      const { bitField: dataBitField } =
        this.decodeWordsToBits(remainingWords, nextContext, dataLength * 8);

      const dataBytes = dataBitField.getAllBytes();
      const result = this.bytesToString(dataBytes);

      this.state.progress = 1;
      return result;

    } catch (error) {
      console.error('Erro na decodificação:', error);
      throw error;
    } finally {
      this.state.isBusy = false;
    }
  }

  /**
   * Codifica um BitField inteiro em palavras, a partir de um contexto
   * inicial (n-grama). Retorna também o contexto (nextStartWord) em que
   * a codificação parou, para que o próximo trecho possa continuar dali
   * em vez de reiniciar do delimitador — evita depender de estado
   * implícito guardado na instância (bug presente na versão anterior).
   */
  encodeBitsToWords(bitField, startWord) {
    const words = [];
    let bitRange = ['0', '1'];
    let context = [...startWord];
    const totalBits = bitField.length;

    while (true) {
      const [word, wordBitRange] = this.encodeBitsToWord(bitField, bitRange, context);
      words.push(word);

      if (word === this.config.delimiter) {
        context = Array(this.config.nGramOrder).fill(this.config.delimiter);
      } else {
        context = [...context.slice(1), word.toLowerCase()];
      }

      const reducedRange = this.removeCommonBits(wordBitRange);
      const numBits = wordBitRange[0].length - reducedRange[0].length;
      bitField.popBits(numBits);
      bitRange = reducedRange;

      this.state.progress = totalBits > 0 ? (totalBits - bitField.length) / totalBits : 1;

      if (bitField.length === 0 ||
         (bitField.length === 1 && bitRange[0][0] === bitRange[1][0])) {
        break;
      }
    }

    this.state.progress = 1;
    return { words, nextStartWord: context };
  }

  /**
   * Codifica os próximos bits do BitField escolhendo uma única palavra,
   * dentro da distribuição de probabilidades do n-grama atual.
   */
  encodeBitsToWord(bitField, bitRange, context) {
    const distribution = this.getDistribution(context);
    if (distribution.length === 0) {
      throw new Error(`Contexto sem continuações no modelo: ${JSON.stringify(context)}`);
    }

    const wordRanges = this.computeWordRanges(bitRange, distribution, bitField.length);
    const precision = wordRanges[0][1][0].length;
    const bits = bitField.getBits(precision);

    for (const [word, range] of wordRanges) {
      if (parseInt(range[0], 2) <= parseInt(bits, 2) &&
          parseInt(range[1], 2) >= parseInt(bits, 2)) {
        return [word, range];
      }
    }
    // Fallback de segurança: nunca deveria ser alcançado se
    // computeWordRanges cobrir o intervalo completo corretamente.
    return wordRanges[wordRanges.length - 1];
  }

  /**
   * Decodifica uma lista de palavras de volta em um BitField, até atingir
   * maxBits. Retorna também quantas palavras foram consumidas e qual é o
   * contexto (n-grama) resultante, para permitir continuar a decodificação
   * de um trecho seguinte sem perder nem repetir palavras — a versão
   * anterior usava um índice fixo (4*8+1) para pular para os dados, o que
   * só coincidia por acaso quando cada palavra carregava exatamente 1 bit.
   */
  decodeWordsToBits(wordList, startContext, maxBits) {
    let bitRange = ['0', '1'];
    const bitField = new PokeStego.BitField([]);
    let context = startContext.map(w => w.toLowerCase());
    const originalMaxBits = maxBits;
    let wordsConsumed = 0;

    for (let i = 0; i < wordList.length; i++) {
      const word = wordList[i];
      const distribution = this.getDistribution(context);
      if (distribution.length === 0) {
        throw new Error(`Contexto sem continuações no modelo: ${JSON.stringify(context)}`);
      }

      const wordRanges = this.computeWordRanges(bitRange, distribution, maxBits - bitField.length);

      let matchedRange = null;
      for (const [w, range] of wordRanges) {
        if (w.toLowerCase() === word) {
          matchedRange = range;
          break;
        }
      }
      if (!matchedRange) {
        throw new Error(
          `Palavra "${word}" não corresponde a nenhuma saída esperada para o ` +
          `contexto ${JSON.stringify(context)} — o texto pode estar corrompido ` +
          `ou foi gerado com um modelo diferente.`
        );
      }

      bitRange = matchedRange;
      wordsConsumed = i + 1;

      context = word === this.config.delimiter
        ? Array(this.config.nGramOrder).fill(this.config.delimiter)
        : [...context.slice(1), word];

      const reducedRange = this.removeCommonBits(bitRange);
      let numBitsRemoved = bitRange[0].length - reducedRange[0].length;
      if (numBitsRemoved + bitField.length > maxBits) {
        numBitsRemoved = maxBits - bitField.length;
      }
      bitField.enqueueBits(bitRange[0].slice(0, numBitsRemoved));
      bitRange = reducedRange;

      this.state.progress = originalMaxBits > 0 ? bitField.length / originalMaxBits : 1;

      if (bitField.length === maxBits) {
        break;
      }
      if (bitField.length === maxBits - 1 && bitRange[0][0] === bitRange[1][0]) {
        bitField.enqueueBits(bitRange[0][0]);
        break;
      }
    }

    this.state.progress = 1;
    return { bitField, wordsConsumed, nextContext: context };
  }

  /**
   * Divide um intervalo binário [a,b] em sub-intervalos proporcionais à
   * probabilidade de cada palavra da distribuição, com precisão de bits
   * suficiente para representar todas as palavras de forma única.
   */
  computeWordRanges(bitRange, distribution, maxBits) {
    const denominator = distribution.reduce((sum, entry) => sum + entry.count, 0);
    bitRange = this.addDigitsToRange(bitRange, denominator, maxBits);

    const integerRange = [parseInt(bitRange[0], 2), parseInt(bitRange[1], 2)];
    const maxDigits = bitRange[0].length;
    const currentLength = integerRange[1] - integerRange[0];
    const step = currentLength / denominator;
    const base = integerRange[0];

    let start = 0;
    const ranges1 = [];
    for (const entry of distribution) {
      const end = start + entry.count * step;
      ranges1.push([entry.word, [start, end]]);
      start = end;
    }
    ranges1[ranges1.length - 1][1][1] = integerRange[1] - base;

    start = 0;
    const ranges2 = [];
    for (const range of ranges1) {
      if (range[1][1] >= start) {
        const newRange = [range[0], [start + base, Math.floor(range[1][1]) + base]];
        ranges2.push(newRange);
        start = newRange[1][1] - base + 1;
      }
    }

    const zeroPad = '0'.repeat(maxDigits);
    for (const range of ranges2) {
      range[1][0] = (zeroPad + range[1][0].toString(2)).slice(-maxDigits);
      range[1][1] = (zeroPad + range[1][1].toString(2)).slice(-maxDigits);
    }

    return ranges2;
  }

  /**
   * Estende um intervalo binário com dígitos extras até que ele tenha
   * precisão suficiente para representar `desiredLength` subdivisões,
   * sem ultrapassar `maxDigits`.
   */
  addDigitsToRange(bitRange, desiredLength, maxDigits) {
    const integerRange = [parseInt(bitRange[0], 2), parseInt(bitRange[1], 2)];
    const currentLength = integerRange[1] - integerRange[0] + 1;

    if (currentLength >= desiredLength) {
      return bitRange;
    }

    let numExtraDigits = Math.ceil(Math.log(desiredLength / currentLength) / Math.log(2));
    if (bitRange[0].length + numExtraDigits > maxDigits) {
      numExtraDigits = maxDigits - bitRange[0].length;
    }

    return [
      bitRange[0] + '0'.repeat(Math.max(0, numExtraDigits)),
      bitRange[1] + '1'.repeat(Math.max(0, numExtraDigits))
    ];
  }

  /**
   * Remove os bits (mais significativos) que já são idênticos em ambas as
   * pontas do intervalo — eles já foram "decididos" e podem ser
   * descartados da comparação.
   */
  removeCommonBits(bitRange) {
    let [a, b] = bitRange;
    while (a.length > 1 && a[0] === b[0]) {
      a = a.slice(1);
      b = b.slice(1);
    }
    return [a, b];
  }

  /**
   * Gera palavras aleatórias a partir do contexto atual até encontrar um
   * delimitador de frase, para "fechar" a última sentença de forma
   * gramatical. Tem um limite de iterações de segurança: a versão anterior
   * podia entrar em loop infinito se o modelo nunca levasse de volta ao
   * delimitador a partir de determinado contexto.
   */
  finishSentence(lastWord, priorContext) {
    let currentWord = lastWord;
    let context = priorContext.map(w => w.toLowerCase());
    const generated = [...context];

    const MAX_ITERATIONS = 1000;
    let iterations = 0;

    while (currentWord !== this.config.delimiter && iterations < MAX_ITERATIONS) {
      const distribution = this.getDistribution(context);
      if (distribution.length === 0) {
        break;
      }
      const randomIndex = Math.floor(Math.random() * distribution.length);
      currentWord = distribution[randomIndex].word;
      generated.push(currentWord);

      context = currentWord === this.config.delimiter
        ? Array(this.config.nGramOrder).fill(this.config.delimiter)
        : generated.slice(-this.config.nGramOrder).map(w => w.toLowerCase());

      iterations++;
    }

    // Se o limite de segurança foi atingido sem achar um delimitador,
    // força o fim da frase para garantir que o texto final é válido.
    if (generated[generated.length - 1] !== this.config.delimiter) {
      generated.push(this.config.delimiter);
    }

    return generated.slice(this.config.nGramOrder);
  }

  /**
   * Converte a lista de palavras/delimitadores gerada pelo codificador em
   * texto legível: capitaliza o início de cada frase e substitui cada
   * delimitador por uma pontuação aleatória (que pode ser um emoji, ex:
   * '⚡', '🔥' — ver CONFIG.punctuation).
   */
  wordsToText(wordList) {
    const parts = [];
    let lastWord = this.config.delimiter;

    for (const word of wordList) {
      if (lastWord === this.config.delimiter && word !== this.config.delimiter) {
        parts.push(word.charAt(0).toUpperCase() + word.slice(1));
      } else if (parts.length > 0 && lastWord !== this.config.delimiter) {
        if (word !== this.config.delimiter) {
          parts.push(word);
        } else {
          const punctuation = this.config.punctuation[
            Math.floor(Math.random() * this.config.punctuation.length)
          ];
          parts[parts.length - 1] += punctuation;
        }
      }
      lastWord = word;
    }

    return parts.join(' ');
  }

  /**
   * Converte texto de volta em uma lista de palavras/delimitadores.
   * IMPORTANTE: precisa reconhecer explicitamente cada marca de
   * CONFIG.punctuation (incluindo emojis e "...") como delimitador de
   * frase — usar apenas tokenize() aqui (como uma primeira versão faria)
   * simplesmente descartaria essas marcas como espaço em branco, sem
   * registrar a fronteira de frase, e quebraria a decodificação sempre
   * que a pontuação sorteada fosse um emoji.
   */
  textToWords(text) {
    const punctuationMarks = [...new Set(this.config.punctuation)]
      .sort((a, b) => b.length - a.length) // mais longas primeiro (ex: "..." antes de ".")
      .map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    const combined = new RegExp(
      `(${punctuationMarks.join('|')})|([\\p{L}\\p{N}][\\p{L}\\p{N}'\\-]*)`,
      'gu'
    );

    const matches = text.match(combined) || [];
    const words = [];

    for (const token of matches) {
      if (this.config.punctuation.includes(token)) {
        if (words[words.length - 1] !== this.config.delimiter) {
          words.push(this.config.delimiter);
        }
      } else {
        words.push(token.toLowerCase());
      }
    }

    return words;
  }

  /**
   * Converte uma string em bytes usando UTF-8, para suportar corretamente
   * acentos, emojis e demais caracteres fora do intervalo ASCII (a versão
   * anterior, se tivesse usado charCodeAt puro, corromperia qualquer
   * caractere com código acima de 255).
   */
  stringToBytes(str) {
    return Array.from(new TextEncoder().encode(str));
  }

  /**
   * Converte um array de bytes UTF-8 de volta em string.
   */
  bytesToString(bytes) {
    return new TextDecoder().decode(new Uint8Array(bytes));
  }

  /**
   * Converte um inteiro (tamanho da mensagem) em 4 bytes.
   */
  intToBytes(num) {
    const bytes = [];
    for (let i = 0; i < 4; i++) {
      bytes.push(num % 256);
      num = Math.floor(num / 256);
    }
    return bytes;
  }

  /**
   * Converte de volta os 4 bytes de tamanho em um inteiro.
   */
  bytesToInt(bytes) {
    const reversed = [...bytes].reverse();
    let value = 0;
    for (const byte of reversed) {
      value = value * 256 + byte;
    }
    return value;
  }

  /**
   * Adiciona novos dados ao corpus
   */
  addCorpusData(newData) {
    if (!Array.isArray(newData)) {
      newData = [newData];
    }

    // this.state.corpus já contém o corpus base (gerado em initCorpus).
    // Reinserir generateExtendedCorpus() aqui, como a versão anterior fazia,
    // duplicava as ~900 frases base a cada chamada, inflando o modelo sem
    // necessidade e distorcendo cada vez mais as probabilidades a favor do
    // corpus base em vez dos dados novos.
    const allData = [...this.state.corpus, ...newData];

    // Reconstruir modelo
    this.buildModel(allData);

    return this.state.stats;
  }

  /**
   * Obtém estatísticas do sistema
   */
  getStats() {
    return this.state.stats;
  }
}

// BitField class
PokeStego.BitField = class BitField {
  constructor(data = []) {
    this.data = Array.from(data);
    this.bitCache = '';
    this.bitQueue = '';
  }

  get length() {
    return this.bitCache.length + this.data.length * 8 + this.bitQueue.length;
  }

  _popBytes(numBytes) {
    const bytesToPop = Math.min(numBytes, this.data.length);
    for (let i = 0; i < bytesToPop; i++) {
      const byte = this.data.shift();
      const bits = byte.toString(2).padStart(8, '0');
      this.bitCache += bits;
    }
    return bytesToPop;
  }

  _ensureBitsReady(numBits) {
    if (this.length < numBits) {
      throw new Error(`Não há bits suficientes: ${this.length} < ${numBits}`);
    }

    while (this.bitCache.length < numBits) {
      const needed = numBits - this.bitCache.length;
      const bytesNeeded = Math.ceil(needed / 8);
      const bytesPopped = this._popBytes(Math.min(bytesNeeded, this.data.length));

      if (bytesPopped === 0 && this.data.length === 0) {
        this.bitCache += this.bitQueue;
        this.bitQueue = '';
      }
    }
  }

  getBits(numBits) {
    this._ensureBitsReady(numBits);
    return this.bitCache.substring(0, numBits);
  }

  popBits(numBits) {
    this._ensureBitsReady(numBits);
    const bits = this.bitCache.substring(0, numBits);
    this.bitCache = this.bitCache.substring(numBits);
    return bits;
  }

  pushBits(bits) {
    this.bitCache = bits + this.bitCache;
    while (this.bitCache.length >= 8) {
      const byteBits = this.bitCache.slice(-8);
      this.data.unshift(parseInt(byteBits, 2));
      this.bitCache = this.bitCache.slice(0, -8);
    }
  }

  enqueueBits(bits) {
    this.bitQueue += bits;
    while (this.bitQueue.length >= 8) {
      const byteBits = this.bitQueue.slice(0, 8);
      this.data.push(parseInt(byteBits, 2));
      this.bitQueue = this.bitQueue.slice(8);
    }
  }

  getAllBytes() {
    if (this.bitCache || this.bitQueue) {
      console.warn('Alguns bits não estão armazenados como bytes');
    }
    return this.data;
  }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PokeStego;
} else if (typeof window !== 'undefined') {
  window.PokeStego = PokeStego;
}

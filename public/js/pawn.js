var app = angular.module('pawnGuild', []);

app.controller('membersController', function($scope, $http){
	var url = "https://eu.api.battle.net/wow/guild/Silvermoon/Pawn?fields=members&locale=en_US&apikey=kexbm26am4k2dh6zjkkvzhxpe8u9wx6e&jsonp=JSON_CALLBACK";
	$http.jsonp(url)
		.success(response => {
			$scope.members = response.members
				.filter(memberRaw => memberRaw.rank < 7)
				.map(memberRaw => {
					var member = {
					name : memberRaw.character.name,
					race : "images/Races/" + Races[memberRaw.character.race] + "_" + Gender[memberRaw.character.gender] +".png",
					class : "images/Classes/" + Class[memberRaw.character.class] + ".png",
					level : memberRaw.character.level,
					rank : memberRaw.rank,
					spec : memberRaw.character.spec ? memberRaw.character.spec.name : "-"
					}
					return member;
				})
				.sort((a,b) => {
					return a.rank < b.rank ? -1 : 
						(a.rank > b.rank ? 1 : (a.name < b.name ? -1 : 1))
				})
		});
});

Races = {
    1: 'Human',
    2: 'Orc',
    3: 'Dwarf',
    4: 'NightElf',
    5: 'Undead',
    6: 'Tauren',
    7: 'Gnome',
    8: 'Troll',
    9: 'Goblin',
    10: 'BloodElf',
    11: 'Draenei',
    22: 'Worgen',
    24: 'Pandaren',
    25: 'Pandaren',
    26: 'Pandaren'
};
GuildRanks = {
    0: 'Guild Master',
    1: 'Officer',
    3: 'Core Raider',
    4: 'Core Raider'
};
Class = {
    1: 'Warrior',
    2: 'Paladin',
    3: 'Hunter',
    4: 'Rogue',
    5: 'Priest',
    6: 'Deathknight',
    7: 'Shaman',
    8: 'Mage',
    9: 'Warlock',
    10: 'Monk',
    11: 'Druid',
	 12: 'DemonHunter'
};
Gender = {
    0: 'Male',
    1: 'Female'
};

/*	-WHAT IS THIS?-
	The script featured here is an explanation of how to make your own custom addition to MPMB's D&D 5e Character Tools.
	To add your own content to the Character Sheet, use the syntax below and save it in a file. You can then import this file directly to the sheet using the "Import" button and "Import/Export" bookmark.
	There you can either import the file as a whole or just copy the text into a dialogue.
	-KEEP IN MIND-
	Note that you can add as many custom codes as you want, either by importing consecutive files or pasting the scripts into the dialogue.
	It is recommended to enter the code in a freshly downloaded or reset sheet before adding any other information so that there won't be any conflicts.
*/

/*	-INFORMATION-
	Subject:	Subclass (a.k.a. Archetype)
	Effect:		This script adds the Accursed Archive subclass to the Warlock from the Compendium of Forgotten Secrets: Awakening
	Sheet:		v12.999 (2017-11-29)
*/
var iFileName = "The Accursed Archive - ClassSubList.js"; // Optional; This is how the file will be named in the sheet if you import it as a file and not copy-paste its content. Only the first occurrence of this variable will be used
RequiredSheetVersion(12.999);

SourceList["COFSA:TAA"] = {
	name : "Compendium of Forgotten Secrets Awakening: The Accursed Archive",
	abbreviation : "COFSA:TAA",
	group : "Compendium",
	url : "https://www.genfantasypress.com/",
	date : "2018/09/09" //Finished 2018/12/01
};

AddSubClass("warlock","the accursed archive", {
	regExpSearch : /^(?=.*\barchivist\b).*$/i, //required; regular expression of what to look for (i.e. now it looks for any entry that has both the words "special" and "me" in it, disregarding capitalization). If this looks to complicated, just write: /specialme/i		
	subname : "The Accursed Archive", //required; the name of the subclass		
	source : ["COFSA", 8], //required; the source and the page number. "HB" stands for homebrew. See the "Complete SourceList" for an overview of sources that are already defined. Or define a new source using the "Homebrew Syntax - SourceList.js". // This can be an array of arrays to indicate the things appears in multiple sources. For example, if something appears on page 7 of the Elemental Evil Player's Companion and on page 115 of the Sword Coast Adventure Guide, use the following: [["E", 7], ["S", 115]]
	spellcastingExtra : ["detect evil and good","inflict wounds","accursed wish","dark secret","blackened heart","blasphemy","evard's black tentacles","forbidden obelisk","dispel evil and good","legend lore"],
		
	fullname : "Archivist", 
	
	features : { //unlike the other entries, "features" will not delete all the features from the ClassList, but will add to the features in the ClassList. For this to work properly, the feature object has to be named "subclassfeatureX" and not something appropriate for the feature. The below are the features of the purple Dragon Knight
	
		"subclassfeature1" : {
			name : "Tainted Knowledge",
			source : ["COFSA", 10],
			minlevel : 1,
			description : desc([
				"Choose two of the following: Arcana, History, Nature, or Religion.",
				"Your proficiency bonus is doubled for ability check you make that uses a chosen skill if",
				"you are proficient in that skill.",
				"You gain proficiency in any one skill of your choosing.",
				"You can use an action to enter the Accursed Archive with up to 10 willing companions",
				"that you can see. Time does not pass while inside the Archive.",
				"You cannot rest, regain hit points, or maintain concentration on spells within the Archive.",
				"When you choose to depart, you and your companions return instantly to the point from",
				"which you entered."
			]),
			skillstxt : "\n\n" + toUni("Archivist") + ": Choose two of the following: Arcana, History, Nature, or Religion and also gain proficiency in any one skill of your choosing.",
			recovery : "long rest",
			action : ["action",""]
		},
		"subclassfeature6" : {
			name : "Written in Blood",
			source : ["COFSA", 10],
			minlevel : 6,
			description : desc([
				"I can touch a creature, it must make a Charisma saving throw against my warlock spell save",
				"DC.",
				"If it fails, it is paralyzed until the end of my next turn and its flesh peels back to reveal a book.",
				"The words describe who they are and what they have done, and you can read up to 6",
				"sentences, prioritizing details you wish to learn.",
				"While the creature is paralyzed, you gain advantage on Charisma and Intelligence checks",
				"relating to the creature.",
				"The creature has disadvantage on Charisma and Wisdom checks."
			]),
			recovery : "short rest",
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Vile Heresies",
			source : ["COFSA", 11],
			minlevel : 10,
			description : desc([
				"Choose a spell that is 4th level or lower that is not a cantrip.",
				"You can cast this spell once using a warlock spell slot.",
				"Whenever you cast your chosen spell, you are immune to the frightened condition.",
				"This immunity lasts until you finish a short or long rest.",
				"Whenever you enter the Archive, you can exchange this spell for a different one, but you",
				"cannot use it until you finish a long rest."
			]),
			recovery : "long rest",
			usages : 1,
			spellcastingBonus : {
				name : "Vile Heresies",
				"class" : "any",
				level : [1,4],
				firstCol : "oncelr"
			}
		},
		"subclassfeature14" : {
			name : "Unspeakable Truths",
			source : ["COFSA", 11],
			minlevel : 14,
			description : desc([
				"As an action, I can share an unspeakable truth with all creatures that can hear me within 60",
				"feet. All hostile creatures that can hear me must make a Wisdom saving throw against",
				"my warlock spell save DC.",
				"If they fail, they are driven mad and are affected by the confusion spell for one minute.",
				"They can repeat this saving throw each time they suffer damage, ending the effect on a",
				"success. I can choose up to 4 allies within 60 feet I can see and a 2nd level",
				"or lower spell that inflicts damage. Each ally chosen can use their reaction",
				"to cast this spell without using a spell slot during the next minute.",
				"Charisma is their spellcasting modifier for this spell. Once you finish this feature, you cannot",
				"do so again until a long rest."
			]),
			recovery : "long rest",
			action : ["action", ""],
			usages : 1,
		}
	}
});

ArmourList["curse of carasphyx"] = { //either going to use this or the addACmisc function
	regExpSearch : /^(?=.*curse)(?=.*of)(?=.*carasphyx).*$/i,
	name : "Curse of Carasphyx",
	source : ["COFSA", 11],
	type : "",
	ac : 10 + What("Str Mod") + What("Cha Mod"),
	stealthdis : false,
	strReq : 0,
	dex : -10,
	addMod : false
};
AddWarlockInvocation("The Archivist's Journal (prereq: Accused Archive patron)", {
	name : "The Archivist's Journal",
	source : ["COFSA", 11],
	recovery : "short rest",
	action : ["bonus action", ""],
	usages : 1,
	prereqeval : "(/the accursed archive/).test(classes.known.warlock.subclass)",
	description : desc([
		"I gain advantage on saving throws while in the Archive.",
		"When I cast a 1st level or higher spell that deals damage, I can use a bonus action to cause one target of the spell to become vulnerable to the first instance of damage from a single type, rolled randomly on the table below.",
		"If the spell I casted deals that damage type, I must roll again until I get a different result.",
		"If the creature has resistance to the damage type, it is ignored for the duration.",
		"Once I use this bonus action, I cannot do so until completing a short or long rest."
	])
});
AddWarlockInvocation("Butcher's Quill (prereq: Accused Archive patron, Pact of the Blade)", {
	name : "Butcher's Quill",
	source : ["COFSA", 11],
	recovery : "short rest",
	usages : 1,
	action : ["bonus action", ""],
	prereqeval : "What('Class Features Remember').indexOf('warlock,pact boon,pact of the blade') !== -1 && (/the accursed archive/).test(classes.known.warlock.subclass)",
	description : desc([
		"Using Pact of the Blade, I can make a weapon out of raven feathers and abomination hide that drips and bleeds black ink.",
		"When I hit a creature with this weapon, I can cast a 1st level spell with a casting time of one bonus action without spending a spell slot.",
		"Once I cast a spell in this way, I cannot do so until completing a short or long rest."
	])
});
AddWarlockInvocation("Curse of Carasphyx (prereq: Accused Archive patron, level 7 warlock)", {
	name : "Curse of Carasphyx",
	source : ["COFSA", 11],
	// eval : "AddACMisc(Str, 'Curse of Carasphyx', '\n   Without armor and no shield, the class feature Curse of Carasphyx makes my AC 10 + Strength modifier + Charisma modifier', ACshield)",
	// removeeval : "AddACMisc(0, 'Curse of Carasphyx', '\n   Without armor and no shield, the class feature Curse of Carasphyx makes my AC 10 + Strength modifier + Charisma modifier')", //figuring out 4th parameter
	addArmor : "Curse of Carasphyx",
	prereqeval : "classes.known.warlock.level >= 7 && (/the accursed archive/).test(classes.known.warlock.subclass)",
	description : desc([
		"Without armor and no shield, I can have my AC be 10 + Strength modifier + Charisma",
		"modifier."
	])
});
AddWarlockInvocation("Scribe's Adjunct (prereq: Accursed Archive patron, Pact of the Chain)", {
	name : "Scribe's Adjunct",
	source : ["COFSA", 11],
	spellcastingBonus : {
		name : "Scribe's Adjunct",
		spells : ["mending"],
		selection : ["mending"],
		firstCol : "atwill"
	},
	prereqeval : "What('Class Features Remember').indexOf('warlock,pact boon,pact of the chain') !== -1 && (/the accursed archive/).test(classes.known.warlock.subclass)",
	description : desc([
		"While I have a record-hunter as a familiar, it gains maximum hit points equal to my warlock level.",
		"I can now cast the mending cantrip."
	])
});
AddWarlockInvocation("Tenebrous Blast (prereq: Accused Archive patron, level 7 warlock)", {
	name : "Tenebrous Blast",
	source : ["COFSA", 11],
	action : ["bonus action", "(hit with cantrip or weapon attack)"],
	prereqeval : "classes.known.warlock.level >= 7 && (/the accursed archive/).test(classes.known.warlock.subclass)",
	description : desc([
		"When I deal damage with a cantrip or hit a creature with a weapon attack, I can use a bonus action to unleash a blast of malevolent power.",
		"The creature suffers disadvantage on attack rolls targeting lightly obscured creatures until the end of their next turn."
	])
});

//sets Record-Hunter as an option for the pact of the chain feature
//CreatureList["record-hunter"].companion = "pact_of_the_chain";

## Reason for fork

I love tinkering on games/mods in general, and CDDA offered an incredibly juicy target, being both open source and also massive. Unfortunately the dev community is not one I wish to participate in after seeing many, many instances of their rude elitism and disregard of potential contributors. What I do _NOT_ have a problem with is the direction CDDA is going in. I am fine with the devs building the game they want even if the players hate the changes. It's their project and it's available to be forked, so everyone who complains to the devs can instead fix the things they don't like. That's what this mini-fork is -- the version of the game I want to play. If you'd like to contribute code or ideas either one, this fork will treat your contribution with the same consideration I give my own.

## Philosophy

Fun > Anything else. Modern Bright Nights with a focus on removing needless tedium, reverting player-unfriendly changes, bringing back as much old content as possible (updated for experimental) without regard for the reasons they were originally removed. If you don't like Old Labs don't go in them! If you don't like house-burning cheese to kill a pile of zombies, don't start fires! It's that easy!
This game is a massive sandbox that already has so much freely available to tune the difficulty to your preference that I cannot understand why anyone would remove fun things (Stabbing from a roof) in the name of "removing cheese". It's a single player game, just don't use cheese if you don't like it. Massively huge priority of restoring as much player agency as possible
Difficulty is NOT a priority in any way, hit up TLG if that's what you're looking for. This will be much "easier" than other forks. You will still die.
Realism is NOT a priority in any way. Nothing against it, but I'd prefer fun over realism every time they're at odds
Stability is a minor priority. The game shouldn't crash, but lots of my changes likely don't work exactly as expected. When I started, I knew zilch about this codebase. I also never planned to release any of it, so I was mega sloppy on top of making a bunch of messes while I figured out how everything works. If you report something I'll happily fix it, but be aware there's all sorts of monsters under this bed

## Lore

Also returned to the older CDDA where things are happening in the near future. This means things like police bots and augmentation clinics are all back. Similarly dissecting the various old zombies for bionics has also returned.

## Labels

PF - Changes marked with PF are intended to be Player Friendly changes that remove/revert/change things that were clearly introduced just to annoy players, especially ones that go against the spirit of "Realism" just to screw over the player
QOL - Pure quality of life, shouldn't affect difficulty or anything
TLG - Awesome ideas ported from TLG, a much finer fork than this one

- Noct's Cata++ mod ported and added
- Arcana mod ported and added
- Tankmod mod ported and added - Yes, they're not real treads, they're just wheels. So what. It is really fun driving a tank even if it has wheels
- Blaze Industries mod ported and added
- BOYD mod added - returning lots of old removed stuff. This is in mod format but it's not optional. At least some small pieces of the base game now depend on things this adds. In hindsight I should've put none of it into a mod, but oh well, live and learn! Has its own README that describes the revivals in more depth
- Toggle NPC processing - Ever built your base above a lab? Now you can! The perf difference from turning off NPCs is insane. Bind it in-game to some hotkey
- Survivor stuff brought back - PF There's few enough endgame options even WITH the survivor stuff, plus it's a really fun goal in-game
- Spears from rooftops are a thing again - PF Of course you can stab a Pike from a rooftop, this is already countered by the fact zombies will rapidly destroy the roof under you. One of those weird changes where CDDA spits in the face of its own realism and takes away a useful and realistic strategy because it benefits the player
- Gutters climbable PF
- Readded old labs of all sorts and sizes - If you don't like them, just don't go in them? Why remove them
- Dermatiks don't instakill you PF This is just awful who okayed this. There's a whole alternate game mode for people who want RNG death on every swing
- Traps unnerfed PF - Sure it's cheese but it's really fun, don't do it if you don't like it
- Zombies are attracted to burning buildings PF - Another non-realistic change to add artificial difficulty, just don't set houses on fire if you don't want zombies to roll in and burn. Note that with Hordes 2.0, you can kill a ridiculous amount of zombies with a single burning building and remove TOO much challenge
- Remove a couple annoying confirmations
- TLG's sane melee/armor degradation
- Helicopter pilot NPC (TLG)
- Lots of world options brought back PF
- Fiction books are worth a lot again PF/QOL This is the last entertainment left, of course they're worth a lot
- Made some GLOBALLY_UNIQUE places into OVERMAP_UNIQUE with rarer chances QOL - same deal applies as it did in CDDA, don't try to quest for more than 1 set of NPCs or it'll break things
- Xedra homulus gets to fly eventually - fun
- New martial art for spears based on Qiangfa - I wanted more than one martial art to choose from and wanted to learn how MAs worked
- Augmentation clinics return - these are super cool
- Bionics are again dissectable from certain enemies (the same ones) PF
- Zombie bio operators return PF
- Added VERY_DURABLE_MELEE flag that's 2x as durable - PF Why does my crowbar lose to a zombie's skull?
- Added packaging/moving to some Magiclysm crafting things - QOL
- Summonable Dreamer Spear for Xedra, same weapon stats tier as the other Dreamer weapons - this is sort of OP with rooftop stabbing returned, but Xedra has WAY more OP shit than the spear, so it's consistent with the mod
- Solar panels on cars again - this totally doesn't even matter anymore since a single house roof now provides all the solar panels you can use
- Always see container items from range -QOL After hundreds of hours, I'm tired of walking through rooms tile-by-tile hoping to spot some loot
- Readd trickle charger CBM
- Zui Quan returned to its former glory - yep it's OP, don't use it if you don't like it
- RM13 can be powered by bionics
- Overmap "vision levels" removed, back to binary yes/no unveiling - Annoying tedium
- Zombies can no longer rip APCs apart with their bare hands
- No riot fires - I don't like them in general + with Hordes 2.0 and the reversion of fires attracting zombies, you end up with empty towns fast
- No wheel/tire damage - I'd rather watch paint dry. This is the worst crime against humanity that CDDA has ever inflicted upon the masses. Words cannot express how much I loathe this.
- Fire fucks up zombies again - It's fire, man.
- Misc QoL item changes (h2o pouch can hold a 2.5L Canteen now, etc)
- Superalloy is now actually super
- Lard.
- Weariness does basically nothing - This game has far too many number bars for the same thing. Stamina and Sleep are quite enough on their own
- Focus does do absolutely nothing - This is the dumbest mechanic in the game, to the point the devs themselves will tell you to ignore it because there's no counterplay to it. It's now forever 100. Take the new Very Slow Learner or something if you think you're learning too fast. Grinding mechanics to 8 in CDDA is miserable when it's your 50th time
- Old atomic stuff returned - cool factor
- Vehicle degradation/repair works the old way - BEGONE TEDIUM
- Welding rod requirements removed - BEGONE TEDIUM
- Made dissection much faster since CBMs are back and it gets tedious
- Nanofab stuff returned to labs
- Athletics effects improved so you actually want to train it
- Faster vender restock
- Put any tool on your workshop or kitchen
- CBM prep can't fail -time-wasting annoyance
- Integrated toolset back to prior awesomeness - god forbid I get excited to find a CBM
- No dust - Who did this horrible thing
- Increase amount NPCs will let their debts to you reach - Why the fuck would they care if they owe you a billion dollars
- Control laptop returns - cool factor
- Jackhammers can dig walls again PF cool factor
- Mining times unnerfed PF
- Dismembering times unnerfed PF
- Betavoltaic cells price unnerfed PF
- Brought back old Packrat (kinda) by having it summon a bespoke pocket with 5L of space
- NPC Chat option to switch controlled character
- Fungal terrain spreads fire again PF
- No random fungus
- Gold is valuable again PF
- Unnerf joint torsion ratchet CBM
- Revert window movement cost reduction - PF of course it would take zombies a long time to climb through a window. You pay the same cost.
- Revert all 328493849566 of the charges to count changes, this is simply a terrible change in every way as it stands. Please send help my CPU is on fire
- Revert Psychopaths not being able to swap to other NPCs - the hell?
- Psychopathic cannibals can eat people without morale loss again. Considering removing the morale penalty to eating people for all characters except squeamish/veg type traits. I'm pretty sure I would get hungry enough I got over eating Martha from down the street pretty fast. Unrealistic reactions to emergency situations always irks me in games. Rimworld why are yall cranky about nutrient paste 2 days into a crash landing?
- Revert the removal of bundles - no good reason whatsoever to remove this functionality. If you don't wanna use bundles don't make bundles.
- Make a bunch of stuff Charges again for the massive performance gains - This was a horrible no good very bad change.
- You can once again boil water to purify it - ....why would you get rid of this?
- Purifier tablets work as they used to

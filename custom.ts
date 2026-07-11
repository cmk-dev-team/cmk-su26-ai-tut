const aiActionHandlers: { [name: string]: () => void } = {}

function sendAiEvent(eventName: string, payload?: string): void {
    if (payload && payload.length > 0) {
        player.execute("scriptevent cmk_ai:" + eventName + " " + payload)
    } else {
        player.execute("scriptevent cmk_ai:" + eventName)
    }
}

function creatureKey(creature: AiCreature): string {
    if (creature == AiCreature.Sheep) {
        return "sheep"
    } else if (creature == AiCreature.Pig) {
        return "pig"
    } else if (creature == AiCreature.Chicken) {
        return "chicken"
    } else if (creature == AiCreature.Fox) {
        return "fox"
    } else if (creature == AiCreature.Zombie) {
        return "zombie"
    } else if (creature == AiCreature.Villager) {
        return "villager"
    }
    return "cow"
}

function areaKey(area: AiArea): string {
    if (area == AiArea.Area0) {
        return "area0"
    } else if (area == AiArea.Area2) {
        return "area2"
    } else if (area == AiArea.Area3) {
        return "area3"
    } else if (area == AiArea.Area4) {
        return "area4"
    }
    return "area1"
}

function particleKey(particle: AiParticle): string {
    if (particle == AiParticle.Heart) {
        return "heart"
    } else if (particle == AiParticle.Flame) {
        return "flame"
    } else if (particle == AiParticle.Note) {
        return "note"
    } else if (particle == AiParticle.Spark) {
        return "spark"
    }
    return "none"
}

function foodKey(food: AiFood): string {
    if (food == AiFood.Steak) {
        return "steak"
    } else if (food == AiFood.CookedChicken) {
        return "cooked_chicken"
    } else if (food == AiFood.CookedMutton) {
        return "cooked_mutton"
    } else if (food == AiFood.CookedPorkchop) {
        return "cooked_porkchop"
    } else if (food == AiFood.Cake) {
        return "cake"
    } else if (food == AiFood.Cookie) {
        return "cookie"
    } else if (food == AiFood.Bread) {
        return "bread"
    }
    return "apple"
}

function itemScoreId(item: AiFood): string {
    if (item == AiFood.Steak) {
        return "ai_i_steak"
    } else if (item == AiFood.CookedChicken) {
        return "ai_i_chicken"
    } else if (item == AiFood.CookedMutton) {
        return "ai_i_mutton"
    } else if (item == AiFood.CookedPorkchop) {
        return "ai_i_pork"
    } else if (item == AiFood.Cake) {
        return "ai_i_cake"
    } else if (item == AiFood.Cookie) {
        return "ai_i_cookie"
    } else if (item == AiFood.Bread) {
        return "ai_i_bread"
    }
    return "ai_i_apple"
}

function blockKey(block: AiBlock): string {
    if (block == AiBlock.BirchLog) {
        return "birch_log"
    } else if (block == AiBlock.SpruceLog) {
        return "spruce_log"
    } else if (block == AiBlock.JungleLog) {
        return "jungle_log"
    } else if (block == AiBlock.AcaciaLog) {
        return "acacia_log"
    }
    return "oak_log"
}

function blockScoreId(block: AiBlock): string {
    if (block == AiBlock.BirchLog) {
        return "ai_b_birch"
    } else if (block == AiBlock.SpruceLog) {
        return "ai_b_spruce"
    } else if (block == AiBlock.JungleLog) {
        return "ai_b_jungle"
    } else if (block == AiBlock.AcaciaLog) {
        return "ai_b_acacia"
    }
    return "ai_b_oak"
}

function hashActionName(name: string): string {
    let hash = 5381
    for (let i = 0; i < name.length; i++) {
        hash = ((hash * 33) ^ name.charCodeAt(i)) >>> 0
    }
    return hash.toString(36)
}

function actionObjectiveId(name: string): string {
    return "ai_act_" + hashActionName(name)
}

function groupFoundObjectiveId(domain: string, name: string): string {
    return "ai_grpfound_" + domain + "_" + hashActionName(name)
}

enum AiCreature {
    //% block="ウシ"
    Cow = 0,
    //% block="ヒツジ"
    Sheep = 1,
    //% block="ブタ"
    Pig = 2,
    //% block="ニワトリ"
    Chicken = 3,
    //% block="キツネ"
    Fox = 4,
    //% block="ゾンビ"
    Zombie = 5,
    //% block="村人"
    Villager = 6
}

enum AiArea {
    //% block="エリア0"
    Area0 = 0,
    //% block="エリア1"
    Area1 = 1,
    //% block="エリア2"
    Area2 = 2,
    //% block="エリア3"
    Area3 = 3,
    //% block="エリア4"
    Area4 = 4
}

enum AiParticle {
    //% block="なし"
    None = 0,
    //% block="ハート"
    Heart = 1,
    //% block="ほのお"
    Flame = 2,
    //% block="おんぷ"
    Note = 3,
    //% block="キラキラ"
    Spark = 4
}

enum AiFood {
    //% block="りんご"
    Apple = 0,
    //% block="ステーキ"
    Steak = 1,
    //% block="焼き鳥"
    CookedChicken = 2,
    //% block="焼いた羊肉"
    CookedMutton = 3,
    //% block="焼き豚"
    CookedPorkchop = 4,
    //% block="ケーキ"
    Cake = 5,
    //% block="クッキー"
    Cookie = 6,
    //% block="パン"
    Bread = 7
}

enum AiBlock {
    //% block="オークの原木"
    OakLog = 0,
    //% block="シラカバの原木"
    BirchLog = 1,
    //% block="トウヒの原木"
    SpruceLog = 2,
    //% block="ジャングルの原木"
    JungleLog = 3,
    //% block="アカシアの原木"
    AcaciaLog = 4
}

enum AiToggle {
    //% block="ON"
    On = 0,
    //% block="OFF"
    Off = 1
}

//% color="#2F7D4E" weight=100 block="がくしゅう"
//% groups='["イベント", "せってい", "がくしゅう", "グループ", "パズル", "条件", "AI", "しゅるい"]'
namespace LearningBlocks {
    //% blockId=cmkai_on_learning block="がくしゅうする"
    //% blockAllowMultiple=1
    //% group="イベント"
    export function onLearning(handler: () => void): void {
        loops.runInBackground(function () {
            handler()
        })
    }

    //% blockId=cmkai_set_ai_name block="AIのなまえを $name にする"
    //% name.defl="アイ"
    //% group="せってい"
    export function setAiName(name: string): void {
        sendAiEvent("set_name", name)
    }

    //% blockId=cmkai_learn_area block="エリア $name を学習させる"
    //% name.defl="きょてん"
    //% group="せってい"
    export function learnArea(name: string): void {
        sendAiEvent("learn_area", name)
    }

    //% blockId=cmkai_learn_creature block="いきもの $creature をがくしゅうする"
    //% creature.defl=AiCreature.Cow
    //% group="がくしゅう"
    export function learnCreature(creature: AiCreature): void {
        sendAiEvent("learn_creature", creatureKey(creature))
    }

    //% blockId=cmkai_learn_item block="アイテム $item をがくしゅうする"
    //% item.defl=AiFood.Apple
    //% group="がくしゅう"
    export function learnItem(item: AiFood): void {
        sendAiEvent("learn_item", foodKey(item))
    }

    //% blockId=cmkai_learn_block block="ブロック $block をがくしゅうする"
    //% block.defl=AiBlock.OakLog
    //% group="がくしゅう"
    export function learnBlock(block: AiBlock): void {
        sendAiEvent("learn_block", blockKey(block))
    }

    //% blockId=cmkai_learn_creature_group block="生きものグループ $name を学習させる"
    //% name.defl="敵"
    //% handlerStatement=1
    //% group="グループ"
    export function learnCreatureGroup(name: string, handler: () => void): void {
        sendAiEvent("group_context_start", "creature|" + name)
        handler()
        sendAiEvent("group_context_end")
    }

    //% blockId=cmkai_learn_item_group block="アイテムグループ $name を学習させる"
    //% name.defl="おやつ"
    //% handlerStatement=1
    //% group="グループ"
    export function learnItemGroup(name: string, handler: () => void): void {
        sendAiEvent("group_context_start", "item|" + name)
        handler()
        sendAiEvent("group_context_end")
    }

    //% blockId=cmkai_learn_block_group block="ブロックグループ $name を学習させる"
    //% name.defl="木材"
    //% handlerStatement=1
    //% group="グループ"
    export function learnBlockGroup(name: string, handler: () => void): void {
        sendAiEvent("group_context_start", "block|" + name)
        handler()
        sendAiEvent("group_context_end")
    }

    //% blockId=cmkai_group_add_creature block="いきもの $creature"
    //% creature.defl=AiCreature.Zombie
    //% group="グループ"
    export function groupAddCreature(creature: AiCreature): void {
        sendAiEvent("group_add_member", "creature|" + creatureKey(creature))
    }

    //% blockId=cmkai_group_add_item block="アイテム $item"
    //% item.defl=AiFood.Apple
    //% group="グループ"
    export function groupAddItem(item: AiFood): void {
        sendAiEvent("group_add_member", "item|" + foodKey(item))
    }

    //% blockId=cmkai_group_add_block block="ブロック $block"
    //% block.defl=AiBlock.OakLog
    //% group="グループ"
    export function groupAddBlock(block: AiBlock): void {
        sendAiEvent("group_add_member", "block|" + blockKey(block))
    }

    //% blockId=cmkai_set_favorite_food block="すきなたべものを設定"
    //% handlerStatement=1
    //% group="パズル"
    export function setFavoriteFood(handler: () => void): void {
        sendAiEvent("food_preference_mode", "favorite")
        handler()
        sendAiEvent("food_preference_mode", "none")
    }

    //% blockId=cmkai_set_disliked_food block="にがてなたべものを設定"
    //% handlerStatement=1
    //% group="パズル"
    export function setDislikedFood(handler: () => void): void {
        sendAiEvent("food_preference_mode", "disliked")
        handler()
        sendAiEvent("food_preference_mode", "none")
    }

    //% blockId=cmkai_food block="たべもの $food"
    //% food.defl=AiFood.Apple
    //% group="パズル"
    export function food(food: AiFood): void {
        sendAiEvent("food_preference_item", foodKey(food))
    }

    //% blockId=cmkai_creature_was_found block="いきもの $creature をみつけた"
    //% creature.defl=AiCreature.Cow
    //% group="条件"
    export function creatureWasFound(creature: AiCreature): boolean {
        return player.execute("scoreboard players test @s ai_found_" + creatureKey(creature) + " 1 1")
    }

    //% blockId=cmkai_creature_is_known block="いきもの $creature をがくしゅうずみである"
    //% creature.defl=AiCreature.Cow
    //% group="条件"
    export function creatureIsKnown(creature: AiCreature): boolean {
        return player.execute("scoreboard players test @s ai_known_" + creatureKey(creature) + " 1 1")
    }

    //% blockId=cmkai_item_is_known block="アイテム $item をがくしゅうずみである"
    //% item.defl=AiFood.Apple
    //% group="条件"
    export function itemIsKnown(item: AiFood): boolean {
        return player.execute("scoreboard players test @s " + itemScoreId(item) + " 1 1")
    }

    //% blockId=cmkai_block_is_known block="ブロック $block をがくしゅうずみである"
    //% block.defl=AiBlock.OakLog
    //% group="条件"
    export function blockIsKnown(block: AiBlock): boolean {
        return player.execute("scoreboard players test @s " + blockScoreId(block) + " 1 1")
    }

    //% blockId=cmkai_set_ai_speech block="AIにセリフ $message をせっていする"
    //% message.defl="こんにちは"
    //% group="AI"
    export function setAiSpeech(message: string): void {
        sendAiEvent("set_speech", message)
    }

    //% blockId=cmkai_set_ai_particle block="AIにパーティクルをせっていする $particle"
    //% particle.defl=AiParticle.Heart
    //% group="AI"
    export function setAiParticle(particle: AiParticle): void {
        sendAiEvent("set_particle", particleKey(particle))
    }

    //% blockId=cmkai_learn_action block="アクション $name を学習させる"
    //% name.defl="とくべつこうげき"
    //% handlerStatement=1
    //% group="AI"
    export function learnAction(name: string, handler: () => void): void {
        aiActionHandlers[name] = handler
        sendAiEvent("learn_action", name)
    }

    //% blockId=cmkai_run_action block="アクション $name を実行する"
    //% name.defl="とくべつこうげき"
    //% group="AI"
    export function runAction(name: string): void {
        if (!player.execute("scoreboard players test @s " + actionObjectiveId(name) + " 1 1")) {
            return
        }
        const handler = aiActionHandlers[name]
        if (handler) {
            handler()
        }
    }

    //% blockId=cmkai_set_action_enabled block="アクション $name の機能を $enabled にする"
    //% name.defl="とくべつこうげき"
    //% enabled.defl=AiToggle.On
    //% group="AI"
    export function setActionEnabled(name: string, enabled: AiToggle): void {
        sendAiEvent("set_action_enabled", name + "|" + (enabled == AiToggle.On ? "on" : "off"))
    }

    //% blockId=cmkai_action_say block="セリフ $message をいう"
    //% message.defl="やあ！"
    //% group="AI"
    export function actionSay(message: string): void {
        sendAiEvent("say_now", message)
    }

    //% blockId=cmkai_action_repel block="いきもの $creature をおいはらう"
    //% creature.defl=AiCreature.Zombie
    //% group="AI"
    export function actionRepel(creature: AiCreature): void {
        sendAiEvent("repel_creature", creatureKey(creature))
    }

    //% blockId=cmkai_action_attack block="いきもの $creature をこうげきする"
    //% creature.defl=AiCreature.Zombie
    //% group="AI"
    export function actionAttack(creature: AiCreature): void {
        sendAiEvent("attack_creature", creatureKey(creature))
    }

    //% blockId=cmkai_action_wall block="AIエージェントの前に $block ブロックでかべをつくる"
    //% block.defl=AiBlock.OakLog
    //% group="AI"
    export function actionWall(block: AiBlock): void {
        sendAiEvent("wall_now", blockKey(block))
    }

    //% blockId=cmkai_action_heal block="アイテム $item でかいふくする"
    //% item.defl=AiFood.Apple
    //% group="AI"
    export function actionHeal(item: AiFood): void {
        sendAiEvent("heal_now", foodKey(item))
    }

    //% blockId=cmkai_return_agent block="AIエージェントを自分の場所にもどす"
    //% group="AI"
    export function returnAgent(): void {
        sendAiEvent("return_agent")
    }

    //% blockId=cmkai_creature_cow block="ウシ"
    //% group="しゅるい"
    export function cow(): AiCreature {
        return AiCreature.Cow
    }

    //% blockId=cmkai_creature_sheep block="ヒツジ"
    //% group="しゅるい"
    export function sheep(): AiCreature {
        return AiCreature.Sheep
    }

    //% blockId=cmkai_creature_pig block="ブタ"
    //% group="しゅるい"
    export function pig(): AiCreature {
        return AiCreature.Pig
    }

    //% blockId=cmkai_creature_chicken block="ニワトリ"
    //% group="しゅるい"
    export function chicken(): AiCreature {
        return AiCreature.Chicken
    }

    //% blockId=cmkai_creature_fox block="キツネ"
    //% group="しゅるい"
    export function fox(): AiCreature {
        return AiCreature.Fox
    }

    //% blockId=cmkai_creature_zombie block="ゾンビ"
    //% group="しゅるい"
    export function zombie(): AiCreature {
        return AiCreature.Zombie
    }

    //% blockId=cmkai_creature_villager block="村人"
    //% group="しゅるい"
    export function villager(): AiCreature {
        return AiCreature.Villager
    }
}

//% color="#D56B2D" weight=99 block="じっこう"
//% groups='["イベント", "さがす", "ゆうどう", "あつめる", "条件", "自動"]'
namespace ActionBlocks {
    //% blockId=cmkai_on_action block="じっこうする"
    //% blockAllowMultiple=1
    //% group="イベント"
    export function onAction(handler: () => void): void {
        loops.runInBackground(function () {
            sendAiEvent("action_start")
            loops.pause(200)
            handler()
        })
    }

    //% blockId=cmkai_on_command block="しじ $command をだしたとき"
    //% command.defl="go"
    //% blockAllowMultiple=1
    //% group="イベント"
    export function onCommand(command: string, handler: () => void): void {
        player.onChat(command, handler)
    }

    //% blockId=cmkai_find_creature block="いきもの $creature をさがす"
    //% creature.defl=AiCreature.Cow
    //% group="さがす"
    export function findCreature(creature: AiCreature): void {
        sendAiEvent("find_creature", creatureKey(creature))
    }

    //% blockId=cmkai_find_item block="アイテム $item をさがす"
    //% item.defl=AiFood.Apple
    //% group="さがす"
    export function findItem(item: AiFood): void {
        sendAiEvent("find_item", foodKey(item))
    }

    //% blockId=cmkai_find_block block="ブロック $block をさがす"
    //% block.defl=AiBlock.OakLog
    //% group="さがす"
    export function findBlock(block: AiBlock): void {
        sendAiEvent("find_block", blockKey(block))
    }

    //% blockId=cmkai_guide_creature block="いきもの $creature を $area にゆうどうする"
    //% creature.defl=AiCreature.Cow
    //% area.defl=AiArea.Area0
    //% group="ゆうどう"
    export function guideCreature(creature: AiCreature, area: AiArea): void {
        sendAiEvent("guide_creature", creatureKey(creature) + "|" + areaKey(area))
    }

    //% blockId=cmkai_collect_block block="ブロック $block を回収する"
    //% block.defl=AiBlock.OakLog
    //% group="あつめる"
    export function collectBlock(block: AiBlock): void {
        sendAiEvent("collect_block", blockKey(block))
    }

    //% blockId=cmkai_collect_item block="アイテム $item を回収する"
    //% item.defl=AiFood.Apple
    //% group="あつめる"
    export function collectItem(item: AiFood): void {
        sendAiEvent("collect_item", foodKey(item))
    }

    //% blockId=cmkai_if block="もし $condition なら"
    //% condition.shadow=cmkai_creature_was_found
    //% handlerStatement=1
    //% group="条件"
    export function ifCondition(condition: boolean, handler: () => void): void {
        if (condition) {
            handler()
        }
    }

    //% blockId=cmkai_health_at_most block="たいりょくが $health いかである"
    //% health.defl=10
    //% group="条件"
    export function healthAtMost(health: number): boolean {
        return player.execute("scoreboard players test @s ai_health 0 " + health)
    }

    //% blockId=cmkai_is_night block="いまはよるである"
    //% group="条件"
    export function isNight(): boolean {
        return player.execute("scoreboard players test @s ai_is_night 1 1")
    }

    //% blockId=cmkai_agent_item_count_at_least block="Agentが $item を $count こ いじょうもっている"
    //% item.defl=AiFood.Apple
    //% count.defl=1
    //% group="条件"
    export function agentItemCountAtLeast(item: AiFood, count: number): boolean {
        sendAiEvent("scan_agent_item", foodKey(item))
        return player.execute("scoreboard players test @s ai_agent_" + foodKey(item) + " " + count + " 2147483647")
    }

    //% blockId=cmkai_action_is_enabled block="アクション $name がONである"
    //% name.defl="とくべつこうげき"
    //% group="条件"
    export function actionIsEnabled(name: string): boolean {
        return player.execute("scoreboard players test @s " + actionObjectiveId(name) + " 1 1")
    }

    //% blockId=cmkai_item_was_found block="アイテム $item をみつけた"
    //% item.defl=AiFood.Apple
    //% group="条件"
    export function itemWasFound(item: AiFood): boolean {
        return player.execute("scoreboard players test @s ai_founditem_" + foodKey(item) + " 1 1")
    }

    //% blockId=cmkai_block_was_found block="ブロック $block をみつけた"
    //% block.defl=AiBlock.OakLog
    //% group="条件"
    export function blockWasFound(block: AiBlock): boolean {
        return player.execute("scoreboard players test @s ai_foundblock_" + blockKey(block) + " 1 1")
    }

    //% blockId=cmkai_creature_within_distance block="いきもの $creature が $distance ブロック以内にいる"
    //% creature.defl=AiCreature.Zombie
    //% distance.defl=5
    //% group="条件"
    export function creatureWithinDistance(creature: AiCreature, distance: number): boolean {
        sendAiEvent("scan_creature_distance", creatureKey(creature))
        return player.execute("scoreboard players test @s ai_dist_" + creatureKey(creature) + " 0 " + distance)
    }

    //% blockId=cmkai_creature_group_found block="生きものグループ $name を見つけた"
    //% name.defl="敵"
    //% group="条件"
    export function creatureGroupFound(name: string): boolean {
        sendAiEvent("scan_creature_group", name)
        return player.execute("scoreboard players test @s " + groupFoundObjectiveId("creature", name) + " 1 1")
    }

    //% blockId=cmkai_item_group_found block="アイテムグループ $name を見つけた"
    //% name.defl="おやつ"
    //% group="条件"
    export function itemGroupFound(name: string): boolean {
        sendAiEvent("scan_item_group", name)
        return player.execute("scoreboard players test @s " + groupFoundObjectiveId("item", name) + " 1 1")
    }

    //% blockId=cmkai_block_group_found block="ブロックグループ $name を見つけた"
    //% name.defl="木材"
    //% group="条件"
    export function blockGroupFound(name: string): boolean {
        sendAiEvent("scan_block_group", name)
        return player.execute("scoreboard players test @s " + groupFoundObjectiveId("block", name) + " 1 1")
    }

    //% blockId=cmkai_auto_run block="自動で実行する $name"
    //% name.defl="ぼうえい"
    //% handlerStatement=1
    //% group="自動"
    export function autoRun(name: string, handler: () => void): void {
        sendAiEvent("learn_action", name)
        loops.runInBackground(function () {
            while (true) {
                if (player.execute("scoreboard players test @s " + actionObjectiveId(name) + " 1 1")) {
                    handler()
                }
                loops.pause(20)
            }
        })
    }
}

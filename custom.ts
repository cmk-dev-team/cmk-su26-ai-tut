const aiActionHandlers: { [name: string]: () => void } = {}
const registeredCommands: { [command: string]: boolean } = {}

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

function itemKey(item: AiItem): string {
    if (item == AiItem.Steak) {
        return "steak"
    } else if (item == AiItem.CookedChicken) {
        return "cooked_chicken"
    } else if (item == AiItem.CookedMutton) {
        return "cooked_mutton"
    } else if (item == AiItem.CookedPorkchop) {
        return "cooked_porkchop"
    } else if (item == AiItem.Cake) {
        return "cake"
    } else if (item == AiItem.Cookie) {
        return "cookie"
    } else if (item == AiItem.Bread) {
        return "bread"
    }
    return "apple"
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

function directionKey(direction: AiDirection): string {
    if (direction == AiDirection.Back) {
        return "back"
    } else if (direction == AiDirection.Left) {
        return "left"
    } else if (direction == AiDirection.Right) {
        return "right"
    }
    return "front"
}

function wallMaterialTypeId(material: AiWallMaterial): string {
    if (material == AiWallMaterial.Stone) {
        return "minecraft:cobblestone"
    }
    return "minecraft:oak_planks"
}

function hashActionName(name: string): string {
    let hash = 5381
    for (let i = 0; i < name.length; i++) {
        hash = ((hash * 33) ^ name.charCodeAt(i)) >>> 0
    }
    return "" + hash
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

enum AiItem {
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

enum AiArea {
    //% block="エリア1"
    Area1 = 1,
    //% block="エリア2"
    Area2 = 2,
    //% block="エリア3"
    Area3 = 3,
    //% block="エリア4"
    Area4 = 4,
    //% block="エリア5"
    Area5 = 5,
    //% block="エリア6"
    Area6 = 6,
    //% block="エリア7"
    Area7 = 7,
    //% block="エリア8"
    Area8 = 8,
    //% block="エリア9"
    Area9 = 9,
    //% block="エリア10"
    Area10 = 10
}

enum AiToggle {
    //% block="ON"
    On = 0,
    //% block="OFF"
    Off = 1
}

enum AiCompare {
    //% block="おおい"
    More = 0,
    //% block="すくない"
    Less = 1
}

enum AiDirection {
    //% block="まえ"
    Front = 0,
    //% block="うしろ"
    Back = 1,
    //% block="ひだり"
    Left = 2,
    //% block="みぎ"
    Right = 3
}

enum AiWallMaterial {
    //% block="木"
    Wood = 0,
    //% block="石"
    Stone = 1
}

//% color="#2F7D4E" weight=100 block="がくしゅう"
//% groups='["せってい", "がくしゅう", "グループ"]'
namespace LearningBlocks {
    //% blockId=cmkai_set_ai_name block="AIのなまえを $name にする"
    //% name.defl="アイ"
    //% group="せってい"
    export function setAiName(name: string): void {
        sendAiEvent("set_name", name)
    }

    //% blockId=cmkai_set_area_self block="自分の座標をエリア $area にせっていする"
    //% area.defl=AiArea.Area1
    //% group="せってい"
    export function setAreaToSelf(area: AiArea): void {
        sendAiEvent("set_area_self", "" + area)
    }

    //% blockId=cmkai_learn_creature block="いきもの $creature を学習させる"
    //% creature.defl=AiCreature.Cow
    //% group="がくしゅう"
    export function learnCreature(creature: AiCreature): void {
        sendAiEvent("learn_creature", creatureKey(creature))
    }

    //% blockId=cmkai_learn_item block="アイテム $item を学習させる"
    //% item.defl=AiItem.Apple
    //% group="がくしゅう"
    export function learnItem(item: AiItem): void {
        sendAiEvent("learn_item", itemKey(item))
    }

    //% blockId=cmkai_learn_block block="ブロック $block を学習させる"
    //% block.defl=AiBlock.OakLog
    //% group="がくしゅう"
    export function learnBlock(block: AiBlock): void {
        sendAiEvent("learn_block", blockKey(block))
    }

    //% blockId=cmkai_learn_creature_group block="いきものグループ $name をつくる"
    //% name.defl="かちく"
    //% blockAllowMultiple=1
    //% group="グループ"
    export function createCreatureGroup(name: string, handler: () => void): void {
        sendAiEvent("group_context_start", "creature|" + name)
        handler()
        sendAiEvent("group_context_end")
    }

    //% blockId=cmkai_learn_item_group block="アイテムグループ $name をつくる"
    //% name.defl="たべもの"
    //% blockAllowMultiple=1
    //% group="グループ"
    export function createItemGroup(name: string, handler: () => void): void {
        sendAiEvent("group_context_start", "item|" + name)
        handler()
        sendAiEvent("group_context_end")
    }

    //% blockId=cmkai_learn_block_group block="ブロックグループ $name をつくる"
    //% name.defl="もくざい"
    //% blockAllowMultiple=1
    //% group="グループ"
    export function createBlockGroup(name: string, handler: () => void): void {
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
    //% item.defl=AiItem.Apple
    //% group="グループ"
    export function groupAddItem(item: AiItem): void {
        sendAiEvent("group_add_member", "item|" + itemKey(item))
    }

    //% blockId=cmkai_group_add_block block="ブロック $block"
    //% block.defl=AiBlock.OakLog
    //% group="グループ"
    export function groupAddBlock(block: AiBlock): void {
        sendAiEvent("group_add_member", "block|" + blockKey(block))
    }
}

//% color="#3E6E9E" weight=99 block="AI"
//% groups='["きのう", "じょうけん"]'
namespace AiBlocks {
    //% blockId=cmkai_learn_action block="AIのきのう $name をつくる"
    //% name.defl="とくべつこうげき"
    //% blockAllowMultiple=1
    //% group="きのう"
    export function learnAction(name: string, handler: () => void): void {
        aiActionHandlers[name] = handler
        sendAiEvent("learn_action", name)
        sendAiEvent("set_action_enabled", name + "|on")
    }

    //% blockId=cmkai_run_action block="AIのきのう $name を実行する"
    //% name.defl="とくべつこうげき"
    //% group="きのう"
    export function runAction(name: string): void {
        if (!player.execute("scoreboard players test @s " + actionObjectiveId(name) + " 1 1")) {
            return
        }
        const handler = aiActionHandlers[name]
        if (handler) {
            handler()
        }
    }

    //% blockId=cmkai_set_ai_speech block="AIにセリフ $message をせっていする"
    //% message.defl="こんにちは"
    //% group="きのう"
    export function setAiSpeech(message: string): void {
        sendAiEvent("set_speech", message)
    }

    //% blockId=cmkai_if block="もし $condition なら"
    //% condition.shadow=cmkai_creature_was_found
    //% handlerStatement=1
    //% group="じょうけん"
    export function ifCondition(condition: boolean, handler: () => void): void {
        if (condition) {
            handler()
        }
    }

    //% blockId=cmkai_creature_was_found block="いきもの $creature をみつけた"
    //% creature.defl=AiCreature.Cow
    //% group="じょうけん"
    export function creatureWasFound(creature: AiCreature): boolean {
        return player.execute("scoreboard players test @s ai_found_" + creatureKey(creature) + " 1 1")
    }

    //% blockId=cmkai_item_was_found block="アイテム $item をみつけた"
    //% item.defl=AiItem.Apple
    //% group="じょうけん"
    export function itemWasFound(item: AiItem): boolean {
        return player.execute("scoreboard players test @s ai_founditem_" + itemKey(item) + " 1 1")
    }

    //% blockId=cmkai_block_was_found block="ブロック $block をみつけた"
    //% block.defl=AiBlock.OakLog
    //% group="じょうけん"
    export function blockWasFound(block: AiBlock): boolean {
        return player.execute("scoreboard players test @s ai_foundblock_" + blockKey(block) + " 1 1")
    }

    //% blockId=cmkai_item_group_found block="アイテムグループ $name にいっちする"
    //% name.defl="たべもの"
    //% group="じょうけん"
    export function itemGroupFound(name: string): boolean {
        sendAiEvent("scan_item_group", name)
        return player.execute("scoreboard players test @s " + groupFoundObjectiveId("item", name) + " 1 1")
    }

    //% blockId=cmkai_creature_group_found block="いきものグループ $name にいっちする"
    //% name.defl="かちく"
    //% group="じょうけん"
    export function creatureGroupFound(name: string): boolean {
        sendAiEvent("scan_creature_group", name)
        return player.execute("scoreboard players test @s " + groupFoundObjectiveId("creature", name) + " 1 1")
    }

    //% blockId=cmkai_block_group_found block="ブロックグループ $name にいっちする"
    //% name.defl="もくざい"
    //% group="じょうけん"
    export function blockGroupFound(name: string): boolean {
        sendAiEvent("scan_block_group", name)
        return player.execute("scoreboard players test @s " + groupFoundObjectiveId("block", name) + " 1 1")
    }

    //% blockId=cmkai_health_compare block="たいりょくが $health より $compare"
    //% health.defl=10
    //% compare.defl=AiCompare.More
    //% group="じょうけん"
    export function healthCompare(health: number, compare: AiCompare): boolean {
        if (compare == AiCompare.Less) {
            return player.execute("scoreboard players test @s ai_health 0 " + (health - 1))
        }
        return player.execute("scoreboard players test @s ai_health " + (health + 1) + " 2147483647")
    }
}

//% color="#C29A2E" weight=98 block="じっこう"
//% groups='["イベント", "せってい"]'
namespace ExecBlocks {
    //% blockId=cmkai_on_command block="チャットコマンド $command を入力したとき"
    //% command.defl="go"
    //% blockAllowMultiple=1
    //% group="イベント"
    export function onCommand(command: string, handler: () => void): void {
        if (registeredCommands[command]) {
            return
        }
        registeredCommands[command] = true
        player.onChat(command, handler)
    }

    //% blockId=cmkai_auto_run block="じどうでじっこうする"
    //% handlerStatement=1
    //% blockAllowMultiple=1
    //% group="イベント"
    export function autoRun(handler: () => void): void {
        loops.runInBackground(function () {
            while (true) {
                handler()
                loops.pause(20)
            }
        })
    }

    //% blockId=cmkai_set_action_enabled block="AI $name のきのうを $enabled にする"
    //% name.defl="とくべつこうげき"
    //% enabled.defl=AiToggle.On
    //% group="せってい"
    export function setActionEnabled(name: string, enabled: AiToggle): void {
        sendAiEvent("set_action_enabled", name + "|" + (enabled == AiToggle.On ? "on" : "off"))
    }
}

//% color="#D56B2D" weight=97 block="アクション"
//% groups='["エージェント", "さがす", "こうどう", "あつめる", "かべ"]'
namespace ActionBlocks {
    //% blockId=cmkai_return_agent block="AIエージェントを自分の場所にもどす"
    //% group="エージェント"
    export function returnAgent(): void {
        sendAiEvent("return_agent")
    }

    //% blockId=cmkai_find_creature block="いきもの $creature をさがす"
    //% creature.defl=AiCreature.Cow
    //% group="さがす"
    export function findCreature(creature: AiCreature): void {
        sendAiEvent("find_creature", creatureKey(creature))
    }

    //% blockId=cmkai_find_block block="ブロック $block をさがす"
    //% block.defl=AiBlock.OakLog
    //% group="さがす"
    export function findBlock(block: AiBlock): void {
        sendAiEvent("find_block", blockKey(block))
    }

    //% blockId=cmkai_find_item block="アイテム $item をさがす"
    //% item.defl=AiItem.Apple
    //% group="さがす"
    export function findItem(item: AiItem): void {
        sendAiEvent("find_item", itemKey(item))
    }

    //% blockId=cmkai_action_attack block="いきもの $creature をこうげきする"
    //% creature.defl=AiCreature.Zombie
    //% group="こうどう"
    export function actionAttack(creature: AiCreature): void {
        sendAiEvent("attack_creature", creatureKey(creature))
    }

    //% blockId=cmkai_action_repel block="いきもの $creature をおいはらう"
    //% creature.defl=AiCreature.Zombie
    //% group="こうどう"
    export function actionRepel(creature: AiCreature): void {
        sendAiEvent("repel_creature", creatureKey(creature))
    }

    //% blockId=cmkai_guide_creature block="いきもの $creature をエリア $area へつれていく"
    //% creature.defl=AiCreature.Cow
    //% area.defl=AiArea.Area1
    //% group="こうどう"
    export function guideCreature(creature: AiCreature, area: AiArea): void {
        sendAiEvent("guide_creature", creatureKey(creature) + "|" + area)
    }

    //% blockId=cmkai_collect_block block="ブロック $block をあつめる"
    //% block.defl=AiBlock.OakLog
    //% group="あつめる"
    export function collectBlock(block: AiBlock): void {
        sendAiEvent("collect_block", blockKey(block))
    }

    //% blockId=cmkai_collect_item block="アイテム $item をあつめる"
    //% item.defl=AiItem.Apple
    //% group="あつめる"
    export function collectItem(item: AiItem): void {
        sendAiEvent("collect_item", itemKey(item))
    }

    //% blockId=cmkai_action_wall block="AIエージェントの $direction に $material ブロックでかべをつくる"
    //% direction.defl=AiDirection.Front
    //% material.defl=AiWallMaterial.Wood
    //% group="かべ"
    export function actionWall(direction: AiDirection, material: AiWallMaterial): void {
        sendAiEvent("wall_now", wallMaterialTypeId(material) + "|" + directionKey(direction))
    }
}

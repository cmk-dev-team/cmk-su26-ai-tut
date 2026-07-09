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

function itemKey(item: AiItem): string {
    if (item == AiItem.BirchLog) {
        return "birch_log"
    } else if (item == AiItem.SpruceLog) {
        return "spruce_log"
    } else if (item == AiItem.JungleLog) {
        return "jungle_log"
    } else if (item == AiItem.AcaciaLog) {
        return "acacia_log"
    } else if (item == AiItem.Apple) {
        return "apple"
    } else if (item == AiItem.Steak) {
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
    return "oak_log"
}

function itemCategoryKey(category: AiItemCategory): string {
    if (category == AiItemCategory.Food) {
        return "food"
    } else if (category == AiItemCategory.Creature) {
        return "creature"
    }
    return "wood"
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

enum AiCreature {
    //% block="ウシ"
    Cow = 0,
    //% block="ヒツジ"
    Sheep = 1,
    //% block="ブタ"
    Pig = 2,
    //% block="ニワトリ"
    Chicken = 3
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

enum AiItem {
    //% block="オークの原木"
    OakLog = 0,
    //% block="シラカバの原木"
    BirchLog = 1,
    //% block="トウヒの原木"
    SpruceLog = 2,
    //% block="ジャングルの原木"
    JungleLog = 3,
    //% block="アカシアの原木"
    AcaciaLog = 4,
    //% block="りんご"
    Apple = 5,
    //% block="ステーキ"
    Steak = 6,
    //% block="焼き鳥"
    CookedChicken = 7,
    //% block="焼いた羊肉"
    CookedMutton = 8,
    //% block="焼き豚"
    CookedPorkchop = 9,
    //% block="ケーキ"
    Cake = 10,
    //% block="クッキー"
    Cookie = 11,
    //% block="パン"
    Bread = 12
}

enum AiItemCategory {
    //% block="木材"
    Wood = 0,
    //% block="食べ物"
    Food = 1,
    //% block="生き物"
    Creature = 2
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

//% color="#2F7D4E" weight=100 block="がくしゅう"
//% groups='["イベント", "せってい", "がくしゅう", "ぶんるい", "パズル", "条件", "AI", "しゅるい"]'
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

    //% blockId=cmkai_learn_creature block="いきもの $creature をがくしゅうする"
    //% creature.defl=AiCreature.Cow
    //% group="がくしゅう"
    export function learnCreature(creature: AiCreature): void {
        sendAiEvent("learn_creature", creatureKey(creature))
    }

    //% blockId=cmkai_learn_item block="アイテム $item をがくしゅうする"
    //% item.defl=AiItem.OakLog
    //% group="がくしゅう"
    export function learnItem(item: AiItem): void {
        sendAiEvent("learn_item", itemKey(item))
    }

    //% blockId=cmkai_classify_items block="アイテムを $category にぶんるい"
    //% category.defl=AiItemCategory.Wood
    //% handlerStatement=1
    //% group="ぶんるい"
    export function classifyItems(category: AiItemCategory, handler: () => void): void {
        sendAiEvent("learn_category", itemCategoryKey(category))
        handler()
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
}

//% color="#D56B2D" weight=99 block="じっこう"
//% groups='["イベント", "さがす", "ゆうどう", "あつめる", "条件"]'
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

    //% blockId=cmkai_guide_creature block="いきもの $creature を $area にゆうどうする"
    //% creature.defl=AiCreature.Cow
    //% area.defl=AiArea.Area0
    //% group="ゆうどう"
    export function guideCreature(creature: AiCreature, area: AiArea): void {
        sendAiEvent("guide_creature", creatureKey(creature) + "|" + areaKey(area))
    }

    //% blockId=cmkai_collect_wood block="木材をあつめてもらう"
    //% group="あつめる"
    export function collectWood(): void {
        sendAiEvent("collect_wood")
    }

    //% blockId=cmkai_collect_item block="アイテム $item をあつめてもらう"
    //% item.defl=AiItem.Apple
    //% group="あつめる"
    export function collectItem(item: AiItem): void {
        sendAiEvent("collect_item", itemKey(item))
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

}

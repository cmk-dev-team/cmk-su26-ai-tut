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

//% color="#2F7D4E" weight=100 block="がくしゅう"
//% groups='["イベント", "せってい", "がくしゅう", "しゅるい"]'
namespace LearningBlocks {
    //% blockId=cmkai_on_learning block="がくしゅうする"
    //% blockAllowMultiple=1
    //% group="イベント"
    export function onLearning(handler: () => void): void {
        loops.runInBackground(function () {
            sendAiEvent("learning_start")
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
//% groups='["イベント", "さがす", "ゆうどう", "条件", "AI"]'
namespace ActionBlocks {
    //% blockId=cmkai_on_action block="じっこうする"
    //% blockAllowMultiple=1
    //% group="イベント"
    export function onAction(handler: () => void): void {
        loops.runInBackground(function () {
            sendAiEvent("action_start")
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

    //% blockId=cmkai_if block="もし $condition なら"
    //% condition.shadow=cmkai_creature_was_found
    //% handlerStatement=1
    //% group="条件"
    export function ifCondition(condition: boolean, handler: () => void): void {
        if (condition) {
            handler()
        }
    }

    //% blockId=cmkai_on_creature_found block="いきもの $creature をみつけたとき"
    //% creature.defl=AiCreature.Cow
    //% blockAllowMultiple=1
    //% group="イベント"
    export function onCreatureFound(creature: AiCreature, handler: () => void): void {
        loops.runInBackground(function () {
            let wasFound = false
            while (true) {
                sendAiEvent("scan_creature", creatureKey(creature))
                loops.pause(100)

                const found = creatureWasFound(creature)
                if (found && !wasFound) {
                    handler()
                }
                wasFound = found

                loops.pause(250)
            }
        })
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
}

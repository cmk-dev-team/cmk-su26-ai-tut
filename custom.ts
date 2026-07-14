// Chat sent through this block is prefixed so the external AI server can
// tell it apart from normal player-to-player chat (which it must ignore) —
// see cmk-su26-ai-server's src/handlers/playerMessage.js.
const AI_CHAT_PREFIX = "!ai:"

// A distinct marker from AI_CHAT_PREFIX on purpose: this is a deliberate
// "teach" action handled server-side without going through the LLM at all,
// so using this block always, reliably increases the AI's known-facts count
// — a clear cause-and-effect a chat message left to the model's judgment
// can't guarantee.
const AI_TEACH_PREFIX = "!teach:"

//% color="#3E6E9E" weight=100 block="AI"
namespace AiBlocks {
    //% blockId=cmkai_chat block="AIとチャットする「%message」"
    //% message.defl=""
    export function chat(message: string): void {
        player.execute("say " + AI_CHAT_PREFIX + message)
    }

    //% blockId=cmkai_teach block="AIに教える「%fact」"
    //% fact.defl=""
    export function teach(fact: string): void {
        player.execute("say " + AI_TEACH_PREFIX + fact)
    }
}

// Chat sent through this block is prefixed so the external AI server can
// tell it apart from normal player-to-player chat (which it must ignore) —
// see cmk-su26-ai-server's src/handlers/playerMessage.js.
const AI_CHAT_PREFIX = "!ai:"

//% color="#3E6E9E" weight=100 block="AI"
namespace AiBlocks {
    //% blockId=cmkai_chat block="AIとチャットする「%message」"
    //% message.defl=""
    export function chat(message: string): void {
        player.execute("say " + AI_CHAT_PREFIX + message)
    }
}

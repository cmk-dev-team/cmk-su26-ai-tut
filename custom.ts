// Chat sent through this block is prefixed so the external AI server can
// tell it apart from normal player-to-player chat (which it must ignore) —
// see cmk-su26-ai-server's src/handlers/playerMessage.js.
const AI_CHAT_PREFIX = "!ai:"

// A distinct marker from AI_CHAT_PREFIX on purpose: this is a deliberate
// "teach" action handled server-side without going through the LLM at all,
// so using this block always, reliably increases the AI's known-facts count
// — a clear cause-and-effect a chat message left to the model's judgment
// can't guarantee. Freeform facts (personality/character) only — building
// rules use the category-specific blocks/prefixes below instead.
const AI_TEACH_PREFIX = "!teach:"

// Category-specific teach markers. Each writes a structured, enum-validated
// value into a specific playerProfiles house/building field (see
// cmk-su26-ai-server's src/handlers/playerMessage.js and
// src/memory/buildingVocabulary.js, which must stay in sync with the enum
// member names below — the string sent here is the vocabulary key).
const AI_TEACH_WALL_PREFIX = "!teach_wall:"
const AI_TEACH_ROOF_PREFIX = "!teach_roof:"
const AI_TEACH_WINDOW_PREFIX = "!teach_window:"
const AI_TEACH_DECORATION_PREFIX = "!teach_decoration:"
const AI_TEACH_BUILDING_SIZE_PREFIX = "!teach_building_size:"
const AI_TEACH_WINDOW_PATTERN_PREFIX = "!teach_window_pattern:"
const AI_TEACH_ROOFTOP_PREFIX = "!teach_rooftop:"

enum WallMaterial {
    //% block="木材"
    wood = 0,
    //% block="石"
    stone = 1,
    //% block="コンクリート"
    concrete = 2,
    //% block="羊毛"
    wool = 3,
}

enum RoofShape {
    //% block="三角"
    triangle = 0,
    //% block="フラット"
    flat = 1,
}

enum BuildColor {
    //% block="赤"
    red = 0,
    //% block="青"
    blue = 1,
    //% block="緑"
    green = 2,
    //% block="白"
    white = 3,
    //% block="黄色"
    yellow = 4,
}

enum WindowSize {
    //% block="小さめ"
    small = 0,
    //% block="ふつう"
    normal = 1,
    //% block="大きめ"
    large = 2,
}

enum Decoration {
    //% block="なし"
    none = 0,
    //% block="花"
    flower = 1,
    //% block="たいまつ"
    torch = 2,
    //% block="看板"
    sign = 3,
}

enum WindowPattern {
    //% block="等間隔"
    even = 0,
    //% block="フロアごとに繰り返し"
    per_floor = 1,
}

enum RooftopStyle {
    //% block="貯水タンク"
    tank = 0,
    //% block="柵"
    fence = 1,
    //% block="なし"
    none = 2,
}

//% color="#3E6E9E" weight=100 block="AI"
namespace AiBlocks {
    //% blockId=cmkai_chat block="AIとチャットする「%message」" group="基本"
    //% message.defl=""
    export function chat(message: string): void {
        player.execute("say " + AI_CHAT_PREFIX + message)
    }

    //% blockId=cmkai_teach block="AIに教える「%fact」" group="基本"
    //% fact.defl=""
    export function teach(fact: string): void {
        player.execute("say " + AI_TEACH_PREFIX + fact)
    }

    //% blockId=cmkai_teach_wall block="AIに壁の素材を教える「%material」" group="家"
    export function teachWallMaterial(material: WallMaterial): void {
        player.execute("say " + AI_TEACH_WALL_PREFIX + WallMaterial[material])
    }

    //% blockId=cmkai_teach_roof block="AIに屋根を教える 形「%shape」色「%color」" group="家"
    export function teachRoof(shape: RoofShape, color: BuildColor): void {
        player.execute("say " + AI_TEACH_ROOF_PREFIX + RoofShape[shape] + "," + BuildColor[color])
    }

    //% blockId=cmkai_teach_window block="AIに窓を教える「%size」" group="家"
    export function teachWindow(size: WindowSize): void {
        player.execute("say " + AI_TEACH_WINDOW_PREFIX + WindowSize[size])
    }

    //% blockId=cmkai_teach_decoration block="AIに装飾を教える「%deco」" group="家"
    export function teachDecoration(deco: Decoration): void {
        player.execute("say " + AI_TEACH_DECORATION_PREFIX + Decoration[deco])
    }

    //% blockId=cmkai_teach_building_size block="AIにビルの大きさを教える 階数「%floors」横幅「%width」" group="ビル"
    //% floors.min=1 floors.max=6 floors.defl=3
    //% width.min=4 width.max=16 width.defl=8
    export function teachBuildingSize(floors: number, width: number): void {
        player.execute("say " + AI_TEACH_BUILDING_SIZE_PREFIX + floors + "," + width)
    }

    //% blockId=cmkai_teach_window_pattern block="AIに窓の規則性を教える「%pattern」" group="ビル"
    export function teachWindowPattern(pattern: WindowPattern): void {
        player.execute("say " + AI_TEACH_WINDOW_PATTERN_PREFIX + WindowPattern[pattern])
    }

    //% blockId=cmkai_teach_rooftop block="AIに屋上を教える「%rooftop」" group="ビル"
    export function teachRooftop(rooftop: RooftopStyle): void {
        player.execute("say " + AI_TEACH_ROOFTOP_PREFIX + RooftopStyle[rooftop])
    }
}

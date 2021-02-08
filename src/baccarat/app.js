var BgLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.winSize
        var bgLayer = cc.LayerColor.create(cc.color(49, 91, 158), size.width, size.height)
        this.addChild(bgLayer)
    }
})

var BaccaratGameLayer = cc.Layer.extend({
    btnwrapSprite_zOrder: 1,
    alert_zOrder: 100,
    header_height: null,

    serail_num_panel: null,
    serial_num: [],

    cardCountVal: null,
    cardCountVal_num: null,

    wenluPanel: null,
    wenluPanel_zOrder: 8,
    wenluPanel_enabled: false,
    zhupanluScrollView: null,
    zhupanluBtn: null,
    daluScrollView: null,
    daluBtn: null,

    banner_height: null,
    historyBtn: null,
    goHomeBtn: null,
    infoText: null,
    helpBtn: null,
    soundOnBtn: null,
    enableSoundOn: true,

    btnwrapSprite_y_delta: null,
    btnwrapSprite_height: null,

    circleColors: [],

    cards: [],
    card_width: 50,
    cardBackSprite: [],
    resultCards: [],
    resultCardsIndexArray: [],
    cloneCards: [],

    gamePanel_height: null,
    panelArea1: null,
    panelArea2: null,
    panelArea3: null,
    panelArea4: null,
    panelArea5: null,
    panelArea6: null,
    panelArea7: null,
    panel1_DealedCoins: [],
    panel2_DealedCoins: [],
    panel3_DealedCoins: [],
    panel4_DealedCoins: [],
    panel5_DealedCoins: [],
    panel6_DealedCoins: [],
    panel7_DealedCoins: [],
    panel1_ValRoundRect_Label: null,
    panel2_ValRoundRect_Label: null,
    panel3_ValRoundRect_Label: null,
    panel4_ValRoundRect_Label: null,
    panel5_ValRoundRect_Label: null,
    panel6_ValRoundRect_Label: null,
    panel7_ValRoundRect_Label: null,
    panel1_ValRoundRect: null,
    panel2_ValRoundRect: null,
    panel3_ValRoundRect: null,
    panel4_ValRoundRect: null,
    panel5_ValRoundRect: null,
    panel6_ValRoundRect: null,
    panel7_ValRoundRect: null,

    dealedCoins_tag: 1,


    betAmountBg_height_delta: null,
    betAmountTokenVal: null,
    betAmountToken_RoundRect: null,

    cancelBtn: null,
    confirmBtn: null,

    coin_width: null,
    coinImages: [],
    coins: [],
    enabledCoin: [],

    enabledCoinDrop: true,

    close_state: false,
    open_state: true,

    overLay_zOrder: 2,

    coinDealCheckDlg_overLay: null,
    coinDealCheckDlg: null,
    coinDealCheckDlgYesBtn: null,
    coinDealCheckDlgNoBtn: null,

    checkSuccessDlg_overLay: null,
    checkSuccessDlg: null,

    dealCancelDlg_overLay: null,
    dealCancelDlg: null,

    ctor: function () {
        this._super()
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20

        this.panel1_DealedCoins = []
        this.panel2_DealedCoins = []
        this.panel3_DealedCoins = []
        this.panel4_DealedCoins = []
        this.panel5_DealedCoins = []
        this.panel6_DealedCoins = []
        this.panel7_DealedCoins = []
        this.enabledCoin.fill(false)

        // game bgsound play
        cc.audioEngine.playMusic(res.gameBgSound_mp3, true)
        cc.audioEngine.setMusicVolume(0.5)

        // load circle color image using batchNode
        var circleColors_cache = cc.spriteFrameCache.addSpriteFrames(res.circle_color_plist)
        var circleColors_sheet = new cc.SpriteBatchNode(res.circle_color_png)
        for (let index = 0; index < 10; index++) {
            var circleColors_name = "circle-color-" + index + ".png"
            var circleColors_frame = cc.spriteFrameCache.getSpriteFrame(circleColors_name)
            this.circleColors.push(circleColors_frame)
        }

        // store card image using batchNode
        var cardType = ["C", "D", "H", "S"]
        var cardWidth = 50
        this.cards = []
        var card_cache = cc.spriteFrameCache.addSpriteFrames(res.card_sheet_plist)
        var card_sheet = new cc.SpriteBatchNode(res.card_sheet_png)
        for (let index = 0; index < 13; index++) {
            for (let indexi = 0; indexi < cardType.length; indexi++) {
                var cardName = "card" + (index + 1).toString() + cardType[indexi] + ".png"
                var card_frame = cc.spriteFrameCache.getSpriteFrame(cardName)
                this.cards.push(card_frame)
            }
        }

        // header
        this.header_height = 40
        var headerBg = cc.LayerColor.create(cc.color(30, 101, 165), size.width, this.header_height)
        headerBg.attr({
            x: 0,
            y: size.height - this.header_height
        })
        this.addChild(headerBg);

        setTimeout(() => {
            this.displaySerialPanel()
        }, 1000);

        var num_period_font_size = 13
        var num_period_label = new cc.LabelTTF.create("期数", "Arial", num_period_font_size)
        var num_period_value = new cc.LabelTTF.create("31071466-1", "Arial", num_period_font_size)
        num_period_label.attr({
            x: size.width - paddingX / 4 - num_period_label.getContentSize().width / 2 - num_period_value.getContentSize().width,
            y: size.height - this.header_height / 2 - 2,
            fillStyle: cc.color(233, 133, 62)
        })
        this.addChild(num_period_label)
        num_period_value.attr({
            x: size.width - num_period_value.getContentSize().width / 2 - paddingX / 4,
            y: size.height - this.header_height / 2 - 2,
            fillStyle: cc.color(255, 255, 255)
        })
        this.addChild(num_period_value)

        // footer variable
        this.coinWrapSprite_height = 70
        this.betAmountBg_height = 50
        this.betAmountBg_height_delta = 20



        // banner Part
        var bannerSprite = new cc.Sprite(baccarat_res.banner_png)
        var bannerSprite_height = size.width / bannerSprite.getContentSize().width * bannerSprite.getContentSize().height
        bannerSprite.attr({
            x: size.width / 2,
            y: size.height - bannerSprite_height / 2 - this.header_height,
            scaleX: size.width / bannerSprite.getContentSize().width,
            scaleY: size.width / bannerSprite.getContentSize().width
        })
        this.banner_height = bannerSprite_height
        var bannerBg = new cc.LayerColor(cc.color(0, 0, 0), size.width, this.banner_height)
        bannerBg.setPosition(cc.p(0, size.height - this.header_height - this.banner_height))
        this.addChild(bannerBg)
        this.addChild(bannerSprite)

        this.wenluBtn = new ccui.Button(res.wenlu_btn_png, res.wenlu_btn_png, res.wenlu_btn_png)
        var wenluBtn_width = 26
        this.wenluBtn.attr({
            pressedActionEnabled: true,
            scaleX: wenluBtn_width / this.wenluBtn.getContentSize().width,
            scaleY: wenluBtn_width / this.wenluBtn.getContentSize().width,
            x: wenluBtn_width / 2,
            y: size.height - this.header_height - this.banner_height / 2 + 10
        })
        this.wenluBtn.addTouchEventListener(this.showWenluPanel, this)
        this.addChild(this.wenluBtn, this.wenluPanel_zOrder + 1)

        this.historyBtn = new ccui.Button(res.history_btn_png, res.history_btn_png, res.history_btn_png)
        var historyBtn_width = 26
        this.historyBtn.attr({
            pressedActionEnabled: true,
            scaleX: historyBtn_width / this.historyBtn.getContentSize().width,
            scaleY: historyBtn_width / this.historyBtn.getContentSize().width
        })
        this.historyBtn.setPosition(cc.p(size.width - historyBtn_width / 2, size.height - this.header_height - this.banner_height / 2 + 10))
        this.historyBtn.setZoomScale(0.05)
        this.historyBtn.addTouchEventListener(this.showHistory, this)
        this.addChild(this.historyBtn)

        // card count added
        var cardCountSprite = new cc.Sprite(baccarat_res.card_count_png)
        var cardCountSprite_width = 35
        cardCountSprite.attr({
            scaleX: cardCountSprite_width / cardCountSprite.getContentSize().width,
            scaleY: cardCountSprite_width / cardCountSprite.getContentSize().height,
            x: paddingX / 4 + cardCountSprite_width / 2,
            y: size.height - this.header_height - paddingY
        })
        this.addChild(cardCountSprite)
        this.cardCountVal_num = 156
        this.cardCountVal = new cc.LabelTTF(this.cardCountVal_num + "/" + 8 * 52, "Arial", 15)
        this.cardCountVal.attr({
            fillStyle: cc.color(255, 255, 255),
            x: this.cardCountVal.getContentSize().width / 2 + paddingX / 4 + cardCountSprite_width,
            y: size.height - this.header_height - paddingY
        })
        this.addChild(this.cardCountVal)

        // btnwrap sprite
        var btnwrapSprite = new cc.Sprite(res.btn_wrap_png)
        var btnwrapSprite_width = size.width
        this.btnwrapSprite_height = btnwrapSprite_width / btnwrapSprite.getContentSize().width * btnwrapSprite.getContentSize().height
        this.btnwrapSprite_y_delta = 10
        btnwrapSprite.attr({
            scaleX: btnwrapSprite_width / btnwrapSprite.getContentSize().width,
            scaleY: btnwrapSprite_width / btnwrapSprite.getContentSize().width,
            x: btnwrapSprite_width / 2,
            y: size.height - this.btnwrapSprite_height / 2 - this.header_height - this.banner_height + this.btnwrapSprite_y_delta
        })
        this.addChild(btnwrapSprite, this.btnwrapSprite_zOrder)

        this.goHomeBtn = new ccui.Button(res.home_btn_png, res.home_btn_png, res.home_btn_png)
        var goHomeBtn_width = 60
        var goHomeBtn_height = goHomeBtn_width / this.goHomeBtn.getContentSize().width * this.goHomeBtn.getContentSize().height
        this.goHomeBtn.attr({
            pressedActionEnabled: true,
            x: size.width / 6,
            y: size.height - goHomeBtn_height / 2 - this.header_height - this.banner_height + this.btnwrapSprite_y_delta,
            scaleX: goHomeBtn_width / this.goHomeBtn.getContentSize().width,
            scaleY: goHomeBtn_width / this.goHomeBtn.getContentSize().width,
            pressedActionEnabled: true
        })
        this.goHomeBtn.addTouchEventListener(this.gotoHome, this)
        this.addChild(this.goHomeBtn, this.btnwrapSprite_zOrder)

        this.infoText = new cc.LabelTTF("距封盘时间 00:20", "Arial", 13)
        this.infoText.attr({
            x: size.width / 2,
            y: size.height - this.header_height - this.banner_height - this.infoText.getContentSize().height / 2,
            fillStyle: cc.color(205, 160, 58),
        })
        this.addChild(this.infoText, this.btnwrapSprite_zOrder)

        this.helpBtn = new ccui.Button(res.help_btn_png)
        var helpBtn_height = 30
        this.helpBtn.attr({
            pressedActionEnabled: true,
            x: size.width - 40,
            y: size.height - this.header_height - this.banner_height - 5,
            scaleX: helpBtn_height / this.helpBtn.getContentSize().height,
            scaleY: helpBtn_height / this.helpBtn.getContentSize().height,
        })
        this.helpBtn.addTouchEventListener(this.showHelp, this)
        this.addChild(this.helpBtn, this.btnwrapSprite_zOrder)

        this.soundOnBtn = new ccui.Button(res.sound_on_btn_png)
        var soundOnBtn_height = 30
        this.soundOnBtn.attr({
            pressedActionEnabled: true,
            x: size.width - 80,
            y: size.height - this.header_height - this.banner_height - 5,
            scaleX: soundOnBtn_height / this.soundOnBtn.getContentSize().width,
            scaleY: soundOnBtn_height / this.soundOnBtn.getContentSize().width,
        })
        this.soundOnBtn.addTouchEventListener(this.enableSoundOnMethod, this)
        this.addChild(this.soundOnBtn, this.btnwrapSprite_zOrder)

        // game panel
        this.gamePanel_height = size.height - this.header_height - this.banner_height - this.coinWrapSprite_height - this.betAmountBg_height + this.btnwrapSprite_y_delta

        var panelArea1_width = size.width / 4 - 1
        this.panelArea1 = new cc.LayerColor(cc.color(25, 74, 148), panelArea1_width, size.height - this.header_height - this.banner_height - this.coinWrapSprite_height - this.betAmountBg_height + this.betAmountBg_height_delta)
        this.panelArea1.setPosition(cc.p(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta))
        this.addChild(this.panelArea1)
        var panelLabel1 = new cc.LabelTTF("闲", "Arial", 40)
        panelLabel1.attr({
            fillStyle: cc.color(80, 141, 255),
            x: panelArea1_width / 2,
            y: this.gamePanel_height / 2
        })
        this.panelArea1.addChild(panelLabel1)
        var panelLabel1_rate = new cc.LabelTTF("1:2", "Arial", 15)
        panelLabel1_rate.attr({
            fillStyle: cc.color(80, 141, 255),
            x: panelArea1_width / 2,
            y: this.gamePanel_height / 2 - panelLabel1.getContentSize().height / 2 - paddingY / 4
        })
        this.panelArea1.addChild(panelLabel1_rate)

        this.panelArea2 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - 2, this.gamePanel_height / 3)
        this.panelArea2.setPosition(cc.p(size.width / 4 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2))
        this.addChild(this.panelArea2)
        var panelLabel2 = new cc.LabelTTF("大", "Arial", 20)
        panelLabel2.attr({
            fillStyle: cc.color(80, 141, 255),
            x: size.width / 8,
            y: this.gamePanel_height / 6
        })
        this.panelArea2.addChild(panelLabel2)
        var panelLabel2_rate = new cc.LabelTTF("1:0.5", "Arial", 15)
        panelLabel2_rate.attr({
            fillStyle: cc.color(80, 141, 255),
            x: size.width / 8,
            y: this.gamePanel_height / 6 - panelLabel2.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea2.addChild(panelLabel2_rate)

        this.panelArea3 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - 2, this.gamePanel_height / 3)
        this.panelArea3.setPosition(cc.p(size.width / 2 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2))
        this.addChild(this.panelArea3)
        var panelLabel3 = new cc.LabelTTF("小", "Arial", 20)
        panelLabel3.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 8,
            y: this.gamePanel_height / 6
        })
        this.panelArea3.addChild(panelLabel3)
        var panelLabel3_rate = new cc.LabelTTF("1:0.5", "Arial", 15)
        panelLabel3_rate.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 8,
            y: this.gamePanel_height / 6 - panelLabel3.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea3.addChild(panelLabel3_rate)

        this.panelArea4 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 2 - 2, this.gamePanel_height / 3 - 2)
        this.panelArea4.setPosition(cc.p(size.width / 4 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3))
        this.addChild(this.panelArea4)
        var panelLabel4 = new cc.LabelTTF("和 1:8", "Arial", 40)
        panelLabel4.attr({
            fillStyle: cc.color(0, 220, 52),
            x: size.width / 4,
            y: this.gamePanel_height / 6
        })
        this.panelArea4.addChild(panelLabel4)

        this.panelArea5 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - 2, this.gamePanel_height / 3 - 1)
        this.panelArea5.setPosition(cc.p(size.width / 4 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta))
        this.addChild(this.panelArea5)
        var panelLabel5 = new cc.LabelTTF("闲对", "Arial", 20)
        panelLabel5.attr({
            fillStyle: cc.color(80, 141, 255),
            x: size.width / 8,
            y: this.gamePanel_height / 6
        })
        this.panelArea5.addChild(panelLabel5)
        var panelLabel5_rate = new cc.LabelTTF("1:12", "Arial", 15)
        panelLabel5_rate.attr({
            fillStyle: cc.color(80, 141, 255),
            x: size.width / 8,
            y: this.gamePanel_height / 6 - panelLabel5.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea5.addChild(panelLabel5_rate)

        this.panelArea6 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - 2, this.gamePanel_height / 3 - 1)
        this.panelArea6.setPosition(cc.p(size.width / 2 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta))
        this.addChild(this.panelArea6)
        var panelLabel6 = new cc.LabelTTF("庄对", "Arial", 20)
        panelLabel6.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 8,
            y: this.gamePanel_height / 6
        })
        this.panelArea6.addChild(panelLabel6)
        var panelLabel6_rate = new cc.LabelTTF("1:12", "Arial", 15)
        panelLabel6_rate.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 8,
            y: this.gamePanel_height / 6 - panelLabel6.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea6.addChild(panelLabel6_rate)

        this.panelArea7 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - 1, this.gamePanel_height)
        this.panelArea7.setPosition(cc.p(size.width / 4 * 3 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta))
        this.addChild(this.panelArea7)
        var panelLabel7 = new cc.LabelTTF("庄", "Arial", 40)
        panelLabel7.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 8,
            y: this.gamePanel_height / 2
        })
        this.panelArea7.addChild(panelLabel7)
        var panelLabel7_rate = new cc.LabelTTF("1:1.95", "Arial", 15)
        panelLabel7_rate.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 8,
            y: this.gamePanel_height / 2 - panelLabel7.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea7.addChild(panelLabel7_rate)

        // footer
        var betAmountBg = new cc.LayerColor(cc.color(0, 0, 0, 150), size.width, this.betAmountBg_height)
        betAmountBg.setPosition(cc.p(0, this.coinWrapSprite_height - this.betAmountBg_height_delta))
        this.addChild(betAmountBg)

        var betAmountTotalSprite = cc.Sprite.create(res.bet_amount_total_png)
        var betAmountTotalSprite_width = 20
        var betAmountTotalSprite_height = betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width * betAmountTotalSprite.getContentSize().height

        var betAmountTotal_RoundRect = new RoundRect(80, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null)
        betAmountTotal_RoundRect.setPosition(paddingX / 4, this.coinWrapSprite_height)
        this.addChild(betAmountTotal_RoundRect)
        betAmountTotalSprite.attr({
            x: betAmountTotalSprite_width / 2 + paddingX / 4,
            y: betAmountTotalSprite_height / 2,
            scaleX: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width,
            scaleY: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width
        })
        betAmountTotal_RoundRect.addChild(betAmountTotalSprite)

        var betAmountTotalVal = cc.LabelTTF.create("2000.0", "Arial", 15)
        betAmountTotalVal.attr({
            x: betAmountTotal_RoundRect.getContentSize().width - 30,
            y: betAmountTotalSprite_height / 2,
            fillStyle: cc.color(255, 255, 255)
        })
        betAmountTotal_RoundRect.addChild(betAmountTotalVal)



        this.betAmountToken_RoundRect = new RoundRect(70, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null)
        this.betAmountToken_RoundRect.setPosition(cc.p(betAmountTotal_RoundRect.getContentSize().width + paddingX / 2, this.coinWrapSprite_height))
        this.addChild(this.betAmountToken_RoundRect)
        var betAmountTokenSprite = cc.Sprite.create(res.bet_amount_token_png)
        var betAmountTokenSprite_height = 15
        var betAmountTokenSprite_width = betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height * betAmountTokenSprite.getContentSize().height
        betAmountTokenSprite.attr({
            scaleX: betAmountTokenSprite_width / betAmountTokenSprite.getContentSize().width,
            scaleY: betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height
        })
        betAmountTokenSprite.setPosition(cc.p(betAmountTokenSprite_width / 2 + paddingX / 4, betAmountTokenSprite_height / 2 + paddingY / 4))
        this.betAmountToken_RoundRect.addChild(betAmountTokenSprite)
        this.betAmountTokenVal = new cc.LabelTTF("0.0", "Arial", 15)
        this.betAmountTokenVal.attr({
            x: this.betAmountToken_RoundRect.getContentSize().width - this.betAmountTokenVal.getContentSize().width,
            y: this.betAmountTokenVal.getContentSize().height / 2 + 1,
            fillStyle: cc.color(255, 255, 255)
        })
        this.betAmountToken_RoundRect.addChild(this.betAmountTokenVal)


        // cancel button
        this.cancelBtn = new ccui.Button(res.red_btn_png, res.red_btn_png, res.disabled_red_btn_png)
        var cancelBtn_width = 60
        this.cancelBtn.attr({
            pressedActionEnabled: true,
            x: size.width - cancelBtn_width / 2 - paddingX / 2,
            y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height,
            scaleX: cancelBtn_width / this.cancelBtn.getContentSize().width,
            scaleY: cancelBtn_width / this.cancelBtn.getContentSize().width
        })
        this.cancelBtn.addTouchEventListener(this.removeDealedCoinsByClick, this)
        this.cancelBtn.setEnabled(false)

        // confirm button
        this.confirmBtn = new ccui.Button(res.green_btn_png, res.green_btn_png, res.disabled_green_btn_png)
        var confirmBtn_width = 60
        this.confirmBtn.attr({
            pressedActionEnabled: true,
            x: size.width - confirmBtn_width / 2 - cancelBtn_width - paddingX / 2 - paddingX / 2,
            y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height,
            scaleX: confirmBtn_width / this.confirmBtn.getContentSize().width,
            scaleY: confirmBtn_width / this.confirmBtn.getContentSize().width
        })
        this.confirmBtn.addTouchEventListener(this.showCoinDealCheckDlg, this)
        this.confirmBtn.setEnabled(false)

        // cancel and confirm button background
        var cancelConfirmBg_height = this.betAmountBg_height
        var cancelConfirmBg_width = paddingX / 2 + confirmBtn_width + paddingX / 2 + cancelBtn_width + paddingX / 2 + 40
        var cancelConfirmBg = new RoundRect(cancelConfirmBg_width, cancelConfirmBg_height, cc.color(0, 0, 0, 150), 0, null, 25, RectType.TOP)
        cancelConfirmBg.setPosition(size.width - cancelConfirmBg_width + 40, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta - cancelConfirmBg_height)
        this.addChild(cancelConfirmBg)

        this.addChild(this.cancelBtn)
        this.addChild(this.confirmBtn)

        // cancel and confirm buttons are disabled when length of dealedCoins is 0
        if ((this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length + this.panel4_DealedCoins.length + this.panel5_DealedCoins.length + this.panel6_DealedCoins.length + this.panel7_DealedCoins.length) === 0) {
            this.cancelBtn.setEnabled(false)
            this.confirmBtn.setEnabled(false)
        }

        var coinWrapSprite = cc.Sprite.create(res.coin_wrap_png)
        var coinWrapSprite_width = size.width
        coinWrapSprite.attr({
            scaleX: coinWrapSprite_width / coinWrapSprite.getContentSize().width,
            scaleY: this.coinWrapSprite_height / coinWrapSprite.getContentSize().height,
            x: coinWrapSprite_width / 2,
            y: this.coinWrapSprite_height / 2
        })
        this.addChild(coinWrapSprite)

        this.coin_width = (size.width - 10 * 8) / 7
        this.coinImages = [res.coin_sprite_10_png, res.coin_sprite_50_png, res.coin_sprite_100_png, res.coin_sprite_500_png, res.coin_sprite_1000_png, res.coin_sprite_5000_png, res.coin_sprite_10000_png]
        for (let index = 0; index < this.coinImages.length; index++) {
            this.coins[index] = new ccui.Button(this.coinImages[index], this.coinImages[index], this.coinImages[index])
            this.coins[index].attr({
                x: this.coin_width / 2 + 10 * (index + 1) + this.coin_width * index,
                y: this.coin_width / 2 + 10,
                scaleX: this.coin_width / this.coins[index].getNormalTextureSize().width,
                scaleY: this.coin_width / this.coins[index].getNormalTextureSize().width
            })
            // pass enabled coin index by adding object
            this.coins[index].setTitleFontSize(cc.size(index, index))
            this.coins[index].setZoomScale(0)
            this.coins[index].addTouchEventListener(this.chooseCoin, this)
            this.addChild(this.coins[index])
        }

        // add touch listener for checking dealed coins out
        this.coinDropListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: (touch, event) => {
                console.log("coindroplistener called")
                if (!this.enabledCoinDrop) return
                var touch_x = touch.getLocation().x
                var touch_y = touch.getLocation().y
                if (this.enabledCoin.findIndex(this.findTrue) !== -1) {
                    if (this.close_state) {
                        var bet_closed_alert = new cc.Sprite(res.bet_closed_alert_png)
                        var bet_closed_alert_width = size.width * 3 / 5
                        bet_closed_alert.attr({
                            scaleX: bet_closed_alert_width / bet_closed_alert.getContentSize().width,
                            scaleY: bet_closed_alert_width / bet_closed_alert.getContentSize().width
                        })
                        bet_closed_alert.setPosition(cc.p(size.width / 2, size.height / 2))
                        this.addChild(bet_closed_alert, this.alert_zOrder)
                        setTimeout(() => {
                            this.removeChild(bet_closed_alert)
                        }, 2000);
                        return
                    }
                    var coinItem = new cc.Sprite(this.coinImages[this.enabledCoin.findIndex(this.findTrue)])
                    var coinVal = this.coinImages[this.enabledCoin.findIndex(this.findTrue)].replace("res/niuniu/coin-sprite-", "")
                    coinVal = Number(coinVal.replace(".png", ""))
                    coinItem.attr({
                        x: touch_x,
                        y: touch_y,
                        scaleX: 25 / coinItem.getContentSize().width,
                        scaleY: 25 / coinItem.getContentSize().width
                    })
                    if (touch_x > 0 && touch_x < size.width / 4 - paddingX) {
                        if (this.panel1_DealedCoins.length == 0) {
                            this.panel1_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                            this.panel1_ValRoundRect_Label.setFontFillColor(cc.color(255, 255, 255))
                            this.panel1_ValRoundRect = new RoundRect(60, this.panel1_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                            this.panel1_ValRoundRect_Label.setPosition(cc.p(this.panel1_ValRoundRect.getContentSize().width / 2, this.panel1_ValRoundRect_Label.getContentSize().height / 2))
                            this.panel1_ValRoundRect.setPosition(cc.p(cc.winSize.width / 8 - this.panel1_ValRoundRect.getContentSize().width / 2, paddingY / 2))
                            this.panelArea1.addChild(this.panel1_ValRoundRect)
                            this.panel1_ValRoundRect.addChild(this.panel1_ValRoundRect_Label)
                        }
                        cc.audioEngine.playEffect(res.coin_drop_wav)
                        this.panel1_DealedCoins.push(coinVal)
                        var length_var = this.panel1_ValRoundRect_Label.getContentSize().width
                        this.panel1_ValRoundRect_Label.setString(this.sumCoins(this.panel1_DealedCoins))
                        this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }
                    if (touch_x > size.width / 4 + paddingX &&
                        touch_x < size.width / 2 - paddingX &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height - paddingY)) {
                        if (this.panel2_DealedCoins.length == 0) {
                            this.panel2_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                            this.panel2_ValRoundRect_Label.attr({
                                fillStyle: cc.color(255, 255, 255),
                            })
                            this.panel2_ValRoundRect = new RoundRect(60, this.panel2_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                            this.panel2_ValRoundRect_Label.setPosition(cc.p(this.panel2_ValRoundRect.getContentSize().width / 2, this.panel2_ValRoundRect_Label.getContentSize().height / 2))
                            this.panel2_ValRoundRect.setPosition(cc.p(size.width / 8 - this.panel2_ValRoundRect.getContentSize().width / 2, paddingY / 2))
                            this.panelArea2.addChild(this.panel2_ValRoundRect)
                            this.panel2_ValRoundRect.addChild(this.panel2_ValRoundRect_Label)

                        }
                        cc.audioEngine.playEffect(res.coin_drop_wav)
                        this.panel2_DealedCoins.push(coinVal)
                        this.panel2_ValRoundRect_Label.setString(this.sumCoins(this.panel2_DealedCoins))
                        this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }
                    if (touch_x > size.width / 2 + paddingX &&
                        touch_x < (size.width / 2 + size.width / 4 - paddingX) &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height - paddingY)) {
                        if (this.panel3_DealedCoins.length == 0) {
                            this.panel3_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                            this.panel3_ValRoundRect_Label.attr({
                                fillStyle: cc.color(255, 255, 255),
                            })
                            this.panel3_ValRoundRect = new RoundRect(60, this.panel3_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                            this.panel3_ValRoundRect_Label.setPosition(cc.p(this.panel3_ValRoundRect.getContentSize().width / 2, this.panel3_ValRoundRect_Label.getContentSize().height / 2))
                            this.panel3_ValRoundRect.setPosition(cc.p(size.width / 8 - this.panel3_ValRoundRect.getContentSize().width / 2, paddingY / 2))
                            this.panelArea3.addChild(this.panel3_ValRoundRect)
                            this.panel3_ValRoundRect.addChild(this.panel3_ValRoundRect_Label)

                        }
                        cc.audioEngine.playEffect(res.coin_drop_wav)
                        this.panel3_DealedCoins.push(coinVal)
                        this.panel3_ValRoundRect_Label.setString(this.sumCoins(this.panel3_DealedCoins))
                        this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }
                    if (touch_x > size.width / 4 + paddingY &&
                        touch_x < (size.width / 2 + size.width / 4 - paddingY) &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 - paddingY)) {
                        if (this.panel4_DealedCoins.length == 0) {
                            this.panel4_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                            this.panel4_ValRoundRect_Label.setFontFillColor(cc.color(255, 255, 255))
                            this.panel4_ValRoundRect = new RoundRect(60, this.panel4_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                            this.panel4_ValRoundRect_Label.setPosition(cc.p(this.panel4_ValRoundRect.getContentSize().width / 2, this.panel4_ValRoundRect_Label.getContentSize().height / 2))
                            this.panel4_ValRoundRect.setPosition(cc.p(cc.winSize.width / 4 - this.panel4_ValRoundRect.getContentSize().width / 2, paddingY / 2))
                            this.panelArea4.addChild(this.panel4_ValRoundRect)
                            this.panel4_ValRoundRect.addChild(this.panel4_ValRoundRect_Label)
                        }
                        cc.audioEngine.playEffect(res.coin_drop_wav)
                        this.panel4_DealedCoins.push(coinVal)
                        this.panel4_ValRoundRect_Label.setString(this.sumCoins(this.panel4_DealedCoins))
                        this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }
                    if (touch_x > size.width / 4 + paddingX &&
                        touch_x < size.width / 2 - paddingY &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 - paddingY)) {
                        if (this.panel5_DealedCoins.length == 0) {
                            this.panel5_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                            this.panel5_ValRoundRect_Label.setFontFillColor(cc.color(255, 255, 255))
                            this.panel5_ValRoundRect = new RoundRect(60, this.panel5_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                            this.panel5_ValRoundRect_Label.setPosition(cc.p(this.panel5_ValRoundRect.getContentSize().width / 2, this.panel5_ValRoundRect_Label.getContentSize().height / 2))
                            this.panel5_ValRoundRect.setPosition(cc.p(cc.winSize.width / 8 - this.panel5_ValRoundRect.getContentSize().width / 2, paddingY / 2))
                            this.panelArea5.addChild(this.panel5_ValRoundRect)
                            this.panel5_ValRoundRect.addChild(this.panel5_ValRoundRect_Label)
                        }
                        cc.audioEngine.playEffect(res.coin_drop_wav)
                        this.panel5_DealedCoins.push(coinVal)
                        this.panel5_ValRoundRect_Label.setString(this.sumCoins(this.panel5_DealedCoins))
                        this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }
                    if (touch_x > size.width / 2 + paddingX &&
                        touch_x < (size.width / 2 + size.width / 4 - paddingX) &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 - paddingY)) {
                        if (this.panel6_DealedCoins.length == 0) {
                            this.panel6_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                            this.panel6_ValRoundRect_Label.setFontFillColor(cc.color(255, 255, 255))
                            this.panel6_ValRoundRect = new RoundRect(60, this.panel6_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                            this.panel6_ValRoundRect_Label.setPosition(cc.p(this.panel6_ValRoundRect.getContentSize().width / 2, this.panel6_ValRoundRect_Label.getContentSize().height / 2))
                            this.panel6_ValRoundRect.setPosition(cc.p(cc.winSize.width / 8 - this.panel6_ValRoundRect.getContentSize().width / 2, paddingY / 2))
                            this.panelArea6.addChild(this.panel6_ValRoundRect)
                            this.panel6_ValRoundRect.addChild(this.panel6_ValRoundRect_Label)
                        }
                        cc.audioEngine.playEffect(res.coin_drop_wav)
                        this.panel6_DealedCoins.push(coinVal)
                        this.panel6_ValRoundRect_Label.setString(this.sumCoins(this.panel6_DealedCoins))
                        this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }
                    if (touch_x > (size.width / 2 + size.width / 4 + paddingX) && touch_x < (size.width - paddingX)) {
                        if (this.panel7_DealedCoins.length == 0) {
                            this.panel7_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                            this.panel7_ValRoundRect_Label.setFontFillColor(cc.color(255, 255, 255))
                            this.panel7_ValRoundRect = new RoundRect(60, this.panel7_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                            this.panel7_ValRoundRect_Label.setPosition(cc.p(this.panel7_ValRoundRect.getContentSize().width / 2, this.panel7_ValRoundRect_Label.getContentSize().height / 2))
                            this.panel7_ValRoundRect.setPosition(cc.p(cc.winSize.width / 8 - this.panel7_ValRoundRect.getContentSize().width / 2, paddingY / 2))
                            this.panelArea7.addChild(this.panel7_ValRoundRect)
                            this.panel7_ValRoundRect.addChild(this.panel7_ValRoundRect_Label)
                        }
                        cc.audioEngine.playEffect(res.coin_drop_wav)
                        this.panel7_DealedCoins.push(coinVal)
                        this.panel7_ValRoundRect_Label.setString(this.sumCoins(this.panel7_DealedCoins))
                        this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }

                    if (this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length + this.panel4_DealedCoins.length + this.panel5_DealedCoins.length + this.panel6_DealedCoins.length + this.panel7_DealedCoins.length !== 0) {
                        this.cancelBtn.setEnabled(true)
                        this.confirmBtn.setEnabled(true)
                    }

                    this.betAmountTokenVal.setString(this.sumCoins(this.panel1_DealedCoins) + this.sumCoins(this.panel2_DealedCoins) + this.sumCoins(this.panel3_DealedCoins) + this.sumCoins(this.panel4_DealedCoins) + this.sumCoins(this.panel5_DealedCoins) + this.sumCoins(this.panel6_DealedCoins) + this.sumCoins(this.panel7_DealedCoins))

                }
            }
        })

        cc.eventManager.addListener(this.coinDropListener, this.panelArea1)

        // betOpenInterval function called for counting seconds
        this.betOpenInterval()


    },

    findTrue: function (ele) {
        return ele == true
    },

    sleep: function (milliseconds) {
        return new Promise(
            resolve => setTimeout(resolve, milliseconds)
        )
    },

    generateRandomNumArray: function (min, max, count) {
        var random_number_array = []
        for (let index = min; index <= max; index++) {
            var random_integer = Math.floor(Math.random() * (max - min + 1)) + min
            if (count == index - min) break
            if (random_number_array.filter(item => item === random_integer).length === 0) {
                random_number_array.push(random_integer)
            } else {
                index = index - 1
            }

        }
        return random_number_array
    },

    sumCoins: function (arrayVal) {
        var sum = 0
        for (let index = 0; index < arrayVal.length; index++) {
            sum = sum + arrayVal[index]
        }
        return sum
    },

    showCoinDealCheckDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showcoindealcheckdlg")
                this.disableAllBtn()
                // coinDealCheckDlg
                var paddingX = 20
                var paddingY = 20
                this.coinDealCheckDlg_overLay = new cc.DrawNode()
                this.coinDealCheckDlg_overLay.clear()
                this.coinDealCheckDlg_overLay.drawRect(cc.p(0, 0), cc.p(cc.winSize.width, cc.winSize.height), cc.color(0, 0, 0, 100), 0)
                this.addChild(this.coinDealCheckDlg_overLay, this.overLay_zOrder)
                this.coinDealCheckDlg_zOrder = this.overLay_zOrder + 1
                var coinDealCheckDlg_height = 420
                var coinDealCheckDlg_width = cc.winSize.width - paddingX * 3
                this.coinDealCheckDlg = new RoundRect(coinDealCheckDlg_width, coinDealCheckDlg_height, cc.color(0, 0, 0), 0, null, 10, null)
                var coinDealCheckDlg_y = cc.winSize.height / 2 - coinDealCheckDlg_height / 2
                this.coinDealCheckDlg.setPosition(cc.p(paddingX * 3 / 2, coinDealCheckDlg_y))
                this.addChild(this.coinDealCheckDlg, this.coinDealCheckDlg_zOrder)

                var betAmountTokenSprite1 = cc.Sprite.create(res.bet_amount_token_png)
                var betAmountTokenSprite1_height = 20
                var betAmountTokenSprite1_width = betAmountTokenSprite1_height / betAmountTokenSprite1.getContentSize().height * betAmountTokenSprite1.getContentSize().height
                var betOrderConfirmLabel = new cc.LabelTTF("确认下注单", "Arial", 16)
                betAmountTokenSprite1.attr({
                    scaleX: betAmountTokenSprite1_width / betAmountTokenSprite1.getContentSize().width,
                    scaleY: betAmountTokenSprite1_height / betAmountTokenSprite1.getContentSize().height
                })
                betOrderConfirmLabel.attr({
                    fillStyle: cc.color(255, 255, 255)
                })
                betAmountTokenSprite1.setPosition(cc.p(this.coinDealCheckDlg.getContentSize().width / 2 - (betAmountTokenSprite1_width + paddingX / 2 + betOrderConfirmLabel.getContentSize().width) / 2, coinDealCheckDlg_height - betAmountTokenSprite1_height / 2 - paddingY + 2))
                betOrderConfirmLabel.setPosition(cc.p(this.coinDealCheckDlg.getContentSize().width / 2 - (betAmountTokenSprite1_width + paddingX / 2 + betOrderConfirmLabel.getContentSize().width) / 2 + paddingX / 2 + betOrderConfirmLabel.getContentSize().width / 2 + paddingX / 2, coinDealCheckDlg_height - betAmountTokenSprite1_height / 2 - paddingY + 2))
                this.coinDealCheckDlg.addChild(betAmountTokenSprite1, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(betOrderConfirmLabel, this.coinDealCheckDlg_zOrder)

                var closeBtn_width = 20
                var closeBtn = new ccui.Button(res.cancel_icon_png, res.cancel_icon_png, res.cancel_icon_png)
                closeBtn.attr({
                    scaleX: closeBtn_width / closeBtn.getContentSize().width,
                    scaleY: closeBtn_width / closeBtn.getContentSize().width,
                    x: coinDealCheckDlg_width
                })


                var hrLine1 = new cc.LayerColor(cc.color(102, 102, 102), coinDealCheckDlg_width - paddingX, 1)
                hrLine1.setPosition(cc.p(paddingX / 2, coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2))
                this.coinDealCheckDlg.addChild(hrLine1, this.coinDealCheckDlg_zOrder)

                var field1Label = new cc.LabelTTF("操作", "Arial", 15)
                var field2Label = new cc.LabelTTF("玩法", "Arial", 15)
                var field3Label = new cc.LabelTTF("赔率", "Arial", 15)
                var field4Label = new cc.LabelTTF("金额", "Arial", 15)
                field1Label.attr({
                    fillStyle: cc.color(187, 187, 187)
                })
                field2Label.attr({
                    fillStyle: cc.color(187, 187, 187)
                })
                field3Label.attr({
                    fillStyle: cc.color(187, 187, 187)
                })
                field4Label.attr({
                    fillStyle: cc.color(187, 187, 187)
                })
                field1Label.setPosition(cc.p(field1Label.getContentSize().width / 2 + paddingX / 2, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4))
                field2Label.setPosition(cc.p(field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4))
                field3Label.setPosition(cc.p(field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX + field2Label.getContentSize().width + paddingX, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4))
                field4Label.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 + field4Label.getContentSize().width / 2 - 70, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4))
                this.coinDealCheckDlg.addChild(field1Label, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(field2Label, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(field3Label, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(field4Label, this.coinDealCheckDlg_zOrder)

                var hrLine2 = new cc.LayerColor(cc.color(102, 102, 102), coinDealCheckDlg_width - paddingX, 1)
                hrLine2.setPosition(cc.p(paddingX / 2, coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4))
                this.coinDealCheckDlg.addChild(hrLine2, this.coinDealCheckDlg_zOrder)

                var checkRadioSprite_width = 20
                var dealedPanelNum = 0
                if (this.panel1_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲", "Arial", 18)
                    field2Val.attr({
                        fillStyle: cc.color(80, 141, 255),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("2", "Arial", 18)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX + field2Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel1_DealedCoins), "Arial", 18)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel2_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("大", "Arial", 18)
                    field2Val.attr({
                        fillStyle: cc.color(80, 141, 255),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("0.5", "Arial", 18)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX + field2Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel2_DealedCoins), "Arial", 18)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel5_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲对", "Arial", 18)
                    field2Val.attr({
                        fillStyle: cc.color(80, 141, 255),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("12", "Arial", 18)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX + field2Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel5_DealedCoins), "Arial", 18)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel3_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("小", "Arial", 18)
                    field2Val.attr({
                        fillStyle: cc.color(255, 64, 71),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("0.5", "Arial", 18)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX + field2Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel3_DealedCoins), "Arial", 18)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel6_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("庄对", "Arial", 18)
                    field2Val.attr({
                        fillStyle: cc.color(255, 64, 71),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("12", "Arial", 18)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX + field2Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel6_DealedCoins), "Arial", 18)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel7_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("庄", "Arial", 18)
                    field2Val.attr({
                        fillStyle: cc.color(255, 64, 71),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("1.95", "Arial", 18)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX + field2Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel7_DealedCoins), "Arial", 18)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel4_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("和", "Arial", 18)
                    field2Val.attr({
                        fillStyle: cc.color(0, 221, 51),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("8", "Arial", 18)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX + field2Label.getContentSize().width + paddingX,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel4_DealedCoins), "Arial", 18)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                var totalfieldLabel = new cc.LabelTTF("总金额:", "Arial", 18)
                totalfieldLabel.attr({
                    fillStyle: cc.color(255, 255, 255),
                    x: paddingX / 2 + totalfieldLabel.getContentSize().width / 2,
                    y: coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum - paddingY - 3
                })
                this.coinDealCheckDlg.addChild(totalfieldLabel)
                var totalfieldRoundRect_width = 120
                var totalfieldRoundRect_height = 20
                var totalfieldRoundRect = new RoundRect(totalfieldRoundRect_width, totalfieldRoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                totalfieldRoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - totalfieldRoundRect_width, coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum - paddingY))
                this.coinDealCheckDlg.addChild(totalfieldRoundRect)
                var totalfieldVal = new cc.LabelTTF((this.sumCoins(this.panel1_DealedCoins) + this.sumCoins(this.panel2_DealedCoins) + this.sumCoins(this.panel3_DealedCoins) + this.sumCoins(this.panel4_DealedCoins) + this.sumCoins(this.panel5_DealedCoins) + this.sumCoins(this.panel6_DealedCoins) + this.sumCoins(this.panel7_DealedCoins)).toString(), "Arial", 18)
                totalfieldVal.attr({
                    fillStyle: cc.color(255, 255, 255),
                    x: totalfieldRoundRect_width / 2,
                    y: totalfieldRoundRect_height / 2 - 3
                })
                totalfieldRoundRect.addChild(totalfieldVal)

                var dlgBtnBg_height = 70
                var dlgBtnBg = new RoundRect(cc.winSize.width - paddingX * 3, dlgBtnBg_height, cc.color(255, 255, 255), 0, null, 10, RectType.BOTTOM)
                dlgBtnBg.setPosition(cc.p(0, 0))
                this.coinDealCheckDlg.addChild(dlgBtnBg, this.coinDealCheckDlg_zOrder)

                this.coinDealCheckDlgYesBtn = new ccui.Button(res.dlg_yes_btn_png, res.dlg_yes_btn_png, res.dlg_yes_btn_png)
                var coinDealCheckDlgYesBtn_width = 70
                this.coinDealCheckDlgYesBtn.attr({
                    scaleX: coinDealCheckDlgYesBtn_width / this.coinDealCheckDlgYesBtn.getContentSize().width,
                    scaleY: coinDealCheckDlgYesBtn_width / this.coinDealCheckDlgYesBtn.getContentSize().width
                })
                this.coinDealCheckDlgNoBtn = new ccui.Button(res.dlg_no_btn_png, res.dlg_no_btn_png, res.dlg_no_btn_png)
                var coinDealCheckDlgNoBtn_width = 70
                this.coinDealCheckDlgNoBtn.attr({
                    scaleX: coinDealCheckDlgNoBtn_width / this.coinDealCheckDlgNoBtn.getContentSize().width,
                    scaleY: coinDealCheckDlgNoBtn_width / this.coinDealCheckDlgNoBtn.getContentSize().width
                })
                this.coinDealCheckDlgYesBtn.setPosition(cc.p(coinDealCheckDlgYesBtn_width / 2 + coinDealCheckDlg_width / 2 - coinDealCheckDlgYesBtn_width - paddingX / 2, this.coinDealCheckDlgYesBtn.getContentSize().height / 2 + dlgBtnBg_height / 2 - this.coinDealCheckDlgYesBtn.getContentSize().height / 2))
                this.coinDealCheckDlgNoBtn.setPosition(cc.p(coinDealCheckDlgNoBtn_width / 2 + coinDealCheckDlg_width / 2 + paddingX / 2, this.coinDealCheckDlgNoBtn.getContentSize().height / 2 + dlgBtnBg_height / 2 - this.coinDealCheckDlgNoBtn.getContentSize().height / 2))
                this.coinDealCheckDlgYesBtn.addTouchEventListener(this.showCheckSuccessDlg, this)
                this.coinDealCheckDlgNoBtn.addTouchEventListener(this.showDealCancelDlg, this)
                this.coinDealCheckDlg.addChild(this.coinDealCheckDlgYesBtn, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(this.coinDealCheckDlgNoBtn, this.coinDealCheckDlg_zOrder)
        }
    },

    betOpenInterval: async function () {
        var paddingX = 20
        this.open_state = true
        this.close_state = false
        // update cardcountval
        this.cardCountVal_num = this.cardCountVal_num + 1
        this.cardCountVal.setString(this.cardCountVal_num + "/" + 52 * 8)
        // card back sprite
        setTimeout(async () => {
            var size = cc.winSize
            var paddingY = 20
            var paddingX = 20
            var card_width = 50
            this.cardBackSprite = []
            var renderingTime = [0.12, 0.11, 0.1, 0.11, 0.12]
            for (let index = 0; index < 5; index++) {
                this.cardBackSprite[index] = new cc.Sprite(baccarat_res.card_back_png)
                this.cardBackSprite[index].attr({
                    scaleX: card_width / this.cardBackSprite[index].getContentSize().width,
                    scaleY: card_width / this.cardBackSprite[index].getContentSize().width,
                    x: size.width / 2,
                    y: size.height + card_width / this.cardBackSprite[index].getContentSize().width * this.cardBackSprite[index].getContentSize().height / 2
                })
                this.addChild(this.cardBackSprite[index])
                var movetoAction = new cc.MoveTo(renderingTime[index], cc.p(size.width / 2 - paddingX / 4 * 2 - card_width * 2 + (paddingX / 4 + card_width) * index, size.height - this.header_height - this.banner_height / 2 + paddingY / 8 + card_width / this.cardBackSprite[index].getContentSize().width * this.cardBackSprite[index].getContentSize().height / 2))
                await this.sleep(100)
                this.cardBackSprite[index].runAction(movetoAction)
            }
            for (let index = 5; index < 10; index++) {
                this.cardBackSprite[index] = new cc.Sprite(baccarat_res.card_back_png)
                this.cardBackSprite[index].attr({
                    scaleX: card_width / this.cardBackSprite[index].getContentSize().width,
                    scaleY: card_width / this.cardBackSprite[index].getContentSize().width,
                    x: size.width / 2,
                    y: size.height + card_width / this.cardBackSprite[index].getContentSize().width * this.cardBackSprite[index].getContentSize().height / 2
                })
                this.addChild(this.cardBackSprite[index])
                var movetoAction = new cc.MoveTo(renderingTime[index % 5], size.width / 2 - paddingX / 4 * 2 - card_width * 2 + (paddingX / 4 + card_width) * (index % 5), size.height - this.header_height - this.banner_height / 2 - paddingY / 8 - card_width / this.cardBackSprite[index].getContentSize().width * this.cardBackSprite[index].height / 2)
                await this.sleep(100)
                this.cardBackSprite[index].runAction(movetoAction)
            }
        }, 2000);
        var bet_start_alert = new cc.Sprite(res.bet_start_alert_png)
        var bet_start_alert_width = cc.winSize.width / 5 * 3
        bet_start_alert.attr({
            scaleX: bet_start_alert_width / bet_start_alert.getContentSize().width,
            scaleY: bet_start_alert_width / bet_start_alert.getContentSize().width
        })
        bet_start_alert.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
        this.addChild(bet_start_alert, this.alert_zOrder)
        setTimeout(() => {
            this.removeChild(bet_start_alert)
        }, 2000);
        await this.sleep(2000)
        var close_second = 20
        var countCloseSecond = setInterval(() => {
            if (close_second == 0) {
                clearInterval(countCloseSecond)
                this.close_state = true
                this.displayCard()
                this.drawInterval()
                return
            }
            close_second = close_second - 1
            if (close_second < 10) {
                this.infoText.setString("距封盘时间 00:0" + close_second)
                if (close_second == 1) {
                    var bet_stop_alert = new cc.Sprite(res.bet_stop_alert_png)
                    var bet_stop_alert_width = cc.winSize.width / 5 * 3
                    bet_stop_alert.attr({
                        scaleX: bet_stop_alert_width / bet_stop_alert.getContentSize().width,
                        scaleY: bet_stop_alert_width / bet_stop_alert.getContentSize().width
                    })
                    bet_stop_alert.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
                    this.addChild(bet_stop_alert, this.alert_zOrder)
                    setTimeout(() => {
                        this.removeChild(bet_stop_alert)
                        this.open_state = false
                    }, 2000);
                }
            } else {
                this.infoText.setString("距封盘时间 00:" + close_second)
            }

        }, 1000);
    },

    drawInterval: function () {
        var draw_second = 10
        this.cancelBtn.setEnabled(false)
        this.confirmBtn.setEnabled(false)
        var countDrawSecond = setInterval(async () => {
            if (draw_second == 0) {
                clearInterval(countDrawSecond)
                this.infoText.setString("开奖中")

                setTimeout(async () => {
                    await this.sleep(500)
                    this.serial_num_panel.removeAllChildren()
                    this.displaySerialPanel()
                }, 2000);
                await this.sleep(3000)
                // rearrange cards
                var changed_card_width = 50 - 15
                var paddingY = 20
                var paddingX = 20
                // for (let index = 0; index < this.resultCards.length; index++) {
                //     this.resultCards[index].setScaleX(changed_card_width / this.resultCards[index].getContentSize().width * (-1))
                //     this.resultCards[index].setScaleY(changed_card_width / this.resultCards[index].getContentSize().width)
                    
                // }
                // await this.sleep(200)
                for (let index = 0; index < this.resultCards.length; index++) {
                    var scaletoAction = new cc.ScaleTo(0, changed_card_width / this.resultCards[index].getContentSize().width * (-1), changed_card_width / this.resultCards[index].getContentSize().width)
                    var movetoAction
                    if (index < 5) {
                        movetoAction = new cc.MoveTo(0.5, cc.p(cc.winSize.width / 2 - paddingX / 8 * 2 - changed_card_width * 2 + (paddingX / 8 + changed_card_width) * index, cc.winSize.height - this.header_height - this.banner_height / 2 + paddingY / 8 + changed_card_width / this.resultCards[index].getContentSize().width * this.resultCards[index].getContentSize().height / 2 + paddingY))
                    }else {
                        movetoAction = new cc.MoveTo(0.5, cc.p(cc.winSize.width / 2 - paddingX / 8 * 2 - changed_card_width * 2 + (paddingX / 8 + changed_card_width) * (index % 5), cc.winSize.height - this.header_height - this.banner_height / 2 + paddingY / 8 - changed_card_width / this.resultCards[index].getContentSize().width * this.resultCards[index].getContentSize().height / 2 - paddingY / 8 + paddingY))
                    }
                    var actionSequence = new cc.Sequence(movetoAction, scaletoAction)
                    this.resultCards[index].runAction(actionSequence)
                }
                var choosedCardNum = this.generateRandomNumArray(0, 9, 6)

                // four cards copy for first showed
                // this.cloneCards = []
                // for (let index = 0; index < choosedCardNum.length; index++) {

                //     this.cloneCards[index] = new cc.Sprite(this.cards[this.resultCardsIndexArray[choosedCardNum[index]]])
                //     this.cloneCards[index].attr({
                //         scaleX: changed_card_width / this.cloneCards[index].getContentSize().width,
                //         scaleY: changed_card_width /  this.cloneCards[index].getContentSize().width
                //     })

                //     this.cloneCards[index].setPosition(this.resultCards[choosedCardNum[index]].getPosition())
                //     await this.sleep(2000)
                //     this.resultCards[choosedCardNum[index]].attr({
                //         opacity: 150
                //     })
                //     this.addChild(this.cloneCards[index])
                //     if (index < 2) {
                //         var movetoAction = new cc.MoveTo(0.3, cc.p(cc.winSize.width / 2 - changed_card_width / 2 - paddingX / 4 - changed_card_width - paddingX / 4 + (paddingX / 4 + changed_card_width) * index, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                //         this.cloneCards[index].runAction(movetoAction)

                //     }else if (index > 1 && index < 4) {
                //         var movetoAction = new cc.MoveTo(0.3, cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4 + (changed_card_width + paddingX / 4) * (index - 2), cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                //         this.cloneCards[index].runAction(movetoAction)
                //     }else {
                //         // baccarat's third card rule action added
                //         var rotatebyAction = new cc.RotateBy(0.05, -90)
                //         var movetoAction = null
                //         if (index == 4) movetoAction = new cc.MoveTo(0.3, cc.p(cc.winSize.width / 2 + changed_card_width / 2 - paddingX / 4 - (changed_card_width + paddingX / 4) * 2 - changed_card_width - paddingX / 4, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                //         else if (index == 5) movetoAction = new cc.MoveTo(0.3, cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4 + (changed_card_width + paddingX / 4) * 2 + paddingX / 4, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                //         this.cloneCards[index].runAction(rotatebyAction)
                //         this.cloneCards[index].runAction(movetoAction)
                //     }

                // }


                var backCards = []
                this.cloneCards = []
                for (let index = 0; index < 6; index++) {
                    backCards[index] = new cc.Sprite(baccarat_res.card_back_png)
                    backCards[index].attr({
                        scaleX: changed_card_width / backCards[index].getContentSize().width,
                        scaleY: changed_card_width / this.resultCards[index].getContentSize().width * this.resultCards[index].getContentSize().height / backCards[index].getContentSize().height,
                    })
                    backCards[index].setOpacity(0)
                    this.cloneCards[index] = new cc.Sprite(this.cards[this.resultCardsIndexArray[choosedCardNum[index]]])
                    this.cloneCards[index].attr({
                        flippedX: true,
                        scaleX: 0,
                        scaleY: changed_card_width / this.cloneCards[index].getContentSize().width
                    })


                    if (index == 0) {
                        backCards[index].setPosition(cc.p(cc.winSize.width / 2 - changed_card_width / 2 - paddingX / 4 - changed_card_width - paddingX / 4, cc.winSize.height + changed_card_width / backCards[index].getContentSize().width * backCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8 + 3))
                        this.cloneCards[index].setPosition(cc.p(cc.winSize.width / 2 - changed_card_width / 2 - paddingX / 4 - changed_card_width - paddingX / 4, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.addChild(backCards[index])
                        var fadeinAction = new cc.FadeIn(2)
                        backCards[index].runAction(fadeinAction)
                        await this.sleep(2000)
                        backCards[index].runAction(new cc.ScaleTo(0.3, 0, changed_card_width / backCards[index].getContentSize().width))
                        await this.sleep(300)
                        this.addChild(this.cloneCards[index])
                        this.cloneCards[index].runAction(new cc.ScaleTo(0.3, -1 * (changed_card_width / this.cloneCards[index].getContentSize().width), changed_card_width / this.cloneCards[index].getContentSize().width))
                        await this.sleep(300)
                    }
                    if (index == 1) {
                        backCards[index].setPosition(cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4, cc.winSize.height + changed_card_width / backCards[index].getContentSize().width * backCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8 + 3))
                        this.cloneCards[index].setPosition(cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.addChild(backCards[index])
                        var fadeinAction = new cc.FadeIn(2)
                        backCards[index].runAction(fadeinAction)
                        await this.sleep(2000)
                        backCards[index].runAction(new cc.ScaleTo(0.3, 0, changed_card_width / backCards[index].getContentSize().width))
                        await this.sleep(300)
                        this.addChild(this.cloneCards[index])
                        this.cloneCards[index].runAction(new cc.ScaleTo(0.3, -1 * (changed_card_width / this.cloneCards[index].getContentSize().width), changed_card_width / this.cloneCards[index].getContentSize().width))
                        await this.sleep(300)
                    }
                    if (index == 2) {
                        backCards[index].setPosition(cc.p(cc.winSize.width / 2 - changed_card_width / 2 - paddingX / 4, cc.winSize.height + changed_card_width / backCards[index].getContentSize().width * backCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8 + 3))
                        this.cloneCards[index].setPosition(cc.p(cc.winSize.width / 2 - changed_card_width / 2 - paddingX / 4, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.addChild(backCards[index])
                        var fadeinAction = new cc.FadeIn(2)
                        backCards[index].runAction(fadeinAction)
                        await this.sleep(2000)
                        backCards[index].runAction(new cc.ScaleTo(0.3, 0, changed_card_width / backCards[index].getContentSize().width))
                        await this.sleep(300)
                        this.addChild(this.cloneCards[index])
                        this.cloneCards[index].runAction(new cc.ScaleTo(0.3, -1 * (changed_card_width / this.cloneCards[index].getContentSize().width), changed_card_width / this.cloneCards[index].getContentSize().width))
                        await this.sleep(300)
                    }
                    if (index == 3) {
                        backCards[index].setPosition(cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4 + changed_card_width + paddingX / 4, cc.winSize.height + changed_card_width / backCards[index].getContentSize().width * backCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8 + 3))
                        this.cloneCards[index].setPosition(cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4 + changed_card_width + paddingX / 4, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.addChild(backCards[index])
                        var fadeinAction = new cc.FadeIn(2)
                        backCards[index].runAction(fadeinAction)
                        await this.sleep(2000)
                        backCards[index].runAction(new cc.ScaleTo(0.3, 0, changed_card_width / backCards[index].getContentSize().width))
                        await this.sleep(300)
                        this.addChild(this.cloneCards[index])
                        this.cloneCards[index].runAction(new cc.ScaleTo(0.3, -1 * (changed_card_width / this.cloneCards[index].getContentSize().width), changed_card_width / this.cloneCards[index].getContentSize().width))
                        await this.sleep(300)
                    }
                    if (index == 4) {
                        backCards[index].setPosition(cc.p(cc.winSize.width / 2 - changed_card_width / 2 - paddingX / 4 - changed_card_width - paddingX / 4 - changed_card_width - paddingX / 4, cc.winSize.height + changed_card_width / backCards[index].getContentSize().width * backCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8 + 3))
                        this.cloneCards[index].setPosition(cc.p(cc.winSize.width / 2 - changed_card_width / 2 - paddingX / 4 - changed_card_width - paddingX / 4 - changed_card_width - paddingX / 4, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.addChild(backCards[index])
                        var rotationbyAction = new cc.RotateBy(0, -90)
                        var movebyAction = new cc.MoveBy(0, cc.p(paddingX / 4 * (-1), 0))
                        var fadeinAction = new cc.FadeIn(2)
                        backCards[index].runAction(rotationbyAction)
                        backCards[index].runAction(movebyAction)
                        backCards[index].runAction(fadeinAction)
                        await this.sleep(2000)
                        backCards[index].runAction(new cc.ScaleTo(0.3, 0, changed_card_width / backCards[index].getContentSize().width))
                        await this.sleep(300)
                        this.addChild(this.cloneCards[index])
                        this.cloneCards[index].runAction(rotationbyAction)
                        this.cloneCards[index].runAction(movebyAction)
                        this.cloneCards[index].runAction(new cc.ScaleTo(0.3, -1 * (changed_card_width / this.cloneCards[index].getContentSize().width), changed_card_width / this.cloneCards[index].getContentSize().width))
                        await this.sleep(300)

                    }
                    if (index == 5) {
                        backCards[index].setPosition(cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4 + changed_card_width + paddingX / 4 + changed_card_width + paddingX / 4, cc.winSize.height + changed_card_width / backCards[index].getContentSize().width * backCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8 + 3))
                        this.cloneCards[index].setPosition(cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4 + changed_card_width + paddingX / 4 + changed_card_width + paddingX / 4, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.addChild(backCards[index])
                        var rotationbyAction = new cc.RotateBy(0, -90)
                        var movebyAction = new cc.MoveBy(0, cc.p(paddingX / 4, 0))
                        var fadeinAction = new cc.FadeIn(2)
                        backCards[index].runAction(rotationbyAction)
                        backCards[index].runAction(movebyAction)
                        backCards[index].runAction(fadeinAction)
                        await this.sleep(2000)
                        backCards[index].runAction(new cc.ScaleTo(0.3, 0, changed_card_width / backCards[index].getContentSize().width))
                        await this.sleep(300)
                        this.addChild(this.cloneCards[index])
                        this.cloneCards[index].runAction(rotationbyAction)
                        this.cloneCards[index].runAction(movebyAction)
                        this.cloneCards[index].runAction(new cc.ScaleTo(0.3, -1 * (changed_card_width / this.cloneCards[index].getContentSize().width), changed_card_width / this.cloneCards[index].getContentSize().width))
                        await this.sleep(300)
                    }
                    await this.sleep(2000)
                }

                await this.sleep(2000)
                // show score
                var playerResult_RoundedRect_width = 30
                var playerResult_RoundedRect_height = 45
                var playerResult_RoundedRect = new RoundRect(playerResult_RoundedRect_width, playerResult_RoundedRect_height, cc.color(0, 0, 0), 2, cc.color(4, 186, 238), 5, null)
                var bankerResult_RoundedRect = new RoundRect(playerResult_RoundedRect_width, playerResult_RoundedRect_height, cc.color(0, 0, 0), 0, null, 5, null)
                playerResult_RoundedRect.setPosition(cc.p(paddingX * 2, cc.winSize.height - this.header_height - this.banner_height / 2))
                bankerResult_RoundedRect.setPosition(cc.p(cc.winSize.width - playerResult_RoundedRect_width - paddingX * 2, cc.winSize.height - this.header_height - this.banner_height / 2))
                this.addChild(playerResult_RoundedRect)
                this.addChild(bankerResult_RoundedRect)

                var playerResultLabel = new cc.LabelTTF("闲", "Arial", 17)
                playerResultLabel.attr({
                    fillStyle: cc.color(80, 142, 255),
                    x: playerResult_RoundedRect_width / 2,
                    y: playerResult_RoundedRect_height - playerResultLabel.getContentSize().height / 2 - 3,
                })
                playerResult_RoundedRect.addChild(playerResultLabel)
                var bankerResultLabel = new cc.LabelTTF("庄", "Arial", 17)
                bankerResultLabel.attr({
                    fillStyle: cc.color(255, 64, 71),
                    x: playerResult_RoundedRect_width / 2,
                    y: playerResult_RoundedRect_height - playerResultLabel.getContentSize().height / 2 - 3,
                })
                bankerResult_RoundedRect.addChild(bankerResultLabel)

                var playerResultScore = new cc.LabelTTF((Math.floor(Math.random() * 10)).toString(), "Arial", 15)
                playerResultScore.attr({
                    fillStyle: cc.color(255, 255, 255),
                    x: playerResult_RoundedRect_width / 2,
                    y: paddingY / 2
                })
                playerResult_RoundedRect.addChild(playerResultScore)
                var bankerResultScore = new cc.LabelTTF((Math.floor(Math.random() * 10)).toString(), "Arial", 15)
                bankerResultScore.attr({
                    fillStyle: cc.color(255, 255, 255),
                    x: playerResult_RoundedRect_width / 2,
                    y: paddingY / 2
                })
                bankerResult_RoundedRect.addChild(bankerResultScore)

                this.panelArea1.setOpacity(50)
                this.panelArea3.setOpacity(50)

                await this.sleep(7000)
                this.removeCards()
                for (let index = 0; index < backCards.length; index++) {
                    await this.removeChild(backCards[index])
                }
                this.removeCloneCards()
                this.removeChild(playerResult_RoundedRect)
                this.removeChild(bankerResult_RoundedRect)
                this.panelArea1.setOpacity(255)
                this.panelArea3.setOpacity(255)
                this.removeDealedCoins()
                this.betOpenInterval()
                return
            }
            draw_second = draw_second - 1
            if (draw_second < 10) this.infoText.setString("距开奖时间 00:0" + draw_second)
            else this.infoText.setString("距开奖时间 00:" + draw_second)
        }, 1000);
    },

    displaySerialPanel: function () {
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20
        var serial_num_height = 23
        this.serial_num_panel = new cc.DrawNode()
        this.serail_num_panel.clear()
        this.serial_num_panel.drawRect(cc.p(paddingX / 4, size.height - paddingY / 2), cc.p(paddingX / 2 + 10 * serial_num_height + 9 * paddingX / 4, size.height - paddingY / 2 - serial_num_height), null, 0, null)
        this.addChild(this.serial_num_panel)
        for (let index = 0; index < 10; index++) {
            this.serial_num[index] = new cc.Sprite(this.circleColors[index])
            var serial_num_scale = serial_num_height / this.serial_num[index].getContentSize().width
            this.serial_num[index].attr({
                scaleX: serial_num_scale,
                scaleY: serial_num_scale
            })
            this.serial_num[index].setPosition(serial_num_height / 2 + paddingX / 2, size.height - serial_num_height / 2 - paddingX / 2)
            var randomNumLabel = new cc.LabelTTF(Math.floor(Math.random() * 100).toString(), "Arial", 35)
            randomNumLabel.attr({
                fillStyle: cc.color(255, 255, 255),
            })
            randomNumLabel.enableStroke(cc.color(0, 0, 0), 2)
            randomNumLabel.setPosition(serial_num_height / (2 * serial_num_scale), serial_num_height / (2 * serial_num_scale) - randomNumLabel.getContentSize().height / 2 * serial_num_scale)
            this.serial_num_panel.addChild(this.serial_num[index])
            this.serial_num[index].addChild(randomNumLabel)


            var moveByAction = new cc.MoveBy(1, cc.p((serial_num_height + paddingX / 4) * index, 0))
            this.serial_num[index].runAction(cc.EaseBackInOut.create(moveByAction))
        }
    },

    displayCard: async function () {
        console.log("displayCard")
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20
        this.resultCards = []
        this.resultCardsIndexArray = this.generateRandomNumArray(0, 51, 10)
        var card_width = 50
        for (let index = 0; index < 5; index++) {
            this.resultCards[index] = new cc.Sprite(this.cards[this.resultCardsIndexArray[index]])
            this.resultCards[index].attr({
                flippedX: true,
                scaleX: 0,
                scaleY: card_width / this.resultCards[index].getContentSize().width,
                x: size.width / 2 - paddingX / 4 * 2 - card_width * 2 + (paddingX / 4 + card_width) * index,
                y: size.height - this.header_height - this.banner_height / 2 + paddingY / 8 + card_width / this.resultCards[index].getContentSize().width * this.resultCards[index].getContentSize().height / 2
            })
            this.cardBackSprite[index].runAction(new cc.ScaleTo(0.2, 0, card_width / this.cardBackSprite[index].getContentSize().width))
            await this.sleep(200)
            this.addChild(this.resultCards[index])
            this.resultCards[index].runAction(new cc.ScaleTo(0.2, -1 * (card_width / this.resultCards[index].getContentSize().width), (card_width / this.resultCards[index].getContentSize().width)))
            await this.sleep(200)
        }
        for (let index = 5; index < 10; index++) {
            this.resultCards[index] = new cc.Sprite(this.cards[this.resultCardsIndexArray[index]])
            this.resultCards[index].attr({
                flippedX: true,
                scaleX: 0,
                scaleY: card_width / this.resultCards[index].getContentSize().width,
                x: size.width / 2 - paddingX / 4 * 2 - card_width * 2 + (paddingX / 4 + card_width) * (index % 5),
                y: size.height - this.header_height - this.banner_height / 2 - paddingY / 8 - card_width / this.resultCards[index].getContentSize().width * this.resultCards[index].height / 2
            })

            this.cardBackSprite[index].runAction(new cc.ScaleTo(0.2, 0, card_width / this.cardBackSprite[index].getContentSize().width))
            await this.sleep(200)
            this.addChild(this.resultCards[index])
            this.resultCards[index].runAction(new cc.ScaleTo(0.2, -1 * (card_width / this.resultCards[index].getContentSize().width), (card_width / this.resultCards[index].getContentSize().width)))
            await this.sleep(150)
        }


    },

    removeCards: function () {
        console.log("removecards method")
        for (let index = 0; index < this.cardBackSprite.length; index++) {
            this.removeChild(this.cardBackSprite[index])
        }
        for (let index = 0; index < this.resultCards.length; index++) {
            this.removeChild(this.resultCards[index])
        }
    },

    removeCloneCards: function () {
        console.log("removeCloneCards method")
        for (let index = 0; index < this.cloneCards.length; index++) {
            this.removeChild(this.cloneCards[index])
        }
    },

    displaySerialPanel: function () {
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20
        var serial_num_height = 20
        this.serial_num_panel = null
        this.serial_num_panel = new cc.DrawNode()
        this.serial_num_panel.clear()
        this.serial_num_panel.drawRect(cc.p(paddingX / 2, size.height - paddingY / 2), cc.p(paddingX / 2 + 10 * serial_num_height + 9 * paddingX / 4, size.height - paddingY / 2 - serial_num_height), null, 0, null)
        this.addChild(this.serial_num_panel)
        for (let index = 0; index < 10; index++) {
            this.serial_num[index] = new cc.Sprite(this.circleColors[index])
            var serial_num_scale = serial_num_height / this.serial_num[index].getContentSize().width
            this.serial_num[index].attr({
                scaleX: serial_num_scale,
                scaleY: serial_num_scale
            })
            this.serial_num[index].setPosition(serial_num_height / 2 + paddingX / 2, size.height - serial_num_height / 2 - paddingX / 2)
            var randomNumLabel = new cc.LabelTTF(Math.floor(Math.random() * 100).toString(), "Arial", 35)
            randomNumLabel.attr({
                fillStyle: cc.color(255, 255, 255),
            })
            randomNumLabel.enableStroke(cc.color(0, 0, 0), 2)
            randomNumLabel.setPosition(serial_num_height / (2 * serial_num_scale), serial_num_height / (2 * serial_num_scale) - randomNumLabel.getContentSize().height / 2 * serial_num_scale)
            this.serial_num_panel.addChild(this.serial_num[index])
            this.serial_num[index].addChild(randomNumLabel)


            var moveByAction = new cc.MoveBy(1, cc.p((serial_num_height + paddingX / 4) * index, 0))
            this.serial_num[index].runAction(cc.EaseBackInOut.create(moveByAction))
        }
    },

    showCheckSuccessDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showCheckSuccessDlg")
                var paddingX = 20
                var paddingY = 20
                var checkSuccessDlg_zOrder = this.coinDealCheckDlg_zOrder + 1
                this.checkSuccessDlg_overLay = new cc.DrawNode()
                this.checkSuccessDlg_overLay.clear()
                this.checkSuccessDlg_overLay.drawRect(cc.p(0, 0), cc.p(cc.winSize.width, cc.winSize.height), cc.color(0, 0, 0, 100), 0)
                this.addChild(this.checkSuccessDlg_overLay, checkSuccessDlg_zOrder)
                var checkSuccessDlg_height = 120
                this.checkSuccessDlg = new RoundRect(cc.winSize.width - paddingX * 3, checkSuccessDlg_height, cc.color(255, 255, 255), 0, null, 10, null)
                this.checkSuccessDlg.setPosition(cc.p(paddingX * 3 / 2, cc.winSize.height / 2 - checkSuccessDlg_height / 2))
                this.addChild(this.checkSuccessDlg, checkSuccessDlg_zOrder)

                var checkSuccessDlgLabel = new cc.LabelTTF("下注成功", "Arial", 15)
                checkSuccessDlgLabel.attr({
                    fillStyle: cc.color(0, 0, 0),
                    x: this.checkSuccessDlg.getContentSize().width / 2,
                    y: checkSuccessDlg_height / 2 - checkSuccessDlgLabel.getContentSize().height / 2 + paddingY
                })
                this.checkSuccessDlg.addChild(checkSuccessDlgLabel)
                var dlgYesBtn = new ccui.Button(res.green_rounded_bg_rect_png, res.green_rounded_bg_rect_png, res.green_rounded_bg_rect_png)
                var dlgYesBtn_width = 100
                var dlgYesBtn_time = 5
                dlgYesBtn.attr({
                    pressedActionEnabled: true,
                    scaleX: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    scaleY: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    x: this.checkSuccessDlg.getContentSize().width / 2,
                    y: paddingY / 2 + dlgYesBtn_width / dlgYesBtn.getContentSize().width * dlgYesBtn.getContentSize().height / 2
                })
                dlgYesBtn.setTitleText("确定(" + dlgYesBtn_time + ")")
                dlgYesBtn.setTitleFontSize(40)
                dlgYesBtn.setTitleColor(cc.color(0, 0, 0))
                dlgYesBtn.addTouchEventListener(this.closeCheckSuccessDlg, this)
                this.checkSuccessDlg.addChild(dlgYesBtn)

                this.checkSuccessDlg_interval = setInterval(() => {
                    if (dlgYesBtn_time == 0) {
                        clearInterval(this.checkSuccessDlg_interval)
                        this.removeChild(this.checkSuccessDlg)
                        this.removeChild(this.checkSuccessDlg_overLay)
                        this.removeChild(this.coinDealCheckDlg)
                        this.removeChild(this.coinDealCheckDlg_overLay)
                        this.enableAllBtn()

                        // this.panelOneValRoundRect_Label.setFontFillColor(cc.color(34, 162, 211))
                        // this.panelTwoValRoundRect_Label.setFontFillColor(cc.color(34, 162, 211))
                        // this.panelThreeValRoundRect_Label.setFontFillColor(cc.color(34, 162, 211))
                    }
                    dlgYesBtn_time = dlgYesBtn_time - 1
                    dlgYesBtn.setTitleText("确定(" + dlgYesBtn_time + ")")
                }, 1000);

                this.coinDealCheckDlgYesBtn.setEnabled(false)
                this.coinDealCheckDlgNoBtn.setEnabled(false)
        }
    },

    closeCheckSuccessDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("closeCheckSuccessDlg")
                clearInterval(this.checkSuccessDlg_interval)
                this.removeChild(this.checkSuccessDlg)
                this.removeChild(this.checkSuccessDlg_overLay)
                this.removeChild(this.coinDealCheckDlg)
                this.removeChild(this.coinDealCheckDlg_overLay)

                if (this.panel1_ValRoundRect_Label !== null) this.panel1_ValRoundRect_Label.setColor(cc.color(34, 162, 211))
                if (this.panel2_ValRoundRect_Label !== null) this.panel2_ValRoundRect_Label.setColor(cc.color(34, 162, 211))
                if (this.panel3_ValRoundRect_Label !== null) this.panel3_ValRoundRect_Label.setColor(cc.color(34, 162, 211))
                if (this.panel4_ValRoundRect_Label !== null) this.panel4_ValRoundRect_Label.setColor(cc.color(34, 162, 211))
                if (this.panel5_ValRoundRect_Label !== null) this.panel5_ValRoundRect_Label.setColor(cc.color(34, 162, 211))
                if (this.panel6_ValRoundRect_Label !== null) this.panel6_ValRoundRect_Label.setColor(cc.color(34, 162, 211))
                if (this.panel7_ValRoundRect_Label !== null) this.panel7_ValRoundRect_Label.setColor(cc.color(34, 162, 211))
                setTimeout(() => {
                    this.enableAllBtn()
                }, 50);

        }
    },

    showDealCancelDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showDealCancelDlg")
                this.disableAllBtn()
                var paddingX = 20
                var paddingY = 20
                var dealCancelDlg_zOrder = this.coinDealCheckDlg_zOrder + 1
                var dealCancelDlg_height = 120
                this.dealCancelDlg_overLay = new cc.DrawNode()
                this.dealCancelDlg_overLay.clear()
                this.dealCancelDlg_overLay.drawRect(cc.p(0, 0), cc.p(cc.winSize.width, cc.winSize.height), cc.color(0, 0, 0, 100), 0)
                this.addChild(this.dealCancelDlg_overLay, dealCancelDlg_zOrder)
                this.dealCancelDlg = new RoundRect(cc.winSize.width - paddingX * 3, dealCancelDlg_height, cc.color(255, 255, 255), 0, null, 10, null)
                this.dealCancelDlg.setPosition(cc.p(paddingX * 3 / 2, cc.winSize.height / 2 - dealCancelDlg_height / 2))
                this.addChild(this.dealCancelDlg, dealCancelDlg_zOrder)

                var dealCancelDlgLabel = new cc.LabelTTF("你确定取消下注吗？", "Arial", 15)
                dealCancelDlgLabel.attr({
                    fillStyle: cc.color(0, 0, 0),
                    x: this.dealCancelDlg.getContentSize().width / 2,
                    y: dealCancelDlg_height / 2 - dealCancelDlgLabel.getContentSize().height / 2 + paddingY
                })
                this.dealCancelDlg.addChild(dealCancelDlgLabel, dealCancelDlg_zOrder)
                var dlgYesBtn = new ccui.Button(res.dlg_yes_btn_png, res.dlg_yes_btn_png, res.dlg_yes_btn_png)
                var dlgYesBtn_width = 70
                dlgYesBtn.attr({
                    scaleX: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    scaleY: dlgYesBtn_width / dlgYesBtn.getContentSize().width
                })
                var dlgNoBtn = new ccui.Button(res.dlg_no_btn_png, res.dlg_no_btn_png, res.dlg_no_btn_png)
                var dlgNoBtn_width = 70
                dlgNoBtn.attr({
                    scaleX: dlgNoBtn_width / dlgNoBtn.getContentSize().width,
                    scaleY: dlgNoBtn_width / dlgNoBtn.getContentSize().width
                })
                dlgYesBtn.setPosition(cc.p(dlgYesBtn_width / 2 + this.dealCancelDlg.getContentSize().width / 2 - dlgYesBtn_width - paddingX / 2,
                    dlgYesBtn_width / dlgYesBtn.getContentSize().width * dlgYesBtn.getContentSize().height / 2 + paddingY / 2))
                dlgNoBtn.setPosition(cc.p(dlgNoBtn_width / 2 + this.dealCancelDlg.getContentSize().width / 2 + paddingX / 2,
                    dlgYesBtn_width / dlgYesBtn.getContentSize().width * dlgYesBtn.getContentSize().height / 2 + paddingY / 2))
                dlgYesBtn.addTouchEventListener(this.cancelDealedCoins, this)
                dlgNoBtn.addTouchEventListener(this.closeCancelDlg, this)
                this.dealCancelDlg.addChild(dlgYesBtn, this.coinDealCheckDlg_zOrder)
                this.dealCancelDlg.addChild(dlgNoBtn, this.coinDealCheckDlg_zOrder)

                // disable coinDealCheckDlg
                this.coinDealCheckDlgYesBtn.setEnabled(false)
                this.coinDealCheckDlgYesBtn.setTouchEnabled(false)
                this.coinDealCheckDlgNoBtn.setEnabled(false)
                this.coinDealCheckDlgNoBtn.setTouchEnabled(false)
        }
    },

    cancelDealedCoins: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("cancelDealedCoins")
                this.removeChild(this.dealCancelDlg)
                this.removeChild(this.dealCancelDlg_overLay)

                this.coinDealCheckDlgYesBtn.setTouchEnabled(true)
                this.coinDealCheckDlgNoBtn.setTouchEnabled(true)

                this.removeChild(this.coinDealCheckDlg)
                this.removeChild(this.coinDealCheckDlg_overLay)

                this.enableAllBtn()
        }
    },
    closeCancelDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("closeCancelDlg")
                this.enabledCoinDrop = true
                this.removeChild(this.dealCancelDlg)
                this.removeChild(this.dealCancelDlg_overLay)
                this.coinDealCheckDlgYesBtn.setEnabled(true)
                this.coinDealCheckDlgYesBtn.setTouchEnabled(true)
                this.coinDealCheckDlgNoBtn.setEnabled(true)
                this.coinDealCheckDlgNoBtn.setTouchEnabled(true)
                break
        }
    },

    showWenluPanel: async function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var size = cc.winSize
                var paddingX = 20
                var paddingY = 20
                if (!this.wenluPanel_enabled) {
                    console.log("showWenluPanel")
                    var wenluPanel_height = this.banner_height - this.btnwrapSprite_y_delta
                    this.wenluPanel = new cc.LayerColor(cc.color(0, 0, 0), size.width, wenluPanel_height)
                    this.wenluPanel.setPosition(size.width * (-1), size.height - wenluPanel_height - this.header_height)
                    this.addChild(this.wenluPanel, this.wenluPanel_zOrder)
                    var wenluPanel_title = new cc.LabelTTF("路线", "Arial", 16)
                    wenluPanel_title.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: size.width / 2,
                        y: wenluPanel_height - paddingY - wenluPanel_title.getContentSize().height / 2
                    })
                    this.wenluPanel.addChild(wenluPanel_title)

                    // wenlu panel footer
                    var wenluPanelFooter_height = 25
                    var wenluPanelFooter_width = size.width - paddingX * 3
                    var wenluPanelFooter = new cc.LayerColor(cc.color(0, 0, 0), wenluPanelFooter_width, wenluPanelFooter_height)
                    wenluPanelFooter.setPosition(paddingX * 2, paddingY / 2)
                    this.wenluPanel.addChild(wenluPanelFooter)
                    this.zhupanluBtn = new ccui.Button(baccarat_res.zhupanlu_btn_active_png)
                    var zhupanluBtn_width = wenluPanelFooter_height / this.zhupanluBtn.getContentSize().height * this.zhupanluBtn.getContentSize().width
                    this.zhupanluBtn.attr({
                        pressedActionEnabled: true,
                        scaleX: zhupanluBtn_width / this.zhupanluBtn.getContentSize().width,
                        scaleY: zhupanluBtn_width / this.zhupanluBtn.getContentSize().width,
                        x: zhupanluBtn_width / 2,
                        y: wenluPanelFooter_height / 2
                    })
                    this.zhupanluBtn.addTouchEventListener(this.showZhupanluScrollView, this)
                    wenluPanelFooter.addChild(this.zhupanluBtn)
                    this.daluBtn = new ccui.Button(baccarat_res.dalu_btn_nonactive_png)
                    var daluBtn_width = wenluPanelFooter_height / this.daluBtn.getContentSize().height * this.daluBtn.getContentSize().width
                    this.daluBtn.attr({
                        pressedActionEnabled: true,
                        scaleX: daluBtn_width / this.daluBtn.getContentSize().width,
                        scaleY: daluBtn_width / this.daluBtn.getContentSize().width,
                        x: daluBtn_width / 2 + zhupanluBtn_width + paddingX / 4,
                        y: wenluPanelFooter_height / 2
                    })
                    this.daluBtn.addTouchEventListener(this.showDaluScrollView, this)
                    wenluPanelFooter.addChild(this.daluBtn)

                    var count_width = (wenluPanelFooter_width - zhupanluBtn_width - paddingX / 4 - daluBtn_width - paddingX / 4) / 5
                    var countBank = new cc.LayerColor(cc.color(255, 55, 62), count_width, wenluPanelFooter_height)
                    countBank.setPosition(zhupanluBtn_width + paddingX / 4 + daluBtn_width + paddingX / 4, 0)
                    wenluPanelFooter.addChild(countBank)
                    var countBankLabel = new cc.LabelTTF("庄 190", "Arial", 12)
                    countBankLabel.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: count_width / 2,
                        y: wenluPanelFooter_height / 2
                    })
                    countBank.addChild(countBankLabel)

                    var countPlayer = new cc.LayerColor(cc.color(51, 116, 255), count_width, wenluPanelFooter_height)
                    countPlayer.setPosition(zhupanluBtn_width + paddingX / 4 + daluBtn_width + paddingX / 4 + count_width, 0)
                    wenluPanelFooter.addChild(countPlayer)
                    var countPlayerLabel = new cc.LabelTTF("闲 161", "Arial", 12)
                    countPlayerLabel.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: count_width / 2,
                        y: wenluPanelFooter_height / 2
                    })
                    countPlayer.addChild(countPlayerLabel)

                    var countPair = new cc.LayerColor(cc.color(20, 153, 102), count_width, wenluPanelFooter_height)
                    countPair.setPosition(zhupanluBtn_width + paddingX / 4 + daluBtn_width + paddingX / 4 + count_width * 2, 0)
                    wenluPanelFooter.addChild(countPair)
                    var countPairLabel = new cc.LabelTTF("和 37", "Arial", 12)
                    countPairLabel.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: count_width / 2,
                        y: wenluPanelFooter_height / 2
                    })
                    countPair.addChild(countPairLabel)


                    var countBankPair = new cc.LayerColor(null, count_width, wenluPanelFooter_height)
                    countBankPair.setPosition(zhupanluBtn_width + paddingX / 4 + daluBtn_width + paddingX / 4 + count_width * 3, 0)
                    wenluPanelFooter.addChild(countBankPair)
                    var countBankPairRect = new cc.DrawNode()
                    countBankPairRect.clear()
                    countBankPairRect.drawRect(cc.p(0, 0), cc.p(count_width, wenluPanelFooter_height), cc.color(0, 0, 0), 1, cc.color(255, 55, 62))
                    countBankPair.addChild(countBankPairRect)
                    var countBankPairLabel = new cc.LabelTTF("对 24", "Arial", 12)
                    countBankPairLabel.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: count_width / 2,
                        y: wenluPanelFooter_height / 2
                    })
                    countBankPair.addChild(countBankPairLabel)

                    var countPlayerPair = new cc.LayerColor(null, count_width, wenluPanelFooter_height)
                    countPlayerPair.setPosition(zhupanluBtn_width + paddingX / 4 + daluBtn_width + paddingX / 4 + count_width * 4, 0)
                    wenluPanelFooter.addChild(countPlayerPair)
                    var countPlayerPairRect = new cc.DrawNode()
                    countPlayerPairRect.clear()
                    countPlayerPairRect.drawRect(cc.p(0, 0), cc.p(count_width, wenluPanelFooter_height), cc.color(0, 0, 0), 1, cc.color(51, 116, 255))
                    countPlayerPair.addChild(countPlayerPairRect)
                    var countPlayerPairLabel = new cc.LabelTTF("对 29", "Arial", 12)
                    countPlayerPairLabel.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: count_width / 2,
                        y: wenluPanelFooter_height / 2
                    })
                    countPlayerPair.addChild(countPlayerPairLabel)



                    // 珠盘路 zhupanlu scrollview
                    this.zhupanluScrollView = new ccui.ScrollView()
                    var zhupanluScrollView_height = wenluPanel_height - paddingY - wenluPanel_title.getContentSize().height - wenluPanelFooter_height - paddingY / 2
                    var zhupanluScrollView_width = size.width - paddingX * 3
                    this.zhupanluScrollView.attr({
                        innerHeight: zhupanluScrollView_height,
                        innerWidth: 700
                    })
                    this.zhupanluScrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL)
                    this.zhupanluScrollView.setTouchEnabled(true)
                    this.zhupanluScrollView.setBounceEnabled(true)
                    this.zhupanluScrollView.setContentSize(cc.size(zhupanluScrollView_width, zhupanluScrollView_height))
                    this.zhupanluScrollView.setPosition(paddingX * 2, paddingY / 2 + wenluPanelFooter_height)
                    this.zhupanluScrollView.setName("zhupanluScrollView")
                    this.wenluPanel.addChild(this.zhupanluScrollView)

                    for (let indexi = 0; indexi < 5; indexi++) {
                        for (let index = 0; index < 30; index++) {
                            var zplSprite_width = (size.width - paddingX * 3 - paddingX / 4 * 12) / 13
                            var zplSprite_name = "res/baccarat/zpl-" + Math.floor(Math.random() * 6) + ".png"
                            var zplSprite = new cc.Sprite(zplSprite_name)
                            zplSprite.attr({
                                scaleX: zplSprite_width / zplSprite.getContentSize().width,
                                scaleY: zplSprite_width / zplSprite.getContentSize().width,
                                x: zplSprite_width / 2 + index * (zplSprite_width + paddingX / 4),
                                y: zhupanluScrollView_height - zplSprite_width / 2 - paddingY / 2 - (zplSprite_width + paddingY / 4) * indexi
                            })
                            this.zhupanluScrollView.addChild(zplSprite)
                        }
                    }

                    // 大路 dalu scrollview
                    this.daluScrollView = new ccui.ScrollView()
                    var daluScrollView_height = wenluPanel_height - paddingY - wenluPanel_title.getContentSize().height - wenluPanelFooter_height - paddingY / 2
                    var daluScrollView_width = size.width - paddingX * 3
                    this.daluScrollView.attr({
                        innerHeight: daluScrollView_height,
                        innerWidth: 700
                    })
                    this.daluScrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL)
                    this.daluScrollView.setTouchEnabled(true)
                    this.daluScrollView.setBounceEnabled(true)
                    this.daluScrollView.setContentSize(cc.size(daluScrollView_width, daluScrollView_height))
                    this.daluScrollView.setPosition(paddingX * 2, paddingY / 2 + wenluPanelFooter_height)
                    this.daluScrollView.setName("daluScrollView")
                    // this.wenluPanel.addChild(this.daluScrollView)
                    for (let indexi = 0; indexi < 5; indexi++) {
                        for (let index = 0; index < 30; index++) {
                            var zplSprite_width = (size.width - paddingX * 3 - paddingX / 4 * 12) / 13
                            var zplSprite_name = "res/baccarat/dl-" + Math.floor(Math.random() * 4) + ".png"
                            var zplSprite = new cc.Sprite(zplSprite_name)
                            zplSprite.attr({
                                scaleX: zplSprite_width / zplSprite.getContentSize().width,
                                scaleY: zplSprite_width / zplSprite.getContentSize().width,
                                x: zplSprite_width / 2 + index * (zplSprite_width + paddingX / 4),
                                y: zhupanluScrollView_height - zplSprite_width / 2 - paddingY / 2 - (zplSprite_width + paddingY / 4) * indexi
                            })
                            this.daluScrollView.addChild(zplSprite)
                        }
                    }



                    var movebyAction = new cc.MoveBy(0.3, cc.p(size.width, 0))
                    this.wenluPanel.runAction(movebyAction)
                    this.wenluPanel_enabled = true
                    return
                } else {
                    console.log("closeWenluPanel")
                    var movebyAction = new cc.MoveBy(0.3, cc.p(size.width * (-1), 0))
                    this.wenluPanel.runAction(movebyAction)
                    await this.sleep(300)
                    this.removeChild(this.wenluPanel)
                    this.wenluPanel_enabled = false
                    return
                }
                break
        }
    },

    showZhupanluScrollView: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (this.wenluPanel.getChildByName("zhupanluScrollView")) {
                    console.log("zhupanluScrollView exist")
                    return
                }
                this.daluBtn.loadTextureNormal(baccarat_res.dalu_btn_nonactive_png)
                this.zhupanluBtn.loadTextureNormal(baccarat_res.zhupanlu_btn_active_png)
                this.wenluPanel.removeChild(this.daluScrollView)
                this.wenluPanel.addChild(this.zhupanluScrollView)

                break
        }
    },
    showDaluScrollView: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (this.wenluPanel.getChildByName("daluScrollView")) {
                    console.log("daluScrollView exist")
                    return
                }
                this.daluBtn.loadTextureNormal(baccarat_res.dalu_btn_active_png)
                this.zhupanluBtn.loadTextureNormal(baccarat_res.zhupanlu_btn_nonactive_png)
                this.wenluPanel.removeChild(this.zhupanluScrollView)
                this.wenluPanel.addChild(this.daluScrollView)
                break
        }
    },

    showHistory: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showHistory")
                var historyScene = new BaccaratHistoryScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, historyScene))
                break
        }
    },

    showHelp: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showHelp")
                cc.audioEngine.playEffect(home_res.game_item_mp3)
                var helpScene = new BaccaratHelpScene()
                // cc.director.popScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, helpScene))
                break
        }
    },

    enableSoundOnMethod: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("enableSoundOnMethod")
                cc.audioEngine.playEffect(home_res.game_item_mp3)
                if (this.enableSoundOn) {
                    this.soundOnBtn.loadTextureNormal(res.sound_off_btn_png)
                    this.enableSoundOn = !this.enableSoundOn
                    cc.audioEngine.setEffectsVolume(0)
                    cc.audioEngine.setMusicVolume(0)
                    return
                } else {
                    this.soundOnBtn.loadTextureNormal(res.sound_on_btn_png)
                    this.enableSoundOn = !this.enableSoundOn
                    cc.audioEngine.setMusicVolume(1)
                    cc.audioEngine.setEffectsVolume(1)
                    return
                }
        }
    },

    chooseCoin: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("choosecoin called")
                var size = cc.winSize
                cc.audioEngine.playEffect(res.choose_coin_wav)
                for (let index = 0; index < this.coins.length; index++) {
                    this.coins[index].attr({
                        scaleX: this.coin_width / this.coins[index].getNormalTextureSize().width,
                        scaleY: this.coin_width / this.coins[index].getNormalTextureSize().width
                    })
                }
                if (this.enabledCoin.findIndex(this.findTrue) === sender.getTitleFontSize().height) {
                    this.enabledCoin.fill(false)
                    sender.attr({
                        scaleX: this.coin_width / sender.getNormalTextureSize().width,
                        scaleY: this.coin_width / sender.getNormalTextureSize().width
                    })
                    return
                }
                this.enabledCoin.fill(false)
                sender.attr({
                    scaleX: (this.coin_width + 10) / sender.getNormalTextureSize().width,
                    scaleY: (this.coin_width + 10) / sender.getNormalTextureSize().width
                })
                this.enabledCoin[sender.getTitleFontSize().height] = true
                break
        }
    },

    enableAllBtn: function () {
        this.enabledCoinDrop = true
        this.goHomeBtn.setEnabled(true)
        this.soundOnBtn.setEnabled(true)
        this.helpBtn.setEnabled(true)
        this.historyBtn.setEnabled(true)
        if (this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length + this.panel4_DealedCoins.length + this.panel5_DealedCoins.length + this.panel6_DealedCoins.length + this.panel7_DealedCoins.length !== 0) {
            this.cancelBtn.setEnabled(true)
            this.confirmBtn.setEnabled(true)
        }
        for (let index = 0; index < this.coins.length; index++) {
            this.coins[index].setEnabled(true)
        }
    },

    disableAllBtn: function () {
        this.enabledCoinDrop = false
        this.goHomeBtn.setEnabled(false)
        this.soundOnBtn.setEnabled(false)
        this.helpBtn.setEnabled(false)
        this.historyBtn.setEnabled(false)
        this.cancelBtn.setEnabled(false)
        this.confirmBtn.setEnabled(false)
        for (let index = 0; index < this.coins.length; index++) {
            this.coins[index].setEnabled(false)
        }
    },

    removeDealedCoinsByClick: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.removeDealedCoins()
        }
    },

    removeDealedCoins: function () {
        console.log("remove dealed coins")
        for (let index = 0; index < (this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length + this.panel4_DealedCoins.length + this.panel5_DealedCoins.length + this.panel6_DealedCoins.length + this.panel7_DealedCoins.length); index++) {
            this.removeChildByTag(this.dealedCoins_tag)
        }
        this.betAmountTokenVal.setString("0.0")
        this.panel1_DealedCoins = []
        this.panel2_DealedCoins = []
        this.panel3_DealedCoins = []
        this.panel4_DealedCoins = []
        this.panel5_DealedCoins = []
        this.panel6_DealedCoins = []
        this.panel7_DealedCoins = []
        this.panelArea1.removeChild(this.panel1_ValRoundRect)
        this.panelArea2.removeChild(this.panel2_ValRoundRect)
        this.panelArea3.removeChild(this.panel3_ValRoundRect)
        this.panelArea4.removeChild(this.panel4_ValRoundRect)
        this.panelArea5.removeChild(this.panel5_ValRoundRect)
        this.panelArea6.removeChild(this.panel6_ValRoundRect)
        this.panelArea7.removeChild(this.panel7_ValRoundRect)
        this.confirmBtn.setEnabled(false)
        this.cancelBtn.setEnabled(false)

    },

    gotoHome: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                cc.audioEngine.end()
                cc.director.popScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, new HomeScene()))
        }
    },
})


var BaccaratGameScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var bgLayer = new BgLayer()
        this.addChild(bgLayer)
        var baccaratGameLayer = new BaccaratGameLayer()
        this.addChild(baccaratGameLayer)
    }
})
var SangongGameLayer = cc.Layer.extend({
    enabledCoin: [],
    circleColors: [],
    cards: [],
    open_state: true,
    close_state: false,
    alert_zOrder: 100,
    cardBackSprite: [],
    resultCards: [],
    resultCardsIndexArray: [],
    cloneCards: [],

    header_height: null,
    banner_height: null,

    serial_num_panel: null,
    serial_num: [],

    coinWrapSprite_height: null,
    betAmountBg_height: null,
    betAmountBg_height_delta: null,

    wenluBtn: null,
    wenluPanel: null,
    wenluPanel_zOrder: 8,
    wenluPanel_enabled: false,

    historyBtn: null,

    cardCountVal_num: null,
    cardCountVal: null,

    btnwrapSprite_height: null,
    btnwrapSprite_y_delta: null,
    btnwrapSprite_zOrder: 1,
    goHomeBtn: null,
    infoText: null,
    helpBtn: null,
    soundOnBtn: null,
    enableSoundOn: true,

    panelArea1: null,
    panelArea2: null,
    panelArea3: null,
    panelArea4: null,
    panelArea5: null,
    panelArea6: null,
    panelArea7: null,
    panelArea8: null,
    panelArea9: null,
    panelArea10: null,
    panelArea11: null,
    panelArea12: null,
    panelArea13: null,
    panelArea14: null,
    panel1_DealedCoins: [],
    panel2_DealedCoins: [],
    panel3_DealedCoins: [],
    panel4_DealedCoins: [],
    panel5_DealedCoins: [],
    panel6_DealedCoins: [],
    panel7_DealedCoins: [],
    panel8_DealedCoins: [],
    panel9_DealedCoins: [],
    panel10_DealedCoins: [],
    panel11_DealedCoins: [],
    panel12_DealedCoins: [],
    panel13_DealedCoins: [],
    panel14_DealedCoins: [],
    panel_ValRoundRect: [],
    panel_ValRoundRect_Label: [],

    dealedCoins_tag: 1,

    betAmountToken_RoundRect: null,
    betAmountTokenVal: null,

    coin_width: null,
    coinImages: null,
    coins: [],

    coinDropListener: null,
    enabledCoinDrop: true,

    coinDealCheckDlg_overLay: null,
    overLay_zOrder: 2, 
    coinDealCheckDlg_zOrder: null,
    coinDealCheckDlg: null,
    coinDealCheckDlgYesBtn: null,
    coinDealCheckDlgNoBtn: null,

    checkSuccessDlg_overLay: null,
    checkSuccessDlg: null,
    checkSuccessDlg_interval: null,

    dealCancelDlg_overLay: null,
    dealCancelDlg: null,


    ctor: function () {  
        this._super()
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20

        
        this.enabledCoin.fill(false)
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
        this.cardCountVal_num = 333
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
        this.gamePanel_border1 = 4
        this.gamePanel_border2 = 2

        this.panelArea1 = new cc.LayerColor(cc.color(25, 74, 148), size.width, this.gamePanel_height / 3 - this.gamePanel_border1 / 2 )
        this.panelArea1.setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_border1)
        this.addChild(this.panelArea1)
        var panelArea1Label = new cc.LabelTTF("庄", "Arial", 25)
        panelArea1Label.attr({
            fillStyle: cc.color(153, 255, 0),
            x: size.width / 2,
            y: this.gamePanel_height / 7 + 30
        })
        this.panelArea1.addChild(panelArea1Label)

        this.panelArea2Bg = new cc.LayerColor(cc.color(49, 91, 158), size.width / 2 + this.gamePanel_border2, this.gamePanel_height / 7 + this.gamePanel_border2)
        this.panelArea2Bg.setPosition(size.width / 4 - this.gamePanel_border2 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_border1 / 2)
        this.addChild(this.panelArea2Bg)

        this.panelArea2 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 2 - this.gamePanel_border2 * 2, this.gamePanel_height / 7)
        this.panelArea2.setPosition(size.width / 4 + this.gamePanel_border2 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_border1 / 2)
        this.addChild(this.panelArea2)

        var panelArea2Label = new cc.LabelTTF("庄对牌以上", "Arial", 18)
        panelArea2Label.attr({
            fillStyle: cc.color(153, 255, 0),
            x: size.width / 4,
            y: this.gamePanel_height / 14
        })
        this.panelArea2.addChild(panelArea2Label)

        this.panelArea3 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 2 - this.gamePanel_border1 / 2, this.gamePanel_height / 6 - this.gamePanel_border1 / 2 - this.gamePanel_border2 / 2)
        this.panelArea3.setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 * 3 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea3)
        var panelArea3Label = new cc.LabelTTF("对牌以上", "Arial", 18)
        panelArea3Label.attr({
            fillStyle: cc.color(77, 135, 242),
            x: size.width / 4,
            y: this.gamePanel_height / 12
        })
        this.panelArea3.addChild(panelArea3Label)

        this.panelArea4 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 2 - this.gamePanel_border1 / 2, this.gamePanel_height / 6 - this.gamePanel_border1 / 2 - this.gamePanel_border2 / 2)
        this.panelArea4.setPosition(size.width / 2 + this.gamePanel_border1 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 * 3 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea4)
        var panelArea4Label = new cc.LabelTTF("对牌以上", "Arial", 18)
        panelArea4Label.attr({
            fillStyle: cc.color(77, 135, 242),
            x: size.width / 4,
            y: this.gamePanel_height / 12
        })
        this.panelArea4.addChild(panelArea4Label)

        this.panelArea5 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - this.gamePanel_border2 / 2, this.gamePanel_height / 6 - this.gamePanel_border2)
        this.panelArea5.setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea5)
        var panelArea5Label = new cc.LabelTTF("三公 1:16", "Arial", 18)
        panelArea5Label.attr({
            fillStyle: cc.color(255, 0, 0),
            x: size.width / 8,
            y: this.gamePanel_height / 12
        })
        this.panelArea5.addChild(panelArea5Label)

        this.panelArea6 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - this.gamePanel_border1 / 2 - this.gamePanel_border2 / 2, this.gamePanel_height / 6 - this.gamePanel_border2)
        this.panelArea6.setPosition(size.width / 4 + this.gamePanel_border2 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea6)
        var panelArea6Label = new cc.LabelTTF("和 1:8", "Arial", 18)
        panelArea6Label.attr({
            fillStyle: cc.color(255, 0, 0),
            x: size.width / 8,
            y: this.gamePanel_height / 12
        })
        this.panelArea6.addChild(panelArea6Label)

        this.panelArea7 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - this.gamePanel_border1 / 2 - this.gamePanel_border2 / 2, this.gamePanel_height / 6 - this.gamePanel_border2)
        this.panelArea7.setPosition(size.width / 2 + this.gamePanel_border1 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea7)
        var panelArea7Label = new cc.LabelTTF("三公 1:16", "Arial", 18)
        panelArea7Label.attr({
            fillStyle: cc.color(255, 0, 0),
            x: size.width / 8,
            y: this.gamePanel_height / 12
        })
        this.panelArea7.addChild(panelArea7Label)

        this.panelArea8 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - this.gamePanel_border1 / 2 - this.gamePanel_border2 / 2, this.gamePanel_height / 6 - this.gamePanel_border2)
        this.panelArea8.setPosition(size.width / 4 * 3 + this.gamePanel_border2 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea8)
        var panelArea8Label = new cc.LabelTTF("和 1:8", "Arial", 18)
        panelArea8Label.attr({
            fillStyle: cc.color(255, 0, 0),
            x: size.width / 8,
            y: this.gamePanel_height / 12
        })
        this.panelArea8.addChild(panelArea8Label)

        this.panelArea9 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - this.gamePanel_border2 / 2, this.gamePanel_height / 6 - this.gamePanel_border2)
        this.panelArea9.setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea9)
        var panelArea9Label = new cc.LabelTTF("赢 1:0.95", "Arial", 18)
        panelArea9Label.attr({
            fillStyle: cc.color(77, 135, 242),
            x: size.width / 8,
            y: this.gamePanel_height / 12
        })
        this.panelArea9.addChild(panelArea9Label)

        this.panelArea10 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - this.gamePanel_border1 / 2 - this.gamePanel_border2 / 2, this.gamePanel_height / 6 - this.gamePanel_border2)
        this.panelArea10.setPosition(size.width / 4 + this.gamePanel_border2 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea10)
        var panelArea10Label = new cc.LabelTTF("輸 1:0.95", "Arial", 18)
        panelArea10Label.attr({
            fillStyle: cc.color(77, 135, 242),
            x: size.width / 8,
            y: this.gamePanel_height / 12
        })
        this.panelArea10.addChild(panelArea10Label)

        this.panelArea11 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - this.gamePanel_border1 / 2 - this.gamePanel_border2 / 2, this.gamePanel_height / 6 - this.gamePanel_border2)
        this.panelArea11.setPosition(size.width / 2 + this.gamePanel_border1 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea11)
        var panelArea11Label = new cc.LabelTTF("赢 1:0.95", "Arial", 18)
        panelArea11Label.attr({
            fillStyle: cc.color(77, 135, 242),
            x: size.width / 8,
            y: this.gamePanel_height / 12
        })
        this.panelArea11.addChild(panelArea11Label)

        this.panelArea12 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 4 - this.gamePanel_border1 / 2 - this.gamePanel_border2 / 2, this.gamePanel_height / 6 - this.gamePanel_border2)
        this.panelArea12.setPosition(size.width / 4 * 3 + this.gamePanel_border2 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 + this.gamePanel_border2 / 2)
        this.addChild(this.panelArea12)
        var panelArea12Label = new cc.LabelTTF("輸 1:0.95", "Arial", 18)
        panelArea12Label.attr({
            fillStyle: cc.color(77, 135, 242),
            x: size.width / 8,
            y: this.gamePanel_height / 12
        })
        this.panelArea12.addChild(panelArea12Label)

        this.panelArea13 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 2 - this.gamePanel_border1 / 2, this.gamePanel_height / 6 - this.gamePanel_border2 / 2)
        this.panelArea13.setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta )
        this.addChild(this.panelArea13)
        var panelArea13Label = new cc.LabelTTF("闲1", "Arial", 25)
        panelArea13Label.attr({
            fillStyle: cc.color(0, 102, 204),
            x: size.width / 4,
            y: this.gamePanel_height / 12
        })
        this.panelArea13.addChild(panelArea13Label)

        this.panelArea14 = new cc.LayerColor(cc.color(25, 74, 148), size.width / 2 - this.gamePanel_border1 / 2, this.gamePanel_height / 6 - this.gamePanel_border2 / 2)
        this.panelArea14.setPosition(size.width / 2 + this.gamePanel_border1 / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta)
        this.addChild(this.panelArea14)
        var panelArea14Label = new cc.LabelTTF("闲2", "Arial", 25)
        panelArea14Label.attr({
            fillStyle: cc.color(0, 102, 204),
            x: size.width / 4,
            y: this.gamePanel_height / 12
        })
        this.panelArea14.addChild(panelArea14Label)
        

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

        this.coinDropListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: (touch, event) => {
                console.log("coinDropListener called")
                if (!this.enabledCoinDrop) return
                var touch_x = touch.getLocation().x
                var touch_y = touch.getLocation().y
                if (touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + paddingY) ||
                    touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height - paddingY)) {
                    return
                }
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
                    if (touch_x > 0 && 
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + paddingY)) {
                        
                        if (touch_x > (size.width / 4 + this.gamePanel_border2 / 2 + paddingX) &&
                            touch_x < (size.width / 4 * 3 - this.gamePanel_border2 / 2 - paddingX) &&
                            touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_border1 / 2 + paddingY) &&
                            touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 7 - this.gamePanel_border2 / 2 - paddingY)) {
                                if (this.panel2_DealedCoins.length === 0) {
                                    this.panel_ValRoundRect_Label[1] = new cc.LabelTTF(coinVal, "Arial", 13)
                                    this.panel_ValRoundRect_Label[1].attr({
                                        fillStyle: cc.color(255, 255, 255),
                                    })
                                    this.panel_ValRoundRect[1] = new RoundRect(60, this.panel_ValRoundRect_Label[1].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                    this.panel_ValRoundRect_Label[1].setPosition(cc.p(this.panel_ValRoundRect[1].getContentSize().width / 2, this.panel_ValRoundRect_Label[1].getContentSize().height / 2))
                                    this.panel_ValRoundRect[1].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                    this.panelArea2.addChild(this.panel_ValRoundRect[1])
                                    this.panel_ValRoundRect[1].addChild(this.panel_ValRoundRect_Label[1])
                                }
                                console.log("wefwef")
                                cc.audioEngine.playEffect(res.coin_drop_wav)
                                this.panel2_DealedCoins.push(coinVal)
                                this.panel_ValRoundRect_Label[1].setString(this.sumCoins(this.panel2_DealedCoins))
                                this.addChild(coinItem, 0, this.dealedCoins_tag)
                        } else {
                            if (touch_x > (size.width / 4 - this.gamePanel_border2 / 2 - paddingX) && touch_x < (size.width / 4 + this.gamePanel_border2 / 2 + paddingX) &&
                                touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_border1 / 2 + paddingY) &&
                                touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 7 - this.gamePanel_border2 / 2 - paddingY)) {
                                    return
                            }
                            if (touch_x > (size.width / 4 + this.gamePanel_border2 / 2 + paddingX) && touch_x < (size.width / 4 * 3 - this.gamePanel_border2 / 2 - paddingX) &&
                                touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_border1 / 2 + paddingY) &&
                                touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 7 - this.gamePanel_border2 / 2 - paddingY)) {
                                    return
                            }
                            if (touch_x > (size.width / 4 * 3 - this.gamePanel_border2 / 2 - paddingX) && touch_x < (size.width / 4 * 3 + this.gamePanel_border2 / 2 + paddingX) &&
                                touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_border1 / 2 + paddingY) &&
                                touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 7 - this.gamePanel_border2 / 2 - paddingY)) {
                                    return
                            }
                            if (touch_x > (size.width / 4 + this.gamePanel_border2 / 2 + paddingX) && 
                                touch_x < (size.width / 4 * 3 - this.gamePanel_border2 / 2 - paddingX) &&
                                touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 7 + this.gamePanel_border2 / 2 + paddingY) &&
                                touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 7 - this.gamePanel_border2 / 2 - paddingY)) {
                                    return
                            }
                            if (this.panel1_DealedCoins.length === 0) {
                                this.panel_ValRoundRect_Label[0] = new cc.LabelTTF(coinVal, "Arial", 13)
                                this.panel_ValRoundRect_Label[0].attr({
                                    fillStyle: cc.color(255, 255, 255),
                                })
                                this.panel_ValRoundRect[0] = new RoundRect(60, this.panel_ValRoundRect_Label[0].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                this.panel_ValRoundRect_Label[0].setPosition(cc.p(this.panel_ValRoundRect[0].getContentSize().width / 2, this.panel_ValRoundRect_Label[0].getContentSize().height / 2))
                                this.panel_ValRoundRect[0].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                this.panelArea1.addChild(this.panel_ValRoundRect[0])
                                this.panel_ValRoundRect[0].addChild(this.panel_ValRoundRect_Label[0])
                            }
                            cc.audioEngine.playEffect(res.coin_drop_wav)
                            this.panel1_DealedCoins.push(coinVal)
                            this.panel_ValRoundRect_Label[0].setString(this.sumCoins(this.panel1_DealedCoins))
                            this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }
                    }

                    if (touch_x > 0 && touch_x < (size.width / 2 - this.gamePanel_border2 / 2 - paddingX) &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2 + this.gamePanel_border2 / 2 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 - this.gamePanel_border2 / 2 - paddingY)) {
                            if (this.panel3_DealedCoins.length === 0) {
                                this.panel_ValRoundRect_Label[2] = new cc.LabelTTF(coinVal, "Arial", 13)
                                this.panel_ValRoundRect_Label[2].attr({
                                    fillStyle: cc.color(255, 255, 255),
                                })
                                this.panel_ValRoundRect[2] = new RoundRect(60, this.panel_ValRoundRect_Label[2].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                this.panel_ValRoundRect_Label[2].setPosition(cc.p(this.panel_ValRoundRect[2].getContentSize().width / 2, this.panel_ValRoundRect_Label[2].getContentSize().height / 2))
                                this.panel_ValRoundRect[2].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                this.panelArea3.addChild(this.panel_ValRoundRect[2])
                                this.panel_ValRoundRect[2].addChild(this.panel_ValRoundRect_Label[2])
                            }
                            cc.audioEngine.playEffect(res.coin_drop_wav)
                            this.panel3_DealedCoins.push(coinVal)
                            this.panel_ValRoundRect_Label[2].setString(this.sumCoins(this.panel3_DealedCoins))
                            this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }

                    if (touch_x > (size.width / 2 + this.gamePanel_border1 / 2 + paddingX) &&
                        touch_x < size.width &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2 + this.gamePanel_border2 / 2 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 - this.gamePanel_border2 / 2 - paddingY)) {
                            if (this.panel4_DealedCoins.length === 0) {
                                this.panel_ValRoundRect_Label[3] = new cc.LabelTTF(coinVal, "Arial", 13)
                                this.panel_ValRoundRect_Label[3].attr({
                                    fillStyle: cc.color(255, 255, 255),
                                })
                                this.panel_ValRoundRect[3] = new RoundRect(60, this.panel_ValRoundRect_Label[3].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                this.panel_ValRoundRect_Label[3].setPosition(cc.p(this.panel_ValRoundRect[3].getContentSize().width / 2, this.panel_ValRoundRect_Label[3].getContentSize().height / 2))
                                this.panel_ValRoundRect[3].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                this.panelArea4.addChild(this.panel_ValRoundRect[3])
                                this.panel_ValRoundRect[3].addChild(this.panel_ValRoundRect_Label[3])
                            }
                            cc.audioEngine.playEffect(res.coin_drop_wav)
                            this.panel4_DealedCoins.push(coinVal)
                            this.panel_ValRoundRect_Label[3].setString(this.sumCoins(this.panel4_DealedCoins))
                            this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }

                    if (touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 + this.gamePanel_border2 / 2 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2 - this.gamePanel_border2 / 2 - paddingY)) {
                        
                        if (touch_x > 0 &&
                            touch_x < (size.width / 4 - this.gamePanel_border2 / 2 - paddingX)) {
                                if (this.panel5_DealedCoins.length === 0) {
                                    this.panel_ValRoundRect_Label[4] = new cc.LabelTTF(coinVal, "Arial", 13)
                                    this.panel_ValRoundRect_Label[4].attr({
                                        fillStyle: cc.color(255, 255, 255),
                                    })
                                    this.panel_ValRoundRect[4] = new RoundRect(60, this.panel_ValRoundRect_Label[4].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                    this.panel_ValRoundRect_Label[4].setPosition(cc.p(this.panel_ValRoundRect[4].getContentSize().width / 2, this.panel_ValRoundRect_Label[4].getContentSize().height / 2))
                                    this.panel_ValRoundRect[4].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                    this.panelArea5.addChild(this.panel_ValRoundRect[4])
                                    this.panel_ValRoundRect[4].addChild(this.panel_ValRoundRect_Label[4])
                                }
                                cc.audioEngine.playEffect(res.coin_drop_wav)
                                this.panel5_DealedCoins.push(coinVal)
                                this.panel_ValRoundRect_Label[4].setString(this.sumCoins(this.panel5_DealedCoins))
                                this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }

                        if (touch_x > (size.width / 4 + this.gamePanel_border2 / 2 + paddingX) &&
                            touch_x < (size.width / 2 - this.gamePanel_border2 / 2 - paddingX)) {
                                if (this.panel6_DealedCoins.length === 0) {
                                    this.panel_ValRoundRect_Label[5] = new cc.LabelTTF(coinVal, "Arial", 13)
                                    this.panel_ValRoundRect_Label[5].attr({
                                        fillStyle: cc.color(255, 255, 255),
                                    })
                                    this.panel_ValRoundRect[5] = new RoundRect(60, this.panel_ValRoundRect_Label[5].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                    this.panel_ValRoundRect_Label[5].setPosition(cc.p(this.panel_ValRoundRect[5].getContentSize().width / 2, this.panel_ValRoundRect_Label[5].getContentSize().height / 2))
                                    this.panel_ValRoundRect[5].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                    this.panelArea6.addChild(this.panel_ValRoundRect[5])
                                    this.panel_ValRoundRect[5].addChild(this.panel_ValRoundRect_Label[5])
                                }
                                cc.audioEngine.playEffect(res.coin_drop_wav)
                                this.panel6_DealedCoins.push(coinVal)
                                this.panel_ValRoundRect_Label[5].setString(this.sumCoins(this.panel6_DealedCoins))
                                this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }

                        if (touch_x > (size.width / 2 + this.gamePanel_border1 / 2 + paddingX) &&
                            touch_x < (size.width / 4 * 3 - this.gamePanel_border2 / 2 - paddingX)) {
                                if (this.panel7_DealedCoins.length === 0) {
                                    this.panel_ValRoundRect_Label[6] = new cc.LabelTTF(coinVal, "Arial", 13)
                                    this.panel_ValRoundRect_Label[6].attr({
                                        fillStyle: cc.color(255, 255, 255),
                                    })
                                    this.panel_ValRoundRect[6] = new RoundRect(60, this.panel_ValRoundRect_Label[6].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                    this.panel_ValRoundRect_Label[6].setPosition(cc.p(this.panel_ValRoundRect[6].getContentSize().width / 2, this.panel_ValRoundRect_Label[6].getContentSize().height / 2))
                                    this.panel_ValRoundRect[6].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                    this.panelArea7.addChild(this.panel_ValRoundRect[6])
                                    this.panel_ValRoundRect[6].addChild(this.panel_ValRoundRect_Label[6])
                                }
                                cc.audioEngine.playEffect(res.coin_drop_wav)
                                this.panel7_DealedCoins.push(coinVal)
                                this.panel_ValRoundRect_Label[6].setString(this.sumCoins(this.panel7_DealedCoins))
                                this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }

                        if (touch_x > (size.width / 4 * 3 + this.gamePanel_border2 / 2 + paddingX) &&
                            touch_x < size.width) {
                                if (this.panel8_DealedCoins.length === 0) {
                                    this.panel_ValRoundRect_Label[7] = new cc.LabelTTF(coinVal, "Arial", 13)
                                    this.panel_ValRoundRect_Label[7].attr({
                                        fillStyle: cc.color(255, 255, 255),
                                    })
                                    this.panel_ValRoundRect[7] = new RoundRect(60, this.panel_ValRoundRect_Label[7].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                    this.panel_ValRoundRect_Label[7].setPosition(cc.p(this.panel_ValRoundRect[7].getContentSize().width / 2, this.panel_ValRoundRect_Label[7].getContentSize().height / 2))
                                    this.panel_ValRoundRect[7].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                    this.panelArea8.addChild(this.panel_ValRoundRect[7])
                                    this.panel_ValRoundRect[7].addChild(this.panel_ValRoundRect_Label[7])
                                }
                                cc.audioEngine.playEffect(res.coin_drop_wav)
                                this.panel8_DealedCoins.push(coinVal)
                                this.panel_ValRoundRect_Label[7].setString(this.sumCoins(this.panel8_DealedCoins))
                                this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }
                    }

                    if (touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 + this.gamePanel_border2 / 2 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 - this.gamePanel_border2 / 2 - paddingY)) {
                        
                            if (touch_x > 0 &&
                                touch_x < (size.width / 4 - this.gamePanel_border2 / 2 - paddingX)) {
                                    if (this.panel9_DealedCoins.length === 0) {
                                        this.panel_ValRoundRect_Label[8] = new cc.LabelTTF(coinVal, "Arial", 13)
                                        this.panel_ValRoundRect_Label[8].attr({
                                            fillStyle: cc.color(255, 255, 255),
                                        })
                                        this.panel_ValRoundRect[8] = new RoundRect(60, this.panel_ValRoundRect_Label[8].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                        this.panel_ValRoundRect_Label[8].setPosition(cc.p(this.panel_ValRoundRect[8].getContentSize().width / 2, this.panel_ValRoundRect_Label[8].getContentSize().height / 2))
                                        this.panel_ValRoundRect[8].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                        this.panelArea9.addChild(this.panel_ValRoundRect[8])
                                        this.panel_ValRoundRect[8].addChild(this.panel_ValRoundRect_Label[8])
                                    }
                                    cc.audioEngine.playEffect(res.coin_drop_wav)
                                    this.panel9_DealedCoins.push(coinVal)
                                    this.panel_ValRoundRect_Label[8].setString(this.sumCoins(this.panel9_DealedCoins))
                                    this.addChild(coinItem, 0, this.dealedCoins_tag)
                            }
    
                            if (touch_x > (size.width / 4 + this.gamePanel_border2 / 2 + paddingX) &&
                                touch_x < (size.width / 2 - this.gamePanel_border2 / 2 - paddingX)) {
                                    if (this.panel10_DealedCoins.length === 0) {
                                        this.panel_ValRoundRect_Label[9] = new cc.LabelTTF(coinVal, "Arial", 13)
                                        this.panel_ValRoundRect_Label[9].attr({
                                            fillStyle: cc.color(255, 255, 255),
                                        })
                                        this.panel_ValRoundRect[9] = new RoundRect(60, this.panel_ValRoundRect_Label[9].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                        this.panel_ValRoundRect_Label[9].setPosition(cc.p(this.panel_ValRoundRect[9].getContentSize().width / 2, this.panel_ValRoundRect_Label[9].getContentSize().height / 2))
                                        this.panel_ValRoundRect[9].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                        this.panelArea10.addChild(this.panel_ValRoundRect[9])
                                        this.panel_ValRoundRect[9].addChild(this.panel_ValRoundRect_Label[9])
                                    }
                                    cc.audioEngine.playEffect(res.coin_drop_wav)
                                    this.panel10_DealedCoins.push(coinVal)
                                    this.panel_ValRoundRect_Label[9].setString(this.sumCoins(this.panel10_DealedCoins))
                                    this.addChild(coinItem, 0, this.dealedCoins_tag)
                            }
    
                            if (touch_x > (size.width / 2 + this.gamePanel_border1 / 2 + paddingX) &&
                                touch_x < (size.width / 4 * 3 - this.gamePanel_border2 / 2 - paddingX)) {
                                    if (this.panel11_DealedCoins.length === 0) {
                                        this.panel_ValRoundRect_Label[10] = new cc.LabelTTF(coinVal, "Arial", 13)
                                        this.panel_ValRoundRect_Label[10].attr({
                                            fillStyle: cc.color(255, 255, 255),
                                        })
                                        this.panel_ValRoundRect[10] = new RoundRect(60, this.panel_ValRoundRect_Label[10].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                        this.panel_ValRoundRect_Label[10].setPosition(cc.p(this.panel_ValRoundRect[10].getContentSize().width / 2, this.panel_ValRoundRect_Label[10].getContentSize().height / 2))
                                        this.panel_ValRoundRect[10].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                        this.panelArea11.addChild(this.panel_ValRoundRect[10])
                                        this.panel_ValRoundRect[10].addChild(this.panel_ValRoundRect_Label[10])
                                    }
                                    cc.audioEngine.playEffect(res.coin_drop_wav)
                                    this.panel11_DealedCoins.push(coinVal)
                                    this.panel_ValRoundRect_Label[10].setString(this.sumCoins(this.panel11_DealedCoins))
                                    this.addChild(coinItem, 0, this.dealedCoins_tag)
                            }
    
                            if (touch_x > (size.width / 4 * 3 + this.gamePanel_border2 / 2 + paddingX) &&
                                touch_x < size.width) {
                                    if (this.panel12_DealedCoins.length === 0) {
                                        this.panel_ValRoundRect_Label[11] = new cc.LabelTTF(coinVal, "Arial", 13)
                                        this.panel_ValRoundRect_Label[11].attr({
                                            fillStyle: cc.color(255, 255, 255),
                                        })
                                        this.panel_ValRoundRect[11] = new RoundRect(60, this.panel_ValRoundRect_Label[11].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                        this.panel_ValRoundRect_Label[11].setPosition(cc.p(this.panel_ValRoundRect[11].getContentSize().width / 2, this.panel_ValRoundRect_Label[11].getContentSize().height / 2))
                                        this.panel_ValRoundRect[11].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                        this.panelArea12.addChild(this.panel_ValRoundRect[11])
                                        this.panel_ValRoundRect[11].addChild(this.panel_ValRoundRect_Label[11])
                                    }
                                    cc.audioEngine.playEffect(res.coin_drop_wav)
                                    this.panel12_DealedCoins.push(coinVal)
                                    this.panel_ValRoundRect_Label[11].setString(this.sumCoins(this.panel12_DealedCoins))
                                    this.addChild(coinItem, 0, this.dealedCoins_tag)
                            }
                    }

                    if (touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 - this.gamePanel_border2 / 2 - paddingY)) {
                            
                        if (touch_x > 0 &&
                            touch_x < size.width / 2 - this.gamePanel_border1 / 2 - paddingX) {
                                if (this.panel13_DealedCoins.length === 0) {
                                    this.panel_ValRoundRect_Label[12] = new cc.LabelTTF(coinVal, "Arial", 13)
                                    this.panel_ValRoundRect_Label[12].attr({
                                        fillStyle: cc.color(255, 255, 255),
                                    })
                                    this.panel_ValRoundRect[12] = new RoundRect(60, this.panel_ValRoundRect_Label[12].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                    this.panel_ValRoundRect_Label[12].setPosition(cc.p(this.panel_ValRoundRect[12].getContentSize().width / 2, this.panel_ValRoundRect_Label[12].getContentSize().height / 2))
                                    this.panel_ValRoundRect[12].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                    this.panelArea13.addChild(this.panel_ValRoundRect[12])
                                    this.panel_ValRoundRect[12].addChild(this.panel_ValRoundRect_Label[12])
                                }
                                cc.audioEngine.playEffect(res.coin_drop_wav)
                                this.panel13_DealedCoins.push(coinVal)
                                this.panel_ValRoundRect_Label[12].setString(this.sumCoins(this.panel13_DealedCoins))
                                this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }

                        if (touch_x > (size.width / 2 + this.gamePanel_border1 / 2 + paddingX) &&
                            touch_x < size.width) {
                                if (this.panel14_DealedCoins.length === 0) {
                                    this.panel_ValRoundRect_Label[13] = new cc.LabelTTF(coinVal, "Arial", 13)
                                    this.panel_ValRoundRect_Label[13].attr({
                                        fillStyle: cc.color(255, 255, 255),
                                    })
                                    this.panel_ValRoundRect[13] = new RoundRect(60, this.panel_ValRoundRect_Label[13].getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                    this.panel_ValRoundRect_Label[13].setPosition(cc.p(this.panel_ValRoundRect[13].getContentSize().width / 2, this.panel_ValRoundRect_Label[13].getContentSize().height / 2))
                                    this.panel_ValRoundRect[13].setPosition(cc.p(paddingX / 2, paddingY / 2))
                                    this.panelArea14.addChild(this.panel_ValRoundRect[13])
                                    this.panel_ValRoundRect[13].addChild(this.panel_ValRoundRect_Label[13])
                                }
                                cc.audioEngine.playEffect(res.coin_drop_wav)
                                this.panel14_DealedCoins.push(coinVal)
                                this.panel_ValRoundRect_Label[13].setString(this.sumCoins(this.panel14_DealedCoins))
                                this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }
                    }

                    if (this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length + this.panel4_DealedCoins.length + this.panel5_DealedCoins.length + this.panel6_DealedCoins.length + this.panel7_DealedCoins.length + this.panel8_DealedCoins.length + this.panel9_DealedCoins.length + this.panel10_DealedCoins.length + this.panel11_DealedCoins.length + this.panel12_DealedCoins.length + this.panel13_DealedCoins.length + this.panel14_DealedCoins.length !== 0) {
                        this.cancelBtn.setEnabled(true)
                        this.confirmBtn.setEnabled(true)
                    }

                    this.betAmountTokenVal.setString(this.sumCoins(this.panel1_DealedCoins) + this.sumCoins(this.panel2_DealedCoins) + this.sumCoins(this.panel3_DealedCoins) + this.sumCoins(this.panel4_DealedCoins) + this.sumCoins(this.panel5_DealedCoins) + this.sumCoins(this.panel6_DealedCoins) + this.sumCoins(this.panel7_DealedCoins) + this.sumCoins(this.panel8_DealedCoins) + this.sumCoins(this.panel9_DealedCoins) + this.sumCoins(this.panel10_DealedCoins) + this.sumCoins(this.panel11_DealedCoins) + this.sumCoins(this.panel12_DealedCoins) + this.sumCoins(this.panel13_DealedCoins) + this.sumCoins(this.panel14_DealedCoins))
                }
            }
        })
        cc.eventManager.addListener(this.coinDropListener, this)

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

    betOpenInterval: async function () {
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
        var countCloseSecond = setInterval(async () => {
            if (close_second == 0) {
                clearInterval(countCloseSecond)
                this.close_state = true
                await this.displayCard()
                await this.drawInterval()
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
                for (let index = 0; index < this.resultCards.length; index++) {
                    this.resultCards[index].setScaleX(changed_card_width / this.resultCards[index].getContentSize().width * (-1))
                    this.resultCards[index].setScaleY(changed_card_width / this.resultCards[index].getContentSize().width)
                }
                for (let index = 0; index < this.resultCards.length; index++) {
                    var scaletoAction = new cc.ScaleTo(0, changed_card_width / this.resultCards[index].getContentSize().width * (-1), changed_card_width / this.resultCards[index].getContentSize().width)
                    var movetoAction
                    if (index < 5) {
                        movetoAction = new cc.MoveTo(0.5, cc.p(cc.winSize.width / 2 - paddingX / 8 * 2 - changed_card_width * 2 + (paddingX / 8 + changed_card_width) * index, cc.winSize.height - this.header_height - this.banner_height / 2 + paddingY / 8 + changed_card_width / this.resultCards[index].getContentSize().width * this.resultCards[index].getContentSize().height / 2 + paddingY))
                    }else {
                        movetoAction = new cc.MoveTo(0.5, cc.p(cc.winSize.width / 2 - paddingX / 8 * 2 - changed_card_width * 2 + (paddingX / 8 + changed_card_width) * (index % 5), cc.winSize.height - this.header_height - this.banner_height / 2 + paddingY / 8 - changed_card_width / this.resultCards[index].getContentSize().width * this.resultCards[index].getContentSize().height / 2 - paddingY / 8 + paddingY))
                    }
                    var actionSequence = new cc.Sequence(movetoAction)
                    this.resultCards[index].runAction(actionSequence)
                }
                var choosedCardNum = this.generateRandomNumArray(0, 9, 6)

                // four cards copy for first showed
                this.cloneCards = []
                for (let index = 0; index < choosedCardNum.length; index++) {
                    this.cloneCards[index] = new cc.Sprite(this.cards[this.resultCardsIndexArray[choosedCardNum[index]]])
                    this.cloneCards[index].attr({
                        scaleX: changed_card_width / this.cloneCards[index].getContentSize().width,
                        scaleY: changed_card_width /  this.cloneCards[index].getContentSize().width
                    })
                    this.cloneCards[index].setPosition(this.resultCards[choosedCardNum[index]].getPosition())
                    await this.sleep(2000)
                    this.resultCards[choosedCardNum[index]].attr({
                        opacity: 150
                    })
                    this.addChild(this.cloneCards[index])
                    if (index < 2) {
                        var movetoAction = new cc.MoveTo(0.3, cc.p(cc.winSize.width / 2 - changed_card_width / 2 - paddingX / 4 - changed_card_width - paddingX / 4 + (paddingX / 4 + changed_card_width) * index, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.cloneCards[index].runAction(movetoAction)

                    }else if (index > 1 && index < 4) {
                        var movetoAction = new cc.MoveTo(0.3, cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4 + (changed_card_width + paddingX / 4) * (index - 2), cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.cloneCards[index].runAction(movetoAction)
                    }else {
                        // baccarat's third card rule action added
                        var movetoAction = null
                        if (index == 4) movetoAction = new cc.MoveTo(0.3, cc.p(cc.winSize.width / 2 + changed_card_width / 2 - paddingX / 4 - (changed_card_width + paddingX / 4) * 2 - changed_card_width, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        else if (index == 5) movetoAction = new cc.MoveTo(0.3, cc.p(cc.winSize.width / 2 + changed_card_width / 2 + paddingX / 4 + (changed_card_width + paddingX / 4) * 2, cc.winSize.height + changed_card_width / this.cloneCards[index].getContentSize().width * this.cloneCards[index].getContentSize().height - this.header_height - this.banner_height - paddingY / 8))
                        this.cloneCards[index].runAction(movetoAction)
                    }
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
                this.panelArea9.setOpacity(50)
                this.panelArea13.setOpacity(50)

                await this.sleep(7000)
                this.removeCards()
                this.removeCloneCards()
                this.removeChild(playerResult_RoundedRect)
                this.removeChild(bankerResult_RoundedRect)
                this.panelArea1.setOpacity(255)
                this.panelArea9.setOpacity(255)
                this.panelArea13.setOpacity(255)
                this.removeDealedCoins()
                this.betOpenInterval()
                return
            }
            draw_second = draw_second - 1
            if (draw_second < 10) this.infoText.setString("距开奖时间 00:0" + draw_second)
            else this.infoText.setString("距开奖时间 00:" + draw_second)
        }, 1000);
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
        this.cloneCards = []
    },

    displaySerialPanel: function () {
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20
        var serial_num_height = 20
        this.serial_num_panel = new cc.LayerColor(cc.color(0, 0, 0, 0), serial_num_height * 10 + paddingX / 5 * 9, serial_num_height)
        this.serial_num_panel.setPosition(paddingX / 2, size.height - serial_num_height - paddingY / 2)
        this.addChild(this.serial_num_panel)
        for (let index = 0; index < 10; index++) {
            this.serial_num[index] = new cc.Sprite(this.circleColors[index])
            var serial_num_scale = serial_num_height / this.serial_num[index].getContentSize().width
            this.serial_num[index].attr({
                scaleX: serial_num_scale,
                scaleY: serial_num_scale
            })
            this.serial_num[index].setPosition(serial_num_height / 2, serial_num_height / 2)
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

    showHelp: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showHelp")
                cc.audioEngine.playEffect(home_res.game_item_mp3)
                var helpScene = new SangongHelpScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, helpScene))
                break
        }
    },

    showHistory: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showHistory")
                cc.audioEngine.playEffect(home_res.game_item_mp3)
                var historyScene = new SangongHistoryScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, historyScene))
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
                    var wenluPanel_height = this.banner_height - paddingY / 2
                    this.wenluPanel = new cc.LayerColor(cc.color(0, 0, 0), size.width, wenluPanel_height)
                    this.wenluPanel.setPosition(size.width * (-1), size.height - this.header_height - this.banner_height + paddingY / 2)
                    this.addChild(this.wenluPanel, this.wenluPanel_zOrder)
                    var wenluPanel_title = new cc.LabelTTF("开奖走势", "Arial", 16)
                    wenluPanel_title.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: size.width / 2,
                        y: wenluPanel_height - paddingY - wenluPanel_title.getContentSize().height / 2
                    })
                    this.wenluPanel.addChild(wenluPanel_title)

                    var playerOneLabel = new cc.LabelTTF("闲1", "Arial", 15)
                    playerOneLabel.attr({
                        fillStyle: cc.color(53, 168, 224),
                        x: playerOneLabel.getContentSize().width / 2 + paddingX * 3 / 2,
                        y: wenluPanel_height - playerOneLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2
                    })
                    this.wenluPanel.addChild(playerOneLabel)
                    var barLetter1 = new cc.LabelTTF("|", "Arial", 15)
                    barLetter1.attr({
                        fillStyle: cc.color(153, 153, 153),
                        x: barLetter1.getContentSize().width / 2 + paddingX * 3 / 2 + playerOneLabel.getContentSize().width + paddingX / 4,
                        y: wenluPanel_height - playerOneLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2
                    })
                    this.wenluPanel.addChild(barLetter1)
                    for (let index = 0; index < 13; index++) {
                        var wenlu_win_fail_array = [res.wenlu_win_png, res.wenlu_fail_png]
                        var wenlu_win_fail_width = (size.width - paddingX * 3 - playerOneLabel.getContentSize().width - barLetter1.getContentSize().width - paddingX / 4) / 13 - paddingX / 4
                        var wenlu_win_fail = new cc.Sprite(wenlu_win_fail_array[Math.floor(Math.random() * 13) % 2])
                        wenlu_win_fail.attr({
                            scaleX: wenlu_win_fail_width / wenlu_win_fail.getContentSize().width,
                            scaleY: wenlu_win_fail_width / wenlu_win_fail.getContentSize().width,
                            x: wenlu_win_fail_width / 2 + paddingX * 3 / 2 + playerOneLabel.getContentSize().width + paddingX / 4 + barLetter1.getContentSize().width + paddingX / 4 + index * (wenlu_win_fail_width + paddingX / 4),
                            y: wenluPanel_height - playerOneLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2
                        })
                        this.wenluPanel.addChild(wenlu_win_fail)
                    }


                    var playerTwoLabel = new cc.LabelTTF("闲2", "Arial", 15)
                    playerTwoLabel.attr({
                        fillStyle: cc.color(53, 168, 224),
                        x: playerTwoLabel.getContentSize().width / 2 + paddingX * 3 / 2,
                        y: wenluPanel_height - playerTwoLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
                    })
                    this.wenluPanel.addChild(playerTwoLabel)
                    var barLetter2 = new cc.LabelTTF("|", "Arial", 15)
                    barLetter2.attr({
                        fillStyle: cc.color(153, 153, 153),
                        x: barLetter2.getContentSize().width / 2 + paddingX * 3 / 2 + playerTwoLabel.getContentSize().width + paddingX / 4,
                        y: wenluPanel_height - playerTwoLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
                    })
                    this.wenluPanel.addChild(barLetter2)
                    for (let index = 0; index < 13; index++) {
                        var wenlu_win_fail_array = [res.wenlu_win_png, res.wenlu_fail_png]
                        var wenlu_win_fail_width = (size.width - paddingX * 3 - playerTwoLabel.getContentSize().width - barLetter2.getContentSize().width - paddingX / 4) / 13 - paddingX / 4
                        var wenlu_win_fail = new cc.Sprite(wenlu_win_fail_array[Math.floor(Math.random() * 13) % 2])
                        wenlu_win_fail.attr({
                            scaleX: wenlu_win_fail_width / wenlu_win_fail.getContentSize().width,
                            scaleY: wenlu_win_fail_width / wenlu_win_fail.getContentSize().width,
                            x: wenlu_win_fail_width / 2 + paddingX * 3 / 2 + playerTwoLabel.getContentSize().width + paddingX / 4 + barLetter2.getContentSize().width + paddingX / 4 + index * (wenlu_win_fail_width + paddingX / 4),
                            y: wenluPanel_height - playerTwoLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
                        })
                        this.wenluPanel.addChild(wenlu_win_fail)
                    }

                    var bankLabel = new cc.LabelTTF("庄  ", "Arial", 15)
                    bankLabel.attr({
                        fillStyle: cc.color(53, 168, 224),
                        x: bankLabel.getContentSize().width / 2 + paddingX * 3 / 2,
                        y: wenluPanel_height - bankLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
                    })
                    this.wenluPanel.addChild(bankLabel)
                    var barLetter3 = new cc.LabelTTF("|", "Arial", 15)
                    barLetter3.attr({
                        fillStyle: cc.color(153, 153, 153),
                        x: barLetter3.getContentSize().width / 2 + paddingX * 3 / 2 + bankLabel.getContentSize().width + paddingX / 4,
                        y: wenluPanel_height - bankLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
                    })
                    this.wenluPanel.addChild(barLetter3)
                    for (let index = 0; index < 13; index++) {
                        var wenlu_win_fail_array = [res.wenlu_win_png, res.wenlu_fail_png]
                        var wenlu_win_fail_width = (size.width - paddingX * 3 - bankLabel.getContentSize().width - barLetter3.getContentSize().width - paddingX / 4) / 13 - paddingX / 4
                        var wenlu_win_fail = new cc.Sprite(wenlu_win_fail_array[Math.floor(Math.random() * 13) % 2])
                        wenlu_win_fail.attr({
                            scaleX: wenlu_win_fail_width / wenlu_win_fail.getContentSize().width,
                            scaleY: wenlu_win_fail_width / wenlu_win_fail.getContentSize().width,
                            x: wenlu_win_fail_width / 2 + paddingX * 3 / 2 + bankLabel.getContentSize().width + paddingX / 4 + barLetter3.getContentSize().width + paddingX / 4 + index * (wenlu_win_fail_width + paddingX / 4),
                            y: wenluPanel_height - bankLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
                        })
                        this.wenluPanel.addChild(wenlu_win_fail)
                    }
                    
                    var movebyAction = new cc.MoveBy(0.3, cc.p(size.width , 0))
                    this.wenluPanel.runAction(movebyAction)
                    this.wenluPanel_enabled = true
                    return
                }else {
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

    gotoHome: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                cc.audioEngine.end()
                cc.director.popScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, new HomeScene()))
        }
    },

    chooseCoin: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("choosecoin called")
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
        if (this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length + this.panel4_DealedCoins.length + this.panel5_DealedCoins.length + this.panel6_DealedCoins.length + this.panel7_DealedCoins.length + this.panel8_DealedCoins.length + this.panel9_DealedCoins.length + this.panel10_DealedCoins.length + this.panel11_DealedCoins.length + this.panel12_DealedCoins.length + this.panel13_DealedCoins.length + this.panel14_DealedCoins.length !== 0) {
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
        for (let index = 0; index < (this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length + this.panel4_DealedCoins.length + this.panel5_DealedCoins.length + this.panel6_DealedCoins.length + this.panel7_DealedCoins.length + this.panel8_DealedCoins.length + this.panel9_DealedCoins.length + this.panel10_DealedCoins.length + this.panel11_DealedCoins.length + this.panel12_DealedCoins.length + this.panel13_DealedCoins.length + this.panel14_DealedCoins.length); index++) {
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
        this.panel8_DealedCoins = []
        this.panel9_DealedCoins = []
        this.panel10_DealedCoins = []
        this.panel11_DealedCoins = []
        this.panel12_DealedCoins = []
        this.panel13_DealedCoins = []
        this.panel14_DealedCoins = []

        for (let index = 0; index < this.panel_ValRoundRect.length; index++) {
            eval("this.panelArea" + (index + 1).toString()).removeChild(this.panel_ValRoundRect[index])
        }

        this.confirmBtn.setEnabled(false)
        this.cancelBtn.setEnabled(false)

    },

    showCoinDealCheckDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showcoindealcheckdlg")
                this.disableAllBtn()
                // coinDealCheckDlg
                var paddingX = 20
                var paddingY = 20
                this.coinDealCheckDlg_overLay = new cc.LayerColor(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height)
                this.addChild(this.coinDealCheckDlg_overLay, this.overLay_zOrder)
                this.coinDealCheckDlg_zOrder = this.overLay_zOrder + 1
                var coinDealCheckDlg_height = 620
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
                field2Label.setPosition(cc.p(field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4))
                field3Label.setPosition(cc.p(field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4))
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
                    var field2Val = new cc.LabelTTF("住", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(145, 244, 8),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("1", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel1_DealedCoins), "Arial", 16)
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
                    var field2Val = new cc.LabelTTF("庄 对牌以上", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(145, 244, 8),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("1", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel2_DealedCoins), "Arial", 16)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel13_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲1", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(62, 115, 212),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("1", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel13_DealedCoins), "Arial", 16)
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
                    var field2Val = new cc.LabelTTF("闲1 对牌以上", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(62, 115, 212),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("1", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel3_DealedCoins), "Arial", 16)
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
                    var field2Val = new cc.LabelTTF("闲1 三公", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(255, 0, 0),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("16", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel5_DealedCoins), "Arial", 16)
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
                    var field2Val = new cc.LabelTTF("闲1 和", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(255, 0, 0),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("8", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel6_DealedCoins), "Arial", 16)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel9_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲1 赢", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(62, 115, 212),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("0.95", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel9_DealedCoins), "Arial", 16)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel10_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲1 输", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(62, 115, 212),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("0.95", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel10_DealedCoins), "Arial", 16)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }



                if (this.panel14_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲2", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(62, 115, 212),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("1", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel14_DealedCoins), "Arial", 16)
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
                    var field2Val = new cc.LabelTTF("闲2 对牌以上", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(62, 115, 212),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("1", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel4_DealedCoins), "Arial", 16)
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
                    var field2Val = new cc.LabelTTF("闲2 三公", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(255, 0, 0),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("16", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel7_DealedCoins), "Arial", 16)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel8_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲2 和", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(255, 0, 0),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("1", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel8_DealedCoins), "Arial", 16)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel11_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲2 赢", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(62, 115, 212),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("0.95", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel11_DealedCoins), "Arial", 16)
                    field4Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                if (this.panel12_DealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲2 输", "Arial", 16)
                    field2Val.attr({
                        fillStyle: cc.color(62, 115, 212),
                        x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3Val = new cc.LabelTTF("0.95", "Arial", 16)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
                    })
                    this.coinDealCheckDlg.addChild(field3Val)
                    var field4RoundRect_width = 120
                    var field4RoundRect_height = checkRadioSprite_width
                    var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF(this.sumCoins(this.panel12_DealedCoins), "Arial", 16)
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
                var totalfieldVal = new cc.LabelTTF((this.sumCoins(this.panel1_DealedCoins) + this.sumCoins(this.panel2_DealedCoins) + this.sumCoins(this.panel3_DealedCoins) + this.sumCoins(this.panel4_DealedCoins) + this.sumCoins(this.panel5_DealedCoins) + this.sumCoins(this.panel6_DealedCoins) + this.sumCoins(this.panel7_DealedCoins) + this.sumCoins(this.panel8_DealedCoins) + this.sumCoins(this.panel9_DealedCoins) + this.sumCoins(this.panel10_DealedCoins) + this.sumCoins(this.panel11_DealedCoins) + this.sumCoins(this.panel12_DealedCoins) + this.sumCoins(this.panel13_DealedCoins) + this.sumCoins(this.panel14_DealedCoins)).toString(), "Arial", 18)
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
                    pressedActionEnabled: true,
                    scaleX: coinDealCheckDlgYesBtn_width / this.coinDealCheckDlgYesBtn.getContentSize().width,
                    scaleY: coinDealCheckDlgYesBtn_width / this.coinDealCheckDlgYesBtn.getContentSize().width
                })
                this.coinDealCheckDlgNoBtn = new ccui.Button(res.dlg_no_btn_png, res.dlg_no_btn_png, res.dlg_no_btn_png)
                var coinDealCheckDlgNoBtn_width = 70
                this.coinDealCheckDlgNoBtn.attr({
                    pressedActionEnabled: true,
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

    showCheckSuccessDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showCheckSuccessDlg")
                var paddingX = 20
                var paddingY = 20
                var checkSuccessDlg_zOrder = this.coinDealCheckDlg_zOrder + 1
                this.checkSuccessDlg_overLay = new cc.LayerColor(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height)
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

                        for (let index = 0; index < this.panel_ValRoundRect.length; index++) {
                            if (this.panel_ValRoundRect_Label[index] !== null && this.panel_ValRoundRect_Label[index] !== undefined) {
                                this.panel_ValRoundRect_Label[index].setColor(cc.color(34, 162, 211))
                            }
                        }
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

                for (let index = 0; index < this.panel_ValRoundRect.length; index++) {
                    if (this.panel_ValRoundRect_Label[index] !== null && this.panel_ValRoundRect_Label[index] !== undefined) {
                        this.panel_ValRoundRect_Label[index].setColor(cc.color(34, 162, 211))
                    }
                }

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
                this.dealCancelDlg_overLay = new cc.LayerColor(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height)
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
                    pressedActionEnabled: true,
                    scaleX: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    scaleY: dlgYesBtn_width / dlgYesBtn.getContentSize().width
                })
                var dlgNoBtn = new ccui.Button(res.dlg_no_btn_png, res.dlg_no_btn_png, res.dlg_no_btn_png)
                var dlgNoBtn_width = 70
                dlgNoBtn.attr({
                    pressedActionEnabled: true,
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
})

var SangongGameScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var bgLayer = new BgLayer()
        this.addChild(bgLayer)
        var gameLayer = new SangongGameLayer()
        this.addChild(gameLayer)
    }
})

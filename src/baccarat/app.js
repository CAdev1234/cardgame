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
    header_height: null,
    serail_num_panel: null,
    serial_num: [],
    banner_height: null,
    historyBtn: null,
    goHomeBtn: null,
    infoText: null,
    helpBtn: null,
    soundOnBtn: null,
    enableSoundOn: true,

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
        var num_period_label = new cc.LabelTTF.create("期数")
        var num_period_value = new cc.LabelTTF.create("31071466-1")
        num_period_label.attr({
            x: size.width - num_period_label.getContentSize().width / 2 - num_period_value.getContentSize().width,
            y: size.height - this.header_height / 2 - 2,
            fillStyle: cc.color(233, 133, 62),
            fontSize: num_period_font_size
        })
        this.addChild(num_period_label)
        num_period_value.attr({
            x: size.width - num_period_value.getContentSize().width / 2,
            y: size.height - this.header_height / 2 - 2,
            fillStyle: cc.color(255, 255, 255),
            fontSize: num_period_font_size
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

        this.historyBtn = new ccui.Button(res.history_btn_png)
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
        var cardCountVal = new cc.LabelTTF("156/416", "Arial", 15)
        cardCountVal.attr({
            fillStyle: cc.color(255, 255, 255),
            x: cardCountVal.getContentSize().width / 2 + paddingX / 4 + cardCountSprite_width,
            y: size.height - this.header_height - paddingY
        })
        this.addChild(cardCountVal)
        console.log("bannerHeight = ", this.banner_height)

        // card back sprite
        setTimeout(async () => {
            var cardBackSprite = []
            var card_width = 50
            var renderingTime = [0.12, 0.11, 0.1, 0.11, 0.12]
            for (let index = 0; index < 5; index++) {
                cardBackSprite[index] = new cc.Sprite(baccarat_res.card_back_png)
                cardBackSprite[index].attr({
                    scaleX: card_width / cardBackSprite[index].getContentSize().width,
                    scaleY: card_width / cardBackSprite[index].getContentSize().width,
                    x: size.width / 2,
                    y: size.height + card_width / cardBackSprite[index].getContentSize().width * cardBackSprite[index].getContentSize().height / 2
                })
                this.addChild(cardBackSprite[index])
                var movetoAction = new cc.MoveTo(renderingTime[index], cc.p(size.width / 2 - paddingX / 4 * 2 - card_width * 2 + (paddingX / 4 + card_width) * index, size.height - this.header_height - this.banner_height / 2 + paddingY / 8 + card_width / cardBackSprite[index].getContentSize().width * cardBackSprite[index].getContentSize().height / 2))
                await this.sleep(100)
                cardBackSprite[index].runAction(movetoAction)
                await this.sleep(1000)
                var flipYAction = new cc.FlipY3D(1000)
                cardBackSprite[index].runAction(flipYAction)

            }
            for (let index = 5; index < 10; index++) {
                cardBackSprite[index] = new cc.Sprite(baccarat_res.card_back_png)
                cardBackSprite[index].attr({
                    scaleX: card_width / cardBackSprite[index].getContentSize().width,
                    scaleY: card_width / cardBackSprite[index].getContentSize().width,
                    x: size.width / 2,
                    y: size.height + card_width / cardBackSprite[index].getContentSize().width * cardBackSprite[index].getContentSize().height / 2
                })
                this.addChild(cardBackSprite[index])
                var movetoAction = new cc.MoveTo(renderingTime[index % 5], size.width / 2 - paddingX / 4 * 2 - card_width * 2 + (paddingX / 4 + card_width) * (index % 5), size.height - this.header_height - this.banner_height / 2 - paddingY / 8 - card_width / cardBackSprite[index].getContentSize().width * cardBackSprite[index].height / 2)
                await this.sleep(100)
                cardBackSprite[index].runAction(movetoAction)
            }
        }, 2000);

        // btnwrap sprite
        var btnwrapSprite = new cc.Sprite(res.btn_wrap_png)
        var btnwrapSprite_width = size.width
        var btnwrapSprite_height = btnwrapSprite_width / btnwrapSprite.getContentSize().width * btnwrapSprite.getContentSize().height
        var btnwrapSprite_y_delta = 10
        btnwrapSprite.attr({
            scaleX: btnwrapSprite_width / btnwrapSprite.getContentSize().width,
            scaleY: btnwrapSprite_width / btnwrapSprite.getContentSize().width,
            x: btnwrapSprite_width / 2,
            y: size.height - btnwrapSprite_height / 2 - this.header_height - this.banner_height + btnwrapSprite_y_delta
        })
        this.addChild(btnwrapSprite, this.btnwrapSprite_zOrder)

        this.goHomeBtn = new ccui.Button(res.home_btn_png, res.home_btn_png, res.home_btn_png)
        var goHomeBtn_width = 60
        var goHomeBtn_height = goHomeBtn_width / this.goHomeBtn.getContentSize().width * this.goHomeBtn.getContentSize().height
        this.goHomeBtn.attr({
            pressedActionEnabled: true,
            x: size.width / 6,
            y: size.height - goHomeBtn_height / 2 - this.header_height - this.banner_height + btnwrapSprite_y_delta,
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
        this.gamePanel_height = size.height - this.header_height - this.banner_height - this.coinWrapSprite_height - this.betAmountBg_height + btnwrapSprite_y_delta
        this.panelArea1 = new cc.DrawNode()
        var panelArea1_width = size.width / 4 - 1
        this.panelArea1.drawRect(cc.p(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta), cc.p(panelArea1_width, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height), cc.color(25, 74, 148), 0, null)
        this.addChild(this.panelArea1)
        var panelLabel1 = new cc.LabelTTF("闲", "Arial", 40)
        panelLabel1.attr({
            fillStyle: cc.color(80, 141, 255),
            x: panelArea1_width / 2,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2
        })
        this.panelArea1.addChild(panelLabel1)
        var panelLabel1_rate = new cc.LabelTTF("1:2", "Arial", 15)
        panelLabel1_rate.attr({
            fillStyle: cc.color(80, 141, 255),
            x: panelArea1_width / 2,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2 - panelLabel1.getContentSize().height / 2 - paddingY / 4
        })
        this.panelArea1.addChild(panelLabel1_rate)

        

        this.panelArea2 = new cc.DrawNode()
        this.panelArea2.drawRect(cc.p(panelArea1_width + 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2), cc.p(size.width / 2 - 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height), cc.color(25, 74, 148), 0, null)
        this.addChild(this.panelArea2)
        var panelLabel2 = new cc.LabelTTF("大", "Arial", 20)
        panelLabel2.attr({
            fillStyle: cc.color(80, 141, 255),
            x: size.width / 4 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 6
        })
        this.panelArea2.addChild(panelLabel2)
        var panelLabel2_rate = new cc.LabelTTF("1:0.5", "Arial", 15)
        panelLabel2_rate.attr({
            fillStyle: cc.color(80, 141, 255),
            x: size.width / 4 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 6 - panelLabel2.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea2.addChild(panelLabel2_rate)


        this.panelArea3 = new cc.DrawNode()
        this.panelArea3.drawRect(cc.p(size.width / 2 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2), cc.p(size.width / 4 * 3 - 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height), cc.color(25, 74, 148), 0, null)
        this.addChild(this.panelArea3)
        var panelLabel3 = new cc.LabelTTF("小", "Arial", 20)
        panelLabel3.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 2 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 6
        })
        this.panelArea3.addChild(panelLabel3)
        var panelLabel3_rate = new cc.LabelTTF("1:0.5", "Arial", 15)
        panelLabel3_rate.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 2 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + this.gamePanel_height / 6 - panelLabel3.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea3.addChild(panelLabel3_rate)

        this.panelArea4 = new cc.DrawNode()
        this.panelArea4.drawRect(cc.p(size.width / 4 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 + 1), cc.p(size.width / 4 * 3 - 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 - 2), cc.color(25, 74, 148), 0, null)
        this.addChild(this.panelArea4)
        var panelLabel4 = new cc.LabelTTF("和 1:8", "Arial", 40)
        panelLabel4.attr({
            fillStyle: cc.color(0, 220, 52),
            x: size.width / 2,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2
        })
        this.panelArea4.addChild(panelLabel4)

        this.panelArea5 = new cc.DrawNode()
        this.panelArea5.drawRect(cc.p(size.width / 4 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta), cc.p(size.width / 2 - 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 - 1), cc.color(25, 74, 148), 0, null)
        this.addChild(this.panelArea5)
        var panelLabel5 = new cc.LabelTTF("闲对", "Arial", 20)
        panelLabel5.attr({
            fillStyle: cc.color(80, 141, 255),
            x: size.width / 4 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6
        })
        this.panelArea5.addChild(panelLabel5)
        var panelLabel5_rate = new cc.LabelTTF("1:12", "Arial", 15)
        panelLabel5_rate.attr({
            fillStyle: cc.color(80, 141, 255),
            x: size.width / 4 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 - panelLabel5.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea5.addChild(panelLabel5_rate)

        this.panelArea6 = new cc.DrawNode()
        this.panelArea6.drawRect(cc.p(size.width / 2 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta), cc.p(size.width / 4 * 3 - 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 - 1), cc.color(25, 74, 148), 0, null)
        this.addChild(this.panelArea6)
        var panelLabel6 = new cc.LabelTTF("庄对", "Arial", 20)
        panelLabel6.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 2 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6
        })
        this.panelArea6.addChild(panelLabel6)
        var panelLabel6_rate = new cc.LabelTTF("1:12", "Arial", 15)
        panelLabel6_rate.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 2 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 6 - panelLabel6.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea6.addChild(panelLabel6_rate)


        this.panelArea7 = new cc.DrawNode()
        var panelArea7_width = size.width / 4 - 1
        this.panelArea7.drawRect(cc.p(size.width / 4 * 3 + 1, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta), cc.p(size.width, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height), cc.color(25, 74, 148), 0, null)
        this.addChild(this.panelArea7)
        var panelLabel7 = new cc.LabelTTF("庄", "Arial", 40)
        panelLabel7.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 4 * 3 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2
        })
        this.panelArea7.addChild(panelLabel7)
        var panelLabel7_rate = new cc.LabelTTF("1:1.95", "Arial", 15)
        panelLabel7_rate.attr({
            fillStyle: cc.color(255, 64, 71),
            x: size.width / 4 * 3 + size.width / 8,
            y: this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2 - panelLabel7.getContentSize().height / 2 - paddingY / 2
        })
        this.panelArea7.addChild(panelLabel7_rate)

        // footer
        var betAmountBg = new cc.LayerColor(cc.color(0, 0, 0, 150), size.width, this.betAmountBg_height)
        betAmountBg.setPosition(cc.p(0, this.coinWrapSprite_height - this.betAmountBg_height_delta))
        this.addChild(betAmountBg)

        var betAmountTotalSprite = cc.Sprite.create(res.bet_amount_total_png)
        var betAmountTotalSprite_width = 20
        var betAmountTotalSprite_height = betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width * betAmountTotalSprite.getContentSize().height
        betAmountTotalSprite.attr({
            x: betAmountTotalSprite_width / 2 + paddingX / 2,
            y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height,
            scaleX: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width,
            scaleY: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width
        })
        this.addChild(betAmountTotalSprite)

        var betAmountTotalVal = cc.LabelTTF.create("2000.0", "Arial", 15)
        betAmountTotalVal.attr({
            x: betAmountTotalVal.getContentSize().width / 2 + betAmountTotalSprite_width + paddingX / 2 + paddingX / 2,
            y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height,
            fillStyle: cc.color(255, 255, 255)
        })
        this.addChild(betAmountTotalVal)

        var betAmountTotal_RoundRect = new RoundRect(betAmountTotalSprite_width + betAmountTotalVal.getContentSize().width + paddingX, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null)
        betAmountTotal_RoundRect.setPosition(paddingX / 4, this.coinWrapSprite_height)
        this.addChild(betAmountTotal_RoundRect)
        
        var betAmountTokenSprite = cc.Sprite.create(res.bet_amount_token_png)
        var betAmountTokenSprite_height = 15
        var betAmountTokenSprite_width = betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height * betAmountTokenSprite.getContentSize().height
        betAmountTokenSprite.attr({
            x: betAmountTokenSprite_width / 2 + paddingX / 2 + betAmountTotalSprite_width + paddingX / 2 + betAmountTotalVal.getContentSize().width + paddingX,
            y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height,
            scaleX: betAmountTokenSprite_width / betAmountTokenSprite.getContentSize().width,
            scaleY: betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height
        })
        this.addChild(betAmountTokenSprite)
        this.betAmountTokenVal = new cc.LabelTTF("0.0", "Arial", 15)
        this.betAmountTokenVal.attr({
            x: this.betAmountTokenVal.getContentSize().width / 2 + paddingX / 2  + betAmountTotalSprite_width + paddingX / 2 + betAmountTotalVal.getContentSize().width + paddingX + betAmountTokenSprite_width + paddingX / 2,
            y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height,
            fillStyle: cc.color(255, 255, 255)
        })
        this.addChild(this.betAmountTokenVal)
        this.betAmountToken_RoundRect = new RoundRect(betAmountTokenSprite_width + paddingX / 2 + this.betAmountTokenVal.getContentSize().width + paddingX / 2, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null)
        this.betAmountToken_RoundRect.setPosition(betAmountTokenSprite_width / 2 + paddingX / 2 + betAmountTotalSprite_width + paddingX / 2 + betAmountTotalVal.getContentSize().width + paddingX - paddingX / 2, this.coinWrapSprite_height)
        this.addChild(this.betAmountToken_RoundRect)

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
                if (touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + paddingY) ||
                    touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height - paddingY)) {
                        return
                }
                if (this.enabledCoin.findIndex(this.findTrue) !== -1) {
                    cc.audioEngine.playEffect(res.coin_drop_wav)
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
                        this.panel1_DealedCoins.push(coinVal)
                        this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }
                    if (touch_x > size.width / 4 + paddingX && 
                        touch_x < size.width / 2 - paddingX && 
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height - paddingY)) {
                            this.panel2_DealedCoins.push(coinVal)
                            this.addChild(coinItem, 0, this.dealedCoins_tag)
                    }
                    if (touch_x > size.width / 2 + paddingX &&
                        touch_x < (size.width / 2 + size.width / 4 - paddingX) &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height - paddingY)) {
                            this.panel3_DealedCoins.push(coinVal)
                            this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }
                    if (touch_x > size.width / 4 + paddingY &&
                        touch_x < (size.width / 2 + size.width / 4 - paddingY) &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 * 2 - paddingY)) {
                            this.panel4_DealedCoins.push(coinVal)
                            this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }
                    if (touch_x > size.width / 4 + paddingX &&
                        touch_x < size.width / 2 - paddingY &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 - paddingY)) {
                            this.panel5_DealedCoins.push(coinVal)
                            this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }
                    if (touch_x > size.width / 2 + paddingX &&
                        touch_x < (size.width / 2 + size.width / 4 - paddingX) &&
                        touch_y > (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + paddingY) &&
                        touch_y < (this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 3 - paddingY)) {
                            this.panel6_DealedCoins.push(coinVal)
                            this.addChild(coinItem, 0, this.dealedCoins_tag)
                        }
                    if (touch_x > (size.width / 2 + size.width / 4 + paddingX) && touch_x < (size.width - paddingX)) {
                            this.panel7_DealedCoins.push(coinVal)
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

        
    },

    findTrue: function (ele) {
        return ele == true
    },

    sleep: function (milliseconds) {
        return new Promise(
            resolve => setTimeout(resolve, milliseconds)
        )
    },

    sumCoins: function (arrayVal) {
        var sum = 0
        for (let index = 0; index < arrayVal.length; index++) {
            sum = sum + arrayVal[index]
        }
        return sum
    },

    displaySerialPanel: function () {
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20
        var serial_num_height = 23
        this.serial_num_panel = new cc.DrawNode()
        this.serial_num_panel.drawRect(cc.p(paddingX / 4, size.height - paddingY / 2), cc.p(paddingX / 2 + 10 * serial_num_height + 9 * paddingX / 4, size.height - paddingY / 2 - serial_num_height), null, 0, null)
        this.addChild(this.serial_num_panel)
        for (let index = 0; index < 10; index++) {
            this.serial_num[index] = new cc.DrawNode()
            this.serial_num[index].drawDot(cc.p(paddingX / 4 + serial_num_height / 2, size.height - paddingY), (serial_num_height) / 2, cc.color(255, 255, 255, 100))
            this.serial_num[index].drawDot(cc.p(paddingX / 4 + serial_num_height / 2, size.height - paddingY), (serial_num_height - 2) / 2, cc.color(Math.floor(Math.random() * 128), Math.floor(Math.random() * 128), Math.floor(Math.random() * 128)))
            
            var serial_num_label = new cc.LabelTTF((Math.ceil(Math.random() * 100 )).toString(), "Arial", 13)
            serial_num_label.attr({
                fillStyle: cc.color(255, 255, 255)
            })
            serial_num_label.setPosition(cc.p(paddingX / 4 + serial_num_height / 2, size.height + serial_num_label.getContentSize().height / 2 - paddingY - serial_num_height / 2 + 2))
            this.serial_num[index].addChild(serial_num_label)
            this.serial_num_panel.addChild(this.serial_num[index])
            
            var moveByAction = new cc.MoveBy(1, cc.p(serial_num_height * index, 0))
            this.serial_num[index].runAction(cc.EaseBackInOut.create(moveByAction))
        }
    },

    gotoHome: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                cc.director.pushScene(new cc.TransitionFade(1.0, new HomeScene()))
        }
    },

    showHistory: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showHistory")
                break
        }
    },

    showHelp: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showHelp")
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
                }else {
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
        // this.panelArea1.removeChild(this.panelOneValRoundRect)
        // this.panelArea2.removeChild(this.panelOneValRoundRect_Label)
        // this.panelArea3.removeChild(this.panelTwoValRoundRect)
        // this.panelArea1.removeChild(this.panelTwoValRoundRect_Label)
        // this.panelarea2.removeChild(this.panelThreeValRoundRect)
        // this.panelArea3.removeChild(this.panelThreeValRoundRect_Label)
        this.confirmBtn.setEnabled(false)
        this.cancelBtn.setEnabled(false)

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
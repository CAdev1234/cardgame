var BgLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.winSize
        var bgLayer = cc.LayerColor.create(cc.color(49, 91, 158), size.width, size.height)
        this.addChild(bgLayer)
    }
})



var NiuNiuGameLayer = cc.Layer.extend({
    header_height: 65,
    bank_height: null,
    betAmountBg_height: null,

    circleColors: [], 

    cards: [],
    winSheet: [],
    failSheet: [],
    winfailSheet_zOrder: 8,
    
    close_state: null,
    dealedCoins_tag: 1,
    open_state: null,

    serial_num: [],


    overLay_zOrder: 10,
    coinDealCheckDlg_zOrder: null,

    
    wenluPanel_zOrder: 8,
    wenluPanel_enabled: false,
    wenluPanel: null,

    goHomeBtn: null,
    soundOnBtn: null,
    enableSoundOn: true,

    helpBtn: null,
    historyBtn: null,
    
    cancelBtn: null,
    confirmBtn: null,

    coins: [],
    enabledCoin: [false, false, false, false, false, false, false],
    coinImages: [],
    coin_width: null,
    
    coinDropListener: null,

    infoText: null,

    panelOne_width: null,
    panelOne_height: null,
    panelOneArea: null,
    panelTwo_width: null,
    panelTwo_height: null,
    panelTwoArea: null,
    panelThreeArea: null,

    panelOneDealedCoins: [],
    panelOneValRoundRect: null,
    panelOneValRoundRect_Label: null,

    panelTwoDealedCoins: [],
    panelTwoValRoundRect: null,
    panelTwoValRoundRect_Label: null,

    panelThreeDealedCoins: [],
    panelThreeValRoundRect: null,
    panelThreeValRoundRect_Label: null,

    betAmountTokenVal: null,

    enabledCoinDrop: true,

    bankResultCards: [],
    firstDealResultCards: [],
    secondDealResultCards: [],
    thirdDealResultCards: [],

    
    coinDealCheckDlg: null,
    coinDealCheckDlg_overLay: null,
    coinDealCheckDlgYesBtn: null,
    coinDealCheckDlgNoBtn: null,

    dealCancelDlg: null,
    dealCancelDlg_overLay: null,

    checkFailDlg: null,
    checkFailDlg_overLay: null,

    checkSuccessDlg: null,
    checkSuccessDlg_overLay: null,
    checkSuccessDlg_interval: null,

    betWinDlg: null,
    betWinSprite: null,
    betWinDlg_overlay: null,
    betWinDlg_interval: null,

    betFailDlg: null,
    betFailDlg_overlay: null,
    betFailSprite: null,
    betFailDlg_interval: null,

    
    ctor: function () {
        this._super()
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20
        
        this.panelOneDealedCoins = []
        this.panelTwoDealedCoins = []
        this.panelThreeDealedCoins = []

        this.enabledCoin.fill(false)

        // load circle color image using batchNode
        var circleColors_cache = cc.spriteFrameCache.addSpriteFrames(res.circle_color_plist)
        var circleColors_sheet = new cc.SpriteBatchNode(res.circle_color_png)
        for (let index = 0; index < 10; index++) {
            var circleColors_name = "circle-color-" + index + ".png"
            var circleColors_frame = cc.spriteFrameCache.getSpriteFrame(circleColors_name)
            this.circleColors.push(circleColors_frame)
        }

        // load card image using batchNode
        var cardType = ["C", "D", "H", "S"]
        var cardWidth = 50
        var cardGroup_width = cardWidth + paddingX * 1.5 * 4
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

        // load winsheet image using batchNode
        var win_cache = cc.spriteFrameCache.addSpriteFrames(res.win_sheet_plist)
        var win_sheet = new cc.SpriteBatchNode(res.card_sheet_png)
        for (let index = 0; index < 11; index++) {
            var win_name = "win-" + index.toString() + ".png"
            var win_frame = cc.spriteFrameCache.getSpriteFrame(win_name)
            this.winSheet.push(win_frame)
        }

        // load failsheet image using batchNode
        var fail_cache = cc.spriteFrameCache.addSpriteFrames(res.fail_sheet_plist)
        var fail_sheet = new cc.SpriteBatchNode(res.fail_sheet_png)
        for (let index = 0; index < 11; index++) {
            var fail_name = "fail-" + index.toString() + ".png"
            var fail_frame = cc.spriteFrameCache.getSpriteFrame(fail_name)
            this.failSheet.push(fail_frame)
        }

        // header
        var headerBg = cc.LayerColor.create(cc.color(30, 101, 165), size.width, this.header_height)
        headerBg.attr({
            x: 0,
            y: size.height - this.header_height
        })
        this.addChild(headerBg);
        
        setTimeout(() => {
            this.displaySerialPanel1()
        }, 1000);

        setTimeout(() => {
            this.displaySerialPanel2()
        }, 2000);

        var num_period_font_size = 13
        var num_period_label = new cc.LabelTTF.create("期数");
        num_period_label.attr({
            x: size.width - 90,
            y: size.height -  this.header_height / 2,
            fillStyle: cc.color(233, 133, 62),
            fontSize: num_period_font_size
        })
        this.addChild(num_period_label)
        var num_period_value = new cc.LabelTTF.create("31071466-1")
        num_period_value.attr({
            x: size.width - 40,
            y: size.height - this.header_height / 2,
            fillStyle: cc.color(255, 255, 255),
            fontSize: num_period_font_size
        })
        this.addChild(num_period_value)

        // game bgsound play
        cc.audioEngine.playMusic(res.gameBgSound_mp3, true)
        cc.audioEngine.setMusicVolume(0.5)

        var btnWrapSprite = new cc.Sprite(res.btn_wrap_png)
        var btnWrapSprite_height = size.width / btnWrapSprite.getContentSize().width * btnWrapSprite.getContentSize().height
        
        // footer height
        var coinWrapSprite = cc.Sprite.create(res.coin_wrap_png)
        this.coinWrapSprite_height =  (size.width - 56) / 1125 * 300 * 0.5
        this.betAmountBg_height = 50
        
        // Bank Part
        var bankBgSprite = cc.Sprite.create(res.banner_png)
        var bankBg_height = size.width / bankBgSprite.getContentSize().width * bankBgSprite.getContentSize().height
        bankBgSprite.attr({
            x: size.width / 2,
            y: size.height - bankBg_height / 2 - this.header_height,
            scaleX: size.width / bankBgSprite.getContentSize().width,
            scaleY: size.width / bankBgSprite.getContentSize().width
        })
        this.addChild(bankBgSprite)
        var bankBgSprite_overlay = new cc.LayerColor(cc.color(0, 0, 0, 80), size.width, bankBg_height)
        bankBgSprite_overlay.setPosition(cc.p(0, size.height - bankBg_height - this.header_height))
        this.addChild(bankBgSprite_overlay)

        var bankLabelSprite = cc.Sprite.create(res.bank_title_png)
        var bankLabelSprite_width = 100
        var bankLabelSprite_height = bankLabelSprite_width / bankLabelSprite.getContentSize().width * bankLabelSprite.getContentSize().height
        bankLabelSprite.attr({
            x: size.width / 2,
            y: size.height - this.header_height - bankLabelSprite_height / 2,
            scaleX: bankLabelSprite_width / bankLabelSprite.getContentSize().width,
            scaleY: bankLabelSprite_width / bankLabelSprite.getContentSize().width
        })
        this.addChild(bankLabelSprite)
        var bankLabel = cc.LabelTTF.create("庄家", "Arial", 13)
        bankLabel.attr({
            x: size.width / 2,
            y: size.height + bankLabel.getContentSize().height / 2 - this.header_height - bankLabelSprite_height + 3,
            fillStyle: cc.color(255, 255, 255),
        })
        this.addChild(bankLabel)
        this.bank_height = bankBg_height

        this.historyBtn = new ccui.Button(res.history_btn_png, res.history_btn_png, res.history_btn_png)
        var historyBtn_width = 26
        this.historyBtn.attr({
            scaleX: historyBtn_width / this.historyBtn.getContentSize().width,
            scaleY: historyBtn_width / this.historyBtn.getContentSize().width
        })
        this.historyBtn.setPosition(cc.p(size.width - historyBtn_width / 2, size.height - this.header_height - this.bank_height / 2 + 10))
        this.historyBtn.setZoomScale(0.05)
        this.historyBtn.addTouchEventListener(this.showHistory, this)
        this.addChild(this.historyBtn)

        this.wenluBtn = new ccui.Button(res.wenlu_btn_png, res.wenlu_btn_png, res.wenlu_btn_png)
        var wenluBtn_width = 26
        this.wenluBtn.attr({
            scaleX: wenluBtn_width / this.wenluBtn.getContentSize().width,
            scaleY: wenluBtn_width / this.wenluBtn.getContentSize().width
        })
        this.wenluBtn.setPosition(cc.p(wenluBtn_width / 2, size.height - this.header_height - this.bank_height / 2 + 10))
        this.wenluBtn.addTouchEventListener(this.showWenluPanel, this)
        this.addChild(this.wenluBtn, this.wenluPanel_zOrder + 1)

        // GamePanel
        this.panelOne_width = size.width / 2 - 1
        // this.panelOne_height = size.width / 2 + 15
        this.panelOne_height = (size.height - this.header_height - this.bank_height - this.coinWrapSprite_height - this.betAmountBg_height) / 2


        this.panelOneArea = new cc.LayerColor(cc.color(25, 74, 148), size.width / 2 - 1, this.panelOne_height)
        this.panelOneArea.setPosition(0, size.height - this.header_height - this.bank_height - this.panelOne_height)
        this.addChild(this.panelOneArea)
        
        var panelOneLabel = cc.LabelTTF.create("闲1", "Arial", 40)
        panelOneLabel.attr({
            x: size.width / 4,
            y: this.panelOne_height - panelOneLabel.getContentSize().height,
            fillStyle: cc.color(0, 102, 203)
        })
        this.panelOneArea.addChild(panelOneLabel)

        
        this.panelTwo_width = size.width / 2
        this.panelTwo_height = size.width / 2 + 15

        this.panelTwoArea = new cc.LayerColor(cc.color(25, 74, 148), size.width / 2 - 1, this.panelOne_height)
        this.panelTwoArea.setPosition(size.width / 2 + 1, size.height - this.header_height - this.bank_height - this.panelOne_height)
        this.addChild(this.panelTwoArea)
        
        var panelTwoLabel = cc.LabelTTF.create("闲2", "Arial", 40)
        panelTwoLabel.attr({
            x: size.width / 4,
            y: this.panelOne_height - panelTwoLabel.getContentSize().height,
            fillStyle: cc.color(0, 102, 203)
        })
        this.panelTwoArea.addChild(panelTwoLabel)


        this.panelThreeArea = new cc.LayerColor(cc.color(25, 74, 148), size.width, size.height - this.header_height - this.bank_height - this.panelOne_height - 1)
        this.panelThreeArea.setPosition(0, 0)
        this.addChild(this.panelThreeArea)

        var panelThreeLabel = cc.LabelTTF.create("闲3", "Arial", 40)
        panelThreeLabel.attr({
            x: size.width / 2,
            y: size.height - this.header_height - this.bank_height - btnWrapSprite_height - this.panelOne_height,
            fillStyle: cc.color(0, 102, 203)
        })
        this.panelThreeArea.addChild(panelThreeLabel)
        
        btnWrapSprite.attr({
            x: size.width / 2,
            y: size.height - this.header_height - this.bank_height,
            scaleX: size.width / btnWrapSprite.getContentSize().width,
            scaleY: size.width / btnWrapSprite.getContentSize().width
        })
        this.addChild(btnWrapSprite)

        this.goHomeBtn = new ccui.Button(res.home_btn_png, res.home_btn_png, res.home_btn_png)
        this.goHomeBtn.attr({
            x: size.width / 6,
            y: size.height - this.header_height - this.bank_height + 5,
            scaleX: 60 / this.goHomeBtn.getContentSize().width,
            scaleY: 60 / this.goHomeBtn.getContentSize().width,
            pressedActionEnabled: true
        })
        this.goHomeBtn.addTouchEventListener(this.gotoHome, this)
        this.addChild(this.goHomeBtn)

        this.infoText = cc.LabelTTF.create("距封盘时间 00:20", "Arial", 13)
        this.infoText.attr({
            x: size.width / 2,
            y: size.height - this.header_height - this.bank_height + 5,
            fillStyle: cc.color(205, 160, 58),
        })
        this.addChild(this.infoText)
        
        this.helpBtn = ccui.Button.create(res.help_btn_png)
        var helpBtn_height = 30
        this.helpBtn.attr({
            x: size.width - 40,
            y: size.height - this.header_height - this.bank_height + 5,
            scaleX: helpBtn_height / this.helpBtn.getContentSize().height,
            scaleY: helpBtn_height / this.helpBtn.getContentSize().height,
            pressedActionEnabled: true
        })
        this.helpBtn.addTouchEventListener(this.showHelp, this)
        this.addChild(this.helpBtn)

        this.soundOnBtn = ccui.Button.create(res.sound_on_btn_png)
        var soundOnBtn_height = 30
        this.soundOnBtn.loadTextures(res.sound_on_btn_png, res.sound_on_btn_png)
        this.soundOnBtn.attr({
            x: size.width - 80,
            y: size.height - this.header_height - this.bank_height + 5,
            scaleX: soundOnBtn_height / this.soundOnBtn.getContentSize().width,
            scaleY: soundOnBtn_height / this.soundOnBtn.getContentSize().width,
            pressedActionEnabled: true
        })
        this.soundOnBtn.setPressedActionEnabled(true)
        this.soundOnBtn.addTouchEventListener(this.enableSoundOnMethod, this)
        this.addChild(this.soundOnBtn)

        // footer
        var betAmountBg = cc.LayerColor.create(cc.color(0, 0, 0, 150), size.width, this.betAmountBg_height)
        betAmountBg.setPosition(cc.p(0, this.coinWrapSprite_height + this.betAmountBg_height / 2))
        this.addChild(betAmountBg)

        var betAmountTotalSprite = cc.Sprite.create(res.bet_amount_total_png)
        var betAmountTotalSprite_width = 20
        var betAmountTotalSprite_height = betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width * betAmountTotalSprite.getContentSize().height
        betAmountTotalSprite.attr({
            x: betAmountTotalSprite_width / 2 + paddingX / 2,
            y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height + 40,
            scaleX: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width,
            scaleY: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width
        })
        this.addChild(betAmountTotalSprite)

        var betAmountTotalVal = cc.LabelTTF.create("2000.0", "Arial", 15)
        betAmountTotalVal.attr({
            x: betAmountTotalVal.getContentSize().width / 2 + betAmountTotalSprite_width + paddingX / 2 + paddingX / 2,
            y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height + 40,
            fillStyle: cc.color(255, 255, 255)
        })
        this.addChild(betAmountTotalVal)

        var betAmountTotal_RoundRect = new RoundRect(betAmountTotalSprite_width + betAmountTotalVal.getContentSize().width + paddingX, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null)
        betAmountTotal_RoundRect.setPosition(paddingX / 4, this.coinWrapSprite_height + 40)
        this.addChild(betAmountTotal_RoundRect)
        
        this.betAmountToken_RoundRect = new RoundRect(70, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null)
        this.betAmountToken_RoundRect.setPosition(paddingX / 4 + betAmountTotal_RoundRect.getContentSize().width + paddingX / 2, this.coinWrapSprite_height + 40)
        this.addChild(this.betAmountToken_RoundRect)
        var betAmountTokenSprite = cc.Sprite.create(res.bet_amount_token_png)
        var betAmountTokenSprite_height = 15
        var betAmountTokenSprite_width = betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height * betAmountTokenSprite.getContentSize().height
        betAmountTokenSprite.attr({
            x: betAmountTokenSprite_width / 2 + paddingX / 4,
            y: betAmountTotalSprite_height / 2 + 2,
            scaleX: betAmountTokenSprite_width / betAmountTokenSprite.getContentSize().width,
            scaleY: betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height
        })
        this.betAmountToken_RoundRect.addChild(betAmountTokenSprite)
        this.betAmountTokenVal = new cc.LabelTTF("0.0", "Arial", 15)
        this.betAmountTokenVal.attr({
            x: this.betAmountToken_RoundRect.getContentSize().width - this.betAmountTokenVal.getContentSize().width,
            y: betAmountTotalSprite_height / 2,
            fillStyle: cc.color(255, 255, 255)
        })
        this.betAmountToken_RoundRect.addChild(this.betAmountTokenVal)

        
        // cancel button
        this.cancelBtn = new ccui.Button(res.red_btn_png, res.red_btn_png, res.disabled_red_btn_png)
        var cancelBtn_width = 60
        this.cancelBtn.attr({
            x: size.width - cancelBtn_width / 2 - paddingX / 2,
            y: cancelBtn_width / this.cancelBtn.getContentSize().width * this.cancelBtn.getContentSize().height / 2 + this.coinWrapSprite_height + 35,
            scaleX: cancelBtn_width / this.cancelBtn.getContentSize().width,
            scaleY: cancelBtn_width / this.cancelBtn.getContentSize().width
        })
        this.cancelBtn.addTouchEventListener(this.removeDealedCoinsByClick, this)
        this.cancelBtn.setEnabled(false)

        // confirm button
        this.confirmBtn = new ccui.Button(res.green_btn_png, res.green_btn_png, res.disabled_green_btn_png)
        var confirmBtn_width = 60
        this.confirmBtn.attr({
            x: size.width - confirmBtn_width / 2 - cancelBtn_width - paddingX / 2 - paddingX / 2,
            y: confirmBtn_width / this.confirmBtn.getContentSize().width * this.confirmBtn.getContentSize().height / 2 + this.coinWrapSprite_height + 35,
            scaleX: confirmBtn_width / this.confirmBtn.getContentSize().width,
            scaleY: confirmBtn_width / this.confirmBtn.getContentSize().width
        })
        this.confirmBtn.addTouchEventListener(this.showCoinDealCheckDlg, this)
        this.confirmBtn.setEnabled(false)

        // cancel and confirm button background
        var cancelConfirmBg_height = this.betAmountBg_height
        var cancelConfirmBg_width = paddingX / 2 + confirmBtn_width + paddingX / 2 + cancelBtn_width + paddingX / 2 + 40
        var cancelConfirmBg = new RoundRect(cancelConfirmBg_width, cancelConfirmBg_height, cc.color(0, 0, 0, 150), 0, null, 25, RectType.TOP)
        cancelConfirmBg.setPosition(size.width - cancelConfirmBg_width + 40, this.coinWrapSprite_height + this.betAmountBg_height / 2)
        this.addChild(cancelConfirmBg)

        this.addChild(this.cancelBtn)
        this.addChild(this.confirmBtn)

        
        // cancel and confirm buttons are disabled when length of dealedCoins is 0
        if ((this.panelOneDealedCoins.length + this.panelTwoDealedCoins.length + this.panelThreeDealedCoins.length) === 0) {
            this.cancelBtn.setEnabled(false)
            this.confirmBtn.setEnabled(false)
        }


        coinWrapSprite.attr({
            x: size.width / 2,
            y: this.coinWrapSprite_height,
            scaleX: size.width / coinWrapSprite.getContentSize().width,
            scaleY: size.width / coinWrapSprite.getContentSize().width - 0.05
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
                var target = event.getCurrentTarget()
                var touch_x = touch.getLocation().x
                var touch_y = touch.getLocation().y

                if (touch_y > size.height - this.header_height - this.bank_height - paddingY || 
                    touch_y < this.betAmountBg_height + this.coinWrapSprite_height + 30) {
                        return
                }

                if (touch_x > size.width / 2 - paddingX && 
                    touch_x < size.width / 2 + paddingX && 
                    touch_y > size.height - this.header_height - this.bank_height - this.panelOne_height) {
                    return
                }

                if (touch_y > size.height - this.header_height - this.bank_height - this.panelOne_height - paddingY && 
                    touch_y < size.height - this.header_height - this.bank_height - this.panelOne_height + paddingY) {
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
                        this.addChild(bet_closed_alert)
                        setTimeout(() => {
                            this.removeChild(bet_closed_alert)
                        }, 2000);
                        return
                    }
                    cc.audioEngine.playEffect(res.coin_drop_wav)
                    var coinItem = cc.Sprite.create(this.coinImages[this.enabledCoin.findIndex(this.findTrue)])
                    var coinVal = this.coinImages[this.enabledCoin.findIndex(this.findTrue)].replace("res/niuniu/coin-sprite-", "")
                    coinVal = Number(coinVal.replace(".png", ""))
                    coinItem.attr({
                        x: touch_x,
                        y: touch_y,
                        scaleX: 25 / coinItem.getContentSize().width,
                        scaleY: 25 / coinItem.getContentSize().width
                    })
                    // add coin values to panel value array
                    if (touch_x > 0 && touch_x < size.width / 2 - paddingX && 
                        touch_y < size.height - this.header_height - this.bank_height - paddingY && 
                        touch_y > size.height - this.header_height - this.bank_height - this.panelOne_height + paddingY) {
                            if (this.panelOneDealedCoins.length == 0) {
                                this.panelOneValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                                this.panelOneValRoundRect_Label.setFontFillColor(cc.color(255, 255, 255))
                                this.panelOneValRoundRect = new RoundRect(this.panelOneValRoundRect_Label.getContentSize().width + paddingX, this.panelOneValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                this.panelOneValRoundRect_Label.setPosition(cc.p(this.panelOneValRoundRect.getContentSize().width / 2, this.panelOneValRoundRect_Label.getContentSize().height / 2))
                                this.panelOneValRoundRect.setPosition(cc.p(size.width / 4 - this.panelOneValRoundRect.getContentSize().width / 2, size.height - this.header_height - this.bank_height - this.panelOne_height + paddingY / 4))
                                this.panelOneArea.addChild(this.panelOneValRoundRect) 
                                this.panelOneValRoundRect.addChild(this.panelOneValRoundRect_Label)
                                
                            }
                            this.panelOneDealedCoins.push(coinVal)
                            this.panelOneValRoundRect_Label.setString(this.sumCoins(this.panelOneDealedCoins))
                            this.panelOneValRoundRect.setContentSize(cc.size(60, this.panelOneValRoundRect_Label.getContentSize().height + paddingY / 4))
                    }
                    if (touch_x > size.width / 2 && touch_x < size.width &&
                        touch_y < size.height - this.header_height - this.bank_height - paddingY &&
                        touch_y > size.height - this.header_height - this.bank_height - this.panelOne_height + paddingY) {
                            if (this.panelTwoDealedCoins.length == 0) {
                                this.panelTwoValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                                this.panelTwoValRoundRect_Label.attr({
                                    fillStyle: cc.color(255, 255, 255),
                                })
                                this.panelTwoValRoundRect = new RoundRect(60, this.panelTwoValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                this.panelTwoValRoundRect_Label.setPosition(cc.p(this.panelTwoValRoundRect.getContentSize().width / 2, this.panelTwoValRoundRect_Label.getContentSize().height / 2))
                                this.panelTwoValRoundRect.setPosition(cc.p(size.width / 4 * 3 - this.panelTwoValRoundRect.getContentSize().width / 2, size.height - this.header_height - this.bank_height - this.panelOne_height + paddingY / 4))
                                this.panelTwoArea.addChild(this.panelTwoValRoundRect) 
                                this.panelTwoValRoundRect.addChild(this.panelTwoValRoundRect_Label)
                                
                            }
                            this.panelTwoDealedCoins.push(coinVal)
                            this.panelTwoValRoundRect_Label.setString(this.sumCoins(this.panelTwoDealedCoins))
                            this.panelTwoValRoundRect.setContentSize(cc.size(60, this.panelTwoValRoundRect_Label.getContentSize().height + paddingY / 4))
                    }
                    if (touch_y < size.height - this.header_height - this.bank_height - this.panelOne_height - paddingY &&
                        touch_y > betAmountTotalSprite_height + this.coinWrapSprite_height + 60) {
                            if (this.panelThreeDealedCoins.length == 0) {
                                this.panelThreeValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13)
                                this.panelThreeValRoundRect_Label.attr({
                                    fillStyle: cc.color(255, 255, 255),
                                })
                                this.panelThreeValRoundRect = new RoundRect(60, this.panelThreeValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null)
                                this.panelThreeValRoundRect_Label.setPosition(cc.p(this.panelThreeValRoundRect.getContentSize().width / 2, this.panelThreeValRoundRect_Label.getContentSize().height / 2))
                                this.panelThreeValRoundRect.setPosition(cc.p(size.width / 2 - this.panelThreeValRoundRect.getContentSize().width / 2, this.coinWrapSprite_height + this.betAmountBg_height + this.panelThreeValRoundRect.getContentSize().height + paddingY / 2))
                                this.panelThreeArea.addChild(this.panelThreeValRoundRect) 
                                this.panelThreeValRoundRect.addChild(this.panelThreeValRoundRect_Label)
                                
                            }
                            this.panelThreeDealedCoins.push(coinVal)
                            this.panelThreeValRoundRect_Label.setString(this.sumCoins(this.panelThreeDealedCoins))
                            this.panelThreeValRoundRect.setContentSize(cc.size(this.panelThreeValRoundRect_Label.getContentSize().width + paddingX, this.panelThreeValRoundRect_Label.getContentSize().height + paddingY / 4))
                    }
                    this.addChild(coinItem, 0, this.dealedCoins_tag)
                    this.betAmountTokenVal.setString(this.sumCoins(this.panelOneDealedCoins) + this.sumCoins(this.panelTwoDealedCoins) + this.sumCoins(this.panelThreeDealedCoins))
                    this.cancelBtn.setEnabled(true)
                    this.confirmBtn.setEnabled(true)
                }

            }
        })

        cc.eventManager.addListener(this.coinDropListener, this.panelOneArea)
        
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

    sumCoins: function (arrayVal) {
        var sum = 0
        for (let index = 0; index < arrayVal.length; index++) {
            sum = sum + arrayVal[index]
        }
        return sum
    },

    displaySerialPanel1: function () {
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20
        var serial_num_height = 20
        this.serial_num_panel1 = null
        this.serial_num_panel1 = new cc.DrawNode()
        this.serial_num_panel1.drawRect(cc.p(paddingX / 2, size.height - paddingY / 2), cc.p(paddingX / 2 + 10 * serial_num_height + 9 * paddingX / 4, size.height - paddingY / 2 - serial_num_height), null, 0, null)
        this.addChild(this.serial_num_panel1)
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
            this.serial_num_panel1.addChild(this.serial_num[index])
            this.serial_num[index].addChild(randomNumLabel)
            
           
            var moveByAction = new cc.MoveBy(1, cc.p((serial_num_height + paddingX / 4) * index, 0))
            this.serial_num[index].runAction(cc.EaseBackInOut.create(moveByAction))
        }
    },

    displaySerialPanel2: function () {
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20
        var serial_num_height = 20
        this.serial_num_panel2 = null
        this.serial_num_panel2 = new cc.DrawNode()
        this.serial_num_panel2.drawRect(cc.p(paddingX / 2, size.height - paddingY / 2 - serial_num_height - paddingY / 4), cc.p(paddingX / 2 + 10 * serial_num_height + 9 * paddingX / 4, size.height - paddingY / 2 - serial_num_height - paddingY / 4 - serial_num_height), null, 0, null)
        this.addChild(this.serial_num_panel2)
        for (let index = 10; index < 20; index++) {
            this.serial_num[index] = new cc.Sprite(this.circleColors[index % 10])
            var serial_num_scale = serial_num_height / this.serial_num[index].getContentSize().width
            this.serial_num[index].attr({
                scaleX: serial_num_scale,
                scaleY: serial_num_scale
            })
            this.serial_num[index].setPosition(serial_num_height / 2 + paddingX / 2, size.height - serial_num_height / 2 - paddingX / 2 - serial_num_height - paddingX / 4)
            var randomNumLabel = new cc.LabelTTF(Math.floor(Math.random() * 100).toString(), "Arial", 35)
            randomNumLabel.attr({
                fillStyle: cc.color(255, 255, 255),  
            })
            randomNumLabel.enableStroke(cc.color(0, 0, 0), 2)
            randomNumLabel.setPosition(serial_num_height / (2 * serial_num_scale), serial_num_height / (2 * serial_num_scale) - randomNumLabel.getContentSize().height / 2 * serial_num_scale)
            this.serial_num_panel2.addChild(this.serial_num[index])
            this.serial_num[index].addChild(randomNumLabel)
            
           
            var moveByAction = new cc.MoveBy(1, cc.p((serial_num_height + paddingX / 4) * (index % 10), 0))
            this.serial_num[index].runAction(cc.EaseBackInOut.create(moveByAction))
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

    enableAllBtn: function () {
        this.enabledCoinDrop = true
        this.goHomeBtn.setEnabled(true)
        this.soundOnBtn.setEnabled(true)
        this.helpBtn.setEnabled(true)
        this.historyBtn.setEnabled(true)
        if (this.panelOneDealedCoins.length + this.panelTwoDealedCoins.length + this.panelThreeDealedCoins.length !== 0) {
            this.cancelBtn.setEnabled(true)
            this.confirmBtn.setEnabled(true)
        }
        for (let index = 0; index < this.coins.length; index++) {
            this.coins[index].setEnabled(true)
        }
    },

    betOpenInterval: async function () {
        var paddingX = 20
        this.open_state = true
        this.close_state = false
        var bet_start_alert = new cc.Sprite(res.bet_start_alert_png)
        var bet_start_alert_width = cc.winSize.width / 5 * 3
        bet_start_alert.attr({
            scaleX: bet_start_alert_width / bet_start_alert.getContentSize().width,
            scaleY: bet_start_alert_width / bet_start_alert.getContentSize().width
        })
        bet_start_alert.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
        this.addChild(bet_start_alert)
        setTimeout(() => {
            this.removeChild(bet_start_alert)
        }, 2000); 
        await this.sleep(2000)
        var close_second = 20
        var countCloseSecond = setInterval(() => {
            if (close_second == 0) {
                clearInterval(countCloseSecond)
                this.close_state = true
                this.drawInterval()
                return
            }
            close_second = close_second - 1 
            if (close_second < 10) {
                this.infoText.setString("距封盘时间 00:0" + close_second)
                if (close_second == 3) {
                    var bet_stop_alert = new cc.Sprite(res.bet_stop_alert_png)
                    var bet_stop_alert_width = cc.winSize.width / 5 * 3
                    bet_stop_alert.attr({
                        scaleX: bet_stop_alert_width / bet_stop_alert.getContentSize().width,
                        scaleY: bet_stop_alert_width / bet_stop_alert.getContentSize().width
                    })
                    bet_stop_alert.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2))
                    this.addChild(bet_stop_alert)
                    setTimeout(() => {
                        this.removeChild(bet_stop_alert)
                        this.open_state = false
                    }, 2000);
                }
            }else {
                this.infoText.setString("距封盘时间 00:" + close_second)
            }
            
        }, 1000);
    },

    drawInterval: function () {
        var draw_second = 10
        this.cancelBtn.setEnabled(false)
        this.confirmBtn.setEnabled(false)
        var countDrawSecond = setInterval(() => {
            if (draw_second == 0) {
                clearInterval(countDrawSecond)
                this.infoText.setString("开奖中")
                setTimeout(() => {
                    this.serial_num_panel1.removeAllChildren()
                    this.serial_num_panel2.removeAllChildren()
                    this.displaySerialPanel1()
                    setTimeout(() => {
                        this.displaySerialPanel2()
                    }, 1000);
                }, 2000);
                setTimeout(async () => {
                    await this.displayCard()
                    
                    if (this.panelOneDealedCoins.length + this.panelTwoDealedCoins.length + this.panelThreeDealedCoins.length !== 0) {
                        if (Math.floor(Math.random() * 10) % 2 == 1) {
                            this.showBetWinDlg()
                        }else {
                            this.showBetFailDlg()
                        }
                    }

                    // show win or fail sheet and star image
                    await this.sleep(1000)
                    var winfailSprite0_width = 70
                    var winfailSprite0 = new cc.Sprite(this.failSheet[Math.floor(Math.random() * 11)])
                    winfailSprite0.attr({
                        scaleX: winfailSprite0_width / winfailSprite0.getContentSize().width,
                        scaleY: winfailSprite0_width / winfailSprite0.getContentSize().width,
                        x: cc.winSize.width / 2,
                        y: cc.winSize.height - this.header_height - this.bank_height / 2 - 20
                    })
                    this.addChild(winfailSprite0, this.winfailSheet_zOrder)

                    var winfailSprite1_width = 70
                    var winfailSprite1 = new cc.Sprite(this.winSheet[Math.floor(Math.random() * 11)])
                    winfailSprite1.attr({
                        scaleX: winfailSprite1_width / winfailSprite1.getContentSize().width,
                        scaleY: winfailSprite1_width / winfailSprite1.getContentSize().width,
                        x: cc.winSize.width / 4,
                        y: cc.winSize.height - this.header_height - this.bank_height - this.panelOne_height / 2 - 20
                    })
                    this.addChild(winfailSprite1, this.winfailSheet_zOrder)
                    var starSprite1 = new cc.Sprite(res.star_png)
                    var starSprite1_width = 50
                    starSprite1.attr({
                        scaleX: starSprite1_width / starSprite1.getContentSize().width,
                        scaleY: starSprite1_width / starSprite1.getContentSize().width,
                        x: cc.winSize.width / 4,
                        y: cc.winSize.height - this.header_height - this.bank_height - this.panelOne_height / 3
                    })
                    this.addChild(starSprite1, this.winfailSheet_zOrder)


                    var winfailSprite2_width = 70
                    var winfailSprite2 = new cc.Sprite(this.winSheet[Math.floor(Math.random() * 11)])
                    winfailSprite2.attr({
                        scaleX: winfailSprite2_width / winfailSprite2.getContentSize().width,
                        scaleY: winfailSprite2_width / winfailSprite2.getContentSize().width,
                        x: cc.winSize.width / 4 * 3,
                        y: cc.winSize.height - this.header_height - this.bank_height - this.panelOne_height / 2 - 20
                    })
                    this.addChild(winfailSprite2, this.winfailSheet_zOrder)
                    var starSprite2 = new cc.Sprite(res.star_png)
                    var starSprite2_width = 50
                    starSprite2.attr({
                        scaleX: starSprite2_width / starSprite2.getContentSize().width,
                        scaleY: starSprite2_width / starSprite2.getContentSize().width,
                        x: cc.winSize.width / 4 * 3,
                        y: cc.winSize.height - this.header_height - this.bank_height - this.panelOne_height / 3
                    })
                    this.addChild(starSprite2, this.winfailSheet_zOrder)


                    var winfailSprite3_width = 70
                    var winfailSprite3 = new cc.Sprite(this.failSheet[Math.floor(Math.random() * 11)])
                    winfailSprite3.attr({
                        scaleX: winfailSprite3_width / winfailSprite3.getContentSize().width,
                        scaleY: winfailSprite3_width / winfailSprite3.getContentSize().width,
                        x: cc.winSize.width / 2,
                        y: cc.winSize.height - winfailSprite3.getContentSize().height / 2 - this.header_height - this.bank_height - this.panelOne_height * 4 / 3
                    })
                    this.addChild(winfailSprite3, this.winfailSheet_zOrder)


                    await this.sleep(7000)
                    await this.removeCards()
                    
                    await this.removeChild(winfailSprite0)
                    await this.removeChild(winfailSprite1)
                    await this.removeChild(winfailSprite2)
                    await this.removeChild(winfailSprite3)
                    await this.removeChild(starSprite1)
                    await this.removeChild(starSprite2)

                    await this.sleep(7000)
                    await this.betOpenInterval()
                }, 5000);
                return
            }
            draw_second = draw_second - 1
            if (draw_second < 10) this.infoText.setString("距开奖时间 00:0" + draw_second) 
            else this.infoText.setString("距开奖时间 00:" + draw_second)
        }, 1000);
    },

    displayCard: async function () {
        var paddingX = 20
        var size = cc.winSize
        var cardWidth = 40
        var cardGroup_width = cardWidth + paddingX * 1.5 * 4
        
        for (let index = 0; index < 5; index++) {
            var cardNum = Math.floor(Math.random() * 52)
            this.bankResultCards[index] = new cc.Sprite(this.cards[cardNum])
            // var cardShadow = new RoundRect(cardWidth + 10 + paddingX / 4, (cardWidth + 10 + paddingX / 4) / this.bankResultCards[index].getContentSize().width * this.bankResultCards[index].getContentSize().height, cc.color(0, 0, 0, 150), 0, null, 10, null)
            // cardShadow.setPosition(cc.p(cardWidth / 2 + size.width / 2 - cardGroup_width / 2, size.height - cardWidth / this.bankResultCards[index].getContentSize().width * this.bankResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height / 4))
            // this.addChild(cardShadow)
            this.bankResultCards[index].attr({
                x: cardWidth / 2 + size.width / 2 - cardGroup_width / 2,
                y: size.height - cardWidth / this.bankResultCards[index].getContentSize().width * this.bankResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height / 4,
                scaleX: (cardWidth + 10) / this.bankResultCards[index].getContentSize().width,
                scaleY: (cardWidth + 10) / this.bankResultCards[index].getContentSize().width
            })
            this.addChild(this.bankResultCards[index])
            
            var moveToAction = new cc.MoveTo(0.5, cc.p(cardWidth / 2 + size.width / 2 - cardGroup_width / 2 + paddingX * 1.5 * index, size.height - cardWidth / this.bankResultCards[index].getContentSize().width * this.bankResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height / 4));
            this.bankResultCards[index].runAction(moveToAction)
        }

        await this.sleep(1000)

        
        for (let index = 0; index < 5; index++) {
            var cardNum = Math.floor(Math.random() * 52)
            this.firstDealResultCards[index] = cc.Sprite.create(this.cards[cardNum])
            this.firstDealResultCards[index].attr({
                x: cardWidth / 2 + this.panelOne_width / 2 - cardGroup_width / 2,
                y: size.height - cardWidth / this.firstDealResultCards[index].getContentSize().width * this.firstDealResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height - this.panelOne_height / 3,
                scaleX: cardWidth / this.firstDealResultCards[index].getContentSize().width,
                scaleY: cardWidth / this.firstDealResultCards[index].getContentSize().width
            })
            this.addChild(this.firstDealResultCards[index])
            var moveToAction = new cc.MoveTo(0.5, cc.p(cardWidth / 2 + this.panelOne_width / 2 - cardGroup_width / 2 + paddingX * 1.5 * index, size.height - cardWidth / this.firstDealResultCards[index].getContentSize().width * this.firstDealResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height - this.panelOne_height / 3));
            var actionSequence = new cc.Sequence(moveToAction)
            this.firstDealResultCards[index].runAction(actionSequence)
        }
        
        await this.sleep(1000)
        
        for (let index = 0; index < 5; index++) {
            var cardNum = Math.floor(Math.random() * 52)
            this.secondDealResultCards[index] = new cc.Sprite(this.cards[cardNum])
            this.secondDealResultCards[index].attr({
                x: cardWidth / 2 + size.width / 2 + this.panelTwo_width / 2 - cardGroup_width / 2,
                y: size.height - cardWidth / this.secondDealResultCards[index].getContentSize().width * this.secondDealResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height - this.panelOne_height / 3,
                scaleX: cardWidth / this.secondDealResultCards[index].getContentSize().width,
                scaleY: cardWidth / this.secondDealResultCards[index].getContentSize().width
            })
            this.addChild(this.secondDealResultCards[index])
            var moveToAction = new cc.MoveTo(0.5, cc.p(cardWidth / 2 + size.width / 2 + this.panelTwo_width / 2 - cardGroup_width / 2 + paddingX * 1.5 * index, size.height - cardWidth / this.secondDealResultCards[index].getContentSize().width * this.secondDealResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height - this.panelOne_height / 3));
            var actionSequence = new cc.Sequence(moveToAction)
            this.secondDealResultCards[index].runAction(actionSequence)
        }

        await this.sleep(1000)

        for (let index = 0; index < 5; index++) {
            var cardNum = Math.floor(Math.random() * 52)
            this.thirdDealResultCards[index] = new cc.Sprite(this.cards[cardNum])
            this.thirdDealResultCards[index].attr({
                x: cardWidth / 2 + size.width / 2 - cardGroup_width / 2,
                y: size.height - cardWidth / this.thirdDealResultCards[index].getContentSize().width * this.thirdDealResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height - this.panelOne_height * 5 / 4,
                scaleX: cardWidth / this.thirdDealResultCards[index].getContentSize().width,
                scaleY: cardWidth / this.thirdDealResultCards[index].getContentSize().width
            })
            this.addChild(this.thirdDealResultCards[index])
            var moveToAction = new cc.MoveTo(0.5, cc.p(cardWidth / 2 + size.width / 2 - cardGroup_width / 2 + paddingX * 1.5 * index, size.height - cardWidth / this.thirdDealResultCards[index].getContentSize().width * this.thirdDealResultCards[index].getContentSize().height / 2 - this.header_height - this.bank_height - this.panelOne_height * 5 / 4));
            var actionSequence = new cc.Sequence(moveToAction)
            this.thirdDealResultCards[index].runAction(actionSequence)
        }
        
    },

    removeCards: function () {
        for (let index = 0; index < this.bankResultCards.length; index++) {
            this.removeChild(this.bankResultCards[index])
        }
        for (let index = 0; index < this.firstDealResultCards.length; index++) {
            this.removeChild(this.firstDealResultCards[index])
        }
        for (let index = 0; index < this.secondDealResultCards.length; index++) {
            this.removeChild(this.secondDealResultCards[index])
        }
        for (let index = 0; index < this.thirdDealResultCards.length; index++) {
            this.removeChild(this.thirdDealResultCards[index])
        }
        this.removeDealedCoins()
    },

    showHistory: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var historyScene = new NiuniuHistoryScene()
                // cc.director.popScene()
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
                    var wenluPanel_height = this.bank_height - 20
                    this.wenluPanel = new cc.LayerColor(cc.color(0, 0, 0), size.width, wenluPanel_height)
                    this.wenluPanel.setPosition(size.width * (-1), size.height - this.header_height - this.bank_height + 20)
                    this.addChild(this.wenluPanel, this.wenluPanel_zOrder)
                    var wenluPanel_title = new cc.LabelTTF("开奖走势", "Arial", 16)
                    wenluPanel_title.attr({
                        fillStyle: cc.color(255, 255, 255),
                        x: size.width / 2,
                        y: wenluPanel_height - paddingY - wenluPanel_title.getContentSize().height / 2
                    })
                    this.wenluPanel.addChild(wenluPanel_title)

                    var playerOneLabel = new cc.LabelTTF("闲一", "Arial", 15)
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


                    var playerTwoLabel = new cc.LabelTTF("闲二", "Arial", 15)
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


                    var playerThreeLabel = new cc.LabelTTF("闲二", "Arial", 15)
                    playerThreeLabel.attr({
                        fillStyle: cc.color(53, 168, 224),
                        x: playerThreeLabel.getContentSize().width / 2 + paddingX * 3 / 2,
                        y: wenluPanel_height - playerThreeLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
                    })
                    this.wenluPanel.addChild(playerThreeLabel)
                    var barLetter3 = new cc.LabelTTF("|", "Arial", 15)
                    barLetter3.attr({
                        fillStyle: cc.color(153, 153, 153),
                        x: barLetter3.getContentSize().width / 2 + paddingX * 3 / 2 + playerThreeLabel.getContentSize().width + paddingX / 4,
                        y: wenluPanel_height - playerThreeLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
                    })
                    this.wenluPanel.addChild(barLetter3)
                    for (let index = 0; index < 13; index++) {
                        var wenlu_win_fail_array = [res.wenlu_win_png, res.wenlu_fail_png]
                        var wenlu_win_fail_width = (size.width - paddingX * 3 - playerThreeLabel.getContentSize().width - barLetter3.getContentSize().width - paddingX / 4) / 13 - paddingX / 4
                        var wenlu_win_fail = new cc.Sprite(wenlu_win_fail_array[Math.floor(Math.random() * 13) % 2])
                        wenlu_win_fail.attr({
                            scaleX: wenlu_win_fail_width / wenlu_win_fail.getContentSize().width,
                            scaleY: wenlu_win_fail_width / wenlu_win_fail.getContentSize().width,
                            x: wenlu_win_fail_width / 2 + paddingX * 3 / 2 + playerThreeLabel.getContentSize().width + paddingX / 4 + barLetter3.getContentSize().width + paddingX / 4 + index * (wenlu_win_fail_width + paddingX / 4),
                            y: wenluPanel_height - playerThreeLabel.getContentSize().height / 2 - paddingY - wenluPanel_title.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2 - playerOneLabel.getContentSize().height - paddingY / 2
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
                console.log("gotoHome")
                cc.audioEngine.playEffect(home_res.game_item_mp3)
                this.removeDealedCoins()
                cc.audioEngine.end()
                cc.director.popScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, new HomeScene()))
                break
        }
     },

    enableSoundOnMethod: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
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
                break
        }
    },

    showHelp: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break
            case ccui.Widget.TOUCH_MOVED:
                break
            case ccui.Widget.TOUCH_ENDED:
                cc.audioEngine.playEffect(home_res.game_item_mp3)
                var helpScene = new NiuniuHelpScene()
                // cc.director.popScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, helpScene))
                break
            case ccui.Widget.TOUCH_CANCELED:
                break
        }
    },

    chooseCoin: function (sender, type) {
        var size = cc.winSize
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("choosecoin called")
                var choose_coin_audio = cc.audioEngine.playEffect(res.choose_coin_wav)
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

    removeDealedCoinsByClick: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.removeDealedCoins()
        }
    },

    removeDealedCoins: function () {
        console.log("remove dealed coins")
        for (let index = 0; index < this.panelOneDealedCoins.length + this.panelTwoDealedCoins.length + this.panelThreeDealedCoins.length; index++) {
            this.removeChildByTag(this.dealedCoins_tag)
        }
        this.betAmountTokenVal.setString("0.0")
        this.panelOneDealedCoins = []
        this.panelTwoDealedCoins = []
        this.panelThreeDealedCoins = []
        this.panelOneArea.removeChild(this.panelOneValRoundRect)
        this.panelOneArea.removeChild(this.panelOneValRoundRect_Label)
        this.panelTwoArea.removeChild(this.panelTwoValRoundRect)
        this.panelTwoArea.removeChild(this.panelTwoValRoundRect_Label)
        this.panelThreeArea.removeChild(this.panelThreeValRoundRect)
        this.panelThreeArea.removeChild(this.panelThreeValRoundRect_Label)
        this.confirmBtn.setEnabled(false)
        this.cancelBtn.setEnabled(false)

    },
    
    showCoinDealCheckDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showcoinDealCheckDlg")
                this.disableAllBtn()
                // coinDealCheckDlg
                var paddingX = 20
                var paddingY = 20
                var panelOneSum = 0
                var panelTwoSum = 0
                var panelThreeSum = 0
                this.coinDealCheckDlg_overLay = new cc.DrawNode()
                this.coinDealCheckDlg_overLay.drawRect(cc.p(0, 0), cc.p(cc.winSize.width, cc.winSize.height), cc.color(0, 0, 0, 100), 0)
                this.addChild(this.coinDealCheckDlg_overLay, this.overLay_zOrder)
                this.coinDealCheckDlg_zOrder = this.overLay_zOrder + 1
                var coinDealCheckDlg_height = 270
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
                betAmountTokenSprite1.setPosition(cc.p(this.coinDealCheckDlg.getContentSize().width / 2 - (betAmountTokenSprite1_width + paddingX / 2 + betOrderConfirmLabel.getContentSize().width) / 2,  coinDealCheckDlg_height - betAmountTokenSprite1_height / 2 - paddingY + 2))
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
                hrLine1.setPosition(cc.p(paddingX / 2, coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 4))
                this.coinDealCheckDlg.addChild(hrLine1, this.coinDealCheckDlg_zOrder)

                var field1Label = new cc.LabelTTF("操作", "Arial", 15)
                var field2Label = new cc.LabelTTF("玩法", "Arial", 15)
                var field3Label = new cc.LabelTTF("金额", "Arial", 15)
                var field4Label = new cc.LabelTTF("冻结", "Arial", 15)
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
                field2Label.setPosition(cc.p(field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 2, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2- paddingY / 4))
                field3Label.setPosition(cc.p(coinDealCheckDlg_width - field3Label.getContentSize().width / 2 - paddingX / 2 - field4Label.getContentSize().width - paddingX * 2, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2- paddingY / 4))
                field4Label.setPosition(cc.p(coinDealCheckDlg_width - field4Label.getContentSize().width / 2 - paddingX / 2, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4))
                this.coinDealCheckDlg.addChild(field1Label, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(field2Label, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(field3Label, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(field4Label, this.coinDealCheckDlg_zOrder)

                var hrLine2 = new cc.LayerColor(cc.color(102, 102, 102), coinDealCheckDlg_width - paddingX, 1)
                hrLine2.setPosition(cc.p(paddingX / 2, coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2- paddingY / 4 - field1Label.getContentSize().height - paddingY / 4))
                this.coinDealCheckDlg.addChild(hrLine2, this.coinDealCheckDlg_zOrder)
                
                var checkRadioSprite_width = 20
                var dealedPanelNum = 0
                if (this.panelOneDealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲一(翻倍)", "Arial", 14)
                    field2Val.attr({
                        x: field2Val.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 2 - field2Val.getContentSize().width / 2 + field1Label.getContentSize().width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4,
                        fillStyle: cc.color(4, 186, 238)
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3RoundRect_width = 70
                    var field3RoundRect_height = 20
                    var field3RoundRect = new RoundRect(field3RoundRect_width, field3RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field3RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4Label.getContentSize().width - paddingX * 2 - field3RoundRect_width, coinDealCheckDlg_height - field3RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4))
                    this.coinDealCheckDlg.addChild(field3RoundRect, this.coinDealCheckDlg_zOrder)
                    panelOneSum = this.sumCoins(this.panelOneDealedCoins)
                    var field3Val = new cc.LabelTTF(panelOneSum, "Arial", 15)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                    })
                    field3Val.setPosition(cc.p(coinDealCheckDlg_width - field3Val.getContentSize().width / 2  - paddingX / 2 - field4Label.getContentSize().width - paddingX * 2 - paddingX / 4, coinDealCheckDlg_height + field3Val.getContentSize().height / 2 - field3RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - field3RoundRect_height / 2 + field3Val.getContentSize().height / 2))
                    this.coinDealCheckDlg.addChild(field3Val, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF("2000.0", "Arial", 15)
                    field4Val.attr({
                        fillStyle: cc.color(187, 187, 187)
                    })
                    field4Val.setPosition(cc.p(coinDealCheckDlg_width - field4Val.getContentSize().width / 2 - paddingX / 2, 
                                                coinDealCheckDlg_height - field4Val.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingX / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - field3RoundRect_height / 2 + field4Val.getContentSize().height / 2))
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }
                if (this.panelTwoDealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum 
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲二(翻倍)", "Arial", 14)
                    field2Val.attr({
                        x: field2Val.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 2 - field2Val.getContentSize().width / 2 + field1Label.getContentSize().width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum,
                        fillStyle: cc.color(4, 186, 238)
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3RoundRect_width = 70
                    var field3RoundRect_height = 20
                    var field3RoundRect = new RoundRect(field3RoundRect_width, field3RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field3RoundRect.setPosition(cc.p(coinDealCheckDlg_width- paddingX / 2 - field4Label.getContentSize().width - paddingX * 2 - field3RoundRect_width, coinDealCheckDlg_height - field3RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field3RoundRect, this.coinDealCheckDlg_zOrder)
                    panelTwoSum = this.sumCoins(this.panelTwoDealedCoins)
                    var field3Val = new cc.LabelTTF(panelTwoSum, "Arial", 15)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                    })
                    field3Val.setPosition(cc.p(coinDealCheckDlg_width - field3Val.getContentSize().width / 2 - paddingX / 2 - field4Label.getContentSize().width - paddingX * 2 - paddingX / 4, coinDealCheckDlg_height + field3Val.getContentSize().height / 2 - field3RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - field3RoundRect_height / 2 + field3Val.getContentSize().height / 2 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field3Val, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF("2000.0", "Arial", 15)
                    field4Val.attr({
                        fillStyle: cc.color(187, 187, 187)
                    })
                    field4Val.setPosition(cc.p(coinDealCheckDlg_width - field4Val.getContentSize().width / 2 - paddingX / 2, 
                                                coinDealCheckDlg_height - field4Val.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingX / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - field3RoundRect_height / 2 + field4Val.getContentSize().height / 2 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }
                if (this.panelThreeDealedCoins.length !== 0) {
                    var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                    checkRadioSprite1.attr({
                        scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                        x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum 
                    })
                    this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder)
                    var field2Val = new cc.LabelTTF("闲三(翻倍)", "Arial", 14)
                    field2Val.attr({
                        x: field2Val.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 2 - field2Val.getContentSize().width / 2 + field1Label.getContentSize().width / 2,
                        y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum,
                        fillStyle: cc.color(4, 186, 238)
                    })
                    this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                    var field3RoundRect_width = 70
                    var field3RoundRect_height = 20
                    var field3RoundRect = new RoundRect(field3RoundRect_width, field3RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                    field3RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4Label.getContentSize().width - paddingX * 2 - field3RoundRect_width, coinDealCheckDlg_height - field3RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field3RoundRect, this.coinDealCheckDlg_zOrder)
                    panelThreeSum = this.sumCoins(this.panelThreeDealedCoins)
                    var field3Val = new cc.LabelTTF(panelThreeSum, "Arial", 15)
                    field3Val.attr({
                        fillStyle: cc.color(255, 255, 255),
                    })
                    field3Val.setPosition(cc.p(coinDealCheckDlg_width - field3Val.getContentSize().width / 2 - paddingX / 2 - field4Label.getContentSize().width - paddingX * 2 - paddingX / 4, coinDealCheckDlg_height + field3Val.getContentSize().height / 2 - field3RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - field3RoundRect_height / 2 + field3Val.getContentSize().height / 2 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field3Val, this.coinDealCheckDlg_zOrder)
                    var field4Val = new cc.LabelTTF("2000.0", "Arial", 15)
                    field4Val.attr({
                        fillStyle: cc.color(187, 187, 187)
                    })
                    field4Val.setPosition(cc.p(coinDealCheckDlg_width - field4Val.getContentSize().width / 2 - paddingX / 2, 
                                                coinDealCheckDlg_height - field4Val.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingX / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - field3RoundRect_height / 2 + field4Val.getContentSize().height / 2 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum))
                    this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)
                    dealedPanelNum = dealedPanelNum + 1
                }

                var hrLine3 = new cc.LayerColor(cc.color(102, 102, 102), coinDealCheckDlg_width - paddingX, 1)
                hrLine3.setPosition(cc.p(paddingX / 2, coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum))
                this.coinDealCheckDlg.addChild(hrLine3, this.coinDealCheckDlg_zOrder)

                var checkRadioSprite1 = new cc.Sprite(res.check_radio_png)
                checkRadioSprite1.attr({
                    scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                    scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
                })
                var field2Val = new cc.LabelTTF("总金额:", "Arial", 14)
                field2Val.attr({
                    x: field2Val.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 2 - field2Val.getContentSize().width / 2 + field1Label.getContentSize().width / 2,
                    y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum - paddingY / 4,
                    fillStyle: cc.color(255, 255, 255)
                })
                this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder)
                var field3RoundRect_width = 70
                var field3RoundRect_height = 20
                var field3RoundRect = new RoundRect(field3RoundRect_width, field3RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null)
                field3RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4Label.getContentSize().width - paddingX * 2 - field3RoundRect_width, coinDealCheckDlg_height - field3RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum - paddingY / 4))
                this.coinDealCheckDlg.addChild(field3RoundRect, this.coinDealCheckDlg_zOrder)
                var field3Val = new cc.LabelTTF(panelOneSum + panelTwoSum + panelThreeSum, "Arial", 15)
                field3Val.attr({
                    fillStyle: cc.color(255, 255, 255),
                })
                field3Val.setPosition(cc.p(coinDealCheckDlg_width - field3Val.getContentSize().width / 2 - paddingX / 2 - field4Label.getContentSize().width - paddingX * 2 - paddingX / 4, coinDealCheckDlg_height + field3Val.getContentSize().height / 2 - field3RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - field3RoundRect_height / 2 + field3Val.getContentSize().height / 2 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum - paddingY / 4))
                this.coinDealCheckDlg.addChild(field3Val, this.coinDealCheckDlg_zOrder)
                var field4Val = new cc.LabelTTF("2000.0", "Arial", 15)
                field4Val.attr({
                    fillStyle: cc.color(187, 187, 187)
                })
                field4Val.setPosition(cc.p(coinDealCheckDlg_width- field4Val.getContentSize().width / 2 - paddingX / 2, 
                                            coinDealCheckDlg_height - field4Val.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingX / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - field3RoundRect_height / 2 + field4Val.getContentSize().height / 2 - checkRadioSprite_width * dealedPanelNum - paddingY / 4 * dealedPanelNum - paddingY / 4))
                this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder)

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
                this.coinDealCheckDlgYesBtn.setPosition(cc.p(coinDealCheckDlgYesBtn_width / 2 + coinDealCheckDlg_width / 2 - coinDealCheckDlgYesBtn_width - paddingX / 2 , this.coinDealCheckDlgYesBtn.getContentSize().height / 2 + dlgBtnBg_height / 2 - this.coinDealCheckDlgYesBtn.getContentSize().height / 2))
                this.coinDealCheckDlgNoBtn.setPosition(cc.p(coinDealCheckDlgNoBtn_width / 2 + coinDealCheckDlg_width / 2 + paddingX / 2, this.coinDealCheckDlgNoBtn.getContentSize().height / 2 + dlgBtnBg_height / 2 - this.coinDealCheckDlgNoBtn.getContentSize().height / 2))
                this.coinDealCheckDlgYesBtn.addTouchEventListener(this.showCheckSuccessDlg, this)
                this.coinDealCheckDlgNoBtn.addTouchEventListener(this.showDealCancelDlg, this)
                this.coinDealCheckDlg.addChild(this.coinDealCheckDlgYesBtn, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(this.coinDealCheckDlgNoBtn, this.coinDealCheckDlg_zOrder)
        }
    },

    showCheckFailDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showCheckFailDlg")
                this.disableAllBtn()

                var paddingX = 20
                var paddingY = 20
                var checkFailDlg_zOrder = this.coinDealCheckDlg_zOrder + 1
                this.checkFailDlg_overLay = new cc.DrawNode()
                this.checkFailDlg_overLay.drawRect(cc.p(0, 0), cc.p(cc.winSize.width, cc.winSize.height), cc.color(0, 0, 0, 100), 0)
                this.addChild(this.checkFailDlg_overLay, checkFailDlg_zOrder)
                var checkFailDlg_height = 120
                this.checkFailDlg = new RoundRect(cc.winSize.width - paddingX * 3, checkFailDlg_height, cc.color(255, 255, 255), 0, null, 10, null)
                this.checkFailDlg.setPosition(cc.p(paddingX * 3 / 2, cc.winSize.height / 2 - checkFailDlg_height / 2))
                this.addChild(this.checkFailDlg, checkFailDlg_zOrder)

                var checkFailDlgLabel = new cc.LabelTTF("余额不足", "Arial", 15)
                checkFailDlgLabel.attr({
                    fillStyle: cc.color(0, 0, 0),
                    x: this.checkFailDlg.getContentSize().width / 2 ,
                    y: checkFailDlg_height / 2 - checkFailDlgLabel.getContentSize().height / 2 + paddingY
                })
                this.checkFailDlg.addChild(checkFailDlgLabel)
                var dlgYesBtn = new ccui.Button(res.dlg_yes_btn_png, res.dlg_yes_btn_png, res.dlg_yes_btn_png)
                var dlgYesBtn_width = 70
                dlgYesBtn.attr({
                    scaleX: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    scaleY: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    x: this.checkFailDlg.getContentSize().width / 2,
                    y: paddingY / 2 + dlgYesBtn_width / dlgYesBtn.getContentSize().width * dlgYesBtn.getContentSize().height / 2
                })
                dlgYesBtn.addTouchEventListener(this.closeCheckFailDlg, this)
                this.checkFailDlg.addChild(dlgYesBtn)

                this.coinDealCheckDlgYesBtn.setEnabled(false)
                this.coinDealCheckDlgYesBtn.setTouchEnabled(false)
                this.coinDealCheckDlgNoBtn.setEnabled(false)
                this.coinDealCheckDlgNoBtn.setEnabled(false)

        }
    },
    closeCheckFailDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("closeCheckFailDlg")
                this.removeChild(this.checkFailDlg)
                this.removeChild(this.checkFailDlg_overLay)
                this.removeChild(this.coinDealCheckDlg)
                this.removeChild(this.coinDealCheckDlg_overLay)
                this.removeDealedCoins()
                
                this.enableAllBtn()
        }
    },

    showCheckSuccessDlg: function (sender, type) {
        console.log("showCheckFailDlg")

        var paddingX = 20
        var paddingY = 20
        var checkSuccessDlg_zOrder = this.coinDealCheckDlg_zOrder + 1
        this.checkSuccessDlg_overLay = new cc.DrawNode()
        this.checkSuccessDlg_overLay.drawRect(cc.p(0, 0), cc.p(cc.winSize.width, cc.winSize.height), cc.color(0, 0, 0, 100), 0)
        this.addChild(this.checkSuccessDlg_overLay, checkSuccessDlg_zOrder)
        var checkSuccessDlg_height = 120
        this.checkSuccessDlg = new RoundRect(cc.winSize.width - paddingX * 3, checkSuccessDlg_height, cc.color(255, 255, 255), 0, null, 10, null)
        this.checkSuccessDlg.setPosition(cc.p(paddingX * 3 / 2, cc.winSize.height / 2 - checkSuccessDlg_height / 2))
        this.addChild(this.checkSuccessDlg, checkSuccessDlg_zOrder)

        var checkSuccessDlgLabel = new cc.LabelTTF("下注成功", "Arial", 15)
        checkSuccessDlgLabel.attr({
            fillStyle: cc.color(0, 0, 0),
            x: this.checkSuccessDlg.getContentSize().width / 2 ,
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
        dlgYesBtn.setTitleText("确定("+ dlgYesBtn_time +")")
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

                if (this.panelOneValRoundRect_Label !== null) this.panelOneValRoundRect_Label.setColor(cc.color(34, 162, 211))
                if (this.panelTwoValRoundRect_Label !== null) this.panelTwoValRoundRect_Label.setColor(cc.color(34, 162, 211))
                if (this.panelThreeValRoundRect_Label !== null) this.panelThreeValRoundRect_Label.setColor(cc.color(34, 162, 211))
            }
            dlgYesBtn_time = dlgYesBtn_time - 1
            dlgYesBtn.setTitleText("确定("+ dlgYesBtn_time +")")
        }, 1000);

        this.coinDealCheckDlgYesBtn.setEnabled(false)
        this.coinDealCheckDlgYesBtn.setTouchEnabled(false)
        this.coinDealCheckDlgNoBtn.setEnabled(false)
        this.coinDealCheckDlgNoBtn.setEnabled(false)
    },

    closeCheckSuccessDlg: function () {
        console.log("closechecksuccessdlg")
        clearInterval(this.checkSuccessDlg_interval)
        this.removeChild(this.checkSuccessDlg)
        this.removeChild(this.checkSuccessDlg_overLay)
        this.removeChild(this.coinDealCheckDlg)
        this.removeChild(this.coinDealCheckDlg_overLay)
        
        if (this.panelOneValRoundRect_Label !== null) this.panelOneValRoundRect_Label.setColor(cc.color(34, 162, 211))
        if (this.panelTwoValRoundRect_Label !== null) this.panelTwoValRoundRect_Label.setColor(cc.color(34, 162, 211))
        if (this.panelThreeValRoundRect_Label !== null) this.panelThreeValRoundRect_Label.setColor(cc.color(34, 162, 211))
        setTimeout(() => {
            this.enableAllBtn()    
        }, 50);
    },
    showDealCancelDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showdealcanceldlg")
                this.disableAllBtn()
                var paddingX = 20
                var paddingY = 20
                var dealCancelDlg_zOrder = this.coinDealCheckDlg_zOrder + 1
                var dealCancelDlg_height = 120
                this.dealCancelDlg_overLay = new cc.DrawNode()
                this.dealCancelDlg_overLay.drawRect(cc.p(0, 0), cc.p(cc.winSize.width, cc.winSize.height), cc.color(0, 0, 0, 100), 0)
                this.addChild(this.dealCancelDlg_overLay, dealCancelDlg_zOrder)
                this.dealCancelDlg = new RoundRect(cc.winSize.width - paddingX * 3, dealCancelDlg_height, cc.color(255, 255, 255), 0, null, 10, null)
                this.dealCancelDlg.setPosition(cc.p(paddingX * 3 / 2, cc.winSize.height / 2 - dealCancelDlg_height / 2))
                this.addChild(this.dealCancelDlg, dealCancelDlg_zOrder)

                var dealCancelDlgLabel = new cc.LabelTTF("你确定取消下注吗？", "Arial", 15)
                dealCancelDlgLabel.attr({
                    fillStyle: cc.color(0, 0, 0),
                    x: this.dealCancelDlg.getContentSize().width / 2 ,
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
                dlgYesBtn.setPosition(cc.p(dlgYesBtn_width / 2 + this.dealCancelDlg.getContentSize().width / 2 - dlgYesBtn_width - paddingX / 2 ,
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
                this.enabledCoinDrop = true
                this.removeChild(this.dealCancelDlg)
                this.removeChild(this.dealCancelDlg_overLay)
                this.coinDealCheckDlgYesBtn.setEnabled(true)
                this.coinDealCheckDlgYesBtn.setTouchEnabled(true)
                this.coinDealCheckDlgNoBtn.setEnabled(true)
                this.coinDealCheckDlgNoBtn.setTouchEnabled(true)
        }
        
    },

    showBetWinDlg: function () {
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 40
        this.disableAllBtn()
        this.betWinDlg_overlay = new cc.LayerGradient(cc.color(0, 0, 0, 100), cc.color(9, 145, 200))
        this.betWinDlg_overlay.setContentSize(cc.size(size.width, size.height - this.header_height - this.coinWrapSprite_height - this.betAmountBg_height - paddingY / 2))
        this.betWinDlg_overlay.setPosition(cc.p(0,this.coinWrapSprite_height + this.betAmountBg_height + paddingY / 2))
        this.addChild(this.betWinDlg_overlay, 100)

        var betWinDlg_height = 300
        var betWinDlg_width = size.width - paddingX * 3
        this.betWinDlg = new RoundRect(betWinDlg_width, betWinDlg_height, cc.color(0, 0, 0, 150), 0, null, 20, null)
        this.betWinDlg.setPosition(paddingX * 3 / 2, size.height / 2 - betWinDlg_height / 2)
        this.addChild(this.betWinDlg, 100)

        this.betWinSprite = new cc.Sprite(res.win_logo_png)
        var betWinSprite_width = betWinDlg_width
        var betWinSprite_height = betWinSprite_width / this.betWinSprite.getContentSize().width * this.betWinSprite.getContentSize().height
        this.betWinSprite.attr({
            scaleX: betWinSprite_width / this.betWinSprite.getContentSize().width,
            scaleY: betWinSprite_width / this.betWinSprite.getContentSize().width
        })
        this.betWinSprite.setPosition(cc.p(size.width / 2, size.height / 2 + betWinDlg_height / 2 - betWinSprite_height / 8))
        this.addChild(this.betWinSprite, 100)

        var hrLine1 = new cc.DrawNode()
        hrLine1.drawRect(cc.p(paddingX / 2, betWinDlg_height - betWinSprite_height / 2 - betWinSprite_height / 8), cc.p(betWinDlg_width - paddingX / 2, betWinDlg_height - betWinSprite_height / 2 - betWinSprite_height / 8), cc.color(102, 102, 102), 0, null)
        this.betWinDlg.addChild(hrLine1)

        var field1Label = new cc.LabelTTF("玩法赔率", "Arial", 14)
        var field2Label = new cc.LabelTTF("下注金额", "Arial", 14)
        var field3Label = new cc.LabelTTF("结果", "Arial", 14)
        field1Label.attr({
            fillStyle: cc.color(158, 158, 158),
            x: paddingX / 2 + field1Label.getContentSize().width / 2,
            y: betWinDlg_height - field1Label.getContentSize().height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height / 2 - paddingY / 4 
        })
        field2Label.attr({
            fillStyle: cc.color(158, 158, 158),
            x: betWinDlg_width - paddingX / 2 - field2Label.getContentSize().width / 2 - field3Label.getContentSize().width - 30,
            y: betWinDlg_height - field1Label.getContentSize().height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height / 2 - paddingY / 4 
        })
        field3Label.attr({
            fillStyle: cc.color(158, 158, 158),
            x: betWinDlg_width - paddingX / 2 - field3Label.getContentSize().width / 2,
            y: betWinDlg_height - field1Label.getContentSize().height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height / 2 - paddingY / 4 
        })
        this.betWinDlg.addChild(field1Label)
        this.betWinDlg.addChild(field2Label)
        this.betWinDlg.addChild(field3Label)

        var hrLine2 = new cc.DrawNode()
        hrLine2.drawRect(cc.p(paddingX / 2, betWinDlg_height - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height), cc.p(betWinDlg_width - paddingX / 2, betWinDlg_height - betWinSprite_height / 2 - betWinSprite_height / 8 - paddingY / 4 - field1Label.getContentSize().height), cc.color(102, 102, 102), 0, null)
        this.betWinDlg.addChild(hrLine2)

        var dealedPanelNum = 0
        var field1Val_1_1 = new cc.LabelTTF("闲一", "Arial", 15)
        var tr_height = field1Val_1_1.getContentSize().height
        if (this.panelOneDealedCoins.length !== 0) {
            // var field1Val_1_1 = new cc.LabelTTF("闲一", "Arial", 15)
            field1Val_1_1.attr({
                fillStyle: cc.color(4, 186, 238)
            })
            field1Val_1_1.setPosition(cc.p(paddingX / 2 + field1Val_1_1.getContentSize().width / 2, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1Val_1_1)
            var field1val_1_2 = new cc.LabelTTF("@", "Arial", 15)
            field1val_1_2.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_1_2.setPosition(cc.p(paddingX / 2 + field1val_1_2.getContentSize().width / 2 + field1Val_1_1.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_1_2)
            var field1val_1_3 = new cc.LabelTTF("1.99", "Arial", 15)
            field1val_1_3.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field1val_1_3.setPosition(cc.p(paddingX / 2 + field1val_1_3.getContentSize().width / 2 + field1Val_1_1.getContentSize().width + field1val_1_2.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_1_3)
            var field1val_1_4 = new cc.LabelTTF(" 无牛 (翻倍)", "Arial", 15)
            field1val_1_4.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_1_4.setPosition(cc.p(paddingX / 2 + field1val_1_4.getContentSize().width / 2 + field1Val_1_1.getContentSize().width + field1val_1_2.getContentSize().width + field1val_1_3.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_1_4)
            
            var field2Val_1 = new cc.LabelTTF("20", "Arial", 15)
            field2Val_1.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field2Val_1.setPosition(cc.p(betWinDlg_width - field2Val_1.getContentSize().width / 2 - paddingX / 2 - field3Label.getContentSize().width - 30, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field2Val_1)
            var field3Val_1 = new cc.LabelTTF("-20", "Arial", 15)
            field3Val_1.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field3Val_1.setPosition(cc.p(betWinDlg_width - paddingX / 2 - field3Val_1.getContentSize().width / 2, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field3Val_1)
            dealedPanelNum = dealedPanelNum + 1
        }
        if (this.panelTwoDealedCoins.length !== 0) {
            var field1Val_2_1 = new cc.LabelTTF("闲二", "Arial", 14)
            field1Val_2_1.attr({
                fillStyle: cc.color(4, 186, 238)
            })
            field1Val_2_1.setPosition(cc.p(paddingX / 2 + field1Val_2_1.getContentSize().width / 2, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1Val_2_1)
            var field1val_2_2 = new cc.LabelTTF("@", "Arial", 15)
            field1val_2_2.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_2_2.setPosition(cc.p(paddingX / 2 + field1val_2_2.getContentSize().width / 2 + field1Val_2_1.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_2_2)
            var field1val_2_3 = new cc.LabelTTF("5.99", "Arial", 15)
            field1val_2_3.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field1val_2_3.setPosition(cc.p(paddingX / 2 + field1val_2_3.getContentSize().width / 2 + field1Val_2_1.getContentSize().width + field1val_2_2.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_2_3)
            var field1val_2_4 = new cc.LabelTTF(" 牛牛 (翻倍)", "Arial", 15)
            field1val_2_4.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_2_4.setPosition(cc.p(paddingX / 2 + field1val_2_4.getContentSize().width / 2 + field1Val_2_1.getContentSize().width + field1val_2_2.getContentSize().width + field1val_2_3.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_2_4)
            
            var field2Val_2 = new cc.LabelTTF("20", "Arial", 15)
            field2Val_2.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field2Val_2.setPosition(cc.p(betWinDlg_width - field2Val_2.getContentSize().width / 2 - paddingX / 2 - field3Label.getContentSize().width - 30, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field2Val_2)
            var field3Val_2 = new cc.LabelTTF("+99.8", "Arial", 15)
            field3Val_2.attr({
                fillStyle: cc.color(0, 255, 0)
            })
            field3Val_2.setPosition(cc.p(betWinDlg_width - paddingX / 2 - field3Val_2.getContentSize().width / 2, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field3Val_2)
            dealedPanelNum = dealedPanelNum + 1
        }
        if (this.panelThreeDealedCoins.length !== 0) {
            var field1Val_3_1 = new cc.LabelTTF("闲三", "Arial", 14)
            field1Val_3_1.attr({
                fillStyle: cc.color(4, 186, 238)
            })
            field1Val_3_1.setPosition(cc.p(paddingX / 2 + field1Val_3_1.getContentSize().width / 2, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1Val_3_1)
            var field1val_3_2 = new cc.LabelTTF("@", "Arial", 15)
            field1val_3_2.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_3_2.setPosition(cc.p(paddingX / 2 + field1val_3_2.getContentSize().width / 2 + field1Val_3_1.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_3_2)
            var field1val_3_3 = new cc.LabelTTF("5.99", "Arial", 15)
            field1val_3_3.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field1val_3_3.setPosition(cc.p(paddingX / 2 + field1val_3_3.getContentSize().width / 2 + field1Val_3_1.getContentSize().width + field1val_3_2.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_3_3)
            var field1val_3_4 = new cc.LabelTTF(" 牛牛 (翻倍)", "Arial", 15)
            field1val_3_4.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_3_4.setPosition(cc.p(paddingX / 2 + field1val_3_4.getContentSize().width / 2 + field1Val_3_1.getContentSize().width + field1val_3_2.getContentSize().width + field1val_3_3.getContentSize().width, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field1val_3_4)
            
            var field2Val_3 = new cc.LabelTTF("20", "Arial", 15)
            field2Val_3.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field2Val_3.setPosition(cc.p(betWinDlg_width - field2Val_3.getContentSize().width / 2 - paddingX / 2 - field3Label.getContentSize().width - 30, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field2Val_3)
            var field3Val_3 = new cc.LabelTTF("+99.8", "Arial", 15)
            field3Val_3.attr({
                fillStyle: cc.color(0, 255, 0)
            })
            field3Val_3.setPosition(cc.p(betWinDlg_width - paddingX / 2 - field3Val_3.getContentSize().width / 2, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betWinDlg.addChild(field3Val_3)

            dealedPanelNum = dealedPanelNum + 1
        }

        if (dealedPanelNum < 0) dealedPanelNum = 0
        var hrLine3 = new cc.DrawNode()
        hrLine3.drawRect(cc.p(paddingX / 2, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * (dealedPanelNum - 1) - paddingY / 4 * dealedPanelNum - paddingY / 4), cc.p(betWinDlg_width - paddingX / 2, betWinDlg_height - tr_height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * (dealedPanelNum - 1) - paddingY / 4 * dealedPanelNum - paddingY / 4), cc.color(102, 102, 102), 0, null)
        this.betWinDlg.addChild(hrLine3)

        var total_field1 = new cc.LabelTTF("本局总计", "Arial", 17)
        total_field1.attr({
            fillStyle: cc.color(255, 255, 255)
        })
        total_field1.setPosition(cc.p(total_field1.getContentSize().width / 2 + paddingX / 2, betWinDlg_height - total_field1.getContentSize().height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * (dealedPanelNum - 1) - paddingY / 4 * dealedPanelNum - paddingY / 4 - paddingY / 2))
        this.betWinDlg.addChild(total_field1)

        var total_field2 = new cc.LabelTTF("+159.0", "Arial", 17)
        total_field2.attr({
            fillStyle: cc.color(0, 255, 0)
        })
        total_field2.setPosition(betWinDlg_width - total_field2.getContentSize().width / 2 - paddingX / 2, betWinDlg_height - total_field2.getContentSize().height / 2 - betWinSprite_height / 2 - betWinSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * (dealedPanelNum - 1) - paddingY / 4 * dealedPanelNum - paddingY / 4 - paddingY / 2)
        this.betWinDlg.addChild(total_field2)

        var betWinDlgBtn = new ccui.Button(res.green_rounded_rect_png)
        var betWinDlgBtn_width = 100
        var betWinDlgBtn_time = 4
        betWinDlgBtn.attr({
            scaleX: betWinDlgBtn_width / betWinDlgBtn.getContentSize().width,
            scaleY: betWinDlgBtn_width / betWinDlgBtn.getContentSize().width
        })
        betWinDlgBtn.setTitleText("关闭(" + betWinDlgBtn_time + ")")
        betWinDlgBtn.setTitleFontSize(45)
        betWinDlgBtn.setPosition(cc.p(betWinDlg_width / 2, 30))
        betWinDlgBtn.addTouchEventListener(this.closeBetWinDlg, this)
        this.betWinDlg.addChild(betWinDlgBtn)

        this.betWinDlg_interval = setInterval(() => {
            if (betWinDlgBtn_time == 0) {
                clearInterval(this.betWinDlg_interval)
                this.removeChild(this.betWinDlg_overlay)
                this.removeChild(this.betWinSprite)
                this.removeChild(this.betWinDlg)

                this.enableAllBtn()
            }
            betWinDlgBtn_time = betWinDlgBtn_time - 1
            betWinDlgBtn.setTitleText("关闭(" + (betWinDlgBtn_time) + ")")
        }, 1000);

    },
    closeBetWinDlg: function(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("closeBetWinDlg")
                clearInterval(this.betWinDlg_interval)
                this.removeChild(this.betWinDlg_overlay)
                this.removeChild(this.betWinSprite)
                this.removeChild(this.betWinDlg)

                this.enableAllBtn()
        }
    },

    showBetFailDlg: function () {
        console.log("showBetFailDlg")
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 40
        this.disableAllBtn()
        this.betFailDlg_overlay = new cc.LayerGradient(cc.color(0, 0, 0, 100), cc.color(177, 64, 91))
        this.betFailDlg_overlay.setContentSize(cc.size(size.width, size.height - this.header_height - this.coinWrapSprite_height - this.betAmountBg_height - paddingY / 2))
        this.betFailDlg_overlay.setPosition(cc.p(0,this.coinWrapSprite_height + this.betAmountBg_height + paddingY / 2))
        this.addChild(this.betFailDlg_overlay, 100)

        var betFailDlg_height = 300
        var betFailDlg_width = size.width - paddingX * 3
        this.betFailDlg = new RoundRect(betFailDlg_width, betFailDlg_height, cc.color(0, 0, 0, 150), 0, null, 20, null)
        this.betFailDlg.setPosition(paddingX * 3 / 2, size.height / 2 - betFailDlg_height / 2)
        this.addChild(this.betFailDlg, 100)

        this.betFailSprite = new cc.Sprite(res.fail_logo_png)
        var betFailSprite_width = betFailDlg_width
        var betFailSprite_height = betFailSprite_width / this.betFailSprite.getContentSize().width * this.betFailSprite.getContentSize().height
        this.betFailSprite.attr({
            scaleX: betFailSprite_width / this.betFailSprite.getContentSize().width,
            scaleY: betFailSprite_width / this.betFailSprite.getContentSize().width
        })
        this.betFailSprite.setPosition(cc.p(size.width / 2, size.height / 2 + betFailDlg_height / 2 - betFailSprite_height / 8))
        this.addChild(this.betFailSprite, 100)

        var hrLine1 = new cc.DrawNode()
        hrLine1.drawRect(cc.p(paddingX / 2, betFailDlg_height - betFailSprite_height / 2 - betFailSprite_height / 8), cc.p(betFailDlg_width - paddingX / 2, betFailDlg_height - betFailSprite_height / 2 - betFailSprite_height / 8), cc.color(102, 102, 102), 0, null)
        this.betFailDlg.addChild(hrLine1)

        var field1Label = new cc.LabelTTF("玩法赔率", "Arial", 14)
        var field2Label = new cc.LabelTTF("下注金额", "Arial", 14)
        var field3Label = new cc.LabelTTF("结果", "Arial", 14)
        field1Label.attr({
            fillStyle: cc.color(158, 158, 158),
            x: paddingX / 2 + field1Label.getContentSize().width / 2,
            y: betFailDlg_height - field1Label.getContentSize().height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height / 2 - paddingY / 4 
        })
        field2Label.attr({
            fillStyle: cc.color(158, 158, 158),
            x: betFailDlg_width - paddingX / 2 - field2Label.getContentSize().width / 2 - field3Label.getContentSize().width - 30,
            y: betFailDlg_height - field1Label.getContentSize().height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height / 2 - paddingY / 4 
        })
        field3Label.attr({
            fillStyle: cc.color(158, 158, 158),
            x: betFailDlg_width - paddingX / 2 - field3Label.getContentSize().width / 2,
            y: betFailDlg_height - field1Label.getContentSize().height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height / 2 - paddingY / 4 
        })
        this.betFailDlg.addChild(field1Label)
        this.betFailDlg.addChild(field2Label)
        this.betFailDlg.addChild(field3Label)

        var hrLine2 = new cc.DrawNode()
        hrLine2.drawRect(cc.p(paddingX / 2, betFailDlg_height - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height), cc.p(betFailDlg_width - paddingX / 2, betFailDlg_height - betFailSprite_height / 2 - betFailSprite_height / 8 - paddingY / 4 - field1Label.getContentSize().height), cc.color(102, 102, 102), 0, null)
        this.betFailDlg.addChild(hrLine2)

        var dealedPanelNum = 0
        var field1Val_1_1 = new cc.LabelTTF("闲一", "Arial", 15)
        var tr_height = field1Val_1_1.getContentSize().height
        if (this.panelOneDealedCoins.length !== 0) {
            // var field1Val_1_1 = new cc.LabelTTF("闲一", "Arial", 15)
            field1Val_1_1.attr({
                fillStyle: cc.color(4, 186, 238)
            })
            field1Val_1_1.setPosition(cc.p(paddingX / 2 + field1Val_1_1.getContentSize().width / 2, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1Val_1_1)
            var field1val_1_2 = new cc.LabelTTF("@", "Arial", 15)
            field1val_1_2.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_1_2.setPosition(cc.p(paddingX / 2 + field1val_1_2.getContentSize().width / 2 + field1Val_1_1.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_1_2)
            var field1val_1_3 = new cc.LabelTTF("1.99", "Arial", 15)
            field1val_1_3.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field1val_1_3.setPosition(cc.p(paddingX / 2 + field1val_1_3.getContentSize().width / 2 + field1Val_1_1.getContentSize().width + field1val_1_2.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_1_3)
            var field1val_1_4 = new cc.LabelTTF(" 无牛 (翻倍)", "Arial", 15)
            field1val_1_4.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_1_4.setPosition(cc.p(paddingX / 2 + field1val_1_4.getContentSize().width / 2 + field1Val_1_1.getContentSize().width + field1val_1_2.getContentSize().width + field1val_1_3.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_1_4)
            
            var field2Val_1 = new cc.LabelTTF("20", "Arial", 15)
            field2Val_1.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field2Val_1.setPosition(cc.p(betFailDlg_width - field2Val_1.getContentSize().width / 2 - paddingX / 2 - field3Label.getContentSize().width - 30, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field2Val_1)
            var field3Val_1 = new cc.LabelTTF("-20", "Arial", 15)
            field3Val_1.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field3Val_1.setPosition(cc.p(betFailDlg_width - paddingX / 2 - field3Val_1.getContentSize().width / 2, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field3Val_1)
            dealedPanelNum = dealedPanelNum + 1
        }
        if (this.panelTwoDealedCoins.length !== 0) {
            var field1Val_2_1 = new cc.LabelTTF("闲二", "Arial", 14)
            field1Val_2_1.attr({
                fillStyle: cc.color(4, 186, 238)
            })
            field1Val_2_1.setPosition(cc.p(paddingX / 2 + field1Val_2_1.getContentSize().width / 2, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1Val_2_1)
            var field1val_2_2 = new cc.LabelTTF("@", "Arial", 15)
            field1val_2_2.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_2_2.setPosition(cc.p(paddingX / 2 + field1val_2_2.getContentSize().width / 2 + field1Val_2_1.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_2_2)
            var field1val_2_3 = new cc.LabelTTF("5.99", "Arial", 15)
            field1val_2_3.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field1val_2_3.setPosition(cc.p(paddingX / 2 + field1val_2_3.getContentSize().width / 2 + field1Val_2_1.getContentSize().width + field1val_2_2.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_2_3)
            var field1val_2_4 = new cc.LabelTTF(" 牛牛 (翻倍)", "Arial", 15)
            field1val_2_4.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_2_4.setPosition(cc.p(paddingX / 2 + field1val_2_4.getContentSize().width / 2 + field1Val_2_1.getContentSize().width + field1val_2_2.getContentSize().width + field1val_2_3.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_2_4)
            
            var field2Val_2 = new cc.LabelTTF("20", "Arial", 15)
            field2Val_2.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field2Val_2.setPosition(cc.p(betFailDlg_width - field2Val_2.getContentSize().width / 2 - paddingX / 2 - field3Label.getContentSize().width - 30, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field2Val_2)
            var field3Val_2 = new cc.LabelTTF("-99.8", "Arial", 15)
            field3Val_2.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field3Val_2.setPosition(cc.p(betFailDlg_width - paddingX / 2 - field3Val_2.getContentSize().width / 2, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field3Val_2)
            dealedPanelNum = dealedPanelNum + 1
        }
        if (this.panelThreeDealedCoins.length !== 0) {
            var field1Val_3_1 = new cc.LabelTTF("闲三", "Arial", 14)
            field1Val_3_1.attr({
                fillStyle: cc.color(4, 186, 238)
            })
            field1Val_3_1.setPosition(cc.p(paddingX / 2 + field1Val_3_1.getContentSize().width / 2, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1Val_3_1)
            var field1val_3_2 = new cc.LabelTTF("@", "Arial", 15)
            field1val_3_2.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_3_2.setPosition(cc.p(paddingX / 2 + field1val_3_2.getContentSize().width / 2 + field1Val_3_1.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_3_2)
            var field1val_3_3 = new cc.LabelTTF("5.99", "Arial", 15)
            field1val_3_3.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field1val_3_3.setPosition(cc.p(paddingX / 2 + field1val_3_3.getContentSize().width / 2 + field1Val_3_1.getContentSize().width + field1val_3_2.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_3_3)
            var field1val_3_4 = new cc.LabelTTF(" 牛牛 (翻倍)", "Arial", 15)
            field1val_3_4.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field1val_3_4.setPosition(cc.p(paddingX / 2 + field1val_3_4.getContentSize().width / 2 + field1Val_3_1.getContentSize().width + field1val_3_2.getContentSize().width + field1val_3_3.getContentSize().width, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field1val_3_4)
            
            var field2Val_3 = new cc.LabelTTF("20", "Arial", 15)
            field2Val_3.attr({
                fillStyle: cc.color(158, 158, 158)
            })
            field2Val_3.setPosition(cc.p(betFailDlg_width - field2Val_3.getContentSize().width / 2 - paddingX / 2 - field3Label.getContentSize().width - 30, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field2Val_3)
            var field3Val_3 = new cc.LabelTTF("-99.8", "Arial", 15)
            field3Val_3.attr({
                fillStyle: cc.color(255, 0, 0)
            })
            field3Val_3.setPosition(cc.p(betFailDlg_width - paddingX / 2 - field3Val_3.getContentSize().width / 2, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * dealedPanelNum - paddingY / 4 * dealedPanelNum))
            this.betFailDlg.addChild(field3Val_3)

            dealedPanelNum = dealedPanelNum + 1
        }

        if (dealedPanelNum < 0) dealedPanelNum = 0
        var hrLine3 = new cc.DrawNode()
        hrLine3.drawRect(cc.p(paddingX / 2, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * (dealedPanelNum - 1) - paddingY / 4 * dealedPanelNum - paddingY / 4), cc.p(betFailDlg_width - paddingX / 2, betFailDlg_height - tr_height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * (dealedPanelNum - 1) - paddingY / 4 * dealedPanelNum - paddingY / 4), cc.color(102, 102, 102), 0, null)
        this.betFailDlg.addChild(hrLine3)

        var total_field1 = new cc.LabelTTF("本局总计", "Arial", 17)
        total_field1.attr({
            fillStyle: cc.color(255, 255, 255)
        })
        total_field1.setPosition(cc.p(total_field1.getContentSize().width / 2 + paddingX / 2, betFailDlg_height - total_field1.getContentSize().height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * (dealedPanelNum - 1) - paddingY / 4 * dealedPanelNum - paddingY / 4 - paddingY / 2))
        this.betFailDlg.addChild(total_field1)

        var total_field2 = new cc.LabelTTF("-159.0", "Arial", 17)
        total_field2.attr({
            fillStyle: cc.color(255, 0, 0)
        })
        total_field2.setPosition(betFailDlg_width - total_field2.getContentSize().width / 2 - paddingX / 2, betFailDlg_height - total_field2.getContentSize().height / 2 - betFailSprite_height / 2 - betFailSprite_height / 8 - hrLine1.getContentSize().height - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - tr_height * (dealedPanelNum - 1) - paddingY / 4 * dealedPanelNum - paddingY / 4 - paddingY / 2)
        this.betFailDlg.addChild(total_field2)

        var betFailDlgBtn = new ccui.Button(res.green_rounded_rect_png)
        var betFailDlgBtn_width = 100
        var betFailDlgBtn_time = 4
        betFailDlgBtn.attr({
            scaleX: betFailDlgBtn_width / betFailDlgBtn.getContentSize().width,
            scaleY: betFailDlgBtn_width / betFailDlgBtn.getContentSize().width
        })
        betFailDlgBtn.setTitleText("关闭(" + betFailDlgBtn_time + ")")
        betFailDlgBtn.setTitleFontSize(45)
        betFailDlgBtn.setPosition(cc.p(betFailDlg_width / 2, 30))
        betFailDlgBtn.addTouchEventListener(this.closeBetFailDlg, this)
        this.betFailDlg.addChild(betFailDlgBtn)

        this.betFailDlg_interval = setInterval(() => {
            if (betFailDlgBtn_time == 0) {
                clearInterval(this.betFailDlg_interval)
                this.removeChild(this.betFailDlg_overlay)
                this.removeChild(this.betFailSprite)
                this.removeChild(this.betFailDlg)

                this.enableAllBtn()
            }
            betFailDlgBtn_time = betFailDlgBtn_time - 1
            betFailDlgBtn.setTitleText("关闭(" + (betFailDlgBtn_time) + ")")
        }, 1000);
    },
    closeBetFailDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("closeBetFailDlg")
                clearInterval(this.betFailDlg_interval)
                this.removeChild(this.betFailDlg_overlay)
                this.removeChild(this.betFailSprite)
                this.removeChild(this.betFailDlg)

                this.enableAllBtn()
        }
    }

})

var NiuNiuGameScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var bgLayer = new BgLayer()
        this.addChild(bgLayer)
        var gameLayer = new NiuNiuGameLayer()
        this.addChild(gameLayer)
    }
})


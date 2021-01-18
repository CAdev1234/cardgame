var header_height = 70
var bank_height 
var coinWrapSprite_height

var BgLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.winSize
        var bgLayer = cc.LayerColor.create(cc.color(49, 91, 158), size.width, size.height)
        this.addChild(bgLayer)
    }
})

var HeaderLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        // header
        var headerBg = cc.LayerColor.create(cc.color(30, 101, 165), size.width, header_height)
        headerBg.attr({
            x: 0,
            y: size.height - header_height
        })
        this.addChild(headerBg);

        var serial_num = []
        var serial_num_height = 20
        for (let index = 0; index < 10; index++) {
            serial_num[index] = new cc.Sprite("res/niuniu/serial" + (index + 1) + ".png");
            serial_num[index].attr({
                x: size.width / 15 * (index + 1) - 5,
                y: size.height - 20,
                scaleX: serial_num_height / serial_num[index].getContentSize().height, 
                scaleY: serial_num_height / serial_num[index].getContentSize().height,
            })
            this.addChild(serial_num[index], 0)
        }
        for (let index = 0; index < 10; index++) {
            serial_num[index] = new cc.Sprite("res/niuniu/serial" + (index + 1) + ".png");
            serial_num[index].attr({
                x: size.width / 15 * (index + 1) - 5,
                y: size.height - 50,
                scaleX: serial_num_height / serial_num[index].getContentSize().height, 
                scaleY: serial_num_height / serial_num[index].getContentSize().height,
            })
            this.addChild(serial_num[index], 0)
        }

        var num_period_font_size = 15
        var num_period_label = new cc.LabelTTF.create("期数");
        num_period_label.attr({
            x: size.width - 80,
            y: size.height -  header_height / 2,
            fillStyle: cc.color(233, 133, 62),
            fontSize: num_period_font_size
        })
        this.addChild(num_period_label)
        var num_period_value = new cc.LabelTTF.create("530")
        num_period_value.attr({
            x: size.width - 40,
            y: size.height - header_height / 2,
            fillStyle: cc.color(255, 255, 255),
            fontSize: num_period_font_size
        })
        this.addChild(num_period_value)
        return true
    }
})



var GamePanelLayer = cc.Layer.extend({
    dealedCoins_tag: 1,
    overLay_zOrder: 10,
    coinDealCheckDlg_zOrder: null,
    soundOnBtn: null,
    enableSoundOn: true,
    coins: [],
    enabledCoin: [false, false, false, false, false, false, false],
    coinImages: [],
    coin_width: null,
    coinDropListener: null,
    panelOne_width: null,
    panelOne_height: null,
    panelTwo_width: null,
    panelTwo_height: null,
    panelOneDealedCoins: [],
    panelTwoDealedCoins: [],
    panelThreeDealedCoins: [],
    cancelBtn: null,
    confirmBtn: null,
    enabledCoinDrop: true,
    coinDealCheckDlg: null,
    coinDealCheckDlg_overLay: null,
    coinDealCheckDlgYesBtn: null,
    coinDealCheckDlgNoBtn: null,
    dealCancelDlg: null,
    dealCancelDlg_overLay: null,
    checkDlg: null,
    checkDlg_overLay: null,

    
    ctor: function () {
        this._super()
        var size = cc.winSize
        var paddingX = 20
        var paddingY = 20

        // game bgsound play
        cc.audioEngine.playMusic(res.gameBgSound_mp3, true)
        cc.audioEngine.setMusicVolume(0.5)

        // Bank Part
        var coinWrapSprite = cc.Sprite.create(res.coin_wrap_png)
        coinWrapSprite_height =  (size.width - 56) / 1125 * 300 * 0.5
        var betAmountBg_height = 50
        
        var bankBgSprite = cc.Sprite.create(res.banner_png)
        var bankBg_height = size.width / bankBgSprite.getContentSize().width * bankBgSprite.getContentSize().height
        bankBgSprite.attr({
            x: size.width / 2,
            y: size.height - bankBg_height / 2 - header_height,
            scaleX: size.width / bankBgSprite.getContentSize().width,
            scaleY: size.width / bankBgSprite.getContentSize().width
        })
        this.addChild(bankBgSprite)

        var bankLabelSprite = cc.Sprite.create(res.bank_title_png)
        var bankLabelSprite_width = 100
        var bankLabelSprite_height = bankLabelSprite_width / bankLabelSprite.getContentSize().width * bankLabelSprite.getContentSize().height
        bankLabelSprite.attr({
            x: size.width / 2,
            y: size.height - header_height - bankLabelSprite_height / 2,
            scaleX: bankLabelSprite_width / bankLabelSprite.getContentSize().width,
            scaleY: bankLabelSprite_width / bankLabelSprite.getContentSize().width
        })
        this.addChild(bankLabelSprite)
        var bankLabel = cc.LabelTTF.create("庄家", "Arial", 13)
        bankLabel.attr({
            x: size.width / 2,
            y: size.height + bankLabel.getContentSize().height / 2 - header_height - bankLabelSprite_height,
            fillStyle: cc.color(255, 255, 255),
        })
        this.addChild(bankLabel)
        bank_height = bankBg_height

        var historyBtn = ccui.Button.create(res.clock_png)
        var historyBtn_width = 26
        historyBtn.attr({
            x: size.width - historyBtn_width,
            y: size.height - header_height - bank_height / 4,
            scaleX: historyBtn_width / 32,
            scaleY: historyBtn_width / 32
        })
        historyBtn.addTouchEventListener(this.showHistory, this)
        this.addChild(historyBtn)


        

        // GamePanel
        var btnWrapSprite = cc.Sprite.create(res.btn_wrap_png)
        var btnWrapSprite_height = size.width / btnWrapSprite.getContentSize().width * btnWrapSprite.getContentSize().height
        
        this.panelOne_width = size.width / 2 - 1
        // this.panelOne_height = size.width / 2 + 15
        this.panelOne_height = (size.height - header_height - bank_height - coinWrapSprite_height - betAmountBg_height) / 2


        var panelOneArea = new cc.DrawNode()
        panelOneArea.drawRect(cc.p(0, size.height - header_height - bank_height - this.panelOne_height), cc.p(this.panelOne_width, size.height - header_height - bank_height), cc.color(25, 74, 148), 0)
        this.addChild(panelOneArea)
        
        var panelOneLabel = cc.LabelTTF.create("闲1", "Arial", 40)
        panelOneLabel.attr({
            x: size.width / 4,
            y: size.height - header_height - bank_height - btnWrapSprite_height,
            fillStyle: cc.color(0, 102, 203)
        })
        this.addChild(panelOneLabel)

        
        this.panelTwo_width = size.width / 2
        this.panelTwo_height = size.width / 2 + 15

        var panelTwoArea = new cc.DrawNode()
        panelTwoArea.drawRect(cc.p(size.width / 2 + 1, size.height - header_height - bank_height - this.panelOne_height), cc.p(size.width, size.height - header_height - bank_height), cc.color(25, 74, 148), 0)
        this.addChild(panelTwoArea)
        
        var panelTwoLabel = cc.LabelTTF.create("闲2", "Arial", 40)
        panelTwoLabel.attr({
            x: size.width / 4 * 3,
            y: size.height - header_height - bank_height - btnWrapSprite_height,
            fillStyle: cc.color(0, 102, 203)
        })
        this.addChild(panelTwoLabel)


        var panelThreeArea = new cc.DrawNode()
        panelThreeArea.drawRect(cc.p(0, 0), cc.p(size.width, size.height - header_height - bank_height - this.panelOne_height - 2), cc.color(25, 74, 148), 0)
        this.addChild(panelThreeArea)

        var panelThreeLabel = cc.LabelTTF.create("闲3", "Arial", 40)
        panelThreeLabel.attr({
            x: size.width / 2,
            y: size.height - header_height - bank_height - btnWrapSprite_height - this.panelOne_height,
            fillStyle: cc.color(0, 102, 203)
        })
        this.addChild(panelThreeLabel)
        
        btnWrapSprite.attr({
            x: size.width / 2,
            y: size.height - header_height - bank_height,
            scaleX: size.width / btnWrapSprite.getContentSize().width,
            scaleY: size.width / btnWrapSprite.getContentSize().width
        })
        this.addChild(btnWrapSprite)

        var goHomeBtn = new ccui.Button()
        goHomeBtn.loadTextures()
        goHomeBtn.x = size.width / 6
        goHomeBtn.y = size.height - header_height - bank_height + 5
        
        goHomeBtn.attr({
            x: size.width / 6,
            y: size.height - header_height - bank_height + 5,
            titleText: "返回桌面",
        })
        goHomeBtn.setTitleColor(cc.color(255, 255, 255))
        goHomeBtn.setTitleFontSize(13)
        goHomeBtn.addTouchEventListener(this.gotoHome, this)
        this.addChild(goHomeBtn)

        var infoText = cc.LabelTTF.create("距封盘时间 00:40", "Arial", 13)
        infoText.attr({
            x: size.width / 2,
            y: size.height - header_height - bank_height + 5,
            fillStyle: cc.color(205, 160, 58),
        })
        this.addChild(infoText)
        
        var initial_second = 40
        var countCloseSecond = setInterval(() => {
            if (initial_second == 0) {
                clearInterval(countCloseSecond)
                return
            }
            initial_second = initial_second - 1 
            if (initial_second < 10) {
                infoText.setString("距封盘时间 00:0" + initial_second)
            }else {
                infoText.setString("距封盘时间 00:" + initial_second)
            }
            
        }, 1000);

        var helpBtn = ccui.Button.create(res.help_btn_png)
        var helpBtn_height = 30
        helpBtn.attr({
            x: size.width - 40,
            y: size.height - header_height - bank_height + 5,
            scaleX: helpBtn_height / helpBtn.getContentSize().height,
            scaleY: helpBtn_height / helpBtn.getContentSize().height
        })
        helpBtn.addTouchEventListener(this.showHelp, this)
        this.addChild(helpBtn)

        this.soundOnBtn = ccui.Button.create(res.sound_on_btn_png)
        var soundOnBtn_height = 30
        this.soundOnBtn.loadTextures(res.sound_on_btn_png, res.sound_on_btn_png)
        this.soundOnBtn.attr({
            x: size.width - 80,
            y: size.height - header_height - bank_height + 5,
            scaleX: soundOnBtn_height / this.soundOnBtn.getContentSize().width,
            scaleY: soundOnBtn_height / this.soundOnBtn.getContentSize().width
        })
        this.soundOnBtn.setPressedActionEnabled(true)
        this.soundOnBtn.addTouchEventListener(this.enableSoundOnMethod, this)
        this.addChild(this.soundOnBtn)

        // footer
        var betAmountBg = cc.LayerColor.create(cc.color(0, 0, 0, 150), size.width, betAmountBg_height)
        betAmountBg.setPosition(cc.p(0, coinWrapSprite_height + betAmountBg_height / 2))
        this.addChild(betAmountBg)

        var betAmountTotalSprite = cc.Sprite.create(res.bet_amount_total_png)
        var betAmountTotalSprite_width = 20
        var betAmountTotalSprite_height = betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width * betAmountTotalSprite.getContentSize().height
        betAmountTotalSprite.attr({
            x: betAmountTotalSprite_width / 2 + paddingX / 2,
            y: betAmountTotalSprite_height / 2 + coinWrapSprite_height + 40,
            scaleX: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width,
            scaleY: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width
        })
        this.addChild(betAmountTotalSprite)

        var betAmountTotalVal = cc.LabelTTF.create("2000.0", "Arial", 15)
        betAmountTotalVal.attr({
            x: betAmountTotalVal.getContentSize().width / 2 + betAmountTotalSprite_width + paddingX / 2 + paddingX / 2,
            y: betAmountTotalSprite_height / 2 + coinWrapSprite_height + 40,
            fillStyle: cc.color(255, 255, 255)
        })
        this.addChild(betAmountTotalVal)

        var betAmountTotal_RoundRect = new RoundRect(betAmountTotalSprite_width + betAmountTotalVal.getContentSize().width + paddingX, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null)
        betAmountTotal_RoundRect.setPosition(paddingX / 4, coinWrapSprite_height + 40)
        this.addChild(betAmountTotal_RoundRect)
        
        var betAmountTokenSprite = cc.Sprite.create(res.bet_amount_token_png)
        var betAmountTokenSprite_height = 15
        var betAmountTokenSprite_width = betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height * betAmountTokenSprite.getContentSize().height
        betAmountTokenSprite.attr({
            x: betAmountTokenSprite_width / 2 + paddingX / 2 + betAmountTotalSprite_width + paddingX / 2 + betAmountTotalVal.getContentSize().width + paddingX,
            y: betAmountTotalSprite_height / 2 + coinWrapSprite_height + 40 + 2,
            scaleX: betAmountTokenSprite_width / betAmountTokenSprite.getContentSize().width,
            scaleY: betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height
        })
        this.addChild(betAmountTokenSprite)
        var betAmountTokenVal = cc.LabelTTF.create("200.0", "Arial", 15)
        betAmountTokenVal.attr({
            x: betAmountTokenVal.getContentSize().width / 2 + paddingX / 2  + betAmountTotalSprite_width + paddingX / 2 + betAmountTotalVal.getContentSize().width + paddingX + betAmountTokenSprite_width + paddingX / 2,
            y: betAmountTotalSprite_height / 2 + coinWrapSprite_height + 40,
            fillStyle: cc.color(255, 255, 255)
        })
        this.addChild(betAmountTokenVal)
        var betAmountToken_RoundRect = new RoundRect(betAmountTokenSprite_width + paddingX / 2 + betAmountTokenVal.getContentSize().width + paddingX / 2, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null)
        betAmountToken_RoundRect.setPosition(betAmountTokenSprite_width / 2 + paddingX / 2 + betAmountTotalSprite_width + paddingX / 2 + betAmountTotalVal.getContentSize().width + paddingX - paddingX / 2, coinWrapSprite_height + 40)
        this.addChild(betAmountToken_RoundRect)

        
        // cancel button
        this.cancelBtn = new ccui.Button(res.red_btn_png, res.red_btn_png, res.disabled_red_btn_png)
        var cancelBtn_width = 60
        this.cancelBtn.attr({
            x: size.width - cancelBtn_width / 2 - paddingX / 2,
            y: cancelBtn_width / this.cancelBtn.getContentSize().width * this.cancelBtn.getContentSize().height / 2 + coinWrapSprite_height + 35,
            scaleX: cancelBtn_width / this.cancelBtn.getContentSize().width,
            scaleY: cancelBtn_width / this.cancelBtn.getContentSize().width
        })
        this.cancelBtn.addTouchEventListener(this.removeDealedCoins, this)
        this.cancelBtn.setEnabled(false)
        this.addChild(this.cancelBtn)

        // confirm button
        this.confirmBtn = new ccui.Button(res.green_btn_png, res.green_btn_png, res.disabled_green_btn_png)
        var confirmBtn_width = 60
        this.confirmBtn.attr({
            x: size.width - confirmBtn_width / 2 - cancelBtn_width - paddingX / 2 - paddingX / 2,
            y: confirmBtn_width / this.confirmBtn.getContentSize().width * this.confirmBtn.getContentSize().height / 2 + coinWrapSprite_height + 35,
            scaleX: confirmBtn_width / this.confirmBtn.getContentSize().width,
            scaleY: confirmBtn_width / this.confirmBtn.getContentSize().width
        })
        this.confirmBtn.addTouchEventListener(this.showCoinDealCheckDlg, this)
        this.confirmBtn.setEnabled(false)
        this.addChild(this.confirmBtn)

        // cancel and confirm buttons are disabled when length of dealedCoins is 0
        if (this.panelOneDealedCoins.length === 0 && this.panelTwoDealedCoins.length === 0 && this.panelThreeDealedCoins.length === 0) {
            this.cancelBtn.setEnabled(false)
            this.confirmBtn.setEnabled(false)
        }


        coinWrapSprite.attr({
            x: size.width / 2,
            y: coinWrapSprite_height,
            scaleX: size.width / coinWrapSprite.getContentSize().width,
            scaleY: size.width / coinWrapSprite.getContentSize().width - 0.05
        })
        this.addChild(coinWrapSprite)
        this.coin_width = (size.width - 10 * 8) / 7
        this.coinImages = [res.coin_sprite_10_png, res.coin_sprite_50_png, res.coin_sprite_100_png, res.coin_sprite_500_png, res.coin_sprite_1000_png, res.coin_sprite_5000_png, res.coin_sprite_10000_png]
        for (let index = 0; index < this.coinImages.length; index++) {
            this.coins[index] = ccui.Button.create(this.coinImages[index])
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

                if (touch_y > size.height - header_height - bank_height - paddingY || 
                    touch_y < betAmountBg_height + coinWrapSprite_height + 30) {
                        return
                }

                if (touch_x > size.width / 2 - paddingX && 
                    touch_x < size.width / 2 + paddingX && 
                    touch_y > size.height - header_height - bank_height - this.panelOne_height) {
                    return
                }

                if (touch_y > size.height - header_height - bank_height - this.panelOne_height - paddingY && 
                    touch_y < size.height - header_height - bank_height - this.panelOne_height + paddingY) {
                    return
                }
                
                if (this.enabledCoin.findIndex(this.findTrue) !== -1) {
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
                        touch_y < size.height - header_height - bank_height - paddingY && 
                        touch_y > size.height - header_height - bank_height - this.panelOne_height + paddingY) {
                            this.panelOneDealedCoins.push(coinVal)
                    }
                    if (touch_x > size.width / 2 && touch_x < size.width &&
                        touch_y < size.height - header_height - bank_height - paddingY &&
                        touch_y > size.height - header_height - bank_height - this.panelOne_height + paddingY) {
                            this.panelTwoDealedCoins.push(coinVal)
                    }
                    if (touch_y < size.height - header_height - bank_height - this.panelOne_height - paddingY &&
                        touch_y > betAmountTotalSprite_height + coinWrapSprite_height + 60) {
                            this.panelThreeDealedCoins.push(coinVal)
                    }
                    this.addChild(coinItem, 0, this.dealedCoins_tag)
                    this.cancelBtn.setEnabled(true)
                    this.confirmBtn.setEnabled(true)
                }

            }
        })

        cc.eventManager.addListener(this.coinDropListener, panelOneArea)
        
    },

    findTrue: function (ele) {
        return ele == true
    },

    sleep: function (milliseconds) {
        return new Promise(
            resolve => setTimeout(resolve, milliseconds)
        )
    },

    showHistory: async function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var historyScene = new HistoryScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, historyScene))
                break
        }
    },

    gotoHome: async function (sender, type) { 
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var paddingX = 20
                var size = cc.winSize
                
                var cardType = ["C", "D", "H", "S"]
                var cardWidth = 50
                var cardGroup_width = cardWidth + paddingX * 1.5 * 4
                var bankResultCards = []
                for (let index = 0; index < 5; index++) {
                    var cardNum = Math.floor(Math.random() * 13 + 1)
                    var cardImageName = "res/niuniu/cards/card" + cardNum + cardType[Math.floor(Math.random() * cardType.length)] + ".png"
                    bankResultCards[index] = cc.Sprite.create(cardImageName)
                    bankResultCards[index].attr({
                        x: cardWidth / 2 + size.width / 2 - cardGroup_width / 2,
                        y: size.height - cardWidth / bankResultCards[index].getContentSize().width * bankResultCards[index].getContentSize().height / 2 - header_height - bank_height / 4,
                        scaleX: cardWidth / bankResultCards[index].getContentSize().width,
                        scaleY: cardWidth / bankResultCards[index].getContentSize().width
                    })
                    this.addChild(bankResultCards[index])
                    var moveToAction = new cc.MoveTo(0.5, cc.p(cardWidth / 2 + size.width / 2 - cardGroup_width / 2 + paddingX * 1.5 * index, size.height - cardWidth / bankResultCards[index].getContentSize().width * bankResultCards[index].getContentSize().height / 2 - header_height - bank_height / 4));
                    moveToAction.setSpeed(40)
                    moveToAction.setAmplitudeRate(10)
                    var actionSequence = new cc.Sequence(moveToAction)
                    bankResultCards[index].runAction(actionSequence)
                }

                await this.sleep(1000)

                var firstDealResultCards = []
                for (let index = 0; index < 5; index++) {
                    var cardImageName = "res/niuniu/cards/card" + Math.floor(Math.random() * 13 + 1) + cardType[Math.floor(Math.random() * cardType.length)] + ".png"
                    firstDealResultCards[index] = cc.Sprite.create(cardImageName)
                    firstDealResultCards[index].attr({
                        x: cardWidth / 2 + this.panelOne_width / 2 - cardGroup_width / 2,
                        y: size.height - cardWidth / firstDealResultCards[index].getContentSize().width * firstDealResultCards[index].getContentSize().height / 2 - header_height - bank_height - this.panelOne_height / 3,
                        scaleX: cardWidth / firstDealResultCards[index].getContentSize().width,
                        scaleY: cardWidth / firstDealResultCards[index].getContentSize().width
                    })
                    this.addChild(firstDealResultCards[index])
                    var moveToAction = new cc.MoveTo(0.5, cc.p(cardWidth / 2 + this.panelOne_width / 2 - cardGroup_width / 2 + paddingX * 1.5 * index, size.height - cardWidth / firstDealResultCards[index].getContentSize().width * firstDealResultCards[index].getContentSize().height / 2 - header_height - bank_height - this.panelOne_height / 3));
                    moveToAction.setSpeed(40)
                    moveToAction.setAmplitudeRate(10)
                    var actionSequence = new cc.Sequence(moveToAction)
                    firstDealResultCards[index].runAction(actionSequence)
                }
                
                await this.sleep(1000)
                var secondDealResultCards = []
                for (let index = 0; index < 5; index++) {
                    var cardImageName = "res/niuniu/cards/card" + Math.floor(Math.random() * 13 + 1) + cardType[Math.floor(Math.random() * cardType.length)] + ".png"
                    secondDealResultCards[index] = cc.Sprite.create(cardImageName)
                    secondDealResultCards[index].attr({
                        x: cardWidth / 2 + size.width / 2 + this.panelTwo_width / 2 - cardGroup_width / 2,
                        y: size.height - cardWidth / secondDealResultCards[index].getContentSize().width * secondDealResultCards[index].getContentSize().height / 2 - header_height - bank_height - this.panelOne_height / 3,
                        scaleX: cardWidth / secondDealResultCards[index].getContentSize().width,
                        scaleY: cardWidth / secondDealResultCards[index].getContentSize().width
                    })
                    this.addChild(secondDealResultCards[index])
                    var moveToAction = new cc.MoveTo(0.5, cc.p(cardWidth / 2 + size.width / 2 + this.panelTwo_width / 2 - cardGroup_width / 2 + paddingX * 1.5 * index, size.height - cardWidth / secondDealResultCards[index].getContentSize().width * secondDealResultCards[index].getContentSize().height / 2 - header_height - bank_height - this.panelOne_height / 3));
                    moveToAction.setSpeed(40)
                    moveToAction.setAmplitudeRate(10)
                    var actionSequence = new cc.Sequence(moveToAction)
                    secondDealResultCards[index].runAction(actionSequence)
                }

                await this.sleep(1000)
                var thirdDealResultCards = []
                for (let index = 0; index < 5; index++) {
                    var cardImageName = "res/niuniu/cards/card" + Math.floor(Math.random() * 13 + 1) + cardType[Math.floor(Math.random() * cardType.length)] + ".png"
                    thirdDealResultCards[index] = cc.Sprite.create(cardImageName)
                    thirdDealResultCards[index].attr({
                        x: cardWidth / 2 + size.width / 2 - cardGroup_width / 2,
                        y: size.height - cardWidth / thirdDealResultCards[index].getContentSize().width * thirdDealResultCards[index].getContentSize().height / 2 - header_height - bank_height - this.panelOne_height * 5 / 4,
                        scaleX: cardWidth / thirdDealResultCards[index].getContentSize().width,
                        scaleY: cardWidth / thirdDealResultCards[index].getContentSize().width
                    })
                    this.addChild(thirdDealResultCards[index])
                    var moveToAction = new cc.MoveTo(0.5, cc.p(cardWidth / 2 + size.width / 2 - cardGroup_width / 2 + paddingX * 1.5 * index, size.height - cardWidth / thirdDealResultCards[index].getContentSize().width * thirdDealResultCards[index].getContentSize().height / 2 - header_height - bank_height - this.panelOne_height * 5 / 4));
                    moveToAction.setSpeed(40)
                    moveToAction.setAmplitudeRate(10)
                    var actionSequence = new cc.Sequence(moveToAction)
                    thirdDealResultCards[index].runAction(actionSequence)
                }
                await this.sleep(2000)
                for (let index = 0; index < bankResultCards.length; index++) {
                    this.removeChild(bankResultCards[index])
                }
                for (let index = 0; index < firstDealResultCards.length; index++) {
                    this.removeChild(firstDealResultCards[index])
                }
                for (let index = 0; index < secondDealResultCards.length; index++) {
                    this.removeChild(secondDealResultCards[index])
                }
                for (let index = 0; index < thirdDealResultCards.length; index++) {
                    this.removeChild(thirdDealResultCards[index])
                }
        }
     },

    enableSoundOnMethod: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
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
                var helpScene = new HelpScene()
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

    // dropInPanelOneArea: function (sender, type) { 
    //     switch (type) {
    //         case ccui.Widget.TOUCH_ENDED:
                
    //             break
    //     }
    // },

    // dropInPanelTwoArea: function (sender, type) {
    //     switch (type) {
    //         case ccui.Widget.TOUCH_ENDED:
    //     }
    // },

    // dropInPanelThreeArea: function (sender, type) {
    //     switch (type) {
    //         case ccui.Widget.TOUCH_ENDED:
    //     }
    // },

    removeDealedCoins: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("remove dealed coins")
                for (let index = 0; index < this.panelOneDealedCoins.length + this.panelTwoDealedCoins.length + this.panelThreeDealedCoins.length; index++) {
                    this.removeChildByTag(this.dealedCoins_tag)
                }
                this.panelOneDealedCoins = []
                this.panelTwoDealedCoins = []
                this.panelThreeDealedCoins = []
                this.confirmBtn.setEnabled(false)
                this.cancelBtn.setEnabled(false)
        }
    },
    
    showCoinDealCheckDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("show coinDealCheckDlg")
                this.enabledCoinDrop = false
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
                
                var betAmountTokenSprite = cc.Sprite.create(res.bet_amount_token_png)
                var betAmountTokenSprite_height = 20
                var betAmountTokenSprite_width = betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height * betAmountTokenSprite.getContentSize().height
                var betOrderConfirmLabel = new cc.LabelTTF("确认下注单", "Arial", 16)
                betAmountTokenSprite.attr({
                    scaleX: betAmountTokenSprite_width / betAmountTokenSprite.getContentSize().width,
                    scaleY: betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height
                })
                betOrderConfirmLabel.attr({
                    fillStyle: cc.color(255, 255, 255)
                })
                betAmountTokenSprite.setPosition(cc.p(this.coinDealCheckDlg.getContentSize().width / 2 - (betAmountTokenSprite_width + paddingX / 2 + betOrderConfirmLabel.getContentSize().width) / 2,  coinDealCheckDlg_height - betAmountTokenSprite_height / 2 - paddingY + 2))
                betOrderConfirmLabel.setPosition(cc.p(this.coinDealCheckDlg.getContentSize().width / 2 - (betAmountTokenSprite_width + paddingX / 2 + betOrderConfirmLabel.getContentSize().width) / 2 + paddingX / 2 + betOrderConfirmLabel.getContentSize().width / 2 + paddingX / 2, coinDealCheckDlg_height - betAmountTokenSprite_height / 2 - paddingY + 2))
                this.coinDealCheckDlg.addChild(betAmountTokenSprite, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(betOrderConfirmLabel, this.coinDealCheckDlg_zOrder)

                var closeBtn_width = 20
                var closeBtn = new ccui.Button(res.cancel_icon_png)
                closeBtn.attr({
                    scaleX: closeBtn_width / closeBtn.getContentSize().width,
                    scaleY: closeBtn_width / closeBtn.getContentSize().width,
                    x: coinDealCheckDlg_width
                })


                var hrLine1 = new cc.LayerColor(cc.color(102, 102, 102), coinDealCheckDlg_width - paddingX, 1)
                hrLine1.setPosition(cc.p(paddingX / 2, coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 4))
                this.coinDealCheckDlg.addChild(hrLine1, this.coinDealCheckDlg_zOrder)

                var field1Label = new cc.LabelTTF("操作", "Arial", 16)
                var field2Label = new cc.LabelTTF("玩法", "Arial", 16)
                var field3Label = new cc.LabelTTF("金额", "Arial", 16)
                var field4Label = new cc.LabelTTF("冻结", "Arial", 16)
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
                    
                    for (let index = 0; index < this.panelOneDealedCoins.length; index++) {
                        panelOneSum = panelOneSum + this.panelOneDealedCoins[index]
                    }
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
                    
                    for (let index = 0; index < this.panelTwoDealedCoins.length; index++) {
                        panelTwoSum = panelTwoSum + this.panelTwoDealedCoins[index]
                    }
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
                    
                    for (let index = 0; index < this.panelThreeDealedCoins.length; index++) {
                        panelThreeSum = panelThreeSum + this.panelThreeDealedCoins[index]
                    }
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
                this.coinDealCheckDlgYesBtn.addTouchEventListener(this.showCheckDlg, this)
                this.coinDealCheckDlgNoBtn.addTouchEventListener(this.showDealCancelDlg, this)
                this.coinDealCheckDlg.addChild(this.coinDealCheckDlgYesBtn, this.coinDealCheckDlg_zOrder)
                this.coinDealCheckDlg.addChild(this.coinDealCheckDlgNoBtn, this.coinDealCheckDlg_zOrder)
        }
    },

    showCheckDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("showCheckDlg")
                this.enabledCoinDrop = false

                var paddingX = 20
                var paddingY = 20
                var checkDlg_zOrder = this.coinDealCheckDlg_zOrder + 1
                this.checkDlg_overLay = new cc.DrawNode()
                this.checkDlg_overLay.drawRect(cc.p(0, 0), cc.p(cc.winSize.width, cc.winSize.height), cc.color(0, 0, 0, 100), 0)
                this.addChild(this.checkDlg_overLay, checkDlg_zOrder)
                var checkDlg_height = 120
                this.checkDlg = new RoundRect(cc.winSize.width - paddingX * 3, checkDlg_height, cc.color(255, 255, 255), 0, null, 10, null)
                this.checkDlg.setPosition(cc.p(paddingX * 3 / 2, cc.winSize.height / 2 - checkDlg_height / 2))
                this.addChild(this.checkDlg, checkDlg_zOrder)

                var checkDlgLabel = new cc.LabelTTF("余额不足", "Arial", 15)
                checkDlgLabel.attr({
                    fillStyle: cc.color(0, 0, 0),
                    x: this.checkDlg.getContentSize().width / 2 ,
                    y: checkDlg_height / 2 - checkDlgLabel.getContentSize().height / 2 + paddingY
                })
                this.checkDlg.addChild(checkDlgLabel)
                var dlgYesBtn = new ccui.Button(res.dlg_yes_btn_png)
                var dlgYesBtn_width = 70
                dlgYesBtn.attr({
                    scaleX: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    scaleY: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    x: this.checkDlg.getContentSize().width / 2,
                    y: paddingY / 2 + dlgYesBtn_width / dlgYesBtn.getContentSize().width * dlgYesBtn.getContentSize().height / 2
                })
                dlgYesBtn.addTouchEventListener(this.closeCheckDlg, this)
                this.checkDlg.addChild(dlgYesBtn)

                this.coinDealCheckDlgYesBtn.setEnabled(false)
                this.coinDealCheckDlgYesBtn.setTouchEnabled(false)
                this.coinDealCheckDlgNoBtn.setEnabled(false)
                this.coinDealCheckDlgNoBtn.setEnabled(false)

        }
    },
    closeCheckDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("closecheck dlg")
                this.removeChild(this.checkDlg)
                this.removeChild(this.checkDlg_overLay)
                this.removeChild(this.coinDealCheckDlg)
                this.removeChild(this.coinDealCheckDlg_overLay)
                this.enabledCoinDrop = true
        }
    },
    showDealCancelDlg: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.enabledCoinDrop = false
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
                var dlgYesBtn = new ccui.Button(res.dlg_yes_btn_png)
                var dlgYesBtn_width = 70
                dlgYesBtn.attr({
                    scaleX: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
                    scaleY: dlgYesBtn_width / dlgYesBtn.getContentSize().width
                })
                var dlgNoBtn = new ccui.Button(res.dlg_no_btn_png)
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
                this.removeChild(this.dealCancelDlg)
                this.removeChild(this.dealCancelDlg_overLay)

                this.coinDealCheckDlgYesBtn.setEnabled(true)
                this.coinDealCheckDlgYesBtn.setTouchEnabled(true)
                this.coinDealCheckDlgNoBtn.setEnabled(true)
                this.coinDealCheckDlgNoBtn.setTouchEnabled(true)
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
        
    }

})



var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var bgLayer = new BgLayer()
        this.addChild(bgLayer)
        var headerLayer = new HeaderLayer()
        this.addChild(headerLayer)
        var gamePanelLayer = new GamePanelLayer()
        this.addChild(gamePanelLayer)
        
        
        // var dealCancelDlg = new DealCancelDlg()
        // this.addChild(dealCancelDlg)
    }
})


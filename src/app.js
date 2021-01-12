
var INITIALIZED = false
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
        var headerBg = cc.LayerColor.create(cc.color(30, 101, 165), size.width, header_height)
        headerBg.attr({
            x: 0,
            y: size.height - header_height
        })
        this.addChild(headerBg);

        var serial_num = []
        var serial_num_height = 25
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

var BankLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.winSize
        coinWrapSprite_height =  (size.width - 56) / 1125 * 300 * 0.5
        var bankBgSprite = cc.Sprite.create(res.banner_png)
        var bankBg_width = size.width
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
        var bankLabel = cc.LabelTTF.create("庄家")
        bankLabel.attr({
            x: size.width / 2,
            y: size.height - header_height - bankLabelSprite_height / 2 - 2,
            fillStyle: cc.color(255, 255, 255),
            fontSize: 15
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
    },

    showHistory: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var historyScene = new HistoryScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, historyScene))
                break
        }
    }
})

var GamePanelLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.winSize;
        var btnWrapSprite = cc.Sprite.create(res.btn_wrap_png)
        var btnWrapSprite_height = size.width / btnWrapSprite.getContentSize().width * btnWrapSprite.getContentSize().height
        var panelOne = cc.LayerColor.create(cc.color(25, 74, 148), size.width / 2 - 1, size.width / 2 + 10)
        panelOne.attr({
            x:  0,
            y: size.height - header_height - bank_height - size.width / 2 - 10 - 5
        })
        this.addChild(panelOne)
        var panelOneLabel = cc.LabelTTF.create("闲1")
        panelOneLabel.attr({
            x: size.width / 4,
            y: size.height - header_height - bank_height - btnWrapSprite_height,
            fontSize: 35,
            fillStyle: cc.color(0, 102, 203)
        })
        this.addChild(panelOneLabel)

        var panelTwo = cc.LayerColor.create(cc.color(25, 74, 148), size.width / 2, size.width / 2 + 10)
        panelTwo.attr({
            x: size.width / 2,
            y: size.height - header_height - bank_height - size.width / 2 - 10 - 5 
        })
        this.addChild(panelTwo)
        
        var panelTwoLabel = cc.LabelTTF.create("闲2")
        panelTwoLabel.attr({
            x: size.width / 4 * 3,
            y: size.height - header_height - bank_height - btnWrapSprite_height,
            fontSize: 35,
            fillStyle: cc.color(0, 102, 203)
        })
        this.addChild(panelTwoLabel)

        var panelThree = cc.LayerColor.create(cc.color(25, 74, 148), size.width, size.height - header_height - bank_height - btnWrapSprite_height - size.width / 2 - 10 - 5)
        panelThree.attr({
            x: 0,
            y: coinWrapSprite_height
        })
        this.addChild(panelThree)
        var panelThreeLabel = cc.LabelTTF.create("闲3")
        panelThreeLabel.attr({
            x: size.width / 2,
            y: size.height - header_height - bank_height - btnWrapSprite_height - size.width / 2 - 10,
            fontSize: 35,
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
        this.addChild(goHomeBtn)

        var infoText = cc.LabelTTF.create("距封盘时间 00:09")
        infoText.attr({
            x: size.width / 2,
            y: size.height - header_height - bank_height + 5,
            fillStyle: cc.color(205, 160, 58),
            fontSize: 15
        })
        this.addChild(infoText)

        var helpBtnSprite = cc.Sprite.create(res.help_btn_png)
        var helpBtnSprite_height = 35
        helpBtnSprite.attr({
            x: size.width - 40,
            y: size.height - header_height - bank_height + 5,
            scaleX: helpBtnSprite_height / helpBtnSprite.getContentSize().height,
            scaleY: helpBtnSprite_height / helpBtnSprite.getContentSize().height
        })
        var helpBtn = ccui.Button.create(res.help_png)
        var helpBtn_height = 30
        helpBtn.attr({
            x: size.width - 40,
            y: size.height - header_height - bank_height + 8,
            scaleX: helpBtn_height / helpBtnSprite.getContentSize().height,
            scaleY: helpBtn_height / helpBtnSprite.getContentSize().height
        })
        helpBtn.addTouchEventListener(this.showHelp, this)
        this.addChild(helpBtnSprite)
        this.addChild(helpBtn)

        var soundBtnSprite = cc.Sprite.create(res.help_btn_png)
        var soundBtnSprite_height = 35
        soundBtnSprite.attr({
            x: size.width - 80,
            y: size.height - header_height - bank_height + 5,
            scaleX: soundBtnSprite_height / soundBtnSprite.getContentSize().width,
            scaleY: soundBtnSprite_height / soundBtnSprite.getContentSize().width
        })
        var soundOnBtn = ccui.Button.create(res.sound_on_png)
        var soundOnBtn_height = 30
        soundOnBtn.attr({
            x: size.width - 80,
            y: size.height - header_height - bank_height + 8,
            scaleX: soundOnBtn_height / soundOnBtn.getContentSize().width,
            scaleY: soundOnBtn_height / soundOnBtn.getContentSize().width
        })
        soundOnBtn.addTouchEventListener(this.enableSoundOn, this)
        this.addChild(soundBtnSprite)
        this.addChild(soundOnBtn)

        
    },

    enableSoundOn: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break
            case ccui.Widget.TOUCH_MOVED:
                break
            case ccui.Widget.TOUCH_ENDED:
                break
            case ccui.Widget.TOUCH_CANCELED:
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
    }
})

var FooterLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.winSize
        var coinWrapSprite = cc.Sprite.create(res.coin_wrap_png)
        
        coinWrapSprite.attr({
            x: size.width / 2,
            y: coinWrapSprite_height,
            scaleX: size.width / coinWrapSprite.getContentSize().width,
            scaleY: size.width / coinWrapSprite.getContentSize().width - 0.05
        })
        this.addChild(coinWrapSprite)
        var coin_width = (size.width - 10 * 8) / 7
        var coinCustomBtn = ccui.Button.create(res.coin_sprite_custom_png)
        coinCustomBtn.attr({
            x: coin_width / 2 + 10,
            y: coin_width / 2 + 10,
            scaleX: coin_width / coinCustomBtn.getNormalTextureSize().width,
            scaleY: coin_width / coinCustomBtn.getNormalTextureSize().width
        })
        this.addChild(coinCustomBtn)
        var coin50Btn = ccui.Button.create(res.coin_sprite_50_png)
        coin50Btn.attr({
            x: coin_width / 2 + 10 * 2 + coin_width,
            y: coin_width / 2 + 10,
            scaleX: coin_width / coin50Btn.getNormalTextureSize().width,
            scaleY: coin_width / coin50Btn.getNormalTextureSize().width
        })
        this.addChild(coin50Btn)
        var coin100Btn = ccui.Button.create(res.coin_sprite_100_png)
        coin100Btn.attr({
            x: coin_width / 2 + 10 * 3 + coin_width * 2,
            y: coin_width / 2 + 10,
            scaleX: coin_width / coin100Btn.getNormalTextureSize().width,
            scaleY: coin_width / coin100Btn.getNormalTextureSize().width
        })
        this.addChild(coin100Btn)
        var coin500Btn = ccui.Button.create(res.coin_sprite_500_png)
        coin500Btn.attr({
            x: coin_width / 2 + 10 * 4 + coin_width * 3,
            y: coin_width / 2 + 10,
            scaleX: coin_width / coin500Btn.getNormalTextureSize().width,
            scaleY: coin_width / coin500Btn.getNormalTextureSize().width
        })
        this.addChild(coin500Btn)
        var coin1000Btn = ccui.Button.create(res.coin_sprite_1000_png)
        coin1000Btn.attr({
            x: coin_width / 2 + 10 * 5 + coin_width * 4,
            y: coin_width / 2 + 10,
            scaleX: coin_width / coin1000Btn.getNormalTextureSize().width,
            scaleY: coin_width / coin1000Btn.getNormalTextureSize().width
        })
        this.addChild(coin1000Btn)
        var coin5000Btn = ccui.Button.create(res.coin_sprite_5000_png)
        coin5000Btn.attr({
            x: coin_width / 2 + 10 * 6 + coin_width * 5,
            y: coin_width / 2 + 10,
            scaleX: coin_width / coin5000Btn.getNormalTextureSize().width,
            scaleY: coin_width / coin5000Btn.getNormalTextureSize().width
        })
        this.addChild(coin5000Btn)
        var coin10000Btn = ccui.Button.create(res.coin_sprite_10000_png)
        coin10000Btn.attr({
            x: coin_width / 2 + 10 * 7 + coin_width * 6,
            y: coin_width / 2 + 10,
            scaleX: coin_width / coin10000Btn.getNormalTextureSize().width,
            scaleY: coin_width / coin10000Btn.getNormalTextureSize().width
        })
        this.addChild(coin10000Btn)
    }
})

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var bgLayer = new BgLayer()
        this.addChild(bgLayer)
        var headerLayer = new HeaderLayer()
        this.addChild(headerLayer)
        var bankLayer = new BankLayer()
        this.addChild(bankLayer)
        var gamePanelLayer = new GamePanelLayer()
        this.addChild(gamePanelLayer)
        var footerLayer = new FooterLayer()
        this.addChild(footerLayer)
    }
})


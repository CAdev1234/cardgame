var HistoryLayer = cc.Layer.extend({
    bgLayer: null,
    dateInput: null,
    addressLabel: null,
    numPeriodLabel: null,
    gameTimeLabel: null,
    resultLabel: null,
    hrLine: null,
    history1Content: null,

    dateInput2: null,
    numPeriodLabel2: null,
    gamePointLabel: null,
    resultLabel2: null,
    hrLine2: null,
    history2Content: null,




    ctor: function () {
        this._super()
        var size = cc.winSize
        var paddingY = 20
        var paddingX = 20

        // background layer
        this.bgLayer = cc.LayerColor.create(cc.color(0, 0, 0), size.width, size.height)
        this.addChild(this.bgLayer)

        // header
        var header_height = 40
        var headerBg = cc.LayerColor.create(cc.color(247, 184, 68), size.width, header_height)
        headerBg.attr({
            x: 0,
            y: size.height - header_height
        })
        this.addChild(headerBg)
        var goGameBtn = new ccui.Button()
        goGameBtn.attr({
            x: 20,
            y: size.height - header_height / 2 - 5,
            titleText: "<",
            titleFontSize: 25
        })
        goGameBtn.setTitleColor(cc.color(0, 0, 0))
        goGameBtn.setTitleFontName("fangsong")
        goGameBtn.addTouchEventListener(this.gotoGame, this)
        this.addChild(goGameBtn)
        var headerTitle = cc.LabelTTF.create("历史记录", "Arial")
        headerTitle.attr({
            x: size.width / 2,
            y: size.height - header_height / 2 - 5,
            fillStyle: cc.color(0, 0, 0),
            fontSize: 20,
        })
        this.addChild(headerTitle)

        // Button Layer
        var history1_btn = ccui.Button.create(res.history_active_btn)
        var history1_btn_width = 100
        history1_btn.loadTextureNormal(res.history_active_btn)
        history1_btn.setTitleColor(cc.color(255, 255, 255)) 
        history1_btn.setTitleText("开奖历史")
        history1_btn.setTitleFontSize(17)
        var history1_btn_height = history1_btn.getNormalTextureSize().height
        history1_btn.setPosition(cc.p(size.width / 4, size.height - history1_btn_height / 2 - header_height - paddingY * 2))
        history1_btn.addTouchEventListener(this.showFirstHistory, this)
        this.addChild(history1_btn)

        
        var history2_btn = ccui.Button.create(res.history_active_btn)
        history2_btn.loadTextureNormal(res.history_nonactive_btn)
        history2_btn.setTitleColor(cc.color(255, 255, 255)) 
        history2_btn.setTitleText("投注历史")
        history2_btn.setTitleFontSize(17)
        var history2_btn_height = history2_btn.getNormalTextureSize().height
        history2_btn.setPosition(cc.p(size.width / 4 * 3, size.height - history2_btn_height / 2 - header_height - paddingY * 2))
        history2_btn.addTouchEventListener(this.showSecondHistory, this)
        this.addChild(history2_btn)


        // first history content
        this.dateInput = ccui.TextField.create()
        this.dateInput.setPlaceHolder("2021-1-1")
        this.dateInput.setPlaceHolderColor(cc.color(255, 255, 255))
        this.dateInput.setFontSize(15)
        var dateInput_height = this.dateInput.getVirtualRendererSize().height
        this.dateInput.setPosition(cc.p(paddingX * 2, size.height - dateInput_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY))
        this.addChild(this.dateInput, 1, 1)

        this.addressLabel = cc.LabelTTF.create("官方开奖地址")
        this.addressLabel.attr({
            x: size.width - 100,
            y: size.height - dateInput_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY,
            fillStyle: cc.color(255, 255, 255)
        })
        this.addChild(this.addressLabel, 1, 1)

        this.numPeriodLabel = cc.LabelTTF.create("期数", "Arial", 14)
        this.numPeriodLabel.attr({
            fillStyle: cc.color(158, 158, 158)
        })
        var numPeriodLabel_height = this.numPeriodLabel.getContentSize().height
        this.numPeriodLabel.setPosition(cc.p(paddingX / 2 + this.numPeriodLabel.getContentSize().width / 2, size.height - numPeriodLabel_height / 2- header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY))
        this.addChild(this.numPeriodLabel, 1, 1)

        this.gameTimeLabel = cc.LabelTTF.create("时间", "Arial", 14)
        this.gameTimeLabel.attr({
            fillStyle: cc.color(158, 158, 158)
        })
        var gameTimeLabel_height = this.gameTimeLabel.getContentSize().height
        this.gameTimeLabel.setPosition(cc.p(size.width / 5 * 2, size.height - gameTimeLabel_height / 2- header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY))
        this.addChild(this.gameTimeLabel, 1, 1)

        this.resultLabel = cc.LabelTTF.create("结果", "Arial", 14)
        this.resultLabel.attr({
            fillStyle: cc.color(158, 158, 158)
        })
        var resultLabel_height = this.resultLabel.getContentSize().height
        this.resultLabel.setPosition(cc.p(size.width - paddingX / 2 - this.resultLabel.getContentSize().width / 2, size.height - resultLabel_height / 2- header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY))
        this.addChild(this.resultLabel, 1, 1)

        this.hrLine = cc.LayerColor.create(cc.color(158, 158, 158), size.width - paddingX, 1)
        this.hrLine.attr({
            x: paddingX / 2,
            y: size.height - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY - numPeriodLabel_height - paddingY / 2
        })
        this.addChild(this.hrLine, 1, 1)

        this.history1Content = ccui.ScrollView.create()
        var history1Content_height = size.height - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY - numPeriodLabel_height - paddingY / 2 - paddingY / 2 - paddingY / 2
        this.history1Content.setDirection(ccui.ScrollView.DIR_VERTICAL)
        this.history1Content.setTouchEnabled(true)
        this.history1Content.setBounceEnabled(true)
        // this.history1Content.setBackGroundImage(res.blackjack_jpg)
        this.history1Content.setContentSize(cc.size(size.width - paddingX, history1Content_height))
        this.history1Content.setPosition(cc.p(paddingX / 2, paddingY / 2))
        this.addChild(this.history1Content, 1, 1)

        var history1Content_fontSize = 13
        var blueCircleSprite1 = cc.Sprite.create(res.history_blue_circle)
        var blueCircleSprite_height = 30
        blueCircleSprite1.attr({
            scaleX: blueCircleSprite_height / blueCircleSprite1.getContentSize().width,
            scaleY: blueCircleSprite_height / blueCircleSprite1.getContentSize().width,
            x: size.width - paddingX / 2 - 30 * 3,
            y: history1Content_height - blueCircleSprite_height / 2
        })
        this.history1Content.addChild(blueCircleSprite1)
        var blueCircleSprite2 = cc.Sprite.create(res.history_blue_circle)
        var blueCircleSprite_height = 30
        blueCircleSprite2.attr({
            scaleX: blueCircleSprite_height / blueCircleSprite2.getContentSize().width,
            scaleY: blueCircleSprite_height / blueCircleSprite2.getContentSize().width,
            x: size.width - paddingX / 2 - 30 * 2,
            y: history1Content_height - blueCircleSprite_height / 2
        })
        this.history1Content.addChild(blueCircleSprite2)
        var blueCircleSprite3 = cc.Sprite.create(res.history_blue_circle)
        var blueCircleSprite_height = 30
        blueCircleSprite3.attr({
            scaleX: blueCircleSprite_height / blueCircleSprite3.getContentSize().width,
            scaleY: blueCircleSprite_height / blueCircleSprite3.getContentSize().width,
            x: size.width - paddingX / 2 - 30 * 1,
            y: history1Content_height - blueCircleSprite_height / 2
        })
        this.history1Content.addChild(blueCircleSprite3)
        var numPeriodVal = cc.LabelTTF.create("31084949", "Arial", history1Content_fontSize)
        numPeriodVal.attr({
            fillStyle: cc.color(255, 255, 255),
            x: numPeriodVal.getContentSize().width / 2,
            y: history1Content_height - blueCircleSprite_height / 2
        })
        this.history1Content.addChild(numPeriodVal)
        var gameTimeVal = cc.LabelTTF.create("09:25", "Arial", history1Content_fontSize)
        gameTimeVal.attr({
            fillStyle: cc.color(255, 255, 255),
            x: (size.width - paddingX) / 5 * 2,
            y: history1Content_height - blueCircleSprite_height / 2
        })
        this.history1Content.addChild(gameTimeVal)

        var serialResultTitle = cc.LabelTTF.create("官方开奖结果", "Arial", history1Content_fontSize + 1)
        serialResultTitle_height = serialResultTitle.getContentSize().height
        serialResultTitle.setPosition(cc.p(serialResultTitle.getContentSize().width / 2, history1Content_height - blueCircleSprite_height - paddingY))
        this.history1Content.addChild(serialResultTitle)

        var serial_num = []
        var serial_num_height = 20
        for (let index = 0; index < 10; index++) {
            serial_num[index] = new cc.Sprite("res/niuniu/serial" + (index + 1) + ".png");
            serial_num[index].attr({
                x: size.width - paddingX / 2 - (size.width - paddingX) / 3 * 2 * 0.1 * (index + 1),
                y: history1Content_height - blueCircleSprite_height - paddingY,
                scaleX: serial_num_height / serial_num[index].getContentSize().height, 
                scaleY: serial_num_height / serial_num[index].getContentSize().height,
            })
            this.history1Content.addChild(serial_num[index], 0)
        }
        for (let index = 0; index < 10; index++) {
            serial_num[index] = new cc.Sprite("res/niuniu/serial" + (index + 1) + ".png");
            serial_num[index].attr({
                x: size.width - paddingX / 2 - (size.width - paddingX) / 3 * 2 * 0.1 * (index + 1),
                y: history1Content_height - blueCircleSprite_height - paddingY - serial_num_height - paddingY / 2,
                scaleX: serial_num_height / serial_num[index].getContentSize().height, 
                scaleY: serial_num_height / serial_num[index].getContentSize().height,
            })
            this.history1Content.addChild(serial_num[index], 0)
        }


        // second history content
        this.dateInput2 = ccui.TextField.create()
        this.dateInput2.setPlaceHolder("2021-1-1")
        this.dateInput2.setPlaceHolderColor(cc.color(255, 255, 255))
        this.dateInput2.setFontSize(15)
        var dateInput2_height = this.dateInput2.getVirtualRendererSize().height
        this.dateInput2.setPosition(cc.p(paddingX * 2, size.height - dateInput2_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY))
        this.addChild(this.dateInput2, 2, 2)

        this.numPeriodLabel2 = cc.LabelTTF.create("期数/下注单", "Arial", 14)
        this.numPeriodLabel2.attr({
            fillStyle: cc.color(158, 158, 158)
        })
        var numPeriodLabel2_height = this.numPeriodLabel.getContentSize().height
        this.numPeriodLabel2.setPosition(cc.p(paddingX / 2 + this.numPeriodLabel2.getContentSize().width / 2, size.height - numPeriodLabel2_height / 2- header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY))
        this.addChild(this.numPeriodLabel2, 2, 2)


        this.gamePointLabel = cc.LabelTTF.create("下注金额", "Arial", 14)
        this.gamePointLabel.attr({
            fillStyle: cc.color(158, 158, 158)
        })
        var gamePointLabel_height = this.gamePointLabel.getContentSize().height
        this.gamePointLabel.setPosition(cc.p(size.width - paddingX / 2 - 100, size.height - gamePointLabel_height / 2- header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY))
        this.addChild(this.gamePointLabel, 2, 2)

        this.resultLabel2 = cc.LabelTTF.create("结果", "Arial", 14)
        this.resultLabel2.attr({
            fillStyle: cc.color(158, 158, 158)
        })
        var resultLabel2_height = this.resultLabel2.getContentSize().height
        this.resultLabel2.setPosition(cc.p(size.width - paddingX / 2 - this.resultLabel2.getContentSize().width / 2, size.height - resultLabel2_height / 2- header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY))
        this.addChild(this.resultLabel2, 2, 2)

        this.hrLine2 = cc.LayerColor.create(cc.color(158, 158, 158), size.width - paddingX, 1)
        this.hrLine2.attr({
            x: paddingX / 2,
            y: size.height - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY - numPeriodLabel2_height - paddingY / 2
        })
        this.addChild(this.hrLine2, 2, 2)

        this.history2Content = ccui.ScrollView.create()
        var history2Content_height = size.height - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY - numPeriodLabel2_height - paddingY / 2 - paddingY / 2 - paddingY / 2
        this.history2Content.setDirection(ccui.ScrollView.DIR_VERTICAL)
        this.history2Content.setTouchEnabled(true)
        this.history2Content.setBounceEnabled(true)
        // this.history2Content.setBackGroundImage(res.blackjack_jpg)
        this.history2Content.setContentSize(cc.size(size.width - paddingX, history2Content_height))
        this.history2Content.setPosition(cc.p(paddingX / 2, paddingY / 2))
        this.addChild(this.history2Content, 2, 2)

        var history2Content_fontSize = 13
        var numPeriodVal2_1 = cc.LabelTTF.create("31084949", "Arial", history2Content_fontSize)
        numPeriodVal2_1.attr({
            fillStyle: cc.color(255, 255, 255),
            x: numPeriodVal2_1.getContentSize().width / 2,
            y: history2Content_height - numPeriodVal2_1.getContentSize().height / 2
        })
        this.history2Content.addChild(numPeriodVal2_1)

        var gamePointVal_1 = cc.LabelTTF.create("50", "Arial", history2Content_fontSize)
        gamePointVal_1.attr({
            fillStyle: cc.color(255, 255,255),
            x: size.width - paddingX / 2 - 100,
            y: history2Content_height - numPeriodVal2_1.getContentSize().height / 2
        })
        this.history2Content.addChild(gamePointVal_1)

        var resultVal2_1 = cc.LabelTTF.create("-50", "Arial", history2Content_fontSize)
        resultVal2_1.attr({
            fillStyle: cc.color(229, 57, 65),
            x: size.width - paddingY / 2 - resultVal2_1.getContentSize().width,
            y: history2Content_height - numPeriodVal2_1.getContentSize().height / 2
        })
        this.history2Content.addChild(resultVal2_1)

        var numPeriodVal2_2 = cc.LabelTTF.create("190533556802505", "Arial", history2Content_fontSize)
        numPeriodVal2_2.attr({
            fillStyle: cc.color(158, 158, 158),
            x: numPeriodVal2_2.getContentSize().width / 2,
            y: history2Content_height - numPeriodVal2_2.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 
        })
        this.history2Content.addChild(numPeriodVal2_2)

        var numPeriodVal2_2_2 = cc.LabelTTF.create("牛二(翻倍)", "Arial", history2Content_fontSize)
        numPeriodVal2_2_2.attr({
            fillStyle: cc.color(79, 138, 243),
            x: numPeriodVal2_2_2.getContentSize().width / 2 + numPeriodVal2_2.getContentSize().width + paddingX / 2,
            y: history2Content_height - numPeriodVal2_2_2.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 
        })
        this.history2Content.addChild(numPeriodVal2_2_2)

        var gamePointVal_2 = cc.LabelTTF.create("50", "Arial", history2Content_fontSize)
        gamePointVal_2.attr({
            fillStyle: cc.color(255, 255,255),
            x: size.width - paddingX / 2 - 100,
            y: history2Content_height - numPeriodVal2_2_2.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2
        })
        this.history2Content.addChild(gamePointVal_2)

        var resultVal2_2 = cc.LabelTTF.create("-50", "Arial", history2Content_fontSize)
        resultVal2_2.attr({
            fillStyle: cc.color(255, 0, 0),
            x: size.width - paddingY / 2 - resultVal2_2.getContentSize().width,
            y: history2Content_height - numPeriodVal2_2_2.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2
        })
        this.history2Content.addChild(resultVal2_2)

        var numPeriodVal2_3 = cc.LabelTTF.create("09:31:07", "Arial", history2Content_fontSize)
        numPeriodVal2_3.attr({
            fillStyle: cc.color(158, 158, 158),
            x: numPeriodVal2_3.getContentSize().width / 2,
            y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2 
        })
        this.history2Content.addChild(numPeriodVal2_3)

        var numPeriodVal2_3_2 = cc.LabelTTF.create("闲三", "Arial", history2Content_fontSize)
        numPeriodVal2_3_2.attr({
            fillStyle: cc.color(79, 138, 243),
            x: numPeriodVal2_3_2.getContentSize().width / 2 + numPeriodVal2_2.getContentSize().width + paddingX / 2,
            y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2 
        })
        this.history2Content.addChild(numPeriodVal2_3_2)

        var numPeriodVal2_3_3 = cc.LabelTTF.create("@", "Arial", history2Content_fontSize)
        numPeriodVal2_3_3.attr({
            fillStyle: cc.color(158, 158, 158),
            x: numPeriodVal2_3_3.getContentSize().width / 2 + numPeriodVal2_2.getContentSize().width + paddingX / 2 + numPeriodVal2_3_2.getContentSize().width,
            y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2 
        })
        this.history2Content.addChild(numPeriodVal2_3_3)

        var numPeriodVal2_3_4 = cc.LabelTTF.create("1.98", "Arial", history2Content_fontSize)
        numPeriodVal2_3_4.attr({
            fillStyle: cc.color(255, 0, 0),
            x: numPeriodVal2_3_4.getContentSize().width / 2 + numPeriodVal2_2.getContentSize().width + paddingX / 2 + numPeriodVal2_3_2.getContentSize().width + numPeriodVal2_3_3.getContentSize().width,
            y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2 
        })
        this.history2Content.addChild(numPeriodVal2_3_4)

        var gamePointVal_3 = cc.LabelTTF.create("(冻结:200)", "Arial", history2Content_fontSize)
        gamePointVal_3.attr({
            fillStyle: cc.color(158, 158, 158),
            x: size.width - paddingX / 2 - 120,
            y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2
        })
        this.history2Content.addChild(gamePointVal_3)

        var resultVal2_3 = cc.LabelTTF.create("(返还:200)", "Arial", history2Content_fontSize)
        resultVal2_3.attr({
            fillStyle: cc.color(158, 158, 158),
            x: size.width - resultVal2_3.getContentSize().width / 2 - paddingX,
            y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2
        })
        this.history2Content.addChild(resultVal2_3)

        var hrLineInContent = cc.LayerColor.create(cc.color(158, 158, 158), size.width - paddingX, 1)
        hrLineInContent.attr({
            x: 0,
            y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2 - paddingY / 2
        })
        this.history2Content.addChild(hrLineInContent)

        for (let index = 0; index < 5; index++) {
            this.removeChildByTag(2)
        }
        this.removeChild(this.history2Content)
    },

    gotoGame: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var gameScene = new GameScene()
                cc.director.popScene()
                cc.director.pushScene(new cc.TransitionFade(1.0, gameScene))
                break
        }
    },

    showFirstHistory: function (sender, type) { 
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (this.getChildByTag(1)) {
                    return
                }
                for (let index = 0; index < 5; index++) {
                    this.removeChildByTag(2)
                }
                this.removeChild(this.history2Content)
                this.addChild(this.dateInput)
                this.addChild(this.addressLabel)
                this.addChild(this.numPeriodLabel)
                this.addChild(this.gameTimeLabel)
                this.addChild(this.resultLabel)
                this.addChild(this.hrLine)
                this.addChild(this.history1Content)
                break
        }
    },

    showSecondHistory: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (this.getChildByTag(2)) {return}
                for (let index = 0; index < 7; index++) {
                    this.removeChildByTag(1)
                }
                this.addChild(this.dateInput2)
                this.addChild(this.numPeriodLabel2)
                this.addChild(this.gamePointLabel)
                this.addChild(this.resultLabel2)
                this.addChild(this.hrLine2)
                this.addChild(this.history2Content)
                break
        }
    },

    performScaleAction : function(time, scaleX, scaleY) 
    {
        var duration = time;   // duration in seconds for performing this action
        var scaleAction = new cc.ScaleTo(duration , scaleX , scaleY );
        this.runAction(scaleAction);
    }
})


var HistoryScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var historyLayer = new HistoryLayer()
        this.addChild(historyLayer)
    }
})
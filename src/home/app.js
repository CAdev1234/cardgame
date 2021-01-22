var HomeLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.winSize
        var paddingX = size.width / 18.75
        var paddingY = size.width / 18.75
        // background
        var bgSprite = new cc.Sprite(home_res.bg_png)
        var bgSprite_width = size.width
        bgSprite.attr({
            scaleX: bgSprite_width / bgSprite.getContentSize().width,
            scaleY: size.height / bgSprite.getContentSize().height,
            x: bgSprite_width / 2,
            y: size.height / 2
        })
        this.addChild(bgSprite)

        // header
        var logoSprite = new cc.Sprite(home_res.logo_png)
        var logoSprite_width = 160
        var logoSprite_height = logoSprite_width / logoSprite.getContentSize().width * logoSprite.getContentSize().height
        logoSprite.attr({
            scaleX: logoSprite_width / logoSprite.getContentSize().width,
            scaleY: logoSprite_width / logoSprite.getContentSize().width,
            x: logoSprite_width / 2,
            y: size.height - logoSprite_height / 2
        })
        this.addChild(logoSprite, 9)

        var tryoutBtn = new ccui.Button(home_res.tryout_png)
        var tryoutBtn_width = 80
        tryoutBtn.attr({
            scaleX: tryoutBtn_width / tryoutBtn.getContentSize().width,
            scaleY: tryoutBtn_width / tryoutBtn.getContentSize().width,
            x: size.width - tryoutBtn_width / 2 - paddingX / 2,
            y: size.height - logoSprite_height / 2
        })
        this.addChild(tryoutBtn)

        // footer
        var footerSprite = new cc.Sprite(home_res.bottom_png)
        var footerSprite_width = size.width
        var footerSprite_height = footerSprite_width / footerSprite.getContentSize().width * footerSprite.getContentSize().height
        footerSprite.attr({
            scaleX: footerSprite_width / footerSprite.getContentSize().width,
            scaleY: footerSprite_width / footerSprite.getContentSize().width,
            x: size.width / 2,
            y: footerSprite_height / 2
        })
        this.addChild(footerSprite, 9)

        var gameItem_imgrate = 268 / 317
        var gameItem_width = (size.width - paddingX * 3) / 2
        var gameItem_height = gameItem_width * gameItem_imgrate 

        // slogan defined
        var sloganSprite = new cc.Sprite(home_res.slogan_png)
        var sloganSprite_width = size.width / 7 * 4
        var sloganSprite_height = sloganSprite_width / sloganSprite.getContentSize().width * sloganSprite.getContentSize().height

        // guangbo defined
        var guangboSprite = new cc.Sprite(home_res.guangbo_png)
        var guangboSprite_width = size.width - paddingX * 2
        var guangboSprite_height = guangboSprite_width / guangboSprite.getContentSize().width * guangboSprite.getContentSize().height

        // niuniu button defined
        var niuniuBtn = new ccui.Button(home_res.niuniu_png, home_res.niuniu_png, home_res.niuniu_png)
        var niuniuBtn_width = size.width / 4 * 3
        var niuniuBtn_height = niuniuBtn_width / niuniuBtn.getContentSize().width * niuniuBtn.getContentSize().height


        // scrollview
        var itemScroll = new ccui.ScrollView()
        var itemScroll_height = size.height
        var itemScroll_width = size.width
        var itemScroll_innerHeight = logoSprite_height + paddingY + sloganSprite_height + paddingY + niuniuBtn_height + paddingY + gameItem_height * 3 + paddingY / 2 * 2 + footerSprite_height + paddingY * 3
        itemScroll.attr({
            innerHeight: itemScroll_innerHeight,
            innerWidth: itemScroll_width
        })
        itemScroll.setDirection(ccui.ScrollView.DIR_VERTICAL)
        itemScroll.setTouchEnabled(true)
        itemScroll.setBounceEnabled(true)
        itemScroll.setContentSize(cc.size(itemScroll_width, itemScroll_height))
        itemScroll.setPosition(cc.p(0, 0))
        // itemScroll.setBackGroundImage(res.blackjack_jpg)
        this.addChild(itemScroll)

        // slogan attribute setting
        sloganSprite.attr({
            scaleX: sloganSprite_width / sloganSprite.getContentSize().width,
            scaleY: sloganSprite_width / sloganSprite.getContentSize().width,
            x: size.width / 2,
            y: itemScroll_innerHeight - sloganSprite_height / 2 - logoSprite_height - paddingY
        })
        itemScroll.addChild(sloganSprite)

        // guangbo attribute setting
        guangboSprite.attr({
            scaleX: guangboSprite_width / guangboSprite.getContentSize().width,
            scaleY: guangboSprite_width / guangboSprite.getContentSize().width,
            x: size.width / 2,
            y: itemScroll_innerHeight - guangboSprite_height / 2 - logoSprite_height - paddingY - sloganSprite_height - paddingY
        })
        itemScroll.addChild(guangboSprite)

        // niuniu item attribute setting
        niuniuBtn.attr({
            pressedActionEnabled: true,
            scaleX: niuniuBtn_width / niuniuBtn.getContentSize().width,
            scaleY: niuniuBtn_width / niuniuBtn.getContentSize().width,
            x: size.width / 2,
            y: itemScroll_innerHeight - niuniuBtn_height / 2 - logoSprite_height - paddingY - sloganSprite_height - paddingY - guangboSprite_height - paddingY
        })
        niuniuBtn.setZoomScale(0.05)
        niuniuBtn.addTouchEventListener(this.gotoNiuniu, this)
        itemScroll.addChild(niuniuBtn)

        // other game items
        var baccaratBtn = new ccui.Button(home_res.baccarat_png, home_res.baccarat_png, home_res.baccarat_png)
        baccaratBtn.attr({
            pressedActionEnabled: true,
            scaleX: gameItem_width / baccaratBtn.getContentSize().width,
            scaleY: gameItem_width / baccaratBtn.getContentSize().width,
            x: paddingX + gameItem_width / 2,
            y: itemScroll_innerHeight - gameItem_height / 2 - logoSprite_height - paddingY - sloganSprite_height - paddingY - guangboSprite_height - paddingY - niuniuBtn_height - paddingY
        })
        baccaratBtn.setZoomScale(0.05)
        baccaratBtn.addTouchEventListener(this.gotoBaccarat, this)
        itemScroll.addChild(baccaratBtn)

        var tigerDragonBtn = new ccui.Button(home_res.tiger_dragon_png, home_res.tiger_dragon_png, home_res.tiger_dragon_png)
        tigerDragonBtn.attr({
            pressedActionEnabled: true,
            scaleX: gameItem_width / tigerDragonBtn.getContentSize().width,
            scaleY: gameItem_width / tigerDragonBtn.getContentSize().width,
            x: size.width - paddingX - gameItem_width / 2,
            y: itemScroll_innerHeight - gameItem_height / 2 - logoSprite_height - paddingY - sloganSprite_height - paddingY - guangboSprite_height - paddingY - niuniuBtn_height - paddingY
        })
        tigerDragonBtn.setZoomScale(0.05)
        tigerDragonBtn.addTouchEventListener(this.gotoTigerDragon, this)
        itemScroll.addChild(tigerDragonBtn)

        var twoBarsBtn = new ccui.Button(home_res.two_bars_png, home_res.two_bars_png, home_res.two_bars_png)
        twoBarsBtn.attr({
            pressedActionEnabled: true,
            scaleX: gameItem_width / twoBarsBtn.getContentSize().width,
            scaleY: gameItem_height / twoBarsBtn.getContentSize().height,
            x: paddingX + gameItem_width / 2,
            y: itemScroll_innerHeight - gameItem_height / 2 - logoSprite_height - paddingY - sloganSprite_height - paddingY - guangboSprite_height - paddingY - niuniuBtn_height - paddingY - gameItem_height - paddingY / 2
        })
        twoBarsBtn.setZoomScale(0.05)
        twoBarsBtn.addTouchEventListener(this.gotoTwoBars, this)
        itemScroll.addChild(twoBarsBtn)
        
        var goldenFlowerBtn = new ccui.Button(home_res.golden_flower_png, home_res.golden_flower_png, home_res.golden_flower_png)
        goldenFlowerBtn.attr({
            pressedActionEnabled: true,
            scaleX: gameItem_width / goldenFlowerBtn.getContentSize().width,
            scaleY: gameItem_height / goldenFlowerBtn.getContentSize().height,
            x: size.width - paddingX - gameItem_width / 2,
            y: itemScroll_innerHeight - gameItem_height / 2 - logoSprite_height - paddingY - sloganSprite_height - paddingY - guangboSprite_height - paddingY - niuniuBtn_height - paddingY - gameItem_height - paddingY / 2
        })
        goldenFlowerBtn.setZoomScale(0.05)
        goldenFlowerBtn.addTouchEventListener(this.gotoGoldenFlower, this)
        itemScroll.addChild(goldenFlowerBtn)

        var sanGongBtn = new ccui.Button(home_res.san_gong_png, home_res.san_gong_png, home_res.san_gong_png)
        sanGongBtn.attr({
            pressedActionEnabled: true,
            scaleX: gameItem_width / sanGongBtn.getContentSize().width,
            scaleY: gameItem_height / sanGongBtn.getContentSize().height,
            x: paddingX + gameItem_width / 2,
            y: itemScroll_innerHeight - gameItem_height / 2 - logoSprite_height - paddingY - sloganSprite_height - paddingY - guangboSprite_height - paddingY - niuniuBtn_height - paddingY - gameItem_height - paddingY / 2 - gameItem_height - paddingY / 2
        })
        sanGongBtn.setZoomScale(0.05)
        sanGongBtn.addTouchEventListener(this.gotoSangong, this)
        itemScroll.addChild(sanGongBtn)
        
        var sicBoBtn = new ccui.Button(home_res.sic_bo_png, home_res.sic_bo_png, home_res.sic_bo_png)
        sicBoBtn.attr({
            pressedActionEnabled: true,
            scaleX: gameItem_width / sicBoBtn.getContentSize().width,
            scaleY: gameItem_height / sicBoBtn.getContentSize().height,
            x: size.width - gameItem_width / 2 - paddingX,
            y: itemScroll_innerHeight - gameItem_height / 2 - logoSprite_height - paddingY - sloganSprite_height - paddingY - guangboSprite_height - paddingY - niuniuBtn_height - paddingY - gameItem_height - paddingY / 2 - gameItem_height - paddingY / 2
        })
        sicBoBtn.setZoomScale(0.05)
        sicBoBtn.addTouchEventListener(this.gotoSicBo, this)
        itemScroll.addChild(sicBoBtn)
    },

    gotoNiuniu: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("gotoNiuniu")
                break
        }
    },
    
    gotoBaccarat: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("gotoBaccarat")
                break
        }
    },
    
    gotoTigerDragon: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("gotoTigerDragon")
                break
        }
    },
    
    gotoTwoBars: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("gotoTwoBars")
                break
        }
    },
    
    gotoGoldenFlower: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("gotoGoldenFlower")
                break
        }
    },
    
    gotoSangong: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("gotoSangong")
                break
        }
    },
    
    gotoSicBo: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                console.log("gotoSicBo")
                break
        }
    },
})



var HomeScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var homeLayer = new HomeLayer()
        this.addChild(homeLayer)
    }
})
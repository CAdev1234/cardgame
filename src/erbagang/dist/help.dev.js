"use strict";

var ErbagangHelpLayer = cc.Layer.extend({
  bgLayer: null,
  navBar: null,
  howPlayNav: null,
  traditionPlayNav: null,
  howPlayScroll: null,
  traditionPlayScroll: null,
  ctor: function ctor() {
    this._super();

    var size = cc.winSize;
    var paddingX = 20;
    var paddingY = 10; // background layer

    this.bgLayer = cc.LayerColor.create(cc.color(255, 255, 255), size.width, size.height);
    this.addChild(this.bgLayer); // header

    var header_height = 40;
    var headerBg = cc.LayerColor.create(cc.color(247, 184, 68), size.width, header_height);
    headerBg.attr({
      x: 0,
      y: size.height - header_height
    });
    this.addChild(headerBg);
    var goGameBtn = new ccui.Button();
    goGameBtn.attr({
      x: 20,
      y: size.height - header_height / 2 - 5,
      titleText: "<",
      titleFontSize: 25
    });
    goGameBtn.setTitleColor(cc.color(0, 0, 0));
    goGameBtn.addTouchEventListener(this.gotoGame, this);
    this.addChild(goGameBtn);
    var headerTitle = cc.LabelTTF.create("必发三公", "Arial");
    headerTitle.attr({
      x: size.width / 2,
      y: size.height - header_height / 2 - 5,
      fillStyle: cc.color(0, 0, 0),
      fontSize: 20
    });
    this.addChild(headerTitle); // footer

    var footer_height = 40;
    var footerBg = cc.LayerColor.create(cc.color(82, 82, 82), size.width, footer_height);
    footerBg.attr({
      x: 0,
      y: 0
    });
    this.addChild(footerBg); // banner

    var bannerSprite = cc.Sprite.create(res.blackjack_jpg);
    var banner_height = (size.width - paddingX) / 1600 * 900;
    bannerSprite.attr({
      x: size.width / 2,
      y: size.height - banner_height / 2 - header_height - paddingY / 2,
      scaleX: (size.width - paddingX) / 1600,
      scaleY: (size.width - paddingX) / 1600
    });
    this.addChild(bannerSprite); // nav bar

    var nav_height = 40;
    this.navBar = new cc.DrawNode();
    this.navBar.drawRect(cc.p(paddingX / 2, size.height - nav_height - header_height - paddingY / 2 - banner_height - paddingY / 2), cc.p(size.width - paddingX / 2, size.height - header_height - paddingY / 2 - banner_height - paddingY / 2), cc.color(0, 0, 0), 2, cc.color(229, 170, 63));
    this.addChild(this.navBar);
    this.howPlayNav = new ccui.Button();
    var howPlayNav_height = 15;
    this.howPlayNav.attr({
      x: (size.width - paddingX) / 4,
      y: size.height - howPlayNav_height / 2 - header_height - paddingY / 2 - banner_height - paddingY / 2 - nav_height / 3,
      titleText: "玩法说明",
      titleFontSize: howPlayNav_height
    });
    this.howPlayNav.setColor(cc.color(247, 184, 68));
    this.howPlayNav.addTouchEventListener(this.showHowPlay, this);
    this.addChild(this.howPlayNav);
    this.traditionPlayNav = new ccui.Button();
    var traditionPlayNav_height = 15;
    this.traditionPlayNav.attr({
      x: (size.width - paddingX) / 4 * 3,
      y: size.height - traditionPlayNav_height / 2 - header_height - paddingY / 2 - banner_height - paddingY / 2 - nav_height / 3,
      titleText: "传统牛牛规则",
      titleFontSize: traditionPlayNav_height
    });
    this.traditionPlayNav.setTitleColor(cc.color(255, 255, 255));
    this.traditionPlayNav.addTouchEventListener(this.showTraditionPlay, this);
    this.addChild(this.traditionPlayNav); // HowPlay content

    this.howPlayScroll = new ccui.ScrollView();
    var howPlayScroll_height = size.height - header_height - paddingY / 2 - banner_height - paddingY / 2 - nav_height - paddingY * 2 - footer_height - paddingY - paddingY;
    var howPlayScroll_inner_height = howPlayScroll_height + 200;
    this.howPlayScroll.attr({
      innerHeight: howPlayScroll_inner_height,
      innerWidth: size.width - paddingX
    });
    this.howPlayScroll.setDirection(ccui.ScrollView.DIR_VERTICAL);
    this.howPlayScroll.setTouchEnabled(true);
    this.howPlayScroll.setBounceEnabled(true);
    this.howPlayScroll.setContentSize(cc.size(size.width - paddingX, howPlayScroll_height));
    this.howPlayScroll.setPosition(cc.p(paddingX / 2, paddingY + footer_height + paddingY));
    this.addChild(this.howPlayScroll, 1, 1);
    var firstParaHeading = cc.LabelTTF.create("1.游戏规则说明：", "arial", 16);
    firstParaHeading.attr({
      fillStyle: cc.color(0, 0, 0)
    });
    var firstParaHeading_height = firstParaHeading.getContentSize().height;
    firstParaHeading.setPosition(cc.p(firstParaHeading.getContentSize().width / 2, howPlayScroll_inner_height - firstParaHeading_height / 2));
    this.howPlayScroll.addChild(firstParaHeading);
    var firstParaContent = cc.LabelTTF.create('必发二八杠是由马其他幸运飞艇官方开奖结果演变而成的一款公平公正的游戏，平台在当期马其他幸运飞艇开奖前10秒先随生成10张明牌，后根据当期马其他幸运飞艇的开奖结果派牌。\n\n开奖前先随机生成明牌，开奖后依据开奖号码派牌，这样的机制使得任何人任何机构都无法干涉牌局结果，杜绝了一切作假行为，真正做到公正透明，只拼运气。\n\n全天开奖和马耳他幸运飞艇同步，北京时间（GMT+8）每天白天从中午13:09 开到次日凌晨04:05，每5分钟开一次奖, 每天开奖180期。', "arial", 13);
    firstParaContent.attr({
      fillStyle: cc.color(0, 0, 0),
      boundingWidth: size.width - paddingX,
      verticalAlign: cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM,
      textAlign: cc.TEXT_ALIGNMENT_LEFT
    });
    var firstParaContent_height = firstParaContent.getContentSize().height;
    firstParaContent.setPosition(cc.p((size.width - paddingX) / 2, howPlayScroll_inner_height - firstParaContent_height / 2 - firstParaHeading_height - paddingY));
    this.howPlayScroll.addChild(firstParaContent);
    var secondParaHeading = cc.LabelTTF.create("2.牌面：");
    secondParaHeading.attr({
      fontSize: 16,
      fillStyle: cc.color(0, 0, 0),
      verticalAlign: cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM,
      textAlign: cc.TEXT_ALIGNMENT_LEFT
    });
    var secondParaHeading_height = secondParaHeading.getContentSize().height;
    secondParaHeading.setPosition(cc.p(secondParaHeading.getContentSize().width / 2, howPlayScroll_inner_height - secondParaHeading_height / 2 - firstParaHeading_height - paddingY - firstParaContent_height - paddingY));
    this.howPlayScroll.addChild(secondParaHeading);
    var secondParaContent = cc.LabelTTF.create("必发二八杠开盘后随机生成10张明牌。");
    secondParaContent.attr({
      fillStyle: cc.color(0, 0, 0),
      fontSize: 13,
      boundingWidth: size.width - paddingX,
      textAlign: cc.TEXT_ALIGNMENT_LEFT
    });
    var secondParaContent_height = secondParaContent.getContentSize().height;
    secondParaContent.setPosition(cc.p(secondParaContent.getContentSize().width / 2, howPlayScroll_inner_height - secondParaContent_height / 2 - firstParaHeading_height - paddingY - firstParaContent_height - paddingY - secondParaHeading_height - paddingY));
    this.howPlayScroll.addChild(secondParaContent);
    var thirdParaHeading = cc.LabelTTF.create("3.发牌：");
    thirdParaHeading.attr({
      fontSize: 16,
      fillStyle: cc.color(0, 0, 0),
      verticalAlign: cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM,
      textAlign: cc.TEXT_ALIGNMENT_LEFT
    });
    var thirdParaHeading_height = thirdParaHeading.getContentSize().height;
    thirdParaHeading.setPosition(cc.p(thirdParaHeading.getContentSize().width / 2, howPlayScroll_inner_height - thirdParaHeading_height / 2 - firstParaHeading_height - paddingY - firstParaContent_height - paddingY - secondParaHeading_height - paddingY - secondParaContent_height - paddingY));
    this.howPlayScroll.addChild(thirdParaHeading);
    var thirdParaContent = cc.LabelTTF.create("马耳他幸运飞艇开奖号为1到10号不重复的10个数字，所以开奖号和发牌顺序相对应。\n发牌顺序从左到右依次为1到10的牌位，依次为庄-上门-中门-下门的发牌顺序。如马耳他幸运飞艇第一个开奖号为5，则发第5张牌位上的牌派到庄。第二个开奖号为3，则发第3张牌位上的牌派到上门。第三个开奖号为6，则发第6张牌位上的牌派到中门，依次类推，只到发满4组牌（庄、上门、中门、下门）。");
    thirdParaContent.attr({
      fontSize: 13,
      boundingWidth: size.width - paddingX,
      textAlign: cc.TEXT_ALIGNMENT_LEFT,
      fillStyle: cc.color(0, 0, 0)
    });
    var thirdParaContent_height = thirdParaContent.getContentSize().height;
    thirdParaContent.setPosition(cc.p(thirdParaContent.getContentSize().width / 2, howPlayScroll_inner_height - thirdParaContent_height / 2 - firstParaHeading_height - paddingY - firstParaContent_height - paddingY - secondParaHeading_height - paddingY - secondParaContent_height - paddingY - thirdParaHeading_height - paddingY));
    this.howPlayScroll.addChild(thirdParaContent);
    var fourthParaHeading = cc.LabelTTF.create("4.输赢：");
    fourthParaHeading.attr({
      fontSize: 16,
      fillStyle: cc.color(0, 0, 0),
      verticalAlign: cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM,
      textAlign: cc.TEXT_ALIGNMENT_LEFT
    });
    var fourthParaHeading_height = fourthParaHeading.getContentSize().height;
    fourthParaHeading.setPosition(cc.p(fourthParaHeading.getContentSize().width / 2, howPlayScroll_inner_height - fourthParaHeading_height / 2 - firstParaHeading_height - paddingY - firstParaContent_height - paddingY - secondParaHeading_height - paddingY - secondParaContent_height - paddingY - thirdParaHeading_height - paddingY - thirdParaContent_height - paddingY));
    this.howPlayScroll.addChild(fourthParaHeading);
    var fourthParaContent = cc.LabelTTF.create("例随机牌面为（10、K、8、8、6、J、6、1、7、2）澳洲幸运10开奖结果为（5、9、4、8、1、6、10、7、2、3）龙方牌6、8 、10 凤方牌 7、1、J  ，投注凤方为赢。");
    fourthParaContent.attr({
      fontSize: 13,
      boundingWidth: size.width - paddingX,
      textAlign: cc.TEXT_ALIGNMENT_LEFT,
      fillStyle: cc.color(0, 0, 0)
    });
    var fourthParaContent_height = fourthParaContent.getContentSize().height;
    fourthParaContent.setPosition(cc.p(fourthParaContent.getContentSize().width / 2, howPlayScroll_inner_height - fourthParaContent_height / 2 - firstParaHeading_height - paddingY - firstParaContent_height - paddingY - secondParaHeading_height - paddingY - secondParaContent_height - paddingY - thirdParaHeading_height - paddingY - thirdParaContent_height - paddingY - fourthParaHeading_height - paddingY));
    this.howPlayScroll.addChild(fourthParaContent);
    var siteUrl = cc.LabelTTF.create("马耳他幸运飞艇官方网址:\nhttps://luckylottoz.com/");
    siteUrl.attr({
      fontSize: 13,
      textAlign: cc.TEXT_ALIGNMENT_LEFT,
      fillStyle: cc.color(0, 0, 0)
    });
    var siteUrl_height = siteUrl.getContentSize().height;
    siteUrl.setPosition(cc.p(siteUrl.getContentSize().width / 2, howPlayScroll_inner_height - siteUrl_height / 2 - firstParaHeading_height - paddingY - firstParaContent_height - paddingY - secondParaHeading_height - paddingY - secondParaContent_height - paddingY - thirdParaHeading_height - paddingY - thirdParaContent_height - paddingY - fourthParaHeading_height - paddingY - fourthParaContent_height - paddingY * 2));
    this.howPlayScroll.addChild(siteUrl); // traditional play

    this.traditionPlayScroll = ccui.ScrollView.create();
    var traditionPlayScroll_height = size.height - header_height - paddingY / 2 - banner_height - paddingY / 2 - nav_height - paddingY * 2 - footer_height - paddingY - paddingY;
    var traditionPlayScroll_inner_height = traditionPlayScroll_height + 200;
    this.traditionPlayScroll.attr({
      innerHeight: traditionPlayScroll_inner_height,
      innerWidth: size.width - paddingX
    });
    this.traditionPlayScroll.setDirection(ccui.ScrollView.DIR_VERTICAL);
    this.traditionPlayScroll.setTouchEnabled(true);
    this.traditionPlayScroll.setBounceEnabled(true);
    this.traditionPlayScroll.setContentSize(cc.size(size.width - paddingX, traditionPlayScroll_height));
    this.traditionPlayScroll.setPosition(cc.p(paddingX / 2, paddingY + footer_height + paddingY));
    this.addChild(this.traditionPlayScroll, 2, 2);
    var oneParaHeading = cc.LabelTTF.create("1.牌型介绍：", "arial", 16);
    oneParaHeading.attr({
      fillStyle: cc.color(0, 0, 0)
    });
    var oneParaHeading_height = oneParaHeading.getContentSize().height;
    oneParaHeading.setPosition(cc.p(oneParaHeading.getContentSize().width / 2, traditionPlayScroll_inner_height - oneParaHeading_height / 2));
    this.traditionPlayScroll.addChild(oneParaHeading);
    var oneParaContent = cc.Sprite.create(res.table_img_png);
    var oneParaContent_height = (size.width - paddingX) / 375 * 170;
    oneParaContent.attr({
      scaleX: (size.width - paddingX) / 375,
      scaleY: (size.width - paddingX) / 375
    });
    oneParaContent.setPosition(cc.p((size.width - paddingX) / 2, traditionPlayScroll_inner_height - oneParaContent_height / 2 - oneParaHeading_height - paddingY));
    this.traditionPlayScroll.addChild(oneParaContent);
    var twoParaHeading = cc.LabelTTF.create("2.大小比较：", "arial", 16);
    twoParaHeading.attr({
      fillStyle: cc.color(0, 0, 0)
    });
    var twoParaHeading_height = twoParaHeading.getContentSize().height;
    twoParaHeading.setPosition(cc.p(twoParaHeading.getContentSize().width / 2, traditionPlayScroll_inner_height - twoParaHeading_height / 2 - oneParaHeading_height - paddingY - oneParaContent_height - paddingY));
    this.traditionPlayScroll.addChild(twoParaHeading);
    var twoParaContent_1 = cc.LabelTTF.create("牛牛 > 牛九 > 牛八 > 牛七 > 牛六 > 牛五 > 牛四 > 牛三 > 牛二 > 牛一 > 无牛", "arial", 13);
    twoParaContent_1.attr({
      fillStyle: cc.color(0, 0, 0),
      boundingWidth: size.width - paddingX,
      textAlign: cc.TEXT_ALIGNMENT_LEFT
    });
    var twoParaContent_1_height = twoParaContent_1.getContentSize().height;
    twoParaContent_1.setPosition(cc.p(twoParaContent_1.getContentSize().width / 2, traditionPlayScroll_inner_height - twoParaContent_1_height / 2 - oneParaHeading_height - paddingY - oneParaContent_height - paddingY - twoParaHeading_height - paddingY));
    this.traditionPlayScroll.addChild(twoParaContent_1);
    var twoParaContent_2 = cc.LabelTTF.create("扑克牌依次大小为 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2 > 1 > 0", "arial", 13);
    twoParaContent_2.attr({
      fillStyle: cc.color(0, 0, 0),
      boundingWidth: size.width - paddingX,
      textAlign: cc.TEXT_ALIGNMENT_LEFT
    });
    var twoParaContent_2_height = twoParaContent_2.getContentSize().height;
    twoParaContent_2.setPosition(cc.p(twoParaContent_2.getContentSize().width / 2, traditionPlayScroll_inner_height - twoParaContent_2_height / 2 - oneParaHeading_height - paddingY - oneParaContent_height - paddingY - twoParaHeading_height - paddingY - twoParaContent_1_height - paddingY));
    this.traditionPlayScroll.addChild(twoParaContent_2);
    var twoParaContent_3 = cc.LabelTTF.create("注：当庄家与闲家点数相等时（包含有牛无牛牌面），取其中最大的一张牌比较大小，牌大的赢。如果此牌大小一样，取第二大的一张牌进行比较，依次类推，取第三大、第四大、第五大的牌进行比较，没有和局。", "arial", 13);
    twoParaContent_3.attr({
      fillStyle: cc.color(0, 0, 0),
      boundingWidth: size.width - paddingX,
      textAlign: cc.TEXT_ALIGNMENT_LEFT
    });
    var twoParaContent_3_height = twoParaContent_3.getContentSize().height;
    twoParaContent_3.setPosition(cc.p(twoParaContent_3.getContentSize().width / 2, traditionPlayScroll_inner_height - twoParaContent_3_height / 2 - oneParaHeading_height - paddingY - oneParaContent_height - paddingY - twoParaHeading_height - paddingY - twoParaContent_1_height - paddingY - twoParaContent_2_height - paddingY));
    this.traditionPlayScroll.addChild(twoParaContent_3);
    this.removeChild(this.traditionPlayScroll);
  },
  init: function init() {
    this._super();
  },
  gotoGame: function gotoGame(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        var gameScene = new ErbagangGameScene();
        cc.director.pushScene(new cc.TransitionFade(1.0, gameScene));
        break;
    }
  },
  showHowPlay: function showHowPlay(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        if (this.getChildByTag(1)) {
          return;
        }

        this.howPlayNav.setColor(cc.color(247, 184, 68));
        this.traditionPlayNav.setColor(cc.color(255, 255, 255));
        this.removeChild(this.traditionPlayScroll);
        this.addChild(this.howPlayScroll);
        break;
    }
  },
  showTraditionPlay: function showTraditionPlay(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        if (this.getChildByTag(2)) {
          return;
        }

        this.howPlayNav.setColor(cc.color(255, 255, 255));
        this.traditionPlayNav.setColor(cc.color(247, 184, 68));
        this.removeChild(this.howPlayScroll);
        this.addChild(this.traditionPlayScroll);
        break;
    }
  }
});
var ErbagangHelpScene = cc.Scene.extend({
  onEnter: function onEnter() {
    this._super();

    var helpLayer = new ErbagangHelpLayer();
    this.addChild(helpLayer);
  }
});
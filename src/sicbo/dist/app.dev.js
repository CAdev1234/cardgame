"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SicboGameLayer = cc.Layer.extend({
  circleColors: [],
  header_height: null,
  serial_num_panel: null,
  serial_num: [],
  lucky_num: [],
  dice: [],
  resultDice: [],
  coinWrapSprite_height: null,
  betAmountBg_height: null,
  betAmountBg_height_delta: null,
  banner_height: null,
  wenluBtn: null,
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
  gamePanel_height: null,
  gamePanel_border: null,
  panelArea: [],
  panel_DealedCoins: [],
  panel_ValRoundRect_Label: [],
  panel_ValRoundRect: [],
  dealedCoins_tag: 2,
  betAmountToken_RoundRect: null,
  betAmountTokenVal: null,
  cancelBtn: null,
  confirmBtn: null,
  coin_width: null,
  coinImages: [],
  coins: [],
  enabledCoin: [],
  enabledCoinDrop: true,
  coinDropListener: null,
  open_state: true,
  close_state: false,
  overLay_zOrder: 2,
  coinDealCheckDlg_overLay: null,
  coinDealCheckDlg_zOrder: null,
  coinDealCheckDlg: null,
  coinDealCheckDlgYesBtn: null,
  coinDealCheckDlgNoBtn: null,
  checkSuccessDlg_overLay: null,
  checkSuccessDlg: null,
  checkSuccessDlg_interval: null,
  dealCancelDlg_overLay: null,
  dealCancelDlg: null,
  ctor: function ctor() {
    var _this = this;

    this._super();

    var size = cc.winSize;
    var paddingX = 20;
    var paddingY = 20;
    this.enabledCoin.fill(false);

    for (var index = 0; index < 56; index++) {
      this.panel_DealedCoins[index] = [];
    }

    var bgLayer = new cc.LayerColor(cc.color(80, 96, 156), size.width, size.height);
    this.addChild(bgLayer); // load circle color image using batchNode

    var circleColors_cache = cc.spriteFrameCache.addSpriteFrames(res.circle_color_plist);
    var circleColors_sheet = new cc.SpriteBatchNode(res.circle_color_png);

    for (var _index = 0; _index < 10; _index++) {
      var circleColors_name = "circle-color-" + _index + ".png";
      var circleColors_frame = cc.spriteFrameCache.getSpriteFrame(circleColors_name);
      this.circleColors.push(circleColors_frame);
    } // load dice image using batchNode


    var dice_cache = cc.spriteFrameCache.addSpriteFrames(sicbo_res.dice_plist);
    var dice_sheet = new cc.SpriteBatchNode(sicbo_res.dice_png);

    for (var _index2 = 0; _index2 < 7; _index2++) {
      var diceName = "dice-" + _index2 + ".png";
      var dice_frame = cc.spriteFrameCache.getSpriteFrame(diceName);
      this.dice.push(dice_frame);
    } // header


    this.header_height = 30;
    var headerBg = new cc.LayerColor(cc.color(30, 101, 165), size.width, this.header_height);
    headerBg.attr({
      x: 0,
      y: size.height - this.header_height
    });
    this.addChild(headerBg);
    setTimeout(function () {
      _this.displaySerialPanel();
    }, 1000);
    var num_period_font_size = 13;
    var num_period_label = new cc.LabelTTF.create("期数", "Arial", num_period_font_size);
    var num_period_value = new cc.LabelTTF.create("31071466-1", "Arial", num_period_font_size);
    num_period_label.attr({
      x: size.width - paddingX / 4 - num_period_label.getContentSize().width / 2 - num_period_value.getContentSize().width,
      y: size.height - this.header_height / 2 - 2,
      fillStyle: cc.color(233, 133, 62)
    });
    this.addChild(num_period_label);
    num_period_value.attr({
      x: size.width - num_period_value.getContentSize().width / 2 - paddingX / 4,
      y: size.height - this.header_height / 2 - 2,
      fillStyle: cc.color(255, 255, 255)
    });
    this.addChild(num_period_value); // footer variable

    this.coinWrapSprite_height = 70;
    this.betAmountBg_height = 50;
    this.betAmountBg_height_delta = 20; // banner Part

    var bannerSprite = new cc.Sprite(sicbo_res.banner_png);
    var bannerSprite_height = size.width / bannerSprite.getContentSize().width * bannerSprite.getContentSize().height;
    bannerSprite.attr({
      x: size.width / 2,
      y: size.height - bannerSprite_height / 2 - this.header_height,
      scaleX: size.width / bannerSprite.getContentSize().width,
      scaleY: size.width / bannerSprite.getContentSize().width
    });
    this.banner_height = bannerSprite_height;
    var bannerBg = new cc.LayerColor(cc.color(0, 0, 0), size.width, this.banner_height);
    bannerBg.setPosition(cc.p(0, size.height - this.header_height - this.banner_height));
    this.addChild(bannerBg);
    this.addChild(bannerSprite);
    this.wenluBtn = new ccui.Button(res.wenlu_btn_png, res.wenlu_btn_png, res.wenlu_btn_png);
    var wenluBtn_width = 20;
    this.wenluBtn.attr({
      pressedActionEnabled: true,
      scaleX: wenluBtn_width / this.wenluBtn.getContentSize().width,
      scaleY: wenluBtn_width / this.wenluBtn.getContentSize().width,
      x: wenluBtn_width / 2,
      y: size.height - this.header_height - this.banner_height / 2 + 10
    });
    this.wenluBtn.addTouchEventListener(this.showWenluPanel, this);
    this.addChild(this.wenluBtn, this.wenluPanel_zOrder + 1);
    this.historyBtn = new ccui.Button(res.history_btn_png, res.history_btn_png, res.history_btn_png);
    var historyBtn_width = 20;
    this.historyBtn.attr({
      pressedActionEnabled: true,
      scaleX: historyBtn_width / this.historyBtn.getContentSize().width,
      scaleY: historyBtn_width / this.historyBtn.getContentSize().width
    });
    this.historyBtn.setPosition(cc.p(size.width - historyBtn_width / 2, size.height - this.header_height - this.banner_height / 2 + 10));
    this.historyBtn.setZoomScale(0.05);
    this.historyBtn.addTouchEventListener(this.showHistory, this);
    this.addChild(this.historyBtn); // card count added

    var cardCountSprite = new cc.Sprite(baccarat_res.card_count_png);
    var cardCountSprite_width = 35;
    cardCountSprite.attr({
      scaleX: cardCountSprite_width / cardCountSprite.getContentSize().width,
      scaleY: cardCountSprite_width / cardCountSprite.getContentSize().height,
      x: paddingX + cardCountSprite_width / 2,
      y: size.height - this.header_height - paddingY
    });
    this.addChild(cardCountSprite);
    this.cardCountVal_num = 333;
    this.cardCountVal = new cc.LabelTTF(this.cardCountVal_num + "/" + 8 * 52, "Arial", 15);
    this.cardCountVal.attr({
      fillStyle: cc.color(255, 255, 255),
      x: this.cardCountVal.getContentSize().width / 2 + paddingX + cardCountSprite_width,
      y: size.height - this.header_height - paddingY
    });
    this.addChild(this.cardCountVal); // btnwrap sprite

    var btnwrapSprite = new cc.Sprite(res.btn_wrap_png);
    var btnwrapSprite_width = size.width;
    this.btnwrapSprite_height = btnwrapSprite_width / btnwrapSprite.getContentSize().width * btnwrapSprite.getContentSize().height;
    this.btnwrapSprite_y_delta = 10;
    btnwrapSprite.attr({
      scaleX: btnwrapSprite_width / btnwrapSprite.getContentSize().width,
      scaleY: btnwrapSprite_width / btnwrapSprite.getContentSize().width,
      x: btnwrapSprite_width / 2,
      y: size.height - this.btnwrapSprite_height / 2 - this.header_height - this.banner_height + this.btnwrapSprite_y_delta
    });
    this.addChild(btnwrapSprite, this.btnwrapSprite_zOrder);
    this.goHomeBtn = new ccui.Button(res.home_btn_png, res.home_btn_png, res.home_btn_png);
    var goHomeBtn_width = 60;
    var goHomeBtn_height = goHomeBtn_width / this.goHomeBtn.getContentSize().width * this.goHomeBtn.getContentSize().height;
    this.goHomeBtn.attr(_defineProperty({
      pressedActionEnabled: true,
      x: size.width / 6,
      y: size.height - goHomeBtn_height / 2 - this.header_height - this.banner_height + this.btnwrapSprite_y_delta,
      scaleX: goHomeBtn_width / this.goHomeBtn.getContentSize().width,
      scaleY: goHomeBtn_width / this.goHomeBtn.getContentSize().width
    }, "pressedActionEnabled", true));
    this.goHomeBtn.addTouchEventListener(this.gotoHome, this);
    this.addChild(this.goHomeBtn, this.btnwrapSprite_zOrder);
    this.infoText = new cc.LabelTTF("距封盘时间 00:20", "Arial", 13);
    this.infoText.attr({
      x: size.width / 2,
      y: size.height - this.header_height - this.banner_height - this.infoText.getContentSize().height / 2,
      fillStyle: cc.color(205, 160, 58)
    });
    this.addChild(this.infoText, this.btnwrapSprite_zOrder);
    this.helpBtn = new ccui.Button(res.help_btn_png);
    var helpBtn_height = 30;
    this.helpBtn.attr({
      pressedActionEnabled: true,
      x: size.width - 40,
      y: size.height - this.header_height - this.banner_height - 5,
      scaleX: helpBtn_height / this.helpBtn.getContentSize().height,
      scaleY: helpBtn_height / this.helpBtn.getContentSize().height
    });
    this.helpBtn.addTouchEventListener(this.showHelp, this);
    this.addChild(this.helpBtn, this.btnwrapSprite_zOrder);
    this.soundOnBtn = new ccui.Button(res.sound_on_btn_png);
    var soundOnBtn_height = 30;
    this.soundOnBtn.attr({
      pressedActionEnabled: true,
      x: size.width - 80,
      y: size.height - this.header_height - this.banner_height - 5,
      scaleX: soundOnBtn_height / this.soundOnBtn.getContentSize().width,
      scaleY: soundOnBtn_height / this.soundOnBtn.getContentSize().width
    });
    this.soundOnBtn.addTouchEventListener(this.enableSoundOnMethod, this);
    this.addChild(this.soundOnBtn, this.btnwrapSprite_zOrder); // game panel

    this.gamePanel_height = size.height - this.header_height - this.banner_height - this.coinWrapSprite_height - this.betAmountBg_height + this.btnwrapSprite_y_delta;
    this.gamePanel_border = 2;
    this.panelArea[0] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 4 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2);
    this.panelArea[0].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 63 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[0]);
    var panelArea0_label_1 = new cc.LabelTTF("4-10", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4);
    panelArea0_label_1.attr({
      fillStyle: cc.color(255, 255, 255),
      x: paddingX / 5 + panelArea0_label_1.getContentSize().width / 2,
      y: panelArea0_label_1.getContentSize().height / 2 + paddingY
    });
    this.panelArea[0].addChild(panelArea0_label_1);
    var panelArea0_label_2 = new cc.LabelTTF("小", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4 + 3);
    panelArea0_label_2.attr({
      fillStyle: cc.color(255, 255, 255),
      x: size.width / 4 - this.gamePanel_border / 2 - panelArea0_label_2.getContentSize().width,
      y: paddingY
    });
    this.panelArea[0].addChild(panelArea0_label_2);
    var panelArea0_rate = new cc.LabelTTF("1:1", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4 - 3);
    panelArea0_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: paddingX / 5 + panelArea0_rate.getContentSize().width / 2,
      y: panelArea0_rate.getContentSize().height / 2 + 2
    });
    this.panelArea[0].addChild(panelArea0_rate);
    this.panelArea[1] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 4 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2);
    this.panelArea[1].setPosition(size.width / 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 63 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[1]);
    var panelArea1_label = new cc.LabelTTF("单", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4 + 3);
    panelArea1_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 4 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 2
    });
    this.panelArea[1].addChild(panelArea1_label);
    var panelArea1_rate = new cc.LabelTTF("1:1", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4 - 3);
    panelArea1_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 4 - this.gamePanel_border) / 2,
      y: panelArea1_rate.getContentSize().height / 2 + 2
    });
    this.panelArea[1].addChild(panelArea1_rate);
    this.panelArea[2] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 4 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2);
    this.panelArea[2].setPosition(size.width / 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 63 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[2]);
    var panelArea2_label = new cc.LabelTTF("双", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4 + 3);
    panelArea2_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 4 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 2
    });
    this.panelArea[2].addChild(panelArea2_label);
    var panelArea2_rate = new cc.LabelTTF("1:1", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4 - 3);
    panelArea2_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 4 - this.gamePanel_border) / 2,
      y: panelArea2_rate.getContentSize().height / 2 + 2
    });
    this.panelArea[2].addChild(panelArea2_rate);
    this.panelArea[3] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 4 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2);
    this.panelArea[3].setPosition(size.width / 4 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 63 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[3]);
    var panelArea3_label_1 = new cc.LabelTTF("11-17", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4);
    panelArea3_label_1.attr({
      fillStyle: cc.color(255, 255, 255),
      x: size.width / 4 - this.gamePanel_border / 2 - panelArea3_label_1.getContentSize().width / 2 - paddingX / 4,
      y: panelArea0_label_1.getContentSize().height / 2 + paddingY
    });
    this.panelArea[3].addChild(panelArea3_label_1);
    var panelArea3_label_2 = new cc.LabelTTF("大", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4 + 3);
    panelArea3_label_2.attr({
      fillStyle: cc.color(255, 255, 255),
      x: panelArea3_label_2.getContentSize().width / 2 + paddingX / 4,
      y: paddingY
    });
    this.panelArea[3].addChild(panelArea3_label_2);
    var panelArea3_rate = new cc.LabelTTF("1:1", "Arial", (this.gamePanel_height / 71 * 8 - this.gamePanel_border / 2) / 4 - 3);
    panelArea3_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: size.width / 4 - this.gamePanel_border / 2 - panelArea3_rate.getContentSize().width / 2 - paddingX / 4,
      y: panelArea3_rate.getContentSize().width / 2 + 2
    });
    this.panelArea[3].addChild(panelArea3_rate);
    this.panelArea[4] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 12 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 9 - this.gamePanel_border);
    this.panelArea[4].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 54 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[4]);

    for (var _index3 = 0; _index3 < 3; _index3++) {
      var diceSprite = new cc.Sprite(this.dice[0]);
      diceSprite.attr({
        scaleX: size.width / 24 / diceSprite.getContentSize().width,
        scaleY: size.width / 24 / diceSprite.getContentSize().width,
        x: (size.width / 12 - this.gamePanel_border / 2) / 2,
        y: this.gamePanel_height / 71 * 9 * 0.5 + (paddingY / 20 + size.width / 24) * (_index3 - 1)
      });
      this.panelArea[4].addChild(diceSprite);
    }

    this.panelArea[5] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 12 - this.gamePanel_border, this.gamePanel_height / 71 * 9 - this.gamePanel_border);
    this.panelArea[5].setPosition(size.width / 12 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 54 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[5]);

    for (var _index4 = 0; _index4 < 3; _index4++) {
      var diceSprite = new cc.Sprite(this.dice[2]);
      diceSprite.attr({
        scaleX: size.width / 24 / diceSprite.getContentSize().width,
        scaleY: size.width / 24 / diceSprite.getContentSize().width,
        x: (size.width / 12 - this.gamePanel_border / 2) / 2,
        y: this.gamePanel_height / 71 * 9 * 0.5 + (paddingY / 20 + size.width / 24) * (_index4 - 1)
      });
      this.panelArea[5].addChild(diceSprite);
    }

    this.panelArea[6] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 12 - this.gamePanel_border, this.gamePanel_height / 71 * 9 - this.gamePanel_border);
    this.panelArea[6].setPosition(size.width / 6 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 54 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[6]);

    for (var _index5 = 0; _index5 < 3; _index5++) {
      var diceSprite = new cc.Sprite(this.dice[3]);
      diceSprite.attr({
        scaleX: size.width / 24 / diceSprite.getContentSize().width,
        scaleY: size.width / 24 / diceSprite.getContentSize().width,
        x: (size.width / 12 - this.gamePanel_border / 2) / 2,
        y: this.gamePanel_height / 71 * 9 * 0.5 + (paddingY / 20 + size.width / 24) * (_index5 - 1)
      });
      this.panelArea[6].addChild(diceSprite);
    }

    this.panelArea[7] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 2 - this.gamePanel_border, this.gamePanel_height / 71 * 9 - this.gamePanel_border);
    this.panelArea[7].setPosition(size.width / 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 54 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[7]);
    var panelArea7_label = new cc.LabelTTF("全围", "Arial", 20);
    panelArea7_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 2 - this.gamePanel_border) / 2,
      y: this.gamePanel_height / 71 * 9 * 0.5
    });
    this.panelArea[7].addChild(panelArea7_label);
    var panelArea7_rate = new cc.LabelTTF("1:30", "Arial", 15);
    panelArea7_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 2 - this.gamePanel_border) / 2,
      y: panelArea7_rate.getContentSize().height / 2
    });
    this.panelArea[7].addChild(panelArea7_rate);
    this.panelArea[8] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 12 - this.gamePanel_border, this.gamePanel_height / 71 * 9 - this.gamePanel_border);
    this.panelArea[8].setPosition(size.width / 4 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 54 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[8]);

    for (var _index6 = 0; _index6 < 3; _index6++) {
      var diceSprite = new cc.Sprite(this.dice[4]);
      diceSprite.attr({
        scaleX: size.width / 24 / diceSprite.getContentSize().width,
        scaleY: size.width / 24 / diceSprite.getContentSize().width,
        x: (size.width / 12 - this.gamePanel_border / 2) / 2,
        y: this.gamePanel_height / 71 * 9 * 0.5 + (paddingY / 20 + size.width / 24) * (_index6 - 1)
      });
      this.panelArea[8].addChild(diceSprite);
    }

    this.panelArea[9] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 12 - this.gamePanel_border, this.gamePanel_height / 71 * 9 - this.gamePanel_border);
    this.panelArea[9].setPosition(size.width / 12 * 10 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 54 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[9]);

    for (var _index7 = 0; _index7 < 3; _index7++) {
      var diceSprite = new cc.Sprite(this.dice[5]);
      diceSprite.attr({
        scaleX: size.width / 24 / diceSprite.getContentSize().width,
        scaleY: size.width / 24 / diceSprite.getContentSize().width,
        x: (size.width / 12 - this.gamePanel_border / 2) / 2,
        y: this.gamePanel_height / 71 * 9 * 0.5 + (paddingY / 20 + size.width / 24) * (_index7 - 1)
      });
      this.panelArea[9].addChild(diceSprite);
    }

    this.panelArea[10] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 12 - this.gamePanel_border, this.gamePanel_height / 71 * 9 - this.gamePanel_border);
    this.panelArea[10].setPosition(size.width / 12 * 11 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 54 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[10]);

    for (var _index8 = 0; _index8 < 3; _index8++) {
      var diceSprite = new cc.Sprite(this.dice[6]);
      diceSprite.attr({
        scaleX: size.width / 24 / diceSprite.getContentSize().width,
        scaleY: size.width / 24 / diceSprite.getContentSize().width,
        x: (size.width / 12 - this.gamePanel_border / 2) / 2,
        y: this.gamePanel_height / 71 * 9 * 0.5 + (paddingY / 20 + size.width / 24) * (_index8 - 1)
      });
      this.panelArea[10].addChild(diceSprite);
    }

    this.panelArea[11] = new cc.LayerColor(cc.color(27, 32, 67), size.width, this.gamePanel_height / 71 * 2 - this.gamePanel_border);
    this.panelArea[11].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 52 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[11]);
    var panelArea11_label_1 = new cc.LabelTTF("1:180", "Arial", 10);
    panelArea11_label_1.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 4 - this.gamePanel_border / 2) / 2,
      y: (this.gamePanel_height / 71 * 2 - this.gamePanel_border) / 2
    });
    this.panelArea[11].addChild(panelArea11_label_1);
    var panelArea11_label_2 = new cc.LabelTTF("1:180", "Arial", 10);
    panelArea11_label_2.attr({
      fillStyle: cc.color(80, 96, 156),
      x: size.width / 4 * 3 + this.gamePanel_border / 2 + (size.width / 4 - this.gamePanel_border / 2) / 2,
      y: (this.gamePanel_height / 71 * 2 - this.gamePanel_border) / 2
    });
    this.panelArea[11].addChild(panelArea11_label_2);
    this.panelArea[12] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[12].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 44 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[12]);

    for (var _index9 = 0; _index9 < 2; _index9++) {
      var diceSprite = new cc.Sprite(this.dice[1]);
      var diceSprite_width = size.width / 6 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 6 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index9,
        y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
      });
      this.panelArea[12].addChild(diceSprite);
    }

    this.panelArea[13] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[13].setPosition(size.width / 6 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 44 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[13]);

    for (var _index10 = 0; _index10 < 2; _index10++) {
      var diceSprite = new cc.Sprite(this.dice[2]);
      var diceSprite_width = size.width / 6 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 6 - this.gamePanel_border) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index10,
        y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
      });
      this.panelArea[13].addChild(diceSprite);
    }

    this.panelArea[14] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[14].setPosition(size.width / 6 * 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 44 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[14]);

    for (var _index11 = 0; _index11 < 2; _index11++) {
      var diceSprite = new cc.Sprite(this.dice[3]);
      var diceSprite_width = size.width / 6 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 6 - this.gamePanel_border) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index11,
        y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
      });
      this.panelArea[14].addChild(diceSprite);
    }

    this.panelArea[15] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[15].setPosition(size.width / 6 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 44 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[15]);

    for (var _index12 = 0; _index12 < 2; _index12++) {
      var diceSprite = new cc.Sprite(this.dice[4]);
      var diceSprite_width = size.width / 6 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 6 - this.gamePanel_border) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index12,
        y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
      });
      this.panelArea[15].addChild(diceSprite);
    }

    this.panelArea[16] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[16].setPosition(size.width / 6 * 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 44 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[16]);

    for (var _index13 = 0; _index13 < 2; _index13++) {
      var diceSprite = new cc.Sprite(this.dice[5]);
      var diceSprite_width = size.width / 6 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 6 - this.gamePanel_border) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index13,
        y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
      });
      this.panelArea[16].addChild(diceSprite);
    }

    this.panelArea[17] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[17].setPosition(size.width / 6 * 5 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 44 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[17]);

    for (var _index14 = 0; _index14 < 2; _index14++) {
      var diceSprite = new cc.Sprite(this.dice[6]);
      var diceSprite_width = size.width / 6 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 6 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index14,
        y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
      });
      this.panelArea[17].addChild(diceSprite);
    }

    this.panelArea[18] = new cc.LayerColor(cc.color(27, 32, 67), size.width, this.gamePanel_height / 71 * 2 - this.gamePanel_border);
    this.panelArea[18].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 42 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[18]);
    var panelArea18_label = new cc.LabelTTF("1:10", "Arial", 10);
    panelArea18_label.attr({
      fillStyle: cc.color(80, 96, 156),
      x: size.width / 2,
      y: (this.gamePanel_height / 71 * 2 - this.gamePanel_border) / 2
    });
    this.panelArea[18].addChild(panelArea18_label);
    this.panelArea[19] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[19].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 36 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[19]);

    for (var _index15 = 0; _index15 < 2; _index15++) {
      var diceSprite = new cc.Sprite(this.dice[_index15 + 1]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index15,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[19].addChild(diceSprite);
    }

    this.panelArea[20] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[20].setPosition(size.width / 5 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 36 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[20]);

    for (var _index16 = 0; _index16 < 2; _index16++) {
      var diceNum = _index16 + 1;
      if (_index16 == 1) diceNum = 3;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index16,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[20].addChild(diceSprite);
    }

    this.panelArea[21] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[21].setPosition(size.width / 5 * 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 36 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[21]);

    for (var _index17 = 0; _index17 < 2; _index17++) {
      var diceNum = _index17 + 1;
      if (_index17 == 1) diceNum = 4;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index17,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[21].addChild(diceSprite);
    }

    this.panelArea[22] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[22].setPosition(size.width / 5 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 36 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[22]);

    for (var _index18 = 0; _index18 < 2; _index18++) {
      var diceNum = _index18 + 1;
      if (_index18 == 1) diceNum = 5;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index18,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[22].addChild(diceSprite);
    }

    this.panelArea[23] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[23].setPosition(size.width / 5 * 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 36 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[23]);

    for (var _index19 = 0; _index19 < 2; _index19++) {
      var diceNum = _index19 + 1;
      if (_index19 == 1) diceNum = 6;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index19,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[23].addChild(diceSprite);
    }

    this.panelArea[24] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[24].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 30 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[24]);

    for (var _index20 = 0; _index20 < 2; _index20++) {
      var diceNum = _index20 + 2;
      if (_index20 == 1) diceNum = 3;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index20,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[24].addChild(diceSprite);
    }

    this.panelArea[25] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[25].setPosition(size.width / 5 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 30 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[25]);

    for (var _index21 = 0; _index21 < 2; _index21++) {
      var diceNum = _index21 + 2;
      if (_index21 == 1) diceNum = 4;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index21,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[25].addChild(diceSprite);
    }

    this.panelArea[26] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[26].setPosition(size.width / 5 * 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 30 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[26]);

    for (var _index22 = 0; _index22 < 2; _index22++) {
      var diceNum = _index22 + 2;
      if (_index22 == 1) diceNum = 5;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index22,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[26].addChild(diceSprite);
    }

    this.panelArea[27] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[27].setPosition(size.width / 5 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 30 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[27]);

    for (var _index23 = 0; _index23 < 2; _index23++) {
      var diceNum = _index23 + 2;
      if (_index23 == 1) diceNum = 6;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index23,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[27].addChild(diceSprite);
    }

    this.panelArea[28] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[28].setPosition(size.width / 5 * 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 30 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[28]);

    for (var _index24 = 0; _index24 < 2; _index24++) {
      var diceNum = _index24 + 3;
      if (_index24 == 1) diceNum = 4;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index24,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[28].addChild(diceSprite);
    }

    this.panelArea[29] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[29].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 24 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[29]);

    for (var _index25 = 0; _index25 < 2; _index25++) {
      var diceNum = _index25 + 3;
      if (_index25 == 1) diceNum = 5;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index25,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[29].addChild(diceSprite);
    }

    this.panelArea[30] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[30].setPosition(size.width / 5 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 24 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[30]);

    for (var _index26 = 0; _index26 < 2; _index26++) {
      var diceNum = _index26 + 3;
      if (_index26 == 1) diceNum = 6;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index26,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[30].addChild(diceSprite);
    }

    this.panelArea[31] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[31].setPosition(size.width / 5 * 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 24 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[31]);

    for (var _index27 = 0; _index27 < 2; _index27++) {
      var diceNum = _index27 + 4;
      if (_index27 == 1) diceNum = 5;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index27,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[31].addChild(diceSprite);
    }

    this.panelArea[32] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[32].setPosition(size.width / 5 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 24 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[32]);

    for (var _index28 = 0; _index28 < 2; _index28++) {
      var diceNum = _index28 + 3;
      if (_index28 == 1) diceNum = 6;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index28,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[32].addChild(diceSprite);
    }

    this.panelArea[33] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 5 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[33].setPosition(size.width / 5 * 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 24 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[33]);

    for (var _index29 = 0; _index29 < 2; _index29++) {
      var diceNum = _index29 + 5;
      if (_index29 == 1) diceNum = 6;
      var diceSprite = new cc.Sprite(this.dice[diceNum]);
      var diceSprite_width = size.width / 5 * (2 / 3) / 2;
      diceSprite.attr({
        scaleX: diceSprite_width / diceSprite.getContentSize().width,
        scaleY: diceSprite_width / diceSprite.getContentSize().width,
        x: (size.width / 5 - this.gamePanel_border / 2) / 2 - diceSprite_width / 2 - paddingX / 10 + (diceSprite_width + paddingX / 10) * _index29,
        y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
      });
      this.panelArea[33].addChild(diceSprite);
    }

    this.panelArea[54] = new cc.LayerColor(cc.color(27, 32, 67), size.width, this.gamePanel_height / 71 * 2 - this.gamePanel_border);
    this.panelArea[54].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 22 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[54]);
    var panelArea54_rate = new cc.LabelTTF("1:5", "Arial", 10);
    panelArea54_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: size.width / 2,
      y: (this.gamePanel_height / 71 * 2 - this.gamePanel_border) / 2
    });
    this.panelArea[54].addChild(panelArea54_rate);
    this.panelArea[34] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[34].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 16 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[34]);
    var panelArea34_label = new cc.LabelTTF("4", "Arial", 20);
    panelArea34_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border / 2) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[34].addChild(panelArea34_label);
    var panelArea34_rate = new cc.LabelTTF("1:60", "Arial", 11);
    panelArea34_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border / 2) / 2,
      y: panelArea34_rate.getContentSize().height / 2
    });
    this.panelArea[34].addChild(panelArea34_rate);
    this.panelArea[35] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[35].setPosition(size.width / 7 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 16 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[35]);
    var panelArea35_label = new cc.LabelTTF("5", "Arial", 20);
    panelArea35_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[35].addChild(panelArea35_label);
    var panelArea35_rate = new cc.LabelTTF("1:30", "Arial", 11);
    panelArea35_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea35_rate.getContentSize().height / 2
    });
    this.panelArea[35].addChild(panelArea35_rate);
    this.panelArea[36] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[36].setPosition(size.width / 7 * 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 16 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[36]);
    var panelArea36_label = new cc.LabelTTF("6", "Arial", 20);
    panelArea36_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[36].addChild(panelArea36_label);
    var panelArea36_rate = new cc.LabelTTF("1:17", "Arial", 11);
    panelArea36_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea36_rate.getContentSize().height / 2
    });
    this.panelArea[36].addChild(panelArea36_rate);
    this.panelArea[37] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[37].setPosition(size.width / 7 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 16 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[37]);
    var panelArea37_label = new cc.LabelTTF("7", "Arial", 20);
    panelArea37_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[37].addChild(panelArea37_label);
    var panelArea37_rate = new cc.LabelTTF("1:12", "Arial", 11);
    panelArea37_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea37_rate.getContentSize().height / 2
    });
    this.panelArea[37].addChild(panelArea37_rate);
    this.panelArea[38] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[38].setPosition(size.width / 7 * 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 16 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[38]);
    var panelArea38_label = new cc.LabelTTF("8", "Arial", 20);
    panelArea38_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[38].addChild(panelArea38_label);
    var panelArea38_rate = new cc.LabelTTF("1:8", "Arial", 11);
    panelArea38_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea38_rate.getContentSize().height / 2
    });
    this.panelArea[38].addChild(panelArea38_rate);
    this.panelArea[39] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[39].setPosition(size.width / 7 * 5 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 16 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[39]);
    var panelArea39_label = new cc.LabelTTF("9", "Arial", 20);
    panelArea39_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[39].addChild(panelArea39_label);
    var panelArea39_rate = new cc.LabelTTF("1:6", "Arial", 11);
    panelArea39_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea39_rate.getContentSize().height / 2
    });
    this.panelArea[39].addChild(panelArea39_rate);
    this.panelArea[40] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[40].setPosition(size.width / 7 * 6 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 16 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[40]);
    var panelArea40_label = new cc.LabelTTF("10", "Arial", 20);
    panelArea40_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border / 2) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[40].addChild(panelArea40_label);
    var panelArea40_rate = new cc.LabelTTF("1:6", "Arial", 11);
    panelArea40_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border / 2) / 2,
      y: panelArea40_rate.getContentSize().height / 2
    });
    this.panelArea[40].addChild(panelArea40_rate);
    this.panelArea[41] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[41].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 10 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[41]);
    var panelArea41_label = new cc.LabelTTF("11", "Arial", 20);
    panelArea41_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border / 2) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[41].addChild(panelArea41_label);
    var panelArea41_rate = new cc.LabelTTF("1:6", "Arial", 11);
    panelArea41_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border / 2) / 2,
      y: panelArea41_rate.getContentSize().height / 2
    });
    this.panelArea[41].addChild(panelArea41_rate);
    this.panelArea[42] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[42].setPosition(size.width / 7 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 10 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[42]);
    var panelArea42_label = new cc.LabelTTF("12", "Arial", 20);
    panelArea42_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[42].addChild(panelArea42_label);
    var panelArea42_rate = new cc.LabelTTF("1:6", "Arial", 11);
    panelArea42_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea42_rate.getContentSize().height / 2
    });
    this.panelArea[42].addChild(panelArea42_rate);
    this.panelArea[43] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[43].setPosition(size.width / 7 * 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 10 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[43]);
    var panelArea43_label = new cc.LabelTTF("13", "Arial", 20);
    panelArea43_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[43].addChild(panelArea43_label);
    var panelArea43_rate = new cc.LabelTTF("1:8", "Arial", 11);
    panelArea43_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea43_rate.getContentSize().height / 2
    });
    this.panelArea[43].addChild(panelArea43_rate);
    this.panelArea[44] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[44].setPosition(size.width / 7 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 10 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[44]);
    var panelArea44_label = new cc.LabelTTF("14", "Arial", 20);
    panelArea44_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[44].addChild(panelArea44_label);
    var panelArea44_rate = new cc.LabelTTF("1:12", "Arial", 11);
    panelArea44_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea44_rate.getContentSize().height / 2
    });
    this.panelArea[44].addChild(panelArea44_rate);
    this.panelArea[45] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[45].setPosition(size.width / 7 * 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 10 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[45]);
    var panelArea45_label = new cc.LabelTTF("15", "Arial", 20);
    panelArea45_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[45].addChild(panelArea45_label);
    var panelArea45_rate = new cc.LabelTTF("1:17", "Arial", 11);
    panelArea45_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea45_rate.getContentSize().height / 2
    });
    this.panelArea[45].addChild(panelArea45_rate);
    this.panelArea[46] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[46].setPosition(size.width / 7 * 5 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 10 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[46]);
    var panelArea46_label = new cc.LabelTTF("16", "Arial", 20);
    panelArea46_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[46].addChild(panelArea46_label);
    var panelArea46_rate = new cc.LabelTTF("1:30", "Arial", 11);
    panelArea46_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border) / 2,
      y: panelArea46_rate.getContentSize().height / 2
    });
    this.panelArea[46].addChild(panelArea46_rate);
    this.panelArea[47] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 7 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 6 - this.gamePanel_border);
    this.panelArea[47].setPosition(size.width / 7 * 6 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 10 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[47]);
    var panelArea47_label = new cc.LabelTTF("17", "Arial", 20);
    panelArea47_label.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width / 7 - this.gamePanel_border / 2) / 2,
      y: (this.gamePanel_height / 71 * 6 - this.gamePanel_border) / 2
    });
    this.panelArea[47].addChild(panelArea47_label);
    var panelArea47_rate = new cc.LabelTTF("1:60", "Arial", 11);
    panelArea47_rate.attr({
      fillStyle: cc.color(80, 96, 156),
      x: (size.width / 7 - this.gamePanel_border / 2) / 2,
      y: panelArea47_rate.getContentSize().height / 2
    });
    this.panelArea[47].addChild(panelArea47_rate);
    this.panelArea[48] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[48].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 2 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[48]);
    var panelArea48_dice = new cc.Sprite(this.dice[1]);
    var panelArea48_dice_width = (size.width / 6 - this.gamePanel_border) / 3 * 2;
    panelArea48_dice.attr({
      scaleX: panelArea48_dice_width / panelArea48_dice.getContentSize().width,
      scaleY: panelArea48_dice_width / panelArea48_dice.getContentSize().width,
      x: (size.width / 6 - this.gamePanel_border / 2) / 2,
      y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
    });
    this.panelArea[48].addChild(panelArea48_dice);
    this.panelArea[49] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[49].setPosition(size.width / 6 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 2 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[49]);
    var panelArea49_dice = new cc.Sprite(this.dice[2]);
    var panelArea49_dice_width = (size.width / 6 - this.gamePanel_border) / 3 * 2;
    panelArea49_dice.attr({
      scaleX: panelArea49_dice_width / panelArea49_dice.getContentSize().width,
      scaleY: panelArea49_dice_width / panelArea49_dice.getContentSize().width,
      x: (size.width / 6 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
    });
    this.panelArea[49].addChild(panelArea49_dice);
    this.panelArea[50] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[50].setPosition(size.width / 6 * 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 2 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[50]);
    var panelArea50_dice = new cc.Sprite(this.dice[3]);
    var panelArea50_dice_width = (size.width / 6 - this.gamePanel_border) / 3 * 2;
    panelArea50_dice.attr({
      scaleX: panelArea50_dice_width / panelArea50_dice.getContentSize().width,
      scaleY: panelArea50_dice_width / panelArea50_dice.getContentSize().width,
      x: (size.width / 6 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
    });
    this.panelArea[50].addChild(panelArea50_dice);
    this.panelArea[51] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[51].setPosition(size.width / 6 * 3 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 2 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[51]);
    var panelArea51_dice = new cc.Sprite(this.dice[4]);
    var panelArea51_dice_width = (size.width / 6 - this.gamePanel_border) / 3 * 2;
    panelArea51_dice.attr({
      scaleX: panelArea51_dice_width / panelArea51_dice.getContentSize().width,
      scaleY: panelArea51_dice_width / panelArea51_dice.getContentSize().width,
      x: (size.width / 6 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
    });
    this.panelArea[51].addChild(panelArea51_dice);
    this.panelArea[52] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[52].setPosition(size.width / 6 * 4 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 2 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[52]);
    var panelArea52_dice = new cc.Sprite(this.dice[5]);
    var panelArea52_dice_width = (size.width / 6 - this.gamePanel_border) / 3 * 2;
    panelArea52_dice.attr({
      scaleX: panelArea52_dice_width / panelArea52_dice.getContentSize().width,
      scaleY: panelArea52_dice_width / panelArea52_dice.getContentSize().width,
      x: (size.width / 6 - this.gamePanel_border) / 2,
      y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
    });
    this.panelArea[52].addChild(panelArea52_dice);
    this.panelArea[53] = new cc.LayerColor(cc.color(27, 32, 67), size.width / 6 - this.gamePanel_border / 2, this.gamePanel_height / 71 * 8 - this.gamePanel_border);
    this.panelArea[53].setPosition(size.width / 6 * 5 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 71 * 2 + this.gamePanel_border / 2);
    this.addChild(this.panelArea[53]);
    var panelArea53_dice = new cc.Sprite(this.dice[6]);
    var panelArea53_dice_width = (size.width / 6 - this.gamePanel_border) / 3 * 2;
    panelArea53_dice.attr({
      scaleX: panelArea53_dice_width / panelArea53_dice.getContentSize().width,
      scaleY: panelArea53_dice_width / panelArea53_dice.getContentSize().width,
      x: (size.width / 6 - this.gamePanel_border / 2) / 2,
      y: (this.gamePanel_height / 71 * 8 - this.gamePanel_border) / 2
    });
    this.panelArea[53].addChild(panelArea53_dice);
    this.panelArea[55] = new cc.LayerColor(cc.color(27, 32, 67), size.width, this.gamePanel_height / 71 * 2);
    this.panelArea[55].setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta);
    this.addChild(this.panelArea[55]);
    var panelArea55_label_1 = new cc.LabelTTF("单骰 1:1", "Arial", 10);
    var panelArea55_label_2 = new cc.LabelTTF("双骰 1:2", "Arial", 10);
    var panelArea55_label_3 = new cc.LabelTTF("全骰 1:3", "Arial", 10);
    panelArea55_label_1.attr({
      fillStyle: cc.color(80, 96, 156),
      x: size.width / 6,
      y: panelArea55_label_1.getContentSize().height / 2
    });
    panelArea55_label_2.attr({
      fillStyle: cc.color(80, 96, 156),
      x: size.width / 2,
      y: panelArea55_label_2.getContentSize().height / 2
    });
    panelArea55_label_3.attr({
      fillStyle: cc.color(80, 96, 156),
      x: size.width / 3 * 2 + size.width / 6,
      y: panelArea55_label_3.getContentSize().height / 2
    });
    this.panelArea[55].addChild(panelArea55_label_1);
    this.panelArea[55].addChild(panelArea55_label_2);
    this.panelArea[55].addChild(panelArea55_label_3); // footer

    var betAmountBg = new cc.LayerColor(cc.color(0, 0, 0, 150), size.width, this.betAmountBg_height);
    betAmountBg.setPosition(cc.p(0, this.coinWrapSprite_height - this.betAmountBg_height_delta));
    this.addChild(betAmountBg);
    var betAmountTotalSprite = cc.Sprite.create(res.bet_amount_total_png);
    var betAmountTotalSprite_width = 20;
    var betAmountTotalSprite_height = betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width * betAmountTotalSprite.getContentSize().height;
    var betAmountTotal_RoundRect = new RoundRect(80, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null);
    betAmountTotal_RoundRect.setPosition(paddingX / 4, this.coinWrapSprite_height);
    this.addChild(betAmountTotal_RoundRect);
    betAmountTotalSprite.attr({
      x: betAmountTotalSprite_width / 2 + paddingX / 4,
      y: betAmountTotalSprite_height / 2,
      scaleX: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width,
      scaleY: betAmountTotalSprite_width / betAmountTotalSprite.getContentSize().width
    });
    betAmountTotal_RoundRect.addChild(betAmountTotalSprite);
    var betAmountTotalVal = cc.LabelTTF.create("2000.0", "Arial", 15);
    betAmountTotalVal.attr({
      x: betAmountTotal_RoundRect.getContentSize().width - 30,
      y: betAmountTotalSprite_height / 2,
      fillStyle: cc.color(255, 255, 255)
    });
    betAmountTotal_RoundRect.addChild(betAmountTotalVal);
    this.betAmountToken_RoundRect = new RoundRect(70, betAmountTotalSprite_height + paddingY / 4, cc.color(255, 255, 255, 0), 1, cc.color(255, 255, 255), 10, null);
    this.betAmountToken_RoundRect.setPosition(cc.p(betAmountTotal_RoundRect.getContentSize().width + paddingX / 2, this.coinWrapSprite_height));
    this.addChild(this.betAmountToken_RoundRect);
    var betAmountTokenSprite = cc.Sprite.create(res.bet_amount_token_png);
    var betAmountTokenSprite_height = 15;
    var betAmountTokenSprite_width = betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height * betAmountTokenSprite.getContentSize().height;
    betAmountTokenSprite.attr({
      scaleX: betAmountTokenSprite_width / betAmountTokenSprite.getContentSize().width,
      scaleY: betAmountTokenSprite_height / betAmountTokenSprite.getContentSize().height
    });
    betAmountTokenSprite.setPosition(cc.p(betAmountTokenSprite_width / 2 + paddingX / 4, betAmountTokenSprite_height / 2 + paddingY / 4));
    this.betAmountToken_RoundRect.addChild(betAmountTokenSprite);
    this.betAmountTokenVal = new cc.LabelTTF("0.0", "Arial", 15);
    this.betAmountTokenVal.attr({
      x: this.betAmountToken_RoundRect.getContentSize().width - this.betAmountTokenVal.getContentSize().width,
      y: this.betAmountTokenVal.getContentSize().height / 2 + 1,
      fillStyle: cc.color(255, 255, 255)
    });
    this.betAmountToken_RoundRect.addChild(this.betAmountTokenVal); // cancel button

    this.cancelBtn = new ccui.Button(res.red_btn_png, res.red_btn_png, res.disabled_red_btn_png);
    var cancelBtn_width = 60;
    this.cancelBtn.attr({
      pressedActionEnabled: true,
      x: size.width - cancelBtn_width / 2 - paddingX / 2,
      y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height,
      scaleX: cancelBtn_width / this.cancelBtn.getContentSize().width,
      scaleY: cancelBtn_width / this.cancelBtn.getContentSize().width
    });
    this.cancelBtn.addTouchEventListener(this.removeDealedCoinsByClick, this);
    this.cancelBtn.setEnabled(false); // confirm button

    this.confirmBtn = new ccui.Button(res.green_btn_png, res.green_btn_png, res.disabled_green_btn_png);
    var confirmBtn_width = 60;
    this.confirmBtn.attr({
      pressedActionEnabled: true,
      x: size.width - confirmBtn_width / 2 - cancelBtn_width - paddingX / 2 - paddingX / 2,
      y: betAmountTotalSprite_height / 2 + this.coinWrapSprite_height,
      scaleX: confirmBtn_width / this.confirmBtn.getContentSize().width,
      scaleY: confirmBtn_width / this.confirmBtn.getContentSize().width
    });
    this.confirmBtn.addTouchEventListener(this.showCoinDealCheckDlg, this);
    this.confirmBtn.setEnabled(false); // cancel and confirm button background

    var cancelConfirmBg_height = this.betAmountBg_height;
    var cancelConfirmBg_width = paddingX / 2 + confirmBtn_width + paddingX / 2 + cancelBtn_width + paddingX / 2 + 40;
    var cancelConfirmBg = new RoundRect(cancelConfirmBg_width, cancelConfirmBg_height, cc.color(0, 0, 0, 150), 0, null, 25, RectType.TOP);
    cancelConfirmBg.setPosition(size.width - cancelConfirmBg_width + 40, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta - cancelConfirmBg_height);
    this.addChild(cancelConfirmBg);
    this.addChild(this.cancelBtn);
    this.addChild(this.confirmBtn);
    var coinWrapSprite = cc.Sprite.create(res.coin_wrap_png);
    var coinWrapSprite_width = size.width;
    coinWrapSprite.attr({
      scaleX: coinWrapSprite_width / coinWrapSprite.getContentSize().width,
      scaleY: this.coinWrapSprite_height / coinWrapSprite.getContentSize().height,
      x: coinWrapSprite_width / 2,
      y: this.coinWrapSprite_height / 2
    });
    this.addChild(coinWrapSprite);
    this.coin_width = (size.width - 10 * 8) / 7;
    this.coinImages = [res.coin_sprite_10_png, res.coin_sprite_50_png, res.coin_sprite_100_png, res.coin_sprite_500_png, res.coin_sprite_1000_png, res.coin_sprite_5000_png, res.coin_sprite_10000_png];

    for (var _index30 = 0; _index30 < this.coinImages.length; _index30++) {
      this.coins[_index30] = new ccui.Button(this.coinImages[_index30], this.coinImages[_index30], this.coinImages[_index30]);

      this.coins[_index30].attr({
        x: this.coin_width / 2 + 10 * (_index30 + 1) + this.coin_width * _index30,
        y: this.coin_width / 2 + 10,
        scaleX: this.coin_width / this.coins[_index30].getNormalTextureSize().width,
        scaleY: this.coin_width / this.coins[_index30].getNormalTextureSize().width
      }); // pass enabled coin index by adding object


      this.coins[_index30].setTitleFontSize(cc.size(_index30, _index30));

      this.coins[_index30].setZoomScale(0);

      this.coins[_index30].addTouchEventListener(this.chooseCoin, this);

      this.addChild(this.coins[_index30]);
    }

    this.coinDropListener = cc.EventListener.create({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: function onTouchBegan(touch, event) {
        console.log("coinDropListener called");
        if (!_this.enabledCoinDrop) return;
        var touch_x = touch.getLocation().x;
        var touch_y = touch.getLocation().y;

        if (_this.enabledCoin.findIndex(_this.findTrue) !== -1) {
          if (_this.close_state) {
            var bet_closed_alert = new cc.Sprite(res.bet_closed_alert_png);
            var bet_closed_alert_width = size.width * 3 / 5;
            bet_closed_alert.attr({
              scaleX: bet_closed_alert_width / bet_closed_alert.getContentSize().width,
              scaleY: bet_closed_alert_width / bet_closed_alert.getContentSize().width
            });
            bet_closed_alert.setPosition(cc.p(size.width / 2, size.height / 2));

            _this.addChild(bet_closed_alert, _this.alert_zOrder);

            setTimeout(function () {
              _this.removeChild(bet_closed_alert);
            }, 2000);
            return;
          }

          if (touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + paddingY / 2 || touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height - paddingY) {
            return;
          }

          var coinItem = new cc.Sprite(_this.coinImages[_this.enabledCoin.findIndex(_this.findTrue)]);

          var coinVal = _this.coinImages[_this.enabledCoin.findIndex(_this.findTrue)].replace("res/niuniu/coin-sprite-", "");

          coinVal = Number(coinVal.replace(".png", ""));
          coinItem.attr({
            x: touch_x,
            y: touch_y,
            scaleX: 20 / coinItem.getContentSize().width,
            scaleY: 20 / coinItem.getContentSize().width
          });

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 63 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[0].push(coinVal); // this.panel_ValRoundRect_Label[0].setString(this.sumCoins(this.panel_DealedCoins[0]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 2 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[1].push(coinVal); // this.panel_ValRoundRect_Label[1].setString(this.sumCoins(this.panel_DealedCoins[1]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 2 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 4 * 3 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[2].push(coinVal); // this.panel_ValRoundRect_Label[2].setString(this.sumCoins(this.panel_DealedCoins[2]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 4 * 3 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[3].push(coinVal); // this.panel_ValRoundRect_Label[3].setString(this.sumCoins(this.panel_DealedCoins[3]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 54 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 63 - _this.gamePanel_border / 2 - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 12 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[4].push(coinVal); // this.panel_ValRoundRect_Label[4].setString(this.sumCoins(this.panel_DealedCoins[4]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 12 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[5].push(coinVal); // this.panel_ValRoundRect_Label[5].setString(this.sumCoins(this.panel_DealedCoins[5]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[6].push(coinVal); // this.panel_ValRoundRect_Label[6].setString(this.sumCoins(this.panel_DealedCoins[6]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 12 * 9 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[7].push(coinVal); // this.panel_ValRoundRect_Label[7].setString(this.sumCoins(this.panel_DealedCoins[7]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 12 * 9 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 12 * 10 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[8].push(coinVal); // this.panel_ValRoundRect_Label[5].setString(this.sumCoins(this.panel_DealedCoins[5]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 12 * 10 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 12 * 11 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[9].push(coinVal); // this.panel_ValRoundRect_Label[9].setString(this.sumCoins(this.panel_DealedCoins[9]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 12 * 11 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[10].push(coinVal); // this.panel_ValRoundRect_Label[10].setString(this.sumCoins(this.panel_DealedCoins[10]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 44 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 52 - _this.gamePanel_border / 2 - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 6 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[12].push(coinVal); // this.panel_ValRoundRect_Label[12].setString(this.sumCoins(this.panel_DealedCoins[12]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 * 2 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[13].push(coinVal); // this.panel_ValRoundRect_Label[13].setString(this.sumCoins(this.panel_DealedCoins[13]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 * 2 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 * 3 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[14].push(coinVal); // this.panel_ValRoundRect_Label[14].setString(this.sumCoins(this.panel_DealedCoins[14]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 * 3 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 * 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[15].push(coinVal); // this.panel_ValRoundRect_Label[15].setString(this.sumCoins(this.panel_DealedCoins[15]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 * 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 * 5 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[16].push(coinVal); // this.panel_ValRoundRect_Label[16].setString(this.sumCoins(this.panel_DealedCoins[16]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 * 5 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[17].push(coinVal); // this.panel_ValRoundRect_Label[17].setString(this.sumCoins(this.panel_DealedCoins[17]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 36 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 42 - _this.gamePanel_border / 2 - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 5 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[19].push(coinVal); // this.panel_ValRoundRect_Label[19].setString(this.sumCoins(this.panel_DealedCoins[19]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 2 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[20].push(coinVal); // this.panel_ValRoundRect_Label[20].setString(this.sumCoins(this.panel_DealedCoins[20]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 2 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 3 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[21].push(coinVal); // this.panel_ValRoundRect_Label[21].setString(this.sumCoins(this.panel_DealedCoins[21]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 3 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[22].push(coinVal); // this.panel_ValRoundRect_Label[22].setString(this.sumCoins(this.panel_DealedCoins[22]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[23].push(coinVal); // this.panel_ValRoundRect_Label[23].setString(this.sumCoins(this.panel_DealedCoins[23]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 30 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 36 - _this.gamePanel_border / 2 - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 5 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[24].push(coinVal); // this.panel_ValRoundRect_Label[24].setString(this.sumCoins(this.panel_DealedCoins[24]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 2 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[25].push(coinVal); // this.panel_ValRoundRect_Label[25].setString(this.sumCoins(this.panel_DealedCoins[25]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 2 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 3 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[26].push(coinVal); // this.panel_ValRoundRect_Label[26].setString(this.sumCoins(this.panel_DealedCoins[26]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 3 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[27].push(coinVal); // this.panel_ValRoundRect_Label[27].setString(this.sumCoins(this.panel_DealedCoins[27]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[23].push(coinVal); // this.panel_ValRoundRect_Label[28].setString(this.sumCoins(this.panel_DealedCoins[28]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 24 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 30 - _this.gamePanel_border / 2 - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 5 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[29].push(coinVal); // this.panel_ValRoundRect_Label[29].setString(this.sumCoins(this.panel_DealedCoins[29]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 2 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[30].push(coinVal); // this.panel_ValRoundRect_Label[30].setString(this.sumCoins(this.panel_DealedCoins[30]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 2 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 3 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[31].push(coinVal); // this.panel_ValRoundRect_Label[31].setString(this.sumCoins(this.panel_DealedCoins[31]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 3 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 5 * 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[32].push(coinVal); // this.panel_ValRoundRect_Label[32].setString(this.sumCoins(this.panel_DealedCoins[32]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 5 * 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[33].push(coinVal); // this.panel_ValRoundRect_Label[33].setString(this.sumCoins(this.panel_DealedCoins[33]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 16 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 22 - _this.gamePanel_border / 2 - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 7 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[34].push(coinVal); // this.panel_ValRoundRect_Label[34].setString(this.sumCoins(this.panel_DealedCoins[34]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 2 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[35].push(coinVal); // this.panel_ValRoundRect_Label[35].setString(this.sumCoins(this.panel_DealedCoins[35]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 2 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 3 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[36].push(coinVal); // this.panel_ValRoundRect_Label[36].setString(this.sumCoins(this.panel_DealedCoins[36]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 3 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[37].push(coinVal); // this.panel_ValRoundRect_Label[37].setString(this.sumCoins(this.panel_DealedCoins[37]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 5 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[38].push(coinVal); // this.panel_ValRoundRect_Label[38].setString(this.sumCoins(this.panel_DealedCoins[38]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 5 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 6 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[39].push(coinVal); // this.panel_ValRoundRect_Label[39].setString(this.sumCoins(this.panel_DealedCoins[39]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 6 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[40].push(coinVal); // this.panel_ValRoundRect_Label[40].setString(this.sumCoins(this.panel_DealedCoins[40]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 10 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 16 - _this.gamePanel_border / 2 - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 7 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[41].push(coinVal); // this.panel_ValRoundRect_Label[41].setString(this.sumCoins(this.panel_DealedCoins[41]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 2 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[42].push(coinVal); // this.panel_ValRoundRect_Label[42].setString(this.sumCoins(this.panel_DealedCoins[42]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 2 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 3 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[43].push(coinVal); // this.panel_ValRoundRect_Label[43].setString(this.sumCoins(this.panel_DealedCoins[43]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 3 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[44].push(coinVal); // this.panel_ValRoundRect_Label[44].setString(this.sumCoins(this.panel_DealedCoins[44]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 5 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[45].push(coinVal); // this.panel_ValRoundRect_Label[45].setString(this.sumCoins(this.panel_DealedCoins[45]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 5 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 7 * 6 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[46].push(coinVal); // this.panel_ValRoundRect_Label[46].setString(this.sumCoins(this.panel_DealedCoins[46]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 7 * 6 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[47].push(coinVal); // this.panel_ValRoundRect_Label[47].setString(this.sumCoins(this.panel_DealedCoins[47]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 2 + _this.gamePanel_border / 2 + paddingY / 2 && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 71 * 10 - _this.gamePanel_border / 2 - paddingY / 2) {
            if (touch_x > 0 && touch_x < size.width / 6 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[48].push(coinVal); // this.panel_ValRoundRect_Label[48].setString(this.sumCoins(this.panel_DealedCoins[48]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 * 2 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[49].push(coinVal); // this.panel_ValRoundRect_Label[49].setString(this.sumCoins(this.panel_DealedCoins[49]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 * 2 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 * 3 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[50].push(coinVal); // this.panel_ValRoundRect_Label[50].setString(this.sumCoins(this.panel_DealedCoins[50]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 * 3 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 * 4 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[51].push(coinVal); // this.panel_ValRoundRect_Label[51].setString(this.sumCoins(this.panel_DealedCoins[51]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 * 4 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width / 6 * 5 - _this.gamePanel_border / 2 - paddingX / 2) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[52].push(coinVal); // this.panel_ValRoundRect_Label[52].setString(this.sumCoins(this.panel_DealedCoins[52]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 6 * 5 + _this.gamePanel_border / 2 + paddingX / 2 && touch_x < size.width) {
              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel_DealedCoins[53].push(coinVal); // this.panel_ValRoundRect_Label[53].setString(this.sumCoins(this.panel_DealedCoins[53]))


              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          var num_dealedCoins = 0;
          var sum_dealedCoins = 0;

          for (var _index31 = 0; _index31 < _this.panel_DealedCoins.length; _index31++) {
            num_dealedCoins = num_dealedCoins + _this.panel_DealedCoins[_index31].length;
            sum_dealedCoins = sum_dealedCoins + _this.sumCoins(_this.panel_DealedCoins[_index31]);
          }

          if (num_dealedCoins !== 0) {
            _this.cancelBtn.setEnabled(true);

            _this.confirmBtn.setEnabled(true);
          }
        }
      }
    });
    cc.eventManager.addListener(this.coinDropListener, this);
    var diceTime = 5000;
    var diceInterval = setInterval(function () {
      var resultDice_width = 50;

      if (diceTime == 0) {
        return;
      }

      for (var _index32 = 0; _index32 < 3; _index32++) {
        _this.resultDice[_index32] = new cc.Sprite(_this.dice[Math.floor(Math.random() * 6) + 1]);

        _this.resultDice[_index32].attr({
          scaleX: resultDice_width / _this.resultDice[_index32].getContentSize().width,
          scaleY: resultDice_width / _this.resultDice[_index32].getContentSize().width,
          x: cc.winSize.width / 2 + (_index32 - 1) * (resultDice_width + paddingX),
          y: cc.winSize.height - _this.header_height - _this.banner_height / 2
        });

        _this.addChild(_this.resultDice[_index32]);
      }

      diceTime = diceTime - 200;
    }, 200); // betOpenInterval function called for counting seconds

    this.betOpenInterval();
  },
  findTrue: function findTrue(ele) {
    return ele == true;
  },
  sleep: function sleep(milliseconds) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, milliseconds);
    });
  },
  generateRandomNumArray: function generateRandomNumArray(min, max, count) {
    var random_number_array = [];

    for (var index = min; index <= max; index++) {
      var random_integer = Math.floor(Math.random() * (max - min + 1)) + min;
      if (count == index - min) break;

      if (random_number_array.filter(function (item) {
        return item === random_integer;
      }).length === 0) {
        random_number_array.push(random_integer);
      } else {
        index = index - 1;
      }
    }

    return random_number_array;
  },
  sumCoins: function sumCoins(arrayVal) {
    var sum = 0;

    for (var index = 0; index < arrayVal.length; index++) {
      sum = sum + arrayVal[index];
    }

    return sum;
  },
  displaySerialPanel: function displaySerialPanel() {
    var size = cc.winSize;
    var paddingX = 20;
    var paddingY = 20;
    var serial_num_height = 20;
    this.serial_num_panel = new cc.LayerColor(cc.color(0, 0, 0, 0), serial_num_height * 10 + paddingX / 5 * 9, serial_num_height);
    this.serial_num_panel.setPosition(paddingX / 2, size.height - serial_num_height - paddingY / 4);
    this.addChild(this.serial_num_panel);
    this.lucky_num = this.generateRandomNumArray(1, 10, 3);

    for (var index = 0; index < 3; index++) {
      this.serial_num[index] = new cc.Sprite(this.circleColors[index]);
      var serial_num_scale = serial_num_height / this.serial_num[index].getContentSize().width;
      this.serial_num[index].attr({
        scaleX: serial_num_scale,
        scaleY: serial_num_scale
      });
      this.serial_num[index].setPosition(serial_num_height / 2, serial_num_height / 2);
      var lucky_numLabel = new cc.LabelTTF(String(this.lucky_num[index]), "Arial", 35);
      lucky_numLabel.attr({
        fillStyle: cc.color(255, 255, 255)
      });
      lucky_numLabel.enableStroke(cc.color(0, 0, 0), 2);
      lucky_numLabel.setPosition(serial_num_height / (2 * serial_num_scale), serial_num_height / (2 * serial_num_scale) - lucky_numLabel.getContentSize().height / 2 * serial_num_scale);
      this.serial_num_panel.addChild(this.serial_num[index]);
      this.serial_num[index].addChild(lucky_numLabel);
      var moveByAction = new cc.MoveBy(1, cc.p((serial_num_height + paddingX / 4) * index, 0));
      this.serial_num[index].runAction(cc.EaseBackInOut.create(moveByAction));
    }
  },
  gotoHome: function gotoHome(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("gotoHome");
        cc.audioEngine.playEffect(home_res.game_item_mp3);
        this.removeDealedCoins();
        cc.audioEngine.end();
        cc.director.popScene();
        cc.director.pushScene(new cc.TransitionFade(1.0, new HomeScene()));
        break;
    }
  },
  showHelp: function showHelp(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        cc.audioEngine.playEffect(home_res.game_item_mp3);
        cc.director.pushScene(new cc.TransitionFade(1.0, new SicboHelpScene()));
        break;
    }
  },
  enableSoundOnMethod: function enableSoundOnMethod(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        cc.audioEngine.playEffect(home_res.game_item_mp3);

        if (this.enableSoundOn) {
          this.soundOnBtn.loadTextureNormal(res.sound_off_btn_png);
          this.enableSoundOn = !this.enableSoundOn;
          cc.audioEngine.setEffectsVolume(0);
          cc.audioEngine.setMusicVolume(0);
          return;
        } else {
          this.soundOnBtn.loadTextureNormal(res.sound_on_btn_png);
          this.enableSoundOn = !this.enableSoundOn;
          cc.audioEngine.setMusicVolume(1);
          cc.audioEngine.setEffectsVolume(1);
          return;
        }

        break;
    }
  },
  chooseCoin: function chooseCoin(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("choosecoin called");
        cc.audioEngine.playEffect(res.choose_coin_wav);

        for (var index = 0; index < this.coins.length; index++) {
          this.coins[index].attr({
            scaleX: this.coin_width / this.coins[index].getNormalTextureSize().width,
            scaleY: this.coin_width / this.coins[index].getNormalTextureSize().width
          });
        }

        if (this.enabledCoin.findIndex(this.findTrue) === sender.getTitleFontSize().height) {
          this.enabledCoin.fill(false);
          sender.attr({
            scaleX: this.coin_width / sender.getNormalTextureSize().width,
            scaleY: this.coin_width / sender.getNormalTextureSize().width
          });
          return;
        }

        this.enabledCoin.fill(false);
        sender.attr({
          scaleX: (this.coin_width + 10) / sender.getNormalTextureSize().width,
          scaleY: (this.coin_width + 10) / sender.getNormalTextureSize().width
        });
        this.enabledCoin[sender.getTitleFontSize().height] = true;
        break;
    }
  },
  removeDealedCoinsByClick: function removeDealedCoinsByClick(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        this.removeDealedCoins();
    }
  },
  removeDealedCoins: function removeDealedCoins() {
    console.log("remove dealed coins");
    var num_dealedCoins = 0;

    for (var index = 0; index < this.panel_DealedCoins.length; index++) {
      num_dealedCoins = num_dealedCoins + this.panel_DealedCoins[index].length;
      this.panel_DealedCoins[index] = [];
    }

    for (var _index33 = 0; _index33 < num_dealedCoins; _index33++) {
      this.removeChildByTag(this.dealedCoins_tag);
    }

    this.betAmountTokenVal.setString("0.0");

    for (var _index34 = 0; _index34 < this.panelArea.length; _index34++) {
      this.panelArea[_index34].removeChild(this.panel_ValRoundRect[_index34]);
    }

    this.confirmBtn.setEnabled(false);
    this.cancelBtn.setEnabled(false);
  },
  enableAllBtn: function enableAllBtn() {
    this.enabledCoinDrop = true;
    this.goHomeBtn.setEnabled(true);
    this.soundOnBtn.setEnabled(true);
    this.helpBtn.setEnabled(true);
    this.historyBtn.setEnabled(true);
    var num_dealedCoins = 0;

    for (var index = 0; index < this.panel_DealedCoins.length; index++) {
      num_dealedCoins = num_dealedCoins + this.panel_DealedCoins[index].length;
    }

    if (num_dealedCoins !== 0) {
      this.cancelBtn.setEnabled(true);
      this.confirmBtn.setEnabled(true);
    }

    for (var _index35 = 0; _index35 < this.coins.length; _index35++) {
      this.coins[_index35].setEnabled(true);
    }
  },
  disableAllBtn: function disableAllBtn() {
    this.enabledCoinDrop = false;
    this.goHomeBtn.setEnabled(false);
    this.soundOnBtn.setEnabled(false);
    this.helpBtn.setEnabled(false);
    this.historyBtn.setEnabled(false);
    this.cancelBtn.setEnabled(false);
    this.confirmBtn.setEnabled(false);

    for (var index = 0; index < this.coins.length; index++) {
      this.coins[index].setEnabled(false);
    }
  },
  showCoinDealCheckDlg: function showCoinDealCheckDlg(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("showcoindealcheckdlg");
        this.disableAllBtn(); // coinDealCheckDlg

        var paddingX = 20;
        var paddingY = 20;
        this.coinDealCheckDlg_overLay = new cc.LayerColor(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height);
        this.addChild(this.coinDealCheckDlg_overLay, this.overLay_zOrder);
        this.coinDealCheckDlg_zOrder = this.overLay_zOrder + 1;
        var coinDealCheckDlg_height = 170;
        var coinDealCheckDlg_width = cc.winSize.width - paddingX * 3;
        this.coinDealCheckDlg = new RoundRect(coinDealCheckDlg_width, coinDealCheckDlg_height, cc.color(0, 0, 0), 0, null, 10, null);
        var coinDealCheckDlg_y = cc.winSize.height / 2 - coinDealCheckDlg_height / 2;
        this.coinDealCheckDlg.setPosition(cc.p(paddingX * 3 / 2, coinDealCheckDlg_y));
        this.addChild(this.coinDealCheckDlg, this.coinDealCheckDlg_zOrder);
        var betAmountTokenSprite1 = cc.Sprite.create(res.bet_amount_token_png);
        var betAmountTokenSprite1_height = 20;
        var betAmountTokenSprite1_width = betAmountTokenSprite1_height / betAmountTokenSprite1.getContentSize().height * betAmountTokenSprite1.getContentSize().height;
        var betOrderConfirmLabel = new cc.LabelTTF("确认下注单", "Arial", 16);
        betAmountTokenSprite1.attr({
          scaleX: betAmountTokenSprite1_width / betAmountTokenSprite1.getContentSize().width,
          scaleY: betAmountTokenSprite1_height / betAmountTokenSprite1.getContentSize().height
        });
        betOrderConfirmLabel.attr({
          fillStyle: cc.color(255, 255, 255)
        });
        betAmountTokenSprite1.setPosition(cc.p(this.coinDealCheckDlg.getContentSize().width / 2 - (betAmountTokenSprite1_width + paddingX / 2 + betOrderConfirmLabel.getContentSize().width) / 2, coinDealCheckDlg_height - betAmountTokenSprite1_height / 2 - paddingY + 2));
        betOrderConfirmLabel.setPosition(cc.p(this.coinDealCheckDlg.getContentSize().width / 2 - (betAmountTokenSprite1_width + paddingX / 2 + betOrderConfirmLabel.getContentSize().width) / 2 + paddingX / 2 + betOrderConfirmLabel.getContentSize().width / 2 + paddingX / 2, coinDealCheckDlg_height - betAmountTokenSprite1_height / 2 - paddingY + 2));
        this.coinDealCheckDlg.addChild(betAmountTokenSprite1, this.coinDealCheckDlg_zOrder);
        this.coinDealCheckDlg.addChild(betOrderConfirmLabel, this.coinDealCheckDlg_zOrder);
        var totalfieldLabel = new cc.LabelTTF("总金额:", "Arial", 18);
        totalfieldLabel.attr({
          fillStyle: cc.color(255, 255, 255),
          x: paddingX / 2 + totalfieldLabel.getContentSize().width / 2,
          y: coinDealCheckDlg_height - paddingY * 4
        });
        this.coinDealCheckDlg.addChild(totalfieldLabel);
        var totalfieldRoundRect_width = 120;
        var totalfieldRoundRect_height = 20;
        var totalfieldRoundRect = new RoundRect(totalfieldRoundRect_width, totalfieldRoundRect_height, cc.color(59, 112, 128), 0, null, 10, null);
        totalfieldRoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - totalfieldRoundRect_width, coinDealCheckDlg_height - paddingY * 4 - 7));
        this.coinDealCheckDlg.addChild(totalfieldRoundRect);
        var sumDealedCoins = 0;

        for (var index = 0; index < this.panel_DealedCoins.length; index++) {
          sumDealedCoins = sumDealedCoins + this.sumCoins(this.panel_DealedCoins[index]);
        }

        var totalfieldVal = new cc.LabelTTF(sumDealedCoins.toString(), "Arial", 18);
        totalfieldVal.attr({
          fillStyle: cc.color(255, 255, 255),
          x: totalfieldRoundRect_width / 2,
          y: totalfieldRoundRect_height / 2 - 3
        });
        totalfieldRoundRect.addChild(totalfieldVal);
        var dlgBtnBg_height = 70;
        var dlgBtnBg = new RoundRect(cc.winSize.width - paddingX * 3, dlgBtnBg_height, cc.color(255, 255, 255), 0, null, 10, RectType.BOTTOM);
        dlgBtnBg.setPosition(cc.p(0, 0));
        this.coinDealCheckDlg.addChild(dlgBtnBg, this.coinDealCheckDlg_zOrder);
        this.coinDealCheckDlgYesBtn = new ccui.Button(res.dlg_yes_btn_png, res.dlg_yes_btn_png, res.dlg_yes_btn_png);
        var coinDealCheckDlgYesBtn_width = 70;
        this.coinDealCheckDlgYesBtn.attr({
          pressedActionEnabled: true,
          scaleX: coinDealCheckDlgYesBtn_width / this.coinDealCheckDlgYesBtn.getContentSize().width,
          scaleY: coinDealCheckDlgYesBtn_width / this.coinDealCheckDlgYesBtn.getContentSize().width
        });
        this.coinDealCheckDlgNoBtn = new ccui.Button(res.dlg_no_btn_png, res.dlg_no_btn_png, res.dlg_no_btn_png);
        var coinDealCheckDlgNoBtn_width = 70;
        this.coinDealCheckDlgNoBtn.attr({
          pressedActionEnabled: true,
          scaleX: coinDealCheckDlgNoBtn_width / this.coinDealCheckDlgNoBtn.getContentSize().width,
          scaleY: coinDealCheckDlgNoBtn_width / this.coinDealCheckDlgNoBtn.getContentSize().width
        });
        this.coinDealCheckDlgYesBtn.setPosition(cc.p(coinDealCheckDlgYesBtn_width / 2 + coinDealCheckDlg_width / 2 - coinDealCheckDlgYesBtn_width - paddingX / 2, this.coinDealCheckDlgYesBtn.getContentSize().height / 2 + dlgBtnBg_height / 2 - this.coinDealCheckDlgYesBtn.getContentSize().height / 2));
        this.coinDealCheckDlgNoBtn.setPosition(cc.p(coinDealCheckDlgNoBtn_width / 2 + coinDealCheckDlg_width / 2 + paddingX / 2, this.coinDealCheckDlgNoBtn.getContentSize().height / 2 + dlgBtnBg_height / 2 - this.coinDealCheckDlgNoBtn.getContentSize().height / 2));
        this.coinDealCheckDlgYesBtn.addTouchEventListener(this.showCheckSuccessDlg, this);
        this.coinDealCheckDlgNoBtn.addTouchEventListener(this.showDealCancelDlg, this);
        this.coinDealCheckDlg.addChild(this.coinDealCheckDlgYesBtn, this.coinDealCheckDlg_zOrder);
        this.coinDealCheckDlg.addChild(this.coinDealCheckDlgNoBtn, this.coinDealCheckDlg_zOrder);
        break;
    }
  },
  showCheckSuccessDlg: function showCheckSuccessDlg(sender, type) {
    var _this2 = this;

    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("showCheckSuccessDlg");
        var paddingX = 20;
        var paddingY = 20;
        var checkSuccessDlg_zOrder = this.coinDealCheckDlg_zOrder + 1;
        this.checkSuccessDlg_overLay = new cc.LayerColor(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height);
        this.addChild(this.checkSuccessDlg_overLay, checkSuccessDlg_zOrder);
        var checkSuccessDlg_height = 120;
        this.checkSuccessDlg = new RoundRect(cc.winSize.width - paddingX * 3, checkSuccessDlg_height, cc.color(255, 255, 255), 0, null, 10, null);
        this.checkSuccessDlg.setPosition(cc.p(paddingX * 3 / 2, cc.winSize.height / 2 - checkSuccessDlg_height / 2));
        this.addChild(this.checkSuccessDlg, checkSuccessDlg_zOrder);
        var checkSuccessDlgLabel = new cc.LabelTTF("下注成功", "Arial", 15);
        checkSuccessDlgLabel.attr({
          fillStyle: cc.color(0, 0, 0),
          x: this.checkSuccessDlg.getContentSize().width / 2,
          y: checkSuccessDlg_height / 2 - checkSuccessDlgLabel.getContentSize().height / 2 + paddingY
        });
        this.checkSuccessDlg.addChild(checkSuccessDlgLabel);
        var dlgYesBtn = new ccui.Button(res.green_rounded_bg_rect_png, res.green_rounded_bg_rect_png, res.green_rounded_bg_rect_png);
        var dlgYesBtn_width = 100;
        var dlgYesBtn_time = 5;
        dlgYesBtn.attr({
          pressedActionEnabled: true,
          scaleX: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
          scaleY: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
          x: this.checkSuccessDlg.getContentSize().width / 2,
          y: paddingY / 2 + dlgYesBtn_width / dlgYesBtn.getContentSize().width * dlgYesBtn.getContentSize().height / 2
        });
        dlgYesBtn.setTitleText("确定(" + dlgYesBtn_time + ")");
        dlgYesBtn.setTitleFontSize(40);
        dlgYesBtn.setTitleColor(cc.color(0, 0, 0));
        dlgYesBtn.addTouchEventListener(this.closeCheckSuccessDlg, this);
        this.checkSuccessDlg.addChild(dlgYesBtn);
        this.checkSuccessDlg_interval = setInterval(function () {
          if (dlgYesBtn_time == 0) {
            clearInterval(_this2.checkSuccessDlg_interval);

            _this2.removeChild(_this2.checkSuccessDlg);

            _this2.removeChild(_this2.checkSuccessDlg_overLay);

            _this2.removeChild(_this2.coinDealCheckDlg);

            _this2.removeChild(_this2.coinDealCheckDlg_overLay);

            _this2.enableAllBtn();

            for (var index = 0; index < _this2.panel_ValRoundRect.length; index++) {
              if (_this2.panel_ValRoundRect_Label[index] !== null && _this2.panel_ValRoundRect_Label[index] !== undefined) {
                _this2.panel_ValRoundRect_Label[index].setColor(cc.color(34, 162, 211));
              }
            }
          }

          dlgYesBtn_time = dlgYesBtn_time - 1;
          dlgYesBtn.setTitleText("确定(" + dlgYesBtn_time + ")");
        }, 1000);
        this.coinDealCheckDlgYesBtn.setEnabled(false);
        this.coinDealCheckDlgNoBtn.setEnabled(false);
    }
  },
  closeCheckSuccessDlg: function closeCheckSuccessDlg(sender, type) {
    var _this3 = this;

    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("closeCheckSuccessDlg");
        clearInterval(this.checkSuccessDlg_interval);
        this.removeChild(this.checkSuccessDlg);
        this.removeChild(this.checkSuccessDlg_overLay);
        this.removeChild(this.coinDealCheckDlg);
        this.removeChild(this.coinDealCheckDlg_overLay); // for (let index = 0; index < this.panel_ValRoundRect.length; index++) {
        //     if (this.panel_ValRoundRect_Label[index] !== null && this.panel_ValRoundRect_Label[index] !== undefined) {
        //         this.panel_ValRoundRect_Label[index].setColor(cc.color(34, 162, 211))
        //     }
        // }

        setTimeout(function () {
          _this3.enableAllBtn();
        }, 50);
    }
  },
  showDealCancelDlg: function showDealCancelDlg(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("showDealCancelDlg");
        this.disableAllBtn();
        var paddingX = 20;
        var paddingY = 20;
        var dealCancelDlg_zOrder = this.coinDealCheckDlg_zOrder + 1;
        var dealCancelDlg_height = 120;
        this.dealCancelDlg_overLay = new cc.LayerColor(cc.color(0, 0, 0, 100), cc.winSize.width, cc.winSize.height);
        this.addChild(this.dealCancelDlg_overLay, dealCancelDlg_zOrder);
        this.dealCancelDlg = new RoundRect(cc.winSize.width - paddingX * 3, dealCancelDlg_height, cc.color(255, 255, 255), 0, null, 10, null);
        this.dealCancelDlg.setPosition(cc.p(paddingX * 3 / 2, cc.winSize.height / 2 - dealCancelDlg_height / 2));
        this.addChild(this.dealCancelDlg, dealCancelDlg_zOrder);
        var dealCancelDlgLabel = new cc.LabelTTF("你确定取消下注吗？", "Arial", 15);
        dealCancelDlgLabel.attr({
          fillStyle: cc.color(0, 0, 0),
          x: this.dealCancelDlg.getContentSize().width / 2,
          y: dealCancelDlg_height / 2 - dealCancelDlgLabel.getContentSize().height / 2 + paddingY
        });
        this.dealCancelDlg.addChild(dealCancelDlgLabel, dealCancelDlg_zOrder);
        var dlgYesBtn = new ccui.Button(res.dlg_yes_btn_png, res.dlg_yes_btn_png, res.dlg_yes_btn_png);
        var dlgYesBtn_width = 70;
        dlgYesBtn.attr({
          pressedActionEnabled: true,
          scaleX: dlgYesBtn_width / dlgYesBtn.getContentSize().width,
          scaleY: dlgYesBtn_width / dlgYesBtn.getContentSize().width
        });
        var dlgNoBtn = new ccui.Button(res.dlg_no_btn_png, res.dlg_no_btn_png, res.dlg_no_btn_png);
        var dlgNoBtn_width = 70;
        dlgNoBtn.attr({
          pressedActionEnabled: true,
          scaleX: dlgNoBtn_width / dlgNoBtn.getContentSize().width,
          scaleY: dlgNoBtn_width / dlgNoBtn.getContentSize().width
        });
        dlgYesBtn.setPosition(cc.p(dlgYesBtn_width / 2 + this.dealCancelDlg.getContentSize().width / 2 - dlgYesBtn_width - paddingX / 2, dlgYesBtn_width / dlgYesBtn.getContentSize().width * dlgYesBtn.getContentSize().height / 2 + paddingY / 2));
        dlgNoBtn.setPosition(cc.p(dlgNoBtn_width / 2 + this.dealCancelDlg.getContentSize().width / 2 + paddingX / 2, dlgYesBtn_width / dlgYesBtn.getContentSize().width * dlgYesBtn.getContentSize().height / 2 + paddingY / 2));
        dlgYesBtn.addTouchEventListener(this.cancelDealedCoins, this);
        dlgNoBtn.addTouchEventListener(this.closeCancelDlg, this);
        this.dealCancelDlg.addChild(dlgYesBtn, this.coinDealCheckDlg_zOrder);
        this.dealCancelDlg.addChild(dlgNoBtn, this.coinDealCheckDlg_zOrder); // disable coinDealCheckDlg

        this.coinDealCheckDlgYesBtn.setEnabled(false);
        this.coinDealCheckDlgYesBtn.setTouchEnabled(false);
        this.coinDealCheckDlgNoBtn.setEnabled(false);
        this.coinDealCheckDlgNoBtn.setTouchEnabled(false);
    }
  },
  cancelDealedCoins: function cancelDealedCoins(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("cancelDealedCoins");
        this.removeChild(this.dealCancelDlg);
        this.removeChild(this.dealCancelDlg_overLay);
        this.coinDealCheckDlgYesBtn.setTouchEnabled(true);
        this.coinDealCheckDlgNoBtn.setTouchEnabled(true);
        this.removeChild(this.coinDealCheckDlg);
        this.removeChild(this.coinDealCheckDlg_overLay);
        this.enableAllBtn();
    }
  },
  closeCancelDlg: function closeCancelDlg(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("closeCancelDlg");
        this.enabledCoinDrop = true;
        this.removeChild(this.dealCancelDlg);
        this.removeChild(this.dealCancelDlg_overLay);
        this.coinDealCheckDlgYesBtn.setEnabled(true);
        this.coinDealCheckDlgYesBtn.setTouchEnabled(true);
        this.coinDealCheckDlgNoBtn.setEnabled(true);
        this.coinDealCheckDlgNoBtn.setTouchEnabled(true);
        break;
    }
  },
  betOpenInterval: function betOpenInterval() {
    var _this4 = this;

    var bet_start_alert, bet_start_alert_width, close_second, countCloseSecond;
    return regeneratorRuntime.async(function betOpenInterval$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            this.open_state = true;
            this.close_state = false; // update cardcountval

            this.cardCountVal_num = this.cardCountVal_num + 1;
            this.cardCountVal.setString(this.cardCountVal_num + "/" + 52 * 8);
            bet_start_alert = new cc.Sprite(res.bet_start_alert_png);
            bet_start_alert_width = cc.winSize.width / 5 * 3;
            bet_start_alert.attr({
              scaleX: bet_start_alert_width / bet_start_alert.getContentSize().width,
              scaleY: bet_start_alert_width / bet_start_alert.getContentSize().width
            });
            bet_start_alert.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
            this.addChild(bet_start_alert, this.alert_zOrder);
            setTimeout(function () {
              _this4.removeChild(bet_start_alert);
            }, 2000);
            _context2.next = 12;
            return regeneratorRuntime.awrap(this.sleep(2000));

          case 12:
            close_second = 20;
            countCloseSecond = setInterval(function _callee() {
              var bet_stop_alert, bet_stop_alert_width;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(close_second == 0)) {
                        _context.next = 6;
                        break;
                      }

                      clearInterval(countCloseSecond);
                      _this4.close_state = true;
                      _context.next = 5;
                      return regeneratorRuntime.awrap(_this4.drawInterval());

                    case 5:
                      return _context.abrupt("return");

                    case 6:
                      close_second = close_second - 1;

                      if (close_second < 10) {
                        _this4.infoText.setString("距封盘时间 00:0" + close_second);

                        if (close_second == 1) {
                          bet_stop_alert = new cc.Sprite(res.bet_stop_alert_png);
                          bet_stop_alert_width = cc.winSize.width / 5 * 3;
                          bet_stop_alert.attr({
                            scaleX: bet_stop_alert_width / bet_stop_alert.getContentSize().width,
                            scaleY: bet_stop_alert_width / bet_stop_alert.getContentSize().width
                          });
                          bet_stop_alert.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));

                          _this4.addChild(bet_stop_alert, _this4.alert_zOrder);

                          setTimeout(function () {
                            _this4.removeChild(bet_stop_alert);

                            _this4.open_state = false;
                          }, 2000);
                        }
                      } else {
                        _this4.infoText.setString("距封盘时间 00:" + close_second);
                      }

                    case 8:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }, 1000);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  },
  drawInterval: function drawInterval() {
    var _this5 = this;

    console.log("drawInterval called");
    var size = cc.winSize;
    var paddingX = 20;
    var paddingY = 20;
    var draw_second = 10;
    this.cancelBtn.setEnabled(false);
    this.confirmBtn.setEnabled(false);
    var countDrawSecond = setInterval(function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(draw_second == 0)) {
                _context3.next = 12;
                break;
              }

              clearInterval(countDrawSecond);

              _this5.infoText.setString("开奖中");

              _this5.panelArea[1].setOpacity(50);

              _this5.panelArea[3].setOpacity(50);

              _context3.next = 7;
              return regeneratorRuntime.awrap(_this5.sleep(5000));

            case 7:
              _this5.removeDealedCoins();

              _this5.panelArea[1].setOpacity(255);

              _this5.panelArea[3].setOpacity(255);

              _this5.betOpenInterval();

              return _context3.abrupt("return");

            case 12:
              draw_second = draw_second - 1;
              if (draw_second < 10) _this5.infoText.setString("距开奖时间 00:0" + draw_second);else _this5.infoText.setString("距开奖时间 00:" + draw_second);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      });
    }, 1000);
  }
});
var SicboGameScene = cc.Scene.extend({
  onEnter: function onEnter() {
    this._super();

    var gameLayer = new SicboGameLayer();
    this.addChild(gameLayer);
  }
});
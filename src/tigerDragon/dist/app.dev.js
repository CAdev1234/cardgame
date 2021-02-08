"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LonghuGameLayer = cc.Layer.extend({
  circleColors: [],
  cards: [],
  alert_zOrder: 100,
  header_height: null,
  serial_num_panel: null,
  serial_num: [],
  coinWrapSprite_height: null,
  betAmountBg_height: null,
  betAmountBg_height_delta: null,
  banner_height: null,
  wenluBtn: null,
  wenluPanel_zOrder: 8,
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
  panelArea1: null,
  panelArea2: null,
  panelArea3: null,
  panel1_DealedCoins: [],
  panel2_DealedCoins: [],
  panel3_DealedCoins: [],
  betAmountToken_RoundRect: null,
  betAmountTokenVal: null,
  cancelBtn: null,
  confirmBtn: null,
  coin_width: null,
  coinImages: [],
  coins: [],
  enabledCoin: [],
  enabledCoinDrop: true,
  dealedCoins_tag: 2,
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
  close_state: false,
  cardBack: [],
  cardBack_height: null,
  resultCard: [],
  ctor: function ctor() {
    var _this = this;

    this._super();

    var size = cc.winSize;
    var paddingY = 20;
    var paddingX = 20;
    this.enabledCoin.fill(false); // load circle color image using batchNode

    var circleColors_cache = cc.spriteFrameCache.addSpriteFrames(res.circle_color_plist);
    var circleColors_sheet = new cc.SpriteBatchNode(res.circle_color_png);

    for (var index = 0; index < 10; index++) {
      var circleColors_name = "circle-color-" + index + ".png";
      var circleColors_frame = cc.spriteFrameCache.getSpriteFrame(circleColors_name);
      this.circleColors.push(circleColors_frame);
    } // store card image using batchNode


    var cardType = ["C", "D", "H", "S"];
    this.cardWidth = 50;
    var card_cache = cc.spriteFrameCache.addSpriteFrames(res.card_sheet_plist);
    var card_sheet = new cc.SpriteBatchNode(res.card_sheet_png);

    for (var _index = 0; _index < 13; _index++) {
      for (var indexi = 0; indexi < cardType.length; indexi++) {
        var cardName = "card" + (_index + 1).toString() + cardType[indexi] + ".png";
        var card_frame = cc.spriteFrameCache.getSpriteFrame(cardName);
        this.cards.push(card_frame);
      }
    } // header


    this.header_height = 40;
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

    var bannerSprite = new cc.Sprite(baccarat_res.banner_png);
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
    var wenluBtn_width = 26;
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
    var historyBtn_width = 26;
    this.historyBtn.attr({
      pressedActionEnabled: true,
      scaleX: historyBtn_width / this.historyBtn.getContentSize().width,
      scaleY: historyBtn_width / this.historyBtn.getContentSize().width
    });
    this.historyBtn.setPosition(cc.p(size.width - historyBtn_width / 2, size.height - this.header_height - this.banner_height / 2 + 10));
    this.historyBtn.setZoomScale(0.05);
    this.historyBtn.addTouchEventListener(this.showHistory, this);
    this.addChild(this.historyBtn);
    var crossLine1 = new cc.LayerColor(cc.color(255, 255, 255, 150), size.width / 3 * 2, 2);
    crossLine1.setPosition(size.width / 6, size.height - this.header_height - this.banner_height / 3);
    this.addChild(crossLine1);
    var crossLine2 = new cc.LayerColor(cc.color(255, 255, 255, 150), 2, this.banner_height / 3 * 2);
    crossLine2.setPosition(size.width / 2, size.height - this.header_height - paddingY * 2 - this.banner_height / 3 * 2);
    this.addChild(crossLine2);
    var bannerLabel1 = new cc.LabelTTF("龙", "Arial", 30);
    bannerLabel1.attr({
      fillStyle: cc.color(255, 0, 0),
      x: size.width / 3,
      y: size.height - this.header_height - this.banner_height / 3 + bannerLabel1.getContentSize().height / 2
    });
    this.addChild(bannerLabel1);
    var bannerLabel2 = new cc.LabelTTF("虎", "Arial", 30);
    bannerLabel2.attr({
      fillStyle: cc.color(32, 93, 199),
      x: size.width / 6 * 4,
      y: size.height - this.header_height - this.banner_height / 3 + bannerLabel2.getContentSize().height / 2
    });
    this.addChild(bannerLabel2);
    this.displayCardBack(); // card count added

    var cardCountSprite = new cc.Sprite(baccarat_res.card_count_png);
    var cardCountSprite_width = 35;
    cardCountSprite.attr({
      scaleX: cardCountSprite_width / cardCountSprite.getContentSize().width,
      scaleY: cardCountSprite_width / cardCountSprite.getContentSize().height,
      x: paddingX / 4 + cardCountSprite_width / 2,
      y: size.height - this.header_height - paddingY
    });
    this.addChild(cardCountSprite);
    this.cardCountVal_num = 333;
    this.cardCountVal = new cc.LabelTTF(this.cardCountVal_num + "/" + 8 * 52, "Arial", 15);
    this.cardCountVal.attr({
      fillStyle: cc.color(255, 255, 255),
      x: this.cardCountVal.getContentSize().width / 2 + paddingX / 4 + cardCountSprite_width,
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
    this.panelArea1 = new cc.LayerColor(cc.color(27, 32, 67), size.width, this.gamePanel_height / 2 - this.gamePanel_border / 2);
    this.panelArea1.setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta + this.gamePanel_height / 2 + this.gamePanel_border / 2);
    this.addChild(this.panelArea1);
    var panelArea1Label = new cc.LabelTTF("和", "Arial", 40);
    panelArea1Label.attr({
      fillStyle: cc.color(93, 201, 97),
      x: size.width / 2,
      y: (this.gamePanel_height / 2 - this.gamePanel_border / 2) / 2
    });
    this.panelArea1.addChild(panelArea1Label);
    var panelArea1_rate = new cc.LabelTTF("1 : 8", "Arial", 30);
    panelArea1_rate.attr({
      fillStyle: cc.color(255, 255, 255),
      x: size.width / 2,
      y: (this.gamePanel_height / 2 - this.gamePanel_border / 2) / 2 - panelArea1_rate.getContentSize().height
    });
    this.panelArea1.addChild(panelArea1_rate);
    this.panelArea2 = new cc.LayerColor(cc.color(27, 32, 67), size.width / 2 - this.gamePanel_border / 2, this.gamePanel_height / 2 - this.gamePanel_border / 2);
    this.panelArea2.setPosition(0, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta);
    this.addChild(this.panelArea2);
    var panelArea2Label = new cc.LabelTTF("龙", "Arial", 40);
    panelArea2Label.attr({
      fillStyle: cc.color(255, 0, 0),
      x: size.width / 4,
      y: (this.gamePanel_height / 2 - this.gamePanel_border / 2) / 2
    });
    this.panelArea2.addChild(panelArea2Label);
    var panelArea2_rate = new cc.LabelTTF("1 : 1", "Arial", 30);
    panelArea2_rate.attr({
      fillStyle: cc.color(255, 255, 255),
      x: size.width / 4,
      y: (this.gamePanel_height / 2 - this.gamePanel_border / 2) / 2 - panelArea2_rate.getContentSize().height
    });
    this.panelArea2.addChild(panelArea2_rate);
    this.panelArea3 = new cc.LayerColor(cc.color(27, 32, 67), size.width / 2 - this.gamePanel_border / 2, this.gamePanel_height / 2 - this.gamePanel_border / 2);
    this.panelArea3.setPosition(size.width / 2 + this.gamePanel_border / 2, this.coinWrapSprite_height + this.betAmountBg_height - this.betAmountBg_height_delta);
    this.addChild(this.panelArea3);
    var panelArea3Label = new cc.LabelTTF("虎", "Arial", 40);
    panelArea3Label.attr({
      fillStyle: cc.color(32, 93, 199),
      x: size.width / 4,
      y: (this.gamePanel_height / 2 - this.gamePanel_border / 2) / 2
    });
    this.panelArea3.addChild(panelArea3Label);
    var panelArea3_rate = new cc.LabelTTF("1 : 1", "Arial", 30);
    panelArea3_rate.attr({
      fillStyle: cc.color(255, 255, 255),
      x: size.width / 4,
      y: (this.gamePanel_height / 2 - this.gamePanel_border / 2) / 2 - panelArea3_rate.getContentSize().height
    });
    this.panelArea3.addChild(panelArea3_rate); // footer

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
    this.addChild(this.confirmBtn); // cancel and confirm buttons are disabled when length of dealedCoins is 0

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

    for (var _index2 = 0; _index2 < this.coinImages.length; _index2++) {
      this.coins[_index2] = new ccui.Button(this.coinImages[_index2], this.coinImages[_index2], this.coinImages[_index2]);

      this.coins[_index2].attr({
        x: this.coin_width / 2 + 10 * (_index2 + 1) + this.coin_width * _index2,
        y: this.coin_width / 2 + 10,
        scaleX: this.coin_width / this.coins[_index2].getNormalTextureSize().width,
        scaleY: this.coin_width / this.coins[_index2].getNormalTextureSize().width
      }); // pass enabled coin index by adding object


      this.coins[_index2].setTitleFontSize(cc.size(_index2, _index2));

      this.coins[_index2].setZoomScale(0);

      this.coins[_index2].addTouchEventListener(this.chooseCoin, this);

      this.addChild(this.coins[_index2]);
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

          if (touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + paddingY || touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height - paddingY) {
            return;
          }

          var coinItem = new cc.Sprite(_this.coinImages[_this.enabledCoin.findIndex(_this.findTrue)]);

          var coinVal = _this.coinImages[_this.enabledCoin.findIndex(_this.findTrue)].replace("res/niuniu/coin-sprite-", "");

          coinVal = Number(coinVal.replace(".png", ""));
          coinItem.attr({
            x: touch_x,
            y: touch_y,
            scaleX: 25 / coinItem.getContentSize().width,
            scaleY: 25 / coinItem.getContentSize().width
          });

          if (touch_x > 0 && touch_x < size.width && touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 2 + _this.gamePanel_border / 2 + paddingY) {
            if (_this.panel1_DealedCoins.length === 0) {
              _this.panel1_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13);

              _this.panel1_ValRoundRect_Label.attr({
                fillStyle: cc.color(255, 255, 255)
              });

              _this.panel1_ValRoundRect = new RoundRect(60, _this.panel1_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null);

              _this.panel1_ValRoundRect_Label.setPosition(cc.p(_this.panel1_ValRoundRect.getContentSize().width / 2, _this.panel1_ValRoundRect_Label.getContentSize().height / 2));

              _this.panel1_ValRoundRect.setPosition(cc.p(size.width / 2 - _this.panel1_ValRoundRect.getContentSize().width / 2, paddingY / 2));

              _this.panelArea1.addChild(_this.panel1_ValRoundRect);

              _this.panel1_ValRoundRect.addChild(_this.panel1_ValRoundRect_Label);
            }

            cc.audioEngine.playEffect(res.coin_drop_wav);

            _this.panel1_DealedCoins.push(coinVal);

            _this.panel1_ValRoundRect_Label.setString(_this.sumCoins(_this.panel1_DealedCoins));

            _this.addChild(coinItem, 0, _this.dealedCoins_tag);
          }

          if (touch_y > _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta && touch_y < _this.coinWrapSprite_height + _this.betAmountBg_height - _this.betAmountBg_height_delta + _this.gamePanel_height / 2 - _this.gamePanel_border / 2 - paddingY) {
            if (touch_x > 0 && touch_x < size.width / 2 - paddingX) {
              if (_this.panel2_DealedCoins.length === 0) {
                _this.panel2_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13);

                _this.panel2_ValRoundRect_Label.attr({
                  fillStyle: cc.color(255, 255, 255)
                });

                _this.panel2_ValRoundRect = new RoundRect(60, _this.panel2_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null);

                _this.panel2_ValRoundRect_Label.setPosition(cc.p(_this.panel2_ValRoundRect.getContentSize().width / 2, _this.panel2_ValRoundRect_Label.getContentSize().height / 2));

                _this.panel2_ValRoundRect.setPosition(cc.p(size.width / 4 - _this.panel2_ValRoundRect.getContentSize().width / 2, paddingY / 2));

                _this.panelArea2.addChild(_this.panel2_ValRoundRect);

                _this.panel2_ValRoundRect.addChild(_this.panel2_ValRoundRect_Label);
              }

              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel2_DealedCoins.push(coinVal);

              _this.panel2_ValRoundRect_Label.setString(_this.sumCoins(_this.panel2_DealedCoins));

              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }

            if (touch_x > size.width / 2 + _this.gamePanel_border / 2 + paddingX && touch_x < size.width) {
              if (_this.panel3_DealedCoins.length === 0) {
                _this.panel3_ValRoundRect_Label = new cc.LabelTTF(coinVal, "Arial", 13);

                _this.panel3_ValRoundRect_Label.attr({
                  fillStyle: cc.color(255, 255, 255)
                });

                _this.panel3_ValRoundRect = new RoundRect(60, _this.panel3_ValRoundRect_Label.getContentSize().height + paddingY / 4, cc.color(0, 0, 0, 100), 0, null, 10, null);

                _this.panel3_ValRoundRect_Label.setPosition(cc.p(_this.panel3_ValRoundRect.getContentSize().width / 2, _this.panel3_ValRoundRect_Label.getContentSize().height / 2));

                _this.panel3_ValRoundRect.setPosition(cc.p(size.width / 4 - _this.panel3_ValRoundRect.getContentSize().width / 2, paddingY / 2));

                _this.panelArea3.addChild(_this.panel3_ValRoundRect);

                _this.panel3_ValRoundRect.addChild(_this.panel3_ValRoundRect_Label);
              }

              cc.audioEngine.playEffect(res.coin_drop_wav);

              _this.panel3_DealedCoins.push(coinVal);

              _this.panel3_ValRoundRect_Label.setString(_this.sumCoins(_this.panel3_DealedCoins));

              _this.addChild(coinItem, 0, _this.dealedCoins_tag);
            }
          }

          if (_this.panel1_DealedCoins.length + _this.panel2_DealedCoins.length + _this.panel3_DealedCoins.length !== 0) {
            _this.cancelBtn.setEnabled(true);

            _this.confirmBtn.setEnabled(true);
          }

          _this.betAmountTokenVal.setString(_this.sumCoins(_this.panel1_DealedCoins) + _this.sumCoins(_this.panel2_DealedCoins) + _this.sumCoins(_this.panel3_DealedCoins));
        }
      }
    });
    cc.eventManager.addListener(this.coinDropListener, this); // betOpenInterval function called for counting seconds

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
  betOpenInterval: function betOpenInterval() {
    var _this2 = this;

    var bet_start_alert, bet_start_alert_width, close_second, countCloseSecond;
    return regeneratorRuntime.async(function betOpenInterval$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            this.open_state = true;
            this.close_state = false; // update cardcountval

            this.cardCountVal_num = this.cardCountVal_num + 1;
            this.cardCountVal.setString(this.cardCountVal_num + "/" + 52 * 8); // bet start

            bet_start_alert = new cc.Sprite(res.bet_start_alert_png);
            bet_start_alert_width = cc.winSize.width / 5 * 3;
            bet_start_alert.attr({
              scaleX: bet_start_alert_width / bet_start_alert.getContentSize().width,
              scaleY: bet_start_alert_width / bet_start_alert.getContentSize().width
            });
            bet_start_alert.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
            this.addChild(bet_start_alert, this.alert_zOrder);
            setTimeout(function () {
              _this2.removeChild(bet_start_alert);
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
                      _this2.close_state = true;
                      _context.next = 5;
                      return regeneratorRuntime.awrap(_this2.drawInterval());

                    case 5:
                      return _context.abrupt("return");

                    case 6:
                      close_second = close_second - 1;

                      if (close_second < 10) {
                        _this2.infoText.setString("距封盘时间 00:0" + close_second);

                        if (close_second == 1) {
                          bet_stop_alert = new cc.Sprite(res.bet_stop_alert_png);
                          bet_stop_alert_width = cc.winSize.width / 5 * 3;
                          bet_stop_alert.attr({
                            scaleX: bet_stop_alert_width / bet_stop_alert.getContentSize().width,
                            scaleY: bet_stop_alert_width / bet_stop_alert.getContentSize().width
                          });
                          bet_stop_alert.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));

                          _this2.addChild(bet_stop_alert, _this2.alert_zOrder);

                          setTimeout(function () {
                            _this2.removeChild(bet_stop_alert);

                            _this2.open_state = false;
                          }, 2000);
                        }
                      } else {
                        _this2.infoText.setString("距封盘时间 00:" + close_second);
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
    var _this3 = this;

    console.log("drawInterval called");
    var size = cc.winSize;
    var draw_second = 10;
    this.cancelBtn.setEnabled(false);
    this.confirmBtn.setEnabled(false);
    var countDrawSecond = setInterval(function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(draw_second == 0)) {
                _context4.next = 20;
                break;
              }

              clearInterval(countDrawSecond);

              _this3.infoText.setString("开奖中");

              setTimeout(function _callee2() {
                return regeneratorRuntime.async(function _callee2$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return regeneratorRuntime.awrap(_this3.sleep(500));

                      case 2:
                        _this3.serial_num_panel.removeAllChildren();

                        _this3.displaySerialPanel();

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                });
              }, 2000);
              _context4.next = 6;
              return regeneratorRuntime.awrap(_this3.sleep(3000));

            case 6:
              _context4.next = 8;
              return regeneratorRuntime.awrap(_this3.displayCard());

            case 8:
              _this3.panelArea1.setOpacity(50);

              _this3.panelArea2.setOpacity(50);

              _context4.next = 12;
              return regeneratorRuntime.awrap(_this3.sleep(3000));

            case 12:
              _context4.next = 14;
              return regeneratorRuntime.awrap(_this3.removeCards());

            case 14:
              _context4.next = 16;
              return regeneratorRuntime.awrap(_this3.displayCardBack());

            case 16:
              _this3.panelArea1.setOpacity(255);

              _this3.panelArea2.setOpacity(255);

              _this3.betOpenInterval();

              return _context4.abrupt("return");

            case 20:
              draw_second = draw_second - 1;
              if (draw_second < 10) _this3.infoText.setString("距开奖时间 00:0" + draw_second);else _this3.infoText.setString("距开奖时间 00:" + draw_second);

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      });
    }, 1000);
  },
  displaySerialPanel: function displaySerialPanel() {
    var size = cc.winSize;
    var paddingX = 20;
    var paddingY = 20;
    var serial_num_height = 20;
    this.serial_num_panel = new cc.LayerColor(cc.color(0, 0, 0, 0), serial_num_height * 10 + paddingX / 5 * 9, serial_num_height);
    this.serial_num_panel.setPosition(paddingX / 2, size.height - serial_num_height - paddingY / 2);
    this.addChild(this.serial_num_panel);
    var randomNum = this.generateRandomNumArray(0, 9, 5);

    for (var index = 0; index < randomNum.length; index++) {
      this.serial_num[index] = new cc.Sprite(this.circleColors[index]);
      var serial_num_scale = serial_num_height / this.serial_num[index].getContentSize().width;
      this.serial_num[index].attr({
        scaleX: serial_num_scale,
        scaleY: serial_num_scale
      });
      this.serial_num[index].setPosition(serial_num_height / 2, serial_num_height / 2);
      var randomNumLabel = new cc.LabelTTF(randomNum[index].toString(), "Arial", 35);
      randomNumLabel.attr({
        fillStyle: cc.color(255, 255, 255)
      });
      randomNumLabel.enableStroke(cc.color(0, 0, 0), 2);
      randomNumLabel.setPosition(serial_num_height / (2 * serial_num_scale), serial_num_height / (2 * serial_num_scale) - randomNumLabel.getContentSize().height / 2 * serial_num_scale);
      this.serial_num_panel.addChild(this.serial_num[index]);
      this.serial_num[index].addChild(randomNumLabel);
      var moveByAction = new cc.MoveBy(1, cc.p((serial_num_height + paddingX / 4) * index, 0));
      this.serial_num[index].runAction(cc.EaseBackInOut.create(moveByAction));
    }
  },
  displayCardBack: function displayCardBack() {
    // card back sprite
    var size = cc.winSize;
    this.cardBack[0] = new cc.Sprite(baccarat_res.card_back_png);
    this.cardBack[1] = new cc.Sprite(baccarat_res.card_back_png);
    this.cardBack_height = this.cardWidth / this.cardBack[0].getContentSize().width * this.cardBack[0].getContentSize().height;
    this.cardBack[0].attr({
      scaleX: this.cardWidth / this.cardBack[0].getContentSize().width,
      scaleY: this.cardWidth / this.cardBack[0].getContentSize().width
    });
    this.cardBack[1].attr({
      scaleX: this.cardWidth / this.cardBack[1].getContentSize().width,
      scaleY: this.cardWidth / this.cardBack[1].getContentSize().width
    });
    this.cardBack[0].setPosition(size.width / 3, size.height - this.cardBack_height / 2 - this.header_height - this.banner_height / 12 * 5);
    this.cardBack[1].setPosition(size.width / 6 * 4, size.height - this.cardBack_height / 2 - this.header_height - this.banner_height / 12 * 5);
    this.addChild(this.cardBack[0]);
    this.addChild(this.cardBack[1]);
  },
  displayCard: function displayCard() {
    var size, resultCard_scaleY;
    return regeneratorRuntime.async(function displayCard$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            size = cc.winSize;
            this.resultCard[0] = new cc.Sprite(this.cards[Number(this.serial_num[0].children[0].string)]);
            resultCard_scaleY = this.cardWidth / this.cardBack[0].getContentSize().width * this.cardBack[0].getContentSize().height / this.resultCard[0].getContentSize().height;
            this.resultCard[0].attr({
              scaleX: 0,
              scaleY: resultCard_scaleY,
              flippedX: true,
              x: size.width / 3,
              y: size.height - this.cardBack_height / 2 - this.header_height - this.banner_height / 12 * 5
            });
            this.resultCard[1] = new cc.Sprite(this.cards[Number(this.serial_num[4].children[0].string)]);
            this.resultCard[1].attr({
              scaleX: 0,
              scaleY: resultCard_scaleY,
              flippedX: true,
              x: size.width / 6 * 4,
              y: size.height - this.cardBack_height / 2 - this.header_height - this.banner_height / 12 * 5
            }); // flip action

            this.cardBack[0].runAction(new cc.ScaleTo(0.5, 0, this.cardWidth / this.cardBack[0].getContentSize().width));
            _context5.next = 9;
            return regeneratorRuntime.awrap(this.sleep(500));

          case 9:
            this.addChild(this.resultCard[0]);
            this.resultCard[0].runAction(new cc.ScaleTo(0.5, -1 * this.cardWidth / this.resultCard[0].getContentSize().width, resultCard_scaleY));
            _context5.next = 13;
            return regeneratorRuntime.awrap(this.sleep(500));

          case 13:
            this.cardBack[1].runAction(new cc.ScaleTo(0.5, 0, this.cardWidth / this.cardBack[0].getContentSize().width));
            _context5.next = 16;
            return regeneratorRuntime.awrap(this.sleep(500));

          case 16:
            this.addChild(this.resultCard[1]);
            this.resultCard[1].runAction(new cc.ScaleTo(0.5, -1 * this.cardWidth / this.resultCard[0].getContentSize().width, resultCard_scaleY));

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  },
  removeCards: function removeCards() {
    console.log("removeCards called");

    for (var index = 0; index < this.resultCard.length; index++) {
      this.removeChild(this.resultCard[index]);
    }
  },
  gotoHome: function gotoHome(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        cc.audioEngine.end();
        cc.director.popScene();
        cc.director.pushScene(new cc.TransitionFade(1.0, new HomeScene()));
    }
  },
  showHelp: function showHelp(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        cc.audioEngine.playEffect(home_res.game_item_mp3);
        cc.director.pushScene(new cc.TransitionFade(1.0, new LonghuHelpScene()));
    }
  },
  showHistory: function showHistory(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        cc.audioEngine.playEffect(home_res.game_item_mp3);
        cc.director.pushScene(new cc.TransitionFade(1.0, new LonghuHistoryScene()));
    }
  },
  enableSoundOnMethod: function enableSoundOnMethod(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("enableSoundOnMethod");
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

    for (var index = 0; index < this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length; index++) {
      this.removeChildByTag(this.dealedCoins_tag);
    }

    this.betAmountTokenVal.setString("0.0");
    this.panel1_DealedCoins = [];
    this.panel2_DealedCoins = [];
    this.panel3_DealedCoins = [];
    this.panelArea1.removeChild(this.panel1_ValRoundRect);
    this.panelArea2.removeChild(this.panel2_ValRoundRect);
    this.panelArea3.removeChild(this.panel3_ValRoundRect);
    this.confirmBtn.setEnabled(false);
    this.cancelBtn.setEnabled(false);
  },
  enableAllBtn: function enableAllBtn() {
    this.enabledCoinDrop = true;
    this.goHomeBtn.setEnabled(true);
    this.soundOnBtn.setEnabled(true);
    this.helpBtn.setEnabled(true);
    this.historyBtn.setEnabled(true);

    if (this.panel1_DealedCoins.length + this.panel2_DealedCoins.length + this.panel3_DealedCoins.length !== 0) {
      this.cancelBtn.setEnabled(true);
      this.confirmBtn.setEnabled(true);
    }

    for (var index = 0; index < this.coins.length; index++) {
      this.coins[index].setEnabled(true);
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
        var coinDealCheckDlg_height = 280;
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
        var hrLine1 = new cc.LayerColor(cc.color(102, 102, 102), coinDealCheckDlg_width - paddingX, 1);
        hrLine1.setPosition(cc.p(paddingX / 2, coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2));
        this.coinDealCheckDlg.addChild(hrLine1, this.coinDealCheckDlg_zOrder);
        var field1Label = new cc.LabelTTF("操作", "Arial", 15);
        var field2Label = new cc.LabelTTF("玩法", "Arial", 15);
        var field3Label = new cc.LabelTTF("赔率", "Arial", 15);
        var field4Label = new cc.LabelTTF("金额", "Arial", 15);
        field1Label.attr({
          fillStyle: cc.color(187, 187, 187)
        });
        field2Label.attr({
          fillStyle: cc.color(187, 187, 187)
        });
        field3Label.attr({
          fillStyle: cc.color(187, 187, 187)
        });
        field4Label.attr({
          fillStyle: cc.color(187, 187, 187)
        });
        field1Label.setPosition(cc.p(field1Label.getContentSize().width / 2 + paddingX / 2, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4));
        field2Label.setPosition(cc.p(field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4));
        field3Label.setPosition(cc.p(field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4));
        field4Label.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 + field4Label.getContentSize().width / 2 - 70, coinDealCheckDlg_height - field1Label.getContentSize().height / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4));
        this.coinDealCheckDlg.addChild(field1Label, this.coinDealCheckDlg_zOrder);
        this.coinDealCheckDlg.addChild(field2Label, this.coinDealCheckDlg_zOrder);
        this.coinDealCheckDlg.addChild(field3Label, this.coinDealCheckDlg_zOrder);
        this.coinDealCheckDlg.addChild(field4Label, this.coinDealCheckDlg_zOrder);
        var hrLine2 = new cc.LayerColor(cc.color(102, 102, 102), coinDealCheckDlg_width - paddingX, 1);
        hrLine2.setPosition(cc.p(paddingX / 2, coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4));
        this.coinDealCheckDlg.addChild(hrLine2, this.coinDealCheckDlg_zOrder);
        var checkRadioSprite_width = 20;
        var dealedPanelNum = 0;

        if (this.panel1_DealedCoins.length !== 0) {
          var checkRadioSprite1 = new cc.Sprite(res.check_radio_png);
          checkRadioSprite1.attr({
            scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
            scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
            x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4
          });
          this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder);
          var field2Val = new cc.LabelTTF("和", "Arial", 16);
          field2Val.attr({
            fillStyle: cc.color(145, 244, 8),
            x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3
          });
          this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder);
          var field3Val = new cc.LabelTTF("8", "Arial", 16);
          field3Val.attr({
            fillStyle: cc.color(255, 255, 255),
            x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3
          });
          this.coinDealCheckDlg.addChild(field3Val);
          var field4RoundRect_width = 120;
          var field4RoundRect_height = checkRadioSprite_width;
          var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null);
          field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4));
          this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder);
          var field4Val = new cc.LabelTTF(this.sumCoins(this.panel1_DealedCoins), "Arial", 16);
          field4Val.attr({
            fillStyle: cc.color(255, 255, 255),
            x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3
          });
          this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder);
          dealedPanelNum = dealedPanelNum + 1;
        }

        if (this.panel2_DealedCoins.length !== 0) {
          var checkRadioSprite1 = new cc.Sprite(res.check_radio_png);
          checkRadioSprite1.attr({
            scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
            scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
            x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
          });
          this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder);
          var field2Val = new cc.LabelTTF("龙", "Arial", 16);
          field2Val.attr({
            fillStyle: cc.color(255, 0, 0),
            x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
          });
          this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder);
          var field3Val = new cc.LabelTTF("1", "Arial", 16);
          field3Val.attr({
            fillStyle: cc.color(255, 255, 255),
            x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
          });
          this.coinDealCheckDlg.addChild(field3Val);
          var field4RoundRect_width = 120;
          var field4RoundRect_height = checkRadioSprite_width;
          var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null);
          field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum));
          this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder);
          var field4Val = new cc.LabelTTF(this.sumCoins(this.panel2_DealedCoins), "Arial", 16);
          field4Val.attr({
            fillStyle: cc.color(255, 255, 255),
            x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
          });
          this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder);
          dealedPanelNum = dealedPanelNum + 1;
        }

        if (this.panel3_DealedCoins.length !== 0) {
          var checkRadioSprite1 = new cc.Sprite(res.check_radio_png);
          checkRadioSprite1.attr({
            scaleX: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
            scaleY: checkRadioSprite_width / checkRadioSprite1.getContentSize().width,
            x: checkRadioSprite_width / 2 + paddingX / 2 + field1Label.getContentSize().width / 2 - checkRadioSprite_width / 2,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
          });
          this.coinDealCheckDlg.addChild(checkRadioSprite1, this.coinDealCheckDlg_zOrder);
          var field2Val = new cc.LabelTTF("虎", "Arial", 16);
          field2Val.attr({
            fillStyle: cc.color(62, 115, 212),
            x: field2Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
          });
          this.coinDealCheckDlg.addChild(field2Val, this.coinDealCheckDlg_zOrder);
          var field3Val = new cc.LabelTTF("1", "Arial", 16);
          field3Val.attr({
            fillStyle: cc.color(255, 255, 255),
            x: field3Label.getContentSize().width / 2 + paddingX / 2 + field1Label.getContentSize().width + paddingX * 1.8 + field2Label.getContentSize().width + paddingX * 1.8,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
          });
          this.coinDealCheckDlg.addChild(field3Val);
          var field4RoundRect_width = 120;
          var field4RoundRect_height = checkRadioSprite_width;
          var field4RoundRect = new RoundRect(field4RoundRect_width, field4RoundRect_height, cc.color(59, 112, 128), 0, null, 10, null);
          field4RoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width, coinDealCheckDlg_height - field4RoundRect_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum));
          this.coinDealCheckDlg.addChild(field4RoundRect, this.coinDealCheckDlg_zOrder);
          var field4Val = new cc.LabelTTF(this.sumCoins(this.panel3_DealedCoins), "Arial", 16);
          field4Val.attr({
            fillStyle: cc.color(255, 255, 255),
            x: coinDealCheckDlg_width - paddingX / 2 - field4RoundRect_width / 2,
            y: coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum
          });
          this.coinDealCheckDlg.addChild(field4Val, this.coinDealCheckDlg_zOrder);
          dealedPanelNum = dealedPanelNum + 1;
        }

        var totalfieldLabel = new cc.LabelTTF("总金额:", "Arial", 18);
        totalfieldLabel.attr({
          fillStyle: cc.color(255, 255, 255),
          x: paddingX / 2 + totalfieldLabel.getContentSize().width / 2,
          y: coinDealCheckDlg_height - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum - paddingY - 3
        });
        this.coinDealCheckDlg.addChild(totalfieldLabel);
        var totalfieldRoundRect_width = 120;
        var totalfieldRoundRect_height = 20;
        var totalfieldRoundRect = new RoundRect(totalfieldRoundRect_width, totalfieldRoundRect_height, cc.color(59, 112, 128), 0, null, 10, null);
        totalfieldRoundRect.setPosition(cc.p(coinDealCheckDlg_width - paddingX / 2 - totalfieldRoundRect_width, coinDealCheckDlg_height - checkRadioSprite_width / 2 - paddingY - betOrderConfirmLabel.getContentSize().height - paddingY / 2 - paddingY / 4 - field1Label.getContentSize().height - paddingY / 4 - paddingY / 4 - 3 - (checkRadioSprite_width + paddingY / 2) * dealedPanelNum - paddingY));
        this.coinDealCheckDlg.addChild(totalfieldRoundRect);
        var totalfieldVal = new cc.LabelTTF((this.sumCoins(this.panel1_DealedCoins) + this.sumCoins(this.panel2_DealedCoins) + this.sumCoins(this.panel3_DealedCoins)).toString(), "Arial", 18);
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
    }
  },
  showCheckSuccessDlg: function showCheckSuccessDlg(sender, type) {
    var _this4 = this;

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
            clearInterval(_this4.checkSuccessDlg_interval);

            _this4.removeChild(_this4.checkSuccessDlg);

            _this4.removeChild(_this4.checkSuccessDlg_overLay);

            _this4.removeChild(_this4.coinDealCheckDlg);

            _this4.removeChild(_this4.coinDealCheckDlg_overLay);

            _this4.enableAllBtn();

            if (_this4.panel1_ValRoundRect_Label !== null) _this4.panel1_ValRoundRect_Label.setColor(cc.color(34, 162, 211));
            if (_this4.panel2_ValRoundRect_Label !== null) _this4.panel2_ValRoundRect_Label.setColor(cc.color(34, 162, 211));
            if (_this4.panel3_ValRoundRect_Label !== null) _this4.panel3_ValRoundRect_Label.setColor(cc.color(34, 162, 211));
          }

          dlgYesBtn_time = dlgYesBtn_time - 1;
          dlgYesBtn.setTitleText("确定(" + dlgYesBtn_time + ")");
        }, 1000);
        this.coinDealCheckDlgYesBtn.setEnabled(false);
        this.coinDealCheckDlgNoBtn.setEnabled(false);
    }
  },
  closeCheckSuccessDlg: function closeCheckSuccessDlg(sender, type) {
    var _this5 = this;

    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        console.log("closeCheckSuccessDlg");
        clearInterval(this.checkSuccessDlg_interval);
        this.removeChild(this.checkSuccessDlg);
        this.removeChild(this.checkSuccessDlg_overLay);
        this.removeChild(this.coinDealCheckDlg);
        this.removeChild(this.coinDealCheckDlg_overLay);
        if (this.panel1_ValRoundRect_Label !== null) this.panel1_ValRoundRect_Label.setColor(cc.color(34, 162, 211));
        if (this.panel2_ValRoundRect_Label !== null) this.panel2_ValRoundRect_Label.setColor(cc.color(34, 162, 211));
        if (this.panel3_ValRoundRect_Label !== null) this.panel3_ValRoundRect_Label.setColor(cc.color(34, 162, 211));
        setTimeout(function () {
          _this5.enableAllBtn();
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
  }
});
var LonghuGameScene = cc.Scene.extend({
  onEnter: function onEnter() {
    this._super();

    var bgLayer = new BgLayer();
    this.addChild(bgLayer);
    var gameLayer = new LonghuGameLayer();
    this.addChild(gameLayer);
  }
});
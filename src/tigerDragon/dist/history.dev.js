"use strict";

var LonghuHistoryLayer = cc.Layer.extend({
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
  serial_num: [],
  cards: [],
  circleColors: [],
  ctor: function ctor() {
    this._super();

    var size = cc.winSize;
    var paddingY = 20;
    var paddingX = 20; // load circle color image using batchNode

    var circleColors_cache = cc.spriteFrameCache.addSpriteFrames(res.circle_color_plist);
    var circleColors_sheet = new cc.SpriteBatchNode(res.circle_color_png);

    for (var index = 0; index < 10; index++) {
      var circleColors_name = "circle-color-" + index + ".png";
      var circleColors_frame = cc.spriteFrameCache.getSpriteFrame(circleColors_name);
      this.circleColors.push(circleColors_frame);
    } // load card images as batchnode


    var cardType = ["C", "D", "H", "S"];
    var cardWidth = 20;
    var cardGroup_width = cardWidth + paddingX * 1.5 * 4;
    var card_cache = cc.spriteFrameCache.addSpriteFrames(res.card_sheet_plist);
    var card_sheet = new cc.SpriteBatchNode(res.card_sheet_png);

    for (var _index = 0; _index < 13; _index++) {
      for (var indexi = 0; indexi < cardType.length; indexi++) {
        var cardName = "card" + (_index + 1).toString() + cardType[indexi] + ".png";
        var card_frame = cc.spriteFrameCache.getSpriteFrame(cardName);
        this.cards.push(card_frame);
      }
    } // background layer


    this.bgLayer = cc.LayerColor.create(cc.color(0, 0, 0), size.width, size.height);
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
    goGameBtn.setTitleFontName("fangsong");
    goGameBtn.addTouchEventListener(this.gotoGame, this);
    this.addChild(goGameBtn);
    var headerTitle = cc.LabelTTF.create("历史记录", "Arial");
    headerTitle.attr({
      x: size.width / 2,
      y: size.height - header_height / 2 - 5,
      fillStyle: cc.color(0, 0, 0),
      fontSize: 20
    });
    this.addChild(headerTitle); // Button Layer

    this.history1_btn = new ccui.Button(res.history1_active_btn);
    var history1_btn_width = (size.width - paddingX * 4) / 2;
    var history1_btn_height = history1_btn_width / this.history1_btn.getContentSize().width * this.history1_btn.getContentSize().height;
    this.history1_btn.attr({
      scaleX: history1_btn_width / this.history1_btn.getContentSize().width,
      scaleY: history1_btn_width / this.history1_btn.getContentSize().width
    });
    this.history1_btn.setPosition(cc.p(size.width / 4, size.height - history1_btn_height / 2 - header_height - paddingY * 2));
    this.history1_btn.addTouchEventListener(this.showFirstHistory, this);
    this.addChild(this.history1_btn);
    this.history2_btn = new ccui.Button(res.history2_nonactive_btn);
    var history2_btn_width = history1_btn_width;
    this.history2_btn.attr({
      scaleX: history2_btn_width / this.history2_btn.getContentSize().width,
      scaleY: history2_btn_width / this.history2_btn.getContentSize().width
    });
    var history2_btn_height = history2_btn_width / this.history2_btn.getContentSize().width * this.history2_btn.getContentSize().height;
    this.history2_btn.setPosition(cc.p(size.width / 4 * 3, size.height - history2_btn_height / 2 - header_height - paddingY * 2));
    this.history2_btn.addTouchEventListener(this.showSecondHistory, this);
    this.addChild(this.history2_btn); // first history content

    var datepickerSprite = new cc.Sprite(res.datepicker_png);
    var datePickerSprite_width = 25;
    var datepickerSprite_height = datePickerSprite_width / datepickerSprite.getContentSize().width * datepickerSprite.getContentSize().height;
    datepickerSprite.attr({
      scaleX: datePickerSprite_width / datepickerSprite.getContentSize().width,
      scaleY: datePickerSprite_width / datepickerSprite.getContentSize().width,
      x: datePickerSprite_width / 2 + paddingX / 2,
      y: size.height - datepickerSprite_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY
    });
    this.addChild(datepickerSprite);
    this.dateInput = ccui.TextField.create();
    var currentDate = new Date();
    var str_var = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString() + "-" + currentDate.getDate();
    this.dateInput.setPlaceHolder(str_var);
    this.dateInput.setPlaceHolderColor(cc.color(255, 255, 255));
    this.dateInput.setFontSize(15);
    var dateInput_height = this.dateInput.getVirtualRendererSize().height;
    this.dateInput.setPosition(cc.p(this.dateInput.getContentSize().width / 2 + paddingX / 2 + datePickerSprite_width + paddingX / 2, size.height - datepickerSprite_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY));
    this.addChild(this.dateInput, 1, 1);
    this.addressLabel = cc.LabelTTF.create("官方开奖地址");
    this.addressLabel.attr({
      x: size.width - 100,
      y: size.height - dateInput_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY,
      fillStyle: cc.color(255, 255, 255)
    });
    this.addChild(this.addressLabel, 1, 1);
    this.numPeriodLabel = cc.LabelTTF.create("期数", "Arial", 14);
    this.numPeriodLabel.attr({
      fillStyle: cc.color(158, 158, 158)
    });
    var numPeriodLabel_height = this.numPeriodLabel.getContentSize().height;
    this.numPeriodLabel.setPosition(cc.p(paddingX / 2 + this.numPeriodLabel.getContentSize().width / 2, size.height - numPeriodLabel_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY));
    this.addChild(this.numPeriodLabel, 1, 1);
    this.gameTimeLabel = cc.LabelTTF.create("时间", "Arial", 14);
    this.gameTimeLabel.attr({
      fillStyle: cc.color(158, 158, 158)
    });
    var gameTimeLabel_height = this.gameTimeLabel.getContentSize().height;
    this.gameTimeLabel.setPosition(cc.p(size.width / 5 * 2, size.height - gameTimeLabel_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY));
    this.addChild(this.gameTimeLabel, 1, 1);
    this.resultLabel = cc.LabelTTF.create("结果", "Arial", 14);
    this.resultLabel.attr({
      fillStyle: cc.color(158, 158, 158)
    });
    var resultLabel_height = this.resultLabel.getContentSize().height;
    this.resultLabel.setPosition(cc.p(size.width - paddingX / 2 - this.resultLabel.getContentSize().width / 2, size.height - resultLabel_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY));
    this.addChild(this.resultLabel, 1, 1);
    this.hrLine = cc.LayerColor.create(cc.color(158, 158, 158), size.width - paddingX, 1);
    this.hrLine.attr({
      x: paddingX / 2,
      y: size.height - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY - numPeriodLabel_height - paddingY / 2
    });
    this.addChild(this.hrLine, 1, 1);
    this.history1Content = ccui.ScrollView.create();
    var history1Content_height = size.height - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput_height - paddingY - numPeriodLabel_height - paddingY / 2 - paddingY / 2 - paddingY / 2;
    this.history1Content.setDirection(ccui.ScrollView.DIR_VERTICAL);
    this.history1Content.setTouchEnabled(true);
    this.history1Content.setBounceEnabled(true); // this.history1Content.setBackGroundImage(res.blackjack_jpg)

    this.history1Content.setContentSize(cc.size(size.width - paddingX, history1Content_height));
    this.history1Content.setPosition(cc.p(paddingX / 2, paddingY / 2));
    this.addChild(this.history1Content, 1, 1);
    var history1Content_fontSize = 13;
    var numPeriodVal = cc.LabelTTF.create("31084949", "Arial", history1Content_fontSize);
    numPeriodVal.attr({
      fillStyle: cc.color(255, 255, 255),
      x: numPeriodVal.getContentSize().width / 2,
      y: history1Content_height - numPeriodVal.getContentSize().height / 2
    });
    this.history1Content.addChild(numPeriodVal);
    var gameTimeVal = cc.LabelTTF.create("09:25", "Arial", history1Content_fontSize);
    gameTimeVal.attr({
      fillStyle: cc.color(255, 255, 255),
      x: (size.width - paddingX) / 5 * 2,
      y: history1Content_height - numPeriodVal.getContentSize().height / 2
    });
    this.history1Content.addChild(gameTimeVal);
    var bankerLabel = new cc.LabelTTF("庄", "Arial", history1Content_fontSize);
    bankerLabel.attr({
      fillStyle: cc.color(255, 64, 71),
      x: this.history1Content.getContentSize().width - bankerLabel.getContentSize().width / 2,
      y: history1Content_height - numPeriodVal.getContentSize().height / 2
    });
    this.history1Content.addChild(bankerLabel);
    var serialResultTitle = cc.LabelTTF.create("开出号码", "Arial", history1Content_fontSize);
    serialResultTitle.attr({
      fillStyle: cc.color(154, 154, 154, 154)
    });
    serialResultTitle_height = serialResultTitle.getContentSize().height;
    serialResultTitle.setPosition(cc.p(serialResultTitle.getContentSize().width / 2, history1Content_height - numPeriodVal.getContentSize().height - paddingY));
    this.history1Content.addChild(serialResultTitle);
    var serial_num_height = 20;
    this.serial_num_panel = new cc.LayerColor(cc.color(0, 0, 0), serial_num_height * 10 + paddingX / 4 * 9 + paddingX, serial_num_height);
    this.serial_num_panel.setPosition(cc.p(paddingX * 3, history1Content_height - serial_num_height / 2 - numPeriodVal.getContentSize().height - paddingY));
    this.history1Content.addChild(this.serial_num_panel);

    for (var _index2 = 0; _index2 < 10; _index2++) {
      this.serial_num[_index2] = new cc.Sprite(this.circleColors[_index2]);

      var serial_num_scale = serial_num_height / this.serial_num[_index2].getContentSize().width;

      this.serial_num[_index2].attr({
        scaleX: serial_num_scale,
        scaleY: serial_num_scale
      });

      this.serial_num[_index2].setPosition(serial_num_height / 2 + paddingX / 2 + _index2 * (serial_num_height + paddingX / 4), serial_num_height / 2);

      var randomNumLabel = new cc.LabelTTF(Math.floor(Math.random() * 100).toString(), "Arial", 35);
      randomNumLabel.attr({
        fillStyle: cc.color(255, 255, 255)
      });
      randomNumLabel.enableStroke(cc.color(0, 0, 0), 2);
      randomNumLabel.setPosition(serial_num_height / (2 * serial_num_scale), serial_num_height / (2 * serial_num_scale) - randomNumLabel.getContentSize().height / 2 * serial_num_scale);
      this.serial_num_panel.addChild(this.serial_num[_index2]);

      this.serial_num[_index2].addChild(randomNumLabel);
    }

    var resultCards_width = 15;
    var cloneCardsTitle = new cc.LabelTTF("结果牌面", "Arial", history1Content_fontSize);
    cloneCardsTitle.attr({
      fillStyle: cc.color(154, 154, 154),
      x: cloneCardsTitle.getContentSize().width / 2,
      y: history1Content_height - numPeriodVal.getContentSize().height - paddingY - this.serial_num_panel.getContentSize().height - paddingY
    });
    this.history1Content.addChild(cloneCardsTitle);
    var playerLabel = new cc.LabelTTF("闲", "Arial", history1Content_fontSize);
    playerLabel.attr({
      fillStyle: cc.color(77, 134, 237),
      x: playerLabel.getContentSize().width / 2 + cloneCardsTitle.getContentSize().width + paddingX,
      y: history1Content_height - numPeriodVal.getContentSize().height - paddingY - this.serial_num_panel.getContentSize().height - paddingY
    });
    this.history1Content.addChild(playerLabel);
    var cloneCard1 = new cc.Sprite(this.cards[Math.floor(Math.random() * 52)]);
    cloneCard1.attr({
      scaleX: resultCards_width / cloneCard1.getContentSize().width,
      scaleY: resultCards_width / cloneCard1.getContentSize().width,
      x: resultCards_width / 2 + cloneCardsTitle.getContentSize().width + paddingX + playerLabel.getContentSize().width + paddingX / 2,
      y: history1Content_height - numPeriodVal.getContentSize().height - paddingY - this.serial_num_panel.getContentSize().height - paddingY
    });
    this.history1Content.addChild(cloneCard1);
    var bankLabel = new cc.LabelTTF("庄", "Arial", history1Content_fontSize);
    bankLabel.attr({
      fillStyle: cc.color(255, 64, 71),
      x: bankLabel.getContentSize().width / 2 + cloneCardsTitle.getContentSize().width + paddingX + playerLabel.getContentSize().width + paddingX / 2 + resultCards_width * 1 + paddingX / 4 * 1 + paddingX / 2,
      y: history1Content_height - numPeriodVal.getContentSize().height - paddingY - this.serial_num_panel.getContentSize().height - paddingY
    });
    this.history1Content.addChild(bankLabel);
    var cloneCard2 = new cc.Sprite(this.cards[Math.floor(Math.random() * 52)]);
    cloneCard2.attr({
      scaleX: resultCards_width / cloneCard2.getContentSize().width,
      scaleY: resultCards_width / cloneCard2.getContentSize().width,
      x: resultCards_width / 2 + cloneCardsTitle.getContentSize().width + paddingX + playerLabel.getContentSize().width + paddingX / 2 + resultCards_width * 1 + paddingX / 4 * 1 + paddingX / 2 + bankLabel.getContentSize().width + paddingX / 2,
      y: history1Content_height - numPeriodVal.getContentSize().height - paddingY - this.serial_num_panel.getContentSize().height - paddingY
    });
    this.history1Content.addChild(cloneCard2); // second history content

    var currentDate = new Date();
    var str_var = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString() + "-" + currentDate.getDate();
    this.dateInput2 = ccui.TextField.create();
    this.dateInput2.setPlaceHolder(str_var);
    this.dateInput2.setPlaceHolderColor(cc.color(255, 255, 255));
    this.dateInput2.setFontSize(15);
    var dateInput2_height = this.dateInput2.getVirtualRendererSize().height;
    this.dateInput2.setPosition(cc.p(this.dateInput2.getContentSize().width / 2 + paddingX / 2 + datePickerSprite_width + paddingX / 2, size.height - datepickerSprite_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY));
    this.addChild(this.dateInput2, 2, 2);
    this.numPeriodLabel2 = cc.LabelTTF.create("期数/下注单", "Arial", 14);
    this.numPeriodLabel2.attr({
      fillStyle: cc.color(158, 158, 158)
    });
    var numPeriodLabel2_height = this.numPeriodLabel.getContentSize().height;
    this.numPeriodLabel2.setPosition(cc.p(paddingX / 2 + this.numPeriodLabel2.getContentSize().width / 2, size.height - numPeriodLabel2_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY));
    this.addChild(this.numPeriodLabel2, 2, 2);
    this.gamePointLabel = cc.LabelTTF.create("下注金额", "Arial", 14);
    this.gamePointLabel.attr({
      fillStyle: cc.color(158, 158, 158)
    });
    var gamePointLabel_height = this.gamePointLabel.getContentSize().height;
    this.gamePointLabel.setPosition(cc.p(size.width - paddingX / 2 - 100, size.height - gamePointLabel_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY));
    this.addChild(this.gamePointLabel, 2, 2);
    this.resultLabel2 = cc.LabelTTF.create("结果", "Arial", 14);
    this.resultLabel2.attr({
      fillStyle: cc.color(158, 158, 158)
    });
    var resultLabel2_height = this.resultLabel2.getContentSize().height;
    this.resultLabel2.setPosition(cc.p(size.width - paddingX / 2 - this.resultLabel2.getContentSize().width / 2, size.height - resultLabel2_height / 2 - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY));
    this.addChild(this.resultLabel2, 2, 2);
    this.hrLine2 = cc.LayerColor.create(cc.color(158, 158, 158), size.width - paddingX, 1);
    this.hrLine2.attr({
      x: paddingX / 2,
      y: size.height - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY - numPeriodLabel2_height - paddingY / 2
    });
    this.addChild(this.hrLine2, 2, 2);
    this.history2Content = ccui.ScrollView.create();
    var history2Content_height = size.height - header_height - paddingY * 2 - history1_btn_height - paddingY - dateInput2_height - paddingY - numPeriodLabel2_height - paddingY / 2 - paddingY / 2 - paddingY / 2;
    this.history2Content.setDirection(ccui.ScrollView.DIR_VERTICAL);
    this.history2Content.setTouchEnabled(true);
    this.history2Content.setBounceEnabled(true); // this.history2Content.setBackGroundImage(res.blackjack_jpg)

    this.history2Content.setContentSize(cc.size(size.width - paddingX, history2Content_height));
    this.history2Content.setPosition(cc.p(paddingX / 2, paddingY / 2));
    this.addChild(this.history2Content, 2, 2);
    var history2Content_fontSize = 13;
    var numPeriodVal2_1 = cc.LabelTTF.create("31084949", "Arial", history2Content_fontSize);
    numPeriodVal2_1.attr({
      fillStyle: cc.color(255, 255, 255),
      x: numPeriodVal2_1.getContentSize().width / 2,
      y: history2Content_height - numPeriodVal2_1.getContentSize().height / 2
    });
    this.history2Content.addChild(numPeriodVal2_1);
    var gamePointVal_1 = cc.LabelTTF.create("50", "Arial", history2Content_fontSize);
    gamePointVal_1.attr({
      fillStyle: cc.color(255, 255, 255),
      x: size.width - paddingX / 2 - 100,
      y: history2Content_height - numPeriodVal2_1.getContentSize().height / 2
    });
    this.history2Content.addChild(gamePointVal_1);
    var resultVal2_1 = cc.LabelTTF.create("-50", "Arial", history2Content_fontSize);
    resultVal2_1.attr({
      fillStyle: cc.color(229, 57, 65),
      x: size.width - paddingY / 2 - resultVal2_1.getContentSize().width,
      y: history2Content_height - numPeriodVal2_1.getContentSize().height / 2
    });
    this.history2Content.addChild(resultVal2_1);
    var numPeriodVal2_2 = cc.LabelTTF.create("190533556802505", "Arial", history2Content_fontSize);
    numPeriodVal2_2.attr({
      fillStyle: cc.color(158, 158, 158),
      x: numPeriodVal2_2.getContentSize().width / 2,
      y: history2Content_height - numPeriodVal2_2.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2
    });
    this.history2Content.addChild(numPeriodVal2_2);
    var numPeriodVal2_2_2 = cc.LabelTTF.create("牛二(翻倍)", "Arial", history2Content_fontSize);
    numPeriodVal2_2_2.attr({
      fillStyle: cc.color(79, 138, 243),
      x: numPeriodVal2_2_2.getContentSize().width / 2 + numPeriodVal2_2.getContentSize().width + paddingX / 2,
      y: history2Content_height - numPeriodVal2_2_2.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2
    });
    this.history2Content.addChild(numPeriodVal2_2_2);
    var gamePointVal_2 = cc.LabelTTF.create("50", "Arial", history2Content_fontSize);
    gamePointVal_2.attr({
      fillStyle: cc.color(255, 255, 255),
      x: size.width - paddingX / 2 - 100,
      y: history2Content_height - numPeriodVal2_2_2.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2
    });
    this.history2Content.addChild(gamePointVal_2);
    var resultVal2_2 = cc.LabelTTF.create("-50", "Arial", history2Content_fontSize);
    resultVal2_2.attr({
      fillStyle: cc.color(255, 0, 0),
      x: size.width - paddingY / 2 - resultVal2_2.getContentSize().width,
      y: history2Content_height - numPeriodVal2_2_2.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2
    });
    this.history2Content.addChild(resultVal2_2);
    var numPeriodVal2_3 = cc.LabelTTF.create("09:31:07", "Arial", history2Content_fontSize);
    numPeriodVal2_3.attr({
      fillStyle: cc.color(158, 158, 158),
      x: numPeriodVal2_3.getContentSize().width / 2,
      y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2
    });
    this.history2Content.addChild(numPeriodVal2_3);
    var numPeriodVal2_3_2 = cc.LabelTTF.create("闲三", "Arial", history2Content_fontSize);
    numPeriodVal2_3_2.attr({
      fillStyle: cc.color(79, 138, 243),
      x: numPeriodVal2_3_2.getContentSize().width / 2 + numPeriodVal2_2.getContentSize().width + paddingX / 2,
      y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2
    });
    this.history2Content.addChild(numPeriodVal2_3_2);
    var numPeriodVal2_3_3 = cc.LabelTTF.create("@", "Arial", history2Content_fontSize);
    numPeriodVal2_3_3.attr({
      fillStyle: cc.color(158, 158, 158),
      x: numPeriodVal2_3_3.getContentSize().width / 2 + numPeriodVal2_2.getContentSize().width + paddingX / 2 + numPeriodVal2_3_2.getContentSize().width,
      y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2
    });
    this.history2Content.addChild(numPeriodVal2_3_3);
    var numPeriodVal2_3_4 = cc.LabelTTF.create("1.98", "Arial", history2Content_fontSize);
    numPeriodVal2_3_4.attr({
      fillStyle: cc.color(255, 0, 0),
      x: numPeriodVal2_3_4.getContentSize().width / 2 + numPeriodVal2_2.getContentSize().width + paddingX / 2 + numPeriodVal2_3_2.getContentSize().width + numPeriodVal2_3_3.getContentSize().width,
      y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2
    });
    this.history2Content.addChild(numPeriodVal2_3_4);
    var gamePointVal_3 = cc.LabelTTF.create("(冻结:200)", "Arial", history2Content_fontSize);
    gamePointVal_3.attr({
      fillStyle: cc.color(158, 158, 158),
      x: size.width - paddingX / 2 - 120,
      y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2
    });
    this.history2Content.addChild(gamePointVal_3);
    var resultVal2_3 = cc.LabelTTF.create("(返还:200)", "Arial", history2Content_fontSize);
    resultVal2_3.attr({
      fillStyle: cc.color(158, 158, 158),
      x: size.width - resultVal2_3.getContentSize().width / 2 - paddingX,
      y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2
    });
    this.history2Content.addChild(resultVal2_3);
    var hrLineInContent = cc.LayerColor.create(cc.color(158, 158, 158), size.width - paddingX, 1);
    hrLineInContent.attr({
      x: 0,
      y: history2Content_height - numPeriodVal2_3.getContentSize().height / 2 - numPeriodLabel_height - paddingY / 2 - numPeriodVal2_2.getContentSize().height - paddingY / 2 - paddingY / 2
    });
    this.history2Content.addChild(hrLineInContent);

    for (var _index3 = 0; _index3 < 5; _index3++) {
      this.removeChildByTag(2);
    }

    this.removeChild(this.history2Content);
  },
  gotoGame: function gotoGame(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        var gameScene = new LonghuGameScene();
        cc.director.pushScene(new cc.TransitionFade(1.0, gameScene));
        break;
    }
  },
  showFirstHistory: function showFirstHistory(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        if (this.getChildByTag(1)) {
          return;
        }

        for (var index = 0; index < 5; index++) {
          this.removeChildByTag(2);
        }

        this.removeChild(this.history2Content);
        this.addChild(this.dateInput);
        this.addChild(this.addressLabel);
        this.addChild(this.numPeriodLabel);
        this.addChild(this.gameTimeLabel);
        this.addChild(this.resultLabel);
        this.addChild(this.hrLine);
        this.addChild(this.history1Content);
        this.history1_btn.loadTextureNormal(res.history1_active_btn);
        this.history2_btn.loadTextureNormal(res.history2_nonactive_btn);
        break;
    }
  },
  showSecondHistory: function showSecondHistory(sender, type) {
    switch (type) {
      case ccui.Widget.TOUCH_ENDED:
        if (this.getChildByTag(2)) {
          return;
        }

        for (var index = 0; index < 7; index++) {
          this.removeChildByTag(1);
        }

        this.addChild(this.dateInput2);
        this.addChild(this.numPeriodLabel2);
        this.addChild(this.gamePointLabel);
        this.addChild(this.resultLabel2);
        this.addChild(this.hrLine2);
        this.addChild(this.history2Content);
        this.history1_btn.loadTextureNormal(res.history1_nonactive_btn);
        this.history2_btn.loadTextureNormal(res.history2_active_btn);
        break;
    }
  },
  performScaleAction: function performScaleAction(time, scaleX, scaleY) {
    var duration = time; // duration in seconds for performing this action

    var scaleAction = new cc.ScaleTo(duration, scaleX, scaleY);
    this.runAction(scaleAction);
  }
});
var LonghuHistoryScene = cc.Scene.extend({
  onEnter: function onEnter() {
    this._super();

    var historyLayer = new LonghuHistoryLayer();
    this.addChild(historyLayer);
  }
});
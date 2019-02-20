(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7ac24benb5FV5DN66aCRMb/', 'game', __filename);
// scripts/game.js

'use strict';

cc.Class({
  extends: cc.Component,

  properties: {
    prefab: cc.Prefab,
    canvas: cc.Node
  },

  start: function start() {
    var _self = this;

    wx.onMessage(function (data) {
      console.log('-----' + data.message);
      console.log("User info get success." + data);
    });

    // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserInfo.html
    wx.getUserInfo({
      openIdList: ['selfOpenId'],
      lang: 'zh_CN',
      success: function success(res) {
        console.log('success', res.data);
        var userInfo = res.data[0];
        _self.createUserBlock(userInfo);
      },
      fail: function fail(res) {
        reject(res);
      }
    });

    // // https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getFriendCloudStorage.html
    // wx.getFriendCloudStorage({
    //   success: function (res) {
    //     for (let i = 0; i < 6; i++) {
    //       let friendInfo = res.data[i];
    //       if (!friendInfo) {
    //         _self.createPrefab();
    //         continue;
    //       }
    //       _self.createUserBlock(friendInfo);
    //     }
    //   },
    //   fail: function (res) {
    //     console.error(res);
    //   }
    // });
  },
  createUserBlock: function createUserBlock(user) {
    var node = this.createPrefab();
    this.canvas.addChild(node);
    node.setPosition(cc.v2(0, this.canvas.height / 2 - node.height / 2));
    // getUserInfo will return the nickName, getFriendCloudStorage will return the nickname.
    var nickName = user.nickName ? user.nickName : user.nickname;
    var avatarUrl = user.avatarUrl;

    var userName = node.getChildByName('userNameLabel').getComponent(cc.Label);
    var userIcon = node.getChildByName('userImageSprite').getComponent(cc.Sprite);

    userName.string = nickName;
    console.log(userName);
    console.log(nickName + '\'s info has been getten.');
    cc.loader.load({
      url: avatarUrl,
      type: 'png'
    }, function (err, texture) {
      if (err) console.error(err);
      userIcon.spriteFrame = new cc.SpriteFrame(texture);
    });
  },
  createPrefab: function createPrefab() {
    var node = cc.instantiate(this.prefab);
    node.parent = this.content;
    return node;
  }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=game.js.map
        
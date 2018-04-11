/*
 * @Author: Lienren 
 * @Date: 2018-04-10 19:31:57 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-10 19:58:30
 */
'use strict';

const BMP24 = require('gd-bmp').BMP24;
const comm = require('./comm');

module.exports = {
  // 制造验证码图片
  makeCapcha: (code, bmpWidth = 100, bmpHeight = 40, bgColor = 0x000000) => {
    let img = new BMP24(bmpWidth, bmpHeight);
    img.fillRect(0, 0, img.w, img.h, bgColor);
    img.drawCircle(comm.rand(0, img.w), comm.rand(0, img.h), comm.rand(10, img.h), comm.rand(0, 0xffffff));

    //边框
    img.drawRect(0, 0, img.w - 1, img.h - 1, comm.rand(0, 0xffffff));

    img.fillRect(
      comm.rand(0, img.w),
      comm.rand(0, img.h),
      comm.rand(10, img.h),
      comm.rand(10, img.h),
      comm.rand(0, 0xffffff)
    );
    img.drawLine(
      comm.rand(0, img.w),
      comm.rand(0, img.h),
      comm.rand(0, img.w),
      comm.rand(0, img.h),
      comm.rand(0, 0xffffff)
    );

    //画曲线
    let w = img.w / 2;
    let h = img.h;
    let color = comm.rand(0, 0xffffff);
    let y1 = comm.rand(-5, 5); //Y轴位置调整
    let w2 = comm.rand(10, 15); //数值越小频率越高
    let h3 = comm.rand(4, 6); //数值越小幅度越大
    let bl = comm.rand(1, 5);
    for (let i = -w; i < w; i += 0.1) {
      let y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
      let x = Math.floor(i + w);
      for (let j = 0; j < bl; j++) {
        img.drawPoint(x, y + j, color);
      }
    }

    let fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    let x = comm.rand(5, 15);
    let y = 8;
    for (let i = 0; i < code.length; i++) {
      let f = fonts[(Math.random() * fonts.length) | 0];
      y = 8 + comm.rand(-10, 10);
      img.drawChar(code[i], x, y, f, comm.rand(0, 0xffffff));
      x += f.w + comm.rand(2, 8);
    }
    return img;
  }
};

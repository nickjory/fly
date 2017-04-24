/**************背景数据*********************************/
  var bg=new Image();
   bg.src="images/background.png";
  var SKY={//天空背景对象(学生)
   imgs:bg,
   width:450,
   height:750
   }
/**************背景图片构造器************************/
   function Sky(config){
     this.imgs=config.imgs;
     this.width=config.width;
	 this.height=config.height;
	 //定义绘制第一张图片的y值
	 this.y1=-this.height;
	 //定义绘制第二张图片的y值
	 this.y2=0;
	 //定义用于控制背景图片的速度
	 this.time=0;
	 //定义绘制方法
	 this.paint=function(){
	   context.drawImage(this.imgs,0,this.y1);// 第一张
	   context.drawImage(this.imgs,0,this.y2);// 第二张
	 }
	 //定义移动方法
	 this.step=function(){
	 //定义移动速度
	    this.time++;
	     if(this.time%3==0){
		   this.y1++;
		   this.y2++;
		}
		//bug第二张有问题
	 //判断两张图片是否移除画面
		if(this.y1>HEIGHT){
		  this.y1=-this.height;
		}
		if(this.y2>HEIGHT){
		  this.y2=-this.height;
		}
	 }
   }
 /*开始时飞机向上飞行*/
   var p=new Image();
     p.src="images/p3.png";
   var COLOR={
     imgs:p,
	 width:200,
	 height:100
   }
	 //context.drawImage(color,200,200);
	 /*开始飞机的构造器*/
  function Color(config){
     this.width=config.width;
	 this.height=config.height;
	 this.imgs=config.imgs;
	 this.time=0;
	 this.x=(WIDTH-this.width)/2;
	 this.y=HEIGHT-this.height-30;
	 this.step=function(){ 
		 if(this.y>0){
		 this.y-=3;
		 }
		 else{
		   this.y=-HEIGHT;
		 }
	 }
	 this.paint=function(){	
	    context.drawImage(this.imgs,this.x,this.y);
	 }
	 
  }
/******************logo**************************/
  var logo=new Image();
   logo.src="images/start.png";
/*******************loadding数据***************************/
  var loadings=[];//创建一个数组存放loading的图片
	loadings[0]=new Image();
	loadings[0].src="images/game_loading1.png";
	loadings[1]=new Image();
	loadings[1].src="images/game_loading2.png";
	loadings[2]=new Image();
	loadings[2].src="images/game_loading3.png";
	loadings[3]=new Image();
	loadings[3].src="images/game_loading4.png";
  //loadding对象
	 var LOADING={
		imgs:loadings,
		width:186,
		height:38,
		sum:loadings.length
	}
/*****************loading的构造函数**********/
  function Loading(config){
     this.imgs=config.imgs;
	 this.width=config.width;
	 this.height=config.height;
	 this.sum=config.sum;
	 this.index=0;
	 //定义切换图片的速度
	 this.time=0;
	 this.paint=function(){//加载图片的绘制方法
	   context.drawImage(this.imgs[this.index],0,HEIGHT-this.height);
	 }
     this.step=function(){//加载图片移动
	    this.time++;
		if(this.time%20==0){
		  this.index++;
		}
		if(this.index==this.sum){
		   state=RUNNING;
		}
	 }
  }
 
/*************我方飞机的数据*****************************/
  var heros=[];//存放飞机的数组
        heros[0]=new Image();
        heros[0].src="images/hero1.png";
        heros[1]=new Image();
        heros[1].src="images/hero2.png";
		// 增加我方飞机爆破动画的图片
	    heros[2] = new Image();
	    heros[2].src = "images/hero_blowup_n1.png";
	    heros[3] = new Image();
	    heros[3].src = "images/hero_blowup_n2.png";
	    heros[4] = new Image();
	    heros[4].src = "images/hero_blowup_n3.png";
	    heros[5] = new Image();
	    heros[5].src = "images/hero_blowup_n4.png";
  var HERO={//我方飞机对象
    imgs:heros,
	width:99,
    height:124,
	sum:heros.length
  }
/**************我方飞机构造器************************/
  function Hero(config) {
     this.imgs=config.imgs;
	 this.width=config.width;
	 this.height=config.height;
	 this.sum=config.sum;
	 this.index=0;
	 this.time=0;
	 this.life=3;
	 this.canDelete=false;
	 this.down=false;//默认不击落
	 this.length=config.length;
	 //定义绘制我放飞机出现的坐标值
	 this.x=(WIDTH-this.width)/2;
	 this.y=HEIGHT-this.height-30;
     this.paint=function(){//我放飞机绘制
	   context.drawImage(this.imgs[this.index],this.x,this.y);
	 }
	 //定义我放飞机图片轮播动态
	 this.step=function(){
      if(this.down&&(this.life>1)){
		  this.life--;
		  this.down=false;
          this.x=(WIDTH-this.width)/2;
	      this.y=HEIGHT-this.height-30;
		  state=RUNNING;
		
	  }else if(this.down){
		  this.life--;
	      this.index++;
		  if(this.index=this.sum)
			  state=GAMEOVER;
		      this.index=this.sum-2;
	  }else{
	    this.index++;
		this.index=this.index%2;
		
	 }
	 }
    this.shoot = function(){//我方发射子弹
			this.time++;
			if(this.time%20==0){
				// 创建子弹对象,并且添加到数组中
				var bullet = new Bullet(BULLET);
				bullets[bullets.length] = bullet;
			}
		}
	this.bang=function(){//我方被敌机撞击
	   this.down=true;
	}
	this.hit=function(thing){//thing为敌机子弹
	    return thing.x+thing.width>this.x&&
			   thing.x+thing.width<this.x+this.width&&
			   thing.y+thing.height>this.y&&
			   thing.y+this.height<this.y+this.height;
	}
	//我方飞机控制器(该进可用mouseover)
	window.onkeydown=function(e){
     switch(e.keyCode){
	   case 40://下
	   if(state==RUNNING)
	   this.moveDown();
	   break;
	   case 37://左
	   if(state==RUNNING)
	   this.moveLeft();
	   break;
	   case 39://右
	   if(state==RUNNING)
	   this.moveRight();
	   break;
	   case 38://上
	   if(state==RUNNING)
	   this.moveUp();
	   break;
	   case 32:
	   this.paused();//暂停
	 }
  }.bind(this);
	this.moveDown=function(){
		if(this.y<HEIGHT-this.height)
	     this.y+=15;
	}
	this.moveUp=function(){
		if(this.y>0)
	     this.y-=15;
	}
	this.moveLeft=function(){
		if(this.x>0)
	     this.x-=15;
	}
	this.moveRight=function(){
		  if(this.x<WIDTH-this.width)
	      this.x+=15;
	}
	this.paused=function(){
		if(state==RUNNING)
	     state=PAUSED;
		else{
	    state=RUNNING;
	  }

  }
  }
   
/*************我方飞机子弹的数据******************************/
    var bullet=new Image();
	bullet.src="images/bullet.png";

	var BULLET={//子弹对象
	  imgs:bullet,
	  width:9,
	  height:21
	 }
/**************我方飞机子弹构造器**************************/

    function Bullet(config){ 
	  this.imgs=config.imgs;
	  this.width=config.width;
	  this.height=config.height;
	  //定义是否可删除子弹
	  this.canDelete=false;
	  //定义子弹的坐标
	  this.x=hero.x+hero.width/2-this.width/2;
	  this.y=hero.y-this.height-10;
	  this.paint=function(){//绘制1个子弹方法
	     context.drawImage(this.imgs,this.x,this.y);
	  }
	  this.step=function(){//1个子弹移动方法
	     this.y-=2;
	  }
	  this.bang=function(){//子弹撞击的函数
	     this.canDelete=true;
	  }
	}
       var bullets=[];
	function paintBullets(){//绘制子弹数组函数
	  for(var i=0;i<bullets.length;i++){
	     bullets[i].paint();
	  }
	}

	function stepBullets(){//子弹数组移动
	  for(var i=0;i<bullets.length;i++){
	     bullets[i].step();
	 }
	}
	function delBullets(){//消除子弹
	   for(var i=0;i<bullets.length;i++){
	      if(bullets[i].y<=-bullets[i].height||
		      bullets[i].canDelete){
		     bullets.splice(i,1);
		  }
	   }
	}
/*****************敌机子弹*********************************/
    var ebullet=new Image();
	ebullet.src="images/enemy.gif";
    var EBULLET={
	 imgs:ebullet,
     height:29,
	 width:29
  }
/*******************敌机子弹构造器*************************************/
   function Ebullet(config,enemy){//config->子弹
      this.imgs=config.imgs;
	  this.height=config.height;
	  this.width=config.width;
	  this.x=enemy.x+enemy.width/2;
	  this.y=enemy.y+enemy.height+10;
	  this.time=0;
	  this.canDelete=false;
	  this.step=function(){//移动一个
		 this.y+=1;

	  }
	   this.paint=function(){//绘制1个子弹方法
	     context.drawImage(this.imgs,this.x,this.y);
	  }
	  ////////
	     this.time++;
		//通过switch来判断是什么飞机，设置相应的速度，以及动画
	    switch (enemy.type){
		case 0:
			enemy.y++;
		    break;
		case 1:
			if(this.time%3==0){
		     enemy.y++;  
	     	}
			break;
		case 2:
			if(this.time%5==0){
			  enemy.y++;
			}
			  break;
		}
   }
     var ebullets=[];
   function paintEbullets(){//绘制所有 敌机子弹
	    for(var i=0;i<ebullets.length;i++){
		   ebullets[i].paint();
		}
	  }
	function stepEbullets(){//移动所有 敌机子弹
	    for(var i=0;i<ebullets.length;i++){
		  ebullets[i].step();
		}
	  }
     function delEbullets(){//检测删除 敌机子弹
	   for(var i=0;i<ebullets.length;i++){
	     if(ebullets[i]>HEIGHT||ebullets[i].canDelete){
		    ebullets.splice(i,1);
		 }
	   }
	 } 
/************敌机数据******************/

	var enemies1 = [];//小飞机
	enemies1[0] = new Image();
	enemies1[0].src = "images/enemy1.png";
	// 小飞机爆破动画的图片
	enemies1[1] = new Image();
	enemies1[1].src = "images/enemy1_down1.png";
	enemies1[2] = new Image();
	enemies1[2].src = "images/enemy1_down2.png";
	enemies1[3] = new Image();
	enemies1[3].src = "images/enemy1_down3.png";
	enemies1[4] = new Image();
	enemies1[4].src = "images/enemy1_down4.png";
	var enemies2 = [];//中飞机
	enemies2[0] = new Image();
	enemies2[0].src = "images/enemy2.png";
	// 中飞机爆破动画的图片
	enemies2[1] = new Image();
	enemies2[1].src = "images/enemy2_down1.png";
	enemies2[2] = new Image();
	enemies2[2].src = "images/enemy2_down2.png";
	enemies2[3] = new Image();
	enemies2[3].src = "images/enemy2_down3.png";
	enemies2[4] = new Image();
	enemies2[4].src = "images/enemy2_down4.png";
	var enemies3 = [];//大飞机
	enemies3[0] = new Image();
	enemies3[0].src = "images/enemy3_n1.png";
	enemies3[1] = new Image();
	enemies3[1].src = "images/enemy3_n2.png";
	// 大飞机爆破动画的图片
	enemies3[2] = new Image();
	enemies3[2].src = "images/enemy3_down1.png";
	enemies3[3] = new Image();
	enemies3[3].src = "images/enemy3_down2.png";
	enemies3[4] = new Image();
	enemies3[4].src = "images/enemy3_down3.png";
	enemies3[5] = new Image();
	enemies3[5].src = "images/enemy3_down4.png";
	enemies3[6] = new Image();
	enemies3[6].src = "images/enemy3_down5.png";
	enemies3[7] = new Image();
	enemies3[7].src = "images/enemy3_down6.png";

    var ENEMY1={//敌机1的对象
	  imgs:enemies1,
      width:57,
	  height:51,
	  sum:enemies1.length,
	  type:0,//敌机的类型
	  length:1,
      life:2,
	  score:1
	}
	var ENEMY2={//敌机2的对象
	  imgs:enemies2,
	  width:69,
	  height:95,
	  sum:enemies2.length,
	  type:1,
	  length:1,
	  life:3,
	  score:4
	}
	var ENEMY3={//敌机3的对象
	  imgs:enemies3,
	  width:169,
	  height:258,
	  sum:enemies3.length,
	  type:2,
	  length:2,
	  life:6,
	  score:8

	}
/***********敌机构造器*********************/
	function Enemy(config){
	  this.imgs=config.imgs;
	  this.width=config.width;
	  this.height=config.height;
	  this.sum=config.sum;
	  this.type=config.type;
	  this.time=0;//定义敌机速度
	  this.n=0;//定义子弹速度
	  this.index=0;
	  this.score=config.score;
	  this.life=config.life;
	  this.down=false;//定义敌机是否击落
	  this.canDelete=false;//定义敌机是否删除
	  this.length=config.length;//敌机正常的图片数量
      //定义敌机的坐标位置
	  this.x=parseInt(Math.random()*(WIDTH-this.width));
	  this.y=-this.height;
      //绘制敌机
	  this.paint=function(){
		context.drawImage(this.imgs[this.index],this.x,this.y);
	  }
	  this.step=function(){
	     if(this.down){//执行爆破动画
		   this.time++;
		   if(this.time%2==0){
		     this.index++;//切换爆破动画
		   }
		
		 //判断动画是否执行完毕
		 if(this.index==this.sum){
			SCORE+=this.score;
		   this.canDelete=true;
		 }
	   }else{//保持敌机3的正常图片切换
	    this.time++;
		//通过switch来判断是什么飞机，设置相应的速度，以及动画
	    switch (this.type){
		case 0://小飞机
			 if(this.time%2==0)
			this.y++;
		    break;
		case 1://中飞机
			if(this.time%5==0){
		     this.y++;  
	     	}
			break;
		case 2://大飞机
			this.index++;
		    this.index=this.index%this.length;//大飞机有两张图片的切换
			if(this.time%8==0){
			  this.y++;
			}
			  break;
		}
	  }
	 }
	  this.hit=function(thing){//敌机的撞击函数
	     //thing表示形参，可为我方飞机，也可为子弹
         return thing.x+thing.width>this.x&&
			 thing.y<this.y+this.height&&
			 thing.x<this.x+this.width&&
			 thing.y+thing.height>this.y;
	   }
	   this.bang=function(){
		  this.life--;
		  if(this.life<0)
	      this.down=true; 
	   }
      this.shoot=function(){
			 if(!this.down){
				 this.n++;
			 if(this.n%500==0){
		      var ebullet=new Ebullet(EBULLET,this);
		     ebullets[ebullets.length]=ebullet;
			 }
			 }
		   }
	   }
	 
/****************所有飞机移动移除及检查碰撞**********************/
	var enemies=[];
	//绘制所有飞机
	function paintEnemies(){
	  for(var i=0;i<enemies.length;i++){
	    enemies[i].paint();
	  }
	}
	//移动所有的飞机
	function stepEnemies(){
		for(var i=0;i<enemies.length;i++){
			enemies[i].step();
		}
	}
    function delEnemies(){//检测所有移除敌方飞机
		for(var i=0;i<enemies.length;i++){
		    if(enemies[i].y>HEIGHT||enemies[i].canDelete){
			   enemies.splice(i,1);
			}
		}
	 }
	 
	function checkHit(){//所有敌机是否被撞击
	    for(var i=0;i<enemies.length;i++){
		  var enemy=enemies[i];
		  if(enemy.hit(hero)){//撞英雄
			  //敌机或我机都不在down的过程中
		     if(!enemy.down&&!hero.down){
			   enemy.bang();
			   hero.bang();
			 }
		  }
         for(var j=0;j<bullets.length;j++){//撞子弹
		   var bullet=bullets[j];
		   if(enemy.hit(bullet)){
		      if(!enemy.down&&!bullet.canDelete){
			    enemy.bang();
				bullet.bang();
			  }
		   }
		 }
		}
	}
	function checkHHit(){//检测我放飞机是否被子弹撞
	       for(var r=0;r<ebullets.length;r++){
		      if(hero.hit(ebullets[r])){
				  hero.bang();
				 ebullets[r].canDelete=true;//删除敌机子弹
			  }
		   }
	}

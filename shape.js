/**************��������*********************************/
  var bg=new Image();
   bg.src="images/background.png";
  var SKY={//��ձ�������(ѧ��)
   imgs:bg,
   width:450,
   height:750
   }
/**************����ͼƬ������************************/
   function Sky(config){
     this.imgs=config.imgs;
     this.width=config.width;
	 this.height=config.height;
	 //������Ƶ�һ��ͼƬ��yֵ
	 this.y1=-this.height;
	 //������Ƶڶ���ͼƬ��yֵ
	 this.y2=0;
	 //�������ڿ��Ʊ���ͼƬ���ٶ�
	 this.time=0;
	 //������Ʒ���
	 this.paint=function(){
	   context.drawImage(this.imgs,0,this.y1);// ��һ��
	   context.drawImage(this.imgs,0,this.y2);// �ڶ���
	 }
	 //�����ƶ�����
	 this.step=function(){
	 //�����ƶ��ٶ�
	    this.time++;
	     if(this.time%3==0){
		   this.y1++;
		   this.y2++;
		}
		//bug�ڶ���������
	 //�ж�����ͼƬ�Ƿ��Ƴ�����
		if(this.y1>HEIGHT){
		  this.y1=-this.height;
		}
		if(this.y2>HEIGHT){
		  this.y2=-this.height;
		}
	 }
   }
 /*��ʼʱ�ɻ����Ϸ���*/
   var p=new Image();
     p.src="images/p3.png";
   var COLOR={
     imgs:p,
	 width:200,
	 height:100
   }
	 //context.drawImage(color,200,200);
	 /*��ʼ�ɻ��Ĺ�����*/
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
/*******************loadding����***************************/
  var loadings=[];//����һ��������loading��ͼƬ
	loadings[0]=new Image();
	loadings[0].src="images/game_loading1.png";
	loadings[1]=new Image();
	loadings[1].src="images/game_loading2.png";
	loadings[2]=new Image();
	loadings[2].src="images/game_loading3.png";
	loadings[3]=new Image();
	loadings[3].src="images/game_loading4.png";
  //loadding����
	 var LOADING={
		imgs:loadings,
		width:186,
		height:38,
		sum:loadings.length
	}
/*****************loading�Ĺ��캯��**********/
  function Loading(config){
     this.imgs=config.imgs;
	 this.width=config.width;
	 this.height=config.height;
	 this.sum=config.sum;
	 this.index=0;
	 //�����л�ͼƬ���ٶ�
	 this.time=0;
	 this.paint=function(){//����ͼƬ�Ļ��Ʒ���
	   context.drawImage(this.imgs[this.index],0,HEIGHT-this.height);
	 }
     this.step=function(){//����ͼƬ�ƶ�
	    this.time++;
		if(this.time%20==0){
		  this.index++;
		}
		if(this.index==this.sum){
		   state=RUNNING;
		}
	 }
  }
 
/*************�ҷ��ɻ�������*****************************/
  var heros=[];//��ŷɻ�������
        heros[0]=new Image();
        heros[0].src="images/hero1.png";
        heros[1]=new Image();
        heros[1].src="images/hero2.png";
		// �����ҷ��ɻ����ƶ�����ͼƬ
	    heros[2] = new Image();
	    heros[2].src = "images/hero_blowup_n1.png";
	    heros[3] = new Image();
	    heros[3].src = "images/hero_blowup_n2.png";
	    heros[4] = new Image();
	    heros[4].src = "images/hero_blowup_n3.png";
	    heros[5] = new Image();
	    heros[5].src = "images/hero_blowup_n4.png";
  var HERO={//�ҷ��ɻ�����
    imgs:heros,
	width:99,
    height:124,
	sum:heros.length
  }
/**************�ҷ��ɻ�������************************/
  function Hero(config) {
     this.imgs=config.imgs;
	 this.width=config.width;
	 this.height=config.height;
	 this.sum=config.sum;
	 this.index=0;
	 this.time=0;
	 this.life=3;
	 this.canDelete=false;
	 this.down=false;//Ĭ�ϲ�����
	 this.length=config.length;
	 //��������ҷŷɻ����ֵ�����ֵ
	 this.x=(WIDTH-this.width)/2;
	 this.y=HEIGHT-this.height-30;
     this.paint=function(){//�ҷŷɻ�����
	   context.drawImage(this.imgs[this.index],this.x,this.y);
	 }
	 //�����ҷŷɻ�ͼƬ�ֲ���̬
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
    this.shoot = function(){//�ҷ������ӵ�
			this.time++;
			if(this.time%20==0){
				// �����ӵ�����,������ӵ�������
				var bullet = new Bullet(BULLET);
				bullets[bullets.length] = bullet;
			}
		}
	this.bang=function(){//�ҷ����л�ײ��
	   this.down=true;
	}
	this.hit=function(thing){//thingΪ�л��ӵ�
	    return thing.x+thing.width>this.x&&
			   thing.x+thing.width<this.x+this.width&&
			   thing.y+thing.height>this.y&&
			   thing.y+this.height<this.y+this.height;
	}
	//�ҷ��ɻ�������(�ý�����mouseover)
	window.onkeydown=function(e){
     switch(e.keyCode){
	   case 40://��
	   if(state==RUNNING)
	   this.moveDown();
	   break;
	   case 37://��
	   if(state==RUNNING)
	   this.moveLeft();
	   break;
	   case 39://��
	   if(state==RUNNING)
	   this.moveRight();
	   break;
	   case 38://��
	   if(state==RUNNING)
	   this.moveUp();
	   break;
	   case 32:
	   this.paused();//��ͣ
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
   
/*************�ҷ��ɻ��ӵ�������******************************/
    var bullet=new Image();
	bullet.src="images/bullet.png";

	var BULLET={//�ӵ�����
	  imgs:bullet,
	  width:9,
	  height:21
	 }
/**************�ҷ��ɻ��ӵ�������**************************/

    function Bullet(config){ 
	  this.imgs=config.imgs;
	  this.width=config.width;
	  this.height=config.height;
	  //�����Ƿ��ɾ���ӵ�
	  this.canDelete=false;
	  //�����ӵ�������
	  this.x=hero.x+hero.width/2-this.width/2;
	  this.y=hero.y-this.height-10;
	  this.paint=function(){//����1���ӵ�����
	     context.drawImage(this.imgs,this.x,this.y);
	  }
	  this.step=function(){//1���ӵ��ƶ�����
	     this.y-=2;
	  }
	  this.bang=function(){//�ӵ�ײ���ĺ���
	     this.canDelete=true;
	  }
	}
       var bullets=[];
	function paintBullets(){//�����ӵ����麯��
	  for(var i=0;i<bullets.length;i++){
	     bullets[i].paint();
	  }
	}

	function stepBullets(){//�ӵ������ƶ�
	  for(var i=0;i<bullets.length;i++){
	     bullets[i].step();
	 }
	}
	function delBullets(){//�����ӵ�
	   for(var i=0;i<bullets.length;i++){
	      if(bullets[i].y<=-bullets[i].height||
		      bullets[i].canDelete){
		     bullets.splice(i,1);
		  }
	   }
	}
/*****************�л��ӵ�*********************************/
    var ebullet=new Image();
	ebullet.src="images/enemy.gif";
    var EBULLET={
	 imgs:ebullet,
     height:29,
	 width:29
  }
/*******************�л��ӵ�������*************************************/
   function Ebullet(config,enemy){//config->�ӵ�
      this.imgs=config.imgs;
	  this.height=config.height;
	  this.width=config.width;
	  this.x=enemy.x+enemy.width/2;
	  this.y=enemy.y+enemy.height+10;
	  this.time=0;
	  this.canDelete=false;
	  this.step=function(){//�ƶ�һ��
		 this.y+=1;

	  }
	   this.paint=function(){//����1���ӵ�����
	     context.drawImage(this.imgs,this.x,this.y);
	  }
	  ////////
	     this.time++;
		//ͨ��switch���ж���ʲô�ɻ���������Ӧ���ٶȣ��Լ�����
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
   function paintEbullets(){//�������� �л��ӵ�
	    for(var i=0;i<ebullets.length;i++){
		   ebullets[i].paint();
		}
	  }
	function stepEbullets(){//�ƶ����� �л��ӵ�
	    for(var i=0;i<ebullets.length;i++){
		  ebullets[i].step();
		}
	  }
     function delEbullets(){//���ɾ�� �л��ӵ�
	   for(var i=0;i<ebullets.length;i++){
	     if(ebullets[i]>HEIGHT||ebullets[i].canDelete){
		    ebullets.splice(i,1);
		 }
	   }
	 } 
/************�л�����******************/

	var enemies1 = [];//С�ɻ�
	enemies1[0] = new Image();
	enemies1[0].src = "images/enemy1.png";
	// С�ɻ����ƶ�����ͼƬ
	enemies1[1] = new Image();
	enemies1[1].src = "images/enemy1_down1.png";
	enemies1[2] = new Image();
	enemies1[2].src = "images/enemy1_down2.png";
	enemies1[3] = new Image();
	enemies1[3].src = "images/enemy1_down3.png";
	enemies1[4] = new Image();
	enemies1[4].src = "images/enemy1_down4.png";
	var enemies2 = [];//�зɻ�
	enemies2[0] = new Image();
	enemies2[0].src = "images/enemy2.png";
	// �зɻ����ƶ�����ͼƬ
	enemies2[1] = new Image();
	enemies2[1].src = "images/enemy2_down1.png";
	enemies2[2] = new Image();
	enemies2[2].src = "images/enemy2_down2.png";
	enemies2[3] = new Image();
	enemies2[3].src = "images/enemy2_down3.png";
	enemies2[4] = new Image();
	enemies2[4].src = "images/enemy2_down4.png";
	var enemies3 = [];//��ɻ�
	enemies3[0] = new Image();
	enemies3[0].src = "images/enemy3_n1.png";
	enemies3[1] = new Image();
	enemies3[1].src = "images/enemy3_n2.png";
	// ��ɻ����ƶ�����ͼƬ
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

    var ENEMY1={//�л�1�Ķ���
	  imgs:enemies1,
      width:57,
	  height:51,
	  sum:enemies1.length,
	  type:0,//�л�������
	  length:1,
      life:2,
	  score:1
	}
	var ENEMY2={//�л�2�Ķ���
	  imgs:enemies2,
	  width:69,
	  height:95,
	  sum:enemies2.length,
	  type:1,
	  length:1,
	  life:3,
	  score:4
	}
	var ENEMY3={//�л�3�Ķ���
	  imgs:enemies3,
	  width:169,
	  height:258,
	  sum:enemies3.length,
	  type:2,
	  length:2,
	  life:6,
	  score:8

	}
/***********�л�������*********************/
	function Enemy(config){
	  this.imgs=config.imgs;
	  this.width=config.width;
	  this.height=config.height;
	  this.sum=config.sum;
	  this.type=config.type;
	  this.time=0;//����л��ٶ�
	  this.n=0;//�����ӵ��ٶ�
	  this.index=0;
	  this.score=config.score;
	  this.life=config.life;
	  this.down=false;//����л��Ƿ����
	  this.canDelete=false;//����л��Ƿ�ɾ��
	  this.length=config.length;//�л�������ͼƬ����
      //����л�������λ��
	  this.x=parseInt(Math.random()*(WIDTH-this.width));
	  this.y=-this.height;
      //���Ƶл�
	  this.paint=function(){
		context.drawImage(this.imgs[this.index],this.x,this.y);
	  }
	  this.step=function(){
	     if(this.down){//ִ�б��ƶ���
		   this.time++;
		   if(this.time%2==0){
		     this.index++;//�л����ƶ���
		   }
		
		 //�ж϶����Ƿ�ִ�����
		 if(this.index==this.sum){
			SCORE+=this.score;
		   this.canDelete=true;
		 }
	   }else{//���ֵл�3������ͼƬ�л�
	    this.time++;
		//ͨ��switch���ж���ʲô�ɻ���������Ӧ���ٶȣ��Լ�����
	    switch (this.type){
		case 0://С�ɻ�
			 if(this.time%2==0)
			this.y++;
		    break;
		case 1://�зɻ�
			if(this.time%5==0){
		     this.y++;  
	     	}
			break;
		case 2://��ɻ�
			this.index++;
		    this.index=this.index%this.length;//��ɻ�������ͼƬ���л�
			if(this.time%8==0){
			  this.y++;
			}
			  break;
		}
	  }
	 }
	  this.hit=function(thing){//�л���ײ������
	     //thing��ʾ�βΣ���Ϊ�ҷ��ɻ���Ҳ��Ϊ�ӵ�
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
	 
/****************���зɻ��ƶ��Ƴ��������ײ**********************/
	var enemies=[];
	//�������зɻ�
	function paintEnemies(){
	  for(var i=0;i<enemies.length;i++){
	    enemies[i].paint();
	  }
	}
	//�ƶ����еķɻ�
	function stepEnemies(){
		for(var i=0;i<enemies.length;i++){
			enemies[i].step();
		}
	}
    function delEnemies(){//��������Ƴ��з��ɻ�
		for(var i=0;i<enemies.length;i++){
		    if(enemies[i].y>HEIGHT||enemies[i].canDelete){
			   enemies.splice(i,1);
			}
		}
	 }
	 
	function checkHit(){//���ел��Ƿ�ײ��
	    for(var i=0;i<enemies.length;i++){
		  var enemy=enemies[i];
		  if(enemy.hit(hero)){//ײӢ��
			  //�л����һ�������down�Ĺ�����
		     if(!enemy.down&&!hero.down){
			   enemy.bang();
			   hero.bang();
			 }
		  }
         for(var j=0;j<bullets.length;j++){//ײ�ӵ�
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
	function checkHHit(){//����ҷŷɻ��Ƿ��ӵ�ײ
	       for(var r=0;r<ebullets.length;r++){
		      if(hero.hit(ebullets[r])){
				  hero.bang();
				 ebullets[r].canDelete=true;//ɾ���л��ӵ�
			  }
		   }
	}

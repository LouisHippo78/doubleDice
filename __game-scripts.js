pc.extend(pc,function(){var TweenManager=function(t){this._app=t,this._tweens=[],this._add=[]};TweenManager.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);if(this._add.length){for(let t=0;t<this._add.length;t++)this._tweens.indexOf(this._add[t])>-1||this._tweens.push(this._add[t]);this._add.length=0}}};var Tween=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.Linear,this._sv={},this._ev={}},_parseProperties=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4||t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};Tween.prototype={to:function(t,i,e,s,n,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this},from:function(t,i,e,s,n,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this._from=!0,this},rotate:function(t,i,e,s,n,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this._slerp=!0,this},start:function(){var t,i,e,s;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,s=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,s))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,s=void 0!==this._properties.z?this._properties.z:this.target.z,void 0!==this._properties.w?(this._fromQuat.copy(this.target),this._toQuat.set(i,e,s,this._properties.w)):(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),this._toQuat.setFromEulerAngles(i,e,s)))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},onUpdate:function(t){return this.on("update",t),this},onComplete:function(t){return this.on("complete",t),this},onLoop:function(t){return this.on("loop",t),this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time-=this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,s,n=0===this.duration?1:this.time/this.duration,r=this.easing(n);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],s=this._ev[h],this.target[h]=e+(s-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var o=this._repeat(i);return o?this.fire("loop"):(this.fire("complete",i),this.entity&&this.entity.off("destroy",this.stop,this),this._chained&&this._chained.start()),o}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties){var e=this._sv[i];this._sv[i]=this._ev[i],this._ev[i]=e}this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var BounceOut=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},BounceIn=function(t){return 1-BounceOut(1-t)};return{TweenManager:TweenManager,Tween:Tween,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){var i=1.70158;return t*t*((i+1)*t-i)},BackOut:function(t){var i=1.70158;return--t*t*((i+1)*t+i)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:BounceIn,BounceOut:BounceOut,BounceInOut:function(t){return t<.5?.5*BounceIn(2*t):.5*BounceOut(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1,s=.4;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=s*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/s)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/s)*.5+1)}}}()),function(){pc.AppBase.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",(function(t){this._tweenManager.update(t)}))},pc.AppBase.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.once("destroy",e.stop,e),i&&i.element&&(e.element=i.element),e},pc.Entity.prototype.localMoveTo=function(t,i,e=pc.QuadraticOut){return this.tween(this.getLocalPosition()).to(t,i,e).start()},pc.Entity.prototype.localMoveBy=function(t,i,e=pc.SineOut){return this.tween(this.getLocalPosition()).by(t,i,e).start()},pc.Entity.prototype.moveTo=function(t,i){return this.tween(this.getPosition()).to(t,i,pc.SineOut).start()},pc.Entity.prototype.moveBy=function(t,i){return this.tween(this.getPosition()).by(t,i,pc.SineOut).start()},pc.Entity.prototype.rotateTo=function(t,i,e=pc.CircularOut){return this.tween(this.getLocalEulerAngles()).rotate(t,i,e).start()},pc.Entity.prototype.setOpacity=function(t){this.element&&(this.element.material,this.element.opacity=t)},pc.Entity.prototype.setOpacityCascade=function(t){this.setOpacity(t);for(let i=0;i<this.children.length;i++)this.children[i].setOpacityCascade&&this.children[i].setOpacityCascade(t)},pc.Entity.prototype.opacityToCascade=function(t,i,e){let s={v:t};return this.setOpacityCascade(t),this.tween(s).to({v:i},e,pc.SineOut).on("update",(()=>{this.setOpacityCascade(s.v)})).start()},pc.Entity.prototype.opacityTo=function(t,i,e){if(!this.element.material)return;let s={v:t};return this.setOpacity(t),this.tween(s).to({v:i},e,pc.SineOut).on("update",(()=>{this.setOpacity(s.v)})).start()},pc.Entity.prototype.setTextureFromURL=function(t){let i="t_"+t,e=pc.app.assets.find(i,"texture");if(null===e){pc.app.loader.getHandler("texture").crossOrigin="anonymous";var s=new pc.Asset(i,"texture",{url:t});pc.app.assets.add(s),s.on("load",(t=>{this.element.texture=t.resource})),pc.app.assets.load(s)}else this.element.texture=e.resource},pc.Entity.prototype.blink=function(t,i,e,s){for(let n=0;n<s;n++)setTimeout((()=>{this.setOpacity(t)}),e*n*2),setTimeout((()=>{this.setOpacity(i)}),e*(2*n+1))};var t=pc.AppBase.getApplication();t&&t.addTweenManager()}();var Background=pc.createScript("background");Background.attributes.add("startPosX",{type:"number",default:1}),Background.attributes.add("endPosX",{type:"number",default:1}),Background.attributes.add("durationTime",{type:"number",default:1}),Background.prototype.initialize=function(){this.entity.setLocalPosition(this.startPosX,0,0),this.tween=this.entity.tween(this.entity.getLocalPosition()).to(new pc.Vec3(this.endPosX,0,0),this.durationTime,pc.Linear).loop(!0).yoyo(!0),this.tween.start()};var UserBalance=pc.createScript("userBalance");UserBalance.attributes.add("userBalanceText",{type:"entity"}),UserBalance.attributes.add("userName",{type:"entity"}),UserBalance.prototype.initialize=function(){UserBalance.instance=this,this.userBalance=0},UserBalance.prototype.setUserName=function(e){this.userName.element.text=e},UserBalance.prototype.getUserBalance=function(){return this.userBalance},UserBalance.prototype.setBalance=function(e){this.userBalance=e;let t={value:Number(this.userBalanceText.element.text)},a=this.userBalanceText.element,n=this.entity.tween(t).to({value:e},.3,pc.Linear);n.on("update",(function(e){let n=parseFloat(t.value.toFixed(0));a.text=`${n}`})),n.start()},UserBalance.prototype.update=function(e){};var DummyServer=pc.createScript("dummyServer");DummyServer.prototype.initialize=function(){DummyServer.instance=this,this.betAmount=-1,this.userBalance=0},DummyServer.prototype.login=async function(){return this.userBalance=getRandomInt(1e3,5e3),{id:"userName",balance:this.userBalance}},DummyServer.prototype.getDice=function(){let e=[];e.push(getRandomInt(1,7)),e.push(getRandomInt(1,7));const t=e.reduce(((e,t)=>e+t),0);return{dice:e,sum:t}},DummyServer.prototype.getResult=function(e,t,r){let u=0,i=!1,n="";return e.sum===t.sum&&(n="tie",n===r&&(i=!0,u=tieRate[e.sum])),e.sum>t.sum&&(n="blue",n===r&&(i=!0,u=2)),e.sum<t.sum&&(n="red",n===r&&(i=!0,u=2)),{multiplier:u,isWin:i,winner:n}},DummyServer.prototype.startGame=function(e,t){if(e<0)return;if("blue"!==t&&"tie"!==t&&"red"!==t)return;let r=this.getDice(),u=this.getDice(),i=this.getResult(r,u,t);this.userBalance=this.userBalance-e,this.betAmount=e;let n=i.multiplier*e;return this.userBalance=this.userBalance+n,{balance:this.userBalance,betAmount:this.betAmount,profit:n,userBet:t,blue:r,red:u,...i}};var GlobalFunction=pc.createScript("globalFunction");const tieRate=[0,0,88,25,10,6,4,4,4,6,10,25,88],dotsPattern=[[],[3],[0,6],[0,3,6],[0,1,5,6],[0,1,3,5,6],[0,1,2,4,5,6]];function getRandomInt(o,n){return o=Math.ceil(o),n=Math.floor(n),Math.floor(Math.random()*(n-o))+o}function generateRandomNumbersInRange(o,n,t,r){const e=[];for(;e.length<r;){const r=Math.floor(Math.random()*(n-o))+o;t.includes(r)||e.push(r)}return e}function getColor(o){return"blue"===o?rgbToColor(45,92,255,255):"red"===o?rgbToColor(237,57,57,255):rgbToColor(241,208,63,255)}function getBlueColor(){return rgbToColor(45,92,255,255)}function getRedColor(){return rgbToColor(237,57,57,255)}function setButton(o,n,t){o.element.on("touchend",n,t),o.element.on("mouseup",n,t)}function rgbToColor(o,n,t,r){return new pc.Color(o/255,n/255,t/255,r/255)}function getCommaText(o){return o.toLocaleString("en-US")}async function loadJsonFromUrl(n){return new Promise((e=>{this.loadJsonFromRemote(n,(function(n){console.log(n);let o=JSON.stringify(n),s=JSON.parse(o);e(s)}))}))}async function delay(n){return new Promise((e=>setTimeout((()=>{e(n)}),n)))}async function loadJsonFromRemote(n,e){var o=new XMLHttpRequest;o.addEventListener("load",(function(){e(JSON.parse(this.response))})),o.open("GET",n),o.send()}var Middle=pc.createScript("middle");Middle.attributes.add("blueDice",{type:"entity",array:!0}),Middle.attributes.add("blueDiceBg",{type:"entity",array:!0}),Middle.attributes.add("redDice",{type:"entity",array:!0}),Middle.attributes.add("redDiceBg",{type:"entity",array:!0}),Middle.attributes.add("status",{type:"entity",array:!0}),Middle.prototype.initialize=function(){Middle.instance=this,this.idleTimer=null,this.buttons=[],this.entity.forEach((t=>{"Button"===t.name&&this.buttons.push(t)})),this.selectedIdx=-1,this.blueSum=0,this.redSum=0},Middle.prototype.postInitialize=function(){this.init()},Middle.prototype.init=function(){this.blueDiceBg.forEach((t=>t.enabled=!1)),this.redDiceBg.forEach((t=>t.enabled=!1)),this.blueDice.forEach((t=>t.script.dice.startRandom())),this.redDice.forEach((t=>t.script.dice.startRandom())),this.status.forEach((t=>t.script.status.init()))},Middle.prototype.startGame=function(){this.init()},Middle.prototype.setDiceNumber=async function(t,e,i){let s=t?this.blueDiceBg:this.redDiceBg,a=t?this.blueDice:this.redDice,d=t?this.status[0]:this.status[2];s[i].enabled=!0;let r=a[i].script.dice.fadeStopRandom(e);await delay(r+500),s[i].enabled=!1,d.script.status.setDiceNumber(i,e),await delay(500)},Middle.prototype.setWinner=async function(t,e){let i;i="blue"===t?this.status[0]:"red"===t?this.status[2]:this.status[1],i.script.status.setWinner(e)};var GameController=pc.createScript("gameController");GameController.prototype.initialize=function(){GameController.instance=this},GameController.prototype.postInitialize=function(){this.init(),this.setIdle()},GameController.prototype.init=async function(){let e=await DummyServer.instance.login();console.log(e),UserBalance.instance.setBalance(e.balance),UserBalance.instance.setUserName(e.id)},GameController.prototype.betGame=async function(e,t){let a=DummyServer.instance.startGame(e,t);UserBalance.instance.setBalance(UserBalance.instance.getUserBalance()-e),await delay(150),await Middle.instance.setDiceNumber(!0,a.blue.dice[0],0),await Middle.instance.setDiceNumber(!1,a.red.dice[0],0),a.blue.dice[0]<=a.red.dice[0]?(await Middle.instance.setDiceNumber(!0,a.blue.dice[1],1),await Middle.instance.setDiceNumber(!1,a.red.dice[1],1)):(await Middle.instance.setDiceNumber(!1,a.red.dice[1],1),await Middle.instance.setDiceNumber(!0,a.blue.dice[1],1)),await delay(500);let i="red"===a.winner?a.red.sum:a.blue.sum;Middle.instance.setWinner(a.winner,i),await delay(500),Bottom.instance.setResultGame(0!==a.multiplier,a.multiplier,a.profit,a.winner,"blue"===a.winner?a.blue.dice:a.red.dice),await delay(500),UserBalance.instance.setBalance(a.balance),await delay(2e3),Bottom.instance.disableButton(!1),Middle.instance.init()},GameController.prototype.setIdle=function(){};var Bottom=pc.createScript("bottom");Bottom.attributes.add("blueButton",{type:"entity"}),Bottom.attributes.add("tieButton",{type:"entity"}),Bottom.attributes.add("redButton",{type:"entity"}),Bottom.attributes.add("betEditButton",{type:"entity"}),Bottom.attributes.add("winResult",{type:"entity"}),Bottom.attributes.add("multiplier",{type:"entity"}),Bottom.attributes.add("profit",{type:"entity"}),Bottom.attributes.add("loseResult",{type:"entity"}),Bottom.attributes.add("resultDice",{type:"entity",array:!0}),Bottom.attributes.add("resultBg",{type:"entity"}),Bottom.attributes.add("betAmountText",{type:"entity"}),Bottom.attributes.add("betUi",{type:"entity"}),Bottom.prototype.initialize=function(){Bottom.instance=this,this.setButton(this.blueButton,this.onClickBlue),this.setButton(this.tieButton,this.onClickTie),this.setButton(this.redButton,this.onClickRed),this.setButton(this.betEditButton,this.onClickBetEdit),this.disableButton(!1),this.betAmount=0},Bottom.prototype.postInitialize=function(){this.resultBg.enabled=!1,this.winResult.enabled=!1,this.loseResult.enabled=!1},Bottom.prototype.setButton=function(t,e){t.button.on("touchend",e,this),t.button.on("mouseup",e,this)},Bottom.prototype.startGame=async function(t){AudioController.instance.playSound("Click"),this.disableButton(!0),UserBalance.instance.userBalance<this.betAmount?(this.betAmountErr(),await delay(1e3),this.disableButton(!1)):GameController.instance.betGame(this.betAmount,t)},Bottom.prototype.onClickBlue=function(){AudioController.instance.playSound("Click"),this.tieButton.enabled=!1,this.redButton.enabled=!1,this.startGame("blue")},Bottom.prototype.onClickTie=async function(){AudioController.instance.playSound("Click"),this.blueButton.enabled=!1,this.redButton.enabled=!1,this.startGame("tie")},Bottom.prototype.onClickRed=async function(){AudioController.instance.playSound("Click"),this.blueButton.enabled=!1,this.tieButton.enabled=!1,this.startGame("red")},Bottom.prototype.onClickBetEdit=async function(){AudioController.instance.playSound("Click"),this.betUi.enabled=!0},Bottom.prototype.changeTexture=function(t,e){},Bottom.prototype.changeButtonState=function(t,e){t.button.active=e},Bottom.prototype.disableButton=function(t){!1===t&&(this.blueButton.enabled=!0,this.tieButton.enabled=!0,this.redButton.enabled=!0),this.changeButtonState(this.blueButton,!t),this.changeButtonState(this.tieButton,!t),this.changeButtonState(this.redButton,!t),this.changeButtonState(this.betEditButton,!t)},Bottom.prototype.setBet=function(){this.betUi.enabled=!0},Bottom.prototype.setIdle=function(){UiStats.instance.buttonActive(!0),this.clearButton.enabled=!1,this.randomButton.enabled=!1,setTimeout((()=>{this.changeButtonState(this.startButton,!0),this.changeTexture(this.startButton,this.start_inactive)}),1e3)},Bottom.prototype.setBetAmount=function(t){this.betAmountText.element.text=`${t}`,this.betAmount=t},Bottom.prototype.resetMultiplierColor=function(){ResultController.instance.resetColor(),this.disableButton(!1)},Bottom.prototype.setResultGame=async function(t,e,o,n,i){t?(AudioController.instance.playSound("Win"),this.multiplier.element.text=`${e.toFixed(2)}x`,this.profit.element.text=`+${o}`,"tie"===n?this.resultDice.forEach((t=>t.enabled=!1)):this.resultDice.forEach(((t,e)=>{t.enabled=!0,t.script.dice.setColor(getColor(n)),console.log(e+"    "+i[e]),t.script.dice.setDiceNumber(i[e])}))):AudioController.instance.playSound("Lose"),this.resultBg.enabled=!0,this.winResult.enabled=t,this.loseResult.enabled=!t,await delay(2e3),this.resultBg.enabled=!1,this.winResult.enabled=!1,this.loseResult.enabled=!1},Bottom.prototype.betAmountErr=function(){var t=new pc.Color(0,0,0),e=this.entity.tween(t).yoyo(!0).repeat(4).to(new pc.Color(1,0,0),.2,pc.Linear);e.onUpdate((e=>{this.betAmountText.element.color=t})),e.start()};var AudioController=pc.createScript("audioController");AudioController.attributes.add("soundSource",{type:"entity"}),AudioController.prototype.initialize=function(){AudioController.instance=this,this.isMute=!0,this.soundSource.sound.volume=0},AudioController.prototype.setMute=function(o){this.isMute=o,this.isMute?this.soundSource.sound.volume=0:this.soundSource.sound.volume=.55},AudioController.prototype.playSound=function(o){!0!==this.isMute&&this.soundSource.sound.play(o)};var BetController=pc.createScript("betController");BetController.attributes.add("betUi",{type:"entity"}),BetController.attributes.add("betButton",{type:"entity",array:!0}),BetController.attributes.add("okButton",{type:"entity"}),BetController.attributes.add("cancelButton",{type:"entity"}),BetController.attributes.add("clearButton",{type:"entity"}),BetController.attributes.add("betAmountText",{type:"entity"}),BetController.attributes.add("errorText",{type:"entity"}),BetController.prototype.initialize=function(){BetController.instance=this,this.timer=null,this.betAmount=0,this.errorText.enabled=!1,setButton(this.cancelButton,this.onBetCancel,this),setButton(this.okButton,this.onBetOk,this),setButton(this.clearButton,this.onBetClear,this)},BetController.prototype.reset=function(){this.betAmount=0,this.updateText(),this.resetAllButton()},BetController.prototype.resetAllButton=function(){this.betButton.forEach((t=>t.element.color=new pc.Color(.5,.5,.5,1)))},BetController.prototype.betChange=function(t){let e=this.betAmount+t;return e>UserBalance.instance.getUserBalance()?(this.showErrorMsg(),!1):(this.errorText.enabled=!1,this.betAmount=e,this.updateText(),!0)},BetController.prototype.updateText=function(){let t=getCommaText(this.betAmount);this.betAmountText.element.text=`${t}`},BetController.prototype.onBetClear=function(){AudioController.instance.playSound("Click"),console.log("BetController.prototype.betOk"),this.betAmount=0,this.updateText()},BetController.prototype.onBetOk=function(){AudioController.instance.playSound("Click"),console.log("BetController.prototype.betOk"),this.betUi.enabled=!1,Bottom.instance.setBetAmount(this.betAmount)},BetController.prototype.onBetCancel=function(){AudioController.instance.playSound("Click"),this.betUi.enabled=!1},BetController.prototype.showErrorMsg=function(){this.errorText.enabled=!0,clearTimeout(this.timer),this.timer=setTimeout((()=>{this.errorText.enabled=!1}),1e3)};var NumButton=pc.createScript("numButton");NumButton.attributes.add("betAmount",{type:"number"}),NumButton.prototype.initialize=function(){let t=this.entity.children[0],n=this.betAmount,e=getCommaText(n);t.element.text=`+${e}`,setButton(this.entity,this.onClick,this)},NumButton.prototype.onClick=function(){AudioController.instance.playSound("Click");BetController.instance.betChange(this.betAmount)};var SoundButton=pc.createScript("soundButton");SoundButton.attributes.add("onImg",{type:"entity"}),SoundButton.attributes.add("offImg",{type:"entity"}),SoundButton.prototype.initialize=function(){SoundButton.instance=this,this.isMute=!0,this.setButton(this.entity,this.onClick)},SoundButton.prototype.onClick=function(){this.isMute=!this.isMute,this.onImg.enabled=!1,this.offImg.enabled=!1,this.isMute?this.offImg.enabled=!0:this.onImg.enabled=!0,AudioController.instance.setMute(this.isMute)},SoundButton.prototype.setButton=function(t,n){t.element.on("touchend",n,this),t.element.on("mouseup",n,this)};var Twinkle=pc.createScript("twinkle");Twinkle.prototype.initialize=function(){this.onEnable(),this.entity.on("enable",this.onEnable,this)},Twinkle.prototype.onEnable=function(){var t={value:1},e=this.entity.tween(t).yoyo(!0).loop(!0).to({value:.5},.3,pc.Linear);e.onUpdate((e=>{this.entity.element.opacity=t.value})),e.start()};var Bounce=pc.createScript("bounce");Bounce.attributes.add("shadow",{type:"entity"}),Bounce.prototype.initialize=function(){this.onEnable(),this.entity.on("enable",this.onEnable,this)},Bounce.prototype.onEnable=function(){console.log("onEnable");var t={value:0};let e=getRandomInt(6,12)/10;var o=this.entity.tween(t).yoyo(!0).loop(!0).to({value:15},e,pc.Linear);o.onUpdate((e=>{this.entity.setLocalPosition(0,t.value,0),this.shadow.setLocalScale(1-t.value/100,1-t.value/100,1)})),o.start()};var Dice=pc.createScript("dice");Dice.attributes.add("bg",{type:"entity"}),Dice.attributes.add("dotsRoot",{type:"entity"}),Dice.prototype.initialize=function(){this.dots=[],this.myNumber=0,this.isRand=!1,this.timer=0,this.delayTime=.13,this.dotsRoot.children.forEach((t=>{this.dots.push(t)}))},Dice.prototype.update=function(t){let e=[this.myNumber];if(this.isRand&&(this.timer+=t,this.timer>=this.delayTime)){let t=generateRandomNumbersInRange(1,7,e,1);this.setDiceNumber(t[0]),this.timer=0}},Dice.prototype.startRandom=function(){this.isRand=!0,this.timer=0},Dice.prototype.fadeStopRandom=function(t){this.timer=0;var e={value:.13},i=this.entity.tween(e).to({value:1.2},2.7,pc.Linear);return i.start(),i.onUpdate((t=>{this.delayTime=e.value})),i.onComplete((()=>{this.delayTime=.13,this.isRand=!1,this.timer=0,this.setDiceNumber(t)})),2700},Dice.prototype.stopRandom=function(t){this.isRand=!1,this.timer=0,this.setDiceNumber(t)},Dice.prototype.setColor=function(t){this.bg.element.color=t},Dice.prototype.setDiceNumber=function(t){if(0<=t&&t<=6){this.myNumber=t;let e=dotsPattern[t];this.dots.forEach((t=>{t.enabled=!1}));for(let t=0;t<this.dots.length;++t)e.includes(t)&&(this.dots[t].enabled=!0)}};var Status=pc.createScript("status");Status.attributes.add("dice",{type:"entity",array:!0}),Status.attributes.add("numberText",{type:"entity"}),Status.attributes.add("gaugeImage",{type:"entity"}),Status.attributes.add("winCover",{type:"entity",array:!0}),Status.prototype.initialize=function(){},Status.prototype.postInitialize=function(){this.init()},Status.prototype.init=function(){this.winCover.forEach((t=>t.enabled=!1)),null!==this.gaugeImage&&(this.gaugeImage.element.height=0),null!==this.numberText&&(this.numberText.element.text="0"),0!==this.dice.length&&this.dice.forEach((t=>t.script.dice.setDiceNumber(0))),this.sum=[0,0]},Status.prototype.getWinCoverIndex=function(t){switch(t){case 2:case 12:return 0;case 3:case 11:return 1;case 4:case 10:return 2;case 5:case 9:return 3;default:return 4}},Status.prototype.setWinner=function(t){if(1===this.winCover.length)this.winCover[0].enabled=!0;else{let e=this.getWinCoverIndex(t);this.winCover[e].enabled=!0}},Status.prototype.updateStatus=function(){const t=this.sum.reduce(((t,e)=>t+e),0);null!==this.gaugeImage&&(this.gaugeImage.element.height=t/12*300),null!==this.numberText&&(this.numberText.element.text=`${t}`)},Status.prototype.setDiceNumber=function(t,e){this.sum[t]=e,0!==this.dice.length&&this.dice[t].script.dice.setDiceNumber(e),this.updateStatus()};

//# sourceMappingURL=__game-scripts.js.map
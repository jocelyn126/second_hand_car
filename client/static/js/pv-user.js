
function PVTrack(){var d=document;this.page=0;this.type=0;this.typeid=0;this.object=0;this.series=0;this.spec=0;this.dealer=0;this.cur=escape(d.URL);this.ref=escape(d.referrer);this.src="";this.init=function(){this.src="//usedcarpv.che168.com/pv.ashx?page="+this.page;this.src+=this.type>0?"&type="+this.type:"";this.src+=this.typeid>0?"&typeid="+this.typeid:"";this.src+=this.object>0?"&object="+this.object:"";this.src+=this.series>0?"&series="+this.series:"";this.src+=this.spec>0?"&spec="+this.spec:"";this.src+=this.dealer>0?"&dealer="+this.dealer:"";this.src+="&ref="+this.ref+"&cur="+this.cur;}
this.send=function(){var c=new Image(1,1);c.onLoad=function(){};c.src=this.src;}
this.track=function(){this.init();this.send();}}
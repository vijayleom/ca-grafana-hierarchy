/* eslint-disable */
import React from 'react';
import Tree from 'react-animated-tree'
import { Hierarchy } from 'hierachy-structure';
import { Hyperlink } from 'hyperlink-content';
import { Line} from 'rc-progress';
import { css, cx } from 'emotion';

class ContentProps {
	content:any = [];
	level:number = 0;
	label:string = '';
	percent:number = 0;
	hyperlinkContnt: Array<Hyperlink> = [];
}

export class DisplayContent extends React.Component<ContentProps, any>{
	dataMap:Array<Hierarchy>;
	level:number;
	label:string = '';
	hyperlinkContnt: Array<Hyperlink>;
	isLinkExist: Boolean = false;
	title: string = '';
	url: string = '';
	target: string = '';
	percent: number = 0;
	constructor(prop:ContentProps){
		super(prop);
		this.dataMap = prop.content;
		this.level = prop.level + 1;
		this.label = prop.label ;
		this.hyperlinkContnt = prop.hyperlinkContnt;
		this.percent = prop.percent;
	}

	
	render(){

		const displayextenhref = {
			"text-indent": (this.level<2?((this.level) * 2): (((this.level) * 2) - 2)).toString() + "em",
			"border": "0px solid",
			"border-radius": "40px",
			"display":"inline",
			"margin-left":"18px"
		}

		const displayextend = {
			"text-indent": (this.level<2?((this.level) * 2): (((this.level) * 2) - 2)).toString() + "em",
			"border": "0px solid",
			"border-radius": "40px",
			"display":"inline",
		}
		
		const mystyle = {
			"text-indent": this.level.toString()+"em",
			"font-size": "1.2rem",
			"line-height": "2",
			"font-weight": "600",
			"font-family": "arial",
			"color": "#036",
		};

		const hrefstyle = {
			"display": "inline",
			"font-size": "1.2rem",
			"line-height": "2",
			"font-weight": "600",
			"font-family": "arial",
			"color": "black"
		};

		const percentStyle = {
			"left": "400px",
			"height": "5px",
		};

		const percentInfo = {
			"display": "inline",
			"font-size": "0.8rem",
			"border": "1px solid black",
    		"padding": "5px",
			"border-radius": "12px",
			"padding-left": "15px",
			"padding-right": "15px",
			"margin": "2px"
		}

		const percentInfoZero = {
			"display": "inline",
			"font-size": "0.8rem",
			"border": "1px solid black",
    		"padding": "5px 15px 5px 25px",
			"border-radius": "12px",
			"margin": "3px"
		}

		const percentInfoLast = {
			"display": "inline",
			"font-size": "0.8rem",
			"border": "1px solid black",
    		"padding": "5px 15px 5px 25px",
			"border-radius": "12px",
			"margin": "2px"
		}

		const percentInfoLastZero = {
			"display": "inline",
			"font-size": "0.8rem",
			"border": "1px solid black",
    		"padding": "5px 15px 5px 25px",
			"border-radius": "12px",
			"margin": "15px"
		}

		let htmlContent: any = [];
		for(let i in this.hyperlinkContnt){
			if(this.hyperlinkContnt[i] && String(this.level - 1) === this.hyperlinkContnt[i].level){
				this.isLinkExist = true;
				this.title = this.hyperlinkContnt[i].title;
				this.target = this.hyperlinkContnt[i].target?'_blank':'';
				this.url = this.hyperlinkContnt[i].url;
				break;
			}
		}
		const innerArray: any = [];
		this.dataMap.forEach((value: Hierarchy) => {
			if(!value.children || value.children.length === 0){
				let linkExist = false;
				let localTitle = '';
				let localUrl = '';
				let localTarget = '';
				this.hyperlinkContnt.map((hyper:Hyperlink) => {
					if(String(this.level) === hyper.level){
						linkExist = true;
						localTitle = hyper.title;
						localTarget = hyper.target?'_blank':'';
						localUrl = hyper.url;
					}
				});
 
				if(linkExist){
					innerArray.push(<p>{this.percent>=0?<p style={value.percentage > 0?percentInfo:percentInfoZero} title='Percentage Completion'><Line percent={value.percentage} strokeColor={returnColorCode(value.percentage)} strokeWidth={10} trailColor="black" style={percentStyle}></Line>{' '+value.percentage+'%'+' '}</p>:''}&nbsp;&nbsp;);
					innerArray.push(
					<b style={displayextenhref}>
					<Tree  content={value.key} type={<a href={localUrl} target={localTarget} title={localTitle}><p style={hrefstyle}>&#x1F517;</p></a>} /></b>);
					innerArray.push(</p>);
				} else {
					innerArray.push(<p>{this.percent>=0?<p style={value.percentage > 0?percentInfoLast:percentInfoLastZero} title='Percentage Completion'><Line percent={value.percentage} strokeColor={returnColorCode(value.percentage)} strokeWidth={10} trailColor='black' style={percentStyle}></Line>{' '+value.percentage+'%'+' '}</p>:''}
					<b style={displayextend}><Tree content={value.key}/></b>
					</p>);
				}
			} else {
				innerArray.push(<DisplayContent content={value.children} label={value.key} percent={value.percentage} hyperlinkContnt={this.hyperlinkContnt} level={this.level}></DisplayContent>);
			}
		}
		);

		if(this.isLinkExist){
			htmlContent.push(
			<p className={cx(css`margin-bottom: 0px;`)}>{this.percent>=0?<p style={this.percent > 0?percentInfo:percentInfoZero} title='Percentage Completion' ><Line percent={this.percent} strokeColor={returnColorCode(this.percent)} strokeWidth={10} trailColor="black" style={percentStyle}></Line>{' '+this.percent+'% '}</p>:''}&nbsp;&nbsp;
			<Tree content={this.label} type={<a href={this.url} target={this.target} title={this.title}><p style={hrefstyle}>&#x1F517;</p></a>} >
			{innerArray}
			</Tree></p>
		);
				}else {
		htmlContent.push(
			<p className={cx(css`margin-bottom: 0px;`)}>{this.percent>=0?<p style={this.percent > 0?percentInfo:percentInfoZero} title='Percentage Completion' ><Line percent={this.percent} strokeColor={returnColorCode(this.percent)} strokeWidth={10} trailColor="black" style={percentStyle}></Line>{' '+this.percent+'% '}</p>:''}&nbsp;&nbsp;
			<Tree content={this.label} >
			{innerArray}
			</Tree></p>
		);
				}
		return (<span style={mystyle}>{htmlContent}</span>);
	}
};

function returnColorCode(percent:number) {
	let color: string = "#D8D8D8";
	if(percent >= 80){
		color = "#298A08";
	} else if(percent < 80 && percent >= 55){
		color = "#0000FF";
	} else if(percent < 55 && percent >= 25){
		color = "#FF8000";
	} else if(percent < 25 && percent > 0){
		color = "#FF0000";
	}
	return color;
}

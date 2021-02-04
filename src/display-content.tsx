/* eslint-disable */
import React from 'react';
import Tree from 'react-animated-tree'
import { Hierarchy } from 'hierachy-structure';
import { Hyperlink } from 'hyperlink-content';

class ContentProps {
	content:any = [];
	level:number = 0;
	label:string = '';
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
	constructor(prop:ContentProps){
		super(prop);
		console.log('prop.hyperlinkContnt',prop.hyperlinkContnt);
		this.dataMap = prop.content;
		this.level = prop.level + 1;
		this.label = prop.label ;
		this.hyperlinkContnt = prop.hyperlinkContnt;
	}

	
	render(){

		const displayextenhref = {
			"text-indent": (this.level<2?((this.level) * 2): (((this.level) * 2) - 2)).toString() + "em",
			"border": "0px solid",
			"border-radius": "40px",
		}

		const displayextend = {
			"text-indent": (this.level<2?((this.level) * 2): (((this.level) * 2) - 2)).toString() + "em",
			"border": "0px solid",
			"border-radius": "40px",
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

		let htmlContent: any = [];
		console.log('Vijay',this.hyperlinkContnt);
		console.log('leve',this.level);
		for(let i in this.hyperlinkContnt){
			console.log('leo ',this.hyperlinkContnt[i].level);
			if(this.hyperlinkContnt[i] && String(this.level - 1) === this.hyperlinkContnt[i].level){
				this.isLinkExist = true;
				console.log(this.hyperlinkContnt[i]);
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
					innerArray.push(<b style={displayextenhref}><Tree content={value.key} type={<a href={localUrl} target={localTarget} title={localTitle}><p style={hrefstyle}>&#x1F517;</p></a>} /></b>);
				} else {
					innerArray.push(<b style={displayextend}><Tree content={value.key}/></b>);
				}
			} else {
				innerArray.push(<DisplayContent content={value.children} label={value.key} hyperlinkContnt={this.hyperlinkContnt} level={this.level}></DisplayContent>);
			}
		}
		);

		if(this.isLinkExist){
					htmlContent.push(
			<Tree content={this.label} type={<a href={this.url} target={this.target} title={this.title}><p style={hrefstyle}>&#x1F517;</p></a>} >
			{innerArray}
			</Tree>
		);
				}else {
		htmlContent.push(
			<Tree content={this.label} >
			{innerArray}
			</Tree>
		);
				}
		
	

		return (<span style={mystyle}>{htmlContent}</span>);
	}
};
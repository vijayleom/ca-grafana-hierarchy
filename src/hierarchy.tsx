/* eslint-disable */
import React from 'react';
import { DisplayContent } from 'display-content';
import { Hierarchy } from 'hierachy-structure';
import { DataSingleton } from 'Singleton';

import { Hyperlink } from 'hyperlink-content';

class DataProps {
	data: any;
}

export class ShowHierarchy extends React.Component<DataProps, any>{
	dataArray: any;
	content: Array<Hierarchy> = new Array<Hierarchy>();
	headersArray: any	;
	htmlContent: any = [];
	hyperlinkContnt: Array<Hyperlink> = [];

	constructor(prop: DataProps) {
		super(prop);
		this.state = {show: true};
	}
	
	render() {
		let rows: any[];
		rows = [];
		this.headersArray = new Array();
		if (this.dataArray && this.dataArray.series.length > 0) {
			const fldLength = this.dataArray.series[0].fields.length;
			if (fldLength > 0) {
				this.hyperlinkContnt = new Array<Hyperlink>();
				for(let i in this.dataArray.series[0].fields){
					if(this.dataArray.series[0].fields[i].config && this.dataArray.series[0].fields[i].config.links){
						const links = this.dataArray.series[0].fields[i].config.links;
						let hyperlink: Hyperlink = { 'level':i, 'title': links[0].title, 'url': links[0].url, 'target': links[0].targetBlank};
						this.hyperlinkContnt.push(hyperlink);
					}
				}

				const bufferContent = this.dataArray.series[0].fields[0].values.buffer;
				for (let i in bufferContent) {
					let cnt = 0;
					while (cnt < fldLength) {
						const name = this.dataArray.series[0].fields[cnt].name;
						if (this.headersArray.length !== fldLength) {
							this.headersArray.push(name);
						}
						const value = this.dataArray.series[0].fields[cnt].values.buffer;
						let preValue;
						if (cnt > 0) {
							preValue = this.dataArray.series[0].fields[cnt - 1].values.buffer;
						}
						if (value[i] && value[i].length > 0) {
							let hierachy: Hierarchy = { 'key': value[i] + ' [' + this.headersArray[cnt] + ']', 'title': value[i] + ' [' + this.headersArray[cnt] + ']', 'parentkey': preValue ? preValue[i] + ' [' + this.headersArray[cnt - 1] + ']' : '' };
							rows.push(hierachy);
						}
						cnt++;
					}
				}
			}
		}
		this.content = contructHierarchy(rows);
		{
			this.content.forEach((value: Hierarchy) => {
				this.htmlContent.push(<DisplayContent content={value.children} hyperlinkContnt={this.hyperlinkContnt} label={value.key} level={0}></DisplayContent>);
			})
		};
		if (DataSingleton.reloadFlag) {
			DataSingleton.reloadFlag = false;
			this.htmlContent = new Array();;
			this.setState({show: false});
			this.dataArray = DataSingleton.data;
		}

		if(!DataSingleton.reloadFlag){
			return (
				<span id="mydiv">{this.htmlContent}</span>
			);
		} else {
			return (
				<span id="mydiv"></span>
			);
		}	
	}
};



function contructHierarchy(arr: Array<any>) {
	let tree = [];
	let mappedArr = [];
	let arrElem;
	let mappedElem;
	// First map the nodes of the array to an object -> create a hash table.
	for (var i = 0, len = arr.length; i < len; i++) {
		arrElem = arr[i];
		mappedArr[arrElem.key] = arrElem;
		mappedArr[arrElem.title] = arrElem;
		mappedArr[arrElem.key]['children'] = [];
	}

	for (var id in mappedArr) {
		if (mappedArr.hasOwnProperty(id)) {
			mappedElem = mappedArr[id];
			// If the element is not at the root level, add it to its parent array of children.
			if (mappedElem.parentkey) {
				mappedArr[mappedElem['parentkey']]['children'].push(mappedElem);
			}
			// If the element is at the root level, add it to first level elements array.
			else {
				tree.push(mappedElem);
			}
		}
	}
	return tree;
}

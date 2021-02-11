import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Cell } from './cell';
import { sum } from '../utils';

interface IRowOptions {
	data: string[] | JSX.Element[];
	style?: ViewStyle;
	widthArr?: number[];
	height?: number;
	flexArr?: number[];
	textStyle?: TextStyle;
	cellStyle?: (item: string | JSX.Element, index: number) => ViewStyle;
	cellBorderStyle?: (item: string | JSX.Element, index: number) => ViewStyle;
}

export class Row extends Component<IRowOptions> {

	public render() {
		const { data, style, widthArr, height, flexArr, textStyle, cellStyle, cellBorderStyle, ...props } = this.props;
		const width = widthArr ? sum(widthArr) : 0;

		return data ? (
			<View style={[
				height ? { height } : {},
				width ? { width } : {},
				styles.row,
				style
			]}>
				{[...data].map((item, i) => {
					const flex = flexArr && flexArr[i];
					const wth = widthArr && widthArr[i];
					return (
						<Cell
							key={i}
							data={item}
							width={wth}
							height={height}
							flex={flex}
							textStyle={textStyle}
							style={cellStyle && cellStyle(item, i)}
							borderStyle={cellBorderStyle && cellBorderStyle(item, i)}
							{...props}
						/>
					);
				})}
			</View>
		) : null;
	}

}


interface IRowsOptions {
	data: string[][] | JSX.Element[][];
	style?: ViewStyle;
	widthArr?: number[];
	heightArr?: number[];
	flexArr?: number[];
	textStyle?: TextStyle;
}

// tslint:disable-next-line: max-classes-per-file
export class Rows extends Component<IRowsOptions> {

	public render() {
		const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;
		const flex = flexArr ? sum(flexArr) : 0;
		const width = widthArr ? sum(widthArr) : 0;

		return data ? (
			<View style={[
				flex ? { flex } : {},
				width ? { width } : {}
			]}>
				{[...data].map((item, i) => {
					const height = heightArr && heightArr[i];
					return (
						<Row
							key={i}
							data={item}
							widthArr={widthArr}
							height={height}
							flexArr={flexArr}
							style={style}
							textStyle={textStyle}
							{...props}
						/>
					);
				})}
			</View>
		) : null;
	}

}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		overflow: 'hidden'
	}
});

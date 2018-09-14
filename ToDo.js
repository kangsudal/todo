import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"

const { height, width } = Dimensions.get("window");

export default class ToDo extends Component {
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    };
    render() {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;
        return (/* TouchableOpacity -> toggleComplete -> isCompleted -> styles.uncompleted */
            <View style={styles.container}>
                {/*토글버튼, 텍스트*/}
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                    </TouchableOpacity>
                    {isEditing ? (/* 수정모드일때 */
                        <TextInput /* 입력창 */
                            style={[
                                styles.text,
                                styles.input,
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]}
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this._controllInput}
                            returnKeyType={"done"}
                            onBlur={this._finishEditing}
                        />
                    ) : (/*아닐때 일반텍스트 */
                            <Text
                                style={[
                                    styles.text,
                                    isCompleted ? styles.completedText : styles.uncompletedText
                                ]}>{text}</Text>)}

                </View>
                {/*완료버튼, 수정버튼, 삭제버튼*/}
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={this._finishEditing}>
                            <View style={styles.actionContainer}><Text style={styles.actionText}>✅</Text></View>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={this._startEditing}>
                                <View style={styles.actionContainer}><Text style={styles.actionText}>✏️</Text></View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionContainer}><Text style={styles.actionText}>❌</Text></View>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }

    _toggleComplete = () => {
        this.setState(
            prevState => {
                return { isCompleted: !prevState.isCompleted }
            }
        )
    }

    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        });
    };

    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };

    _controllInput = (text) => {
        this.setState({
            toDoValue: text
        })
    }
}



const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#ffea32"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353535"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        width: width / 2
    }
});
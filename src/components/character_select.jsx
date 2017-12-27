import React from 'react';
import ReactDOM from 'react-dom';
import materialize from 'materialize-css';
import {Input, Row} from 'react-materialize';
import character_data from '../character_data';


export default class CharacterSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "character": "Bowser",
      "color": "Neutral"
    };

    this.update_character = this.update_character.bind(this);
    this.update_color = this.update_color.bind(this);
  }

  calculate_icon_path(character, color) {
    return "/public/images/character_icons/" + character + "/" + character + color + ".png";
  }

  update_character(e) {
    this.setState({
      "character": e.target.value,
      "color": "Neutral"
    }, () => {
      this.props.onChange(
        this.calculate_icon_path(this.state.character, this.state.color),
        this.props.stateName
      );
    });
  }

  update_color(e) {
    this.setState({
      "color": e.target.value
    }, () => {
      this.props.onChange(
        this.calculate_icon_path(this.state.character, this.state.color),
        this.props.stateName
      );
    });
  }

  render() {
    var characterNames = Object.keys(character_data).map((key) => {
      const item = character_data[key];
      return <option key={key} value={key}>{item.display}</option>;
    });
    var characterColors = character_data[this.state.character].colors.map((color, index) => {
      return <option className="left"
                    data-icon={this.calculate_icon_path(this.state.character, color.value)}
                    key={this.state.character + "_" + color.value}
                    value={color.value}>{color.display}</option>;
    });
    return (
      <div className="character-selector">
        <Row>
          <Input onChange={this.update_character} s={12} type="select" label="Character Select" defaultValue='Bowser'>
            {characterNames}
          </Input>
        </Row>
        <Row>
          <Input onChange={this.update_color} s={12} type="select" label="Color Select" defaultValue='Neutral'>
            {characterColors}
          </Input>
        </Row>
      </div>
    );
  }
};

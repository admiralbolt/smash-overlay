import React from 'react';
import ReactDOM from 'react-dom';
import materialize from 'materialize-css';
import {Col, Input, Row} from 'react-materialize';
import character_data from '../character_data';
require('../styles/character_select.scss');


export default class CharacterSelect extends React.Component {

  constructor(props) {
    super(props);
    // props.value will be a full image path, so we need to parse the
    // character and color values out of it.
    const character = props.value.split("/")[4];
    const color = props.value.split("/")[5].split(".")[0].substr(character.length);
    this.state = {
      "character": character,
      "color": color,
      "icon_path": "/public/images/character_icons/" + character + "/" + character + color + ".png"
    };

    this.calculate_icon_path = this.calculate_icon_path.bind(this);
    this.update_character = this.update_character.bind(this);
    this.update_color = this.update_color.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const character = nextProps.value.split("/")[4];
    const color = nextProps.value.split("/")[5].split(".")[0].substr(character.length);
    this.setState({"character": character, "color": color, "icon_path": this.calculate_icon_path(character, color)});
  }

  componentDidMount() {
    this.setState({
      "icon_path": this.calculate_icon_path(this.state.character, this.state.color)
    });
  }

  calculate_icon_path(character, color) {
    return "/public/images/character_icons/" + character + "/" + character + color + ".png";
  }

  update_character(e) {
    this.setState({
      "character": e.target.value,
      "color": "Original"
    }, () => {
      this.state.icon_path = this.calculate_icon_path(this.state.character, this.state.color);
      this.props.onChange(
        this.state.icon_path,
        this.props.stateName
      );
    });
  }

  update_color(e) {
    this.setState({
      "color": e.target.value
    }, () => {
      this.state.icon_path = this.calculate_icon_path(this.state.character, this.state.color);
      this.props.onChange(
        this.state.icon_path,
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
          <Input onChange={this.update_character} s={12} type="select" label="Character Select" value={this.state.character}>
            {characterNames}
          </Input>
        </Row>
        <Row>
          <Col s={2}>
            <div className="valign-wrapper center-align selected-icon-wrapper">
              <img className="selected-icon" src={this.state.icon_path} />
            </div>
          </Col>
          <Input onChange={this.update_color} s={10} type="select" label="Color Select" value={this.state.color}>
            {characterColors}
          </Input>
        </Row>
      </div>
    );
  }
};

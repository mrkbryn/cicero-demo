import React, { Component } from 'react';
import { Card, Tag, Icon } from '@blueprintjs/core'
import { Col, Row } from 'react-bootstrap';

class DataCards extends Component {
  render() {
    return (
      <div className="data-cards">
        <h3>Available Datasets</h3>
        <Row>
        {this.props.tables.map(table => {
          let style = { margin: "10px" };
          return (
            <div key={table.tableName} style={style}>
              <Col>
              <Card elevation={table.tableName === this.props.selectedTable ? Card.ELEVATION_FOUR : Card.ELEVATION_TWO}>
                <h5>{table.tableName}</h5>
                <p>{table.description}</p>
                Keywords:
                {table.keywords.map(keyword => <Tag key={keyword} style={{ margin: "5px" }}>{keyword}</Tag>)}
                <div>
                {table.earliestDate.toDateString()} <Icon iconName="arrow-right" iconSize={20} /> {table.latestDate.toDateString()}
                </div>
              </Card>
              </Col>
            </div>
          )
        })}
        </Row>
      </div>
    )
  }
}

export default DataCards;

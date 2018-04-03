import * as React from 'react';
import styled from 'types/styled-components';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Button, List, Avatar } from 'antd';

// components

interface IProps extends RouteComponentProps<any> {}

class HomeScreen extends React.Component<IProps, any> {
  render() {
    const data = [
      {
        title: 'Room 1'
      },
      {
        title: 'Room 2'
      },
      {
        title: 'Room 3'
      },
      {
        title: 'Room 4'
      }
    ];

    return (
      <STContentWrap>
        <STRoomsActions>
          <Button
            type="primary"
            ghost
            icon="plus"
            style={{ borderStyle: 'dashed', fontSize: '18px', marginRight: '15px' }}
          />
          <STListDescrip>Joined rooms</STListDescrip>
        </STRoomsActions>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <STRoomLink href="http://localhost:3000/">
                    <Avatar src="https://svgshare.com/i/66t.svg" />
                  </STRoomLink>
                }
                title={<a href="http://localhost:3000/">{item.title}</a>}
                description={
                  <STRoomLink href="http://localhost:3000/">
                    Ant Design, a design language for background applications, is refined by Ant UED
                    Team
                  </STRoomLink>
                }
              />
            </List.Item>
          )}
        />
      </STContentWrap>
    );
  }
}

const STContentWrap = styled.div``;

const STRoomsActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
`;

const STListDescrip = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #4496d8;
`;

const STRoomLink = styled.a`
  text-decoration: none;
  color: #9e9e9e;
`;

// пока просто подрублен к стору, но ничего из него не берет
export default connect<any, any, any>(null, null)(HomeScreen);
